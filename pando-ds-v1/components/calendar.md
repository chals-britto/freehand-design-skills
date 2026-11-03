# Calendar — Pando DS V1

**Status:** Built 2026-10-28, not reviewed (every published variant kept) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › 🟢 Calendar (138:494) › `Calendar` (164:3009) + `.Single Date` (2353:7563) + `.Weekdays & Weeks` (2353:9160) + `.Date Selector` (1935:4981)
**Files:** `calendar.css` (styles + component tokens) · `calendar.js` (`pdsCalendar.build / init / getValue / setValue / attach`) · `calendar.html` (live doc)
**Atoms reused:** `button.css` (Reset / Now / Today / Cancel = Text Only · Small, Apply = Primary · Small; dark text buttons `pds-button--dark`) · Navigation/Right-Caret from `icons/nav-right-caret.svg` (inlined, prev mirrored) · `input.css` / `input.js` (the field it attaches to) · `timepicker.css` / `.js` (opens from the Time field when loaded).

## What it is
From the Figma `.documentation`: “An interactive calendar for date selection experiences. The calendar component provides a way to render dates for selection or presentation purposes.” Uses: Select single date · Select Range of dates · Choose between date types for Filtering · Choose a single day · Choose from Day options. Placement & convention: “Placed below date input field or a date selector”.

## Variants
`Calendar` properties: Theme (Light/Dark) · Month Type (Single/Double) · Range Selected (No/Yes) · Type (Month/Day/Multi Date/Year) · With Time (No/Yes) · boolean Show Time (default on). 11 published:

| Figma variant | Size (Figma → built) | Build |
|---|---|---|
| Light · Single · Month · With Time (164:3001) | 280 × 299 → 280 × 300 | `build({type:'month'})` |
| Dark · Single · Month · With Time (164:3010) | 284 × 315 → 284 × 316 | `theme:'dark'` |
| Light · Single · Year (4527:1844) | 312 × 275 → 312 × 281 | `type:'year'` |
| Light · Single · Day (2353:6629) | 314 × 272 → 314 × 272 | `type:'day'` |
| Light · Double · Month (164:3006) | 524 × 265 → 534 × 301 | `months:2` |
| Light · Double · Month · Range (164:3005) | 534 × 300 | `months:2, mode:'range', cancelSize:'normal'` |
| Dark · Double · Month (164:3389) | 534 × 300 | `months:2, theme:'dark'` |
| Dark · Double · Month · Range (164:3267) | 534 × 300 | `+ mode:'range'` |
| Light · Double · Day · Range (2353:6632) | 618 × 310 → 618 × 311 | `type:'day', months:2, mode:'range'` (presets) |
| Light · Double · Multi Date (1935:4994) | 625 × 344 → 625 × 345 | `type:'multi'` |
| Light · Double · Multi Date · With Time (2970:598) | 625 × 354 → 625 × 355 | `type:'multi', showTime:true` |

Day-cell states (`.Single Date`, 34 × 28, Light / Dark):

| State | Light | Dark | Class |
|---|---|---|---|
| Default | text #313131 `--text-dark` | #D5DAF4 `--dark-label-text` | — |
| Selected | 28 circle #0076DD `--pando-blue`, white text | same | `.is-selected` |
| Range | fill #E9F1F5 `--accent-light-highlight` | #D5DAF4 @ 50% | `.is-range` |
| Range · Selected | range fill + circle | same | `.is-range.is-selected` |
| Disabled (outside month) | text #CBD4D8 `--accent-blue-grey` | #8A8A9E `--dark-input-text` | `.is-outside` |
| Disabled · Range (unavailable date) | fill #EFEFEF `--border-grey`, text #A3A3A3 `--grey-medium` | fill #8A8A9E @ 50%, text #8A8A9E | `.is-disabled` |

