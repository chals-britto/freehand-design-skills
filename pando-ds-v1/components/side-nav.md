# Side Nav — Pando DS V1

**Status:** Built 2026-10-28 · no review yet (everything published = Keep)
**Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟢 Menu (32:0) › `Side Nav` (2985:5095) and component set `Side Nav Single` (2985:4858)
**Files:** `side-nav.css` (styles + component tokens) · `side-nav.js` (`pdsSideNav`) · `side-nav.html` (live doc, shown in a page shell with the kit Top Header)
**Uses:** `icons.css` + kit icons `indicator-global-shipment`, `indicator-cost-20`, `indicator-cartons-20`, `indicator-details-20`, `indicator-load-material-20`, `indicator-sustainability-20`, `indicator-ai-14`

## What it is
Used as Navigation for within a page/section. *(Figma description)* A 40px icon rail, the left spine of the page shell.

## Variants
`Side Nav Single` — property `State` (Default · Active) + instance-swap `Icon`. `Side Nav` — one component: a 40 × 658 rail of 7 Side Nav Singles, first one Active.

| State | Item fill | Icon | Token |
|---|---|---|---|
| Default | none (rail #D9E6FF shows) | #234357 | `--side-nav-item-bg: transparent` · `--side-nav-icon` → `--pando-dark` |
| Active | #FFFFFF | #234357 | `--side-nav-item-bg-active` → `--white` |
| Rail | #D9E6FF | — | `--side-nav-bg` → `--status-blue-light` |
| Focus *(added in review — not in Figma)* | as state | as state | `2px solid --pando-blue`, offset 2px |

Figma sample icons, top to bottom: Global shipment, Cost, Cartons, Details, Load-Material, Sustainability, AI.

## Anatomy & spacing
Rail width 40 · rail height fills the shell (Figma sample 658) · item 40 × 40 · no gap between items · icon 20, centred (10px all round) · no radius, border or shadow.
Classes: `.pds-side-nav` (rail, `<nav>`) › `.pds-side-nav__list` (`<ul>`) › `.pds-side-nav__item` (`<a>` or `<button>`) › `.pds-icon.pds-icon--20`. Active: `.pds-side-nav__item--active` or `[aria-current]`.

## Behaviour
- Exactly one item is active. Click or Enter makes an item active (white fill + `aria-current`).
- The rail is one Tab stop (roving tabindex). ↑ / ↓ move focus between items and wrap at the ends; Enter activates.
- When focus leaves the rail, the next Tab into it lands on the active item.
- `pdsSideNav.init(nav)` (auto for `[data-pds-side-nav]`), `pdsSideNav.setActive(nav, indexOrElement)`, `pdsSideNav.getActive(nav)`; fires `pds-side-nav:change` with `{ item, index }`.
- No hover state, no tooltip, no expand/collapse — none in Figma.

## When (not) to use
- Use for navigation within a page/section. *(Figma)*
- No other usage text in Figma.

## Accessibility
- `<nav aria-label="…">` landmark with a list of links.
- Items have no visible text: each needs `aria-label` (the section name); icons are `aria-hidden`.
- `aria-current="page"` on the active item (set `data-current="location"` on the nav for in-page sections); `side-nav.js` keeps it in sync.
- Focus ring added in review — not in Figma.

## Open issues
- No visible labels and no tooltip in Figma — sighted users must guess what the icons mean.
- No Hover state in Figma (only Default and Active).
- No focus state in Figma — focus ring added in review.
- Active vs Default differ only by fill: #FFFFFF on #D9E6FF is 1.3 : 1, below the 3 : 1 non-text contrast guide (WCAG 1.4.11). Kept as Figma.
- The AI item uses `Indicator Icon/AI · Size=14px` stretched to 20px in Figma; the kit renders the same 14px icon at 20px. A 20px AI icon exists in the kit.
- Figma height 658px is a sample; the kit rail fills its container (`height: 100%`).

## Not adopted
Nothing — both published items (Side Nav, Side Nav Single × 2 states) are built.

### Industry gaps — not added
- Expand / collapse toggle (hamburger) to reveal labels — Fluent 2 Nav.
- Tooltip with the item name, placed to the right of the item — Fluent 2 Nav.
- Grouped sections / sub-items — Fluent 2 Nav; Carbon UI shell left panel.

## Sources
Figma Side Nav — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=2985-5095
Figma Side Nav Single — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=2985-4858
Fluent 2 Nav usage — https://fluent2.microsoft.design/components/web/react/core/nav/usage
Carbon UI shell left panel usage — https://carbondesignsystem.com/components/UI-shell-left-panel/usage/
