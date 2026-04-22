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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  useEffect(() => {
    setHeaderTheme(null)
    setIsMobileMenuOpen(false) // Close mobile menu on route change
  }, [pathname])

  useEffect(() => {
    const dialog = dialogRef.current
    if (isMobileMenuOpen) {
      dialog?.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog?.close()
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    const handleCancel = (e: Event) => {
      e.preventDefault()
      setIsMobileMenuOpen(false)
    }
    dialog?.addEventListener('cancel', handleCancel)
    return () => dialog?.removeEventListener('cancel', handleCancel)
  }, [])

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
        className={`fixed top-0 z-[200] w-full h-[79px] px-6 md:px-10 flex items-center transition-[height,background-color] duration-300 backdrop-blur-md ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-[25px]'
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
          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <HeaderNav data={data} />
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <button
            className="lg:hidden p-2 z-[210]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black my-1 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></div>
          </button>
        </div>
      </header>

      {/* Mobile Menu*/}
      <dialog
        ref={dialogRef}
        className={`mobile-menu lg:hidden fixed inset-0 w-full h-full bg-white z-[190] flex flex-col pt-[70px] px-6 transition-all duration-300 ease-in-out border-none m-0 max-w-none max-h-none open:flex ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <HeaderNav data={data} isMobile={true} />
      </dialog>
    </>
  )
}
