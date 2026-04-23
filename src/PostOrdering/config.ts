import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidatePostOrdering } from './hooks/revalidatePostOrdering'

export const PostOrdering: GlobalConfig = {
  slug: 'post-ordering',
  label: 'Post Ordering',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidatePostOrdering],
  },
  fields: [
    {
      name: 'manualOrder',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Priority Posts (Drag & Drop to reorder)',
      admin: {
        className: 'drag-drop-cards',
        description: 'Select posts and drag to determine their order on the frontend. Posts not in this list will appear afterwards based on their publication date.',
      },
    },
  ],
}
