# Toggle Tab — Pando DS V1

**Status:** Built 2026-10-28, not yet reviewed (no review file — everything published kept) · **Figma:** DS V2 – Molecules › ✏️ Tabs (51:0) › `Toggle Tab` (2386:7366), bases `.Individual Tab` (2427:8105), `.Toggle Base` (2533:9614), `.Option` (3247:1197)
**Files:** `toggle-tab.css` (styles + component tokens) · `toggle-tab.js` (`pdsToggleTab`) · `toggle-tab.html` (live doc) · uses `icons.css` + `icons/`

Class prefix is `.pds-toggle-tabs` (tokens `--toggle-tabs-*`) because the Atoms kit already owns `.pds-toggle-tab` / `--toggle-tab-*` in `toggle.css`.

## What it is
A segmented single-selection control: two to four options, one always selected. Figma has no description text for this set. Used by Subheader and Sort-1 (molecules inventory).

## Variants
`Toggle Tab`: `Theme` (Light | Dark) × `Type` × `Selection` (Option 1 | 2 | 3) = 13 published variants. Booleans `Tab 3` (default on) and `Tab 4` (default off) apply to the Description type.

| Type | Class | Selections | Theme | Option base |
|---|---|---|---|---|
| Dual Icon | `.pds-toggle-tabs--icon` (2 options) | 1, 2 | Light | `.Toggle Base` |
| 3 Option Icon | `.pds-toggle-tabs--icon` (3 options) | 1, 2, 3 | Light | `.Toggle Base` |
| Single Selection with Description | `.pds-toggle-tabs--steps` | 1, 2, 3 | Light | `.Individual Tab` |
| Single Selection | `.pds-toggle-tabs--pills` | 1 only | Light | `.Option` Light |
| Toggle Tab | `.pds-toggle-tabs--segment` (+ `--dark`) | 1, 2 | Light, Dark | frames (Light) / `.Option` Dark |

| Part | Value | Token |
|---|---|---|
| Icon type · group | fill #FFFFFF, gap 1, radius 2 | `--white` |
| Icon type · option | 44 × 50, padding 15 / 12, radius 2, icon 20 | `--space-15`, `--space-12`, `--space-2` |
| Icon type · active | fill #E2EAEC | `--border-input-light` |
| Description | Open Sans SemiBold 12, #2A4255 | `.type-12-semibold`, `--toggle-tabs-desc-fg` *(off-token)* |
| Step · inactive (`.Individual Tab` Icon/Text · Inactive) | 24 × 24 circle, padding 5, #FFFFFF, shadow 0 2 3 #000 10%; icon `Indicator Icon/Details` 14 or a number, #234357, Bold 10/14 uppercase | `--shadow-1`, `--pando-dark`, `.type-10-bold` |
| Step · active (`.Individual Tab` Text · Active) | pill radius 14, padding 5 / 10, #0078DD, label Bold 10/14 uppercase white | `--toggle-tabs-blue` *(off-token)* |
| Single Selection · inactive (`.Option` Light Inactive) | padding 4 / 10, radius 12, 1px inside #B5C3CB, Regular 12 #313131 | `--border-blue-grey`, `--text-dark` |
| Single Selection · active (`.Option` Light Active) | #0078DD, SemiBold 12 white, no shadow | `--toggle-tabs-blue` |
| Toggle Tab · group Light | #F8F8F8, 1px outside #E2EAEC, radius 12, gap 1 | `--accent-off-white`, `--border-input-light`, `--radius-12` |
| Toggle Tab · group Dark | #484858 @ 30%, 1px outside #8A8A9E @ 10% | `--toggle-tabs-dark-seg-bg` *(off-token)*, `--dark-input-text` |
| Toggle Tab · active | #0076DD, radius 12, inner shadow #234357 @ 50% blur 4, Regular 12 white | `--pando-blue`, `--toggle-tabs-seg-shadow` |
| Toggle Tab · inactive | radius 2, Regular 12 — Light #313131, Dark #FFFFFF | `--text-dark`, `--white` |
| `.Option` Show Icon | `Indicator Icon/Details` 14 before the label, gap 10 (Dark variants only, hidden by default) | `.pds-toggle-tabs__icon` |

Base sets rendered on the page: `.Toggle Base` 2 (Active Tab / Inactive Tab), `.Individual Tab` 3 (Icon·Inactive, Text·Inactive, Text·Active), `.Option` 4 (Light/Dark × Active/Inactive) + Dark Active with Show Icon.

## Anatomy & spacing
- Icon type: options 44 × 50 (20 icon + 15/12 padding), 1px gap, whole group 89 × 50 (2) or 134 × 50 (3).
- Description type: description · 15 · options (gap 10). Inactive steps are 24 circles; the selected step grows into a text pill (68 × 24 for “Option 1”).
- Single Selection: hug-width pills, gap 15, height 24.
- Toggle Tab: two hug-width options (69 × 24), gap 1, group 139 × 24.
- Labels 12px use Figma auto line-height (≈16); the component token `--toggle-tabs-lh: 16px` keeps the 24px height (`.type-12-*` is 17).
- px values used: 1 (gaps, borders), 2 (`--space-2` radius), 4 (pill padding), 5 (step padding), 10, 12, 14 (step radius, mark size), 15, 16 (line-height), 24 (step size), radius 12 (`--radius-12`).

