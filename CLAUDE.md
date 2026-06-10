# CLAUDE.md

This file tells Claude how this project works. Read it at the start of any task.

---

## Figma collection links

These are the three Figma variable collections for this project. Always use these when running "update variables" unless the user provides a different link explicitly.

| Layer | Collection | Figma link |
|---|---|---|
| Layer 1 — Primitives | Tailwind CSS | https://www.figma.com/design/XRJX5AmcwXFSFOMC8YmYtF/shadcn-ui-kit-Claude-test?node-id=24098-51154 |
| Layer 2 — Theme pairs | Mode (theme pairs) | https://www.figma.com/design/XRJX5AmcwXFSFOMC8YmYtF/shadcn-ui-kit-Claude-test?node-id=24065-332103 |
| Layer 3 — Mode | Mode (applied mode) | https://www.figma.com/design/XRJX5AmcwXFSFOMC8YmYtF/shadcn-ui-kit-Claude-test?node-id=24065-332143 |

> If any of these links still say `FIGMA_LINK_LAYER_*`, ask the user to provide the correct Figma URL for that collection before proceeding.

---

## "Update variables" command

When the user says **"update variables"**:

- **If no Figma link is provided** — run the sync for all three collections above in order (Layer 1 → Layer 2 → Layer 3), using the stored links in the table above.
- **If a specific Figma link is provided** — run the sync only for that link.
- **If any stored link is still a placeholder** (`FIGMA_LINK_LAYER_*`) — stop and ask the user to provide the missing link(s) before doing anything else.

For each collection being synced:

1. Read `design-tokens.md` to load the current mappings and values.
2. Call `get_variable_defs` on the node ID from the Figma link.
3. Compare every returned Figma variable against its corresponding CSS variable value in `globals.css`.
4. **Before making any changes**, present a clear diff table showing:
   - ✅ Tokens with no change
   - 🔴 Tokens that differ (token path · CSS variable · current value · new Figma value)
5. **Wait for explicit user confirmation** ("yes", "apply", etc.) before touching any file.
6. Once confirmed, convert new hex values to OKLCH and update `globals.css` — both `:root` (light) and `.dark` (dark) blocks. For dark mode, lighten the value slightly when appropriate (e.g. a brand color used on dark surfaces).
7. Update any descriptive comments in `design-tokens.md` that reference the old value.
8. Proceed to the next collection only after the user confirms or skips the current one.

Never skip the confirmation step, even if the diff looks trivial.

---

## How to read a Figma variable node

Each variable in the "Mode" collection is a single row with a name and two values (light and dark). When calling `get_design_context` on a variable node, look for the layer named **`variable-value`** — that is the only layer that matters for the color value.

There are two patterns:

**1. Mode variable → references a Theme variable**
The `variable-value` layer's background is set to a CSS variable reference like `var(--colors/primary-light, #4f46e5)`. The text label next to it shows the Theme variable name (e.g. `colors/primary-light`). Use that Theme variable name to trace back to the Layer 2 pair in `globals.css`.

**2. Alpha variable → direct hex + opacity**
The `variable-value` layer shows a raw hex (e.g. `4F46E5`) and a separate transparency percentage (e.g. `10 %`). Combine them as `rgba(hex, opacity)` or the OKLCH equivalent. Both light and dark columns must be read individually — they may differ.

Always read both the light and dark `variable-value` layers before writing any value to `globals.css`.

---

## Three-layer token architecture

`globals.css` is the code source of truth. No Style Dictionary, no
`tokens.json`, no build pipeline. The file is hand-maintained and maps
directly to the Figma variable collections.

### The three layers

```
Layer 1 — Primitives   →   Layer 2 — Theme pairs   →   Layer 3 — Mode
--neutral-950               --background-light              --background
--indigo-600                --background-dark               (component code uses this)
(raw Tailwind palette)      (static -light/-dark pairs)     (:root = light, .dark = dark)
```

**Layer 1 — Primitives** (`globals.css` first `:root` block)
- Raw Tailwind palette values as CSS variables: `--neutral-50`, `--indigo-600`, etc.
- Written in OKLCH with the hex comment alongside: `oklch(0.511 0.234 277);  /* #4F46E5 */`
- Source of truth: Figma **"Tailwind CSS"** table, node 24098-51154.
- **Never reference these in component code or Tailwind utilities.**
- Only used inside Layer 2 definitions via `var(--indigo-600)`.

**Layer 2 — Theme pairs** (`globals.css` second `:root` block)
- Every semantic concept has two independent variables: `--primary-light` and `--primary-dark`.
- Both are defined in `:root` — they are always accessible regardless of active mode.
- Each references a Layer 1 primitive: `--primary-light: var(--indigo-600)`.
- Alpha tokens (border, status bg, input-dark) use inline `oklch(... / %)` when no matching primitive exists.
- Source of truth: Figma **"Mode"** variable collection, node 24065-332103.
- **Never reference `-light` / `-dark` vars in component code.**

