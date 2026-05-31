'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, Command } from 'lucide-react'
import { useState, useCallback } from 'react'
import { useAppStore } from '@/src/store/app-store'
import { cn } from '@/lib/utils'

const routeLabels: Record<string, { title: string; description: string }> = {
  '/':           { title: 'Home',            description: 'Command center & overview' },
  '/workspace':  { title: 'Workspace',       description: 'AI conversation & research' },
  '/research':   { title: 'Research Studio', description: 'Deep research workspace' },
  '/learning':   { title: 'Learning Hub',    description: 'Personalized learning dashboard' },
  '/interview':  { title: 'Interview Center',description: 'AI interview preparation' },
  '/graph':      { title: 'Knowledge Graph', description: 'Visual knowledge exploration' },
  '/voice':      { title: 'Voice Assistant', description: 'Voice-first AI interaction' },
  '/analytics':  { title: 'Analytics',       description: 'Performance & progress insights' },
  '/settings':   { title: 'Settings',        description: 'Platform configuration' },
}

function getRouteLabel(pathname: string) {
  // exact match first
  if (routeLabels[pathname]) return routeLabels[pathname]
  // prefix match
  const prefix = Object.keys(routeLabels).find(
    (k) => k !== '/' && pathname.startsWith(k)
  )
  return prefix ? routeLabels[prefix] : { title: 'Adaptive AI', description: '' }
}

export function Topbar() {
  const pathname = usePathname()
  const { user, notifications } = useAppStore()
  const { title } = getRouteLabel(pathname)
  const [searchFocused, setSearchFocused] = useState(false)
  const unreadCount = notifications.length

  const getInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [])

  return (
    <header className="fixed right-0 top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 topbar-layout">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
      </div>

      {/* Search */}
      <div className={cn(
        'hidden md:flex items-center gap-2 h-8 px-3 rounded-md border transition-all',
        searchFocused
          ? 'border-ring bg-background w-56 shadow-sm'
          : 'border-border bg-muted/60 w-44 cursor-pointer hover:border-border-strong'
      )}>
        <Search className="h-3.5 w-3.5 text-foreground/40 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="flex-1 bg-transparent text-xs text-foreground placeholder:text-foreground/40 outline-none min-w-0"
        />
        {!searchFocused && (
          <kbd className="hidden lg:flex items-center gap-0.5 text-[10px] font-medium text-foreground/30 bg-background border border-border rounded px-1">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        )}
      </div>

      {/* Notifications */}
      <button
        className="relative flex h-8 w-8 items-center justify-center rounded-md text-foreground/50 transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* User avatar */}
      {user && (
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/25"
          aria-label="User menu"
        >
          {getInitials(user.name)}
        </button>
      )}
    </header>
  )
}
