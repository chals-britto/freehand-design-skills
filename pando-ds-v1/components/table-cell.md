# Table Cell — Pando DS V1

**Status:** Built 2026-10-28 · no review file (every published variant kept) · **Figma:** DS V2 – Molecules › 🟢 Table (76:339) › `Table Cell` (2361:5601, 33 variants) + `.Text Content` (2361:5594, 2)
**Files:** `table-cell.css` (styles + component tokens) · `table-cell.js` (`pdsTableCell.init` / `.dropdown`, Dropdown cells only) · `table-cell.html` (live doc). Reuses `checkbox.css` (Show Checkbox), `tag.css` (Multiselect Tag Number + Unit), `table-dropdown.css/js` + `menu.css/js` + `scrollbar.css` (Dropdown cells), icons `nav-calendar-input`, `nav-sort-default`. Composed next by Table.

## What it is
“Table data to show or add text, tags or dropdown inputs.” *(Figma description)* One cell per column type, put on a real `<td>` / `<th>`.

## Variants
`Theme` (Light | Dark) × `Type` (Text | Header | Dropdown | Tag | Input Header | Input Text) × `Background` (Default | Alternate | Child) × `Disabled` (No | Yes) × `State` (Default | Active | Empty) — **33 published variants**, all rendered. Booleans (all default off): `Show Checkbox`, `Icon` (+ `Icon Type` swap, default Navigation/Calendar-Input), `Filter`, `Sort`.

### Cell types — classes (all start with `.pds-table-cell`)
| Type | Class | Element | Inner markup | Count |
|---|---|---|---|---|
| Text | `--text` | `<td>` | `__content` › [checkbox] [`__icon`] `__text` › `__primary` + `__secondary` | 7 |
| Input Text | `--input` | `<td>` | `__content` › `__text` › `<input class="pds-table-cell__input" placeholder="Enter Text">` | 14 |
| Header | `--header` | `<th scope="col">` | `__content` › [checkbox] `__label` [`__filter-btn` › `__filter`] [`__sort-btn` › `__sort`] | 2 |
| Input Header | `--input-header` | `<th scope="col">` | same as Header | 1 |
| Tag | `--tag` | `<td>` | `__tags` › kit `.pds-tag--count-unit` | 4 |
| Dropdown | `--dropdown` | `<td data-pds-dropdown='{…}'>` | `__dropdown` › kit Table Dropdown (mounted by `pdsTableCell.init`) | 5 |

Modifiers: `--dark` (Theme=Dark) · `--alt` (Background=Alternate) · `--child` (Background=Child) · `--disabled` (Text; Input uses `<input disabled>`, class also works for static specimens) · `--active` (Input specimen, Dropdown open — set by JS) · `--empty` (static Input specimen; live = empty input shows the placeholder) · `--right` (.Text Content Alignment=Right).

### Values
| Variant | Fill | Top line | Text |
|---|---|---|---|
| Light Default | `--white` #FFFFFF | `--border-grey` #EFEFEF | `--text-dark` #313131 |
| Light Alternate | `--accent-alternate-white` #F9FAFA | #EFEFEF | #313131 |
| Light Child (Text) | `--pando-light` #EEF2F4 | none | #313131 |
| Light Text · Disabled | `--grey-light` #E7E7E7 @ 30% | `--border-input-light` #E2EAEC | `--text-light` #6C6C6C |
| Light Input · Disabled | `--border-grey` #EFEFEF | #EFEFEF | #313131 (unchanged) |
| Light Input · Active | as Background | + 1px ring `--pando-blue` #0076DD | #313131 |
| Light Input · Empty | as Background | #EFEFEF | “Enter Text” italic `--text-medium` #545454 |
| Dark Default | `--dark-light` #343440 | `--dark-input-text` #8A8A9E @ 50% | `--dark-label-text` #D5DAF4 |
| Dark Alternate | `--dark-bg` #393945 | #8A8A9E @ 50% | #D5DAF4 |
| Dark Text / Input · Disabled | `--dark-bg` #393945 | #8A8A9E @ 50% | `--dark-input-text` #8A8A9E |
| Dark Input · Active | as Background | + 1px ring `--highlight-blue-light` #9CD2FF | #D5DAF4 |
| Dark Input · Empty | as Background | #8A8A9E @ 50% | “Enter Text” italic #8A8A9E |
| Header Light | `--white` | #EFEFEF | 10 SemiBold caps `--pando-blue-active` #005399 |
| Input Header Light | none | none (stroke weight 0) | 10 Regular caps #005399 |
| Header Dark | `--dark-light` | #8A8A9E @ 50% | 10 SemiBold caps #8A8A9E |
| Header Filter arrow | — | — | `--accent-tertiary-action` #6D8EB4 · Dark #D5DAF4 @ 50% |
| Tag | as Background | as Theme | kit Multiselect Tag Number + Unit “3 Units” (Dark: `--dark`) |
| Dropdown | as Background | as Theme | kit Table Dropdown Small, “Select Dropdown” (Light Alternate: “Select Option”) |

