import { apiClient } from '@/src/lib/api-client'
import type { ResearchSession, ResearchHistoryItem, ResearchAgentStep } from '@/src/types/research'

export const researchService = {
  async startResearch(query: string): Promise<ResearchSession> {
    const { data } = await apiClient.post<ResearchSession>('/api/research/start', { query })
    return data
  },

  async getSession(id: string): Promise<ResearchSession> {
    const { data } = await apiClient.get<ResearchSession>(`/api/research/sessions/${id}`)
    return data
  },

  async getHistory(): Promise<ResearchHistoryItem[]> {
    const { data } = await apiClient.get<ResearchHistoryItem[]>('/api/research/history')
    return data
  },

  async getProgress(id: string): Promise<{ progress: number; steps: ResearchAgentStep[] }> {
    const { data } = await apiClient.get(`/api/research/sessions/${id}/progress`)
    return data
  },

  async generateReport(sessionId: string): Promise<ResearchSession> {
    const { data } = await apiClient.post<ResearchSession>(
      `/api/research/sessions/${sessionId}/report`
    )
    return data
  },

  async deleteSession(id: string): Promise<void> {
    await apiClient.delete(`/api/research/sessions/${id}`)
  },

  async streamResearch(
    query: string,
    onUpdate: (update: { step: string; progress: number; data?: unknown }) => void,
    signal?: AbortSignal
  ): Promise<ResearchSession> {
    return new Promise((resolve, reject) => {
      const controller = new AbortController()
      const combinedSignal = signal ?? controller.signal

      fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/research/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: combinedSignal,
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`Research failed: ${res.status}`)
          const reader = res.body!.getReader()
          const decoder = new TextDecoder()
          let finalSession: ResearchSession | null = null

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            for (const line of chunk.split('\n').filter((l) => l.startsWith('data: '))) {
              try {
                const payload = JSON.parse(line.slice(6))
                if (payload.type === 'complete') {
                  finalSession = payload.session
                } else {
                  onUpdate(payload)
                }
              } catch {
                // skip malformed
              }
            }
          }

          if (finalSession) resolve(finalSession)
          else reject(new Error('Research stream ended without result'))
        })
        .catch(reject)
    })
  },
}
