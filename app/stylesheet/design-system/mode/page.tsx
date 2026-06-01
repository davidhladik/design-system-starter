import { Table, Thead, Th, Tbody, Tr, Td, PageHeader, Section } from '../../_components/token-table'
import { LiveSwatch, LiveDarkSwatch } from '../../_components/color-hex'

// Mode page — Layer 3 of the three-layer token architecture.
//
// These are the component-facing CSS variables. In :root they resolve to their
// -light Layer 2 counterpart; in .dark they resolve to their -dark counterpart.
// This is the only layer that component code and Tailwind utilities reference.
// Source: globals.css Layer 3 (:root / .dark blocks).

const modeGroups = [
  {
    group: 'Background / Foreground',
    tokens: [
      { label: 'background',                  cssVar: '--background',                  lightVar: '--background-light',                  darkVar: '--background-dark' },
      { label: 'foreground',                  cssVar: '--foreground',                  lightVar: '--foreground-light',                  darkVar: '--foreground-dark' },
    ],
  },
  {
    group: 'Muted',
    tokens: [
      { label: 'muted',                        cssVar: '--muted',                        lightVar: '--muted-light',                        darkVar: '--muted-dark' },
      { label: 'muted-foreground',             cssVar: '--muted-foreground',             lightVar: '--muted-foreground-light',             darkVar: '--muted-foreground-dark' },
      { label: 'muted-secondary',              cssVar: '--muted-secondary',              lightVar: '--muted-secondary-light',              darkVar: '--muted-secondary-dark' },
      { label: 'muted-foreground-secondary',   cssVar: '--muted-foreground-secondary',   lightVar: '--muted-foreground-secondary-light',   darkVar: '--muted-foreground-secondary-dark' },
    ],
  },
  {
    group: 'Inverted',
    tokens: [
      { label: 'inverted',                     cssVar: '--inverted',                     lightVar: '--inverted-light',                     darkVar: '--inverted-dark' },
      { label: 'inverted-foreground',          cssVar: '--inverted-foreground',          lightVar: '--inverted-foreground-light',          darkVar: '--inverted-foreground-dark' },
    ],
  },
  {
    group: 'Card',
    tokens: [
      { label: 'card',                         cssVar: '--card',                         lightVar: '--card-light',                         darkVar: '--card-dark' },
      { label: 'card-foreground',              cssVar: '--card-foreground',              lightVar: '--card-foreground-light',              darkVar: '--card-foreground-dark' },
      { label: 'card-muted',                   cssVar: '--card-muted',                   lightVar: '--card-muted-light',                   darkVar: '--card-muted-dark' },
    ],
  },
  {
    group: 'Popover',
    tokens: [
      { label: 'popover',                      cssVar: '--popover',                      lightVar: '--popover-light',                      darkVar: '--popover-dark' },
      { label: 'popover-foreground',           cssVar: '--popover-foreground',           lightVar: '--popover-foreground-light',           darkVar: '--popover-foreground-dark' },
    ],
  },
  {
    group: 'Primary',
    tokens: [
      { label: 'primary',                      cssVar: '--primary',                      lightVar: '--primary-light',                      darkVar: '--primary-dark' },
      { label: 'primary-foreground',           cssVar: '--primary-foreground',           lightVar: '--primary-foreground-light',           darkVar: '--primary-foreground-dark' },
    ],
  },
  {
    group: 'Secondary',
    tokens: [
      { label: 'secondary',                    cssVar: '--secondary',                    lightVar: '--secondary-light',                    darkVar: '--secondary-dark' },
      { label: 'secondary-foreground',         cssVar: '--secondary-foreground',         lightVar: '--secondary-foreground-light',         darkVar: '--secondary-foreground-dark' },
    ],
  },
  {
    group: 'Destructive',
    tokens: [
      { label: 'destructive',                  cssVar: '--destructive',                  lightVar: '--destructive-light',                  darkVar: '--destructive-dark' },
      { label: 'destructive-foreground',       cssVar: '--destructive-foreground',       lightVar: '--destructive-foreground-light',       darkVar: '--destructive-foreground-dark' },
    ],
  },
  {
    group: 'Accent',
    tokens: [
      { label: 'accent',                       cssVar: '--accent',                       lightVar: '--accent-light',                       darkVar: '--accent-dark' },
      { label: 'accent-foreground',            cssVar: '--accent-foreground',            lightVar: '--accent-foreground-light',            darkVar: '--accent-foreground-dark' },
    ],
  },
  {
    group: 'Brand',
    tokens: [
      { label: 'brand-primary',                cssVar: '--brand-primary',                lightVar: '--primary-light',                      darkVar: '--primary-dark' },
      { label: 'brand-primary-foreground',     cssVar: '--brand-primary-foreground',     lightVar: '--primary-foreground-light',           darkVar: '--primary-foreground-dark' },
      { label: 'brand-secondary',              cssVar: '--brand-secondary',              lightVar: '--brand-secondary-light',              darkVar: '--brand-secondary-dark' },
      { label: 'brand-secondary-foreground',   cssVar: '--brand-secondary-foreground',   lightVar: '--brand-secondary-foreground-light',   darkVar: '--brand-secondary-foreground-dark' },
    ],
  },
  {
    group: 'Status',
    tokens: [
      { label: 'success',                      cssVar: '--success',                      lightVar: '--success-foreground-light',           darkVar: '--success-foreground-dark' },
      { label: 'success-foreground',           cssVar: '--success-foreground',           lightVar: '--success-foreground-light',           darkVar: '--success-foreground-dark' },
      { label: 'warning',                      cssVar: '--warning',                      lightVar: '--warning-foreground-light',           darkVar: '--warning-foreground-dark' },
      { label: 'warning-foreground',           cssVar: '--warning-foreground',           lightVar: '--warning-foreground-light',           darkVar: '--warning-foreground-dark' },
    ],
  },
  {
    group: 'Border',
    tokens: [
      { label: 'border',                       cssVar: '--border',                       lightVar: '--border-light',                       darkVar: '--border-dark' },
      { label: 'border-secondary',             cssVar: '--border-secondary',             lightVar: '--border-secondary-light',             darkVar: '--border-secondary-dark' },
      { label: 'border-bold',                  cssVar: '--border-bold',                  lightVar: '--border-bold-light',                  darkVar: '--border-bold-dark' },
      { label: 'border-inverted',              cssVar: '--border-inverted',              lightVar: '--border-inverted-light',              darkVar: '--border-inverted-dark' },
      { label: 'input',                        cssVar: '--input',                        lightVar: '--input-light',                        darkVar: '--input-dark' },
      { label: 'ring',                         cssVar: '--ring',                         lightVar: '--ring-light',                         darkVar: '--ring-dark' },
      { label: 'ring-offset',                  cssVar: '--ring-offset',                  lightVar: '--ring-offset-light',                  darkVar: '--ring-offset-dark' },
    ],
  },
  {
    group: 'Sidebar',
    tokens: [
      { label: 'sidebar',                      cssVar: '--sidebar',                      lightVar: '--sidebar-light',                      darkVar: '--sidebar-dark' },
      { label: 'sidebar-foreground',           cssVar: '--sidebar-foreground',           lightVar: '--sidebar-foreground-light',           darkVar: '--sidebar-foreground-dark' },
      { label: 'sidebar-primary',              cssVar: '--sidebar-primary',              lightVar: '--sidebar-primary-light',              darkVar: '--sidebar-primary-dark' },
      { label: 'sidebar-primary-foreground',   cssVar: '--sidebar-primary-foreground',   lightVar: '--sidebar-primary-foreground-light',   darkVar: '--sidebar-primary-foreground-dark' },
      { label: 'sidebar-accent',               cssVar: '--sidebar-accent',               lightVar: '--sidebar-accent-light',               darkVar: '--sidebar-accent-dark' },
      { label: 'sidebar-accent-foreground',    cssVar: '--sidebar-accent-foreground',    lightVar: '--sidebar-accent-foreground-light',    darkVar: '--sidebar-accent-foreground-dark' },
      { label: 'sidebar-border',               cssVar: '--sidebar-border',               lightVar: '--sidebar-border-light',               darkVar: '--sidebar-border-dark' },
      { label: 'sidebar-ring',                 cssVar: '--sidebar-ring',                 lightVar: '--sidebar-ring-light',                 darkVar: '--sidebar-ring-dark' },
    ],
  },
  {
    group: 'Charts',
    tokens: [
      { label: 'chart-1',                      cssVar: '--chart-1',                      lightVar: '—',                                    darkVar: '—' },
      { label: 'chart-2',                      cssVar: '--chart-2',                      lightVar: '—',                                    darkVar: '—' },
      { label: 'chart-3',                      cssVar: '--chart-3',                      lightVar: '—',                                    darkVar: '—' },
      { label: 'chart-4',                      cssVar: '--chart-4',                      lightVar: '—',                                    darkVar: '—' },
      { label: 'chart-5',                      cssVar: '--chart-5',                      lightVar: '—',                                    darkVar: '—' },
    ],
  },
]

