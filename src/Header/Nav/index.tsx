'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType | null }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const getHref = (link: any) => {
    if (link?.type === 'reference') {
      return `/${link?.reference?.value?.slug || ''}`
    }
    return link?.url || ''
  }

  return (
    <nav className="flex gap-6 items-center nav-wrapper">
      {navItems.map((item, i) => {
        const hasSubItems = item.subItems && item.subItems.length > 0

        const href = getHref(item.link)
        const isActive = pathname === href

        if (hasSubItems) {
          return <DropdownNavItem key={i} item={item} pathname={pathname} />
        }

        return (
          <CMSLink
            key={i}
            {...item.link}
            appearance="link"
            className={`font-medium ${isActive ? 'active' : ''}`}
          />
        )
      })}
    </nav>
  )
}

const DropdownNavItem: React.FC<{
  item: NonNullable<HeaderType['navItems']>[number]
  pathname: string
}> = ({ item, pathname }) => {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleLeave = () => {
    // timeoutRef.current = setTimeout(() => setOpen(false), 150)
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
      timeoutId = setTimeout(() => setShouldRender(false), 300)
    }

    return () => clearTimeout(timeoutId)
  }, [open])

  return (
    <div
      ref={containerRef}
      className="has-submenu relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="has-submenu inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
        onClick={() => setOpen((prev) => !prev)}
        onFocus={handleEnter}
        type="button"
      >
        <CMSLink {...item.link} appearance="link" />
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {shouldRender && (
        <div
          className={`sub-menu-wrapper absolute top-full left-0 mt-2 py-2 min-w-[450px] z-50 flex flex-row flex-wrap ${
            open ? 'animate-slide-in-right' : 'animate-slide-out-right'
          }`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {item.subItems?.map((subItem, j) => (
            <div key={j} className="px-1 min-w-[140px]">
              <CMSLink
                {...subItem.link}
                appearance="inline"
                className={`sub-menu flex items-center justify-end gap-3 py-2 text-sm flex-row-reverse ${subItem.link.url === pathname ? 'active' : ''}`}
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
      )}
    </div>
  )
}
