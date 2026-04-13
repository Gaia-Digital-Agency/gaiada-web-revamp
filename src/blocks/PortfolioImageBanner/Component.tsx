'use client'
import React, { useRef } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { PortfolioImageBanner as PortfolioImageBannerProps } from '@/payload-types'
import { useGSAPImageParallax } from '@/hooks/useGSAPImageParallax'

type Props = PortfolioImageBannerProps & {
  className?: string
}

export const PortfolioImageBanner: React.FC<Props> = (props) => {
  const { image, className } = props

  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAPImageParallax(wrapperRef)

  return (
    <section>
      <div className={cn('w-full flex justify-center py-0 bg-background', className)}>
        <div
          ref={wrapperRef}
          className="w-full max-w-[1440px] relative overflow-hidden py-20"
          style={{
            height: '532.033203125px',
            opacity: 1,
            transform: 'rotate(0deg)',
            marginTop: '-0.03px',
          }}
        >
          {image && typeof image === 'object' && (
            <Media
              resource={image}
              imgClassName="w-full h-full object-cover"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  )
}
