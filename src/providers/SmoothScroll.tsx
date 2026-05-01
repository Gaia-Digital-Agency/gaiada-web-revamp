'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    // Disable Lenis on the homepage — HomepageStack has its own GSAP scroll
    if (pathname === '/') return

    // Override CSS scroll-behavior: smooth while Lenis is active.
    // Both running simultaneously causes double-easing / jank.
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      // Restore original scroll-behavior on cleanup
      html.style.scrollBehavior = prev
    }
  }, [pathname])

  return <>{children}</>
}
