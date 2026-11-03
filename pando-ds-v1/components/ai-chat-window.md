# AI Chat window (Chat / AI Chat / Prompt cards) — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163)
**Files:** `ai-chat-window.css` (styles + component tokens) · `ai-chat-window.js` (`window.pdsAiChatWindow`) · `ai-chat-window.html` (live doc).
**Reuses:** `ai-chat-composer.css/js` (Light = `.Bottom Bar` legacy, Dark = `Chat Bar`, Light Prompt intro + cards via `pdsAiComposer.prompt`), `ai-chat-bubbles.css` (Dark Chat bubble User/AI/Loading, typing dots, PI title, Loader), `button.css` (Action Button = "New"), `avatar.css` (Icon Avatar in the Icon prompt card), `comment-thread.css` (Swappable Content slot), `brand.css`, `icons.css` + `icons/` (10px/More Actions, Navigation/New Tab, Navigation/Close-Tag, 10px/Add, Indicator Icon/Factory, Header-Logo/Apps Freehand).

## What it is
The whole AI chat panel: header, conversation area and prompt bar. Figma has two window sets — **Chat** (Light, title "Pi") and **AI Chat** (Dark, title "Chat") — each with three content variants, plus a **Prompt** set of suggestion cards. Figma has no description text on these sets. ("3 widths" in the inventory: each set is 2240 wide because it holds three 720-wide variants side by side; there is one width.)

## Variants
12 published variants built: 3 + 3 windows, 6 cards.

| Set | Variants | Class | Values |
|---|---|---|---|
| **Chat** 2859:12233 | Variant=Prompt / Swappable / Conversation (3) | `.pds-ai-chat-window--light` + `--prompt` / `--swappable` / `--conversation` | 720 × 710 · `#EBF1FA → white` 180° (off-token) · radius 4 4 0 0 · `--shadow-4` · header 44, fill #EBF1FA, 1px bottom `--border-input-light`, shadow 0 1 9 10% (off-token) · title "Pi" `.type-14-semibold` uppercase `--text-dark` · icons `--pando-dark` |
| **AI Chat** 3542:14373 | Type=Prompt / Conversation / Swappable (3) | `.pds-ai-chat-window--dark` + variant | 720 × 760 · `--gradient-pi-green` · header 58, same gradient, radius 12 · title kit `.pds-ai-pi--dark` (no arrow), "Chat" #FFA600 (off-token) · "New" Action Button white uppercase · divider #484858 (off-token) 1 × 16 · Close white |
| **Prompt** 3572:14750 | Theme Dark/Light × State Default/Hover × Type Simple/Icon (6; Icon is Dark only) | `.pds-ai-suggest`, `--light`, `--icon`, `.is-hover` (doc only), `__text` | Dark #484858 50% (off-token), text `--white` · Dark hover `--dark-input-text` + 1px inside `--dark-label-text` · Light `--accent-alternate-white` + 1px `--border-input-light`, text `--text-medium` · Light hover `--pando-light`, text `--text-dark` · Icon: no fill, `.pds-avatar--purple` → hover Active Card Dark (`--avatar-dark-active-bg`) |
| Light "Vertical" chat bubble (instances only, see Open issues) | User / AI / Loading | `.pds-ai-chat-window__msg`, `--user`, `--ai`, `--loading`; `__who`, `__bubble`, `__text`, `__time` | User `--status-skyblue-light`, radius 12 0 12 12 · AI `--accent-light-highlight`, radius 0 12 12 12 · padding 15 · text SemiBold 12 `--text-dark` · time 10/12 `--text-light` · "Pi" SemiBold 12 `--accent-green-highlight` |

Content per variant:
- **Light Prompt:** composer Prompt (intro "Ask Pando AI about your <placeholder text here>", "More Suggestions:", 3 cards) + Loading bubble + `.Bottom Bar` Default Light.
- **Light Swappable:** Swappable Content slot (170) + Loading bubble + bar.
- **Light Conversation:** User / AI × 3 with times + Loading + bar (list overflows; newest at the bottom).
- **Dark Prompt:** kit Loader 174 + "How can I help you today?" (`.type-16-regular`, `--dark-label-text`) + 8 Dark Simple cards (wrap, centred) + Chat Bar Default Dark.
- **Dark Conversation:** kit Chat bubble Dark, User/AI (Date/ Time off) + Chat Bar.
- **Dark Swappable:** slot + Chat Bar.

