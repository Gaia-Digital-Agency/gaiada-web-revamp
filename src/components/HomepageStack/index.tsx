'use client'

import React, { useEffect, useRef, useState, Children, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import './homepageStack.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin)
}

interface HomepageStackProps {
  children: React.ReactNode
}

export const HomepageStack: React.FC<HomepageStackProps> = ({ children }) => {
  const sections = Children.toArray(children)
  const total = sections.length
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const interBubbleRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  // Mouse tracking for interactive gradient
  useEffect(() => {
    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20

      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      requestAnimationFrame(move)
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only update if we're NOT in the middle of a GSAP animation
        if (isAnimating.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setCurrentIndex(index)
            const event = new CustomEvent('homepage-stack-index', { detail: { index } })
            window.dispatchEvent(event)
          }
        })
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [total])

  // Lock body overflow on desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const html = document.documentElement
    const body = document.body
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
    }
  }, [])

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current || !containerRef.current) return
      const targetIndex = Math.max(0, Math.min(total - 1, index))
      const targetElement = sectionRefs.current[targetIndex]

      if (targetElement) {
        isAnimating.current = true
        setCurrentIndex(targetIndex)

        gsap.to(containerRef.current, {
          scrollTo: { y: targetElement, autoKill: false },
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => {
            isAnimating.current = false
            // Final broadcast
            const event = new CustomEvent('homepage-stack-index', { detail: { index: targetIndex } })
            window.dispatchEvent(event)
          },
        })
      }
    },
    [total],
  )

  // Handle Wheel Events for Desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return
      e.preventDefault()

      if (isAnimating.current) return

      if (e.deltaY > 30) {
        goTo(currentIndex + 1)
      } else if (e.deltaY < -30) {
        goTo(currentIndex - 1)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentIndex, goTo])

  // Handle Keyboard Events for Desktop
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return
      if (isAnimating.current) return

      // Prevent default scrolling for navigation keys
      if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        goTo(currentIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        goTo(currentIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, goTo])

  return (
    <div
      ref={containerRef}
      className="homepage-scroll-container w-full h-auto md:h-screen md:overflow-y-auto overflow-x-hidden hide-scrollbar bg-background relative"
      style={{ scrollBehavior: 'auto' }}
    >
      {/* Global Moving Gradient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="gradient-bg absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container h-full w-full">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
            <div ref={interBubbleRef} className="interactive"></div>
          </div>
        </div>

        {/* Subtle Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {sections.map((section, i) => {
        const isLast = i === total - 1
        return (
          <div
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el
            }}
            data-index={i}
            className={`w-full relative ${isLast ? 'h-auto' : 'h-auto md:h-screen'}`}
          >
            {section}
          </div>
        )
      })}
      </div>

      {/* Navigation Dots - Hidden on mobile */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-2.5 z-[9999]">
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
