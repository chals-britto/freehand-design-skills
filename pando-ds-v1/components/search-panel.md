# Search Panel — Pando DS V1

**Status:** Built 2026-10-28 · no review (every published variant kept) · **Figma:** DS V2 – Molecules (rd3gmPnjhPo1d2GAlNSJOn) › 🟡 Search (60:273) › `Search` (4894:18073)
**Files:** `search-panel.css` (styles + component tokens) · `search-panel.js` (`pdsSearchPanel.render`, `.mount`) · `search-panel.html` (live doc). Reuses `tabs.css/js` (Tab Group), `search-input.css` (field), `toggle-tab.css/js` (Single Selection with Description → Type and sub-type rows), `tag.css` (Input Tag, Multiselect Tag), `menu.css/js` (table rows, table header, flat table menu), `checkbox.css`, `scrollbar.css`, `button.css`, `button-group.css`, `icons.css` + `icons/` (nav-search-10, nav-close-tag).

## What it is
A search card with two tabs. Figma has no written description; this is drawn from the 16 variants.
- **lane** — a Type row of lane types; lot/ lane, Source and destination add a sub-type row and take typed text; mode, movement type and Delivery type list their values. Applying a value turns the type chip into a tag (“Source : Hyderabad”), so searches combine across types. Tip line (Figma): “Search for a single value within a lane type, but combine searches across types”.
- **vendor** — a search field over a one-column checkbox table (“vendor name”); picks show in the field as tags.

## Variants
`Property 1` — 16 variants, four structures.

| Group | Variants | Structure |
|---|---|---|
| Lane, sub-type row (218 high) | Lane Name · Variant16 · Variant6 · Source · Variant11 · Variant10 · Variant13 · Hyd - Bng · Variant14 | Tabs · Search · Type row · sub-type row · tip + buttons |
| Lane, value list (318) | Lane Name Entered · Variant8 | Tabs · Search · Type row (Source tag, movement type active) · 4 rows · tip + buttons |
| Lane, value list (282 / 354) | Others · Others mode · Variant9 | same; first chip reads “lot name”; 3 rows (mode) / 5 rows (Delivery type) |
| Vendor (462) | Vendors · Variant15 | Tabs (lane Disabled, vendor Active) · Search · table header + 8 rows · buttons |

| Variant | Placeholder / typed value | Active type | Sub-type row | Tags | Clear / Apply |
|---|---|---|---|---|---|
| Lane Name | “Search for a Lot Name” | lot/ lane | lot · lane | — | Disabled |
| Variant16 | “Search for a Lane Name” | lot/ lane | lot · lane | — | Disabled |
| Variant6 | “HYD-DUB” | lot/ lane | lot · lane | — | Default |
| Source | “Search for a Source City” | Source | code · port · city · state · zip · region · country | — | Disabled |
| Variant11 | “Search for a Destination City” | destination | code … | — | Disabled |
| Variant10 | “Search for a Source City” | Source | code … | Lot Name : HYD-DUB | Default |
| Variant13 | “Hyderabad” | Source | city active, code default | — | Default |
| Hyd - Bng | “Bangalore ” | Source | city active, code default | — | Default |
| Variant14 | “Search for a Destination City” | destination | code … | Source : Hyderabad | Default |
| Lane Name Entered | “Search for a Movement Type” | movement type | rows Door to Door · Door to Port · Port to Door · Port to Port | Source : Hyderabad | Default |
| Variant8 | “Door to Door” | movement type | same rows | Source : Hyderabad | Default |
| Others | “Search for a Mode” | mode | rows Air · Ocean · Road | Source : Hyderabad | Disabled |
| Others mode | “Air” | mode | same rows | Source : Hyderabad | Disabled |
| Variant9 | “Search for a Delivery type” | Delivery type | rows Cargo · FCL · LCL · TL · LTL | Source : Hyderabad | Disabled |
| Vendors | “Search for Vendors” | — | 8 vendor rows, none ticked | — | Disabled |
| Variant15 | (tags) | — | 5 ticked | Lufthansa Cargo · DB Schenker · Crane · “+ 2” | Disabled |

Vendor rows: Lufthansa Cargo, DB Schenker, Maersk, Crane, CEVA Logistics, Hellman Worldwide Logistics, KWE, FEDEX.

