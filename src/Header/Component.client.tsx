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

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-[100] w-full h-[79px] px-6 md:px-10 flex items-center transition-all duration-300 mt-[-80px] ${
          isScrolled ? 'bg-[#F9F9F9CC] backdrop-blur-[25px] shadow-sm' : 'bg-transparent'
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
