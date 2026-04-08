'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject } from 'react'

interface UseGSAPImageParallaxOptions {
  yPercent?: number
  ease?: string
  scrollTriggerOptions?: {
    start?: string | number
    end?: string | number
    scrub?: boolean | number
    markers?: boolean
  }
}

/**
 * Custom hook untuk efek parallax pada gambar di dalam container.
 * Container (wrapperRef) diam di tempatnya dengan overflow-hidden,
 * sedangkan gambar di dalamnya bergerak naik/turun.
 *
 * Cara kerja:
 * - TIDAK menggunakan imageRef karena Next.js Image memforward ref ke <picture>,
 *   bukan ke <img> yang sebenarnya. Sebagai gantinya, kita pakai selector
 *   GSAP untuk mencari <img> di dalam wrapperRef.
 *
 * @param wrapperRef - ref ke container (overflow-hidden, sebagai scroll trigger)
 * @param options    - konfigurasi animasi dan ScrollTrigger
 * @param deps       - dependency array
 */
export const useGSAPImageParallax = <U extends Element = HTMLElement>(
  wrapperRef: RefObject<U | null>,
  options: UseGSAPImageParallaxOptions = {},
  deps: React.DependencyList = [],
) => {
  const {
    yPercent = 10,
    ease = 'none',
    scrollTriggerOptions = {
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      markers: false,
    },
  } = options

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      gsap.registerPlugin(ScrollTrigger)

      // Cari elemen <img> di dalam wrapper menggunakan selector GSAP
      // Ini lebih reliable daripada ref forwarding melalui Next.js Image
      const imgEl = wrapper.querySelector<HTMLElement>('img')
      if (!imgEl) return

      gsap.fromTo(
        imgEl,
        { yPercent: Math.abs(yPercent) }, // posisi awal: sedikit ke bawah
        {
          yPercent: -Math.abs(yPercent), // posisi akhir: sedikit ke atas
          ease,
          scrollTrigger: {
            trigger: wrapper,
            ...scrollTriggerOptions,
          },
        },
      )
    },
    { scope: wrapperRef, dependencies: deps as unknown[] },
  )
}
