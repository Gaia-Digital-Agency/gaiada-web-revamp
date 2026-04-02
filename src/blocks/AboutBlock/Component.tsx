import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Media } from '@/components/Media'

// Type definition for the AboutBlock component properties
export type AboutBlockType = {
  blockType: 'aboutBlock'
  title?: string
}

// React component that renders the About section with items fetched from the CMS
export const AboutBlock: React.FC<AboutBlockType> = async ({
  title,
}) => {
  const payload = await getPayload({ config: configPromise })
  const aboutItems = await payload.find({
    collection: 'about-items',
    limit: 100,
    sort: 'createdAt',
  })

  return (
    <div className="container">
      {title && <h2 className="text-3xl font-bold mb-12">{title}</h2>}
      <div className="flex flex-col gap-24">
        {aboutItems.docs.map((item: any, i: number) => (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 !== 0 ? 'md:order-2' : 'md:order-1'}>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-lg text-muted-foreground">{item.description}</p>
            </div>
            <div className={`aspect-video relative overflow-hidden rounded-lg ${i % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
              <Media resource={item.image} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
