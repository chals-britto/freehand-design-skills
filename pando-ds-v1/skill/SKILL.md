---
name: pando-ds-v1
description: Pando DS V1 — the full V1 design system (tokens + reviewed components) for building any V1 prototype, screen or component without screenshots. Use whenever a build mentions V1, Pando, Old DS, FAP DS, Procure DS, or a Figma link from the "DS V2 – Atoms / Molecules / Organisms" files (S21sFFHjfc3XvGDAAYvA49, rd3gmPnjhPo1d2GAlNSJOn, fYULgtmiblAXtbHsoVL1Yf — named V2 but they are V1). Do NOT use for V2 / Studio / Freehand studio team / New DS for Freehand (orange) — that lives in the freehand-studio code.
---

# Pando DS V1

One skill for the whole V1 design system. It grows as components pass review.
Source of truth: the `pando-ds-v1/` folder of the **freehand-design-skills** repo (`/Users/Charles-Pando/Documents/Claude Code/freehand-design-skills/pando-ds-v1`).
Living library (for people): https://claude.ai/artifact/GwQoWeEqK3NnC5tpVEMjMB

## Which design system?
| Charles says | Use |
|---|---|
| V1, Pando, Old DS, FAP DS, Procure DS | **this skill** |
| V2, Studio, Freehand studio team, New DS for Freehand | freehand-studio repo code (orange #fe6301), not this skill |
If it's unclear which, ask before building.

## Before building anything
1. Read `tokens.css` (repo root). It has two colour layers: palette (`--pando-*`, `--status-*`, …) and **roles** (`--color-*`). **Build with roles**; use palette only where no role fits.
2. For every component on the screen, check the table below.
   - **In the kit** → read its `components/<name>.md` and reuse `components/<name>.css` / `.js` exactly. Don't re-derive it from Figma or screenshots.
   - **Not in the kit yet** → read that piece from Figma through the Figma MCP (`get_design_context` / `use_figma` read-only; read canvas text, never trust layer names — they are stale in these files). Use only kept tokens. Tell Charles which parts came from Figma rather than the kit.
3. Typography: Open Sans via the `.type-*` classes (`.type-14-semibold`, `.type-12-regular`, …) plus `.caps` for ALL CAPS. Colour always comes from a colour role, never from the type class.
4. Shadows: `--shadow-1` … `--shadow-4`. Spacing: only measured values exist so far (`--space-2/10/12/15`, `--radius-12`); for anything else, measure from Figma and say so.
5. Follow the `build-rules` skill (confirm-before-build, Artifact output, desktop-only, no invented copy).

## Components in the kit
**Everything in the three V1 Figma files is built** (2026-10-28): 20 Atoms, 40 Molecules, 15 Organisms. The authoritative list — id, name, level, status and **synonyms (`aka`)** — is **`components/registry.js`**; read it to find a component. When Charles uses another name (dialog, pop-up, chip, drawer, snackbar, text field…), match it against `aka` (same logic as `components/search.js`); the full synonym list with sources is `review/synonyms.md`. For each id there is:
- `components/<id>.md` — read this first: variants with exact values + tokens, anatomy, behaviour, usage, accessibility, **Open issues**, Not adopted.
- `components/<id>.css` (+ `<id>.js` if interactive, exposing `window.pds<Name>`) — reuse these exactly; molecules/organisms already compose the atoms.
- `components/<id>.html` — the live spec page.

Rules:
- Build screens by composing kit components (e.g. page shell = `side-nav` + `top-header` + `subheader`; data = `table` / `list`; overlays = `modal` / `slideout` / `toast`). Never re-derive a kit component from Figma or screenshots.
- Status "Reviewed" = Charles approved it; "As in Figma" = built without review — check its Open issues and tell Charles when a choice depends on one.
- Some pages carry a Figma-status notice (OLD, To BE REVIEWED, built from loose frames, legacy, two sets — pick one). Prefer the current/primary option and say so.
- Icons: 432 SVGs, manifest `components/icons/icons-data.js` (look up by Figma name). Brand: `components/brand/*.svg`. Empty-state art: `components/empty-state/`. Loaders: `components/loader/`.
- Alerts: the Figma page is empty — use Toast or Callout (`badge`) and ask.
- **Pop-ups (dialogs, confirmations, results): always the kit `modal`** — 350 fixed, heading + 12px message, detail in the `#EEF2F4` slot (`.pds-modal__slot--content`), Cancel + action or one primary. No wider custom dialogs, coloured callouts, KPI tiles or tables inside. See `components/modal.md` › Do / Don't.
- **Pop-ups (dialogs, confirmations, results): always the kit `modal`** — 350 fixed, heading + 12px message, detail in the `#EEF2F4` slot (`.pds-modal__slot--content`), Cancel + action or one primary. No wider custom dialogs, coloured callouts, KPI tiles or tables inside. See `components/modal.md` › Do / Don't.
- Anything genuinely not in the kit: read it from Figma via the MCP, build it from kit tokens, and tell Charles it's outside the kit.

## Page layout: what stays put (Charles, 19 Nov 2026 — apply by default, don't ask)
| Page | Subheader variant | Sticky (never scrolls) | Scrolls |
|---|---|---|---|
| **List page** | Main: menu · title ▾ · search · CTAs | Top Header (branding) · Subheader · filter bar · list column headings | the rows only |
| **Detail page** | Breadcrumb: breadcrumb (ID - name · info · status) · CTAs — no menu icon | Top Header · Subheader · Tab row | the tab panel; in a two-column panel (e.g. details | version history) each half scrolls on its own |

Build it as a fixed shell: the page is a 100vh flex column, the sticky parts are `flex: none`, and the scroll area is `flex: 1; min-height: 0; overflow-y: auto`. A page with no tab row keeps Top Header + Subheader sticky.

## Shipping kit code inside an Artifact
Artifacts can't reach local files. Either inline the CSS/JS from the repo into the page, or publish them as supporting `files` (e.g. `tokens.css`, `components/toast.css`) and link them relatively. Never retype values by hand.

## Known open items (don't "fix" silently)
- Accessibility pass is deferred: several pairs fail contrast (see the library's Contrast pairs table). Keep Figma values until Charles runs the pass.
- 10 palette colours have no role (no usage in Figma) — ask before giving them one.
- AI + Branding Core Colors not yet extracted (needs a frame link).
- Focus ring, motion tokens, data-viz palette: Later. Dark theme: not needed.

## Adding or changing a component (the review loop)
1. Read the Figma page (read-only `use_figma` inventory → `get_design_context` per node).
2. Research the same component in Carbon, Fluent 2, Ant Design, Material, Lightning, Apple HIG and WCAG; cite only pages actually read.
3. Publish a review board (template: `review/toast-review.html`, Light/Dark switch, Keep / Keep with changes / Outdated / Skip, sources on every claim).
4. Charles says “reviewed <name>” → read decisions from the board's db → build `components/<name>.*` from **kept items only** → add it to `index.html` and to the table above → commit locally. Push only when Charles says “push”.
