'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Navbar,
  CollapsedSidebar,
  ExpandedSidebar,
  isSidebarRoute,
  type ThemeMode,
} from './_components/shell'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showSidebar = isSidebarRoute(pathname)

  const [themeMode, setThemeMode] = useState<ThemeMode>('sun')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [sidebarClosing, setSidebarClosing] = useState(false)
  const [sidebarAnimatingOpen, setSidebarAnimatingOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['Revenue Forecast']))

  const isDark = themeMode === 'moon'

  // Collapse the sidebar whenever we leave a reporting route
  useEffect(() => {
    if (!showSidebar) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      setSidebarExpanded(false)
      setSidebarClosing(false)
      setSidebarAnimatingOpen(false)
    }
  }, [showSidebar])

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

        {/* Navbar */}
        <Navbar themeMode={themeMode} onThemeChange={setThemeMode} />

        {/* Body */}
        <div className="flex flex-1">

          {/*
            Layout spacer — purely controls how much horizontal space the sidebar
            occupies in the flex row. Transitions w-16 ↔ w-0 so the main content
            stretches/shrinks smoothly.
          */}
          <div
            className={`shrink-0 transition-[width] duration-[400ms] ease-in-out ${
              showSidebar ? 'w-16' : 'w-0'
            }`}
          />

          {/*
            Sidebar panel — fixed to the left edge of the viewport, fully decoupled
            from the layout spacer above. Because it's fixed (not inside the spacer),
            the translate animation is never clipped by a parent and is always visible
            as it slides in/out of the left screen edge.

            Hover-expand (w-16 → w-64) overlays the main content, same as before.
          */}
          <div
            className={`fixed top-16 left-0 z-20 bg-sidebar border-r border-sidebar-border overflow-hidden ${
              sidebarExpanded ? 'w-64 shadow-xl' : 'w-16'
            }`}
            style={{
              height: 'calc(100vh - 4rem)',
              transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'width 400ms ease-in-out, transform 400ms ease-in-out',
            }}
            onMouseEnter={() => {
              if (!showSidebar) return
              if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
              setSidebarClosing(false)
              setSidebarExpanded(true)
              setSidebarAnimatingOpen(true)
              requestAnimationFrame(() =>
                requestAnimationFrame(() => setSidebarAnimatingOpen(false))
              )
            }}
            onMouseLeave={() => {
              if (!showSidebar) return
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
                activeHref={pathname}
              />
            ) : (
              <CollapsedSidebar />
            )}
          </div>

          {/* Main content */}
          <main className="flex-1 pt-10 pb-12 bg-muted min-w-0">
            {children}
          </main>

        </div>
      </div>
    </div>
  )
}