| Token | Value | Maps to |
|---|---|---|
| `--table-cell-bg` / `-alt-bg` / `-child-bg` | #FFFFFF / #F9FAFA / #EEF2F4 | `--white` / `--accent-alternate-white` / `--pando-light` |
| `--table-cell-disabled-bg` | #E7E7E7 @ 30% | `color-mix(--grey-light 30%)` |
| `--table-cell-input-disabled-bg` | #EFEFEF | `--border-grey` |
| `--table-cell-dark-bg` / `-dark-alt-bg` | #343440 / #393945 | `--dark-light` / `--dark-bg` |
| `--table-cell-line` / `-disabled-line` / `-dark-line` | #EFEFEF / #E2EAEC / #8A8A9E @ 50% | `--border-grey` / `--border-input-light` / `color-mix(--dark-input-text 50%)` |
| `--table-cell-active` / `-dark-active` | #0076DD / #9CD2FF | `--pando-blue` / `--highlight-blue-light` |
| `--table-cell-fg` / `-disabled-fg` / `-placeholder` | #313131 / #6C6C6C / #545454 | `--text-dark` / `--text-light` / `--text-medium` |
| `--table-cell-dark-fg` / `-dark-muted` | #D5DAF4 / #8A8A9E | `--dark-label-text` / `--dark-input-text` |
| `--table-cell-header-fg` | #005399 | `--pando-blue-active` |
| `--table-cell-filter` / `-dark-filter` | #6D8EB4 / #D5DAF4 @ 50% | `--accent-tertiary-action` / `color-mix(--dark-label-text 50%)` |
| `--table-cell-icon` | #343440 | `--dark-light` (kit Calendar-Input default) |

No off-token hex (the two @ 50% / @ 30% values are `color-mix` of tokens).

## Anatomy & spacing
- **Body cells** (Text, Input, Tag, Dropdown): 50 high · padding 0 / 8 · inner row gap 10, centred · 1px top line drawn as an inset shadow (Figma: top stroke, inside).
- **.Text Content:** vertical, gap 2, padding 10 / 0 · line 1 `.type-12-regular` at line height 16 · line 2 `.type-10-regular` (0.5 tracking). Input Text has line 1 only (36 high in the 50 cell).
- **Header:** 34 high · padding 10 / 8 · gap 10 · `.type-10-semibold` caps at line height 14. **Input Header:** 32 high, `.type-10-regular` caps (lh 12).
- **Optional parts:** checkbox 14 (kit) · icon 10×10 · Filter arrow 8×7 · Sort 8×12 · all 10 apart.
- **Tag:** frame padding 10 / 0 inside the 0 / 8 cell; Light horizontal gap 10, Dark vertical gap 2.
- **Dropdown:** frame padding 10 · Light padding-right 10 and the field fills the cell (arrow right); Dark padding-right 8 and the field hugs. Active: frame aligns top (field 10 from the line), list opens 10 below (from Table Dropdown).
- Figma sample widths: Text / Input 100 · Header 86 · Input Header 85 · Tag 72 · Dropdown 140 (Light) / 134 (Dark). In a table the column sets the width.

px values used (component tokens): 1, 2, 7, 8, 10, 12, 14, 16, 32, 34, 50 (`--space-2`, `--space-10` reused).

