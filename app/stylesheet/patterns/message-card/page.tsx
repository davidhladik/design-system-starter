'use client'

import { useState } from 'react'
import { PageHeader, Section } from '../../_components/token-table'
import { cn } from '@/lib/utils'

type BadgeVariant = 'primary' | 'secondary' | 'outline'

function MailBadge({ label, variant }: { label: string; variant: BadgeVariant }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-md px-2 py-0.5 font-semibold text-xs border border-transparent whitespace-nowrap',
      variant === 'primary'   && 'bg-primary text-primary-foreground',
      variant === 'secondary' && 'bg-secondary text-secondary-foreground',
      variant === 'outline'   && 'bg-background border-[rgba(10,10,10,0.1)] text-foreground',
    )}>
      {label}
    </span>
  )
}

const exampleMsg = {
  sender: 'William Smith',
  subject: 'Meeting Tomorrow',
  preview: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share.",
  time: 'about 1 year ago',
  unread: true,
  tags: [
    { label: 'meeting',   variant: 'secondary' as BadgeVariant },
    { label: 'work',      variant: 'primary'   as BadgeVariant },
    { label: 'important', variant: 'secondary' as BadgeVariant },
  ],
}

export default function MessageCardPage() {
  const [selected, setSelected] = useState<'a' | 'b' | null>('a')

  return (
    <div className="max-w-md">
      <PageHeader
        title="Message Card"
        description="Email list item. Two states: active (bg-muted) and inactive (bg-background). Always has border border-[rgba(10,10,10,0.1)] rounded-[10px] p-3."
      />

      <Section title="Preview">
        <div className="flex flex-col gap-2">
          {/* Active card */}
          <button
            onClick={() => setSelected('a')}
            className={cn(
              'flex flex-col gap-2 items-start p-3 rounded-[10px] w-full border border-[rgba(10,10,10,0.1)] text-left transition-colors',
              selected === 'a' ? 'bg-muted' : 'bg-background hover:bg-muted/40'
            )}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex gap-2 items-center min-w-0">
                <span className="font-semibold text-sm text-foreground whitespace-nowrap">{exampleMsg.sender}</span>
                {exampleMsg.unread && <span className="size-2 rounded-full bg-primary shrink-0" />}
              </div>
              <span className={cn('text-xs shrink-0', selected === 'a' ? 'text-foreground' : 'text-muted-foreground')}>
                {exampleMsg.time}
              </span>
            </div>
            <p className="font-medium text-xs text-foreground w-full truncate">{exampleMsg.subject}</p>
            <p className="font-normal text-xs text-muted-foreground w-full line-clamp-2">{exampleMsg.preview}</p>
            <div className="flex gap-2 items-center flex-wrap">
              {exampleMsg.tags.map((tag) => <MailBadge key={tag.label} {...tag} />)}
            </div>
          </button>

          {/* Inactive card */}
          <button
            onClick={() => setSelected('b')}
            className={cn(
              'flex flex-col gap-2 items-start p-3 rounded-[10px] w-full border border-[rgba(10,10,10,0.1)] text-left transition-colors',
              selected === 'b' ? 'bg-muted' : 'bg-background hover:bg-muted/40'
            )}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex gap-2 items-center min-w-0">
                <span className="font-semibold text-sm text-foreground whitespace-nowrap">Alice Smith</span>
              </div>
              <span className={cn('text-xs shrink-0', selected === 'b' ? 'text-foreground' : 'text-muted-foreground')}>
                about 1 year ago
              </span>
            </div>
            <p className="font-medium text-xs text-foreground w-full truncate">Re: Project Update</p>
            <p className="font-normal text-xs text-muted-foreground w-full line-clamp-2">
              Thank you for the project update. It looks great! I&apos;ve gone through the report and the progress is impressive.
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              <MailBadge label="work" variant="primary" />
              <MailBadge label="personal" variant="outline" />
            </div>
          </button>
        </div>
      </Section>

      <Section title="Structure">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-40">Zone</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens / notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Card (active)',    'bg-muted · border border-[rgba(10,10,10,0.1)] · rounded-[10px] · p-3'],
                ['Card (inactive)',  'bg-background · border border-[rgba(10,10,10,0.1)] · rounded-[10px] · p-3'],
                ['Card layout',     'flex flex-col gap-2 · w-full · text-left'],
                ['Row 1',           'flex justify-between items-center · gap-2'],
                ['Sender name',     'font-semibold text-sm text-foreground · whitespace-nowrap'],
                ['Unread dot',      'size-2 rounded-full bg-primary · only when unread'],
                ['Timestamp (active)',   'text-xs text-foreground'],
                ['Timestamp (inactive)', 'text-xs text-muted-foreground'],
                ['Row 2 — subject',  'font-medium text-xs text-foreground · truncate'],
                ['Row 3 — preview',  'font-normal text-xs text-muted-foreground · line-clamp-2'],
                ['Row 4 — tags',     'flex gap-2 items-center flex-wrap'],
                ['Badge (primary)',   'bg-primary text-primary-foreground'],
                ['Badge (secondary)', 'bg-secondary text-secondary-foreground'],
                ['Badge (outline)',   'bg-background border border-[rgba(10,10,10,0.1)] text-foreground'],
                ['Badge shared',     'rounded-md px-2 py-0.5 font-semibold text-xs'],
              ].map(([zone, tokens]) => (
                <tr key={zone} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{zone}</td>
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
