import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlock',
  imageURL: '/block-preview/about-us-our-process-section-block.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Team',
    },
    {
      name: 'introText',
      type: 'text',
      defaultValue: 'Hover a department · Drag to explore',
    },
  ],
}
