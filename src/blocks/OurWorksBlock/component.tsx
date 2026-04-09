import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { OurWorksBlockClient } from './OurWorksBlockClient'

interface OurWorksBlockProps {
  title: string
}

export const OurWorksBlock: React.FC<OurWorksBlockProps> = async ({ title }) => {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch all published services for the sub-menu
  const servicesData = await payload.find({
    collection: 'services',
    limit: 100,
    select: {
      title: true,
      slug: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Fetch more portfolio items for interactive filtering (e.g. 100)
  const portfolioData = await payload.find({
    collection: 'portfolio',
    limit: 100,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Transform data for the client component
  const services = servicesData.docs.map(doc => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
  }))

  const portfolioItems = portfolioData.docs.map((doc: any) => ({
    title: doc.title,
    slug: doc.slug,
    featuredImage: doc.featuredImage,
    services: doc.services?.map((s: any) => ({
      id: typeof s === 'object' ? s.id : s,
      title: typeof s === 'object' ? s.title : '',
    })) || [],
  }))

  return (
    <OurWorksBlockClient 
      title={title}
      services={services}
      portfolioItems={portfolioItems}
    />
  )
}
