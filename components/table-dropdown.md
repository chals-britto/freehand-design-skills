# Table Dropdown — Pando DS V1

**Status:** Built 2026-10-28 · no review file (every published variant kept) · **Figma:** DS V2 – Molecules › 🟢 Table (76:339) › `Table Dropdown` (2711:10723)
**Files:** `table-dropdown.css` (styles + component tokens) · `table-dropdown.js` (`pdsTableDropdown.build`) · `table-dropdown.html` (live doc). Reuses `menu.css` / `menu.js` (list + keyboard), `checkbox.css`, `tag.css` (Input Tag, Multiselect Tag), `scrollbar.css`, icons `nav-dropdown-arrow-solid`, `system-status-selected-multi`, `nav-close-tag`. Used next by Table Cell.

## What it is
The borderless dropdown that sits inside a table cell: placeholder or value plus an 8×5 arrow, and a plain list that opens 10px below it. Figma has no written description; this is drawn from the components.

## Variants
`Theme` × `Size` × `State` × `Type` × `Required` (No only) — 10 variants, all rendered on the page.

| Variant | Build |
|---|---|
| Light · Small · Empty · None (2711:10791) | placeholder “Select Option”, italic 12 `--text-dark` #313131, arrow `--pando-dark` #234357 |
| Dark · Small · Empty · None (2711:10794) | placeholder `--dark-label-text` #D5DAF4, arrow `--dark-input-text` #8A8A9E |
| Light · Small · Filled · None (2711:10797) | value “Selected Item”, `.type-12-semibold` #313131 |
| Dark · Small · Filled · None (2711:10800) | value `--white`, arrow #8A8A9E |
| Light · Large · Empty · None (2711:10819) | fills the cell, 35 high, padding 9 / 10 |
| Light · Large · Filled · Multi-Selected (2711:10803) | Input Tag × 2 (Remove=Yes) + Multiselect Tag “+ 2”, gap 10, 24 high |
| Dark · Large · Filled · Multi-Selected (2711:10811) | same with `.pds-tag--dark` |
| Light · Small · Open · None (2711:10753) | list 199 wide; Hover row #FAFAFA, Selected row text #0076DD |
| Light · Small · Open · Checkbox (2711:10724) | list 151 wide; kit Checkbox 14 + text |
| Light · Small · Open · Multi-Selected (2711:10768) | list 215 wide; ✓ 10×8 #0076DD right of picked rows |

| Token | Value | Maps to |
|---|---|---|
| `--table-dropdown-fg` | #313131 | `--text-dark` |
| `--table-dropdown-arrow` | #234357 | `--pando-dark` |
| `--table-dropdown-dark-placeholder` | #D5DAF4 | `--dark-label-text` |
| `--table-dropdown-dark-fg` | #FFFFFF | `--white` |
| `--table-dropdown-dark-arrow` | #8A8A9E | `--dark-input-text` |
| `--table-dropdown-option-bg` | #FFFFFF | `--white` |
| `--table-dropdown-option-fg` | #313131 | `--text-dark` |
| `--table-dropdown-option-hover-bg` | #FAFAFA | `--accent-light-bg` |
| `--table-dropdown-option-selected-fg` / `--table-dropdown-check` | #0076DD | `--pando-blue` |
| `--table-dropdown-menu-shadow` | none | Figma has no shadow or fill on the list |

No off-token colours.

## Anatomy & spacing
**Trigger:** value ↔ arrow gap 20 · arrow 8×5 (`Navigation/Dropdown-Arrow` Solid; Inverse when open) · clips content · Small hugs (16 high) · Large Empty 100% wide, 35 high, padding 9 / 10 · Large Filled Multi 24 high, no padding, tags gap 10.
**Open:** trigger row gets padding 0 / 10 and the inverse arrow · list absolute, 10 below the trigger, left 0.
**List:** rows 28 high, padding 6 / 10, gap 5, `.type-12-regular` · min widths 199 (None) / 151 (Checkbox) / 215 (Multi-Selected) — the list widens for longer labels (build choice; Figma widths are fixed) · no max height.
**Tags:** kit Input Tag (24 high, padding 4 / 8, radius 12, × 12) and Multiselect Tag Number Only (22 high, padding 4 / 10, 2px stroke).

