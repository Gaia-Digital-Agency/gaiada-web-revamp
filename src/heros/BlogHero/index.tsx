'use client'

import React, { useState, useEffect, Suspense, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from '@/utilities/useDebounce'
import type { Category } from '@/payload-types'
import './blogHero.css'

type BlogHeroType = {
  title?: string
}

const BlogHeroContent: React.FC<BlogHeroType> = ({ title }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')
  const debouncedValue = useDebounce(value, 300)
  const [categories, setCategories] = useState<(Category & { postCount?: number })[]>([])
  const [currentCat, setCurrentCat] = useState<string | null>(searchParams.get('cat'))

  const updateURL = useCallback(
    (q?: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (q !== undefined) {
        if (q) params.set('q', q)
        else params.delete('q')
      }

      params.delete('page')
      params.delete('cat')
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  useEffect(() => {
    const currentQ = searchParams.get('q') || ''
    if (debouncedValue !== currentQ) {
      updateURL(debouncedValue)
    }
  }, [debouncedValue, updateURL, searchParams])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await fetch('/api/categories?limit=100')
        const catData = await catRes.json()
        const postRes = await fetch('/api/posts?limit=1000&depth=0&select[categories]=true')
        const postData = await postRes.json()

        const counts: Record<string, number> = {}
        postData.docs.forEach((post: any) => {
          if (post.categories) {
            post.categories.forEach((catID: any) => {
              const id = typeof catID === 'object' ? catID.id : catID
              counts[id] = (counts[id] || 0) + 1
            })
          }
        })

        const sortedCats = catData.docs
          .map((cat: Category) => ({
            ...cat,
            postCount: counts[cat.id] || 0,
          }))
          .sort((a: any, b: any) => (b.postCount || 0) - (a.postCount || 0))

        setCategories(sortedCats)
      } catch {
        // Silent — categories are non-critical; UI shows without filters if fetch fails
      }
    }
    fetchCategories()
  }, [])

  const handleCategoryClick = (catID: string) => {
    if (currentCat === catID) {
      setCurrentCat(null)
      window.dispatchEvent(new CustomEvent('categoryChanged', { detail: null }))
    } else {
      setCurrentCat(catID)
      window.dispatchEvent(new CustomEvent('categoryChanged', { detail: catID }))

      // Scroll to listing section with offset
      const listingSection = document.getElementById('post-listing')
      if (listingSection) {
        const offset = 200
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = listingSection.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <section className="bg-white py-20 pt-40" id="blog-hero">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <h1 className="heading-1 text-center">{title}</h1>
          <div className="search-wrapper mt-4 w-full relative">
            <input
              type="text"
              placeholder="Search our blog..."
              aria-label="Search blog posts"
              className="w-full px-4 py-4 pl-10 text-sm border focus:outline-none focus:ring-1 focus:ring-black transition-all"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="category-wrapper w-full mt-8 flex flex-wrap justify-start items-center mr-[2px]">
              <span className="text-sm text-gray-600 italic">Popular Tags:</span>
              {categories.map((cat, index) => {
                const isSelected = currentCat === String(cat.id)
                return (
                  <React.Fragment key={cat.id}>
                    <div className="category-item flex flex-row items-center">
                      <button
                        onClick={() => handleCategoryClick(String(cat.id))}
                        className={`text-sm transition-all flex items-center gap-2 underline cursor-pointer uppercase min-h-[44px] px-1 ${
                          isSelected ? 'text-black font-medium' : 'text-gray-600'
                        }`}
                      >
                        {cat.title}
                      </button>
                      {index < categories.length - 1 && <span className="text-gray-500">,</span>}
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export const BlogHero: React.FC<BlogHeroType> = (props) => {
  return (
    <Suspense fallback={null}>
      <BlogHeroContent {...props} />
    </Suspense>
  )
}
