'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@/components/Media'
import type { Portfolio, Service } from '@/payload-types'

interface PortfolioGridProps {
  items: Portfolio[]
  services: Service[]
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, services }) => {
  const [activeService, setActiveService] = useState<string | null>(null)

  const filteredItems = useMemo(() => {
    if (!activeService) return items
    return items.filter((item) =>
      item.services?.some((s) => (typeof s === 'object' ? s.slug === activeService : false)),
    )
  }, [items, activeService])

  // Split items into two columns for the staggered masonry effect
  const leftColumnItems = filteredItems.filter((_, i) => i % 2 === 0)
  const rightColumnItems = filteredItems.filter((_, i) => i % 2 !== 0)

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-32 space-y-8">
          <div>
            {/* <p className="font-bold uppercase tracking-[0.2em] mb-6"></p> */}
            <nav className="flex flex-col gap-3">
              <div>
                <button
                  onClick={() => setActiveService(null)}
                  className={`text-sm uppercase tracking-tight text-left transition-all duration-200 hover:underline underline-offset-4 cursor-pointer ${
                    activeService === null
                      ? 'font-bold text-[var(--gda-brand-yellow)]'
                      : 'text-muted-foreground'
                  }`}
                >
                  ALL SERVICES
                </button>
              </div>
              {services.map((service) => (
                <div key={service.id} className="pl-9">
                  <button
                    onClick={() => setActiveService(service.slug)}
                    className={`text-sm uppercase tracking-tight text-left transition-all duration-200 hover:underline underline-offset-4 cursor-pointer ${
                      activeService === service.slug
                        ? 'font-bold text-[var(--gda-brand-yellow)]'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {service.title}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          {/* Search bar */}
          {/* style searchbar nya : 
            width: 300;
            height: 54;
            gap: 10px;
            angle: 0 deg;
            opacity: 1;
            border-radius: 8px;
            border-width: 1px;
            padding: 16px;

          */}

          <div className="pt-4 border-t border-border/50 ">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for..."
                className="w-full h-[54px] rounded-md bg-[#f2f2f2] border border-border px-3 py-2 text-[14px] p-[16px] tracking-widest focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Grid Content */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-10 md:gap-16">
            <AnimatePresence mode="popLayout">
              {leftColumnItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column - Staggered offset */}
          <div className="flex flex-col gap-10 md:gap-16 md:mt-24">
            <AnimatePresence mode="popLayout">
              {rightColumnItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

const PortfolioCard: React.FC<{ item: Portfolio }> = ({ item }) => {
  const servicesLabel = item.services
    ?.map((s) => (typeof s === 'object' ? s.title : ''))
    .filter(Boolean)
    .join(', ')

  const thumbnail = item.hero?.media

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <Link href={`/portfolio/${item.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
          <Media
            resource={thumbnail}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
      </Link>

      {/* garis bawah
        border-top: 1px solid var(--Black, #1A1A1B)
      */}

      <div className="mt-6 space-y-2 border-t border-black pt-4">
        <Link href={`/portfolio/${item.slug}`}>
          <h4 className="text-[19px] font-medium leading-tight text-[#111] hover:underline underline-offset-4 decoration-1">
            {item.title}
          </h4>
        </Link>
        {servicesLabel && (
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] capitalize tracking-[0.12em] text-[#888] italic">in</span>
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#888]">
              {servicesLabel}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
