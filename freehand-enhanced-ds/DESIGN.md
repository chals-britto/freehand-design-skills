# Freehand V1 Enhanced Studio: design reference

Source of truth for building any Freehand V1 Enhanced Studio page.
Built from Enhanced Studio v106 (re-measured in the browser on Nov 3) and checked against `qatipl-freehand/freehand-studio` `main` (00e2705d7, 2026-11-03).

When the two disagree, **Enhanced Studio wins**, and the difference is listed in §9 for Charles to decide.

Contents
1. Foundations (type, colour, radius, shadow, sizes)
2. Components
3. List page pattern
4. Detail page pattern
5. List inside a detail page (dispute docket pattern)
6. Content rules
7. Behaviour rules
8. Decision log
9. Production differs (to decide)
10. Files in this skill
11. Proposed: vendor V2 (pending design review)

---

## 1. Foundations

All values are CSS variables in `snippets/tokens.css`. Use the variables; don't invent new colours.

### Type
- Font: **Inter**, system-ui fallback. Mono for IDs and amounts: `ui-monospace, "SF Mono", Menlo`.
- Scale: **10 / 12 / 14 / 16 / 18**, plus 20 for big figures and 24 for list page titles. No 11, 13 or 15.
- Weights: 400 body, 500 labels and values, 600 titles and buttons, 700 page titles and big figures.

| Role | Size / weight | Colour |
|---|---|---|
| List page title | 24 / 700 | `#0F172A` |
| Page description | 12 / 400 | `#64748B` |
| Detail page title | 18 / 600 | `#0F172A` |
| Section title (e.g. "Disputes") | 18 / 700 | `#0F172A` |
| Body, table cells, buttons | 14 / 400–600 | `#0F172A` (cells too, since v106) |
| Table headers | 12 / 600 | `#334155` |
| Labels, meta, badges | 12 / 400–600 | `#64748B` |
| Card amount labels | 12 / 500, UPPERCASE, 0.6px tracking | `#64748B` |
| Big figures (totals) | 20 / 700 | `#0F172A` |

### Colour
- **Text:** `#0F172A` primary, `#334155` strong secondary (buttons, links), `#475569` helper sentences, `#64748B` meta, `#94A3B8` chevrons and separators.
- **Brand orange:**
  - `#FE6301` primary buttons, active page, focus
  - `#D84E00` invoice # links, Apply, Summary title, "Next step"
  - `#C2410C` text on an orange tint
  - `#FDBA74` active borders
  - `#FFF1E6` active pill and nav background
  - `#FFF7ED` active dropdown background
- **Surfaces:**
  - `#FFFFFF` canvas and cards
  - `#F8FAFC` sidebar
  - `#FAFAFA` detail-page left column
  - `#FAFAF9` table header
  - `#FAFBFC` suggestion row
  - `#F1F5F9` count chip
- **Borders:**
  - `#E2E8F0` cards and inputs
  - `#DCDFE4` buttons
  - `#E5E7EB` dividers and footer
  - `#F1F5F9` lines inside cards
  - `#CBD5E1` link underline
- **Money:** disputed or held `#B91C1C`; resolved `#15803D`, used only when the amount is above 0, otherwise neutral. Every other amount (invoice totals, payment amounts) stays neutral `#0F172A`.
- **Status tones** (text / background / 1px inset ring):

| Tone | Used for | fg | bg | ring |
|---|---|---|---|---|
| ok | Approved, Resolved | `#166534` | `#DCFCE7` | `#BBF7D0` |
| warn | Held, Open | `#92400E` | `#FEF3C7` | `#FDE68A` |
| bad | Issue found | `#991B1B` | `#FEE2E2` | `#FECACA` |
| info | Received, Partly resolved | `#1E40AF` | `#DBEAFE` | `#BFDBFE` |
| org | Escalated, "N to review" | `#9A3412` | `#FFEDD5` | `#FED7AA` |
| acc | Ready to pay | `#115E59` | `#CCFBF1` | `#99F6E4` |
| mute | Not audited, neutral tags | `#334155` | `#F1F5F9` | `#E2E8F0` |

### Radius, shadow, sizes
- **Radius:**
  - 6 controls and buttons
  - 8 search and nav items
  - 10 cards and menus
  - 12 totals and summary cards
  - 999 pills and badges
- **Shadows:**
  - control `0 2px 0 rgba(15,23,42,.05)`
  - elevated card `0 1px 2px …, 0 4px 12px rgba(15,23,42,.06)`
  - menu `0 12px 28px -8px rgba(15,23,42,.22)`
  - tooltip `0 6px 16px rgba(15,23,42,.24)`
- **Heights:**
  - controls 36
  - status tabs: bar 40 including its divider (was 39; even heights only, Charles, Nov 24, 2026)
  - pager buttons 32
  - badges 22
  - table header 40
  - table row 44
  - footer 52
- **Widths:**
  - sidebar 232 (64 collapsed)
  - conversation column 440
  - tooltip max 320
- **Icons:** Lucide, 16px, outline only.

---

## 2. Components

Ready-to-copy markup and CSS for each is in `snippets/components.html` (27 blocks, including sidebar, toolbar, column picker, card, upload card and attachment card). Open it in a browser to see them rendered.

