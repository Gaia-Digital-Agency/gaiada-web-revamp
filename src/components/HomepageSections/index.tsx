import React from 'react'
import type { Page } from '@/payload-types'
import { RenderHero } from '@/heros/RenderHero'
import { HomepageStack } from '@/components/HomepageStack'
import { Footer } from '@/Footer/Component'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ContentMediaBlock } from '@/blocks/ContentMedia/Component'
import { ServicesBlock } from '@/blocks/Services/Component'
import { PortfolioBlock } from '@/blocks/PortfolioBlock/Component'
import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { CareerBlock } from '@/blocks/CareerBlock/Component'
import { TeamBlock } from '@/blocks/TeamBlock/Component'
import { ButtonBlock } from '@/blocks/ButtonBlock/Components'
import { OurProcess } from '@/blocks/OurProcess/component'
import { ServicesDetailBlock } from '@/blocks/ServicesDetail/Component'
import { PortfolioInsightBlock } from '@/blocks/PortfolioInsight/Component'
import { PortfolioImageBanner } from '@/blocks/PortfolioImageBanner/Component'
import { OurWorksBlock } from '@/blocks/OurWorksBlock/component'

const blockComponents: Record<string, any> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  contentMedia: ContentMediaBlock,
  servicesBlock: ServicesBlock,
  portfolioBlock: PortfolioBlock,
  aboutBlock: AboutBlock,
  careerBlock: CareerBlock,
  teamBlock: TeamBlock,
  buttonBlock: ButtonBlock,
  ourProcessBlock: OurProcess,
  servicesDetail: ServicesDetailBlock,
  portfolioInsight: PortfolioInsightBlock,
  portfolioImageBanner: PortfolioImageBanner,
  ourWorksBlock: OurWorksBlock,
}

interface HomepageSectionsProps {
  hero: Page['hero']
  layout: Page['layout']
}

export const HomepageSections: React.FC<HomepageSectionsProps> = async ({ hero, layout }) => {
  const sections: React.ReactNode[] = []

  // Section 0: Hero
  sections.push(
    <div key="hero" className="w-full h-full overflow-hidden bg-background">
      <RenderHero {...hero} />
    </div>,
  )

  // Sections 1…N: Layout blocks
  if (layout && Array.isArray(layout)) {
    for (let i = 0; i < layout.length; i++) {
      const block = layout[i]
      const { blockType } = block as { blockType: string }
      const Block = blockComponents[blockType]
      if (Block) {
        sections.push(
          <div key={`block-${i}`} className="w-full h-full overflow-hidden bg-background">
            <Block {...block} disableInnerContainer />
          </div>,
        )
      }
    }
  }

  // Last section: Footer
  sections.push(
    <div key="footer" className="w-full h-full overflow-auto bg-background">
      <Footer />
    </div>,
  )

  return <HomepageStack>{sections}</HomepageStack>
}
