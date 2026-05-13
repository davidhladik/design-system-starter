# Design Tokens

This project uses **shadcn's standard CSS variable names in code**, but the **Figma source uses a restructured semantic naming system** organized by application (foreground, background, border) and purpose (default, brand, component, status, sidebar, focus-ring, charts).

Use this document as the source of truth when translating between Figma designs and code. The mapping is one-directional: Figma names are conceptual and human-readable, code uses shadcn's expected variable names so the component library and AI tools continue to work without modification.

---

## Automation contract for AI coding tools

This section defines what AI tools (Claude Code, Cursor, etc.) are authorized to do autonomously when working with this token system, and what requires user confirmation.

### Authorized actions — proceed without asking

When implementing a Figma design that uses tokens from the mapping table below:

1. **Translate Figma token names to shadcn CSS variables / Tailwind utilities** using the mapping table. Apply the resulting class names directly in component code.

2. **Add missing CSS variable definitions to `globals.css`** when a Figma design uses a token marked **Added** in the mapping table that does not yet exist in code. Define values for both `:root` (light mode) and `.dark` (dark mode) blocks, using the resolved color values from the Figma MCP server.

3. **Add corresponding Tailwind utility mappings to `tailwind.config.js`** when a new CSS variable is added to `globals.css`. Follow the existing pattern in the config file (e.g. matching how `primary` and `primary-foreground` are defined).

4. **Use the existing CSS variable format** when adding new variables. This project uses OKLCH with the full `oklch()` function wrapper (e.g. `oklch(0.985 0 0)`). Do not mix formats within the file.

5. **Maintain mode parity** — every variable added to `:root` must also be added to `.dark` with its corresponding dark mode value from Figma. Never add a variable in only one mode.

### Required confirmations — stop and ask

1. **A Figma token name does not appear in the mapping table.** Do not invent a mapping. Ask the user to update this document first, then proceed.

2. **A Figma layer uses a hardcoded color value instead of a variable.** Ask whether this should become a new token (and added to the mapping table) or used as a one-off literal value.

3. **The Figma MCP server returns ambiguous or unresolved variable values.** Report what was returned and ask the user how to proceed rather than guessing.

4. **Renaming or removing an existing CSS variable.** Any change that could break existing components requires user confirmation, even if the markdown table appears to support it.

5. **Adding a token that is not marked Added in the mapping table.** Only tokens explicitly marked **Added** are pre-authorized for automatic creation. shadcn defaults are assumed to already exist.

### CSS variable format specification

This project uses OKLCH color values with the full `oklch()` function wrapper. OKLCH is the format shadcn migrated to in 2024+ because it provides perceptually uniform color (lightness changes look uniform across hues) and a wider gamut than HSL.

```css
:root {
  --success: oklch(0.72 0.18 145);
  --success-foreground: oklch(0.985 0 0);
}

.dark {
  --success: oklch(0.65 0.17 145);
  --success-foreground: oklch(0.145 0 0);
}
```

OKLCH values are `oklch(L C H)` where:
- **L** — lightness from 0 (black) to 1 (white)
- **C** — chroma (saturation), typically 0 to ~0.4
- **H** — hue angle in degrees, 0 to 360

For opacity modifiers in Tailwind (e.g. `bg-primary/50`), the format works natively — Tailwind generates `oklch(var(--primary) / 0.5)` automatically when the variable is defined without the wrapper. If using the full `oklch(...)` wrapper inside the variable definition (the format above), you may need to use the `color-mix()` approach for opacity, or define the variable as space-separated values. **Use whichever format matches the existing `globals.css` in this project** — if uncertain, ask the user before assuming.

### When to read this file

Read this file at the start of any task that involves:
- Implementing a Figma design as React/HTML components
- Adding or modifying tokens in `globals.css` or `tailwind.config.js`
- Reviewing a component's styling for consistency with the design system
- Translating between Figma variable names and code references

---

## Naming convention

Figma tokens follow the pattern: `{group}/{subgroup}/{token-name}`

- **Group** — what the token applies to: `foreground`, `background`, `border`, `charts`
- **Subgroup** — semantic role: `default`, `brand`, `component`, `status`, `sidebar`, `focus-ring`
- **Token name** — specific purpose, prefixed with the abbreviation of its group (`fg-`, `bg-`, `bd-`)

