'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type AppButtonProps = {
  label: string
  href: string
  variant?: 'default' | 'secondary' | 'link' | 'outline' | 'ghost' | 'destructive'
  newTab?: boolean
  className?: string
  showClickState?: boolean
}

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  href,
  variant = 'default',
  newTab = false,
  className,
  showClickState = false,
}) => {
  const [clicked, setClicked] = useState(false)

  const isExternal = href.startsWith('http')

  const handleClick = () => {
    if (showClickState) setClicked(true)
  }

  const content = showClickState && clicked ? 'Clicked!' : label

  // External link
  if (isExternal) {
    return (
      <Button variant={variant} className={cn(className)} onClick={handleClick} asChild>
        <a href={href} target={newTab ? '_blank' : '_self'} rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    )
  }

  // Internal link
  return (
    <Button variant={variant} className={cn(className)} onClick={handleClick} asChild>
      <Link href={href}>{content}</Link>
    </Button>
  )
}
