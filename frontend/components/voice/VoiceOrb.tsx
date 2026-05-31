'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Square, Volume2, BookOpen, Brain, Search, UserCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useVoiceStore } from '@/src/store/voice-store'
import type { VoiceMode } from '@/src/types/voice'

const modeConfig: Record<VoiceMode, { label: string; description: string; icon: React.ComponentType<{ className?: string }>; color: string; gradient: string }> = {
  tutor:     { label: 'Tutor',     description: 'Explains concepts step by step',    icon: BookOpen,  color: '#2563EB', gradient: 'from-blue-500/20 to-blue-600/10' },
  mentor:    { label: 'Mentor',    description: 'Career & learning guidance',         icon: Brain,     color: '#9333EA', gradient: 'from-purple-500/20 to-purple-600/10' },
  research:  { label: 'Research',  description: 'Deep research conversations',        icon: Search,    color: '#EA580C', gradient: 'from-orange-500/20 to-orange-600/10' },
  interview: { label: 'Interview', description: 'Practice interview questions',       icon: UserCheck, color: '#16A34A', gradient: 'from-green-500/20 to-green-600/10' },
}

// ─── Orb Component ────────────────────────────────────────────────────────────
function VoiceOrbCore({ state, color }: { state: string; color: string }) {
  const isListening = state === 'listening'
  const isSpeaking = state === 'speaking'
  const isThinking = state === 'thinking'

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      {/* Outer pulse rings */}
      {isListening && (
        <>
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 160 + i * 40, height: 160 + i * 40, borderWidth: 1, borderColor: color + '40', borderStyle: 'solid' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}

      {/* Speaking waveform rings */}
      {isSpeaking && (
        <>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 160 + i * 30, height: 160 + i * 30, borderWidth: 2, borderColor: color + '60', borderStyle: 'solid' }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </>
      )}

      {/* Core orb */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
        style={{
          width: 128, height: 128,
          background: `radial-gradient(circle at 35% 35%, ${color}dd, ${color}88)`,
          boxShadow: `0 0 ${isListening ? '40px' : '20px'} ${color}${isListening ? '60' : '30'}`,
        }}
        animate={{
          scale: isListening ? [1, 1.04, 1] : isSpeaking ? [1, 1.06, 1] : 1,
        }}
        transition={{
          duration: isListening ? 1.5 : 0.6,
          repeat: isListening || isSpeaking ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        {/* Inner glow */}
        <motion.div className="absolute inset-4 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, white, transparent)' }} />

        {/* Icon */}
        <div className="relative z-10">
          {isThinking ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-white/40 border-t-white" />
            </motion.div>
          ) : (
            <Volume2 className="h-8 w-8 text-white" />
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Transcript ───────────────────────────────────────────────────────────────
function TranscriptPane({ entries }: { entries: Array<{ id: string; role: string; text: string; timestamp: string }> }) {
  return (
    <div className="w-full max-w-lg space-y-2 max-h-52 overflow-y-auto">
      <AnimatePresence initial={false}>
        {entries.map(e => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('flex gap-2', e.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div className={cn(
              'max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm',
              e.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-surface border border-border text-foreground rounded-tl-sm'
            )}>
              {e.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function VoiceAssistant() {
  const { session, voiceState, config, setConfig, startSession, endSession } = useVoiceStore()
  const [demoTranscript] = useState([
    { id: '1', role: 'user', text: 'Explain the attention mechanism in transformers', timestamp: '' },
    { id: '2', role: 'assistant', text: 'The attention mechanism allows the model to focus on different parts of the input sequence when generating each output token. It computes query, key, and value vectors...', timestamp: '' },
  ])

  const isActive = session?.isActive ?? false
  const currentMode = config.mode
  const meta = modeConfig[currentMode]
  const activeColor = meta.color

  const stateLabel: Record<string, string> = {
    idle: 'Ready to listen',
    listening: 'Listening...',
    thinking: 'Processing...',
    speaking: 'Speaking...',
    error: 'Error — tap to retry',
  }

  return (
    <div className="min-h-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-foreground">Voice Assistant</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Hands-free AI interaction with natural conversation</p>
        </div>

        {/* Mode selector */}
        <div className="flex justify-center gap-2 mb-10">
          {(Object.entries(modeConfig) as [VoiceMode, typeof modeConfig[VoiceMode]][]).map(([id, m]) => (
            <button
              key={id}
              onClick={() => setConfig({ mode: id })}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all',
                currentMode === id
                  ? 'border-primary bg-primary-subtle text-primary shadow-sm'
                  : 'border-border text-foreground/50 hover:border-border-strong hover:text-foreground'
              )}
            >
              <m.icon className="h-3 w-3" />
              {m.label}
            </button>
          ))}
        </div>

        {/* Orb */}
        <div className="flex flex-col items-center gap-6">
          <VoiceOrbCore state={isActive ? voiceState : 'idle'} color={activeColor} />

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{stateLabel[isActive ? voiceState : 'idle']}</p>
            <p className="text-xs text-foreground/40 mt-0.5">{meta.description}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {isActive ? (
              <>
                <button
                  onClick={() => endSession()}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                  title="End Session"
                  aria-label="End Session"
                >
                  <Square className="h-5 w-5 fill-current" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all"
                  style={{ backgroundColor: activeColor }}
                  title="Mute microphone"
                  aria-label="Mute microphone"
                >
                  <MicOff className="h-7 w-7 text-white" />
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => startSession(currentMode)}
                className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-all"
                style={{
                  backgroundColor: activeColor,
                  boxShadow: `0 8px 32px ${activeColor}40`,
                }}
                title="Start voice session"
                aria-label="Start voice session"
              >
                <Mic className="h-7 w-7 text-white" />
              </motion.button>
            )}
          </div>

          <p className="text-xs text-foreground/30">{isActive ? 'Tap mic to mute · Square to stop' : 'Tap to start voice session'}</p>
        </div>

        {/* Transcript */}
        {demoTranscript.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3 text-center">Conversation</p>
            <TranscriptPane entries={demoTranscript} />
          </div>
        )}
      </div>
    </div>
  )
}
