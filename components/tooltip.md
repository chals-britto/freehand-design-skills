# Tooltip — Pando DS V1

**Status:** Built from Figma 2026-10-23, not yet reviewed (everything published treated as Keep) · **Figma:** DS V2 – Atoms › 🟢 Tooltips › `Tooltip` (243:236)
**Files:** `tooltip.css` (styles + component tokens) · `tooltip.js` (`pdsTooltip.attach`) · `tooltip.html` (live doc)

## What it is
Tooltips display additional information upon hover or focus that is contextual, helpful, and nonessential while providing the ability to communicate and give clarity to a user *(Figma wording)*

## Variants
`Style` × `Beak` = 36 variants in Figma; `Show Title` boolean (default true).

| Style | Built |
|---|---|
| Text | Yes — all 12 beak positions |
| Custom Content | **No — could not be read** (Figma MCP rate limit hit) |
| Info + Status (Map Tracking) | **No — could not be read** |

| Part | Value | Token |
|---|---|---|
| Bubble fill | #000000 @ 80% (Figma style “Opacity/#000000-Light-80%”) | `--tooltip-bg` (off-token) |
| Title / text | White #FFFFFF | `--white` |
| Beak | same fill as bubble | `--tooltip-bg` |

**Beak** (`.pds-tooltip--beak-<1–12>`, clock position on the bubble):
11 · 12 · 1 = top edge (tooltip below the target) · 5 · 6 · 7 = bottom edge (tooltip above) · 2 · 3 · 4 = right edge (tooltip left of the target) · 8 · 9 · 10 = left edge (tooltip right of the target).

## Anatomy & spacing
- Bubble: width **164** (Figma master 180 incl. 8px padding on each side reserved for the beak) · padding **10** · radius **4** · height hugs · no shadow, no border.
- Content: vertical, gap **4** between title and text.
- Title: Figma “12px/Heading” — Open Sans 12 SemiBold, auto line-height (16px box) → `.type-12-semibold`, `line-height: 16px`.
- Text: Figma “12px/Body” — Open Sans 12 Regular, 16px → `.type-12-regular`, `line-height: 16px`.
- Beak: **12 × 6** triangle. Top edge measured: 11:00 left edge 16px from the bubble’s left; 12:00 at 50% − 8px (2px left of centre); 1:00 right edge 20px from the bubble’s right.
- Offset to the target: 8px (Figma master padding; beak tip ends 2px from the target).

## Behaviour
- Tooltips are triggered on hover or focus of the target component and dismissed on blur or mouse-out of the target or tooltip container. *(Figma wording)* — moving the pointer onto the tooltip keeps it open.
- Tooltips can be placed to the top, bottom, left or right of their related content. For top or bottom tooltips, the placement can be more specifically aligned to top left, top right, bottom left or bottom right. Additionally the placement can be set to automatically adjust position to avoid being cut off by a container or browser edge. *(Figma wording)*
- `tooltip.js`: the beak points at the trigger’s centre. If the tooltip would leave the viewport, it flips to the opposite side (12 ↔ 6, 2 ↔ 10 …) — flip rule added in review, not drawn in Figma.
- **Esc closes the tooltip** — added in review, not in Figma (WCAG 1.4.13).

## When (not) to use
When to use *(Figma wording)*:
- To expose names of controls, like icon buttons, that lack visual labels
- When an element can take focus and supplying additional information is useful in helping a user make decisions
- When an element needs more context or explanation
- Use when defining a term or inline item

When not to use *(Figma wording)*:
- Since a tooltip disappears when a user hovers away, do not include information for the user to complete their task. Use helper text that is always visible and accessible for vital information such as required fields.
- Do not include interactive elements within a tooltip. Interactive elements in tooltips are inaccessible for some users and are hard to use for all users since tooltips do not receive […] *(rest of the sentence not read)*

## Do / Don’t
Figma has “Do” and “Don’t” headings in the Tooltip doc section; the examples under them were not read (rate limit). Not reproduced.

## Accessibility
- The tooltip has `role="tooltip"` and the trigger gets `aria-describedby` pointing to it (set by `tooltip.js`).
- Opens on keyboard focus, closes on blur and Esc; hoverable (pointer can move onto it) — WCAG 1.4.13.
- The trigger must be focusable (a `<button>`, link, or `tabindex="0"`).
- White on 80% black over white ≈ 12.6 : 1 — passes.

## Open issues
- **Opacity:** Figma fill style is 80% black; the Specs section says “#000000, 70%”. Built at 80%.
- **Not read (rate limit):** Custom Content and Info + Status (Map Tracking) styles, `.Track Content` (3212:3457) and `.Swappable Content` (3212:3437), the Do/Don’t examples, the end of the “When not to use” text.
- **Inferred:** bottom (5/6/7) and side (2/3/4, 8/9/10) beak offsets mirror the measured top ones; their exact positions were not read. The hidden left/right/bottom beak layers in the master use #373D3F (“Base/Gray 02”) and an 8 × 16 shape, which may not be what the side variants show.
- Beak sits 2px left of centre on 12:00 in Figma — kept.
- Line-height: Figma 16px vs `.type-12-*` 17px — overridden to 16px.
- Fixed 164px width (no max-width rule in Figma).
- Spec frame text reports Title line height as “undefined%”.

## Not adopted
- Loose frames on the page: “Specs” and “Tooltip” doc sections (the 12 loose `Tooltip/Text/*` components inside “Group 482126” are doc copies), “Spectral” spec frame, device frames “iPad mini 8.3 - 2”, “Desktop - 1”, “MacBook Pro 16" - 1”, empty “Frame” (5398:3865), loose instance 7132:8326.

## Industry gaps — not added
- Show/hide delays (Ant: 0.1 s enter and leave). — https://ant.design/components/tooltip
- Auto placement as the default. — Carbon Tooltip https://carbondesignsystem.com/components/tooltip/usage/
- Definition tooltip (dotted underline on a term). — Carbon Tooltip
- Toggletip (click-to-open, may hold links/buttons). — Carbon Tooltip
- 4px default offset from the target (V1: 8px). — Fluent 2 Tooltip https://fluent2.microsoft.design/components/web/react/core/tooltip/usage
- Label-vs-description content rules (noun phrase for unlabeled controls; disabled-control explanations). — Fluent 2 Tooltip
- Colour presets / arrow-to-centre option. — Ant Design Tooltip

## Sources
Figma `Tooltip` 243:236, page 226:625 (doc section 5376:10715, Specs 5376:10100, Spectral 5398:4693).
Carbon Tooltip usage — https://carbondesignsystem.com/components/tooltip/usage/
Fluent 2 Tooltip usage — https://fluent2.microsoft.design/components/web/react/core/tooltip/usage
Ant Design Tooltip — https://ant.design/components/tooltip
WCAG 2.2 1.4.13 — https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
