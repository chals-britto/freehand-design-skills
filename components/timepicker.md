# Timepicker — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › 🟢 Calendar (138:494) › `Timepicker` (3447:624)
**Files:** `timepicker.css` (styles + component tokens) · `timepicker.js` (`pdsTimepicker.build / init / attach`) · `timepicker.html` (live doc)
**Atoms reused:** `button.css` (Cancel = Text Only · Light · Small, Apply = Text Button · Primary · Small) · `input.css` / `input.js` (the field it opens from).

## What it is
A panel with an hour column and a minute column, a selection band that marks the chosen value, and Cancel / Apply. Figma has no written description beyond the component note: “Adjust the Selection Border padding to suit the width of the dropdown. 10px padding on Left and Right.”

## Variants
One component, no variant properties.

| Part | Value | Token |
|---|---|---|
| Surface | #FFFFFF, radius 4, clip | `--white` · `--timepicker-radius` 4px |
| Shadow | 0 14 28 · 6% black | `--shadow-4` |
| Hour / minute values | #313131, Open Sans SemiBold 12, auto line height, +0.5 tracking | `--text-dark` · `.type-12-semibold` |
| Colon “:” | #000000, same type | `--timepicker-colon` (off-token) |
| Selection band | 2 lines, 1px #E2EAEC, 30 apart | `--border-input-light` |
| Divider | 1px #EFEFEF, full width | `--border-grey` |
| Cancel | Button Text Only, Light, Small, Default | kit `pds-button--text pds-button--small` |
| Apply | Button Text Button, Primary, Small, Default | kit `pds-button--small` |

Values: hours 00–23 (Figma draws 00–18), minutes 00–55 in steps of 5. No AM/PM in Figma.

## Anatomy & spacing
160 × 204 · vertical stack, gap 10: Time (150 tall) · Divider · Buttons.
Time row: Hour column · “:” · Minute column, gap 20, centred. Columns 45 × 150, padding 15 (left/right), row 16 + gap 10 (26 pitch), clipped.
Selection band: absolute, top 61, 30 tall, 10 in from left and right. The selected row sits at y 67.
Buttons row: padding 0 15 10, space-between, 34 tall.

## Behaviour
- The value inside the band is the selected value. Scroll a column (snaps to rows), click a value, or use the keyboard.
- **Apply** returns `HH:MM` (24-hour). **Cancel** discards.
- `pdsTimepicker.attach(input)` opens the panel under a kit input on click or ↓, as wide as the field (min 160), and gives the field its Active border while open. Apply writes the value and fires `input` + `change`; Cancel, Esc or a click outside close without changing it. Focus returns to the field. *(added in review — Figma shows the panel only)*
- A typed time between steps rounds down to the step.

## When (not) to use
Figma has no usage text. Not added.

## Accessibility
- Columns: `role="listbox"`, labelled “Hours” / “Minutes”, `aria-activedescendant` on the value in the band, `aria-selected` on that option.
- Attached panel: `role="dialog"`, label “Choose time”; field gets `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`.
- Keyboard *(added in review)*: ↑ / ↓ change value · Home / End first / last · ← / → switch column · Tab to Cancel / Apply · Enter applies · Esc cancels.
- Focus ring on a column: 2px `--pando-blue` inset *(added in review — not in Figma)*.
- Contrast: #313131 on white passes. Button contrast as in the button atom.

## Open issues
- Figma lists hours 00–18 only (clipped column); built 00–23. Confirm 24-hour; no AM/PM in Figma.
- Selected value has no visual change — only the band. No hover state for values.
- Colon #000000 is not in tokens.css (values use #313131).
- Column padding 15 in Figma; top/bottom extended to 67 so the first and last values can reach the band (added in review).
- Line height: Figma auto (16px rows) vs `.type-12-semibold` 17px — overridden to 16px.
- Kit buttons render uppercase (“CANCEL”, “APPLY”); Figma copy is “Cancel” / “Apply”. Check the text case on the button atom.
- Attached width follows the field (min 160), read from the Figma note about the band padding. Confirm.

## Not adopted
- Loose instance `Timepicker` 5455:2710 on the Calendar page — a placed copy, nothing new.
- Calendar set (164:3009) and its parts — later batch.
- Industry gaps, not added: 12-hour + AM/PM, seconds column, disabled/hidden times, “Now” button, clear × on the field (Ant TimePicker).

## Sources
Figma 3447:624 (read-only `use_figma`).
Ant Design TimePicker — https://ant.design/components/time-picker
