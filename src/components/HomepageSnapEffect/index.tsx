'use client'

import { useEffect } from 'react'

export const HomepageSnapEffect: React.FC = () => {
  useEffect(() => {
    // Add snap-container and hide-scrollbar classes to html element
    const html = document.documentElement
    html.classList.add('snap-container')
    html.classList.add('hide-scrollbar')

    // Cleanup: remove classes when component unmounts
    return () => {
      html.classList.remove('snap-container')
      html.classList.remove('hide-scrollbar')
    }
  }, [])

  return null
}
