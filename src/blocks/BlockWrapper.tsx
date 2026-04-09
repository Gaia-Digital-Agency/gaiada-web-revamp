'use client'

import React, { Fragment } from 'react'
import { motion } from 'framer-motion'

export const BlockWrapper: React.FC<{
  children: React.ReactNode
  isHomepage?: boolean
  index?: number
}> = ({ children, isHomepage, index = 0 }) => {
  if (!isHomepage) return <Fragment>{children}</Fragment>

  return (
    <motion.div
      style={{
        zIndex: (index + 1) * 10,
      }}
      className="snap-section"
    >
      {children}
    </motion.div>
  )
}
