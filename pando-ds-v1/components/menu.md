# Dropdown Menus — Pando DS V1

**Status:** Built 2026-10-28 · no review file (every published variant kept) · **Figma:** DS V2 – Atoms › 🟡 Inputs (0:1) — `Dropdown Light` (3154:2534), `Dropdown list` (4096:7204), `.Dropdown Dark` (3380:4191)
**Files:** `menu.css` (styles + component tokens) · `menu.js` (`pdsMenu.build` / `attach`) · `menu.html` (live doc). Reuses `checkbox.css`, `tag.css`, `scrollbar.css`; Try it uses `input.css` / `input.js`.

## What it is
The open list that appears under a dropdown field. Figma has no written description; this is drawn from the components. The closed field is `Input – Dropdown Select` (input.md).

## Variants
16 menus + 33 part variants, all rendered on the page.

| Set | Variant | Build |
|---|---|---|
| Dropdown Light | Single-Info · Single (3154:2496) | `type:'single'` — 200, 36px rows, bottom pad 5 |
| | Single-Info · Multiple (3154:2533) | `type:'check'` — Checkbox rows (checkbox.css), pad 5 / 5 |
| | Multi-Info · Single (3485:3238) | `type:'info'` — 52px rows, 10px second line, Input Tag |
| | Multi-Info · Multiple (4117:6130) | `type:'info', multiple` — no tag; selected = blue title + 12px ✓ |
| | Custom Add · Single (3246:3589) | `type:'add'` — rows + “+ ADD NEW” |
| | Table · Multiple (4417:13474) | `type:'table', flat` — table body only |
| Dropdown list | Recent · Multiple / Single (4096:6861, 4096:8023) | Section header, table header, 5 rows (Tag in col 2), bottom Selection bar |
| | Search · Multiple / Single (4096:7205, 4096:8503) | top Selection bar (pills), table header, 10 rows, scroll |
| | Selected · Multiple (4096:17350) | Section “Selected <Label>”, 5 selected rows |
| | Theme=Dark · Search · Multiple (5992:8230) | identical to light in Figma |
| .Dropdown Dark | Multi-Select · Right / Left, Single Select · Right / Left | `type:'dark', align, multiple` |

| Token | Value | Maps to |
|---|---|---|
| `--menu-bg` | #FFFFFF | `--white` |
| `--menu-shadow` / `--menu-table-shadow` | 0 2 14 10% / 0 14 28 6% | `--shadow-3` / `--shadow-4` |
| `--menu-option-fg` | #313131 | `--text-dark` |
| `--menu-option-hover-bg` | #E9F1F5 | `--accent-light-highlight` |
| `--menu-option-selected-bg` / `-fg` | #F9FAFA / #0076DD | `--accent-alternate-white` / `--pando-blue` |
| `--menu-section-bg` | #EEF2F4 | `--pando-light` |
| `--menu-add-fg` | #376F99 | `--action-blue` |
| `--menu-hint-fg` | #737373 | off-token in Figma |
| `--menu-cell-alt-bg` | #F9FAFA | `--accent-alternate-white` |
| `--menu-cell-border` / `--menu-tag-bg` | #EFEFEF | `--border-grey` |
| `--menu-cell-selected-bg` | #E9F4FE | off-token in Figma |
| `--menu-cell-disabled-bg` / `-border` / `-fg` | #E7E7E7 30% / #E2EAEC / #545454 | `--grey-light` / `--border-input-light` / `--text-medium` |
| `--menu-head-fg` | #005399 | `--pando-blue-active` |
| `--menu-bar-bottom-bg` / `-border` | #E9F1F5 / #E2EAEC | `--accent-light-highlight` / `--border-input-light` |
| `--menu-bar-label` | #2A4255 | off-token in Figma |
| `--menu-pill-active-bg` | #0078DD | off-token in Figma |
| `--menu-pill-fg` / `--menu-pill-shadow` | #234357 / 0 2 3 10% | `--pando-dark` / `--shadow-1` |
| `--menu-dark-bg` | #24242F | `--dark-darker` |
| `--menu-dark-option-fg` / `-hover-bg` / `-selected-fg` | #D5DAF4 / #343440 / #9CD2FF | `--dark-label-text` / `--dark-light` / `--highlight-blue-light` |
| `--menu-dark-pill-bg` | #484858 50% | off-token in Figma |

## Anatomy & spacing
**Light list:** 200 wide · option 36 high, padding 10, gap 10, `.type-12-semibold` · multi-info 52 high, title↔line gap 4, line `.type-10-regular` · section 24 high, padding 5/10, `.type-10-semibold` caps · ✓ 12.
**Custom Add:** add row 36, icon 10, “ADD NEW” `.type-10-semibold` caps (0 tracking) · Active: New Option row with 1px #0076DD inside, value `.type-12-semibold` + blinking “|” (gap 2), ENTER hint icon 14 + `.type-10-regular`, gap 3.
**Table:** 400 wide · columns 200/100/100 · header 34, row 36 · cell padding 10/5, gap 8 (header non-first 5) · 0.5 bottom divider · body max 360 (Search) / 180 (Recent, Selected) · Selection bar 34, padding 5/10, label↔pills 15, pills gap 10, pill 24 high (active padding 5/10 r14, inactive padding 5 r20) · text `.type-12-regular`, header `.type-10-semibold` caps, pills `.type-10-bold` caps.
**Dark:** radius 4 · padding 10/5/10/15 (Single Left 0/5/5/0) · rows gap 12 · options frame 205 (Multi Right) / 209 (Multi Left) / 190 (Single Right) / 200 (Single Left) · gap to scrollbar 11 (Right) / 5 (Multi Left) · unselected rows indented 15 next to ✓ rows · ✓ 10×8, gap 5.
**Max heights** (= Figma variant heights): 365 · info 525 · check 298 · add 293 · dark 268 · dark Single Left 364.

