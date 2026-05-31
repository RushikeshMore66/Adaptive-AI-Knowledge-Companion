import { create } from 'zustand'
import type { LearningProfile, LearningStats, LearningTopic } from '@/src/types/learning'

type LearningState = {
  profile: LearningProfile | null
  stats: LearningStats | null
  selectedTopic: LearningTopic | null
  activeView: 'overview' | 'skills' | 'roadmap' | 'topics'
  isLoading: boolean
  error: string | null

  setProfile: (p: LearningProfile | null) => void
  setStats: (s: LearningStats | null) => void
  setSelectedTopic: (t: LearningTopic | null) => void
  setActiveView: (v: LearningState['activeView']) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  updateTopicMastery: (topicId: string, score: number) => void
}

export const useLearningStore = create<LearningState>()((set) => ({
  profile: null,
  stats: null,
  selectedTopic: null,
  activeView: 'overview',
  isLoading: false,
  error: null,

  setProfile: (p) => set({ profile: p }),
  setStats: (s) => set({ stats: s }),
  setSelectedTopic: (t) => set({ selectedTopic: t }),
  setActiveView: (v) => set({ activeView: v }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
  updateTopicMastery: (topicId, score) =>
    set((s) => {
      if (!s.profile) return {}
      return {
        profile: {
          ...s.profile,
          recommendedTopics: s.profile.recommendedTopics.map((t) =>
            t.id === topicId ? { ...t, masteryScore: score } : t
          ),
        },
      }
    }),
}))
