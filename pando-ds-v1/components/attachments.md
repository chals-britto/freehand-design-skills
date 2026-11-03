# Attachments — Pando DS V1

> **Built from loose frames — Figma has no Attachments component; confirm before treating as standard.**

**Status:** Built 2026-10-28, no review yet · **Figma:** DS V2 – Molecules › Attachments (page 4999:9946) — loose frames 4999:9962 (Frame 1), 4999:9979 (Frame 2), 5001:22732 (Material screen), 5001:71900 (Hover), 5003:16361 (Frame 483417); loose instances 5001:71899, 5011:14897, 5003:16202.
**Files:** `attachments.css` · `attachments.js` (`pdsAttachments`) · `attachments.html` (live doc)
**Uses kit pieces:** `icons.css` + `icons/icons-data.js` (file-xls, file-pdf, misc-add-attachment-light-40-default, nav-zoom-icon-plus, nav-close-tag) · `tag.css` (`.pds-tag--file`) · `card.css` (`.pds-card__thumb`, `.pds-card__thumb-img`) · `badge.css` (`.pds-badge--count`) · `checkbox.css` · `tooltip.css` + `tooltip.js`.

## What it is
The ways V1 screens show files attached to a record. Figma has no description text for this page; this is a summary of what the frames show.

## Variants
| Pattern | Source | Values |
|---|---|---|
| Link chip | Frame 1 4999:9962 | 32 tall · pad 4 10 · radius 16 · fill `--border-grey` #EFEFEF · Misc/File-Types XLS 20×24 · gap 9 · “Attachment Name.ext” Open Sans Italic 12/16 underlined `--pando-blue` #0076DD |
| Link chip · removable | Frame 2 4999:9979 | as above + gap 10 · divider 1×16 `--border-blue-grey` #B5C3CB · Navigation/Close-Tag 12 `--grey-dark` #515151 |
| File tag | 5003:16363 | kit Tag Small · Outline · Rounded · Left Icon — “Averitt_NDA...” |
| File tag · removable | 5003:16202 | kit Tag Left + Right Icon — “Terms & Condition002.pdf” |
| Add tile | 5011:14897 | kit Misc/Add-Attachment Light · 40 · Default |
| Filled tile · File | Material screen | 40 frame #B5C3CB + Misc/File-Types (PDF) at 10,8 |
| Filled tile · File · Badge | Material screen | + kit Badge Count “+1” at 30,−6 |
| Filled tile · Image · Remove | 5001:71899 | kit `.pds-card__thumb` · image 36 at 2,1 (grey placeholder, photo not exported) · remove dot |
| Tile · Hover | 5001:71900 | overlay #000 @ 80% (off-token) · 1px inside `--dark-input-text` #8A8A9E · Zoom Icon Plus 14 white · remove dot 16 `--grey-light` #E7E7E7, pad 2, close 12 `--grey-dark`, at 30,−6 · kit Tooltip Single Line beak 12:00 “File name.ext” |
| Document row · Select / Selected | Material screen (remote “Add Attachment” component) | 306×50 · pad 5 10 · gap 8 · kit checkbox, checkbox↔label 10 · label 176 wide, 12 regular #404040 (off-token) · Selected: label `--pando-blue-active` #005399, fill #EBF1FA (off-token) |
| Row grid | Material screen | 2 columns · rows 10 apart · columns 6 apart (rendered) |

Sample document names (Material screen): Packing List, Invoice, Country of origin, Shipping Order, Fedex Haz. Material Certification, Fedex Domestic Ground Label, Material safety Data Sheet (MSDS).

## Anatomy & spacing
- `.pds-attachments` — `<ul>` list; `--tiles` (8 gap) · `--grid` (2 × 306).
- `.pds-attachments__chip` › `__link` (icon + `__name`) › `__divider` › `__chip-remove`.
- `.pds-card__thumb.pds-attachments__tile` (`--file` | image) › badge › `__preview` (overlay button) › `__remove`.
- `.pds-attachments__add` — button around the kit add icon.
- `.pds-attachments__row` — kit `.pds-checkbox` + tiles list.
- px used: 32, 4/10, 16 (radius, divider), 9, 10, 12, 40, 8, 10/8 (icon offset), 16, 2, 30/−6, 306, 50, 5/10, 176, 6.

## Behaviour
*All behaviour is added in build — not in Figma.*
- Hover or keyboard focus on a tile shows the overlay, the remove dot (over the badge) and the file-name tooltip.
- Remove (× or dot) deletes the item and moves focus to the next one; event `pds-attachments:remove`.
- Preview fires `pds-attachments:preview` (no viewer is built).
- Add tile opens the file picker. With a filled tile already there, the badge counts the extra files (“+n”); otherwise a new tile is inserted. Event `pds-attachments:add`. Files are never read or uploaded.
- Ticking a row's checkbox switches it to Selected.

## When (not) to use
No Figma text. Not added.

## Accessibility
- Lists are `<ul>` with `aria-label`; × and preview are `<button>`s named after the file.
- Overlay and remove dot also show on `:focus-within`; tooltip linked with `aria-describedby` (kit tooltip.js).
- Focus ring 2px `--pando-blue`, offset 2 — added in review, not in Figma.
- Contrast: #B5C3CB tile frame / divider ≈ 1.8:1 on white (non-text, below 3:1).

## Open issues
- Not a component — decide whether to componentise.
- Atom variant missing in kit: Misc/Add-Attachment Filled · Type=File — the kit icon is PDF-only and has the remove dot baked in (Remove=Yes), so the tile is built here (frame + kit file-type icon).
- Atom variant missing in kit: Misc/Add-Attachment Filled · Type=Image — `.pds-card__thumb` with grey placeholder.
- Atom variant missing in kit: Tooltip Single Line hugs its text (95 wide, 4 8 padding); kit tooltip is 164 fixed, 10 padding.
- Tiles in the Material screen render a #E2EAEC frame / #CBD4D8 plus; standalone instances and the kit use #B5C3CB. Kit kept.
- Badge “+1” is #404040 in the screen; kit Count badge uses #313131.
- Off-token: overlay #000 @ 80%, row label #404040, Selected fill #EBF1FA.
- Chip name is Open Sans Italic 12/16 underlined — no italic `.type-*` style.
- Row grid declares a 10 column gap; rows render 6 apart. 6 used.
- Gap between chips/tags in a list not shown — 10 used (added in build).
- Missing states: uploading, error, disabled, empty list, Dark chips/rows.

## Not adopted
- Material screen chrome (Top Header, Breadcrumb, Side Nav, Leg Document header, “Selected Documents” table panel 5001:23282) — other components, not part of this pattern.
- Photo inside the image tile — not exported.

## Industry gaps — not added
- Per-file upload states (uploading / done / error with a fix-it message) — Carbon File uploader, Ant Upload.
- Full file name in a tooltip when truncated — Carbon File uploader.
- Download action — Ant Upload.
- Cancellable remove — Ant Upload.

## Sources
Carbon File uploader usage — https://carbondesignsystem.com/components/file-uploader/usage/
Ant Design Upload — https://ant.design/components/upload
