# AI Side Bar — Pando DS V1

**Status:** Built 2026-10-28, not reviewed (every published variant kept) · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163) › section "Freehand - ai - component" › `Side Bar` (4514:11173), `.Menu-Item` (4514:11048)
**Files:** `ai-sidebar.css` (styles + component tokens) · `ai-sidebar.js` (`pdsAiSidebar`) · `ai-sidebar.html` (live doc)
**Reuses:** `button.css` (Action Button, with instance overrides) · `tooltip.css/js` (Style=Text, no title) · `icons.css` + `icons/icons-data.js` (nav-grid-view, nav-search-10, action-add, action-more-actions)

## What it is
The chat-history side bar of the AI assistant: header with the Freehand AI mark, assistant name and a Grid View toggle; New Chat and Search; "Starred" and "Recent" chats. It collapses to a 50px rail. Figma has no written description; this is drawn from the component.

## Variants
`Side Bar`: `Type` (Open, Closed) × `State` (Default, Hover) = 4.

| Variant | Class | Width | Fill | What changes |
|---|---|---|---|---|
| Open · Default | `.pds-ai-sidebar` | 270 | white + #FFEFE5 @ 22% | everything shown |
| Open · Hover | `:hover` on the toggle | 270 | same | kit Tooltip "Close Sidebar", Beak=1:00, under the Grid View icon |
| Closed · Default | `.pds-ai-sidebar--closed` | 50 | white + #FFEFE5 @ 32% | AI mark only in the header; icon-only New Chat / Search; groups hidden |
| Closed · Hover | header `:hover` / `:focus-within` / `.is-hover` | 50 | same | AI mark swapped for Navigation/Grid View; Tooltip "Open Sidebar", Beak=11:00 |

`.Menu-Item` (AI): `Property 1` = 3.

| State | Class / attribute | Fill | Text | ⋯ More Actions |
|---|---|---|---|---|
| Default | `.pds-ai-sidebar__item` | none | 12/16 Regular #545454 `--text-medium` (12px/Body) | hidden |
| Hover | `:hover` / `:focus-within` / `.is-hover` | #E7E7E7 @ 30% (`--grey-light`, style Opacity/E7E7E7-Light-30) | same | 10px #545454 |
| Active | link `[aria-current]` / `.is-active` | #FFF4E5 `--status-orange-light` | 12 SemiBold #422500 `--status-brown-dark` (12px/Heading) | shown |

| Token | Value | Maps to |
|---|---|---|
| `--ai-sidebar-tint` | #FFEFE5 (22% open / 32% closed) | off-token in Figma |
| `--ai-sidebar-border` | #EFEFEF, right edge 1px inside | `--border-grey` |
| `--ai-sidebar-header-border` | #FFF4E5, header bottom 1px inside | `--status-orange-light` |
| `--ai-sidebar-title-fg` | #1E1815 | off-token in Figma |
| `--ai-sidebar-logo-fg` | #FE6505 | `--freehand-orange` |
| `--ai-sidebar-toggle-fg` | #A3A3A3 | `--grey-medium` |
| `--ai-sidebar-action-fg` | #313131 (label + Add icon) | `--text-dark` |
| `--ai-sidebar-search-icon` | #8A8A9E | `--dark-input-text` |
| `--ai-sidebar-heading-fg` | #8A8A9E | `--dark-input-text` |
| `--ai-sidebar-item-fg` / `-more-fg` | #545454 | `--text-medium` |
| `--ai-sidebar-item-hover-bg` | #E7E7E7 @ 30% | `--grey-light` |
| `--ai-sidebar-item-active-bg` / `-fg` | #FFF4E5 / #422500 | `--status-orange-light` / `--status-brown-dark` |

### How this `.Menu-Item` differs from the other two
The file has three different `.Menu-Item` components.
- **Left Menu Panel** (2592:18253, `left-panel.md`): 46 tall, padding 9 / 15, no radius; Default 12 SemiBold #376F99 `--action-blue`; Hover `--pando-dark` @ 10%; Active white fill + `--pando-dark`; Code 01 / Sub text / Code 02 booleans. **This one:** 36 tall, padding 10, radius 4; Default 12 Regular #545454; Hover #E7E7E7 @ 30% + ⋯; Active #FFF4E5 + #422500 SemiBold + ⋯; its Code / ID / Sub text layers are hidden with no property.
- **Main Menu** (803:709): not built yet — `main-menu.md` does not exist, so not compared beyond the inventory (3 variants, part of the 3-level main menu with fly-out).

