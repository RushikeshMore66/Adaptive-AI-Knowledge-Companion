export type TimeRange = '7d' | '30d' | '90d' | 'all'

export type MetricCard = {
  id: string
  label: string
  value: number | string
  change?: number              // % change
  changeDirection?: 'up' | 'down' | 'neutral'
  unit?: string
  description?: string
}

export type AnalyticsDashboard = {
  overview: {
    totalSessions: number
    totalStudyHours: number
    averageScore: number
    currentStreak: number
    readinessScore: number
    weeklyGoalProgress: number
  }
  learningProgress: Array<{
    date: string
    score: number
    questionsAnswered: number
    timeSpentMinutes: number
  }>
  interviewPerformance: Array<{
    date: string
    overallScore: number
    technicalScore: number
    behavioralScore: number
    topic: string
  }>
  researchActivity: Array<{
    date: string
    sessionsCount: number
    sourcesAnalyzed: number
  }>
  knowledgeGrowth: Array<{
    date: string
    topicsLearned: number
    skillsImproved: number
  }>
  skillBreakdown: Array<{
    skill: string
    current: number
    target: number
    trend: 'up' | 'down' | 'stable'
  }>
  weakAreas: Array<{
    topic: string
    score: number
    sessionsNeeded: number
  }>
  topAchievements: Array<{
    id: string
    title: string
    description: string
    earnedAt: string
    icon: string
  }>
}
