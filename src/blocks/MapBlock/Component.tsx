import type { MapBlock as MapBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
} & MapBlockProps

export const MapBlock: React.FC<Props> = ({ className, location }) => {
  // Using Google Maps simple iframe embed (no API key)
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`

  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <iframe
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
        title={`Map location: ${location}`}
      ></iframe>
    </div>
  )
}
