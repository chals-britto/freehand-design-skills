# AI Action popup, AI input, options — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163) › section “Freehand - ai - component”
**Files:** `ai-action-popup.css` (styles + component tokens) · `ai-action-popup.js` (`window.pdsAiPopup`) · `ai-action-popup.html` (live doc).
**Reuses:** `radio.css` (Radio in the options), `button.css` + `button-group.css` (Skip / Confirm, Type=Buttons), `input.css` (Input - Text / .Base Input markup for `.Input - Text`), `ai-chat-composer.css/js` (the prompt bar and `.send` inside `.Input`), `icons/` (Indicator Icon/Edit 14, Navigation/Filter Arrow, Indicator Icon/Impact 14, Indicator Icon/Details 14, Navigation/Close-Tag), the kit Button spinner vector (Responding). Classes are self-contained (`.pds-ai-popup*`, `.pds-ai-option*`, `.pds-ai-input*`) so the Slideout Chat can compose them.

## What it is
The popup the AI shows inside the chat to confirm a set of changes or to ask which interpretation the person means, with a free-text “Something else in mind” field and Skip / Confirm. Also the `.Input` prompt bar (with a Prompt chip, and Skipped Action / Tagged states) and the “Processing” responding text. Figma has no description text on these sets.

## Variants
13 published variants, all built.

| Set | Variants | Class | Values |
|---|---|---|---|
| **Action - popup** 4514:13504 | Type=Default, State=Default · Type=Option, State=Default | `.pds-ai-popup`, `--option`; parts `__card`, `__header`, `__heading`, `__body`, `__summary`, `__label`, `__from`, `__to`, `__options`, `__actions`, `__skip`, `__confirm`, `__footer` | Card 760, `--white`, 1px `--status-brown-medium` #FAAE3C inside, radius 8, shadow 0 0 42 −12 #000 16% (off-token) · heading SemiBold 16/auto `--status-brown-dark` #422500 · Default: Summary list · Option: 3 options · both: `.Input - Text` + Button Group + disclaimer |
| **.Option** 4514:10881 | State=default · State=Hover | `.pds-ai-option`, `.is-hover`, `--radio`, `.is-selected`; parts `__text`, `__arrow` | default: no fill, 0.5px bottom `--border-input-light`, Regular 12 `--text-dark` · Hover: `--white`, radius 4, text + Filter Arrow (→) `--freehand-orange` #FE6505 |
| .Option in the popup | Radio Selected Yes / No | `.pds-radio.pds-ai-option.pds-ai-option--radio` | kit Radio 14 · gap 10 · SemiBold 12 · selected ring/dot #FE6505 (override) · selected row: #FFF7ED → white at 80%, 0.1px `--highlight-orange`, radius 4 |
| **.Input - Text** 4519:6595 | Property 1=Default · Hover | `.pds-input.pds-ai-input-text`, `.is-hover`; `__caret` | kit Input - Text (Light, Default, Empty, 200, no label): 42 tall, padding 10, radius 4, 1px `--border-input-light`, Edit 10 `--pando-dark`, placeholder “Something else in mind” Regular 12 `--text-light` · Hover = Input State=Active border `--pando-blue` + Cursor/Typing caret #295EFF |
| **.Input** 4514:13465 | Property 1=Default · Skipped Action · Tagged | `.pds-ai-input`, `--skipped`, `--tagged`; parts `__chip`, `__float`, `__hint`, `__link`, `__tag`, `__tag-text`, `__tag-close`, `__chat`, `__footer` | Bar = kit composer (stacked, Light): padding 15 15 10 15, gap 15, radius 8, 1px `--border-grey`, `--shadow-3`, placeholder “Ask Freehand” #737373 · chip “Action” + Impact (Tagged: “Insights” + Details) · Add 14 `--text-light` · `.send` 28 (Default·Light #CBD4D8; Active = `.send` main #FE6505) |
| **.Responding_Text animation** 4524:7918 | Default · 2 · 3 · 4 | `.pds-ai-popup-responding`, `--f1…--f4`, `--live` | spinner 12 + “Processing” SemiBold 12/16 + “...” Regular 12/16, gap 4 · Default: `--text-dark` + dots · 2: grey gradient, no dots · 3: grey gradient + dots · 4: `--text-dark`, no dots |

Summary text (Type=Default): label SemiBold 12 `--text-dark`, “from” SemiBold 13 `--dark-input-text`, “ → ” SemiBold 13 #1E2939 (off-token), “to” SemiBold 13 `--freehand-orange`, line height 22, bullet list. Sample: “Payment due date : Multiple → 25 Aug 2025”, “Classification of goods : NA → General Cargo(Non DG)”.

Button Group instance: Type=Buttons, **space-between, gap 10** (kit default is right-aligned, gap 20). Skip = Secondary #EEF2F4 with label gradient #041F04 → #343440 (Figma uses the Theme=Studio button). Confirm = Primary with fill gradient #041F04 → #343440 (kit #0076DD). Both labels Bold 12 UPPER.

