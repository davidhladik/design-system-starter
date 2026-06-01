'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Monitor,
  Moon,
  Sun,
  ChevronDown,
  LineChart,
  Cog,
  Activity,
  PencilRuler,
  Target,
  Megaphone,
  Banknote,
  Users,
  UserRound,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

export type ThemeMode = 'monitor' | 'moon' | 'sun'

interface MenuItem {
  id: string
  icon: React.ElementType
  label: string
  subItems?: { label: string; href?: string }[]
}

export const menuItems: MenuItem[] = [
  {
    id: 'Revenue Forecast',
    icon: LineChart,
    label: 'Revenue Forecast',
    subItems: [
      { label: 'Overview',                    href: '/strv-dashboard' },
      { label: 'Open Deals Breakdown',        href: '/strv-dashboard/open-deals' },
      { label: 'Split by Region' },
      { label: 'People - Detailed Forecast' },
      { label: 'Forecasted vs. Invoiced' },
      { label: 'Forecasted vs. Signed' },
      { label: 'Month-over-month' },
    ],
  },
  {
    id: 'Operations',
    icon: Cog,
    label: 'Operations',
    subItems: [
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
    ],
  },
  {
    id: 'Product',
    icon: Activity,
    label: 'Product',
    subItems: [
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
    ],
  },
  {
    id: 'D&E',
    icon: PencilRuler,
    label: 'D&E',
    subItems: [
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
    ],
  },
  {
    id: 'Sales',
    icon: Target,
    label: 'Sales',
    subItems: [
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
      { label: 'Sub Menu Item' },
    ],
  },
  {
    id: 'Marketing',
    icon: Megaphone,
    label: 'Marketing',
    subItems: [
      { label: 'Hubspot' },
      { label: 'Google Analytics' },
      { label: 'Google Ads' },
    ],
  },
  { id: 'Finance',    icon: Banknote, label: 'Finance' },
  { id: 'People Ops', icon: Users,    label: 'People Ops' },
]

const collapsedIcons: React.ElementType[] = [
  LineChart, Cog, Activity, PencilRuler, Target, Megaphone, Banknote, Users,
]

// Routes that belong to each top-nav section.
// "Reporting" = everything under /strv-dashboard that isn't another section root.
const NAV_SECTIONS = [
  { label: 'REPORTING',         href: '/strv-dashboard/reporting-root', // sentinel — never matched literally
    matchFn: (p: string) =>
      p === '/strv-dashboard' ||
      (p.startsWith('/strv-dashboard/') &&
        !p.startsWith('/strv-dashboard/resource-planning') &&
        !p.startsWith('/strv-dashboard/time-tracking') &&
        !p.startsWith('/strv-dashboard/admin')),
  },
  { label: 'RESOURCE PLANNING', href: '/strv-dashboard/resource-planning',
    matchFn: (p: string) => p.startsWith('/strv-dashboard/resource-planning'),
  },
  { label: 'TIME TRACKING',     href: '/strv-dashboard/time-tracking',
    matchFn: (p: string) => p.startsWith('/strv-dashboard/time-tracking'),
  },
  { label: 'ADMIN',             href: '/strv-dashboard/admin',
    matchFn: (p: string) => p.startsWith('/strv-dashboard/admin'),
  },
]

// Routes where the sidebar is visible
export function isSidebarRoute(pathname: string): boolean {
  return (
    pathname === '/strv-dashboard' ||
    (pathname.startsWith('/strv-dashboard/') &&
      !pathname.startsWith('/strv-dashboard/resource-planning') &&
      !pathname.startsWith('/strv-dashboard/time-tracking') &&
      !pathname.startsWith('/strv-dashboard/admin'))
  )
}

// ---------------------------------------------------------------------------
// ThemeToggle
// ---------------------------------------------------------------------------

