# New Main Menu — Pando DS V1

**Status:** Built 2026-10-28 · no review yet (everything published = Keep)
**Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟢 Menu (32:0) › component set `New Main Menu` (2280:1704) + parts `.Menu-Item` (803:709), `.Fly Out` (2459:5585), `.Secondary menu` (2379:6919), `.Secondary menu/Arrow/Default` (2459:5420), `.Secondary menu/Arrow/Hover` (2459:5423), `.Menu-Heading` (2455:5079), `.Third level menu` (2448:4408), `.Name` (2282:4032), `.Logout` (2769:15877)
**Files:** `main-menu.css` (styles + component tokens) · `main-menu.js` (`pdsMainMenu`) · `main-menu.html` (live doc)
**Uses (kit):** `icons.css` + icons `menu-close`, `menu-analytics`, `menu-data-manager`, `menu-procure`, `menu-planning-alt`, `menu-tms`, `menu-fap`, `menu-integrations`, `menu-settings`, `menu-dashboard` (.Menu-Item default), `nav-right-caret`, `indicator-logout-14` · `scrollbar.css` (`.pds-scroll--light`) · `avatar.css` (Text Avatar) · `tooltip.css/js` (Style=Text) · `button.css` on the doc page only.

## What it is
The app’s main navigation. A 60px icon rail (modules) with a 250px fly-out (pages) that can open a third level. No description text in Figma.

## Variants
`New Main Menu` — property `Type`, 9 variants, each 310 × 718.

| Type | Rail Active item | Fly-out | Figma sample rows |
|---|---|---|---|
| Default | none | none | — |
| Analytics | Analytics | yes | Dashboard · Reports |
| Master Data | Data-Manager | yes | Rate Manager › Control Tower, Contracts, Setup · Rules › Approvals, General Setup · Data Manager |
| Procure | Procure | yes | Sourcing Events · Sourcing Request · Setup › Templates … AI Copilot Setup |
| TMS | TMS | yes (scrolls) | Control Tower · *Planning* · Order Hub · Plans · Setup › … · Planning Rejections · *Execution* · Shipments › … · Execution Setup › … · Execution Rejections |
| FAP | FAP | yes, heading “Freight Audit & Payment” | Costed Shipments › … · Invoices › … · Setup › … |
| Integrations | Integrations | yes | Shipment Tracking · Vessel Schedule · Rate Benchmark · Rejections · Settings |
| Settings | Settings | none — Tooltip “Settings” (beak 9:00) | — |
| Profile | none | none — Tooltip “Profile” (beak 9:00) on the avatar | — |

Parts:

| Part | States | Values | Tokens |
|---|---|---|---|
| `.Menu-Item` → `.pds-menu-item` | Default · Hover · Active | #FFFFFF · #E7E7E7 @ 30% · #F3F6FC | `--menu-item-bg` → `--white` · `--menu-item-bg-hover` (color-mix of `--grey-light`) · `--menu-item-bg-active` → `--accent-light-blue-bg` |
| `.Fly Out` → `.pds-main-menu__fly` | — | #F3F6FC | `--main-menu-fly-bg` → `--accent-light-blue-bg` |
| `.Menu-Heading` → `__heading` | Default · Hover (identical) | #0076DD, caps | `--main-menu-heading-fg` → `--pando-blue` |
| `.Secondary menu` → `__row` | Single Default / Hover · Arrow Default / Hover · Multiple Active | text #234357 · Hover #FFFFFF | `--main-menu-row-fg` → `--pando-dark` · `--main-menu-row-bg-hover` → `--white` |
| Sub menu line → `__line` | — | 1px #B5C3CB | `--main-menu-line` → `--border-blue-grey` |
| `.Third level menu` → `__third` | Default · hover | Hover #EEF2F4 | `--main-menu-third-bg-hover` → `--pando-light` |
| `.Secondary menu/Arrow/*` → `__third--arrow` | Default · Hover | 184 wide, caret, Hover #EEF2F4 | as third level |
| `.Name` → `__name` | — | #234357 | `--main-menu-name-fg` → `--pando-dark` |
| `.Logout` → `__logout` | Default · Hover | Hover #E9F1F5 | `--main-menu-logout-bg-hover` → `--accent-light-highlight` |
| Avatar (rail) | — | fill #EEF2F4, “FL” #0076DD, `--shadow-2` | `--main-menu-avatar-bg` → `--pando-light` · `--main-menu-avatar-fg` → `--pando-blue` |
| Section label → `__section` | — | #0076DD | `--main-menu-section-fg` → `--pando-blue` (instance override in Figma) |
| Focus *(added in review — not in Figma)* | — | 2px | `--main-menu-focus` → `--pando-blue` |