**Layer 3 — Mode** (`globals.css` third `:root` block + `.dark`)
- Component-facing variables with standard shadcn names: `--primary`, `--background`, etc.
- `:root` resolves each to its `-light` Layer 2 var: `--primary: var(--primary-light)`.
- `.dark` resolves each to its `-dark` Layer 2 var: `--primary: var(--primary-dark)`.
- **This is the only layer component code and Tailwind utilities (`bg-primary`, `text-foreground`) should use.**

### Figma collection → code mapping

| Figma collection         | Node            | Maps to                        |
|--------------------------|-----------------|--------------------------------|
| Tailwind CSS (primitives)| 24098-51154     | Layer 1 `:root` block          |
| Mode (theme pairs)       | 24065-332103    | Layer 2 `:root` block          |
| Mode (applied mode)      | 24065-332143    | Layer 3 `:root` + `.dark`      |

> For a new project, replace the node IDs above and the links in the "Figma collection links" section at the top of this file with your own Figma file's values.

### How to add a new primitive colour

1. Get the Tailwind name and hex from Figma node 24098-51154.
2. Convert hex to OKLCH (use a converter — never guess the value).
3. Add to Layer 1 in `globals.css`: `--amber-600: oklch(0.703 0.175 51);  /* #D97706 */`
4. Reference it from Layer 2: `--primary-light: var(--amber-600)`.

### How to update an existing token value

Follow the "Update variables" command workflow (see above). Always derive OKLCH
from the Figma primitives table — never hardcode a guessed OKLCH value.

### Design system stylesheet pages

The three-layer architecture is documented live in the stylesheet:
- `/app/stylesheet/design-system/theme/page.tsx` — Layer 1 (Primitives) + Layer 2 (Theme pairs)
- `/app/stylesheet/design-system/mode/page.tsx` — Layer 3 (Mode variables)

After any change to `globals.css`, verify the swatches on these pages still resolve correctly.

---

## Pixel-perfect Figma-to-code protocol

**This is the most important section in this file. These rules are
non-negotiable and apply to every Figma implementation task, no matter how
simple it looks. Pixel-perfect fidelity is always preferred over speed.**

---

### Mandatory workflow — follow this order every time

**Step 1 — Map the structure**
Call `get_metadata` on the page frame to get the list of top-level layer
names and their node IDs. Never skip this step — it reveals the wrapper
hierarchy (e.g. `Main Wrapper` → `Main`) that controls layout, background,
radius, and shadow.

**Step 2 — Call get_design_context section by section**
Take the node IDs from Step 1 and call `get_design_context` on each
top-level section individually, in order:
- layout shells first (page wrapper, main wrapper, main frame)
- then navigation (sidebar, top bar)
- then content sections (cards, chart, table, etc.)

Process each section fully before moving to the next. Never batch multiple
sections into one call.

**Step 3 — Extract all values before writing any code**
For every section, parse the returned `className` strings and write down:
- Background colour and whether it inherits or is explicit
- Border radius, border colour, border width
- Shadow (exact values)
- Padding, gap, margin
- Font size, weight, line height
- Colour token names (e.g. `var(--background/default/bg-default)`)
- Overflow, flex/grid behaviour

Only after all values are extracted for a section may you write its code.

**Step 4 — Write section by section**
Implement each section using only the values extracted in Step 3. No
carrying values over from memory or from a previous project.

**Step 5 — Verify structure before moving on**
After each section is written, re-read the extracted values and confirm the
code matches. Then proceed to the next section.

---

### Rule 1 — NEVER call get_design_context on a full page frame

A full-page frame returns 100 KB+ of data. Claude cannot fully process that
volume — values get missed and assumptions creep in to fill the gaps. This
is what causes wrong backgrounds, missing wrappers, wrong radii, and
incorrect shadows.

**Always use get_metadata first to get section node IDs, then call
get_design_context once per section.**

If a section call still returns too much data (> ~40 KB), break that section
into its sub-nodes and call get_design_context on each sub-node.

### Rule 2 — Extract before you write

Before writing any component, parse the returned `className` strings and note:
- Font size, weight, line height
- Colour token (e.g. `var(--foreground/sidebar/fg-sidebar-primary)`)
- Spacing (padding, gap, margin)
- Border radius, border width, border colour
- Text transform, letter spacing
- Background, shadow

Only then write the code. Never carry over a value from memory or habit.

### Rule 3 — Layer names reveal component and icon identity

Every node in the design context has a `data-name` attribute with the exact
Figma layer name. Read these to identify:
- Which shadcn component is being used (e.g. `Tabs / Trigger`, `Sidebar / SidebarMenuButton`)
- Which icon is used (e.g. `Icon / PieChart`, `Custom Icon / Dashboard`)

Always read `data-name` values before choosing a component or icon.

### Rule 4 — No assumptions, ever

If a value is not present in the design context output, do not infer it from
convention or prior knowledge. Stop and ask the user instead.

