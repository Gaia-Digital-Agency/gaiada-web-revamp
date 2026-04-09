'use client'

import React, { useEffect, useRef } from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { AppButton } from '@/components/common/AppButton'
import './homepageHero.css'
import { BlurIn } from '@/components/FramerMorion/Blur-in'
import { TextFade } from '@/components/FramerMorion/TextFade'

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
  const interBubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20

      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      requestAnimationFrame(move)
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      className="section-homepage relative overflow-hidden"
      style={{
        backgroundImage: `url(${media?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="gradient-bg absolute inset-0 z-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container h-full w-full">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div ref={interBubbleRef} className="interactive"></div>
        </div>
      </div>

      <div className="container mx-auto min-h-screen flex items-center relative z-10">
        <div className="flex flex-row justify-between">
          <div className="md:col-span-6">
            <BlurIn tag="h1">{title}</BlurIn>
          </div>

          <div className="md:col-span-6 flex flex-col max-w-[350px]">
            <TextFade direction="up">
              <div>
                {children || (richText && <RichText data={richText} enableGutter={false} />)}
              </div>
              <div className="flex gap-4 mt-4">
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
