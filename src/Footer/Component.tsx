import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Setting } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { FooterInfo } from './FooterInfo'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer | null
  const settings = (await getCachedGlobal('settings', 1)()) as Setting | null

  const navItems = footerData?.navItems || []
  const socialLinks = settings?.socialLinks || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white py-12">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-6">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <p>{footerData?.copyright || 'Copyright @2026'}</p>
            <p>{footerData?.developedBy || 'Developed by Gaia Digital Agency'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <nav className="flex flex-col gap-3">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white hover:text-gray-400" key={i} {...link} />
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Connect</h3>
          <div className="flex gap-4 mb-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <span className="capitalize">{social.platform}</span>
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">Visitor Count: {footerData?.visitorCount || 0}</p>
          <FooterInfo />
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
