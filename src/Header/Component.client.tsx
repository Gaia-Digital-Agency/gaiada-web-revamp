'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header | null
  logo?: {
    url: string
    alt: string
  }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const isHomepage = pathname === '/'

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleStackEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>
      setIsScrolled(customEvent.detail.index > 0)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('homepage-stack-index', handleStackEvent)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('homepage-stack-index', handleStackEvent)
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-[100] w-full h-[79px] px-6 md:px-10 flex items-center transition-colors duration-300 backdrop-blur-md mt-[-80px] ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-[25px] shadow-sm'
            : isHomepage
              ? 'bg-transparent'
              : 'bg-white/80 backdrop-blur-[25px]'
        }`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container mx-auto flex justify-between items-center w-full">
          <Link href="/">
            <Logo loading="eager" priority="high" className="" src={logo?.url} alt={logo?.alt} />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>
    </>
  )
}
