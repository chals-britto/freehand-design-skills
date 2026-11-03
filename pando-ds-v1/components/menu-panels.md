# Subheader Menu + Sort — Pando DS V1

**Status:** Built 2026-10-28 · no review file (every published variant kept) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › ✏️ Dropdown (2312:4660) — `Subheader Menu` (2312:5082, 3 variants), `Sort-1` (2312:5216, 1)
**Files:** `menu-panels.css` (styles + component tokens) · `menu-panels.js` (`pdsMenuPanels.subheader` / `sort`) · `menu-panels.html` (live doc). Reuses `menu.css` / `menu.js` (the Subheader list is a `pdsMenu` type `single`), `toggle.css` / `toggle.js` (Atoms Toggle Tab, Dark), `icons.css` + SVGs from `icons/`.

## What it is
Two dropdown panels. Figma has no written description; this is drawn from the components.
- **Subheader Menu** — a subheader title (blue caps + dropdown arrow) that opens a single-select list; the Active option row is filled.
- **Sort-1** — a dark panel with a “Filter By” tab: grouped choices (Indent Type with icons; Delivery Type with an FTL / PTL Toggle Tab), two columns per group.

## Variants
4 rendered on the page.

| Component | Variant | Build |
|---|---|---|
| Subheader Menu | Active=Option 1 (2312:5083) | `subheader({ active: 0 })` |
| | Active=Option 2 (2312:5105) | `subheader({ active: 1 })` |
| | Active=Option 3 (2312:5127) | `subheader({ active: 2 })` |
| Sort-1 | (single, 2312:5216) | `sort()` — Figma sample groups and labels |

| Token | Value | Maps to |
|---|---|---|
| `--menu-panels-sub-bg` | #FFFFFF | `--white` |
| `--menu-panels-sub-border` | #E9F1F5, 1px inside | `--accent-light-highlight` |
| `--menu-panels-sub-fg` | #0076DD | `--pando-blue` |
| `--menu-panels-sub-arrow` | #234357 | `--pando-dark` |
| `--menu-panels-sub-list-shadow` | 0 2 4 6% | `--shadow-2` |
| `--menu-panels-sub-active-bg` / `-fg` | #E9F1F5 / #313131 | `--accent-light-highlight` / `--text-dark` |
| `--menu-panels-sort-bg` | #24242F | `--dark-darker` |
| `--menu-panels-sort-shadow` | 0 2 14 10% | `--shadow-3` |
| `--menu-panels-tab-fg` | #FFFFFF | `--white` |
| `--menu-panels-tab-arrow` | #1FCD93 | `--dark-highlight-green` |
| `--menu-panels-section-bg` / `-fg` | #393945 / #D5DAF4 | `--dark-bg` / `--dark-label-text` |
| `--menu-panels-option-fg` | #D5DAF4 | `--dark-label-text` |
| `--menu-panels-option-icon` | #8A8A9E | `--dark-input-text` |
| `--menu-panels-option-selected-fg` | #FFFFFF | `--white` — borrowed from loose frame, see Open issues |
| Toggle Tab (Dark) | #484858 50% · #8A8A9E 50% · #D9E6FF · #484858 | `toggle.css` tokens, unchanged |

No off-token hex in this component.

## Anatomy & spacing
**Subheader Menu:** trigger 216 × 50, padding 0 / 20 (Figma 15.5 / 20 with 19 text), label ↔ arrow 20, label `.type-14-semibold.caps` (1px tracking), arrow 8 × 5 · list 215 wide (Dropdown Light shell from menu.css), bottom padding 1, rows 36, padding 10 / 20, 12 SemiBold caps with 0.3px tracking · max height 289 (8 option slots in Figma).
**Sort-1:** 240 wide · tab 86 × 20, padding 3 / 10, text ↔ arrow 14, radius 4 4 0 0, text 10 SemiBold caps 0.5px · panel radius 0 4 4 4, padding 10 / 0, rows gap 6 · section 20 high, padding 4 / 10, `.type-10-regular` caps · grid 2 × 120 columns, row gap 8 · option 26 high, padding 5 / 10, icon ↔ text 10, icon 12, text 12 SemiBold line-height 16 · toggle row padding 0 / 10, Toggle Tab hugs text (options 4 / 10 padding).

px values used (component tokens): 1, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 26, 50, 86, 120, 215, 216, 240, 289 (10 / 15 via `--space-10` / tokens.css).

