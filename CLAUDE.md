# CLAUDE.md

This file tells Claude how this project works. Read it at the start of any task.

---

## Design token architecture

In this project `globals.css` is the code source of truth,
`design-tokens.md` is the Figma ↔ CSS ↔ shadcn mapping, and Claude reads
Figma values live via the Figma MCP server when needed.

We do NOT use Style Dictionary, a `tokens.json` export, or any build pipeline
that generates `globals.css`. `globals.css` is hand-maintained (by Claude or human).

When a token value changes in Figma:
1. Read `design-tokens.md` for the mapping
2. Update the brand/semantic token in `globals.css` at the `:root` layer
3. shadcn-named tokens (e.g., `--primary`) are aliased to brand tokens
   via `var()`, so they update automatically
4. Never duplicate values across `globals.css` and a JSON file

When asked to "sync tokens from Figma," use the Figma MCP server to read
current variable values, compare to `globals.css`, and report or update
discrepancies.
