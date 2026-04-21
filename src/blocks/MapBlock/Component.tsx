import type { MapBlock as MapBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
  embedHtml?: string
  location: string
} & MapBlockProps

export const MapBlock: React.FC<Props> = ({ className, location, embedHtml }) => {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`

  const embedSrc = (() => {
    if (!embedHtml) return null
    const m = embedHtml.match(/src=(?:"|')([^"']+)(?:"|')/)
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
          title={`Map location: ${location}`}
        ></iframe>
      )}
    </div>
  )
}
