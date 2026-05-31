'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { MessageInput } from './MessageInput'
import { useWorkspaceStore, selectActiveConversation } from '@/src/store/workspace-store'
import { chatService } from '@/src/services/chat.service'
import type { Message, ActiveAgent } from '@/src/types/chat'

export function ChatContainer() {
  const store = useWorkspaceStore()
  const activeConv = useWorkspaceStore(selectActiveConversation)
  const bottomRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const [thinkingAgents, setThinkingAgents] = useState<string[]>([])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv?.messages.length, store.isStreaming])

  const handleSend = useCallback(
    async (text: string) => {
      if (!activeConv) return

      // Add user message
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
      }
      store.addMessage(activeConv.id, userMsg)

      // Add placeholder assistant message
      const assistantId = crypto.randomUUID()
      const assistantMsg: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        isStreaming: true,
      }
      store.addMessage(activeConv.id, assistantMsg)
      store.setStreaming(true, assistantId)

      // Simulate agents activating
      const agents: ActiveAgent[] = [
        { id: 'planner', name: 'Planner', type: 'planner', status: 'active', task: 'Decomposing query' },
        { id: 'memory', name: 'Memory', type: 'memory', status: 'active', task: 'Searching memory' },
        { id: 'rag', name: 'RAG', type: 'rag', status: 'active', task: 'Retrieving documents' },
      ]
      store.setActiveAgents(agents)
      setThinkingAgents(agents.map((a) => a.id))

      abortRef.current = new AbortController()

      try {
        let fullContent = ''
        await chatService.streamMessage(
          { conversationId: activeConv.id, message: text },
          (chunk) => {
            if (chunk.delta) {
              fullContent += chunk.delta
              store.appendMessageContent(activeConv.id, assistantId, chunk.delta)
            }
            if (chunk.agents) store.setActiveAgents(chunk.agents)
            if (chunk.citations) store.setCurrentCitations(chunk.citations)
            if (chunk.memoryUsed) store.setCurrentMemory(chunk.memoryUsed)
            if (chunk.done) {
              setThinkingAgents([])
              store.setActiveAgents(
                agents.map((a) => ({ ...a, status: 'done' as const }))
              )
            }
          },
          abortRef.current.signal
        )

        store.updateMessage(activeConv.id, assistantId, { isStreaming: false })
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') {
          store.updateMessage(activeConv.id, assistantId, { isStreaming: false })
        } else {
          store.updateMessage(activeConv.id, assistantId, {
            isStreaming: false,
            error: (err as Error).message ?? 'Something went wrong',
          })
        }
        setThinkingAgents([])
      } finally {
        store.setStreaming(false)
        abortRef.current = null
      }
    },
    [activeConv, store]
  )

  const handleStop = () => {
    abortRef.current?.abort()
  }

  if (!activeConv) {
    return (
      <div className="flex flex-1 items-center justify-center text-center p-8">
        <div className="space-y-2">
          <Brain className="h-8 w-8 text-foreground/20 mx-auto" />
          <p className="text-sm text-foreground/40">Select a conversation to begin</p>
        </div>
      </div>
    )
  }

  const messages = activeConv.messages

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Conversation header */}
      <div className="flex-shrink-0 border-b border-border px-4 py-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground truncate">{activeConv.title}</h2>
          <div className="flex items-center gap-1.5">
            {store.isStreaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-[11px] text-primary bg-primary-subtle px-2 py-0.5 rounded-full"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary agent-active" />
                Generating
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              What would you like to explore?
            </h3>
            <p className="text-sm text-foreground/50 max-w-sm leading-relaxed">
              Ask a question, request research, practice an interview question, or start a study session.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-sm">
              {[
                'Explain transformer architecture',
                'Research: best practices for system design interviews',
                'Give me a hard ML interview question',
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => store.setInputValue(prompt)}
                  className="text-left rounded-lg border border-border px-3 py-2 text-xs text-foreground/60 hover:bg-muted hover:text-foreground hover:border-border-strong transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-2">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* Input */}
      <MessageInput
        onSend={handleSend}
        isStreaming={store.isStreaming}
        onStop={handleStop}
      />
    </div>
  )
}
