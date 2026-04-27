'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TextFade } from '@/components/FramerMotion/TextFade'

export interface HiringProcessProps {
  title: string
  items: {
    number: string
    title: string
    description: string
  }[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export const HiringProcessBlock: React.FC<HiringProcessProps> = ({ title, items }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <TextFade direction="up">
            <h2 className="heading-1 mb-12">{title}</h2>
          </TextFade>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[var(--gda-brand-white)] p-10"
              >
                <div className="mb-4 text-6xl font-bold text-(--gda-brand-yellow)">
                  {item.number}
                </div>
                <h3 className="heading-3 mb-2">{item.title}</h3>
                <p className="">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
