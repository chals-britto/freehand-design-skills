# Modal — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Organisms › 🟡 Modals (page 32:443) › `Modal` (1312:877), `.Swappable Content` (2238:4148)
**Files:** `modal.css` (layout + component tokens) · `modal.js` (`pdsModal.build`, `pdsModal.open`, `pdsModal.close`) · `modal.html` (live doc)
**Uses kit:** `button.css` (Text Button Small, Light + Dark), `button-group.css`, `input.css` + `input.js` (Input - Text, .Base Input, Text Area, Input - Dropdown Select), `icons.css` + `icons/nav-close-tag.svg` (Navigation/Close-Tag).

## What it is
When performing a sensitive action, a modal will appear to request your confirmation. This might be referred to as a popup, prompt message, or confirmation dialog. *(Figma wording, component description and `.documentation`)*

## Variants
`Type` × `Style` — 6 variants exist (not every combination). Text properties `Heading` ("Heading"), `Message` (Lorem ipsum…); boolean `Persistence` (default **true**) shows the close ×.

| Variant | Node | Height | Rows (top → bottom) |
|---|---|---|---|
| Type=Light, Style=Text | 1312:876 | 150 | Top Section · Message · Button Group |
| Type=Light, Style=Text with Input | 1313:777 | 226 | Top Section · Message · Input - Text (label "reason", placeholder "Placeholder Ghost Text", fills 320) · Button Group |
| Type=Light, Style=Swappable | 2238:890 | 184 | Top Section · .Swappable Content · Button Group |
| Type=Dark, Style=Text | 1312:875 | 150 | Top Section · Message · Button Group |
| Type=Dark, Style=Text with Options | 2163:554 | 226 | Top Section · Message · Text Area dark (label "Reject Reason", 310 × 60) · Button Group |
| Type=Dark, Style=Swappable | 2242:202 | 184 | Top Section · .Swappable Content · Button Group |