## Anatomy & spacing
- **Popup**: card padding 20, gap 20 · header padding 0/5 · body gap 10 (Default) / 15 (Option) · Summary padding 10, radius 4 · disclaimer “Freehand can make mistakes. Please double-check responses.” Regular 9.5/12 `--text-medium`, padding 10 10 0, centred.
- **.Option**: 36 tall, padding 10, gap 10, arrow 10.
- **.Input - Text**: 42 tall, padding 10, icon ↔ text 10, radius 4; caret at x 22, 1.5 × 13.
- **.Input**: bar padding 15/15/10/15, rows gap 15, left group gap 15 · chip padding 6/12/6/8, gap 8, radius 14, `--accent-alternate-white` + 1px `--border-input-light`, Regular 10/12 `--text-dark`, icon 14 · Skipped message: outer padding 0/10, inner 6/15/12/15, radius 12 12 0 0, #FFF7ED (off-token), overlaps the bar by 7 (Figma gap −7); hint Regular 10/12 `--text-medium`, link SemiBold 10 `--status-brown-dark` + Filter Arrow → · Tagged: outer 0/10, inner 5/10, radius 6, #FFF7ED, gap to bar 4; “Context : ” Regular 10/12 `--text-medium` + value SemiBold 10 `--status-brown-dark`, Close-Tag 10 `--grey-dark`.
- **Responding**: 96 × 16, gap 4.
- px values not on the spacing scale: 20, 5, 4, 6, 7, 8, 14, 18, 28, 36, 42, 9.5, 13, 22.

## Behaviour
- `.Option`: On hover → Hover (the only Figma reaction in these sets).
- `.Responding_Text animation`: Figma chains Default → 2 → 3 → 4 → Default, each After delay 1–10 ms + Smart animate 300 ms ease-out. Built as a 1.2 s CSS loop (`--live`), colours interpolated through registered custom properties. **Reduced motion holds frame 1 and stops the spinner.** Needs a motion decision (Open issues 1).
- Added in review (`pdsAiPopup.bind`): picking an option clears the text field; typing in it clears the option; Enter in the field or Confirm fires `pds-ai-popup:confirm { option, text }`; Skip fires `pds-ai-popup:skip`; option change fires `pds-ai-popup:select { value }`. In `.Input`: chip → `pds-ai-input:chip { text }`, Skipped link → `pds-ai-input:suggest`, Tagged × removes the tag and fires `pds-ai-input:untag`. The bar keeps the composer behaviour (`pds-ai-composer:send`, Enter sends, send enables with text).

## When (not) to use
No guidance in Figma.

## Accessibility
- Popup is a `<section>` named by its heading; options are a `<fieldset>` of native radios (arrow keys move the choice) with the heading as a hidden legend.
- Field has `aria-label` = placeholder. Chip, link and Tagged × (“Remove context”) are buttons. Responding is `role="status"`, dots `aria-hidden`.
- Focus `2px solid --pando-blue`: on the option row, the bar (while the field has focus), chip, link and × — added in review, not in Figma. Buttons, radios and Input use the kit focus.
- Contrast for the accessibility pass: Summary “from” #8A8A9E on the summary ≈ 3.4:1 · Option hover #FE6505 on white ≈ 3.0:1 · Responding frames 2–3 grey text ≈ 1.6–2.5:1 · disclaimer 9.5px (#545454 7.5:1 but under 10px) · placeholder #737373 4.7:1 (passes).

## Open issues
1. **Motion decision needed** for `.Responding_Text animation`: speed (4 × 300 ms) and whether it should loop at all; built as a CSS loop with reduced motion holding frame 1.
2. Responding spinner is a 32 px animated GIF (blue ramp, darkest #047ADC) scaled to 12; rebuilt with the kit Button spinner vector in `--pando-blue` so reduced motion can stop it.
3. Cursor/Typing (GIF) is a 24 px blinking caret used as a mask with a #295EFF colour layer (off-token). Not exported: drawn as a CSS caret (1.5 × 13, 1 s blink); shown only on the static Hover variant (a live field has a real caret).
4. Prompt chip (`Prompt · Theme=Light, State=Default, Type=Simple`, set 3572:14750) is not in the kit yet (it belongs to ai-chat-window, not built). Atom variant missing in kit — built inside `.pds-ai-input__chip`; its Hover / Dark / Icon variants are not built.
5. Instance overrides vs kit: Radio Selected #FE6505 (kit #0076DD); Confirm fill and Skip label gradient #041F04 → #343440 (kit Primary #0076DD); Skip is the Theme=Studio button (excluded from the kit) — kit Secondary used with the label override; Button Group space-between / gap 10 (kit right / 20); `.send` scaled 30 → 28; Add #6C6C6C (composer #234357); bar placeholder Regular #737373 (composer Italic #313131).
6. `.Option` master is Regular 12 with no radio; every popup instance shows a Radio and SemiBold 12. The selected row look is an override on the first instance, not a published state.
7. 0.1px strokes (Summary, selected option) are drawn as a 0.1px inset shadow — practically invisible, as in Figma.
8. Off-token: #FFF7ED, #1E2939, #737373, #DCDCDC, #295EFF, shadow 0 0 42 −12 #000 16%.
9. Type not in tokens: SemiBold 16/auto (heading, built 22), Regular 9.5/12 (disclaimer), SemiBold 13/22 (summary values). 12/auto built at 16 (tokens 12/17); 10/12 without `.type-10-*`’s 0.5px tracking.
10. Hidden in Figma, not built: Close-Tag in the popup header, the “Slot” in the body, the divider above the actions, the bar divider, the right-hand Add and “stop_responce”.
11. No Figma behaviour for Skip, Confirm, chip, Skipped link or Tagged ×; no disabled / loading state on Confirm; no Dark theme.

## Not adopted
- Hidden layers listed in Open issues 10.
- The GIF assets themselves (Open issues 2–3).
- Prompt chip states other than Light Default (wait for ai-chat-window).

## Sources
Ant Design X Prompts — https://x.ant.design/components/prompts (industry gaps, not added: disabled items, description line, nested prompt lists)
Carbon Loading usage — https://carbondesignsystem.com/components/loading/usage/ (industry gap, not added: disable related actions while inline loading runs)
