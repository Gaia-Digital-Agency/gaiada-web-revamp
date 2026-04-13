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

  const initialFetch = await payload.find({
    collection: 'posts',
    limit: 6,
    depth: 1,
    sort: '-publishedAt',
  })

  return (
    <section className="bg-white">
      <ClientListing
        initialPosts={initialFetch.docs as unknown as Post[]}
        initialHasNextPage={initialFetch.hasNextPage}
        title={title || ''}
      />
    </section>
  )
}
