# Condition — Pando DS V1

**Status:** Built from Figma, not reviewed · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › 🟡 Conditions (2305:4670) › `Condition` (2384:6520)
**Files:** `condition.css` (layout + component tokens) · `condition.js` (`pdsCondition`) · `condition.html` (live doc)
**Uses:** `input.css` + `input.js` (Input - Dropdown Select and Input - Text, Type=Condition, Size=Auto) · `tag.css` (Tag, Nimbus, Default)

## What it is
A rule row made of condition fields (field · operator · value). Rows can be linked, wrapped in round brackets, or joined under an And/Or tag. The Figma `.documentation` card on this page is a copy of the Calendar card, so there is no Figma description. This sentence was written in the build.

## Variants
`Theme` (Light only) × `Type` = 4 variants.

| Type | Structure | Fields (Figma order and sample text) |
|---|---|---|
| Single | one row, fields edge to edge (gap −1), 14px label slot (empty) + 2 → 52 high | Condition · operator (disabled) · Condition · Condition · operator (disabled) · `$` *Value* (text) · Value (disabled) |
| Linked | rows 10 apart, no label slot (36 high), bracket on the left | Row 1: Condition · operator · Condition · Condition · operator · `$` *Value* — Row 2: Condition · operator · Value |
| And/Or | Tag “And” (shown as AND) + connector + Linked | as Linked |
| Brackets | padding 10, items centred: `(` row `)` row | ( Condition·“Label” · operator · Condition · Condition·“Label” · `$` *Value* ) operator · `$` *Value*·“Label” |

Field colours come from the kit: dropdown fill `--input-disabled-bg` (#E7E7E7 30%), border `--border-grey` #EFEFEF, value `--pando-blue` #0076DD, disabled value #616161. The text field is white with a `--border-input-light` #E2EAEC border.

## Anatomy & spacing
- Field overlap `-1px` (`--condition-field-overlap`). Label slot `14px`, label↔box `2px` (`--space-2`, from input.css).
- Linked: row gap `10px` (`--space-10`). Bracket `10px` wide, 1px `--border-blue-grey` #B5C3CB. Ticks `15px` below the top of the first row and `14px` above the bottom of the last. Rows indented `9px`.
- And/Or: Linked group at `30, 36`, tag at `11, 5`, a 1px #B5C3CB connector at x `30` from y `26`, `25px` long.
- Brackets: padding `10px`. Bracket cell `14px` wide, padding `26px 5px 12px`. Glyph `.type-10-bold` (10/14 Bold), #000000.

## Behaviour
- Every field is a kit input, so it opens, picks and closes exactly as in `input.js`: click or Enter/Space/↓ opens, ↑ ↓ move, Enter picks, Esc or a click outside closes. Lists show the kit's “Default Option” rows.
- `pdsCondition.addRow(el)` adds a row to Linked / And/Or (Figma's row 2: Condition · operator · Value). `removeRow(el)` removes the last row, and a group keeps at least one. With one row the bracket is hidden. *(Build behaviour: Figma has no add or remove control.)*
- `pdsCondition.setLogic(el, 'And' | 'Or')` changes the tag text. *(Build behaviour: Figma shows only “And”. “Or” comes from the variant name.)*

## When (not) to use
No Figma text.

## Accessibility
- Each row has `role="group"` with the name “Condition”. The And/Or wrapper is named “Conditions joined by AND/OR”. Brackets are `aria-hidden`.
- Unlabelled fields get `aria-label` Field / Operator / Value (added in build — not in Figma).
- Contrast below 4.5:1 (kept as Figma): blue value on the field fill 4.27:1, `$` prefix #A3A3A3 on white 2.52:1, disabled arrow 2.38:1.

## Open issues
- `.documentation` on the page is the Calendar card. There's no Condition description.
- No add-row, remove-row, add-group or And/Or switch in Figma.
- The operator is disabled in every sample, so it can never be picked.
- The sample rows look like placeholders: “Condition” ×3, and Single ends with a second Value dropdown.
- Labels are uneven: Single has empty label slots, and Brackets labels only 3 of 7 fields.
- Brackets: the first cell holds two “(” texts, one 4px tall, and only one is rendered. The bracket colour #000000 is off-token.
- Linked ticks sit at 15 / 14px, not at the 18px field centre.
- The Figma label colour #737373 differs from the kit Condition label `--text-light` #6C6C6C. The kit value is kept.
- Only Theme=Light exists.

## Not adopted
Nothing skipped. The only loose node is the `.documentation` instance (Calendar copy). Industry gaps not added: add and remove controls per row and per group, clear-all (Carbon Filtering), and nested groups beyond Single → Linked → And/Or.

## Sources
Figma component set 2384:6520 — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=2384-6520
Carbon Filtering pattern — https://carbondesignsystem.com/patterns/filtering/
