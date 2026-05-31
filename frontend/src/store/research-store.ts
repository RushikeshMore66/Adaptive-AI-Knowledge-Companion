import { create } from 'zustand'
import type { ResearchSession, ResearchHistoryItem, ResearchSource, ResearchEvidence } from '@/src/types/research'

type ResearchState = {
  // Sessions
  sessions: ResearchHistoryItem[]
  activeSession: ResearchSession | null
  setActiveSession: (s: ResearchSession | null) => void
  addSession: (s: ResearchHistoryItem) => void
  updateActiveSession: (updates: Partial<ResearchSession>) => void

  // Query
  currentQuery: string
  setCurrentQuery: (q: string) => void

  // Sources
  selectedSources: string[]
  toggleSource: (id: string) => void
  clearSelectedSources: () => void

  // Evidence panel
  selectedEvidence: ResearchEvidence | null
  setSelectedEvidence: (e: ResearchEvidence | null) => void

  // UI state
  activeView: 'query' | 'sources' | 'evidence' | 'report'
  setActiveView: (v: ResearchState['activeView']) => void
  isResearching: boolean
  setIsResearching: (v: boolean) => void
  progress: number
  setProgress: (p: number) => void
  error: string | null
  setError: (e: string | null) => void
}

export const useResearchStore = create<ResearchState>()((set) => ({
  sessions: [],
  activeSession: null,
  setActiveSession: (s) => set({ activeSession: s }),
  addSession: (s) =>
    set((st) => ({ sessions: [s, ...st.sessions] })),
  updateActiveSession: (updates) =>
    set((st) => ({
      activeSession: st.activeSession ? { ...st.activeSession, ...updates } : null,
    })),

  currentQuery: '',
  setCurrentQuery: (q) => set({ currentQuery: q }),

  selectedSources: [],
  toggleSource: (id) =>
    set((s) => ({
      selectedSources: s.selectedSources.includes(id)
        ? s.selectedSources.filter((sid) => sid !== id)
        : [...s.selectedSources, id],
    })),
  clearSelectedSources: () => set({ selectedSources: [] }),

  selectedEvidence: null,
  setSelectedEvidence: (e) => set({ selectedEvidence: e }),

  activeView: 'query',
  setActiveView: (v) => set({ activeView: v }),
  isResearching: false,
  setIsResearching: (v) => set({ isResearching: v }),
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  error: null,
  setError: (e) => set({ error: e }),
}))
