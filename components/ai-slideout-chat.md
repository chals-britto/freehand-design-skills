# Slideout Chat (full AI drawer) — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 AI Chat (2814:5163) › section "Freehand - ai - component" › `Slideout  Chat` 4514:9012 (double space in the name)
**Files:** `ai-slideout-chat.css` (frame, header, welcome, pattern + instance overrides) · `ai-slideout-chat.js` (`window.pdsAiSlideoutChat`) · `ai-slideout-chat.html` (live doc)
**Composes (never re-implemented):** `ai-insights.css/js` (`.Insights`, `.Insight_Card`, Show More) · `ai-action-popup.css/js` (`.Option` rows, `.Input`, Action - popup + Responding in the demo slot) · `ai-chat-composer.css/js` (bar + `.send` inside `.Input`) · `ai-chat-bubbles.css` (PI = the "Chat name" title) · `slideout.css/js` (overlay layer, slide, Esc, focus trap, focus return) · `button.css` (Action Button "Artifacts") · `icons.css` + `icons/` (Indicator Icon/Menu, Add, Details, Expand · Navigation/Close-Tag, Dropdown-Arrow · Header-Logo/Apps › Freehand, Variant=Logo). Page also links radio, input, readonly, skeleton, scrollbar, comment-thread, button-group (dependencies of the composed pieces).

## What it is
The full AI chat drawer: header, a welcome block ("Hi! I'm your freight invoice assistant") with Quick Insights and Quick Actions, a swappable slot for the conversation, and the prompt input. Opens as a 420-wide slideout or fills the page. Figma has no description text on this set.

## Variants
Properties: `Type` (Slideout · Full page) × `Swappable` (No · Yes); booleans `Insights` (default true) and `Quick Actions` (default true); slot `Swap`. 4 variants, all built.

| Variant | Class | Size | Header | Body |
|---|---|---|---|---|
| Slideout · No | `.pds-ai-slideout-chat` | 420 × 760 | Menu · Expand · divider · Close | welcome + `.Insights` Default (2 cards, Show More) + Quick Actions (4) |
| Slideout · Yes | `--swappable` | 420 × 760 | Menu · PI "Chat name" · Add · Details · Expand · divider · Close | Swap slot (empty in Figma) |
| Full page · No | `--full` | 1200 × 760 | hidden | 740 column: welcome + `.Insights` Expanded Size=Large (4, 2 columns) + Quick Actions |
| Full page · Yes | `--full --swappable` | 1200 × 760 | PI "Chat name" · Action Button "ARTIFACTS" | Swap slot, 740 |

All four end with the kit `.Input` Default (chip "Action", "Ask Freehand", disclaimer). Booleans: `insights:false` / `quickActions:false` in `build()`.

