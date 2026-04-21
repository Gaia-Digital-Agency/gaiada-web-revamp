import React, { Fragment } from 'react'
import { BlockWrapper } from './BlockWrapper'

import type { Page, Service } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ContentMediaBlock } from '@/blocks/ContentMedia/Component'
// import { ServicesBlock } from '@/blocks/Services/Component'
import { PortfolioBlock } from '@/blocks/PortfolioBlock/Component'
import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { CareerBlock } from '@/blocks/CareerBlock/Component'
import { CareerFormBlock } from '@/blocks/CareerFormBlock/Component'
import { TeamBlock } from '@/blocks/TeamBlock/Component'
import { ButtonBlock } from '@/blocks/ButtonBlock/Components'
import { OurProcess } from '@/blocks/OurProcess/component'
import { ServicesDetailBlock } from '@/blocks/ServicesDetail/Component'
import { PortfolioInsightBlock } from '@/blocks/PortfolioInsight/Component'
import { PortfolioImageBanner } from '@/blocks/PortfolioImageBanner/Component'
import { OurWorksBlock } from '@/blocks/OurWorksBlock/component'
import { FeaturedBlogBlockComponent } from '@/blocks/FeaturedBlogBlock/component'
import { ListingPostBlockComponent } from '@/blocks/ListingPostBlock/component'
import { HiringProcessBlock } from '@/blocks/HiringProcess/Component'
import { MapBlock } from '@/blocks/MapBlock/Component'
import { VisitOurOfficeBlock } from '@/blocks/VisitOurOfficeBlock/Component'

// Mapping of block slugs to their corresponding React components

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  contentMedia: ContentMediaBlock,
  // servicesBlock: ServicesBlock,
  portfolioBlock: PortfolioBlock,
  aboutBlock: AboutBlock,
  careerBlock: CareerBlock,
  careerFormBlock: CareerFormBlock,
  teamBlock: TeamBlock,
  buttonBlock: ButtonBlock,
  ourProcessBlock: OurProcess,
  servicesDetail: ServicesDetailBlock,
  portfolioInsight: PortfolioInsightBlock,
  portfolioImageBanner: PortfolioImageBanner,
  ourWorksBlock: OurWorksBlock,
  featuredBlogBlock: FeaturedBlogBlockComponent,
  listingPostBlock: ListingPostBlockComponent,
  hiringProcess: HiringProcessBlock,
  map: MapBlock,
  visitOurOffice: VisitOurOfficeBlock,
}

// Component that iterates through and renders an array of page layout blocks
export const RenderBlocks: React.FC<{
  blocks: (Page['layout'][0] | NonNullable<Service['layout']>[0])[]
  isHomepage?: boolean
  parentSlug?: string
}> = (props) => {
  const { blocks, isHomepage, parentSlug } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isEven = index % 2 === 0

              return (
                <BlockWrapper key={index} index={index + 1} isHomepage={isHomepage}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} parentSlug={parentSlug} disableInnerContainer />
                </BlockWrapper>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
