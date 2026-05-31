'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageSquare, Trash2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/src/store/workspace-store'

export function ConversationList() {
  const { conversations, activeConversationId, setActiveConversation, addConversation, deleteConversation } =
    useWorkspaceStore()
  const [search, setSearch] = useState('')

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleNew = () => {
    const id = crypto.randomUUID()
    addConversation({
      id,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 0,
    })
    setActiveConversation(id)
  }

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffH = Math.floor(diffMs / 3_600_000)
    const diffD = Math.floor(diffMs / 86_400_000)
    if (diffH < 1) return 'Just now'
    if (diffH < 24) return `${diffH}h ago`
    if (diffD < 7) return `${diffD}d ago`
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
            Conversations
          </h3>
          <button
            onClick={handleNew}
            className="flex h-6 w-6 items-center justify-center rounded-md text-foreground/40 transition-colors hover:bg-muted hover:text-primary"
            title="New conversation"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 h-7 px-2 rounded-md border border-border bg-background">
          <Search className="h-3 w-3 text-foreground/30 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-foreground/30 outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-3 text-center">
              <MessageSquare className="h-6 w-6 text-foreground/20 mb-2" />
              <p className="text-xs text-foreground/40">No conversations yet</p>
            </div>
          ) : (
            filtered.map((conv) => (
              <motion.div
                key={conv.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  onClick={() => setActiveConversation(conv.id)}
                  className={cn(
                    'group w-full rounded-md p-2 text-left transition-colors',
                    conv.id === activeConversationId
                      ? 'bg-primary/10 text-foreground'
                      : 'hover:bg-muted text-foreground/70'
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="flex-1 text-xs font-medium truncate leading-snug">
                      {conv.title}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id) }}
                      className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-foreground/30 hover:text-danger transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-foreground/35">
                      {conv.messageCount} msg{conv.messageCount !== 1 ? 's' : ''}
                    </span>
                    <span className="text-[10px] text-foreground/35">
                      {formatTime(conv.updatedAt)}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
