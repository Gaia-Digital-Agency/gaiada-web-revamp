import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Gaia Digital Agency',
  description: 'Explore our full range of digital services — branding, design, marketing, SEO, and more.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      title: true,
    },
  })

  return (
    <div className="container mx-auto py-16 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
      <p className="text-muted-foreground text-lg mb-12 max-w-xl">
        We craft premium digital experiences across branding, design, marketing, and beyond.
      </p>

      {services.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.docs.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h2>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Services coming soon.</p>
      )}
    </div>
  )
}
