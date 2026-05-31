import { create } from 'zustand'
import type { KnowledgeNode, KnowledgeEdge, KnowledgeGraph, GraphViewMode, LearningPath } from '@/src/types/graph'

type GraphState = {
  graph: KnowledgeGraph | null
  nodes: KnowledgeNode[]
  edges: KnowledgeEdge[]
  selectedNode: KnowledgeNode | null
  selectedPath: LearningPath | null
  viewMode: GraphViewMode
  searchQuery: string
  isLoading: boolean
  error: string | null

  setGraph: (g: KnowledgeGraph) => void
  setNodes: (n: KnowledgeNode[]) => void
  setEdges: (e: KnowledgeEdge[]) => void
  setSelectedNode: (n: KnowledgeNode | null) => void
  setSelectedPath: (p: LearningPath | null) => void
  setViewMode: (m: GraphViewMode) => void
  setSearchQuery: (q: string) => void
  setLoading: (v: boolean) => void
  setError: (e: string | null) => void
  highlightPath: (pathId: string) => void
  clearHighlights: () => void
}

export const useGraphStore = create<GraphState>()((set) => ({
  graph: null,
  nodes: [],
  edges: [],
  selectedNode: null,
  selectedPath: null,
  viewMode: 'knowledge',
  searchQuery: '',
  isLoading: false,
  error: null,

  setGraph: (g) => set({ graph: g, nodes: g.nodes, edges: g.edges }),
  setNodes: (n) => set({ nodes: n }),
  setEdges: (e) => set({ edges: e }),
  setSelectedNode: (n) => set({ selectedNode: n }),
  setSelectedPath: (p) => set({ selectedPath: p }),
  setViewMode: (m) => set({ viewMode: m }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),
  highlightPath: (pathId) =>
    set((s) => {
      if (!s.graph) return {}
      const path = s.graph.recommendedPaths.find((p) => p.id === pathId)
      if (!path) return {}
      const pathNodeIds = new Set(path.nodes)
      return {
        nodes: s.nodes.map((n) => ({
          ...n,
          data: {
            ...n.data,
            isHighlighted: pathNodeIds.has(n.id),
          },
        })),
      }
    }),
  clearHighlights: () =>
    set((s) => ({
      nodes: s.nodes.map((n) => ({
        ...n,
        data: { ...n.data, isHighlighted: false },
      })),
    })),
}))
