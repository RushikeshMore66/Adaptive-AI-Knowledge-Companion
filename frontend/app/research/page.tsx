import type { Metadata } from 'next'
import { ResearchStudio } from '@/components/research/ResearchWorkspace'
export const metadata: Metadata = { title: 'Research Studio' }
export default function ResearchPage() { return <ResearchStudio /> }
