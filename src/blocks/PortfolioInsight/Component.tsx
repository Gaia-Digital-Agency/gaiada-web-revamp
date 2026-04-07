import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type PortfolioInsightBlockType = {
  blockType: 'portfolioInsight'
  title?: string
  insights?: {
    title: string
    description: any // Lexical richText
    image: MediaType | string | number
  }[]
}

export const PortfolioInsightBlock: React.FC<PortfolioInsightBlockType> = ({ title, insights }) => {
  return (
    <div className="bg-(--gda-brand-white)">
      <div className="container">
        {title && <h2 className="text-center">{title}</h2>}

        <div className="flex flex-col">
          {insights?.map((insight, index) => (
            <div
              key={index}
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
                <h2>{insight.title}</h2>
                <RichText
                  data={insight.description}
                  enableGutter={false}
                  enableProse={true}
                  className="prose-lg text-muted-foreground"
                />
              </div>

              <div
                className={cn(
                  'relative aspect-[16/10] overflow-hidden',
                  index % 2 !== 0 ? 'md:order-1' : 'md:order-2',
                )}
              >
                <Media resource={insight.image} fill imgClassName="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
