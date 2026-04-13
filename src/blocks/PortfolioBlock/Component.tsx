import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PortfolioGrid } from './PortfolioGrid'
import type { Portfolio, Service } from '@/payload-types'

// Type definition for the PortfolioBlock component properties
export type PortfolioBlockType = {
  blockType: 'portfolioBlock'
  title?: string
  description?: string
}

// Component that renders the Portfolio section with projects fetched from the CMS
export const PortfolioBlock: React.FC<PortfolioBlockType> = async ({ title, description }) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch portfolio items
  const portfolioItems = await payload.find({
    collection: 'portfolio',
    limit: 100,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Fetch all services to populate the filter sidebar
  const servicesData = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'title',
  })

  const items = portfolioItems.docs as unknown as Portfolio[]
  const services = servicesData.docs as unknown as Service[]

  return (
    <section className="bg-white text-[#111] overflow-hidden">
      <div className="max-w-[1312px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {(title || description) && (
          <div className="max-w-3xl mb-24">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-foreground uppercase">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {description}
              </p>
            )}
          </div>
        )}

        <PortfolioGrid items={items} services={services} />
      </div>
    </section>
  )
}