px values used (component tokens): 5, 6, 8, 9, 10, 20, 24, 28, 35, 151, 199, 215.

## Behaviour
- `pdsTableDropdown.build({ type, size, theme, options, placeholder, maxTags, onChange })`.
- Click, Enter, Space, ↓ or ↑ opens; ↑ ↓ move, Home / End jump; Enter / Space pick; Esc, Tab or a click outside closes (from `pdsMenu.attach`).
- **None:** picking selects, closes and shows the value in SemiBold.
- **Checkbox / Multi-Selected:** picking toggles, the list stays open. The field shows the first 2 picks as Input Tags and the rest as “+ n” (Figma sample shows 2 + “+ 2”). Tag × removes that value.
- Event `pds-table-dropdown-change` {values, labels} on the root.

## When (not) to use
Figma has no usage text.

## Accessibility
- Trigger is `role="combobox"` (`tabindex="0"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`); the list is `role="listbox"` (+ `aria-multiselectable`) with `role="option"` + `aria-selected`. Focus stays on the trigger; `aria-activedescendant` follows the highlight.
- Keyboard highlight uses the Figma Hover fill #FAFAFA. Trigger focus ring 2px #0076DD (added in review — not in Figma).
- Tag × buttons are `tabindex="-1"` (they live inside the combobox); keyboard users deselect from the list.
- Contrast for the a11y pass: hover fill #FAFAFA on white 1.04 : 1 (keyboard highlight nearly invisible); selected text #0076DD on white 4.6 : 1; Dark placeholder and arrow depend on the cell fill (not set by the component).

## Open issues
- **Two copies in Figma.** Public `Table Dropdown` 2711:10723 is built. Private `.Table Dropdown` 2343:6642 differs only in: (1) Open · Checkbox rows 2–6 are filled #FAFAFA (public: all white) and read “Dropdown Option 1…6” (public: all “Dropdown Option 1”); (2) Open · None and Open · Checkbox lists are in the layout flow (variant 138 / 194 high) — public positions them absolute (16 high); (3) Dark · Small · Empty placeholder reads “Choose Role” (public: “Select Option”). Everything else is identical. Delete or mark the private copy.
- The list has **no fill, shadow or border** in Figma — only white rows. Over table content it has no edge. Kept as Figma.
- **Open state shifts the trigger** 10px right (row padding 0 / 10 only in Open) so it lines up with the list text. Kept; confirm.
- Missing states: no Dark Open list (dark fields open the light list), no Large Open, no Large Filled single, no Small Filled multi, no Checkbox Filled (built with the Multi-Selected tag look), no disabled, error or Required=Yes (only “No” exists).
- Large · Empty is 35 high with padding 9 / 10; Large · Filled · Multi-Selected is 24 high with no padding — the field changes size when filled.
- Multi-Selected Open: picked rows show only the ✓ (text stays #313131); in Figma the layer names (“Selected”) sit on unticked rows — built from the visuals.
- No max height or scroll in Figma — long lists grow.
- Input Tag text in the instances is #404040; the kit Input Tag uses #313131 (`--color-text-primary`). Kit value used.
- Line height: Figma Auto (≈16) for 12px text vs 17 in `.type-12-*` (trigger renders 17 high, rows fixed at 28).
- Small · Empty: the arrow sits 15 after the 70-wide text box (gap 20 in auto layout) — built with gap 20.
- The list rows differ from the kit menu (`menu.css`: 36 high, SemiBold, hover #E9F1F5). Restyled here; a third list style alongside Dropdown Light and Filter Dropdown Options.

## Not adopted
- Hidden layers: 5th row in Open · None, hidden ✓ instances, hidden “Choose Role” text and hidden 4th Input Tag in the Large Filled variants.
- Private copy `.Table Dropdown` 2343:6642 (see Open issues).
- Industry gaps, not added: menu elevation (shadow), flip upward near the screen bottom, max height with a half-visible last row as scroll cue, selected options moved to top on reopen, select-all parent checkbox, clear-all ×, type-ahead/search, error / warning / disabled / read-only states.

## Sources
Figma rd3gmPnjhPo1d2GAlNSJOn · 2711:10723 · 2343:6642
Carbon Dropdown usage — https://carbondesignsystem.com/components/dropdown/usage/
Ant Design Select — https://ant.design/components/select
