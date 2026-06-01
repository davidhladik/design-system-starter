import { TrendingUp, TrendingDown } from 'lucide-react'
import { PageHeader, Section } from '../../_components/token-table'

const examples = [
  {
    title: 'Total Revenue',
    value: '$15,231.89',
    change: '+12.5%',
    direction: 'up' as const,
    subtitle: 'Trending up this month',
    description: 'Visitors for the last 6 months',
  },
  {
    title: 'New Customers',
    value: '1,234',
    change: '-20%',
    direction: 'down' as const,
    subtitle: 'Down 20% this period',
    description: 'Acquisition needs attention',
  },
]

function StatsCard({ title, value, change, direction, subtitle, description }: typeof examples[number]) {
  const TrendIcon = direction === 'up' ? TrendingUp : TrendingDown
  return (
    <div
      className="flex flex-col items-start overflow-clip p-6 rounded-xl border border-[rgba(10,10,10,0.1)] shadow-sm"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(23,23,23,0) 0%, rgba(79,70,229,0.05) 100%), linear-gradient(90deg, rgb(255,255,255) 0%, rgb(255,255,255) 100%)',
      }}
    >
      {/* Row 1 — title + trend badge */}
      <div className="flex items-center justify-between w-full mb-6">
        <span className="font-normal text-sm text-muted-foreground">{title}</span>
        <div className="flex items-center gap-1 bg-background border border-[rgba(10,10,10,0.1)] rounded-md px-2 py-0.5">
          <TrendIcon className="size-3 text-foreground shrink-0" />
          <span className="font-semibold text-xs text-foreground">{change}</span>
        </div>
      </div>
      {/* Row 2 — metric value */}
      <span className="font-semibold text-3xl leading-9 text-foreground w-full mb-6">{value}</span>
      {/* Row 3 — subtitle with TrendingUp (always up, even on down cards) */}
      <div className="flex items-center gap-1 mb-1">
        <span className="font-normal text-sm text-foreground">{subtitle}</span>
        <TrendingUp className="size-4 text-foreground shrink-0" />
      </div>
      {/* Row 4 — supporting description */}
      <span className="font-normal text-sm text-muted-foreground w-full">{description}</span>
    </div>
  )
}

export default function StatsCardPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Stats Card"
        description="Metric / KPI card with gradient background, trend badge, and a 4-row layout. Trend badge is always neutral — no semantic green/red. The subtitle icon is always TrendingUp regardless of direction."
      />

      <Section title="Examples">
        <div className="grid grid-cols-2 gap-4">
          {examples.map((e) => <StatsCard key={e.title} {...e} />)}
        </div>
      </Section>

      <Section title="Layout structure">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-8">#</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-36">Row</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['1', 'Title + trend badge',  'justify-between · mb-6 · title: font-normal text-sm text-muted-foreground'],
                ['2', 'Metric value',         'font-semibold text-3xl leading-9 text-foreground · mb-6'],
                ['3', 'Subtitle + icon',      'gap-1 · font-normal text-sm text-foreground · TrendingUp size-4 (always up) · mb-1'],
                ['4', 'Description',          'font-normal text-sm text-muted-foreground'],
              ].map(([n, row, tokens]) => (
                <tr key={n} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{n}</td>
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{row}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Wrapper tokens">
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
                ['Padding',           'p-6'],
                ['Border radius',     'rounded-xl'],
                ['Border',            'border border-[rgba(10,10,10,0.1)]'],
                ['Shadow',            'shadow-sm'],
                ['overflow',          'overflow-clip'],
                ['Background',        'linear-gradient(180deg, rgba(23,23,23,0) 0%, rgba(79,70,229,0.05) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)'],
                ['Trend badge bg',    'bg-background · border border-[rgba(10,10,10,0.1)] · rounded-md · px-2 py-0.5'],
                ['Trend badge icon',  'size-3 text-foreground'],
                ['Trend badge text',  'font-semibold text-xs text-foreground'],
              ].map(([prop, val]) => (
                <tr key={prop} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground break-all">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
