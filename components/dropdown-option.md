# Dropdown Option — Pando DS V1

**Status:** Built 2026-10-28 · no review (every published variant kept) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › ✏️ Dropdown (2312:4660) › `Dropdown Option` (3303:2663)
**Files:** `dropdown-option.css` (styles + component tokens) · `dropdown-option.html` (live doc). No JS — Figma defines no behaviour. Reuses `avatar.css` (Icon Avatar) and `icons.css` + `icons/` (Depot, Check, Delete, Navigation/Selected).

## What it is
One option row: Icon Avatar, title, secondary line, optional trailing icon. Used by Search Input (2419:10052) and .Search Dropdown (2464:8997). Figma has no written description; this is drawn from the component.

## Variants
Type × State, 5 published + 3 boolean properties.

| Variant | Fill | Prefix | Trailing | Build |
|---|---|---|---|---|
| Selection · Default (2464:9108) | none | Icon Avatar Purple, Depot 14 | — | `.pds-dropdown-option` |
| Selection · Hover (3303:2747) | #EEF2F4 `--pando-light` | same | — | `:hover` / `.is-hover` / `.is-active` |
| Selection · Selected (3303:2762) | none | Avatar #0076DD + white Check 14 → `.pds-avatar--selected` | — | `aria-selected="true"` |
| Viewable · Default (3303:2679) | none | Icon Avatar Purple, Depot 14 | — | `.pds-dropdown-option--viewable` |
| Viewable · Hover (3303:2694) | #EEF2F4 | same | Delete 12, #0D204A `--status-blue-dark` | `--viewable:hover` shows `__delete` |

Boolean properties: **Prefix Icon** (default on → avatar), **Secondary Text** (default on → `__sub`), **Selected** (default off → 12px Navigation/Selected #0076DD at the right, `__check`).

| Token | Value | Maps to |
|---|---|---|
| `--dropdown-option-bg` | none | — |
| `--dropdown-option-hover-bg` | #EEF2F4 | `--pando-light` |
| `--dropdown-option-title-fg` | #404040 | off-token in Figma |
| `--dropdown-option-sub-fg` | #737373 | off-token in Figma |
| `--dropdown-option-check-fg` | #0076DD | `--pando-blue` |
| `--dropdown-option-delete-fg` | #0D204A | `--status-blue-dark` |

## Anatomy & spacing
300 × 56 fixed · padding 10 (`--space-10`) · gap 10 · avatar 30 (kit, glyph 14) · text block fills, title ↔ secondary 4 · title `.type-12-semibold` #404040 · secondary `.type-12-regular` #737373 · both line-height 16 · trailing icons 12.
px values used (component tokens): 4, 12, 16, 56, 300.

## Behaviour
- Hover (and keyboard highlight `.is-active`) fills the row #EEF2F4.
- Selection: picking the row swaps the avatar for the blue check avatar. No row fill or text change.
- Viewable: the Delete icon appears on hover (also on `.is-active` / focus inside the row — added). What Delete does is not defined in Figma.

## When (not) to use
Figma has no usage text. Selection = pick from results; Viewable = an item already in the list that can be removed (from variant names only).

## Accessibility
- `role="option"` inside a `role="listbox"`, `aria-selected`. Avatar `aria-hidden`. Delete is a `<button>` with `aria-label`.
- Focus outlines (2px #0076DD) are added — not in Figma.
- Contrast for the a11y pass: title #404040 10.37 : 1 on white / 9.20 : 1 on #EEF2F4; secondary #737373 4.74 : 1 on white / **4.21 : 1 on hover** (fails 4.5); hover fill 1.13 : 1; selection shown only by the avatar.

## Open issues
- **Relation to menu / dropdown atoms.** No `menu.css` part is reused — none matches. Menu `.Dropdown Option · Multi-info` is 200 × 52, no avatar, title #313131, second line 10 Regular, hover #E9F1F5. The Atoms `dropdown.css` two-line panel row (loose frame 3240:4042) is closest (56 high, padding 10, 30 icon circle, 12 SemiBold #404040) but uses a 10 Regular second line, 6 gap, a cyan depot circle and a #F8F8F8 selected fill + right check. Three similar “icon + two lines” option patterns now exist; consider merging the dropdown two-line row into this molecule.
- Hover #EEF2F4 here vs #E9F1F5 in the menu atom.
- Figma’s remote Icon Avatar (2541:10713) draws the Depot glyph #2D0645; kit avatar uses #234357 (kept).
- Selection · Selected has a second, hidden Navigation/Selected layer — not built.
- Delete is a 14px icon scaled to 12; its action is undefined.
- Off-token: #404040, #737373.
- Line heights: Figma Auto (≈16) / 16 vs 17 in `.type-12-*`; overridden to 16 so the row stays 56.
- No disabled state; long text truncates with an ellipsis (no Figma rule).

## Not adopted
- Hidden Navigation/Selected layer inside Selection · Selected.
- Industry gaps, not added: disabled option, tooltip for truncated labels, a designed focus state (Carbon Dropdown).

## Sources
Figma 3303:2663 (variants 2464:9108, 3303:2747, 3303:2762, 3303:2679, 3303:2694) · kit `menu.css`, `dropdown.css`, `avatar.css`, `icons/icons-data.js`
Carbon Dropdown usage — https://carbondesignsystem.com/components/dropdown/usage/
