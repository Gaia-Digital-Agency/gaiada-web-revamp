import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { linkWithIcon } from '@/fields/linkWithIcon'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Non Homepage Hero',
          value: 'nonHomepageHero',
        },
        {
          label: 'Homepage Hero',
          value: 'homepageHero',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'nonHomepageHero' || type === 'homepageHero',
        description: 'Title',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => type !== 'nonHomepageHero',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'giantTitleColor',
      type: 'text',
      label: 'Giant Title Color',
      admin: {
        condition: (_, { type } = {}) => type === 'nonHomepageHero' && type !== 'homepageHero',
        description:
          'Manual color input for the giant title (e.g. #ffffff for white , #ffc22c for yellow)',
      },
    },
    {
      name: 'gradientColor',
      type: 'select',
      label: 'Gradient Color',
      defaultValue: 'yellow',
      admin: {
        condition: (_, { type } = {}) => type === 'nonHomepageHero' && type !== 'homepageHero',
      },
      options: [
        { label: 'Yellow', value: 'yellow' },
        { label: 'Orange', value: 'orange' },
        { label: 'Blue', value: 'blue' },
        { label: 'White', value: 'white' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      minRows: 1,
      admin: {
        condition: (_, { type } = {}) => type === 'nonHomepageHero' || type === 'homepageHero',
      },
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
          name: 'icon',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Arrow', value: 'arrow' },
            { label: 'Search', value: 'search' },
          ],
        },
        {
          name: 'iconPosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.icon !== 'none',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Link', value: 'link' },
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
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => type !== 'nonHomepageHero' && type !== 'homepageHero',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'nonHomepageHero', 'homepageHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
