# Top Filter — Pando DS V1 (molecule)

**Status:** Built 2026-10-28 · no review yet, every published variant = Keep · **Figma:** Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › Filter w/Metrics (3027:387) › `Top Filter` (3103:8433) · `.Filter-Actions` (3033:9089)
**Files:** `top-filter.css` (layout glue, background, .Filter-Actions + component tokens) · `top-filter.js` (`pdsTopFilter`) · `top-filter.html` (live doc)
**Composes (not re-implemented):** `metrics-widgets.css/js` (`.pds-metric`, `.pds-metric-group`, `pdsMetrics`) · `filter-by.css/js` (`.pds-filter-more`, `.pds-filter-by`, `.pds-filter-date`, `pdsFilterBy`) with its atoms (toggle, tag, dropdown, calendar, timepicker, button) · `icons.css` + `icons/icons-data.js`

## What it is
The full-width band above a list: a source → destination read-out, More Filters, metric Widget Groups with view actions, and the date on the right. Figma has no description text. Only the background, the layout, the Source + Movement read-out, the Swappable slot placeholder and `.Filter-Actions` are new in this file.

## Variants

### Top Filter — Type (5) · `.pds-top-filter--<type>`
| Type | Class | Height | Left | Right |
|---|---|---|---|---|
| Default | `--default` | 124 | Filters row (Source + Movement · More Filters Closed) over Widgets row (3 groups · .Filter-Actions) | Date on top · right Widget Group (No Click, green numbers) at the bottom |
| Filter at bottom | `--filter-bottom` | 124 | Widgets row over More Filters **Open** (no close ×) | Date |
| Only stats | `--stats` | 100 | Widgets row only (padding 15 / 20) | Date |
| No Stats | `--no-stats` | 46 | Source + Movement · More Filters **Open** (with ×) | Date, centred |
| Swappable | `--swappable` | 46 | `.Swappable Content` slot · More Filters Closed | Date, centred |

Booleans (component properties): **Show Filters** (true → More Filters) · **Show Date Selection Filter** (true) · **Show Additional Time** (false → kit `.Date and Time` Type=Time “Bid Ends 0:00:00”) · **Show Action Button** (false — not built, see Open issues).

Figma sample content and instance overrides (built through `build()` options):
| Group | Metrics | Override |
|---|---|---|
| 1 (2 Widgets) | Pending 25 (**Active**) · On Hold 00 | Highlight `--status-brown-medium` #FAAE3C · On Hold number `--gradient-rejection-red` stops |
| 2 (2 Widgets) | Air 080 · Ocean 08 | kit Highlight #B495F7 |
| 3 (3 Widgets) | Ambient 15 · Frozen 00 · Refrigerated 00 | Highlight `--status-blue-medium` #6397F8 |
| Right (3 Widgets) | Selected Count 00 · Total Weight (LBS) 00 · Total Volume (Cft) 00 | No Click metrics · numbers `--gradient-forest-green` stops |

### .Filter-Actions (1) · `.pds-filter-actions`
Three 20×20 buttons stacked (padding 5, 10px icon), fill white 65%, 0.5px `--border-input-light` #E2EAEC line between them. Radii as drawn: 1st `0 0 2 2`, 2nd `2 2 0 0`, 3rd none. Icons: `action-widgets` and `action-add` in `--pando-dark` #234357, `action-fetch` in `--action-blue` #376F99. Labels from the Figma frame names: All Widgets · Reset View · Add View.

