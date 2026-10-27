---
name: pando-ds-v1
description: Pando DS V1 — the full V1 design system (tokens + reviewed components) for building any V1 prototype, screen or component without screenshots. Use whenever a build mentions V1, Pando, Old DS, FAP DS, Procure DS, or a Figma link from the "DS V2 – Atoms / Molecules / Organisms" files (S21sFFHjfc3XvGDAAYvA49, rd3gmPnjhPo1d2GAlNSJOn, fYULgtmiblAXtbHsoVL1Yf — named V2 but they are V1). Do NOT use for V2 / Studio / Freehand studio team / New DS for Freehand (orange) — that lives in the freehand-studio code.
---

# Pando DS V1

One skill for the whole V1 design system. It grows as components pass review.
Source of truth: the repo at **`/Users/Charles-Pando/Documents/Claude Code/pando-ds-v1`**.
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
All Atoms are built (2026-10-23). Each has `components/<id>.css` (+ `.js` if interactive), `<id>.md` (read this first), `<id>.html` (live spec page).

| Component | id | JS | Status |
|---|---|---|---|
| Toast | `toast` | `pdsToast` | Reviewed |
| Buttons | `button` | `pdsButton` | Reviewed (Batch A) |
| Inputs | `input` | `pdsInput` | Reviewed (Batch A) |
| Dropdown | `dropdown` | `pdsDropdown` | Reviewed (Batch A) — closed trigger = Inputs › Dropdown Select |
| Checkbox | `checkbox` | `pdsCheckbox` | Reviewed (Batch A) |
| Radio Buttons | `radio` | native | Reviewed (Batch A) |
| Toggle (switch, toggle tab, icon tab) | `toggle` | `pdsToggle` | As in Figma |
| Range (3 slider sets — ask which) | `range` | `pdsRange` | As in Figma |
| Accordion | `accordion` | `pdsAccordion` | As in Figma |
| Breadcrumb | `breadcrumb` | — | As in Figma |
| Badges, Callout, Ribbon | `badge` | — | As in Figma |
| Avatars | `avatar` | — | As in Figma |
| Tags | `tag` | — | As in Figma |
| Status | `status` | — | As in Figma |
| Tooltips | `tooltip` | `pdsTooltip` | As in Figma (Text, Custom Content, Map Tracking) |
| Icons (430) | `icons` | manifest `components/icons/icons-data.js`, files `components/icons/*.svg` | As in Figma |
| Scrollbar | `scrollbar` | — | As in Figma |

Alerts: Figma page is empty — use Toast or Callout (`badge`) and ask.
"As in Figma" pages have an **Open issues** section; respect it and don't silently fix. Not built yet: Molecules, Organisms (read from Figma when needed). Gaps in Atoms: see `review/atoms-audit.md`.

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
