# Empty State — Pando DS V1

**Status:** Built from Figma 2026-10-28, no review yet (all published sets treated as Keep) · **Figma:** DS V2 – Molecules › 🟢 Empty States & Loaders (77:4762)
**Files:** `empty-state.css` (template + component tokens) · `empty-state/data.js` (manifest, `window.pdsEmptyStates`) · `empty-state/*.png` (76 illustrations) · `empty-state.html` (live doc + searchable gallery)

## What it is
Empty State Placeholder. *(Figma `.documentation` › Overview)*
When there is no data provided, display for friendly tips. User tutorial to create something in fresh new situation. Empty states are often a chance to celebrate, educate, and inform people of what they can do next. *(Figma `.documentation` › Uses)*

In Figma the component is the **illustration only**: a 200 × 160 raster picture on a leaf-shaped backdrop. There is no live title or body text in any published variant.

## Variants
37 illustration sets + 1 small set, each with `Theme` = Light / Dark → **76 variants**. Full list (name, node ids, file, hidden text) in `empty-state/data.js`.

| Variant | Art size | Backdrop (baked into image) | Class |
|---|---|---|---|
| Theme=Light | 200 × 160 | `--border-grey` #EFEFEF | `.pds-empty.pds-empty--light` + `*-light.png` |
| Theme=Dark | 200 × 160 | #282833 (off-token, `--empty-state-dark-bg`) | `.pds-empty.pds-empty--dark` + `*-dark.png` |
| No File Uploaded - Small, Light / Dark | 40 × 40 | none (green file glyph #00FA89) | `.pds-empty.pds-empty--small` |

Sets: No Results Found · No Records · No Wallet Entries · 404 - Not Found · 502 - Server Error · No Comments · No Bids Found · No Deliveries · No Master Data · No Export Shipments · No Import Shipments · No Notes · No Lanes · No Indents · Add Locations · No Materials Uploaded · Location Master · Add Material to Optimise · No Tasks · No Events · No Transactions · Invalid Transaction · No Invoice · No Packed Items · Upload Lots-Lanes · No Pack Benches · No Clients · No Attachments · No Invoice Generated · No Indents for Billing · No SKU · Search Results · No Documents · Search · No Configuration · No Permission · Timeline · No File Uploaded - Small.

Four illustrations carry text drawn inside the picture (12px, #96617E): No Bids Found (“no bids found!”), No Deliveries, No Master Data, No SKU (Dark only, “No SKu”).

## Anatomy & spacing
- `.pds-empty` — flex column, centred, `margin-inline: auto`.
- `.pds-empty__art` — `<img>` 200 × 160 (`--empty-state-art-w/-h`); Small 40 × 40 (`--empty-state-small`).
- No padding, gap, radius or text styles exist in the Figma component. Component-set frames are 240 or 248 wide only because of canvas padding around the variants.

## Behaviour
None. Static image. Choose the Light or Dark file to match the surface it sits on.

## When to use
- When there is no data provided, display for friendly tips. *(Figma)*
- User tutorial to create something in fresh new situation. *(Figma)*
- Placement & convention: centre of the section, with descriptions that add useful and relevant additional information. *(Figma)*
- Three kinds *(Figma page note 4545:3587)*:
  - **Information-focused** — tell the user the container is empty, rather than letting them assume the system is broken; can be packed with onboarding content and other learning opportunities.
  - **Action-focused** — urge users toward actions that will fill up the space.
  - **Celebration-focused** — most rare; the empty state is a good thing and becomes success feedback.

## Accessibility
- The art is the only content of the Figma component. When it is shown without visible text, give the `<img>` an `alt` — use the set’s `hiddenText` from data.js (Figma’s own hidden copy). When visible text sits next to it, use `alt=""`.
- Text baked into four illustrations is not readable by assistive tech and does not scale.
- Contrast of the baked #96617E text: 4.24:1 on #EFEFEF (Light), 2.99:1 on #282833 (Dark) — both under 4.5:1.

## Open issues
- **No title / body / action in Figma.** The Figma documentation says “with descriptions”, but every variant’s “Empty State Text” layer is hidden and there is no text style for it. Needs a decision before any text is added.
- **Raster art at 1×.** The illustrations are image fills (photos, not vectors), so SVG export would only wrap a multi-MB bitmap. The PNGs were cut at 1× from a Figma page render; they look soft on 2× screens. A 2× export per variant (`download_assets` per node) is needed for production.
- **Edge fringe.** Transparent corners were made by removing the #FAFAFA canvas colour; a faint light edge may show on dark surfaces.
- Dark backdrop #282833 is not in tokens.css.
- Hidden copy is inconsistent in casing/spelling (“No SKu”, “No SEarch”, “no CLIENTS”, “NO PERMISSION”); “Search” and “Search Results” share the same hidden text “No SEarch”.
- Baked-in text contrast below 4.5:1 (see Accessibility).

## Industry gaps — not added
- Title + short body explaining why it is empty and what to do next — Carbon, Ant.
- Primary action button (tertiary when several empty states show at once) or link — Carbon; footer action — Ant.
- Text-only empty state when space is limited — Carbon.
- Simple image variant — Ant (`PRESENTED_IMAGE_SIMPLE`).

## Not adopted
- Hidden “Empty State Text” layers — kept only as `hiddenText` in data.js (not shown in Figma).
- “EMPTY STATE TYPES” category labels (Data, Results, Location, Shipments, PaymentS, Procurement, Material/Package/Container, Settings, Packing, Messages, Transactional, Documents), placed twice — set-to-category mapping not read.
- Colour-scale swatches (50–800 hex labels, groups 6338:*) — palette notes, not empty-state guidance.
- Loose instances 2398:10448, 2616:10210, 4658:497, 4658:773, 4658:752; screenshot 3726:62; loose groups/vectors 6338:*, 6340:829, 6371:*, 6384:322 (404/503 illustration explorations).
- Loaders (3133:1029, 4626:2687, 5095:331, 4629:2697), “LOADER - GIF”, “Tracking Shipment” — belong to the `loader` molecule.
- `.documentation` “Variation Examples” heading (no content).

## Sources
Figma `.documentation` instance 2407:8045 and page note 4545:3587.
Carbon empty states pattern — https://carbondesignsystem.com/patterns/empty-states-pattern/
Ant Design Empty — https://ant.design/components/empty
