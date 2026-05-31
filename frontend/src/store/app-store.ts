import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Notification = {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
  createdAt: number
}

type AppState = {
  // Sidebar
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void

  // Theme
  theme: Theme
  setTheme: (t: Theme) => void

  // Active navigation
  activeRoute: string
  setActiveRoute: (r: string) => void

  // Notifications
  notifications: Notification[]
  addNotification: (n: Omit<Notification, 'id' | 'createdAt'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void

  // Global loading state
  isGlobalLoading: boolean
  setGlobalLoading: (v: boolean) => void

  // User profile (stub — from backend auth)
  user: {
    name: string
    email: string
    avatar?: string
  } | null
  setUser: (u: AppState['user']) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ isSidebarCollapsed: v }),

      theme: 'light',
      setTheme: (t) => set({ theme: t }),

      activeRoute: '/',
      setActiveRoute: (r) => set({ activeRoute: r }),

      notifications: [],
      addNotification: (n) =>
        set((s) => ({
          notifications: [
            ...s.notifications,
            { ...n, id: crypto.randomUUID(), createdAt: Date.now() },
          ],
        })),
      removeNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),

      isGlobalLoading: false,
      setGlobalLoading: (v) => set({ isGlobalLoading: v }),

      user: { name: 'Rushikesh More', email: 'rushimore7777@gmail.com' },
      setUser: (u) => set({ user: u }),
    }),
    {
      name: 'adaptive-ai-app',
      partialize: (s) => ({
        isSidebarCollapsed: s.isSidebarCollapsed,
        theme: s.theme,
        user: s.user,
      }),
    }
  )
)
