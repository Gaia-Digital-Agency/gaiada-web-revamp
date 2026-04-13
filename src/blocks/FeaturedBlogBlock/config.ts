import type { Block } from 'payload'

export const FeaturedBlogBlock: Block = {
  slug: 'featuredBlogBlock',
  interfaceName: 'FeaturedBlogBlock',
  fields: [
    {
      name: 'featuredPost',
      type: 'relationship',
      relationTo: 'posts',
      label: 'Featured Post',
      admin: {
        description: 'Leave blank to automatically show the newest post',
      },
    },
  ],
}
