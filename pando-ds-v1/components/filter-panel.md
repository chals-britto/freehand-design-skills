# Filter Light / Dark — Pando DS V1

> **Figma page is named 'To BE REVIEWED' — built as published; confirm before treating as standard**

**Status:** Built 2026-10-28 · no review (every published variant kept) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › page "Filter - To BE REVIEWED" (4304:2485)
**Sets:** `Filter Light` 4271:4345 (2) · `Filter Dark` 4227:2584 (2) · `.group light` 4216:5580 (2) · `.group dark` 4736:7858 (2) · `.options light` 4225:2352 (6) · `.options dark` 4736:7791 (6)
**Files:** `filter-panel.css` · `filter-panel.js` (`pdsFilterPanel`) · `filter-panel.html` (live doc)
**Reuses (never re-implemented):** `checkbox.css` (Checkbox atom) · `accordion.css/js` (Slideout accordion = group headers) · `button.css` (Text Only Small + Primary Small) · `button-group.css` · `search-input.css` (field) · `scrollbar.css` · `icons.css` + `icons/icons-data.js` (`nav-filter-10`, `nav-search-10`, `nav-close-tag`, `system-status-selected-multi`)

## What it is
A filter panel: groups of options (checkboxes or single-choice rows) with RESET and APPLY. No description exists in Figma.

## Variants
| Set | Variant | Size | Built as |
|---|---|---|---|
| Filter Light | Single | 200 × 212 | `.pds-filter-panel--light.pds-filter-panel--single` — one `.group light`, no buttons |
| Filter Light | Multiple | 500 × 378 | `--light.--multiple` — header bar, accordion column, options pane with search |
| Filter Dark | Left | 240 × 278 | `--dark.--left` — header tab, one `.group dark`, RESET/APPLY footer |
| Filter Dark | Multiple | 500 × 388 | `--dark.--multiple` — as Light Multiple, dark colours, pane gap 10, scrollbar |
| .group light / dark | Multiple · Single | 250 wide | `.pds-filter-panel__group` = Section Header + `.pds-filter-panel__options` |
| .options light | Multiple Default / Hover / Selected · Single Default / Hover · (stray) Dark Single Default | 250 × 36 / 32 | `.pds-filter-panel__option` (+ `--single`) |
| .options dark | Multiple Default / Hover / Selected · Single Default / Hover / Selected | 250 × 36 | same, in a `--dark` root |

Colours:

| Part | Light | Dark |
|---|---|---|
| Panel / header | `--white` | `--dark-bg` #393945 |
| Header stroke (Multiple) | 1px bottom `--border-grey` #EFEFEF | — |
| "Filter" title | `--text-dark`, 12 SemiBold +0.3px caps | `--white`, 10 SemiBold +0.5px caps |
| Filter icon | `--dark-highlight-green` #1FCD93 | same |
| Accordion column | `--accent-off-white` #F8F8F8 | `--dark-light` #343440 |
| Options pane | `--white` | `--dark-darker` #24242F |
| Section Header | `--pando-light` #EEF2F4 / `--text-dark` | `--dark-light` / `--dark-label-text` #D5DAF4 |
| Option label | `--text-dark` | `--dark-label-text` |
| Option Hover | `--pando-light` | `--dark-darker` |
| Option Selected label (+ Single check) | `--pando-blue` #0076DD | `--highlight-blue-light` #9CD2FF |
| Count badge | #0078DD (off-token) / `--white` | `--dark-highlight-green` / `--text-dark` |
| Search field | kit Light | fill #484858 (off-token), text + icon `--dark-label-text` |
| Left footer | — | #484858 @ 60% (off-token), shadow 0 −3 10 #24242F @ 40% (off-token) |
| Open accordion heading | #404040 (off-token instance override) | kit |

## Anatomy & spacing
- Multiple header 34 tall, padding 5/10, gap 10; Button Group gap 10 (kit 20).
- Accordion column 200; options pane 300, padding 10 (Dark gap 10). Search 36 tall, fills the pane. List = 8 rows × 36 = 288, scrolls beyond.
- Section Header: Light 22 tall (padding 4/10, gap 5), Dark 24 tall (padding 5/10) under a 10px top gap. Text 10 SemiBold +0.5px caps, line 14.
- Option Multiple: 36 tall, padding 10, kit Checkbox (gap 10; Dark selected 11 from the kit). Label 12 Regular, line 16. Dark Multiple rows: left padding 0 (as drawn).
- Option Single: Light 32 tall (padding 8/10); Dark 36. Dark Selected: label + 10×8 check on the right (space-between).
- Light Single: Section radius 4 4 0 0; Options radius 0 0 4 4, padding 5/0, `--shadow-3`.
- Dark Left: tab 24 tall (radius 4 4 0 0, hugs content); main section radius 0 4 4 4, `--shadow-3`; footer 40 tall, padding 8/10, buttons space-between.
- Count badge 14 tall, min 14 wide, padding 0 4, radius 10, 10 SemiBold.

