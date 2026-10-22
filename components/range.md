# Range — Pando DS V1

**Status:** Built from Figma 2026-10-23 · no review decisions (everything published kept) · **Figma:** DS V2 – Atoms › Range page (3224:2928)
**Files:** `range.css` (styles + component tokens) · `range.js` (`pdsRange.build` / `pdsRange.init`) · `range.html` (live doc)

## What it is
The Range page publishes three slider sets that do the same job (see Open issues #1):

| Set | Figma | Class | Handles | Fill |
|---|---|---|---|---|
| Range | `Range` 3235:3847 | `.pds-range--light / --dark` + `--tight / --loose` | 1 | none |
| Slider | `Slider ` 8568:2053 | `.pds-range--slider` (+ `--steps-16`) | 2 | `--pando-blue` |
| Dual Range | `Dual Range` 8570:1364 | `.pds-range--dual` | 2 | `--highlight-blue-light` |

The Figma Overview text is copied from Carbon and is not used (Open issues #2).

## Variants

### Range (single handle) — Theme × Spacing = 4, plus booleans Label (on) and Scale (on)
“Spacing” is tick density: **Tight** = 21 ticks (scale 0–1000), **Loose** = 5 ticks (scale 50–250).

| | Light | Dark |
|---|---|---|
| Width | 200 | Loose 310 · Tight 307 |
| Track | 200×8 `--border-input-light` #E2EAEC (Loose: 191×9 at x 4.5) | 300×8 `--grey-dark` #515151 (Loose at x 5) |
| Ticks | 3×3 `--border-blue-grey` #B5C3CB | Loose 4×4 · Tight 3×3, #B5C3CB |
| Label | `.type-12-regular` `--text-dark` #313131 | white |
| Unit | `.type-10-regular` `--text-medium` #545454 | `--border-blue-grey` #B5C3CB |
| Scale | `--type-10-regular`, tracking 0, `--text-light` #6C6C6C | `--border-blue-grey` #B5C3CB |
| Selected label | `--type-10-semibold` `--text-dark` | `--dark-highlight-green` #1FCD93 regular (Loose only — Tight has none) |
| Thumb | 14 · carets `--pando-blue` | 20 · carets `--gradient-forest-green` |
| Label row ↔ track | 10 | 15 |

### Slider (two handles) — Level = 0 to 1 / 0 to 1.5 / 1 to 1.5
| Level | Width | Dots | Handles (dot index) | Scale |
|---|---|---|---|---|
| 0 to 1 | 374 | 16, gap 20 | 0 · 1 | 0–14, `#667085` (off-token) |
| 0 to 1.5 | 324 | 6, gap 50 | 0 · 2 | none |
| 1 to 1.5 | 324 | 6, gap 50 | 1 · 2 | none |
Track 8, radius 1000, `--border-input-light` · fill `--pando-blue` · dots 4×4 `--accent-off-white` #F8F8F8.

### Dual Range (two handles) — Level = 0 to 2 / 0 to 16 / - to 4 / 2 to 4, plus Show Scale Count
334 wide · track 332×8 at x 2, radius 8, `--border-input-light` · fill `--highlight-blue-light` #9CD2FF · 17 cells 12×8, 8 apart, dot 4×4 `--accent-off-white` · scale count 00–16 `--text-light`, `.type-10-regular`, 4 below the track. “- to 4” draws as 0 to 4.

## Anatomy & spacing
- **Thumb** (all sets): circle, `--accent-alternate-white` #F9FAFA, 1px `--dark-input-text` #8A8A9E. Two chevron carets ‹ ›: light 3×5, gap 4 · dark 4.5×8, gap 5.6.
- **Range**: label row (label · 5 · unit) → track → 10 → scale (space-between across full width). Dark wraps the track in 2px top/bottom padding. Track radius 9, ticks spread with 2px side padding.
- **Slider**: thumb row 14 tall, track at top 3; dots start at x 5; scale 2 below the track, one cell per dot.
- **Dual Range**: as Slider, track at x 2, scale 4 below.
- Thumb centre at min: Range Light 6, Dark 10; Slider 7; Dual 8. Positions are within ~2px of Figma.

## Behaviour
- Figma: “Sliders can be manipulated by moving the thumb along the track, or by selecting a spot along the track that the thumb will jump to.” `range.js` does both; on two-handle sets the nearest handle moves and handles cannot cross.
- Range snaps to its ticks (step 50). Slider / Dual Range snap to dots.
- Keys — **added in review, not in Figma**: ←/↓ one step down, →/↑ one step up, Home/End min/max.
- Focus ring — **added in review, not in Figma**: `outline: 2px solid var(--pando-blue); outline-offset: 2px`.
- On change the root fires `pds-range:change` with `detail.values`.
- No hover, pressed, disabled or error state (none in Figma).

## When (not) to use
**When to use** *(Figma wording)*
- Sliders provide a visual indication of adjustable content, where the user can increase or decrease the value by moving the handle along a horizontal track.
- Use when selecting a single value or range of number values.
- Use sliders when there is a need to show a selection of a single value or range of values.

**When not to use** *(Figma wording)*
- Do not use for extremely large ranges, for example, 1-Max.
- Do not use ranges that are too small, for example, 1-2.
- Do not use complex inputted values that are not numbers.

**Placement & convention** *(Figma wording)*: The slider label should indicate what value the slider is changing. Range values are used to describe the range in numbers.

## Do/Don't
As in Figma, no captions: **Do** — Light Tight with scale 0 / 200 / 400 / 600 / 800 / 1000. **Don’t** — scale 0 / 100 / 200 / 300 / 400 / MAX.

## Accessibility
- Every handle: `role="slider"`, `tabindex="0"`, `aria-valuenow/min/max`, label = field label (or “Minimum” / “Maximum”). On two-handle sets each handle’s min/max is the other’s value. (WCAG 4.1.2)
- Click-to-jump is the single-pointer alternative to dragging. (WCAG 2.5.7)
- For the accessibility pass: 14px thumb is under 24×24 (WCAG 2.5.8); several non-text contrasts are under 3:1 (Open issues #13).

## Open issues
1. **Three sets doing the same job — pick one.** Range (no fill), Slider (Pando blue fill), Dual Range (light blue fill) differ in fill, track radius (9 / 1000 / 8), dot colour (#B5C3CB vs #F8F8F8), scale style and spacing.
2. **Overview copied from Carbon** — describes “default and range” variants with number inputs V1 does not have. Not used.
3. **When to use** — 4th bullet (“Use when needing to expose a variety of options or to limit the number of options quickly.”) matches Carbon; left out. Bullets 2 and 3 repeat each other.
4. **Behaviour** — “All interactions are optimized for mouse, keyboard, and touch.” is Carbon wording and no keyboard/focus spec exists. Left out.
5. **Placeholder** — old `.documentation` block “Uses:” = “Enter suggestion here”.
6. Do / Don’t have no captions.
7. No states in any set (hover, focus, pressed, disabled, error). Range “Type” has one option (Stepper). Default Theme is Dark.
8. Range has no filled track; Dark Tight has no selected-label highlight (Dark Loose does).
9. Thumb: 14px light vs 20px dark; under 24×24 target; built from Navigation/Collapse-Expand parts. Dark carets use the Forest Green gradient. Light thumb border uses dark-theme `--dark-input-text`.
10. Light Loose track is 191×9 (others 200×8), with 17 hidden dot layers; end labels don’t line up with the track.
11. Slider: “Gray Text” #667085 not a token; 16-dot scale shows 0–14 (12–14 outside its frame); other levels have no scale; Level names match no shown number; widths 374 vs 324; set name has a trailing space.
12. Dual Range: “- to 4” = “0 to 4”; 3 hidden “16” labels in #667085.
13. Contrast (non-text, < 3:1): light track vs white 1.22 · Dual fill vs track 1.32, vs white 1.61 · dark track vs #24242F 1.93 · tick dot vs light track 1.48. Thumb border vs white 3.38, Pando blue fill vs track 3.71.
14. Type: label 12/auto (built `.type-12-regular` 12/17); Range scale 10/auto tracking 0 (built `--type-10-regular` 10/12, tracking 0); Slider/Dual scale use 10/12 +0.5 for the same role.
15. Dark Loose and Dark Tight place the track differently (x 5 vs 0); Dark variants need a loose dark rectangle to read on canvas.

### Industry gaps — not added
- Paired number input (Carbon, Fluent 2, Ant Design).
- Focus, disabled and error states (Carbon, Ant Design, WCAG 4.1.2).
- Written step + keyboard rules, Shift+arrow jumps (Carbon, Ant Design, Fluent 2).
- Min/max end labels + value tooltip (Carbon, Fluent 2, Ant Design).

## Not adopted
Dark backdrop rectangle 3235:3823 · stray instances 3714:3523, 3714:3524, 8577:3020 · orphan “15” text 8568:2148 · Spectral / Specs sheets 5414:13354, 5414:13443 · old `.documentation` block 3235:3848. The `.dot` part 8576:1379 stays only as Dual Range’s internal cell.

## Sources
Carbon Slider usage — https://carbondesignsystem.com/components/slider/usage/
Fluent 2 Slider usage — https://fluent2.microsoft.design/components/web/react/core/slider/usage
Ant Design Slider — https://ant.design/components/slider
WCAG 2.2 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
WCAG 2.2 2.5.7 — https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
WCAG 2.2 1.4.11 — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
WCAG 2.2 4.1.2 — https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html
