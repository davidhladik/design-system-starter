import { Table, Thead, Th, Tbody, Tr, Td, PageHeader, Section } from '../../_components/token-table'
import { LiveSwatch } from '../../_components/color-hex'

// Theme page — Layer 2 of the three-layer token architecture.
//
// Layer 2 — Theme pairs: independent -light / -dark values referencing Layer 1 primitives.
// Source: Figma "Mode" variable collection (node 24065-332103).
// Both variants are always defined in :root (static), so LiveSwatch resolves both.
// Layer 1 (Primitives) is documented on the Tailwind CSS page.

// ─── Layer 2 — Theme pairs ────────────────────────────────────────────────────

const themePairGroups = [
  {
    group: 'Primary',
    pairs: [
      { token: 'primary',                       lightVar: '--primary-light',                       darkVar: '--primary-dark' },
      { token: 'primary-foreground',             lightVar: '--primary-foreground-light',             darkVar: '--primary-foreground-dark' },
    ],
  },
  {
    group: 'Brand secondary',
    pairs: [
      { token: 'brand-secondary',               lightVar: '--brand-secondary-light',               darkVar: '--brand-secondary-dark' },
      { token: 'brand-secondary-foreground',    lightVar: '--brand-secondary-foreground-light',    darkVar: '--brand-secondary-foreground-dark' },
    ],
  },
  {
    group: 'Destructive',
    pairs: [
      { token: 'destructive',                   lightVar: '--destructive-light',                   darkVar: '--destructive-dark' },
      { token: 'destructive-foreground',        lightVar: '--destructive-foreground-light',        darkVar: '--destructive-foreground-dark' },
    ],
  },
  {
    group: 'Background / Foreground',
    pairs: [
      { token: 'background',                    lightVar: '--background-light',                    darkVar: '--background-dark' },
      { token: 'foreground',                    lightVar: '--foreground-light',                    darkVar: '--foreground-dark' },
    ],
  },
  {
    group: 'Muted',
    pairs: [
      { token: 'muted',                         lightVar: '--muted-light',                         darkVar: '--muted-dark' },
      { token: 'muted-secondary',               lightVar: '--muted-secondary-light',               darkVar: '--muted-secondary-dark' },
      { token: 'muted-foreground',              lightVar: '--muted-foreground-light',              darkVar: '--muted-foreground-dark' },
      { token: 'muted-foreground-secondary',    lightVar: '--muted-foreground-secondary-light',    darkVar: '--muted-foreground-secondary-dark' },
    ],
  },
  {
    group: 'Inverted',
    pairs: [
      { token: 'inverted',                      lightVar: '--inverted-light',                      darkVar: '--inverted-dark' },
      { token: 'inverted-foreground',           lightVar: '--inverted-foreground-light',           darkVar: '--inverted-foreground-dark' },
    ],
  },
  {
    group: 'Card',
    pairs: [
      { token: 'card',                          lightVar: '--card-light',                          darkVar: '--card-dark' },
      { token: 'card-foreground',               lightVar: '--card-foreground-light',               darkVar: '--card-foreground-dark' },
      { token: 'card-muted',                    lightVar: '--card-muted-light',                    darkVar: '--card-muted-dark' },
    ],
  },
  {
    group: 'Popover',
    pairs: [
      { token: 'popover',                       lightVar: '--popover-light',                       darkVar: '--popover-dark' },
      { token: 'popover-foreground',            lightVar: '--popover-foreground-light',            darkVar: '--popover-foreground-dark' },
    ],
  },
  {
    group: 'Secondary',
    pairs: [
      { token: 'secondary',                     lightVar: '--secondary-light',                     darkVar: '--secondary-dark' },
      { token: 'secondary-foreground',          lightVar: '--secondary-foreground-light',          darkVar: '--secondary-foreground-dark' },
    ],
  },
  {
    group: 'Accent',
    pairs: [
      { token: 'accent',                        lightVar: '--accent-light',                        darkVar: '--accent-dark' },
      { token: 'accent-foreground',             lightVar: '--accent-foreground-light',             darkVar: '--accent-foreground-dark' },
    ],
  },
  {
    group: 'Status foregrounds',
    pairs: [
      { token: 'success-foreground',            lightVar: '--success-foreground-light',            darkVar: '--success-foreground-dark' },
      { token: 'warning-foreground',            lightVar: '--warning-foreground-light',            darkVar: '--warning-foreground-dark' },
      { token: 'error-foreground',              lightVar: '--error-foreground-light',              darkVar: '--error-foreground-dark' },
    ],
  },
  {
    group: 'Status backgrounds (alpha)',
    pairs: [
      { token: 'success-bg',                    lightVar: '--success-bg-light',                    darkVar: '--success-bg-dark' },
      { token: 'warning-bg',                    lightVar: '--warning-bg-light',                    darkVar: '--warning-bg-dark' },
      { token: 'error-bg',                      lightVar: '--error-bg-light',                      darkVar: '--error-bg-dark' },
    ],
  },
  {
    group: 'Border (alpha)',
    pairs: [
      { token: 'border',                        lightVar: '--border-light',                        darkVar: '--border-dark' },
      { token: 'border-secondary',              lightVar: '--border-secondary-light',              darkVar: '--border-secondary-dark' },
    ],
  },
  {
    group: 'Border (solid)',
    pairs: [
      { token: 'border-bold',                   lightVar: '--border-bold-light',                   darkVar: '--border-bold-dark' },
      { token: 'border-inverted',               lightVar: '--border-inverted-light',               darkVar: '--border-inverted-dark' },
    ],
  },
  {
    group: 'Input / Ring',
    pairs: [
      { token: 'input',                         lightVar: '--input-light',                         darkVar: '--input-dark' },
      { token: 'ring',                          lightVar: '--ring-light',                          darkVar: '--ring-dark' },
      { token: 'ring-offset',                   lightVar: '--ring-offset-light',                   darkVar: '--ring-offset-dark' },
    ],
  },
  {
    group: 'Sidebar',
    pairs: [
      { token: 'sidebar',                       lightVar: '--sidebar-light',                       darkVar: '--sidebar-dark' },
      { token: 'sidebar-foreground',            lightVar: '--sidebar-foreground-light',            darkVar: '--sidebar-foreground-dark' },
      { token: 'sidebar-primary',               lightVar: '--sidebar-primary-light',               darkVar: '--sidebar-primary-dark' },
      { token: 'sidebar-primary-foreground',    lightVar: '--sidebar-primary-foreground-light',    darkVar: '--sidebar-primary-foreground-dark' },
      { token: 'sidebar-accent',                lightVar: '--sidebar-accent-light',                darkVar: '--sidebar-accent-dark' },
      { token: 'sidebar-accent-foreground',     lightVar: '--sidebar-accent-foreground-light',     darkVar: '--sidebar-accent-foreground-dark' },
      { token: 'sidebar-border',                lightVar: '--sidebar-border-light',                darkVar: '--sidebar-border-dark' },
      { token: 'sidebar-ring',                  lightVar: '--sidebar-ring-light',                  darkVar: '--sidebar-ring-dark' },
    ],
  },
]

