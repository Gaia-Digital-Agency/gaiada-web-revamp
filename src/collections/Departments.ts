import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    group: 'GAIA Content',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