px values used (component tokens): 2, 3, 4, 5, 8, 10, 11, 12, 14, 15, 20, 24, 34, 36, 40, 52, 180, 190, 200, 205, 209, 268, 293, 298, 360, 364, 365, 400, 525.

## Behaviour
- `pdsMenu.attach(trigger, menu, {field, valueEl, onChange})`: click, Enter, Space or ↓ opens; ↑ ↓ move, Home / End jump (added); Enter / Space pick; Esc, Tab or outside click closes.
- Single: picking selects and closes; the field shows the label and gets `pds-input--filled`.
- Multi (check, info multiple, table multiple, dark multiple): picking toggles; list stays open. Field shows labels joined with commas (build choice — confirm).
- Custom Add: “Add new” shows the New Option row; Enter adds the option and selects it; Esc cancels.
- Selection bar pills: one pressed at a time; fires `pds-menu-filter`.
- Lists longer than the max height scroll with the kit Scrollbar (Light / Dark).

## When (not) to use
Figma has no usage text. Types are chosen by the variant names only (see menu.html › Usage).

## Accessibility
- `role="listbox"` (+ `aria-multiselectable`), options `role="option"` + `aria-selected`, disabled table rows `aria-disabled`.
- Focus stays on the trigger; `aria-activedescendant` points at the highlighted option.
- Keyboard highlight uses the Figma Hover look; table rows and dark plain rows get a 2px #0076DD outline (added — not in Figma).
- Checkbox inputs inside options are `aria-hidden` and `tabindex="-1"`; `aria-selected` carries the state.
- Contrast for the a11y pass: hover fill 1.14 : 1, selected fill 1.05 : 1, selected text #0076DD on #F9FAFA 4.33 : 1 and on #E9F4FE 4.06 : 1, active pill white on #0078DD 4.44 : 1, divider 1.15 : 1.

## Open issues
- **Two menus exist.** `Filter Dropdown Options` (dropdown.html, 4466:5808): 150 wide, blurred search header, grouped options, 12 Regular #404040 rows 8px apart, no row fill, selected = blue SemiBold text, off-token shadows. These menus: field-width (200/400), 36px rows, 12 SemiBold #313131, hover and selected fills, tokenised shadows. **Dropdown Light · Single-Info is the general-purpose menu** — the Input Dropdown Select Open variants instance it. Filter reads as a specialised search + groups menu; decide whether it becomes a variant here.
- `input.css` / `input.js` carry their own copy of these lists (`.pds-input__menu`, `.pds-input__dlist`, Table placeholder) — could switch to menu.css later (not changed).
- Dropdown list · Theme=Dark is identical to light. Table State=Hover is identical to Default.
- Table Selected rows show an unchecked checkbox in Figma, and Single tables show checkboxes too; built with the checkbox following selection in both.
- Dark menus are four different builds (option rows / plain right-aligned text / checkboxes). Four Single Left rows are 37 high (built 36).
- No hover or disabled states for light options or dark rows; dark plain rows get underline + outline on hover/keyboard (added — not in Figma).
- Off-token: #E9F4FE, #2A4255, #0078DD, #737373, #484858 50%.
- Atom variant missing in kit: “. Toggle” pills (`.Active` / `.Inactive Toggle Tab`) — built inside menu.css. Table Tag uses `.pds-tag` with a #EFEFEF fill override.
- Line heights: Figma Auto (≈16) / 16 vs 17 in `.type-12-*` (rows fixed at 36); 10px caps Auto (≈14) vs 12.
- Scrollbar: Figma overlays it on table rows with a 30px top inset; native scrollbar sits beside the rows. Light lists show no scrollbar in Figma; here they scroll past the max height.

## Not adopted
- Hidden layers: Sort Arrow in .Dropdown Option, Text Button in .Header Section, hidden “Section” text in .Dropdown Dark, 4th/5th table columns.
- Loose `.Dropdown Dark` / `.Header` instances on the canvas (inputs review: skip).
- Industry gaps, not added: type-ahead, Shift/Ctrl range and select-all keys, “All” parent checkbox / clear-all, selected options moved to top on reopen, partially visible last option as a scroll cue.

## Sources
Figma 3154:2534 · 4096:7204 · 3380:4191 · 3418:3343 · 4096:4146 · 4096:3673 · 4096:4133 · 4232:6750 · 4644:6619 · 3196:1721
WAI-ARIA APG Listbox — https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
Carbon Dropdown usage — https://carbondesignsystem.com/components/dropdown/usage/
