# Design System Project Setup Guide

**End goal:** A Next.js project running locally and on GitHub with Figma variables and CSS tokens in 1:1 alignment, ready for pixel-perfect component implementation with Claude Code.

**Time to complete:** ~60–90 minutes  
**Prerequisites:** Node.js 18+, Git, a GitHub account, Claude Code with Figma MCP enabled

---

## Before you start — files to copy from the reference project

You need two files from the reference project. Place them in the root of your new project before running any Claude commands.

| File | What it does |
|---|---|
| `CLAUDE.md` | Tells Claude Code how this project works — token architecture, design implementation rules, and the `update variables` command workflow |
| `design-tokens.md` | Maps Figma variable path names (e.g. `colors/primary-light`) to CSS variable names in `globals.css`. Claude reads this during every variable sync. |

> **Important:** `design-tokens.md` must be updated to reflect your project's Figma variable names if they differ from the reference project. The logic (how Claude uses the file) stays identical.

---

## Step 1 — Create the Next.js project

```bash
npx create-next-app@latest your-project-name
```

When prompted, select:

| Prompt | Answer |
|---|---|
| TypeScript | Yes |
| ESLint | Yes |
| Tailwind CSS | Yes |
| `src/` directory | No |
| App Router | Yes |
| Turbopack | Yes |
| Import alias | `@/*` (default) |

```bash
cd your-project-name
npm run dev
```

**✅ Verify:** `http://localhost:3000` loads the default Next.js page without errors.

---

## Step 2 — Upgrade to Tailwind v4

create-next-app ships with Tailwind v3. v4 is required for the `@theme inline` pattern that powers the token architecture.

### 2a. Install v4 packages

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
```

### 2b. Replace `postcss.config.mjs`

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 2c. Delete `tailwind.config.ts`

Tailwind v4 reads all configuration from `globals.css` via `@theme inline`. The config file is no longer used.

```bash
rm tailwind.config.ts
```

### 2d. Replace `app/globals.css`

Replace the entire file with the `globals.css` from the reference project (see Step 3 for the structure explanation). Do this now so Tailwind v4 has a valid entry point.

**✅ Verify:** `npm run dev` starts without errors. Tailwind utility classes like `bg-background` and `text-foreground` resolve correctly in the browser.

---

## Step 3 — Understand the token architecture (do not skip)

`globals.css` is the single source of truth for all design tokens. It has three layers:

```
Layer 1 — Primitives      Layer 2 — Theme pairs         Layer 3 — Mode
─────────────────────     ───────────────────────────   ──────────────────────
--neutral-950        →    --background-light        →   --background
--indigo-600              --background-dark              (used in component code)
(raw palette, OKLCH)      (always both defined)         (:root = light, .dark = dark)
```

**Layer 1** — Raw Tailwind palette values as OKLCH CSS variables. Source of truth: the Figma "Tailwind CSS" variable collection. Never reference these directly in components.

**Layer 2** — Every semantic concept has a `-light` and `-dark` variable, both defined in `:root`. Each references a Layer 1 primitive. Never reference these in components.

**Layer 3** — Component-facing variables (`--primary`, `--background`, etc.). `:root` maps each to its `-light` Layer 2 var; `.dark` maps each to its `-dark` var. **Only Layer 3 vars are used in component code and Tailwind utilities.**

> The `@theme inline { }` block at the top of `globals.css` maps Layer 3 CSS variables to Tailwind utility names (e.g. `bg-primary`, `text-foreground`). Do not remove or rename entries here.

**✅ No action needed here** — this step is context for Steps 7 and beyond.

---

## Step 4 — Register custom fonts

### 4a. Add font files

Create `app/fonts/` and add your project's font files. For each font family you need:
- One file per weight/style combination for static fonts (`.otf`, `.ttf`, `.woff2`)
- Or a single variable font file (`.ttf`) if available

Reference project fonts:
- `PPNeueCorp-TightVariable.ttf` — display/headline font
- `Maison Neue Book.otf` (weight 400)
- `Maison Neue Demi.otf` (weight 600)
- `Maison Neue Bold.otf` (weight 700)

### 4b. Register in `app/layout.tsx`

```tsx
import localFont from 'next/font/local'

