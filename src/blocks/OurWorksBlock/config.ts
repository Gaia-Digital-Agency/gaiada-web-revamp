import { Block } from 'payload'

export const OurWorksBlock: Block = {
  slug: 'ourWorksBlock',
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
