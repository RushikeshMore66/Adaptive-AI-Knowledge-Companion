import { apiClient } from '@/src/lib/api-client'

export type WorkspaceStats = {
  totalConversations: number
  totalMessages: number
  totalTokensUsed: number
  averageResponseTimeMs: number
  topTopics: Array<{ topic: string; count: number }>
}

export const workspaceService = {
  async getStats(): Promise<WorkspaceStats> {
    const { data } = await apiClient.get<WorkspaceStats>('/api/workspace/stats')
    return data
  },

  async clearMemory(): Promise<void> {
    await apiClient.post('/api/workspace/memory/clear')
  },

  async exportConversation(conversationId: string, format: 'pdf' | 'markdown'): Promise<Blob> {
    const response = await apiClient.get(
      `/api/workspace/conversations/${conversationId}/export?format=${format}`,
      { responseType: 'blob' }
    )
    return response.data as Blob
  },

  async searchConversations(query: string): Promise<Array<{ id: string; title: string; snippet: string; date: string }>> {
    const { data } = await apiClient.get(`/api/workspace/search?q=${encodeURIComponent(query)}`)
    return data
  },
}
