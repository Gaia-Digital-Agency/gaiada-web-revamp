import type { Block } from 'payload'

export const PortfolioImageBanner: Block = {
  slug: 'portfolioImageBanner',
  interfaceName: 'PortfolioImageBanner',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
