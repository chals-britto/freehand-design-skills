# Inputs — Pando DS V1

**Status:** Reviewed 2026-10-22 (batch A) · **Figma:** DS V2 – Atoms › 🟡 Inputs (page 0:1) — `Input - Text` (7:2), `Input - Dropdown Select` (3535:3521), `Text Area` (3352:3688)
**Files:** `input.css` (styles + component tokens) · `input.js` (`pdsInput.build`, `pdsInput.init`) · `input.html` (live doc)

## What it is
Text Input and Dropdown Input. *(Figma wording.)* Component description in Figma: Text Input, Dropdown, Select, Multiselect, Input with Tags, Cell, Inline Input.

## Variants
75 published variants: Input - Text 46 · Input - Dropdown Select 28 · Text Area 1. All are built.

### Input - Text (light)
| Type | Size | States | Notes |
|---|---|---|---|
| Default | 200 · 400 · Small 100 | Empty, Filled, Active, Error, Open, Disabled (Empty/Filled) · Icon on/off | Small Active shows cancel / confirm buttons to the right |
| Inline | 250 | Empty, Filled, Hover, Active, Error, Disabled | no border at rest; Hover/Active border is **dashed 3/3** |
| Condition | Auto | Empty, Filled · prefix “$” or calendar icon | label outside, box 36 high |
| Tag Input / Multi-Tag | 200 · 400 | Filled, Disabled | tags 24 high, “+N” count tag |
| Search Tag | 200 | Empty, Filled, Open | “Name” chip, green selected icon, “Select From” list |
| Table | 200 · 400 | Open | opens a 400-wide Dropdown list (dropdown part) |
| Formula | 600 | Empty, Filled | header label + “Result:” tag; syntax-coloured value |

| State | Fill | Border | Label | Value |
|---|---|---|---|---|
| Empty | `--white` | `--border-input-light` #E2EAEC | `--text-medium` #545454 | placeholder `--text-light` #6C6C6C Regular |
| Filled | `--white` | #E2EAEC | #545454 | `--text-dark` #313131 SemiBold |
| Active / Open | `--white` | `--pando-blue` #0076DD | #545454 | — |
| Error | `--accent-error-red-light` #FFF8F9 | `--action-red` #E25757 | #E25757 | #313131 |
| Disabled | `--grey-light` #E7E7E7 at 30% | #E2EAEC | #545454 | filled `--text-medium` #545454 · empty #6C6C6C |
| Inline Hover | `--white` | `--border-blue-grey` #B5C3CB dashed | | |

### Input - Text (dark, 310)
Label 140 wide (12 Regular caps +0.5, `--dark-label-text`) · gap 20 · field 150 × 20, padding 2/5, radius 2, fill `--input-dark-field-bg` #484858.
Placeholder #E2EAEC · Filled `--white` SemiBold · Disabled fill #484858 at 50%, text `--accent-alternate-white` (label 75%) · Error fill `--status-red-light` #FFEAEE + 0.5px #E25757, text #E25757, message 10px #FFEAEE right-aligned, gap 3.

### Input - Dropdown Select
| Type | Size | States |
|---|---|---|
| Default | 200 · Filter 225 · 400 | Empty, Filled, Active, Error, Open, Disabled (Empty/Filled) |
| Tag Input | 200 · 400 | Filled |
| DropUp | 400 | Open (list above, shadow upward) |
| Condition | Auto | Filled, Open, Disabled · Icon on/off |
| No Label | 200 × 30 | Filled, Open (chevron caret, rotates when open) |
| Dark | 310 | Empty, Filled (+ Icon), Disabled, Error, Open, Tag Input |

