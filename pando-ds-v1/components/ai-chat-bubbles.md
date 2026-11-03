# AI Chat bubbles, PI and Loader — Pando DS V1

**Status:** As in Figma, no review yet · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163)
**Files:** `ai-chat-bubbles.css` (styles + component tokens) · `ai-chat-bubbles.html` (live doc) · `brand/pi-with-halo-freehand.svg` (exported for the Loader). No JS — hover and motion are CSS.
**Reuses:** `brand.css` (`--brand-pando-green`, `brand/pi-avatar-small.svg`), `skeleton.css` (dark Skeleton 180 in the AI bubble loader), `comment-thread.css` (`.pds-comment-thread__slot` = .Swappable Content), `icons.css` + `icons/` (Header-Logo/Apps › Freehand Logo, Navigation/Dropdown-Arrow solid).

## What it is
The message pieces of the AI chat: `Chat bubble` (User, AI, Loading), `AI bubble` (Pi Summary card, with its private `.button`), `PI` (agent name with dropdown arrow) and `Loader` (Pi with halo). Figma has no description text except "Chat Bubble" on the Chat bubble set. Each block is self-contained; the AI Chat window composes them.

## Variants
25 published variants built (+ Date/ Time on, Button off).

| Set | Variants | Class | Values |
|---|---|---|---|
| Chat bubble 2817:5261 | Type AI/User/Loading × Swapable No/yes × Theme Dark/Light (10) · `Date/ Time` boolean (off) · `Message` "Input text here" · `Time` "10:39 AM" | `.pds-ai-bubble` `--dark` `--light` `--ai` `--user` `--loading` `--swap`; `__avatar`, `__avatar--pi`, `__body`, `__message`, `__text`, `__time`, `__typing`, `__dot` | Dark User `--dark-input-text` 50% / text `--accent-off-white` · Dark AI #484858 50% (off-token `--ai-shade`) / `--dark-label-text` · Dark time `--dark-label-text` · Light User `--status-orange-light`, User swap `--status-skyblue-light`, AI `--accent-light-highlight`, text `--text-dark` · Light time User `--text-light`, AI `--dark-label-text` |
| (typing dots inside Loading) | .typing dark / .typing light, Typing01–09 | `.pds-ai-bubble__typing` | Dark fill #484858 50%, dots `--freehand-orange` / `--highlight-orange` 50% · Light no fill, dots #0078DD (off-token) / `--highlight-blue-light` 50% |
| AI bubble 2808:4906 | Property 1 Loader/Content (2) · `Button` boolean (on) · Slot | `.pds-ai-card`, `--loader`, `__row`, `__header`, `__icon`, `__title`, `__actions` | Fill `--gradient-dark-purple` · accent `--status-brown-medium` (#FAAE3C) · header "Pi Summary" uppercase |
| .button 2808:4899 | State Default/Hover/Red × Theme Dark/Light (5, no Light Red) · "Button" | `.pds-ai-card__button`, `--light`, `--red`, `.is-hover` (doc only) | Dark fill `--accent-off-white` 20%, stroke `--dark-label-text` 50%, text white, hover `--dark-darker` · Red fill `--dark-darker`, stroke/text `--action-red` · Light fill `--status-blue-light`, text `--pando-blue-active`, hover fill `--accent-light-blue-bg` + stroke `--border-blue` |
| PI 3542:14233 | Theme × Property 1 Default/Hover × Type FAP/Procurement Manage Agent (6, no Light FAP) | `.pds-ai-pi`, `--dark` `--light` `--fap` `--procurement`, `__icon`, `__label`, `__arrow`, `.is-hover` (doc only) | Labels "Pi - Freight Pay Specialist" / "Pi - Freight Procurement Analyst" · Dark label + icon #FFA600 (off-token), arrow `--dark-input-text` · Light label `--gradient-pando-green` (text gradient), arrow `--text-dark` · Hover: Dark FAP `--pando-light`, Dark PMA black 80% (off-token), Light `--pando-dark` 10% |
| Loader 4158:14459 | State 1/2 (2) | `.pds-ai-loader`, `__art`, `--state-1`/`--state-2` (doc only) | Pi-With Halo › Freehand, outer ring `--freehand-orange` 9% |

## Anatomy & spacing
- **Chat bubble** row gap 5 (avatar ↔ bubble, bubble ↔ time) · bubble padding 10/15, text ↔ slot 8 · radius AI `0 10 10 10`, User `10 0 10 10` · Swapable = yes bubble 200 wide, slot fills (170) · text `.type-12-semibold` (Figma 12/18) · time `.type-10-regular` 0.5px tracking.
- **Avatars** Dark 38 disc `--dark-darker`, 1px inside ring `--pando-dark` 20%, Freehand logo 21×22 `--freehand-orange` · Light 20 disc Pando Green, Pi-Avatar small 16×17 at x 2 / y 1.5, mirrored. User avatar not built (see Not adopted).
- **Typing** dots 6, active 8, gap 4 · Dark padding 10/15, radius `0 10 10 10` · Light padding 8/15, radius `16 16 16 1`.
- **AI bubble** padding 20, radius 18 · Content 400 wide, gap 15 · Loader 340 wide, gap 10 · rows gap 10 · icon 20 · title `.type-12-semibold` uppercase, 0.3px tracking.
- **.button** padding 6/10 · radius 16 · `.type-11-regular` · 1px inside stroke (box-shadow inset) · height 27.
- **PI** height 28 · padding 0/8 · gap 10 · radius 14 · label Bold 14/16 (`--ai-pi-font`) · icon 14 (dark) / 19.5×17.7 (light) · arrow 8×5.
- **Loader** 174 square; art 180×175 (logo shadow overflows).

## Behaviour
- **.button hover**: Figma Dissolve 1.02 s "Gentle" → `transition 1s ease`.
- **PI hover**: Smart animate 0.3 s ease-out → `transition .3s ease-out`. On click: no destination in Figma.
- **Typing dots**: 9 frames; big dot steps 1→2→3 three times. Holds .4 .8 .4 .1 .3 .4 .1 .3 .8 s, 0.15 s linear between, frame 9 → 1 instant. Cycle 4.8 s.
- **Loader**: State 1 holds 0.5 s → 0.3 s linear → State 2 (outer ring Ellipse 05 gone) holds 0.6 s → 0.15 s linear back. Cycle 1.55 s. Built as the outer ring fading on `::before`; the art is clipped to the inner rings.
- **Reduced motion**: dots hold frame 1, loader holds State 1, hover transitions off.

## When (not) to use
No guidance in Figma.

## Accessibility
- Typing dots, AI bubble loader and Loader: `role="status"` + `aria-label="Loading"` — added in review, not in Figma.
- .button and PI are `<button type="button">`; focus `2px solid --pando-blue`, offset 2 — added in review, not in Figma.
- Avatars, icons and the loader art are decorative (`aria-hidden`, empty `alt`). Use `<time>` for the time.
- Contrast for the accessibility pass: Light AI time #D5DAF4 on white 1.4:1 · PI Dark FAP hover #FFA600 on #EEF2F4 1.7:1 · .button Red #E25757 on #24242F 4.2:1 · light typing dots (#9CD2FF 50%) on white 1.3:1. Everything else ≥ 5.2:1.

## Open issues
- Light User fill #FFF4E5 vs Light User + Swapable #B5E4FF — different fills, kept.
- Light AI time uses the dark-theme colour #D5DAF4 (1.4:1 on white).
- Dark PI hover differs by Type (FAP light #EEF2F4, Procurement black 80%). No Light + FAP PI. PI click target undefined.
- Line heights: bubble 12/18 → 17; Light AI bubble 12/auto; .button 11/auto → 15; "Pi Summary" 0.3px tracking (not `.caps` 0.5px); PI Bold 14/16 has no type style.
- Off-token: #484858, #0078DD, #FFA600, black 80%.
- Atom variant missing in kit: Header-Logo/Apps › Freehand, Variant=AI-Yellow (4405:7109) — inlined on the page, fill `--status-brown-medium`.
- Loose frames, inlined: "Freehand_Ai_Icon 1" (PI dark), "ai-wand 1" (PI light). `refresh-line` slot icon inlined as on the Comments page.
- Typing dots duplicate `.typing dark` / `.typing light`, owned by ai-chat-composer — dedupe when it lands. Light typing padding is an instance override (8/15; main 8/20).
- `Bubblechat` here is a plain frame (no fill, 0-width stroke), not the Comments molecule. `.pds-comment-thread--chat` is the "Chat Comment" layout (author + time + comment) and `.pds-comment-thread--message` differs in fill (#484858 solid vs 50%), radius (8 vs 10), padding (10 vs 10/15) and weight (regular vs semibold) — not reused; only the slot is.

## Not adopted
- `.Loader` 3568:15030 — older private near-duplicate of Loader. Differences: Pando Yellow halo (Pi-With Halo 4280:39580) with Pi-Avatar Large + yellow wand vs Freehand orange halo with Freehand logo + sparkle; Ellipse 02 9% vs 1%; glow 90% / blur 26.4 vs 10% / blur 3.2; Ellipse 01/04 offsets differ by 1–2px; State 2 hold 0.3 s vs 0.6 s.
- "DP" (User Dark) and "Text Avatar" (User Light) — hidden in every variant with no property, so `avatar.css` Text Avatar is not used.
- Hidden third `.button` in the AI bubble, hidden "Pi" frames and "graident-ai-robot-vectorart" layers, the hidden `Slot` in the AI bubble.

## Sources
Carbon for AI — https://carbondesignsystem.com/guidelines/carbon-for-ai/ (industry gaps: AI label + explainability popover; revert to AI — not added)
