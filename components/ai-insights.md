# AI Insight cards and Artifacts — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163) › section "Freehand - ai - component" › `.Insight_Card` 4514:10895 · `.Insights` 4514:10994 · `Artifacts` 4514:13552 · `Action icon buttons` 4524:7455
**Files:** `ai-insights.css` (styles + component tokens) · `ai-insights.js` (`pdsAiInsights` builders + Show More / Show Less) · `ai-insights.html` (live doc)
**Uses (kit):** `readonly.css` (Label Readonly Text) · `skeleton.css` (Skeleton 220 Light, `.Skeleton Block Light`) · `scrollbar.css` · `button.css` (Text Only Small, Action, Icon No Background Small) · `icons.css` + `icons/icons-data.js`

## What it is
The AI chat's result pieces: an insight card, the Quick Insights list of cards, the Artifacts list and the Artifacts viewer (Context), and a row of action icons. Figma has no description text for these components.

## Variants
### .Insight_Card — `Property 1` × `Show Details` × `Action Button`
| State | Fill | Stroke | Shadow | Content |
|---|---|---|---|---|
| Default | `--white` | 1px `--border-grey` #EFEFEF | — | icon circle + title + description |
| Load | `--white` | 1px `--border-grey` | — | empty icon circle + Skeleton 220 Light (kit) |
| Hover | `--white` + `--status-orange-light` #FFF4E5 @ 42% | 0.5px `--highlight-orange` #FF8C54 | `--shadow-2` | as Default |

- **Show Details** (boolean, default false): rows of two Label Readonly Text items (“Label Text : Information Text”), text #404040.
- **Action Button** (boolean, default false): Indicator Icon/Download + View, 14px, top-right.
- **Icon tones** (instance overrides in `.Insights`): Load-Material `--border-blue` / `--pando-dark` (default) · Cost `--status-purple-light` / `--status-purple-dark` · Records `--status-cyan-light` / `--status-cyan-dark` · Impact `--accent-error-red-light` / `--status-red-dark` · Calendar `--status-orange-light` / `--status-orange-dark`.
- Title `.type-12-semibold` `--pando-dark`; description `.type-12-regular` `--pando-dark` (master).

### .Insights — `Property 1` × `Size` (3)
| Variant | Cards | Toggle |
|---|---|---|
| Default, Size=Default | first 2 | “Show More” + down caret |
| Expanded, Size=Default | all 4 | “Show Less” + up caret |
| Expanded, Size=Large | 4 in 2 columns | none |

Label “Quick Insights” `.type-10-semibold` UPPER +0.5px `--dark-input-text`. Toggle = kit Text Only Small (`--pando-blue`, `.type-10-bold` UPPER) + Navigation/Button-Down-Caret `--text-medium`. Cards inside: white @ 40%, title `--status-blue-dark` #0D204A, description `.type-11-regular`.
Sample data (Figma): Tariff Name Mismatch · 15 invoices · $34,210 impact / GL Code Unallocated · 8 invoices · $12,440 impact / Pending Approval · 12 invoices · $44,100 total / Overdue Invoices · 24 invoices · $39,340 at risk.

### Artifacts — `Type` (2)
| Type | Size | Fill | Border | Radius | Shadow |
|---|---|---|---|---|---|
| List | 320 × 710 | `--white` | 1px `--border-grey` | 8 | `--shadow-3` |
| Context | 620 × 710 | `--white` + `--accent-light-blue-bg` @ 60% | 1px `--border-grey` | 0 | — |

- List: header “Artifacts” `.type-10-semibold` UPPER +0.5px `--pando-blue-active` + Close (Navigation/Close-Tag 14, `--grey-dark`); cards = `.Insight_Card` without icon, text #404040, description `.type-11-regular`, timestamp via Label Readonly Text (10 Regular / 12, +0.5px). Scrolls with the kit scrollbar.
- Context: Icon Button No Background Small (Indicator Icon/Details) + name “< Artifact Name >” Open Sans Bold 14 `--pando-dark`; right: Action buttons SHARE (10px Upload) and DOWNLOAD (10px Download) in `--pando-dark`, 16px vertical divider `--border-input-light`, Close. Body = slot “Replace Content”, scrolls with the kit scrollbar.

