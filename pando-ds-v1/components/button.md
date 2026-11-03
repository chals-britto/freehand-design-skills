# Button — Pando DS V1

**Status:** Reviewed 2026-10-23 · **Figma:** DS V2 – Atoms › Buttons (page 11:12) › `Button` (3054:1314), `AI Copilot Button` (5913:6603), `Show more` (10888:1735)
**Files:** `button.css` (styles + component tokens) · `button.js` (`pdsButton.setLoading`, `pdsButton.check`) · `button.html` (live doc)

## What it is
Buttons are clickable elements that are used to trigger actions. Button labels express what action will occur when the user interacts with it. *(Figma wording, .documentation block)*

## Variants
`Button` set: Theme (Light, Dark) × Type × Variant × Size (Normal, Small) × State. Only the combinations that exist in Figma are built. Theme = Studio is excluded (outdated in review).

### Text Button — Primary / Secondary
| | Fill | Label | Border |
|---|---|---|---|
| Primary Default | `--pando-blue` #0076DD | `--white` | — |
| Secondary Default | `--pando-light` #EEF2F4 | `--pando-blue` | — |
| Hover (both) | `--white` | `--pando-blue` | 1px `--pando-blue` (inside) |
| Loading (both) | as Hover + spinner | | |
| Disabled (both) | `--grey-light` #E7E7E7 | `--text-medium` #545454 | — |
| Secondary Red | #EEF2F4 | `--action-red` #E25757 | — |
| Secondary Green (Normal only) | as Default + 8px `--dark-highlight-green` #1FCD93 dot, 1px white ring, top-right corner (−3px) | | |
| Dark Primary Default | #0076DD | white | — |
| Dark Primary Hover / Loading | none | white | 1px `--highlight-blue-light` #9CD2FF |
| Dark Secondary Default | `--dark-bg` #393945 | white | — |
| Dark Secondary Hover | `--dark-darker` #24242F | white | 1px #393945 |
| Dark Disabled (both) | #393945 | `--grey-medium` #A3A3A3 | — |
| Dark Secondary Red (Small) | #393945 | #E25757 | — |

States that exist: Light Primary N: Default, Hover, Loading, Disabled · Light Primary S: Default, Hover, Disabled · Light Secondary N: Default, Hover, Loading, Disabled, Red, Green · Light Secondary S: Default, Hover, Loading, Disabled, Red · Dark Primary N: Default, Hover, Disabled · Dark Primary S: Default, Hover, Loading, Disabled · Dark Secondary N: Default, Hover, Disabled · Dark Secondary S: Default, Hover, Disabled, Red.

### Text Button — Text Only
Light: `--pando-blue` label · Hover fill `--accent-light-highlight` #E9F1F5 + label `--pando-dark` #234357 · Disabled `--grey-medium`. Dark: white · Disabled #A3A3A3 · Small Red `--accent-red-medium` #D26568. No padding, no radius.

### Action Button (Normal only)
Transparent, 10px icon + label. Light: `--action-blue` #376F99 · Red `--action-red` · Green `--action-green` #91C38A · Disabled `--grey-medium` · Hover = Active: fill #E9F1F5, radius 4. Dark: white · Hover fill `--dark-input-text` #8A8A9E.

### Icon Button
| | Circle | Icon |
|---|---|---|
| Circular Default | `--pando-light` + `--shadow-1` | `--pando-dark` (Add) |
| Circular Hover | same | `--action-blue` |
| Circular Disabled | `--grey-light` | #9C9C9C (off-token) |
| No Background Default | none | `--pando-dark` (Delete) |
| No Background Hover | `--white` circle | `--pando-dark` |
| No Background Disabled | none | `--grey-medium` |
Sizes: Normal 30 (icon 20) · Small 20 (icon 14).

### Text Button — Circular Background (pill, Small only)
Default `--white` / `--pando-dark` · Hover #E9F1F5 · Disabled #E7E7E7 / #9C9C9C (off-token) · Figma "Loading" = `--status-brown-light` #FFEEC4 / `--text-dark`, padding 3/10, no indicator (class `.is-selected` / `aria-pressed="true"`, see Open issues).

### Button Dropdown (Secondary) and Split
Dropdown: #EEF2F4 / #0076DD + 10×8 caret. Normal: Default, Loading, Active. Small: Default, Loading, Active. Dark Small: Default (caret #8A8A9E), Active (caret white).
Split: label segment + 30px caret segment (26px Small), 2px apart on a white frame, radius 4 outside corners. Active: caret segment `--pando-blue`, caret white.

### Dual Icon
`-` (Small, Default): Cancel 24×24 `--grey-light` + `--grey-dark` × above Confirm 24×24 `--pando-blue` + white ✓, 2px gap, pad 6, icon 12.
Circular Background: 51×24 pill, `--border-input-light` #E2EAEC, radius 20, two `--pando-dark` right carets. Normal/Default and Small/Active are identical.

