# Status — Pando DS V1

**Status:** Built from Figma 2026-10-23, not yet reviewed (everything published treated as Keep) · **Figma:** DS V2 – Atoms › 🟢 Status › `#Status` (270:188), description “Status - Indicate Information”
**Files:** `status.css` (styles + component tokens) · `status.html` (live doc). No JS — Status is not interactive.

## What it is
Presents information as to what is the current status of an item. Can also add additional context and information with the help of icons. *(Figma wording)*

## Variants
`Theme` × `Color` × `Layout` × `Size` — **36 variants** exist in Figma (not the full grid):
Light × 9 colours × {Horizontal Default, Horizontal Small, Vertical Default} = 27 · Dark × 9 colours × Horizontal Default = 9.

| Color | Light bg | Light label + icon | Dark label + icon |
|---|---|---|---|
| Purple | `--color-status-purple-bg` #F2E7FE | `--color-status-purple-text` #2D0645 | `--color-status-purple-border` #AB63F8 |
| Maroon | `--color-status-maroon-bg` #FFE3EA | `--color-status-maroon-text` #54021A | `--color-status-maroon-border` #FFA9BD |
| Brown | `--color-status-brown-bg` #FFEEC4 | `--color-status-brown-text` #422500 | `--color-status-brown-border` #FAAE3C |
| Cyan | `--color-status-cyan-bg` #BDF0F4 | `--color-status-cyan-text` #006265 | `--color-status-cyan-border` #63EBF8 |
| Blue | `--color-status-blue-bg` #D9E6FF | `--color-status-blue-text` #0D204A | `--color-status-blue-border` #6397F8 |
| Green | `--color-status-green-bg` #D5F9D1 | `--color-status-green-text` #041F04 | `--color-status-green-border` #80E774 |
| Grey | `--grey-light` #E7E7E7 | `--grey-dark` #515151 | `--grey-light` #E7E7E7 |
| Orange | `--color-status-orange-bg` #FFF4E5 | `--color-status-orange-text` #F94200 | `--color-status-orange-bg` #FFF4E5 (no Medium step) |
| Red | `--color-status-red-bg` #FFEAEE | `--color-status-red-text` #FF0000 | `--color-status-red-border` #F8637E |

- **Dark background:** `--dark-bg` #393945 at 70% (all colours). **Dark icon strip:** `--pando-dark` #234357 at 20%.
- **Light icon strip:** the colour’s own Light background at 20%.
- The “border” (Medium) step is **not used as a border** anywhere — no variant has a stroke. In Dark it is the label colour.
- **Size:** Default 140px wide · Small 107px wide (Horizontal only). Height 20px.
- **Layout:** Horizontal = icon strip to the right of the label · Vertical = icon strip below (Light, Default only), total 140 × 42.

Classes: `.pds-status` + `--<color>` + optional `--small`, `--vertical`, `--dark`.

## Anatomy & spacing
- **Label** (`.pds-status__label`): padding 2 / 5 · radius 2 · fills the width · text centred.
  Text style Figma “Button/Action-Semibold”: Open Sans 12 SemiBold, **UPPERCASE**, 0 tracking, auto line-height (16px box) → `.type-12-semibold` with `line-height: 16px`.
- **Icon strip** (`.pds-status__icons`): icons 14 × 14, same colour as the label.
  - Horizontal: 23 × 20, padding 3 / 4 / 3 / 5, radius 0 2 2 0, overlaps the label by 1px (Light; Dark: 0 overlap). Figma sample: 1 icon (Sea).
  - Vertical: 140 × 23, padding 5 / 4 / 4 / 4, gap 2, radius 0 0 2 2, overlaps by 1px. Figma sample: 3 icons (Contract, Secondary, Overpack).
- The icon strip is optional in markup: leave out `.pds-status__icons` for a label only (Figma `.Base` has “Show Icons”, default on).
- No shadow.

## Behaviour
Not interactive. The text label updates based on information but they are not clickable or actionable. *(Figma wording)*

## When (not) to use
- Keep the text as short as possible (2 words or less). *(Figma wording)*
- Order of status colours in workflows *(Figma “Placement & Convention”)*: 1 Purple (START) · 2 Maroon · 3 Yellow · 4 Cyan · 5 Blue · 6 Green (END) · Error: Red · Neutral: Grey · If necessary: Orange.

## Do / Don’t
None in Figma.

## Accessibility
- Plain text in a `<span>`; icons are `aria-hidden="true"`. If an icon carries meaning the label doesn’t (e.g. “Sea”), add it as visually-hidden text or `title` — not defined in Figma.
- Contrast (deferred to the accessibility pass):
  - Light: Orange #F94200 on #FFF4E5 **3.33:1**, Red #FF0000 on #FFEAEE **3.48:1** — below 4.5:1.
  - Dark: on the sidebar `--dark-bg` all colours except Purple (3.18:1), Blue (3.96:1), Red (3.84:1) pass 4.5:1. On a white page the 70% background fails for every colour (1.3–4.3:1) — Dark is for dark surfaces only.
- Colour is the only difference between statuses besides the text — the label must always say the status.

## Open issues
- Doc order names **Yellow**, but there is no Yellow variant; Brown (#FFEEC4 bg) appears to fill that slot. Confirm.
- Light Purple, Horizontal (both sizes): fills are raw hex, not linked to the Status/Purple styles (values match).
- Fixed widths (140 / 107) — what happens to long labels is not defined. Built with single-line ellipsis.
- Dark exists only as Horizontal Default; Vertical and Small have no Dark variant.
- Gap between label and icon strip is −1 in Light and 0 in Dark — kept as Figma.
- Line-height: Figma auto (16px) vs `.type-12-semibold` 17px — overridden to 16px.
- Icon set: icons are instance-swaps from the Icons page (Status/Indent Type, Status/Movement Type, Status/Other, + one more set). Only the 4 sample icons are embedded on the doc page.
- Contrast failures above.

## Not adopted
- `.Base` (10239:8823) and `.Base Alt` (10180:1525) with secondary text (“1/3”) and the `.Base` “Show Secondary Text” / 1st–4th Icon booleans — internal building blocks, not exposed on `#Status`.
- Loose instances (10183:2392, 8651:640–643 with “L1 inprogress decision”, “approved”, “Rejected”, “Draft”) and “Rectangle 1” (584:18) — examples / leftovers.

## Industry gaps — not added
- Dismissible / selectable / operational tag types. — Carbon Tag https://carbondesignsystem.com/components/tag/usage/ · Ant Design Tag https://ant.design/components/tag
- Truncation with the full text in a tooltip on hover/focus. — Carbon Tag
- Three sizes (S/M/L); V1 has 2 widths, same height. — Carbon Tag
- Filled / outlined variants (Ant `variant`). — Ant Design Tag
- Sentence-case labels (V1 is uppercase) and an aria-label for icon-only badges. — Fluent 2 Badge https://fluent2.microsoft.design/components/web/react/core/badge/usage

## Sources
Figma `#Status` 270:188, documentation instance 3205:3311, page 249:172.
Carbon Tag usage — https://carbondesignsystem.com/components/tag/usage/
Fluent 2 Badge usage — https://fluent2.microsoft.design/components/web/react/core/badge/usage
Ant Design Tag — https://ant.design/components/tag
