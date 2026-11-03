# Column Picker — Pando DS V1

**Status:** Built 2026-10-28 · no review yet (everything published = Keep) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › ✏️ Dropdown (2312:4660) › `Column Picker` (3098:3179), `Column Picker Advanced` (6358:1771), `.Column Toggle` (3067:2277), `.Column Pin` (3094:669), `.Column Toggle View Advanced` (6356:2357), `View Header` (6356:2480)
**Files:** `column-picker.css` (styles + component tokens) · `column-picker.js` (`pdsColumnPicker`) · `column-picker.html` (live doc)
**Uses kit atoms:** `toggle.css` / `toggle.js` (Switch), `button.css` (Icon Button · Circular · Small), `icons.css` + `icons/icons-data.js` (Misc/Drag Indicator · Small, Indicator Icon/Pin, Unpin, View, Hide, Resize · 14).

## What it is
A panel for choosing which table columns are shown, which are pinned, and their order. Header text in Figma: “Column Picker” / “can display upto 10 columns at any instance”. Figma has no description text for the component.

## Variants
| Component | Property | Values | Built as |
|---|---|---|---|
| Column Picker | Type | Toggle, Pin | `.pds-column-picker--toggle`, `.pds-column-picker--pin` |
| Column Picker | Show Button (boolean, default off) | off / on | header `.pds-button--icon.pds-button--small` |
| Column Picker Advanced | — | 1 | `.pds-column-picker--advanced` |
| .Column Toggle | State | Enabled, Disabled | row + kit Switch (Yes / No) |
| .Column Pin | State | Enabled, Disabled | row + `.pds-column-picker__pin` (Pin / Unpin glyph) |
| .Column Toggle View Advanced | State | Enabled, Disabled | row + two View Header chips + kit Switch |
| View Header | State | View, Hide, Disabled | `.pds-view-header` (`aria-pressed`, `:disabled`) |

| Part | Value | Token |
|---|---|---|
| Panel fill | #FFFFFF | `--white` |
| Panel shadow | 0 14 28 #000 @ 6% | `--shadow-4` |
| Header fill (Toggle / Pin) | #E7E7E7 | `--grey-light` |
| Header fill (Advanced) | #E7E7E7 @ 70% | `--grey-light` via color-mix |
| Title | #005399, 12 SemiBold, UPPERCASE | `--pando-blue-active`, `.type-12-semibold` |
| Subtitle | #313131, 8 Regular | `--text-dark`, `.type-8-regular` |
| Drag dots | #CBD4D8 | `--accent-blue-grey` |
| Column name — shown / pinned | #67AC5D, 12 SemiBold | `--accent-green-medium`, `.type-12-semibold` |
| Column name — hidden / unpinned | #545454 | `--text-medium` |
| Pin glyph | #67AC5D | `--accent-green-medium` |
| Unpin glyph | #234357 at 50% opacity | `--pando-dark` |
| Advanced separator | #E9F1F5, 1px, 306 wide | `--border-blue` |
| “\|” between chips | #67AC5D (row on) / #6C6C6C (row off) | `--accent-green-medium` / `--text-light` |
| View Header · View | fill #D5F9D1 @ 20%, text + eye #67AC5D | `--status-green-light`, `--accent-green-medium` |
| View Header · Hide | fill #F9FAFA, text + eye-off #545454 | `--accent-alternate-white`, `--text-medium` |
| View Header · Disabled | fill #FFFFFF, text + eye-off #A3A2A2 | `--white`, `--text-disabled` |
| Switch | kit Switch, Light, action text | `toggle.css` |

## Anatomy & spacing
- **Column Picker (Toggle / Pin):** width 220 · vertical stack, gap 8 · padding-bottom 10. Header: padding 10, gap 15 (text ↔ button), title ↔ subtitle 2, height hugs (49). Rows 200 wide, centred, 16 high; name left, control right (Figma gap 134 = space-between).
- **Row left part:** drag handle (7 × 11 kit icon; the Figma instance is 5 × 11) · gap 6 · column name.
- **Column Picker Advanced:** width 330 · gap 6 · padding-bottom 10. Rows 330 × 24, padding 0 / 10. Between rows: 6 · 1px separator (306 wide, 12 in from each side) · 6.
- **Headers group:** chip · “\|” · chip, gap 2. Chip: height 24, padding 4, gap 4 (icon ↔ text), radius 4, icon 14.
- **Header button (Show Button):** kit Icon Button · Circular Background · Small (20, glyph 14), Indicator Icon/Resize.

