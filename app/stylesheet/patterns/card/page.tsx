import { PageHeader, Section } from '../../_components/token-table'

// Card wrapper — the consistent container used for all card-like surfaces
// in this project. Content varies but the wrapper never changes.
//
// Standard:    rounded-lg · border border-[rgba(10,10,10,0.1)] · shadow-sm · p-6
// Stats card:  rounded-xl · same border + shadow · p-6 · inline gradient bg

function CardDemo({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-card border border-[rgba(10,10,10,0.1)] rounded-lg shadow-sm p-6 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

export default function CardPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Card"
        description="The standard container surface. Always use these exact tokens — never adjust radius, border, shadow, or padding individually. If content requires a different layout, change the content, not the wrapper."
      />

      {/* Standard card */}
      <Section title="Standard card">
        <CardDemo>
          <p className="font-normal text-base text-foreground leading-6">Card title</p>
          <p className="font-normal text-sm text-muted-foreground mt-1">Supporting description text goes here.</p>
          <div className="mt-4 h-24 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
            Content area
          </div>
        </CardDemo>
      </Section>

      {/* Stats card variant */}
      <Section title="Stats card (rounded-xl + gradient)">
        <p className="text-xs text-muted-foreground mb-4">
          Used for metric / KPI cards. Corner radius is xl instead of lg. Background adds a subtle
          brand tint via an inline <code className="font-mono">style</code> gradient — not a Tailwind class.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {['Total Revenue', 'Growth Rate'].map((title) => (
            <div
              key={title}
              className="flex flex-col items-start overflow-clip p-6 rounded-xl border border-[rgba(10,10,10,0.1)] shadow-sm"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(23,23,23,0) 0%, rgba(79,70,229,0.05) 100%), linear-gradient(90deg, rgb(255,255,255) 0%, rgb(255,255,255) 100%)',
              }}
            >
              <span className="font-normal text-sm text-muted-foreground">{title}</span>
              <span className="font-semibold text-3xl leading-9 text-foreground mt-6 mb-6">—</span>
              <span className="font-normal text-sm text-muted-foreground">Supporting description</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Spec table */}
      <Section title="Wrapper tokens — never deviate">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Property</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Standard card</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Stats card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Background',     'bg-card',                          'inline gradient (brand 5% tint)'],
                ['Border',         'border border-[rgba(10,10,10,0.1)]', 'same'],
                ['Border radius',  'rounded-lg',                       'rounded-xl'],
                ['Shadow',         'shadow-sm',                        'shadow-sm'],
                ['Padding',        'p-6',                              'p-6'],
                ['overflow',       '—',                                'overflow-clip'],
              ].map(([prop, std, stats]) => (
                <tr key={prop} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{std}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{stats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
