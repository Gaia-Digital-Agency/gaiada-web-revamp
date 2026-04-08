'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useImperativeHandle, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia = React.forwardRef<HTMLVideoElement, MediaProps>((props, ref) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  useImperativeHandle(ref, () => videoRef.current!)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={getMediaUrl(`/media/${filename}`)} />
      </video>
    )
  }

  return null
})

VideoMedia.displayName = 'VideoMedia'
