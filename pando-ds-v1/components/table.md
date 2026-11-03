# Table — Pando DS V1

**Status:** Built 2026-10-28 · no review file (every published item kept) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › 🟢 Table (76:339) › `Column` (211:52, 1) · `Row - FOR REFERENCE` (104:363, 4) · `Table - FOR REFERENCE` (2379:13135, 2) · `.documentation` (2385:6833)
**Files:** `table.css` (frame, grid, sticky header, state rows + component tokens) · `table.js` (`pdsTable`) · `table.html` (live doc)
**Uses the kit:** `table-cell.css` (every cell) · `checkbox.css/js` (Show Checkbox, select all via `data-pds-parent`) · `scrollbar.css` (scroll area) · `skeleton.css` (loading) · `empty-state.css` + `empty-state/no-records-*.png` (empty) · kit Sort icons (`nav-sort-default`, `nav-sort-ascending-small-big`, `nav-sort-decending-big-small`).

## What it is
“Tables display tabular data in a basic grid composed of cells, columns, and rows. This format makes it easy for users to scan and compare large amounts of data.” *(Figma .documentation › Overview)*
The Row and Table sets are marked **FOR REFERENCE**: they are compositions of Table Cells, not a component with their own styling. Built as a composed pattern, `.pds-table`, where every cell is a kit Table Cell.

## Variants
| Figma | What it shows | Built as |
|---|---|---|
| Column 211:52 | Header + 10 Text cells, 148 wide, Alternate first | one `<col>` of 148, `T({cols:1})` on the page |
| Row · Type=Header | 8 × Header cells (100 × 34) | `<thead>` row of `.pds-table-cell--header` |
| Row · Type=Row | 8 × Text, Background=Default | `<tr>` of `.pds-table-cell--text` |
| Row · Type=Alternate-Row | 8 × Text, Background=Alternate | cells + `.pds-table-cell--alt` |
| Row · Type=Child | 8 × Text, Background=Child | `<tr class="pds-table__row--child">`, cells + `.pds-table-cell--child` |
| Table · Using Rows | Header row + 8 rows, Alternate / Row alternating, 800 wide | `.pds-table.pds-table--rows` (100 cols) |
| Table · Using Columns | 8 Columns (1184 wide); column 1 overridden to Input Text · Empty | `.pds-table` (148 cols), first column `.pds-table-cell--input` |

**7 Figma variants**, plus 11 compositions **added for this build** (not in Figma): Dark table, Disabled row Light / Dark, Selection Light / Dark (header indeterminate / all), Sorted, Sticky header, Loading Light / Dark, Empty Light / Dark. **18 rendered.**

| Part | Value | Token |
|---|---|---|
| Frame stroke | 1px inside, #EFEFEF (style Border/Grey-#EFEFEF) | `--table-border` → `--border-grey` |
| Frame radius | 2px, clips content | `--table-radius` |
| Frame fill | #FFFFFF | `--table-bg` → `--white` |
| Dark frame (added) | fill #343440, stroke #8A8A9E @ 50% | `--table-dark-bg` → `--table-cell-dark-bg`, `--table-dark-border` → `--table-cell-dark-line` |
| Column width | 148 (Column, Using Columns) / 100 (Row, Using Rows) | `--table-col-w` / `--table-row-col-w` |
| Header row / body row | 34 / 50 | from Table Cell |
| Striping | first body row Alternate #F9FAFA, then Default #FFFFFF | Table Cell `--alt` |
| Sticky header (added) | `position: sticky; top: 0` | `--table-max-h` (scroll-area height), `--table-sticky-z` 2 |
| Empty row padding (added) | 15 | `--table-empty-pad` → `--space-15` |

No off-token hex.

## Anatomy & spacing
```
.pds-table [--dark] [--sticky] [--inline] [--rows]   frame: 1px stroke, radius 2, clip
  .pds-table__scroll.pds-scroll  role=region tabindex=0   overflow auto (both ways), kit scrollbar
    table.pds-table__grid        border-spacing 0, table-layout fixed, width max-content (min 100%)
      colgroup > col (148 | 100)
      thead > tr > th.pds-table-cell--header  [checkbox] label [sort button]
      tbody > tr[.pds-table__row--child | --disabled] > td.pds-table-cell--text | --input …
```
- Gap 0 everywhere (rows and columns butt). Row dividers are each cell’s 1px top line (Table Cell).
- Loading: kit Skeleton in each body cell — Size 120 in 148 columns, Size 80 in 100 columns (fits the 0 / 8 cell padding).
- Empty: one row, `colspan` = all columns, kit Empty State art (200 × 160) centred, padding 15.
- px values used: 1 (stroke), 2 (radius), 100, 148 (column widths), 286 (demo sticky height = 34 + 5 × 50 + 2), 15 (`--space-15`).

