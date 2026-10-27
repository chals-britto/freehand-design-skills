# AI Chat composer (Prompt / Chat Bar) — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163)
**Files:** `ai-chat-composer.css` (styles + component tokens) · `ai-chat-composer.js` (`window.pdsAiComposer`) · `ai-chat-composer.html` (live doc).
**Reuses:** `button.css` (Icon Button · Circular Background, 30 / glyph 20 = `.send`), `icons/` (Indicator Icon/Add 14, Arrow Up 20, AI 20, refresh-line), `comment-thread.css` (`.pds-comment-thread__slot` = `.typing dark/.Swappable Content`), `ai-chat-bubbles.css` (`.pds-ai-bubble__typing` = `.typing light` / `.typing dark`, not duplicated). Not used: Input atom (Figma uses the plain `.Query Text` layer, not Input - Text), Filter Tag / Table Cell / Bubblechat (only inside the CT- Shipper conversation, see Prompt below).

## What it is
The prompt bar at the bottom of the AI chat: a text field, + (add), a divider and the send button. Plus the `Prompt` intro block (AI icon, intro line, “More Suggestions:” and three suggestion cards). Figma has no description text on these sets. Classes are self-contained (`.pds-ai-composer*`) so the chat window, action popup and slideout chat can compose them.

## Variants
16 bar/send variants + Query Text + Swappable Content + Prompt + 2 × 9 typing frames (as the animation).

| Set | Variants | Class | Values |
|---|---|---|---|
| **Chat Bar** 3991:14306 (primary) | State Default/Active/Typing × Theme Light/Dark (6) | `.pds-ai-composer`, `--dark`, `--inline`, `.is-typing`; parts `__inputs`, `__actions`, `__left`, `__field`, `__field--ph`, `__add`, `__divider`, `__send`, `__slot` | Light `--white`, radius 8, `--shadow-3` · Dark `--pando-dark` 40%, radius 12, no shadow · Default + Active·Light stacked (76 tall) · Active·Dark + Typing one row (54) |
| **.Bottom Bar** 2815:23806 | same 6 | `.pds-ai-composer--legacy` (+ `--inline`) | all one row (54) · Light placeholder `--text-medium` #545454 |
| **.send** 2815:23819 | State Default/Active × Theme Light/Dark (4) | `.pds-button.pds-button--icon.pds-ai-composer__send`, `--dark`, `--orange`, `.is-active` | Light off `--accent-blue-grey` #CBD4D8 · Light on (.send main) `--freehand-orange` #FE6505 · Dark off #F8F8F8 20% + 1px inside #D5DAF4 50%, radius 16 · Dark on `--dark-highlight-green` #1FCD93 · icon white · `--shadow-1` |
| Active·Light send in the bars | — | `.pds-ai-composer__send.is-active` | `--pando-blue` #0076DD (Button override, not `.send`) |
| **.Query Text — Swap if required** 3052:12279 | 1 | `.pds-ai-composer__field` | “Text to be typed or entered” Open Sans SemiBold 12/auto `--text-dark` (both themes) · placeholder “Search here” Italic 12 · Light `--text-dark` · Dark `--dark-label-text` |
| **.typing dark/.Swappable Content** 3541:14039 | 1 | `.pds-comment-thread__slot.pds-ai-composer__slot` | `--pando-light`, padding 10, gap 4 · refresh-line 20 + “Swappable Content” SemiBold 12 `--pando-dark` · “Swap this component out with another.” Regular 12/16 black (hidden in the bar) |
| **.typing light** 2815:24083 / **.typing dark** 3540:14579 | Typing01–09 (9 + 9) | `.pds-ai-bubble__typing` (ai-chat-bubbles) | Dark #484858 50%, dots `--freehand-orange` / `--highlight-orange` 50% · Light no fill, dots #0078DD / `--highlight-blue-light` 50% |
| **Prompt** 2819:1891 | 1 | `.pds-ai-composer-prompt`, `__inner`, `__intro`, `__icon`, `__label`, `__cards`; `.pds-ai-composer__card` | intro Regular 10 `--pando-dark` + Indicator Icon/AI 20 · label Regular 10/12 `--text-medium` · cards `--pando-light`, Regular 10/12 `--text-dark` |

### Chat Bar vs .Bottom Bar (differences)
1. Default (both themes) and Active·Light: Chat Bar stacks the text row above an actions row (76 tall, padding 10/15, space-between, gap 10). .Bottom Bar is one row: + · divider · text · send (54 tall, padding 0/15).
2. Light placeholder: Chat Bar #313131 (`--text-dark`) vs .Bottom Bar #545454 (`--text-medium`). Dark #D5DAF4 in both.
3. Chat Bar Default uses the `.Query Text` instance for the placeholder; .Bottom Bar uses a plain text layer.
4. Active·Dark, Typing·Light and Typing·Dark are the same one-row layout in both.
5. .Bottom Bar Default·Light: Inputs frame 640 with send pushed by space-between; Dark has send inside the Inputs row. Same look.

