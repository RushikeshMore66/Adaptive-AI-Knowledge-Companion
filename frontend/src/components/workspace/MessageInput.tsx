'use client'

import { useRef, useState, useCallback } from 'react'
import { Send, Paperclip, Mic, Square } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/src/store/workspace-store'

type Props = {
  onSend: (message: string) => void
  isStreaming: boolean
  onStop?: () => void
}

export function MessageInput({ onSend, isStreaming, onStop }: Props) {
  const { inputValue, setInputValue } = useWorkspaceStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isComposing, setIsComposing] = useState(false)

  const handleSubmit = useCallback(() => {
    const value = inputValue.trim()
    if (!value || isStreaming) return
    onSend(value)
    setInputValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [inputValue, isStreaming, onSend, setInputValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    // Auto-resize
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  return (
    <div className="flex-shrink-0 border-t border-border bg-background p-3">
      <div className={cn(
        'flex items-end gap-2 rounded-xl border bg-surface px-3 py-2 transition-shadow',
        'focus-within:border-ring focus-within:shadow-sm border-border'
      )}>
        {/* Attach */}
        <button
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-muted hover:text-foreground"
          title="Attach file"
        >
          <Paperclip className="h-3.5 w-3.5" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Ask anything, research a topic, practice an interview..."
          rows={1}
          className={cn(
            'flex-1 resize-none bg-transparent text-sm text-foreground',
            'placeholder:text-foreground/30 outline-none',
            'min-h-[28px] max-h-[200px] py-1 leading-relaxed h-auto'
          )}
        />

        {/* Voice */}
        <button
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-muted hover:text-foreground"
          title="Voice input"
        >
          <Mic className="h-3.5 w-3.5" />
        </button>

        {/* Send / Stop */}
        {isStreaming ? (
          <button
            onClick={onStop}
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-danger/10 text-danger transition-colors hover:bg-danger/20"
            title="Stop generation"
          >
            <Square className="h-3 w-3 fill-current" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
            className={cn(
              'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md transition-colors',
              inputValue.trim()
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-muted text-foreground/30 cursor-not-allowed'
            )}
            title="Send message (Enter)"
          >
            <Send className="h-3 w-3" />
          </button>
        )}
      </div>

      <p className="mt-1.5 text-center text-[10px] text-foreground/30">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
