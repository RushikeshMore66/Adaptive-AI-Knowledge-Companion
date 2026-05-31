import { apiClient } from '@/src/lib/api-client'
import type { LearningProfile, LearningStats, LearningTopic } from '@/src/types/learning'

export const learningService = {
  async getProfile(): Promise<LearningProfile> {
    const { data } = await apiClient.get<LearningProfile>('/api/learning/profile')
    return data
  },

  async getStats(timeRange: '7d' | '30d' | '90d' = '30d'): Promise<LearningStats> {
    const { data } = await apiClient.get<LearningStats>(`/api/learning/stats?range=${timeRange}`)
    return data
  },

  async getTopic(id: string): Promise<LearningTopic> {
    const { data } = await apiClient.get<LearningTopic>(`/api/learning/topics/${id}`)
    return data
  },

  async submitAnswer(
    topicId: string,
    questionId: string,
    answer: string
  ): Promise<{ isCorrect: boolean; explanation: string; score: number }> {
    const { data } = await apiClient.post(`/api/learning/topics/${topicId}/answer`, {
      questionId,
      answer,
    })
    return data
  },

  async updateGoal(skillId: string, targetScore: number): Promise<void> {
    await apiClient.put(`/api/learning/skills/${skillId}/goal`, { targetScore })
  },

  async getRoadmap(): Promise<{ milestones: LearningProfile['milestones']; weeklyPlan: LearningProfile['weeklyPlan'] }> {
    const { data } = await apiClient.get('/api/learning/roadmap')
    return data
  },

  async markTopicComplete(topicId: string): Promise<void> {
    await apiClient.post(`/api/learning/topics/${topicId}/complete`)
  },
}
