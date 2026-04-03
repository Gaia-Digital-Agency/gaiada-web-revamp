'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ArrowRight, Search } from 'lucide-react'

export type AppButtonProps = {
  label: string
  href: string
  variant?: 'default' | 'link'
  newTab?: boolean
  className?: string
  icon?: 'none' | 'arrow' | 'search'
  iconPosition?: 'left' | 'right'
}

const ArrowIcon = () => <ArrowRight size={16} />
const SearchIcon = () => <Search size={16} />

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  href,
  variant = 'default',
  newTab = false,
  className,
  icon = 'none',
  iconPosition = 'right',
}) => {
  const isExternal = href.startsWith('http')

  const renderIcon = () => {
    switch (icon) {
      case 'arrow':
        return <ArrowIcon />
      case 'search':
        return <SearchIcon />
      default:
        return null
    }
  }

  const iconEl = icon && icon !== 'none' ? renderIcon() : null

  const content = (
    <>
      {iconPosition === 'left' && iconEl}
      <span className="leading-none">{label}</span>
      {iconPosition !== 'left' && iconEl}
    </>
  )

  const baseClass = cn('inline-flex items-center justify-center gap-2', className)

  // External
  if (isExternal) {
    return (
      <Button variant={variant} className={baseClass} asChild>
        <a href={href} target={newTab ? '_blank' : '_self'} rel="noopener noreferrer">
          <span className="inline-flex items-center gap-2">{content}</span>
        </a>
      </Button>
    )
  }

  // Internal
  return (
    <Button variant={variant} className={baseClass} asChild>
      <Link href={href}>
        <span className="inline-flex items-center gap-2">{content}</span>
      </Link>
    </Button>
  )
}
