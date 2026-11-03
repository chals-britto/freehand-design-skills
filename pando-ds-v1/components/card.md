# Card — Pando DS V1

**Status:** Built 2026-10-28 · no review yet (everything published = Keep)
**Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › ✏️ Card (77:4761) › `Card` 2339:6863 · `Card/Consignment` 419:3564 · `Card/Settings` 2339:5833
**Files:** `card.css` (styles + component tokens) · `card.html` (live doc). No JS — Consignment hover is CSS only.
**Uses kit atoms:** `avatar.css` (Icon Avatar, Active Card) · `tag.css` (Tag Small Filled Purple; Multiselect Tag `.pds-tag--count`) · `badge.css` (Count) · `input.css`/`input.js` (Input - Text) · `button.css` (Action button = Icon+Action) · `icons.css` + `icons/` (indicator-road-14, indicator-details-14, system-status-warning-circle, action-fetch, action-edit, misc-add-attachment-light-40-default).

## What it is
Cards used in Documents, Procure, Settings, Dashboard Widgets. *(Figma set description)*

## Variants
`Card`: Theme × Type × State = 7 variants, + booleans `Show Stat Layer 1` / `Show Stat Layer 2` (default off).

| Variant | Class | Card fill | Header / section | Heading | Sub |
|---|---|---|---|---|---|
| Light · Single · Default | `.pds-card` | `--white` | none | `--text-dark` #313131 | `--text-dark` |
| Light · Single · Active | `--active` | `--white` | `--accent-light-highlight` #E9F1F5 | `--pando-blue-active` #005399 | `--text-dark` |
| Light · Single · Empty | `--empty` | `--white` | white + 1px inside `--border-blue-grey` #B5C3CB | `--dark-highlight-green` #1FCD93 | `--grey-medium` #A3A3A3 ("Description Text") |
| Dark · Single · Empty | `--dark --empty` | white (covered) | `--dark-darker` #24242F + 1px inside `--dark-input-text` #8A8A9E | #1FCD93 | `--dark-input-text` |
| Dark · Single · Default | `--dark` | `--dark-light` #343440 | none | `--dark-label-text` #D5DAF4 | #D5DAF4 |
| Dark · Single · Active | `--dark --active` | `--dark-darker` #24242F | none | #1FCD93 | #D5DAF4 |
| Light · Documents · Active | `--documents --active` | `--white` | #E9F1F5 section | #313131 | #313131 |

