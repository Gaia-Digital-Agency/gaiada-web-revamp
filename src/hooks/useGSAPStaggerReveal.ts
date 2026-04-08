'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject } from 'react'

interface UseGSAPStaggerRevealOptions {
  selector?: string
  y?: number
  opacity?: number
  stagger?: number
  duration?: number
  ease?: string
  scrollTriggerOptions?: {
    start?: string | number
    end?: string | number
    scrub?: boolean | number
    markers?: boolean
    toggleActions?: string
  }
}

/**
 * Custom hook to animate children elements with a staggered reveal effect.
 * Perfect for descriptions (revealing paragraphs) or lists.
 *
 * @param containerRef - React ref of the container element
 * @param options - Animation and ScrollTrigger configuration
 * @param deps - Dependency array to re-run the logic
 */
export const useGSAPStaggerReveal = (
  containerRef: RefObject<HTMLElement | null>,
  options: UseGSAPStaggerRevealOptions = {},
  deps: React.DependencyList = [],
) => {
  const {
    selector = 'p', // Target elemen apa saja di dalam kontainer (default: paragraph)
    y = -100, // Muncul dari atas ke bawah (seperti di AboutBlock lama)
    opacity = 0,
    stagger = 0.15,
    duration = 1.2,
    ease = 'power4.out',
    scrollTriggerOptions = {
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      markers: false,
    },
  } = options

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      gsap.registerPlugin(ScrollTrigger)

      const items = gsap.utils.toArray(selector, container)

      if (items.length > 0) {
        gsap.from(items, {
          y: y,
          opacity: opacity,
          stagger: stagger,
          duration: duration,
          ease: ease,
          scrollTrigger: {
            trigger: container,
            ...scrollTriggerOptions,
          },
        })
      }
    },
    { scope: containerRef, dependencies: deps as unknown[] },
  )
}
