import { create } from 'zustand'
import type { InterviewSession, InterviewSetupConfig, InterviewReport, InterviewWeakness } from '@/src/types/interview'

type InterviewState = {
  // Session
  currentSession: InterviewSession | null
  sessionHistory: Array<{ id: string; topic: string; score: number; date: string }>
  weaknesses: InterviewWeakness[]

  // Setup
  setupConfig: InterviewSetupConfig
  updateSetupConfig: (c: Partial<InterviewSetupConfig>) => void

  // Session actions
  setCurrentSession: (s: InterviewSession | null) => void
  updateCurrentSession: (updates: Partial<InterviewSession>) => void
  addToHistory: (item: InterviewState['sessionHistory'][number]) => void

  // Report
  lastReport: InterviewReport | null
  setLastReport: (r: InterviewReport | null) => void

  // UI
  activeView: 'setup' | 'session' | 'report' | 'history'
  setActiveView: (v: InterviewState['activeView']) => void
  isLoading: boolean
  setLoading: (v: boolean) => void
  error: string | null
  setError: (e: string | null) => void
  isListening: boolean
  setListening: (v: boolean) => void
}

const defaultSetupConfig: InterviewSetupConfig = {
  type: 'technical',
  mode: 'text',
  difficulty: 'adaptive',
  topic: '',
  numberOfQuestions: 5,
}

export const useInterviewStore = create<InterviewState>()((set) => ({
  currentSession: null,
  sessionHistory: [],
  weaknesses: [],

  setupConfig: defaultSetupConfig,
  updateSetupConfig: (c) =>
    set((s) => ({ setupConfig: { ...s.setupConfig, ...c } })),

  setCurrentSession: (s) => set({ currentSession: s }),
  updateCurrentSession: (updates) =>
    set((s) => ({
      currentSession: s.currentSession
        ? { ...s.currentSession, ...updates }
        : null,
    })),
  addToHistory: (item) =>
    set((s) => ({ sessionHistory: [item, ...s.sessionHistory] })),

  lastReport: null,
  setLastReport: (r) => set({ lastReport: r }),

  activeView: 'setup',
  setActiveView: (v) => set({ activeView: v }),
  isLoading: false,
  setLoading: (v) => set({ isLoading: v }),
  error: null,
  setError: (e) => set({ error: e }),
  isListening: false,
  setListening: (v) => set({ isListening: v }),
}))
