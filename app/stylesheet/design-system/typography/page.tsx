import { PageHeader, Section, Table, Thead, Th, Tbody, Tr, Td } from '../../_components/token-table'

// ─── Typography page ──────────────────────────────────────────────────────────
//
// Documents all text styles used in the design system.
// Source: Figma node 24147-65786 ("example" layers inside each style group).
//
// Two typefaces are in use:
//   1. PP Neue Corp Tight — big headlines (4XL and above)
//      Variable font: /app/fonts/PPNeueCorp-TightVariable.ttf
//      CSS variable: --font-pp-neue-corp-tight (injected by next/font/local in layout.tsx)
//      Usage: font-[family-name:var(--font-pp-neue-corp-tight)]
//
//   2. Maison Neue — small headlines, body, all-caps (below 4XL)
//      Three static files: Book (400), Demi (600), Bold (700)
//      CSS variable: --font-maison-neue (injected by next/font/local in layout.tsx)
//      Usage: font-[family-name:var(--font-maison-neue)]

// ─── Data ─────────────────────────────────────────────────────────────────────

const bigHeadlines = [
  { name: 'text-9xl', size: '128px', tailwind: 'text-9xl', lineHeight: 'leading-none' },
  { name: 'text-8xl', size: '96px',  tailwind: 'text-8xl', lineHeight: 'leading-none' },
  { name: 'text-7xl', size: '72px',  tailwind: 'text-7xl', lineHeight: 'leading-none' },
  { name: 'text-6xl', size: '60px',  tailwind: 'text-6xl', lineHeight: 'leading-none' },
  { name: 'text-5xl', size: '48px',  tailwind: 'text-5xl', lineHeight: 'leading-none' },
  { name: 'text-4xl', size: '36px',  tailwind: 'text-4xl', lineHeight: 'leading-none' },
]

const smallHeadlines = [
  { name: 'text-3xl', size: '30px', lineHeight: '36px', tailwind: 'text-3xl leading-normal font-bold' },
  { name: 'text-2xl', size: '24px', lineHeight: '32px', tailwind: 'text-2xl leading-normal font-bold' },
  { name: 'text-xl',  size: '20px', lineHeight: 'none', tailwind: 'text-xl  leading-none  font-bold' },
  { name: 'text-lg',  size: '18px', lineHeight: 'none', tailwind: 'text-lg  leading-none  font-bold' },
]

const bodyStyles = [
  { size: 'base', px: '16px', weight: 'normal',   fontStyle: 'Book',  tailwind: 'text-base font-normal',   lh: '24px' },
  { size: 'base', px: '16px', weight: 'semibold',  fontStyle: 'Demi',  tailwind: 'text-base font-semibold', lh: '24px' },
  { size: 'base', px: '16px', weight: 'bold',      fontStyle: 'Bold',  tailwind: 'text-base font-bold',     lh: '24px' },
  { size: 'sm',   px: '14px', weight: 'normal',   fontStyle: 'Book',  tailwind: 'text-sm   font-normal',   lh: '20px' },
  { size: 'sm',   px: '14px', weight: 'semibold',  fontStyle: 'Demi',  tailwind: 'text-sm   font-semibold', lh: '20px' },
  { size: 'sm',   px: '14px', weight: 'bold',      fontStyle: 'Bold',  tailwind: 'text-sm   font-bold',     lh: '20px' },
  { size: 'xs',   px: '12px', weight: 'normal',   fontStyle: 'Book',  tailwind: 'text-xs   font-normal',   lh: '16px' },
  { size: 'xs',   px: '12px', weight: 'semibold',  fontStyle: 'Demi',  tailwind: 'text-xs   font-semibold', lh: '16px' },
  { size: 'xs',   px: '12px', weight: 'bold',      fontStyle: 'Bold',  tailwind: 'text-xs   font-bold',     lh: '16px' },
]

