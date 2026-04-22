import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { revalidatePostOrdering } from '../PostOrdering/hooks/revalidatePostOrdering'

export const PostOrdering: CollectionConfig = {
  slug: 'post-ordering',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidatePostOrdering],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Main Blog Order',
    },
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
