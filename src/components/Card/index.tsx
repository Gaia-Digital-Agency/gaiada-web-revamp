'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { AppButton } from '../common/AppButton'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props
  const { slug, categories, meta, title, heroImage } = doc || {}
  const { description, image: metaImage } = meta || {}
  const imageToUse = heroImage || metaImage
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('card overflow-hidden hover:cursor-pointer flex flex-col group', className)}
      ref={card.ref}
    >
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100 mb-6">
        {imageToUse && typeof imageToUse !== 'string' ? (
          <Media
            resource={imageToUse}
            imgClassName="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-125"
            className="w-full h-full block"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      <div className="py-6 flex flex-col h-full">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || 'Untitled category'
                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h2 className="heading-3">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h2>
          </div>
        )}
        {description && (
          <div className="mt-2 mb-8 line-clamp-3">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
        <AppButton
          label="Read more"
          href={href}
          variant="link"
          icon="arrow"
          iconPosition="right"
          className="mt-auto self-start"
        />
      </div>
    </article>
  )
}
