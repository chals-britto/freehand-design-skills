# Tab Group — Pando DS V1

**Status:** Built 2026-10-28, not yet reviewed · **Figma:** DS V2 – Molecules › ✏️ Tabs (51:0) › `Tab Group` (308:3318) and base `.Tab` (59:254)
**Files:** `tabs.css` (styles + component tokens) · `tabs.js` (`pdsTabs`) · `tabs.html` (live doc)

## What it is
A row of text tabs with an underline on the selected tab. Selecting a tab shows its panel. Figma has no description text for this component. Used by the Search panel (molecules inventory).

## Variants
`Tab Group`: `Theme` (Light | Dark) × `Background` (No | Yes) = 4 variants. Each holds 7 tabs, first one active.

| Group variant | Class | Fill | Bottom rule | Inactive tab underline |
|---|---|---|---|---|
| Light, Background=No | `.pds-tabs` | none | 1.5px `--border-grey` #EFEFEF | #EFEFEF (blends into rule) |
| Light, Background=Yes | `.pds-tabs--bg` | `--accent-off-white` #F8F8F8 | none | #F8F8F8 (invisible) |
| Dark, Background=No | `.pds-tabs--dark` | none | 1.5px `--dark-input-text` #8A8A9E | none (the instances have no line) |
| Dark, Background=Yes | `.pds-tabs--dark.pds-tabs--bg` | `--dark-darker` #24242F | none | #24242F (invisible) |

`.Tab`: `Theme` × `State` = 5 variants (no Dark Disabled).

| Tab state | Attribute | Label + underline (Light) | Dark |
|---|---|---|---|
| Active | `aria-selected="true"` | `--pando-blue-active` #005399 | `--dark-highlight-green` #1FCD93 |
| Inactive | `aria-selected="false"` | label `--text-light` #6C6C6C, underline as table above | label `--dark-input-text` #8A8A9E |
| Disabled | `aria-disabled="true"` | label `--grey-medium` #A3A3A3, underline `--border-grey` #EFEFEF | — not in Figma |

## Anatomy & spacing
- Group: padding 5 / 20 / 0 / 20 · gap 20 between tabs · hugs its tabs (`inline-flex`) · height 30.
- Tab: padding 0 / 1 · label ↔ underline 8 · underline 1.5px, round caps, the label's width + 2 · height 25 in Figma.
- Label: Figma style “12px/Heading-AllCaps” = Open Sans SemiBold 12, auto line-height, 0.3px tracking, uppercase → `.type-12-semibold` + uppercase + `--tabs-tracking` .3px.
- The selected underline sits on the group's bottom rule and covers it.

## Behaviour
- One tab is always selected; the first enabled tab by default.
- Click selects. ←/→ move to the previous/next enabled tab and select it (wraps); Home/End go to the first/last enabled tab. Selection follows focus (automatic activation).
- Disabled tabs are skipped by the arrow keys and ignore clicks.
- The selected tab's panel is shown; the others get `hidden`. Event `pds-tabs-change` (detail `{ index, tab, panel }`).
- No hover state in Figma, so none is drawn (pointer cursor only).

## When (not) to use
Figma has no usage text for this component.

## Accessibility
- `role="tablist"` (give it an `aria-label`), `role="tab"` buttons with `aria-selected` and `aria-controls`, `role="tabpanel"` with `aria-labelledby` and `tabindex="0"`. `tabs.js` fills in missing roles and links.
- One tab stop: roving tabindex, only the selected tab has `tabindex="0"`.
- Disabled tabs use `aria-disabled="true"` (they stay readable by screen readers but cannot be selected).
- Focus ring: `outline: 2px solid var(--pando-blue); outline-offset: 2px` — **added in review, not in Figma**.
- Contrast (deferred): Light inactive #6C6C6C on white 5.25:1, on #F8F8F8 4.94:1. Active #005399 on white 7.79:1. Dark inactive #8A8A9E on #24242F 4.54:1 (just passes), active #1FCD93 on #24242F 7.46:1. Dark, Background=No has no fill — its contrast depends on the dark surface it sits on (Figma shows it on white: 3.38:1 / 2.06:1, fails). Light rule #EFEFEF on white 1.15:1 — the only boundary of the tab row (below 3:1, WCAG 1.4.11). Disabled #A3A3A3 2.52:1 (exempt).

## Open issues
- **Dark, Background=No:** the inactive tab instances have no underline and are 16 high instead of 25, so in Figma their labels sit 4.5px lower than the active one. Built top-aligned like the other three variants; inactive underline left out as in the instances (the `.Tab` main component would draw a #24242F line over the grey rule).
- `.Tab` Dark variants are fixed at 77.3 high (stale sizing); the Tab Group instances hug at 25.
- No Dark Disabled, no hover, no focus state in Figma. Focus added in review.
- Disabled colour is #A3A3A3 (`--grey-medium`, Figma style “Text/#A3A3A3-Disabled”), not `--text-disabled` #A3A2A2.
- Line-height: Figma uses auto (≈16px); `.type-12-semibold` is 12/17, so tabs are 26 high instead of 25 and the group 31 instead of 30. Tracking 0.3px has no type token.
- Underline stroke 1.5px has no token.
- Group hugs its tabs (Figma). Whether the bottom rule should span the full container width in product is not specified.
- Differs from the Atoms **Toggle Tab** (`toggle.*`, `.pds-toggle-tab`): Toggle Tab is a 2-option segmented control (filled blue pill on a grey box, fixed 69px options, `role="radiogroup"`/`radio`, switches a value or view in place). Tab Group is a row of any number of uppercase text tabs with an underline indicator, hug width, light/dark × background variants, a disabled state, and it controls separate panels (`role="tablist"`/`tab`/`tabpanel`).
- The same Figma page also has a separate `Toggle Tab` set (2386:7366, numbered option pills with descriptions) plus `.Individual Tab`, `.Toggle Base`, `.Option` sets — not part of this molecule; not built here.

## Not adopted
`Toggle Tab` set 2386:7366 and its bases `.Individual Tab` (2427:8105), `.Toggle Base` (2533:9614), `.Option` (3247:1197) — a different component on the same page, not in the Batch 1 scope · two loose `Toggle Tab` instances (3246:1120, 2533:9615) · loose groups 2386:7381 / 2386:7384 (step-label examples) · backdrop Rectangle 4426 (2426:8065).

## Industry gaps — not added
- Hover and focus states (Carbon).
- Overflow: horizontal scroll with arrows (Carbon) or an overflow menu (Fluent 2, Ant “more”).
- Icons in tabs / icon-only tabs (Carbon, Fluent 2, Ant).
- Vertical orientation (Fluent 2, Carbon).
- Manual activation for slow panels (Carbon).
- Sizes (Ant), closable/addable tabs and extra actions in the bar (Ant).

## Sources
Figma DS V2 – Molecules — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/?node-id=308-3318
Carbon Tabs usage — https://carbondesignsystem.com/components/tabs/usage/
Fluent 2 TabList usage — https://fluent2.microsoft.design/components/web/react/core/tablist/usage
Ant Design Tabs — https://ant.design/components/tabs
