import type { Block } from 'payload'

export const CareerFormBlock: Block = {
  slug: 'careerFormBlock',
  labels: {
    singular: 'Career Form Block',
    plural: 'Career Form Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Select Form',
    },
  ],
}
