import type { Metadata } from 'next'
import { KnowledgeGraphStudio } from '@/src/components/graph/GraphCanvas'
export const metadata: Metadata = { title: 'Knowledge Graph' }
export default function GraphPage() { return <KnowledgeGraphStudio /> }
