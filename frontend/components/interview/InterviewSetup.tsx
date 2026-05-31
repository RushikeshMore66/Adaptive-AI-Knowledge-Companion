'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCheck, Mic, MessageSquare, Zap, ChevronRight, Clock, BarChart3, CheckCircle2, AlertCircle, Brain, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInterviewStore } from '@/src/store/interview-store'
import type { InterviewType, InterviewDifficulty, InterviewMode } from '@/src/types/interview'

// ─── Setup View ──────────────────────────────────────────────────────────────
function SetupView({ onStart }: { onStart: () => void }) {
  const { setupConfig, updateSetupConfig } = useInterviewStore()

  const types: Array<{ id: InterviewType; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'technical', label: 'Technical', desc: 'Algorithms, ML concepts', icon: Brain },
    { id: 'behavioral', label: 'Behavioral', desc: 'STAR method, soft skills', icon: UserCheck },
    { id: 'system_design', label: 'System Design', desc: 'Architecture decisions', icon: Zap },
    { id: 'mixed', label: 'Mixed', desc: 'All types combined', icon: Target },
  ]

  const difficulties: Array<{ id: InterviewDifficulty; label: string; color: string }> = [
    { id: 'easy', label: 'Easy', color: 'text-success border-success/30 bg-success-subtle' },
    { id: 'medium', label: 'Medium', color: 'text-warning border-warning/30 bg-warning-subtle' },
    { id: 'hard', label: 'Hard', color: 'text-danger border-danger/30 bg-danger-subtle' },
    { id: 'adaptive', label: 'Adaptive', color: 'text-primary border-primary/30 bg-primary-subtle' },
  ]

  const modes: Array<{ id: InterviewMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'text', label: 'Text', icon: MessageSquare },
    { id: 'voice', label: 'Voice', icon: Mic },
  ]

  const topics = ['Machine Learning', 'System Design', 'Python', 'Data Structures', 'Deep Learning', 'MLOps', 'Statistics', 'SQL']

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Interview type */}
      <div className="card-base p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Interview Type</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {types.map(({ id, label, desc, icon: Icon }) => (
            <button key={id} onClick={() => updateSetupConfig({ type: id })}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all',
                setupConfig.type === id
                  ? 'border-primary bg-primary-subtle shadow-sm'
                  : 'border-border bg-surface hover:border-border-strong'
              )}>
              <Icon className={cn('h-5 w-5', setupConfig.type === id ? 'text-primary' : 'text-foreground/50')} />
              <p className={cn('text-xs font-medium', setupConfig.type === id ? 'text-primary' : 'text-foreground')}>{label}</p>
              <p className="text-[10px] text-foreground/40">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Topic & Mode */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card-base p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Topic Focus</h3>
          <div className="flex flex-wrap gap-1.5">
            {topics.map(t => (
              <button key={t} onClick={() => updateSetupConfig({ topic: t })}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition-colors',
                  setupConfig.topic === t
                    ? 'border-primary bg-primary-subtle text-primary'
                    : 'border-border text-foreground/60 hover:border-primary hover:text-primary'
                )}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="card-base p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Difficulty</h3>
            <div className="flex gap-2">
              {difficulties.map(({ id, label, color }) => (
                <button key={id} onClick={() => updateSetupConfig({ difficulty: id })}
                  className={cn('flex-1 text-xs py-1.5 rounded-md border font-medium transition-all',
                    setupConfig.difficulty === id ? color : 'border-border text-foreground/50 hover:border-border-strong'
                  )}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Mode</h3>
            <div className="flex gap-2">
              {modes.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => updateSetupConfig({ mode: id })}
                  className={cn('flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md border font-medium transition-all',
                    setupConfig.mode === id ? 'border-primary bg-primary-subtle text-primary' : 'border-border text-foreground/50 hover:border-border-strong'
                  )}>
                  <Icon className="h-3.5 w-3.5" />{label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Questions</h3>
            <div className="flex gap-2">
              {[3, 5, 10].map(n => (
                <button key={n} onClick={() => updateSetupConfig({ numberOfQuestions: n })}
                  className={cn('flex-1 text-xs py-1.5 rounded-md border font-medium transition-all',
                    setupConfig.numberOfQuestions === n ? 'border-primary bg-primary-subtle text-primary' : 'border-border text-foreground/50'
                  )}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        disabled={!setupConfig.topic}
        className={cn(
          'w-full h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2',
          setupConfig.topic
            ? 'bg-primary text-white hover:bg-primary/90 shadow-sm'
            : 'bg-muted text-foreground/40 cursor-not-allowed'
        )}>
        <Zap className="h-4 w-4" />
        Start Interview Session
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Session View ─────────────────────────────────────────────────────────────
function SessionView({ onComplete }: { onComplete: () => void }) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score] = useState(7.5)

  const question = {
    text: 'Design a scalable machine learning feature store that can serve both training and inference pipelines. What are the key components and how would you handle real-time feature freshness?',
    type: 'System Design', difficulty: 'Hard', timeLimit: 300,
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-foreground/50">
        <span>Question 2 of 5</span>
        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /><span>4:23 remaining</span></div>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
      </div>

      {/* Question */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-danger-subtle text-danger">{question.difficulty}</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-subtle text-primary">{question.type}</span>
        </div>
        <p className="text-sm font-medium text-foreground leading-relaxed">{question.text}</p>
      </div>

      {/* Answer */}
      {!submitted ? (
        <div className="card-base p-4">
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Type your answer here. Use structured format: components, data flow, tradeoffs..."
            rows={8}
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-foreground/30 outline-none"
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <span className="text-xs text-foreground/40">{answer.length} chars</span>
            <button onClick={() => setSubmitted(true)} disabled={!answer.trim()}
              className={cn('h-8 px-4 rounded-lg text-sm font-medium transition-colors',
                answer.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-muted text-foreground/40 cursor-not-allowed'
              )}>
              Submit Answer
            </button>
          </div>
        </div>
      ) : (
        <div className="card-base p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">AI Evaluation</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-primary">{score}</span>
              <span className="text-sm text-foreground/50">/ 10</span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-success mb-1 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" />Strengths</p>
              <ul className="text-xs text-foreground/70 space-y-0.5 pl-4">
                {['Good understanding of separation between training and serving', 'Mentioned feature versioning'].map(s => <li key={s} className="list-disc">{s}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-warning mb-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />Areas to improve</p>
              <ul className="text-xs text-foreground/70 space-y-0.5 pl-4">
                {["Didn't address point-in-time correctness", 'Missing discussion of online vs offline stores'].map(s => <li key={s} className="list-disc">{s}</li>)}
              </ul>
            </div>
          </div>
          <button onClick={onComplete} className="w-full h-9 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
            Next Question →
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Report View ─────────────────────────────────────────────────────────────
function ReportView({ onReset }: { onReset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="card-base p-6 text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Interview Complete</h2>
        <p className="text-sm text-foreground/50 mt-0.5">Here's your detailed performance report</p>
        <div className="flex justify-center gap-6 mt-4">
          <div><p className="text-2xl font-bold text-primary">7.8</p><p className="text-xs text-foreground/50">Overall Score</p></div>
          <div><p className="text-2xl font-bold text-success">82%</p><p className="text-xs text-foreground/50">Readiness</p></div>
          <div><p className="text-2xl font-bold text-foreground">23m</p><p className="text-xs text-foreground/50">Duration</p></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card-base p-4">
          <p className="text-xs font-semibold text-success mb-2 flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" />Strengths</p>
          <ul className="text-xs text-foreground/70 space-y-1.5">
            {['Strong systems thinking', 'Good communication of tradeoffs', 'Structured approach to problems'].map(s => (
              <li key={s} className="flex items-start gap-1.5"><span className="text-success mt-0.5">•</span>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card-base p-4">
          <p className="text-xs font-semibold text-warning mb-2 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" />Improve</p>
          <ul className="text-xs text-foreground/70 space-y-1.5">
            {['Point-in-time correctness', 'Deeper ML math foundations', 'More specific on scalability numbers'].map(s => (
              <li key={s} className="flex items-start gap-1.5"><span className="text-warning mt-0.5">•</span>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onReset} className="flex-1 h-10 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          New Session
        </button>
        <button className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
          Study Weak Areas
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function InterviewCenter() {
  const { activeView, setActiveView } = useInterviewStore()

  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Interview Center</h1>
          <p className="text-sm text-foreground/50 mt-0.5">AI-powered adaptive interview practice with real-time feedback</p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          {(['setup', 'session', 'report'] as const).map(v => (
            <button key={v} onClick={() => setActiveView(v)}
              className={cn(
                'px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors',
                activeView === v ? 'bg-surface text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground'
              )}>
              {v === 'setup' ? 'Setup' : v === 'session' ? 'Session' : 'Report'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeView} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {activeView === 'setup' && <SetupView onStart={() => setActiveView('session')} />}
            {activeView === 'session' && <SessionView onComplete={() => setActiveView('report')} />}
            {activeView === 'report' && <ReportView onReset={() => setActiveView('setup')} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
