# Breadcrumb — Pando DS V1

**Status:** Built 2026-10-23 from Figma, no review file — every published variant treated as Keep · **Figma:** DS V2 – Atoms › 🟡 Breadcrumb › `Breadcrumb` (3044:1280)
**Files:** `breadcrumb.css` (styles + component tokens) · `breadcrumb.html` (live doc). No JS: hover is CSS only.

## What it is
Breadcrumbs show users their location during navigation and allow them to easily move up a level or levels in a hierarchy of pages. *(Figma wording)*

## Variants
`Type` (Default, Hover, Dropdown) = 3 variants. Booleans, all default off: `Additional step` (a second "Previous" level + caret), `Status` (green tag after the current level), `Match Type` ("3-way match" label after the current level).

| Type | Earlier level + caret | Current level |
|---|---|---|
| Default | `--text-medium` #545454 | `--pando-blue-active` #005399 |
| Hover | `--pando-blue-active` #005399 (hovered level + its caret) | #005399 |
| Dropdown | #545454 | #005399 in a `--pando-light` #EEF2F4 box, padding 0 10, + solid down arrow 8×5 `--pando-dark` #234357 |

| Slot | Look |
|---|---|
| Status | Tag · Small · Filled · Green — `--status-green-light` #D5F9D1, text `--text-dark` 10px SemiBold "Tag Text", padding 0.5 10, radius 2 |
| Match Type | "3-WAY MATCH" — `.type-10-semibold` caps, 0.5px tracking, `--text-dark`; radius 0 2 2 0, no visible fill |

## Anatomy & spacing
Row height 16 · every item, caret and slot 10 apart (`--space-10`) · text `.type-13-semibold` (Figma `13px/Semibold`, 13/16 — exact match) · caret "Navigation/Right-Caret" 5×8 (glyph 4×7) in the link colour · Dropdown box padding 0 10, gap 10.

## Behaviour
- Earlier levels are links; hovering one turns it and its caret Blue Active (Type=Hover).
- The current level is not a link.
- Dropdown: the current level is a button (`aria-haspopup`). Figma has no menu for it, so none is built.

## When to use — Figma text
- Place breadcrumbs in the top left corner, typically above the page title.
- Show progress from the highest navigation level to the lowest, without skipping a step.
- Placement & convention: used on the sub-header.

## Accessibility
- `<nav aria-label="Breadcrumb">` with an ordered list; the current level has `aria-current="page"`; carets are `aria-hidden`.
- Contrast: #545454 on white 7.6:1, #005399 on white 7.8:1 — pass.

## Open issues
- The Figma current-level text is " Current" with a leading space (adds ~3px on top of the 10px gap). Built without the space.
- Default variant has a hidden caret before the Status tag with no property controlling it; Status and Match Type sit 10px after the current level with no separator.
- Match Type frame carries a hidden #FFEAEE @ 30% fill and a 0 2 2 0 radius — looks like an unfinished pill.
- Status tag text font is taken from the shared Tag Small (10px SemiBold); the instance's text could not be read separately (Figma rate limit).
- Dropdown has no open state, no menu and no hover state; Hover exists only for the earlier level, not for the current/dropdown level.
- No focus, disabled or truncation states.
- Text line-height: Match Type is "auto" in Figma (~14px) vs `.type-10-semibold` 12px — used `normal`.

## Not adopted
- `.documentation` instance (3041:9086) — text used above; its "Variation Examples" frame is a label only.

## Sources
Figma — https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=3044-1280
Industry gaps (not added): Carbon Breadcrumb usage — https://carbondesignsystem.com/components/breadcrumb/usage/ · Fluent 2 Breadcrumb usage — https://fluent2.microsoft.design/components/web/react/core/breadcrumb/usage
