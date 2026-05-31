import { apiClient } from '@/src/lib/api-client'
import type { VoiceMode, TranscriptEntry } from '@/src/types/voice'

export const voiceService = {
  async transcribeAudio(audioBlob: Blob): Promise<{ text: string; confidence: number }> {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')
    const { data } = await apiClient.post('/api/voice/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async synthesizeSpeech(text: string, voice?: string): Promise<Blob> {
    const response = await apiClient.post(
      '/api/voice/synthesize',
      { text, voice: voice ?? 'nova' },
      { responseType: 'blob' }
    )
    return response.data as Blob
  },

  async processVoiceMessage(
    transcript: string,
    mode: VoiceMode,
    sessionId: string
  ): Promise<{ response: string; audioUrl?: string }> {
    const { data } = await apiClient.post('/api/voice/process', {
      transcript,
      mode,
      sessionId,
    })
    return data
  },

  async getSession(id: string): Promise<{ transcript: TranscriptEntry[] }> {
    const { data } = await apiClient.get(`/api/voice/sessions/${id}`)
    return data
  },

  checkBrowserSupport(): { mediaRecorder: boolean; speechRecognition: boolean } {
    return {
      mediaRecorder: typeof MediaRecorder !== 'undefined',
      speechRecognition:
        typeof window !== 'undefined' &&
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
    }
  },
}
