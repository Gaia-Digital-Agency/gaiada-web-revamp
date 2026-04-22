import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
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
  hooks: {
    beforeDelete: [
      async ({ id, req }) => {
        const teamMembers = await req.payload.find({
          collection: 'team',
          where: {
            department: {
              equals: id,
            },
          },
          limit: 1,
        })

        if (teamMembers.totalDocs > 0) {
          throw new APIError(
            'Cannot delete this department because there are still team members assigned to it.',
            400,
            undefined,
            true,
          )
        }
      },
    ],
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
