'use client'

import { motion } from 'framer-motion'
import { BookOpen, Target, Clock, TrendingUp, CheckCircle2, ArrowRight, Flame, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const skills = [
  { name: 'Machine Learning', score: 82, target: 90, topics: 24, status: 'proficient' },
  { name: 'System Design', score: 65, target: 85, topics: 18, status: 'practicing' },
  { name: 'Data Structures', score: 91, target: 95, topics: 30, status: 'advanced' },
  { name: 'Deep Learning', score: 58, target: 80, topics: 20, status: 'learning' },
  { name: 'Statistics', score: 74, target: 85, topics: 15, status: 'practicing' },
  { name: 'MLOps', score: 43, target: 75, topics: 12, status: 'learning' },
]

const roadmapItems = [
  { week: 'Week 1', title: 'Transformers & Attention', done: true, topics: 5 },
  { week: 'Week 2', title: 'BERT & GPT Architectures', done: true, topics: 4 },
  { week: 'Week 3 (Now)', title: 'Fine-Tuning & PEFT', done: false, current: true, topics: 6 },
  { week: 'Week 4', title: 'RAG & Vector Stores', done: false, topics: 5 },
  { week: 'Week 5', title: 'LLM Deployment & MLOps', done: false, topics: 7 },
]

const weakTopics = [
  { name: 'Backpropagation through time', skill: 'Deep Learning', score: 38, attempts: 3 },
  { name: 'Consistent hashing', skill: 'System Design', score: 45, attempts: 2 },
  { name: 'Variational Autoencoders', skill: 'Deep Learning', score: 51, attempts: 4 },
  { name: 'Database sharding strategies', skill: 'System Design', score: 55, attempts: 2 },
]

function SkillCard({ skill }: { skill: typeof skills[0] }) {
  const pct = (skill.score / 100) * 100
  const statusColors: Record<string, string> = {
    advanced: 'text-success bg-success-subtle',
    proficient: 'text-primary bg-primary-subtle',
    practicing: 'text-warning bg-warning-subtle',
    learning: 'text-foreground/50 bg-muted',
  }
  return (
    <div className="card-base card-hover p-4">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-foreground">{skill.name}</p>
        <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize', statusColors[skill.status] ?? 'text-foreground/50 bg-muted')}>
          {skill.status}
        </span>
      </div>
      <div className="flex items-end gap-1 mb-2">
        <span className="text-2xl font-bold text-foreground tabular-nums">{skill.score}</span>
        <span className="text-xs text-foreground/40 mb-0.5">/ 100</span>
        <span className="text-xs text-foreground/40 mb-0.5 ml-auto">Target: {skill.target}</span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>
      <p className="text-[10px] text-foreground/40">{skill.topics} topics</p>
    </div>
  )
}

export function LearningHub() {
  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Learning Hub</h1>
            <p className="text-sm text-foreground/50 mt-0.5">Personalized AI-powered learning dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md border border-success/30 bg-success-subtle px-2.5 py-1.5">
              <Flame className="h-3.5 w-3.5 text-success" />
              <span className="text-xs font-semibold text-success">12-day streak</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: 'Overall Score', value: '78%', icon: Target, color: 'text-primary bg-primary-subtle' },
            { label: 'Topics Mastered', value: '34/87', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
            { label: 'Study Time', value: '4.2h', icon: Clock, color: 'text-warning bg-warning-subtle' },
            { label: 'Accuracy', value: '82%', icon: CheckCircle2, color: 'text-success bg-success-subtle' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card-base p-4 flex items-center gap-3">
              <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0', color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-foreground/50">{label}</p>
                <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Skill Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-base p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">Skill Breakdown</h2>
                <Link href="/analytics"><button className="text-xs text-primary hover:underline flex items-center gap-0.5">Analytics <ArrowRight className="h-3 w-3" /></button></Link>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {skills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
              </div>
            </div>

            {/* Weak Topics */}
            <div className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Needs Attention</h2>
                <span className="text-xs text-danger font-medium">{weakTopics.length} weak areas</span>
              </div>
              <div className="space-y-2">
                {weakTopics.map(t => (
                  <div key={t.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{t.name}</p>
                      <p className="text-[10px] text-foreground/40 mt-0.5">{t.skill} · {t.attempts} attempts</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-danger rounded-full" style={{ width: `${t.score}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-danger tabular-nums w-6">{t.score}</span>
                    </div>
                    <button className="text-[10px] text-primary border border-primary/30 rounded-md px-2 py-1 hover:bg-primary-subtle transition-colors">
                      Study
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Roadmap */}
          <div className="space-y-4">
            <div className="card-base p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">Learning Roadmap</h2>
                <span className="text-xs text-foreground/40">Week 3 / 5</span>
              </div>
              <div className="space-y-3">
                {roadmapItems.map((item, i) => (
                  <div key={item.week} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0',
                        item.done ? 'bg-success' : item.current ? 'bg-primary' : 'bg-border'
                      )}>
                        {item.done ? (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        ) : item.current ? (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-foreground/20" />
                        )}
                      </div>
                      {i < roadmapItems.length - 1 && (
                        <div className={cn('w-0.5 flex-1 my-0.5 min-h-[12px]', item.done ? 'bg-success/40' : 'bg-border')} />
                      )}
                    </div>
                    <div className="pb-3 flex-1 min-w-0">
                      <p className={cn('text-xs font-medium', item.current ? 'text-primary' : item.done ? 'text-foreground/60' : 'text-foreground/40')}>
                        {item.title}
                      </p>
                      <p className="text-[10px] text-foreground/40 mt-0.5">{item.week} · {item.topics} topics</p>
                      {item.current && (
                        <button className="mt-1.5 text-[10px] font-medium text-primary border border-primary/30 rounded-md px-2 py-0.5 hover:bg-primary-subtle transition-colors">
                          Continue →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness */}
            <div className="card-base p-4">
              <h2 className="text-sm font-semibold text-foreground mb-3">Readiness Score</h2>
              <div className="flex flex-col items-center py-2">
                <div className="relative h-20 w-20">
                  <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" stroke="var(--border)" strokeWidth="7" fill="none" />
                    <motion.circle cx="40" cy="40" r="32" stroke="var(--primary)" strokeWidth="7" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      initial={{ strokeDashoffset: `${2 * Math.PI * 32}` }}
                      animate={{ strokeDashoffset: `${2 * Math.PI * 32 * (1 - 0.78)}` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold">78%</span>
                  </div>
                </div>
                <p className="text-xs text-foreground/50 mt-2">Interview Ready</p>
              </div>
              <Link href="/interview">
                <button className="w-full mt-2 h-8 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
                  Start Interview Practice
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
