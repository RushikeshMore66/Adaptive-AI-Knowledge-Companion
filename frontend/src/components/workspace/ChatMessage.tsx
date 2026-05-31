'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { User, Brain, AlertCircle, Copy, CheckCheck } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Message } from '@/src/types/chat'

type Props = {
  message: Message
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="my-2 rounded-lg overflow-hidden border border-border">
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted border-b border-border">
        <span className="text-[10px] font-mono font-medium text-foreground/50">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-foreground/40 hover:text-foreground transition-colors"
        >
          {copied ? (
            <><CheckCheck className="h-3 w-3 text-success" /> Copied</>
          ) : (
            <><Copy className="h-3 w-3" /> Copy</>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 bg-background">
        <code className="text-[12px] font-mono text-foreground leading-relaxed">{code}</code>
      </pre>
    </div>
  )
}

function parseContent(content: string): React.ReactNode {
  // Simple inline code + code block parsing
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={lastIndex} className="whitespace-pre-wrap">
          {content.slice(lastIndex, match.index)}
        </span>
      )
    }
    parts.push(
      <CodeBlock key={match.index} language={match[1] || 'text'} code={match[2].trim()} />
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    parts.push(
      <span key={lastIndex} className="whitespace-pre-wrap">
        {content.slice(lastIndex)}
      </span>
    )
  }

  return parts.length > 0 ? parts : <span className="whitespace-pre-wrap">{content}</span>
}

export const ChatMessage = memo(function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'
  const isError = Boolean(message.error)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex gap-3 px-4 py-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div className={cn(
        'flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center mt-0.5',
        isUser ? 'bg-primary' : 'bg-foreground/8 border border-border'
      )}>
        {isUser ? (
          <User className="h-3.5 w-3.5 text-white" />
        ) : (
          <Brain className="h-3.5 w-3.5 text-foreground/60" />
        )}
      </div>

      {/* Bubble */}
      <div className={cn(
        'flex flex-col gap-1 max-w-[80%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-white rounded-tr-sm'
            : isError
              ? 'bg-danger-subtle text-danger border border-danger/20 rounded-tl-sm'
              : 'bg-surface border border-border text-foreground rounded-tl-sm',
        )}>
          {isError ? (
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{message.error}</span>
            </div>
          ) : (
            <div className={cn(message.isStreaming && 'streaming-cursor')}>
              {parseContent(message.content)}
            </div>
          )}
        </div>

        {/* Citations */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {message.citations.slice(0, 4).map((c, i) => (
              <a
                key={c.id}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium bg-primary-subtle text-primary border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <span className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-primary text-white text-[8px] font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="truncate max-w-[120px]">{c.title}</span>
              </a>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-foreground/30 px-1">
          {new Date(message.timestamp).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
})
