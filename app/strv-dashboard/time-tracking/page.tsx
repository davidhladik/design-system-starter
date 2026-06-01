'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------

const WEEK_DAYS = [
  { day: 'MON', date: 18, month: 'MAY' },
  { day: 'TUE', date: 19, month: 'MAY' },
  { day: 'WED', date: 20, month: 'MAY' },
  { day: 'THU', date: 21, month: 'MAY' },
  { day: 'FRI', date: 22, month: 'MAY' },
  { day: 'SAT', date: 23, month: 'MAY' },
  { day: 'SUN', date: 24, month: 'MAY' },
]

const TODAY_INDEX = 4 // FRI May 22

const entries = [
  {
    project: 'Acme Mobile App',
    client: 'Acme Corp',
    color: 'var(--color-primary)',
    hours: [8, 8, 8, 8, 8, 0, 0],
  },
  {
    project: 'Globex Internal Tools',
    client: 'Globex',
    color: '#f97316',
    hours: [4, 4, 4, 4, 0, 0, 0],
  },
  {
    project: 'STRV Internal — Tooling',
    client: 'Internal',
    color: '#7c3aed',
    hours: [0, 0, 4, 4, 8, 0, 0],
  },
  {
    project: 'Northwind Web Platform',
    client: 'Northwind Traders',
    color: '#0891b2',
    hours: [0, 4, 0, 0, 0, 0, 0],
  },
  {
    project: 'Initech Migration',
    client: 'Initech',
    color: '#9ca3af',
    hours: [8, 0, 0, 0, 0, 0, 0],
  },
]

const dayTotals = WEEK_DAYS.map((_, i) =>
  entries.reduce((sum, e) => sum + e.hours[i], 0)
)

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TimeTrackingPage() {
  const [activeView, setActiveView] = useState<'Day' | 'Week'>('Week')

  return (
    <div className="px-[88px]">

      {/* ── Header row ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-5">
        {/* Date nav arrows */}
        <div className="flex shrink-0">
          <button className="w-7 h-[42px] border border-border flex items-center justify-center hover:bg-muted-secondary transition-colors">
            <ChevronLeft className="size-4" />
          </button>
          <button className="w-7 h-[42px] border border-border border-l-0 flex items-center justify-center hover:bg-muted-secondary transition-colors">
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Big headline date range */}
        <h1 className="font-[family-name:var(--font-pp-neue-corp-tight)] text-[60px] font-bold leading-none text-foreground uppercase tracking-normal flex-1">
          May 18 – May 24
        </h1>

        {/* Stats */}
        <div className="flex items-end gap-6 shrink-0">
          {[
            { label: 'Projects', value: '2'     },
            { label: 'Entries',  value: '5'     },
            { label: 'Hours',    value: '40/40' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground leading-none mb-1">{label}</span>
              <span className="font-[family-name:var(--font-maison-neue)] text-base font-bold leading-none text-foreground uppercase">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Submit button */}
        <button className="h-9 px-4 bg-primary flex items-center gap-2 text-xs font-bold uppercase tracking-[0.04em] text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
          <Check className="size-4" />
          Submit
        </button>
      </div>

      {/* ── Filter row ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5">
        {/* DRAFT pill */}
        <div className="flex items-center gap-2 h-8 px-3 border border-border rounded-full">
          <span className="size-2 rounded-full bg-muted-foreground opacity-40 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-[0.04em] text-foreground">Draft</span>
        </div>

        <div className="flex-1" />

        {/* Day / Week toggle */}
        <div className="flex border border-border h-8">
          {(['Day', 'Week'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 text-xs font-bold uppercase tracking-[0.04em] transition-colors ${
                activeView === view
                  ? 'bg-muted-secondary border-border text-foreground'
                  : 'text-muted-foreground hover:bg-muted-secondary'
              } ${view === 'Week' ? 'border-l border-border' : ''}`}
            >
              {view}
            </button>
          ))}
        </div>

        {/* Today button */}
        <button className="h-8 px-3 border border-border flex items-center gap-2 text-xs font-bold uppercase tracking-[0.04em] text-foreground hover:bg-muted-secondary transition-colors">
          Today
          <span className="size-4 flex items-center justify-center bg-muted-secondary border border-border text-[10px] font-bold text-muted-foreground">
            T
          </span>
        </button>
      </div>

      {/* ── Time tracking grid ──────────────────────────────────────────── */}
      <div className="bg-card overflow-hidden">
        {/* Column header */}
        <div className="flex border-b border-border">
          {/* Left label column */}
          <div className="w-[280px] shrink-0 px-4 py-2 border-r border-border">
            <span className="text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">Project</span>
          </div>

          {/* Day columns */}
          {WEEK_DAYS.map((d, i) => (
            <div
              key={i}
              className={`flex-1 flex flex-col items-center py-2 border-r border-border last:border-r-0 ${
                i === TODAY_INDEX ? 'bg-primary/5' : ''
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-[0.04em] ${
                i === TODAY_INDEX ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {d.day}
              </span>
              <span className={`text-xs font-bold leading-none mt-0.5 ${
                i === TODAY_INDEX ? 'text-primary' : 'text-foreground'
              }`}>
                {d.date}
              </span>
            </div>
          ))}

          {/* Total column */}
          <div className="w-20 shrink-0 flex items-center justify-center py-2 border-l border-border">
            <span className="text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">Total</span>
          </div>
        </div>

        {/* Entry rows */}
        {entries.map((entry) => {
          const weekTotal = entry.hours.reduce((s, h) => s + h, 0)
          return (
            <div key={entry.project} className="flex border-b border-border last:border-b-0">
              {/* Project name */}
              <div className="w-[280px] shrink-0 px-4 py-3 border-r border-border flex items-center gap-2">
                <span
                  className="w-1 h-6 shrink-0 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">{entry.project}</span>
                  <span className="text-xs text-muted-foreground truncate">{entry.client}</span>
                </div>
              </div>

              {/* Hour cells */}
              {entry.hours.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 flex items-center justify-center py-3 border-r border-border last:border-r-0 ${
                    i === TODAY_INDEX ? 'bg-primary/5' : ''
                  }`}
                >
                  {h > 0 ? (
                    <div
                      className="h-8 w-[calc(100%-8px)] flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: entry.color }}
                    >
                      {h}:00
                    </div>
                  ) : (
                    <div className="h-8 w-[calc(100%-8px)] flex items-center justify-center text-xs text-muted-foreground border border-dashed border-border hover:border-border-bold cursor-pointer transition-colors">
                      —
                    </div>
                  )}
                </div>
              ))}

              {/* Row total */}
              <div className="w-20 shrink-0 flex items-center justify-center border-l border-border">
                <span className="text-sm font-bold text-foreground">{weekTotal}h</span>
              </div>
            </div>
          )
        })}

        {/* Footer totals row */}
        <div className="flex border-t border-border bg-muted/30">
          <div className="w-[280px] shrink-0 px-4 py-3 border-r border-border">
            <span className="text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">Daily total</span>
          </div>
          {dayTotals.map((total, i) => (
            <div
              key={i}
              className={`flex-1 flex items-center justify-center py-3 border-r border-border last:border-r-0 ${
                i === TODAY_INDEX ? 'bg-primary/5' : ''
              }`}
            >
              <span className={`text-sm font-bold ${total > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                {total > 0 ? `${total}h` : '—'}
              </span>
            </div>
          ))}
          <div className="w-20 shrink-0 flex items-center justify-center border-l border-border">
            <span className="text-sm font-bold text-foreground">
              {dayTotals.reduce((s, h) => s + h, 0)}h
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
