// ─── Adaptive AI Design System ───────────────────────────────────────────────

export const colors = {
  background: '#FAFAFA',
  surface: '#FFFFFF',
  foreground: '#111827',
  foregroundSecondary: '#6B7280',
  foregroundTertiary: '#9CA3AF',
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primarySubtle: '#EFF6FF',
  success: '#22C55E',
  successSubtle: '#F0FDF4',
  warning: '#F59E0B',
  warningSubtle: '#FFFBEB',
  danger: '#EF4444',
  dangerSubtle: '#FEF2F2',
  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
  sidebar: '#F9FAFB',
} as const

export const layout = {
  sidebarWidth: 240,
  sidebarCollapsedWidth: 60,
  topbarHeight: 56,
} as const

export const agentMeta: Record<string, { label: string; color: string; bg: string; border: string; description: string }> = {
  planner: {
    label: 'Planner',
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    description: 'Decomposes tasks and routes work',
  },
  memory: {
    label: 'Memory',
    color: '#9333EA',
    bg: '#FDF4FF',
    border: '#E9D5FF',
    description: 'Retrieves and stores context',
  },
  research: {
    label: 'Research',
    color: '#EA580C',
    bg: '#FFF7ED',
    border: '#FED7AA',
    description: 'Performs deep web research',
  },
  rag: {
    label: 'RAG',
    color: '#16A34A',
    bg: '#F0FDF4',
    border: '#BBF7D0',
    description: 'Retrieves from knowledge base',
  },
  synthesizer: {
    label: 'Synthesizer',
    color: '#E11D48',
    bg: '#FFF1F2',
    border: '#FECDD3',
    description: 'Combines and formats results',
  },
}

export type NavItem = {
  id: string
  label: string
  href: string
  icon: string
  description?: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: 'LayoutDashboard', description: 'Command center & overview' },
  { id: 'workspace', label: 'Workspace', href: '/workspace', icon: 'MessageSquare', description: 'AI conversation & research' },
  { id: 'research', label: 'Research Studio', href: '/research', icon: 'Search', description: 'Deep research workspace' },
  { id: 'learning', label: 'Learning Hub', href: '/learning', icon: 'BookOpen', description: 'Personalized learning dashboard' },
  { id: 'interview', label: 'Interview Center', href: '/interview', icon: 'UserCheck', description: 'AI interview preparation' },
  { id: 'graph', label: 'Knowledge Graph', href: '/graph', icon: 'Network', description: 'Visual knowledge exploration' },
  { id: 'voice', label: 'Voice Assistant', href: '/voice', icon: 'Mic', description: 'Voice-first AI interaction' },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: 'BarChart3', description: 'Performance & progress insights' },
  { id: 'settings', label: 'Settings', href: '/settings', icon: 'Settings2', description: 'Platform configuration' },
]
