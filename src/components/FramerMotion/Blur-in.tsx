'use client'
import { motion, useInView } from 'framer-motion'
import * as React from 'react'

type HTMLTag = keyof HTMLElementTagNameMap

type BlurInProps = {
  children: React.ReactNode
  tag?: HTMLTag
}

export const BlurIn: React.FC<BlurInProps> = ({ children, tag = 'div' }) => {
  const ref = React.useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true })
  const MotionTag = motion.create(tag as any)

  return (
    <MotionTag
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 1 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1.5 }}
    >
      {children}
    </MotionTag>
  )
}
