# Search Section + Search chat — Pando DS V1

**Status:** Built 2026-10-28 · no review (every published item kept) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › 🟡 Search (60:273) › `Search Section` (61:377) · `Search chat` (6764:2582) · `.Search_Menu` (6763:2419)
**Files:** `search-advanced.css` (styles + component tokens) · `search-advanced.js` (`pdsSearchAdvanced.initSection`, `.initChat`, `.initAll`) · `search-advanced.html` (live doc). Reuses `input.css/js` (Input - Text fields via `pdsInput.build`), `button.css` (Text Only Small, Primary Small), `button-group.css`, `search-input.css/js` (chat field), `icons.css` + `icons/` (Navigation/Search-10px, Navigation/Close-Tag, Indicator Icon/Comment 14, Indicator Icon/Details 14).

## What it is
Two search panels. Figma has no written description; this is drawn from the components.
- **Search Section** — an advanced-search card: up to three rows of three labelled fields, Clear All and Search at the bottom right.
- **Search chat** — a search field over a list of recent chats and artifacts, with All / Chats / Artifacts chips. Rows are **.Search_Menu**.

## Variants
| Item | Variants / props | Build |
|---|---|---|
| Search Section (61:377) | booleans 1st Row, 2nd Row, 3rd Row (all default on) | `.pds-search-advanced`; a hidden row = `[hidden]` on `.pds-search-advanced__row` |
| Search chat (6764:2582) | none | `.pds-search-advanced.pds-search-advanced--chat` |
| .Search_Menu (6763:2419) | Property 1 = Default · Hover | `.pds-search-advanced__item`; Hover = `:hover` / `.is-active` |

