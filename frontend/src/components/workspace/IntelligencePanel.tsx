'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/src/store/workspace-store'
import { agentMeta } from '@/src/lib/design-system'
import { ExternalLink, Brain, Database, FileText, Network } from 'lucide-react'

// ─── Agent Badge ─────────────────────────────────────────────────────────────
function AgentBadge({ type, status, task }: {
  type: keyof typeof agentMeta; status: string; task?: string
}) {
  const meta = agentMeta[type] ?? agentMeta.planner
  const isActive = status === 'active'
  const isDone = status === 'done'

  return (
    <div className={cn(
      'flex items-start gap-2.5 rounded-lg border p-2.5 transition-all',
      isActive ? 'shadow-sm' : '',
    )}
      style={{ borderColor: meta.border, backgroundColor: meta.bg }}
    >
      <div className={cn(
        'flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5',
        isActive && 'agent-active'
      )}
        style={{ backgroundColor: meta.color + '20' }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: meta.color }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs font-semibold" style={{ color: meta.color }}>
            {meta.label}
          </p>
          <span className={cn(
            'text-[9px] font-medium px-1.5 py-0.5 rounded-full',
            isActive ? 'bg-primary/10 text-primary' :
            isDone ? 'bg-success-subtle text-success' :
            'bg-muted text-foreground/40'
          )}>
            {status}
          </span>
        </div>
        {task && (
          <p className="text-[10px] mt-0.5 truncate" style={{ color: meta.color + '99' }}>
            {task}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Source Card ─────────────────────────────────────────────────────────────
function SourceCard({ citation }: { citation: { id: string; title: string; url?: string; snippet: string; sourceType: string; relevanceScore?: number } }) {
  const scoreColor =
    (citation.relevanceScore ?? 0) > 0.8 ? 'text-success' :
    (citation.relevanceScore ?? 0) > 0.5 ? 'text-warning' : 'text-foreground/40'

  return (
    <div className="rounded-lg border border-border bg-surface p-2.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-foreground leading-snug line-clamp-2 flex-1">
          {citation.title}
        </p>
        {citation.url && (
          <a href={citation.url} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 text-foreground/30 hover:text-primary transition-colors mt-0.5"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      <p className="mt-1.5 text-[10px] text-foreground/50 line-clamp-2 leading-relaxed">
        {citation.snippet}
      </p>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[9px] text-foreground/40 capitalize">{citation.sourceType}</span>
        {citation.relevanceScore !== undefined && (
          <span className={cn('text-[9px] font-medium', scoreColor)}>
            {Math.round(citation.relevanceScore * 100)}% match
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Panel ───────────────────────────────────────────────────────────────────
const tabs = [
  { id: 'agents',  label: 'Agents',  icon: Network },
  { id: 'sources', label: 'Sources', icon: FileText },
  { id: 'memory',  label: 'Memory',  icon: Database },
] as const

export function IntelligencePanel() {
  const {
    activeAgents, currentCitations, currentMemory,
    activePanel, setActivePanel,
  } = useWorkspaceStore()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border p-3">
        <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2">
          Intelligence
        </p>
        <div className="flex gap-0.5">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePanel(id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1 h-6 rounded-md text-[10px] font-medium transition-colors',
                activePanel === id
                  ? 'bg-primary text-white'
                  : 'text-foreground/50 hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-2.5 w-2.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="wait">
          {activePanel === 'agents' && (
            <motion.div
              key="agents"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {activeAgents.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Brain className="h-6 w-6 text-foreground/20 mb-2" />
                  <p className="text-xs text-foreground/40">Agents idle</p>
                </div>
              ) : (
                activeAgents.map((agent) => (
                  <AgentBadge
                    key={agent.id}
                    type={agent.type}
                    status={agent.status}
                    task={agent.task}
                  />
                ))
              )}

              {/* All 5 agents legend */}
              {activeAgents.length === 0 && (
                <div className="mt-4">
                  <p className="text-[10px] text-foreground/40 mb-2 font-medium uppercase tracking-wider">
                    Available Agents
                  </p>
                  {Object.entries(agentMeta).map(([key, meta]) => (
                    <div key={key} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                      <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: meta.color }} />
                      <div>
                        <p className="text-xs font-medium text-foreground">{meta.label}</p>
                        <p className="text-[10px] text-foreground/40">{meta.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activePanel === 'sources' && (
            <motion.div
              key="sources"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {currentCitations.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <FileText className="h-6 w-6 text-foreground/20 mb-2" />
                  <p className="text-xs text-foreground/40">No sources yet</p>
                  <p className="text-[10px] text-foreground/30 mt-1">Sources appear when the AI retrieves references</p>
                </div>
              ) : (
                currentCitations.map((c) => <SourceCard key={c.id} citation={c} />)
              )}
            </motion.div>
          )}

          {activePanel === 'memory' && (
            <motion.div
              key="memory"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {currentMemory.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Database className="h-6 w-6 text-foreground/20 mb-2" />
                  <p className="text-xs text-foreground/40">No memory retrieved</p>
                  <p className="text-[10px] text-foreground/30 mt-1">Prior context appears here</p>
                </div>
              ) : (
                currentMemory.map((m) => (
                  <div key={m.id} className="rounded-lg border border-border bg-surface p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        'text-[9px] font-medium px-1.5 py-0.5 rounded-full capitalize',
                        m.type === 'episodic' ? 'bg-primary-subtle text-primary' :
                        m.type === 'semantic' ? 'bg-purple-50 text-purple-600' :
                        'bg-success-subtle text-success'
                      )}>
                        {m.type}
                      </span>
                      {m.relevanceScore && (
                        <span className="text-[9px] text-foreground/40">
                          {Math.round(m.relevanceScore * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                      {m.content}
                    </p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
