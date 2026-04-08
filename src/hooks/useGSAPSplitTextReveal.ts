'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject, useCallback } from 'react'
import SplitType from 'split-type'

interface UseGSAPSplitTextRevealOptions {
  type?: 'lines' | 'words' | 'chars'
  yPercent?: number
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
 * Custom hook to create a text reveal animation using GSAP and SplitType.
 * It automatically handles splitting, masking (overflow-hidden), and ScrollTrigger.
 * 
 * @param targetRef - React ref of the element to animate
 * @param options - Animation and ScrollTrigger configuration
 * @param deps - Dependency array to re-run the split logic (e.g. when text content changes)
 */
export const useGSAPSplitTextReveal = (
  targetRef: RefObject<HTMLElement | null>,
  options: UseGSAPSplitTextRevealOptions = {},
  deps: React.DependencyList = [],
) => {
  const {
    type = 'lines',
    yPercent = 120,
    stagger = 0.1,
    duration = 1,
    ease = 'power3.out',
    scrollTriggerOptions = {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
      markers: false,
    },
  } = options

  useGSAP(
    () => {
      const element = targetRef.current
      if (!element) return

      gsap.registerPlugin(ScrollTrigger)

      let split: SplitType

      const createAnimation = () => {
        // 1. Cleanup previous split
        if (split) split.revert()

        // 2. Initial split
        split = new SplitType(element, {
          types: type,
          lineClass: 'split-line',
          wordClass: 'split-word',
          charClass: 'split-char',
        })

        // 3. Masking effect: wrap content of each split part into .split-inner
        // This allows the text to "emerge" from an overflow-hidden container
        const targets = type === 'lines' ? split.lines : type === 'words' ? split.words : split.chars

        targets?.forEach((part) => {
          const wrapper = document.createElement('div')
          wrapper.classList.add('split-inner')
          wrapper.style.display = 'block'
          wrapper.innerHTML = part.innerHTML
          part.innerHTML = ''
          part.appendChild(wrapper)
        })

        // 4. Animate the inner wrappers
        const inners = element.querySelectorAll('.split-inner')

        gsap.from(inners, {
          yPercent: yPercent,
          stagger: stagger,
          duration: duration,
          ease: ease,
          scrollTrigger: {
            trigger: element,
            ...scrollTriggerOptions,
          },
        })
      }

      // Initial run
      createAnimation()

      // Handle resize to ensure split is always accurate
      const handleResize = () => {
        createAnimation()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (split) split.revert()
      }
    },
    { scope: targetRef, dependencies: deps as unknown[] },
  )
}
