import { apiClient } from '@/src/lib/api-client'
import type { AnalyticsDashboard, TimeRange } from '@/src/types/analytics'

export const analyticsService = {
  async getDashboard(range: TimeRange = '30d'): Promise<AnalyticsDashboard> {
    const { data } = await apiClient.get<AnalyticsDashboard>(`/api/analytics/dashboard?range=${range}`)
    return data
  },

  async exportReport(range: TimeRange): Promise<Blob> {
    const response = await apiClient.get(`/api/analytics/export?range=${range}`, {
      responseType: 'blob',
    })
    return response.data as Blob
  },
}
