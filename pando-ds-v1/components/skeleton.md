# Skeleton — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Molecules › ✏️ Skeleton › `Skeleton` (4048:2868), `.Skeleton Block Light` (4047:3588), `.Skeleton Block Dark` (4069:1238)
**Files:** `skeleton.css` (styles + component tokens, no JS) · `skeleton.html` (live doc)

## What it is
Loading placeholder: two bars shown in place of text while it loads, with a shimmer running across each bar. Figma has no description text.

## Variants
`Size` (220 · 180 · 160 · 120 · 80) × `Theme` (Light · Dark) = 10 variants. Each is two `.Skeleton Block` bars.

| Size | Top bar | Bottom bar | Class |
|---|---|---|---|
| 220 | 160px | 220px | `.pds-skeleton--220` (default) |
| 180 | 120px | 180px | `.pds-skeleton--180` |
| 160 | 100px | 160px | `.pds-skeleton--160` |
| 120 | 85px | 120px | `.pds-skeleton--120` |
| 80 | 50px | 80px | `.pds-skeleton--80` |

| Theme | Base fill | Shimmer shade | Class |
|---|---|---|---|
| Light | `--border-input-light` #E2EAEC | `--pando-dark` #234357 at 60% (Start) / 20% (End) | `.pds-skeleton--light` (default) |
| Dark | `--dark-input-text` #8A8A9E | #484858 at 50% (off-token, `--skeleton-dark-shade`) | `.pds-skeleton--dark` |

`.Skeleton Block` (Light and Dark) has 3 variants, `Property 1` = Default · Start · End. Start and End are shimmer frames:
- Default — base fill only.
- Start — linear gradient over the base: shade at 0% → base at 56.7%.
- End — linear gradient over the base: base at 44.4% → shade at 100%.
Static classes for docs: `.pds-skeleton__block--default | --start | --end`.

## Anatomy & spacing
Height 38 fixed, bars centred vertically · bar height 10 · gap 10 (`--space-10`) · radius 5 (Figma 14 / 10, clamped by the 10px height) · no shadow, no border.

## Behaviour
Shimmer, from the Figma prototype on the block: Default → after 0.5s → Start (smart animate 0.3s ease-in) → End (0.3s ease-out) → Default (0.3s ease-in-out). Loop 1.4s. Built as two gradient layers (`::before` Start, `::after` End) cross-fading. All skeletons on a page start together, so they stay in sync.
`prefers-reduced-motion: reduce` → no shimmer, Default fill. `.pds-skeleton--static` turns it off on purpose.

## When to use
Figma has no usage text. In Figma it appears inside List rows in place of column text (example frame “MacBook Air - 1”), and List Column uses it.

## Accessibility
- `aria-hidden="true"` on each skeleton; the bars carry no meaning.
- `aria-busy="true"` on the region being loaded, `false` when done, so screen readers announce once. Do not move focus when content replaces the skeleton. *(Fluent 2 Skeleton)*
- Reduced motion respected.

## Open issues
- Size=120, Theme=Dark is 30px tall in Figma; the other 9 are 38px. Built at 38px.
- Top bar is not a fixed ratio of the bottom bar (73 / 67 / 63 / 71 / 63%). No rule for widths outside the 5 sizes.
- Bars use radius 14 and 10 in Figma; both render as 5. Built as one value.
- No skeleton colour roles: Light borrows `--border-input-light`, Dark borrows `--dark-input-text`; #484858 is off-token.
- Figma does not say which surface the Dark version is for.
- Contrast: #E2EAEC on white ≈ 1.2 : 1 (faint; decorative, no WCAG minimum). Kept.
- Shimmer is an approximation of Figma smart-animate between gradient fills (cross-fade), not frame-exact.

## Not adopted
- Example frame “MacBook Air - 1” (4048:945) — List rows with skeletons; reference only, List is built separately.
- Loose instance `Skeleton` 4114:1153 (Size=220, Dark) outside the set.

## Industry gaps — not added
- Other shapes (avatar, button, input, image). *(Ant)*
- Any number of rows with per-row widths. *(Ant)*
- Pulse animation as an alternative to the wave. *(Fluent 2)*
- Written when-to-use rules (over ~1s, not for long processes or for buttons/inputs/toasts/dropdown items). *(Carbon, Fluent 2)*

## Sources
Fluent 2 Skeleton usage — https://fluent2.microsoft.design/components/web/react/core/skeleton/usage
Ant Design Skeleton — https://ant.design/components/skeleton
Carbon Loading pattern (skeleton states) — https://carbondesignsystem.com/patterns/loading-pattern/
