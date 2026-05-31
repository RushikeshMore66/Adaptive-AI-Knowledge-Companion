import { create } from 'zustand'
import type { Conversation, Message, ActiveAgent, Citation, MemoryEntry } from '@/src/types/chat'

type WorkspaceState = {
  // Conversations
  conversations: Conversation[]
  activeConversationId: string | null
  setActiveConversation: (id: string | null) => void
  addConversation: (c: Conversation) => void
  updateConversation: (id: string, updates: Partial<Conversation>) => void
  deleteConversation: (id: string) => void

  // Messages
  addMessage: (conversationId: string, message: Message) => void
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void
  appendMessageContent: (conversationId: string, messageId: string, delta: string) => void

  // Streaming
  isStreaming: boolean
  streamingMessageId: string | null
  setStreaming: (v: boolean, messageId?: string) => void

  // Active agents
  activeAgents: ActiveAgent[]
  setActiveAgents: (agents: ActiveAgent[]) => void
  updateAgent: (id: string, updates: Partial<ActiveAgent>) => void

  // Intelligence panel
  currentCitations: Citation[]
  currentMemory: MemoryEntry[]
  setCurrentCitations: (c: Citation[]) => void
  setCurrentMemory: (m: MemoryEntry[]) => void
  activePanel: 'agents' | 'sources' | 'memory' | 'context'
  setActivePanel: (p: WorkspaceState['activePanel']) => void

  // Input
  inputValue: string
  setInputValue: (v: string) => void

  // Error
  error: string | null
  setError: (e: string | null) => void
}

export const useWorkspaceStore = create<WorkspaceState>()((set, get) => ({
  conversations: [],
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  addConversation: (c) =>
    set((s) => ({ conversations: [c, ...s.conversations] })),
  updateConversation: (id, updates) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  deleteConversation: (id) =>
    set((s) => ({
      conversations: s.conversations.filter((c) => c.id !== id),
      activeConversationId:
        s.activeConversationId === id ? null : s.activeConversationId,
    })),

  addMessage: (conversationId, message) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, message],
              updatedAt: new Date().toISOString(),
              messageCount: c.messageCount + 1,
            }
          : c
      ),
    })),
  updateMessage: (conversationId, messageId, updates) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, ...updates } : m
              ),
            }
          : c
      ),
    })),
  appendMessageContent: (conversationId, messageId, delta) => {
    const conversations = get().conversations.map((c) =>
      c.id === conversationId
        ? {
            ...c,
            messages: c.messages.map((m) =>
              m.id === messageId ? { ...m, content: m.content + delta } : m
            ),
          }
        : c
    )
    set({ conversations })
  },

  isStreaming: false,
  streamingMessageId: null,
  setStreaming: (v, messageId) =>
    set({ isStreaming: v, streamingMessageId: messageId ?? null }),

  activeAgents: [],
  setActiveAgents: (agents) => set({ activeAgents: agents }),
  updateAgent: (id, updates) =>
    set((s) => ({
      activeAgents: s.activeAgents.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),

  currentCitations: [],
  currentMemory: [],
  setCurrentCitations: (c) => set({ currentCitations: c }),
  setCurrentMemory: (m) => set({ currentMemory: m }),
  activePanel: 'agents',
  setActivePanel: (p) => set({ activePanel: p }),

  inputValue: '',
  setInputValue: (v) => set({ inputValue: v }),

  error: null,
  setError: (e) => set({ error: e }),
}))

// Derived selector: active conversation
export const selectActiveConversation = (s: WorkspaceState) =>
  s.conversations.find((c) => c.id === s.activeConversationId) ?? null