### AI Copilot Button
| | Fill | Label "Ask freehand" | Border |
|---|---|---|---|
| Light Default | `--accent-light-blue-bg` #F3F6FC | gradient #E03A8A → #FE6505 | — |
| Light Hover | same | same | 1px gradient #FF8C54 → #8D00DF |
| Dark Default | gradient #FF4DA6 → #FE6505 | white | — |
| Dark Hover | none | white | 1px gradient #FF4DA6 → #FE6505 |
Freehand logo 20px (gradient on Light, white on Dark). All gradients off-token.

### Show more / Show less
Text Only Small label (#0078DD off-token override) + 14px arrow (`--border-blue-grey`). Hover: label fill #E9F1F5 / #234357, arrow #234357, divider lines (`--border-grey` at 40%) appear either side.

### Added in review — not in Figma
- **Focus**: `outline: 2px solid var(--pando-blue); outline-offset: 2px` on `:focus-visible`, every type.
- **Loading**: vector spinner (16px Normal, 14px Small, 16px on Dropdown) in the label colour, 25% track; the button is disabled while loading (`aria-busy` + `aria-disabled`, clicks ignored). `pdsButton.setLoading()`.
- **Danger tone** `.pds-button--danger`: carries Figma's Red treatment as a tone that combines with states. Secondary (#EEF2F4 / #E25757; Hover adds a red 1px border), Text Only (Light #E25757, Dark #D26568), Action (#E25757). Disabled overrides the tone. No Primary danger (no Figma visual).
- **Icon-only name rule**: every icon-only button needs `aria-label` and a tooltip with the same words. `pdsButton.check()` warns when the name is missing.

## Anatomy & spacing
| | Height | Padding | Gap | Radius | Label |
|---|---|---|---|---|---|
| Text Normal | 30 | 6 / 10 / 8 / 10 | 10 | 4 | Button/Normal-Bold 12 Bold, UPPER, 16px LH |
| Text Small | 24 | 5 / 10 | 10 | 4 | Button/Small-Bold 10/14 Bold, UPPER = `.type-10-bold` |
| Loading Normal | 30 | 6 / 10 / 8 / 10 | 4 (spinner ↔ label) | 4 | spinner 16 |
| Loading Small | 24 | 5 / 10 | 10 | 4 | spinner 14 |
| Text Only | 16 / 14 | 0 | — | 0 | as Text |
| Action | 22 | 3 / 5 | 4 | 0 (4 on Hover/Active) | Button/Action-Semibold 12 SemiBold, UPPER |
| Icon Circular | 30 / 20 | — | — | circle | icon 20 / 14 |
| Pill | 20 | 3 / 9 (3 / 10 Loading) | — | 24 | Small-Bold |
| Dropdown | 30 / 24 | 7 / 10 · 5 / 10 (Loading Small 4 / 10) | 10 | 4 | caret 10×8 |
| Split | 30 / 24 | label 7/10 · 5/10, caret 30 / 26 wide | 2 | 4 outer | |
| Dual `-` | 24×24 each | 6 | 2 | 0 | icon 12 |
| AI Copilot | 30 | 5 / 8 / 5 / 6 (Dark 5 / 6) | 8 | 4 | 14 SemiBold = `.type-14-semibold`, sentence case |
| Show more | 14 | — | 5 | — | arrow 14 |
Labels have 0 tracking (not `.caps`, which adds 0.5px). Strokes are inside the box (drawn as inset shadow), so hover does not change size.

## Behaviour
- Hover / Disabled / Active come from the element state (`:hover`, `disabled`, `aria-expanded`, `aria-pressed`); `.is-hover`, `.is-active`, `.is-focus` exist to show a state statically.
- Loading: `pdsButton.setLoading(btn, true)` → spinner + `aria-busy="true"` + `aria-disabled="true"`, clicks ignored; `false` restores it. The button keeps focus.
- Split: the caret segment opens the menu and is Active while it is open (`aria-expanded="true"`). The menu itself belongs to the Dropdown component.
- Labels stay on one line; the button grows with the text (Figma hug).

## When (not) to use
*(Figma wording, .documentation block and "Button" doc frame)*
- **Primary** — for the principal call to action on the page. Primary buttons should only appear once per screen (not including the application header, modal dialog, or side panel).
- **Secondary** — for secondary actions on each page. Secondary buttons can only be used in conjunction with a primary button.
- **Text Only** — as part of a pair, performs the negative action of the set, such as Cancel or Back.
- **Icon button** — the icon provides a visual clue and fits more buttons in a small space. Icon-only buttons need a tooltip to say what they do.
- **Button Dropdown** — a text label with a dropdown icon, for a button that opens more options.
- **Dual icon** — two icons in one compact element.
- **Action button** — text that prompts an immediate action.
- **Placement & convention** — buttons on Pando are generally placed to the right of the screen and should be immediately visible without scrolling.
- **Danger tone** (added in review) — for destructive actions (delete, remove). Not on icon-only buttons. *(Carbon)*

## Do / Don’t
*(Figma "Button" doc frame)*
- Do: emphasise the primary action. If there is no primary action, a default button is the safest choice.
- Don’t: put more than 1 primary button in the same group.
- Don’t: put 2 icons in the same button; use one icon to perform and explain the action. *(conflicts with Dual Icon — see Open issues)*
- Do: give every icon-only button a name and tooltip. *(added in review — Carbon, WCAG 4.1.2)*

## Accessibility
- Use `<button type="button">`. Enter and Space activate it.
- Focus ring added in review (2px `--pando-blue`, offset 2).
- Icon-only buttons (Icon, Dual Icon, Split caret): `aria-label` required; tooltip with the same text. Icons are `aria-hidden`.
- Loading: `aria-busy="true"` + `aria-disabled="true"`, not `disabled`, so focus is kept.
- Split caret: `aria-haspopup="menu"` + `aria-expanded`.
- Contrast for the accessibility pass (kept as Figma): white on #0076DD 4.53:1 · #0076DD on #EEF2F4 4.02:1 · #E25757 on #EEF2F4 3.25:1 · #E25757 on #393945 3.11:1 · Action Green #91C38A on white 2.02:1 · Action Red on white 3.66:1 · white on #8A8A9E 3.38:1 · Show more #0078DD on white 4.44:1 · Dark Text Only Red #D26568 on #24242F 4.24:1.
- Target size: Small icon 20×20, Text Only 14–16px, Action 22px are under 24px (WCAG 2.5.8) — Later.

## Open issues
- Hover and Loading look the same; Loading only adds the spinner. Hover inverts rather than darkening (`--pando-blue-active` unused).
- Secondary Hover = Primary Hover, so the two lose their difference on hover.
- Normal vertical padding is uneven (6 top / 8 bottom).
- Secondary **Green** is not a colour tone: it is the Default button plus a #1FCD93 notification dot (review card said "no green anywhere"). Purpose unclear.
- Red / Green are modelled as States in Figma; built here as tone modifiers. Danger hover/disabled combinations are added in review.
- Text Only hover fill hugs the text (0 padding). Dark Text Only has no Hover.
- Action Button Hover and Active are identical; radius 0 at Default, 4 at Hover.
- Icon Button disabled #9C9C9C and pill disabled #9C9C9C are not in tokens.css. Shadow style says 0-1-3 but is 0 2 3 (`--shadow-1`). All circular states carry the shadow (Normal Default has it twice). No Background Hover's white circle is invisible on white.
- Pill "Loading" is a brown-light fill with no indicator — reads as a selected chip. Built as `.is-selected`; needs a name decision.
- Dropdown: no Hover or Disabled. Active variants bake an open menu into the button (not built here). Small Loading spinner is 16px, others 14px. Split Small toggle is 26 wide (Default) vs 24 (Active).
- Dual Icon Circular: Normal/Default and Small/Active are the same frame; padding 10 inside a 24px frame. "Don't put 2 icons in the same button" conflicts with Dual Icon.
- AI Copilot gradients and the 14px SemiBold label are not V1 tokens/styles; hidden "AI-Powered Suggestions" layer in Hover. Dark Hover has no fill (shown on `--dark-bg`).
- Show more label #0078DD is off-token; "Show more" vs "Show Less" casing; `.arrow-right` set has placeholder state names "State3"/"State4".
- Dark coverage is uneven: no Dark Normal Loading, no Dark Normal Red.
- Line height: Normal labels use 16px (Figma auto); `.type-12-bold` is 14px. Action uses 16px; `.type-12-semibold` is 17px.
- Placement wording in Figma is missing a word ("right of the screen should be").

## Not adopted (review decisions)
Theme = Studio — outdated · Template 1 / Template 2 dev-spec frames — outdated (Carbon copy) · State-property restructure card — skipped · Draft Workspace, stray frames and instances — skipped · Open menu inside Dropdown Active variants — moves to the Dropdown component · AI Copilot "Pi" standalone components (loose, outside the set) — not built · More sizes, target-size fixes, disabled-reason tooltip pattern — Later.

## Sources
Carbon Button usage — https://carbondesignsystem.com/components/button/usage/
Ant Design Button — https://ant.design/components/button
Fluent 2 Button usage — https://fluent2.microsoft.design/components/web/react/core/button/usage
WCAG 2.2 2.4.7 — https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 4.1.2 — https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
WCAG 2.2 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
