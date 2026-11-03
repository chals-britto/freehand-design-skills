# Actions — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 Action (2383:3802) › `Actions` 3544:1036 (newer) · `Actions` 2384:5702 (older) · `.Panel - Swappable with Local` 2528:1187
**Files:** `action-panel.css` (styles + component tokens) · `action-panel.js` (`pdsActions.build`, `pdsActions.init`) · `action-panel.html` (live doc)
**Reuses:** `button.css` (Primary / Secondary, Small) · `button-group.css` (Type=Buttons) · `input.css` + `input.js` (Input - Text / .Base Input) · `icons.css` + `icons/icons-data.js` (Navigation/Calendar-Input, Navigation/GeoFence-Input, System-Status/Warning-Circle) · `calendar.js` (date fields) · `attachments.js` (Misc/Add-Attachment add tile)

## What it is
It enables users to take actions on the page. It appears as a Form (inputs), Recommendations, Highlighted information. *(Figma `.documentation`)*

## Variants
Two published sets share the name **Actions** — both built. See Open issues #1.

### Actions — newer (3544:1036) · `.pds-actions`
`Type` (Default, Swappable) × `State` (Default, Hover, Active) = 5 variants (no Swappable × Active).

| State | Card | Content border | Bottom rule | Button Group | Size |
|---|---|---|---|---|---|
| Default | `--white` | 1px `--border-grey` #EFEFEF | 2px `--grey-light` #E7E7E7 @30% | hidden | 600 × 176 (Swappable 136) |
| Hover | `--white` + tint `--accent-light-highlight` #E9F1F5 @24% | 1px `--highlight-blue-light` #9CD2FF | 3px #9CD2FF @24% | shown | 600 × 184 (Swappable 144) |
| Active | same as Hover; first field in Input Active (“Some text here”) | | | shown | 600 × 184 |

Type=Default body: up to 6 kit `Input - Text` (Standard 200, 4 visible), wrapping, gap 0. Type=Swappable body: `.Panel - Swappable with Local`.
Button Group: kit `.pds-button-group`, Secondary + Primary, **Small**, label “Button Text”, gap 20.

### Actions — older (2384:5702) · `.pds-actions.pds-actions--legacy`
`Type` (Pro Number, Booking Confirmed, Package Dispatched, Mark as Delivered) × `State` (Empty, Filled) = 8 variants + boolean `Alert` (default false).
Always the tinted look (same values as newer Hover). Buttons: Secondary Small “Clear” + Primary Small “Save”, gap 10; Save is **Disabled** when Empty.

| Type | Title | Fields (Empty → Filled sample) |
|---|---|---|
| Pro Number | PRO Number | Input - Text “PRO NUmber” · Enter PRO Number → 946-12345C |
| Booking Confirmed | Booking Confirmed | Input - Text “Booking Confirmation Number” · Enter Confirmation Number → FED001 |
| Package Dispatched | Shipment Pick Up | Text Input Field + GeoFence-Input “Reported At” · Text Input Field + Calendar-Input “Dispatched at” · Select Date & Time → 19 Jan 2023 - 10:00 AM / 11:00 AM |
| Mark as Delivered | Delivered at Destination | Reported At (GeoFence) · POD (Calendar) · Select Date & Time → 20 Jan 2023 - 10:30 AM |

- **Alert = true** (layer exists in Package Dispatched): row of System-Status/Warning-Circle 12 + “Materials & Documents should be uploaded before shipment pickeup”, 12/16 Regular `--action-red`, gap 5.
- **Document** (hidden layer in Mark as Delivered, not a property): label “EPOD Copy” 10 Regular caps `--text-medium`, gap 4, Misc/Add-Attachment 40 (Light, Default). Built as opt-in `document: { label }`.

### .Panel - Swappable with Local (2528:1187) · `.pds-actions__slot`
334 × 80 · padding 10 / 8 / 10 / 15 · body `--accent-alternate-white` #F9FAFA, padding 10, gap 4 · title refresh-line 20 + “Swappable Content” 12 SemiBold `--pando-dark`, gap 8 · text “Swap this component out with another.” 12/16 Regular #000000.

## Anatomy & spacing
Card 600 wide · radius 2 · content padding 15 · gap 10 (header ↔ alert ↔ document ↔ fields) · header space-between, centred, gap 10 · title `.type-12-semibold` `--dark-darker` #24242F · fields 200 × 60 kit inputs (newer: wrap, gap 0; older: no wrap, −1 overlap) · no shadow.
px values not on the scale: radius 2, rule 2 / 3, button gap 20, alert gap 5, doc gap 4, slot padding 8, slot gap 4 / 8, slot icon 20, Text Input Field icon gap 5, overlap −1.