## Behaviour
- **Subheader Menu** (via `pdsMenu.attach`): click, Enter, Space or ↓ opens; ↑ ↓ move, Home / End jump; Enter / Space picks the Active option and closes; Esc, Tab or outside click closes. Arrow points up while open (`aria-expanded="true"`), down when closed. `showValue: true` makes the trigger show the picked label (build choice — off by default; Figma keeps “Subheader Active” in all variants).
- **Sort-1**: the “Filter By” tab opens / closes the panel; Esc closes and returns focus to the tab; outside click closes. One choice per group: click, Space or Enter selects; arrow keys move focus inside a group (wrap), Home / End; selection does not follow focus. Fires `pds-change` `{ group, index, value, label }`. The Delivery Type Toggle Tab behaves as in toggle.js (click / arrows select, `pds-change` `{ index, value }`).
- No sort direction (ascending / descending): not in the components.

## When (not) to use
Figma has no usage text. The loose “Dropdown Subheader” frame (2312:5555) shows the Subheader Menu as a section switcher under a subheader title.

## Accessibility
- Subheader trigger: `<button>` with `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`; list `role="listbox"`, options `role="option"` + `aria-selected`; focus stays on the trigger with `aria-activedescendant` (menu.js).
- Keyboard highlight in the Subheader list adds a 2px #0076DD inside outline, since hover and Active share #E9F1F5 (added — not in Figma). Focus rings on the tab, options and toggle: 2px #0076DD (added — not in Figma).
- Sort-1: tab `aria-expanded` / `aria-controls`; each group `role="radiogroup"` labelled by its section header (`aria-labelledby`), options `role="radio"` + `aria-checked`, roving tabindex. Icons `aria-hidden`.
- Contrast for the a11y pass: Active fill #E9F1F5 on white 1.14 : 1; Sort-1 selected (#FFFFFF) vs unselected (#D5DAF4) differ by colour only.

## Open issues
- Sort-1 has **no selected state** in Figma (hidden Radio instances, hidden red “Reset” rows). Selected = white text is borrowed from the loose “Sort Dropdown” frame 2312:5531 — confirm.
- “Sort-1” is a Filter By panel, not a sort: no ascending / descending, no clear / apply. Loose frames show several other sort patterns (see Not adopted).
- Subheader Menu arrow: Active=Option 1 shows up, Options 2 / 3 show down, all drawn open. Built: up when open.
- Subheader trigger label is constant in Figma; whether it reflects the picked option is not drawn (`showValue` option).
- No hover state for Subheader options; menu.css hover = Active fill.
- Trigger 216 vs list 215 wide (kept).
- Line heights: 12 SemiBold Figma auto (16) vs 17 in `.type-12-semibold`; 10 SemiBold tab auto (14) vs 12 in `.type-10-semibold`.
- Toggle Tab option is 69 fixed in toggle.css; the instance hugs (40 / 41) — overridden with `--toggle-tab-option-w: auto` inside this component.
- Tab arrow is a raw vector (7px line with arrow-lines cap), not an icon; drawn inline.

## Not adopted
- 17 loose frames on the page (not components): Menu 2312:5149, Sort-1 frame 2312:5174 (“From Master”), Sort-1 instances 2312:5173 / 2312:5212, Sort-4 2312:5213 (“Order By” ✓ + clear), Group 132 2312:5464, Sort Dropdown 2312:5531 (“Sort By” A–Z / Z–A), Dropdown Subheader 2312:5555, Frame 2017 2312:5595, Delivery Movement 2370:5231, Flow 3068:2952, Indicator Icon instances, loose Dropdown Option instance / texts.
- Hidden layers in Sort-1: Radio ×2, “Rectangle 171”, Filter-10px / List Filter icons, Reset rows, divider lines, extra hidden option rows. Hidden option slots 4–8 in Subheader Menu.
- Other sets on the page (Column Picker, .Column Toggle, .Column Pin, View Header, Dropdown Option) belong to other builds.
- Industry gaps, not added: sort direction states (Carbon Data table); group dividers and radio vs checkbox items in menus (Fluent 2 Menu); clear / reset per group.

## Sources
Figma 2312:5082 · 2312:5216 · loose frames 2312:5174 · 2312:5213 · 2312:5531 · 2312:5555 · 2370:5231 (behaviour reference only)
Carbon Data table usage — https://carbondesignsystem.com/components/data-table/usage/
Fluent 2 Menu usage — https://fluent2.microsoft.design/components/web/react/core/menu/usage