function ThemeToggle({
  mode,
  onChange,
}: {
  mode: ThemeMode
  onChange: (m: ThemeMode) => void
}) {
  return (
    <div className="bg-muted-secondary border border-border rounded-full h-7 p-0.5 flex items-center gap-0.5">
      {(
        [
          { id: 'monitor' as ThemeMode, Icon: Monitor },
          { id: 'moon'    as ThemeMode, Icon: Moon    },
          { id: 'sun'     as ThemeMode, Icon: Sun     },
        ] as { id: ThemeMode; Icon: React.ElementType }[]
      ).map(({ id, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`size-6 rounded-full flex items-center justify-center transition-colors ${
            mode === id
              ? 'bg-background shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export function Navbar({
  themeMode,
  onThemeChange,
}: {
  themeMode: ThemeMode
  onThemeChange: (m: ThemeMode) => void
}) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 h-16 bg-muted border-b border-border flex items-center px-6 gap-6">
      {/* Logo */}
      <span className="text-primary font-bold text-xl uppercase tracking-tight shrink-0">
        Nirvana
      </span>

      {/* Nav links */}
      <nav className="flex items-stretch h-16 flex-1">
        {NAV_SECTIONS.map((section) => {
          const isActive = section.matchFn(pathname)
          const href = section.label === 'REPORTING' ? '/strv-dashboard' : section.href

          return (
            <React.Fragment key={section.label}>
              <div className="w-px bg-border self-stretch" />
              <Link
                href={href}
                className={`px-6 text-xs font-bold uppercase tracking-[0.48px] flex items-center transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive
                    ? 'bg-background border-b-2 border-primary text-foreground'
                    : 'text-foreground'
                }`}
              >
                {section.label}
              </Link>
            </React.Fragment>
          )
        })}
        <div className="w-px bg-border self-stretch" />
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4 shrink-0 self-stretch">
        <ThemeToggle mode={themeMode} onChange={onThemeChange} />
        <div className="w-px bg-border self-stretch" />
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-muted-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden">
            <UserRound className="size-5 text-muted-foreground" />
          </div>
          <span className="font-bold text-sm text-foreground">David Hladík</span>
          <ChevronDown className="size-4 text-foreground opacity-50" />
        </div>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// CollapsedSidebar
// ---------------------------------------------------------------------------

export function CollapsedSidebar() {
  return (
    <div className="flex flex-col items-center p-2 gap-2">
      {collapsedIcons.map((Icon, i) => (
        <button
          key={i}
          className={`flex items-center justify-center w-12 h-12 transition-colors ${
            i === 0
              ? 'bg-sidebar-accent text-sidebar-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent'
          }`}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ExpandedSidebar
// ---------------------------------------------------------------------------

export function ExpandedSidebar({
  expandedMenus,
  onToggleMenu,
  labelsVisible,
  activeHref,
}: {
  expandedMenus: Set<string>
  onToggleMenu: (id: string) => void
  labelsVisible: boolean
  activeHref: string
}) {
  return (
    <div className="flex flex-col w-64 shrink-0 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="p-2 flex flex-col flex-1 gap-2">
        {menuItems.map((item) => {
          const isExpanded = expandedMenus.has(item.id)
          const isActive = item.id === 'Revenue Forecast'
          const Icon = item.icon

          return (
            <div key={item.id}>
              <button
                onClick={() => item.subItems && onToggleMenu(item.id)}
                className={`flex items-center gap-3 w-full h-12 px-4 transition-colors ${
                  isActive ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/60'
                }`}
              >
                <Icon className="size-4 shrink-0 text-sidebar-foreground" />
                <span
                  className={`flex-1 text-sm font-bold leading-none truncate text-left transition-opacity duration-[400ms] ${
                    labelsVisible ? 'opacity-100' : 'opacity-0'
                  } ${isActive ? 'text-sidebar-accent-foreground' : 'text-sidebar-foreground'}`}
                >
                  {item.label}
                </span>
                {item.subItems && (
                  <ChevronDown
                    className={`size-4 shrink-0 text-sidebar-foreground transition-[transform,opacity] duration-[400ms] ${
                      isExpanded ? 'rotate-180' : ''
                    } ${labelsVisible ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
              </button>

              {item.subItems && (
                <div
                  className="grid transition-[grid-template-rows] duration-[400ms] ease-in-out"
                  style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-sidebar-border flex flex-col p-2">
                      {item.subItems.map((sub, si) => {
                        const isActiveSub = !!sub.href && sub.href === activeHref

                        const content = (
                          <>
                            <span
                              className="size-1.5 shrink-0"
                              style={{
                                backgroundColor: isActiveSub
                                  ? 'var(--color-primary)'
                                  : 'rgba(23,23,23,0.1)',
                              }}
                            />
                            <span
                              className={`text-sm leading-none whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-[400ms] ${
                                labelsVisible ? 'opacity-100' : 'opacity-0'
                              } ${
                                isActiveSub
                                  ? 'font-bold text-sidebar-accent-foreground'
                                  : 'font-normal text-sidebar-foreground'
                              }`}
                            >
                              {sub.label}
                            </span>
                          </>
                        )

                        const baseClass = `flex items-center gap-4 h-10 px-3 w-full text-left transition-colors ${
                          isActiveSub ? '' : 'hover:bg-sidebar-accent/60'
                        }`

                        return sub.href ? (
                          <Link
                            key={`${item.id}-${si}`}
                            href={sub.href}
                            className={baseClass}
                            style={
                              isActiveSub
                                ? { backgroundColor: 'rgba(239, 0, 59, 0.1)' }
                                : undefined
                            }
                          >
                            {content}
                          </Link>
                        ) : (
                          <button key={`${item.id}-${si}`} className={baseClass}>
                            {content}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// DashboardShell — thin wrapper kept for any legacy imports
// (layout.tsx is the canonical shell now)
// ---------------------------------------------------------------------------

interface DashboardShellProps {
  children: React.ReactNode
  activeHref?: string
}

export function DashboardShell({ children, activeHref = '/strv-dashboard' }: DashboardShellProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('sun')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [sidebarClosing, setSidebarClosing] = useState(false)
  const [sidebarAnimatingOpen, setSidebarAnimatingOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['Revenue Forecast']))
  const isDark = themeMode === 'moon'

  function toggleMenu(id: string) {
    setExpandedMenus((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex flex-col min-h-screen bg-muted text-foreground">
        <Navbar themeMode={themeMode} onThemeChange={setThemeMode} />
        <div className="flex flex-1">
          <div className="relative w-16 shrink-0">
            <div
              className={`sticky top-16 z-20 bg-sidebar border-r border-sidebar-border overflow-hidden transition-[width] duration-[400ms] ease-in-out ${
                sidebarExpanded ? 'w-64 shadow-xl' : 'w-16'
              }`}
              style={{ height: 'calc(100vh - 4rem)' }}
              onMouseEnter={() => {
                if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
                setSidebarClosing(false)
                setSidebarExpanded(true)
                setSidebarAnimatingOpen(true)
                requestAnimationFrame(() => requestAnimationFrame(() => setSidebarAnimatingOpen(false)))
              }}
              onMouseLeave={() => {
                setSidebarExpanded(false)
                setSidebarClosing(true)
                closeTimerRef.current = setTimeout(() => setSidebarClosing(false), 400)
              }}
            >
              {sidebarExpanded || sidebarClosing ? (
                <ExpandedSidebar
                  expandedMenus={sidebarAnimatingOpen || sidebarClosing ? new Set<string>() : expandedMenus}
                  onToggleMenu={toggleMenu}
                  labelsVisible={!sidebarAnimatingOpen && !sidebarClosing}
                  activeHref={activeHref}
                />
              ) : (
                <CollapsedSidebar />
              )}
            </div>
          </div>
          <main className="flex-1 px-[88px] pt-10 pb-12 bg-muted min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
