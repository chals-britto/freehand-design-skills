# Organisms inventory: DS V2 – Organisms (V1 / Pando content)

Figma file `fYULgtmiblAXtbHsoVL1Yf`. Read-only pass, 2026-10-27. One `use_figma` read per page. All 7 content pages were read; Cover Image (1007:731) was skipped.

## Summary

| Page | Page id | Status | Top-level sets and components | Loose frames | Docs |
|---|---|---|---|---|---|
| Action | 2383:3802 | 🟡 | 3 | 1 | `.documentation` instance + 2 headings |
| AI Chat | 2814:5163 | 🟡 | 29 (15 in section "Freehand - ai - component") | 4 (2x "AI chat", "Tip", section) | "Tip" frame, no `.documentation` |
| Menu | 32:0 | 🟢 | 13 | 3 (2x "New Main Menu" frames, "Frame 1919") | none |
| Modals | 32:443 | 🟡 | 2 | 0 | `.documentation` + example instances (Dropdown Select, Notes) |
| Panel | 2116:447 | ✏️ | 6 | 0 | `.documentation` + 2 headings |
| Slide out | 0:1 | 🟡 | 2 | 0 | `.documentation` |
| Subheader Menu | 2263:700 | 🟢 | 2 | 2 ("Frame 482908", "Dropdown Subheader") | `.documentation` |

