# Filter By — Pando DS V1 (molecule)

**Status:** Built 2026-10-28 · no review yet, every published item = Keep · **Figma:** Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › Filter w/Metrics (3027:387)
**Files:** `filter-by.css` (styles + component tokens) · `filter-by.js` (`pdsFilterBy`) · `filter-by.html` (live doc)
**Uses kit atoms:** `toggle.css/js` (Switch) · `dropdown.css/js` (Filter Dropdown Options list) · `calendar.css/js` + `timepicker.css/js` (date pickers) · `tag.css` (metric tags) · `button.css` (Reset text button) · `icons/icons-data.js`

## What it is
Pill-shaped filters for a filter bar: label, colon, applied value. The page also holds the bar (Dropdown Filters), the collapsible More Filters group, the inline Data Selection dropdown and the .Date and Time read-outs. Figma has no description text for these components. Top Filter (organism) composes these classes; every class is `.pds-filter-*`.

## Variants

### Filter By (3127:5307) — Type × State × Theme, 14 variants
| | Light | Light Hover | Dark | Dark Hover |
|---|---|---|---|---|
| Fill | `--white` | `--border-input-light` #E2EAEC | `--dark-bg` #393945 | `--dark-input-text` #8A8A9E |
| Border (1px inside) | `--border-grey` #EFEFEF | `--border-blue` #E9F1F5 | #484858 *(off-token)* | `--border-blue-grey` #B5C3CB |
| Label + colon | `--text-medium` #545454 | same | `--dark-label-text` #D5DAF4 | `--text-dark` #313131 |
| Filled value (SemiBold) | `--pando-blue` #0076DD | — | #FFE01B *(off-token)* | — |
| Empty value (Italic) | `--text-medium` | same | `--dark-input-text` | `--text-dark` |
| Caret | `--dark-bg` | same | `--dark-bg` (invisible) | `--dark-bg` |
| Search icon | `--grey-medium` #A3A3A3 | same | `--border-blue` #E9F1F5 | — |

Published combinations: Dropdown Filled/Empty/Hover × Light/Dark (6) · Search Filled/Empty/Hover Light + Filled/Empty Dark (5) · Toggle Filled/Empty/Hover Light (3).
- Dropdown: label · colon · value · caret. Empty copy “Select”, Filled sample “&lt;Filter Value&gt;”.
- Search: search icon · label · colon · value (caret hidden). Empty copy “Search”, Filled sample “&lt;Search Value&gt;”.
- Toggle: label · colon · kit Switch with action text (Filled = Yes, Empty = No).

### Dropdown Filters (3129:5578)
Bar of Filter By pills. Fill `--accent-alternate-white` #F9FAFA · height 36 · padding 6 / 20 · gap 10. A hidden “More Filters” link and divider exist in the frame (not built).

### More Filters (3047:11637) — State Closed | Open, boolean Reset Button (default true)
- Closed: 24px funnel button (white 65%, radius 2, padding 5, Navigation/Filter-10px `--pando-dark`).
- Open: Filter By pills (20 apart) · kit Text Button Small “Reset” · 20px close (white 65%, radius 2, 8px cross `--text-dark`) · gap 15.

### Data Selection Dropdown Filter (4481:3721) — Type Default | With Label
“&lt;Filter by&gt;” Open Sans SemiBold 14 / 10, Title Case, #18283B *(off-token)* · Dropdown arrow 10×5 `--dark-bg` · gap 10. With Label adds 11 / 16 Regular “Label :” in `--text-medium`, gap 5.

### .Date and Time (3048:12081) — Type Date Selection | Time | Date Range | Metrics
Booleans: Show Label (true) · Show Time (false) · Right & Left Navigation (false) · Reset (false).
- Date Selection: “Delivery Date :” SemiBold 10 / 10 #20354E · calendar icon 10 #36577E · “01 Jan '23” Bold 14 / 10 #18283B · gaps 10 / 5. Show Time adds “- 10:00 AM” (time Regular 14). Reset adds a 14px `--border-blue-grey` divider + kit Text Button “Reset”.
- Date Range: same, “01 Jan '24 - 07 Jan ‘24”; navigation adds 29×24 arrow buttons with a 1px `--border-blue-grey` edge.
- Time: “Bid Ends” `.type-10-bold` #18283B over “0:00:00” Bold 14 `--accent-red-medium`, gap 5.
- Metrics: “SELECTED :” SemiBold 10 #36577E · three metrics 20 apart, each Tag (Purple, 17px, 12 SemiBold) · qty `.type-13-semibold` `--status-purple-dark` · unit 10 SemiBold `--text-light`. Samples Wt. 0 mt. · Vol. 0 cbm. · Qty 0 pcs. (a fourth metric is hidden).

