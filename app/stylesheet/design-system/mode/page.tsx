import { Swatch, DarkSwatch, Table, Thead, Th, Tbody, Tr, Td, PageHeader, Section } from '../../_components/token-table'

// Mode collection: semantic tokens as used in code, with live CSS variable resolution.
// Light swatch uses the current (light) mode, dark swatch forces .dark context.
// Structure mirrors the Figma "Mode" collection frames.

const modeGroups = [
  {
    group: 'background / default',
    tokens: [
      { figma: 'background/default/bg-default',       cssVar: '--background',        label: 'bg-default' },
      { figma: 'background/default/bg-muted-soft',    cssVar: '--muted',             label: 'bg-muted-soft' },
      { figma: 'background/default/bg-muted-hard',    cssVar: '--muted-secondary',   label: 'bg-muted-hard' },
      { figma: 'background/default/bg-card',          cssVar: '--card',              label: 'bg-card' },
      { figma: 'background/default/bg-card-muted',    cssVar: '--card-muted',        label: 'bg-card-muted' },
      { figma: 'background/default/bg-inverted',      cssVar: '--inverted',          label: 'bg-inverted' },
    ],
  },
  {
    group: 'background / brand',
    tokens: [
      { figma: 'background/brand/bg-brand-primary',   cssVar: '--brand-primary',     label: 'bg-brand-primary' },
      { figma: 'background/brand/bg-brand-secondary', cssVar: '--brand-secondary',   label: 'bg-brand-secondary' },
    ],
  },
  {
    group: 'background / component',
    tokens: [
      { figma: 'background/component/bg-button-primary',      cssVar: '--primary',       label: 'bg-button-primary' },
      { figma: 'background/component/bg-button-secondary',    cssVar: '--secondary',     label: 'bg-button-secondary' },
      { figma: 'background/component/bg-button-destructive',  cssVar: '--destructive',   label: 'bg-button-destructive' },
      { figma: 'background/component/bg-active-state-accent', cssVar: '--accent',        label: 'bg-active-state-accent' },
      { figma: 'background/component/bg-popover',             cssVar: '--popover',       label: 'bg-popover' },
    ],
  },
  {
    group: 'background / sidebar',
    tokens: [
      { figma: 'background/sidebar/bg-sidebar-default', cssVar: '--sidebar',               label: 'bg-sidebar-default' },
      { figma: 'background/sidebar/bg-sidebar-brand',   cssVar: '--sidebar-primary',       label: 'bg-sidebar-brand' },
      { figma: 'background/sidebar/bg-sidebar-active',  cssVar: '--sidebar-accent',        label: 'bg-sidebar-active' },
    ],
  },
  {
    group: 'background / status',
    tokens: [
      { figma: 'background/status/bg-status-success',  cssVar: '--success',   label: 'bg-status-success' },
      { figma: 'background/status/bg-status-warning',  cssVar: '--warning',   label: 'bg-status-warning' },
      { figma: 'background/status/bg-status-error',    cssVar: '--error',     label: 'bg-status-error' },
    ],
  },
  {
    group: 'border / default',
    tokens: [
      { figma: 'border/default/bd-primary',    cssVar: '--border',           label: 'bd-primary' },
      { figma: 'border/default/bd-secondary',  cssVar: '--border-secondary', label: 'bd-secondary' },
      { figma: 'border/component/bd-input',    cssVar: '--input',            label: 'bd-input-button' },
      { figma: 'border/focus-ring/bd-focus',   cssVar: '--ring',             label: 'bd-focus-default' },
    ],
  },
]

function ModeTable({ tokens }: { tokens: { figma: string; cssVar: string; label: string }[] }) {
  return (
    <Table>
      <Thead>
        <Th>Figma name</Th>
        <Th>CSS variable</Th>
        <Th>Light</Th>
        <Th>Dark</Th>
      </Thead>
      <Tbody>
        {tokens.map(({ figma, cssVar, label }) => (
          <Tr key={cssVar}>
            <Td>
              <span className="text-sm text-foreground">{label}</span>
              <span className="block text-xs text-muted-foreground">{figma}</span>
            </Td>
            <Td>
              <span className="font-mono text-xs text-muted-foreground">{cssVar}</span>
            </Td>
            <Td><Swatch cssVar={cssVar} /></Td>
            <Td><DarkSwatch cssVar={cssVar} /></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default function ModePage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Mode"
        description="Live CSS variable values, resolved from globals.css. Light column shows :root values, dark column forces .dark context. Foreground tokens will appear here once added to Figma."
      />
      {modeGroups.map(({ group, tokens }) => (
        <Section key={group} title={group}>
          <ModeTable tokens={tokens} />
        </Section>
      ))}
    </div>
  )
}
