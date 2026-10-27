# Label Readonly Text — Pando DS V1

**Status:** Built from Figma 2026-10-27 (no review yet: every published item treated as Keep) · **Figma:** DS V2 – Atoms › Foundation – Text & Text Styles › `Label Readonly Text` (3212:3376)
**Files:** `readonly.css` (styles + component tokens) · `readonly.html` (live doc) · no JS (no behaviour)

## What it is
Detail and Information. *(Figma component description, both variants)*
A single read-only line: a label, a colon, then the value in semibold — “Label Text : Information Text”.

## Variants
`Theme` = 2 variants. Same layout and type; only the text colour changes.

| Theme | Figma node | Label | “:” | Value | Token |
|---|---|---|---|---|---|
| Light `--light` (default) | 563:3 | #313131 | #313131 | #313131 | `--readonly-light-fg` → `--text-dark` (style Text/Dark) |
| Dark `--dark` | 3212:3375 | #D5DAF4 | #D5DAF4 | #D5DAF4 | `--readonly-dark-fg` → `--dark-label-text` (style Dark/Label-Text) |

Dark is for the dark (sidebar) surfaces; Figma does not place it on a surface. The doc page shows it on `--dark-bg` #393945.

## Anatomy & spacing
Horizontal auto-layout, hugs content both ways · gap **4px** (`--readonly-gap`) · no padding · no fill, border, radius or shadow · height 16 in Figma.

| Part | Figma text style | Figma values | Kit class |
|---|---|---|---|
| Label (`__label`) | 12px/Body | Open Sans Regular 12 / 16px | `.type-12-regular` (12 / 17) |
| Separator “:” (`__sep`) | Label/Regular/Normal | Open Sans Regular 12 / auto | `.type-12-regular` (12 / 17) |
| Value (`__value`) | 12px/Heading | Open Sans SemiBold 12 / auto | `.type-12-semibold` (12 / 17) |

Sample text is Figma’s: “Label Text”, “:”, “Information Text”.

## Behaviour
None. Static text; not focusable, no hover, no truncation or wrapping rule in Figma.

## When (not) to use
Figma has no usage text for this component.

## Accessibility
- Plain text, so it is read in order: label, colon, value. No ARIA needed.
- Contrast: Light #313131 on white 13.0 : 1; Dark #D5DAF4 on `--dark-bg` #393945 8.2 : 1 — both pass 4.5 : 1. Dark on a white surface is 1.4 : 1 (wrong surface).

## Open issues
- **Line height:** Figma label is 16px, separator and value are “auto” (≈16px in Open Sans); the kit’s `.type-12-*` classes are 17px, so the line is 17px tall in code instead of 16.
- **Several pairs:** Figma shows only one line. No row, column or grid of pairs, no spacing between pairs and no label-column width exist — not built.
- **Long values:** no wrapping or truncation rule in Figma. Code lets the value wrap within its own column.
- **Empty value:** no empty/placeholder state in Figma.
- **Dark surface:** the Dark variant has no background in Figma; which surface it sits on is assumed (`--dark-bg`).
- `review/atoms-audit.md` describes the second row as “faded/disabled”; it is `Theme=Dark` (#D5DAF4), not a disabled state.

## Not adopted
- Nothing else is published on this page for the component. Loose items on the page (text-style specimens, Grid Styles frames, a loose `.Base Input` instance) are not part of it.

### Industry gaps — not added
- Read-only form controls (a field that stays focusable but can’t be edited) — Carbon’s read-only state. This component is static text, not a field; the input read-only state lives in `input.md`. *(Carbon read-only states)*
- Carbon: don’t use the read-only state for static information that has no enabled state — consistent with keeping this as plain text. *(Carbon read-only states)*
- Top-aligned labels as the default; side (left) labels only when space is short and values are similar. This component is a side-label layout; no top-label variant. *(Fluent 2 Field)*
- Sentence-case, short labels. Figma sample uses Title Case (“Label Text”). *(Fluent 2 Field)*

## Sources
Carbon read-only states pattern — https://carbondesignsystem.com/patterns/read-only-states-pattern/
Fluent 2 Field usage — https://fluent2.microsoft.design/components/web/react/core/field/usage
