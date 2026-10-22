# Accordion — Pando DS V1

**Status:** Built 2026-10-23 from Figma, no review file — every published variant treated as Keep · **Figma:** DS V2 – Atoms › 🟢 Accordion › `Accordion` (295:25)
**Files:** `accordion.css` (styles + component tokens) · `accordion.js` (`pdsAccordion.build / init / toggle`) · `accordion.html` (live doc)

## What it is
The Accordion is a collapsible content container that allows users to progressively show or hide related sections of information. It reduces cognitive load by keeping the UI clean and scannable — users expand only the content they need. *(Figma wording, page documentation frame)*

## Variants
Set properties: `Theme` (Light, Dark) × `Type` (Vertical, Slideout, Page) × `State` (Closed, Open, Collapsed) × `Hover` (False, True) × `With Additional Details` (False, True) — **19 variants exist** (not the full matrix). Text props: `Header Title` ("Accordion Header"), `Secondary Text`; boolean `Show Secondary Text` (default off).

Vertical / Slideout header — 35px tall, 2px indicator bar on the left.

| Variant | Background | Title | Toggle icon | Indicator |
|---|---|---|---|---|
| Vertical · Light · Closed | `--accent-off-white` #F8F8F8 | `--pando-dark` #234357 | + `--border-blue-grey` #B5C3CB | #B5C3CB |
| Vertical · Light · Closed · Hover | `--accent-light-blue-bg` #F3F6FC | #234357 | + #234357 | #B5C3CB |
| Vertical · Light · Open | `--white` | #234357 | − #B5C3CB | `--pando-dark` #234357 |
| Vertical · Dark · Closed | `--dark-light` #343440 | `--dark-input-text` #8A8A9E | + #8A8A9E | #8A8A9E |
| Vertical · Dark · Open | #343440 | `--dark-label-text` #D5DAF4 | − #8A8A9E | #D5DAF4 |
| Slideout · Light · Closed | #F8F8F8 | #234357 | → #B5C3CB | #B5C3CB |
| Slideout · Light · Closed · Hover | `--accent-light-highlight` #E9F1F5 | `--text-dark` #313131 | ← `--grey-dark` #515151 | #B5C3CB |
| Slideout · Light · Open | `--white` | #313131 | ← #B5C3CB | #234357 |
| Slideout · Light · Open · Hover | #F8F8F8 | #313131 | → #515151 | `--pando-light` #EEF2F4 |
| Slideout · Dark · Closed | #343440 | #8A8A9E | → #8A8A9E (12px shaft) | #8A8A9E |
| Slideout · Dark · Closed · Hover | #343440 | #8A8A9E | → #D5DAF4 (19px shaft) | #8A8A9E |
| Slideout · Dark · Open | `--dark-darker` #24242F @ 80% | #D5DAF4 | ← #8A8A9E | #D5DAF4 |
| Slideout · Dark · Open · Hover | #24242F @ 80% | #D5DAF4 | ← #D5DAF4 (19px shaft) | #D5DAF4 |
| Vertical · Light · Closed · Additional Details | #F8F8F8 | #234357 | boxed + `--text-dark` | #B5C3CB |
| Vertical · Light · Open · Additional Details | `--white` | #234357 | boxed − #404040 *(off-token)* | #234357 |

Page type — Light only.

| Variant | Header | Title | Right side | Panel |
|---|---|---|---|---|
| Page · Collapsed | `--pando-light` #EEF2F4, radius 4, height 31 | 14px SemiBold `--pando-blue-active` #005399 + "ACTIVE" switch | "EXPAND" 10px SemiBold caps `--accent-tertiary-action` #6D8EB4 | — |
| Page · Open | same | same | "COLLAPSE" | white, pad 10/8/10/15 → inner `--accent-alternate-white` #F9FAFA, pad 10, gap 4 |
| Page · Collapsed · Additional Details | same, height 28 (title line-height 16) | same | Stats slot + EXPAND, gap 20 | — |
| Page · Open · Additional Details | same | same | Stats slot + COLLAPSE | as Page · Open |