Examples of forbidden assumptions:
- "Section labels are usually uppercase" → check the layer
- "This is probably a muted colour" → check the token name
- "This icon looks like X" → read the `data-name`
- "The page background is probably white" → check the root frame className
- "This wrapper probably has no padding" → check the layer

### Rule 5 — Layout shells come first

Always implement the outermost wrappers before any content. The most common
source of pixel-perfect failures is missing or wrong wrapper layers
(background, radius, shadow, padding) that only appear when you look at the
top-level structure in get_metadata before diving into content.

Example: `Main Wrapper` (margin shell) → `Main` (bg + radius + shadow) →
`Header` + content. If you start with the Header, you miss the shell.

### Rule 6 — Figma is the source of truth; it overrides every habit and convention

Before writing any element, ask: *"Am I writing this from what Figma shows,
or from what I know/expect?"* If there is any doubt, go back to the design
context. Familiar coding patterns are the most common source of pixel-perfect
failures — they feel correct without needing to be checked.

This applies especially to structural and decorative elements (separators,
dividers, borders, dots, badges) where a "standard" pattern exists in code
but may not match the design:

- **Count** — how many instances of this element does Figma show?
- **Position** — exactly where does each instance sit relative to its neighbours?

Never apply a default layout pattern (e.g. "separators go between items")
without confirming it from the design context first. If Figma shows a
separator before the first item and after the last item, the code must match
that exactly, even if the programming convention would only place them between.

Examples of forbidden convention-over-Figma substitutions:
- "Separators are usually between items, not on the edges" → count the nodes in Figma
- "This is a standard nav pattern" → verify every structural detail before writing
- "This component normally works this way" → treat every implementation as new

### Rule 7 — Background tokens must be looked up exactly in design-tokens.md

Never approximate a background token. When a Figma layer carries a token
path (e.g. `background/default/bg-muted-hard`), open `design-tokens.md` and
find the exact CSS utility that maps to it before writing any code.

Tokens with similar names have different values and are not interchangeable:
`bg-muted` ≠ `bg-muted-secondary` ≠ `bg-muted-hard`.

If the token path from Figma does not exist in `design-tokens.md` yet, stop
and add it first — do not substitute the nearest-sounding token.

---

## No hardcoded values rule

**Never hardcode a color, spacing, radius, shadow, or any other design value directly in component code.** Every value must reference a CSS variable from `globals.css` via a Tailwind utility or `var(--token-name)`.

This applies to all values — colors, opacities, sizes, borders, shadows — without exception.

If a required token does not yet exist in `globals.css` or `design-tokens.md`, **stop and ask the user** what token to use or whether a new one should be created. Do not substitute a hardcoded literal as a temporary measure.

Examples of forbidden patterns:
- `bg-white/50` → use a token like `bg-accent`
- `text-[#ef003b]` → use `text-primary`
- `border-[rgba(0,0,0,0.1)]` → use `border-border`
- `shadow-[0_2px_4px_black]` → define a shadow token first

The only exception is if the user explicitly instructs a hardcoded value for a specific reason.

---

## Component update rule

When updating an existing component, **never rewrite the component structure**.
Only change styling — colours, padding, border radius, sizes, shadows.
Keep the React structure, props, event handlers, and accessibility attributes
(aria-*, role, data-slot, etc.) identical to before.

If a structural change is genuinely required, stop and ask the user first.

---

## Component and pattern documentation rule

Every component or pattern that exists in this project **must** be documented
in the stylesheet at `/app/stylesheet/`. This is non-negotiable — the stylesheet
is the single source of truth for the design system. If it is not there, it does
not officially exist.

### When to document

Document immediately whenever you:
- Build a new component or pattern (even as a helper inside a page file)
- Introduce a new UI piece while implementing a Figma screen
- Modify an existing component's visual tokens in a way that changes its spec

Do not wait until a page is "done". As soon as a new component or composable
pattern is written, create its stylesheet entry and register it in the nav.
After completing any page, audit every component and pattern used and confirm
each one has a stylesheet entry — add any that are missing before considering
the task complete.

### Where to add

| What | Where |
|------|-------|
| Atomic / molecular UI piece (e.g. Button, Tabs, Badge, Toggle Group) | `app/stylesheet/components/<name>/page.tsx` |
| Composed layout pattern (e.g. Card wrapper, Sidebar, Data Table, Top Bar) | `app/stylesheet/patterns/<name>/page.tsx` |

### What each page must include

1. **`PageHeader`** — title + one-sentence description of the component/pattern
2. **Live preview** — a rendered example using the real component/classes
3. **Spec table** — every non-obvious token: height, padding, typography,
   colours, border, radius, shadow. Use `font-mono text-xs text-muted-foreground`
   for token values.
4. **Notes on invariants** — things that must never change (e.g. "card border
   is always rgba(10,10,10,0.1), never use border-border on a card").

### Nav registration

After creating the page, add an entry to
`app/stylesheet/_components/nav.tsx` under the correct section
(`Components` or `Patterns`). The nav is the single source of truth for
what is documented — if it is not in the nav, it does not exist.
