import type { Block } from 'payload'

// Configuration for the AboutBlock in Payload CMS
export const AboutBlock: Block = {
  slug: 'aboutBlock',
  imageURL: '/block-preview/about-us-intro-block.png',
  labels: {
    singular: 'About Block',
    plural: 'About Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      admin: {
        description: 'Simple caption for this section',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Commitment / Vision / Mission List',
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
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