## Anatomy & spacing
- **Stacked** (Chat Bar Default, Active·Light): padding 10/15 (`--space-10`/`--space-15`), rows gap 10, text row 16 tall, actions row 30 (+ · divider gap 15, send right). Height 76.
- **One row**: padding 0/15, min height 54, gap 15 between +, divider, field/slot, send.
- **+**: Indicator Icon/Add 14, Light `--pando-dark`, Dark `--dark-label-text`. **Divider**: 1 × 24, #9CB3BF 50% (off-token).
- **Send**: kit Icon Button 30, Arrow Up 20 white, `--shadow-1`.
- **Typing slot**: fills the field’s place, 40 tall (padding 10 + 20 title).
- **Prompt**: 720 wide, padding 10/15, inner padding 0/90, items centred, gap 10 · intro icon ↔ text 10 · cards 157 × 56, padding 4/8, radius 8, gap 20.

## Behaviour
Built in `ai-chat-composer.js` (Figma has no prototype reactions on these sets):
- Typing grows the field (no max height in Figma).
- Send is disabled while empty and turns on (`.is-active`) once there is text.
- **Enter** sends, **Shift + Enter** adds a new line (same rule as the Chat Input Box documentation). Sending fires `pds-ai-composer:send` `{ text }`, then clears.
- + fires `pds-ai-composer:add` (no destination in Figma).
- `setTyping(root, on, node?)` = State=Typing: the field is swapped for the slot (or the given node), the bar goes one row, send is disabled.
- Prompt cards fire `pds-ai-composer:suggest` `{ text }` (no destination in Figma).
- Typing dots: 9 frames, see ai-chat-bubbles (4.8 s cycle, reduced motion holds frame 1).

## When (not) to use
No guidance in Figma.

## Accessibility
- Field is a `<textarea>` with `aria-label` (default “Message”). + is “Add”, send is “Send” with native `disabled` while empty. Prompt cards are buttons in a list.
- Focus `2px solid --pando-blue`, offset 2 — on the bar while the field has focus, and on +, send, cards — added in review, not in Figma.
- Contrast for the accessibility pass: Active·Dark text #313131 on the 40% Pando Dark bar ≈ 1.6:1 (over white) · Light send off white on #CBD4D8 ≈ 1.5:1 · Dark send on white on #1FCD93 ≈ 2.0:1 · Dark placeholder #D5DAF4 on the bar ≈ 1.6:1. Light send on (blue) 4.6:1.

## Open issues
1. Active·Light send: the bars override the Button to #0076DD instead of `.send`, whose main Active·Light is #FE6505. Built blue in the bar; orange kept as `.pds-ai-composer__send--orange`.
2. Chat Bar is half-updated: Default (both) + Active·Light stacked; Active·Dark + Typing still one row. The live Dark bar stays stacked when active.
3. Active·Dark typed text is #313131 on the dark bar. Kept.
4. Typing state content is only a placeholder slot; what goes there and whether there is a stop button is undefined.
5. + has no menu/destination. No max height, hover, focus or disabled state for the bar.
6. Off-token: #9CB3BF 50% divider (same value as `--top-header-divider`).
7. Line heights: text/placeholder 12/auto → built 16 (SemiBold 12 is 12/17 in tokens; italic has no type style). Prompt intro 10/auto → 14; cards/label 10/12 built without `.type-10-regular`’s 0.5px tracking (Figma tracking not read).
8. Prompt is a 720 × 554 clipped frame aligned bottom: the intro + cards sit above the clip and the visible part is the local “CT- Shipper” conversation (2819:3583). Built here: intro + cards only.
9. Prompt card heights are fixed 56; the first card’s 4 lines (48) + padding 8 fit exactly. Click target undefined.
10. `.typing light` main padding 8/20; the kit dots use the 8/15 instance override.
11. Loose “Tip: Use # to tag parameters and / to define locations” frame (3970:14859) — no # or / behaviour built.

## Not adopted
- **CT- Shipper** conversation inside Prompt (read via the instance, read-only): date dividers “15 April 2024” / “Selection from Calendar” (11 #737373, lines `--border-input-light`), older remote `Bubblechat` (AI, fill #D9E6FF 20%, radius 0 12 12 12, time 10/12 #737373), remote `Filter Tag / Mode=Light` chips (28 tall, padding 6/10, radius 16, fill #D9E6FF 12%, 1px #EFEFEF, text 11/16 `--pando-blue-active`: “Create an RFQ”, “See Near Expiring Lanes”, “Pending Approvals”, “Yes, Create”, “Not right now”), a 7-row contract table (header #D9E6FF, radius 12 12 24 24, 920 wide), “Would you like to create an event based on these lanes?” at 10:10 AM, and a “Pando Ops” typing row (`Typing Component-2`, padding 5). This belongs to the chat window. The kit Filter Tag (24 tall, transparent) does not match that chip — **atom variant missing in kit** if the window needs it.
- Hidden “Heyya” text in `.typing light`.
- Loose “Tip” frame (see Open issues 11) and the “Chat Bar” 4051:14087 / “Prompt” 4307:14554 page instances.

## Sources
Ant Design X Sender — https://x.ant.design/components/sender (industry gaps, not added: stop/loading button while responding, max rows then scroll, disabled/read-only, voice input, pasted files, header panel, trigger-character quick commands).
