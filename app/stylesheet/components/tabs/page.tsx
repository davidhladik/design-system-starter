'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PageHeader, Section } from '../../_components/token-table'

// Tab badge — semi-transparent pill shown inside a trigger
function TabBadge({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full font-semibold text-xs text-foreground"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 100%), linear-gradient(90deg, rgb(115,115,115) 0%, rgb(115,115,115) 100%)',
      }}
    >
      {count}
    </span>
  )
}

export default function TabsPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Tabs"
        description="Pill-style segmented tabs built on @base-ui/react/tabs via the shadcn base-nova style. Active trigger gets bg-background + shadow-sm inside a bg-muted container."
      />

      {/* Default variant */}
      <Section title="Default (pill)">
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Overview</TabsTrigger>
              <TabsTrigger value="tab2">Analytics</TabsTrigger>
              <TabsTrigger value="tab3">Reports</TabsTrigger>
              <TabsTrigger value="tab4">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="pt-4 text-sm text-muted-foreground">Overview content</TabsContent>
            <TabsContent value="tab2" className="pt-4 text-sm text-muted-foreground">Analytics content</TabsContent>
            <TabsContent value="tab3" className="pt-4 text-sm text-muted-foreground">Reports content</TabsContent>
            <TabsContent value="tab4" className="pt-4 text-sm text-muted-foreground">Notifications content</TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* With badge counts */}
      <Section title="With badge counts">
        <p className="text-xs text-muted-foreground mb-4">
          Badge uses a semi-transparent white gradient over a neutral base — not a semantic colour — so it reads on both active and inactive triggers.
        </p>
        <Tabs defaultValue="outline">
          <TabsList>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="past" className="gap-1.5">
              Past Performance
              <TabBadge count={3} />
            </TabsTrigger>
            <TabsTrigger value="personnel" className="gap-1.5">
              Key Personnel
              <TabBadge count={2} />
            </TabsTrigger>
            <TabsTrigger value="focus">Focus Documents</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      {/* Line variant */}
      <Section title="Line variant">
        <Tabs defaultValue="tab1">
          <TabsList variant="line">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      {/* Vertical */}
      <Section title="Vertical orientation">
        <Tabs defaultValue="tab1" orientation="vertical" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="text-sm text-muted-foreground">Overview content</TabsContent>
          <TabsContent value="tab2" className="text-sm text-muted-foreground">Analytics content</TabsContent>
          <TabsContent value="tab3" className="text-sm text-muted-foreground">Reports content</TabsContent>
        </Tabs>
      </Section>

      {/* Spec table */}
      <Section title="Specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-40">Property</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['TabsList height',       'h-8 (group-data-horizontal)'],
                ['TabsList background',   'bg-muted'],
                ['TabsList padding',      'p-[3px]'],
                ['TabsList radius',       'rounded-lg'],
                ['Trigger active bg',     'bg-background'],
                ['Trigger active shadow', 'shadow-sm'],
                ['Trigger text',          'text-sm font-medium'],
                ['Trigger inactive',      'text-foreground/60'],
                ['Badge height',          'h-5, min-w-5, px-1, rounded-full'],
                ['Badge text',            'font-semibold text-xs text-foreground'],
                ['Badge bg',              'rgba(255,255,255,0.7) over rgb(115,115,115)'],
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
