# Dropdown — Pando DS V1

**Status:** Reviewed 2026-10-22 · **Figma:** DS V2 – Atoms › Dropdown (3240:3865) › `Filter Dropdown Options` (4466:5808)
**Files:** `dropdown.css` (styles + component tokens) · `dropdown.js` (`pdsDropdown.build` / `attach`) · `dropdown.html` (live doc)

## What it is
The open menu of a dropdown: an optional search header, grouped options, and a single- or multi-select list. Figma has no written description. This one is drawn from the component.
The closed field is **not** part of this component: it is `Input – Dropdown Select` on the Inputs page (3535:3521).

## Variants
| Variant | Source | Notes |
|---|---|---|
| Filter menu (published) | 4466:5808 | 150px, search header, grouped options, single select |
| Option: default | 4466:5808 | `.type-12-regular`, `#404040` (off-token) |
| Option: selected | 3240:3904 | `--pando-blue` #0076DD, semibold. No fill, no icon |
| Option: disabled | added in review | `--text-disabled` #A3A2A2. Not in Figma |
| Search: filtered / no results | added in review | empty message `.type-12-regular` `--text-light`. Copy needs confirming |
| Loading | added in review | message replaces options. Copy needs confirming |
| Long list (scroll) | added in review | list max height 264px (= published list height), Light scrollbar |
| Multi-select panel | loose frame 3240:3961, componentised in review | 400px, rows with icon circle + check |
| Two-line panel | loose frame 3240:4042 (kept) | title + secondary line, depot icon |

| Token | Value | Maps to |
|---|---|---|
| `--dropdown-option-fg` | #404040 | off-token in Figma |
| `--dropdown-option-selected` | #0076DD | `--pando-blue` |
| `--dropdown-option-disabled` | #A3A2A2 | `--text-disabled` (added in review) |
| `--dropdown-placeholder` | #6C6C6C | `--text-light` |
| `--dropdown-caret` | #0076DD | `--pando-blue` |
| `--dropdown-search-bg` | white @ 90% | — |
| `--dropdown-search-divider` | #C8CED5 | off-token in Figma |
| `--dropdown-search-shadow` | 0 4.75 17.8 black 8% | off-token in Figma |
| `--dropdown-list-bg` | white @ 80% | — |
| `--dropdown-list-shadow` | 0 4 4 #B6B6B6 25% | off-token in Figma |
| `--dropdown-group-bg` / `-fg` | #EEF2F4 / #6C6C6C | `--pando-light` / `--text-light` |
| `--dropdown-panel-shadow` | 0 14 29 #BDBDBD 40% | off-token in Figma |
| `--dropdown-row-selected-bg` | #F8F8F8 | `--accent-off-white` |
| `--dropdown-icon-region-bg` / `-fg` | #F2E7FE / #234357 | `--status-purple-light` / `--pando-dark` |
| `--dropdown-icon-depot-bg` / `-fg` | #D7F3F6 / #006064 | off-token in Figma |
| `--dropdown-secondary-fg` | #737373 | off-token in Figma |
| `--dropdown-scroll-track` / `-thumb` | #F8F8F8 / #E7E7E7 | `--accent-off-white` / `--grey-light` |

## Anatomy & spacing
**Menu:** width 150 · search header 32 high, white 90%, background blur 42, radius 2, bottom divider 0.5px, text inset 10, `.type-14-regular`. A 17×1 blue line is drawn at x 9, y 24 under the placeholder · list white 80%, blur 42, radius 2, max height 264 (added) · group header padding 5/10, `.type-10-semibold` + caps · options block padding 10, gap 8.
**Panel:** width 400 · white · top padding 5 · max height 280 · row (1 line) 40 high, padding 5/10, gap 10 · row (2 lines) 56 high, padding 10 · icon circle 30, glyph 14 · title `.type-12-semibold`, secondary `.type-10-regular`, gap 6 · check 12 at the right.
**Scrollbar:** 6 wide, radius 8.

## Behaviour
- `pdsDropdown.attach(field, menu)` opens and closes the menu from the field. It also closes on outside click and on Esc.
- Single select: picking an option selects it and closes the menu.
- Multi-select: picking toggles the row's check, and the menu stays open (added in review).
- Search filters options by label as you type. Group headers with no matches are hidden. If nothing matches, the empty message shows (added in review).
- Disabled options can't be picked (added in review).

## When (not) to use
Figma has no usage text, and none was added in review.

## Accessibility
- The list is `role="listbox"` (`aria-multiselectable` for multi), options are `role="option"` + `aria-selected`, and disabled options are `aria-disabled`.
- The field gets `aria-haspopup="listbox"`, `aria-expanded` and `aria-controls`.
- Deferred (later): arrow-key navigation, focus ring, hover state.
- Contrast notes: selected #0076DD on white 4.53:1, vs #404040 neighbours 2.29:1 (colour-only cue). Search divider 1.59:1. Panel selected-row fill 1.06:1 (the check carries the state).

## Open issues
- No closed trigger on this page. Use `Input – Dropdown Select` (Inputs page, 3535:3521). That component's Open state shows a different menu, `Dropdown Light` (3154:2534), so the two menus need reconciling.
- Error / disabled **field** states (review: add) already exist on the Input trigger (State=Error 288:492, Disabled=Yes 2207:879), so they are referenced, not rebuilt. The menu has no error state.
- Empty-search and loading copy is not in Figma. Placeholders are used.
- Line heights are Auto in Figma. Options use 17px (`.type-12-regular`) vs ≈16, group header 12 vs 14, secondary line 12 vs 14.
- Fixed 150px width; long labels are truncated with an ellipsis (no Figma rule).
- The panel corner radius couldn't be read (vector with mixed corners), so it is drawn square.
- The review suggested ~256px max height. 264px is used so the published sample doesn't scroll.

## Not adopted
- `'Select movement'` chip filter (3240:3866) — skip (not a dropdown).
- Duplicate Regions list with no selection (3240:3907) — outdated.
- Sizes — later.
- Keyboard navigation and focus — later (a11y pass).
- Clear-selection control, warning / read-only states, checkbox per option, overflow count in the field, match highlighting — industry gaps, not added.

## Sources
Carbon Dropdown usage — https://carbondesignsystem.com/components/dropdown/usage/
Fluent 2 Dropdown usage — https://fluent2.microsoft.design/components/web/react/core/dropdown/usage
Ant Design Select — https://ant.design/components/select
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 2.1.1 / 2.4.7 / 4.1.2 — https://www.w3.org/WAI/WCAG22/Understanding/
