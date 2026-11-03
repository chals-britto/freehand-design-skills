# Search Input — Pando DS V1

**Status:** Built 2026-10-28 · no review (every published variant kept) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › 🟡 Search (60:273) › `Search Input` (2419:10052) + `.Search Dropdown` (2464:8997)
**Files:** `search-input.css` (styles + component tokens) · `search-input.js` (`pdsSearchInput.init`, `pdsSearchInput.initAll`) · `search-input.html` (live doc). Reuses `dropdown-option.css` (rows), `menu.css` (`.pds-menu__section` headings), `avatar.css` (Icon Avatar), `icons.css` + `icons/` (Navigation/Search-10px, Navigation/Close-Tag, Navigation/Selected, Indicator Icon/Depot).

## What it is
A 36px search field with a results list of Dropdown Option rows. Figma has no written description; this is drawn from the component. Used by Calendar, Filter Light, .group light and Search chat.

## Variants
Theme × State, 5 published + text props Placeholder Text / Search Input (both default “Search Input”) + boolean Show Close Icon (default off). `.Search Dropdown` is the results panel.

| Variant | Fill | Border | Text | Build |
|---|---|---|---|---|
| Light · Empty (1213:4409) | #F8F8F8 `--accent-off-white` | none | placeholder 12 Regular #6C6C6C `--text-light` | `.pds-search-input` |
| Light · Filled (3089:4516) | #F8F8F8 | none | 12 Regular #313131 `--text-dark` | input has a value |
| Light · Active (2464:9222) | #F8F8F8 | 1px #E2EAEC `--border-input-light`, radius 4 4 0 0 | 12 SemiBold #313131 | `.is-open` + panel (`--shadow-4`) |
| Light · Categories (3089:4515) | #F8F8F8 | 1px #0076DD `--pando-blue`, radius 4 4 0 0 | none (text layer removed) | `.pds-search-input--categories.is-open` (`--shadow-3`) |
| Dark · Empty (2980:367) | #484858 (off-token) | none | “Search” 12 Regular +0.5, white 60% | `.pds-search-input--dark`, no icon |
| Show Close Icon = true | — | — | Navigation/Close-Tag 12 #515151 `--grey-dark` | `.pds-search-input__clear` |
| .Search Dropdown (2464:8997) | white | — | 7 × Dropdown Option (Selection · Default, Purple avatar) | `.pds-search-input__panel` |

