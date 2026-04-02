'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Plus } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'

export type AboutBlockType = {
  blockType: 'aboutBlock'
  title?: string
  description?: any
  image?: MediaType
  items?: {
    title: string
    description: string
    id?: string
  }[]
}

const AccordionItem: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group transition-colors duration-300"
      >
        <span
          className={cn(
            'text-[32px] font-semibold leading-[130%] tracking-[0.01em] transition-colors duration-300',
            isOpen ? 'text-[#FFC22C]' : 'text-[#1A1A1B] group-hover:text-[#FFC22C]',
          )}
          style={{ fontFamily: 'Avenir Next, sans-serif' }}
        >
          {title}
        </span>
        <div className="shrink-0 ml-4">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Plus
              className={cn(
                'w-8 h-8 transition-colors duration-300',
                isOpen ? 'text-[#FFC22C]' : 'text-[#1A1A1B] group-hover:text-[#FFC22C]',
              )}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className="text-[14px] leading-[22px] text-[#6D758F] font-normal pb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const AboutBlock: React.FC<AboutBlockType> = ({ title, description, image, items }) => {
  return (
    <div id="about-us" className="container px-0!">
      <div id="about-section-1" className="mb-20">
        <div className="flex flex-col md:flex-row items-start gap-[48px]">
          {/* Bagian Kiri: Image */}
          <div id="about-section-1-image" className="w-full md:w-[708px] md:h-[480px] shrink-0">
            {image && (
              <div className="relative w-full h-full overflow-hidden">
                <Media resource={image} fill className="object-cover" />
              </div>
            )}
          </div>

          {/* Bagian Kanan: Title, Description, and Accordion */}
          <div id="about-section-1-content" className="flex-1 pr-[180px]">
            {title && (
              <h2 className="text-[56px] font-brand font-bold text-black leading-tight mb-6">
                {title}
              </h2>
            )}

            {description && (
              <RichText
                data={description}
                enableGutter={false}
                className="prose-lg max-w-none font-roboto font-normal text-black leading-[160%] tracking-[0.01em] mb-12"
              />
            )}
          </div>
        </div>
      </div>
      {/* about-section-2-content: Accordion List */}
      <div id="about-section-2-content" className="w-full max-w-[657px] mx-auto">
        {items && items.length > 0 && (
          <div className="flex flex-col">
            {items.map((item, index) => (
              <AccordionItem
                key={item.id || index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
