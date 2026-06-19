# Design System Page — Build Instructions

Read this file fully before writing any code. These instructions tell you how to build a living design system documentation page — a "storybook" — for this project. The page documents the real components and design tokens that exist in the codebase, rendered live using the actual implementations.

---

## Step 1 — Explore before writing anything

Before touching any files, explore the project and answer these questions:

**Stack and framework:**
- What framework is this? (Next.js App Router, Vite+React, Vue, etc.)
- What styling system is used? (Tailwind CSS, CSS modules, styled-components, etc.)
- Where do components live? (`components/`, `src/components/`, `ui/`, etc.)
- Is a component library in use? (shadcn/ui, Radix, MUI, Ant Design, etc.)

**Design tokens:**
- Is there a `globals.css` or equivalent with CSS custom properties?
- Is there a token file (`tokens.json`, `theme.ts`, `variables.scss`)?
- What colour tokens exist? What typography tokens?
- What fonts are registered and how?
- Is there a dark mode system?

**Components:**
- List all component files
- Read 3–5 of the most-used components to understand their API (props, variants, sizes)
- Look for any existing documentation, comments, or Storybook stories

**Existing stylesheet (if any):**
- Is there already a `/stylesheet/` or `/docs/` section?
- What pages exist? What's missing?

Only after completing this exploration should you proceed.

---

## Step 2 — Propose a plan, then wait for confirmation

Based on your exploration, present the user with:

1. A list of **design token pages** to build (colours, typography, spacing, shadows, etc.)
2. A list of **component pages** to build — one per component, grouped by category
3. A list of **pattern pages** to build — composed UI sections (cards, data tables, navigation, etc.)
4. The **file structure** you'll create (routes, layout, nav file)

**Wait for the user to confirm or adjust the plan before building anything.**

---

## Step 3 — Build in this order

1. Layout + navigation shell
2. Design token pages (colours → typography → other tokens)
3. Component pages (simplest to most complex)
4. Pattern pages (composed multi-component examples)

Build one page at a time. Register it in the nav before moving to the next.

---

## File structure (adapt to the framework)

### Next.js App Router (preferred)

```
app/stylesheet/
├── layout.tsx              ← sticky sidebar nav, wraps all pages
├── page.tsx                ← redirect to first page or overview
├── _components/
│   └── nav.tsx             ← sidebar navigation component
├── design-system/
│   ├── colors/page.tsx
│   ├── typography/page.tsx
│   └── tokens/page.tsx     ← spacing, shadows, radius
├── components/
│   ├── button/page.tsx
│   ├── input/page.tsx
│   └── [name]/page.tsx
└── patterns/
    ├── card/page.tsx
    └── [name]/page.tsx
```

### Other frameworks
Adapt the folder structure and routing to match the project's conventions. The content, visual design, and goals stay identical.

---

## Visual design of the stylesheet pages

The documentation pages should use the project's own design tokens to style themselves — they "dogfood" the design system. Follow these layout rules:

**Page layout:**
- Fixed left sidebar: 220–260px wide, full viewport height, scrollable independently
- Main content area: scrollable, `max-width` ~900px, centered with `mx-auto`
- Top padding: ~40px, bottom padding: ~80px, horizontal padding: ~40–64px

**Sidebar nav:**
- Grouped by section (Design System, Components, Patterns)
- Section headings: small, bold, uppercase, muted colour
- Nav items: regular weight, full width, active state uses primary colour accent
- Background: use the project's sidebar or muted background token

**Each documentation page:**
- **Page title**: large, bold — use the project's headline font if available
- **Description**: one sentence, muted colour, below the title
- **Section divider**: a horizontal rule or border between sections
- **Preview containers**: a bordered box (`border`, `rounded` if the project uses radius) with padding, showing the live component centred or left-aligned
- **Spec tables**: `font-mono text-xs` for token values, regular weight for labels
- **Section headings within a page**: medium size, bold, with a bottom border

**Colours:** Use only the project's design tokens. Never hardcode colours. If a token doesn't exist for something, use the closest available token.

---

## What every component page must include

### 1. Page header
```
[Component Name]
One sentence describing what this component is and when to use it.
```

### 2. Live variants preview
Show every variant side by side in a single preview container. Label each variant clearly. If the component has sizes, show all sizes. If it has states (hover, disabled, error), show those too.

### 3. Spec table
A table documenting the non-obvious visual properties:

| Property | Token | Value |
|---|---|---|
| Height | `h-9` / `--height-button` | 36px |
| Background | `bg-primary` | `var(--primary)` |
| Font | `font-bold uppercase tracking-[0.04em]` | Maison Neue Bold, 14px |
| Border radius | none | 0px |
| Focus ring | `ring-3 ring-ring/50` | |

Use `font-mono text-xs text-muted-foreground` for token/value cells. Include only values that a developer would need to look up — skip obvious ones.

### 4. Invariants note
A short note on what must never change about this component. Example:
> "The border is always `border-border`. Never use a hardcoded colour. The height must match the design token exactly across all usages."

---

## What every design token page must include

### Colour page
- One swatch per token: a filled square (40×40px minimum) + token name + CSS variable name + hex/OKLCH value
- Group by category if the project has categories (brand, neutral, status, etc.)
- Show both light and dark mode values if dark mode exists

### Typography page
- One row per text style: a live text example at the actual size + font name + size + weight + line height + any letter spacing or transform
- Cover all distinct type scales used in the project

### Other token pages (spacing, radius, shadow)
- Visual example of each value + token name + computed value

---

## Navigation component requirements

The nav must:
- Be registered before a page can be considered "done"
- Group pages under collapsible or labelled sections
- Show the active page with a visual indicator (colour change, dot, border)
- Be sticky — stay in place while the content scrolls
- Link to the exact route of each page

When adding a new page, always add it to the nav in the same commit/step.

---

## Rules — never break these

1. **Use real components only.** Never create a visual mock of a component for documentation purposes. Import and render the actual component.
2. **Use real tokens only.** Every colour, size, spacing, and font in the documentation page itself must reference a design token. No hardcoded values.
3. **One page per component.** Don't cram multiple components onto one page. Each gets its own route and nav entry.
4. **Register in nav before moving on.** A page that isn't in the nav doesn't officially exist.
5. **Dark mode parity.** If the project has dark mode, all documentation pages must respect it.
6. **No external dependencies.** Don't install Storybook or any documentation library. Build it with the project's existing stack.

---

## Starting message

After reading this file, say:

> "I'll start by exploring the project to understand the stack, components, and design tokens — then propose a list of pages to build before writing any code. Give me a moment."

Then run the exploration from Step 1 and present your findings and proposed plan.

---

## Checklist before calling a section complete

- [ ] Page renders without errors
- [ ] All variants/sizes/states are shown
- [ ] Spec table is filled in with real token names
- [ ] Nav entry added and link works
- [ ] Dark mode renders correctly (if applicable)
- [ ] No hardcoded colours, sizes, or fonts
- [ ] PageHeader has a title and a description sentence
