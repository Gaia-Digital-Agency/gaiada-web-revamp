import React from 'react'
import type { Post } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/components/Media'
import { AppButton } from '@/components/common/AppButton'

export type FeaturedBlogBlockProps = {
  title?: string
  featuredPost?: Post | string | null
}

export const FeaturedBlogBlockComponent: React.FC<FeaturedBlogBlockProps> = async (props) => {
  const { title, featuredPost } = props
  const payload = await getPayload({ config: configPromise })

  let post: Post | null = null

  if (featuredPost) {
    if (typeof featuredPost === 'string') {
      const fetched = await payload.findByID({
        collection: 'posts',
        id: featuredPost,
        depth: 1,
      })
      post = fetched as unknown as Post
    } else {
      post = featuredPost as Post
    }
  } else {
    const fetched = await payload.find({
      collection: 'posts',
      limit: 1,
      depth: 1,
      sort: '-publishedAt',
    })
    post = fetched.docs[0] as unknown as Post
  }

  if (!post) {
    return null
  }

  // extract category names
  const categories = post.categories
    ?.map((c) => {
      if (typeof c === 'object' && c !== null) {
        return (c as any).title
      }
      return 'Uncategorized'
    })
    .join(', ')

  return (
    <section className="bg-[#f0f0f0] flex justify-center py-16 pt-0 lg:pt-16">
      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 mt-auto">
        <div className="aspect-4/3 lg:aspect-auto w-full h-full min-h-[400px] overflow-hidden relative">
          {post.heroImage && typeof post.heroImage === 'object' ? (
            <Media
              resource={post.heroImage}
              className="w-full h-full object-cover absolute inset-0"
              imgClassName="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
        <div className="p-4 py-12 pb-0 md:px-8 md:pb-0 lg:p-24 flex flex-col justify-center items-start text-[#222]">
          <h2 className="heading-2">{title || post.title}</h2>
          <p className="text-earth mb-8 leading-relaxed max-w-xl text-lg">
            {post.meta?.description || 'Read this featured article...'}
          </p>
          {categories && (
            <div className="text-sm text-earth mb-10 italic tracking-wider">
              in <span className="underline uppercase">{categories}</span>
            </div>
          )}

          <AppButton
            variant="default"
            label="READ MORE"
            href={`/posts/${post.slug}`}
            icon="arrow"
            iconPosition="right"
          />
        </div>
      </div>
    </section>
  )
}
