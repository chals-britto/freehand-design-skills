# Subheader Menu — Pando DS V1

**Status:** Built 2026-10-28 · no review file (every published item kept) · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟢 Subheader Menu (2263:700) — `Subheader Menu` (2263:3752, 1), `.Secondary menu items` (2263:947, 6 variants)
**Files:** `subheader-nav.css` (flyout, rows, component tokens) · `subheader-nav.js` (`pdsSubheaderNav.build` / `item`) · `subheader-nav.html` (live doc).
**Reuses:** `menu-panels.css` — the trigger is the Molecules Subheader Menu trigger (`.pds-menu-panels__trigger`, `__label`, `__arrow--down/--up`, root `.pds-menu-panels--subheader`); only `--menu-panels-sub-border` is overridden. Icons from `icons/` (nav-dropdown-arrow-solid, nav-dropdown-arrow-inverse-solid, nav-right-caret).
**Not reused, on purpose:** `menu.css` / `menu.js`. The Molecules Subheader Menu is a single-column listbox (rows #313131, Active = #E9F1F5 fill); this organism is a two-level navigation flyout with different rows (#234357, Hover #EEF2F4 + blue text, Active = blue text, no fill), Tertiary rows and carets. So it is not the same thing at a larger scale: same trigger, new flyout.

## What it is
The subheader title opens a two-level flyout: Level 1 rows on the left; on the right the Secondary rows of the open Level 1 item, with Tertiary rows indented under a Secondary row. Figma .documentation: Overview “NA”, Placement & Convention “NA”.

## Variants
8 rendered on the page (Subheader Menu open + closed, 6 row variants) plus the Secondary row with Right-Caret on.

| Component | Variant | Build |
|---|---|---|
| Subheader Menu | (single, 2263:3752) drawn open | `build({ static: true })` — Figma sample: label “setup”, 4 Level 1 rows (3 and 4 with caret), Level 2 = Menu Option · Menu Option + 2 Tertiary · Menu Option |
| .Secondary menu items | Type=Secondary, State=Default (2263:948) | `item({ type:'secondary', state:'default' })` |
| | Type=Secondary, State=Hover (2263:996) | `state:'hover'` |
| | Type=Secondary, State=Active (2363:723) | `state:'active'` |
| | Type=Tertiary, State=Default (2263:1003) | `item({ type:'tertiary' })` |
| | Type=Tertiary, State=Hover (2263:3678) | `state:'hover'` |
| | Type=Tertiary, State=Active (2263:4608) | `state:'active'` |

Right-Caret is a hidden layer in the set, shown on instances (Level 1 rows 3 and 4): `item({ caret: true })`.

| Token | Value | Maps to |
|---|---|---|
| `--subheader-nav-trigger-border` | #E2EAEC, 1px inside | `--border-input-light` (overrides `--menu-panels-sub-border` #E9F1F5) |
| `--subheader-nav-flyout-bg` | #FFFFFF | `--white` |
| `--subheader-nav-flyout-shadow` | 0 2 14 10% | `--shadow-3` |
| `--subheader-nav-item-fg` | #234357 | `--pando-dark` |
| `--subheader-nav-item-hover-bg` / `-fg` | #EEF2F4 / #0076DD | `--pando-light` / `--pando-blue` |
| `--subheader-nav-item-active-fg` | #0076DD | `--pando-blue` |
| `--subheader-nav-caret` | #234357 | `--pando-dark` |
| `--subheader-nav-sep` | #B5C3CB | `--border-blue-grey` |
| Trigger label / arrow | #0076DD / #234357 | menu-panels.css tokens, unchanged |

No off-token hex in this component.

## Anatomy & spacing
**Trigger** (menu-panels.css): 216 × 50, padding 0 / 20 (Figma 10 / 20 with centred 19 text), label ↔ arrow space-between, `.type-14-semibold.caps` (1px tracking), arrow 8 × 5 — up (Inverse) when open, down when closed.
**Flyout:** 2 columns × 216 = 432, white, `--shadow-3`, no radius, no padding; sits directly under the trigger. Level 2 column hidden when the open item has no children.
**Secondary row:** 216 × 36 (component-set master 204), padding 10 / 20, text ↔ caret space-between, Right-Caret 5 × 8.
**Tertiary row:** 216 × 36, padding 0 / 20, separator 1 × 36 (line rotated −90° in Figma), 20 gap, text. Consecutive Tertiary rows form one continuous line.
**Row text:** Open Sans SemiBold 12, caps, 0.3px tracking, line-height 16 (Figma auto).

px values used (component tokens): 1, 5, 8, 16, 20, 36, 204, 216 (10 via `--space-10`; 50 / 20 / 8 × 5 from menu-panels.css).

## Behaviour
- Trigger: click / Enter / Space toggles, ↓ opens and focuses the first Level 1 row; Esc closes.
- Level 1 row with caret: click, → , Enter or Space shows its children in Level 2 (keyboard moves focus to the first Level 2 row). Default Level 2 = parent of the Active row, else the first caret row.
- ↑ ↓ move inside a column (wrap), Home / End; ← in Level 2 returns to its parent.
- Any other row: click / Enter / Space makes it Active (`aria-current="true"`, blue text), closes, returns focus to the trigger, fires `pds-change` `{ path, value, labels }` and `onChange`.
- Trigger label (`showValue`, default on): the Active label; for a Tertiary row “Secondary - Tertiary” — from the .documentation “Uses” text.
- Esc, focus leaving the component, or a click outside closes.
- Rows are `<button>`s, or `<a href>` when an item has `href`.

## When (not) to use
Figma .documentation “Uses”: “When Secondary item selected - Active Submenu is Secondary menu” · “When tertiary item selected - Secondary menu - Tertiary menu”. No other usage text.

## Accessibility
- Disclosure-navigation pattern (WAI-ARIA APG), not `role="menu"`: `<nav aria-label>`, trigger `aria-expanded` / `aria-controls`; rows in nested lists; caret rows carry `aria-expanded` and `aria-controls` → Level 2; Level 2 and Tertiary lists labelled by their parent; Active row `aria-current="true"`. Icons `aria-hidden`.
- Arrow-key movement is added on top of Tab (added in review — not in Figma).
- Keyboard focus shows the Hover look plus `outline: 2px solid var(--pando-blue); outline-offset: 2px` (added in review — not in Figma).
- Contrast for the a11y pass: Hover text #0076DD on #EEF2F4 4.02 : 1; trigger label #0076DD on white 4.53 : 1; separator #B5C3CB on white 1.81 : 1 (decorative). Active vs Default is colour only.

## Open issues
- No “open parent” state in Figma: Level 2 is filled but no Level 1 row is marked. Built: `aria-expanded` only, no visual.
- How Level 2 gets chosen is not drawn. Built: click / → / Enter on a caret row; no hover-to-open.
- Trigger label after a pick is read from the .documentation text; the “ - ” separator is literal. Confirm.
- Whether a Secondary row that owns Tertiary rows is selectable is not drawn. Built: selectable.
- Trigger stroke #E2EAEC here vs #E9F1F5 in the Molecules Subheader Menu (same trigger). Kept per file via token override.
- No Disabled state; no max height / scroll (Level 1 has 16 hidden row slots, Level 2 has 9).
- Line height: row text Figma auto 16 vs 17 in `.type-12-semibold`.
- Hover text contrast 4.02 : 1 (< 4.5).
- Row width: component set 204 vs 216 in the flyout.

## Not adopted
- Loose frame “Dropdown Subheader” (3233:5549): a Mega Menu (two 200-wide columns of a flat list, “All Masters … Driver Details”, Active row filled #E9F1F5, rows #313131) — read for usage only.
- Loose frame “Frame 482908” (2263:4601): Subheader instance + Subheader Menu instance (usage example).
- `.documentation` instance (2342:3315).
- Hidden row slots in Level 1 / Level 2.
- Industry gaps, not added: Fluent 2 Menu advises avoiding deep nesting and labelling the trigger (depth here is fixed); APG uses `aria-current="page"` on links (rows here are buttons unless `href` is given).

## Sources
Figma 2263:3752 · 2263:947 · loose frames 3233:5549 · 2263:4601 · .documentation 2342:3315
WAI-ARIA APG Disclosure navigation — https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
Fluent 2 Menu usage — https://fluent2.microsoft.design/components/web/react/core/menu/usage