function ThemePairsTable({ pairs }: { pairs: { token: string; lightVar: string; darkVar: string }[] }) {
  return (
    <Table>
      <Thead>
        <Th>Token</Th>
        <Th>Light variable</Th>
        <Th>Light</Th>
        <Th>Dark variable</Th>
        <Th>Dark</Th>
      </Thead>
      <Tbody>
        {pairs.map(({ token, lightVar, darkVar }) => (
          <Tr key={token}>
            <Td>
              <span className="text-sm text-foreground">{token}</span>
            </Td>
            <Td>
              <span className="font-mono text-xs text-muted-foreground">{lightVar}</span>
            </Td>
            <Td><LiveSwatch cssVar={lightVar} /></Td>
            <Td>
              <span className="font-mono text-xs text-muted-foreground">{darkVar}</span>
            </Td>
            <Td><LiveSwatch cssVar={darkVar} /></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default function ThemePage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Theme"
        description="Layer 2 of the three-layer token architecture — independent -light and -dark pairs that reference Layer 1 primitives. Both variants are always defined in :root and never switch with the active colour mode. Source: Figma Mode variable collection, node 24065-332103."
      />
      {themePairGroups.map(({ group, pairs }) => (
        <Section key={group} title={group}>
          <ThemePairsTable pairs={pairs} />
        </Section>
      ))}
    </div>
  )
}
