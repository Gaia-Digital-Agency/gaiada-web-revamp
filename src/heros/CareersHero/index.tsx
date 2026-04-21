'use client'

import type { Media, Page } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { AppButton } from '@/components/common/AppButton'
import RichText from '@/components/RichText'
import { TextFade } from '@/components/FramerMotion/TextFade'
import { motion } from 'framer-motion'

type HeroButtons = NonNullable<Page['hero']['buttons']>

export interface CareerHeroProps {
  title: string
  richText?: any
  buttons?: HeroButtons
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

export const CareersHero: React.FC<CareerHeroProps> = ({ title, richText, buttons }) => {
  return (
    <section className="bg-white py-20 pt-40">
      <div className="container mx-auto grid gap-12 items-center">
        <div className="flex flex-col">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <TextFade direction="up">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            </TextFade>
            {richText && (
              <div className="text-lg mb-8">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
            {buttons && (
              <div className="flex gap-4">
                {buttons.map((button) => (
                  <AppButton
                    key={button.id || button.url}
                    label={button.label}
                    href={button.url}
                    variant={button.variant ?? 'default'}
                    newTab={button.newTab ?? false}
                    icon={button.icon ?? 'none'}
                    iconPosition={button.iconPosition ?? 'right'}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