Icon: Icon Avatar Active Card Purple + Road 14 (light); Avatar Dark Active Card (#343440 / #D9E6FF) for Dark Default; plain ellipse `.pds-card__indicator-dot` (#343440, glyph #D9E6FF) for Dark Active; no icon on Empty.

`Card/Consignment` (`.pds-card--consignment`): State Default (0.5px `--border-blue-grey`) · Hover (`--pando-blue` #0076DD; `:hover` or `.is-hover`).
`Card/Settings` (`.pds-card--settings`): one component.

## Anatomy & spacing
- **Card:** 250 wide · radius 2 · `--shadow-2`. Header padding 10, gap 8, top-aligned; text column 170 fixed; warning icon 12.
- **Heading** `.type-12-semibold` · **Sub** `.type-10-regular` + 0.5px tracking. Empty: heading↔description 4.
- **Stat layer:** padding 10 · gap 9 · space-between · tag↔value 6 · value 12 regular `--text-medium`, sample "-".
- **Documents:** blocks 9 apart · highlight section padding 10, gap 10 · attachment row gap 10 (tile 40; Filled Image tile: image 36 at 2,1, Badge Count "+3" at 30,−6) · body text padding 0 10, gap 2 ("Heading or Text" 12 semibold, "Body Text" 12/16 regular) · two Input - Text 250, 4 apart · Tag Info padding 0 10 10, rows 10 apart, space-between, tag↔value 4, values 12 regular #5A6277 (Wt 559.74 Kgs · Vl 245.5 CFT · Qty 491).
- **Consignment:** 330×50 · padding 0 10 · space-between, centred · columns 110 / 130, line gap 4 · "CN6100006076" / "Received at Hub" 12 semibold #404040 · "DHL" 10 regular `--text-light` · "23 Apr ’21 | 4:30 PM" 10 regular `--text-medium` · Action button "Fetch".
- **Settings:** 397 wide · radius 4 · padding 10 0 · gap 5 · no shadow. Header padding 0 15 5 15: Circular Indicator 30 (pad 8, #D9E6FF @ 70%, Details 14) + 15 + "contract field mapping" 12 semibold uppercase 0.5px `--pando-dark`; Action button "Edit" right. Column row padding 5 20 0 20, gap 10: "Pando Field" (Unit/Small, 150) + "import column" (153), both 10 semibold uppercase 0.5px `--pando-blue-active`. Rules list padding 0 10, gap 2; each Rule padding 8 10, gap 10, alternating `--accent-alternate-white` #F9FAFA / white: Unit/Small 150 (12 semibold `--pando-dark`) · value 12/16 regular `--text-dark` · Multiselect Tag "+ 2". 11 rows of Figma sample data.

## Behaviour
- Stat layers are shown by adding `.pds-card__stats` blocks (Figma booleans).
- Consignment card: border turns `--pando-blue` on hover. No other card has interactive states in Figma.

## When (not) to use
Only Figma text exists: used in Documents, Procure, Settings, Dashboard Widgets. Loose note on the page: "12px heading with subheader - icon / 14px heading / no subheader - no icon" (no 14px variant exists in the set).

## Accessibility
- Each card is an `<article>` named by its heading (`aria-labelledby`); Consignment uses `aria-label`.
- Settings rules are a `<ul>`; the column header row is `aria-hidden`.
- Fetch / Edit are `<button>`s (kit Action button). Warning icon has `role="img" aria-label="Warning"`.
- Contrast for the accessibility pass: #1FCD93 on white 1.9:1 · #A3A3A3 on white 2.5:1 — kept as Figma.

## Open issues
- Atom missing in kit (remote library): **Unit/Small** — built as `.pds-card__unit`.
- Atom missing in kit (remote library): **Rule** — built as `.pds-card__rule`; its hidden "Property 1=Default" variant not built.
- Atom missing in kit (remote library): **Circular Indicator** (Cyan, Depot Manager) — built as `.pds-card__indicator`; #D9E6FF @ 70% ≠ kit avatar cyan #BDF0F4.
- Remote **Multiselect** (Number Only) matches kit Multiselect Tag exactly — reused `.pds-tag--count`; confirm same component.
- Atom variant missing in kit: **Misc/Add-Attachment Filled · Type=Image** — built as `.pds-card__thumb`; photo not exported, #C4C4C4 mask fill stands in.
- Dark Empty keeps a white outer fill under the dark section. Dark Active uses an ellipse group instead of the Icon Avatar.
- Stat-layer tags have no label text in Figma (empty, 18 and 45 wide); values "-".
- Settings header: Figma's 64px gap overflows the 375 row; built with Edit at the right edge.
- Documents inputs: instance label #616161 / placeholder #737373 vs kit Input tokens — kit wins.
- Off-token: #5A6277 (Tag Info value), #404040 (Consignment text), #C4C4C4 (image mask).
- Line-heights: Figma "auto" on 12 semibold (≈16) vs `.type-12-semibold` 17; Body Text and rule values 12/16 have no type class.
- No focus / selected / disabled states in Figma.

## Not adopted
- Loose "Lane Card" instance (2725:11200, State=Empty of a separate Lane Card) — not built.
- Hidden "Stat" inside the header text column (tag + "Value") — hidden with no property; not built.
- Hidden Rule "Property 1=Default", hidden "$5" text and hidden caret pair in Card/Settings — not built.
- Loose text and Rectangle 11 on the page — notes only.
- Industry gaps (not added): selectable card, clickable card with focus/disabled, expandable card, keyboard focus modes.

## Sources
Fluent 2 Card usage — https://fluent2.microsoft.design/components/web/react/core/card/usage
Carbon Tile usage — https://carbondesignsystem.com/components/tile/usage/
