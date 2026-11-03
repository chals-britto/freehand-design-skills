# Molecules inventory — DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn)

**Date:** 2026-10-28 · **Method:** `get_metadata` for the page list, then one read-only `use_figma` call per page (20 pages, all read). For each page: every COMPONENT_SET and every COMPONENT not inside a set, with variant count, size, private prefix, and the main components of nested instances (sampled up to 120 per set, top 10). Nothing in Figma or the repo was changed apart from this file.

## Summary

- **Pages:** 20 (Cover + 19 content pages). All read.
- **Components found:** 127 sets/standalone components (42 of them on Empty States & Loaders).
- **Build items:** 35, in 7 batches of 5.
- **Pages with no components:** Cover (thumbnail only) and Attachments (8 loose frames, attachment-list designs). Attachments is kept as one small item (build from frames).
- **Status emoji on pages:** 🟢 Calendar, Empty States & Loaders, Header, Filter Row (OLD), Table · 🟡 Button Group, Comments, Conditions, Search · ✏️ Card, Dropdown, File Upload, List, Skeleton, Tabs · none: Attachments, Filter - To BE REVIEWED, Filter w/Metrics, Timeline.
- **Documentation:** no page has a written spec. Several pages carry a `.documentation` instance (Calendar, Comments, Conditions, Empty States, Header, Filter Row, Table) — likely a header card, read it when building. Empty States has the most loose text (209 nodes: category notes). Search has sample rule copy.
- **Reference / old sets (do not build as live components, use as reference):** `.List - OLD (REFERENCE)` 256:19, `Row - FOR REFERENCE` 104:363, `Table - FOR REFERENCE` 2379:13135, `Column Picker` 1:1043 on the List page (older than the Dropdown-page Column Picker), `Top Header Green - Exploration` 3358:1356, the whole Filter Row (OLD) page.
- **Duplicates to reconcile:** `.Table Dropdown` 2343:6642 vs `Table Dropdown` 2711:10723 (same 10 variants, private and public copy). Three different `.Swappable Content` components (Comments 5427:20724, Filter w/Metrics 4799:9478, List 3217:4896) — slot placeholders, not components to build.
- **Remote instances not traceable to a kit atom** (from another library, check before building): `Unit/Small`, `Rule`, `Multiselect`, `Circular Indicator` (Card/Settings, Event Timeline), `Filter` (Filter Row), `Filter Dropdown` (More Filters), `Header Icons` (Top Header), `Search Header`, `.Table Cell`, `. Toggle`, `.Active Toggle Tab` (Search set 4894:18073), `Cell Input Field` (Calendar), `Text Input Field` (Event Timeline).

