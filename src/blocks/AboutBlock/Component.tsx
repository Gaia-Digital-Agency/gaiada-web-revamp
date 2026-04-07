'use client'

import React, { useState, useRef } from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Plus } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

export type AboutBlockType = {
  blockType: 'aboutBlock'
  title?: string
  description?: any
  image?: MediaType
  items?: {
    title: string
    description: string
    id?: string
  }[]
}

const AccordionItem: React.FC<{ title: string; description: string; index: number }> = ({
  title,
  description,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const formattedIndex = (index + 1).toString().padStart(2, '0')

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group transition-colors duration-300"
      >
        <div className="flex items-baseline gap-6">
          <span
            className={cn(
              'text-[32px] font-semibold leading-[130%] transition-colors duration-300',
              isOpen ? 'text-[#1A1A1B]' : 'text-[#1A1A1B] group-hover:text-[#FFC22C]',
            )}
            style={{ fontFamily: 'Avenir Next, sans-serif' }}
          >
            {formattedIndex}
          </span>
          <span
            className={cn(
              'text-[32px] font-semibold leading-[130%] tracking-[0.01em] transition-colors duration-300',
              isOpen ? 'text-[#1A1A1B]' : 'text-[#1A1A1B] group-hover:text-[#FFC22C]',
            )}
            style={{ fontFamily: 'Avenir Next, sans-serif' }}
          >
            {title}
          </span>
        </div>
        <div className="shrink-0 ml-4">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Plus
              className={cn(
                'w-8 h-8 transition-colors duration-300',
                isOpen ? 'text-[#1A1A1B]' : 'text-[#1A1A1B] group-hover:text-[#FFC22C]',
              )}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* width: 330;
            height: 78;
            angle: 0 deg;
            opacity: 1; */}
            <div className="pl-[60px] md:pl-[66px] w-[450px]">
              {' '}
              {/* Adjusted indent to align perfectly with the title text start */}
              <p
                className="text-[14px] leading-[22px] text-[#6D758F] font-normal pb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const AboutBlock: React.FC<AboutBlockType> = ({ title, description, image, items }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!title) return

      gsap.registerPlugin(ScrollTrigger)

      const titleElement = document.querySelector('#title-about-us') as HTMLElement
      if (!titleElement) return

      let split: SplitType

      const createAnimation = () => {
        // 1. Bersihkan jika sudah ada split sebelumnya
        if (split) split.revert()

        // 2. Lakukan split awal ke dalam lines
        split = new SplitType(titleElement, {
          types: 'lines',
          lineClass: 'split-line',
        })

        // 3. Meniru efek mask: "lines" dengan membungkus konten setiap baris
        // Kita membungkus isi teks setiap baris ke dalam div .split-inner
        split.lines?.forEach((line) => {
          const wrapper = document.createElement('div')
          wrapper.classList.add('split-inner')
          wrapper.innerHTML = line.innerHTML
          line.innerHTML = ''
          line.appendChild(wrapper)
        })

        // 4. Animasikan .split-inner (bukan .split-line)
        const inners = titleElement.querySelectorAll('.split-inner')

        gsap.from(inners, {
          yPercent: 120, // Teks tenggelam 120% ke bawah
          stagger: 0.1,
          // duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleElement,
            start: 'top 80%', // Mulai saat bagian atas judul menyentuh tengah layar
            end: 'bottom 20%', // Selesai saat bagian bawah judul menyentuh tengah layar
            scrub: true, // "Nempel" di scroll (timbul tenggelam mengikuti scroll)
            // markers: true, // Aktifkan jika ingin melihat garis bantu
          },
        })
      }

      // Jalankan inisialisasi
      createAnimation()

      // Handle window resize (autoSplit manual)
      const handleResize = () => {
        createAnimation()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (split) split.revert()
      }
    },
    { scope: containerRef, dependencies: [title] },
  )

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      // Parallax effect for image
      gsap.to('.about-us-image', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about-section-1-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Target children paragraphs for a staggered effect
      // Gunakan selector yang lebih spesifik di dalam scope
      const items = gsap.utils.toArray('#description-about-us p')

      if (items.length > 0) {
        gsap.from(items, {
          y: -100,
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#description-about-us',
            start: 'top 85%',
            // end: 'top 20%', // Hapus end jika tidak ingin scrub terlalu panjang
            toggleActions: 'play none none reverse', // Gunakan play/reverse sebagai alternatif jika scrub tidak terasa
          },
        })
      } else {
        // Fallback jika tidak ada p tag
        gsap.from('#description-about-us', {
          y: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#description-about-us',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} id="about-us" className="container px-0!">
      <div id="about-section-1" className="mb-20">
        <div className="flex flex-col md:flex-row items-start gap-[48px]">
          {/* Bagian Kiri: Image */}
          <div id="about-section-1-image" className="w-full md:w-[708px] md:h-[480px] shrink-0">
            {image && (
              <div className="relative w-full h-full overflow-hidden">
                <Media
                  resource={image}
                  fill
                  className="about-us-image w-full h-full"
                  imgClassName="object-cover scale-110"
                />
              </div>
            )}
          </div>

          {/* Bagian Kanan: Title, Description, and Accordion */}
          <div id="about-section-1-content" className="flex-1 pr-[180px]">
            {title && <h2 id="title-about-us">{title}</h2>}

            {description && (
              <div id="description-about-us">
                <RichText
                  data={description}
                  enableGutter={false}
                  // className="prose-lg max-w-none font-roboto font-normal text-black leading-[160%] tracking-[0.01em] mb-12"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* about-section-2: Accordion List */}
      <div id="about-section-2" className="w-full max-w-[657px] mx-auto">
        {items && items.length > 0 && (
          <div className="flex flex-col">
            {items.map((item, index) => (
              <AccordionItem
                key={item.id || index}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
