import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { Fragment, cache } from 'react'
import RichText from '@/components/RichText'
import { SharePost } from '@/components/SharePost'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  // Fetch 3 newest posts
  const payload = await getPayload({ config: configPromise })
  const newestPostsResult = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 3,
    sort: '-publishedAt',
    where: {
      slug: {
        not_equals: decodedSlug,
      },
    },
  })
  const newestPosts = newestPostsResult.docs

  if (!post) return <PayloadRedirects url={url} />

  return (
    <Fragment>
      <article className="pt-8 pb-8 lg:pt-16 lg:pb-16">
        <PageClient />

        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <PostHero post={post} />

        <div className="flex flex-col items-center gap-4 pt-12">
          <div className="container">
            <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
            <div className="max-w-[48rem] mx-auto">
              <SharePost />
            </div>
          </div>
        </div>
      </article>
      <section className="bg-[#C6C6C64D] py-12">
        <div className="container">
          <div className="flex flex-col">
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={newestPosts}
            />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
