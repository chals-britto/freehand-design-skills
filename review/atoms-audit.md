# Atoms audit — DS V2 – Atoms (S21sFFHjfc3XvGDAAYvA49) vs Pando DS V1 kit

**Date:** 2026-10-27 · **Method:** one read-only `use_figma` call per page (23 pages), plus one screenshot of `Label Readonly Text`. Every COMPONENT_SET and every COMPONENT not inside a set was listed, then checked against the node ids and the "Not adopted" sections of `components/*.md` and against `components/icons/icons-data.js`.

## Summary

- **Pages:** all 23 pages read. The file has no pages beyond the 23 in the brief.
- **Components found:** 284 (Icons page 191, all other pages 93).
- **Covered by the kit:** 228. These are the 37 built sets/components on the component pages, plus all 191 Icons-page items (the 187 icon families in the manifest, plus 4 same-name duplicates: Menu/FAP, Menu/Planning, System-Status/Warning, and the old Header-Logo/Apps 112:47, which is listed in Not adopted).
- **Uncovered:** 4 class A · 17 class B · 2 class C · 36 class D (59 total).
- **Pages with no gap:** Cover, Foundation-Colors, Avatars, Badges & Callouts, Breadcrumb, Checkbox, Dropdown, Radio Buttons, Scrollbar, Tags and Toast are fully covered. Icons is too: 430 exported, and the remaining variants are deliberate exclusions (Header-Logo deprecated ×3, Movement Type OLD ×2, Add-Attachment raster ×2).
- **Most important gap:** the open dropdown **menus** on the Inputs page (`Dropdown list` 4096:7204, `Dropdown Light` 3154:2534, `.Dropdown Dark` 3380:4191). They are counted as class D because input.md lists them under Not adopted with the note "Reviewed as their own component". But the Dropdown kit (dropdown.md) only built `Filter Dropdown Options`, and dropdown.md already says the two menus need reconciling. So no published menu panel exists as its own kit component yet. Treat this as an open follow-up, not a closed exclusion.

## A — Missing atom

| Component | Figma node | Page | Variants | Why | Suggested action |
|---|---|---|---|---|---|
| Label Readonly Text | 3212:3376 | Foundation – Text & Text Styles | 2 (set, 208×128; normal + a faded/disabled row) | A reusable read-only key–value line ("Label Text : Information Text") for detail panels. It is the only published component on a foundation page. The kit has no read-only field display. tag.md uses the same name only as a text-style reference for the Medium tag. | Build as `readonly` (label + value pair, two states). Small and token-only. |
| Pi-Avatar | 7906:1025 | AI + Branding (section "Pando - Pi branding") | 6 (set, 1923×1031) | The AI (Pi) avatar mark used by AI surfaces. avatar.md covers Icon, Text and Comment Avatar only, and the button kit only references "Pi" inside AI Copilot Button. | Read the 6 variants. Add it to the Avatar kit as an AI avatar, or to a new brand page. |
| Pando-Logo | 8346:9246 | AI + Branding (section "Pando - Pi branding") | 6 (set, 1496×477) | The Pando wordmark/logo set. The kit has no Pando logo (the icons only hold Header-Logo/Apps Freehand + Pi). An instance (8388:1072, 74×21) sits on the page as used in headers. | Export as brand assets (SVG) with a small `brand` doc page next to the icons. |
| advanced-search | 9675:470 | Playground | 1 (component, 20×20) | A published icon component that lives on Playground, not on the Icons page, so the icon export never picked it up. | Confirm it is live. If so, move it to Icons in Figma and add it to `icons-data.js`. |

## B — Internal part

