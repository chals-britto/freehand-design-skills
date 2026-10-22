# Radio Buttons — Pando DS V1

**Status:** Reviewed 2026-10-23 · **Figma:** DS V2 – Atoms › Radio Buttons (page 193:223) › `Radio` (3344:3638)
**Files:** `radio.css` (styles + component tokens) · `radio.html` (live doc). No JS: built on native `<input type="radio">`.

## What it is
Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected. *(Figma wording)*

## Variants
`Theme` × `State` × `Selected` = 8 variants, plus boolean `Show Label` (default true).

| Theme | State | Selected | Ring | Centre | Dot | Label |
|---|---|---|---|---|---|---|
| Light | Default | No | `--grey-medium` #A3A3A3 | none | — | `--text-dark` #313131 |
| Light | Default | Yes | `--pando-blue` #0076DD | none | `--pando-blue` #0076DD | `--text-dark` #313131 |
| Light | Disabled | No | `--grey-medium` #A3A3A3 | `--grey-light` #E7E7E7 | — | `--text-light` #6C6C6C |
| Light | Disabled | Yes | `--grey-medium` #A3A3A3 | none | `--grey-medium` #A3A3A3 | `--text-light` #6C6C6C |
| Dark | Default | No | `--grey-medium` #A3A3A3 | none | — | `--dark-label-text` #D5DAF4 |
| Dark | Default | Yes | `--highlight-blue-light` #9CD2FF | none | #9CD2FF | `--dark-label-text` #D5DAF4 |
| Dark | Disabled | No | `--grey-medium` #A3A3A3 | `--grey-dark` #515151 | — | `--dark-label-text` #D5DAF4 |
| Dark | Disabled | Yes | `--grey-medium` #A3A3A3 | none | `--grey-medium` #A3A3A3 | `--dark-label-text` #D5DAF4 |

Dark theme sits on `--dark-bg` #393945. Classes: `.pds-radio` (+ `.pds-radio--dark`), input `.pds-radio__input` (`:checked`, `:disabled`), text `.pds-radio__label`.

**Added in review — not in Figma**
- **Focus**: `outline: 2px solid var(--pando-blue); outline-offset: 2px` on keyboard focus.
- **Radio group** (`.pds-radio-group`, a `<fieldset>`): group label (`__legend`, `.type-12-semibold` `--text-dark`), helper text (`__helper`, `.type-11-regular` `--text-light`), error (`.pds-radio-group--error` shows `__error`, `.type-11-regular` `--action-red`). Dark group: `.pds-radio-group--dark`.

## Anatomy & spacing
1 Radio · 2 Label. Horizontal, centred, hug width, height 16.
Ring 14 × 14, 1px stroke · dot 7 × 7, 3.5 inset · control ↔ label **10** (`--space-10`) · no padding.
Label `.type-12-regular` (Figma: Open Sans Regular 12, line height Auto ≈ 16; class is 12/17).
Group (added in review): option ↔ option 10 (placeholder, layout is Later) · legend/helper/error 4.

## Behaviour
- The radio button input allows for two states: unselected and selected. The default view of a radio button is having no radio button preselected. Only one radio button should be selected at a time. When a user chooses a new item, the previous choice is automatically deselected. If the user has already selected an item but wants to deselect it, consider adding alternatives such as an “other” or “none” option. *(Figma wording)*
- **Keyboard** *(added in review)*: Tab moves into the group onto the selected option (or the first one if none is selected); ↑/↓ or ←/→ move to and select the next option; Space selects the focused option; Tab leaves the group. Native radios sharing a `name` do this for you.
- The whole label is clickable (the label wraps the input).

## When to use
- **Form** — Can be used in tiles, data tables, modals, side panels, and in forms on full pages.
- **Settings** — Used to change from one setting to another in a menu, page, or component. It can often act as a filtering mechanism.

## Placement & convention
- Always provide a label for a radio button.
- Present the options in a logical order for the best context.

## When not to use
- If a user can select from multiple options, use checkboxes instead of radio buttons. Radio buttons allow the user to select only one item in a set whereas checkboxes allow the user to select multiple items.
- If there are two options showing an on/off setting, consider using Switch.
- For lists with more than ten options, consider using a Select.
- When there are only two or three options with short labels, consider using a Button Select.

## Do / Don’t
Figma has Do and Don’t panels (5416:21987, 5416:21972) but they are empty. None added.

## Accessibility
- Native `<input type="radio">` inside `<label>`; options that belong together share a `name`.
- Groups use `<fieldset>` + `<legend>` (added in review); the error is linked with `aria-describedby` and the group gets `aria-invalid="true"` on the inputs.
- Show Label = false: give the input an `aria-label`.
- Contrast for the accessibility pass: ring #A3A3A3 on white 2.52:1 (below 3:1); selected #0076DD on white 4.53:1; dark disabled fill #515151 on #393945 1.43:1; error text #E25757 on white 3.66:1 (below 4.5:1).

## Open issues
- Dark Selected / Disabled / Disabled-Selected are instances of deleted main components (`Radio/Dark/Initial/No/Yes`, `Radio/Dark/Disabled/No/No`, `Radio/Dark/Disabled/No/Yes`, parent null). Rebuilt here from the values read on the instances.
- Dark Unselected has no `Radio` wrapper frame, unlike the other variants.
- Dark disabled labels are #D5DAF4, same as default — disabled text is not dimmed in dark theme.
- Light disabled label uses `--text-light` #6C6C6C, not `--text-disabled` #A3A2A2. Confirm.
- Disabled-Selected has no #E7E7E7 inner fill, Disabled-Unselected does.
- Light Disabled-Unselected layers are messy (ring drawn twice; `Radio` frame has 1px padding).
- Hidden paths in the Unselected rings carry #D6D6D6 (not a token); not rendered.
- Label line height: Figma Auto (≈16) vs `.type-12-regular` 17.
- Behaviour text says no preselection (Carbon); Fluent preselects when it makes sense. Confirm the V1 rule.
- Example block (5416:22013) and Do/Don’t panels are empty in Figma.
- Spectral sheet (5415:16116): anatomy names Text/Dark-#404040 (actual #313131), line height “undefined%”, shows a Focus state that the set doesn’t have, dark preview on a light background.
- Focus, group label, helper text and error are added in review with no Figma visual; radio rings do not change colour in error (no Figma value).
- Option-to-option gap (10) is a placeholder until group layout is defined.

## Not adopted (review decisions)
.documentation “Variation Examples” instance (3344:3749) — outdated · loose dark background rectangle 194:58 (#393944) — skipped, `--dark-bg` used instead · group layout / size options — Later · target size and ring contrast fix — Later.

## Sources
Carbon Radio button usage — https://carbondesignsystem.com/components/radio-button/usage/
WAI-ARIA APG Radio group — https://www.w3.org/WAI/ARIA/apg/patterns/radio/
Fluent 2 RadioGroup usage — https://fluent2.microsoft.design/components/web/react/core/radiogroup/usage
Ant Design Radio — https://ant.design/components/radio
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
