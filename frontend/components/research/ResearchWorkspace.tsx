'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Loader2, FileText, Link2, ArrowRight,
  BookOpen, CheckCircle2, Clock, ExternalLink, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useResearchStore } from '@/src/store/research-store'
import type { ResearchAgentStep } from '@/src/types/research'

// ─── Step Progress ──────────────────────────────────────────────────────────
function AgentStep({ step }: { step: ResearchAgentStep }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex-shrink-0 mt-0.5">
        {step.status === 'done' ? (
          <CheckCircle2 className="h-4 w-4 text-success" />
        ) : step.status === 'active' ? (
          <Loader2 className="h-4 w-4 text-primary animate-spin" />
        ) : step.status === 'error' ? (
          <span className="h-4 w-4 flex items-center justify-center rounded-full bg-danger text-white text-[9px] font-bold">!</span>
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-border" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-xs font-medium', step.status === 'active' ? 'text-primary' : step.status === 'done' ? 'text-foreground/70' : 'text-foreground/40')}>
          {step.step}
        </p>
        <p className="text-[10px] text-foreground/40 mt-0.5">{step.description}</p>
      </div>
      {step.resultsCount !== undefined && step.status === 'done' && (
        <span className="text-[10px] text-foreground/40 flex-shrink-0">{step.resultsCount} results</span>
      )}
    </div>
  )
}

// ─── Source Card ─────────────────────────────────────────────────────────────
function SourceCard({ source, isSelected, onToggle }: {
  source: { id: string; title: string; url: string; domain: string; snippet: string; relevanceScore: number; sourceType: string }
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className={cn(
        'w-full text-left rounded-lg border p-3 transition-all cursor-pointer select-none',
        isSelected ? 'border-primary bg-primary-subtle shadow-sm' : 'border-border bg-surface hover:border-border-strong hover:shadow-sm'
      )}
    >
      <div className="flex items-start gap-2">
        <div className={cn('flex-shrink-0 h-4 w-4 rounded border mt-0.5 flex items-center justify-center transition-colors', isSelected ? 'bg-primary border-primary' : 'border-border')}>
          {isSelected && <span className="text-white text-[8px] font-bold">✓</span>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug">{source.title}</p>
          <p className="text-[10px] text-foreground/40 mt-0.5 truncate">{source.domain}</p>
          <p className="text-[10px] text-foreground/60 mt-1.5 line-clamp-2 leading-relaxed">{source.snippet}</p>
          <div className="flex items-center justify-between mt-2">
            <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full font-medium',
              source.relevanceScore > 0.8 ? 'bg-success-subtle text-success' :
              source.relevanceScore > 0.5 ? 'bg-warning-subtle text-warning' : 'bg-muted text-foreground/40'
            )}>
              {Math.round(source.relevanceScore * 100)}% relevant
            </span>
            <a href={source.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="text-foreground/30 hover:text-primary transition-colors"
              title="Open source link in new tab"
              aria-label="Open source link in new tab"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const DEMO_STEPS: ResearchAgentStep[] = [
  { id: '1', step: 'Query Analysis', description: 'Parsing intent and decomposing research query', status: 'done', resultsCount: 4 },
  { id: '2', step: 'Web Search', description: 'Fetching results from multiple search engines', status: 'done', resultsCount: 47 },
  { id: '3', step: 'Source Validation', description: 'Checking source credibility and recency', status: 'active' },
  { id: '4', step: 'Evidence Extraction', description: 'Identifying key claims and evidence', status: 'pending' },
  { id: '5', step: 'Synthesis', description: 'Combining findings into structured report', status: 'pending' },
]

export function ResearchStudio() {
  const { currentQuery, setCurrentQuery, isResearching, setIsResearching, progress, setProgress } = useResearchStore()
  const [submitted, setSubmitted] = useState(false)
  const [steps, setSteps] = useState<ResearchAgentStep[]>([])

  const handleResearch = async () => {
    if (!currentQuery.trim()) return
    setSubmitted(true)
    setIsResearching(true)
    setSteps(DEMO_STEPS.map(s => ({ ...s, status: 'pending' as const })))

    // Animate steps for demo
    let i = 0
    const interval = setInterval(() => {
      setSteps(prev => prev.map((s, idx) =>
        idx === i ? { ...s, status: 'active' as const } :
        idx < i ? { ...s, status: 'done' as const } : s
      ))
      setProgress(Math.round((i / DEMO_STEPS.length) * 100))
      i++
      if (i >= DEMO_STEPS.length) {
        clearInterval(interval)
        setTimeout(() => {
          setSteps(prev => prev.map(s => ({ ...s, status: 'done' as const })))
          setIsResearching(false)
          setProgress(100)
        }, 800)
      }
    }, 900)
  }

  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Research Studio</h1>
          <p className="text-sm text-foreground/50 mt-0.5">AI-powered deep research with multi-source synthesis</p>
        </div>

        {/* Search bar */}
        <div className="card-base p-4 mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                value={currentQuery}
                onChange={e => setCurrentQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleResearch()}
                placeholder="Enter your research question or topic..."
                className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-ring focus:shadow-sm transition-all"
              />
            </div>
            <button
              onClick={handleResearch}
              disabled={!currentQuery.trim() || isResearching}
              className={cn(
                'flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition-colors',
                currentQuery.trim() && !isResearching
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-muted text-foreground/40 cursor-not-allowed'
              )}
            >
              {isResearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isResearching ? 'Researching...' : 'Research'}
            </button>
          </div>

          {/* Suggested queries */}
          {!submitted && (
            <div className="mt-3 flex flex-wrap gap-2">
              {['RAG architecture best practices', 'LLM fine-tuning techniques 2024', 'Vector database comparison'].map(q => (
                <button key={q} onClick={() => setCurrentQuery(q)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground/60 hover:border-primary hover:text-primary transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Research in progress */}
        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Agent Steps */}
              <div className="lg:col-span-1 card-base p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-foreground">Research Pipeline</h2>
                  {isResearching && (
                    <span className="text-xs text-primary font-medium">{progress}%</span>
                  )}
                </div>
                {isResearching && (
                  <div className="h-1 rounded-full bg-border overflow-hidden mb-4">
                    <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                )}
                <div className="space-y-3">
                  {steps.map(s => <AgentStep key={s.id} step={s} />)}
                </div>
              </div>

              {/* Sources */}
              <div className="lg:col-span-1 card-base p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-foreground">Sources Found</h2>
                  <span className="text-xs text-foreground/40">47 results</span>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {[
                    { id: '1', title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: '#', domain: 'arxiv.org', snippet: 'RAG combines parametric and non-parametric memory for language generation tasks, achieving state-of-the-art results on several...', relevanceScore: 0.96, sourceType: 'academic' },
                    { id: '2', title: 'Building Production RAG Systems: Lessons Learned', url: '#', domain: 'towardsdatascience.com', snippet: 'Key architectural decisions when deploying RAG at scale: chunking strategy, embedding models, retrieval algorithms...', relevanceScore: 0.88, sourceType: 'web' },
                    { id: '3', title: 'Vector Database Benchmarks 2024', url: '#', domain: 'pinecone.io', snippet: 'Comprehensive benchmark comparing Pinecone, Weaviate, ChromaDB, and Qdrant across multiple metrics...', relevanceScore: 0.74, sourceType: 'web' },
                  ].map(s => (
                    <SourceCard key={s.id} source={s} isSelected={false} onToggle={() => {}} />
                  ))}
                </div>
              </div>

              {/* Report Preview */}
              <div className="lg:col-span-1 card-base p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-foreground">Research Report</h2>
                  {!isResearching && progress === 100 && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-success-subtle text-success">Ready</span>
                  )}
                </div>
                {isResearching ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
                    <p className="text-sm text-foreground/50">Synthesizing findings...</p>
                  </div>
                ) : progress === 100 ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">Executive Summary</p>
                      <p className="text-xs text-foreground/70 leading-relaxed">
                        RAG architectures provide a robust mechanism for grounding LLM responses in factual, up-to-date information. Key best practices include optimized chunking strategies, hybrid retrieval (dense + sparse), and re-ranking.
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">Key Findings</p>
                      <ul className="space-y-1">
                        {['Chunk size of 256-512 tokens optimal for most use cases', 'Hybrid retrieval improves accuracy by 18-24%', 'Re-ranking with cross-encoders reduces hallucinations by ~30%'].map(f => (
                          <li key={f} className="flex items-start gap-1.5 text-[11px] text-foreground/70">
                            <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="w-full mt-2 h-8 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
                      View Full Report
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-foreground/30">
                    <FileText className="h-8 w-8 mb-2" />
                    <p className="text-xs">Report will appear here</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