const ppNeueCorp = localFont({
  src: './fonts/PPNeueCorp-TightVariable.ttf',
  variable: '--font-pp-neue-corp-tight',
})

const maisonNeue = localFont({
  src: [
    { path: './fonts/Maison Neue Book.otf',  weight: '400', style: 'normal' },
    { path: './fonts/Maison Neue Demi.otf',  weight: '600', style: 'normal' },
    { path: './fonts/Maison Neue Bold.otf',  weight: '700', style: 'normal' },
  ],
  variable: '--font-maison-neue',
})
```

Add both variables to the `<body>` tag in the same file:

```tsx
<body className={`${ppNeueCorp.variable} ${maisonNeue.variable} antialiased`}>
```

> Name the `variable` property to match the font's actual name (e.g. `--font-maison-neue`). This becomes the CSS custom property you reference in Tailwind utilities: `font-[family-name:var(--font-maison-neue)]`.

### 4c. Add font mappings to `@theme inline` in `globals.css`

Inside the `@theme inline { }` block, add an entry for each font:

```css
@theme inline {
  /* ... existing tokens ... */
  --font-pp-neue-corp-tight: var(--font-pp-neue-corp-tight);
  --font-maison-neue: var(--font-maison-neue);
}
```

**✅ Verify:** Add a test element with `font-[family-name:var(--font-pp-neue-corp-tight)]` — it should render in the display font.

---

## Step 5 — Set up Claude Code with the Figma MCP server

Claude Code uses the Figma MCP server to read design context and live variable values from Figma.

### 5a. Enable the Figma MCP plugin in Claude Code

1. Open Claude Code
2. Go to **Settings → Extensions** (or the MCP section)
3. Enable the **Figma** MCP server
4. Restart Claude Code if prompted

### 5b. Verify the connection

Open a Claude Code session in your project and ask:

> _"Can you call get_metadata on this Figma file: [paste any Figma design URL]?"_

If the tool returns layer/node information, the MCP is connected. If it says the tool isn't available, revisit Step 5a.

---

## Step 6 — Place `CLAUDE.md` and `design-tokens.md` in the project root

Copy both files from the reference project into the root of your new project (same level as `package.json`).

**`CLAUDE.md`** is automatically read by Claude Code at the start of every session. It contains:
- The `update variables` command definition (how Claude syncs Figma → CSS)
- The pixel-perfect Figma implementation protocol (rules Claude follows when you share a Figma URL)
- The no-hardcoded-values rule and component update rules

**`design-tokens.md`** is read by Claude during `update variables` to map Figma variable paths to CSS variable names. If your Figma file uses different variable names than the reference project, update the mappings in this file accordingly. The structure and logic stay the same — only the names change.

> If you are starting a brand-new Figma file, create variables in Figma that match the token names already in `design-tokens.md`. This is easier than updating all the mappings.

---

## Step 7 — Sync Figma variables into `globals.css`

This step writes the actual colour and token values from Figma into your `globals.css`, achieving the 1:1 alignment.

### 7a. Find your Figma variable collection node IDs

You need the node IDs for two collections in your Figma file:

| Collection | What it maps to | How to get the node ID |
|---|---|---|
| **Tailwind CSS** (primitives) | Layer 1 in `globals.css` | In Figma, click the frame/table that shows the raw palette. Copy the `node-id` from the URL. |
| **Mode** (theme pairs + applied mode) | Layers 2 + 3 in `globals.css` | Click the Mode variables frame. Copy the `node-id` from the URL. |

Update the "Figma collection → code mapping" table in `CLAUDE.md` with these node IDs for your project.

### 7b. Run `update variables` for the Mode collection (Layer 2 + 3)

In a Claude Code session:

```
update variables https://www.figma.com/design/[file-key]/[file-name]?node-id=[mode-node-id]
```

Claude will:
1. Read `design-tokens.md` to load the token path → CSS variable mappings
2. Call `get_variable_defs` on the Figma node
3. Compare every Figma variable value against the current CSS value
4. Show a diff table:
   - ✅ Tokens with no change
   - 🔴 Tokens that differ — shows current value vs. new Figma value
5. **Wait for your confirmation** before writing anything

Review the diff and type `apply` to write the changes. Claude will convert hex values to OKLCH automatically.

### 7c. Repeat for the Tailwind CSS collection (Layer 1)

```
update variables https://www.figma.com/design/[file-key]/[file-name]?node-id=[tailwind-css-node-id]
```

Same workflow — review the diff, then `apply`.

**✅ Verify:** Run `npm run dev`. Open the stylesheet documentation pages (if set up) or create a quick test page with `<div class="bg-primary text-primary-foreground p-4">Test</div>`. The colour should match the primary colour in your Figma file exactly.

---

## Step 8 — Protect secrets and push to GitHub

### 8a. Add `.claude/` to `.gitignore`

The `.claude/` directory stores local Claude Code settings that may contain your Figma and Anthropic API tokens. Add it to `.gitignore` **before your first push**:

```
# Claude local settings (may contain API tokens)
.claude/
```

> If you forget this and push first, GitHub's secret scanning will block the push. Fix it by running `git filter-branch --force --index-filter 'git rm -r --cached --ignore-unmatch .claude/' --prune-empty --tag-name-filter cat -- --all`, then force-push. Then rotate your API tokens.

### 8b. Create a GitHub repository

Go to [github.com/new](https://github.com/new), create a new **empty** repository (no README, no .gitignore — your project already has both).

### 8c. Connect and push

```bash
git remote add origin https://github.com/[username]/[repo-name].git
git branch -M main
git push -u origin main
```

**✅ Verify:** The repository appears on GitHub with all your project files.

---

## Step 9 (optional) — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. Vercel auto-detects Next.js — click **Deploy** (no config needed)
3. Once live, go to **Settings → Deployment Protection** → set to **Disabled** so the link works without a Vercel login
4. To make the root URL redirect to your main page, add to `next.config.mjs`:

```js
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/your-main-page', permanent: false },
    ]
  },
}
export default nextConfig
```

Push the change — Vercel redeploys automatically on every `git push`.

---

## What you have at this point

| | Deliverable |
|---|---|
| ✅ | Next.js + Tailwind v4 running locally |
| ✅ | Three-layer CSS token architecture in `globals.css` |
| ✅ | Custom fonts registered and available as CSS variables |
| ✅ | CSS variables in 1:1 alignment with Figma variable collections |
| ✅ | Claude Code configured with project rules and token mappings |
| ✅ | Git repo on GitHub with API tokens excluded |
| ✅ | (optional) Live Vercel deployment, publicly accessible |

---

## Day-to-day workflows

### Implementing a Figma design

Share a Figma node URL with Claude Code:

> _"Implement this design: https://www.figma.com/design/[file-key]/...?node-id=[node-id]"_

Claude follows the pixel-perfect protocol defined in `CLAUDE.md` — calls `get_metadata` first, then `get_design_context` section by section, extracts all values before writing code, and verifies against a screenshot.

### Keeping variables in sync after a Figma update

Whenever a designer changes variables in Figma, run the `update variables` command again:

```
update variables [figma-url-with-node-id]
```

Claude always shows a diff before making any changes. You confirm, then it writes.

### Adding a new component

After building any new component or UI pattern, document it in the stylesheet at `/app/stylesheet/`. See the "Component and pattern documentation rule" in `CLAUDE.md` for the required format. This keeps the design system docs in sync with the codebase.
