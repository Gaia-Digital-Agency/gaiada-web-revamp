'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'

export const NonHomepageHero: React.FC<Page['hero']> = ({
  title,
  media,
  gradientColor,
  giantTitleColor,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  // Konfigurasi warna presisi untuk gradient
  const colorConfigs = {
    yellow: {
      hex: '#FFC22C',
      rgba: 'rgba(255, 194, 44, 0)',
    },
    orange: {
      hex: '#f97316',
      rgba: 'rgba(249, 115, 22, 0)',
    },
    blue: {
      hex: '#2563eb',
      rgba: 'rgba(37, 99, 235, 0)',
    },
    white: {
      hex: '#f9f9f9',
      rgba: 'rgba(249, 249, 249, 0)',
    },
  }

  const activeColor =
    colorConfigs[(gradientColor as keyof typeof colorConfigs) || 'yellow'] || colorConfigs.yellow

  return (
    <section className="relative -mt-[10.4rem] w-full h-screen min-h-[600px] overflow-hidden bg-white flex flex-col justify-end">
      {/* LAYER 1: Background - Full Image */}
      <div className="absolute inset-0 z-0">
        {media && typeof media !== 'string' && (
          <Image
            src={(media as Media).url || ''}
            alt={(media as Media).alt || 'Hero Background'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Dark overlay agar gambar tidak terlalu terang di bagian atas (untuk navigasi) */}
        <div className="absolute inset-0 z-10" />
      </div>

      {/* LAYER 2: Midground - Precise Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 50%, ${activeColor.hex} 95%)`,
        }}
      />

      {/* LAYER 3: Foreground - Giant Typography */}
      <div className="relative z-20 w-full overflow-hidden translate-y-[15%] pointer-events-none">
        <div className="container mx-auto px-4 mb-5">
          <h1 className="gda-hero-banner-title" style={{ color: giantTitleColor || undefined }}>
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
