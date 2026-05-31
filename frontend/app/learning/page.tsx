import type { Metadata } from 'next'
import { LearningHub } from '@/components/ui/learning/LearningLayout'
export const metadata: Metadata = { title: 'Learning Hub' }
export default function LearningPage() { return <LearningHub /> }
