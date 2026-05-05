'use client'
import { CMSLink } from '@/components/Link'
import { Mail, MapPin } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Footer as FooterType } from '@/payload-types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

export const FooterDesktop = ({
  footerData,
  form,
  bgImage,
}: {
  footerData: FooterType | null
  form: any
  bgImage: string | null | undefined
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!bgRef.current || !containerRef.current) return

      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        bgRef.current,
        {
          y: '50%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom', // Mulai saat footer masuk dari bawah layar
            end: 'bottom bottom', // Selesai saat dasar footer mencapai dasar layar
            scrub: 1, // Efek inersia halus mengikuti scroll
          },
        },
      )
    },
    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full grid grid-cols-2 lg:min-h-screen overflow-hidden"
      style={{
        backgroundColor: '#F9F9F9',
      }}
    >
      {bgImage && (
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center bottom',
          }}
        />
      )}

      <div className="relative z-10 flex justify-end items-center py-20 h-full">
        <div className="w-full px-14 lg:max-w-xl py-8">
          <h2 className="heading-1 max-w-md">{footerData?.heading}</h2>
          <div className="flex flex-col gap-4 mt-8">
            {footerData?.navItemsWithIcon?.map((item, i) => {
              const link = item.link
              return (
                <a
                  key={i}
                  href={link.url}
                  target={link.newTab ? '_blank' : '_self'}
                  className="flex items-center gap-4 text-lg font-medium hover:opacity-70 transition-opacity"
                >
                  {link.icon === 'email' && <Mail strokeWidth={1.5} size={20} />}
                  {link.icon === 'map' && <MapPin strokeWidth={1.5} size={20} />}
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#C6C6C633] backdrop-blur-[12px] flex items-center justify-start h-full px-16 lg:px-24">
        <div className="w-full max-w-md">
          {form && <FormBlock form={form} enableIntro={false} />}
        </div>
      </div>
    </div>
  )
}