## Anatomy & spacing
Header (48) → body (scrolls): Action Buttons → Starred → Recent.
- Header: padding 15 (`--space-15`), gap 27, space-between. Brand 200 wide, gap 10 (`--space-10`): logo 18 + title (BL Pylon Serif Medium 14). Toggle: Grid View 14.
- Body: padding 10, gap 20. Action Buttons 250 × 36 (30 × 36 closed): padding 10, gap 8, icon 10, label 13px/Semibold (`--type-13-semibold`).
- Group: heading 16 tall, padding 0 8, 10 SemiBold no tracking; 5 between heading and list; items stacked with no gap.
- .Menu-Item: 36 tall, padding 10, radius 4, label ↔ ⋯ gap 8, ⋯ 10.
- px values kept as component tokens (not on the spacing scale): 270, 50, 706, 48, 27, 200, 18, 14, 20, 5, 16, 8, 36, 4 (radius), 10 (icon).

## Behaviour
Figma shows Open/Closed and Default/Hover only.
- **Collapse / expand:** the Grid View button toggles Type=Open ↔ Closed. Its `aria-label` and tooltip switch "Close Sidebar" ↔ "Open Sidebar"; `aria-expanded` follows. Event `pds-ai-sidebar-toggle`. No animation drawn.
- **Closed header hover:** the AI mark is replaced by the Grid View toggle (also on keyboard focus — added).
- **Select a chat:** click sets `aria-current="page"` (Active) and clears the others. Event `pds-ai-sidebar-select`.
- **⋯ More Actions:** shown on hover and on the Active chat. Fires `pds-ai-sidebar-more` with the button; Figma draws no menu.
- **Pin (added for the kit, not in Figma):** `pdsAiSidebar.pin(nav, id, pinned?)` moves a chat to the top of Starred or back to Recent. Event `pds-ai-sidebar-pin`. A Pin icon is hidden in the Starred heading in Figma; how pinning is triggered is not drawn.
- **New Chat / Search:** fire `pds-ai-sidebar-new` / `pds-ai-sidebar-search`. No search field is drawn, so none is built.
- **Keyboard (added for the kit, not in Figma):** the chats are one Tab stop (roving tabindex): ↑ ↓ Home End move, → goes to ⋯, ← returns, Enter opens.
- Empty groups are hidden (added).

## When (not) to use
No Figma text.

## Accessibility
- `<nav aria-label="Chat history">`; each group is an `<h3>` + `<ul aria-labelledby>`; chats are links, current one `aria-current="page"`.
- Toggle is an icon-only button with `aria-label` + `aria-expanded` + `aria-controls`; the kit tooltip is linked by `aria-describedby`.
- Closed: New Chat / Search keep their label visually hidden, so they still have a name.
- Focus ring 2px `--pando-blue` — added, not in Figma.
- Contrast under 4.5:1: headings #8A8A9E on the tinted bar ≈ 3.3:1 · Search icon #8A8A9E ≈ 3.3:1 · Grid View #A3A3A3 ≈ 2.5:1 (non-text, under 3:1).

## Open issues
- Off-token colours: #FFEFE5 tint (two opacities: 22% open, 32% closed), #1E1815 title.
- Title font BL Pylon Serif Medium is not in tokens and not loaded; falls back to Georgia, which is wider, so the title truncates. Line height auto in Figma (19 used).
- The AI mark is an inline vector, not a kit icon. Hidden in the header: Indicator Icon/AI, "ai-wand", "Freight Pay Specialist" title, Navigation/Dropdown-Arrow (an unbuilt agent switcher?).
- Indicator Icon/Pin hidden in the Starred heading; no pin trigger drawn.
- ⋯ menu not drawn. Search field / filtered list not drawn.
- Action Buttons are the kit Action Button with instance overrides (36 tall, padding 10, gap 8, 13 SemiBold #313131, title case vs kit 22 tall, 12 SemiBold #376F99, uppercase) — done by scoping the kit's `--button-action-*` tokens. Hover is the kit's #E9F1F5, not drawn here.
- Kit Tooltip Text is 164 wide; here it hugs (104) via `.pds-ai-sidebar__tip`.
- Line heights: item 12/16 vs `.type-12-regular` 12/17; heading 10 SemiBold tracking 0 vs `.type-10-semibold` +0.5.
- .Menu-Item master 240 wide, used at 250.
- No focus, pressed, empty or loading states in Figma.

## Not adopted
- Hidden header layers (agent switcher pieces) and hidden .Menu-Item Code / ID / Sub text layers — no property exposes them.
- Industry gaps, not added (Fluent 2 Nav): context menu for hover-only actions; tooltips to the right of items when collapsed; overlay drawer at ≤ 640px; tooltip with the full title on truncated items (only a native `title` here).

## Sources
Figma DS V2 – Organisms › 🟡 AI Chat (2814:5163), read-only.
Fluent 2 Nav usage — https://fluent2.microsoft.design/components/web/react/core/nav/usage
