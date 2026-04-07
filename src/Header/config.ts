import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { colorPickerField } from '@innovixx/payload-color-picker-field'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'subItems',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            description: 'Add sub-items to create a dropdown menu for this nav item.',
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
            colorPickerField({
              name: 'primaryColor',
              label: 'Primary Color',
            }),
          ],
          maxRows: 20,
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
