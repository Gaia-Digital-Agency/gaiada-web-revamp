'use client'
import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Button component to scroll back to the top of the page.
// Homepage locks body/html overflow and scrolls inside
// `.homepage-scroll-container`; on other pages the window scrolls.
// We listen to both sources so the button works everywhere.
export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const getContainer = () => document.querySelector<HTMLElement>('.homepage-scroll-container')

    const check = () => {
      const container = getContainer()
      const scrolled = container ? container.scrollTop : window.scrollY
      setIsVisible(scrolled > 300)
    }

    // Initial check in case the page is already scrolled on mount.
    check()

    window.addEventListener('scroll', check, { passive: true })
    // Re-attach container listener whenever the container appears (SPA nav).
    let container = getContainer()
    container?.addEventListener('scroll', check, { passive: true })

    // If the container mounts after us (rare), catch it via a short poll.
    const poll = window.setInterval(() => {
      const next = getContainer()
      if (next && next !== container) {
        container?.removeEventListener('scroll', check)
        container = next
        container.addEventListener('scroll', check, { passive: true })
        check()
      }
    }, 1000)

    return () => {
      window.removeEventListener('scroll', check)
      container?.removeEventListener('scroll', check)
      window.clearInterval(poll)
    }
  }, [])

  // Scroll whichever element is actually scrolled.
  const scrollToTop = () => {
    const container = document.querySelector<HTMLElement>('.homepage-scroll-container')
    if (container && container.scrollTop > 0) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[10.5rem] right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  )
}
