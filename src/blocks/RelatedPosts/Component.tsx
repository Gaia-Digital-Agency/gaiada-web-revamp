'use client'
import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:pb-0 lg:snap-none">
        {docs?.map((doc, index) => {
          if (typeof doc !== 'object') return null

          return (
            <div key={index} className="shrink-0 w-[80vw] md:w-[45vw] lg:w-auto snap-start">
              <Card doc={doc} relationTo="posts" showCategories />
            </div>
          )
        })}
      </div>
    </div>
  )
}
