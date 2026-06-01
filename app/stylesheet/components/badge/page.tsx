import { CircleCheck, Loader, TrendingUp, TrendingDown } from 'lucide-react'
import { PageHeader, Section } from '../../_components/token-table'

// ── Reusable badge primitives (mirrors app/test/page.tsx) ──────────────────────

function StatusBadge({ status }: { status: 'Done' | 'In Process' }) {
  return (
    <div className="inline-flex items-center gap-1 bg-background border border-[rgba(10,10,10,0.1)] rounded-md px-2 py-0.5">
      {status === 'Done'
        ? <CircleCheck className="size-3 text-foreground shrink-0" />
        : <Loader className="size-3 text-foreground shrink-0" />}
      <span className="font-semibold text-xs text-foreground whitespace-nowrap">{status}</span>
    </div>
  )
}

function TrendBadge({ change, direction }: { change: string; direction: 'up' | 'down' }) {
  const Icon = direction === 'up' ? TrendingUp : TrendingDown
  return (
    <div className="inline-flex items-center gap-1 bg-background border border-[rgba(10,10,10,0.1)] rounded-md px-2 py-0.5">
      <Icon className="size-3 text-foreground shrink-0" />
      <span className="font-semibold text-xs text-foreground">{change}</span>
    </div>
  )
}

function TypeBadge({ label }: { label: string }) {
  return <span className="font-semibold text-xs text-foreground">{label}</span>
}

export default function BadgePage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Badge"
        description="Neutral pill badges used throughout the design system. Colour is never used to convey status — icons carry the semantic meaning instead."
      />

      {/* Status badges */}
      <Section title="Status badges">
        <p className="text-xs text-muted-foreground mb-4">
          Used in data table rows. Both states share the same neutral pill — only the icon changes.
          Never use green/red for status colour.
        </p>
        <div className="flex items-center gap-3">
          <StatusBadge status="Done" />
          <StatusBadge status="In Process" />
        </div>
      </Section>

      {/* Trend badges */}
      <Section title="Trend badges">
        <p className="text-xs text-muted-foreground mb-4">
          Used in stats cards. Same neutral pill — TrendingUp / TrendingDown icon signals direction.
        </p>
        <div className="flex items-center gap-3">
          <TrendBadge change="+12.5%" direction="up" />
          <TrendBadge change="-20%" direction="down" />
          <TrendBadge change="+4.5%" direction="up" />
        </div>
      </Section>

      {/* Type label */}
      <Section title="Type label">
        <p className="text-xs text-muted-foreground mb-4">
          Plain text label — no background or border. Used for section type categorisation in tables.
        </p>
        <div className="flex items-center gap-4">
          {['Cover Page', 'Table of Contents', 'Technical Content', 'Narrative'].map((t) => (
            <TypeBadge key={t} label={t} />
          ))}
        </div>
      </Section>

      {/* Spec table */}
      <Section title="Specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Variant</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Key tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Status / Trend pill', 'bg-background · border border-[rgba(10,10,10,0.1)] · rounded-md · px-2 py-0.5'],
                ['Icon size',           'size-3'],
                ['Text',               'font-semibold text-xs text-foreground'],
                ['Type label',         'font-semibold text-xs text-foreground (no bg/border)'],
              ].map(([variant, tokens]) => (
                <tr key={variant} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{variant}</td>
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
