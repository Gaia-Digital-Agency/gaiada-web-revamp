'use client'
import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { AIChatPopup } from './Popup'

// Floating AI chat button. Stacked between WhatsAppCTA (bottom-6) and
// BackToTop (bottom-40) at bottom-24. Chartreuse (50% green / 50% yellow
// = #80FF00) so it's distinct from the other two buttons.
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
        className="fixed bottom-24 right-6 z-50 bg-[#80FF00] text-black p-3 rounded-full shadow-lg hover:opacity-80 transition-opacity flex items-center justify-center"
      >
        <Sparkles size={24} />
      </button>
      {/* Unmount on close → state is cleared, no persistence. */}
      {open && <AIChatPopup onClose={() => setOpen(false)} />}
    </>
  )
}
