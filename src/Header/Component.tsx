import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, Setting, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as Header | null
  const settingsData = (await getCachedGlobal('settings', 1)()) as Setting | null

  const logoData = settingsData?.logo as Media | undefined
  const logoUrl = logoData ? getMediaUrl(logoData.url) : '/gaia-logo.webp'
  const logoAlt = logoData?.alt || 'Gaiada Logo'

  return <HeaderClient data={headerData} logo={{ url: logoUrl, alt: logoAlt }} />
}
