import { Block } from 'payload'

export const OurProcessBlock: Block = {
  slug: 'ourProcessBlock',
  admin: {
    images: {
      thumbnail: '/block-preview/our-process-section-block.png',
    },
  },
  labels: {
    singular: 'Our Process Block',
    plural: 'Our Process Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
