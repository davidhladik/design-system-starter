import { PageHeader, Section } from '../../_components/token-table'

export default function TextareaPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Textarea"
        description="Multi-line text input. Same base tokens as Input (bg-background, border-input, rounded-md, shadow-xs) with a fixed height and resize-none."
      />

      <Section title="Preview">
        <div className="flex flex-col gap-4">
          {/* Reply-style textarea */}
          <textarea
            className="bg-background border border-input h-[126px] rounded-md shadow-xs px-3 py-2 w-full font-normal text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder="Reply William Smith…"
            readOnly
          />

          {/* Shorter textarea */}
          <textarea
            className="bg-background border border-input h-20 rounded-md shadow-xs px-3 py-2 w-full font-normal text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder="Add a note…"
            readOnly
          />
        </div>
      </Section>

      <Section title="Specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Property</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Background',      'bg-background'],
                ['Border',          'border border-input'],
                ['Border radius',   'rounded-md'],
                ['Shadow',          'shadow-xs'],
                ['Padding',         'px-3 py-2'],
                ['Height (reply)',  'h-[126px] — fixed per Figma'],
                ['Text (value)',    'font-normal text-sm text-foreground'],
                ['Text (placeholder)', 'placeholder:text-muted-foreground'],
                ['Resize',          'resize-none — never allow free resize'],
                ['Focus ring',      'focus:outline-none focus:ring-2 focus:ring-ring/50'],
              ].map(([prop, tokens]) => (
                <tr key={prop} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{tokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
