'use client'

import { useState } from 'react'
import { Bold } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageHeader, Section } from '../../_components/token-table'

// ── Joined-button toggle group (mirrors app/test/page.tsx ChartCard) ──────────
// Buttons share borders — no gap between them. Each button only has the
// border sides it owns: left gets full border, middle shares y+right,
// right gets y+right + rounded-r. Use -ml-px if you need collapsed borders.

function SegmentedGroup() {
  const [active, setActive] = useState<'3m' | '30d'>('3m')
  return (
    <div className="flex items-center">
      <button
        onClick={() => setActive('3m')}
        className={cn(
          'h-9 px-3 flex items-center border border-input text-sm font-medium rounded-l-md shadow-xs transition-colors',
          active === '3m' ? 'bg-background text-foreground' : 'bg-background text-foreground hover:bg-accent'
        )}
      >
        Last 3 months
      </button>
      <button
        onClick={() => setActive('30d')}
        className={cn(
          'h-9 px-3 flex items-center border-y border-r border-input text-sm font-medium transition-colors',
          active === '30d' ? 'bg-background text-foreground' : 'bg-background text-foreground hover:bg-accent'
        )}
      >
        Last 30 days
      </button>
      {/* Icon-only trailing button */}
      <button className="h-9 w-9 flex items-center justify-center border-y border-r border-input rounded-r-md bg-background text-foreground shadow-xs hover:bg-accent transition-colors">
        <Bold className="size-4" />
      </button>
    </div>
  )
}

function TwoSegment() {
  const [active, setActive] = useState<'week' | 'month'>('week')
  return (
    <div className="flex items-center">
      <button
        onClick={() => setActive('week')}
        className={cn(
          'h-8 px-3 flex items-center border border-input text-sm font-medium rounded-l-md transition-colors',
          active === 'week' ? 'bg-background text-foreground' : 'bg-background text-foreground hover:bg-accent'
        )}
      >
        Week
      </button>
      <button
        onClick={() => setActive('month')}
        className={cn(
          'h-8 px-3 flex items-center border-y border-r border-input rounded-r-md text-sm font-medium transition-colors',
          active === 'month' ? 'bg-background text-foreground' : 'bg-background text-foreground hover:bg-accent'
        )}
      >
        Month
      </button>
    </div>
  )
}

export default function ToggleGroupPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Toggle Group"
        description="A row of joined buttons that share borders — no gap between segments. Used to switch between mutually exclusive options like date ranges or view modes."
      />

      <Section title="3-segment (text + text + icon)">
        <p className="text-xs text-muted-foreground mb-4">
          First button owns its full border + rounded-l-md. Middle buttons own border-y + border-r.
          Last button owns border-y + border-r + rounded-r-md.
        </p>
        <SegmentedGroup />
      </Section>

      <Section title="2-segment">
        <TwoSegment />
      </Section>

      {/* Spec table */}
      <Section title="Specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Property</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Height',              'h-9 (default) · h-8 (compact)'],
                ['Text',               'text-sm font-medium'],
                ['Border colour',      'border-input'],
                ['Background',         'bg-background'],
                ['Hover',              'hover:bg-accent'],
                ['First segment',      'border (all sides) · rounded-l-md · shadow-xs'],
                ['Middle segments',    'border-y border-r (no left — shared with prev)'],
                ['Last segment',       'border-y border-r · rounded-r-md · shadow-xs'],
                ['Icon button width',  'w-9'],
              ].map(([prop, val]) => (
                <tr key={prop} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
