# Chat Input Box — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › 🟡 Comments (2305:4671) › `Chat Input Box` (2394:7558)
**Files:** `chat-input.css` (layout + component tokens) · `chat-input.js` (`window.pdsChatInput`) · `chat-input.html` (live doc).
**Reuses:** `button.css` (Text Button · Small, Light/Dark), `button-group.css` (the Cancel + Add row), `tag.css` (Input Tag: Drop down Tag and Text Tag; Tag Small Filled = `.pds-tag--attachment`), `comment-thread.css` (`.pds-comment` for the typed text and `.pds-comment__tag` for the inline tag). The input atom is not used: Figma has no Input instance inside this set.

## What it is
From the Figma `.documentation` card: “Chat Input Box allows users to enter and send text-based messages. It supports to message composition, send attachments.” Set description lists alternative names: Chat · Comments · Message · Comment Box · Chat input box.

## Variants
10 published variants: `Theme` Light/Dark × `State` Empty/Filled × `Tag` No/Yes/Edit (Filled has No and Yes only). Two booleans: `Show Attachment` (default **true**, the clip icon) and `Show Attached File` (default **false**, a file tag next to the clip).

| Variant | Text area | “Add” | Values |
|---|---|---|---|
| Empty · Tag=No | Placeholder “Add comment here” | Disabled | 12 Italic · Light `--text-light` #6C6C6C · Dark `--dark-input-text` #8A8A9E |
| Empty · Tag=Yes | Drop down Tag “# Add Tag” (`.pds-tag--input-dropdown`), no placeholder | Disabled | kit tag colours (Light `--pando-light` / Dark `--dark-input-text`) |
| Empty · Tag=Edit | Same tag with “# \|” — the tag name being typed | Disabled | “\|” Light `--comment-fg` #404040 · Dark `--white` |
| Filled · Tag=Yes | `.pds-comment` with Text Tag “Text Input” + “has been increased due to labours shortage and we discussed the same in telephonic conversion” | Enabled | Light `--pando-blue` #0076DD · Dark `--dark-highlight-green` #1FCD93 |
| Filled · Tag=No | `.pds-comment` with “Logtech ipsum, fficiency augmented reality advanced ocean eBooking. …” | Enabled | as above |

“Cancel” is a Disabled Text Button in all 10 variants. Disabled text: `--grey-medium` #A3A3A3 (both themes).

| Part | Light | Dark |
|---|---|---|
| Box fill | none | `--dark-bg` #393945 |
| Text border (1px inside) | `--border-input-light` #E2EAEC | #484858 (off-token, `--chat-input-dark-border`) |
| Bottom bar | `--accent-off-white` #F8F8F8 | #484858 (off-token, `--chat-input-dark-bar-bg`) |
| Clip icon (Misc/Attachment) | `--pando-dark` #234357 | `--dark-label-text` #D5DAF4 |
| Attached file tag | `.pds-tag--attachment` (Tag Small Filled Default, Left + Right icon, Mode=Light), “Tag Text” | `.pds-tag--attachment.pds-tag--dark` (Mode=Dark) |

## Anatomy & spacing
- Root: vertical, width 400 (`--chat-input-width`), no gap.
- **Text**: min height 100 (`--chat-input-text-h`; fixed 100 in Figma), padding 10 (`--space-10`), gap 10 between tag row and text, 1px inside border.
- **Bottom bar**: height 34, padding 0 15 (`--space-15`), space-between, centred.
- **Attachment**: clip 14×14, 20px to the file tag (`--chat-input-attach-gap`).
- **Buttons**: Button Group, gap 20 (`--button-group-gap`), Text Button · Small (10/14 Bold, uppercase from the atom), labels “Cancel” and “Add”.

## Behaviour
From the `.documentation` card:
- “Send” (the “Add” button) enables once the box has a minimum character or an attachment.
- Click “Add” or press **Enter** to send. **Shift + Enter** adds a new line.

Built in `chat-input.js`:
- Typing grows the text area (min 100px, no max).
- `# Add Tag` → Tag=Edit (type the name) → Enter places a Text Tag at the start of the text (Filled · Tag=Yes look). Esc or an empty name returns to `# Add Tag` (added in review — not in Figma). Backspace at the start removes the tag (browser default).
- Clip opens the file picker; each file becomes an attached file tag with ×. × removes it.
- Sending fires `pds-chat-input:send` on the root with `{ text, tag, files }`, then clears the box and restores the tag row.
- Cancel stays disabled (as Figma).

## When (not) to use
From the `.documentation` card:
- Used in various modules to compose the message in chat/comments.
- Placement: fixed at bottom of the screen or pane. “Add comment here” placeholder text. Quick access icon as attachment. “Send” button on the right side.
- Error handling: if a message fails to send (e.g. network issues), an inline error message appears, prompting the user to retry. (No visual in Figma — not built.)
- Animation: NA.

## Accessibility
- Text area: `role="textbox"`, `aria-multiline="true"`, `aria-label="Comment"` (set a page-specific label where there are several).
- Clip is a button “Attach file”; file tag × is “Remove <file name>”; “Add” uses native `disabled`.
- Tag name input labelled “Tag name”; committed tag is `contenteditable="false"` inside the text.
- Focus ring `2px --pando-blue`, offset 2px on text area, tag, clip and × — added in review, not in Figma.
- Contrast for the accessibility pass: disabled #A3A3A3 on #F8F8F8 ≈ 2.4:1, on #484858 ≈ 3.5:1; dark placeholder #8A8A9E on #393945 ≈ 3.4:1.

## Open issues
1. Documentation says “Send”; every variant’s button reads “Add”. Built as “Add”.
2. Cancel is Disabled in every variant, Filled included; its action is not stated.
3. Dark Filled “Add” = Disabled Text Button with a #1FCD93 override. **Atom variant missing in kit** (green Dark Text button) — set in `chat-input.css`.
4. Text area fixed at 100 in Figma; built min 100 + grow. No max height / scroll rule.
5. Inline send error: no visual or copy in Figma. Not built.
6. Tag=Edit shows only “# |”: no suggestions list, no rule for removing a committed tag.
7. Attached file tag text and left icon are hidden in every variant (only instance properties readable: “Tag Text”, Removable). Kit PDF icon used.
8. Light · Empty · Tag=Yes uses a detached “Buttons” frame instead of the Button Group instance (same look).
9. Light has no fill: the box shows the surface under it.
10. Off-token: #484858 (Dark border and bar).
11. Typed text 12/18 in Figma, built 12/17 (`.type-12-regular` via `.pds-comment`). Placeholder is 12 Italic — no italic text style in tokens.css.
12. No hover / focus / disabled state for the whole box in Figma.

## Not adopted
Nothing else in the set. The other sets on the page (.Comment, Chat Comment, Comments, .User Tag, .Swappable Content) are the Comments molecule (`comment-thread`). Two loose rectangles on the page.

## Industry gaps — not added
- Auto-size with a max row count (default 8), then scroll — Ant Design X Sender.
- Sending/loading state with a stop action — Ant Design X Sender.
- Paste files into the box — Ant Design X Sender.
- Disabled and read-only states for the whole box — Ant Design X Sender.
- Optional character counter that stops input at the limit — Carbon Text input.
- Error state = red border + icon + message, validate on submit — Carbon Text input.

## Sources
Figma — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=2394-7558
Ant Design X Sender — https://x.ant.design/components/sender
Carbon Text input usage — https://carbondesignsystem.com/components/text-input/usage/
