'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ArrowRight, ChevronDownIcon, Search } from 'lucide-react'

export type AppButtonProps = {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'link'
  newTab?: boolean
  className?: string
  icon?: 'none' | 'arrow' | 'search' | 'chevron-down'
  iconPosition?: 'left' | 'right'
}

const ArrowIcon = () => <ArrowRight size={16} />
const SearchIcon = () => <Search size={16} />

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  href,
  onClick,
  variant = 'default',
  newTab = false,
  className,
  icon = 'none',
  iconPosition = 'right',
}) => {
  const isExternal = href?.startsWith('http')

  const renderIcon = () => {
    switch (icon) {
      case 'arrow':
        return <ArrowIcon />
      case 'chevron-down':
        return <ChevronDownIcon />
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
      <span className="button-label">{label}</span>
      {iconPosition !== 'left' && iconEl}
    </>
  )

  const baseClass = cn('inline-flex items-center justify-center gap-2', className)

  // External
  if (href && isExternal) {
    return (
      <Button variant={variant} className={baseClass} asChild>
        <a href={href} target={newTab ? '_blank' : '_self'} rel="noopener noreferrer">
          <span className="inline-flex items-center gap-2">{content}</span>
        </a>
      </Button>
    )
  }

  // Internal Link
  if (href) {
    return (
      <Button variant={variant} className={baseClass} asChild>
        <Link href={href}>
          <span className="inline-flex items-center gap-2">{content}</span>
        </Link>
      </Button>
    )
  }

  // Standard Button Action
  return (
    <Button variant={variant} className={baseClass} onClick={onClick}>
      <span className="inline-flex items-center gap-2">{content}</span>
    </Button>
  )
}