| | Light | Dark |
|---|---|---|
| Fill | `--white` | `--dark-darker` #24242F |
| Heading | `--pando-dark` #234357 | `--dark-label-text` #D5DAF4 |
| Message | `--text-dark` #313131 | `--dark-label-text` #D5DAF4 |
| Close × | `--grey-dark` #515151 | `--dark-label-text` #D5DAF4 |
| Buttons | Secondary Small "Cancel" + Primary Small "Confirm" | Dark Secondary Small (#393945) "Cancel" + Dark Primary Small "confirm" |
| Button gap | 10 | 20 (Text, Text with Options) · 10 (Swappable) |

`.Swappable Content` (same on Light and Dark): fill `--pando-light` #EEF2F4, padding 10, gap 10, vertically centred. Title row: 20px `refresh-line` icon + "Swappable Content" `.type-12-semibold` `--pando-dark`, gap 8. Text "Swap this component out with another." 12 Regular, #000000 (off-token), 150 wide.

## Anatomy & spacing
Width 350 fixed (content 320) · height hugs · padding 15 (`--space-15`) · row gap 16 · radius 2 · shadow `--shadow-3` (0 2 14 10%).
Top Section: heading fills, close × 12px at the right, top-aligned.
Heading `.type-14-semibold` (Figma 14/16) · Message `.type-12-regular` (Figma 12/auto) · Buttons Small (24 high).
Overlay `--color-overlay` (Pando Dark @ 20%).

## Behaviour
*(Figma `.documentation`: Placement & Convention, Interaction, Animation)*
- **Overlay** on the screen.
- **Position:** if triggered by a fixed-position CTA, the modal appears directly over the CTA or at the top-left corner; in all other cases (trigger in a scrolled position) it is centred on the screen. `pdsModal.open(m, { position: 'anchor' })` puts it over the trigger, kept 16px inside the viewport; default is centre.
- **Closing:** the close × (when Persistence is on) or a CTA (depends on the context). Overlay click does **not** close.
- **Animation:** instant. No transition.
- **Added (task requirement, not in Figma):** `role="dialog"` + `aria-modal="true"` + `aria-labelledby` the heading (and `aria-describedby` the message) · focus moves into the dialog (first field, else the first action, Cancel) · Tab / Shift+Tab trapped inside · **Esc closes** · focus returns to the trigger. Events: `pds-modal:action` { label, index } and `pds-modal:close` { reason: close | escape | action }.

## When (not) to use
*(Figma `.documentation` "Uses" and the "Notes" demo on the canvas)*
- **Dark theme** — CTA/confirmation triggered from the overall event / transaction level.
- **Light theme** — triggered from an inner section of the page.
- **Close button vs icon:** a close icon should be available for non-blocking modals. A cancel button should be provided when users need to discard a workflow-based action. Optional or non-workflow modals may include either a close icon or a cancel button, but not both.

## Examples (from the Figma canvas, built with kit pieces)
- **Delete conversation** (4709:6926): Light, Style=Text, heading "Delete conversation", message "Deleting "Issue Resolution TAT" is permanent and cannot be undone.", buttons Secondary "Cancel" + Secondary **Red** "Delete" (`.pds-button--danger`). Height 134.
- **Text with Input → Dropdown Select** (3405:312): Light, Style=Text with Input with the Input - Text swapped for `Input - Dropdown Select` (Default, Empty, label "Input Label", "Select"), filling 320.

## Do / Don't
*(Charles, 13 Nov 2026 — after a prototype shipped hand-made pop-ups: 460–620 wide, amber / red callouts, KPI tiles, a table, the wrong close icon. "This isn't a proper pop-up style.")*
- **Do** build every pop-up with this component (`pdsModal.build` or its exact markup). **Don't** hand-roll a dialog.
- **Do** keep the fixed 350 width. **Don't** add wider sizes.
- **Do** put the detail (skipped items, rows not changed, conflicts) in the slot: `.pds-modal__slot.pds-modal__slot--content` with a `.pds-modal__slot-title` and plain `.pds-modal__slot-text` / `.pds-modal__slot-list`. **Don't** use coloured callouts, KPI tiles, tables or captions above the heading.
- **Do** cap a long list (about 4 lines) and say "+ N more". The modal has no scrolling body.
- **Do** follow the Notes rule: a workflow confirm gets Cancel + the action and no ×; a result / info pop-up gets one primary button (or ×), not both.
- **Do** use Secondary Red (`.pds-button--danger`) for a destructive action, as in the Delete example.
- **Do** use the kit close icon (`icons/nav-close-tag.svg`, inlined in `modal.js`).

## Accessibility
- `role="dialog"`, `aria-modal="true"`, labelled by the heading `<h2>`, described by the message. Set by `modal.js`.
- Close × is `<button aria-label="Close">`; actions are kit `<button>`s.
- Focus trap, Esc, focus return: see Behaviour.
- Focus ring on the × added (2px `--pando-blue`, offset 2) — not in Figma. Buttons and inputs bring the kit focus rings.
- Contrast: all modal text passes 4.5:1 — #D5DAF4 on #24242F 11.08:1, #234357 on white 10.44:1, #313131 on white 13.01:1, × #515151 on white 7.94:1, slot text 18.64:1 / 9.27:1. Fails inherited from Button (kept as Figma): Secondary "Cancel" #0076DD on #EEF2F4 4.02:1; Red "Delete" #E25757 on #EEF2F4 3.25:1.
- Target size: close × is 12 × 12 (under 24 × 24, WCAG 2.5.8) — Later.

## Open issues
1. The "Close Button vs Icon" note says a modal should have *either* a close icon *or* a Cancel button, not both — but every variant ships with both (Persistence defaults to true).
2. ~~Heading 14/16, message and slot text 12/16 came out 14/19 and 12/17.~~ Fixed 13 Nov 2026: `line-height: 16px` on heading, message and slot text, so heights match Figma.
3. Button Group gap differs per variant: Light uses 10 (the instance overrides the molecule's 20), Dark Text / Text with Options uses 20, Dark Swappable uses 10 and is not a Button Group instance (loose legacy "Secondary"/"Primary" Dark Small components).
4. Dark Swappable keeps the light `.Swappable Content` (#EEF2F4 fill, #000 text) on the dark box; there is no dark slot.
5. `.Swappable Content` text is #000000 (off-token) and fixed 150 wide; the `refresh-line` placeholder icon is not in the kit icon set (inlined here; atom variant missing in kit).
6. Light Text with Input uses Input - Text Size=Standard (200) stretched to 320; Dark Text with Options' Text Area is 310 fixed in a 320 column (5px short of the edge). Dark "Text with Options" holds a text area, not options — the name does not match.
7. Text Area (dark kit) Empty state shows no placeholder; here the live textarea is visible with an empty placeholder so typed text shows.
8. Dark primary label is lowercase "confirm" in Figma text (rendered uppercase, so it looks the same).
9. Radius 2 and gap 16 / 8 are not on the spacing/radius scale.
10. No width sizes, no scrolling body, no loading or error state, no danger variant (the Delete example uses Secondary Red, not a Primary danger).
11. Close × target 12 × 12.

## Not adopted
- The 5 loose `Modal` example instances on the canvas (4709:6926, 3615:21839, 3600:329, 3405:312, 3405:2506) — usage only; two are reproduced as Examples.
- The `Input - Dropdown Select` demo (3405:2559) and the `Notes` instance (3461:18350) — reference only; the Notes text is used under When (not) to use.
- `.documentation` "Variation Examples" area — not a component.

## Industry gaps — not added
- Overlay click closes (passive / modal dialogs) — Fluent 2, Ant (`mask.closable`). Figma lists only × and CTA.
- Sizes (XS–L, or a width option) — Carbon, Ant.
- Scrolling body with fixed header/footer — Carbon, Fluent 2.
- Alert dialog that cannot be dismissed with Esc (`role="alertdialog"`) — Fluent 2.
- Danger modal with a danger primary button — Carbon.
- Loading on the primary button while submitting — Carbon, Ant (`confirmLoading`).
- Body scroll lock while open — Ant (`scrollLock`).
- Non-modal dialog — Fluent 2.

## Sources
Figma `Modal` 1312:877 and `.documentation` 2692:9842 — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=1312-877
Carbon Modal usage — https://carbondesignsystem.com/components/modal/usage/
Fluent 2 Dialog usage — https://fluent2.microsoft.design/components/web/react/core/dialog/usage
Ant Design Modal — https://ant.design/components/modal
