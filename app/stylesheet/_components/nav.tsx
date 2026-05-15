'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const nav = [
  {
    section: 'Design System',
    items: [
      { label: 'Tailwind CSS', href: '/stylesheet/design-system/tailwind' },
      { label: 'Theme', href: '/stylesheet/design-system/theme' },
      { label: 'Mode', href: '/stylesheet/design-system/mode' },
    ],
  },
  {
    section: 'Components',
    items: [
      { label: 'Button', href: '/stylesheet/components/button' },
    ],
  },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <aside className="w-52 shrink-0 border-r border-border bg-sidebar h-screen sticky top-0 overflow-y-auto flex flex-col">
      <div className="px-4 py-5 border-b border-border">
        <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">Design System</span>
      </div>
      <nav className="p-2 flex-1">
        {nav.map(({ section, items }) => (
          <div key={section} className="mb-5">
            <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {section}
            </p>
            {items.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center px-3 py-1.5 text-sm rounded-md transition-colors',
                  pathname === href
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
