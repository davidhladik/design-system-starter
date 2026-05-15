import { HexSwatch, Table, Thead, Th, Tbody, Tr, Td, PageHeader, Section } from '../../_components/token-table'

const neutral = [
  { name: 'base / white',    hex: '#ffffff' },
  { name: 'neutral / 100',   hex: '#f5f5f5' },
  { name: 'neutral / 200',   hex: '#e5e5e5' },
  { name: 'neutral / 700',   hex: '#404040' },
  { name: 'neutral / 800',   hex: '#262626' },
  { name: 'neutral / 900',   hex: '#171717' },
  { name: 'stone / 950',     hex: '#0c0a09' },
]

const brand = [
  { name: 'indigo / 600',    hex: '#4f46e5' },
  { name: 'fuchsia / 600',   hex: '#c026d3' },
]

const status = [
  { name: 'red / 600',       hex: '#dc2626' },
  { name: 'red / 400',       hex: '#f87171' },
]

function ColorTable({ rows }: { rows: { name: string; hex: string }[] }) {
  return (
    <Table>
      <Thead>
        <Th>Name</Th>
        <Th>Swatch</Th>
        <Th>Hex</Th>
      </Thead>
      <Tbody>
        {rows.map(({ name, hex }) => (
          <Tr key={name}>
            <Td>
              <span className="font-mono text-xs text-foreground">tailwind colors / {name}</span>
            </Td>
            <Td><HexSwatch hex={hex} /></Td>
            <Td>
              <span className="font-mono text-xs text-muted-foreground">{hex}</span>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default function TailwindPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Tailwind CSS"
        description="Primitive colour palette — the raw Tailwind color tokens used as the foundation for all semantic tokens in this project."
      />
      <Section title="Neutral"><ColorTable rows={neutral} /></Section>
      <Section title="Brand"><ColorTable rows={brand} /></Section>
      <Section title="Status"><ColorTable rows={status} /></Section>
    </div>
  )
}
