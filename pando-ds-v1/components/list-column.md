# List Column — Pando DS V1

**Status:** Built from Figma 2026-10-28 · no review (everything published treated as Keep) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › ✏️ List (1:870) — `List Column` (2479:10402), `List-Data (Adjustable)` (360:6), `.Route` (6199:2264)
**Files:** `list-column.css` (styles + component tokens) · `list-column.html` (live doc). No JS.
**Uses kit atoms:** `tag.css` (Input Tag, Multiselect Tag) · `status.css` · `skeleton.css` · `checkbox.css` · icons `status-indent-type-contract`, `status-movement-type-secondary`, `status-other-overpack`, `status-indent-type-sea`.

## What it is
One cell of a list row. Figma has no description text for these sets. List Column nests itself (Text + Tag and Route are built from Type=Text columns). The List molecule reuses these classes; `.pds-list-column` is self-contained.

## Variants
21 published variants, all built: List Column 15 · List-Data (Adjustable) 4 · .Route 2.

### List Column (2479:10402) — `Type` × `Size`
| Type | Size | Width | Content | Classes |
|---|---|---|---|---|
| Text | Small · Default · Large · Xtra Large | 80 · 120 · 180 · 220 | “Main Text” + “Additional Text” (Small: “Additional”) | `--small` `--default` `--large` `--xlarge` · `__main` `__sub` |
| Text + Tag | Default | 160 | Main Text + Multiselect Tag “+ 2” on one row (gap 6); Additional Text hidden | `--text-tag` · `__row` · `.pds-tag--count` |
| Tag | Default · Large · Xtra Large | 120 · 180 · 220 (XL hugs) | Input Tag “Text Input” (Remove=No) + “+ 2”, gap 6 | `--tag` · `.pds-tag--input` · `.pds-tag--count` |
| Status | Small · Default · Large | 130 · 130 · 160 | #Status Purple. Default/Large: Vertical with Contract, Secondary, Overpack. Small: horizontal 107 with Sea | `--status` · `.pds-status--vertical` / `.pds-status--small` |
| Skeleton | Default | hugs (120) | Skeleton Size=120, Light | `--skeleton` · `.pds-skeleton--120` |
| Route | Via | hugs (358) | Origin → “VIA” Transit Place → Destination, top-aligned | `--route` · `__place` `__via` `__arrow` |
| Route | Default | hugs (298) | Origin “+ 2” → Destination “+ 2” | `--route` · `.pds-tag--count` |
| Swappable | Default | hugs (331) | slot; Figma shows the .Swappable Content placeholder | `--slot` · `__slot-placeholder` |

| Part | Value | Token |
|---|---|---|
| Main Text / Col | 12 SemiBold, #313131 | `.type-12-semibold` · `--text-dark` |
| Additional Text / Col$Na | 12 Regular 12/16, #545454 | `.type-12-regular` · `--text-medium` |
| Route code | 10 Regular 10/12, +0.5, caps, #545454, truncate end | `.type-10-regular` + caps · `--text-medium` |
| “VIA” | 8 SemiBold caps, #005399 | `--type-8-regular` + 600 · `--pando-blue-active` |
| Route arrows | 1px #B5C3CB, round start, arrow-line end | `--border-blue-grey` |
| Swappable placeholder | fill #EEF2F4 · title 12 SemiBold #234357 · body 12/16 #000000 | `--pando-light` · `--pando-dark` · off-token |

### List-Data (Adjustable) (360:6) — `Property 1` × `Checkbox`
| Variant | Size | Padding | Classes |
|---|---|---|---|
| Single Data Point · Checkbox No / Yes | 113 / 137 × 36 | 10 | `--data` |
| Dual Data Points · Checkbox No / Yes | 113 / 137 × 52 | 8 / 10 | `--data --dual` · `__data` |
Fill white (`--white`). Checkbox = kit Checkbox (Light, Initial, unchecked), gap 10 to the data. Lines gap 4. Sample “Some data Here”.

