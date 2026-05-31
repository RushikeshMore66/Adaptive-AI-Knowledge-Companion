export type ResearchStatus = 'idle' | 'running' | 'completed' | 'error'

export type ResearchSource = {
  id: string
  title: string
  url: string
  domain: string
  snippet: string
  relevanceScore: number   // 0–1
  publishedDate?: string
  author?: string
  sourceType: 'web' | 'academic' | 'news' | 'document'
  isVerified: boolean
}

export type ResearchEvidence = {
  id: string
  claim: string
  supportingSources: string[]   // source IDs
  confidence: 'high' | 'medium' | 'low'
  contradictingSources?: string[]
  category: 'fact' | 'opinion' | 'statistic' | 'definition'
}

export type ResearchFinding = {
  id: string
  title: string
  summary: string
  evidence: ResearchEvidence[]
  importance: 'critical' | 'major' | 'minor'
}

export type ResearchReport = {
  id: string
  query: string
  executiveSummary: string
  keyFindings: ResearchFinding[]
  comparisons?: Array<{ aspect: string; items: Record<string, string> }>
  recommendations: string[]
  citations: ResearchSource[]
  conclusion: string
  generatedAt: string
  wordCount: number
  confidence: number           // 0–1
}

export type ResearchSession = {
  id: string
  query: string
  status: ResearchStatus
  sources: ResearchSource[]
  evidence: ResearchEvidence[]
  report?: ResearchReport
  startedAt: string
  completedAt?: string
  agentSteps: ResearchAgentStep[]
  progress: number             // 0–100
}

export type ResearchAgentStep = {
  id: string
  step: string
  description: string
  status: 'pending' | 'active' | 'done' | 'error'
  timestamp?: string
  resultsCount?: number
}

export type ResearchHistoryItem = {
  id: string
  query: string
  summary: string
  createdAt: string
  sourceCount: number
  hasReport: boolean
}
