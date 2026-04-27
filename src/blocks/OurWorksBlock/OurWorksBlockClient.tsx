'use client'

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AppButton } from '@/components/common/AppButton'
import { TextFade } from '@/components/FramerMotion/TextFade'

import './OurBlockStyle.css'

interface Service {
  id: string | number
  title: string
  slug?: string | null
}

interface PortfolioItem {
  title: string
  slug: string
  featuredImage: any
  services: Service[]
}

interface OurWorksBlockClientProps {
  title: string
  services: Service[]
  portfolioItems: PortfolioItem[]
  index?: number
}

export const OurWorksBlockClient: React.FC<OurWorksBlockClientProps> = ({
  title,
  services,
  portfolioItems,
  index,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string | number | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const isVisible = index !== undefined && currentIndex === index

  const filteredItems = useMemo(() => {
    if (activeServiceId === null) return portfolioItems
    return portfolioItems.filter((item) =>
      item.services.some((service) => service.id === activeServiceId),
    )
  }, [activeServiceId, portfolioItems])

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      const remainingScroll = scrollWidth - (scrollLeft + clientWidth)
      setCanScrollRight(remainingScroll > 2)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const handleScroll = () => checkScroll()
      container.addEventListener('scroll', handleScroll)
      checkScroll()
      const timer = setTimeout(checkScroll, 100)
      return () => {
        container.removeEventListener('scroll', handleScroll)
        clearTimeout(timer)
      }
    }
  }, [checkScroll, filteredItems])

  useEffect(() => {
    if (typeof window === 'undefined' || index === undefined) return

    const handleIndexChange = (e: any) => {
      const idx = e.detail?.index
      setCurrentIndex(idx)
    }

    window.addEventListener('homepage-stack-index', handleIndexChange)
    return () => window.removeEventListener('homepage-stack-index', handleIndexChange)
  }, [index])

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'instant',
      })
    }
  }, [activeServiceId])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const firstSlide = scrollContainerRef.current.querySelector('.swiper-slide') as HTMLElement
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth + 32 // 32 is the gap size
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -slideWidth : slideWidth,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <section className="lg:h-screen flex items-center" id="our-works">
      <div className="relative overflow-hidden w-full py-16 lg:py-32">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-24">
            <div className="lg:w-1/4 flex flex-col pt-4 shrink-0">
              <TextFade direction="up" key={isVisible ? 'visible' : 'hidden'}>
                <h2 className="heading-1">{title}</h2>
              </TextFade>

              <div className="filter-wrapper flex flex-row flex-wrap lg:flex-col items-start gap-4">
                <button
                  onClick={() => setActiveServiceId(null)}
                  className={cn(
                    ' text-avenir text-sm uppercase tracking-[0.15em] transition-all duration-300 text-left',
                    activeServiceId === null ? 'active' : '',
                  )}
                >
                  All Services
                </button>

                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={cn(
                      'text-avenir text-sm uppercase tracking-[0.15em] transition-all duration-300 first:',
                      activeServiceId === service.id ? 'active' : '',
                    )}
                  >
                    {service.title}
                  </button>
                ))}
              </div>

              <div className="mt-12 hidden lg:block">
                <AppButton
                  href="/portfolio"
                  label="All Portfolio"
                  variant="default"
                  icon="search"
                  iconPosition="left"
                />
              </div>
            </div>

            <div className="lg:w-3/4 flex flex-col gap-0 md:gap-8 min-w-0">
              <div className="swiper lg:mr-[calc(-1*(100vw-100%)/2)]">
                <div
                  ref={scrollContainerRef}
                  className="swiper-wrapper flex gap-8 overflow-x-auto pb-8 pr-[50%] scrollbar-hide snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <AnimatePresence mode="wait" initial={true}>
                    <motion.div
                      key={activeServiceId ?? 'all'}
                      className="flex gap-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {filteredItems.map((item, i) => (
                        <motion.div
                          key={item.slug}
                          initial={{ opacity: 0, y: 70, scale: 0.92, filter: 'blur(4px)' }}
                          animate={
                            isVisible
                              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                              : { opacity: 0, y: 70, scale: 0.92, filter: 'blur(4px)' }
                          }
                          transition={{
                            duration: 1.4,
                            ease: [0.19, 1, 0.22, 1], // Luxurious Exponential Out
                            delay: isVisible ? i * 0.12 : 0,
                            opacity: { duration: 1 },
                            filter: { duration: 1.2 },
                          }}
                          className="swiper-slide shrink-0 w-[260px] md:w-[320px] lg:w-[420px] snap-start"
                        >
                          <Link
                            href={`/portfolio/${item.slug}`}
                            className="swiper-body group flex flex-col"
                          >
                            <div className="image-wrapper h-[240px] md:h-[320px] lg:h-full aspect-3/4 relative overflow-hidden">
                              {item.featuredImage && (
                                <img
                                  src={
                                    typeof item.featuredImage === 'object'
                                      ? item.featuredImage.url
                                      : ''
                                  }
                                  alt={item.title}
                                  className="object-cover w-full h-[240px] md:h-full transition-transform duration-700 group-hover:scale-105"
                                />
                              )}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="swiper-content space-y-1">
                              <h3 className="heading-5 group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-[#999] uppercase tracking-widest flex items-start gap-2">
                                <span className="text-[#bbb] italic lowercase">in</span>
                                <span className="underline">
                                  {item.services?.map((s) => s.title).join(', ')}
                                </span>
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {filteredItems.length === 0 && (
                    <div className="flex items-center justify-start w-full py-40">
                      <p className="text-[#999] italic">No works found in this category.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:hidden">
                <AppButton
                  href="/portfolio"
                  label="All Portfolio"
                  variant="default"
                  icon="search"
                  iconPosition="left"
                />
              </div>
            </div>
          </div>

          {/* Centered Navigation Arrows */}
          <div className="flex justify-center gap-6 mt-8 lg:mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                'w-14 h-14 flex items-center justify-center rounded-none transition-all duration-300',
                canScrollLeft
                  ? 'bg-[#111] text-white cursor-pointer hover:bg-(--gda-brand-yellow) hover:text-[#111]'
                  : 'bg-[#CCC]/20 text-[#999] cursor-default',
              )}
            >
              <ArrowLeft className="w-6 h-6" strokeWidth={1} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                'w-14 h-14 flex items-center justify-center rounded-none transition-all duration-300',
                canScrollRight
                  ? 'bg-[#111] text-white cursor-pointer hover:bg-(--gda-brand-yellow) hover:text-[#111]'
                  : 'bg-[#CCC]/20 text-[#999] cursor-default',
              )}
            >
              <ArrowRight className="w-6 h-6" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
