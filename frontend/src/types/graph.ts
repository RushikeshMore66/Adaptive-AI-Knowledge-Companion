import type { Node, Edge } from 'reactflow'

export type KnowledgeNodeType = 'skill' | 'topic' | 'concept' | 'resource' | 'milestone' | 'agent'

export type KnowledgeNodeData = {
  id: string
  label: string
  type: KnowledgeNodeType
  description?: string
  masteryScore?: number    // 0–100
  isLearned?: boolean
  isRecommended?: boolean
  isWeak?: boolean
  relatedResources?: string[]
  topicCount?: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

export type KnowledgeEdgeData = {
  label?: string
  type: 'prerequisite' | 'related' | 'part_of' | 'leads_to' | 'recommended_after'
  strength?: number        // 0–1
}

export type KnowledgeNode = Node<KnowledgeNodeData>
export type KnowledgeEdge = Edge<KnowledgeEdgeData>

export type KnowledgeGraph = {
  nodes: KnowledgeNode[]
  edges: KnowledgeEdge[]
  lastUpdated: string
  totalNodes: number
  learnedNodes: number
  recommendedPaths: LearningPath[]
}

export type LearningPath = {
  id: string
  title: string
  description: string
  nodes: string[]          // node IDs in order
  estimatedHours: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isRecommended: boolean
  completionRate: number   // 0–100
}

export type NodeSearchResult = {
  node: KnowledgeNode
  score: number
  matchedField: 'label' | 'description' | 'type'
}

export type GraphViewMode = 'knowledge' | 'learning_path' | 'agent_workflow'

export type AgentWorkflowNode = {
  id: string
  agentType: 'planner' | 'memory' | 'research' | 'rag' | 'synthesizer'
  status: 'idle' | 'active' | 'done' | 'error'
  task?: string
  inputs?: string[]
  outputs?: string[]
}
