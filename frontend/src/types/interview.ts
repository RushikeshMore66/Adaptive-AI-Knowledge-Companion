export type InterviewDifficulty = 'easy' | 'medium' | 'hard' | 'adaptive'
export type InterviewType = 'technical' | 'behavioral' | 'system_design' | 'mixed'
export type InterviewMode = 'text' | 'voice'
export type InterviewStatus = 'setup' | 'active' | 'paused' | 'completed' | 'reviewing'

export type InterviewQuestion = {
  id: string
  text: string
  type: 'technical' | 'behavioral' | 'system_design' | 'follow_up'
  difficulty: InterviewDifficulty
  topic: string
  expectedKeyPoints?: string[]
  followUps?: string[]
  timeLimit?: number     // seconds
}

export type InterviewAnswer = {
  questionId: string
  text: string
  audioUrl?: string
  durationSeconds: number
  submittedAt: string
}

export type QuestionEvaluation = {
  questionId: string
  score: number          // 0–10
  feedback: string
  strengths: string[]
  improvements: string[]
  keyPointsCovered: string[]
  keyPointsMissed: string[]
  technicalAccuracy?: number
  communicationScore?: number
}

export type InterviewSession = {
  id: string
  type: InterviewType
  mode: InterviewMode
  difficulty: InterviewDifficulty
  topic: string
  targetRole?: string
  status: InterviewStatus
  questions: InterviewQuestion[]
  answers: InterviewAnswer[]
  evaluations: QuestionEvaluation[]
  currentQuestionIndex: number
  startedAt?: string
  completedAt?: string
  overallScore?: number
  totalDurationSeconds?: number
}

export type InterviewReport = {
  sessionId: string
  overallScore: number        // 0–100
  readinessScore: number      // 0–100
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  topicScores: Record<string, number>
  questionBreakdown: QuestionEvaluation[]
  comparedToAverage?: number
  nextSteps: string[]
  estimatedReadinessDate?: string
}

export type InterviewSetupConfig = {
  type: InterviewType
  mode: InterviewMode
  difficulty: InterviewDifficulty
  topic: string
  targetRole?: string
  numberOfQuestions: number
  timeLimit?: number
  focusAreas?: string[]
}

export type InterviewWeakness = {
  topic: string
  occurrences: number
  averageScore: number
  lastSeen: string
  improvement: number    // positive = improving, negative = declining
}
