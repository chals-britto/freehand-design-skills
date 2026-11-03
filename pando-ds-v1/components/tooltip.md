# Tooltip — Pando DS V1

**Status:** Built from Figma 2026-10-23, completed 2026-10-27 (all 3 styles), not yet reviewed (everything published treated as Keep) · **Figma:** DS V2 – Atoms › 🟢 Tooltips › `Tooltip` (243:236)
**Files:** `tooltip.css` (styles + component tokens) · `tooltip.js` (`pdsTooltip.attach`) · `tooltip.html` (live doc) · Style=Map Tracking also needs `status.css`

## What it is
Tooltips display additional information upon hover or focus that is contextual, helpful, and nonessential while providing the ability to communicate and give clarity to a user *(Figma wording)*

## Variants
`Style` × `Beak` = 36 variants in Figma, all built; `Show Title` boolean (default true, Style=Text).

| Style | Class | Built |
|---|---|---|
| Text | `.pds-tooltip--text` | Yes — 12 beak positions + Show Title=false |
| Custom Content | `.pds-tooltip--custom` | Yes — 12 beak positions |
| Info + Status (Map Tracking) | `.pds-tooltip--track` | Yes — 12 beak positions |

| Part | Value | Token |
|---|---|---|
| Bubble fill (Text, Custom) | #000000 @ 80% (Figma style “Opacity/#000000-Light-80%”) | `--tooltip-bg` (off-token) |
| Bubble fill (Map Tracking) | #000000 @ 80%, **no style linked** | `--tooltip-track-bg` (off-token) |
| Beak | same fill as its bubble | `--tooltip-bg` / `--tooltip-track-bg` |
| Text title / text | White #FFFFFF | `--white` |
| Custom slot fill | #EEF2F4 “Primary/Pando Light” | `--pando-light` |
| Custom slot title + icon row | #234357 “Primary/Pando Dark” | `--pando-dark` |
| Custom slot body | #000000, no style | `--tooltip-swap-text` (off-token) |
| Map Tracking rows | #D5DAF4 “Dark/Label-Text” | `--dark-label-text` |
| Map Tracking status | `#Status` Theme=Dark, Color=Blue, Layout=Horizontal, Size=Default — label #6397F8, bg #393945 @ 70%, icon strip #234357 @ 20% | reuses `.pds-status--dark.pds-status--blue` (status.css) |

**Beak** (`.pds-tooltip--beak-<1–12>`, clock position on the bubble):
11 · 12 · 1 = top edge (tooltip below the target) · 5 · 6 · 7 = bottom edge (tooltip above) · 2 · 3 · 4 = right edge (tooltip left of the target) · 8 · 9 · 10 = left edge (tooltip right of the target).

| Edge | Size | Start · centre · end (all styles unless noted) |
|---|---|---|
| Top 11 / 12 / 1 | 12 × 6 | 16px from left · 50% − 8px (2px left of centre) · 20px from right |
| Bottom 7 / 6 / 5 | 16 × 8 | 16px from left · centred · 16px from right |
| Sides 10·2 / 9·3 / 8·4 | 8 × 16 | Text: 8px from top (2:00 = 9px) · centred · 8px from bottom. Custom + Map Tracking: 16px · centred · 16px |

## Anatomy & spacing
- **Text** — bubble width **164** (Figma master 180 incl. 8px padding on each side reserved for the beak) · padding **10** · radius **4** · height hugs · no shadow, no border. Content vertical, gap **4** between title and text.
  - Title: Figma “12px/Heading” — Open Sans 12 SemiBold, auto line-height (16px box) → `.type-12-semibold`, `line-height: 16px`.
  - Text: Figma “12px/Body” — Open Sans 12 Regular, 16px → `.type-12-regular`, `line-height: 16px`.
- **Custom Content** — bubble hugs: **190** (padding 10 + 170 slot), radius 4. Slot = Figma “.Swappable Content” (3212:3437), a placeholder meant to be swapped: fill `--pando-light`, padding **10**, gap **4**, no radius. Its title row: refresh-line icon **20 × 20**, gap **8**, “Swappable Content” 12px/Heading (SemiBold, 16px box) in `--pando-dark`. Body: “Swap this component out with another.” 12px/Body (Regular 12/16), #000000, fixed width **150**. In code, pass `content: Node` to replace the slot.
- **Info + Status (Map Tracking)** — bubble width **234** · padding **10** · radius 4 · content = Figma “.Track Content” (3212:3457): fixed **214**, vertical, gap **4**:
  - `#Status` chip 140 × 20 (status.css, dark / blue): label “Delayed” (Figma style “Button/Action-Semibold”, uppercase), GPS Tracking icon 14px.
  - 5 × “Label Readonly Text / Theme=Dark” rows (16px tall, gap 4): “Label Text” 12px/Body Regular · “:” (Label/Regular/Normal, 12 Regular) · “Information Text” 12px/Heading SemiBold, all `--dark-label-text`.
