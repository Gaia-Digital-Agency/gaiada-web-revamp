import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      required: true,
    },
  ],
}
