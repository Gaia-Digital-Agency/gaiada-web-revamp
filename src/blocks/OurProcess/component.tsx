'use client'

import React from 'react'
import { Variants, motion } from 'framer-motion'

interface Step {
  id: string
  title: string
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

  if (!steps || steps.length === 0) return null

  return (
    <section className="h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-center">{title}</h2>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div key={step.id} variants={itemVariants} className="flex flex-col gap-2">
                <h3 className="heading-2 text-yellow mb-0">{index + 1}</h3>
                <p className="">{step.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
