# Location Timeline — Pando DS V1

**Status:** Built from Figma 2026-10-28 (no review yet: every published item treated as Keep) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › Timeline (60:272) › `Location Timeline` (5751:2574) and `.Leg Movement` (5753:421)
**Files:** `location-timeline.css` (styles + component tokens) · `location-timeline.html` (live doc) · no JS (no behaviour)
**Uses kit atoms:** `readonly.css` (Label Readonly Text) · `icons.css` + `icons/indicator-road-14.svg`

## What it is
Figma has no description for either component. One leg of a shipment route: a transport-mode icon and a marker–line–marker rail on the left, and a card of read-only label : value pairs on the right.

## Variants
| Component | Variant | Figma node | Difference |
|---|---|---|---|
| Location Timeline | State=Default | 5751:2575 | the only variant · leg uses `.Leg Movement` State=Default |
| .Leg Movement | State=Default `__leg` | 5752:896 | rail `1.5px` solid `--pando-blue` #0076DD (style Primary/Pando-Blue) |
| .Leg Movement | State=Edit `__leg--edit` | 5753:445 | rail `1px` dashed 2 / 4, `--border-blue-grey` #B5C3CB |

Both leg states: marker 6px circle, fill `--white`, 1px border `--grey-dark` #515151, top and bottom; icon `Indicator Icon/Road` 14px in `--pando-dark` #234357 (`--icon-indicator`).

## Anatomy & spacing
- **Root** `.pds-location-timeline`: row · padding `0 15px` (`--space-15`) · gap `12px` (`--space-12`) · Figma 683 × 92.
- **Leg** `__leg`: row · gap `10px` · 40 wide · 66 tall standalone (`--location-timeline-leg-height`), stretches to the details height inside the timeline.
  - `__mode`: 24 wide · padding `10px 0` · icon centred.
  - `__rail`: 6 wide column · `__marker` / `__line` (fills) / `__marker`.
- **Details** `__details`: column · padding `10px 0` · fills the remaining width (card 601 in Figma).
- **Card** `__card`: fill #E9F1F5 @ 40% (`--border-blue` via color-mix) · radius `4px` · padding `15px 10px` · gap `10px` between rows.
- **Row** `__row`: two Label Readonly Text pairs, space-between, min gap `10px`.

| Part | Figma | Kit |
|---|---|---|
| Label + “:” | 12px/Body, Label/Regular/Normal · #404040 | `.pds-readonly__label/__sep`, colour overridden to `--location-timeline-label-color` #404040 (off-token) |
| Value | Input/Semibold/Normal · #313131 | `.pds-readonly__value` (`--text-dark`) |
| Empty value “NA” | Input/Regular/Italic · #313131 | `.pds-readonly__value--empty` (built here, atom variant missing) |
| ETA value “NA” | Input/Semibold/Normal · #404040 | `.pds-readonly__value--muted` |

Sample data (Figma): Associated Picks : Multiple Stops · Vendor : NA · Transit Time : NA · ETA : NA.

## Behaviour
None. Static; nothing focusable, no hover.

## When (not) to use
Figma has no usage text for these components.

## Accessibility
- Rail, markers and mode icon are `aria-hidden`; pairs read label, colon, value, left then right.
- Contrast: #404040 on card (#F6F9FB) 9.8 : 1; #313131 12.3 : 1 — pass. Edit rail #B5C3CB on white 1.8 : 1 (non-text, below 3 : 1) — kept as Figma. Default rail #0076DD 4.5 : 1.

## Open issues
- Label Readonly Text overrides not in the kit atom: #404040 label/“:” (off-token) and italic “NA” value — **atom variant missing in kit**, built inside this component.
- Empty values inconsistent: Vendor / Transit Time “NA” #313131 Italic, ETA “NA” #404040 SemiBold — kept as Figma.
- Line height: label 16px in Figma, kit `.type-12-*` is 17px → timeline renders 683 × 94 instead of 92.
- Only one Location Timeline state; no Edit timeline, hover, selected, first/last-leg or current-position treatment.
- Mode icon has no text alternative; transport mode is not announced.
- Only Road shown; allowed mode icons not specified.
- No min/max width or long-value rule (Figma root fixed 683).

## Not adopted
- Hidden layers in Figma: Header (“Domestic Haulage” stage label + empty Button frame, 5752:774), a third details row (5753:468), marker sub-layers Outer Node #D9E6FF / Inner Node #2D0645 / Light Opacity and a hidden #F2E7FE line — no published state uses them.
- Event Timeline, .Timeline-SLA, Timeline with Status-Tag on the same page — separate item.

### Industry gaps — not added
- Loading / in-progress item. *(Ant Timeline)*
- Status-coloured or custom-icon dots. *(Ant Timeline)*
- Reverse order and horizontal orientation. *(Ant Timeline)*

## Sources
Figma — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=5751-2574 · node-id=5753-421
Ant Design Timeline — https://ant.design/components/timeline