- Offset to the target: 8px (Figma master padding). Top beak tip ends 2px from the target; bottom and side beaks (8px deep) touch it.

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
- Do not include interactive elements within a tooltip. Interactive elements in tooltips are inaccessible for some users and are hard to use for all users since tooltips do not receive focus. If images, buttons, or links need to be included in supplemental information, use the toggletip component and the disclosure pattern that allows for better tabbing and focus structure, improving the experience for all users.

## Do / Don’t
Figma shows two examples with **no caption text** — only the “Do” / “Don’t” labels. Both are Style=Info + Status (Map Tracking), Beak=5:00, status hidden. Rebuilt on the page as-is:
- **Do:** tooltip above an info icon — “Waterfall : Auto tender the carrier based on lowest cost. if the first carrier rejects the second carrier will be auto assigned” (“Waterfall :” bold; bubble 264px wide).
- **Don’t:** tooltip above a red warning icon — “Failed to connect server Visit help center for more information.”
The reason for each is not written in Figma (see Open issues).

## Accessibility
- The tooltip has `role="tooltip"` and the trigger gets `aria-describedby` pointing to it (set by `tooltip.js`).
- Opens on keyboard focus, closes on blur and Esc; hoverable (pointer can move onto it) — WCAG 1.4.13.
- The trigger must be focusable (a `<button>`, link, or `tabindex="0"`).
- Text: white on 80% black over white ≈ 12.6 : 1 — passes. Map Tracking rows #D5DAF4 ≈ 9.1 : 1; Custom title #234357 on #EEF2F4 ≈ 9.3 : 1, body ≈ 18.6 : 1 — pass.
- Map Tracking “Delayed” #6397F8 on #393945 @ 70% over the bubble ≈ **4.1 : 1 — fails** 4.5 : 1 for 12px text (kept, fix deferred).
- Custom Content: if the swapped content holds links or buttons it is no longer a tooltip (Figma “When not to use”).

## Open issues
- **Opacity:** every visible bubble and beak in all 36 variants uses 80% black (style “Opacity/#000000-Light-80%”); 70% appears only on hidden/clipped beak copies. The Specs section says “#000000, 70%”. Built at 80%.
- Map Tracking bubble fill is #000000 @ 80% but **not linked** to the opacity style.
- Beak size differs per edge (top 12×6, bottom/sides 16×8 / 8×16) and so do insets (top end 20, bottom end 16; 12:00 is 2px left of centre, 6:00 is centred).
- Style=Text side beaks: 2:00 sits 9px from the top, 10:00 8px — kept as in Figma.
- Style=Text side variants: text area is fixed 160px inside a 164px bubble with 10px padding (overflows by 16px in Figma). Built with the 144px text area of the other variants.
- Custom Content: bubble (190) is wider than its component frame (180) except on 6:00 / 7:00 (frame 206).
- Custom Content: body text #000000 has no colour style; the refresh-line icon fill in the instance was not resolved (master exports black) — built black.
- Custom Content slot is a placeholder; Figma does not say what may go in it.
- Map Tracking: fixed 5 rows and one Delayed chip; no rule for fewer/more rows or long values. “Delayed” uppercase follows the status component’s text style.
- Do / Don’t examples have no captions; the Do bubble (264) is wider than the 234 variant; “Waterfall :” bold was read from the render, not the text node.
- Hidden side/bottom beak layers in the master use #373D3F (“Base/Gray 02”) — not used.
- Line-height: Figma 16px vs `.type-12-*` 17px — overridden.
- Fixed widths (Text 164, Map Tracking 234); no max-width rule in Figma.
- Spec frame text reports Title line height as “undefined%”.

## Not adopted
- Doc example “Counter Offer” tooltip (5376:11062) — a doc instance, not a separate variant.
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
Figma `Tooltip` 243:236, page 226:625 (doc section 5376:10715, Specs 5376:10100, Spectral 5398:4693); `.Swappable Content` 3212:3437, `.Track Content` 3212:3457, refresh-line 3472:3224, Status/Track GPS Tracking 112:5.
Carbon Tooltip usage — https://carbondesignsystem.com/components/tooltip/usage/
Fluent 2 Tooltip usage — https://fluent2.microsoft.design/components/web/react/core/tooltip/usage
Ant Design Tooltip — https://ant.design/components/tooltip
WCAG 2.2 1.4.13 — https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