## Anatomy & spacing
Pill: height 24 · padding 4 / 10 · gap 5 · radius 12 · caret box 12 (arrow 12×6) · search icon 8. Text 11 / 16.
px values used (not in the spacing scale): 4, 5, 6, 14, 17, 20, 24, 29, 36; radius 2. Existing tokens used: `--space-10`, `--space-15`, `--radius-12`.

## Behaviour
- Dropdown / Search / Data Selection: click opens the kit Filter Dropdown under the trigger (Search type with its search header). Single pick applies and closes; multi-select keeps it open and joins labels with “, ”. Esc or an outside click closes.
- Toggle: the kit Switch; on = Filled.
- More Filters: funnel opens the group, × closes it. Reset clears every filter in the surrounding bar (`[data-filter-scope]`), else in the group.
- Date / Date Range: trigger opens the kit Calendar (range mode for Date Range, Date + Time fields when Show Time). Apply writes “DD Mon 'YY”. Range arrows move the range by its own length. Reset returns the date to its first value.
- Time and Metrics are read-only.
- Events: `pds-filter-change` `{ label, value, values }` and `pds-filter-reset`, both bubbling. Helpers: `applied(scope)`, `clear(item)`, `clearAll(scope)`.
- None of this behaviour is written in Figma; it is the build’s reading and needs confirming.

## When (not) to use
Figma has no usage text for these components.

## Accessibility
- Pills and Data Selection are `<button>`s; the kit dropdown sets `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`. Toggle pill is `role="group"` around the kit `role="switch"`.
- Funnel `aria-label="More Filters"`, close `aria-label="Close"`, range arrows “Previous” / “Next” (added — not in Figma). Date trigger opens a `role="dialog"` calendar.
- Focus ring `2px --pando-blue`, offset 2 — added in review, not in Figma.
- Contrast for the accessibility pass: dark caret 1 : 1 (invisible) · dark “Select” 3.37 : 1 · dark Hover text 3.85 : 1 · light search icon 2.52 : 1 · Time value 3.62 : 1 · blue value on Hover fill 3.71 : 1.

## Open issues
- Dark Filled / Empty caret is the same colour as the fill.
- Off-token colours: #484858, #FFE01B, #18283B, #20354E, #36577E.
- Line heights: 11 / 16 (kit 15); 14 / 10 values; 10 / 10 date label.
- Open Sans Italic is not loaded by `tokens.css`.
- Atom variant missing in kit: Tag Small at 17px / 12 SemiBold (Metrics) — overridden inside the component.
- Hidden remote “Filter Dropdown” (110×10) inside More Filters could not be read; assumed to be Data Selection Default.
- No open state, list offset or Apply in Figma; list opens 4px under the trigger and applies on pick.
- Range-arrow behaviour not specified.
- Sample date mixes ' and ‘.
- Reset copy “Reset” vs “REset”.
- Toggle and Search Hover exist in Light only.

## Not adopted
Hidden layers: the “More Filters” link (Navigation/Filter-10px + 10 SemiBold caps #376F99) and divider in Dropdown Filters; the hidden Line 154 in More Filters Open; the extra hidden Filter By instances, hidden Filter Dropdown and Toggle slots in More Filters; the hidden Calendar-Input icon in Data Selection; the fourth hidden metric. Applied-filter chips: not a Figma component — the doc page shows them with the kit Filter Tag as a page demo only.

## Industry gaps — not added
- Applied-filter count on the closed More Filters button; clear without reopening (Carbon Filtering).
- “Clear all” per category / across categories; batch “Apply filters” for slow data (Carbon Filtering).
- Dismissible applied-filter tags that wrap, not truncate (Fluent 2 Tag).

## Sources
Carbon Filtering pattern — https://carbondesignsystem.com/patterns/filtering/
Fluent 2 Tag usage — https://fluent2.microsoft.design/components/web/react/core/tag/usage
