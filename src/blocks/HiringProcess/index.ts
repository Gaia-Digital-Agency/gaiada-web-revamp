import type { Block } from 'payload'

export const HiringProcess: Block = {
  slug: 'hiringProcess',
  labels: {
    singular: 'Hiring Process',
    plural: 'Hiring Processes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
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