Atom key used below: button, input (Input - Text / .Base Input / Input Tag / Multiselect Tag / Input - Dropdown Select), dropdown, menu, checkbox, radio, toggle (Toggle / .Switch Base), accordion, breadcrumb, badge, avatar (Icon Avatar / Comment Avatar), tag, status (#Status / Status/* / Priority / .Base), tooltip, icons (Navigation/*, Indicator Icon/*, Misc/*, System-Status/*, Menu/*, 10px, refresh-line), readonly (Label Readonly Text), brand (Header-Logo/Apps).

Sizes: S = 1 set or a few small variants, token-only · M = 2-4 sets or 10+ variants with atoms · L = large composite, many variants or depends on other molecules.

## Batch 1 — base molecules other molecules reuse

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| button-group | Button Group | 🟡 Button Group 2305:4669 | 3153:4370 | 2 | button, icons | S | Used by Chat Input Box, Subheader, Top Header, Filter Light/Dark, Search Section, List .Options in Right |
| skeleton | Skeleton | ✏️ Skeleton 4047:3492 | 4048:2868; .Skeleton Block Light 4047:3588; .Skeleton Block Dark 4069:1238 | 10 + 3 + 3 | none | S | Used by List Column. Light and dark blocks |
| tab-group | Tab Group | ✏️ Tabs 51:0 | 308:3318; .Tab 59:254 | 4 + 5 | none | S | Used by Search panel |
| dropdown-option | Dropdown Option | ✏️ Dropdown 2312:4660 | 3303:2663 | 5 | avatar, icons | S | Option row used by Search Input and .Search Dropdown. Check overlap with the dropdown and menu atoms before building |
| progress-indicator | Progress Indicator | ✏️ File Upload 2463:9238 | 3164:1340 | 12 | none | S | Standalone, no nested instances. Split out of File Upload so it can be reused |

## Batch 2

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| toggle-tab | Toggle Tab | ✏️ Tabs 51:0 | 2386:7366; .Individual Tab 2427:8105; .Toggle Base 2533:9614; .Option 3247:1197 | 13 + 3 + 2 + 4 | icons | M | Used by Subheader and Sort-1 |
| loader | Loaders | 🟢 Empty States & Loaders 77:4762 | 3133:1029 Loaders-Gif; 4626:2687 Loader-Box-Animation; 5095:331 Upload-Data-Animation; 4629:2697 Loader-Document-Processing | 4 components | none | S | Animated assets (GIF/animation). Likely export, not CSS |
| empty-state | Empty State | 🟢 Empty States & Loaders 77:4762 | 37 sets 2463:8699-8725, 2463:9228-9237; No File Uploaded - Small 2466:10306 | 37 x 2 + 2 | none | M | One layout, 37 illustration + copy pairs (240 or 248 wide). Build one template + illustration manifest. Small variant is used by File Upload. 209 loose doc texts on page |
| search-input | Search Input | 🟡 Search 60:273 | 2419:10052; .Search Dropdown 2464:8997 | 5 + 1 | icons, avatar, dropdown-option | M | Used by Calendar, Filter Light, .group light, Search chat. Needs dropdown-option |
| timepicker | Timepicker | 🟢 Calendar 138:494 | 3447:624 | 1 | button, input | S | Standalone component on the Calendar page |

## Batch 3

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| calendar | Calendar | 🟢 Calendar 138:494 | 164:3009; .Single Date 2353:7563; .Weekdays & Weeks 2353:9160; .Date Selector 1935:4981 | 11 + 12 + 6 + 2 | button, icons, input (Cell Input Field, remote), search-input | L | 466 nested instances. Has .documentation |
| comment-thread | Comments | 🟡 Comments 2305:4671 | Chat Comment 4420:6522; Comments 5425:20667; .Comment 2388:7828; .User Tag 5425:20692 | 2 + 4 + 4 + 2 | avatar, tag, input (Input Tag), icons | M | .Comment is reused by Chat Input Box |
| chat-input | Chat Input Box | 🟡 Comments 2305:4671 | 2394:7558 | 10 | button, button-group, tag, input, icons, comment-thread (.Comment) | M | 911x870 set |
| card | Card | ✏️ Card 77:4761 | Card 2339:6863; Card/Consignment 419:3564; Card/Settings 2339:5833 | 7 + 2 + 1 | tag, avatar, badge, input, icons, + remote Unit/Small, Rule, Multiselect, Circular Indicator | M | Card set is 2070x1390. Card/Settings uses remote parts not in the kit. Loose "Lane Card" instance |
| condition-builder | Condition | 🟡 Conditions 2305:4670 | 2384:6520 | 4 | input (Dropdown Select, Text), tag, icons | M | Rule rows (nests itself). Has .documentation |

## Batch 4

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| menu-panels | Subheader Menu + Sort | ✏️ Dropdown 2312:4660 | Subheader Menu 2312:5082; Sort-1 2312:5216 | 3 + 1 | radio, icons, status, toggle-tab | M | 17 loose frames on page (Sort-4, Sort Dropdown, Dropdown Subheader, Delivery Movement). Check against menu atom (in progress) |
| column-picker | Column Picker | ✏️ Dropdown 2312:4660 | Column Picker 3098:3179; Column Picker Advanced 6358:1771; .Column Toggle 3067:2277; .Column Toggle View Advanced 6356:2357; .Column Pin 3094:669; View Header 6356:2480 | 2 + 1 + 2 + 2 + 2 + 3 | toggle, checkbox, button, icons | M | Old Column Picker 1:1043 on List page is reference only |
| file-upload | File Upload | ✏️ File Upload 2463:9238 | 2466:10340 | 4 | button, readonly, icons, empty-state (No File Uploaded - Small) | M | Pair with progress-indicator |
| top-header | Top Header | 🟢 Header 0:1 | 423:77 | 4 | brand (Header-Logo/Apps), button (AI Copilot), button-group, remote Header Icons | M | Top Header Green - Exploration 3358:1356 (3 variants) is exploration, skip unless asked |
| subheader | Subheader | 🟢 Header 0:1 | 1:409 | 6 | button, button-group, breadcrumb, toggle-tab, icons | L | 1480x563. Many loose Subheader instances on page show usage. Has .documentation |

## Batch 5 — table and list

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| table-dropdown | Table Dropdown | 🟢 Table 76:339 | Table Dropdown 2711:10723 (+ private copy .Table Dropdown 2343:6642) | 10 | checkbox, input (Input Tag, Multiselect Tag), icons | M | Reconcile the two copies first |
| table-cell | Table Cell | 🟢 Table 76:339 | 2361:5601; .Text Content 2361:5594 | 33 + 2 | checkbox, input, icons, table-dropdown | L | 33 variants |
| table | Table | 🟢 Table 76:339 | Column 211:52; Row - FOR REFERENCE 104:363; Table - FOR REFERENCE 2379:13135 | 1 + 4 + 2 | table-cell | M | The Row/Table sets are reference compositions; build as a composed table pattern. Has .documentation |
| list-column | List Column | ✏️ List 1:870 | List Column 2479:10402; List-Data (Adjustable) 360:6; .Route 6199:2264 | 15 + 4 + 2 | input (Input Tag, Multiselect Tag), status, checkbox, skeleton | M | List Column nests itself |
| list | List | ✏️ List 1:870 | List 2478:9036; .Base List 2498:9649; .Options in Right 5417:2388; .Table Style 5447:3704 | 5 + 2 + 2 + 2 | list-column, button, button-group, checkbox, status, icons | L | .List - OLD (REFERENCE) 256:19 (14 variants) is reference only |

## Batch 6 — filters

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| filter-by | Filter By | Filter w/Metrics 3027:387 | Filter By 3127:5307; Dropdown Filters 3129:5578; More Filters 3047:11637; Data Selection Dropdown Filter 4481:3721; .Date and Time 3048:12081 | 14 + 1 + 2 + 2 + 4 | toggle, icons, tag, button, remote Filter Dropdown | M | Dropdown Filters also used on Table page |
| metrics-widgets | Metrics + Widgets | Filter w/Metrics 3027:387 | Metrics 3029:4841; Widget Group 3028:3470; Widgets 6025:2174; .Widget Type 3029:4839 | 11 + 5 + 9 + 1 | icons, button | M | |
| top-filter | Top Filter | Filter w/Metrics 3027:387 | 3103:8433; .Filter-Actions 3033:9089 | 5 + 1 | metrics-widgets, filter-by, button, status, icons | L | 1300x520. No status emoji on page |
| filter-row | Filter Row (OLD) | 🟢 Filter Row (OLD) 1:558 | Filter Row 4:276; .Filter-Button 2320:6326 | 2 + 2 | badge, icons, remote Filter | S | Page is marked OLD. Confirm it is still needed before building |
| search-advanced | Search Section + Search chat | 🟡 Search 60:273 | Search Section 61:377; Search chat 6764:2582; .Search_Menu 6763:2419 | 1 + 1 + 2 | input, button, button-group, search-input, icons | M | |

## Batch 7 — large and unreviewed

| id | name | page | nodes | variants | atoms used | size | notes |
|---|---|---|---|---|---|---|---|
| search-panel | Search | 🟡 Search 60:273 | 4894:18073 | 16 | tab-group, dropdown-option, button, input, checkbox, remote Search Header / .Table Cell / . Toggle / .Active Toggle Tab | L | 687x4780, 673 nested instances. Biggest set in the file |
| event-timeline | Event Timeline | Timeline 60:272 | 303:3265; .Timeline-SLA 432:3588; Timeline with Status-Tag 5618:5738 | 18 + 1 + 1 | tag, icons, remote Unit/Small, Text Input Field | M | Could move earlier: no molecule dependencies |
| location-timeline | Location Timeline | Timeline 60:272 | 5751:2574; .Leg Movement 5753:421 | 1 + 2 | readonly, icons | S | Could move earlier: no molecule dependencies |
| filter-panel | Filter Light / Dark | Filter - To BE REVIEWED 4304:2485 | Filter Light 4271:4345; Filter Dark 4227:2584; .group light 4216:5580; .group dark 4736:7858; .options light 4225:2352; .options dark 4736:7791 | 2 + 2 + 2 + 2 + 6 + 6 | checkbox, accordion, button, button-group, search-input, icons | L | Page name says "To BE REVIEWED". Confirm status before building |
| attachments | Attachments | Attachments 4999:9946 | no components; loose frames 4999:9962, 4999:9979, 5001:22732, 5001:71900, 5003:16361 | 0 | icons (Misc/Add-Attachment), tag | S | Built from loose frames only. Decide whether to componentise |
