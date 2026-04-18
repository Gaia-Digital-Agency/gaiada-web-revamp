'use client'
import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { AIChatPopup } from './Popup'

// Floating AI chat button. Sits above BackToTop (bottom-24), which sits
// above WhatsAppCTA (bottom-6). Matches their round-button styling.
// Clicking toggles a non-persistent Q/A popup — no session memory.
export const AIChat: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={open}
        className="fixed bottom-40 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
      >
        <Sparkles size={24} />
      </button>
      {/* Unmount on close → state is cleared, no persistence. */}
      {open && <AIChatPopup onClose={() => setOpen(false)} />}
    </>
  )
}
