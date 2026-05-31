'use client'

import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { TrendingUp, Target, Clock, CheckCircle2, BarChart3, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TimeRange } from '@/src/types/analytics'

const learningData = [
  { date: 'Mon', score: 72, time: 45, questions: 12 },
  { date: 'Tue', score: 75, time: 60, questions: 18 },
  { date: 'Wed', score: 71, time: 30, questions: 8 },
  { date: 'Thu', score: 78, time: 90, questions: 24 },
  { date: 'Fri', score: 80, time: 75, questions: 20 },
  { date: 'Sat', score: 77, time: 55, questions: 15 },
  { date: 'Sun', score: 82, time: 40, questions: 11 },
]

const interviewData = [
  { date: 'Week 1', overall: 65, technical: 68, behavioral: 62 },
  { date: 'Week 2', overall: 70, technical: 74, behavioral: 66 },
  { date: 'Week 3', overall: 72, technical: 75, behavioral: 69 },
  { date: 'Week 4', overall: 78, technical: 80, behavioral: 76 },
]

const radarData = [
  { skill: 'ML', value: 82 },
  { skill: 'System Design', value: 65 },
  { skill: 'Data Structures', value: 91 },
  { skill: 'Statistics', value: 74 },
  { skill: 'Deep Learning', value: 58 },
  { skill: 'MLOps', value: 43 },
]

function MetricCard({ label, value, change, icon: Icon, accent }: {
  label: string; value: string; change?: number; icon: React.ComponentType<{ className?: string }>; accent: string
}) {
  return (
    <div className="card-base p-4 flex items-start gap-3">
      <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0', accent)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-foreground/50">{label}</p>
        <p className="text-xl font-bold text-foreground tabular-nums">{value}</p>
        {change !== undefined && (
          <p className={cn('text-xs font-medium flex items-center gap-0.5 mt-0.5', change >= 0 ? 'text-success' : 'text-danger')}>
            <TrendingUp className={cn('h-3 w-3', change < 0 && 'rotate-180')} />
            {change > 0 ? '+' : ''}{change}% vs last period
          </p>
        )}
      </div>
    </div>
  )
}

const ranges: TimeRange[] = ['7d', '30d', '90d', 'all']

export function AnalyticsDashboard() {
  const [range, setRange] = useState<TimeRange>('30d')

  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
            <p className="text-sm text-foreground/50 mt-0.5">Performance insights and learning trends</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
              {ranges.map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={cn('px-3 py-1 rounded-md text-xs font-medium transition-colors',
                    range === r ? 'bg-surface text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground'
                  )}>
                  {r}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border text-xs text-foreground/60 hover:bg-muted transition-colors">
              <Download className="h-3.5 w-3.5" />Export
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard label="Readiness Score" value="78%" change={5} icon={Target} accent="bg-primary-subtle text-primary" />
          <MetricCard label="Total Study Hours" value="24h" change={12} icon={Clock} accent="bg-warning-subtle text-warning" />
          <MetricCard label="Avg. Score" value="79%" change={3} icon={BarChart3} accent="bg-purple-50 text-purple-600" />
          <MetricCard label="Questions Answered" value="248" change={18} icon={CheckCircle2} accent="bg-success-subtle text-success" />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Learning Progress */}
          <div className="card-base p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Learning Progress</h2>
              <span className="text-xs text-foreground/40">Score over time</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={learningData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} fill="url(#scoreGrad)" dot={{ r: 3, fill: 'var(--primary)', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Interview Performance */}
          <div className="card-base p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Interview Performance</h2>
              <div className="flex items-center gap-3 text-[10px] text-foreground/40">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />Overall</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" />Technical</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" />Behavioral</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={interviewData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="overall" fill="var(--primary)" radius={[3, 3, 0, 0]} maxBarSize={16} />
                <Bar dataKey="technical" fill="var(--success)" radius={[3, 3, 0, 0]} maxBarSize={16} />
                <Bar dataKey="behavioral" fill="var(--warning)" radius={[3, 3, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Radar */}
          <div className="card-base p-4 lg:col-span-1">
            <h2 className="text-sm font-semibold text-foreground mb-4">Skill Coverage</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                <Radar name="Score" dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} strokeWidth={1.5} dot={{ r: 3, fill: 'var(--primary)', strokeWidth: 0 }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Summary */}
          <div className="card-base p-4 lg:col-span-2">
            <h2 className="text-sm font-semibold text-foreground mb-4">Weekly Activity</h2>
            <div className="space-y-2">
              {[
                { day: 'Monday', questions: 12, time: '45m', score: 72 },
                { day: 'Tuesday', questions: 18, time: '60m', score: 75 },
                { day: 'Wednesday', questions: 8, time: '30m', score: 71 },
                { day: 'Thursday', questions: 24, time: '90m', score: 78 },
                { day: 'Friday', questions: 20, time: '75m', score: 80 },
                { day: 'Saturday', questions: 15, time: '55m', score: 77 },
                { day: 'Sunday', questions: 11, time: '40m', score: 82 },
              ].map(({ day, questions, time, score }) => (
                <div key={day} className="flex items-center gap-3 py-1.5 border-b border-border last:border-0">
                  <p className="w-20 text-xs text-foreground/60 flex-shrink-0">{day}</p>
                  <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-primary opacity-70" style={{ width: `${score}%` }} />
                  </div>
                  <span className="w-6 text-right text-xs font-medium text-foreground tabular-nums">{score}</span>
                  <span className="w-10 text-right text-xs text-foreground/40 tabular-nums">{time}</span>
                  <span className="w-12 text-right text-[10px] text-foreground/40">{questions} Q</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
