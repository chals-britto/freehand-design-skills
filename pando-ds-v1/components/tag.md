# Tag — Pando DS V1

**Status:** Built from Figma 2026-10-23 · no review yet (everything published treated as Keep) · **Figma:** DS V2 – Atoms › 🟢 Tags (206:0)
**Files:** `tag.css` (styles + component tokens) · `tag.html` (live doc). No JS. Figma defines no behaviour, so the × is drawn but the product wires the removal.

## What it is
Tags can also serve as a label for content or display counts. Use short labels for easy scanning. Use two words only if necessary to describe the status and differentiate it from other tags. *(Figma wording)*

Six published component sets (93 variants):
| Set | Node | Variants | Figma description | Class |
|---|---|---|---|---|
| Tag | 3182:1690 | 76 | Tags, text tag, Attachment tag, nimbus tag, cell tag | `.pds-tag` + family + colour |
| Multiselect Tag | 212:37 | 4 | Show numbers, counts, units as tags | `--count`, `--count-unit` |
| Input Tag | 390:2 | 7 | Use for displaying filled input as tags in fields, search and comments | `--input`, `--input-dropdown`, `--search` |
| Filter Tag | 390:3 | 2 | Filter Tags | `--filter` |
| Pointed Tag | 3182:1828 | 2 | Pointed Tag | `--pointed` |
| Tag/AI | 7837:7506 | 2 | — | `--ai` |

Dark variants (`Mode/Theme=Dark`) take `.pds-tag--dark` and sit on `--color-sidebar-bg` #393945.

## Variants

### Tag (3182:1690)
Properties: `Size` (Small · Medium · Large) × `Type` (Filled · Outline) × `Rounded` × `Color` (Default · Purple · Red · Maroon · Brown · Orange · Cyan · Blue · Green · Neutral · Grey · Yellow) × `Mode` × `Left Icon` × `Right Icon`, plus booleans `Removable`, `Read Only Label` and the text `Tag Value`. Only 76 combinations exist:

| Family | Exists in | Fill | Text | Border / × |
|---|---|---|---|---|
| **Small · Filled · square** (base) | Light: Purple, Red, Maroon, Brown, Orange, Cyan, Blue, Green, Grey, Yellow, Default | `--color-status-<hue>-bg` · Grey `--grey-light` · Default `--pando-light` · Yellow `--status-yellow-light` @80% | `--color-text-primary`. Exceptions: Red `--color-status-red-text`, Yellow `--status-brown-dark` | — |
| | Dark: Purple, Default, Red, Maroon, Brown | Purple `--status-purple-medium` · Default `--dark-input-text` · Red `--status-red-medium` · Maroon `--status-maroon-medium` · Brown `--status-brown-light` | white · `--accent-alternate-white` · `--dark-darker` · `--status-maroon-dark` · `--status-brown-dark` | — |
| **Small · Filled · Rounded** `--rounded` | Light: Maroon, Brown, Cyan, Green, Purple, Yellow, Blue, Orange, Red, Default (× hidden) | Status Light @50%. Exceptions: Yellow/Orange @80%, Red solid, Blue = **Sky Blue** Light @50%, Default `--accent-light-highlight` | Status Dark (Blue → `--status-skyblue-dark`, Yellow → brown-dark, Default → `--pando-dark`) | — |
| | Dark: Default, Purple, Red, Maroon, Brown (× shown, 10px) | as the square dark set | Purple text `--status-purple-light`, × white. Others: × = text colour | — |
| **Small · Outline · Rounded** `--outline` | Light: Maroon, Purple, Brown, Blue, Green, Red. With ×: Maroon, Purple, Cyan, Blue, Green, Red, plus "Filled · Brown" drawn as outline. Neutral | `--tag-outline-bg` (white @70%). Neutral: none | Status Dark (`.type-10-regular`). Neutral `--pando-dark` semibold | 0.5px outside, Status Medium (Neutral `--accent-blue-grey`) · × `--grey-dark` |
| | Dark with ×: Maroon, Red, "Filled · Brown" | `--dark-bg` | Status Medium | Status Medium · × `--dark-input-text` |
| **Large · Filled · square** `--large` | Brown, Maroon, Green, Purple, Cyan, Red, Blue | Status Light | `--color-text-primary`. Red → red text, Blue → `--color-text-active` #005399 | — |
| **Large · Filled · Rounded (Nimbus)** `--nimbus` | Orange, Blue, Default | `--nimbus-orange` · `--nimbus-blue` · `--white` | white · white · `--text-medium` | — |
| **Medium** `--medium` (Label Readonly Text) | Light: Maroon, Purple, Brown, Cyan, Green, Blue, Grey, Neutral | Status Light · Grey `--grey-light` · Neutral `--pando-light` | Status Dark; Grey/Neutral `--status-blue-dark` | — |
| | Dark: Maroon, Purple, Brown, Cyan, Green, Red | 10% tints, off-token (`--tag-medium-dark-*-bg`) | Status Light; Red `--status-red-medium` | — |
| **Attachment** `--attachment` | Filled · Default · Left + Right icon, Light + Dark | `--accent-light-highlight` / `--dark-bg` | `--action-blue` / `--dark-label-text`, `.type-10-bold` caps | × `--grey-dark` / `--dark-input-text` |
| **File** `--file` | Outline · Default · Left icon, with/without × | `--accent-off-white` | #000000 (off-token) | 0.5px inside `--accent-light-highlight` |

