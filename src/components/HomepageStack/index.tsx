'use client'

import React, { useEffect, useRef, useState, useCallback, Children } from 'react'

interface HomepageStackProps {
  children: React.ReactNode
}

/** Returns true when the viewport is mobile-sized (< 768px). */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1025)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

export const HomepageStack: React.FC<HomepageStackProps> = ({ children }) => {
  const isMobile = useIsMobile()
  const sections = Children.toArray(children)
  const total = sections.length
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimating = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return
      const next = Math.max(0, Math.min(total - 1, index))
      if (next === currentIndex) return

      isAnimating.current = true
      setCurrentIndex(next)

      setTimeout(() => {
        isAnimating.current = false
      }, 900)
    },
    [currentIndex, total],
  )

  // Broadcast current index (desktop only — mobile doesn't navigate)
  useEffect(() => {
    if (isMobile) return
    const event = new CustomEvent('homepage-stack-index', { detail: { index: currentIndex } })
    window.dispatchEvent(event)
  }, [currentIndex, isMobile])

  // Wheel event — desktop only
  useEffect(() => {
    if (isMobile) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) goTo(currentIndex + 1)
      else if (e.deltaY < 0) goTo(currentIndex - 1)
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [goTo, currentIndex, isMobile])

  // Touch events — desktop only (mobile scrolls naturally)
  useEffect(() => {
    if (isMobile) return
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 40) return
      if (delta > 0) goTo(currentIndex + 1)
      else goTo(currentIndex - 1)
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goTo, currentIndex, isMobile])

  // Keyboard — desktop only
  useEffect(() => {
    if (isMobile) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(currentIndex + 1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(currentIndex - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goTo, currentIndex, isMobile])

  // Lock overflow on desktop; release it on mobile
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (isMobile) {
      html.style.overflow = ''
      body.style.overflow = ''
      return
    }

    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [isMobile])

  // ─── MOBILE: plain vertical flow, no stacking ──────────────────────────────
  if (isMobile) {
    return (
      <div className="homepage-mobile-stack">
        {sections.map((section, i) => (
          <div key={i} className="homepage-mobile-section">
            {section}
          </div>
        ))}
      </div>
    )
  }

  // ─── DESKTOP: stacking animation ────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {sections.map((section, i) => {
        const isCovered = i < currentIndex
        const isAhead = i > currentIndex
        const isLast = i === total - 1

        const isCoveredOnlyByFooter = isCovered && currentIndex === total - 1 && i === total - 2
        const shouldScale = isCovered && !isCoveredOnlyByFooter

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: isLast ? 'auto' : 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: isLast ? 'auto' : '100%',
              transform: isAhead ? 'translateY(100%)' : 'translateY(0%)',
              transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
              zIndex: i + 1,
              willChange: 'transform',
            }}
          >
            <div
              style={{
                width: '100%',
                height: isLast ? 'auto' : '100%',
                transform: 'scale(1)',
                transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
                transformOrigin: 'center bottom',
                borderRadius: '0px',
                overflow: 'hidden',
              }}
            >
              {section}
            </div>
          </div>
        )
      })}

      {/* Navigation Dots */}
      <div
        style={{
          position: 'fixed',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 9999,
        }}
      >
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            style={{
              width: i === currentIndex ? '8px' : '6px',
              height: i === currentIndex ? '28px' : '6px',
              borderRadius: '99px',
              background: i === currentIndex ? '#1a1a1b' : 'rgba(26,26,27,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