| Part | Value | Token / kit |
|---|---|---|
| Frame | #FFFFFF · radius 2 · 0 14 28 6% · pad-top 5 | `--white` · `--space-2` · `--shadow-4` |
| Tabs | Tab Group Light, Background=No | kit `.pds-tabs` |
| Search field | Search Input Light Empty 627 × 36; typed text 12 SemiBold #313131 | kit `.pds-search-input`; `--search-panel-value-weight` 600 |
| “Type” | 12 SemiBold #2A4255, 15 to the chips | kit `.pds-toggle-tabs__desc` |
| Chip · active | #0078DD, white, Bold 10/14 caps, pad 5/10, radius 14 | kit steps active (`--toggle-tabs-blue`) |
| Chip · default | #FFFFFF, #234357, 0 2 3 10% | kit steps inactive (`--shadow-1`), label shown |
| Chip · secondary | #F3F6FC, #234357, no shadow | `--accent-light-blue-bg` — built here |
| Type row rule | 1px bottom #EEF2F4 | `--pando-light` |
| Applied tag | Input Tag Text, Remove=Yes | kit `.pds-tag--input` + `.pds-tag__remove` |
| Value row | 36 high, pad 10, #F9FAFA / #FFFFFF, 0.5 bottom #EFEFEF, 12/16 Regular | kit `.pds-menu__row` / `__cell` |
| Vendor table | header “vendor name” 10 SemiBold caps #005399; rows checkbox + text; selected rows keep their fill | kit `pdsMenu.parts.head`, `pdsMenu.build({type:'table', flat:true, multiple:true})` |
| Tip | “Tip” SemiBold 10 + Regular 10/12, #737373 | off-token `--search-panel-tip-fg` |
| Buttons | Button Group pad 10, gap 20: Clear Text Only Small · Apply Primary Small | kit `.pds-button-group` + `.pds-button` |

| Token | Value | Maps to |
|---|---|---|
| `--search-panel-bg` | #FFFFFF | `--white` |
| `--search-panel-radius` | 2px | `--space-2` |
| `--search-panel-shadow` | 0 14 28 6% | `--shadow-4` |
| `--search-panel-header-rule` | #EEF2F4 | `--pando-light` |
| `--search-panel-chip-secondary-bg` | #F3F6FC | `--accent-light-blue-bg` |
| `--search-panel-chip-secondary-fg` | #234357 | `--pando-dark` |
| `--search-panel-tip-fg` | #737373 | off-token in Figma |

## Anatomy & spacing
Frame 647 wide, column, pad-top 5. Tab Group 30 (kit renders 31). Search frame pad 10 / 10 / 5 / 10 → 51. Type row 44: pad 0 / 10, “Type” + 15 + chips (pad 10 / 0, gap 10). Sub-type row 44: pad 10, gap 10. Value rows 647 × 36. Vendor table pad 5 / 10: header 34 + rows 36. Footer 44: tip pad-left 10, Button Group pad 10, gap 20. Tags in the field: 10 after the icon, 5 apart.
px values used (component tokens): 2 (radius), 5 (pad-top, search bottom pad, tag gap, table top/bottom pad, chip vertical pad), 10, 14 (chip radius), 44 (row height), 600 (weight), 647 (width), tip font 10/12.

## Behaviour
Figma shows static frames only; everything below is added for the kit.
- Tabs switch the lane and vendor panels (kit Tab Group: click, ← / →, Home / End).
- Type and sub-type rows are kit Toggle Tab radiogroups. Picking a type swaps the placeholder and shows its sub-types or its value rows; unselected sub-types use the secondary look.
- Typing filters the value rows / vendor rows (case-insensitive). ↓ / ↑ move the highlight, Enter picks it; Enter with no highlight applies the typed value.
- Picking a value row fills the field. Apply turns the value into an Input Tag “<Type> : <value>” in place of the type chip and selects the next free type (from Variant10 → Source, Variant14 → destination). Tag × removes it.
- Vendor rows toggle; the first 3 picks show as Input Tags in the field and the rest as “+ n” (Variant15). Tag × or Backspace in the empty field removes a pick.
- Clear empties the field and removes every tag / pick. Clear and Apply are disabled until there is a value, a tag or a pick.
- Events (bubble): `pds-search-panel:apply` `{tab, filters:[{type, label, value}], vendors}` · `pds-search-panel:clear`.

## When (not) to use
Figma has no usage text.