## Behaviour
- **Newer:** Hover (`:hover`) and keyboard focus (`:focus-within`) show the tinted look and the Button Group. Click or focus inside makes the card **Active** (`.is-active`); only one card per stack is Active (`[data-pds-actions-stack]`, else the parent). Esc or the Secondary button leaves Active and fires `pds-actions:cancel`; Primary fires `pds-actions:submit` with the field values.
- **Older:** Save is disabled while any field is empty and enabled once every field is filled (Empty → Filled). Clear empties the fields, disables Save, fires `pds-actions:clear`. Save fires `pds-actions:submit`.
- Date fields (Calendar-Input / GeoFence-Input) open the kit Calendar with time (`pdsCalendar.attach`, `showTime`), if `calendar.js` is loaded.
- Document row: the Add tile opens the file picker (`attachments.js`, names only, nothing is read or sent); fires `pds-actions:attach`.
- Field states (Empty, Filled, Active) are the kit Input’s.

## When (not) to use
- Use as a form (inputs), for recommendations or highlighted information. *(Figma)*
- Supports hover and active states. Active state style will be same as Hover state. When multiple action cards are stacked, only one can be active at a time. *(Figma)*
- Placement & Convention: NA. Animation: NA. *(Figma)*

## Accessibility
- Card is `role="group"` named by its header via `aria-labelledby`. Fields are kit inputs with `<label>`; buttons are kit `<button>`s.
- Newer buttons appear on `:focus-within`, so they are reachable by Tab. Esc leaves Active.
- Alert row `role="alert"`; disabled Save uses `disabled`.
- Focus ring on the card (`outline: 2px solid var(--pando-blue); outline-offset: 2px`) — added in review, not in Figma.
- Contrast for the accessibility pass: GeoFence icon #9C9C9C on white 2.7:1, Calendar icon #A3A3A3 2.5:1 (non-text, < 3:1); card border #9CD2FF on white 1.6:1; placeholder #737373 4.7:1.

## Open issues
1. **Two published “Actions” sets — pick which is current.** Newer 3544:1036: generic (Type Default/Swappable × State Default/Hover/Active), resting white card, Button Group only on Hover/Active, 4–6 generic inputs or a slot, documented by the page `.documentation`. Older 2384:5702: domain-specific (Pro Number / Booking Confirmed / Package Dispatched / Mark as Delivered × Empty/Filled + Alert), always tinted, Clear + Save always shown, Save disabled when Empty, 1–2 fields incl. date fields, Alert and hidden Document rows.
2. Newer: Button Group hidden at rest → card grows 8px on hover (176 → 184). The hidden instance in Default is a Normal-size group (226 × 30), the shown one Small (198 × 24).
3. Newer: Small buttons inside Button Group (kit default Normal); group min-height reset inside the card.
4. Newer: 200-wide inputs wrap 2 per row in a 570 row (170 empty); borders double at gap 0. Older overlaps by 1px.
5. Atom variant missing in kit: remote **Text Input Field** (label #616161, placeholder #737373, value #404040 — off-token; icon gap 5). Built on kit Input - Text with scoped overrides `.pds-actions__tif`.
6. Atom variant missing in kit: **refresh-line** icon (20px) in the slot. Inlined (same path as `tooltip.js`).
7. Kit input reserves 16px after the label for an info icon; removed inside Actions fields so “Booking Confirmation Number” fits as in Figma.
8. Date format: Figma “19 Jan 2023 - 10:00 AM” vs kit Calendar DD-MM-YYYY.
9. Save rule built as “all fields filled”; Figma shows only all-empty / all-filled.
10. Newer “Button Text” ×2 — built as Cancel + Submit; confirm labels/meaning.
11. Hidden layers not exposed as properties: Document row (built opt-in), Edit button (not built).
12. Text typos kept: “PRO NUmber”, “pickeup”. Layer names “Feilds”, “Frame 54” ignored.
13. Line heights: title 12 SemiBold AUTO (16) vs `.type-12-semibold` 17 (newer Default renders 177 vs 176); Alert and slot text 12/16 set explicitly.
14. No error, loading or focus states in Figma.

## Not adopted
- Loose instance `Actions` 3256:5533 (Booking Confirmed, Filled) and frame “Frame 483100” (Vehicle Inspection checklist, Cancel/Save) — not part of a published set.
- `.documentation` instance and the “Default” / “Hover” headings — page furniture.
- Hidden “Edit” button in the older set — no property exposes it.
- Industry gaps (not added): inline field errors on blur; disable primary while submitting; buttons at the form bottom; task-specific labels; required/optional marking. *(Carbon Forms)*

## Sources
Figma DS V2 – Organisms › 🟡 Action — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=2383-3802
Carbon Forms pattern — https://carbondesignsystem.com/patterns/forms-pattern/
