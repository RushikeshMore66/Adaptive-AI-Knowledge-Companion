export type MessageRole = 'user' | 'assistant' | 'system'

export type AgentStatus = 'idle' | 'thinking' | 'active' | 'done' | 'error'

export type ActiveAgent = {
  id: string
  name: string
  type: 'planner' | 'memory' | 'research' | 'rag' | 'synthesizer'
  status: AgentStatus
  task?: string
  startedAt?: number
  completedAt?: number
}

export type Citation = {
  id: string
  title: string
  url?: string
  snippet: string
  relevanceScore?: number
  sourceType: 'web' | 'document' | 'knowledge_base' | 'memory'
}

export type MemoryEntry = {
  id: string
  content: string
  type: 'episodic' | 'semantic' | 'procedural'
  timestamp: string
  relevanceScore?: number
}

export type CodeBlock = {
  language: string
  code: string
  filename?: string
}

export type MessageContent = {
  type: 'text' | 'code' | 'table' | 'image'
  value: string
  meta?: Record<string, unknown>
}

export type Message = {
  id: string
  role: MessageRole
  content: string
  contentParts?: MessageContent[]
  timestamp: string
  isStreaming?: boolean
  agents?: ActiveAgent[]
  citations?: Citation[]
  memoryUsed?: MemoryEntry[]
  tokens?: number
  processingTimeMs?: number
  error?: string
}

export type Conversation = {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  summary?: string
  tags?: string[]
  agentWorkflow?: string
  messageCount: number
}

export type StreamChunk = {
  delta: string
  done: boolean
  agents?: ActiveAgent[]
  citations?: Citation[]
  memoryUsed?: MemoryEntry[]
}

export type ChatRequest = {
  conversationId?: string
  message: string
  mode?: 'default' | 'research' | 'tutor' | 'interview'
}

export type ChatResponse = {
  messageId: string
  conversationId: string
  content: string
  agents: ActiveAgent[]
  citations: Citation[]
  memoryUsed: MemoryEntry[]
  tokens: number
  processingTimeMs: number
}
