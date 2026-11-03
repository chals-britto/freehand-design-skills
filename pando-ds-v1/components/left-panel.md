# Left Menu Panel — Pando DS V1

> **Figma page marked in progress** (✏️ Panel) — values may still change.

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › ✏️ Panel (2116:447) › `Left Menu Panel` (2127:3654), `.Menu` (2592:19102), `.Menu-Item` (2592:18253), `.Third level menu` (2592:19139), `Header` (2943:8187), `.Swappable Content` (2943:8249), and the referenced `.State` set (2592:18924, read through its instances)
**Files:** `left-panel.css` (styles + component tokens) · `left-panel.js` (`pdsLeftPanel`) · `left-panel.html` (live doc)
**Reuses:** `tabs.css/js` (Tab Group, header Type=Tab Group) · `button.css` (Text Button Small, Action Button) · `button-group.css` · `icons.css` + `icons/icons-data.js` (nav-selected, system-status-warning-circle, nav-dropdown-arrow-stroke, action-add)

## What it is
The left menu helps for the user to access/navigate different modules or sections within an application. It remains anchored to the left side of the screen, offering users easy, persistent access to high-level features, configurations and settings. *(Figma description)*
Alternative names in Figma: Navigation Drawer, Side Nav, Side Panel, Nav Menu, Left panel, Left Rail, Vertical Menu.

## Variants
`Left Menu Panel`: `Type` × `Collapsed` = 4 · boolean `Heading` (default true).

| Variant | Class | Header | Body |
|---|---|---|---|
| Type=Menu, Collapsed=No | `.pds-left-panel` | Tab Group (`__header--tabs` + kit `.pds-tabs`) | `.Menu-Item` list (`__items`), first Active |
| Type=Internal Stages, Collapsed=No | `.pds-left-panel` | Header (`__title` + Button Group “Collapse”) | `.Menu` list (`__menu`): Primary + Secondary stages |
| Type=Internal Stages, Collapsed=Yes | `.pds-left-panel--collapsed` | header turned −90°, title `--pando-blue`, “Expand” | hidden |
| Type=Swappable, Collapsed=No | `.pds-left-panel` | Header | `.Swappable Content` (`__slot`) |

Panel: 260 × 700 (Figma), collapsed 52 · fill `--accent-light-blue-bg` #F3F6FC · padding-bottom 5.

**Header** (`Header Type` = 3)

| Type | Class | Values |
|---|---|---|
| Header | `__header` | 36 tall · padding 10 / 15 · gap 10 · title 12 SemiBold uppercase .3px `--pando-dark` → `.type-12-semibold` · kit Text Button Small “Collapse” |
| Tab Group | `__header--tabs` | padding-top 5 · kit Tab Group Light / Background=No, full width; tabs padding 5 / 15 / 0 in the panel (20 in the Header set) |
| Swappable | `__header--swap` | `.Swappable Content` 40 tall, padding 10, title “Swappable Header” |

**.Menu** (13): `Menu` × `Location` × `State`, booleans `Icon`, `Secondary Level`, text `Header`.

| Variant | Class / attribute | Values |
|---|---|---|
| Primary · Default | `__row--primary` | `--pando-dark` #234357 |
| Primary · Hover | `:hover` / `.is-hover` | bg `--accent-light-highlight` #E9F1F5 · text `#0078DD` (off-token) · 12×6 Dropdown-Arrow `--pando-blue` at right |
| Primary · Active | `[aria-current]` / `.is-active` | `--pando-blue` #0076DD |
| Primary · Disable | `[aria-disabled="true"]` | `--grey-medium` #A3A3A3 |
| Secondary · Completed | `__row--stage` + `__state--completed` | 14 circle `--accent-green-highlight` #008D5E + 8 white check (Navigation/Selected) |
| Secondary · Active | `__state--current` + `__warn` | 16 halo `--pando-blue` @12% + 8 dot `--pando-blue` · 12 Warning-Circle #FF8C54 / glyph #515151 |
| Secondary · Default | `__state--future` | 10 circle `--accent-blue-grey` #CBD4D8 |
| Location First / Middle / Last | `__row--first` / — / `__row--last` | dashed line above (9) / below (8) at opacity 0 for First / Last |
| Secondary Level = true | `__sub` after a stage `button[aria-controls]` | 1px `--accent-blue-grey` line 40 in · `.Third level menu` rows from 41 |

Row: 32 tall · padding 0 / 15 · gap 10 · radius 2 · 12 SemiBold. Stage label `--pando-dark`.

