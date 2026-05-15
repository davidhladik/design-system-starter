import { Button } from '@/components/ui/button'
import { PageHeader, Section } from '../../_components/token-table'

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const sizes = ['sm', 'default', 'lg'] as const

export default function ButtonPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Button"
        description="All variants and sizes. Uses the base-nova shadcn style backed by @base-ui/react."
      />

      {/* Variants at default size */}
      <Section title="Variants">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-36">Variant</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Default</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Disabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {variants.map((variant) => (
                <tr key={variant} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground">{variant}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant={variant}>Button</Button>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant={variant} disabled>Button</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-36">Size</th>
                {variants.map((v) => (
                  <th key={v} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground capitalize">{v}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sizes.map((size) => (
                <tr key={size} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground">{size}</span>
                  </td>
                  {variants.map((variant) => (
                    <td key={variant} className="px-4 py-3">
                      <Button variant={variant} size={size}>Button</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Icon buttons */}
      <Section title="Icon buttons">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-36">Size</th>
                {variants.slice(0, 5).map((v) => (
                  <th key={v} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground capitalize">{v}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(['icon-sm', 'icon', 'icon-lg'] as const).map((size) => (
                <tr key={size} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground">{size}</span>
                  </td>
                  {variants.slice(0, 5).map((variant) => (
                    <td key={variant} className="px-4 py-3">
                      <Button variant={variant} size={size} aria-label="icon button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                          <path fillRule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* With icons */}
      <Section title="With leading / trailing icon">
        <div className="flex flex-wrap gap-3">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
            Add item
          </Button>
          <Button variant="secondary">
            Download
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
            </svg>
          </Button>
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M8 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM4.5 4.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" clipRule="evenodd" />
            </svg>
            Profile
          </Button>
          <Button variant="destructive">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
            </svg>
            Delete
          </Button>
        </div>
      </Section>
    </div>
  )
}
