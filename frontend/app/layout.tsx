import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { AppLayout } from '@/src/components/layout/AppLayout'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Adaptive AI',
    default: 'Adaptive AI - Learning & Knowledge Platform',
  },
  description:
    'Enterprise AI operating system for learning, research, interviews, and knowledge management.',
  keywords: ['AI', 'learning', 'research', 'interview preparation', 'knowledge graph'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden bg-background font-sans">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
