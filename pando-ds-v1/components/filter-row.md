# Filter Row — Pando DS V1

> **⚠ Figma marks this page OLD — confirm whether it is still in use.** Built as published.

**Status:** Built from Figma 2026-10-28 · no review (everything published = Keep) · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › 🟢 Filter Row (OLD) 1:558 › `Filter Row` (4:276), `.Filter-Button` (2320:6326)
**Files:** `filter-row.css` (styles + component tokens) · `filter-row.html` (live doc) · no JS (no behaviour in Figma)
**Reuses:** `badge.css` (`.pds-badge--count`) · `icons.css` + `icons/nav-filter-10.svg` (`Navigation/Filter-10px`)

## What it is
A row with a Filter button (filter icon, “FILTER” label, count badge) followed by the applied filters as chips. Figma has no written description; the page’s `.documentation` card carries Calendar text (stale).

## Variants
`Filter Row` · `Theme` = Light | Dark Blue (2). `.Filter-Button` · `State` = Default | Active (2). The page’s own instance of Filter Row uses Theme=Light with the button in State=Active.

| Part | Light | Dark Blue |
|---|---|---|
| Row fill | none | none (sits on page rectangle #20354E, off-token → `--filter-row-dark-surface`) |
| Button Default | fill `--pando-dark` #234357 · label/icon `--white` | same as Light |
| Button Active | no fill · 1px inside border `--pando-dark` · label/icon `--pando-dark` | (not shown in Figma) |
| Badge | `.pds-badge--count` recoloured: `--pando-blue` #0076DD / `--white` | same |
| Filter chip border | `--border-grey` #EFEFEF | #495A6B (off-token → `--filter-row-dark-chip-border`) |
| Filter chip text | `--text-dark` #313131 | `--white` |
| Filter chip fill | none (#E3EFFA exists but hidden) | none (same) |

Classes: `.pds-filter-row`, `.pds-filter-row--dark`, `.pds-filter-row__button`, `.pds-filter-row__button--active`, `.pds-filter-row__filter`, `.pds-filter-row-surface--dark` (helper for the dark container).

## Anatomy & spacing
- **Row:** horizontal, items centred, gap 14 (`--filter-row-gap`), height 28. Figma sample: 1 button + 8 chips (836 wide).
- **Filter button:** 84 × 28 **fixed** · padding 6 / 10 · gap 8 · radius 2 (`--space-2`). Icon 10 · label Open Sans 400 12/16 “FILTER” (typed in caps) · badge 16 × 16 (padding 1 2, fully round, 10px semibold, sample “0 ”).
- **Filter chip:** height 24 · padding 4 / 10 · radius 12 (`--radius-12`) · 1px inside border · Open Sans 400 11/16 · width hugs (80 with “Filter Name”).

## Behaviour
None defined in Figma. The meaning of the button’s Active state (panel open vs filters applied) is not documented; chips have no remove, hover or click state.

## When (not) to use
No usage text in Figma. The page is marked OLD — confirm before use; see Filter By for the newer filter pattern.

## Accessibility
- Filter button: `<button type="button">` with a name that includes the count, e.g. `aria-label="Filter, 0 applied"`. Focus ring `2px solid var(--pando-blue)`, offset 2 — **added in review, not in Figma**. Once Active’s meaning is confirmed, expose it with `aria-expanded` or `aria-pressed`.
- Row: `role="group"` with a label like “Applied filters”. Chips are static `<span>`s.
- Contrast (kept as Figma, deferred): chip border #EFEFEF on white 1.1 : 1; Dark chip border #495A6B on #20354E ≈ 1.9 : 1; Default button #234357 on #20354E ≈ 1.1 : 1 (non-text needs 3 : 1). All text passes (white on #0076DD ≈ 4.6 : 1).

## Open issues
1. **Figma marks this page OLD** — confirm whether it is still in use.
2. **Compared with Filter By** (being built in parallel; `filter-by.md` did not exist when this was finished — only `filter-by.css`/`.js`, so this is a preliminary comparison): Filter By is a bar of label : value dropdown pills (white fill, #EFEFEF border, caret, Light/Dark themes, toggle type, More Filters panel, date/time). Filter Row is one Filter button with a count plus static chips showing applied values, with no dropdowns. They overlap in purpose (showing/choosing filters) but share no parts; the chip border #EFEFEF is the only common value. If Filter By replaces this, Filter Row can be retired. Re-check once `filter-by.md` lands.
3. **Button content overflows.** Fixed 84px width, but content 79 (10 + 8 + 37 + 8 + 16) + 20 padding = 99. Clip is off, so the badge ends ~5px past the right edge (crosses the border on Active). Kept as Figma.
4. **Atom variant missing in kit — blue Count badge.** Figma uses `Badge / Type=Count, Size=Small, Color=Blue` rendered #0076DD / white; the Atoms kit’s `.pds-badge--count` is grey #B5C3CB / #313131. Reused the kit class, recoloured via `--filter-row-badge-bg/-fg`.
5. **Remote “Filter” part has no kit equivalent.** `Filter / Type=Tag-Light` (siblings Tag-Light, Tag-Dark, remote library). Nearest kit tag (Count: 22px, 2px border) differs, so it is built inside as `.pds-filter-row__filter`. The Dark Blue row uses Tag-Light with overrides, not Tag-Dark.
6. **Dark Blue has no fill of its own**; relies on a loose page rectangle #20354E. The button doesn’t change between themes.
7. **Line heights:** label 12/16 vs `.type-12-regular` 12/17; chip 11/16 vs `.type-11-regular` 11/15. Figma values held in component tokens.
8. **Missing states:** button hover/focus/disabled/pressed; chip remove ×, hover, overflow (“+N more”), clear-all.
9. Badge sample text is “0 ” with a trailing space (rendered “0”).
10. `.documentation` card on the page is a copy of Calendar’s.
11. Off-token colours: #20354E, #495A6B.

## Industry gaps — not added
- Dismissible filter chips with a close ×, Tab-reachable, removed with Enter/Space — [Carbon Tag](https://carbondesignsystem.com/components/tag/usage/).
- “Clear all” for applied filters — [Carbon Filtering](https://carbondesignsystem.com/patterns/filtering/).
- Closed filter control shows the applied count (Figma has the badge) and lets people clear without reopening — [Carbon Filtering](https://carbondesignsystem.com/patterns/filtering/).

## Not adopted
- `Rectangle 1` (410:3393) — loose page rectangle used as the Dark Blue backdrop; reproduced only as the helper `.pds-filter-row-surface--dark`.
- `.documentation` instance (2407:8030) — stale Calendar content.
- The page instance `Filter Row` (2320:6341) is shown as a usage example (Light + Active button), not a separate variant.

## Sources
- Figma `rd3gmPnjhPo1d2GAlNSJOn` nodes 4:276, 4:189, 410:3367, 2320:6326, 2318:5675, 2320:6325, 2320:6341, 410:3393 (read-only `use_figma`).
- Kit: `badge.css`, `icons.css`, `icons/nav-filter-10.svg`.
- Carbon Tag usage, Carbon Filtering pattern (links above).
