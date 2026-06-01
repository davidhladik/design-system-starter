'use client'


// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const months = [
  {
    label: 'MAY',
    total: '$1.5M',
    change: '-4%',
    changeSuffix: 'vs Apr',
    positive: false,
    col1: { label: 'OPEN EXISTING', value: '$245.5K', pct: '95% of total open' },
    col2: { label: 'OPEN NEW',      value: '$13.7K',  pct: '5% of total open'  },
    chartTitle: 'Open Deals — May 2026',
    bars: [
      { company: 'Acme Corp',      existing: 245493, new: 13700 },
      { company: 'TechFlow',       existing: 182000, new: 28000 },
      { company: 'Meridian',       existing: 134000, new:  9500 },
      { company: 'Orbital Labs',   existing:  98000, new: 41200 },
      { company: 'Vantage',        existing:  76000, new:  5800 },
    ],
  },
  {
    label: 'JUN',
    total: '$1.9M',
    change: '+24%',
    changeSuffix: 'vs May',
    positive: true,
    col1: { label: 'OPEN EXISTING', value: '$245.5K', pct: '95% of total open' },
    col2: { label: 'OPEN NEW',      value: '$13.7K',  pct: '5% of total open'  },
    chartTitle: 'Open Deals — June 2026',
    bars: [
      { company: 'Acme Corp',      existing: 245493, new: 13700 },
      { company: 'TechFlow',       existing: 220000, new: 44000 },
      { company: 'Meridian',       existing: 165000, new: 18000 },
      { company: 'Orbital Labs',   existing: 121000, new: 55000 },
      { company: 'Vantage',        existing:  92000, new: 12000 },
    ],
  },
  {
    label: 'JUL',
    total: '$2M',
    change: '+2%',
    changeSuffix: 'vs Jun',
    positive: true,
    col1: { label: 'OPEN EXISTING', value: '$245.5K', pct: '95% of total open' },
    col2: { label: 'OPEN NEW',      value: '$13.7K',  pct: '5% of total open'  },
    chartTitle: 'Open Deals — July 2026',
    bars: [
      { company: 'Acme Corp',      existing: 245493, new: 13700 },
      { company: 'TechFlow',       existing: 230000, new: 48000 },
      { company: 'Meridian',       existing: 172000, new: 21000 },
      { company: 'Orbital Labs',   existing: 128000, new: 61000 },
      { company: 'Vantage',        existing:  98000, new: 15000 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmtK(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`
  return `$${n}`
}

// ---------------------------------------------------------------------------
// MonthPanel
// ---------------------------------------------------------------------------

function MonthPanel({ month }: { month: typeof months[0] }) {
  const maxVal = Math.max(...month.bars.flatMap((b) => [b.existing + b.new]))
  const chartMax = Math.ceil(maxVal / 50000) * 50000
  const gridLines = [275000, 250000, 225000, 200000, 175000, 150000, 125000, 100000]

  return (
    <div className="flex-1 bg-card flex flex-col overflow-hidden min-w-0">
      {/* Top stats */}
      <div className="px-[18px] pt-4 pb-0">
        {/* Month label + Total label */}
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-xs font-bold uppercase tracking-[0.48px]"
            style={{ color: 'var(--foreground)', opacity: 0.4 }}
          >
            {month.label}
          </span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-3" />

        {/* Big number */}
        <div
          className="font-[family-name:var(--font-maison-neue)] text-[40px] font-bold leading-none tracking-[-0.06em] uppercase text-foreground mb-1"
          style={{ fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
        >
          {month.total}
        </div>

        {/* % change */}
        <div className="flex items-baseline gap-1 mb-4">
          <span
            className="font-[family-name:var(--font-maison-neue)] text-xs font-semibold"
            style={{ color: month.positive ? 'var(--success-foreground)' : 'var(--destructive)' }}
          >
            {month.change}
          </span>
          <span className="font-[family-name:var(--font-maison-neue)] text-xs text-muted-foreground">
            {month.changeSuffix}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-3" />

        {/* Sub-stat columns */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          {[month.col1, month.col2].map((col) => (
            <div key={col.label}>
              <span
                className="block text-[10px] font-bold uppercase tracking-[0.48px] mb-1"
                style={{ color: 'var(--foreground)', opacity: 0.4 }}
              >
                {col.label}
              </span>
              <div
                className="font-[family-name:var(--font-maison-neue)] text-2xl font-bold leading-none tracking-[-0.06em] uppercase text-foreground mb-0.5"
                style={{ fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
              >
                {col.value}
              </div>
              <span className="text-xs text-muted-foreground">{col.pct}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-5" />

        {/* Chart title */}
        <div className="font-[family-name:var(--font-maison-neue)] text-xl font-bold leading-none text-foreground mb-5">
          {month.chartTitle}
        </div>
      </div>

      {/* Bar chart */}
      <div className="px-[18px] pb-5 flex-1">
        <div className="relative" style={{ height: 340 }}>
          {/* Grid lines + y-axis labels */}
          {gridLines.map((v) => {
            const pct = (v / chartMax) * 100
            return (
              <div
                key={v}
                className="absolute inset-x-0 flex items-center gap-2"
                style={{ bottom: `${pct}%` }}
              >
                <span className="text-[10px] text-muted-foreground w-14 text-right shrink-0">
                  ${(v / 1000).toFixed(0)},000
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            )
          })}

          {/* Bars area */}
          <div className="absolute inset-0 pl-16 flex items-end gap-1.5 pb-6">
            {month.bars.map((bar) => {
              const total = bar.existing + bar.new
              const totalPct = (total / chartMax) * 100
              const existingPct = (bar.existing / total) * 100

              return (
                <div
                  key={bar.company}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                >
                  {/* Value label */}
                  <span
                    className="text-[10px] font-semibold text-foreground mb-0.5"
                    style={{ fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
                  >
                    {fmtK(total)}
                  </span>
                  {/* Stacked bar */}
                  <div
                    className="w-full relative overflow-hidden"
                    style={{ height: `${totalPct}%` }}
                  >
                    {/* Existing (primary — dark red) */}
                    <div
                      className="absolute bottom-0 inset-x-0"
                      style={{
                        height: `${existingPct}%`,
                        backgroundColor: 'var(--color-primary)',
                      }}
                    />
                    {/* New (lighter) */}
                    <div
                      className="absolute top-0 inset-x-0"
                      style={{
                        height: `${100 - existingPct}%`,
                        backgroundColor: 'oklch(from var(--color-primary) calc(l + 0.15) c h)',
                      }}
                    />
                    {/* Inner label */}
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80"
                      style={{ fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
                    >
                      {fmtK(bar.existing)}
                    </span>
                  </div>
                  {/* Company label */}
                  <span className="text-[9px] text-muted-foreground mt-1 text-center leading-tight break-words w-full">
                    {bar.company.split(' ')[0]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 pl-16">
          <div className="flex items-center gap-1.5">
            <span className="size-2 shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
            <span className="text-xs text-muted-foreground">Existing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0"
              style={{ backgroundColor: 'oklch(from var(--color-primary) calc(l + 0.15) c h)' }}
            />
            <span className="text-xs text-muted-foreground">New</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OpenDealsPage() {
  return (
    <div className="px-[88px]">
      {/* Page header */}
      <div className="flex items-start gap-2.5 mb-5">
        <h1 className="font-[family-name:var(--font-pp-neue-corp-tight)] text-[60px] font-bold leading-none text-foreground uppercase tracking-normal">
          Open deals breakdown
        </h1>
        <div className="pt-[10px]">
          <span className="text-xs font-bold uppercase opacity-60 text-muted-foreground tracking-[0.48px]">
            [ revenue forecast ]
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-8 max-w-[622px] leading-5">
        Bar charts for the current and two upcoming months showing open pipeline per company,
        split into existing projects and new opportunities. Click a bar to drill down to SOW-level detail.
      </p>

      {/* Three-column month panels */}
      <div className="flex gap-5">
        {months.map((month) => (
          <MonthPanel key={month.label} month={month} />
        ))}
      </div>
    </div>
  )
}
