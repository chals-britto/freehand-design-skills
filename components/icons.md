# Icons — Pando DS V1

**Status:** Built 2026-10-23 · no review yet — every published icon treated as Keep · **Figma:** DS V2 – Atoms › 🟡 Icons (page 17:18)
**Files:** `icons.css` (size + colour classes) · `icons/<name>.svg` (430 files) · `icons/icons-data.js` (manifest: name, Figma name, node id, family, size, colour, svg) · `icons.html` (searchable gallery)

## What it is
The icon library: every component and component-set variant on the Figma Icons page, exported as SVG (441 components on the page → **430 exported**, 11 not adopted). The page has no written description; families and sizes below come from the Figma frame names.

## Variants
Families (Figma frame → file prefix → count):

| Family | Figma frame | File prefix | Size | Style | Colour in Figma | Count |
|---|---|---|---|---|---|---|
| Indicator icons | Indicator Icons – 14px + 20px Stroke (3002:1276) + 7 page-level | `indicator-` | 14 · 20 | line | #234357 `--pando-dark` (six 20-only icons use #6CA2CA, off-token) | 183 |
| Status icons | Status Icons – 14px Solid (2928:1064) | `status-indent-type-`, `status-movement-type-`, `status-other-`, `status-track-` | 14 | solid | #2D0645 `--status-purple-dark` (a few #F94200, #FF8C54, #008D5E, #0D204A) | 40 |
| System status | Status Icons (3507:3328) | `system-status-` | 3×8 – 24 | solid | per icon | 21 |
| Action icons | Action Icons – 10px Line (2931:1068) | `action-` | 10 | line | #376F99 `--action-blue` | 56 |
| Navigation | Navigation Icons (3463:3207) | `nav-`, `inner-breadcrumb-arrow-` | 5×8 – 46 | solid / line | #234357, #A3A3A3, #515151, #0076DD … | 31 |
| Menu icons | Menu Icons – 20px Two Color (2928:1065, 6505:344) | `menu-` | 20 | line, two colours | #234357 + #0076DD (`--pando-dark` + `--pando-blue`) | 39 |
| Header icons | Header Icons (2053:759) | `header-icons-` | 24 (Pi-Studio 62×24) | solid | white / #CBD4D8 / #1FCD93, for the dark header | 9 |
| Header logos | Header-Logo/Apps (1282:548) | `logo-apps-` | 27×28 · 20 | brand | brand | 4 |
| File types | Misc/File-Types (112:26) | `file-` | 20×24 | solid | one band colour per type | 14 |
| Track & map | Track Icons (3463:3540) | `map-`, `location-type-` | 16 – 96 | illustration | full colour | 17 |
| Misc | page-level components | `misc-`, `keyboard`, `debit-card` | 7×11 – 71×31 | mixed | mixed | 16 |

Sizes (`icons.css`):

| Class | Token | Value |
|---|---|---|
| `.pds-icon--10` | `--icon-size-10` | 10px |
| `.pds-icon--12` | `--icon-size-12` | 12px |
| `.pds-icon--14` | `--icon-size-14` | 14px (default) |
| `.pds-icon--20` | `--icon-size-20` | 20px |
| `.pds-icon--24` | `--icon-size-24` | 24px |
| `.pds-icon--40` | `--icon-size-40` | 40px |
| `.pds-icon--native` | — | file’s own size (non-square icons) |

Family colours: `.pds-icon--indicator` (`--icon-indicator` → `--pando-dark`), `.pds-icon--action` (`--icon-action` → `--action-blue`), `.pds-icon--status` (`--icon-status` → `--status-purple-dark`).

## Naming
`<family>-<name>[-<variant values>][-<size>]`, kebab-case, from the Figma component (set) name plus its variant values. Examples: `Indicator Icon/Truck · Size=14px` → `indicator-truck-14`; `10px · Type=Download` (Action set) → `action-download`; `Status/Indent Type · Type=Road` → `status-indent-type-road`; `Misc/File-Types · Property 2=PDF` → `file-pdf`. `Size=14px`, `Size=14` and `Size=14 px` all become `-14`. Each icon’s Figma name and node id are kept in `icons-data.js` (`f`, `id`).