Categories panel: Heading row (“Option Heading”, 24 high, padding 5/10, #EEF2F4 `--pando-light`, 10 SemiBold caps +0.5, #6C6C6C) → 3 rows with check → Heading → 1 row with check + 2 rows without. Rows have Prefix Icon off, white fill; check = Dropdown Option boolean Selected (Navigation/Selected 12 #0076DD).

| Token | Value | Maps to |
|---|---|---|
| `--search-input-bg` | #F8F8F8 | `--accent-off-white` |
| `--search-input-icon-fg` | #A3A3A3 | `--grey-medium` |
| `--search-input-placeholder-fg` | #6C6C6C | `--text-light` |
| `--search-input-value-fg` | #313131 | `--text-dark` |
| `--search-input-open-border` | #E2EAEC | `--border-input-light` |
| `--search-input-cat-border` | #0076DD | `--pando-blue` |
| `--search-input-clear-fg` | #515151 | `--grey-dark` |
| `--search-input-panel-bg` | #FFFFFF | `--white` |
| `--search-input-panel-shadow` | 0 14 28 6% | `--shadow-4` |
| `--search-input-cat-shadow` | 0 2 14 10% | `--shadow-3` |
| `--search-input-heading-fg` | #6C6C6C | `--text-light` |
| `--search-input-dark-bg` | #484858 | off-token in Figma (`--input-dark-field-bg`) |
| `--search-input-dark-placeholder` | white 60% | off-token in Figma |
| `--search-input-dark-value-fg` | #FFFFFF | `--white` — added, not in Figma |

## Anatomy & spacing
Field: icon 10 → input (fills) → clear 12 · height 36 · padding 10 (`--space-10`) · gap 10 · radius 4. Stroke is inside in Figma, so CSS uses a 1px (transparent at rest) border.
Dark: 279 × 32 (Figma 279.3) · padding 8/10 · no icon.
Panel: 300 wide, rows 56 (dropdown-option), headings 24 (menu section), directly under the field.
Type: `.type-12-regular` / `.type-12-semibold` at line-height 16 (Figma 16; Active text Auto).
px values used (component tokens): 4 (radius), 8 (dark padding), 10 (icon), 12 (clear), 16 (line height), 32, 36, 279, 300, 392 (panel max height), 0.5 (dark tracking).

## Behaviour
Figma only shows static states; the behaviour below is built for the kit.
- Typing opens the panel and filters rows by title + secondary text (case-insensitive). Category headings hide when none of their rows match. Nothing matches → the panel closes (no empty state in Figma).
- ↓ opens / moves, ↑ moves, Enter picks the highlighted row, Esc closes, click outside closes. Highlight = `.is-active` (Hover look) + `aria-activedescendant`.
- Default list: picking puts the row title in the field and closes. Categories: picking toggles the row’s check (`aria-selected`) and keeps the list open — assumed from the checks shown.
- Clear × (Show Close Icon) shows while the field has a value; clears and refocuses.
- Event `pds-search-input:select` (bubbles) with `{option, title, selected}`.

## When (not) to use
Figma has no usage text.

## Accessibility
- Input `role="combobox"`, `aria-expanded`, `aria-controls` → panel `role="listbox"`, `aria-autocomplete="list"`; Categories adds `aria-multiselectable`. Rows `role="option"` + `aria-selected`; headings `role="presentation"`.
- No visible label in Figma: give the input an `aria-label`.
- Clear is a `<button aria-label="Clear search">`. Focus outlines (2px #0076DD) are added — not in Figma.
- Contrast for the a11y pass: placeholder #6C6C6C on #F8F8F8 5.0 : 1; search icon #A3A3A3 on #F8F8F8 2.4 : 1 (fails 3); Active border #E2EAEC 1.2 : 1; dark placeholder white 60% on #484858 ≈ 3.9 : 1 (fails 4.5); closed field #F8F8F8 on white 1.06 : 1 (no visible edge).

## Open issues
- Atom variant missing in kit: `input.css` has no 36px search field — built inside this component.
- All behaviour (filter, keys, clear on value, Categories multi-toggle) is not in Figma.
- No empty / no-results, loading, disabled or error state.
- Categories: search text layer removed (icon only), border #0076DD vs Active #E2EAEC, shadow on the whole frame (built on the panel), different shadow from Active.
- Option Heading #6C6C6C vs menu section heading #313131 — reused `.pds-menu__section`, overrode `--menu-section-fg`.
- Dark: Empty only, no icon, no list; typed text colour added; width 279.3.
- Search icon: Union #A3A3A3 over #8A8A9E inner paths; built #A3A3A3.
- Line height 16 vs 17 in `.type-12-*`.
- `.Search Dropdown` has no scroll; max-height 392 + scroll added. Rows inherit dropdown-option issues.
- Off-token: #484858, white 60%.

## Not adopted
- Industry gaps, not added: sizes 24/32/40/48, disabled state, Esc clears the field (Carbon Search).
- Other sets on the Search page (Search Section, Search chat, .Search_Menu, Search 4894:18073) — separate molecules.

## Sources
Figma 2419:10052 (variants 1213:4409, 3089:4516, 2464:9222, 3089:4515, 2980:367) · 2464:8997 · kit `dropdown-option.css`, `menu.css`, `input.css`, `icons/icons-data.js`
Carbon Search usage — https://carbondesignsystem.com/components/search/usage/
