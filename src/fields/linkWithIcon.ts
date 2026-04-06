import type { Field } from 'payload'

export const linkWithIcon = (): Field => {
  return {
    name: 'link',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
        label: 'Label',
      },
      {
        name: 'url',
        type: 'text',
        required: true,
        label: 'URL',
      },
      {
        name: 'icon',
        type: 'select',
        label: 'Icon',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Email', value: 'email' },
          { label: 'Map', value: 'map' },
        ],
        defaultValue: 'none',
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Open in new tab',
        defaultValue: false,
      },
    ],
  }
}
