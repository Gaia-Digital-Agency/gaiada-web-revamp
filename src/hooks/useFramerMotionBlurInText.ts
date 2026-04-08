'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseFramerMotionBlurInOptions {
  duration?: number
  blur?: string
  once?: boolean
  delay?: number
}

/**
 * Custom hook to provide Framer Motion props for a "Blur In" animation.
 * 
 * @param options - Animation configuration (duration, blur amount, once, delay)
 * @returns An object containing the ref and motion props to be spread onto a motion component
 */
export const useFramerMotionBlurInText = (options: UseFramerMotionBlurInOptions = {}) => {
  const {
    duration = 1.2,
    blur = '20px',
    once = true,
    delay = 0,
  } = options

  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return {
    ref,
    initial: { filter: `blur(${blur})`, opacity: 0 },
    animate: isInView ? { filter: 'blur(0px)', opacity: 1 } : {},
    transition: { duration, delay, ease: 'easeOut' },
  }
}
