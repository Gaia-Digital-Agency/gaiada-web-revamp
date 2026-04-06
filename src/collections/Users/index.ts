import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  // auth: {
  //   forgotPassword: {
  //     generateEmailHTML: (args) => {
  //       // Anda bisa menulis HTML email kustom di sini
  //       return `<p>Halo, ini link reset Anda: ${args?.token}</p>`
  //     },
  //   },
  // },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
