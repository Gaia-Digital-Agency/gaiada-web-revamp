'use client'

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { AppButton } from '@/components/common/AppButton'
import { useSearchParams } from 'next/navigation'

type Props = {
  initialPosts: Post[]
  initialHasNextPage: boolean
  title?: string
}

const ListingContent: React.FC<Props> = ({ initialPosts, initialHasNextPage }) => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const cat = searchParams.get('cat')
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [isLoading, setIsLoading] = useState(false)
  const isFirstMount = useRef(true)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchPosts = useCallback(
    async (
      pageNum: number,
      searchQ?: string | null,
      categoryID?: string | null,
      isLoadMore = false,
    ) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const controller = new AbortController()
      abortControllerRef.current = controller

      setIsLoading(true)
      try {
        const basePath = '/'
        let url = `${basePath}/api/posts?limit=6&page=${pageNum}&sort=-publishedAt&depth=1&select[title]=true&select[slug]=true&select[meta]=true`

        const conditions: string[] = []

        if (searchQ) {
          conditions.push(`where[or][0][title][like]=${encodeURIComponent(searchQ)}`)
          conditions.push(`where[or][1][meta.description][like]=${encodeURIComponent(searchQ)}`)
        }

        if (categoryID) {
          url += `&where[categories][contains]=${categoryID}`
        }

        if (conditions.length > 0) {
          url += `&${conditions.join('&')}`
        }

        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const data = await res.json()

        if (isLoadMore) {
          setPosts((prev) => [...prev, ...data.docs])
        } else {
          setPosts(data.docs)
        }

        setPage(data.page)
        setHasNextPage(data.hasNextPage)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching posts:', err)
        }
      } finally {
        if (abortControllerRef.current === controller) {
          setIsLoading(false)
        }
      }
    },
    [],
  )

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      if (q || cat) fetchPosts(1, q, cat)
      return
    }
    fetchPosts(1, q, cat)

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [q, cat, fetchPosts])

  const loadMore = async () => {
    if (isLoading || !hasNextPage) return
    fetchPosts(page + 1, q, cat, true)
  }

  return (
    <div className="container py-16">
      <div
        className={`transition-opacity duration-300 ${isLoading && posts.length > 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
      >
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col group">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block w-full aspect-video bg-gray-100 overflow-hidden mb-6 relative"
                >
                  {post.meta?.image && typeof post.meta.image === 'object' ? (
                    <Media
                      resource={post.meta.image}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                      imgClassName="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </Link>

                <Link href={`/posts/${post.slug}`} className="block">
                  <h3 className="heading-3 mb-2">{post.title}</h3>
                </Link>

                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                  {post.meta?.description || 'Read more about this article...'}
                </p>

                <AppButton
                  href={`/posts/${post.slug}`}
                  label="Read More"
                  icon="arrow"
                  iconPosition="right"
                  variant="link"
                  className="mt-auto w-fit"
                />
              </article>
            ))}
          </div>
        ) : !isLoading ? (
          <div className="text-center py-20">
            <h3 className="heading-3 mb-4">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="mt-16 flex justify-center">
          <AppButton
            onClick={loadMore}
            variant="default"
            label={isLoading ? 'LOADING...' : 'LOAD MORE'}
            icon="arrow"
            iconPosition="right"
            className={isLoading ? 'opacity-70 pointer-events-none' : ''}
          />
        </div>
      )}
    </div>
  )
}

export const ClientListing: React.FC<Props> = (props) => {
  return (
    <section className="flex justify-center min-h-[400px]">
      <Suspense
        fallback={
          <div className="container py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        }
      >
        <ListingContent {...props} />
      </Suspense>
    </section>
  )
}
