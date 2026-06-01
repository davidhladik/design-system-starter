import { Table, Thead, Th, Tbody, Tr, Td, PageHeader, Section } from '../../_components/token-table'
import { LiveSwatch } from '../../_components/color-hex'

// Layer 1 — Primitives: raw Tailwind palette values defined as CSS variables.
// Source: Figma "Tailwind CSS" table, node 24098-51154.
// These are referenced only inside Layer 2 (Theme pairs) — never in component code.

const primitiveGroups = [
  {
    title: 'Neutral',
    tokens: [
      { name: 'neutral-50',  cssVar: '--neutral-50',  hex: '#FAFAFA' },
      { name: 'neutral-100', cssVar: '--neutral-100', hex: '#F5F5F5' },
      { name: 'neutral-200', cssVar: '--neutral-200', hex: '#E5E5E5' },
      { name: 'neutral-300', cssVar: '--neutral-300', hex: '#D4D4D4' },
      { name: 'neutral-400', cssVar: '--neutral-400', hex: '#A3A3A3' },
      { name: 'neutral-500', cssVar: '--neutral-500', hex: '#737373' },
      { name: 'neutral-600', cssVar: '--neutral-600', hex: '#525252' },
      { name: 'neutral-700', cssVar: '--neutral-700', hex: '#404040' },
      { name: 'neutral-800', cssVar: '--neutral-800', hex: '#262626' },
      { name: 'neutral-900', cssVar: '--neutral-900', hex: '#171717' },
      { name: 'neutral-950', cssVar: '--neutral-950', hex: '#0A0A0A' },
      { name: 'white',       cssVar: '--white',       hex: '#FFFFFF' },
    ],
  },
  {
    title: 'Brand',
    tokens: [
      { name: 'brand',       cssVar: '--brand',       hex: '#ef003b' },
      { name: 'fuchsia-600', cssVar: '--fuchsia-600', hex: '#C026D3' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: 'green-400',   cssVar: '--green-400',   hex: '#4ADE80' },
      { name: 'green-600',   cssVar: '--green-600',   hex: '#16A34A' },
      { name: 'orange-400',  cssVar: '--orange-400',  hex: '#FB923C' },
      { name: 'orange-600',  cssVar: '--orange-600',  hex: '#EA580C' },
      { name: 'red-400',     cssVar: '--red-400',     hex: '#F87171' },
      { name: 'red-600',     cssVar: '--red-600',     hex: '#DC2626' },
    ],
  },
]

export default function TailwindPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Tailwind CSS"
        description="Layer 1 — raw Tailwind palette values defined as CSS variables. These are the only hardcoded colour values in the system. Everything else references these primitives via var(). Source: Figma Tailwind CSS table, node 24098-51154."
      />
      {primitiveGroups.map(({ title, tokens }) => (
        <Section key={title} title={title}>
          <Table>
            <Thead>
              <Th>Name</Th>
              <Th>CSS variable</Th>
              <Th>Swatch</Th>
            </Thead>
            <Tbody>
              {tokens.map(({ name, cssVar, hex }) => (
                <Tr key={cssVar}>
                  <Td>
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="block font-mono text-xs text-muted-foreground">{hex}</span>
                  </Td>
                  <Td>
                    <span className="font-mono text-xs text-muted-foreground">{cssVar}</span>
                  </Td>
                  <Td><LiveSwatch cssVar={cssVar} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Section>
      ))}
    </div>
  )
}
