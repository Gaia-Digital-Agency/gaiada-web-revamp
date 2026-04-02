import { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  labels: {
    singular: 'Button Block',
    plural: 'Button Blocks',
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      minRows: 1,
      fields: [
        {
          name: 'size',
          type: 'select',
          label: 'Column Size',
          defaultValue: 'full',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: '1/2 Width', value: 'half' },
            { label: '1/3 Width', value: 'oneThird' },
            { label: '2/3 Width', value: 'twoThirds' },
          ],
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'Buttons',
          minRows: 1,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' },
                { label: 'Ghost', value: 'ghost' },
                { label: 'Link', value: 'link' },
                { label: 'Destructive', value: 'destructive' },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
