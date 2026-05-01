'use client'

import React, { useEffect, useRef, useState, Children, useCallback, memo } from 'react'
import type { gsap as GsapType } from 'gsap'

// Kick off the GSAP chunk download immediately at module evaluation time
const gsapPromise =
  typeof window !== 'undefined'
    ? import('gsap').then(async (mod) => {
        const { ScrollToPlugin } = await import('gsap/dist/ScrollToPlugin')
        mod.gsap.registerPlugin(ScrollToPlugin)
        return mod.gsap
      })
    : Promise.resolve(null)

// ─── HomepageBackground ────────────────────────────────────────────────────
const HomepageBackground = memo(function HomepageBackground() {
  const interBubbleRef = useRef<HTMLDivElement>(null)
  const leafRef = useRef<HTMLImageElement>(null)
  const leafRef2 = useRef<HTMLImageElement>(null)
  const gsapRef = useRef<typeof GsapType | null>(null)

  useEffect(() => {
    gsapPromise.then((gsap) => {
      if (gsap) gsapRef.current = gsap
    })
  }, [])

  useEffect(() => {
    let curX = 0, curY = 0, tgX = 0, tgY = 0, rafId: number
    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      if (interBubbleRef.current) interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      rafId = requestAnimationFrame(move)
    }
    const handleMouseMove = (event: MouseEvent) => { tgX = event.clientX; tgY = event.clientY }
    window.addEventListener('mousemove', handleMouseMove)
    rafId = requestAnimationFrame(move)
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(rafId) }
  }, [])

  useEffect(() => {
    const handleIndex = (e: Event) => {
      const { index, total } = (e as CustomEvent).detail
      if (!leafRef.current || !leafRef2.current || !gsapRef.current) return
      const isLast = index === total - 1
      const windowHeight = window.innerHeight

      if (isLast) {
        gsapRef.current.to(leafRef.current, { y: windowHeight + 300, x: 500, rotation: 720, scale: 0.4, opacity: 0, duration: 4.5, ease: 'power2.inOut' })
        gsapRef.current.to(leafRef2.current, { y: windowHeight + 300, x: -500, rotation: -720, scale: 0.4, opacity: 0, duration: 5, ease: 'power2.inOut' })
      } else {
        const targetY1 = (index / (total - 1)) * (windowHeight * 0.75) + windowHeight * 0.1
        gsapRef.current.to(leafRef.current, { y: 0, x: 0, top: `${targetY1}px`, left: `${index % 2 === 0 ? 80 : 20}%`, rotation: index * 150, scale: 1 + Math.sin(index * 2) * 0.2, opacity: 1, duration: 4, ease: 'power2.out' })
        const targetY2 = ((index + 0.4) / total) * (windowHeight * 0.65) + windowHeight * 0.15
        gsapRef.current.to(leafRef2.current, { y: 0, x: 0, top: `${targetY2}px`, left: `${index % 2 === 0 ? 15 : 85}%`, rotation: index * -180, scale: 0.8 + Math.cos(index * 1.5) * 0.15, opacity: 0.8, duration: 5, ease: 'power2.out' })
      }
    }
    window.addEventListener('homepage-stack-index', handleIndex)
    return () => window.removeEventListener('homepage-stack-index', handleIndex)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="gradient-bg absolute inset-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></defs></svg>
        <div className="gradients-container h-full w-full"><div className="g1"></div><div className="g2"></div><div className="g3"></div><div className="g4"></div><div className="g5"></div><div ref={interBubbleRef} className="interactive"></div></div>
      </div>
      <img ref={leafRef} src="/leaf2.png" alt="" className="hidden lg:block fixed w-24 h-auto pointer-events-none z-[100]" style={{ top: '5%', left: '80%', opacity: 0 }} />
      <img ref={leafRef2} src="/leaf1.png" alt="" className="hidden lg:block fixed w-20 h-auto pointer-events-none z-[100]" style={{ top: '15%', left: '10%', opacity: 0 }} />
    </div>
  )
})

interface HomepageStackProps {
  children: React.ReactNode
}

export const HomepageStack: React.FC<HomepageStackProps> = ({ children }) => {
  const sections = Children.toArray(children)
  const total = sections.length
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const isAnimating = useRef(false)
  const gsapRef = useRef<typeof GsapType | null>(null)

  useEffect(() => {
    gsapPromise.then((gsap) => {
      if (gsap) gsapRef.current = gsap
    })
  }, [])

  const isResponsive = useCallback(() => {
    return typeof window !== 'undefined' && (window.innerWidth < 1024 || window.innerHeight < 768)
  }, [])

  const goTo = useCallback((index: number) => {
    if (isResponsive() || isAnimating.current || !containerRef.current || index < 0 || index >= total) return
    const targetElement = sectionRefs.current[index]
    if (targetElement) {
      isAnimating.current = true
      setCurrentIndex(index)
      const event = new CustomEvent('homepage-stack-index', { detail: { index, total } })
      window.dispatchEvent(event)
      gsapRef.current?.to(containerRef.current, {
        scrollTo: { y: targetElement, autoKill: false },
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => { isAnimating.current = false }
      })
    }
  }, [total, isResponsive])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isResponsive()) return
      e.preventDefault()
      if (isAnimating.current) return
      if (e.deltaY > 30) goTo(currentIndex + 1)
      else if (e.deltaY < -30) goTo(currentIndex - 1)
    }
    const container = containerRef.current
    if (container) container.addEventListener('wheel', handleWheel, { passive: false })
    return () => { if (container) container.removeEventListener('wheel', handleWheel) }
  }, [currentIndex, goTo, isResponsive])

  return (
    <div ref={containerRef} className="w-full h-screen overflow-y-auto lg:overflow-hidden bg-background relative">
      <HomepageBackground />
      <div className="relative z-10 w-full h-full">
        {sections.map((section, i) => {
          const isLast = i === total - 1
          return (
            <div
              key={i}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              className={`w-full relative flex items-center justify-center ${
                isLast ? 'h-auto' : 'h-screen'
              }`}
            >
              {section}
            </div>
          )
        })}
      </div>
    </div>
  )
}
