'use client'

import { useState } from 'react'
import { PageHeader, Section } from '../../_components/token-table'

function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`w-8 h-5 rounded-full flex items-center px-0.5 shrink-0 transition-colors ${checked ? 'bg-primary' : 'bg-[#e5e5e5]'}`}
    >
      <div
        className={`size-4 rounded-full bg-background shadow-lg transition-transform ${checked ? 'translate-x-3' : 'translate-x-0'}`}
      />
    </button>
  )
}

export default function SwitchPage() {
  const [on, setOn] = useState(false)
  const [mute, setMute] = useState(false)

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Switch"
        description="Toggle switch. Track is w-8 h-5 rounded-full. Off state: bg-[#e5e5e5]. On state: bg-primary. Thumb is size-4 rounded-full bg-background shadow-lg."
      />

      <Section title="Preview">
        <div className="flex flex-col gap-6">
          {/* Standalone switches */}
          <div className="flex items-center gap-6">
            <Switch checked={false} onChange={() => {}} />
            <Switch checked={true} onChange={() => {}} />
          </div>

          {/* Interactive */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOn(!on)}>
            <Switch checked={on} onChange={() => setOn(!on)} />
            <span className="font-medium text-sm text-foreground leading-none select-none">
              {on ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          {/* In-context: mute thread */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMute(!mute)}>
            <Switch checked={mute} onChange={() => setMute(!mute)} />
            <span className="font-medium text-sm text-foreground leading-none select-none">Mute this thread</span>
          </div>
        </div>
      </Section>

      <Section title="Specs">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground w-44">Part</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Track',        'w-8 h-5 rounded-full px-0.5 · transition-colors'],
                ['Track (off)',  'bg-[#e5e5e5]'],
                ['Track (on)',   'bg-primary'],
                ['Thumb',        'size-4 rounded-full bg-background shadow-lg · transition-transform'],
                ['Thumb (off)',  'translate-x-0'],
                ['Thumb (on)',   'translate-x-3'],
                ['Label',        'font-medium text-sm text-foreground leading-none'],
                ['Gap (track→label)', 'gap-3'],
              ].map(([part, tokens]) => (
                <tr key={part} className="bg-background hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-xs text-foreground">{part}</td>
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