- **7 pages → 15 build items → 3 batches.**
- The file has **no top header or app-bar page**. The only "Header" is the panel header (2943:8187) on the Panel page.
- Remote dependencies are marked `*` in Figma, meaning they come from the Atoms or Molecules libraries. These are the molecule-level ones organisms rely on: **Button Group, Tab Group / .Tab, Input - Text / .Base Input, Text Area, Text Input Field, Navigation/Calendar-Input, Navigation/GeoFence-Input, Misc/Add-Attachment, Filter Tag, Table Cell, Label Readonly Text, Skeleton / .Skeleton Block, Bubblechat, Typing Component-2, Pi-Avatar / Pi-With Halo, Text Avatar / Icon Avatar / DP, Header-Logo/Apps, Global shipment.** The `review/molecules-inventory.md` file did not exist at the time of this pass.
- These are already built as atoms: Button, Tooltip, Scrollbar, Radio, Tag, Icons (Indicator Icon/*, Navigation/*, Menu/*, System-Status/*, refresh-line, 10px).
- Size scale: **S** means one simple set; **M** means 2-4 sets or about 10 variants; **L** means a multi-level set or many sub-parts; **XL** means a large composite with many dependencies.

## Batch 1: navigation shell

| id | name | page | nodes | variants | uses | size | notes |
|---|---|---|---|---|---|---|---|
| side-nav | Side Nav (icon rail) | 🟢 Menu 32:0 | Side Nav 2985:5095, Side Nav Single 2985:4858 | 1 + 2 | Global shipment*, Indicator Icon/* (Cost, Cartons, Details, Load-Material, Sustainability, AI) | S | 40px collapsed rail. Build it first as the page-shell spine. |
| main-menu | New Main Menu (3-level nav + fly-out) | 🟢 Menu 32:0 | New Main Menu 2280:1704; .Menu-Item 803:709 (3v); .Fly Out 2459:5585; .Secondary menu 2379:6919 (5v); .Secondary menu/Arrow/Default 2459:5420; .Secondary menu/Arrow/Hover 2459:5423; .Menu-Heading 2455:5079 (2v); .Third level menu 2448:4408 (2v); .Name 2282:4032; .Logout 2769:15877 (2v) | 9 (+ 17 sub-variants) | Menu/* icons (Close, Analytics, Data-Manager, Procure, Planning, TMS, Dashboard), Navigation/Right-Caret, Indicator Icon/Logout, Scrollbar*, Button*, Tooltip* | XL | 1520x2738 set. The page also holds 2 loose "New Main Menu" example frames. Its `.Menu-Item` is a different component from the one on the Panel page. |
| main-menu-legacy | Old Menu | 🟢 Menu 32:0 | Old Menu 38:994 | 1 | .Menu-Item (803:709), Menu/* icons, Navigation/Close-Tag | S | Legacy 240px menu. It reuses main-menu's `.Menu-Item`, so build it after main-menu. Low priority. |
| subheader-menu | Subheader Menu | 🟢 Subheader Menu 2263:700 | Subheader Menu 2263:3752; .Secondary menu items 2263:947 (6v) | 1 + 6 | Navigation/Right-Caret, Navigation/Dropdown-Arrow | M | Loose "Dropdown Subheader" frame shows usage. |
| left-menu-panel | Left Menu Panel (+ panel Header) | ✏️ Panel 2116:447 | Left Menu Panel 2127:3654 (4v); .Menu 2592:19102 (13v); .Menu-Item 2592:18253 (3v); .Third level menu 2592:19139 (4v); Header 2943:8187 (3v); .Swappable Content 2943:8249 | 4 (+ 24 sub-variants) | Tab Group*, .Tab*, Button Group*, Button*, System-Status/Selected-Input, System-Status/Warning-Circle, Navigation/Selected, Navigation/Dropdown-Arrow, 10px/Add | L | The page is still ✏️ (in progress). References a `.State` component that is not local to this page. Its Header is the only header organism in the file. |

## Batch 2: overlays and the start of AI Chat

| id | name | page | nodes | variants | uses | size | notes |
|---|---|---|---|---|---|---|---|
| modal | Modal | 🟡 Modals 32:443 | Modal 1312:877 (6v); .Swappable Content 2238:4148 | 6 | Button*, Button Group*, Navigation/Close-Tag, Input - Text*, .Base Input*, Text Area*, Primary*, Secondary* | M | 5 example instances, plus Dropdown Select and Notes demos on the canvas. |
| slideout | Slideout (drawer) | 🟡 Slide out 0:1 | Slideout 17:117 (8v); .Panel - Swappable with Local 2527:4746 | 8 | Button*, Button Group*, Navigation/Close-Tag | L | The set is 2677x2867 across 8 width/state variants. Its swappable panel slot pattern is shared with action-panel. |
| action-panel | Actions (inline action forms) | 🟡 Action 2383:3802 | Actions 2384:5702 (8v); Actions 3544:1036 (5v); .Panel - Swappable with Local 2528:1187 | 8 + 5 | Secondary*, Primary*, Text Input Field*, Input - Text*, .Base Input*, Misc/Add-Attachment*, Navigation/GeoFence-Input*, Navigation/Calendar-Input*, Button Group*, Button* | L | Two sets share the name "Actions": the older 1233x691 one and the newer 640x904 one. Decide which to build, or build both. |
| ai-chat-composer | Prompt / Chat Bar (composer) | 🟡 AI Chat 2814:5163 | Prompt 2819:1891; .Bottom Bar 2815:23806 (6v); Chat Bar 3991:14306 (6v); .send 2815:23819 (4v); .typing light 2815:24083 (9v); .typing dark 3540:14579 (9v); .Query Text - Swap if required 3052:12279; .typing dark/.Swappable Content 3541:14039 | 1 + 6 + 6 + 4 + 9 + 9 | Button*, Indicator Icon/Add, Indicator Icon/Arrow Up, Input - Text*, Table Cell*, Filter Tag*, Bubblechat*, Typing Component-2* | L | Chat Bar is the newer copy of .Bottom Bar. Prompt references a local "CT- Shipper" component that is not on this page. |
| ai-chat-bubbles | Chat bubbles, PI, Loader | 🟡 AI Chat 2814:5163 | Chat bubble 2817:5261 (10v); AI bubble 2808:4906 (2v); .button 2808:4899 (5v); PI 3542:14233 (6v); .Loader 3568:15030 (2v); Loader 4158:14459 (2v) | 27 | Pi-Avatar*, Pi-With Halo*, Text Avatar*, DP*, Header-Logo/Apps*, Skeleton*, .Skeleton Block Dark*, Indicator Icon/AI, Navigation/Dropdown-Arrow | M | `.Loader` and `Loader` are near-duplicates. |

## Batch 3: AI Chat composites

| id | name | page | nodes | variants | uses | size | notes |
|---|---|---|---|---|---|---|---|
| ai-chat-window | Chat / AI Chat window | 🟡 AI Chat 2814:5163 | Chat 2859:12233 (3v); AI Chat 3542:14373 (3v); Prompt (suggestion cards) 3572:14750 (6v) | 3 + 3 + 6 | ai-chat-composer, ai-chat-bubbles, Chat Bubble/* (User, AI, Loading), Navigation/New Tab, Navigation/Close-Tag, Button*, Icon Avatar*, Indicator Icon/* | L | Each set is 2240px wide (3 widths). A second set is also named "Prompt" (3572:14750), and it is suggestion-prompt cards. Depends on Batch 2. |
| ai-insights | Insight cards and Artifacts | 🟡 AI Chat, section "Freehand - ai - component" | .Insight_Card 4514:10895 (4v); .Insights 4514:10994 (3v); Artifacts 4514:13552 (2v); Action icon buttons 4524:7455 | 4 + 3 + 2 + 1 | Label Readonly Text*, Tag*, Skeleton*, .Skeleton Block Light*, Scrollbar*, Button*, Indicator Icon/* (Load-Material, Download, View, Cost, Records, Impact, Calendar) | L | Newer "Freehand - ai" section. |
| ai-sidebar | AI Side Bar | 🟡 AI Chat, section "Freehand - ai - component" | Side Bar 4514:11173 (4v); .Menu-Item 4514:11048 (3v) | 4 + 3 | Button*, Tooltip*, Navigation/Grid View, Navigation/Search-10px, Navigation/Dropdown-Arrow, Indicator Icon/AI, Indicator Icon/Pin | M | Chat-history sidebar. This is the third distinct `.Menu-Item` in the file. |
| ai-action-popup | Action popup, AI input, options | 🟡 AI Chat, section "Freehand - ai - component" | Action - popup 4514:13504 (2v); .Option 4514:10881 (2v); .Input 4514:13465 (3v); .Input - Text 4519:6595 (2v); .Responding_Text animation 4524:7918 (4v) | 13 | Radio*, Button*, Button Group*, Input - Text*, .Base Input*, Cursor/Typing (GIF)*, Navigation/Filter Arrow, Indicator Icon/Edit, ai-chat-composer (Prompt, .send) | M | `.Responding_Text animation` is a 4-frame animation and needs a motion decision. |
| ai-slideout-chat | Slideout Chat (full AI drawer) | 🟡 AI Chat, section "Freehand - ai - component" | Slideout  Chat 4514:9012 (4v, name has a double space) | 4 | .Option, .Insight_Card, .Input, Prompt, .send, Button*, Navigation/Close-Tag, Indicator Icon/* (Add, Impact, Menu) | XL | The set is 3340x800. It composes ai-insights, ai-action-popup and ai-chat-composer, so build it last. |

## Open points

- There is no top header or app-bar organism. Confirm whether the header lives in Molecules or elsewhere.
- Several names are duplicated: three different `.Menu-Item` components (Menu, Panel, AI), two `.Swappable Content` sets (Modals, Panel), two `.Panel - Swappable with Local` sets (Action, Slide out), and two `Prompt` sets plus `.Loader`/`Loader` on the AI page.
- Some references point at components that are not local to their page: `.State` (Panel) and `CT- Shipper` (AI Prompt).
