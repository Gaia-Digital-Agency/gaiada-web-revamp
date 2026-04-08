import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media = React.forwardRef<HTMLImageElement | HTMLVideoElement, Props>(
  (props, ref) => {
    const { className, htmlElement = 'div', resource } = props

    const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
    const Tag = htmlElement || Fragment

    return (
      <Tag
        {...(htmlElement !== null
          ? {
              className,
              ref,
            }
          : {})}
      >
        {isVideo ? (
          <VideoMedia {...props} ref={ref as React.Ref<HTMLVideoElement>} />
        ) : (
          <ImageMedia {...props} ref={ref as React.Ref<HTMLImageElement>} />
        )}
      </Tag>
    )
  },
)

Media.displayName = 'Media'
