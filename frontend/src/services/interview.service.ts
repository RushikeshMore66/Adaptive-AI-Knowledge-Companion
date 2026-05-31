import { apiClient } from '@/src/lib/api-client'
import type {
  InterviewSession,
  InterviewSetupConfig,
  InterviewReport,
  InterviewWeakness,
  InterviewQuestion,
  QuestionEvaluation,
} from '@/src/types/interview'

export const interviewService = {
  async createSession(config: InterviewSetupConfig): Promise<InterviewSession> {
    const { data } = await apiClient.post<InterviewSession>('/api/interview/sessions', config)
    return data
  },

  async getSession(id: string): Promise<InterviewSession> {
    const { data } = await apiClient.get<InterviewSession>(`/api/interview/sessions/${id}`)
    return data
  },

  async submitAnswer(
    sessionId: string,
    questionId: string,
    answer: string,
    durationSeconds: number
  ): Promise<QuestionEvaluation> {
    const { data } = await apiClient.post<QuestionEvaluation>(
      `/api/interview/sessions/${sessionId}/answers`,
      { questionId, answer, durationSeconds }
    )
    return data
  },

  async getNextQuestion(sessionId: string): Promise<InterviewQuestion | null> {
    const { data } = await apiClient.get<InterviewQuestion | null>(
      `/api/interview/sessions/${sessionId}/next-question`
    )
    return data
  },

  async finalizeSession(sessionId: string): Promise<InterviewReport> {
    const { data } = await apiClient.post<InterviewReport>(
      `/api/interview/sessions/${sessionId}/finalize`
    )
    return data
  },

  async getReport(sessionId: string): Promise<InterviewReport> {
    const { data } = await apiClient.get<InterviewReport>(
      `/api/interview/sessions/${sessionId}/report`
    )
    return data
  },

  async getWeaknesses(): Promise<InterviewWeakness[]> {
    const { data } = await apiClient.get<InterviewWeakness[]>('/api/interview/weaknesses')
    return data
  },

  async getHistory(): Promise<Array<{ id: string; topic: string; score: number; date: string }>> {
    const { data } = await apiClient.get('/api/interview/history')
    return data
  },
}
