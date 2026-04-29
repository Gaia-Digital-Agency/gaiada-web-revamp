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
  const leafRef = useRef<HTMLImageElement>(null)
  const leafRef2 = useRef<HTMLImageElement>(null)
  const isAnimating = useRef(false)

  // Leaf Animation Logic
  useEffect(() => {
    if (!leafRef.current || !leafRef2.current) return

    const isLast = currentIndex === total - 1
    const windowHeight = window.innerHeight

    if (isLast) {
      // Gust of wind exit - slower and more graceful
      gsap.to(leafRef.current, {
        y: windowHeight + 300,
        x: 500,
        rotation: 720,
        scale: 0.4,
        opacity: 0,
        duration: 4.5, // Increased from 2.5
        ease: 'power2.inOut',
      })
      gsap.to(leafRef2.current, {
        y: windowHeight + 300,
        x: -500,
        rotation: -720,
        scale: 0.4,
        opacity: 0,
        duration: 5, // Increased from 2.5
        ease: 'power2.inOut',
      })
    } else {
      // Drifting movement between sections - Much slower for a "floating" feel
      // Leaf 1 (leaf2.png)
      const targetY1 = (currentIndex / (total - 1)) * (windowHeight * 0.75) + windowHeight * 0.1
      const horizontalBase1 = currentIndex % 2 === 0 ? 80 : 20
      const drift1 = Math.sin(currentIndex) * 10

      gsap.to(leafRef.current, {
        y: 0,
        x: 0,
        top: `${targetY1}px`,
        left: `${horizontalBase1 + drift1}%`,
        rotation: currentIndex * 150,
        scale: 1 + Math.sin(currentIndex * 2) * 0.2,
        opacity: 1,
        duration: 4, // Increased from 2.2
        ease: 'power2.out', // Smoother ease for slower motion
      })

      // Leaf 2 (leaf1.png)
      const targetY2 = ((currentIndex + 0.4) / total) * (windowHeight * 0.65) + windowHeight * 0.15
      const horizontalBase2 = currentIndex % 2 === 0 ? 15 : 85
      const drift2 = Math.cos(currentIndex) * 15

      gsap.to(leafRef2.current, {
        y: 0,
        x: 0,
        top: `${targetY2}px`,
        left: `${horizontalBase2 + drift2}%`,
        rotation: currentIndex * -180,
        scale: 0.8 + Math.cos(currentIndex * 1.5) * 0.15,
        opacity: 0.8,
        duration: 5, // Increased from 2.5
        ease: 'power2.out',
      })
    }
  }, [currentIndex, total])

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

  // Lock body/html overflow to ensure HomepageStack is the only scrollable element (Desktop only)
  useEffect(() => {
    if (window.innerWidth < 1024 || window.innerHeight < 768) return

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

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current || !containerRef.current) return
      // Disable GSAP snap on mobile/tablet or small screen height
      if (window.innerWidth < 1024 || window.innerHeight < 768) return

      const targetIndex = Math.max(0, Math.min(total - 1, index))
      const targetElement = sectionRefs.current[targetIndex]

      if (targetElement) {
        isAnimating.current = true
        setCurrentIndex(targetIndex)

        // Broadcast immediately when starting to scroll
        const event = new CustomEvent('homepage-stack-index', {
          detail: { index: targetIndex },
        })
        window.dispatchEvent(event)

        gsap.to(containerRef.current, {
          scrollTo: { y: targetElement, autoKill: false },
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => {
            isAnimating.current = false
          },
        })
      }
    },
    [total],
  )

  // Handle Wheel Events for Desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024 || window.innerHeight < 768) return

      const container = containerRef.current
      if (!container || isAnimating.current) return

      const activeSection = sectionRefs.current[currentIndex]
      if (activeSection) {
        const viewportHeight = window.innerHeight
        const sectionHeight = activeSection.offsetHeight

        if (sectionHeight > viewportHeight) {
          const scrollTop = container.scrollTop
          const sectionTop = activeSection.offsetTop
          const threshold = 10 // pixels

          // Check if we're scrolling down and haven't reached the bottom of the section
          if (e.deltaY > 0) {
            const isAtBottom = scrollTop + viewportHeight >= sectionTop + sectionHeight - threshold
            if (!isAtBottom) {
              // Allow natural scroll
              return
            }
          }
          // Check if we're scrolling up and haven't reached the top of the section
          else if (e.deltaY < 0) {
            const isAtTop = scrollTop <= sectionTop + threshold
            if (!isAtTop) {
              // Allow natural scroll
              return
            }
          }
        }
      }

      e.preventDefault()

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
      if (window.innerWidth < 1024 || window.innerHeight < 768) return

      const container = containerRef.current
      if (!container || isAnimating.current) return

      const activeSection = sectionRefs.current[currentIndex]
      if (activeSection) {
        const viewportHeight = window.innerHeight
        const sectionHeight = activeSection.offsetHeight

        if (sectionHeight > viewportHeight) {
          const scrollTop = container.scrollTop
          const sectionTop = activeSection.offsetTop
          const threshold = 10 // pixels

          if (['ArrowDown', 'PageDown'].includes(e.key)) {
            const isAtBottom = scrollTop + viewportHeight >= sectionTop + sectionHeight - threshold
            if (!isAtBottom) {
              // Allow natural scroll
              return
            }
          } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
            const isAtTop = scrollTop <= sectionTop + threshold
            if (!isAtTop) {
              // Allow natural scroll
              return
            }
          }
        }
      }

      // Prevent default scrolling for navigation keys
      if (['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          goTo(currentIndex + 1)
        } else {
          goTo(currentIndex - 1)
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, goTo])

  return (
    <div
      ref={containerRef}
      className="homepage-scroll-container w-full h-screen overflow-y-auto overflow-x-hidden hide-scrollbar bg-background relative"
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

        {/* Falling Leaves - Hidden on mobile */}
        <img
          ref={leafRef}
          src="/leaf2.png"
          alt=""
          className="hidden lg:block fixed w-24 h-auto pointer-events-none z-[100]"
          style={{
            top: '5%',
            left: '80%',
            opacity: 0,
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))',
          }}
        />
        <img
          ref={leafRef2}
          src="/leaf1.png"
          alt=""
          className="hidden lg:block fixed w-20 h-auto pointer-events-none z-[100]"
          style={{
            top: '15%',
            left: '10%',
            opacity: 0,
            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.12))',
          }}
        />

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
              className={`w-full relative ${isLast ? 'h-auto' : 'lg:h-screen'}`}
            >
              {section}
            </div>
          )
        })}
      </div>
    </div>
  )
}
