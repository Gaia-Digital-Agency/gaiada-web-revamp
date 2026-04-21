import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'map',
  fields: [
    {
      name: 'location',
      type: 'text',
      required: false,
      label: 'Location / Address',
    },
    {
      name: 'embedHtml',
      type: 'textarea',
      required: false,
      label: 'Embed HTML',
      admin: {
        description: 'Optional: paste full Google Maps iframe embed code. If present, it will be used instead of the location field.',
      },
    },
  ],
  interfaceName: 'MapBlock',
}
