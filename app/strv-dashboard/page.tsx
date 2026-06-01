'use client'

import { useState } from 'react'
import {
  Landmark,
  Clock,
  Bell,
  PieChart,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const statCards = [
  {
    icon: Landmark,
    label: 'CLOSED REVENUE',
    value: '$11.5M',
    subtitle: '71% of annual forecast',
    badge: null,
  },
  {
    icon: Clock,
    label: 'OPEN EXISTING',
    value: '$3.4M',
    subtitle: '$1,362,997 avg / month',
    badge: null,
  },
  {
    icon: Bell,
    label: 'OPEN NEW',
    value: '$1.4M',
    subtitle: '$16.4M forecast total',
    badge: null,
  },
  {
    icon: PieChart,
    label: 'CLOSED WON VS. TARGET',
    value: '89%',
    subtitle: '$7.8M / $8.7M',
    badge: 'YTD',
  },
]

const barData = [
  { month: 'Jan', h: 39 },
  { month: 'Feb', h: 88 },
  { month: 'Mar', h: 50 },
  { month: 'Apr', h: 67 },
  { month: 'May', h: 39 },
  { month: 'Jun', h: 54 },
  { month: 'Jul', h: 39 },
  { month: 'Aug', h: 88 },
  { month: 'Sep', h: 50 },
  { month: 'Oct', h: 67 },
  { month: 'Nov', h: 39 },
  { month: 'Dec', h: 54 },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCards() {
  return (
    <div className="flex gap-4 mb-5">
      {statCards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.label} className="flex-1 bg-card p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                <span className="text-xs font-bold uppercase tracking-[0.48px] text-muted-foreground flex-1">
                  {card.label}
                </span>
                {card.badge && (
                  <span className="text-xs font-bold uppercase tracking-[0.48px] text-muted-foreground opacity-50">
                    {card.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold leading-none text-card-foreground">
                  {card.value}
                </span>
                <span className="text-xs font-semibold leading-none text-muted-foreground">
                  {card.subtitle}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function BarChart({
  selectedYear,
  onYearChange,
}: {
  selectedYear: string
  onYearChange: (y: string) => void
}) {
  return (
    <div className="bg-card p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-1.5">
        <div className="flex flex-col gap-0.5 flex-1">
          <span className="text-xs font-bold uppercase tracking-[0.48px] text-muted-foreground">
            revenue forecast
          </span>
          <span className="text-xl font-bold leading-7 text-foreground">
            {selectedYear} Overview
          </span>
        </div>
        <div className="flex items-center gap-1">
          {['2026', '2025'].map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`h-9 px-3 text-sm font-medium text-foreground border transition-colors ${
                selectedYear === year
                  ? 'border-border-bold bg-background'
                  : 'border-input bg-transparent hover:bg-muted'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[434px] w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <div
            key={pct}
            className="absolute w-full border-t border-border"
            style={{ top: `${pct}%` }}
          />
        ))}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end pb-6">
          {barData.map((bar) => (
            <div key={bar.month} className="flex-1 flex justify-center items-end h-full">
              <div
                className="w-3/5 rounded-sm"
                style={{
                  height: `${bar.h}%`,
                  backgroundImage:
                    'linear-gradient(to top, var(--color-primary) 75%, var(--chart-neutral) 75%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Month labels */}
        <div className="absolute bottom-0 inset-x-0 flex h-6 items-center">
          {barData.map((bar) => (
            <div
              key={bar.month}
              className="flex-1 text-center text-xs text-muted-foreground"
            >
              {bar.month}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-primary shrink-0" />
          <span className="text-xs text-muted-foreground">Closed Won</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="size-2 rounded-sm shrink-0"
            style={{ backgroundColor: 'var(--chart-neutral)' }}
          />
          <span className="text-xs text-muted-foreground">Forecasted</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StrvDashboardPage() {
  const [selectedYear, setSelectedYear] = useState('2026')

  return (
    <div className="px-[88px]">
      {/* Page header */}
      <div className="flex items-start gap-2.5 mb-5">
        <h1 className="font-[family-name:var(--font-pp-neue-corp-tight)] text-[60px] font-bold leading-none text-foreground uppercase tracking-normal">
          OVERVIEW
        </h1>
        <div className="pt-[10px]">
          <span className="text-xs font-bold uppercase opacity-60 text-muted-foreground tracking-[0.48px]">
            [ revenue forecast ]
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <StatCards />

      {/* Bar chart */}
      <BarChart selectedYear={selectedYear} onYearChange={setSelectedYear} />
    </div>
  )
}
