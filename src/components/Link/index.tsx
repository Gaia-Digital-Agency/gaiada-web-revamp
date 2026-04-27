'use client'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

import type { Page, Portfolio, Post, Service } from '@/payload-types'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services' | 'portfolio'
    value: Page | Post | Service | Portfolio | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  primaryColor?: string | null
  isActive?: boolean
}

export const getHref = (props: CMSLinkType): string | null | undefined => {
  const { type, reference, url } = props
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    return `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
      reference.value.slug
    }`
  }
  return url
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    size: sizeFromProps,
    isActive: isActiveFromProps,
  } = props

  const pathname = usePathname()
  const href = getHref(props)

  const isActive =
    isActiveFromProps ||
    pathname === href ||
    (href !== '/' && href !== '' && href !== null && pathname?.startsWith(`${href}/`))

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const mergedClassName = cn(className, {
    active: isActive,
  })

  if (appearance === 'inline') {
    return (
      <Link className={mergedClassName} href={href || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={mergedClassName} size={size} variant={appearance}>
      <Link className={mergedClassName} href={href || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