### Multiselect Tag (212:37): `Type` × `Theme`
| Variant | Fill | Text | Border |
|---|---|---|---|
| Number Only · Light | none | `--color-text-primary`, `.type-10-semibold` | 2px centre `--border-input-light` |
| Number Only · Dark | none | `--dark-label-text` | 2px `--dark-label-text` @50% |
| Number + Unit · Light | `--accent-off-white` | `--color-text-primary`, `.type-11-regular` | — |
| Number + Unit · Dark | `--dark-input-text` @50% | `--white` | — |
Sample: "+ 2", "Units".

### Input Tag (390:2): `Type` (Text · Search · Drop down) × `Mode` × `Remove`
| Variant | Fill | Text | × / caret |
|---|---|---|---|
| Text Tag · Light | `--pando-light` | `--color-text-primary` `.type-12-regular` | × 12 `--grey-dark` |
| Text Tag · Dark | `--dark-input-text` | `--accent-alternate-white` | × `--border-blue` |
| Drop down · Light | `--pando-light` | "#" 12 regular `--color-text-primary` + "Add Tag" 10 semibold `--pando-dark` | caret 8×5 `--pando-dark` |
| Drop down · Dark | `--dark-input-text` | "#" `--dark-label-text` + "Add Tag" `--accent-alternate-white` | caret `--accent-alternate-white` |
| Search Tag · Light | white field, 1px `--border-input-light`, radius 25 | label "SEARCH LABEL" `--pando-blue` caps on white, overlapping 8px · value 12 regular +0.5 | × 12 `--grey-dark` |
Remove=Yes uses padding 4/8; Remove=No uses 4/10.

### Filter Tag (390:3)
Light: 1px inside `--border-grey`, text `--color-text-primary`. Dark: 1px `--dark-label-text` @50%, text `--dark-label-text`. `.type-11-regular`.

### Pointed Tag (3182:1828)
Red: tip + body `--color-status-red-bg`, text `--color-status-red-text`, "Rejected". Green: `--color-status-green-bg` / `--color-status-green-text`, "Approved".

### Tag/AI (7837:7506): `Theme` + `Beta` boolean
Light: `--color-status-green-bg`, spark gradient #006265 to #19A476, text `--color-status-green-text`, Beta `--highlight-yellow` / `--status-green-dark`. Dark: `--status-green-medium`, spark `--status-green-dark`, Beta #FFE01B / #003D31 (off-token).

## Anatomy & spacing
| Family | H | Padding | Radius | Gap |
|---|---|---|---|---|
| Small square | 15 | 0.5 / 2 | 2 | 5 |
| Rounded Light | 16.4 | 1 / 5 / 1.4 / 5 | 22 | 4 |
| Rounded Dark | 16 | 2.16 / 4.32 / 1.62 / 4.32 | 22 | 5.4 |
| Outline | 16 | 1 / 4 | 20 | 2 |
| Large | 24 | 4 / 8 | 2 | — |
| Nimbus | 21 | 4 / 8 / 3 / 8 | 14 | — |
| Medium | 20 | 2 | 2 | 4 |
| Attachment | 22 | 4 | 2 | 10 (inner 4) |
| File | 22 | 4 / 8 | 12 | 5 |
| Number Only | 22 | 4 / 10 | 12 | — |
| Number + Unit | 24 | 4 / 10 | 20 | 2 |
| Input | 24 | 4 / 10 (4 / 8 with ×) | 12 | 4 |
| Search field | 32 | 8 / 10 | 25 | 15 |
| Filter | 24 | 4 / 10 | 12 | — |
| Pointed | 14 | right 2, tip 10×14 | 0 2 2 0 | — |
| AI | 15 | 0.5 / 2 (Dark 0.5 / 4 / 0.5 / 2) | 2 | 5 · Beta 11 high, 0.5 / 2 |
Close × sizes: 8 (outline, attachment, file), 10 (rounded dark), 12 (input, search).
Type: 10 semibold / regular / bold, 11 regular, 12 regular / semibold / bold. Tracking is 0 except the Medium label (+0.5) and the search label/value (+0.5).

