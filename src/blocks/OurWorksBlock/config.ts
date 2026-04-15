import { Block } from 'payload'

export const OurWorksBlock: Block = {
  slug: 'ourWorksBlock',
  admin: {
    images: {
      thumbnail: '/block-preview/our-works-portfolios-gallery-blocks.png',
    },
  },
  labels: {
    singular: 'Our Works Block',
    plural: 'Our Works Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