## Anatomy & spacing
Icons are exported at 1× from the component frame, numbers rounded to 2 decimals. No padding is added. 37 icons export a little larger than their frame because a vector overflows it (see Open issues); Collapse-Expand, List-Type and map markers include their shadow or rotation box.

## Colour (currentColor)
- **320 single-colour icons**: every fill and stroke used the same colour, so it was replaced with `currentColor`. They follow the text colour of their parent. The original Figma colour is kept in the manifest (`col`) and shown in the gallery.
- **110 multi-colour icons kept as Figma**: two-colour menu icons, file types, logos, header icons, toast state icons (white disc + glyph), info/question/warning circles, map markers and vehicles, gradient icons (trend arrows, breadcrumb arrow, Collapse-Expand, Pi-Studio active) and anything with a filter or mask.
- `currentColor` only works for **inline** SVG. In an `<img>` a single-colour icon renders black.

## Behaviour
Static. The gallery (`icons.html`) filters by name, family, size and colour type; clicking an icon copies its inline SVG (or the file path, switchable), confirmed with a Toast.

## When (not) to use
Only Figma frame names exist: Indicator 14/20 stroke, Status 14 solid, Action 10 line, Menu 20 two-colour. No written usage rules in Figma — none added.

## Accessibility
- Decorative icon next to a visible label: `aria-hidden="true"` on the wrapper, `focusable="false"` on the SVG.
- Icon-only control: name the control (`aria-label`), not the SVG. A status icon that carries meaning needs nearby text or `role="img"` + `aria-label` on the SVG (WCAG 1.1.1).
- Low contrast on white, kept as Figma for the accessibility pass: Header inactive #CBD4D8 (on the dark header it is fine), sort default #E7E7E7, drag handle #CBD4D8, input glyphs (search, calendar, time) #A3A3A3.

## Open issues
- Two different components named **Menu/FAP** (6514:7174, 1302:677) and two **Menu/Planning** (6505:733, 35:15). Both exported; the older node is `menu-fap-alt` / `menu-planning-alt`. Which is current?
- Two components named **System-Status/Warning**: 3×8 glyph (112:11 → `system-status-warning`) and 14×14 outline triangle (11251:2146 → `system-status-warning-14`).
- One-size-only Indicator icons: Dashboard, Edit, Ice-Chill, Round trip (14 only); GPS, App, Cancelled, Transit, Reported, Reached, Global shipment, Action (20 only).
- Off-token colours: #6CA2CA (six Indicator 20 icons), #0078DD (Doc file, Menu/Pay, Source marker — vs Pando Blue #0076DD), #404040, #9C9C9C, #9BA3A8, file-type greys #E2E5E7 / #B0B7BD and bands #F15642 / #B4D5FB, map #464DEE, marker gradients, logo colours, ≈60 greys in the two vehicle illustrations.
- 37 icons overflow their frame (e.g. History 14 → 15×14, Timeline 20 → 21×20, Tag 20 → 20×21, Menu/Reports → 20×22, Upload 10×9 → 10×10).
- Inline SVGs with gradients, clip paths or filters carry Figma `id`s (e.g. `clip0_98_57`); two copies of the same icon on one page share ids — harmless while identical, but avoid hiding the first copy.
- Figma naming inconsistencies (`Size=14px` / `Size=14` / `Size=14 px`; “Decending” in Navigation/Sort; `Property 1` keys). Layer names were not used for meaning.

## Not adopted
- Set **Header-Logo/Apps (112:47)** — older duplicate of set 1282:548; its “New Logo” equals Pi/Default.
- Header-Logo/Apps variants marked **Deprecated** (Transporter, Shipper, Consignee — 1282:549, 1282:570, 1282:591).
- Status/Movement Type **Import OLD** and **Export OLD** (111:2, 111:4) — replaced by Import / Export.
- Misc/Add-Attachment **Filled / Image** (3209:3491, 3212:2182) — each embeds a ≈600 KB raster photo, not a vector icon.
- Loose frames, groups, vectors and stray instances on the page (e.g. “ic:round-downloading”, “ant-design:loading-3-quarters-outlined”, “Indicator Icon/Package” frame, “Global Shipments”, “Gauge” group, “ai-wand 1”, “AI Icons”, “Notes”, screenshots, loose `Status/Indent Type` instances).

## Sources
Figma DS V2 – Atoms › Icons — https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=17-18
WCAG 2.2 1.1.1 Non-text content — https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html