Arrow 8 × 5 `--pando-dark` (50% on Standard Empty/Filled; #9C9C9C when disabled). “Select” placeholder is italic #545454 (empty) or SemiBold #545454 (Active/Error/Disabled-filled). Condition dropdown: fill #E7E7E7 30%, border `--border-grey` #EFEFEF, value `--pando-blue`.
Dark dropdown: no box · value 12 SemiBold +0.5 `--accent-blue-grey` · filled `--white` · error `--accent-red-medium` + message #FFEAEE (gap 6) · arrow `--dark-input-text` · open list `--dark-darker`, radius 4, selected `--highlight-blue-light` with check.

### Text Area (dark only)
310 × 60 · padding 10 · gap 10 · radius 2 · fill #484858 · 1px `--dark-bg` border. Booleans: Required (“*” `--accent-red-medium`), Show Input Text (12 Regular white), Show Count (“160/160”, 8px, `--dark-label-text` 60%, top-right).

### Open lists (as shown by the Open variants)
Options 36 high (multi-info 52 with a 10px second line and a tag), padding 10, list bottom padding 5. Hover `--accent-light-highlight` · Selected `--accent-alternate-white` + `--pando-blue` text. Shadow: Dropdown Select `--shadow-3`; Input - Text `--shadow-4`; Search Tag list `--shadow-2` + 1px `--border-grey`.

### Info icon + tooltip — review change
From Figma 11396:3213: a 12px `System-Status/Info-Circle` (circle `--pando-light`, glyph `--text-dark`) top-right inside the field padding. Hover or focus shows the Tooltip (Style=Text, Beak=5:00): 164 wide, padding 10, gap 4, radius 4, black 80%, title 12 SemiBold + text 12/16 Regular, white, beak 16 × 8 under the icon.

### Added in review — not in Figma
- **Focus:** Active blue border + `outline: 2px solid var(--pando-blue); outline-offset: 2px` on keyboard focus.
- **Helper / error message (light):** one line under the field, `.type-11-regular`; helper `--text-light`, error `--action-red`. Gap 3.
- **Read-only:** looks like Filled, stays focusable, no Active border.
- **Required on Input - Text:** the Figma red “*” (10 Regular `--action-red`, gap 2) as an option on every type.

## Anatomy & spacing
Light field: box → label row (label + “*”, gap 2) → input row (icon, text, gap 10). Height 60, padding 10 (Small: 52, padding 8/10, gap 6). Strokes are inside in Figma, so CSS uses a 1px border + 9px padding.
Tags row sits absolutely at top 28 (left 10, or 30 after an icon). Search Tag chip top 8 / right 10, 20 high, padding 4/10.
Condition: label outside (gap 2), box 36 high, padding 10, gap 8 (dropdown 10). Formula: header 15 high, gap 5, box 36.
Small Active buttons: 24 × 24 cancel (`--grey-light`, × `--grey-dark`) and confirm (`--pando-blue`, white check), gap 2, outside the field.
Type: label `.type-10-regular` (0 tracking) · value `.type-12-semibold` / placeholder `.type-12-regular` · dark `.type-12-*` +0.5px · tooltip `.type-12-semibold` / `.type-12-regular`.

## Behaviour
- Real inputs take Active from focus (`:focus-within`); Inline shows its dashed border on hover and focus.
- Dropdown: click, Enter, Space or ↓ opens; ↑ ↓ move; Enter/Space pick; Esc or a click outside closes.
- Tag ×: removes the tag and moves focus to the next control.
- Info tooltip: shows on hover and focus, hides on leave, blur and Esc.

## When (not) to use
Figma's “Uses” and “Placement & Convention” blocks are template text (“Enter suggestion here”), so no guidance is published. Info icon (review change): short supporting detail only, never something needed to fill the field.

## Accessibility
- `<label for>` on every field; “*” is `aria-hidden` — add `required` in product code.
- Error: `aria-invalid="true"`, message linked by `aria-describedby`, `role="alert"`.
- Info icon is `<button aria-label="More information">`; tooltip `role="tooltip"`, linked by `aria-describedby` (WCAG 1.4.13).
- Dropdown trigger `<button aria-haspopup="listbox" aria-expanded>`; options `role="option"` + `aria-selected`.
- Contrast for the a11y pass: border #E2EAEC 1.22 : 1, inline hover #B5C3CB 1.81 : 1, dark field #484858/#393945 1.27 : 1, error label #E25757/#FFF8F9 3.5 : 1, dark error 3.18 : 1, prefix #9C9C9C 2.75 : 1, disabled dropdown text 2.59 : 1, dark dropdown error 3.15 : 1.

## Open issues
- Off-token colours: #9C9C9C, #484858 (+50%), #737373 (style named “Text/Light-#B4B4B4”), #404040, black 80% (tooltip).
- Light error is colour-only in Figma; disabled reads like enabled (placeholder same #6C6C6C; dark disabled text brighter than placeholder).
- Small (100) label row is 180 wide (clipped here); Large + Icon input row is 180 wide (built full width); Multi-Tag has 215 right padding (dropped).
- Tag Input + Icon 200 (4117:7050) shows no tags. Table Open attaches a 400 list to a 200 field. No Label Open places the list at y 0 (built under the field).
- Detached: Dropdown Error 288:492, dark text Disabled 175:180 / 177:5, Inline inner frame.
- Placeholder italic in dropdowns, regular in text inputs. Active and Open look the same; 3665:3477 (Active) shows a list and clear ×.
- Dropdown Condition uses the disabled fill when enabled. Dark dropdown has no box; dark text input has one.
- Text Area: dark only, one state, property still named “Property 2”.
- Line heights are Auto in Figma; built with `.type-*` (17px for 12px). Label caps have 0 tracking in Figma.
- Build choices to confirm: helper colour, 3px message gap, read-only visual, focus ring colour on dark (~2.4 : 1).

## Not adopted (review decisions)
- “Text styles used” card — skip.
- Loose instances (15) and loose shapes / detached frame / hidden texts — skip.
- Character count, clear button and height sizes — Later.
- Dropdown parts (.Dropdown Option, .Header, .Table Cell, .Custom Add, . Toggle, .Blinking cursor, Dropdown list, Dropdown Light, .Dropdown Dark) — only what the Open variants show; the Table list is a placeholder. Reviewed as their own component.

## Sources
Figma 11396:3213 (info icon) · Tooltip 243:236
Carbon Text input — https://carbondesignsystem.com/components/text-input/usage/
Ant Design Input — https://ant.design/components/input
Fluent 2 Input — https://fluent2.microsoft.design/components/web/react/core/input/usage
WCAG 2.2 3.3.1 — https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html
WCAG 2.2 3.3.2 — https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html
WCAG 2.2 2.4.7 — https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 1.4.13 — https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