const allCapsStyles = [
  { size: 'sm', px: '14px', letterSpacing: '0.56px', tailwind: 'text-sm  font-bold uppercase tracking-[0.04em]' },
  { size: 'xs', px: '12px', letterSpacing: '0.48px', tailwind: 'text-xs  font-bold uppercase tracking-[0.04em]' },
]

// ─── Preview helpers ───────────────────────────────────────────────────────────

const ppFont = 'font-[family-name:var(--font-pp-neue-corp-tight)]'
const maisonFont = 'font-[family-name:var(--font-maison-neue)]'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TypographyPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Typography"
        description="All text styles used in the design system. Big headlines (4XL+) use PP Neue Corp Tight. Everything smaller uses Maison Neue. Source: Figma node 24147-65786."
      />

      {/* ── Font notice ─────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold text-foreground shrink-0">PP Neue Corp Tight</span>
          <span className="text-sm text-muted-foreground">Variable font · <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">--font-pp-neue-corp-tight</code> · Use <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">font-[family-name:var(--font-pp-neue-corp-tight)]</code></span>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold text-foreground shrink-0">Maison Neue</span>
          <span className="text-sm text-muted-foreground">Book (400) · Demi (600) · Bold (700) · <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">--font-maison-neue</code> · Use <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">font-[family-name:var(--font-maison-neue)]</code></span>
        </div>
      </div>

      {/* ── Big Headlines ───────────────────────────────────────────────────── */}
      <Section title="Big Headlines — PP Neue Corp Tight">
        <p className="text-xs text-muted-foreground mb-4">
          Weight 700 · leading-none · tracking-normal (0%) · uppercase · Used for 4XL and above.
        </p>
        <div className="rounded-lg border border-border overflow-hidden divide-y divide-border">
          {bigHeadlines.map(({ name, size, tailwind, lineHeight }) => (
            <div key={name} className="flex items-center gap-6 px-6 py-5 bg-background hover:bg-muted/30 transition-colors">
              <div className="w-32 shrink-0">
                <span className="font-mono text-xs text-muted-foreground">{size}</span>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground/60">{lineHeight}</div>
              </div>
              <div className="flex-1 overflow-hidden">
                <span className={`${ppFont} ${tailwind} font-bold leading-none tracking-normal uppercase text-foreground`}>
                  Headline
                </span>
              </div>
              <div className="w-48 shrink-0 text-right">
                <span className="font-mono text-xs text-muted-foreground">{`${ppFont} ${tailwind} font-bold leading-none tracking-normal uppercase`}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Table>
            <Thead>
              <Th>Scale</Th>
              <Th>Size</Th>
              <Th>Weight</Th>
              <Th>Line height</Th>
              <Th>Letter spacing</Th>
              <Th>Transform</Th>
            </Thead>
            <Tbody>
              {bigHeadlines.map(({ name, size }) => (
                <Tr key={name}>
                  <Td><span className="font-mono text-xs text-muted-foreground">{name}</span></Td>
                  <Td><span className="text-sm text-foreground">{size}</span></Td>
                  <Td><span className="text-sm text-foreground">700 (Tight Ultrabold)</span></Td>
                  <Td><span className="font-mono text-xs text-muted-foreground">leading-none (1)</span></Td>
                  <Td><span className="font-mono text-xs text-muted-foreground">0%</span></Td>
                  <Td><span className="font-mono text-xs text-muted-foreground">uppercase</span></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </Section>

      {/* ── Small Headlines ─────────────────────────────────────────────────── */}
      <Section title="Small Headlines — Maison Neue Bold">
        <p className="text-xs text-muted-foreground mb-4">
          Weight 700 · tracking-normal (0%).
        </p>
        <div className="rounded-lg border border-border overflow-hidden divide-y divide-border">
          {smallHeadlines.map(({ name, size, lineHeight, tailwind }) => (
            <div key={name} className="flex items-center gap-6 px-6 py-5 bg-background hover:bg-muted/30 transition-colors">
              <div className="w-32 shrink-0">
                <span className="font-mono text-xs text-muted-foreground">{size}</span>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground/60">lh: {lineHeight}</div>
              </div>
              <div className="flex-1 overflow-hidden">
                <span className={`${maisonFont} ${tailwind} tracking-normal text-foreground`}>
                  Headline
                </span>
              </div>
              <div className="w-48 shrink-0 text-right">
                <span className="font-mono text-xs text-muted-foreground">{tailwind} tracking-normal</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Body Text ───────────────────────────────────────────────────────── */}
      <Section title="Body Text — Maison Neue">
        <p className="text-xs text-muted-foreground mb-4">
          Three weights: Book (normal), Demi (semibold), Bold. Sizes: base / sm / xs.
        </p>
        <Table>
          <Thead>
            <Th>Scale</Th>
            <Th>Size</Th>
            <Th>Figma style</Th>
            <Th>Weight</Th>
            <Th>Line height</Th>
            <Th>Preview</Th>
          </Thead>
          <Tbody>
            {bodyStyles.map(({ size, px, weight, fontStyle, tailwind, lh }) => (
              <Tr key={`${size}-${weight}`}>
                <Td><span className="font-mono text-xs text-muted-foreground">text-{size}</span></Td>
                <Td><span className="text-sm text-foreground">{px}</span></Td>
                <Td><span className="text-sm text-foreground">{fontStyle}</span></Td>
                <Td><span className="font-mono text-xs text-muted-foreground">font-{weight}</span></Td>
                <Td><span className="font-mono text-xs text-muted-foreground">{lh}</span></Td>
                <Td>
                  <span className={`${maisonFont} ${tailwind} text-foreground tracking-normal`}>
                    The quick brown fox
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Section>

      {/* ── All Caps ────────────────────────────────────────────────────────── */}
      <Section title="All Caps — Maison Neue Bold">
        <p className="text-xs text-muted-foreground mb-4">
          Weight 700 · uppercase · letter-spacing 4 (≈ 0.04em). Used for labels, tags, nav items.
        </p>
        <Table>
          <Thead>
            <Th>Scale</Th>
            <Th>Size</Th>
            <Th>Letter spacing</Th>
            <Th>Tailwind classes</Th>
            <Th>Preview</Th>
          </Thead>
          <Tbody>
            {allCapsStyles.map(({ size, px, letterSpacing, tailwind }) => (
              <Tr key={size}>
                <Td><span className="font-mono text-xs text-muted-foreground">text-{size}</span></Td>
                <Td><span className="text-sm text-foreground">{px}</span></Td>
                <Td><span className="font-mono text-xs text-muted-foreground">{letterSpacing}</span></Td>
                <Td><span className="font-mono text-xs text-muted-foreground">{tailwind}</span></Td>
                <Td>
                  <span className={`${maisonFont} ${tailwind} text-foreground`}>
                    Overview
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Section>

      {/* ── Invariants ──────────────────────────────────────────────────────── */}
      <Section title="Invariants">
        <div className="rounded-lg border border-border bg-muted/40 divide-y divide-border">
          {[
            '4XL and above → always PP Neue Corp Tight, always uppercase, always leading-none, always tracking-normal.',
            '3XL and below → always Maison Neue.',
            'Big Headline weight is always 700 (Tight Ultrabold). Never use font-black (900) — it renders with artificial thickening.',
            'Body and small-headline letter spacing is always 0% (tracking-normal). All-caps letter spacing is always 0.04em.',
            'Never mix fonts across a single type scale step — e.g. never use PP Neue Corp Tight for text-3xl.',
            'Do not use hardcoded font-family strings. Always reference the CSS variable: font-[family-name:var(--font-pp-neue-corp-tight)].',
          ].map((note) => (
            <p key={note} className="px-4 py-3 text-sm text-foreground">
              {note}
            </p>
          ))}
        </div>
      </Section>
    </div>
  )
}