The group prefix is repeated in the token name for clarity at the leaf level. This makes a token like `background/component/bg-button-primary` self-describing even when copied out of its group context.

---

## Mapping table

The table is the canonical reference. Every Figma token maps to either an existing shadcn CSS variable or a newly added project-specific variable (marked **Added**).

### Foreground — text and icon colors

| Figma name | shadcn CSS variable | Tailwind utility | Status | Use case |
|---|---|---|---|---|
| `foreground/default/fg-primary` | `--foreground` | `text-foreground` | shadcn | Primary body text and icons |
| `foreground/default/fg-card-headline` | `--card-foreground` | `text-card-foreground` | shadcn | Headlines and primary text inside cards |
| `foreground/default/fg-secondary` | `--muted-foreground` | `text-muted-foreground` | shadcn | Secondary text, captions, hints |
| `foreground/default/fg-tertiary` | `--muted-foreground-secondary` | `text-muted-foreground-secondary` | **Added** | Lowest-emphasis text — timestamps, metadata, very subtle labels |
| `foreground/default/fg-inverted` | `--inverted-foreground` | `text-inverted-foreground` | **Added** | Text on inverted surfaces (e.g. dark callouts in light mode) |
| `foreground/brand/fg-brand-primary` | `--brand-primary-foreground` | `text-brand-primary-foreground` | **Added** | Text and icons in the primary brand color |
| `foreground/brand/fg-brand-secondary` | `--brand-secondary-foreground` | `text-brand-secondary-foreground` | **Added** | Text and icons in the secondary brand color |
| `foreground/component/fg-button-primary` | `--primary-foreground` | `text-primary-foreground` | shadcn | Text and icons on primary buttons |
| `foreground/component/fg-button-secondary` | `--secondary-foreground` | `text-secondary-foreground` | shadcn | Text and icons on secondary buttons |
| `foreground/component/fg-button-destructive` | `--destructive-foreground` | `text-destructive-foreground` | shadcn | Text and icons on destructive buttons |
| `foreground/component/fg-active-state-accent` | `--accent-foreground` | `text-accent-foreground` | shadcn | Text on hover/focus states for neutral menu items (dropdowns, selects, command palette) |
| `foreground/component/fg-popover` | `--popover-foreground` | `text-popover-foreground` | shadcn | Text inside popovers and tooltips |
| `foreground/status/fg-status-success` | `--success-foreground` | `text-success-foreground` | **Added** | Text and icons in success states |
| `foreground/status/fg-status-warning` | `--warning-foreground` | `text-warning-foreground` | **Added** | Text and icons in warning states |
| `foreground/status/fg-status-error` | `--error-foreground` | `text-error-foreground` | **Added** | Text and icons in error states (distinct from destructive buttons) |
| `foreground/sidebar/fg-sidebar-primary` | `--sidebar-foreground` | `text-sidebar-foreground` | shadcn | Primary text in the sidebar |
| `foreground/sidebar/fg-sidebar-inverted` | `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | shadcn | Text on the sidebar's branded/primary area |
| `foreground/sidebar/fg-sidebar-active` | `--sidebar-accent-foreground` | `text-sidebar-accent-foreground` | shadcn | Text on active/hovered sidebar items |

### Background — surface and fill colors

| Figma name | shadcn CSS variable | Tailwind utility | Status | Use case |
|---|---|---|---|---|
| `background/default/bg-default` | `--background` | `bg-background` | shadcn | Page background |
| `background/default/bg-muted-soft` | `--muted` | `bg-muted` | shadcn | Subtle filled areas, code blocks, secondary sections |
| `background/default/bg-muted-hard` | `--muted-secondary` | `bg-muted-secondary` | **Added** | More pronounced filled background than `bg-muted-soft` — use when extra contrast is needed |
| `background/default/bg-inverted` | `--inverted` | `bg-inverted` | **Added** | Inverted surface for emphasis (dark in light mode, light in dark mode) |
| `background/default/bg-card` | `--card` | `bg-card` | shadcn | Card and panel surfaces |
| `background/default/bg-card-muted` | `--card-muted` | `bg-card-muted` | **Added** | Recessed section inside a card (e.g. a divider band, summary footer) |
| `background/brand/bg-brand-primary` | `--brand-primary` | `bg-brand-primary` | **Added** | Primary brand-colored surface |
| `background/brand/bg-brand-secondary` | `--brand-secondary` | `bg-brand-secondary` | **Added** | Secondary brand-colored surface |
| `background/component/bg-button-primary` | `--primary` | `bg-primary` | shadcn | Primary button background |
| `background/component/bg-button-secondary` | `--secondary` | `bg-secondary` | shadcn | Secondary button background |
| `background/component/bg-button-destructive` | `--destructive` | `bg-destructive` | shadcn | Destructive button background |
| `background/component/bg-active-state-accent` | `--accent` | `bg-accent` | shadcn | Hover/focus background on neutral interactive items (menu options, select rows, command palette entries). **Not for brand emphasis.** |
| `background/component/bg-popover` | `--popover` | `bg-popover` | shadcn | Popover and tooltip background |
| `background/status/bg-status-success` | `--success` | `bg-success` | **Added** | Success state surface |
| `background/status/bg-status-warning` | `--warning` | `bg-warning` | **Added** | Warning state surface |
| `background/status/bg-status-error` | `--error` | `bg-error` | **Added** | Error state surface |
| `background/sidebar/bg-sidebar-default` | `--sidebar` | `bg-sidebar` | shadcn | Default sidebar background |
| `background/sidebar/bg-sidebar-brand` | `--sidebar-primary` | `bg-sidebar-primary` | shadcn | Sidebar branded/primary area |
| `background/sidebar/bg-sidebar-active` | `--sidebar-accent` | `bg-sidebar-accent` | shadcn | Active or hovered sidebar item |

### Border — outlines, dividers, and strokes

| Figma name | shadcn CSS variable | Tailwind utility | Status | Use case |
|---|---|---|---|---|
| `border/default/bd-primary` | `--border` | `border-border` | shadcn | Default component borders, dividers |
| `border/default/bd-secondary` | `--border-secondary` | `border-secondary` | **Added** | Lower-emphasis border — table row dividers, subtle separators |
| `border/component/bd-input-button` | `--input` | `border-input` | shadcn | Borders on inputs and outline buttons |
| `border/focus-ring/bd-focus-default` | `--ring` | `ring-ring` | shadcn | Default focus ring color |
| `border/focus-ring/bd-focus-offset` | `--ring-offset` | `ring-offset` | shadcn | Focus ring offset color (gap between element and ring) |
| `border/sidebar/bd-sidebar-primary` | `--sidebar-border` | `border-sidebar-border` | shadcn | Sidebar borders and dividers |
| `border/sidebar/bd-focus-default` | `--sidebar-ring` | `ring-sidebar-ring` | shadcn | Focus ring color inside the sidebar |

### Charts — data visualization colors

| Figma name | shadcn CSS variable | Tailwind utility | Status | Use case |
|---|---|---|---|---|
| `charts/chart-1` | `--chart-1` | `fill-chart-1` / `bg-chart-1` | shadcn | First categorical color in charts |
| `charts/chart-2` | `--chart-2` | `fill-chart-2` / `bg-chart-2` | shadcn | Second categorical color |
| `charts/chart-3` | `--chart-3` | `fill-chart-3` / `bg-chart-3` | shadcn | Third categorical color |
| `charts/chart-4` | `--chart-4` | `fill-chart-4` / `bg-chart-4` | shadcn | Fourth categorical color |
| `charts/chart-5` | `--chart-5` | `fill-chart-5` / `bg-chart-5` | shadcn | Fifth categorical color |

---

## Philosophy and conventions

### Why the restructure

shadcn's default token system mixes two orthogonal concepts: *role* (primary, secondary, destructive) and *application* (background vs foreground). The pairing convention is implicit — you have to know that `primary` means "background or fill" and `primary-foreground` means "text/icon on top of primary."

Splitting Figma tokens into three explicit groups (`foreground/`, `background/`, `border/`) makes the application layer obvious. Designers no longer guess whether a token is meant for text or for fill. The subgroups then carry the role information: `default`, `brand`, `component`, `status`, `sidebar`, `focus-ring`.

The code layer keeps the original shadcn names because:

- shadcn's component library, registry installs (`npx shadcn add ...`), and AI tooling all assume the standard names
- Deviating from shadcn naming in code creates ongoing friction with every component install and every AI-assisted code generation
- The mapping is cheap to maintain in this document; renaming variables in code would require touching every component

### How to read a Figma token name

`background/component/bg-button-primary` reads as:

- **`background/`** — this token sets a background fill
- **`component/`** — it's scoped to a specific UI component (not a default surface or status)
- **`bg-button-primary`** — it's the primary button's background

The redundant `bg-` prefix on the leaf is intentional: when a token is referenced outside its group (in component documentation, design specs, etc.), the leaf alone still tells you what it is.

### Token group meanings

**`default/`** — Foundational tokens used across the entire UI. Page background, body text, default borders. These are the tokens you reach for first when nothing more specific applies.

**`brand/`** — Brand-colored surfaces and text. Used for marketing moments, brand emphasis, and branded UI elements. Not for general buttons or interactive states.

**`component/`** — Tokens scoped to specific UI components (buttons, popovers, active-state hovers). When a component has distinctive styling that doesn't generalize, its tokens live here.

**`status/`** — Semantic state colors: success, warning, error. Used in alerts, notifications, validation messages, and status indicators. Note that `error` is distinct from `button-destructive` — error is for state communication, destructive is for buttons that perform destructive actions.

**`sidebar/`** — Sidebar has its own complete token set (foreground, background, border) because it often uses a distinct color scheme from the main content area. Treat it as a parallel theme within the system.

**`focus-ring/`** — Focus indicators. Separate from regular borders because focus rings are offset rings, not layout-affecting borders.

### `accent` vs `muted`

These look similar in default themes but serve different purposes:

- **`bg-muted-soft`** (shadcn `muted`) — Static low-emphasis surfaces. A section that's secondary, a code block background, a disabled-looking area.
- **`bg-active-state-accent`** (shadcn `accent`) — Interactive low-emphasis feedback. The moment of hover or focus on a selectable item (dropdown options, command palette entries).

Despite similar default values, do not collapse them. `muted` is passive; `accent` is active feedback. They should be themeable independently.

### `error` vs `destructive`

- **`bg-status-error`** — Communicates an error state (form validation, failed requests, alert banners). Sits on the page alongside other content.
- **`bg-button-destructive`** — The action color for buttons that delete or destroy. Applied to interactive elements the user clicks.

A destructive button on an error toast would use `bg-button-destructive` for the button itself and `bg-status-error` for the toast background.

---

## Example: building a component

When implementing a primary card from Figma:

| Figma layer | Figma token | Code |
|---|---|---|
| Card fill | `background/default/bg-card` | `className="bg-card"` |
| Card border | `border/default/bd-primary` | `className="border border-border"` |
| Headline text | `foreground/default/fg-card-headline` | `className="text-card-foreground"` |
| Body text | `foreground/default/fg-secondary` | `className="text-muted-foreground"` |
| Primary button fill | `background/component/bg-button-primary` | `className="bg-primary"` |
| Primary button text | `foreground/component/fg-button-primary` | `className="text-primary-foreground"` |
| Button on hover | (Figma uses opacity layer) | `className="hover:bg-primary/90"` |

Hover, focus, and opacity-modifier states are typically not represented as separate Figma tokens — they're encoded in code via Tailwind modifiers (`hover:`, `focus:`, `/90`). Designers should show the resulting visual state in Figma but rely on developers to apply the correct modifier.

---

## Adding new tokens

When adding a new token to the system:

1. **Check if an existing token works.** If `border/default/bd-secondary` is close enough, don't add `border/default/bd-tertiary` just because the value differs slightly. Tier sprawl is the biggest risk in this system.

2. **Add parallel tokens across groups.** If you add `background/brand/bg-brand-tertiary`, also add `foreground/brand/fg-brand-tertiary` if text will ever appear on it. Gaps in pairing cause accessibility regressions.

3. **Add the corresponding CSS variable in code.** Update `globals.css` with both light and dark mode values, and add the utility to `tailwind.config.js` so the class is available.

4. **Document the use case in this file.** Every token needs a one-sentence "use this when..." description. If you can't write one that distinguishes it from existing tokens, don't add it yet.

5. **Update both modes simultaneously.** Never add a token in light mode without defining its dark mode value (or explicitly noting it's mode-agnostic).

---

## For AI coding tools — quick reference

The full automation contract is at the top of this file. In short:

- Translate Figma token names to shadcn variables using the mapping table
- Auto-add missing **Added** tokens to `globals.css` and `tailwind.config.js` without asking
- Never rename or restructure existing shadcn CSS variables
- Stop and ask the user if a Figma token doesn't appear in the mapping table