| Part | Value · token |
|---|---|
| Frame | fill `--white`, padding 2 (`--space-2`), 1px left stroke `--border-grey` #EFEFEF |
| Surface ("AI Chat") | #FFFBFA (off-token) · radius 4 4 0 0 (Slideout), 0 (Full page) |
| Pattern | 30px squares, 1px `--grey-medium`, pitch 29 · radial mask #D9D9D9 20% → 0 at 96% · group opacity 34% · Slideout: top 600; Full page: whole surface |
| Icons | 14, `--pando-dark` #234357 · Close-Tag `--grey-dark` #515151 · divider 1 × 16 `--border-input-light` |
| Chat name | kit PI Dark FAP, icon hidden, label SemiBold 13/16 `--text-dark`, arrow `--dark-input-text` |
| Artifacts | kit Action Button, Details glyph 10, label `--pando-dark` (kit #376F99), gap 10 (kit 4) |
| Logo | 47 × 48, padding 10, radius 10, `--freehand-orange` @ 10%, Freehand logo 27 × 28 `--freehand-orange` |
| Title | Open Sans Bold 14/auto `--text-dark` (component token, no 14 Bold in tokens) |
| Description | `.type-12-regular` #737373 (off-token) |
| Quick Actions label | `.type-10-semibold` UPPER +0.5 `--dark-input-text` #8A8A9E, padding 0 / 8 |
| Quick Action rows | kit `.Option` overridden: Regular 10/auto (built 14), no divider (stroke weight 0), 34 tall |

## Anatomy & spacing
- Content: padding 10 / 15, gap 15 (Full page · Yes: 10), items centred; Full page column 740.
- Header: 28 tall, space-between, gap 15 · left gap 10 · right gap 10 · icon row gap 15 (No) / 16 (Yes), padding-right 5.
- Welcome: padding 100 / 10 / 0 / 10 (Full page 100 / 10 / 20 / 10), gap 8.
- Full page `.Insights` and Quick Actions: padding 0 / 10.
- px values not on the spacing scale: 2 (scale has it), 5, 8, 16, 28, 29, 34, 100, 20, 600, 740, 420, 1200, 760.

## Behaviour
Figma has no prototype reactions on this set. Built in `ai-slideout-chat.js` (added in review):
- `build({ type, swappable, insights, quickActions, slot, chatName, live })` · `setSwappable(root, on, slot?)` · `setSlot(root, node)` · `bind(root)`.
- `bind` fires `pds-ai-slideout-chat:menu | new | details | expand | artifacts | chat-name | close`, `:insight { title }`, `:quick-action { text }`, and wires the kit Show More (`pdsAiInsights.bind(root)` — don't also bind the insights on `document`).
- **Drawer:** put the chat in `.pds-slideout-layer > .pds-slideout.pds-ai-slideout-chat-drawer`; slideout.js opens it (right → left, overlay, Esc, focus trap, focus back to the trigger). Close carries `data-slideout-close`. This drawer does **not** use the Slideout header / blue Close-Btn — its frame is its own; only the layer behaviour is shared.
- **Demo only (`demo(root)`, no AI connected):** insight card → Swappable=Yes, Action popup Type=Option in the slot, input Tagged with the insight as context · Quick Action or Skipped link → popup Type=Default · Confirm → input Default + Responding (live) · Skip → input Skipped · send from the bar → Responding · + (New chat) → back to Swappable=No. Demo content is outlined dashed.
- Composed pieces keep their own behaviour (composer Enter / send enable, popup option ↔ text field, Responding loop with reduced motion).

## When (not) to use
Figma has no usage text for this set.

## Accessibility
- `<aside>` named "Freehand AI chat"; in the drawer slideout.js adds `role="dialog"` + `aria-modal` to the wrapper (named by `aria-label`).
- Icon buttons named Menu, New chat, Details, Expand, Close. Insight cards get `role="button"` + `tabindex="0"` (Enter / Space); Quick Actions are `<button>`s (kit `.Option` classes moved onto a button). Slot is `aria-live="polite"`.
- Focus `2px solid --pando-blue`, offset 2 — added in review, not in Figma.
- Contrast for the accessibility pass: labels #8A8A9E on #FFFBFA ≈ 3.4:1 · description #737373 ≈ 4.6:1 (passes) · divider decorative · send off ≈ 1.5:1 (kit).

## Open issues
1. No reactions in Figma: open/close, Expand (Slideout → Full page?), Menu, New chat, Details, Artifacts, chat-name dropdown, insight / Quick Action clicks undefined. Built as events + demo.
2. Swap slot empty in every variant — the conversation inside the drawer is not drawn.
3. Quick Action rows: first 30 tall, others 34 (same padding/text). Built all 34.
4. `.Insights` instance gap 10 vs kit 8 (kit kept).
5. Line heights (12 → 17, 14 → 19, insight cards 58 vs 55) make Slideout · No taller than 756 — a scroll area was added around welcome / insights / actions (not a Figma frame); blocks are anchored above the input.
6. Pattern mask transform not read — built as an ellipse touching the edges; Full page · Yes mask rectangle is 1400 wide.
7. Off-token: #FFFBFA, #737373. Type not in tokens: Bold 14, SemiBold 13/16, Regular 10/14 (Figma ls 0, `.type-10-regular` has 0.5).
8. PI as a plain title (icon hidden, SemiBold 13 #313131) — atom variant missing in kit; overridden here.
9. Artifacts Action Button colour/gap overridden (#234357, 10).

## Not adopted
- Hidden in Figma: Add and "#10px" in the Swappable=No icon row, History in the Yes row, Menu + Close in Full page · Yes, the header in Full page · No, the Swap slot in the No variants.
- Industry gaps (not added): warn before closing with unsent input, collapse instead of dismiss, sticky header/footer (Fluent 2 Drawer); Welcome extra-actions area and borderless variant (Ant Design X Welcome).

## Sources
Fluent 2 Drawer usage — https://fluent2.microsoft.design/components/web/react/core/drawer/usage
Ant Design X Welcome — https://x.ant.design/components/welcome
