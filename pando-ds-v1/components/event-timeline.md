# Event Timeline — Pando DS V1

**Status:** Built from Figma 2026-10-28 · no review (everything published treated as Keep) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › Timeline (60:272) › `Event Timeline` (303:3265), `.Timeline-SLA` (432:3588), `Timeline with Status-Tag` (5618:5738)
**Files:** `event-timeline.css` (styles + component tokens) · `event-timeline.html` (live doc). No JS — Figma defines no behaviour. Uses kit `icons.css` (Navigation/Selected), `input.css` (Inline input, Edit), `tag.css` (Status-Tag row).

## What it is
One event in a vertical timeline: date and time, a marker on the rail, and a heading with details. The Figma set has no description.

## Variants
`Location` (Default · First · Last) × `State` (Default · Hover · Edit) × `Issue` (Yes · No) × `Type` (Default · Estimated · Done) — **18 variants exist**:

| Group | Locations | Class | Rail / marker | Text shown |
|---|---|---|---|---|
| Default · Issue No · Type Default | 3 | — | line + outer `--status-purple-light` #F2E7FE · white oval · dot `--status-purple-dark` #2D0645 + 30% `--grey-light` overlay | heading, text, link, small |
| Default · Issue Yes | 3 | `--issue` | line + outer `--status-red-light` #FFEAEE · dot `--status-orange-dark` #F94200 | heading, text, small, SLA “+4 Hour(s)” (link hidden) |
| Hover · Issue No | 3 | `--hover` (or `--interactive` for real hover) | as Default | as Default · bg `--accent-light-highlight` #E9F1F5, radius 4, `--shadow-2` |
| Edit · Issue Yes | 3 | `--edit` | as Default (purple) | heading, kit Inline input 225 × 60, SLA “+1 Day(s)” · bg #E9F1F5, radius 4, no shadow |
| Type Estimated | 3 | `--estimated` | dashed purple-light line, no dot | as Default |
| Type Done | 3 | `--done` | line, outer and oval `--status-green-light` #D5F9D1 · Navigation/Selected 8px `--accent-green-highlight` #008D5E | as Default |

Location: **First** adds 10px top padding to the row and removes the line above the marker (date/text top padding 0). **Last** hides the line below the marker.

Text properties: Date “13 Oct 2025” · Time “XX:00” · Main Status “Timeline Heading” · Description “Timeline Text Line 1” · Secondary Text “Timeline Small Text” · boolean SLA (default on, hidden in all Issue = No variants).

**.Timeline-SLA** — “SLA BREACH” 8 semibold caps `--action-red` #E25757 · gap 4 · Unit/Small: `--status-red-light` #FFEAEE, text `--status-red-dark` #FF0000 8 semibold caps, padding .5 2, radius 2.

**Timeline with Status-Tag** — 510 wide, space-between. Event Timeline (Default) with right padding 20, date + time in `--pando-blue-active` #005399, heading + text only. Tag area padding-top 10 with kit Tag Small · Filled · Rounded · Brown “Shipper” (`.pds-tag--rounded.pds-tag--brown`).

## Anatomy & spacing
Row 350 fixed, height hugs · gap 10 · date column 65 (right-aligned) · rail 14 · text column fills.
Date and text columns padding 10 / 0 · text gap 4 · link gap 4.
Rail: line 1px, 13px above the marker, rest below · marker 14 (2px ring + 10 oval) · dot 6.
Date 10 semibold, line-height 14 · Time `.type-10-regular` · Heading 12 semibold, line-height 16 · Text `.type-11-regular` · Link `.type-11-regular` `--action-blue` #376F99 · Small `.type-10-regular`.

## Behaviour
- Figma only draws a Hover variant. `--interactive` applies it on pointer-over; `--hover` forces it.
- Edit swaps text/link/small for an Inline input; no save / cancel in Figma.
- Link: hover underline and focus ring — added in review, not in Figma.

## When (not) to use
No usage text in Figma.

## Accessibility
- Timeline = `<ol>`; each event = `<li class="pds-event-timeline">`; date in `<time>`. Rail is `aria-hidden`.
- Issue / Estimated / Done differ by colour, dash and check only — add a visually hidden status word (added in review — not in Figma).
- Edit input has a `<label>` (“Input Label”).
- Contrast for the accessibility pass: #FF0000 on #FFEAEE 3.5:1 · #E25757 on white 3.7:1 · 8px SLA text. Kept as Figma.

## Open issues
- Atom missing in kit (remote library): **Unit/Small** — built as `.pds-event-timeline__sla-unit`. `card.css` `.pds-card__unit` is 150 wide with 12px text, not equivalent.
- Atom variant missing in kit: remote **Text Input Field** (Input Inline, Empty, Medium (No Border)) shows dashed #B5C3CB + #F9FAFA fill at rest; kit Inline is borderless/white at rest. Kit input reused with a scoped override.
- No type class for 8px Semibold All Caps. Date 10 semibold/14 no tracking ≠ `.type-10-semibold` (12, +0.5). Heading line-height 16 vs `.type-12-semibold` 17.
- Estimated dashes: ≈2.2px on the 13px line, ≈3.9px on the long line (outlined vectors). Built as one 4/4 pattern.
- Edit is “Issue = Yes” but keeps the purple marker; Issue = Yes Default hides the link. Meaning of Issue to confirm.
- Fill style named “Accent/Light-Highlight-#EFF3F5” is #E9F1F5.
- Edit input 225 wide inside a 251 text column — built at 225.
- No focus / selected / disabled states in Figma.

## Not adopted
- Hidden **Navigation/New Tab** icon next to the link (hidden in every variant, no property) — not built.
- Loose instance **Timeline-Section** (5618:5469) — page example only.
- **Location Timeline** and **.Leg Movement** on the same page — separate item.
- Industry gaps (not added): loading/pending node, reverse order, alternate left/right layout, horizontal orientation (Ant Timeline).

## Sources
Ant Design Timeline — https://ant.design/components/timeline
