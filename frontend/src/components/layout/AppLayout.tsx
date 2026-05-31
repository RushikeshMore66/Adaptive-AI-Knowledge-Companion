'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useAppStore } from '@/src/store/app-store'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
}

export function AppLayout({ children }: Props) {
  const pathname = usePathname()
  const { isSidebarCollapsed, setActiveRoute } = useAppStore()

  useEffect(() => {
    setActiveRoute(pathname)
  }, [pathname, setActiveRoute])

  const sidebarWidth = isSidebarCollapsed ? 60 : 240

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      {/* Main area — offset by sidebar width */}
      <motion.div
        className="flex flex-1 flex-col overflow-hidden"
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden',
            'pt-14' // below topbar
          )}
        >
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  )
}
