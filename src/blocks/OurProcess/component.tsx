'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Variants, motion, AnimatePresence } from 'framer-motion'
import './ourProcessStyle.css'

interface Step {
  id: string
  title: string
  description: string
}

interface ContentBlockProps {
  title: string
  steps: Step[]
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const OurProcess: React.FC<ContentBlockProps> = (props) => {
  const { title, steps } = props
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setActiveStepId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!steps || steps.length === 0) return null

  return (
    <section id="our-process" className="h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-center">{title}</h2>
          </div>

          <motion.div
            ref={gridRef}
            className="our-process-wrapper grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-9"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => {
              const isActive = activeStepId === step.id

              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className={`our-process-item flex flex-col transition-all duration-300 ${
                    isActive ? 'active' : 'hover:bg-gray-50 bg-transparent'
                  }`}
                  onClick={() => setActiveStepId((prev) => (prev === step.id ? null : step.id))}
                >
                  <span className="heading-2 text-yellow mb-0">{index + 1}</span>
                  <h3>{step.title}</h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, overflow: 'visible' }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="description-wrapper"
                      >
                        <p className="description text-sm">{step.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