| Part | Value | Token |
|---|---|---|
| Container | #FFFFFF, radius 4, 0 2 14 10% | `--white`, `--shadow-3` |
| Section fields | row 1: 3 × Input - Text Search Tag (“Name” chip); rows 2–3: 3 × Default; all 200 × 60, “Input Label” / “Placeholder Ghost Text” | kit `pdsInput.build({type:'searchtag'|'text', size:200})` |
| Section buttons | Text Only Small “Clear All” + Primary Small “Search”, gap 20 | kit `.pds-button--text.pds-button--small`, `.pds-button--small` in `.pds-button-group` |
| Chat field | Search Input Light Empty 516 × 36, “Search chats and artifacts” | kit `.pds-search-input` |
| Chat field tools | CLEAR (Text Only Small, Disabled #A3A3A3) · line 14 #E2EAEC · Close-Tag 12 #515151 | kit button; `--border-input-light`; `--grey-dark` |
| Chip · selected | #0076DD, white text, no shadow | `--pando-blue`, `--white` |
| Chip · unselected | #F9FAFA, #18283B text, 0 1 3 10% | `--accent-alternate-white`, off-token, `--shadow-1` (0 2 3 10%) |
| Chip text | 10 Regular, caps, line Auto (14), tracking 0 | component token `--search-advanced-chip-font` |
| Row · Default / Hover | none / #EEF2F4 | `--pando-light` |
| Row title | 12 SemiBold #404040, line 16 | `.type-12-semibold` (17) + off-token |
| Row meta | 10 Regular #404040, 10/12 +0.5 | `.type-10-regular` + off-token |
| Row icon | Indicator Icon/Comment or Details 14, #313131 | `--text-dark` |

| Token | Value | Maps to |
|---|---|---|
| `--search-advanced-bg` | #FFFFFF | `--white` |
| `--search-advanced-shadow` | 0 2 14 10% | `--shadow-3` |
| `--search-advanced-divider` | #E2EAEC | `--border-input-light` |
| `--search-advanced-close-fg` | #515151 | `--grey-dark` |
| `--search-advanced-chip-bg` | #F9FAFA | `--accent-alternate-white` |
| `--search-advanced-chip-fg` | #18283B | off-token in Figma |
| `--search-advanced-chip-shadow` | 0 2 3 10% | `--shadow-1` (Figma 0 1 3 10%) |
| `--search-advanced-chip-on-bg` | #0076DD | `--pando-blue` |
| `--search-advanced-item-hover` | #EEF2F4 | `--pando-light` |
| `--search-advanced-item-fg` | #404040 | off-token in Figma |
| `--search-advanced-item-icon-fg` | #313131 | `--text-dark` |

## Anatomy & spacing
**Search Section** 620 × 234: padding 10 (`--space-10`), gap 10, column, content right-aligned. Block = 3 rows × 3 fields of 200 × 60, no gap (inside borders meet as 2px lines). Button group hugs 24 (kit group min-height 30 reset to 0).
**Search chat** 520 × 466, column, no padding:
- Header 48: padding 2 / 2 / 10 / 2; field 516 × 36. Tools group absolute top 13 / right 13, gap 10 (CLEAR 32 · line · × 12).
- Chips row 20: padding 0 / 10, gap 6; chip padding 3 / 6, radius 14.
- List 398: padding 10, gap 2, 10 rows.
**.Search_Menu** 36 high: padding 10, gap 4, radius 4; main = icon 14 + gap 10 + title (bottom-aligned, fills, ellipsis); meta at the right.
px values used (component tokens): 4 (radius, row gap), 6 (chip gap, chip side padding), 3 (chip top/bottom), 13 (tools offset), 14 (chip radius, divider height, icon), 12 (close), 16 (title line), 20, 36, 64 (field right padding under tools), 200, 520, 1 / −0.5 (divider).

## Behaviour
Figma shows static frames only; everything below is added for the kit.
- **Search Section:** Clear All empties the visible fields and focuses the first. Search fires `pds-search-advanced:search` `{values:[{label, value}]}`. Field behaviour is the Input atom's.
- **Search chat:** typing filters rows by title. CLEAR is disabled while the field is empty and enabled once there is text; it clears and refocuses. Chips are single-select (`aria-pressed`) and filter by `data-kind` (`chat` | `artifact`). ↓ / ↑ move the highlight (`.is-active`, `aria-activedescendant`); the highlighted row shows “↵ Enter” in place of its time; Enter or click fires `pds-search-chat:open` `{item, title}`. × fires `pds-search-chat:close`.

## When (not) to use
Figma has no usage text.

## Accessibility
- Search Section: `role="search"` + `aria-label`; each field keeps its kit `<label>`.
- Search chat: field `role="combobox"` → list `role="listbox"`, rows `role="option"` + `aria-selected`; chips are `<button aria-pressed>` in `role="group" aria-label="Show"`; × is `<button aria-label="Close search">`. The field has no visible label: it uses `aria-label`.
- Focus outlines (2px #0076DD) added — not in Figma.
- Contrast for the a11y pass: Disabled CLEAR #A3A3A3 on #F8F8F8 2.4 : 1; selected chip white on #0076DD 4.6 : 1; row text #404040 on #EEF2F4 9.1 : 1; tools line #E2EAEC on #F8F8F8 1.2 : 1; unselected chip edge ≈ 1.0 : 1 (shadow only).

## Open issues
- Atom variant missing in kit: All / Chats / Artifacts chips (Toggle Tab pills are 24 high with a border) — built here.
- Atom variant missing in kit: .Search_Menu row (Dropdown Option is 56 high with an avatar) — built here.
- All behaviour is added (filter, chips, keys, Clear All, CLEAR enable, events). Chip → row type is assumed from the icon (Comment = chat, Details = artifact).
- “↵ Enter” appears only in the Search chat instance's Hover row; the .Search_Menu Hover variant shows the time. The first chat row has no time in Figma.
- Tools group is an absolute overlay on the Search Input, not a part of it; 64px right padding on the typed text added so text does not run under it.
- Off-token: #404040, #18283B. Chip shadow 0 1 3 10% vs `--shadow-1` 0 2 3 10%.
- Line heights: row title 16 vs 17 in `.type-12-semibold`; chip 10/14 tracking 0 vs `.type-10-regular` 10/12 +0.5.
- Search Section: fields abut (2px lines); row 1 Search Tag fields have Show Tag 1/2 on but show no tags; Button Group overridden to Text Only Small + Primary Small (kit default Secondary + Primary Normal); kit group min-height 30 reset.
- Row titles are truncated by hand in Figma; built with CSS ellipsis.
- No empty / no-results, loading, error or Dark state. Indicator icons drawn #313131 (kit default #234357).

## Not adopted
- `Search` set 4894:18073 — separate item (search-panel).
- Search Input and .Search Dropdown — built as `search-input`.
- Industry gaps, not added: Esc clears the field; clear control appears only after typing; Enter submits (Carbon Search).

## Sources
Figma 61:377 · 6764:2582 · 6763:2419 (6763:2420 Default, 6763:2425 Hover) · kit `input.css/js`, `button.css`, `button-group.css`, `search-input.css/js`, `icons/icons-data.js`
Carbon Search usage — https://carbondesignsystem.com/components/search/usage/
