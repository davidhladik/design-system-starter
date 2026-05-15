import { cn } from '@/lib/utils'

// Renders a live swatch using a CSS variable — reflects the current mode
export function Swatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return (
    <div
      className={cn('w-8 h-8 rounded-md border border-border/60 shadow-xs shrink-0', className)}
      style={{ backgroundColor: `var(${cssVar})` }}
    />
  )
}

// Wraps the swatch in a .dark container to force dark-mode variable resolution
export function DarkSwatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return (
    <div className="dark inline-flex">
      <div
        className={cn('w-8 h-8 rounded-md ring-1 ring-inset ring-white/10 shadow-xs shrink-0', className)}
        style={{ backgroundColor: `var(${cssVar})` }}
      />
    </div>
  )
}

// Hex swatch — for Tailwind primitive page where we know the exact hex
export function HexSwatch({ hex, className }: { hex: string; className?: string }) {
  return (
    <div
      className={cn('w-8 h-8 rounded-md border border-border/60 shadow-xs shrink-0', className)}
      style={{ backgroundColor: hex }}
    />
  )
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

export function Thead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-muted/50 border-b border-border">
      <tr>{children}</tr>
    </thead>
  )
}

export function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={cn('px-4 py-2.5 text-left text-xs font-medium text-muted-foreground', className)}>
      {children}
    </th>
  )
}

export function Tbody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>
}

export function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="bg-background hover:bg-muted/30 transition-colors">{children}</tr>
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn('px-4 py-2.5', className)}>{children}</td>
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">{title}</h2>
      {children}
    </div>
  )
}