## Behaviour
Not drawn in Figma — built from the static states:
- **Expand / collapse groups** (Multiple): the kit Slideout Accordion lists the groups; one is always open; opening one closes the others and shows its options in the pane. Closed groups show no arrow (as in Figma).
- **Check options:** Multiple = native checkboxes; Single = one choice per group (pressing the chosen one again clears it).
- **Search within options:** filters the open group's options by label; clears when another group opens; clear × shows while there is text.
- **Selected count:** badge on each group header = options picked in that group; hidden at 0.
- **RESET** (Figma label "reset") clears every group and the search; **APPLY** reads the selection.
- Events: `pds-filter-panel:change` {group, label, selected, value} · `:apply` {value} · `:reset` {value}.
- API: `pdsFilterPanel.build({theme, variant, type, title, groups, open, search})`, `buildGroup`, `buildOption`, `init`, `value`, `reset`, `open(el, index)`.

## When (not) to use
No usage text in Figma. Figma usage on the same page: "Invoice landing" uses Filter Dark / Left; "Frame 483113" uses Filter Light / Single.

## Accessibility
- Panel = `region` labelled "Filter". Group headers are the kit Accordion buttons (`aria-expanded`, `aria-controls` → the pane); name includes the count ("Vendor, 2 selected").
- Multiple options: native checkboxes in a `group`. Single: `radiogroup` of `role="radio"` buttons with `aria-checked`.
- Search labelled "Search options".
- Focus: kit focus rings on checkbox, accordion, buttons, search; a 2px `--pando-blue` ring on Single rows (added in review — not in Figma).
- For the accessibility pass: white on #0078DD ≈ 4.6:1 (borderline); Dark Hover is invisible on the Dark Multiple pane (both #24242F).

## Open issues
- Page is "To BE REVIEWED" with no status emoji — confirm status.
- **Light Single Selected is not in Figma** (`.options light` has Single Default + Hover only). The Try-it uses the Dark Single Selected pattern in Light colours — added in review, not in Figma.
- Stray "Theme=Dark, Type=Single, State=Default" inside `.options light` (32 tall, padding 8) duplicates the `.options dark` one (36, padding 10).
- Dark Multiple uses an unpublished ".options light/Dark/Multiple/Default" with 0 left padding.
- **Atom variant missing in kit:** count badge (14px, #0078DD / #1FCD93) — `badge.css` count is 16px #B5C3CB. Built here.
- Instance overrides of kit atoms: open accordion heading #404040; closed accordions hide the arrow; Button Group gap 10; Dark Search Input is the Light instance recoloured (#484858 / #D5DAF4, 36 tall) — kit Dark search is 32 tall.
- **Kit bug:** `search-input.js` throws when the clear × is pressed on a field without a results panel (`filter()` reads a null panel). This component wires its own search/clear.
- Line heights: option 12/Auto = 16 (kit 17); Section Header 10/Auto = 14 (kit 12).
- Not in Figma: behaviour, search no-results state, scrolling (only a Dark scrollbar is drawn — Light scroll added), focus, disabled, loading.
- Hidden layers in `.group` (filter icon + text button in Section Header, Search Input, 3 extra options, footer text button) not built.
- Light Single has no RESET / APPLY (Dark Left does). Its Options rows are 250 wide inside a 200 parent in Figma; built at 200.

## Not adopted
Hidden `.group` slots (above) · 9 hidden accordions and 2 hidden ".group/Dark Multiple" instances inside Filter Dark · loose frames on the page ("Invoice landing", "Transporter_Ocean Lanes", "Vendor Selection", "Frame 483113") — usage examples, not components.
Industry gaps, not added: applied-filter count on the closed trigger with clear; clear-all per category; instant filtering for single-choice; no-results message.

## Sources
Figma DS V2 – Molecules › Filter - To BE REVIEWED — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=4304-2485
Carbon Filtering pattern — https://carbondesignsystem.com/patterns/filtering/