| Component | Figma node | Page | Variants | Why | Suggested action |
|---|---|---|---|---|---|
| .Base Input | 3262:3554 | Inputs | 1 (250×60) | Base field the Input sets are built on | None. Rendered inside `input.css`. |
| .Base Input | 3175:1857 | Inputs | 1 (200×60) | Same, 200 wide | None |
| .Base Input | 3173:1612 | Inputs | 1 (200×60) | Same | None |
| .Base Input | 3174:1638 | Inputs | 1 (310×20) | Inline/label-only base | None |
| .Base Input | 3535:3678 | Inputs | 1 (310×16) | Inline base for Dropdown Select | None |
| .Track Content | 3212:3457 | Tooltips | 1 (214×120) | Swappable slot for the Info + Status (Map Tracking) tooltip style. tooltip.md says it was **not read (rate limit)**. | Read it when the tooltip's Map Tracking / Custom Content styles get finished. |
| .Swappable Content | 3212:3437 | Tooltips | 1 (170×76) | Custom Content slot of the tooltip, also not read | Same as above |
| .Button/Confirm | 3262:3517 | Buttons | 1 (24×24) | Confirm half of the Dual Icon button (button.md § Dual Icon) | None |
| .Button/Cancel | 3262:3516 | Buttons | 1 (24×24) | Cancel half of the Dual Icon button | None |
| .arrow-right | 10888:1756 | Buttons | 4 (74×131) | Arrow of `Show more`. button.md notes its placeholder state names "State3/State4". | None |
| .Base (set) | 10239:8824 | Status | 3 (180×222) | Base set behind `#Status` | None. Rendered by `status.css`. |
| .Base | 3205:3008 | Status | 1 (140×20) | Older base part of `#Status` | None |
| .Swappable Label | 3218:3689 | Toggle | 1 (40×14) | Label slot of the switch | None |
| .Icon Base | 3231:4109 | Toggle | 1 (54×54) | Cell of `.Icon Base Toggle` (Icon Tab) | None |
| .documentation | 2999:1144 | Playground | 1 (1416×298) | Documentation template used on every atoms page, not UI | None (tooling) |
| .Documentation - Variation Examples | 2998:1137 | Playground | 1 (659×298) | Documentation template | None |
| .Documentation - Usage | 2998:1136 | Playground | 1 (737×290) | Documentation template | None |

## C — Belongs elsewhere

| Component | Figma node | Page | Variants | Why | Suggested action |
|---|---|---|---|---|---|
| Freehand-Logo | 10608:959 | AI + Branding (page level) | 3 (173×164) | A Freehand (V2 brand) logo, not V1. The 3 variants very likely match `Header-Logo/Apps` Freehand Logo / No Bg / with Bg, which are already exported as `logo-apps-freehand-*`. | Confirm it is a duplicate. If it is, no action. Otherwise it belongs with V2/Studio brand assets. |
| Pi-With Halo | 10687:255 | AI + Branding (section "Pando - Pi branding") | 2 (1100×2180) | A large brand illustration of Pi with a halo, not a UI atom | Keep as a brand asset. Only export it if a product screen needs it. |

## D — Deliberately excluded