## Behaviour
None defined in Figma. `Removable` / `Right Icon` shows the ×. `Read Only Label` (Large) turns on a hidden "Label :" prefix.

## When to use
- Tags are used to label, organize, or categorize objects. *(Figma)*
- Use tags when content is mapped to multiple categories, and the user needs a way to differentiate between them. *(Figma)*
- Tags can also be used as a method of filtering data, to show only items within that particular category. *(Figma)*
- Placement & Convention: Display tags as a single category, dimension or property related to adjacent content. *(Figma)*

## Accessibility
- The × is a `<button type="button" aria-label="Remove <text>">` with a 2px Pando-blue focus ring. *(added in review, not in Figma)*
- The tag text carries the meaning. Colour alone never does.
- Contrast below 4.5:1, kept for the accessibility pass: Nimbus Blue 2.27, Nimbus Orange 2.74, Drop-down Dark "#" 2.44, Rounded Dark Purple 3.00, Square Dark Default 3.23, Input Tag Dark 3.23, Rounded Orange 3.38, Red on Red Light 3.48 (square, rounded, pointed), Square Dark Purple 3.58, Outline Dark Red 3.84, Outline Red 4.00.

## Open issues
1. Variant names don't match the drawing: `Type=Filled, Color=Brown, Rounded=Yes, Right Icon=True` (Light + Dark) is drawn as an Outline tag. It is rendered as drawn.
2. Rounded · Blue uses the Sky Blue palette (#B5E4FF / #09375D), not Blue.
3. Medium · Dark fills are 10% tints that are not in tokens.css. Red and Green both use #2F362F.
4. Rounded · Dark padding is fractional (2.16 / 4.32 / 1.62, gap 5.4).
5. Square Small · Light uses Text/Dark text for every colour except Red (this breaks the Status "Dark = text" rule). Square Dark Brown uses the Light fill.
6. Tag/AI Beta uses Inter Semi Bold 8, which is not the Open Sans scale. Dark Beta #FFE01B / #003D31 and spark stop #19A476 are off-token.
7. File-tag text is #000000.
8. `Read Only Label` on Large is hidden by default. It was not rendered.
9. Line-height: most tag text is AUTO in Figma (tokens use 12 / 17). Filter is 11/16 vs 11/15. Heights are fixed to Figma.
10. "10px/Semibold/Normal" has no tracking, while `.type-10-*` adds 0.5px. The component resets it to 0.
11. There are no hover, focus, pressed or disabled states, and remove behaviour is unspecified.
12. Coverage is sparse. For example: no Outline Cyan without ×, no Large Orange/Grey, no dark Large/Nimbus.

## Not adopted
- Loose instances: Input Tag Search instance 8071:8118 ("test"), Tag file instance 6306:6633, Unit/Small 4391:3626, Input 5732:248.
- Loose frame "Input Tag" 8070:8102 (detached copy of the Search Tag).
- Dark backdrop rectangles 3582:3390, 206:44, 221:32, 7837:7508, 3445:3362 (canvas aids).
- `.documentation` instance 3193:1903 "Variation Examples" (examples only).

## Industry gaps (not added)
- Selectable (checkable) tag with selected state. Carbon https://carbondesignsystem.com/components/tag/usage/ · Ant Design https://ant.design/components/tag
- Operational tag that opens more tags. Carbon https://carbondesignsystem.com/components/tag/usage/
- Hover, focus, disabled and skeleton states. Carbon https://carbondesignsystem.com/components/tag/usage/
- Truncation with full text in a tooltip; around 20 characters max. Carbon https://carbondesignsystem.com/components/tag/usage/
- 8px spacing between tags and a "+n" overflow tag. Carbon https://carbondesignsystem.com/components/tag/usage/ · Fluent 2 https://fluent2.microsoft.design/components/web/react/core/tag/usage
- Interaction tag (primary action + dismiss). Fluent 2 https://fluent2.microsoft.design/components/web/react/core/tag/usage
- Keyboard model for dismiss (Tab to ×, Enter/Space). Carbon https://carbondesignsystem.com/components/tag/usage/

## Sources
Figma DS V2 – Atoms › 🟢 Tags: https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=206-0
Carbon Tag usage: https://carbondesignsystem.com/components/tag/usage/
Fluent 2 Tag usage: https://fluent2.microsoft.design/components/web/react/core/tag/usage
Ant Design Tag: https://ant.design/components/tag
