'use client'

import { useState } from 'react'
import {
  CirclePlus, Mail, LayoutDashboard, List, BarChart, Folder, Users,
  Database, PieChart, Map, Ellipsis, Settings, CircleHelp, Search,
  Moon, ChevronsUpDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageHeader, Section } from '../../_components/token-table'

const navMain = [
  { label: 'Playground',  Icon: LayoutDashboard },
  { label: 'Lifecycle',   Icon: List },
  { label: 'Analytics',   Icon: BarChart },
  { label: 'Projects',    Icon: Folder },
  { label: 'Team',        Icon: Users },
]
const navDocs = [
  { label: 'Data Library',   Icon: Database },
  { label: 'Reports',        Icon: PieChart },
  { label: 'Word Assistant', Icon: Map },
]
const navBottom = [
  { label: 'Settings', Icon: Settings },
  { label: 'Get Help', Icon: CircleHelp },
  { label: 'Search',   Icon: Search },
]

function SidebarPreview() {
  const [active, setActive] = useState('Analytics')
  return (
    // Outer wrapper — p-2 creates the 8px inset (page bg shows through)
    <div className="p-2 flex items-center h-[540px] shrink-0 w-56 bg-background border border-border rounded-lg overflow-hidden">
      <div className="bg-sidebar flex flex-col h-full w-full relative">
        {/* Logo */}
        <div className="p-2 flex flex-col gap-0 items-start shrink-0">
          <div className="h-8 flex items-center gap-2 px-1.5 rounded-md w-full">
            <div className="size-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
              <div className="size-2 rounded-full bg-sidebar" />
            </div>
            <span className="font-semibold text-base text-sidebar-foreground">Acme Inc.</span>
          </div>
        </div>
        {/* Quick Create + Mail */}
        <div className="px-2 pb-2 flex items-center gap-1 shrink-0">
          <button className="flex-1 h-8 bg-neutral-500 rounded-md flex items-center gap-2 px-2">
            <CirclePlus className="size-4 text-neutral-50 shrink-0" />
            <span className="font-normal text-sm text-neutral-50 truncate">Quick Create</span>
          </button>
          <button className="size-8 rounded-md border border-input bg-background shadow-xs flex items-center justify-center shrink-0">
            <Mail className="size-4 text-sidebar-foreground" />
          </button>
        </div>
        {/* Scrollable nav — pb-32 to clear absolute footer */}
        <div className="flex flex-col gap-2 flex-1 overflow-auto pb-32">
          <div className="flex flex-col items-start pb-2 px-2">
            <div className="flex flex-col gap-1 w-full">
              {navMain.map(({ label, Icon }) => (
                <button key={label} onClick={() => setActive(label)}
                  className={cn('h-8 flex items-center gap-2 px-2 rounded-md w-full transition-colors',
                    active === label ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/60')}>
                  <Icon className="size-4 shrink-0" />
                  <span className="font-normal text-sm leading-none">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start px-2">
            <div className="h-8 flex items-center px-2 w-full opacity-70">
              <span className="font-medium text-xs text-sidebar-foreground">Documents</span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              {navDocs.map(({ label, Icon }) => (
                <button key={label} onClick={() => setActive(label)}
                  className={cn('h-8 flex items-center gap-2 px-2 rounded-md w-full transition-colors',
                    active === label ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/60')}>
                  <Icon className="size-4 shrink-0" />
                  <span className="font-normal text-sm leading-none">{label}</span>
                </button>
              ))}
              <button className="h-8 flex items-center gap-2 px-2 rounded-md w-full text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors opacity-70">
                <Ellipsis className="size-4 shrink-0" />
                <span className="font-normal text-sm leading-none">More</span>
              </button>
            </div>
          </div>
        </div>
        {/* Footer — absolute at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-sidebar p-2 flex flex-col gap-2">
          <div className="flex flex-col gap-1 pt-2 border-t border-sidebar-border">
            {navBottom.map(({ label, Icon }) => (
              <button key={label} className="h-8 flex items-center gap-2 px-2 rounded-md w-full text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors">
                <Icon className="size-4 shrink-0" />
                <span className="font-normal text-sm leading-none">{label}</span>
              </button>
            ))}
            <div className="h-8 flex items-center gap-2 px-2 rounded-md w-full text-sidebar-foreground">
              <Moon className="size-4 shrink-0" />
              <span className="font-normal text-sm leading-none flex-1">Dark Mode</span>
              <button className="w-8 h-5 rounded-full bg-[#e5e5e5] flex items-center px-0.5 shrink-0">
                <div className="size-4 rounded-full bg-background shadow-lg" />
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-2 py-2 rounded-md w-full hover:bg-sidebar-accent/60 transition-colors">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary/60 to-brand-secondary/60 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-white">S</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-sidebar-foreground leading-none truncate">shadcn</span>
              <span className="font-normal text-xs text-sidebar-foreground/60 truncate">m@example.com</span>
            </div>
            <ChevronsUpDown className="size-4 text-sidebar-foreground/60 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SidebarPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Sidebar"
        description="App-shell side navigation. The outer wrapper uses p-2 so the page background shows through as a visual inset. The footer is absolutely positioned at the bottom."
      />

      <Section title="Preview">
        <SidebarPreview />
      </Section>

      <Section title="Structure">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Zone</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Outer wrapper',      'p-2 · bg-background shows through · w-56 · h-full'],
                ['Inner surface',      'bg-sidebar · flex-col · relative (needed for abs. footer)'],
                ['Logo row',           'p-2 · h-8 · gap-2 px-1.5 · font-semibold text-base text-sidebar-foreground'],
                ['Quick Create btn',   'bg-neutral-500 · h-8 · rounded-md · text-neutral-50'],
                ['Mail icon btn',      'size-8 · border border-input · bg-background · shadow-xs'],
                ['Nav group',          'px-2 · gap-1 (between items)'],
                ['Group label',        'h-8 px-2 · font-medium text-xs text-sidebar-foreground · opacity-70'],
                ['Nav item (default)', 'h-8 px-2 gap-2 · text-sidebar-foreground · hover:bg-sidebar-accent/60'],
                ['Nav item (active)',  'bg-sidebar-accent · text-sidebar-accent-foreground'],
                ['Nav item icon',      'size-4 shrink-0'],
                ['Nav item text',      'font-normal text-sm leading-none'],
                ['Footer',             'absolute bottom-0 · bg-sidebar · p-2 · gap-2 · border-t border-sidebar-border'],
                ['User avatar',        'size-8 rounded-lg (not rounded-full) · gradient from-primary/60 to-brand-secondary/60'],
                ['User name',          'font-semibold text-sm text-sidebar-foreground'],
                ['User email',         'font-normal text-xs text-sidebar-foreground/60'],
                ['Main scroll area',   'pb-32 to clear absolute footer height'],
              ].map(([zone, tokens]) => (
                <tr key={zone} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{zone}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
