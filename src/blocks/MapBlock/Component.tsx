import type { MapBlock as MapBlockProps } from 'src/payload-types'
import type { Setting } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'

type Props = {
  className?: string
} & MapBlockProps

export const MapBlock: React.FC<Props> = async ({ className }) => {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'settings',
    depth: 0,
  })

  const typedSettings = settings as Setting
  const address = typedSettings?.address || ''
  const googleMapsEmbed = typedSettings?.googleMapsEmbed || ''

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

  const embedSrc = (() => {
    if (!googleMapsEmbed) return null
    const m = googleMapsEmbed.match(/src=(?:"|')([^"']+)(?:"|')/)
    return m ? m[1] : null
  })()

  return (
    <div className={cn('mx-auto w-full', className)}>
      {embedSrc ? (
        <iframe
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={embedSrc}
          title={`Embedded map`}
        ></iframe>
      ) : (
        <iframe
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapUrl}
          title={`Map location: ${address}`}
        ></iframe>
      )}
    </div>
  )
}
