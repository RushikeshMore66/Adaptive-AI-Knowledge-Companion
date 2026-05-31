'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, MessageSquare, Search, BookOpen, UserCheck,
  Network, Mic, BarChart3, Settings2, ChevronLeft, ChevronRight,
  Zap, Brain,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/src/store/app-store'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, MessageSquare, Search, BookOpen, UserCheck,
  Network, Mic, BarChart3, Settings2,
}

const navItems = [
  { id: 'home',      label: 'Home',            href: '/',          icon: 'LayoutDashboard' },
  { id: 'workspace', label: 'Workspace',        href: '/workspace', icon: 'MessageSquare' },
  { id: 'research',  label: 'Research Studio',  href: '/research',  icon: 'Search' },
  { id: 'learning',  label: 'Learning Hub',     href: '/learning',  icon: 'BookOpen' },
  { id: 'interview', label: 'Interview Center', href: '/interview', icon: 'UserCheck' },
  { id: 'graph',     label: 'Knowledge Graph',  href: '/graph',     icon: 'Network' },
  { id: 'voice',     label: 'Voice Assistant',  href: '/voice',     icon: 'Mic' },
  { id: 'analytics', label: 'Analytics',        href: '/analytics', icon: 'BarChart3' },
]

const bottomItems = [
  { id: 'settings', label: 'Settings', href: '/settings', icon: 'Settings2' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isSidebarCollapsed, toggleSidebar } = useAppStore()
  const isCollapsed = isSidebarCollapsed

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 60 : 240 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar overflow-hidden"
      style={{ width: isCollapsed ? 60 : 240 }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-3 flex-shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Adaptive AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2 py-3">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.id}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'group relative flex h-8 items-center gap-2.5 rounded-md px-2 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/60 hover:bg-muted hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute inset-0 rounded-md bg-primary/10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                />
              )}
              <Icon
                className={cn(
                  'relative z-10 flex-shrink-0 h-[15px] w-[15px]',
                  isActive ? 'text-primary' : 'text-foreground/50 group-hover:text-foreground/80'
                )}
              />
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="relative z-10 truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col gap-0.5 border-t border-border p-2">
        {bottomItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex h-8 items-center gap-2.5 rounded-md px-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/50 hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="flex-shrink-0 h-[15px] w-[15px]" />
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="mt-1 flex h-8 w-full items-center justify-center gap-2.5 rounded-md px-2 text-sm text-foreground/40 transition-colors hover:bg-muted hover:text-foreground/70"
        >
          {isCollapsed ? (
            <ChevronRight className="h-[14px] w-[14px]" />
          ) : (
            <>
              <ChevronLeft className="h-[14px] w-[14px] flex-shrink-0" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
