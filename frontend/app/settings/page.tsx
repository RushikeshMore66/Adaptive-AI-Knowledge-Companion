import type { Metadata } from 'next'
import { SettingsPage } from '@/src/components/settings/SettingsPage'
export const metadata: Metadata = { title: 'Settings' }
export default function Settings() { return <SettingsPage /> }