## Accessibility
- Card `role="search"`; tabs are the kit tablist / tab / tabpanel; Type row is a radiogroup labelled by “Type”, sub-type row a radiogroup “Search by”.
- Field `role="combobox"` + `aria-controls` → value rows / vendor table (`listbox`, `option`, `aria-activedescendant`; vendor list `aria-multiselectable`). The field has no visible label: `aria-label` = its placeholder.
- Tag × is `<button aria-label="Remove <text>">`. Focus outlines (2px #0076DD) are added — not in Figma.
- Contrast for the a11y pass: active chip white on #0078DD 4.4 : 1 (fails 4.5); tip #737373 on white 4.7 : 1; secondary fill #F3F6FC on white 1.06 : 1; Type row rule 1.1 : 1; search icon #A3A3A3 on #F8F8F8 2.4 : 1; disabled Clear #A3A3A3 2.5 : 1 (exempt).

## Open issues
- Atom variant missing in kit: Search Header Property 1=secondary — built here. Kit Toggle Tab steps hide inactive labels; overridden here so every chip shows its label (pad 5 / 10, radius 14).
- Remote parts mapped, not 1:1: “Dropdown Option” is a 36px full-width .Table Cell row (kit dropdown-option is 56px with avatar) → kit menu row / cell with pad 10 instead of 10 / 5. “. Toggle” / “.Active Toggle Tab” → kit Toggle Tab steps. “Search Header” → chip in a Toggle Tab radiogroup.
- Multiselect Tag “+ 2” in Variant15: #E9F4FE fill, #0076DD 12 Regular, no visible stroke; kit Number Only is unfilled with a 2px #E2EAEC border, 10 SemiBold. Kit used — confirm which is current.
- Off-token: #737373 (tip), #404040 (rows and tag text — kit #313131 kept), #E9F4FE (“+ 2”); #0078DD and #2A4255 come from the kit Toggle Tab tokens.
- Typed text is 12 SemiBold while the instance is State=Empty; kit Filled is Regular. Set to 600 here.
- All behaviour is added. Figma keeps every value row visible while a value is typed (Variant8, Others mode); rows filter here.
- Vendor variants show Clear / Apply Disabled with 5 rows ticked; live they enable on a pick. “apply” is lower case in the vendor variants.
- Kept as drawn but unexplained: Variant13 / Hyd - Bng show “code” as a default (white) chip while “city” is active; Variant16 placeholder “Lane Name” with “lot” active; Source variants say “Source City” with “code” active. Live: unselected sub-types are secondary, placeholder follows the type.
- First chip reads “lot/ lane” (lane variants) and “lot name” (Others, Others mode, Variant9). Tag prefixes other than “Lot Name :” and “Source :” are assumed.
- Second tab reads “Tab Inactive” in lane variants, “vendor” in vendor variants; lane tab is Disabled in vendor variants. Live: “lane” / “vendor”, both enabled.
- Tags in the field overlay the Search Input in Figma (absolute at x 40) over the placeholder; built inside the field, placeholder hidden while tags show. Type row with a tag can be wider than 584 in Figma; kept on one line.
- Table header carries a Checkbox (Mode=Light, State=Initial) in the .Header Type=Table instance; kit header draws a 14px spacer (opacity 0 per menu). No select-all added. Figma overlays a scrollbar on the vendor rows; kit scrolls natively past 360.
- Line heights: chip / tip 10px line Auto (14); 12px rows 16 vs 17 in `.type-12-*`; Tab Group renders 31 vs 30. Tab labels are lower case SemiBold 12 in Figma; kit tabs render caps.
- No empty / no-results, loading, error, hover or Dark state.

## Not adopted
- Hidden layers: 3rd hidden sub-type chip, hidden “Frame 481977” list (6 Dropdown Options), hidden Navigation/Filter-10px and Input Tag, hidden rows 5–7 in Others / Others mode, hidden tag row “Frame 483517”.
- Industry gaps, not added: Esc clears the field and a × appears once the user types; search sizes 24 / 32 / 40 / 48 and a disabled state (Carbon Search).

## Sources
Figma 4894:18073 (variants 4894:18074, 18097, 18120, 18152, 18189, 18226, 18265, 18303, 18341, 18379, 18421, 18463, 18480, 18501, 18537, 18573) · kit `tabs`, `search-input`, `toggle-tab`, `tag`, `menu`, `checkbox`, `scrollbar`, `button`, `button-group`, `icons/icons-data.js`
Carbon Search usage — https://carbondesignsystem.com/components/search/usage/
