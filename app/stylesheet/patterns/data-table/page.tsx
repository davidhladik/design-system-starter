'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CircleCheck, Loader, GripVertical, SlidersHorizontal, ChevronDown,
  MoreVertical, Plus, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { PageHeader, Section } from '../../_components/token-table'

// Minimal table example (3 rows) to illustrate the pattern
const rows = [
  { id: 1, header: 'Cover Page',        type: 'Cover Page',        status: 'In Process' as const, target: 23, limit: 32 },
  { id: 2, header: 'Table of contents', type: 'Table of Contents', status: 'Done'       as const, target: 45, limit: 8  },
  { id: 3, header: 'Executive summary', type: 'Technical Content', status: 'Done'       as const, target: 45, limit: 45 },
]

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

function TabBadge({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full font-semibold text-xs text-foreground"
      style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 100%), linear-gradient(90deg, rgb(115,115,115) 0%, rgb(115,115,115) 100%)' }}
    >
      {count}
    </span>
  )
}

function DataTablePreview() {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const toggle = (id: number) => setChecked(prev => {
    const next = new Set(prev); if (next.has(id)) { next.delete(id) } else { next.add(id) } return next
  })

  return (
    <div>
      {/* Filters row — pb-6, no border */}
      <div className="flex items-center justify-between pb-6">
        <Tabs defaultValue="outline">
          <TabsList>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="past" className="gap-1.5">Past Performance <TabBadge count={3} /></TabsTrigger>
            <TabsTrigger value="personnel" className="gap-1.5">Key Personnel <TabBadge count={2} /></TabsTrigger>
            <TabsTrigger value="focus">Focus Documents</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs font-medium">
            <SlidersHorizontal className="size-3.5" />Customize Columns<ChevronDown className="size-3" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs font-medium">
            <Plus className="size-3.5" />Add Section
          </Button>
        </div>
      </div>

      {/* Bordered table */}
      <div className="border border-[rgba(10,10,10,0.1)] rounded-md overflow-clip w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-muted border-b border-[rgba(10,10,10,0.1)]">
              <th className="w-8 px-2 h-10" />
              <th className="w-8 px-2 h-10"><input type="checkbox" className="rounded border-border" readOnly /></th>
              <th className="px-2 h-10 text-left font-medium text-sm text-foreground">Header</th>
              <th className="px-2 h-10 text-left font-medium text-sm text-foreground">Section Type</th>
              <th className="px-2 h-10 text-left font-medium text-sm text-foreground">Status</th>
              <th className="px-2 h-10 text-left font-medium text-sm text-foreground">Target</th>
              <th className="px-2 h-10 text-left font-medium text-sm text-foreground">Limit</th>
              <th className="w-10 px-2 h-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="h-[53px] border-b border-[rgba(10,10,10,0.1)] last:border-b-0 bg-background hover:bg-muted/30 transition-colors group">
                <td className="px-2 text-muted-foreground">
                  <GripVertical className="size-4 opacity-30 group-hover:opacity-60 transition-opacity" />
                </td>
                <td className="px-2">
                  <input type="checkbox" checked={checked.has(row.id)} onChange={() => toggle(row.id)} className="rounded border-border cursor-pointer" />
                </td>
                <td className="px-2 text-sm text-foreground">{row.header}</td>
                <td className="px-2"><span className="font-semibold text-xs text-foreground">{row.type}</span></td>
                <td className="px-2"><StatusBadge status={row.status} /></td>
                <td className="px-2 text-sm text-muted-foreground">{row.target}</td>
                <td className="px-2 text-sm text-muted-foreground">{row.limit}</td>
                <td className="px-2">
                  <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                    <MoreVertical className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer — pt-4, no border */}
        <div className="flex items-center justify-between px-2 pt-4 pb-3 text-sm text-muted-foreground">
          <span className="font-normal text-sm text-muted-foreground flex-1">{checked.size} of 68 row(s) selected.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-foreground">Rows per page</span>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-xs px-2">10 <ChevronDown className="size-3" /></Button>
            </div>
            <span className="font-medium text-sm text-foreground">Page 1 of 7</span>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground"><ChevronsLeft className="size-3.5" /></Button>
              <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground"><ChevronLeft className="size-3.5" /></Button>
              <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground"><ChevronRight className="size-3.5" /></Button>
              <Button variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground"><ChevronsRight className="size-3.5" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DataTablePage() {
  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Data Table"
        description="Two-part layout: an unbordered filters row (pb-6) above a bordered, rounded table. Header cells use text-foreground (not muted). Row height is fixed at h-[53px]. Action menu appears on row hover."
      />

      <Section title="Preview">
        <DataTablePreview />
      </Section>

      <Section title="Structure">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-40">Zone</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens / notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Filters row',       'flex justify-between · pb-6 · NO border — intentionally separate from table'],
                ['Filters left',      'Tabs (pill, default variant) with optional badge counts'],
                ['Filters right',     'Button variant="outline" size="sm" for all action buttons'],
                ['Table wrapper',     'border border-[rgba(10,10,10,0.1)] · rounded-md · overflow-clip'],
                ['Table header',      'bg-muted · border-b border-[rgba(10,10,10,0.1)] · h-10'],
                ['Header cell text',  'font-medium text-sm text-foreground (NOT text-muted-foreground)'],
                ['Body row',          'h-[53px] · border-b · last:border-b-0 · bg-background · hover:bg-muted/30'],
                ['Drag handle',       'GripVertical size-4 · opacity-30 → group-hover:opacity-60'],
                ['Row action',        'Button ghost icon-sm · opacity-0 → group-hover:opacity-100'],
                ['Footer',            'px-2 pt-4 pb-3 · NO border · flex justify-between'],
                ['Pagination nav',    'ghost icon-sm buttons · h-7 w-7 · gap-0.5'],
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
