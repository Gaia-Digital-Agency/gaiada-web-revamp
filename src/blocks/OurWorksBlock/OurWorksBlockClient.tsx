'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
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
}

export const OurWorksBlockClient: React.FC<OurWorksBlockClientProps> = ({
  title,
  services,
  portfolioItems,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string | number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'instant',
      })
    }
  }, [activeServiceId])

  const filteredItems = useMemo(() => {
    if (activeServiceId === null) return portfolioItems
    return portfolioItems.filter((item) =>
      item.services.some((service) => service.id === activeServiceId),
    )
  }, [activeServiceId, portfolioItems])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="md:h-screen flex items-center" id="our-works">
      <div className="relative overflow-hidden w-full py-24 md:py-32">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-24">
            <div className="lg:w-1/4 flex flex-col pt-4 shrink-0">
              <TextFade direction="up">
                <h2 className="heading-1">{title}</h2>
              </TextFade>

              <div className="filter-wrapper flex flex-row flex-flex-wrap md:flex-col items-start gap-4">
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
                  className="swiper-wrapper flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {filteredItems.map((item) => (
                      <motion.div
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="swiper-slide shrink-0 w-[260px] md:w-[420px] snap-start"
                      >
                        <Link
                          href={`/portfolio/${item.slug}`}
                          className="swiper-body group flex flex-col"
                        >
                          <div className="image-wrapper h-[240px] md:h-full aspect-3/4 relative overflow-hidden">
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
                            <p className="text-sm text-[#999] uppercase tracking-widest flex items-center gap-1">
                              <span className="text-[#bbb] italic lowercase">in</span>
                              {item.services?.map((s) => s.title).join(', ')}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    {filteredItems.length > 0 && (
                      <div className="shrink-0 w-[calc(100vw-420px-100px)] lg:w-[calc(100%-420px)] h-1" />
                    )}
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

              <div className="flex justify-center hidden md:flex lg:justify-start gap-4">
                <button
                  onClick={() => scroll('left')}
                  className="w-12 h-12 flex items-center justify-center bg-[#CCC]/20 rounded-none transition-colors hover:bg-[#CCC]/40 text-[#111]"
                >
                  <ArrowLeft className="w-6 h-6" strokeWidth={1} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-12 h-12 flex items-center justify-center bg-[#111] rounded-none transition-all hover:bg-primary text-white p-2"
                >
                  <ArrowRight className="w-6 h-6" strokeWidth={1} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
