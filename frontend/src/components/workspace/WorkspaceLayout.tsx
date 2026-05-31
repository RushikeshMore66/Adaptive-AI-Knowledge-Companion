'use client'

import { useEffect } from 'react'
import { ConversationList } from './ConversationList'
import { ChatContainer } from './ChatContainer'
import { IntelligencePanel } from './IntelligencePanel'
import { useWorkspaceStore } from '@/src/store/workspace-store'

export function WorkspaceLayout() {
  const { conversations, addConversation, setActiveConversation, activeConversationId } =
    useWorkspaceStore()

  // Auto-create a starter conversation if none exist
  useEffect(() => {
    if (conversations.length === 0) {
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
    } else if (!activeConversationId) {
      setActiveConversation(conversations[0].id)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex h-full overflow-hidden">
      {/* Col 1 — conversation list */}
      <div className="hidden lg:flex w-56 xl:w-64 flex-shrink-0 flex-col border-r border-border bg-sidebar">
        <ConversationList />
      </div>

      {/* Col 2 — chat */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <ChatContainer />
      </div>

      {/* Col 3 — intelligence panel */}
      <div className="hidden xl:flex w-72 flex-shrink-0 flex-col border-l border-border bg-sidebar">
        <IntelligencePanel />
      </div>
    </div>
  )
}
