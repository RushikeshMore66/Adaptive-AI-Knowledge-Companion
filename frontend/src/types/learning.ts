export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type MasteryStatus = 'not_started' | 'learning' | 'practicing' | 'proficient' | 'mastered'

export type Skill = {
  id: string
  name: string
  category: string
  level: SkillLevel
  masteryStatus: MasteryStatus
  score: number          // 0–100
  lastPracticed?: string
  questionsAnswered: number
  correctAnswers: number
  weakTopics: string[]
  relatedSkills: string[]
}

export type LearningTopic = {
  id: string
  name: string
  description: string
  skillId: string
  difficulty: number     // 1–5
  masteryScore: number   // 0–100
  questionCount: number
  timeSpentMinutes: number
  isWeak: boolean
  isRecommended: boolean
  lastStudied?: string
}

export type LearningMilestone = {
  id: string
  title: string
  description: string
  targetDate: string
  completedDate?: string
  isCompleted: boolean
  skills: string[]
  progress: number       // 0–100
}

export type WeeklyPlanItem = {
  id: string
  topicId: string
  topicName: string
  estimatedMinutes: number
  isCompleted: boolean
  scheduledDate: string
  priority: 'high' | 'medium' | 'low'
}

export type LearningProfile = {
  userId: string
  overallScore: number        // 0–100
  readinessScore: number      // 0–100
  streakDays: number
  totalStudyMinutes: number
  topicsStudied: number
  questionsAnswered: number
  accuracy: number            // 0–100
  skills: Skill[]
  weakTopics: LearningTopic[]
  recommendedTopics: LearningTopic[]
  milestones: LearningMilestone[]
  weeklyPlan: WeeklyPlanItem[]
  recentActivity: LearningActivity[]
}

export type LearningActivity = {
  id: string
  type: 'question' | 'study' | 'milestone' | 'review' | 'assessment'
  description: string
  timestamp: string
  skillName?: string
  score?: number
  durationMinutes?: number
}

export type ProgressDataPoint = {
  date: string
  score: number
  questionsAnswered: number
  timeSpentMinutes: number
}

export type LearningStats = {
  weeklyProgress: ProgressDataPoint[]
  monthlyProgress: ProgressDataPoint[]
  skillBreakdown: Array<{ skill: string; score: number; target: number }>
  readinessTrend: Array<{ date: string; score: number }>
}
