import { apiClient, streamRequest } from '@/src/lib/api-client'
import type { ChatRequest, ChatResponse, Conversation, StreamChunk } from '@/src/types/chat'

export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    const { data } = await apiClient.get<Conversation[]>('/api/chat/conversations')
    return data
  },

  async getConversation(id: string): Promise<Conversation> {
    const { data } = await apiClient.get<Conversation>(`/api/chat/conversations/${id}`)
    return data
  },

  async createConversation(title?: string): Promise<Conversation> {
    const { data } = await apiClient.post<Conversation>('/api/chat/conversations', {
      title: title ?? 'New Conversation',
    })
    return data
  },

  async deleteConversation(id: string): Promise<void> {
    await apiClient.delete(`/api/chat/conversations/${id}`)
  },

  async sendMessage(req: ChatRequest): Promise<ChatResponse> {
    const { data } = await apiClient.post<ChatResponse>('/api/chat/message', req)
    return data
  },

  async streamMessage(
    req: ChatRequest,
    onChunk: (chunk: StreamChunk) => void,
    signal?: AbortSignal
  ): Promise<void> {
    await streamRequest(
      '/api/chat/stream',
      req as unknown as Record<string, unknown>,
      (raw) => {
        try {
          const chunk = JSON.parse(raw) as StreamChunk
          onChunk(chunk)
        } catch {
          // partial JSON — ignore
        }
      },
      signal
    )
  },

  async generateTitle(conversationId: string): Promise<string> {
    const { data } = await apiClient.post<{ title: string }>(
      `/api/chat/conversations/${conversationId}/title`
    )
    return data.title
  },
}
