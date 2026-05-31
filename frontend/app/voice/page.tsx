import type { Metadata } from 'next'
import { VoiceAssistant } from '@/components/voice/VoiceOrb'
export const metadata: Metadata = { title: 'Voice Assistant' }
export default function VoicePage() { return <VoiceAssistant /> }
