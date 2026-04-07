import type { Block } from 'payload'

export const ServicesDetailBlock: Block = {
  slug: 'servicesDetail',
  labels: {
    singular: 'Services Detail Block',
    plural: 'Services Detail Blocks',
  },
  fields: [
    {
      name: 'intro',
      type: 'group',
      label: 'Introduction Section',
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'subServices',
      type: 'array',
      label: 'Sub Services',
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
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
