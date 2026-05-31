export type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error'
export type VoiceMode = 'tutor' | 'mentor' | 'research' | 'interview'

export type TranscriptEntry = {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: string
  audioUrl?: string
  durationMs?: number
}

export type VoiceSession = {
  id: string
  mode: VoiceMode
  state: VoiceState
  transcript: TranscriptEntry[]
  startedAt?: string
  totalDurationMs: number
  isActive: boolean
}

export type VoiceConfig = {
  mode: VoiceMode
  language: string
  speed: number         // 0.5 – 2.0
  autoStopMs: number    // silence detection threshold
}
