# List — Pando DS V1

**Status:** Built from Figma 2026-10-28 · no review (everything published treated as Keep) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › ✏️ List (1:870) — `List` (2478:9036), `.Base List` (2498:9649), `.Options in Right` (5417:2388), `.Table Style` (5447:3704)
**Files:** `list.css` (styles + component tokens) · `list.js` (`window.pdsList`: row select, expand/collapse icon) · `list.html` (live doc)
**Uses kit:** `list-column.css` (Text, Status, Swappable columns) · `checkbox.css` · `button.css` + `button-group.css` (Action Buttons) · `status.css` (Purple vertical, Brown small) · icons `nav-list-expand`, `nav-list-collapse`, `action-lr`, `status-indent-type-contract`, `status-movement-type-secondary`, `status-other-overpack`.

## What it is
One list row: List Columns on the left, options on the right. Figma has no description text for these sets.

## Variants
11 published variants, all built: List 5 · .Base List 2 · .Options in Right 2 · .Table Style 2.

### List (2478:9036) — `Theme` (Light) × `Type` × `State`
| Type | State | Fill | Padding | Height | Shadow | Right side | Classes |
|---|---|---|---|---|---|---|---|
| Standard | Default | `--white` | 5 / 15 | 52 | `--shadow-2` | Button Group Action, 3 × “Action” | `.pds-list` |
| Standard | Hover | `--pando-light` #EEF2F4 | 5 / 15 | 52 | `--shadow-2` | same | `:hover` / `.is-hover` |
| Swappable | Default | `--white` | 5 / 15 | 48 | `--shadow-2` | — (slot fills row) | `--swappable` |
| Table Style | Default | `--white` | 10 / 15 | 57 | `--shadow-2` (wrapper) | .Options in Right Status | `--table --shadow` |
| Table Style | Hover | `--pando-light` | 10 / 15 | 57 | none | same | `--table` + `:hover` |

Booleans (all rows): Show Checkbox (false) · Show Info Indicator (false) · Expand/Collapse (false) · Show Column 5 (true) · 6 (true) · 7 (false) · 8 (false).
Sample data: Standard — Column 1 / #Status Purple vertical “Status Text” / Column 3 (Large) / Column 4 / Column 5 / Column 6, each with “Additional Text”. Table Style — Column 1 / Main Text / Column 3 (Large) / Column 4–6.

### .Base List (2498:9649) — `Property 1`
| Variant | Fill | Size | Classes |
|---|---|---|---|
| Default | `--white`, `--shadow-2` | 48 high, empty | `.pds-list` (no children) |
| Hover | `--pando-light` | 48 high, empty | `.is-hover` |

### .Options in Right (5417:2388) — `Option`
| Variant | Content | Layout | Classes |
|---|---|---|---|
| Action | Button Group Action, 1 × Action button (“Action”, icon 10px LR) | column, bottom-aligned | `.pds-list__options` + `.pds-button-group--action` |
| Status | #Status Brown, Small, Horizontal, no icons, “Status Text” | column, bottom-aligned | `.pds-list__options` + `.pds-status--brown.pds-status--small` |

### .Table Style (5447:3704) — `BG` + booleans (Right-Status true, Right-Action false, plus the List booleans)
| BG | Fill | Divider | Classes |
|---|---|---|---|
| White | `--white` | bottom 1px `--border-grey` #EFEFEF | `.pds-list--table` |
| Alternate | `--accent-alternate-white` #F9FAFA | same | `.pds-list--table.pds-list--alternate` |

| Part | Value | Token |
|---|---|---|
| Info indicator | 4 wide, full height, left edge, radius 2 0 0 2, #D26568 | `--accent-red-medium` |
| Expand/Collapse icon | Navigation/List-Type 20 × 20, x −10, centred; List Expand ↔ List Collapse | `nav-list-expand` / `nav-list-collapse` |
| Row radius | 2 | `--list-radius` |
| Shadow | 0 2 4 6% | `--shadow-2` |

