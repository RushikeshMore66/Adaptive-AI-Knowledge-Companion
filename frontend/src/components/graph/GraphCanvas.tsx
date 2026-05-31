'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background, Controls, MiniMap,
  useNodesState, useEdgesState,
  type Node, type Edge,
  Handle, Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { motion } from 'framer-motion'
import { Search, Network, ZoomIn, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGraphStore } from '@/src/store/graph-store'

// ─── Custom Node ─────────────────────────────────────────────────────────────
function KnowledgeNode({ data }: { data: { label: string; type: string; masteryScore?: number; isWeak?: boolean; isRecommended?: boolean } }) {
  const typeStyles: Record<string, { bg: string; border: string; text: string }> = {
    skill:     { bg: '#EFF6FF', border: '#BFDBFE', text: '#2563EB' },
    topic:     { bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A' },
    concept:   { bg: '#FDF4FF', border: '#E9D5FF', text: '#9333EA' },
    milestone: { bg: '#FFFBEB', border: '#FDE68A', text: '#D97706' },
    resource:  { bg: '#FFF7ED', border: '#FED7AA', text: '#EA580C' },
  }
  const style = typeStyles[data.type] ?? typeStyles.skill

  return (
    <div className="relative min-w-[110px]">
      <Handle type="target" position={Position.Left} style={{ width: 6, height: 6, background: style.border }} />
      <motion.div
        className={cn(
          'rounded-lg border px-3 py-2 shadow-sm cursor-pointer transition-all hover:shadow-md',
          data.isWeak && 'ring-2 ring-danger/30',
          data.isRecommended && 'ring-2 ring-primary/30'
        )}
        style={{ borderColor: style.border, backgroundColor: style.bg }}
      >
        <motion.p className="text-[11px] font-semibold leading-snug" style={{ color: style.text }}>
          {data.label}
        </motion.p>
        {data.masteryScore !== undefined && (
          <div className="mt-1 h-1 rounded-full bg-white/60 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ width: `${data.masteryScore}%`, backgroundColor: style.text }} />
          </div>
        )}
        {data.masteryScore !== undefined && (
          <motion.p className="text-[9px] mt-0.5" style={{ color: style.text + '99' }}>{data.masteryScore}%</motion.p>
        )}
      </motion.div>
      <Handle type="source" position={Position.Right} style={{ width: 6, height: 6, background: style.border }} />
    </div>
  )
}

const nodeTypes = { knowledge: KnowledgeNode }

// Demo graph data
const INITIAL_NODES: Node[] = [
  { id: 'ml', type: 'knowledge', position: { x: 0, y: 0 }, data: { label: 'Machine Learning', type: 'skill', masteryScore: 82 } },
  { id: 'dl', type: 'knowledge', position: { x: 240, y: -80 }, data: { label: 'Deep Learning', type: 'skill', masteryScore: 58 } },
  { id: 'stats', type: 'knowledge', position: { x: 240, y: 80 }, data: { label: 'Statistics', type: 'skill', masteryScore: 74 } },
  { id: 'nn', type: 'knowledge', position: { x: 480, y: -160 }, data: { label: 'Neural Networks', type: 'topic', masteryScore: 70 } },
  { id: 'transformers', type: 'knowledge', position: { x: 480, y: -60 }, data: { label: 'Transformers', type: 'topic', masteryScore: 85, isRecommended: true } },
  { id: 'attention', type: 'knowledge', position: { x: 720, y: -100 }, data: { label: 'Attention Mechanism', type: 'concept', masteryScore: 90 } },
  { id: 'bert', type: 'knowledge', position: { x: 720, y: 20 }, data: { label: 'BERT', type: 'concept', masteryScore: 78 } },
  { id: 'rag', type: 'knowledge', position: { x: 720, y: 140 }, data: { label: 'RAG', type: 'concept', masteryScore: 65, isRecommended: true } },
  { id: 'vae', type: 'knowledge', position: { x: 480, y: 60 }, data: { label: 'Variational AE', type: 'concept', masteryScore: 51, isWeak: true } },
  { id: 'bptt', type: 'knowledge', position: { x: 480, y: 180 }, data: { label: 'BPTT', type: 'concept', masteryScore: 38, isWeak: true } },
  { id: 'sysdesign', type: 'knowledge', position: { x: -200, y: 100 }, data: { label: 'System Design', type: 'skill', masteryScore: 65 } },
  { id: 'vectors', type: 'knowledge', position: { x: 0, y: 200 }, data: { label: 'Vector DBs', type: 'topic', masteryScore: 72 } },
]

const INITIAL_EDGES: Edge[] = [
  { id: 'e1', source: 'ml', target: 'dl', label: 'specialization', style: { stroke: '#BFDBFE' } },
  { id: 'e2', source: 'ml', target: 'stats', label: 'requires', style: { stroke: '#BBF7D0' } },
  { id: 'e3', source: 'dl', target: 'nn', style: { stroke: '#BFDBFE' } },
  { id: 'e4', source: 'dl', target: 'transformers', style: { stroke: '#BFDBFE' } },
  { id: 'e5', source: 'transformers', target: 'attention', style: { stroke: '#E9D5FF' } },
  { id: 'e6', source: 'transformers', target: 'bert', style: { stroke: '#E9D5FF' } },
  { id: 'e7', source: 'bert', target: 'rag', label: 'used in', style: { stroke: '#BBF7D0' } },
  { id: 'e8', source: 'dl', target: 'vae', style: { stroke: '#BFDBFE' } },
  { id: 'e9', source: 'ml', target: 'bptt', style: { stroke: '#BFDBFE' } },
  { id: 'e10', source: 'sysdesign', target: 'vectors', style: { stroke: '#FDE68A' } },
  { id: 'e11', source: 'rag', target: 'vectors', style: { stroke: '#BBF7D0' } },
]

export function KnowledgeGraphStudio() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES)
  const { selectedNode, setSelectedNode, searchQuery, setSearchQuery } = useGraphStore()

  const onNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedNode(node as Node)
  }, [setSelectedNode])

  const stats = useMemo(() => ({
    total: nodes.length,
    learned: nodes.filter(n => ((n.data as { masteryScore?: number }).masteryScore ?? 0) >= 70).length,
    weak: nodes.filter(n => (n.data as { isWeak?: boolean }).isWeak).length,
    recommended: nodes.filter(n => (n.data as { isRecommended?: boolean }).isRecommended).length,
  }), [nodes])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Knowledge Graph</h1>
            <p className="text-sm text-foreground/50 mt-0.5">Visual map of your knowledge and learning relationships</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-surface">
              <Search className="h-3.5 w-3.5 text-foreground/40" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search nodes..." className="text-xs bg-transparent outline-none text-foreground placeholder:text-foreground/30 w-28" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-3">
          {[
            { label: 'Total Nodes', value: stats.total, color: 'text-foreground' },
            { label: 'Learned', value: stats.learned, color: 'text-success' },
            { label: 'Weak Areas', value: stats.weak, color: 'text-danger' },
            { label: 'Recommended', value: stats.recommended, color: 'text-primary' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className={cn('text-lg font-bold tabular-nums', color)}>{value}</p>
              <p className="text-[10px] text-foreground/40">{label}</p>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-3 text-[10px] text-foreground/40">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-danger/50 ring-2 ring-danger/30" />Weak</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary/50 ring-2 ring-primary/30" />Recommended</span>
          </div>
        </div>
      </div>

      {/* Graph + sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            className="bg-background"
            defaultEdgeOptions={{ animated: false, style: { strokeWidth: 1.5 } }}
          >
            <Background color="var(--border)" gap={20} size={1} />
            <Controls showInteractive={false} className="!bg-surface !border-border !shadow-sm" />
            <MiniMap
              nodeColor={(n) => {
                const d = n.data as { type: string }
                const c: Record<string, string> = { skill: '#2563EB', topic: '#16A34A', concept: '#9333EA', milestone: '#D97706', resource: '#EA580C' }
                return c[d.type] ?? '#6B7280'
              }}
              className="!bg-surface !border-border !rounded-lg"
              maskColor="rgba(0,0,0,0.04)"
            />
          </ReactFlow>
        </div>

        {/* Node detail panel */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 flex-shrink-0 border-l border-border bg-sidebar overflow-y-auto p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Node Details</h3>
              <button onClick={() => setSelectedNode(null)} className="text-foreground/40 hover:text-foreground text-lg leading-none">&times;</button>
            </div>
            <div className="card-base p-3 space-y-2">
              <p className="text-sm font-medium text-foreground">{(selectedNode.data as { label: string }).label}</p>
              <p className="text-xs capitalize text-foreground/50">{(selectedNode.data as { type: string }).type}</p>
              {(selectedNode.data as { masteryScore?: number }).masteryScore !== undefined && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground/50">Mastery</span>
                    <span className="font-medium text-foreground">{(selectedNode.data as { masteryScore: number }).masteryScore}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <motion.div className="h-full rounded-full bg-primary" style={{ width: `${(selectedNode.data as { masteryScore: number }).masteryScore}%` }} />
                  </div>
                </div>
              )}
            </div>
            {(selectedNode.data as { isWeak?: boolean }).isWeak && (
              <div className="rounded-lg bg-danger-subtle border border-danger/20 p-3">
                <p className="text-xs font-medium text-danger">Weak Area</p>
                <p className="text-[11px] text-danger/70 mt-0.5">This topic needs more practice. Recommend 3 study sessions.</p>
              </div>
            )}
            {(selectedNode.data as { isRecommended?: boolean }).isRecommended && (
              <div className="rounded-lg bg-primary-subtle border border-primary/20 p-3">
                <p className="text-xs font-medium text-primary">Recommended Next</p>
                <p className="text-[11px] text-primary/70 mt-0.5">AI suggests studying this based on your progress.</p>
              </div>
            )}
            <button className="w-full h-8 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
              Study This Topic
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
