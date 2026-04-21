'use client'
import React, { useEffect, useRef, useState } from 'react'
import { X, Send, Loader2 } from 'lucide-react'

const MAX_QUESTION_LENGTH = 150

type Props = {
  onClose: () => void
}

export const AIChatPopup: React.FC<Props> = ({ onClose }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Focus the textarea on open; no persistence — state lives only in this component.
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // ESC to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const canSubmit =
    question.trim().length > 0 && question.length <= MAX_QUESTION_LENGTH && !loading

  const ask = async () => {
    if (!canSubmit) return
    setLoading(true)
    setAnswer(null)
    setError(null)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      })
      const data = (await res.json().catch(() => null)) as
        | { answer?: string; error?: string }
        | null
      if (!res.ok || !data?.answer) {
        setError(data?.error || 'Something went wrong. Please try again.')
      } else {
        setAnswer(data.answer)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl+Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      ask()
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Ask Gaiada AI"
      className="fixed bottom-[10.5rem] right-6 z-50 w-[min(92vw,380px)] bg-background text-foreground rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[70vh]"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground">
        <div className="font-semibold text-sm">Ask Gaiada AI</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="p-1 rounded-full hover:bg-black/10 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3 overflow-y-auto">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="ai-chat-question">
          Your question
        </label>
        <textarea
          id="ai-chat-question"
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, MAX_QUESTION_LENGTH))}
          onKeyDown={onKeyDown}
          maxLength={MAX_QUESTION_LENGTH}
          rows={3}
          placeholder="Ask about our services, work, team, or how to contact us…"
          className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {question.length}/{MAX_QUESTION_LENGTH}
          </span>
          <button
            type="button"
            onClick={ask}
            disabled={!canSubmit}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {loading ? 'Asking…' : 'Ask'}
          </button>
        </div>

        <div className="border-t border-border pt-3 mt-1">
          <div className="text-xs font-medium text-muted-foreground mb-2">Answer</div>
          {loading && !answer && !error && (
            <div className="text-sm text-muted-foreground italic">Thinking…</div>
          )}
          {error && <div className="text-sm text-red-600">{error}</div>}
          {!loading && !error && answer && (
            <div className="text-sm whitespace-pre-wrap leading-relaxed">{answer}</div>
          )}
          {!loading && !error && !answer && (
            <div className="text-sm text-muted-foreground italic">
              Type a question above and click Ask. Answers won&apos;t be saved after you close this
              window.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