## Anatomy & spacing
- Background: linear gradient `#3F6ABF → #18283B` (vertical, −3.3% → 163.3%), under white 80%, inner glow white 47% blur 80. No radius. Built 100% wide (Figma 1280).
- Padding 10 / 20 (Only stats 15 / 20). Left column gap 10. Filters row gap 20. Widgets row gap 10. Right column right-aligned, space-between, min gap 17, 4px lower than the left column (date at y14 vs filters at y10).
- Source + Movement: “&lt;Source&gt;” Bold 14 / 18 · Movement 30×7 (5×5 diamonds `--accent-red-medium` → `--dark-highlight-green`, 20px 1px line #36577E @ 50%) · “All Consignees” Bold 14 / 10 · `#18283B` · Title Case · gap 10.
- Metric labels: bottom-aligned in a 20px box and allowed to wrap (overrides the kit’s one-line label inside `.pds-top-filter` only).
- Swappable slot: `--pando-light` fill · padding 3 / 10 · gap 20 · 12 Regular · title `--pando-dark`, text #000.
- px values not in tokens.css: 1, 3, 4, 5, 7, 17, 20, 30, 46, 0.5; radius 2; blur 80.

## Behaviour
`pdsTopFilter.build(o)` returns a wired element (`static:true` for markup only). `pdsTopFilter.init(el)` · `state(el)` · `reset(el)`.
- Clickable metrics toggle Active through `pdsMetrics` (each tile on its own — kit behaviour). `init` calls `pdsMetrics.init(document)`; do not also init an ancestor element, or clicks toggle twice.
- Filter pills, More Filters (open / close / Reset) and the date picker are the kit `pdsFilterBy` behaviour.
- Any metric or filter change fires `pds-top-filter-change` on the band, `detail: { metrics:[{label,value}], filters:[{label,value}] }`, and sets `data-applied="<count>"`.
- `.Filter-Actions`: Reset View → `reset(el)` (clears Active metrics and every filter / date inside the band). All Widgets and Add View only fire `pds-top-filter-action` `{ action }` for the product to handle. Every button also fires that event.
- None of this behaviour is written in Figma; it is the build’s reading and needs confirming.

## When (not) to use
Figma has no usage text for Top Filter. Roles from the Type names only (see Variants).

## Accessibility
- Composed controls keep their kit roles: metric tiles are `<button aria-pressed>`, pills and the date trigger are kit buttons, each Widget Group is `role="group"` “Widget Type”.
- `.Filter-Actions` is a `role="group"` “View actions” of three named icon buttons. Focus ring 2px `--pando-blue`, offset 2 — added in review, not in Figma.
- Movement mark is `role="img"` named “to”.
- Contrast (deferred): number gradients’ light ends — red #E96262 ≈ 3.0 : 1 and green #19A476 ≈ 2.9 : 1 on the tile, ≈ 2.3 : 1 on the bare band (right group). Active label white on #3F6ABF 5.2 : 1 passes.

## Open issues
- Show Action Button (Indicator Icon/Details 14 + Text Button Small) and the hidden Primary Button in Swappable: button text could not be read from Figma. Not built.
- Behaviour unspecified in Figma: single vs multiple Active metrics; what All Widgets / Reset View / Add View do; how metric clicks and filters combine.
- Filter at bottom: open More Filters has no close × (Figma override), so it can’t collapse.
- Off-token colours: #3F6ABF, #18283B (background, gradient angle ≠ `--gradient-ink-blue`), #18283B source text, #36577E movement line, #000000 slot text; red / green number gradients reuse token gradient stops at the kit metric angle.
- Kit metric label is one line with ellipsis; Figma wraps “Total Weight (LBS)”. Overridden in this file.
- Atom variant missing in kit: “refresh-line” icon of the Swappable slot — slot renders without it. `.Swappable Content` is a placeholder, not a component.
- No type tokens for Bold 14 / 18 and Bold 14 / 10.
- Background blur 100 on the veil not built (no visible effect); inner glow is not one of `--shadow-1..4`.
- 1px offsets: No Stats left row at y11 (Figma 10); Only stats date at y15 (Figma 14). Filter-Actions dividers drawn inside (Figma 0.5 centre).
- No responsive behaviour in Figma (1280 only); the band does not wrap.

## Not adopted
- Hidden layers: Movement Indicator (Status/Movement Type “Last Mile”), the 4th and 5th left Widget Groups, the 2-widget right Widget Group, Show Action Button frame (unreadable text).
- Industry gaps, not added: applied-filter count on the closed More Filters button, clearable without reopening; one “clear all” across categories; instant vs batch “Apply” choice for slow data (Carbon Filtering).

## Sources
Figma DS V2 – Molecules › Filter w/Metrics — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/?node-id=3027-387
Carbon Filtering pattern — https://carbondesignsystem.com/patterns/filtering/