## Anatomy & spacing
- Row: horizontal, centred, gap 20, fills width (1240 in Figma). Items: [Checkbox] [Info indicator, absolute] [Expand icon, absolute] Content.
- Content: Data left, options right (space-between). Standard gap 20, Data fills. Table Style gap 15, Data hugs.
- Data: List Columns, gap 20, each keeps its fixed width (120 / 130 Status / 180 Large).
- Padding: Standard, Swappable, .Base List 5 / 15 · Table Style 10 / 15 (bottom 9 + 1px divider).
- Swappable: the List Column Swappable slot fills the row.

## Behaviour
- **Hover** (Figma prototype: On hover → Change to Hover): fill turns #EEF2F4; Table Style also drops the shadow. Swappable has no hover. Options stay visible in both states.
- **Row select** (`list.js`): the kit checkbox in `.pds-list__check`. On change the row gets `aria-selected` and `.is-selected` (no visual in Figma) and the nearest `[data-pds-list]` container fires `pds-list-select` with `detail.rows`. No header checkbox in Figma → no select-all.
- **Expand/Collapse** (`list.js`): the icon button swaps List Expand ↔ List Collapse and flips `aria-expanded`; fires `pds-list-toggle` (`detail.expanded`). What expands is not in Figma.
- API: `pdsList.init(root)`, `pdsList.selected(container)`, `pdsList.toggle(button, force)`.

## When (not) to use
No usage text in Figma.

## Accessibility
- Row checkbox has no visible label: give it `aria-label` (e.g. “Select Column 1”).
- Expand icon is a `<button>` with `aria-label` and `aria-expanded`; focus ring added in review — not in Figma (`outline: 2px solid var(--pando-blue)`).
- Info indicator is colour only — add text for screen readers.
- Options are always visible, so hover hides nothing from keyboard or touch users.
- Contrast for the a11y pass: divider #EFEFEF on white 1.1 : 1; indicator #D26568 on white 3.9 : 1.

## Open issues
- Hover does not reveal the right-side options — Figma shows them in Default and Hover. Built as Figma.
- No selected-row visual and no header checkbox (no select-all) in Figma.
- Swappable has no Hover variant.
- List Table Style Default has a shadow (wrapper), Hover and the .Table Style set do not → `--shadow` modifier for List Default only.
- .Table Style booleans Right-Action and Expand/Collapse are not wired to any layer.
- Standard shows 3 Action buttons, .Options in Right Action shows 1; kit Button Group Action is a fixed 5 with no booleans — built by leaving buttons out.
- Status in .Options in Right: Figma 85 wide, label frame 95, padding 2/10; kit Small is 107 with padding 2/5. Kit kept, width hugs.
- Navigation/List-Type icon SVG carries its own filter shadow; rebuilt as CSS `drop-shadow` (same 0-2-4-6%) and cropped to 20 × 20.
- Hidden Columns 7–8 sample text unreadable (hidden instances) → List Column default “Main Text”.
- Error-Indication is 52 fixed high (Table rows are 57); built full height.
- Row stacking gap undefined; doc page uses 10 (Standard) and 0 (Table Style).
- No dark theme, disabled, loading or empty-list state. Narrow screens scroll sideways.

## Not adopted
- `.List - OLD (REFERENCE)` 256:19 (14 variants) — reference only.
- Loose frames on the page (`List` 2473:9190, `Subheader` 2386:7276, stray `List` / `Skeleton` instances) — not components.

## Industry gaps — not added
- Header select-all checkbox with indeterminate; radios for single-select — Carbon Data table.
- Batch action bar on selection — Carbon Data table.
- Row actions on hover/focus only (kept on touch) as an option — Carbon Data table (`overflowMenuOnHover`).
- Expand icon left of the selection control; optional expand-all — Carbon Data table.
- Empty text, loading indicator, pagination / load more — Ant List.

## Sources
Figma `List` 2478:9036 · `.Base List` 2498:9649 · `.Options in Right` 5417:2388 · `.Table Style` 5447:3704
Carbon Data table usage — https://carbondesignsystem.com/components/data-table/usage/
Ant Design List — https://ant.design/components/list
