# Old Menu — Pando DS V1

> **Legacy — superseded by New Main Menu? Confirm whether still used.**

**Status:** Built 2026-10-28 · no review yet (everything published = Keep)
**Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟢 Menu (32:0) › component `Old Menu` (38:994), 1 variant · uses `.Menu-Item` (803:709)
**Files:** `main-menu-legacy.css` (styles + component tokens) · `main-menu-legacy.js` (`pdsMenuLegacy`) · `main-menu-legacy.html` (live doc)
**Uses (kit):** `main-menu.css` (`.pds-menu-item` + its Hover / Active fills) · `icons.css` + icons `nav-close-tag`, `menu-dashboard`, `menu-data-manager`, `menu-reports`, `menu-planning-alt` (Figma “Menu/Planning”), `menu-settings` · `avatar.css` (Text Avatar, as is) · `button.css` on the doc page only.

## What it is
The legacy main menu: one 240px panel with the user block and Log Out on top and a flat list of labelled `.Menu-Item`s below. No description text in Figma.

## Variants
`Old Menu` — 1 variant, 240 × 718.

| Part | Values | Tokens |
|---|---|---|
| Menu frame | #FFFFFF, 240 wide, clips | `--menu-legacy-bg` → `--white` |
| User block (“Frame 2”) | #F9FAFA, padding 10, 152 tall | `--menu-legacy-head-bg` → `--accent-alternate-white` |
| Close (Navigation/Close-Tag) | 14 × 14, #515151, top right | `--menu-legacy-close` → `--grey-dark` |
| Avatar | kit Text Avatar 40, #FFFFFF, “FL” #0076DD 16 regular, shadow 0 2 4 6% | `--avatar-text-*` · `--shadow-2` |
| Name | 12 semibold / 16, #234357 | `--menu-legacy-name-fg` → `--pando-dark` |
| Role | 10 semibold / 14, caps, +0.5px, #234357 | `--menu-legacy-name-fg` |
| Line | 220, 1px #E9F1F5 | `--menu-legacy-rule` → `--border-blue` |
| Log Out | 220 × 24, #FAFAFA, “Log Out” 12 regular / 16 caps #234357 | `--menu-legacy-logout-bg` → `--accent-light-bg` · `--menu-legacy-logout-fg` → `--pando-dark` |
| `.Menu-Item` | 50 tall, padding 15 / 20, gap 20, icon 20 · Default #FFFFFF · Hover #E7E7E7 @ 30% · Active #F3F6FC | from `main-menu.css`: `--menu-item-bg`, `--menu-item-bg-hover`, `--menu-item-bg-active` |
| Item label (“Text”) | 14 semibold / 19, caps, +1px, #376F99 | `--menu-legacy-label-fg` → `--action-blue` |
| Focus *(added in review — not in Figma)* | 2px | `--menu-legacy-focus` → `--pando-blue` |

Figma sample items: Dashboard (Menu/Dashboard) · UDM (Menu/Data-Manager) · Reports (Menu/Reports) · Rate Cards (Menu/Planning) · Admin Settings (Menu/Settings).

## Anatomy & spacing
- Column: user block (Close · avatar · name / role · line · Log Out) then the scrolling item list, which fills the rest.
- User block: padding 10, children right-aligned (Close sits top right); “Frame 1” 220 wide, gap 10 between avatar, details and line; name ↔ role gap 4. The line takes no height (0-height line in Figma).
- Item: kit `.pds-menu-item` + `.pds-menu-legacy__item` (stretches to 240, gap 20) + `.pds-menu-legacy__label`.
- Classes: `.pds-menu-legacy` › `__head` › (`__close` · `__user` › (`.pds-avatar--text` · `__details` › `__name`, `__role` · `__rule`) · `__logout`) + `__list` › `li` › `a.pds-menu-item.pds-menu-legacy__item` › (`.pds-icon` · `__label`).

## Behaviour
- `pdsMenuLegacy.create(config)` builds it from data; `open / close / toggle(menu, opener)`; `setCurrent(menu, id)`.
- Hover an item → .Menu-Item Hover fill (Figma prototype: On hover → Hover). Click → it becomes current (Active fill, `aria-current="page"`) and `:navigate` fires.
- × closes the menu and returns focus to the opener. Figma has no opener.
- Events: `pds-menu-legacy:open`, `:close`, `:navigate` `{id, label, href}`, `:logout`.
- Keyboard *(added in review — not in Figma)*: Close, the item list and Log Out are one Tab stop each; ↑ / ↓ wrap, Home / End; Enter / Space follow the link; Esc closes the menu.

## When (not) to use
No usage text in Figma.

## Accessibility
- `<nav aria-label="Main menu">`; items are links with visible labels; × is a button “Close menu”; Log Out is a button; avatar is decorative (`aria-hidden`).
- Current item: `aria-current="page"` + Active fill.
- Focus ring added in review — inset 2px on items and Log Out, outset on ×.
- Contrast: label #376F99 on white ≈ 5.4 : 1 (passes). Hover #E7E7E7 @ 30% and Active #F3F6FC on white ≈ 1.1 : 1 — below 3 : 1. Kept as Figma.

## Open issues
- **Legacy — superseded by New Main Menu? Confirm whether still used.**
- **Compared with main-menu (New Main Menu):** Old Menu is one 240px panel, text-labelled, one level; New Main Menu is a 60px icon rail + 250px fly-out with three levels and tooltips. Both use `.Menu-Item` (Old Menu shows its hidden “Text” label). User block on top here vs at the bottom there; Log Out a full-width text bar here vs a 24px icon button; avatar fill #FFFFFF here vs #EEF2F4; × uses Navigation/Close-Tag here vs Menu/Close. Module set differs (Dashboard, UDM, Reports, Rate Cards, Admin Settings vs Analytics … Settings).
- In Figma each `.Menu-Item` stays 60 wide and the label overflows it, so Hover / Active fill only the icon square. The kit stretches the item to 240.
- The label is the `.Menu-Item` “Text” layer, hidden in the component and switched on only here.
- No current item in the Figma variant; the kit uses the shared Active fill, which is nearly invisible (≈1.1 : 1).
- Log Out is a plain group (rectangle + text) — no hover / pressed state. Close has no hover state.
- Navigation/Close-Tag is 14 × 14 here; the kit icon is 12 × 12, scaled to 14.
- Line heights: name 12 “auto” (16) vs `.type-12-semibold` 17; role 10 “auto” (14) vs `.type-10-semibold` 12; Log Out 12/16 vs `.type-12-regular` 17 — Figma values kept.
- Item list ends 8px short of the 718 frame (152 + 558); the kit lets it fill and scroll.
- No focus states in Figma (added in review).

## Not adopted
- Hidden layers: “Other Details” text (4076:18640) and 9 hidden `.Menu-Item` instances.

### Industry gaps — not added
- A clear selection indicator showing the active page at a glance — Fluent 2 Nav.
- The menu button labelled with a tooltip such as “Collapse navigation” instead of an unlabelled × — Fluent 2 Nav.

## Sources
Figma Old Menu — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=38-994
Figma .Menu-Item — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=803-709
Fluent 2 Nav usage — https://fluent2.microsoft.design/components/web/react/core/nav/usage
