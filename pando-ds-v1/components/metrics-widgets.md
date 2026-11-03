# Metrics + Widgets — Pando DS V1

**Status:** Built 2026-10-28 · no review yet — every published variant treated as Keep · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › Filter w/Metrics (3027:387) › `Metrics` (3029:4841) · `.Widget Type` (3029:4839) · `Widget Group` (3028:3470) · `Widgets` (6025:2174)
**Files:** `metrics-widgets.css` (styles + component tokens) · `metrics-widgets.js` (`pdsMetrics.init`) · `metrics-widgets.html` (live doc) · uses `icons.css`, `button.css`

## What it is
Count tiles for the filter area. **Metrics**: small 70px tiles, pinnable or clickable. **Widget Group**: a row of 2–6 clickable metrics under a rotated “Widget Type” label. **Widgets**: rounded count cards, light or dark, with an edit mode. Figma has no written description; roles are inferred from variant names. No charts — text and icons only. Top Filter composes this; classes are self-contained (`pds-metric`, `pds-metric-group`, `pds-widget`).

## Variants

### Metrics — Type × State × Alt (11) · `.pds-metric`
| Variant | Classes | Size | Fill | Border | Text / number | Icon · pin |
|---|---|---|---|---|---|---|
| No Click · Default · Light | `--no-click` | 100×70 | none | 0.5 inside `--white` | `--metric-label` #20354E · number gradient, 20/100% | — |
| No Click · Pinned · Light | `--no-click --pin --pinned` | 140×70 | none | 0.5 inside #20354E @50% | as above | Pin #3F6ABF on white 30% |
| No Click · Unpinned · Light | `--no-click --pin --unpinned` | 140×70 | white 50% | 0.5 inside `--dark-label-text` #D5DAF4 @50% | as above | Unpin #20354E @50% |
| Clickable · Default · Light | `--clickable` | 100×70 | white 65% | — | number gradient 20/80% | Dashboard #36577E · Highlight Line 1.5 #B495F7 |
| Clickable · Hover · Light | `--clickable .is-hover` | 100×70 | #325599 @40%, radius 2, blur 10 | — | label white · number hidden | icon empty in Figma · Highlight Line |
| Clickable · Active · Light | `--clickable .is-active` | 100×70 | #3F6ABF | — | label white · number #CADCFF | Dashboard #CADCFF · Highlight Line |
| Clickable · Default · Risk | `--clickable --pin --risk` | 140×70 | `--status-orange-light` #FFF4E5 | — | number `--action-red` #E25757 (“04”) | Risk `--status-orange-dark` #F94200 · Pin pinned · no Highlight Line |
| Pinnable · Default · Light | `--pinnable --pin` | 140×70 | `--grey-light` @30% | — | number gradient | Dashboard · Unpin |
| Pinnable · Pinned · Light | `--pinnable --pin --pinned` | 140×70 | `--dark-label-text` @50% | — | number gradient | Dashboard · Pin on white 30% |
| Pinnable · Default · Glass | `--pinnable --pin --glass` | 140×70 | white 80%, blur 50 | 0.5 centre `--border-blue` #E9F1F5 | number gradient | Dashboard · Unpin |
| Pinnable · Pinned · Glass | `--pinnable --pin --glass --pinned` | 140×70 | white 40%→0 over `--status-green-light` @40%, blur 50 | 0.5 centre `--dark-highlight-green` @50% | label/icon/pin `--status-cyan-dark` #006265 · number #19A476→#006265 | Pin on white 30% |

Number gradient (`--metric-num`): `linear-gradient(180deg, #3F6ABF -4.15%, #18283B 162%)`.

