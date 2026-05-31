'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  TrendingUp, Brain, Target, Clock, Flame, BookOpen,
  MessageSquare, Search, UserCheck, ChevronRight, Zap,
  ArrowUpRight, BarChart3, AlertCircle, CheckCircle2,
} from 'lucide-react'
import { useAppStore } from '@/src/store/app-store'
import { cn } from '@/lib/utils'

// ─── Metric Card ─────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  unit,
  change,
  changeDir,
  icon: Icon,
  accent,
}: {
  label: string
  value: string | number
  unit?: string
  change?: number
  changeDir?: 'up' | 'down'
  icon: React.ComponentType<{ className?: string }>
  accent: string
}) {
  return (
    <div className="card-base card-hover flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-foreground/50">{label}</p>
        <div className={cn('flex h-7 w-7 items-center justify-center rounded-md', accent)}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold tabular-nums text-foreground leading-none">
          {value}
        </p>
        {unit && <p className="text-xs text-foreground/50 mb-0.5">{unit}</p>}
      </div>
      {change !== undefined && (
        <div className={cn(
          'flex items-center gap-1 text-xs font-medium',
          changeDir === 'up' ? 'text-success' : changeDir === 'down' ? 'text-danger' : 'text-foreground/40'
        )}>
          <TrendingUp className={cn('h-3 w-3', changeDir === 'down' && 'rotate-180')} />
          {change > 0 ? '+' : ''}{change}% this week
        </div>
      )}
    </div>
  )
}

