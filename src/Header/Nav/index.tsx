'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType | null; isMobile?: boolean }> = ({
  data,
  isMobile = false,
}) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const getHref = (link: any) => {
    if (link?.type === 'reference') {
      return `/${link?.reference?.value?.slug || ''}`
    }
    return link?.url || ''
  }

  return (
    <nav
      className={`${
        isMobile ? 'flex flex-col items-start gap-6' : 'flex gap-6 items-center'
      } nav-wrapper transition-all duration-300 ease-in-out`}
    >
      {navItems.map((item, i) => {
        const hasSubItems = item.subItems && item.subItems.length > 0

        const href = getHref(item.link)
        const isActive = pathname === href

        if (hasSubItems) {
          return <DropdownNavItem key={i} item={item} pathname={pathname} isMobile={isMobile} />
        }

        return (
          <CMSLink
            key={i}
            {...item.link}
            appearance="link"
            className={`font-medium transition-colors duration-300 ${isActive ? 'text-[#FFC22C]' : ''}`}
          />
        )
      })}
    </nav>
  )
}

const DropdownNavItem: React.FC<{
  item: NonNullable<HeaderType['navItems']>[number]
  pathname: string
  isMobile?: boolean
}> = ({ item, pathname, isMobile = false }) => {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const submenuId = React.useId()

  const handleEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setOpen(true)
    }
  }

  const handleLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => setOpen(false), 150)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [shouldRender, setShouldRender] = useState(open)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (open) {
      setShouldRender(true)
    } else {
      timeoutId = setTimeout(() => setShouldRender(false), 150)
    }

    return () => clearTimeout(timeoutId)
  }, [open])

  const isAnySubActive = item.subItems?.some((sub) => sub.link.url === pathname)

  return (
    <div
      ref={containerRef}
      className={`has-submenu group relative ${open ? 'submenu-open' : ''} ${isMobile ? 'w-full text-left' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        aria-controls={submenuId}
        aria-expanded={open}
        className={`has-submenu inline-flex items-center gap-1 text-lg font-semibold text-avenir cursor-pointer transition-colors duration-300 ${isMobile ? '' : 'group-hover:text-[#FFC22C] [&.submenu-open]:text-[#FFC22C]'} ${isAnySubActive ? 'text-[#FFC22C]' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={handleEnter}
        type="button"
      >
        {item.link.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id={submenuId}
        className={`transition-all duration-300 ease-in-out ${isMobile ? 'flex' : 'absolute top-full left-0'} ${shouldRender ? 'block' : 'hidden'}`}
      >
        <div
          className={`sub-menu-wrapper ${
            isMobile
              ? 'relative flex flex-col items-start bg-transparent pt-0'
              : 'pt-2 pb-2 min-w-[450px] z-50 flex flex-row flex-wrap'
          } ${
            isMobile
              ? open
                ? 'animate-slide-in-from-top'
                : 'animate-slide-out-to-top'
              : open
                ? 'animate-slide-in-right'
                : 'animate-slide-out-right'
          }`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {item.subItems?.map((subItem, j) => (
            <div key={j} className={`${isMobile ? 'pl-5' : 'px-1 min-w-[140px]'}`}>
              <CMSLink
                {...subItem.link}
                appearance="inline"
                className={`sub-menu flex items-center justify-end gap-3 py-2 text-sm flex-row-reverse ${subItem.link.url === pathname ? 'text-[#FFC22C]' : ''} ${isMobile ? 'justify-start' : ''}`}
              >
                <div className="relative w-3 h-3 flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-full blur-[2.5px]"
                    style={{
                      backgroundColor: subItem.primaryColor || '#000000',
                    }}
                  />
                </div>
              </CMSLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
