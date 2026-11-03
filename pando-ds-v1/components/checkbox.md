# Checkbox — Pando DS V1

**Status:** Reviewed 2026-10-23 · **Figma:** DS V2 – Atoms › Checkbox (page 3267:3636) › `Checkbox` (3331:3626)
**Files:** `checkbox.css` (styles + component tokens) · `checkbox.js` (`pdsCheckbox.init`, indeterminate + parent sync) · `checkbox.html` (live doc)

## What it is
Checkboxes allow multiple selections from a set of options. *(Figma wording)*

## Variants
`Theme` (Light | Dark) × `State` (Default | Disabled | Focus | Error) × `Selection` (Unselected | Selected | Indeterminate) = **18 published variants** (Indeterminate exists only for State=Default). `Show Label` boolean, default **false**.

| State · Selection | Light | Dark |
|---|---|---|
| Default · Unselected | stroke `--grey-medium` #A3A3A3 | stroke `--dark-input-text` #8A8A9E |
| Default · Selected | fill `--pando-blue` #0076DD, check `--white` | fill `--highlight-blue-light` #9CD2FF, check `--pando-dark` #234357 |
| Default · Indeterminate | fill `--pando-blue`, dash 8×1.8 **cut out** (shows surface) | fill #66B9FF *(off-token)*, dash 8×2 `--white` |
| Focus · Unselected | stroke `--pando-blue` | stroke `--highlight-blue-light` |
| Focus · Selected | fill `--pando-blue` + stroke `--pando-blue-active` #005399; label `--pando-blue` | fill #9CD2FF + stroke `--dark-label-text` #D5DAF4 |
| Error · Unselected | stroke `--action-red` #E25757 | stroke `--accent-red-medium` #D26568 |
| Error · Selected | fill `--action-red`, check white | fill `--accent-red-medium`, check white |
| Disabled · Unselected | fill #D9D9D9 *(off-token)*; label `--text-medium` | fill `--grey-dark` #515151; label `--dark-input-text` |
| Disabled · Selected | fill #9C9C9C *(off-token)*, check `--grey-light`; label #9C9C9C *(off-token)* | fill `--grey-dark`, check `--dark-input-text`; label `--dark-input-text` |

Label: `--text-dark` (light), `--dark-label-text` (dark) unless listed above.
Classes: `.pds-checkbox` · `--dark` (Theme=Dark) · `--error` · `--focus` (static focus specimen; live focus uses `:focus-visible`) · Disabled = `disabled` on the input · Selected = `checked` · Indeterminate = `data-indeterminate` (set by `checkbox.js`).

## Anatomy & spacing
Box 14×14 · radius 2 · stroke 1 inside · check 10×8 at (2,3) · dash 8×2 at (3,6) · box↔label gap **10** (Dark Selected / Focus+Selected / Error+Selected: **11**, kept as Figma) · label `.type-12-regular` (Figma line-height Auto, 16px box).

## Behaviour
- Native checkbox: click the box or the label; Space toggles.
- Nested: if a group contains a mix of checked and unchecked children, the parent shows an indeterminate state. *(Figma wording)* Checking the parent checks all children. `checkbox.js` keeps the parent in sync (`data-pds-parent="<children-container-id>"`).
- **Focus ring** — added in review, not in Figma: 2px `--pando-blue` outline, 2px offset, on keyboard focus, in addition to Figma's stroke swap.
- **Checkbox group** — added in review, not in Figma: `<fieldset class="pds-checkbox-group">` + `<legend class="pds-checkbox-group__label">` (`.type-12-semibold`), items stacked 10px apart, nested children indented 24px.
- **Error text** — added in review, not in Figma: one line under the group, `.pds-checkbox-group__error`, `--action-red`, `.type-11-regular`.

## When (not) to use
- Checkboxes are used for multiple choices, not for mutually exclusive choices. Each checkbox works independently from other checkboxes in the list, therefore checking an additional box does not affect any other selections. *(Figma)*
- Checkboxes can be used alone, grouped, or nested. *(Figma)*

## Accessibility
- `<input type="checkbox">` inside `<label>`; with Show Label off, set `aria-label`. Indeterminate is announced as “mixed”.
- Groups: `<fieldset>` + `<legend>`; error text linked with `aria-describedby`, inputs get `aria-invalid="true"`.
- For the accessibility pass: light unselected stroke 2.52:1 · published focus on selected 1.72:1 (light) / 1.16:1 (dark) · white dash on #66B9FF 2.11:1 · box 14×14 < 24×24 target (2.5.8) · added focus ring `--pando-blue` on the dark surface is low contrast.

## Open issues
- Dark / Disabled / Selected has a stray second check vector (#234357) beside the box (variant 34px wide). Not reproduced.
- No Disabled / Focus / Error indeterminate (6 combinations).
- Light disabled greys #D9D9D9 / #9C9C9C are hardcoded; dark indeterminate #66B9FF is off-token and differs from the Selected fill.
- Light indeterminate dash is a cut-out — on non-white surfaces it takes the surface colour.
- Light Focus+Selected label turns blue; no other state changes the label.
- Gap 11 vs 10 on dark selected variants.
- Label line-height Auto vs 17px of `.type-12-regular`.
- Figma's dark backdrop is #393944 (one step off `--dark-bg`); “Variation Examples” doc panel is empty.

## Not adopted
- Stray Checkbox instance (5522:21238) — skipped.
- Copied Button doc frame (5506:17237) — skipped.
- Draft doc frame “Desktop - 1” (5506:17380) — outdated, including its Behaviour line.
- Industry gaps not added: when-not-to-use line, 24px hit area, read-only / warning states, hover state, extra indeterminate variants.

## Sources
Carbon Checkbox usage — https://carbondesignsystem.com/components/checkbox/usage/
Fluent 2 Checkbox usage — https://fluent2.microsoft.design/components/web/react/core/checkbox/usage
Ant Design Checkbox — https://ant.design/components/checkbox
WCAG 2.2 2.4.7 — https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
WCAG 2.2 4.1.2 — https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
