'use client'

import React, { useState, useRef } from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Plus } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAPSplitTextReveal } from '@/hooks/useGSAPSplitTextReveal'
import { useGSAPStaggerReveal } from '@/hooks/useGSAPStaggerReveal'
import { useGSAPImageParallax } from '@/hooks/useGSAPImageParallax'
import { TextFade } from '@/components/FramerMotion/TextFade'

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

const AccordionItem: React.FC<{ title: string; description: string; index: number }> = ({
  title,
  description,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const formattedIndex = (index + 1).toString().padStart(2, '0')

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group transition-colors duration-300 cursor-pointer hover:text-(--gda-brand-yellow)"
      >
        <div className="flex items-baseline gap-4 md:gap-6">
          <span
            className={cn(
              'text-[24px] md:text-[32px] font-semibold leading-[130%] transition-colors duration-300',
              isOpen
                ? 'text-(--gda-brand-black) group-hover:text-(--gda-brand-yellow)'
                : 'text-foreground group-hover:text-(--gda-brand-yellow)',
            )}
            style={{ fontFamily: 'Avenir Next, sans-serif' }}
          >
            {formattedIndex}
          </span>
          <span
            className={cn(
              'text-[24px] md:text-[32px] font-semibold leading-[130%] tracking-[0.01em] transition-colors duration-300',
              isOpen
                ? 'text-(--gda-brand-black) group-hover:text-(--gda-brand-yellow)'
                : 'text-foreground group-hover:text-(--gda-brand-yellow)',
            )}
            style={{ fontFamily: 'Avenir Next, sans-serif' }}
          >
            {title}
          </span>
        </div>
        <div className="shrink-0 ml-4">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Plus
              className={cn(
                'w-6 h-6 md:w-8 md:h-8 transition-colors duration-300',
                isOpen
                  ? 'text-(--gda-brand-black) group-hover:text-(--gda-brand-yellow)'
                  : 'text-foreground group-hover:text-(--gda-brand-yellow)',
              )}
            />
          </motion.div>
        </div>
      </button>

      {isOpen && (
        <div className="flex flex-col">
          <div className="pl-[40px] md:pl-[66px] max-w-[450px] w-full">
            <p
              className="text-[14px] leading-[22px] text-muted-foreground font-normal pb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export const AboutBlock: React.FC<AboutBlockType> = ({ title, description, image, items }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  // Use the reusable animation hooks
  // useGSAPSplitTextReveal(titleRef, {}, [title])
  useGSAPStaggerReveal(descriptionRef, { selector: 'p' }, [description])
  useGSAPImageParallax(imageWrapperRef)

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="bg-background flex justify-center items-center"
    >
      <div className="container-xl px-4 md:px-8 py-18">
        <div id="about-section-1" className="mb-20">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-[48px]">
            {/* Bagian Kiri: Image */}
            <div
              id="about-section-1-image"
              className="w-full lg:w-[708px] aspect-video lg:h-[480px] shrink-0"
            >
              {image && (
                <div ref={imageWrapperRef} className="relative w-full h-full overflow-hidden">
                  <Media
                    resource={image}
                    fill
                    className="about-us-image w-full h-full"
                    imgClassName="object-cover scale-[1.2]"
                    htmlElement={null}
                    pictureClassName="w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Bagian Kanan: Title, Description, and Accordion */}
            <div id="about-section-1-content" className="flex-1 lg:pr-10 xl:pr-[80px]">
              <TextFade direction={'up'}>
                {title && (
                  <h2 className="heading-1" ref={titleRef} id="title-about-us">
                    {title}
                  </h2>
                )}
              </TextFade>

              {description && (
                <div ref={descriptionRef} id="description-about-us">
                  <RichText data={description} enableGutter={false} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* about-section-2: Accordion List */}
        <div id="about-section-2" className="w-full max-w-[657px] mx-auto">
          {items && items.length > 0 && (
            <div className="flex flex-col">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id || index}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
