import type { Block } from 'payload'
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const VisitOurOfficeBlock: Block = {
  slug: 'visitOurOffice',
  imageURL: '/block-preview/visit-our-office.png',
  labels: {
    singular: 'Visit Our Office',
    plural: 'Visit Our Offices',
  },
  interfaceName: 'VisitOurOfficeBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
}
