'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  // On the homepage, the footer is rendered inside HomepageStack — hide the global one
  if (isHomepage) return null

  return <>{children}</>
}