**.Menu-Item** (Panel's own, 3): `State` + booleans `Sub text`, `Header Code`, `Subtext Code`.

| State | Class / attribute | Fill | Text |
|---|---|---|---|
| Default | `__item` | none | `--action-blue` #376F99 |
| Hover | `:hover` / `.is-hover` | `--pando-dark` @10% | #376F99 |
| Active | `[aria-current]` / `.is-active` | `--white` | `--pando-dark` #234357 |

46 tall · padding 9 / 15 · gap 4. Header 12 SemiBold; Code 01 12 Regular `--pando-dark` (gap 8); Sub text “Base Accessorial” 10 SemiBold `#737373` (off-token) → `.type-10-semibold` without tracking; Code 02 12 Regular #737373 (gap 18).

**.Third level menu** (4): 220 × 32 · padding 10 / 15 · 12 SemiBold `--text-dark` #313131.
Default · hover (`--pando-light` #EEF2F4 fill) · Active (`--pando-blue-active` #005399 text) · Swappable (kit Action Button “New” with 10px Add icon).

**.State** (3, referenced): Completed · Current · Future — see the .Menu table.

**.Swappable Content** (placeholder, “Do not edit”): fill `--pando-light` · padding 10 (20 as the panel body) · gap 10 · title row 20 icon + 8 + “Swappable Content” 12 SemiBold `--pando-dark` · body “Swap this component out with another.” 12/16 Regular #000000 (off-token).

## Anatomy & spacing
Header (36) → body (scrolls). Px values not on the spacing scale, kept as component tokens: 260, 52, 5, 36, 35, 40, 32, 46, 9, 4, 8, 18, 16, 14, 12, 10, 8 (state sizes), 9 / 8 (connectors), 40 / 41 (sub-menu line), 20 (slot padding, icon), 2 (radius).

## Behaviour
- **Collapse / Expand**: the header Text Button toggles Collapsed=Yes (52px rail, header reads bottom → top) and back. Label switches “Collapse” ↔ “Expand”; `aria-expanded` follows. Event `pds-left-panel-toggle`.
- **Inner stage expand & collapse**: a stage with Tertiary items is a `button[aria-expanded][aria-controls]`; click toggles its `.pds-left-panel__sub`. Event `pds-left-panel-expand`.
- **Active item**: clicking a .Menu-Item, Primary row, stage link or Tertiary row sets `aria-current="page"` on it and clears it elsewhere in the panel. Disabled rows ignore clicks. Event `pds-left-panel-select`.
- **Hover**: Primary, .Menu-Item and Tertiary rows (Figma: “Primary menu have Hover interaction”).
- **Keyboard** (added in review, not in Figma): ↑/↓ previous/next visible row · Home/End · → opens a closed stage or moves into an open one · ← closes an open stage or returns from a Tertiary row to its stage · Enter/Space native.
- Stage markers (Completed / Current / Future) are data; clicking does not change them.
- Animation: NA (Figma).

## When (not) to use
*(Figma documentation)* Setup/masters sub group navigation · Transaction screens navigation between different stages. Placement: anchored to the left side of the screen.

## Accessibility
- Wrap in `<nav aria-label>`; rows are links, stages with children are disclosure buttons.
- Focus ring `2px solid --pando-blue` — added in review, not in Figma; drawn at offset −2px because the panel clips overflow.
- Stage state is visual only — add it in text (e.g. visually hidden “Completed”).
- Contrast below 4.5:1 on #F3F6FC: Disable #A3A3A3 2.3:1 · Active / collapsed title #0076DD 4.2:1 · Hover #0078DD on #E9F1F5 3.9:1 · sub text #737373 4.4:1. Non-text below 3:1: Future marker #CBD4D8 1.4:1 · Warning #FF8C54 2.1:1.

## Open issues
- Figma page marked in progress.
- Off-token colours: #0078DD (Primary hover), #737373 (sub text), #000000 (slot body).
- Warning-Circle here is #FF8C54 / #515151; kit icon is #E25757 / white — recoloured by CSS (atom variant missing in kit).
- `refresh-line` icon not in the kit — empty 20px slot.
- .State Completed also holds a Selected-Input instance under the drawn marker; only the visible marker built.
- Tab Group side padding 15 in the panel vs 20 in the Header set.
- Line-heights are Figma “auto”; `.type-12-semibold` is 17px — rows fixed at 32 / 36 / 46.
- Connectors: Figma 9 + 16 + 8 = 33 in a 32 row; the lower line is cut to fit. CSS dashes don't match the 1/4 dash exactly.
- Collapsed “Expand” label looks dark in the Figma render; built with the kit Text Button colour.
- No hover or selected style for Secondary rows in Figma; no focus states anywhere.
- Figma documentation frame is titled “Modals” (copy from another page).

## Not adopted
- The `Heading` boolean is supported by omitting `__title`; no separate variant drawn.
- Industry gaps, not added: selection indicator on a closed parent, chevron on rows with children, overlay drawer ≤ 640px, tooltips on truncated labels (Fluent 2 Nav); two-tier limit (Carbon left panel).

## Sources
Figma DS V2 – Organisms › ✏️ Panel (2116:447), read-only.
Carbon UI shell left panel — https://carbondesignsystem.com/components/UI-shell-left-panel/usage/
Fluent 2 Nav — https://fluent2.microsoft.design/components/web/react/core/nav/usage
