import { Button } from '@/components/ui/button'
import { PanelLeft, ChevronDown, CircleHelp } from 'lucide-react'
import { PageHeader, Section } from '../../_components/token-table'

function TopBarPreview() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <header className="h-12 border-b border-border flex items-center justify-between px-6 bg-background">
        <div className="flex items-center gap-2">
          <button className="size-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors">
            <PanelLeft className="size-4" />
          </button>
          <div className="w-px h-[15px] bg-border" />
          <span className="font-normal text-sm text-foreground">Documents</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="font-medium text-sm h-9">GitHub</Button>
          <button className="w-[228px] h-9 bg-background border border-input rounded-md shadow-xs px-3 flex items-center gap-2 text-sm">
            <span className="flex-1 text-left truncate">
              <span className="text-muted-foreground">Select a theme: </span>
              <span className="text-foreground">Default</span>
            </span>
            <ChevronDown className="size-4 text-foreground/50 shrink-0" />
          </button>
          <Button variant="secondary" size="icon" className="size-9">
            <CircleHelp className="size-4" />
          </Button>
        </div>
      </header>
    </div>
  )
}

export default function TopBarPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Top Bar"
        description="App-shell header. Fixed height h-12, border-b, px-6. Left side holds the sidebar toggle + vertical separator + breadcrumb. Right side holds actions."
      />

      <Section title="Preview">
        <TopBarPreview />
      </Section>

      <Section title="Specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Element</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Container',         'h-12 · border-b border-border · px-6 · bg-background · justify-between'],
                ['Sidebar toggle',    'size-7 · rounded-md · text-muted-foreground · hover:bg-accent · PanelLeft icon size-4'],
                ['Separator',         'w-px h-[15px] bg-border'],
                ['Breadcrumb text',   'font-normal text-sm text-foreground'],
                ['Ghost action btn',  'Button variant="ghost" size="sm" · h-9 · font-medium text-sm · no icon'],
                ['Inline select',     'w-[228px] h-9 · border border-input · rounded-md · shadow-xs · px-3'],
                ['Select label text', 'text-muted-foreground (prefix) + text-foreground (value)'],
                ['Select chevron',    'ChevronDown size-4 text-foreground/50'],
                ['Help / icon btn',   'Button variant="secondary" size="icon" · size-9'],
              ].map(([el, tokens]) => (
                <tr key={el} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{el}</td>
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
