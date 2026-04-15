import type { Block } from 'payload'

export const PortfolioImageBanner: Block = {
  slug: 'portfolioImageBanner',
  interfaceName: 'PortfolioImageBanner',
  imageURL: '/block-preview/portfolio-banner-block.png',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
