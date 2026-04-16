'use client'

import React, { useEffect, useRef } from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { AppButton } from '@/components/common/AppButton'
import './homepageHero.css'
import { BlurIn } from '@/components/FramerMotion/Blur-in'
import { TextFade } from '@/components/FramerMotion/TextFade'

type HomepageHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      title?: never
      buttons?: never
      media?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
      title?: Page['hero']['title']
      buttons?: any[]
      media?: any
    })

export const HomepageHero: React.FC<HomepageHeroType> = ({
  children,
  richText,
  title,
  buttons,
  media,
}) => {
  const bgStyle = media?.url
    ? {
        backgroundImage: `url(${media.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {}

  return (
    <section className="section-homepage relative overflow-hidden" style={bgStyle}>
      <div className="container mx-auto py-16 md:py-32 min-h-screen flex items-center relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10 w-full">
          <div className="md:col-span-6">
            <BlurIn tag="h1">{title}</BlurIn>
          </div>

          <div className="md:col-span-6 flex flex-col w-full md:max-w-[350px]">
            <TextFade direction="up">
              <div>
                {children || (richText && <RichText data={richText} enableGutter={false} />)}
              </div>
              <div className="flex gap-4 mt-8">
                {buttons?.map((button) => (
                  <AppButton
                    key={button.id}
                    label={button.label}
                    href={button.url}
                    variant={button.variant ?? 'default'}
                    newTab={button.newTab ?? false}
                    icon={button.icon ?? 'none'}
                    iconPosition={button.iconPosition ?? 'right'}
                  />
                ))}
              </div>
            </TextFade>
          </div>
        </div>
      </div>
    </section>
  )
}