## Anatomy & spacing
- **Light window:** header padding 15 15 10 15 · actions gap 20 (More Actions 14, New Tab 10, Close-Tag 14) · content padding 0 15, gap 10, bottom-aligned · window padding-bottom 15 · Conv padding-top 10.
- **Dark window:** gap 15 header ↔ content · header padding 15, gap 15, right group gap 10 · content padding 0 15 15, gap 10 · Prompt "Chat" frame padding-bottom 90, gap 10 · prompt row padding 15 0, gap 10 (wrap, row gap 10) · Conversation "Chat" frame padding 10 0, gap 10.
- **Light bubble:** stack gap 5 (Pi row ↔ bubble ↔ time) · Pi row icon 14 ↔ label 8 · Loading = Pi row + kit light typing dots, padding 8 24 (window instance; kit 8 15).
- **Light Prompt override:** cards 157 × 58, padding 5 10 (composer 56, 4 8); intro uppercase, left-aligned.
- **Suggestion card:** radius 4 · Dark padding 10 (36 tall) · Light padding 6 8 (28 tall) · Icon type gap 10, Icon Avatar 30 (50 tall) · Regular 12/16.

## Behaviour
Built in `ai-chat-window.js` (Figma has no prototype reactions on these sets):
- `build({ theme, variant, live })`. Live windows wire the composer.
- **Send** (composer Enter / send) → user bubble with the current time → Loading bubble → after 1.2 s a canned AI bubble (Figma sample "Input text here"), marked `data-demo` and outlined dashed. **Demo only — no AI is connected.** The first message replaces Prompt / Swappable content with the conversation. Sends are ignored while a reply is pending.
- **Suggestion cards** (both the composer Prompt cards and the Prompt set) fill the bar and focus it; they don't send.
- **Header:** More Actions, New Tab, New and Close fire `pds-ai-chat-window:more | new-tab | new | close` (no destinations in Figma). Sending also fires `pds-ai-chat-window:send` `{ text }`.
- `addMessage(win, { from, text, time })` adds a message (for real integrations).
- The log scrolls to the newest message.

## When (not) to use
No guidance in Figma.

## Accessibility
- Window is a `<section>` named by its `<h2>` title; messages are in `role="log"` + `aria-live="polite"`. Icon buttons are named "More actions", "Open in new tab", "Close". Cards are `<button>`s in a list.
- Focus `2px solid --pando-blue`, offset 2 — added in review, not in Figma.
- Contrast for the accessibility pass: Dark card hover white on #8A8A9E 3.4:1 · Light "Pi" #008D5E on white 4.2:1 · Dark divider 1.4–1.9:1 (decorative). Everything else ≥ 4.6:1.

## Open issues
1. Light window bubbles are instances of "Chat Bubble/…/Light/Vertical" (2817:5262) whose main component is no longer in the file (no parent). They differ from the kit Chat bubble (Pi label row, radius 12, padding 15, User #B5E4FF, time #6C6C6C) — **atom variant missing in kit**, built inside this component.
2. Light uses the older `.Bottom Bar`; Dark uses `Chat Bar`.
3. Two suggestion styles: composer Prompt cards (157 × 56/58, radius 8, 10/12) vs the "Prompt" set 3572:14750 (radius 4, 12/16). The Light window uses the first, the Dark window the second.
4. Dark header Close-Tag and "New" glyph colours not readable (inside remote instances) — built white from the screenshot. "New" is a Light Action Button overridden to white; its hover (kit Dark Action hover) is not in Figma.
5. Off-token: #EBF1FA, header shadow 0 1 9 10%, #FFA600, #484858.
6. Line heights: Light bubble User 12/auto → 16; card 12/16 (`.type-12-regular` is 12/17); heading 16/auto → 22; time tracking not read.
7. Light "Pi" icon inlined from Figma vectors (ring + sparkle, gradient stroke #006265 → #19A476); star fill not read.
8. Missing states: responding/disabled bar, errors, empty history, minimise/resize, scroll affordance. No destinations for header buttons.
9. Dark Prompt vertical position approximated (centred above the 90 padding).
10. No Light + Icon suggestion card; Light cards carry hidden Comment icon + caret layers.

## Not adopted
- Hidden layers: Indicator Icon/Comment and Navigation/Button-Down-Caret in Light cards, Indicator Icon/Action in Icon cards.
- The composer's "CT- Shipper" conversation (Filter Tag chips, contract table, date dividers) — not used by any window variant; Filter Tag / Table Cell are therefore not used here.
- AI bubble (Pi Summary card) and PI dropdown — not placed in any window variant.

## Sources
Ant Design X Bubble — https://x.ant.design/components/bubble · Ant Design X Prompts — https://x.ant.design/components/prompts (industry gaps, not added: auto-scroll control, streaming text, per-message error/abort, copy/retry actions, suggestion title/description/disabled/vertical/nested).