## Anatomy & spacing
- Rail 60 wide, white, column space-between: Close item (50) · scrolling item list · Profile (padding 10 / 0 / 20, avatar 40).
- `.Menu-Item` 60 × 50, padding 15 / 20, icon 20.
- Fly-out 250 wide, full height, overlays page content: Heading (padding 15, 46 tall, 12 semibold caps +0.3px) · scrolling rows · `.Name` (padding 10 / 10 / 20 / 10, 70 tall, gap 4).
- Secondary row 36 tall, padding 10 / 15, 12 semibold. Arrow adds Right-Caret 5 × 8 at the right.
- Multiple: a 16px line column (1px line at 15px) + third-level rows (36 tall, padding 10).
- `.Logout` 24 circle, padding 5, icon 14.
- Classes: `.pds-main-menu` › `__rail` › (`.pds-menu-item` Close · `__list` › `.pds-menu-item` · `__profile` › `__avatar`) + `__fly` › `__heading` · `__scroll` › (`__row` | `__section` | `__row[data-group]` + `__children` › `__line` + `__third`) · `__name` › `__who` (`__user`, `__role`) + `__logout`.

## Behaviour
- `pdsMainMenu.create(config)` builds the menu from data; `open/close/toggle(menu, opener)`; `showFly / hideFly`; `setCurrent(menu, module, item)`.
- Hover a rail item → its fly-out shows and the item gets the Active fill. Click pins it (click again unpins). Leaving the menu falls back to the pinned fly-out or hides it; a click outside hides it.
- Rail items with no fly-out (Settings, Planning) and the avatar show the kit Tooltip (Style=Text, no title, beak 9:00); Logout shows “Logout” (beak 6:00). As in Figma Type=Settings / Type=Profile and the loose Tooltip.
- Type=Arrow is a collapsed group; click expands it to Type=Multiple (Figma shows Multiple with no caret). Click again collapses — added in review.
- Close (Menu/Close) closes the whole menu and returns focus to the opener. Figma has no opener in this set.
- Events: `pds-main-menu:open`, `:close`, `:navigate` `{module, item, href}`, `:logout`.
- Keyboard *(added in review — not in Figma)*: rail and fly-out are one Tab stop each, Logout its own; ↑ / ↓ wrap, Home / End; Enter / Space / → open a fly-out and move in; Enter follows a link or toggles a group; → expands, ← collapses or goes back; Esc hides the fly-out, then closes the menu.

## When (not) to use
No usage text in Figma.

## Accessibility
- `<nav aria-label="Main menu">`; rail items are `<button aria-label>`; modules with a fly-out carry `aria-expanded` + `aria-controls`. Fly-out is a labelled group; pages are links; groups are disclosure buttons. Not an ARIA `menu` (site navigation).
- Current page: `aria-current="page"` on the link, `aria-current="true"` + Active fill on its rail item. No visible current state for rows in Figma.
- Focus ring added in review — inset 2px so the scroll areas do not clip it.
- Contrast: Hover #E7E7E7 @ 30% and Active #F3F6FC on white are ≈1.1 : 1 — below 3 : 1. Kept as Figma.

## Open issues
- No visible current-page state for fly-out rows (Secondary State=Active looks like Default).
- `.Menu-Heading` Hover = Default.
- Expanded group (Multiple) has no caret / collapse affordance in Figma.
- Rail has a Planning item but no Type=Planning — built as a direct link with tooltip “Planning”.
- Section labels exist only as blue text overrides (TMS variant + loose examples).
- TMS variant: indents 75 / 80 / 86, some lines dashed [2, 2], fly-out overflows 718, `.Name` row missing. Kit follows the clean loose examples.
- Row widths mixed in Figma (250 / 200 / 184); the kit stretches rows to the fly-out.
- Type=Default Profile has 15px top padding (75 tall), others 10px (70) — kit uses 70.
- Atom variants missing in kit: Text Avatar with #EEF2F4 fill; hug-width Text tooltip (kit is fixed 164) — both overridden in main-menu.css.
- `.Logout` Hover #E9F1F5 vs linked style named “#EFF3F5”.
- Line heights: Figma 12px “auto” (16) vs `.type-12-semibold` 17 — rows keep 16 so they stay 36 tall; `.Name` 12/16 vs `.type-12-regular` 17.
- “Arrow Expand Hover” rows are not used in any Type and there is no fourth level — built as static rows only.
- No elevation / scrim between the open menu and the page.

## Not adopted
- 2 loose “New Main Menu” frames (2912:6604, 2912:7826) — usage only (they set the TMS structure). They show a “Contract” rail item that the set does not have.
- “Frame 1919” (2282:4027), loose Button (2767:5260, Icon Button Circular Small), loose Tooltip “Logout” (2789:6691) — not built; the Logout tooltip is used in behaviour.

### Industry gaps — not added
- Labels with the icons (Fluent 2 Nav does not support icon-only) and a hamburger to expand / collapse — Fluent 2 Nav.
- Every sub-menu group marked with a chevron, open or closed (Figma drops it when expanded) — Carbon UI shell left panel.

## Sources
Figma New Main Menu — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=2280-1704
Figma .Menu-Item — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=803-709
Figma .Fly Out — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=2459-5585
Fluent 2 Nav usage — https://fluent2.microsoft.design/components/web/react/core/nav/usage
Carbon UI shell left panel usage — https://carbondesignsystem.com/components/UI-shell-left-panel/usage/
