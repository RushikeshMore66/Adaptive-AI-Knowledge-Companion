import { apiClient } from '@/src/lib/api-client'
import type { KnowledgeGraph, LearningPath, NodeSearchResult } from '@/src/types/graph'

export const graphService = {
  async getGraph(): Promise<KnowledgeGraph> {
    const { data } = await apiClient.get<KnowledgeGraph>('/api/graph')
    return data
  },

  async searchNodes(query: string): Promise<NodeSearchResult[]> {
    const { data } = await apiClient.get<NodeSearchResult[]>(`/api/graph/search?q=${encodeURIComponent(query)}`)
    return data
  },

  async getLearningPaths(): Promise<LearningPath[]> {
    const { data } = await apiClient.get<LearningPath[]>('/api/graph/paths')
    return data
  },

  async getLearningPath(id: string): Promise<LearningPath> {
    const { data } = await apiClient.get<LearningPath>(`/api/graph/paths/${id}`)
    return data
  },

  async getNodeDetails(id: string): Promise<{ node: KnowledgeGraph['nodes'][number]; related: KnowledgeGraph['nodes'] }> {
    const { data } = await apiClient.get(`/api/graph/nodes/${id}`)
    return data
  },

  async refreshGraph(): Promise<KnowledgeGraph> {
    const { data } = await apiClient.post<KnowledgeGraph>('/api/graph/refresh')
    return data
  },
}
