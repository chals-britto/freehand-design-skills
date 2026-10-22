# Toggle — Pando DS V1

**Status:** Reviewed 2026-10-23 (no review decisions — everything published kept as in Figma) · **Figma:** DS V2 – Atoms › 🟢 Toggle (225:0) › `Toggle` (3218:3840)
**Files:** `toggle.css` (styles + component tokens) · `toggle.js` (`pdsToggle`) · `toggle.html` (live doc)

The published `Toggle` set has one property, `Type = Switch | Toggle Tab | Icon Tab`. These are three different components; they are built here as three blocks on one page: `.pds-toggle` (Switch), `.pds-toggle-tab` (Toggle Tab) and `.pds-icon-tab` (Icon Tab).

## What it is
Toggle is a control that is used to quickly switch between two possible states. For examples, choices that follow a boolean relationship like on/off, true/false, enable/disable, or activate/deactivate. *(Figma wording, typo kept)*

## Variants

### Switch — `.pds-toggle` (base set `.Switch Base` 227:79)
`Theme` (Light, Dark) × `Toggle` (Yes, No) × `State` (Default, Disabled) = 8 variants. Booleans: `Action Text` (default on), `Show Label` (default off).

| Theme · State | Track fill | Track stroke | Knob | Action text |
|---|---|---|---|---|
| Light · On | `--status-green-light` #D5F9D1 @ 40% | `--accent-green-medium` #67AC5D | #67AC5D | `--text-dark` #313131 |
| Light · Off | `--accent-alternate-white` #F9FAFA | `--text-light` #6C6C6C | #6C6C6C | #313131 |
| Light · Disabled On | `--grey-light` #E7E7E7 | `--text-disabled` #A3A2A2 | #67AC5D | `--text-light` #6C6C6C |
| Light · Disabled Off | #E7E7E7 | #A3A2A2 | #6C6C6C | #6C6C6C |
| Dark · On | none | `--dark-highlight-green` #1FCD93 | #1FCD93 | `--dark-label-text` #D5DAF4 |
| Dark · Off | none | `--dark-input-text` #8A8A9E | #8A8A9E | #D5DAF4 |
| Dark · Disabled On / Off | none | `--grey-medium` #A3A3A3 | #A3A3A3 | #A3A3A3 |

Label (when shown): `--text-medium` #545454, 10 SemiBold uppercase.

### Toggle Tab — `.pds-toggle-tab` (base set `.Toggle Tab` 748:468)
`Theme` (Light, Dark) × `State` (Option1-Active, Option2-Active) = 4 variants. Two options only.

| Theme | Container | Border | Active fill | Active text | Inactive text |
|---|---|---|---|---|---|
| Light | `--accent-off-white` #F8F8F8 | `--border-input-light` #E2EAEC | `--pando-blue` #0076DD | `--white` | `--text-dark` #313131 |
| Dark | #484858 @ 50% *(off-token)* | `--dark-input-text` @ 50% | `--status-blue-light` #D9E6FF *(unstyled in Figma)* | #484858 *(off-token)* | `--dark-label-text` #D5DAF4 |

Active option: inner shadow `--pando-dark` #234357 @ 50%, blur 4, offset 0.

### Icon Tab — `.pds-icon-tab` (base set `.Icon Base Toggle` 3218:3158)
`Theme` (Dark only) × `Selected` (1st, 2nd, 3rd) = 3 variants. Three fixed cells: Road, Ship, Air.

| Part | Value |
|---|---|
| Cell stroke | `--dark-input-text` #8A8A9E, 1px, shared between cells |
| Selected cell fill | `--dark-darker` #24242F |
| Unselected cell fill | none |
| Road / Ship / Air icon | `--status-brown-light` #FFEEC4 / `--status-cyan-light` #BDF0F4 / `--status-blue-light` #D9E6FF |

## Anatomy & spacing
- **Switch:** [Label] · track · [action text]. Row 14 high. Track 25 × 12, 1px stroke, radius 8. Knob 8 × 8, 2px from the track edge (left 2 off, left 15 on). Gap track ↔ text 5 (light) / 6 (dark). Label slot: 10px right padding + 5 gap = 15 to the track. Action text `.type-10-regular`, uppercase, 0 tracking. Label `.type-10-semibold`, uppercase, 0 tracking.
- **Toggle Tab:** 139 × 24. Options 69 × 24 fixed, padding 4 / 10, radius 2, gap 1. Container radius 2, 1px inside border. Text `.type-12-regular`.
- **Icon Tab:** 161 × 54. Cells 54 × 54, padding 15, radius 0, overlap −1 so borders are shared. Icon 24.

## Behaviour
- **Switch:** click, Space or Enter flips it. The action text follows the state (Yes / No). The result applies immediately.
- **Toggle Tab / Icon Tab:** one option is always selected. Click selects; arrow keys move and select.
- `toggle.js` fires a bubbling `pds-change` event on each change.

## When to use
A toggle is used to view or switch between enabled or disabled states. The result of changing the toggle state is immediately effective and there's no need for an additional action to apply or save a change. *(Figma)*

