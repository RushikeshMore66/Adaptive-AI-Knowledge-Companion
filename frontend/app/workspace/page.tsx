import type { Metadata } from 'next'
import { WorkspaceLayout } from '@/src/components/workspace/WorkspaceLayout'

export const metadata: Metadata = { title: 'Workspace' }

export default function WorkspacePage() {
  return <WorkspaceLayout />
}
