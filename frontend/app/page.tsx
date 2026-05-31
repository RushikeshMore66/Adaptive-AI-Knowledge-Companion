import type { Metadata } from 'next'
import { HomeDashboard } from '@/src/components/home/HomeDashboard'

export const metadata: Metadata = { title: 'Home' }

export default function HomePage() {
  return <HomeDashboard />
}