**With Additional Details slot** (`Additional Info - Swappable with Local`, 3 types): *Toggle Inputs* — "Package Received" 12px `--text-dark` + switch "YES" + empty checkbox; *Stats* — tags "DIM / Tag Text / Qty" (#D9E6FF `--status-blue-light`, 10px SemiBold, radius 2, pad 0.5/2) + values 12px `--text-medium`; *Text Status* — "Picked Up" 12px `--status-cyan-dark`.

## Anatomy & spacing
- **Vertical / Slideout header:** width fluid (577 in Figma) · height 35 · padding 0 10 0 15 (`--space-10`, `--space-15`) · space-between · indicator 2×35 absolute at the left edge · title↔secondary gap 5 · slot↔toggle gap 20 · toggle icon 20×20 (glyph 11×11; arrow 12 or 19 shaft).
- **Title:** `.type-12-semibold`, uppercase, **letter-spacing 0.3px** (Figma `12px/Heading-AllCaps`, line-height auto).
- **Secondary text:** 8px dash + `.type-12-regular` (line-height 16), `--pando-dark`, gap 5.
- **Boxed toggle:** 20×20, white, 0.5px `--pando-light` border, radius 2.
- **Page header:** padding 6 20 · radius 4 · heading↔switch gap 10 · title `.type-14-semibold`.
- **Page panel:** padding 10 8 10 15 · inner padding 10 · gap 4 · title row gap 8 with 20px refresh icon · title 12px SemiBold `--pando-dark` · body `.type-12-regular` line-height 16, #000000 *(off-token)*.

## Behaviour
- Clicking the header (or Enter / Space on it) toggles Closed ↔ Open; `aria-expanded` and the panel's `hidden` follow. Each accordion opens on its own (no "one open at a time" rule in Figma).
- Vertical: + when closed, − when open. Slideout: → when closed, ← when open. Page: "EXPAND" / "COLLAPSE".
- Hover exists only where Figma has it: Vertical Light Closed, Slideout Light (Closed, Open), Slideout Dark (Closed, Open). Dark hover lengthens the arrow shaft.
- Vertical and Slideout have no content panel in Figma; whatever is passed as `content` is shown as-is.

## When (not) to use — Figma text
*From the page's "📄 Accordion — Full Documentation" frames (flagged under Open issues: several values in them do not match the component).*
- Vertical: best for data tables and detail panels where users browse selectively.
- Slideout: best inside navigation drawers with grouped menu items. Communicates direction with arrows.
- Page: best for dashboards where entire sections can be toggled. Includes swappable content slots.
- Additional Details: use inline metadata headers for data grids so users can scan without expanding every row.
- Theme: Light theme by default. Dark theme only in dark-mode sidebars or on dark backgrounds.

## Do / Don't — Figma text
- Do: use when content sections are long and users may only need specific parts.
- Do: keep accordion headers short, clear, and scannable (ideally under 5 words).
- Do: use Vertical for page body; Slideout for navigation panels; Page for section grouping.
- Do: use Additional Details = True to show metadata that helps users decide to expand.
- Do: maintain consistent accordion types within the same context.
- Don't: nest accordions more than 2 levels deep.
- Don't: use for content users always need to see — show it directly instead.
- Don't: place critical actions or alerts inside collapsed content.
- Don't: truncate important header info just to force expansion.
- Don't: mix Vertical and Slideout types in the same list.
- Don't: use when only 1–2 items exist — just show the content. *(in one of the three doc frames only)*

## Accessibility
- Header is a `<button>` with `aria-expanded` and `aria-controls`; the panel is `role="region"` labelled by the title. Figma text: "Headers must be keyboard-focusable. Use aria-expanded to communicate open/closed state."
- Slot content inside the header (switch, checkbox, tags) is rendered visual-only (`aria-hidden`) — interactive controls cannot live inside a button.
- Contrast for the accessibility pass: Dark closed title #8A8A9E on #343440 = 3.6:1; Page action #6D8EB4 on #EEF2F4 ≈ 3.0:1; Light icons #B5C3CB on #F8F8F8 ≈ 1.7:1.

## Open issues
- Light Slideout hover arrows point the other way to their resting state (Closed·Hover ←, Open·Hover →). Built as drawn.
- Missing states: no Hover for Vertical·Light·Open, Vertical·Dark, Page; no Dark Page; no Additional Details for Slideout or Dark; no focus, disabled or pressed states.
- Slideout·Light·Closed title is #234357 while the other Light Slideout states use #313131.
- Slideout·Light·Open·Hover indicator is #EEF2F4 — barely visible.
- Page title uses an unstyled fill #005399; Page action uses "Temp/ Greyblue" (#6D8EB4), a temporary style.
- Panel body text is #000000 and the boxed minus is #404040 — neither is in tokens.
- Title tracking 0.3px vs `.caps` 0.5px; title/heading line-heights are "auto" in Figma (≈16/19) vs the type classes' 17/19; Page Additional Details heading uses line-height 16, so that header is 28 tall instead of 31.
- Page header always shows a switch ("ACTIVE") with no property to hide it; a hidden "Status/Indent Type" icon and "Pointed Tag" exist with no property — not built.
- Figma docs on this page disagree with the component: hover bg "#E9F1F5" (Vertical is #F3F6FC), header text "#313131" (is #234357), Dark bg "#234357" (is #343440 / #24242F 80%), Slideout Light bg "#FFFFFF" (is #F8F8F8), Vertical open "content bg #F8F8F8" (no content panel exists). The docs also ask for a 200ms ease-in-out expand transition — not built (no motion tokens yet).
- Secondary text colour in Dark is not set in Figma (always hidden); the build uses #234357 everywhere.
- The `.documentation` instance (3000:1217) could not be read (Figma rate limit).

## Not adopted
- `Third Level Accordian` set (7679:4651) and the loose frames around it ("Route Card", "Packs", indicator icons, checkbox) — product-specific route/package rows, not part of the `Accordion` set; publish status could not be confirmed.
- Loose instances on the page (11105:4210, 8639:4482, 7679:4565, 7678:31263, 3011:1221), the "Default / Hover / Active" labels, and the exploded documentation fragments (body-row, left-col, pill, specs, etc.).
- Helper sets `.arrow-right`, `.arrow-left`, `.Panel - Swappable with Local`, `Additional Info - Swappable with Local` are built as parts of the accordion, not as separate components.

## Sources
Figma — https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=295-25
Industry gaps (not added): Carbon Accordion usage — https://carbondesignsystem.com/components/accordion/usage/ · Fluent 2 Accordion usage — https://fluent2.microsoft.design/components/web/react/core/accordion/usage