`.Weekdays & Weeks` (Simple / Range / Disabled × Light / Dark) = one month grid; Disabled = dates before `min`. `.Date Selector`: Selected (#234357 @ 10%, text #18283B off-token) / Default (white, #545454 `--text-medium`); 24 high, padding 4 8, radius 2, 12 SemiBold.

| Token | Value | Maps to |
|---|---|---|
| `--calendar-bg` / `--calendar-shadow` | #FFFFFF / 0 14 28 6% | `--white` / `--shadow-4` |
| `--calendar-title`, `--calendar-caret` | #234357 | `--pando-dark` |
| `--calendar-head-bg` | #F9FAFA | `--accent-alternate-white` |
| `--calendar-divider` | #EFEFEF | `--border-grey` |
| `--calendar-selected-bg` | #0076DD | `--pando-blue` |
| `--calendar-selector-on-fg` | #18283B | off-token in Figma |
| `--calendar-chip-bg` | #E7E7E7 @ 30% | `--grey-light` mix |
| `--calendar-field-border` | #E2EAEC | `--border-input-light` |
| `--calendar-field-fg` | #616161 | off-token in Figma |
| `--calendar-preset-fg` | #545454 | `--text-medium` |
| `--calendar-time-label` | #005399 | `--pando-blue-active` |
| `--calendar-dark-bg` | #24242F | `--dark-darker` |
| `--calendar-dark-head-bg`, `--calendar-dark-divider`, `--calendar-dark-field-bg` | #484858 | off-token in Figma |
| `--calendar-dark-shadow-double` | 0 2 4 6% | `--shadow-2` |
| `--calendar-focus-ring` | #0076DD | added in review |

## Anatomy & spacing
- **Single panel:** padding 10 15, gap 10, radius 4. Header (16 high, space-between): caret 7.5 × 12 · title (12 SemiBold, line 16, +0.3, uppercase) · caret. Body: month grid · divider · Date / Time fields (2 × 120 × 34, gap 10; dark gap 14, body gap 15) · actions row (24): Reset · Now (gap 20) ↔ Apply.
- **Month grid (compact):** 242 wide, padding 0 1. Weekday row: 7 × 32 labels, gap 2, padding 0 2 10 (dark 15), 11 Regular (dark 12 Regular +0.5). Weeks: 7 × 34 × 28 cells.
- **Double panel:** padding 0, radius 0, gap 10. Header bar 36, padding 10, #F9FAFA (dark #484858). Months row: padding 0 10, gap 15, 200 high, 1px divider between. Divider, then buttons row padding 0 15 10 (34): Cancel ↔ Apply.
- **Wide grid (Day, Multi Date):** 284 wide: 32 cells, column gap 10, rows 30 + 1 gap, circle 30, range band runs through gaps with radius-20 ends; weekday 12 Regular +0.5, 15 below. Outside days are hidden.
- **Day · Single:** padding 15, no header, days 1–31 in 7 columns, then “Last Day of Month” chip (Date Selector, fill #E7E7E7 @ 30%), Reset ↔ Apply.
- **Year:** 4 × 70 cells, rows 38, 20 years per page (2009 – 2028), divider, Reset · Today ↔ Apply.
- **Multi Date:** tabs bar (44, padding 10, gap 5, radius 2 2 0 0) above the calendar body (radius 0 0 2 2, `--shadow-4`); header carets next to 280-wide titles, gap 10. With Time: footer “Select Time” (12 SemiBold #005399) + time fields (gap 16), padding 0 15 10, gap 20.
- **Day · Double:** footer presets Next 3 Days / Next 7 Days / Next 1 Month as Cell Input Fields (gap 16), then Cancel ↔ Apply.
- **Cell Input Field:** 34 high, padding 9 10, 1px inside #E2EAEC, 12 SemiBold line 16.

px values used (component tokens): 0.3 / 0.5 (tracking), 1, 2, 4, 5, 7.5, 8, 9, 12, 14, 16, 20, 24, 28, 30, 32, 34, 36, 38, 44, 70, 120, 200, 242, 280, 284.

## Behaviour
Figma shows static panels; behaviour below is built for the kit (added in review).
- Real month grids from any date, Monday first. Prev / next carets move one month (Year: 20 years).
- Single: a click selects. Range: first click = start, second = end (swapped if earlier); the band fills between.
- `min`, `max`, `disabled(date)` draw dates as Disabled · Range and block them.
- Date field (Month · Single): shows `DD-MM-YYYY`; typing a valid date moves the selection. Time field opens the kit Timepicker if `timepicker.js` is loaded.
- Reset clears the selection. Now selects today and fills the current time; Today (Year) selects this year. Day · Double presets set today → +3 / +7 days / +1 month.
- Multi Date tabs keep a separate range per date type; Apply returns the active one with `selector`.
- Apply → `onApply(value)`; Cancel / Esc → `onCancel()`; every pick → `onChange(value)`.
- `pdsCalendar.attach(input, options)` opens under a kit input (click or ↓), gives it the Active border, writes the text on Apply and fires `input` + `change`; Cancel, Esc or outside click close without change; focus returns to the field.

## When (not) to use
Only the `.documentation` text above exists in Figma. Not added.

## Accessibility
- Month = `grid` labelled “October 2025”; days = `gridcell` + `aria-selected`, button labelled “13 October 2025”; today `aria-current="date"`; outside / disabled `aria-disabled`. One tab stop per grid (roving tabindex).
- Keyboard (added in review): ← → ↑ ↓ day / week (year ±1 / ±4), Home / End row, PageUp / PageDown month (Shift year; Year view 20 years), Enter / Space pick, Esc cancel. ← → move Multi Date tabs (`tablist`).
- Attached panel `role="dialog"`; field gets `aria-haspopup`, `aria-expanded`, `aria-controls`.
- Focus ring 2px `--pando-blue` (added in review — not in Figma).
- Contrast for the a11y pass: outside #CBD4D8 on white 1.5 : 1; disabled #A3A3A3 on #EFEFEF 2.1 : 1; dark outside #8A8A9E on #24242F ≈ 4.6 : 1; carets are 7.5 × 12 targets.

## Open issues
- **Atom variant missing in kit:** remote “Cell Input Field” (Size=Small, 34px, no label) — built inside as `.pds-calendar__field`.
- Day and Multi Date variants are detached drawings (different grid metrics, band with no fill on Multi Date, white leading-day text, #0078DD ends on Day · Double). Built as a second “wide” grid with the Day · Double band and `--pando-blue`.
- No today, hover, focus or pressed state on day cells in Figma.
- Selected year cell size not read — assumed a 28-high pill, padding 0 10.
- Figma draws 5 week rows; 6-row months add a row.
- Time format: Figma “10:00 AM” vs the kit Timepicker’s 24-hour “HH:MM”.
- Multi Date · With Time: purpose of the three time fields not described; built as editable fields.
- Day · Double presets are input fields in Figma; built as buttons (added in review), active one gets the blue border.
- Dark exists for Month only. Dark Apply stays the Light primary (as Figma).
- Kept as Figma: Cancel Normal size on Light · Double · Range only; Light · Double no-range is 524 wide with gap 10 (built 534 / 15 like the others); dark doubles use `--shadow-2`; dark single caret #EEF2F4 vs double white.
- Off-token: #18283B, #616161, #484858.
- Line height: Figma auto (16) vs `.type-12-*` 17 — overridden to 16.
- Range text format “DD-MM-YYYY – DD-MM-YYYY” is not in Figma.

## Not adopted
- `.documentation` instance (2353:10520) — read for the text above.
- Hidden Search Input inside the Year variant (not visible in Figma).
- Loose `Timepicker` instance 5455:2710 — the Timepicker is its own component (`timepicker.*`).
- Industry gaps, not added: range hover preview, week / month / quarter pickers, clear ×, placement options (Ant DatePicker); error / warning / read-only / skeleton field states, format hint and separate Start / End labels, open on focus (Carbon Date picker).

## Sources
Figma 164:3009 (11 variants), 2353:7563, 2353:9160, 1935:4981, 2353:10520 (read-only `use_figma`).
Ant Design DatePicker — https://ant.design/components/date-picker
Carbon Date picker usage — https://carbondesignsystem.com/components/date-picker/usage/
