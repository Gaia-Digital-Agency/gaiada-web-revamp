'use client'
import React, { useRef } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useGSAPImageParallax } from '@/hooks/useGSAPImageParallax'
// import { useGSAPStaggerReveal } from '@/hooks/useGSAPStaggerReveal'
import { useGSAPSplitTextReveal } from '@/hooks/useGSAPSplitTextReveal'
import { useFramerMotionBlurInText } from '@/hooks/useFramerMotionBlurInText'

export type PortfolioInsightBlockType = {
  blockType: 'portfolioInsight'
  title?: string
  insights?: {
    title: string
    description: any // Lexical richText
    image: MediaType | string | number
  }[]
}

const PortfolioInsightItem: React.FC<{
  insight: {
    title: string
    description: any
    image: MediaType | string | number
  }
  index: number
}> = ({ insight, index }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useGSAPImageParallax(wrapperRef)
  useGSAPSplitTextReveal(titleRef, {}, [insight.title])
  useGSAPSplitTextReveal(descriptionRef, {}, [insight.title])

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-2.5',
        index % 2 !== 0 ? 'md:flex-row-reverse' : '',
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-y-4',
          index % 2 !== 0 ? 'md:order-2 pr-20' : 'md:order-1 pl-20',
        )}
      >
        <div ref={descriptionRef}>
          <h2>{insight.title}</h2>
          <RichText
            data={insight.description}
            enableGutter={false}
            enableProse={true}
            className=""
          />
        </div>
      </div>

      <div
        ref={wrapperRef}
        className={cn(
          'relative aspect-16/10 overflow-hidden',
          index % 2 !== 0 ? 'md:order-1' : 'md:order-2',
        )}
      >
        <Media
          resource={insight.image}
          fill
          imgClassName="object-cover scale-[1.2]"
          htmlElement={null}
          pictureClassName="w-full h-full"
        />
      </div>
    </div>
  )
}

export const PortfolioInsightBlock: React.FC<
  PortfolioInsightBlockType & { disableInnerContainer?: boolean }
> = ({ title, insights, disableInnerContainer }) => {
  const content = (
    <div className="w-full bg-background">
      <div className="w-full container bg-(--gda-brand-white)">
        <div>
          {title && <h2 className="text-center">{title}</h2>}

          <div className="flex flex-col">
            {insights?.map((insight, index) => (
              <PortfolioInsightItem key={index} insight={insight} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  console.log(disableInnerContainer)

  if (disableInnerContainer) {
    return content
  }

  return (
    <section>
      <div className="w-full bg-background">{content}</div>
    </section>
  )
}
