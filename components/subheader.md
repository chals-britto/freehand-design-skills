# Subheader — Pando DS V1

**Status:** Built 2026-10-28 · not reviewed · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › 🟢 Header (0:1) › `Subheader` (1:409)
**Files:** `subheader.css` (layout + theme tokens) · `subheader.html` (live doc). No JS of its own; the optional Toggle uses `toggle-tab.js`.
**Uses (kit):** `button.css`, `button-group.css`, `breadcrumb.css`, `toggle-tab.css`/`.js`, `icons.css` + `icons/`.

## What it is
Subheader used below header in either landing pages or inner pages. *(Figma description)*

## Variants
`Theme` × `Size` = 6 published variants, all 50px tall.

| Variant | Node | Width | Left side | Right side |
|---|---|---|---|---|
| Light · Main | 3021:714 | 1280 | Menu · divider · “SUBHEADER ACTIVE” ▾ · divider | divider · Secondary + Primary |
| Dark · Main | 407:3383 | 1280 | Menu area #24242F · divider · title ▾ · divider | divider · Dark Secondary + Primary |
| Light · Breadcrumb | 116:42 | 1280 | Breadcrumb “Previous › Current Page” · divider | divider · Dropdown “Label” + Secondary + Primary |
| Dark · Breadcrumb | 615:4190 | 1280 | Breadcrumb (dark colours) · divider | divider · Dark Secondary + Primary |
| Light · Back | 2850:606 | 1280 | ‹ back caret · “Current Page” · divider | Secondary + Primary (no divider) |
| Light · 1440 | 4446:3706 | 1440 | as Light · Main | as Light · Main |

Booleans (Figma defaults): **Show Buttons** = true · **Show Search** = false · **With Toggle** = false · **Show With Menu** = false.

| Boolean | Available on |
|---|---|
| Show Buttons | all |
| Show Search | all |
| With Toggle | Light Main, Light 1440, Light Breadcrumb |
| Show With Menu | Light Breadcrumb |

### Colours
| Part | Light | Dark |
|---|---|---|
| Background | `--white` | `--dark-bg` #393945 |
| Border (1px inside) | `--border-blue` #E9F1F5 | Main `--pando-dark` #234357 · Breadcrumb #18283B *(off-token)* |
| Dividers | `--border-blue` #E9F1F5 | `--dark-input-text` #8A8A9E @ 50% |
| Menu area | transparent | `--dark-darker` #24242F, icon lines white |
| Title | `--pando-blue` #0076DD | `--dark-label-text` #D5DAF4 |
| Title arrow | `--pando-dark` #234357 | `--white` |
| Breadcrumb “Previous” / caret / current | atom: #545454 / #545454 / #005399 | #D5DAF4 / #8A8A9E / white |
| Back caret | `--grey-dark` #515151 | — |
| Search text | `--text-medium` #545454 | `--dark-input-text` #8A8A9E |

## Anatomy & spacing
- Bar: height **50**, width 100%, padding right **20**, left 0; space-between.
- Menu area **60 × 50**, icon Menu/Menu 20.
- Title: Open Sans SemiBold 14, UPPER, +1px tracking (`--type-14-semibold`, line-height 19 = Figma auto); **20** each side; arrow 8 × 5 sits **20** after the text.
- Dividers: 1 × 50.
- Breadcrumb inset **15** left/right (Dark: 20 left, and the left section has a 10 gap).
- Back: caret 8 × 14 (Right-Caret rotated 180°), 20 from the left edge, 20 to the label, label 15 to the divider.
- Search: Menu/Search 20 + “Search” Regular 14, gap 10; 20 after the divider on Main, 10 on the others.
- Toggle: kit Toggle Tab, Type = Dual Icon (89 × 50), before the closing divider.
- Right side: divider · gap **20** · kit Button Group (Normal buttons, 30 tall).

Component tokens: `--subheader-*` (see `subheader.css`). px values used: 50, 20, 60, 15, 10 (`--space-10`), 1, icon boxes 20, 8×5, 8×14.

## Behaviour
- Menu, title, back and search are buttons. The title opens the Subheader Menu (built separately on the Dropdown page); it carries `aria-haspopup="menu"` / `aria-expanded`.
- Toggle selection and arrow keys come from `toggle-tab.js`.
- Optional parts: leave them out or set `hidden`.

## When (not) to use
- Main subheader to be placed on listing or landing pages. Any inside page will have a breadcrumb based subheader. *(Figma .documentation)*

## Accessibility
- Icon-only buttons have `aria-label` (“Menu”, “Back”). Breadcrumb is `<nav aria-label="Breadcrumb">` with `aria-current="page"`.
- Focus ring 2px `--pando-blue`, offset 2 — added in review, not in Figma.
- Contrast: Dark Search text #8A8A9E on #393945 ≈ 2.9 : 1 (fails 4.5 : 1). Fixes deferred.

## Open issues
1. Atom variant missing in kit: Breadcrumb has no Dark theme — re-coloured here through its tokens.
2. Two dark borders: #234357 (Main) and #18283B (Breadcrumb, not in tokens.css).
3. Dark Search icon colours not readable from Figma; built with the Light two-colour icon, which is barely visible on #393945.
4. Figma toggle icon “Menu/Payments” is not in the kit manifest; the Toggle Tab kit’s `menu-india-payments` is used.
5. Boolean coverage differs per variant (see table) — no Toggle on Dark or Back.
6. Not reproduced (no visible effect): Main’s 0.5px top/bottom padding, left-section right padding 20 / 15, Breadcrumb right group’s extra 10px left padding.
7. Size = 1440 is only a width; same layout as Main.
8. No hover / pressed / open states for menu, title, back, search in Figma.

## Not adopted
- Loose Subheader instances on the page (6768:3135, 6720:950, 6670:892, 6432:1508, 5628:1269, 4888:2151, 2448:12035, 3879:1911) and loose Breadcrumb instances — usage examples only; three were read for typical content.
- Invisible white “Line 2” in the middle of Light variants (stroke #FFFFFF on white) — layout leftover.
- `.documentation` (2420:8049) Header text (“App icon with Client name + Module”) belongs to Top Header.

## Sources
- Figma `Subheader` 1:409 and `.documentation` 2420:8049.
- Carbon UI shell header usage — https://carbondesignsystem.com/components/UI-shell-header/usage/ (industry gaps, not added).
