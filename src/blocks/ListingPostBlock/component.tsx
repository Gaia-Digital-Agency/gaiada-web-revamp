import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Post } from '@/payload-types'
import { ClientListing } from './ClientListing'

export type ListingPostBlockProps = {
  title?: string
}

export const ListingPostBlockComponent: React.FC<ListingPostBlockProps> = async (props) => {
  const { title } = props
  const payload = await getPayload({ config: configPromise })

  const postOrdering = await payload.findGlobal({
    slug: 'post-ordering',
    depth: 1,
  })

  const manualOrderedPosts = (postOrdering?.manualOrder || []) as any[]
  const manualOrderedIds = manualOrderedPosts.map((post) => (typeof post === 'object' ? post.id : post))

  const initialFetch = await payload.find({
    collection: 'posts',
    limit: Math.max(0, 6 - manualOrderedIds.length),
    depth: 1,
    sort: '-publishedAt',
    where: {
      id: {
        not_in: manualOrderedIds,
      },
    },
  })

  const allPosts = [...manualOrderedPosts, ...initialFetch.docs]

  return (
    <section className="bg-white">
      <ClientListing
        initialPosts={allPosts as unknown as Post[]}
        initialHasNextPage={initialFetch.hasNextPage}
        title={title || ''}
      />
    </section>
  )
}
