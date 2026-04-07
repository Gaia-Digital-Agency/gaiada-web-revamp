import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Media } from '@/components/Media'
import Link from 'next/link'

// Type definition for the PortfolioBlock component properties
export type PortfolioBlockType = {
  blockType: 'portfolioBlock'
  title?: string
  description?: string
}

// Component that renders the Portfolio section with projects fetched from the CMS
export const PortfolioBlock: React.FC<PortfolioBlockType> = async ({
  title,
  description,
}) => {
  const payload = await getPayload({ config: configPromise })
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

  return (
    <div className="container py-24">
      <div className="max-w-2xl mb-16">
        {title && <h2 className="text-4xl font-bold mb-6 tracking-tight">{title}</h2>}
        {description && <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      <div className="flex flex-col gap-32">
        {portfolioItems.docs.map((item: any, i: number) => {
          const services = item.services?.map((s: any) => s.title).join(', ')
          const thumbnail = item.hero?.media

          return (
            <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`space-y-6 ${i % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                {services && (
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">
                    {services}
                  </span>
                )}
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                
                <Link 
                  href={`/portfolio/${item.slug}`}
                  className="inline-flex items-center text-lg font-medium hover:underline underline-offset-4 decoration-2"
                >
                  View Case Study
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <Link 
                href={`/portfolio/${item.slug}`}
                className={`group block aspect-[4/3] relative overflow-hidden rounded-2xl bg-muted ${i % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}
              >
                <Media 
                  resource={thumbnail} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
