import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

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
      ],
      required: true,
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
      name: 'title',
      type: 'text',
      label: 'Giant Title',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'nonHomepageHero',
        description: 'Teks raksasa untuk foreground (contoh: Branding)',
      },
    },
    {
      name: 'giantTitleColor',
      type: 'text',
      label: 'Giant Title Color',
      admin: {
        condition: (_, { type } = {}) => type === 'nonHomepageHero',
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
        condition: (_, { type } = {}) => type === 'nonHomepageHero',
      },
      options: [
        { label: 'Yellow', value: 'yellow' },
        { label: 'Orange', value: 'orange' },
        { label: 'Blue', value: 'blue' },
        { label: 'White', value: 'white' },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => type !== 'nonHomepageHero',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'nonHomepageHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