| # | Component | Key rules |
|---|---|---|
| 1 | Buttons | Secondary is the default. One orange primary per page. The icon button turns orange with a count badge when something is set (sort, columns). |
| 2 | Status tabs | List-page status filter. The detail-page tab (`dx-tab`): 38px, 14/500, `#64748B` off, `#0F172A` with a 2px `#FE6301` underline on. Count chip (`fh-cnt`) after the label, 6px gap. 20px between tabs; the bar has a 1px `#E5E7EB` bottom line. |
| 3 | Badges, tags, count chip | Status badges carry tone. Exception tags inside cards stay neutral. The count chip sits next to section titles ("Disputes [24]", "[15 of 24]" while filtering). |
| 4 | Search and dropdown filters | One dropdown per field (Status, Exception…). Options show live counts that respect the search and the other dropdown. An active dropdown turns orange with a number. "Clear" sits inside the menu; "× Clear all" sits next to the controls. |
| 5 | Sort menu | Same as the listing pages: icon button with a "1" badge when set; "Sort by" list; the chosen row gets an ascending/descending toggle; "Clear sort" at the bottom. |
| 6 | Table | Header 40px (text `#334155`), rows 44px, 16px cell padding, light column lines `#EEF0F3`. Row number + checkbox share one 56px column; first data column pinned. Hover and selected share one neutral grey `#F3F4F6`; selected adds a 2px orange edge. Two-line cells: line 1 like any cell, line 2 grey 12px, each truncated; "+N" after two items. |
| 7 | Footer pager | Identical on every list: rows per page (10/20/50/100), "1–10 of 24", numbered pages (current page white with an orange bottom bar), "Go to" when there are more than 7 pages. |
| 8 | Totals card | Three equal, left-aligned columns: Disputed, Open (red when held), Resolved (green only when above 0). |
| 9 | Summary card | Orange-family left stroke (no teal). Title "Summary", source line "Based on the charges, messages and activity · Updated …", then "Next step: …". |
| 10 | Dispute card | Header (checkbox, invoice # link, charge name, exception tag, status, Resolve) · amounts grid (Billed, Expected, Disputed) · optional reason line · optional "Suggested: action · reason · Apply" row. |
| 11 | Text link to another page | Dark grey `#334155`, grey underline, new-tab icon. Never blue; never the icon alone. |
| 12 | Tooltip | One floating element, dark, 12px, wraps at 320px, never one long line. |
| 13 | Toast | Bottom centre, dark, about 4s. Bold title, then the detail, optional action. |
| 14 | Ask Freehand | Bottom-right white pill with an orange-only rotating ring. Moves up when a footer pager slides in. |
| 15 | Activity timeline | 84px date column, dotted line, newest first, "Next" step on top with a dashed dot. |
| 16 | Sticky list bar | Title + count, then search, filters and sort on one row (wraps on narrow screens). The divider shows only while pinned. |
| 17 | Sidebar | 232px light sidebar, 14px top padding. Real logo SVG (`snippets/logo-full.svg`) at 24px tall; `logo-mark.svg` when collapsed. Workspace switcher (22px navy tile, radius 6). "Search anything ⌘K". Grouped nav: 18px icons, **12px icon-to-label gap**, group labels with a 6px gap to their arrow. Profile: full-width divider, 26px avatar, row highlights on hover. Keep every item. |
| 18 | List toolbar | Saved-filters button, filter tokens + search in one box with Save joined to its right end (navy when active), sort icon button, columns button with count, Export. |
| 19 | Column picker | Find, tick to show, drag to reorder, pin; first column always shown; no density setting. |
| 20 | Card | White, 1px `#E5E7EB`, 12px radius, 14/16 padding, 12px uppercase grey title. Blocks that belong together go in one panel with dividers. Top-level sections on a white page need no card: title, content, divider. No box inside box inside box. |
| 21 | Upload card | While attaching: 112px tile (type icon, 2-line name, type badge; Download and Remove on hover; click previews), dashed "Attach file" tile last, gone at the limit. "Files *  Up to 5" label above. PDF red, XLS/CSV green, image purple. |
| 22 | Attachment card | Read-only files (shipper documents, sent answers): 36px type tile, one-line name, kind, Preview + Download icons always visible; card click previews; orange on hover. Grid 260–360px per card: 1 file = 360px, never full width. |
| 23 | Date panel | Every date filter opens it (freehand-studio `InvoiceDateRangeFilter`): presets with an orange check, Clear dates, Between / On or after / On or before, month calendar. No "Any time". |
| 24 | Slide-out record header | One row, always. Left: record name (16/600, truncates with a tooltip) with tags under it. Right, in order: ghost up/down arrows (record navigation, K/J), a 1px divider, the history icon button, the action buttons (secondary first, one orange primary last), a 1px divider, ✕. The arrows and buttons never wrap; only the name shrinks. When a side panel such as Ask Freehand takes space, the slide-out widens until the header fits (stopping 72px short of the panel), then the name truncates. |
| 25 | Quote history (record versions) | Opened by the history icon button (Lucide `history`). Adds a 340px timeline column on the right; the actions are hidden and every value is read-only. Timeline items are cards that select like the lane list: orange border + `#FFF7ED` when selected, `#F3F4F6` on hover; dot and dotted connector run dot centre to dot centre behind the dots; newest on top, no "Latest" tag in the timeline. The selected version shows a blue banner (`#EFF6FF`, border `#BFDBFE`, text `#1D4ED8`): "Quote · date, time", a white "Latest" pill on the newest, then who · what in grey. A changed value gets a 6px blue dot (`#2563EB`) before its label, in a slot every row keeps so values never move; hovering the label shows the current value. The footer total stays sticky and shows the selected version's total. Where it opens: in a slide-out record (Table view) it opens inside the same slide-out; in an in-page record (Lanes view) it opens in the page: the list and details stay (24% each, 260–340px), read-only charges sit next to a compact 240px timeline (date and time on one line above the event); on narrow size steps the details hide, and switching records keeps history open. Leaving history: "Back to current quote" outline button after the arrows (Esc too); in a slide-out, ✕ closes everything. |
| 26 | Lane connector | Links the selected record in a list to its panel. A 1.5px orange line (`#FE6301`) runs down the list / panel edge (in-page list) or the slide-out's left edge (table). At the selected card or row it curves out (8–14px radius), wraps it and returns. Selected card: no border, `#FFF7ED` fill continued to the edge, soft shadow. Open table row: `#FFF7ED` tint, no orange left edge. When the selection scrolls out of view, a pinned copy sits at the list edge (top or bottom): ↑/↓ arrow, lot (mono, grey), name; 40px (cards) or 34px (rows); a "Go to lane" outline button on the right that shows only on hover or keyboard focus (no tooltip); a 16px white fade on the list side so rows scrolling under it are not cut; clicking anywhere on it scrolls back. The line wraps the pinned copy. Open pop-ups and tooltips cut a gap in the line (SVG mask), so it always runs under them: never over a pop-up, never hidden because one is open; the pinned copy hides while a pop-up covers it. Measure on scroll, resize and render. |
| 27 | Record filter bar (search + filter inside a detail page) | The list-page filter bar (18) applied to records inside a page, e.g. lanes on the bidding page. One box: chips + input. **Vague:** typing filters live across every field; the first suggestion is "Any field contains X" with a lane count and a Lucide `corner-down-left` Enter icon (tooltip "Press Enter"), one line. **Precise:** below it, only the fields that match, each with a count inside the current results: "<Field> is <Value>" when the text equals a value (click adds the chip and opens its values with that one ticked) or "<Field> contains X" otherwise (click adds a contains chip and closes). Field list grouped by section (Lane / Source / Destination), short names under each heading. The value panel (checkbox list with search, or text values added with Enter) appears only while a field is hovered; the pop-up otherwise shows just the list. Operators: list fields is / is not / contains; text fields contains / does not contain / is / is not. Many values per field: values in one field match any, fields combine. Chip value = first value + count ("LOT-01 +3"), full list on hover. Input stays on the chip row (40px min). Status lives in the bar when the page has no status pills. Result count sits outside the bar ("9 of 30 lanes" under it); none where pills and the pager already show it. **In a toolbar** (table view): right-aligned, 340px at rest, 540px when open or filtered (shrinks to the free room); the closed bar is always one line, chips that don't fit fold into an orange "+N" chip (hover lists them); any click opens the bar as a pop-up floating over the content with every chip, so the toolbar never changes height. In a narrow list column it may wrap. |

---

## 3. List page pattern
Screens: `screens/01-list-invoices.png`, `02-list-exceptions.png`, `03-list-dispute-dockets.png`.

Top to bottom:
1. **Title row:** page title (24/700, 28px line) and a one-line description (12px grey, 18px line). Page actions sit on the right, **vertically centred** on the title block (`align-items:center`), not top-aligned.
2. **Optional summary strip** (e.g. "22 open · 18 suggested actions · USD 22.3K disputed · Oldest 49 days").
3. **Status tabs,** each with a count chip, full width under the title (24px side padding, 4px above, 1px divider below). "More ▾" holds the overflow.
4. **Toolbar:**
   - filter bar with search and filter tokens, plus "Save"
   - sort icon button
   - columns button (shows the count of visible columns)
   - Export
5. **Table:**
   - row-number column
   - first column pinned
   - columns can be resized (drag; double-click to reset) and reordered by dragging
   - column picker: no density control
   - **Every table works the same** (Charles, Nov 15, 2026): sort in the header, drag a header to swap columns, pin any column, drag the edge to resize (double-click resets), column picker to show, hide and pin; the action column stays pinned on the right. Tables open in their default state on each page load.
6. **Footer pager,** always visible on list pages. Default **20** rows per page on list pages, and **10** for lists inside a detail page.
7. **Bulk selection:** one common action bar at the bottom.

**Sidebar:** copy it from `screens/01-list-invoices.png` exactly, including "Agents", "Context graph" and "Clients". These are product names, not AI wording.

**Columns:**
- Follow production's column set and default widths. For a page not covered here, look up that page's columns in the repo (`frontend/src/app/dashboard/<page>`). If production has no such page, use the brief's columns and list them for Charles to confirm.
- Amounts in mixed currencies: show each in its own currency. Don't sort across currencies as if they were one number; ask how to sort (e.g. by USD equivalent).
- A column that duplicates the active grouping is hidden.
- Mode is a separate column (icon + label) on Invoices. It does **not** appear on Dispute dockets, because production has no Mode column there; Mode stays as a filter.
- Vendor shows the SCAC in mono grey in a fixed 38px slot, a grey "-", then the name, so names line up.
- "Charges / exceptions" is a two-line cell, 240px by default.

---

## 4. Detail page pattern
Screens: `screens/04-docket-detail-top.png`, `07-docket-activity.png`.

**Header** (white, 16px/24px padding, bottom divider):
- **Line 1:**
  - breadcrumb ("Dispute dockets ›")
  - title (18/600)
  - status badge
  - record pager on the right ("‹ 1 of 46 ›", no noun)
- **Line 2:**
  - mode icon + SCAC
  - vendor
  - "Opened Aug 12"
  - link to related records ("2 invoices ↗", opens the filtered list in a new tab)
- **Totals:**
  - On the right of the header, they show only once the totals card has scrolled away.
  - The header grows 4px to fit them.
  - This state must survive re-renders.

**Body:**
- **Left column** (`#FAFAFA`, scrolls): tabs (Details · Activity, pinned while scrolling), then totals card, summary card and the list.
- **Right column** (440px, white, soft left shadow): conversation.

**Conversation:**
- Messages grouped by date chips, each with a title ("Dispute opened", "Suggested action").
- The vendor's first message carries a "Joined" tag and their role.
- Freehand Audit has **no** tag.
- Attachments show as file cards.
- The composer supports @ mentions and has a "How it works" link.

**Activity tab:** a timeline (component 15) with a "Newest first" toggle.

---

## 5. List inside a detail page (dispute docket pattern)
Screens: `screens/05-docket-pinned-bar-and-pager.png`, `06-docket-filter-dropdown.png`.
Code: `snippets/behaviours.js`.

**One list.**
- No Open/Resolved sections and no divider between them.
- Resolved items sort to the end, whatever the sort.
- Escalated items stay in the open part.

**Sticky bar:**
- Checkbox (select all open)
- **Disputes [24]**, or [15 of 24] while filtering
- 32px gap, then search ("Search invoice # or charge"), Status, Exception, Sort
- "× Clear all" when anything is active

Search, filters and sort show on **every** record, even one with a single item. The options come from the record's own content.

**Pager:**
- 10 per page by default.
- It is hidden at first and slides in from the bottom once the bar pins (only when there are more than 10 results).
- At the same moment, Ask Freehand moves up. When the bar unpins, both reverse.
- The pager is attached to the column's bottom edge: measured, never a fixed offset.

**Minimum space:**
- The list always keeps just enough height for the bar to reach its pinned position: visible column height − pinned tabs − column bottom padding.
- It is measured from real elements and re-measured on resize, so it works on any screen size.

**No jumps:**
- A search, filter, sort, page or rows-per-page change made while the bar is pinned keeps the bar in place, with results starting right below it.
- Opening another record starts it at the top.
- Re-renders keep the pinned and folded-totals state.

---

## 6. Content rules
- **Sentence case** for every label: nav, titles, buttons, columns, tabs, filter values, exception names. Proper nouns and acronyms keep their capitals (GL, SCAC, Freehand Audit, DHL Express).
- **No AI wording:** no "agent", "AI", "recommends" or "recommendation".
  - Use "Suggested", "suggested action", "N to review".
  - Freehand Audit gets no "Agent" or "Automated" tag.
- **Plain, short sentences:**
  - No em dashes in sentences ("—" is only the empty-cell value) and no semicolons.
  - Say what happens: "Escalated for internal review. Nothing is paid while it is open."
- **Names, not codes:** "Rate overcharge", not RATE_OVERCHARGE. Drop rule codes in brackets.
- **Fixed terms:**
  - **Dispute dockets** (nav, page, breadcrumb)
  - **Disputes** (the lines inside a docket)
  - **Resolved**, not "Settled". This is pending Utsav's confirmation.
  - **Partly resolved**
  - Open · Escalated · Resolved
  - Outcome labels as in production ("Accepted audited amount", "Accepted as billed", "Invoice returned", "Partial settlement")
- **Amounts:** 2 decimals, then the currency code in small grey ("1,025.87 SGD"). Use tabular numbers.
- **Dates:** "Aug 12" in running text; "Aug 12, 2026" plus the time in timelines.
- **Placeholders** describe what to type: "Search invoice # or charge".

## 7. Behaviour rules
- **Don't invent patterns production doesn't have.** Before adding a component or column, check production (`reference/production-freehand-studio.md`, or the repo itself). If something is missing, ask.
- **The page never jumps on click.** Any UI state that changes layout (folded totals, pinned bar, minimum height) is carried through re-renders.
- **Links to other pages open in a new tab,** showing a filtered list ("Docket: <name>" filter chip). With 1 item, they still open the filtered list (there's no detail page for that record type).
- **Tooltips** on anything truncated or iconic, wrapping at 320px.
- **Status filters are tabs.** List pages and detail pages use the same tab component (Details / Activity).
- **Same component, same look everywhere:** the footer pager, sort menu and dropdowns are identical across pages.
- **Layout is responsive by measurement,** not fixed pixel offsets. Check at 1280×720, 1440×900 and 1920×1080.
- **Hover and selected rows** share one neutral grey (`#F3F4F6`), not orange. Selected rows add a 2px orange left edge.
- **Icons** are Lucide outline at stroke 1.75 everywhere (toolbar 16px, nav 18px).
- **Line height 1.45 everywhere.** A `font:` shorthand without a line height resets it to the browser default, so always write `font:500 14px/1.45 Inter`. One exception: the Ask Freehand pill keeps the default line height (38px tall).
- **Don't set font smoothing** (`-webkit-font-smoothing`). Enhanced Studio leaves it at the browser default; `antialiased` makes all text look lighter and thinner on a Mac.
- **Actions sit top-right on every page and every overlay** (slide-outs, sheets): in the header row, right-aligned, before ✕. They never move to a footer or a second row when the panel narrows; the title truncates instead. Small centred confirm dialogs keep Cancel / Confirm bottom-right. Re-check after every change at 1280, 1440 and 1728.
- **Footer range text** ("1–20 of 46") is `#334155`, darker than the "Rows per page" label.

---

## 8. Decision log
| Decision | Why | Source |
|---|---|---|
| Status pills instead of tabs on list pages | Pills filter one list; tabs switch views (Murugesh: "pills ≠ tabs") | Murugesh, Oct 29 (superseded Nov 3) |
| Pills 28px | Larger pills looked heavy | Charles, Oct 29 (superseded Nov 3) |
| Status tabs replace status pills on list pages | Charles asked for tabs on the vendor Sourcing events list and for the rule to change everywhere. Reverses Murugesh's Oct 29 "pills ≠ tabs" call, so tell him | Charles, Nov 3 |
| No density control in the column picker | One density, fewer knobs | Charles, Oct 29 |
| Mode as its own column with icon + label (Invoices) | Faster scanning; icons pending Murugesh | Charles, Oct 29 |
| No Mode column on Dispute dockets | Production has none; Mode stays a filter | Charles, Oct 30 |
| Font scale 10/12/14/16/18 | Even steps; nothing smaller than 10 | Charles, Oct 29 |
| Totals card under Details, folding into the header on scroll | Totals needed more attention without losing height | Murugesh, Oct 29 (option C) |
| Totals as 3 equal columns | No empty space on the right | Murugesh, Oct 29 |
| Resolved total green, only when above 0 | Utsav asked for green; a zero isn't good news | Utsav, Oct 29 |
| "Dispute dockets" naming | Product renamed disputes to dispute dockets | Utsav, Oct 29 |
| "Partly resolved" (blue) | "Partial" was unclear; blue = still in progress | Utsav + Charles, Oct 29 |
| "Resolved" everywhere, not "Settled" | Matches production statuses | Charles, Oct 29 (Utsav to confirm) |
| Sentence case | Readability and translation; consistency | Charles, Oct 29 |
| No AI wording, no em dashes | "No AI lingo at all" | Utsav, Oct 29 |
| Freehand Audit with no tag | Name and logo are enough; production has none | Charles, Oct 30 |
| Ask Freehand ring orange-only | Orange-white-teal read as the Indian flag | Utsav, Oct 29 |
| Summary stroke orange-only | Matches the Ask Freehand ring | Charles, Oct 29 |
| "2 invoices" opens a filtered list in a new tab | Utsav asked for the jump; a new tab keeps the record open | Utsav + Charles, Oct 29 |
| Link style: grey + underline + new-tab icon | Blue was too loud; the icon alone isn't enough | Charles, Oct 30 |
| One dispute list, resolved last | The Open/Resolved split added noise | Charles, Oct 30 |
| Sticky bar with search, filters and sort on one row | Saves height; production shipment-list style | Charles, Oct 30 |
| Search/filter/sort on every docket | Consistency; options adapt to content | Charles, Oct 30 |
| Listing-page sort menu reused | Don't invent new components | Charles, Oct 30 |
| Footer pager slides in when the bar pins; Ask Freehand moves up | The pager is there when the list scrolls; nothing overlaps | Charles, Oct 30 |
| 10 per page inside a detail page | Shorter lists inside a record | Charles, Oct 30 |
| Measured minimum space under the list | Header can always pin; filtering never jumps | Charles, Oct 30 |
| Divider under the bar only while pinned | No extra line at rest | Charles, Oct 30 |
| Charges / exceptions as two lines, 240px | Single line was crowded; widen to read more | Charles, Oct 30 |
| Activity dates left-aligned, 84px column | Lines up with Details; no dead space | Charles, Oct 30 |
| Skill sidebar, footer and type samples re-measured from Enhanced Studio v106: 12px icon-label gap, 24px logo SVG, 22px navy workspace tile, 26px avatar row, 14px sidebar top, darker footer range, 30px rows-per-page button, 1.45 line height on every font shorthand, no font smoothing, header actions centred | A second side-by-side check of the GL coding page still showed lighter text, wider menu gaps and a bigger logo | Charles, Nov 3 |
| Skill table, icon and toolbar samples re-measured from Enhanced Studio v106: 16px cells, `#334155` header text, `#0F172A` cells, column lines, grey hover, 56px number + checkbox column, 38px SCAC slot, stroke 1.75, Save joined to the filter box | The GL coding page built from the old samples visibly drifted from the Enhanced Studio lists | Charles, Nov 3 |
| Card, upload card and attachment card added (components 20–22) | Built for the vendor event gating page and agreed one by one: one panel with dividers instead of three cards; no outer cards on a white page; the Ask Freehand PR #3684 attachment pattern (tile while attaching, compact card once sent); card widths 260–360px for 1–6 files | Charles, Nov 11, 2026 |
| Dispute dockets sort = 8 concepts × 2 directions in the listing sort menu: Initiated (newest/oldest first), Invoice date, Activity, Vendor reply, Disputed amount, Charge value, Disputes, Status. Production's 16 flat options map one-to-one; `updated_at` and `last_client_message_at` stay out of the menu | One row per concept with an up/down toggle is shorter than 16 rows | Charles, Nov 12 |
| Records with no value (e.g. no vendor reply yet) sort last in both directions | "Stalest vendor reply" shouldn't open with dockets the vendor never answered | Charles, Nov 12 |
| Rows that open a slide-out are clickable everywhere: pointer cursor, row hover, the open row keeps a 2px orange left stroke, and the sticky identifier column (Job ID, invoice #, lane name) underlines on hover | Charles on the vendor Upload center: "I can't click on the row"; the same rule applies to every list whose row opens a slide-out | Charles, Nov 11 |
| Text links turn brand orange (#FE6301, text and underline) on hover; dark grey with a grey underline at rest | Charles: hovering a text link should show the primary colour | Charles, Nov 11 |
| Date filters open one date panel (component 23, from freehand-studio InvoiceDateRangeFilter): presets with a check mark, Clear dates, Between / On or after / On or before, month calendar; "Any time" removed | Same date control on every page; presets overlap so it's one choice, shown with a check, not radios or checkboxes; "Any time" meant nothing | Charles, Nov 13 |
| Ask Freehand and the chat bubble dock only bottom-right or bottom-left; dragging dims the page and shows both docks as placeholders; release glides to the nearer one | Amaarshall (Nov 12 call): free placement can land mid-screen; Charles asked for the Wispr Flow-style overlay | Charles + Amaarshall, Nov 13 |
| Skeleton loaders match each page's layout instead of one shared skeleton | A shared skeleton changes shape when content arrives; a matching one doesn't jump | Charles, Nov 13 |
| Actions top-right on every page and overlay, never wrapping; the title truncates instead | Charles saw buttons drift and wrap after changes and asked for a standing rule | Charles, Nov 14, 2026 |
| Quote history: history icon button opens it; "Back to current quote" (list slide-out) or ✕ only (in-page record) leaves it; read-only; actions hidden | A Current / History icon switch was tried and dropped: in Lanes view it opened an overlay, so it didn't behave like a switch; clicking one icon twice to undo wasn't clear either | Charles, Nov 14 |
| Timeline selection reuses the lane-list card selection; connector dot to dot; no "Latest" tag in the timeline | The top card is always the newest; the tag crowded the card | Charles, Nov 14 |
| Version banner in blue; changed values marked by a blue dot before the label in a fixed slot | Orange is for selection and actions; a dot after right-aligned numbers moved the values | Charles, Nov 14 |
| Slide-out widens to fit a one-row header when Ask Freehand is open, up to 72px short of it; the name truncates beyond that | Keeps actions top-right without hiding details or charges | Charles, Nov 14 |
| Lane connector H: reference line + pinned selected lane, in both list views | Charles's reference image; six options mocked (joined tab, lane chip, reference line, notch, pinned lane, line + pin) and H scored highest (31/35): clearest link, same in both views, and the pin keeps the link when the lane scrolls away. Pin shows only arrow, lot and name | Charles, Nov 14, 2026 |
| Lanes view history opens in the page, not an overlay | An overlay covered the lane list and broke the connector; lot and route don't change between quotes, so the details column hides instead | Charles, Nov 14 |
| Lane search = the list-page filter bar: type for a vague search, pick a field and tick values for a precise one | Vendors either know the exact city/zip/lane or only a country, zip prefix or first letters; the old chip-type pop-up took 4 clicks plus Apply and needed them to know the field. Production takes one value per field; Charles said build without that limit | Charles, Nov 15, 2026 |
| Suggestions read "Any field contains X" / "<Field> is <Value>" (exact) / "<Field> contains X" (partial); counts inside current results; value panel only on hover | One grammar for every row, exact matches skip the checkbox hunt, counts that match what you will get | Charles, Nov 15, 2026 |
| Toolbar filter bar never grows: one line with "+N", opens as a pop-up over the content; 340 → 540px, right-aligned | Wrapping chips pushed the pills row down and left empty space beside them | Charles, Nov 15, 2026 |
| Lane statuses: Not quoted · Draft · Submitted · Counter requested · Opted out · Awarded (only after award) | Production: submit is per lane so not quoted exists; no saved draft; Quoted = submitted; Validated is only a moment before Submit | Charles, Nov 15, 2026 |
| Keep Validate as its own button until totals calculate live | Production computes the total (running costs etc.) on Validate; Silva wants vendors to see the right total before sending. Revisit after the tech upgrade (fold into Submit) | Charles and Silva, Nov 15, 2026 |
| Lane connector runs under pop-ups (masked), "Go to lane" only on hover | The line crossed the rank legend and vanished under the filter pop-up | Charles, Nov 15, 2026 |
| Every table gets the same header features (sort, swap, pin, resize, column picker), no tiers | Charles first agreed to three tiers, then reversed it the same day: every table should look and behave the same | Charles, Nov 15, 2026 |

---

## 9. Production differs (to decide)
Enhanced Studio is followed today. Each row needs a call: keep Enhanced, switch to production, or ask engineering to change production.

| # | Area | Enhanced Studio | Production (`freehand-studio` main) | Note |
|---|---|---|---|---|
| 1 | Label casing | Sentence case | Title Case ("Dispute Dockets", "Ready to Pay") | Decided: sentence case. Engineering to update production |
| 2 | Docket status label | "Partly resolved" | "Partial" | Decided: Enhanced |
| 3 | "Resolved" vs "Settled" | Resolved | Resolved (statuses) | Pending Utsav |
| 4 | Charge-level **Open** status colour | Amber (warn) | **Red** | Decide |
| 5 | Exception code badge | Neutral grey in cards; amber/red/blue on the Exceptions page | **Purple** for all codes (Incoterms orange), mono font | Decide. A purple version was tried in Seven Skins v59 |
| 6 | Exception names | Readable ("Rate overcharge") | Raw codes in the docket list ("TCB (RATE_OVERCHARGE)") | Keep Enhanced |
| 7 | Badge size and outline | 22px, 1px inset ring | 24px (md), no border | Decide |
| 8 | Warning colours | Amber `#FEF3C7` / `#92400E` | Yellow `#FEF9C3` / `#854D0E` | Decide |
| 9 | Danger red | Money `#B91C1C`, badge text `#991B1B` | Disputed amount `#D4183D`, badge text `#A3122F` | Decide |
| 10 | Button radius / secondary border | 6px / `#DCDFE4` | 10px / `#CBD5E1` | Decide |
| 11 | Primary hover | `#E85A00` | `#D84E00` | Minor |
| 12 | Table header | `#FAFAF9`, 12px, 600 | `#F1F5F9`, 12px, 500 | Decide |
| 13 | Table cell padding / text | 16px sides, `#0F172A` (the old 24px / `#1F1F1F` note was wrong) | 16px sides, `#334155` | Padding matches; text colour to decide |
| 14 | Filter dropdown | 36px, radius 6, solid orange count | 32px, radius 8, count pill `#FED7AA` / `#D84E00` | Decide |
| 15 | Current page in pager | White with orange bottom bar | Solid orange | Decide |
| 16 | Active tab | Dark text, orange underline | Orange text, orange underline | Decide |
| 17 | Tooltip | 12px, radius 6 | 11px, radius 8 (both wrap at 320) | Minor |
| 18 | Toast | Bottom centre, dark, ~4s | Top right, white card with colour bar, 6s | Decide |
| 19 | Inputs | White search box | Grey fill `#F3F3F5` | Decide |
| 20 | Mode icons | Icon + label | Text only, no icons anywhere | Pending Murugesh |
| 21 | Card radius | 10 / 12px | 14px (`rounded-xl`) | Decide |
| 22 | Mono font | ui-monospace / SF Mono | Geist Mono | Minor |
| 23 | Suggestions badge in the list | "N to review" | "N rec(s)" | Keep Enhanced (no AI wording) |
| 24 | Icon stroke | 1.75 (the old 2px note was wrong) | 1.75px | Matches |

---

## 10. Files in this skill
- `SKILL.md`: when to use the skill and the working rules.
- `DESIGN.md`: this reference.
- `snippets/tokens.css`: all tokens as CSS variables.
- `snippets/components.html`: the 27 components with markup and CSS; open it to see them.
- `reference/enhanced-studio-v106.html`: the full approved prototype (v106), for anything not in the snippets. Measure against it.
- `snippets/logo-full.svg` / `snippets/logo-mark.svg`: the real Freehand logo (24px tall in the sidebar) and the mark for the collapsed rail.
- `snippets/behaviours.js`: pinned bar, sliding pager, minimum space and anchoring for lists inside detail pages.
- `snippets/proposed-vendor-v2.css`: CSS for the proposed vendor V2 patterns in §11 (P1–P22). Not approved yet; use it only for vendor V2 / Procure work.
- `screens/*.png`: reference screenshots at 1440×900.
- `reference/production-freehand-studio.md`: the full production extract (tokens, every badge map, components, table columns) with file paths.

**Everything is inside this skill.** `snippets/components.html` now also covers the sidebar (17), list toolbar and filter bar (18) and column picker (19).

For anything else, `reference/enhanced-studio-v106.html` is the complete Enhanced Studio prototype as approved (v106). Open it in a browser to see any screen, and copy exact CSS or logic from it:

| Component | Function in `reference/enhanced-studio-v106.html` |
|---|---|
| Column picker | `colPicker()` |
| Filter bar with tokens and Save | `fxBar()` |
| Listing sort menu | `sortMenu()` |
| Footer pager | `pager()` |
| Sidebar | `v1Nav()`, `navItem()` |
| Toast | `toastHTML()` |
| Dispute detail page | `dkDetail()`, `dxTable()`, `dxConv()`, `dxTimeline()` |

The prototype's CSS is layered (later rules override earlier ones). When copying from it, check the computed style in the browser rather than the first rule you find.

---

## 11. Proposed: vendor V2 (pending design review)
These come from the Procure V2 vendor portal prototype (v198/199, Nov 2026). Use them for vendor V2 work, and say they are proposed when you do.
They are not part of the approved set until the design team reviews them. After review, each one moves to §2 (or is changed).
CSS for each is in `snippets/proposed-vendor-v2.css` under the same P-number; full specs are in the V1_Procure folder, `prototypes/vendor/handoff/components.md`.

| # | Component | Key rules |
|---|---|---|
| P1 | Event header | One row, 52px including its 1px `--fh-divider` bottom border (8px top, 36px line, 7px bottom; padding 8px 24px 7px). Title 16/600, truncates first. Buttons 32px, 10px gap, actions at the right end. Time left: clock icon + text, amber when closing soon, red when very soon. 1×20px dividers. Info icon (28×28 ghost) opens a 340px popover. Never wraps. An event side menu replaces the event tabs. |
| P2 | Lanes \| Table view switch | Two-button switch on the Bidding page. Buttons 28px, padding 0 10px, radius 6, 500 weight, 15px icon. Off `--fh-text-meta`, no fill; on white with a 1px `--fh-divider` ring. Default view stays lane by lane. |
| P3 | Danger button | Secondary button with a red outline, never a solid red fill. Border and text #D4183D; hover #A3122F on #FDECEF; focus 2px #D4183D outline, 2px offset. For Withdraw, Opt out, Reject rate match, Delete proposal, Decline, Discard. Replaces the primary in a confirmation dialog when the action is destructive. |
| P4 | Status pills (table toolbar) | Filter a bidding table by status, with a count. 28px, padding 0 10px, 6px label-to-count gap, radius 999, 13/500 `--fh-text-strong2`, count `--fh-text-meta`, 1px `--fh-divider`. On: `--fh-brand-ring` border, `--fh-brand-tint2` fill, `--fh-brand-text`. One on at a time (`role="tablist"`). Also carries quick filters ("Needs a fix (N)", "Rate match requested"). Brings pills back inside a page; list pages keep status tabs. |
| P5 | Counter-offer tag and chip | Counters are per charge. Tag: badge size (22px), #663892 on #F5F0FA, 1px inset #E8DDF3. "Counter-offer 1.90" or "Counter-offer on 2 charges", tooltip names the shipper and the charges, sits after the ceiling tag. Chip under the cell value: 11/500, padding 1px 6px, radius 4, same purple; as a button, hover #E8DDF3 / #4E2B72, focus 2px #7F46B0. Lanes view: the chip "C: 1.90" is followed by an "Apply" link (12/500, purple, underlined, 8px gap). Table view: the chip itself is the button and reads "Apply 1.90" on hover or focus (hover fill #E8DDF3, text #4E2B72). Apply copies that charge only into the bid field as a draft (toast "Counter copied as a draft"); nothing is sent until Submit. Locked or read-only lanes show the chip without Apply. Inside a lot, a base freight counter asks "Apply the counter-offer to the whole lot?". |
| P6 | Ceiling price tag | Badge size (22px, 12/500, radius 999), #A3122F on #FDECEF, no ring. One tag under the lane name (Lanes view and table slide-out), never on the charge row. "Ceiling price 2,450"; tooltip "Ceiling price on base freight, set by {shipper}. Base freight above it can't be submitted." |
| P7 | Bid amount field | 36px, 116px wide (120 in the tier editor), padding 0 10px, radius 6, `--fh-border-btn`, `--fh-sh-control`. "USD" prefix 12px `--fh-text-meta`; value 14/500, right-aligned, tabular. Focus: `--fh-brand` border + 3px rgba(254,99,1,.15) halo. Edited, not validated: #F59E0B border. Read-only: `--fh-bg-side`, value `--fh-text-faint`. Error: 11px #DC2626 hint under the field (right-aligned, max 220px), no red border; the same slot shows the ceiling and decrement hints while typing. In a table cell: no box, #FFF8EB fill, 33px input, 12px text; focus 2px inset `--fh-brand` ring on white; an error outlines and tints the whole cell, reason on hover. Clicking base freight opens P17. |
| P8 | Table compact density and simple mode | Compact density for bidding grids (FTL table view, LTL table, location charges, auctions): header 34px, 12/600 `--fh-th-text` on `--fh-bg-th`; rows 34px (33px inputs), 12px text (badges 11px); 12px cell padding, 16px on the first column; `--fh-col-line` lines; hover #F8FAFC, editable cells #FFF3E0; selected `--fh-brand-tint2`; last pinned column adds a 6px shadow. Default density stays as §2 #6. Simple mode (sort, fixed sticky columns, row click, actions; no drag, pin or resize) is built but unused: every table keeps the full feature set. |
| P9 | Stacked right-pinned columns | Every action column (`act`) sticks to the right. Several stack from the right edge in column order (Total, then Rate match); each `right` offset = the widths of the action columns after it. Default 140px. 1px `--fh-border` line on the left; compact tables add a 6px shadow. Header cells take the header fill, body cells stay white so content passes under them. |
| P10 | Side sheet (upload) | Fixed right, full height, 480px (base sheet 440px), capped at 100vw. 1px `--fh-divider` left edge + soft shadow; scrim rgba(15,23,42,.45). Header padding 16px 16px 16px 24px: small grey kicker ("Proposal 1") over an 18/600 title; Cancel and the primary action top-right. Body padding 16px 24px, 10px gap, scrolls. Slides in over .2s (none with reduced motion). Closes on scrim click and Esc. Upload stays disabled until a file is chosen ("Choose a file first"). One file per upload. Close control: see open point 8. |
| P11 | Confirmation dialog | Centred, 440px (min(440px, 100vw − 32px)), max height 100vh − 96px, scrolls. Padding 24, radius 12, 1px `--fh-divider`, shadow 0 20px 48px rgba(15,23,42,.18); scrim .45; fades in over .15s. Title 18/600, a question naming the action ("Withdraw your quote on {lane}?"). Body 14px `--fh-text-meta`: what happens and whether it can be undone. Optional lot box (`--fh-bg-side`, `--fh-border`, radius 8, "Show lanes"). Cancel then the action, bottom-right, 8px gap (the one overlay with bottom actions); danger outline for destructive actions. Disabled action carries a reason tooltip. Bulk: "N of M lanes will be …". |
| P12 | Lane card | Button, min 56px, padding 14, radius 10, 1px `--fh-divider`, 12px gap. Mode icon 16px in a 32px `--fh-bg-chip` circle. Name 14/500 truncates; second line 12px `--fh-text-meta`. Rank square 14px. Hover `--fh-row-hover`. Selected: no border, `--fh-brand-tint2`, soft shadow, wrapped by the lane connector (§2 #26). Tags: status, counter-offer, ceiling; demand tag 11/500 #B54708 on #FFFAEB, radius 4. `role="option"` + `aria-selected`. |
| P13 | Lot group | Lots bar 32px, sticky: "4 lots · 18 lanes" left, "Expand all / Collapse all" right. Lot header 34px, sticky under the bar: 16px chevron (rotates .15s), lot name 12/600 with .04em tracking `--fh-text-strong2`, a 1px `--fh-border` hairline filling the space, lane count 12px `--fh-text-meta` on the right. No box. Lanes 8px apart, indented on a 1px `--fh-border` guide line. First lot open. Lanes outside lots sit under "Independent lanes". Lot actions go through P11. The selected-lane pin stays inside its own lot. |
| P14 | Info banner | Padding 10px 12px, radius 8, 8px gap, 14px text (13px for lot and rate-match banners), 12px below, 16px `--fh-text-meta` icon. Neutral: `--fh-bg-chip`, `--fh-text-strong2`. Lot rules: bold title + one 12px grey line, numbers outside the sentence, 13px info icon with a tooltip on the right. Opted out: #EFF6FF, `--fh-info-ring`, `--fh-info-fg`; content under it dims to .55 and can't be clicked. Rate match requested #FFFAEB / #FEDF89 / #B54708; accepted `--fh-ok-*`; rejected `--fh-bad-bg` / `--fh-bad-ring` / #A3122F. |
| P15 | Lane marks (rank square, quote marks) | Before the lane name. Rank square 12px (14 in cards and the legend), radius 3: Highly competitive #12B76A, Competitive #FDB022, Non competitive #F79009, Requires revision #F04438; tooltip names it; nothing until the lane is ranked. Opted out: Lucide `ban` 14px #F04438. Quote mark (before submission, lot and independent lanes): 14px circle, validated #16A34A with a white 10px check ("Validated, ready to submit"), otherwise a 1.5px dashed `--fh-text-faint` ring. Square 12 + 8px gap = circle 14 + 6px gap, so names line up; a hidden placeholder keeps the slot. Legend opens from "What the colours mean". |
| P16 | Rate match (banner, tag, chip, column ✓ / ✕) | Banner: P14 variants. Tag "Rate match requested" #B54708 on #FFFAEB; accepted `--fh-ok-*`; rejected #A3122F on `--fh-bad-bg`. Rate match chip on linehaul. Lane mark 16px before the name, 6px gap: clock #B54708, tick #16A34A, cross #D4183D. Lanes view: Reject (P3) and Accept (primary) top-right. Table column: right-pinned after Total (P9), value + two 28×28 icon buttons (✓ / ✕) in a 76px slot, `--fh-border`, radius 6, 14px icon; ✓ hovers `--fh-ok-*`, ✕ hovers `--fh-bad-*` with #A3122F text; then an Accepted / Rejected tag. Both go through P11; a rejection can't be accepted later. Bidding opens on the first lane with an open request. |
| P17 | Suggestion panel | Opens on a click in the base freight field, under it (above it near the bottom of the screen). Right-aligned, min 230px, padding 4, radius 10, `--fh-border`, shadow 0 10px 24px rgba(15,23,42,.12). Options padding 8px 10px, radius 6, right-aligned: value 15/600, label 12px `--fh-text-meta` with a 13px info icon (tooltip shows the calculation). Hover and focus `--fh-bg-side`. "Suggested next bid" = current quote − decrement; a lane with no quote shows the ceiling read only ("the most you can bid"). Click a value to fill the field, or keep typing. `role="listbox"`. |
| P18 | Auction accept / decline | Two secondary buttons per lane, 28px, padding 0 10px, 12/500, radius 6, 14px icon, 6px gap, right-aligned. Chosen Accept: `--fh-ok-bg` fill and border, `--fh-ok-fg`. Chosen Decline: `--fh-bad-bg`, #A3122F text. Disabled, not chosen: `--fh-text-faint` on white; disabled, chosen: .7 opacity; reason on hover. Each answer is sent when clicked (no Submit); answers that lock (Japanese Decline, Dutch Accept) confirm first (P11); a toast confirms. Bulk answers use the bulk action bar. Lane status tones: Accepted ok, Declined bad, No action taken mute, Not participated warn, Taken by another carrier mute. The tone is fixed; its colour values depend on where it is used: Enhanced Studio pages use the Enhanced `--fh-ok-*` / `--fh-bad-*` / `--fh-warn-*` tokens, Procure V2 vendor pages use the V2 soft pairs those pages already use. |
| P19 | Busy state | Main actions (Save draft, Validate, Submit, Accept, Upload, dialog confirms) show a 14px spinner before the label, the button disabled with `aria-busy="true"` and a progress cursor, until the request returns (the prototype fakes about 700 ms), then the action completes (or P22 shows). The button's own icon hides while busy. |
| P20 | First-use empty state | When nothing exists yet: centred 48px `--fh-bg-chip` circle with a 24px `--fh-text-meta` icon, title 16/600, one 14px grey line (max 480px), optional primary button 12px below. Padding 48px 16px (96px when it fills the page). "No sourcing events yet" / "When a shipper invites you to an event, it appears here." Filters with no results keep the one-line "No … match" text. |
| P21 | Page-load error | P20's layout with `role="alert"` and a `cloud-off` icon, in place of the page body: "This page didn't load" / "Check your connection and try again. If it keeps happening, contact support." + primary "Try again". |
| P22 | Failed-save toast | Error toast "Changes not saved" · "Your draft is still here. Try again in a moment." when Save draft, Validate or Submit fails after P19. Nothing in the draft changes. Uses the toast as built (style still open, see below). |

### Proposed behaviour rules
- **Esc and focus.** Esc closes the topmost dialog or slide-out only, the same as its Cancel or Close: a dialog over a lane panel closes first, then the panel. When a dialog opens, focus moves to its primary button (the danger button for destructive actions).
- **Working panels are the exception to the overlay rule.** Overlays close on an outside click. Ask Freehand and the chat panel don't: they stay open on an outside click and close with ✕ or Esc.
- **Busy state on main actions.** Every main action shows P19 before it completes, so a click is acknowledged and can't be sent twice.
- **Attachments on invitation questions.** Up to 5 files per question, each under 20 MB, any file type (as production). Helper text "Up to 5 files, 20 MB each". Too big: toast "File too large" ("{name} is over 20 MB. Each file can be up to 20 MB."). At the limit: toast "Upload limit reached" ("A question takes up to 5 files. Remove one to add another.").
- **Heights step in even numbers.** 22, 28, 30, 32, 34, 36, 38, 40, 44, 52. No 53 or 55. Count the border in the height: the event header is 52px including its 1px border.

### Proposed decision log
| Decision | Why | Source |
|---|---|---|
| Counter-offers are per charge: one purple tag style on each countered charge; click fills that charge only; Counter-offer column removed | Follows production | Charles, Nov 16, 2026 |
| Auction Accept / Decline as two small outline buttons per lane, the chosen one tinted; locked lanes disabled with the reason on hover; each answer sent when clicked, no Submit | Option A of the mocked choices; no Submit follows production | Charles, Nov 17, 2026 |
| Ceiling price = one tag under the lane name, not on the charge row; Counter-offer tag sits after it and the C flag is dropped | One place to look; the Counter-offer tag covers base and other charges | Charles, Nov 23, 2026 |
| Errors at cell level in tables: the whole cell is outlined and tinted, reason on hover; table Validate adds a "Needs a fix (N)" pill and a toast | Points at the exact cell to fix | Charles, Nov 23, 2026 |
| Clicking base freight opens the suggestion panel (current quote − decrement); unquoted lanes show the ceiling read only | Layout from Charles's sample screenshot | Charles, Nov 23, 2026 |
| Lot group layout D2: chevron, lot name, hairline, lane count right; lanes on a guide line; lots bar and lot header pinned | Picked on the lot header comparison page | Charles, Nov 23, 2026 |
| Lot rules use the existing grey info banner; no new component or stat tags | Reuse before adding a pattern | Charles, Nov 23, 2026 |
| Lot and independent lanes show the quote mark before submission, the rank square after | Same mark on every lane | Charles, Nov 23, 2026 |
| Rate match in the Lanes view: banner, "Rate match requested" tag, chip on linehaul, Reject (red outline) and Accept top-right, both confirmed; lane list marks clock / tick / cross | Built from the current V1 vendor screens (PPA-4939) | Charles, Nov 23, 2026 |
| Rate match column after Total, pinned right; several right-pinned columns stack from the right in column order | The answer stays in view while the table scrolls | Charles, Nov 23, 2026 |
| Table sizes: default 40 / 44px, 14px, 16px padding (24 outer); compact for bidding grids 34px header and rows, 12px | One size standard for every table | Charles, Nov 23, 2026 |
| Simple table mode kept available but unused; every table gets sort, drag, pin, resize and the column picker | Design for the end state | Charles, Nov 23, 2026 |
| Event header 52px including its border; heights step in even numbers (no 53 or 55) | Sizes stay on one even scale | Charles, Nov 23, 2026 |
| Esc closes the topmost dialog or slide-out (same as Cancel); a dialog's primary button takes focus when it opens | Back out or confirm from the keyboard | Charles, Nov 24, 2026 |
| Ask Freehand and chat stay open on an outside click; ✕ or Esc closes them | They are working panels, used next to the page | Charles, Nov 24, 2026 |
| Main actions show a busy state (small spinner, disabled until the request returns) before completing | Shows the click registered and blocks a second send | Charles, Nov 24, 2026 |
| First-use empty states: icon, title and one line ("No sourcing events yet") | Says what will appear and when | Charles, Nov 24, 2026 |
| Page-load error: "This page didn't load" with "Try again" | Says what to do next | Charles, Nov 24, 2026 |
| Failed save toast: "Changes not saved" · "Your draft is still here. Try again in a moment." | Says nothing was lost | Charles, Nov 24, 2026 |
| Invitation attachments: up to 5 files per question, each under 20 MB, any type; "File too large" / "Upload limit reached" toasts; helper "Up to 5 files, 20 MB each" | Follows production | Charles, Nov 24, 2026 |
| Status colours approved: auction Accepted green, Declined red, No action taken grey, Not participated amber, Taken by another carrier grey; Reports Cancelled grey; colour values follow the product the page belongs to (Enhanced tokens on Enhanced pages, V2 soft pairs on Procure V2 pages) | Closes the open colour sign-off (new badges need Charles's OK) | Charles, Nov 24, 2026 |

### Open for the design team
1. **Danger red:** production #D4183D / #A3122F or Enhanced `--fh-money-held` #B91C1C / `--fh-bad-fg` #991B1B (§9 row 9). Then add it as a token.
2. **Counter-offer purple:** add a `co` tone or reuse an existing one.
3. **Non-token reds and ambers** (#FDECEF, #FFFAEB, #B54708, #FEDF89, rank colours): map to the bad / warn tones or add tokens.
4. **Toast style:** built in production's style (top right, white, colour bar, 6s); Enhanced §2 #13 is bottom centre, dark, about 4s (§9 row 18).
5. **Two column-picker variants:** `gt-cp` (tick + pin) and `tvc-pop` (drag + tick), both 14px radius. Enhanced has one picker with find, tick, drag and pin.
6. **Off-scale 11 / 13 / 15px:** compact-table badges, chips, pills, banners, panel section titles, filter input, `bx-btn`, suggestion value. Move them to 10 / 12 / 14 / 16?
7. **Header fill and row hover:** the default table uses #F8FAFC for both; Enhanced uses `--fh-bg-th` #FAFAF9 for headers and `--fh-row-hover` #F3F4F6 for hover.
8. **Side sheet close control:** the upload sheet closes only with "Cancel" (plus scrim click and Esc), with no ✕. The overlay rule (§ Actions) says Close / ✕ top-right. Add a ✕, or allow Cancel-only on sheets with one primary action?
