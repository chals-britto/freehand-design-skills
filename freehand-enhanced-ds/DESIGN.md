# Freehand V1 Enhanced Studio: design reference

Source of truth for building any Freehand V1 Enhanced Studio page.
Built from Enhanced Studio v103 (measured in the browser) and checked against `qatipl-freehand/freehand-studio` `main` (00e2705d7, 2026-11-03).

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
| Body, table cells, buttons | 14 / 400–600 | cells `#1F1F1F`, body `#0F172A` |
| Labels, meta, badges, table headers | 12 / 400–600 | `#64748B` |
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
  - status pills 28
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

Ready-to-copy markup and CSS for each is in `snippets/components.html` (19 blocks, including sidebar, toolbar and column picker). Open it in a browser to see them rendered.

| # | Component | Key rules |
|---|---|---|
| 1 | Buttons | Secondary is the default. One orange primary per page. The icon button turns orange with a count badge when something is set (sort, columns). |
| 2 | Status pills | List-page status filter: pills, not tabs. 28px, count inside, active in orange tint. |
| 3 | Badges, tags, count chip | Status badges carry tone. Exception tags inside cards stay neutral. The count chip sits next to section titles ("Disputes [24]", "[15 of 24]" while filtering). |
| 4 | Search and dropdown filters | One dropdown per field (Status, Exception…). Options show live counts that respect the search and the other dropdown. An active dropdown turns orange with a number. "Clear" sits inside the menu; "× Clear all" sits next to the controls. |
| 5 | Sort menu | Same as the listing pages: icon button with a "1" badge when set; "Sort by" list; the chosen row gets an ascending/descending toggle; "Clear sort" at the bottom. |
| 6 | Table | Header 40px, rows 44px, 24px side padding. Hover and selected share one highlight. Two-line cells: line 1 like any cell, line 2 grey 12px, each truncated; "+N" after two items. |
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
| 17 | Sidebar | 232px light sidebar with workspace switcher, "Search anything ⌘K", grouped nav, profile at the bottom. Keep every item. |
| 18 | List toolbar | Saved-filters button, filter tokens + search in one box, Save, sort icon button, columns button with count, Export. |
| 19 | Column picker | Find, tick to show, drag to reorder, pin; first column always shown; no density setting. |

---

## 3. List page pattern
Screens: `screens/01-list-invoices.png`, `02-list-exceptions.png`, `03-list-dispute-dockets.png`.

Top to bottom:
1. **Title row:** page title (24/700) and a one-line description (12px grey). Page actions sit on the right.
2. **Optional summary strip** (e.g. "22 open · 18 suggested actions · USD 22.3K disputed · Oldest 49 days").
3. **Status pills,** with counts. "More ▾" holds the overflow.
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
6. **Footer pager,** always visible on list pages. Default **20** rows per page on list pages, and **10** for lists inside a detail page.
7. **Bulk selection:** one common action bar at the bottom.

**Sidebar:** copy it from `screens/01-list-invoices.png` exactly, including "Agents", "Context graph" and "Clients". These are product names, not AI wording.

**Columns:**
- Follow production's column set and default widths. For a page not covered here, look up that page's columns in the repo (`frontend/src/app/dashboard/<page>`). If production has no such page, use the brief's columns and list them for Charles to confirm.
- Amounts in mixed currencies: show each in its own currency. Don't sort across currencies as if they were one number; ask how to sort (e.g. by USD equivalent).
- A column that duplicates the active grouping is hidden.
- Mode is a separate column (icon + label) on Invoices. It does **not** appear on Dispute dockets, because production has no Mode column there; Mode stays as a filter.
- Vendor shows the SCAC in mono grey, then the name.
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
- **Status filters are pills, not tabs.** Tabs are for switching views of one record (Details / Activity).
- **Same component, same look everywhere:** the footer pager, sort menu and dropdowns are identical across pages.
- **Layout is responsive by measurement,** not fixed pixel offsets. Check at 1280×720, 1440×900 and 1920×1080.
- **Hover and selected rows** share one highlight colour.

---

## 8. Decision log
| Decision | Why | Source |
|---|---|---|
| Status pills instead of tabs on list pages | Pills filter one list; tabs switch views (Murugesh: "pills ≠ tabs") | Murugesh, Oct 29 |
| Pills 28px | Larger pills looked heavy | Charles, Oct 29 |
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
| 13 | Table cell padding / text | 24px sides, `#1F1F1F` | 16px sides, `#334155` | Decide |
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
| 24 | Icon stroke | 2px | 1.75px | Minor |

---

## 10. Files in this skill
- `SKILL.md`: when to use the skill and the working rules.
- `DESIGN.md`: this reference.
- `snippets/tokens.css`: all tokens as CSS variables.
- `snippets/components.html`: the 19 components with markup and CSS; open it to see them.
- `reference/enhanced-studio-v103.html`: the full approved prototype (v103), for anything not in the snippets.
- `snippets/behaviours.js`: pinned bar, sliding pager, minimum space and anchoring for lists inside detail pages.
- `screens/*.png`: reference screenshots at 1440×900.
- `reference/production-freehand-studio.md`: the full production extract (tokens, every badge map, components, table columns) with file paths.

**Everything is inside this skill.** `snippets/components.html` now also covers the sidebar (17), list toolbar and filter bar (18) and column picker (19).

For anything else, `reference/enhanced-studio-v103.html` is the complete Enhanced Studio prototype as approved (v103). Open it in a browser to see any screen, and copy exact CSS or logic from it:

| Component | Function in `reference/enhanced-studio-v103.html` |
|---|---|
| Column picker | `colPicker()` |
| Filter bar with tokens and Save | `fxBar()` |
| Listing sort menu | `sortMenu()` |
| Footer pager | `pager()` |
| Sidebar | `v1Nav()`, `navItem()` |
| Toast | `toastHTML()` |
| Dispute detail page | `dkDetail()`, `dxTable()`, `dxConv()`, `dxTimeline()` |

The prototype's CSS is layered (later rules override earlier ones). When copying from it, check the computed style in the browser rather than the first rule you find.
