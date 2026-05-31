import type { Metadata } from 'next'
import { AnalyticsDashboard } from '@/src/components/analytics/AnalyticsDashboard'
export const metadata: Metadata = { title: 'Analytics' }
export default function AnalyticsPage() { return <AnalyticsDashboard /> }