### .Widget Type (1) + Widget Group — Property 1 (5) · `.pds-metric-group`
Rail `.pds-metric-group__type`: 22×70, padding 0 3, white 25%, radius 2 0 0 2, text “Widget Type” Bold 8, +0.5 tracking, caps, `--dark-darker` #24242F, rotated (reads bottom → top).
Group = rail + 2 / 3 / 4 / 5 / 6 Clickable Default metrics, separated by `.pds-metric-group__divider` (0.5 × 69, `--border-blue-grey` #B5C3CB). Last metric radius 0 2 0 0. Sample: the 2 Widgets variant shows “080” in its first tile.

### Widgets — Theme × Type × State × Mode (9) · `.pds-widget`
| Variant | Classes | Fill | Bottom edge | Text |
|---|---|---|---|---|
| Dark · Transparent · Default · Default | `--dark` | #484858 @30% | 1px `--highlight-blue-light` #9CD2FF | count white · heading `--pando-light` |
| Dark · Transparent · Active · Default | `--dark .is-active` | `--status-green-dark` → `--dark-light` (90deg) | 1px `--dark-input-text` @30% | as above |
| Dark · Transparent · Default · Edit | `--dark --edit` | gradient | 1px #8A8A9E @30% | + drag #8A8A9E · More actions · Pin on #484858 |
| Dark · Transparent · Hover · Edit | `--dark --edit .is-hover` | gradient | 0.2 sides + 1.5 bottom #0078DD | drag #0078DD |
| Dark · Transparent · Disable · Edit | `--dark --edit .is-disabled` | #484858 @40% | 1px #8A8A9E @30% | count/heading/Unpin `--dark-input-text` #8A8A9E |
| Light · Transparent · Default · Default | `--light` | white 60% | 1px `--accent-green-medium` #67AC5D | count gradient · heading `--text-medium` |
| Light · Transparent · Active · Default | `--light .is-active` | white | 1px #67AC5D | as above |
| Light · Solid · Default · Default | `--light --solid` | white 60%, blur 4 | 1px #003D31 | Label #20354E · Dashboard #36577E · number gradient |
| Dark · Solid · Default · Default | `--dark --solid` | dark gradient, blur 4 | 1px `--accent-dark-blue-bg` #E0EBF6 | Label white · Dashboard #FFE01B · number `--pando-light` |

Sample text: “2000”, “Total Invoices”, “Label”, “08”. Hidden in every Figma variant (built as optional parts, not variants): `__additional` (24px divider + “100” + “%”) and `__trend` (“↗ +2.1% from last month” `--dark-highlight-green` / “↘ -1.2% from last month” `--action-red`).

## Anatomy & spacing
- **Metric:** padding 10 · gap 10 · height 70 · width 100 (140 with pin; pin tiles centre their content vertically). Label SemiBold 10/100%, Figma text “\nLabel” (built as 10px top padding → 20px box). Stat: icon 10 + 6 gap + number Bold 20 (100% No Click, 80% others). Pin box 24 circle, padding 5, glyph 14. Borders 0.5. Highlight Line 1.5 at bottom edge.
- **Widget (Transparent):** 180×73 · padding 10 15 · gap 4 · radius 20 · shadow `0 4 20` black 1% · Count Bold 24 auto · Heading Regular 12 auto · Count ↔ Additional gap 6 (dark) / 10 (light).
- **Widget (Edit):** padding 10 15 10 10 · drag handle 7×11 with padding 10 2 0 0 · side column 24 wide (More actions 20 + pin 24, space-between).
- **Widget (Solid):** 205×89 · padding 10 20 15 20 · gap 20 · Label SemiBold 12/100% (“\nLabel”) · number Bold 24 / 80%.
- px values not in tokens.css: 3, 4, 5, 6, 20, 22, 24, 69, 70, 0.2, 0.5, 1.5; radius 2, 20; blur 4, 10, 50.

## Behaviour
`pdsMetrics.init(root?)` (idempotent):
- Pin buttons (`.pds-metric__pin`, `.pds-widget__pin`) toggle `aria-pressed` and the glyph (Pin = pinned, Unpin = not). On a metric the tile switches between the Figma pairs: No Click Pinned ↔ Unpinned; Pinnable Default ↔ Pinned (Light and Glass).
- Clickable metrics: the full-tile `.pds-metric__hit` button toggles Active (`.is-active` + `aria-pressed`). Each tile toggles on its own (Figma does not say single or multiple).
- Hover: Clickable metric shows the Hover state; Edit widget shows the blue edge and blue drag handle.
- Fires `pds-metric-change` on the tile, `detail: { pinned }` or `{ active }`.

## When (not) to use
No usage text in Figma. Roles from variant names only:
- Clickable metric — a count that filters when pressed (Active = applied).
- No Click / Pinnable metric — a count to read, which can be pinned.
- Widget Group — 2–6 clickable metrics under one type label.
- Widget — a larger count card; Edit mode adds drag, More actions and pin.

## Accessibility
- Clickable metric: `<button class="pds-metric__hit" aria-pressed aria-label="Label: 08">`; pins are separate `<button aria-pressed aria-label="Pin|Unpin">` above it. More actions is the kit Icon Button with `aria-label="More actions"`.
- Focus ring 2px `--pando-blue`, offset 2 — added in review, not in Figma.
- Icons are decorative (`aria-hidden`); Risk is carried by colour + icon only — put the meaning in the label.
- Widget Type rail uses `writing-mode`, so it stays real text.

## Open issues
- Label text is “\nLabel” at 10/100% (12/100% on Solid); doesn’t match `.type-10-semibold` (12px line-height, +0.5 tracking) or `.type-12-semibold` (17px).
- Clickable Hover hides the number and its icon (“Indicator Icon/Dashboard/14px”) is an empty component — kept as Figma.
- Active fill and Pin glyph are one-stop gradients (#3F6ABF) — built as solid.
- Off-token colours: #20354E, #3F6ABF, #18283B, #36577E, #B495F7, #325599, #CADCFF, #19A476, #484858, #0078DD (≈ `--pando-blue` #0076DD), #003D31, #FFE01B.
- Widget shadow `0 4 20` 1% is not one of `--shadow-1..4`.
- No type tokens for Bold 20 / 80%, Bold 24 auto, Regular 12 auto, Bold 8 caps.
- Atom variant missing in kit: 14px More Actions glyph (“No Circular / Icon / 14px”); used the 10px `action-more-actions` at 14.
- Group dividers carry a 125px background blur and 8% drop shadow in Figma — not built.
- 6 Widgets group uses a detached “Widget Type” instance; same look.
- Transparent widgets render 74px tall vs Figma 73 (auto line-height rounding).
- Contrast < 4.5:1: white label on Hover (~2.1:1); Disable text #8A8A9E (~3.4:1); dark/translucent widgets need a backdrop this file doesn’t supply.
- No disabled, loading or empty-value state for Metrics; no focus visuals in Figma.

## Not adopted
- Industry gaps, not added: loading state, number formatting (separator, precision), prefix/suffix unit slots (Ant Design Statistic).
- Hidden Metric “Unit” layer (“unt”) — not built.
- `.Swappable Content` (4799:9478) on the same page — slot placeholder, not a component.

## Sources
Figma DS V2 – Molecules › Filter w/Metrics — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=3027-387
Ant Design Statistic — https://ant.design/components/statistic