## Behaviour
- One option is always selected.
- Click selects. ←/↑ previous, →/↓ next (wraps), Home / End first / last. Selection follows focus.
- Description type: only the selected step shows its label; the others show their icon or number.
- `toggle-tab.js` fires a bubbling `pds-change` on the radiogroup, detail `{ index, value }`. `pdsToggleTab.select(group, i)` selects from code; `pdsToggleTab.init(root)` wires markup added later.
- No hover, pressed or disabled state in Figma, so none is drawn.

## When (not) to use
Figma has no usage text for this set.

## Accessibility
- `role="radiogroup"` with `aria-label`, or `aria-labelledby` pointing at the description; options are `role="radio"` buttons with `aria-checked`.
- One tab stop: roving tabindex, only the selected option has `tabindex="0"`.
- Icon-only options need `aria-label` (samples: Payments, Rules). Steps keep their label in the DOM, visually hidden until selected, so every step is named.
- Focus ring: `outline: 2px solid var(--pando-blue); outline-offset: 2px` — **added in review, not in Figma**.
- Contrast (deferred): white on #0076DD 4.53:1, on #0078DD 4.44:1 (below 4.5). Icon type active fill #E2EAEC vs white 1.22:1 — the selected icon tab is barely distinguishable. Single Selection inactive border #B5C3CB 1.81:1 and Toggle Tab light border #E2EAEC 1.22:1 (WCAG 1.4.11 asks 3:1). Inactive steps rely on a 10% shadow only. Dark Toggle Tab drawn on white in Figma: white labels on #484858 @ 30% over white 1.67:1 (fails); on `--dark-bg` 10.5:1.

## Open issues
- **Relation to the Atoms Toggle Tab** (`toggle.*`, `.pds-toggle-tab`, base set `.Toggle Tab` 748:468): same pattern as this set's Type = Toggle Tab, but the atom has radius 2, a 1px *inside* border, fixed 69px options, dark = #484858 @ 50% with a #D9E6FF active option and #D5DAF4 labels. This set has pill radius 12 (inactive option radius 2), a 1px *outside* border, hug-width options, dark = #484858 @ 30% with the same blue active option as light and white labels. Two published sources disagree; one should be retired. The atom's Icon Tab (Road/Ship/Air, dark only) is also a segmented control but a different look from this set's light icon types.
- **Relation to Tab Group** (`tabs.*`): different pattern — tablist with underline indicator controlling panels. Tab Group's Open issues already point here. Neither file was changed.
- Naming collision: built as `.pds-toggle-tabs` / `--toggle-tabs-*` / `pdsToggleTab` to avoid overriding the atom.
- Two blues: #0078DD (“Highlight/Blue-Dark”, not in tokens.css) for Single Selection and steps; `--pando-blue` #0076DD for Toggle Tab.
- Off-token: #0078DD, description #2A4255 (unstyled), dark container #484858 @ 30% (unstyled).
- Single Selection has only Selection = Option 1 in the set; Toggle Tab only 2 options; Dark only for Toggle Tab; no Dark for the other four types.
- Single Selection active is SemiBold, inactive Regular → widths 70 vs 69 (1px shift on selection). Toggle Tab active stays Regular.
- Icon: the set uses a remote `Menu/Payments` (2427:9604) not found under that name in the kit manifest; built with the kit's `Menu/India Payments` (same ₹ notes drawing, 21 viewBox). `.Toggle Base` exposes an icon swap.
- `.Option` Show Icon exists only on Dark variants; its colour inside the blue option is not specified — shown in the icon's drawn colour #234357.
- `.Individual Tab` has no Icon · Active variant; a selected step always becomes the text pill. Text · Inactive uses a number (“2”).
- Line-height: Figma auto (≈16) vs tokens 17 → component token.
- Missing states: hover, focus, pressed, disabled. Focus added in review.
- Figma's `Toggle Tab` frame inside the icon types carries a hidden #E2EAEC stroke (not built).

## Industry gaps — not added
- Hover, focus and disabled states (group and single option) — Carbon Content switcher, Ant Segmented.
- Sizes (Carbon 32/40/48, Ant 24/32/40) and full-width block mode — Carbon, Ant.
- Equal-width text options sized to the longest label; square icon options — Carbon.
- Tooltips on icon-only options; vertical orientation — Ant Segmented.
- Manual activation (arrow moves focus, Enter selects) — Carbon.

## Not adopted
Loose `Toggle Tab` instances 3246:1120 and 2533:9615 (Dual Icon samples) · loose groups 2386:7381 (“01 Optimization and Planning / 02 Master Data Upload”) and 2386:7384 (“Delivery Picklist / Optima Rules / Edit Planned Output”) — usage sketches, no component · backdrop rectangle 2426:8065 · `Tab Group` and `.Tab` on the same page are built as Tab Group (`tabs.*`).

## Sources
Figma DS V2 – Molecules — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/?node-id=2386-7366
Carbon Content switcher usage — https://carbondesignsystem.com/components/content-switcher/usage/
Ant Design Segmented — https://ant.design/components/segmented
