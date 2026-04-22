import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

// Component for rendering a collection archive with optional filtering by categories
export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const postOrderingResult = await payload.find({
      collection: 'post-ordering',
      limit: 1,
      depth: 1,
    })

    const manualOrderedPosts = (postOrderingResult.docs?.[0]?.manualOrder || []) as any[]
    const manualOrderedIds = manualOrderedPosts.map((post) => (typeof post === 'object' ? post.id : post))

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: Math.max(0, limit - manualOrderedIds.length),
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              id: {
                not_in: manualOrderedIds,
              },
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {
            where: {
              id: {
                not_in: manualOrderedIds,
              },
            },
          }),
    })

    posts = [...manualOrderedPosts, ...fetchedPosts.docs] as Post[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    // <div id={`block-${id}`}>
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
