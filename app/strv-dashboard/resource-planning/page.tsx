'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react'

// ---------------------------------------------------------------------------
// Placeholder Gantt data
// ---------------------------------------------------------------------------

const projects = [
  {
    client: 'Acme Corp',
    name: 'Acme Mobile App',
    color: 'var(--color-primary)',
    people: [
      { name: 'Bea Nguyen',   dept: 'Engineering', barStart: 0,  barWidth: 55, label: 'Acme Mobile App — SOW 1', delay: false },
      { name: 'Dana Fischer', dept: 'Engineering', barStart: 0,  barWidth: 100, label: 'Acme Mobile App — SOW 2', delay: false },
      { name: 'Iris Tanaka',  dept: 'Product',     barStart: 0,  barWidth: 100, label: 'Acme Mobile App — SOW 2', delay: false },
    ],
  },
  {
    client: 'Globex',
    name: 'Globex Internal Tools',
    color: '#f97316',
    people: [
      { name: 'Cole Patel', dept: 'Engineering', barStart: 0,  barWidth: 62, label: 'Globex Internal Tools', delay: true },
      { name: 'Kai Singh',  dept: 'Engineering', barStart: 0,  barWidth: 28, label: 'Globex Internal Tools', delay: true },
    ],
  },
  {
    client: 'Initech',
    name: 'Initech Migration',
    color: '#9ca3af',
    people: [
      { name: 'Farah Okeke', dept: 'Design', barStart: 0,  barWidth: 48, label: 'Initech Migration', delay: true },
      { name: 'Lena Voss',   dept: 'Design', barStart: 0,  barWidth: 100, label: 'Initech Migration', delay: false },
    ],
  },
  {
    client: 'Internal',
    name: 'STRV Internal — Tooling',
    color: '#7c3aed',
    people: [
      { name: 'Alex Carter', dept: 'Engineering', barStart: 0, barWidth: 54, label: 'STRV Internal — Tooling', delay: true },
    ],
  },
  {
    client: 'Northwind Traders',
    name: 'Northwind Web Platform',
    color: '#0891b2',
    people: [
      { name: 'Gus Lindqvist', dept: 'Design', barStart: 0, barWidth: 100, label: 'Northwind Web Platform', delay: false },
    ],
  },
  {
    client: 'Stark Industries',
    name: 'Stark Industries Dashboard',
    color: 'var(--color-primary)',
    people: [
      { name: 'Hana Brown', dept: 'Product', barStart: 0, barWidth: 20, label: 'Stark Industries Dashboard', delay: true },
    ],
  },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MAY_DATES  = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
const JUNE_DATES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PillTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.04em] transition-colors ${
        active
          ? 'bg-foreground border-foreground text-background'
          : 'border-foreground text-foreground hover:bg-muted-secondary'
      }`}
    >
      {label}
    </button>
  )
}

function DropdownButton({ label }: { label: string }) {
  return (
    <button className="h-8 px-3 border border-border flex items-center gap-1 text-xs font-bold uppercase text-foreground hover:bg-muted-secondary transition-colors">
      {label}
      <ChevronLeft className="size-3.5 rotate-[-90deg]" />
    </button>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ResourcePlanningPage() {
  const [activeTab, setActiveTab] = useState('PROJECT')

  return (
    <div className="px-[88px]">

      {/* ── Header row ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-5">
        {/* Date nav arrows */}
        <div className="flex shrink-0">
          <button className="w-7 h-[42px] border border-border flex items-center justify-center hover:bg-muted-secondary transition-colors">
            <ChevronLeft className="size-4" />
          </button>
          <button className="w-7 h-[42px] border border-border border-l-0 flex items-center justify-center hover:bg-muted-secondary transition-colors">
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Big headline date range */}
        <h1 className="font-[family-name:var(--font-pp-neue-corp-tight)] text-[60px] font-bold leading-none text-foreground uppercase tracking-normal flex-1">
          May 18 – Jun 14
        </h1>

        {/* This week button */}
        <button className="h-[42px] px-4 border border-border text-xs font-bold uppercase tracking-[0.04em] text-foreground hover:bg-muted-secondary transition-colors shrink-0">
          This week
        </button>

        {/* Stats */}
        <div className="flex items-end gap-6 shrink-0">
          {[
            { label: 'People', value: '12' },
            { label: 'Over',   value: '0'  },
            { label: 'Hours',  value: '992' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground leading-none mb-1">{label}</span>
              <span className="font-[family-name:var(--font-maison-neue)] text-base font-bold leading-none text-foreground uppercase">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* New allocation button */}
        <button className="h-9 px-4 bg-primary flex items-center gap-2 text-xs font-bold uppercase tracking-[0.04em] text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
          <Plus className="size-4" />
          New allocation
        </button>
      </div>

      {/* ── Filter row ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        {/* Pill tabs */}
        <div className="flex items-center gap-1.5 flex-1">
          {['CLIENT', 'PROJECT', 'SOW', 'PEOPLE'].map((tab) => (
            <PillTab
              key={tab}
              label={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {/* Right controls */}
        <button className="size-8 border border-border flex items-center justify-center hover:bg-muted-secondary transition-colors">
          <Search className="size-4" />
        </button>
        <DropdownButton label="All departments" />
        <DropdownButton label="4 weeks" />
      </div>

      {/* ── Gantt chart ─────────────────────────────────────────────────── */}
      <div className="bg-card overflow-hidden">
        {/* Calendar header */}
        <div className="flex border-b border-border">
          {/* Left column header */}
          <div className="w-[280px] shrink-0 px-4 py-2 border-r border-border">
            <span className="text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground">Project</span>
          </div>

          {/* Date columns */}
          <div className="flex-1 flex flex-col">
            {/* Month labels */}
            <div className="flex border-b border-border">
              <div
                className="flex items-center px-3 py-1 border-r border-border text-xs font-bold text-muted-foreground"
                style={{ width: `${(MAY_DATES.length / (MAY_DATES.length + JUNE_DATES.length)) * 100}%` }}
              >
                May
              </div>
              <div className="flex items-center px-3 py-1 text-xs font-bold text-muted-foreground">
                June
              </div>
            </div>
            {/* Day headers */}
            <div className="flex">
              {[...MAY_DATES, ...JUNE_DATES].map((d, i) => (
                <div
                  key={i}
                  className={`flex-1 min-w-0 text-center py-1 text-[10px] text-muted-foreground border-r border-border last:border-r-0 ${
                    d === 22 ? 'bg-primary/5 font-bold text-primary' : ''
                  }`}
                >
                  <div className="truncate">{DAYS[i % 7]}</div>
                  <div className="truncate font-bold">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rows */}
        {projects.map((project) => (
          <div key={project.name}>
            {/* Project group header */}
            <div className="flex border-b border-border bg-muted/30">
              <div className="w-[280px] shrink-0 px-4 py-2 border-r border-border flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{project.name}</span>
                <span className="text-xs text-muted-foreground">{project.client}</span>
              </div>
              <div className="flex-1" />
            </div>

            {/* Person rows */}
            {project.people.map((person) => (
              <div key={person.name} className="flex border-b border-border last:border-b-0">
                {/* Name column */}
                <div className="w-[280px] shrink-0 px-4 py-2 border-r border-border flex items-baseline gap-2">
                  <span className="text-sm text-foreground">{person.name}</span>
                  <span className="text-xs text-muted-foreground">{person.dept}</span>
                </div>

                {/* Bar column */}
                <div className="flex-1 relative flex items-center py-1.5 px-1">
                  {/* Today marker */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-primary z-10"
                    style={{ left: `${(4 / (MAY_DATES.length + JUNE_DATES.length)) * 100}%` }}
                  />

                  {/* The allocation bar */}
                  <div
                    className="h-7 flex items-center px-2 text-xs font-bold text-white truncate"
                    style={{
                      marginLeft: `${person.barStart}%`,
                      width: `${person.barWidth}%`,
                      backgroundColor: project.color,
                      opacity: person.delay ? 0.7 : 1,
                    }}
                  >
                    {person.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}
