import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PortfolioInsight: Block = {
  slug: 'portfolioInsight',
  labels: {
    singular: "Portfolio's Insight Block",
    plural: "Portfolio's Insight Blocks",
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'insights',
      type: 'array',
      label: 'Insights',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Insight Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Insight Description',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Insight Image',
        },
      ],
    },
  ],
}
