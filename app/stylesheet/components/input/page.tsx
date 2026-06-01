import { Search } from 'lucide-react'
import { PageHeader, Section } from '../../_components/token-table'

export default function InputPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Input"
        description="Single-line text input. Base tokens: h-9, bg-background, border border-input, rounded-md, shadow-xs, px-3. Can include a leading icon."
      />

      <Section title="Preview">
        <div className="flex flex-col gap-4">
          {/* Plain input */}
          <div className="bg-background border border-input h-9 rounded-md shadow-xs px-3 flex items-center w-80">
            <span className="font-normal text-sm text-muted-foreground">Placeholder text…</span>
          </div>

          {/* Input with leading icon */}
          <div className="bg-background border border-input h-9 rounded-md shadow-xs px-3 flex items-center gap-2 w-80">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <span className="font-normal text-sm text-muted-foreground">Search</span>
          </div>

          {/* Input with value */}
          <div className="bg-background border border-input h-9 rounded-md shadow-xs px-3 flex items-center w-80">
            <span className="font-normal text-sm text-foreground">William Smith</span>
          </div>
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
                ['Height',         'h-9'],
                ['Background',     'bg-background'],
                ['Border',         'border border-input'],
                ['Border radius',  'rounded-md'],
                ['Shadow',         'shadow-xs'],
                ['Padding',        'px-3'],
                ['Text (value)',   'font-normal text-sm text-foreground'],
                ['Text (placeholder)', 'font-normal text-sm text-muted-foreground'],
                ['Leading icon',   'size-4 text-muted-foreground · gap-2 from icon to text'],
                ['Focus ring',     'focus:outline-none focus:ring-2 focus:ring-ring/50'],
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