## Behaviour (all added — Figma’s reference tables are static)
- **Select rows:** put Show Checkbox in the first header cell and the first cell of each row. `pdsTable.init()` makes the header box “select all” for the body (kit `checkbox.js`, `data-pds-parent`): all ticked → checked, some → indeterminate. Disabled rows are skipped. Rows get `aria-selected`; `pds-table-select` fires with `{count, rows}`. Figma has no selected-row look.
- **Sort:** the header Sort button cycles Default → Ascending → Decending → Default, one column at a time. Sets `aria-sort`, swaps to the kit Sort icons, reorders rows (Child rows stay under their parent, ties keep their order), and re-applies the alternate background so the first body row stays Alternate. Value: `td[data-sort-value]` → input value → primary text. `pds-table-sort` fires with `{column, direction}`.
- **Horizontal scroll:** the scroll area scrolls sideways when the columns are wider than the frame (Using Columns, 1184). Figma does not show a sticky first column — not built.
- **Sticky header:** `.pds-table--sticky` + `--table-max-h` on the frame.
- **Loading:** `pdsTable.loading(table, rows = 10)` swaps the body for Skeleton rows, sets `aria-busy="true"`, disables select all. **Empty:** `pdsTable.empty(table, {src, alt})` — one row with the No Records art. `pdsTable.restore(table)` brings the data rows back.
- `pdsTable.sort(table, col, dir)` and `pdsTable.restripe(table)` are public.

## When (not) to use
From Figma .documentation:
- Uses: Display tabular data for comparison. · Display structured content, where each entry has the same attributes. · Let users review, enter, edit, or filter granular data sets. · Display a data set that will continue to grow
- Placement & convention: Table cell can be used to individually place text, dropdown values or tags.

## Accessibility
- Real `<table>`, `<th scope="col">`, `<td>`. The scroll area is `role="region"` with an `aria-label` and `tabindex="0"` so it can be scrolled by keyboard; its focus outline is 2px `--pando-blue` inset (added in review — not in Figma).
- Checkbox labels: “Select all rows” / “Select row N”. Sort buttons: “Sort by <column>”; sorted `<th>` has `aria-sort`.
- Loading: `aria-busy` on the grid, skeletons `aria-hidden`. Empty art `alt` = Figma hidden text “no records”.
- For the a11y pass: inherited Table Cell contrast (Dark header 4.0 : 1, Dark disabled 3.8 : 1); Sort Default icon #E7E7E7 / #B5C3CB on white is below 3 : 1; selected rows have no visual beyond the ticked box.

## Open issues
- Row / Table sets are “FOR REFERENCE” — built as a pattern, not a component.
- No Dark table in Figma; the Dark frame border uses the Dark cell line colour.
- Selection, sort states, sticky header, horizontal scroll, loading and empty are not drawn on the Table page (added for this build). No selected, hover or focus row style.
- Sorted icons come from the kit Sort atom (Ascending / Decending); Table Cell itself only uses Sort Default.
- Figma sample data is “Some Text” everywhere, so sorting it shows no change; the demo’s first column is Input Text (as in Using Columns) so values can be typed.
- Row frame fills look swapped (Type=Row frame #F9FAFA, Type=Alternate-Row frame #FFFFFF); invisible, built from the cells.
- Disabled only exists for Text / Input Text cells; Child only for Light Text (no Dark child row).
- Empty layout and loading layout are not in Figma; padding 15 around the empty art is added.
- Line heights inherited from Table Cell (12px text 16 vs 17; header ≈14 vs 12).

## Not adopted
- Loose canvas items on the Table page: two background rectangles, six stray Table Cell / Multiselect Tag instances, the “Add” frames (Search for Field / Origin / Origin City / Origin Country / Add new), the “Notes” card (“To be Built — Table Dropdown: Single Selection, Multiselection, Table with Tags?, Add New Dropdown”), the `Dropdown Filters` instance (built under Filter By).
- Industry gaps, not added: sticky first column; row hover always on; batch-actions toolbar on selection; unsorted arrows only on hover; pagination; expandable rows; Column Picker wiring (kit has it; not drawn with the table).

## Sources
Figma rd3gmPnjhPo1d2GAlNSJOn · 211:52 · 104:363 · 2379:13135 · 2385:6833
Carbon Data table usage — https://carbondesignsystem.com/components/data-table/usage/