## Behaviour
- **Toggle:** the Switch shows (Yes) or hides (No) the column. A hidden column’s name turns #545454 — this is `.Column Toggle` State = Disabled.
- **Pin:** the pin icon pins / unpins the column. Unpinned shows the Unpin glyph and the #545454 name — `.Column Pin` State = Disabled.
- **Advanced:** the Switch shows / hides the column. Each of the two View Header chips shows (View) or hides (Hide) that header while the column is on. With the column off, both chips are Disabled; turning it back on restores each chip.
- **Reorder:** drag a row by its dotted handle. Keyboard (added in review, not in Figma): focus the handle and press ↑ / ↓; Home / End move to the ends. The new position is announced.
- Changes apply immediately — Figma has no Apply / Reset and no search.
- `column-picker.js` fires a bubbling `pds-columns-change` (`detail.reason`, `detail.columns`) on every change; the header button fires `pds-columns-button`.

## When (not) to use
No guidance in Figma.

## Accessibility
- The picker is `role="group"` named by its title; the list is a `<ul>`.
- Switch: kit `role="switch"`, named “Show {column}”. Pin: `<button aria-pressed>` named “Pin {column}”. View Header: `<button aria-pressed>` named “Show header {name}”, `disabled` when the column is off.
- Drag handle is a `<button>` named “Move {column}. Arrow keys move it”; reorders are announced in a polite live region.
- Focus ring (added in review — not in Figma): 2px `--pando-blue`, offset 2.

## Open issues
- Contrast (deferred): #67AC5D names and pin on white 2.75 : 1; Unpin glyph #234357 at 50% ≈ 2.7 : 1; Disabled chip #A3A2A2 on white 2.55 : 1; drag dots #CBD4D8 1.5 : 1; 8px subtitle is below readable size.
- Line heights: Figma uses Auto (12 SemiBold → 16, 8 Regular → 11); kit `.type-12-semibold` is 17, `.type-8-regular` is 10.
- Drag Indicator instance is 5 × 11 in `.Column Toggle` / `.Column Pin`, 7 × 11 in Advanced; the kit icon (7 × 11) is used for all.
- Subtitle says “can display upto 10 columns at any instance”, but Figma shows no state for reaching the limit; nothing is enforced.
- Header button: hidden by default; its icon slot is Indicator Icon/Resize and Figma doesn’t say what it does or give it a label. Built with `aria-label="Resize"`.
- Advanced: what the two headers per column mean is not stated (both say “Column Name”). The hidden Checkbox inside `.Column Toggle View Advanced` is not shown.
- No hover, focus, dragging or drop-indicator states in Figma. No max height or scroll for long lists (Toggle set has 19 rows, 12 visible).
- No single-pointer alternative to dragging (WCAG 2.5.7); the keyboard alternative does not cover pointer-only users.
- Atom variant missing in kit: none.

## Industry gaps — not added
- Reset to default, “select all”, and a search field in the column list — Ant Design ProTable column settings (`checkedReset`, `columnsState.defaultValue`, `draggable`, `checkable`).
- Single-pointer move (e.g. move up / down buttons) — WCAG 2.2 · 2.5.7 Dragging Movements.

## Not adopted
- `Column Picker` 1:1043 on the List page — older version, reference only.
- Hidden rows in the Figma sets (7 in Toggle, 5 in Pin, 9 in Advanced) — not rendered on the page.
- Hidden Checkbox in `.Column Toggle View Advanced`.

## Sources
Figma: rd3gmPnjhPo1d2GAlNSJOn nodes 3098:3179, 6358:1771, 3067:2277, 3094:669, 6356:2357, 6356:2480.
Ant Design ProTable — https://pro-components.antdigital.dev/en-US/components/table
WCAG 2.2 2.5.7 — https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
Carbon Data table usage (no column customization guidance) — https://carbondesignsystem.com/components/data-table/usage/
