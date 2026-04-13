import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from './page.client'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { BlurIn } from '@/components/FramerMotion/Blur-in'
import { TextFade } from '@/components/FramerMotion/TextFade'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const portfolios = await payload.find({
    collection: 'portfolio',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return portfolios.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export function PortfolioTitle({
  title,
  description,
}: {
  title: string
  description: DefaultTypedEditorState
}) {
  return (
    <div className="bg-(--gda-brand-white)">
      <div className="flex flex-col justify-center items-center w-[700px] mx-auto py-20 gap-y-4">
        <BlurIn tag="h1">{title}</BlurIn>
        <TextFade direction="up">
          <RichText data={description} className="text-center" />
        </TextFade>
      </div>
    </div>
  )
}

export default async function PortfolioPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/portfolio/' + decodedSlug

  const portfolio = await queryPortfolioBySlug({ slug: decodedSlug })

  if (!portfolio) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="pt-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Tampilkan Hero Portfolio */}
      {portfolio.hero && <RenderHero {...portfolio.hero} />}

      {portfolio.title && portfolio.description && (
        <PortfolioTitle title={portfolio.title} description={portfolio.description} />
      )}

      {/* Tampilkan layout blocks (Content, Media, CTA, dll) */}
      {portfolio.layout && <RenderBlocks blocks={portfolio.layout} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const portfolio = await queryPortfolioBySlug({ slug: decodedSlug })

  return generateMeta({ doc: portfolio })
}

const queryPortfolioBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'portfolio',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
