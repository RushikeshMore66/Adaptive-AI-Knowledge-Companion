'use client'

import { useState } from 'react'
import { User, Bell, Cpu, Database, Shield, Palette, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/src/store/app-store'

const sections = [
  { id: 'profile',        label: 'Profile',        icon: User },
  { id: 'notifications',  label: 'Notifications',  icon: Bell },
  { id: 'ai',             label: 'AI & Models',     icon: Cpu },
  { id: 'data',           label: 'Data & Memory',   icon: Database },
  { id: 'appearance',     label: 'Appearance',      icon: Palette },
  { id: 'security',       label: 'Security',        icon: Shield },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        checked ? 'bg-primary' : 'bg-border'
      )}
    >
      <span className={cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-white shadow transition-transform',
        checked ? 'translate-x-4' : 'translate-x-0'
      )} />
    </button>
  )
}

function SettingRow({ label, description, children }: {
  label: string; description?: string; children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-foreground/50 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const { user } = useAppStore()
  const [streaming, setStreaming] = useState(true)
  const [memory, setMemory] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [selectedModel, setSelectedModel] = useState('llama-3.3-70b-versatile')

  return (
    <div className="min-h-full p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Configure your Adaptive AI platform</p>
        </div>

        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0">
            <nav className="space-y-0.5">
              {sections.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveSection(id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors text-left',
                    activeSection === id ? 'bg-primary/10 text-primary' : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                  )}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 card-base p-5 space-y-1">
            {activeSection === 'profile' && (
              <>
                <h2 className="text-sm font-semibold text-foreground mb-4">Profile Settings</h2>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                  <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xl font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('') ?? 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                    <p className="text-xs text-foreground/50">{user?.email}</p>
                  </div>
                </div>
                <SettingRow label="Display Name" description="Your name shown across the platform">
                  <input defaultValue={user?.name} className="h-8 px-2.5 rounded-md border border-border text-sm text-foreground bg-surface outline-none focus:border-ring w-44" />
                </SettingRow>
                <SettingRow label="Email Address" description="Used for account notifications">
                  <input defaultValue={user?.email} className="h-8 px-2.5 rounded-md border border-border text-sm text-foreground bg-surface outline-none focus:border-ring w-44" />
                </SettingRow>
                <SettingRow label="Target Role" description="Personalize interview & learning focus">
                  <input defaultValue="ML Engineer" className="h-8 px-2.5 rounded-md border border-border text-sm text-foreground bg-surface outline-none focus:border-ring w-44" />
                </SettingRow>
              </>
            )}

            {activeSection === 'ai' && (
              <>
                <h2 className="text-sm font-semibold text-foreground mb-4">AI & Model Settings</h2>
                <SettingRow label="Language Model" description="Model used for chat and analysis">
                  <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}
                    className="h-8 px-2 rounded-md border border-border text-xs text-foreground bg-surface outline-none focus:border-ring">
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Recommended)</option>
                    <option value="llama-3.1-8b-instant">Llama 3.1 8B (Fast)</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
                  </select>
                </SettingRow>
                <SettingRow label="Streaming Responses" description="Show text as it generates in real-time">
                  <Toggle checked={streaming} onChange={setStreaming} />
                </SettingRow>
                <SettingRow label="Memory Layer" description="AI remembers context from prior conversations">
                  <Toggle checked={memory} onChange={setMemory} />
                </SettingRow>
                <SettingRow label="Multi-Agent Mode" description="Use multiple specialized agents per query">
                  <Toggle checked={true} onChange={() => {}} />
                </SettingRow>
              </>
            )}

            {activeSection === 'data' && (
              <>
                <h2 className="text-sm font-semibold text-foreground mb-4">Data & Memory</h2>
                <SettingRow label="Conversation History" description="Store your conversations for context">
                  <Toggle checked={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Clear All Conversations" description="Permanently delete all conversation history">
                  <button className="h-8 px-3 rounded-md border border-danger/30 text-xs font-medium text-danger hover:bg-danger-subtle transition-colors">
                    Clear History
                  </button>
                </SettingRow>
                <SettingRow label="Export Data" description="Download all your data as JSON">
                  <button className="h-8 px-3 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                    Export
                  </button>
                </SettingRow>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                <h2 className="text-sm font-semibold text-foreground mb-4">Notification Settings</h2>
                <SettingRow label="Push Notifications" description="Receive updates and reminders">
                  <Toggle checked={notifications} onChange={setNotifications} />
                </SettingRow>
                <SettingRow label="Daily Study Reminders" description="Remind me to study at a set time">
                  <Toggle checked={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Interview Practice Reminders" description="Weekly interview practice nudges">
                  <Toggle checked={false} onChange={() => {}} />
                </SettingRow>
              </>
            )}

            {(activeSection === 'appearance' || activeSection === 'security') && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm text-foreground/40">Coming soon</p>
              </div>
            )}

            <div className="flex justify-end pt-4 mt-2 border-t border-border">
              <button className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