// ─── Quick Action ─────────────────────────────────────────────────────────────
function QuickAction({
  label, description, href, icon: Icon, color,
}: {
  label: string; description: string; href: string
  icon: React.ComponentType<{ className?: string }>; color: string
}) {
  return (
    <Link href={href}>
      <div className="group card-base card-hover flex items-center gap-3 p-3.5 cursor-pointer">
        <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md', color)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-foreground/50 truncate">{description}</p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-foreground/30 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

// ─── Activity Item ────────────────────────────────────────────────────────────
function ActivityItem({
  icon: Icon, iconColor, iconBg, title, time, tag, tagColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  iconColor: string; iconBg: string
  title: string; time: string; tag: string; tagColor: string
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div className={cn('flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md mt-0.5', iconBg)}>
        <Icon className={cn('h-3 w-3', iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">{title}</p>
        <p className="text-xs text-foreground/40 mt-0.5">{time}</p>
      </div>
      <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5', tagColor)}>
        {tag}
      </span>
    </div>
  )
}

// ─── Skill Progress Bar ───────────────────────────────────────────────────────
function SkillBar({ skill, score, color }: { skill: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <p className="w-28 text-xs text-foreground/70 truncate flex-shrink-0">{skill}</p>
      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', color)}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as const, delay: 0.1 }}
        />
      </div>
      <p className="w-8 text-right text-xs font-medium text-foreground/60 flex-shrink-0 tabular-nums">
        {score}
      </p>
    </div>
  )
}

// ─── Recommendation Card ──────────────────────────────────────────────────────
function RecommendationCard({
  title, description, priority, action, href,
}: {
  title: string; description: string
  priority: 'high' | 'medium' | 'low'
  action: string; href: string
}) {
  const config = {
    high:   { color: 'text-danger',   bg: 'bg-danger-subtle',   dot: 'bg-danger' },
    medium: { color: 'text-warning',  bg: 'bg-warning-subtle',  dot: 'bg-warning' },
    low:    { color: 'text-success',  bg: 'bg-success-subtle',  dot: 'bg-success' },
  }[priority]

  return (
    <div className="card-base p-3.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', config.dot)} />
        <p className="text-sm font-medium text-foreground flex-1 leading-snug">{title}</p>
      </div>
      <p className="text-xs text-foreground/50 leading-relaxed">{description}</p>
      <Link href={href}>
        <button className={cn(
          'mt-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors',
          config.bg, config.color
        )}>
          {action} →
        </button>
      </Link>
    </div>
  )
}

// ─── Container ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] as const } },
}

export function HomeDashboard() {
  const { user } = useAppStore()
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-full p-6">
      <motion.div
        className="mx-auto max-w-6xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {greeting}, {user?.name?.split(' ')[0] ?? 'there'} 👋
            </h1>
            <p className="mt-0.5 text-sm text-foreground/50">
              Here's your learning progress and today's priorities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md border border-success/30 bg-success-subtle px-2.5 py-1.5">
              <Flame className="h-3.5 w-3.5 text-success" />
              <span className="text-xs font-semibold text-success">12-day streak</span>
            </div>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="Readiness Score"
            value={78}
            unit="%"
            change={5}
            changeDir="up"
            icon={Target}
            accent="bg-primary-subtle text-primary"
          />
          <MetricCard
            label="Topics Mastered"
            value={34}
            change={3}
            changeDir="up"
            icon={Brain}
            accent="bg-purple-50 text-purple-600"
          />
          <MetricCard
            label="Study Time"
            value="4.2"
            unit="hrs this week"
            change={12}
            changeDir="up"
            icon={Clock}
            accent="bg-warning-subtle text-warning"
          />
          <MetricCard
            label="Accuracy Rate"
            value={82}
            unit="%"
            change={-2}
            changeDir="down"
            icon={CheckCircle2}
            accent="bg-success-subtle text-success"
          />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left column — 2/3 */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
                <span className="text-xs text-foreground/40">Jump to any module</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <QuickAction
                  label="Start a Conversation"
                  description="Ask anything, get instant answers"
                  href="/workspace"
                  icon={MessageSquare}
                  color="bg-primary-subtle text-primary"
                />
                <QuickAction
                  label="Deep Research"
                  description="Multi-source research synthesis"
                  href="/research"
                  icon={Search}
                  color="bg-orange-50 text-orange-600"
                />
                <QuickAction
                  label="Practice Interview"
                  description="AI-powered mock interviews"
                  href="/interview"
                  icon={UserCheck}
                  color="bg-success-subtle text-success"
                />
                <QuickAction
                  label="Study Topics"
                  description="Continue your learning roadmap"
                  href="/learning"
                  icon={BookOpen}
                  color="bg-purple-50 text-purple-600"
                />
              </div>
            </motion.div>

            {/* Skill Progress */}
            <motion.div variants={itemVariants} className="card-base p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">Skill Progress</h2>
                <Link href="/learning">
                  <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                    View all <ArrowUpRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
              <div className="space-y-3">
                <SkillBar skill="Machine Learning" score={82} color="bg-primary" />
                <SkillBar skill="System Design" score={65} color="bg-purple-500" />
                <SkillBar skill="Data Structures" score={91} color="bg-success" />
                <SkillBar skill="Deep Learning" score={58} color="bg-warning" />
                <SkillBar skill="Statistics" score={74} color="bg-orange-500" />
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
                <Link href="/analytics">
                  <button className="text-xs text-primary hover:underline">View analytics</button>
                </Link>
              </div>
              <div>
                <ActivityItem
                  icon={MessageSquare}
                  iconColor="text-primary"
                  iconBg="bg-primary-subtle"
                  title="Discussed transformer architecture in depth"
                  time="2 hours ago"
                  tag="Workspace"
                  tagColor="bg-primary-subtle text-primary"
                />
                <ActivityItem
                  icon={UserCheck}
                  iconColor="text-success"
                  iconBg="bg-success-subtle"
                  title="Completed mock interview — System Design (Score: 8.2/10)"
                  time="Yesterday, 4:30 PM"
                  tag="Interview"
                  tagColor="bg-success-subtle text-success"
                />
                <ActivityItem
                  icon={Search}
                  iconColor="text-orange-600"
                  iconBg="bg-orange-50"
                  title="Researched: 'Best practices for RAG pipeline optimization'"
                  time="Yesterday, 2:15 PM"
                  tag="Research"
                  tagColor="bg-orange-50 text-orange-600"
                />
                <ActivityItem
                  icon={BookOpen}
                  iconColor="text-purple-600"
                  iconBg="bg-purple-50"
                  title="Completed 3 topics: Attention Mechanisms, BERT, GPT"
                  time="2 days ago"
                  tag="Learning"
                  tagColor="bg-purple-50 text-purple-600"
                />
              </div>
            </motion.div>
          </div>

          {/* Right column — 1/3 */}
          <div className="space-y-4">
            {/* Interview Readiness */}
            <motion.div variants={itemVariants} className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Interview Readiness</h2>
                <Link href="/interview">
                  <button className="text-xs text-primary hover:underline">Practice</button>
                </Link>
              </div>
              <div className="flex flex-col items-center py-3">
                {/* Circular progress */}
                <div className="relative h-24 w-24">
                  <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" stroke="var(--border)" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="48" cy="48" r="40"
                      stroke="var(--primary)" strokeWidth="8" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
                      animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - 0.78)}` }}
                      transition={{ duration: 1.2, ease: [0, 0, 0.2, 1] as const, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-foreground">78%</span>
                    <span className="text-[10px] text-foreground/50">Ready</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-1.5">
                {[
                  { label: 'Technical', score: 82, color: 'text-primary' },
                  { label: 'Behavioral', score: 71, color: 'text-purple-600' },
                  { label: 'System Design', score: 65, color: 'text-warning' },
                ].map(({ label, score, color }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-foreground/60">{label}</span>
                    <span className={cn('font-semibold', color)}>{score}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Active Goals */}
            <motion.div variants={itemVariants} className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Active Goals</h2>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Complete ML roadmap', progress: 68, color: 'bg-primary' },
                  { label: 'Pass 10 mock interviews', progress: 40, color: 'bg-success' },
                  { label: 'Study 5 hrs/week', progress: 84, color: 'bg-warning' },
                ].map(({ label, progress, color }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground/70 truncate">{label}</span>
                      <span className="font-medium text-foreground/60 flex-shrink-0 ml-2">{progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <motion.div
                        className={cn('h-full rounded-full', color)}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] as const, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={itemVariants} className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Recommendations</h2>
                <Zap className="h-3.5 w-3.5 text-warning" />
              </div>
              <div className="space-y-2.5">
                <RecommendationCard
                  title="Weak area: System Design"
                  description="Your last 3 interviews scored below 70% on system design questions."
                  priority="high"
                  action="Start practice"
                  href="/interview"
                />
                <RecommendationCard
                  title="Continue Deep Learning path"
                  description="You left off at 'Attention Mechanisms'. 4 topics remain."
                  priority="medium"
                  action="Resume"
                  href="/learning"
                />
                <RecommendationCard
                  title="Explore Knowledge Graph"
                  description="13 new connections detected since your last visit."
                  priority="low"
                  action="Explore"
                  href="/graph"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