function ModeTable({
  tokens,
}: {
  tokens: { label: string; cssVar: string; lightVar: string; darkVar: string }[]
}) {
  return (
    <Table>
      <Thead>
        <Th>CSS variable</Th>
        <Th>Layer 2 light</Th>
        <Th>Light</Th>
        <Th>Layer 2 dark</Th>
        <Th>Dark</Th>
      </Thead>
      <Tbody>
        {tokens.map(({ label, cssVar, lightVar, darkVar }) => (
          <Tr key={cssVar}>
            <Td>
              <span className="text-sm text-foreground">{label}</span>
              <span className="block font-mono text-xs text-muted-foreground">{cssVar}</span>
            </Td>
            <Td>
              <span className="font-mono text-xs text-muted-foreground">{lightVar}</span>
            </Td>
            <Td><LiveSwatch cssVar={cssVar} /></Td>
            <Td>
              <span className="font-mono text-xs text-muted-foreground">{darkVar}</span>
            </Td>
            <Td><LiveDarkSwatch cssVar={cssVar} /></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default function ModePage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Mode"
        description="Layer 3 of the three-layer token architecture — the component-facing CSS variables. In light mode (:root) each variable resolves to its -light Layer 2 counterpart; in dark mode (.dark) to its -dark counterpart. These are the only variables component code and Tailwind utilities should reference."
      />
      {modeGroups.map(({ group, tokens }) => (
        <Section key={group} title={group}>
          <ModeTable tokens={tokens} />
        </Section>
      ))}
    </div>
  )
}
