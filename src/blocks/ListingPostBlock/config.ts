import type { Block } from 'payload'

export const ListingPostBlock: Block = {
  slug: 'listingPostBlock',
  interfaceName: 'ListingPostBlock',
  admin: {
    images: {
      thumbnail: {
        url: '/block-preview/preview-blog-listing-cards-block.png',
        alt: 'Preview Blog Listing Cards Block',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (Optional)',
    },
  ],
}
