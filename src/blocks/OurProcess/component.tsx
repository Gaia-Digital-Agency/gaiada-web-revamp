'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Variants, motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const scrollLeft = gridRef.current.scrollLeft
        const itemWidth = gridRef.current.offsetWidth
        setActiveIndex(Math.round(scrollLeft / itemWidth))
      }
    }

    const ref = gridRef.current
    ref?.addEventListener('scroll', handleScroll)
    return () => ref?.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStepKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
    stepId: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveStepId((prev) => (prev === stepId ? null : stepId))
    } else if (e.key === 'ArrowRight' && index < steps.length - 1) {
      e.preventDefault()
      itemRefs.current[index + 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      itemRefs.current[index - 1]?.focus()
    }
  }

  if (!steps || steps.length === 0) return null

  return (
    <section id="our-process" className="lg:h-screen flex items-center py-16 lg:py-0">
      <div className="container mx-0">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-center">{title}</h2>
          </div>

          <motion.div
            ref={gridRef}
            className="our-process-wrapper flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-0 md:gap-9 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide md:pb-0 px-0 md:px-0"
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
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  variants={itemVariants}
                  className={`our-process-item flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300 flex-shrink-0 w-full md:w-auto snap-center ${
                    isActive ? 'active' : 'hover:bg-gray-50 bg-transparent'
                  }`}
                  onClick={() => setActiveStepId((prev) => (prev === step.id ? null : step.id))}
                  onKeyDown={(e) => handleStepKeyDown(e, index, step.id)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                >
                  <span className="heading-2 text-yellow mb-0">{index + 1}</span>
                  <div className="flex items-center gap-2 w-full justify-center">
                    <h3 className="mb-0">
                      {step.title}
                      {isActive ? (
                        <Minus className="w-4 h-4 ml-2 mb-0.5 hidden md:inline-block" />
                      ) : (
                        <Plus className="w-4 h-4 ml-2 mb-0.5 hidden md:inline-block" />
                      )}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {(isActive || isMobile) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, overflow: 'visible' }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="description-wrapper w-full flex justify-center"
                      >
                        <p className="description text-sm px-8">{step.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="pagination-bullet-wrapper flex justify-center gap-2 md:hidden">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`pagination-bullet w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-[var(--gda-brand-yellow)]' : 'bg-[#D9D9D9]'
                }`}
                tabIndex={0}
                aria-label={`Go to step ${index + 1}`}
                onClick={() => {
                  if (gridRef.current) {
                    const itemWidth = gridRef.current.offsetWidth
                    gridRef.current.scrollTo({
                      left: index * itemWidth,
                      behavior: 'smooth',
                    })
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
