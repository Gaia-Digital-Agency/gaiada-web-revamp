import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'

export const metadata: Metadata = {
  title: 'Career | Gaia Digital Agency',
  description: 'Join the Gaia Digital Agency team. Explore open roles and opportunities.',
}

export default async function CareerPage() {
  const payload = await getPayload({ config: configPromise })

  // Look for a CMS page with slug "career" first — allows CMS to take over when ready
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: 'career' } },
  })

  const page = result.docs?.[0]

  if (page) {
    return (
      <article className="pt-16">
        {page.hero && <RenderHero {...page.hero} />}
        {page.layout && <RenderBlocks blocks={page.layout} />}
      </article>
    )
  }

  // Placeholder until CMS page is created
  return (
    <div className="container mx-auto py-16 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Career</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-xl">
        We&apos;re always looking for talented people to join our team. Check back soon for open
        positions.
      </p>
      <p className="text-sm text-muted-foreground">
        In the meantime, reach out to us at{' '}
        <a href="/contact" className="underline hover:text-primary transition-colors">
          our contact page
        </a>
        .
      </p>
    </div>
  )
}
