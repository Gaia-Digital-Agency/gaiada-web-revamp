import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const postOrdering = await payload.findGlobal({
    slug: 'post-ordering',
    depth: 1,
  })

  const manualOrderedPosts = (postOrdering?.manualOrder || []) as any[]
  const manualOrderedIds = manualOrderedPosts.map((post) => (typeof post === 'object' ? post.id : post))

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    where: {
      id: {
        not_in: manualOrderedIds,
      },
    },
  })

  // Prepend manual posts only on the first page
  const allPosts = sanitizedPageNumber === 1 ? [...manualOrderedPosts, ...posts.docs] : posts.docs

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs + manualOrderedIds.length}
        />
      </div>

      <CollectionArchive posts={allPosts as any} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog Posts Page ${pageNumber || ''} | Gaia Digital Agency`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const postOrdering = await payload.findGlobal({
    slug: 'post-ordering',
    depth: 0,
  })

  const manualOrderedIds = ((postOrdering?.manualOrder || []) as any[]).map((post) =>
    typeof post === 'object' ? post.id : post,
  )

  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
    where: {
      id: {
        not_in: manualOrderedIds,
      },
    },
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
