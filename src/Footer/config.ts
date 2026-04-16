import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkWithIcon } from '@/fields/linkWithIcon'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'formId',
      type: 'number',
      label: 'Form ID',
      defaultValue: 1,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Start a project with Gaia',
    },
    {
      name: 'navItemsWithIcon',
      label: 'Nav Items (with Icon)',
      type: 'array',
      fields: [linkWithIcon()],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabelWithIcon#RowLabel',
        },
      },
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      defaultValue: 'Copyright @2026',
    },
    {
      name: 'developedBy',
      type: 'text',
      label: 'Developed By',
      defaultValue: 'Developed by Gaia Digital Agency',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
