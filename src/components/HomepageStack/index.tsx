'use client'

import React, { useEffect, useRef, useState, useCallback, Children } from 'react'

interface HomepageStackProps {
  children: React.ReactNode
}

export const HomepageStack: React.FC<HomepageStackProps> = ({ children }) => {
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

      // Debounce: block next navigation until transition ends
      setTimeout(() => {
        isAnimating.current = false
      }, 900)
    },
    [currentIndex, total],
  )

  // Wheel event
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) goTo(currentIndex + 1)
      else if (e.deltaY < 0) goTo(currentIndex - 1)
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [goTo, currentIndex])

  // Touch events
  useEffect(() => {
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
  }, [goTo, currentIndex])

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(currentIndex + 1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(currentIndex - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goTo, currentIndex])

  // Hide scrollbar and overflow on mount
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [])

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

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              transform: isAhead ? 'translateY(100%)' : 'translateY(0%)',
              transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
              zIndex: i + 1,
              willChange: 'transform',
            }}
          >
            {/* Scale-down + rounded corners on covered sections for depth */}
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: isCovered ? 'scale(0.93)' : 'scale(1)',
                transition: 'transform 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
                transformOrigin: 'center bottom',
                borderRadius: isCovered ? '20px' : '0px',
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