## When not to use
- Switches can only be on or off. Indeterminate switches don't exist in accessibility APIs. If you need to show a partial state, use a checkbox instead of a switch. *(Figma)*
- Don't use to present critical information or request required input needed to complete a workflow. *(Figma)*

## Placement & convention
Either a Label text must be placed before a toggle to clarify the action that the toggle performs, or an Action text to describe the binary action of toggle needs to be present, so that the action is clear. Action text must be three words or less and is displayed on the side of a toggle. *(Figma)*

## Do / Don't
From the Figma page (tiles have no captions in Figma):
- Do: a Toggle Tab for “List view | Map view”.
- Do: a settings row “Light” with a Yes switch.
- Don't: a switch to choose between Map view and List view.
- Don't: a switch for “Agree to terms & conditions”.

## Accessibility
- Switch: `<button role="switch" aria-checked>`. Name it with the visible label, or `aria-label` when the label is hidden. The action text is `aria-hidden` (the state is already announced).
- Figma: “If using a switch with an icon, use a hidden text label to identify the switch's purpose to screen readers.” V1 has no switch with an icon.
- Toggle Tab / Icon Tab: `role="radiogroup"` with `role="radio"` options; roving tabindex. Icon Tab cells need `aria-label` (Road / Ship / Air).
- Focus: no focus visual in Figma; the browser default ring is left in place.
- Contrast (deferred): Light ON stroke #67AC5D vs white 2.75:1 and knob vs track 2.61:1 (below 3:1, WCAG 1.4.11). Toggle Tab active blue vs container 4.27:1; container border #E2EAEC vs white 1.22:1.

## Open issues
- The published `Toggle` set holds three unrelated components (Switch, Toggle Tab, Icon Tab). They should probably be separate components — Toggle Tab and Icon Tab are segmented controls.
- The wrapper set exposes only `Type`; Theme / State / On-Off / Label live on hidden base sets.
- OFF ignores `--color-toggle-off` (#CBD4D8); it uses #F9FAFA + #6C6C6C.
- ON track #D5F9D1 @ 40% is an opacity style not in tokens (built with `color-mix`).
- Light disabled ON keeps the full green knob; disabled text uses #6C6C6C, not `--text-disabled`.
- Dark gap is 6px, light 5px. Dark knob carries an invisible 0.825px same-colour stroke (not built). Dark disabled ON and OFF use identical colours.
- Hover, focus and pressed states are not drawn, although the Figma Behaviour text promises a hover look and a blue focus ring: “The keyboard focus state takes the switch's visual hover state and adds a blue ring to the switch in focus.”
- Action text characters are stored inconsistently (“YES”, “Yes”, “No”); uppercase hides it.
- Type: action text and label use auto line-height (~14) and 0 tracking; tokens are 10/12 + 0.5px. Tab text is auto (~16); token is 12/17.
- Toggle Tab: two options only, fixed 69px width, no hug-width or 3-option version. Inner shadow is not a `--shadow-*` token. Dark: #484858, its 50% style and the unstyled #D9E6FF are not tokens.
- Icon Tab: dark only, no light version; icons are hard-wired to transport modes (Road / Ship / Air); no visible labels.
- Docs with template filler / placeholder (not used as guidance):
  - Overview first paragraph: “Toggle/ Switch is a clear and concise label that provides a general introduction or summary of the toggle's purpose…” — describes the heading, not the component.
  - When not to use first sentence: “This label effectively conveys the situations in which the toggle should be avoided…” — filler.
  - When to use paragraph is duplicated.
  - Overview typo “For examples”.
  - Older `.documentation` block (3195:1953) still titled with the placeholder “Name”, duplicates the newer section, empty “Variation Examples”.
- Do/Don't tiles have no captions; example pins 1 and 2 have no notes.
- Switch spec frame has no anatomy panel (Toggle Tab and Icon Tab have one).
- Hidden leftover `Navigation/Selected` instance inside Light / Yes / Disabled (8323:2124).

## Industry gaps — not added
- Hover, focus and pressed states — Carbon Toggle usage.
- Read-only, loading and skeleton states — Carbon Toggle, Ant Design Switch.
- Only one tiny size (25 × 12; row 47 × 14); target size below 24 × 24 — WCAG 2.5.8; Carbon / Ant offer two sizes.
- ON state below 3:1 non-text contrast — WCAG 1.4.11.

## Not adopted
Loose “Toggle” role-pill frame (3218:3118) · loose “Split button” / “Frame 2161” Bree Serif pills (3218:3136) · stray `.Toggle Tab` instance (5380:1395), detached “Inactive” frame (5380:1393), eight loose Switch instances (5454:1936…2002), backdrop rectangle 225:52 · older `.documentation` block (3195:1953) · Spectral spec frames (5380:1909, 5409:8378, 5409:8986) used as reference only.

## Sources
Carbon Toggle usage — https://carbondesignsystem.com/components/toggle/usage/
Ant Design Switch — https://ant.design/components/switch
Fluent 2 Switch usage — https://fluent2.microsoft.design/components/web/react/core/switch/usage
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
WCAG 2.2 4.1.2 — https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
