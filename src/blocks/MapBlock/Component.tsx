import type { MapBlock as MapBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
  embedHtml?: string
} & MapBlockProps

export const MapBlock: React.FC<Props> = ({ className, location, embedHtml }) => {
  // Using Google Maps simple iframe embed (no API key)
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`

  // Extract src from provided embed HTML (basic extraction to avoid raw injection)
  const embedSrc = (() => {
    if (!embedHtml) return null
    const m = embedHtml.match(/src=(?:"|')([^"']+)(?:"|')/)
    return m ? m[1] : null
  })()

  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
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
          title={`Map location: ${location}`}
        ></iframe>
      )}
    </div>
  )
}
