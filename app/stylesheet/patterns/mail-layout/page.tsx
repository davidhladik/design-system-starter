import { PageHeader, Section } from '../../_components/token-table'

export default function MailLayoutPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Mail Layout"
        description="3-column full-screen shell: MailAside (w-64) + MessageList (w-[398px]) + EmailDetail (flex-1). Root is flex h-screen bg-background overflow-hidden."
      />

      {/* Wireframe preview */}
      <Section title="Preview">
        <div className="flex h-64 border border-[rgba(10,10,10,0.1)] rounded-lg overflow-hidden text-xs text-muted-foreground">
          {/* Aside */}
          <div className="w-40 border-r border-[rgba(10,10,10,0.1)] bg-background flex flex-col shrink-0">
            <div className="border-b border-[rgba(10,10,10,0.1)] h-10 flex items-center px-2 shrink-0">
              <div className="bg-muted rounded-md h-6 w-full" />
            </div>
            <div className="p-2 flex flex-col gap-1 border-b border-[rgba(10,10,10,0.1)]">
              {[1,2,3].map(i => (
                <div key={i} className={`rounded-md h-6 w-full ${i === 1 ? 'bg-primary/20' : 'bg-muted'}`} />
              ))}
            </div>
            <div className="p-2 flex flex-col gap-1">
              {[1,2].map(i => <div key={i} className="rounded-md h-6 w-full bg-muted" />)}
            </div>
          </div>

          {/* Message list */}
          <div className="w-48 border-r border-[rgba(10,10,10,0.1)] bg-background flex flex-col shrink-0">
            <div className="border-b border-[rgba(10,10,10,0.1)] h-10 flex items-center px-3 shrink-0 gap-2">
              <div className="bg-muted rounded h-4 flex-1" />
              <div className="bg-muted rounded h-5 w-16" />
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1 overflow-hidden">
              {[1,2,3].map(i => (
                <div key={i} className={`rounded-[8px] border border-[rgba(10,10,10,0.1)] p-2 flex flex-col gap-1 ${i === 1 ? 'bg-muted' : 'bg-background'}`}>
                  <div className="bg-muted rounded h-2.5 w-3/4" />
                  <div className="bg-muted/60 rounded h-2 w-full" />
                  <div className="bg-muted/60 rounded h-2 w-2/3" />
                </div>
              ))}
            </div>
          </div>

          {/* Email detail */}
          <div className="flex-1 bg-background flex flex-col min-w-0">
            <div className="border-b border-[rgba(10,10,10,0.1)] h-10 flex items-center px-2 gap-1 shrink-0">
              {[1,2,3,4,5,6].map(i => <div key={i} className="size-6 rounded bg-muted" />)}
            </div>
            <div className="border-b border-[rgba(10,10,10,0.1)] p-3 flex gap-3 shrink-0 items-start">
              <div className="size-8 rounded-full bg-muted shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="bg-muted rounded h-3 w-1/2" />
                <div className="bg-muted/60 rounded h-2 w-3/4" />
              </div>
            </div>
            <div className="flex-1 p-3">
              <div className="flex flex-col gap-1.5">
                {[1,2,3].map(i => <div key={i} className="bg-muted/60 rounded h-2 w-full" />)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Column specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Column</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens / notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Root shell',       'flex h-screen bg-background overflow-hidden'],
                ['MailAside',        'w-64 · flex flex-col · h-full · shrink-0 · border-r border-[rgba(10,10,10,0.1)]'],
                ['Aside header',     'h-14 · border-b border-[rgba(10,10,10,0.1)] · px-2 · flex items-center'],
                ['Aside nav groups', 'p-2 gap-1 · Group 1 has border-b; Group 2 has no border'],
                ['Active nav item',  'bg-primary text-primary-foreground · rounded-md px-3 py-2 · font-medium text-sm'],
                ['Inactive nav item','text-foreground hover:bg-accent · rounded-md px-3 py-2 · font-medium text-sm'],
                ['MessageList',      'w-[398px] · flex flex-col · shrink-0 · border-r border-[rgba(10,10,10,0.1)]'],
                ['List header',      'h-14 · border-b · px-4 py-2 · gap-[74px] · flex items-center'],
                ['List title',       'font-bold text-xl text-foreground leading-7 flex-1'],
                ['Tabs in list',     'Tabs component · flex-1 · all triggers flex-1 to fill width'],
                ['Search row',       'p-4 · Input component · w-full'],
                ['Card list',        'flex-1 flex flex-col gap-2 overflow-auto pb-4 px-4 min-h-0'],
                ['EmailDetail',      'flex-1 · flex flex-col · self-stretch · min-w-0'],
                ['Detail toolbar',   'h-14 · border-b · px-2 · flex items-center justify-between'],
                ['Toolbar buttons',  'size-9 rounded-md hover:bg-accent · ghost icon pattern'],
                ['Toolbar separator','w-px h-5 bg-border · mx-1'],
                ['Sender row',       'border-b · p-4 · flex items-start justify-between'],
                ['Avatar',           'size-10 rounded-full bg-muted'],
                ['Sender name',      'font-semibold text-sm text-foreground'],
                ['Sender subject',   'font-normal text-xs text-foreground'],
                ['Reply-to',         'font-medium text-xs text-foreground'],
                ['Timestamp (detail)', 'font-normal text-xs text-muted-foreground'],
                ['Body',             'flex-1 border-b p-4 · font-normal text-sm text-foreground leading-5 whitespace-pre-wrap'],
                ['Reply area',       'p-4 gap-4 · Textarea + Switch + Send button'],
                ['Send button',      'bg-primary h-9 rounded-md px-4 · font-medium text-sm text-primary-foreground'],
              ].map(([col, tokens]) => (
                <tr key={col} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{col}</td>
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
