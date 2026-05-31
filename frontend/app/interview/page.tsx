import type { Metadata } from 'next'
import { InterviewCenter } from '@/components/interview/InterviewSetup'
export const metadata: Metadata = { title: 'Interview Center' }
export default function InterviewPage() { return <InterviewCenter /> }
