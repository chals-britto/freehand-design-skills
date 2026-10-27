# Progress Indicator — Pando DS V1

**Status:** Built from Figma, not yet reviewed · **Figma:** DS V2 – Molecules › ✏️ File Upload › `Progress Indicator` (3164:1340)
**Files:** `progress.css` (styles + component tokens) · `progress.js` (`pdsProgress.set`) · `progress.html` (live doc)

## What it is
A thin bar with a short text that shows how far a multi-step task has got (Figma sample: “2/5 steps”). It was split out of File Upload so other screens can reuse it; File Upload links this component. Figma has no description text for it.

## Variants
`Theme` × `State` = 2 × 6 = 12 variants. State 0–5 = steps done out of 5.

| Theme | Track | Fill | Text |
|---|---|---|---|
| Light | `--border-input-light` #E2EAEC | `--dark-highlight-green` #1FCD93 | `--text-dark` #313131 |
| Dark | #484858 (off-token, “Dark/Input BG”) | `--dark-highlight-green` #1FCD93 | `--dark-input-text` #8A8A9E |

| State | Fill width (of 50) | Value | Figma text |
|---|---|---|---|
| 0 | 4px nub, left corners rounded only | 0 | 0/5 steps complete |
| 1 | 10 | 20 | 1/5 steps |
| 2 | 20 | 40 | 2/5 steps |
| 3 | 30 | 60 | 3/5 steps |
| 4 | 40 | 80 | 4/5 steps |
| 5 | 50 | 100 | Complete |

Dark is for dark surfaces (Figma shows it on `--dark-bg` #393945; the backdrop is not part of the component).

## Anatomy & spacing
Row: track + text, gap 5, centred vertically, width hugs content.
Track 50 × 4, radius 10 (reads as a pill). Fill sits on top of the track from the left, same radius, shadow `--shadow-2` (0 2px 4px 6%).
Text `.type-10-regular` (10/12, tracking 0.5px — Figma style “10px/Regular/Sp0.5px”, exact match).

## Behaviour
- `pdsProgress.set(el, value, text?)` — value 0–100 percent; sets the fill width and `aria-valuenow`. The optional text replaces the visible text and is mirrored to `aria-valuetext`.
- Any percent works; Figma only draws the five steps (20% each). At 0 the 4px nub stays visible, as in Figma State 0.
- Fill width animates 0.2s (off when reduced motion is on). *Added in build — Figma has no motion.*

## When (not) to use
Figma has no usage text for this component.

## Accessibility
- `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow` = percent; `aria-valuetext` = the visible text (e.g. “2/5 steps”). Set by `progress.js`.
- It needs an accessible name: pass `label` (→ `aria-label`) or add `aria-labelledby`. Figma has no label, so the screen that uses it must supply one.
- Contrast for the accessibility pass: Dark text #8A8A9E on #393945 is 3.37:1 (< 4.5). Fill #1FCD93 against the Light track #E2EAEC is 1.69:1 and against white 2.06:1 (< 3:1 non-text). Dark fill vs track 4.36:1 passes 3:1.

## Open issues
- Text copy is inconsistent in Figma: State 0 says “0/5 steps complete”, States 1–4 say “n/5 steps”, State 5 says “Complete”. Kept as Figma; needs a copy decision. Several Figma strings have a trailing space (trimmed here).
- Dark State 5 track is #E2EAEC (the Light colour) instead of #484858. It is fully covered by the fill so it does not show; built with the Dark track.
- #484858 is not in tokens.css (also used by input, scrollbar, toggle).
- Light State 0 frame is fixed at 153px while the others hug; 153 = 50 + 5 + text width, so built as hug.
- No accessible name in Figma (see Accessibility). No error, paused or indeterminate state.

## Not adopted
- Rectangle 4428 on the page (#393945 backdrop behind the Dark variants) — not part of the component.
- The rest of File Upload (2466:10340) — built separately; it will link this component.

## Industry gaps — not added
- Indeterminate variant for unknown duration (Carbon, Fluent 2).
- Error state with red bar and helper text, and a success icon (Carbon); Fluent 2 swaps the status text for an error message.
- A label above the bar that names the process (Carbon: label must exist, even if visually hidden).
- Big size, 8px tall (Carbon; Small = 4px matches V1).

## Sources
Figma — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=3164-1340
Carbon Progress bar usage — https://carbondesignsystem.com/components/progress-bar/usage/
Fluent 2 ProgressBar usage — https://fluent2.microsoft.design/components/web/react/core/progressbar/usage