| Component | Figma node | Page | Variants | Why | Suggested action |
|---|---|---|---|---|---|
| Dropdown list | 4096:7204 | Inputs | 6 | input.md Not adopted ("Dropdown parts … reviewed as their own component"). Not built as its own menu; dropdown.md built only `Filter Dropdown Options`. | **Follow up:** build the menu panel (list, table, header and custom-add parts) as part of Dropdown. |
| Dropdown Light | 3154:2534 | Inputs | 6 | Same note. dropdown.md: "the two menus need reconciling". | Reconcile with `Filter Dropdown Options` |
| .Dropdown Dark | 3380:4191 | Inputs | 4 | Same note | Same as above |
| .Dropdown Option | 3418:3343 | Inputs | 11 | Same note | Part of the menu follow-up |
| .Dropdown Option | 4096:4146 | Inputs | 7 | Same note (second option set) | Same as above |
| .Header | 4096:3673 | Inputs | 6 | Same note | Same as above |
| .Table Cell | 4096:4133 | Inputs | 3 | Same note | Same as above |
| . Toggle | 4232:6750 | Inputs | 2 | Same note | Same as above |
| .Custom Add | 4644:6619 | Inputs | 2 | Same note | Same as above |
| .Blinking cursor | 3196:1721 | Inputs | 2 | Same note | None |
| .arrow-right | 2358:950 | Accordion | 2 | accordion.md: built as an accordion part | None |
| .arrow-left | 2359:867 | Accordion | 2 | Same | None |
| .Panel - Swappable with Local | 2950:1132 | Accordion | 1 | Same | None |
| Additional Info - Swappable with Local | 2961:1548 | Accordion | 3 | Same (built as the "With Additional Details" slot) | None |
| Third Level Accordian | 7679:4651 | Accordion | 3 | accordion.md: product-specific route/package rows | Belongs in Molecules, if anywhere |
| .Base | 10239:8823 | Status | 1 | status.md Not adopted | None |
| .Base Alt | 10180:1525 | Status | 1 | status.md Not adopted (secondary text "1/3") | None |
| .dot | 8576:1379 | Range | 1 | range.md: kept only as Dual Range's internal cell | None |
| AI Copilot Button/Pi/Default | 10611:1294 | Buttons | 1 | button.md: AI Copilot "Pi" standalone components, not built | None |
| AI Copilot Button/Pi/Hover | 10611:1310 | Buttons | 1 | Same | None |
| Dual Icon loose component (`Theme=Light, Type=Dual Icon, … Small`) | 5577:27704 | Buttons (inside "Frame") | 1 (24×50) | button.md: Draft Workspace / stray frames skipped. These are loose copies of Button variants outside the set. | None. Could be deleted in Figma. |
| Dual Icon loose component | 5577:27713 | Buttons (inside "Frame") | 1 (24×24) | Same | Same |
| Dual Icon loose component | 5577:27720 | Buttons (inside "Frame") | 1 (24×50) | Same | Same |
| Tooltip/Text/1:00 … 12:00 (12 components) | 5376:10750, 10774, 10798, 10822, 10846, 10870, 10894, 10917, 10940, 10963, 10986, 11009 | Tooltips (Group 482126) | 1 each (180×72) | tooltip.md: doc copies of the `Tooltip` set | None |
| Header-Logo/Apps (old) | 112:47 | Icons | 4 | icons.md: older duplicate of 1282:548 | None |

Variant-level exclusions inside covered icon sets (not separate components): Header-Logo/Apps Transporter/Shipper/Consignee (deprecated), Status/Movement Type Import OLD / Export OLD, Misc/Add-Attachment Filled/Image (raster).

## Page notes

**Playground (362:38).** It is a scratch page. It holds 4 components (the 3 documentation templates and `advanced-search`) and about 40 instances (Status/Indent Type ×9, Status/Movement Type ×4, Status/Track ×4, Menu/FAP ×3, Menu/Shipments-Indents ×3, 10px ×5, plus single Menu and Indicator icons). The rest are 80+ loose icon drafts: frames, groups and vectors named eye / eye-off, sim, sim_card, delivered-icon, bid, ClipboardText, Import / Export 14px, 10px/Extend, 10px/Reassign, 10px/Download, share-square, Indicator Icon/Tolerance / Depot / History / Transit / Reached / Cancelled working copies, and four detached `#Status` frames. Only `advanced-search` is worth building. Everything else is a draft of an icon that already exists on the Icons page.

**AI + Branding (7902:1169).** The page has 4 top-level nodes: one section "Pando - Pi branding" (10608:860, 6737×4322), the `Freehand-Logo` set (10608:959), and two instances (`Pando-Logo` 8388:1072, `Freehand-Logo` 11187:260). The section holds the `Pi-Avatar`, `Pando-Logo` and `Pi-With Halo` sets, "Gradient logo 1" (7951:182) and several "ai-wand 1" raster frames. **No frame named "Core Colors" was found.** A name search across frames, sections and groups for colour/color returned nothing on this page. If a Core Colors swatch block exists, it is nested under a different name. The colour frames live on Foundation – Colors: Main Colors 162:49, Status/Highlight Colors 162:96, Accent Colors 162:133, Text & Border Colors 162:187, Dark BG Colors 162:206, Nimbus Colors 833:448, Linear Colors 2912:1200, Banners 4885:221, Shadow section 11386:30.

**Alerts (3039:1446).** Confirmed empty (0 children).

**Cover (2145:843).** No components. It holds the thumbnail frame, the "COMMON COMPONENT PROPERTIES" text, the Specifications and Structure sections, and a "Design System" frame.

**Foundation – Text (143:0).** Text-style specimens, Grid Styles frames (3736:3653, 5596:6555), a loose `.Base Input` instance, and the `Label Readonly Text` set (class A).

**Pages not in the brief:** none.
