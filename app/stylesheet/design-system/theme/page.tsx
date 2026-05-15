import { HexSwatch, Table, Thead, Th, Tbody, Tr, Td, PageHeader, Section } from '../../_components/token-table'

// Theme collection: semantic colour slots mapped to Tailwind primitives.
// Each token has a light and dark value — this mirrors the "colors" collection in Figma.
const themeTokens = [
  {
    group: 'Default surfaces',
    tokens: [
      { name: 'background',        lightHex: '#ffffff', darkHex: '#0c0a09', cssVar: '--background' },
      { name: 'muted',             lightHex: '#f5f5f5', darkHex: '#262626', cssVar: '--muted' },
      { name: 'muted-secondary',   lightHex: '#e5e5e5', darkHex: '#404040', cssVar: '--muted-secondary' },
      { name: 'card',              lightHex: '#ffffff', darkHex: '#171717', cssVar: '--card' },
      { name: 'card-muted',        lightHex: '#f5f5f5', darkHex: '#262626', cssVar: '--card-muted' },
      { name: 'inverted',          lightHex: '#0c0a09', darkHex: '#ffffff', cssVar: '--inverted' },
      { name: 'popover',           lightHex: '#ffffff', darkHex: '#262626', cssVar: '--popover' },
    ],
  },
  {
    group: 'Brand',
    tokens: [
      { name: 'brand-primary',     lightHex: '#4f46e5', darkHex: '#4f46e5', cssVar: '--brand-primary' },
      { name: 'brand-secondary',   lightHex: '#c026d3', darkHex: '#c026d3', cssVar: '--brand-secondary' },
    ],
  },
  {
    group: 'Component',
    tokens: [
      { name: 'primary',           lightHex: '#4f46e5', darkHex: '#4f46e5', cssVar: '--primary' },
      { name: 'secondary',         lightHex: '#f5f5f5', darkHex: '#262626', cssVar: '--secondary' },
      { name: 'destructive',       lightHex: '#dc2626', darkHex: '#f87171', cssVar: '--destructive' },
      { name: 'accent',            lightHex: '#f5f5f5', darkHex: '#404040', cssVar: '--accent' },
    ],
  },
]

export default function ThemePage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Theme"
        description="Semantic colour slots — each token maps a Tailwind primitive to a named role. Light and dark values are shown side by side, matching the Figma colors collection."
      />
      {themeTokens.map(({ group, tokens }) => (
        <Section key={group} title={group}>
          <Table>
            <Thead>
              <Th>Name</Th>
              <Th>CSS variable</Th>
              <Th>Light</Th>
              <Th>Dark</Th>
            </Thead>
            <Tbody>
              {tokens.map(({ name, lightHex, darkHex, cssVar }) => (
                <Tr key={name}>
                  <Td>
                    <span className="text-sm text-foreground">{name}</span>
                  </Td>
                  <Td>
                    <span className="font-mono text-xs text-muted-foreground">{cssVar}</span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <HexSwatch hex={lightHex} />
                      <span className="font-mono text-xs text-muted-foreground">{lightHex}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="dark inline-flex">
                        <div
                          className="w-8 h-8 rounded-md ring-1 ring-inset ring-white/10 shrink-0"
                          style={{ backgroundColor: darkHex }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{darkHex}</span>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Section>
      ))}
    </div>
  )
}
