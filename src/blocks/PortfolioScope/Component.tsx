import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export type PortfolioScopeBlockType = {
  blockType: 'portfolioScope'
  title: string
  richText: any // Lexical richText
}

export const PortfolioScopeBlock: React.FC<
  PortfolioScopeBlockType & { disableInnerContainer?: boolean }
> = ({ title, richText, disableInnerContainer }) => {
  const content = (
    <div className="w-full bg-background pb-20">
      <div className="container">
        <div className="max-w-[800px] mx-auto flex flex-col justify-center items-center ">
          {title && <p className="text-center text-earth">{title}</p>}
          <div className="flex justify-center items-center">
            <RichText className="text-center text-earth" data={richText} enableGutter={false} />
          </div>
        </div>
      </div>
    </div>
  )

  if (disableInnerContainer) {
    return content
  }

  return (
    <section>
      <div className="w-full bg-background">{content}</div>
    </section>
  )
}