### .Route (6199:2264) — `Property 1` + `Via` (boolean) + `Via2` (text, “Columbo”)
| Variant | Content | Classes |
|---|---|---|
| Single | Origin → “VIA” Transit Place → Destination, centred, 360 × 38 | `--route --route-center` |
| Multi | Origin “+ 2” → Destination “+ 2”, centred, 360 × 42 fixed | `--route --route-center` |

## Anatomy & spacing
- Column: vertical, gap 5 (Text + Tag: 4), width fixed per Size, height hugs. Text 16px line boxes → Text = 37 high.
- Tag row and Text + Tag row: horizontal, centred, gap 6.
- Status: the #Status atom fills the column (Small keeps 107).
- Route: places 100 wide (vertical, gap 5). Via connector 30 wide, padding 12/8/5/8 (.Route: 12/8/10/8), gap 5, arrow 14. Plain arrow 28 wide, padding 12/8, arrow 12. Arrow line sits 12 from the top.
- List-Data: padding 10 (Dual 8/10), gap 10, lines gap 4.
- Swappable placeholder: padding 3/10, gap 20, title gap 8, icon 20, body 150 wide.

## Behaviour
None defined in Figma. The only interactive part is the List-Data checkbox (kit Checkbox). Text longer than the column is cut with an ellipsis (build choice, see Open issues).

## When (not) to use
No usage text in Figma.

## Accessibility
- List-Data checkbox has no visible label: give the input `aria-label` (e.g. “Select row”) or `aria-labelledby` the cell text.
- Skeleton: `aria-hidden="true"`; set `aria-busy` on the list while loading.
- Route arrows are decorative (`aria-hidden`); order is carried by reading order and the “VIA” text.
- Truncated text stays in the DOM (read in full by screen readers); no tooltip for sighted users.
- Contrast for the a11y pass: arrows #B5C3CB on white 1.8 : 1; count-tag border #E2EAEC 1.2 : 1; “VIA” #005399 is ~7.8 : 1 but 8px.

## Open issues
- Text overflow undefined for Text, Text + Tag and List-Data (texts hug in Figma). Built with an ellipsis, as Route does (truncate ending).
- Line height: 12px text is Auto (16px box) in Figma, tokens use 17 → built 16 via `--list-column-lh`. “VIA” 8 SemiBold has no token → `--type-8-regular` + 600.
- Status column 130 vs kit Status default 140 → status fills the column. Small keeps 107 inside 130.
- Count / Input Tag text is #404040 in Figma (off-token); kit tags use `--color-text-primary` #313131. Kit kept.
- Route Size=Via and .Route Single differ only in alignment (top vs centre) and connector bottom padding (5 vs 10) → one route + `--route-center`.
- .Route `Via2` text property (default “Columbo”) target unclear — sample shows “Transit Place”. Built: Via on = connector + transit place.
- .Route Multi is 42 fixed high in Figma (content 33); built hugging.
- Hidden layers not built: 2nd Input Tag (Tag), Additional Text (Text + Tag), “Pin” + dashed line in every route arrow, transit in .Route Multi.
- Size=Xtra Large Tag hugs while other Tag sizes are fixed; “Via” is used as a Size value.
- Swappable body #000000 off-token. Atom variant missing in kit: `refresh-line` icon (20px) — inlined on the doc page only.
- No dark theme, no row hover / selected, no empty-value state.

## Not adopted
- `.List - OLD (REFERENCE)` 256:19 — reference only.
- Old `Column Picker` 1:1043 on the List page — reference only (Column Picker is built from the Dropdown page).
- `.Swappable Content` 3217:4896 is a placeholder, not a component: built only as the slot sample.

## Industry gaps — not added
- Full text of a truncated cell on hover — Ant Table `column.ellipsis.showTitle`.
- Two-line cells get a taller row (64px), header matches — Carbon Data table.
- Header checkbox with indeterminate; radios for single-select — Carbon Data table (List-level).

## Sources
Figma `List Column` 2479:10402 · `List-Data (Adjustable)` 360:6 · `.Route` 6199:2264 · `.Swappable Content` 3217:4896
Carbon Data table usage — https://carbondesignsystem.com/components/data-table/usage/
Ant Design Table — https://ant.design/components/table
