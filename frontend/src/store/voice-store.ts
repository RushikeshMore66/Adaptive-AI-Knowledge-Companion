import { create } from 'zustand'
import type { VoiceState, VoiceMode, VoiceSession, VoiceConfig, TranscriptEntry } from '@/src/types/voice'

type VoiceStoreState = {
  session: VoiceSession | null
  voiceState: VoiceState
  config: VoiceConfig
  isInitialized: boolean
  permissionGranted: boolean | null
  error: string | null

  setVoiceState: (s: VoiceState) => void
  setConfig: (c: Partial<VoiceConfig>) => void
  startSession: (mode: VoiceMode) => void
  endSession: () => void
  addTranscriptEntry: (e: TranscriptEntry) => void
  updateLastEntry: (text: string) => void
  setPermission: (v: boolean) => void
  setError: (e: string | null) => void
  clearTranscript: () => void
}

export const useVoiceStore = create<VoiceStoreState>()((set, get) => ({
  session: null,
  voiceState: 'idle',
  config: {
    mode: 'tutor',
    language: 'en-US',
    speed: 1.0,
    autoStopMs: 1500,
  },
  isInitialized: false,
  permissionGranted: null,
  error: null,

  setVoiceState: (s) => set({ voiceState: s }),
  setConfig: (c) => set((st) => ({ config: { ...st.config, ...c } })),

  startSession: (mode) => {
    const id = crypto.randomUUID()
    set({
      session: {
        id,
        mode,
        state: 'listening',
        transcript: [],
        startedAt: new Date().toISOString(),
        totalDurationMs: 0,
        isActive: true,
      },
      voiceState: 'listening',
      error: null,
    })
  },

  endSession: () =>
    set((s) => ({
      session: s.session ? { ...s.session, isActive: false } : null,
      voiceState: 'idle',
    })),

  addTranscriptEntry: (e) =>
    set((s) => ({
      session: s.session
        ? { ...s.session, transcript: [...s.session.transcript, e] }
        : null,
    })),

  updateLastEntry: (text) =>
    set((s) => {
      if (!s.session) return {}
      const transcript = [...s.session.transcript]
      if (transcript.length > 0) {
        transcript[transcript.length - 1] = {
          ...transcript[transcript.length - 1],
          text,
        }
      }
      return { session: { ...s.session, transcript } }
    }),

  setPermission: (v) => set({ permissionGranted: v, isInitialized: true }),
  setError: (e) => set({ error: e, voiceState: e ? 'error' : get().voiceState }),
  clearTranscript: () =>
    set((s) => ({
      session: s.session ? { ...s.session, transcript: [] } : null,
    })),
}))