## Behaviour
- **Input Text:** a native input fills the cell. Focus = Active (1px ring, `:focus-within`). Empty input shows “Enter Text” italic (Empty). `disabled` on the input = Disabled. No JS.
- **Checkbox:** kit checkbox; use `checkbox.js` `data-pds-parent` if a header box should drive the rows (not in Figma).
- **Dropdown:** `pdsTableCell.init(root)` mounts `pdsTableDropdown.build(options)` in each `.pds-table-cell--dropdown[data-pds-dropdown]` (JSON options; default placeholder “Select Dropdown”; theme follows `--dark`) and toggles `.pds-table-cell--active` while the list is open. `pdsTableCell.dropdown(cell, options)` does the same for one cell. Change event: `pds-table-dropdown-change` (from Table Dropdown).
- **Filter / Sort** are rendered as buttons; what they do is up to the Table (Figma has a single Sort default icon, no sorted states).

## When (not) to use
Figma has only the description above.

## Accessibility
- Use real `<th scope="col">` / `<td>`. Give each cell input an `aria-label` (column name); give Filter / Sort buttons labels (“Sort by …”).
- Focus: Input cells show the Active ring; Filter / Sort buttons get 2px `--pando-blue` outline (added in review — not in Figma).
- Contrast for the a11y pass: Dark header text #8A8A9E on #343440 ≈ 4.0 : 1; Dark disabled #8A8A9E on #393945 ≈ 3.8 : 1; Filter arrow #6D8EB4 on white ≈ 3.4 : 1 (non-text, passes 3 : 1); Dark Filter #D5DAF4 @ 50% on #343440 low; Calendar icon #343440 on Dark cells nearly invisible.

## Open issues
- **Dropdown cells use the private `.Table Dropdown` (2343:6642)**, not the public `Table Dropdown` 2711:10723 — built with the kit (public) one, so the Active list is absolute instead of in the layout flow.
- Dropdown placeholder: “Select Dropdown” in four cells, “Select Option” in Light · Alternate. At the 140 sample width the browser truncates “Select Dropdown” (synthetic italic); demo uses 150.
- Dropdown Active: the field jumps from centred to 10 from the top (and 10 right, from Table Dropdown) when the list opens.
- Light Dropdown fills the cell, Dark hugs; Light padding-right 10, Dark 8.
- Dark Alternate (#393945) is lighter than Dark Default (#343440) and equals Dark Disabled — disabled dark rows only differ by text colour.
- Light Input Text · Disabled keeps #313131 text; Text · Disabled uses #6C6C6C.
- Text · Disabled fill #E7E7E7 @ 30% and line #E2EAEC differ from every other light cell (#EFEFEF).
- Missing variants: Dark Input Header; Child only for Light Text; Disabled only for Text / Input Text; no Dark Dropdown Active; no Tag / Dropdown disabled; no hover, selected-row, error or sorted states.
- Dark Header’s hidden checkbox is Mode=Light (Dark body cells use Dark). Built Dark.
- Header Filter is a loose 8×7 right-arrow vector — **atom variant missing in kit** (kit `Navigation/Filter Arrow` is 10×10, down). Inline SVG from the Figma path.
- Calendar-Input icon colour from the kit default (#343440); the instance fill was not read.
- Line height: 12px text 16 in Figma vs 17 in `.type-12-regular`; Header 10 SemiBold Auto (≈14) vs 12 in `.type-10-semibold`. Component tokens keep the Figma heights (50 / 34).
- Tag: Light frame horizontal gap 10, Dark vertical gap 2 (no visible effect with one tag).

## Not adopted
- Hidden, unbound `System-Status/Info` and `System-Status/Info-Circle` in Light Header / Input Header (no property shows them).
- Hidden `Input Tag` (Remove=Yes) in Light Tag cells.
- Industry gaps, not added: sort states (unsorted on hover, ascending, descending), header select-all with indeterminate, always-on row hover, several row heights with matching header, header titles wrapping to two lines then truncating with tooltip.

## Sources
Figma rd3gmPnjhPo1d2GAlNSJOn · 2361:5601 · 2361:5594 · 2343:6642
Carbon Data table usage — https://carbondesignsystem.com/components/data-table/usage/