### Action icon buttons (1)
10px action icons Clone · Accept · Reject · Upload drawn at 12px, `--grey-medium` #A3A3A3, gap 15, padding-top 5.

## Anatomy & spacing
| Part | Values |
|---|---|
| Card | width fills container · padding 10 / 15 · gap 10 · radius 4 |
| Icon circle | 30 · glyph 20 · padding 5 |
| Content | gap 4 · header gap 10 |
| Details | row gap 10 · item gap 5 · space-between |
| Card actions | 14px icons · gap 20 |
| Load | 58 tall (skeleton 38) |
| Quick Insights | width 499 · gap 8 · Large: header ↔ grid 15, grid gap 8 |
| Artifacts | padding 15 · List gap 10 · Context gap 15 · header padding 5 0 5 3 (List) · tools gap 20 |
| Action icons | 12 · gap 15 · padding-top 5 |

## Behaviour
- **Show More / Show Less** (Figma Default ↔ Expanded): `pdsAiInsights.bind(document)` toggles the list; `setExpanded(root, bool)` sets it. The toggle hides itself when there are 2 cards or fewer.
- **Hover**: CSS `:hover` (`.is-hover` shows it statically). Load has no hover.
- **Loading → loaded**: render the card with `state:'loading'`, then replace it with the built card. Figma shows no transition.
- Close buttons and the card actions have no behaviour in Figma; wire them in the product.

## When (not) to use
Figma has no usage text for these components.

## Accessibility
- Show More is a `<button>` with `aria-expanded` and `aria-controls`.
- Icon-only buttons carry `aria-label` (the Figma icon name). Focus ring `2px solid --pando-blue`, offset 2 — added in review, not in Figma.
- Loading card: `aria-busy="true"` + `aria-label="Loading insight"`.
- Contrast (for the accessibility pass): “Quick Insights” #8A8A9E on white 3.4:1; action icons #A3A3A3 on white 2.5:1.

## Open issues
- Line height: Figma “auto” (12px → 16, 10px → 14); tokens give 17 and 12, so cards are ~2–3px taller (58 vs 55).
- Artifact name is Bold 14; no `.type-14-bold` in tokens.css (component token used).
- #404040 is not in tokens.css (detail text, artifact card text).
- Indicator Cost and Calendar are two-colour in Figma; kit icons are single-colour.
- Context Icon Button instance shows a #EEF2F4 background in Default; kit “No Background” has none (kit kept).
- Share / Download text is #234357 in Figma vs kit Action #376F99 — overridden inside the Artifacts header via `--button-action-fg`.
- Caret sits inside the Show More button (one control); in Figma it is a sibling. The kit Show more molecule (different arrow, #0078DD) was not used.
- No click target, Pressed, Selected or Focus state for cards in Figma.
- Close in List / Context has no defined behaviour.

## Not adopted
- `.Insight_Card` **Property 1=Clear** — hidden in Figma (“Clear? [Text Only] / no”, fill #E9F1F5, padding 15; the Text Only instance is empty). Not built.
- Hidden layers: Tag instances in the card header (Maroon Dark square, Default rounded), Close in the Hover header, Detail 2 / Detail 3 rows, hidden “Insights” header with caret and line in `.Insights` Default, hidden Scrollbar in Artifacts List.
- Industry gaps (not added): expandable-tile keyboard toggle and focus/disabled states (Carbon Tile); whole-card action with focus cue (Fluent 2 Card).

## Sources
Carbon Tile usage — https://carbondesignsystem.com/components/tile/usage/
Fluent 2 Card usage — https://fluent2.microsoft.design/components/web/react/core/card/usage
