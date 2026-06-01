'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

function resolveHex(cssVar: string, dark: boolean): string {
  // 1. Mount a hidden element (with optional .dark wrapper) to resolve the CSS variable
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'position:absolute;opacity:0;pointer-events:none'
  if (dark) wrapper.classList.add('dark')

  const inner = document.createElement('div')
  inner.style.backgroundColor = `var(${cssVar})`
  wrapper.appendChild(inner)
  document.body.appendChild(wrapper)

  // getComputedStyle returns oklch(...) in Chrome 111+ — NOT rgb(...)
  const computed = getComputedStyle(inner).backgroundColor
  document.body.removeChild(wrapper)

  // 2. Feed the computed color into a 1×1 canvas — canvas always rasterises to RGB
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return '—'
  ctx.fillStyle = computed
  ctx.fillRect(0, 0, 1, 1)
  const data = ctx.getImageData(0, 0, 1, 1).data
  const r = data[0], g = data[1], b = data[2], a = data[3]

  // Fully transparent = variable unresolved or transparent token
  if (a === 0) return 'transparent'

  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`
}

function SwatchCell({
  cssVar,
  dark = false,
  className,
}: {
  cssVar: string
  dark?: boolean
  className?: string
}) {
  const [hex, setHex] = useState<string>('')

  useEffect(() => {
    setHex(resolveHex(cssVar, dark))
  }, [cssVar, dark])

  return (
    <div className="flex items-center gap-2">
      {dark ? (
        <div className="dark inline-flex shrink-0">
          <div
            className={cn('w-8 h-8 rounded-md ring-1 ring-inset ring-white/10 shadow-xs', className)}
            style={{ backgroundColor: `var(${cssVar})` }}
          />
        </div>
      ) : (
        <div
          className={cn('w-8 h-8 rounded-md border border-border/60 shadow-xs shrink-0', className)}
          style={{ backgroundColor: `var(${cssVar})` }}
        />
      )}
      <span className="font-mono text-xs text-muted-foreground tabular-nums">
        {hex || '…'}
      </span>
    </div>
  )
}

export function LiveSwatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return <SwatchCell cssVar={cssVar} dark={false} className={className} />
}

export function LiveDarkSwatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return <SwatchCell cssVar={cssVar} dark={true} className={className} />
}
