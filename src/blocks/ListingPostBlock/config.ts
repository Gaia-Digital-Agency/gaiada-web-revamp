import type { Block } from 'payload'

export const ListingPostBlock: Block = {
  slug: 'listingPostBlock',
  interfaceName: 'ListingPostBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (Optional)',
    },
  ],
}
