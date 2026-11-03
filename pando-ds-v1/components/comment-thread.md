# Comments — Pando DS V1

**Status:** As in Figma, no review yet · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › 🟡 Comments (2305:4671)
**Files:** `comment-thread.css` (styles + component tokens) · `comment-thread.html` (live doc). No JS — Figma shows no behaviour.
**Reuses:** `avatar.css` (Comment Avatar), `tag.css` (Input Tag, File tag). `.pds-comment` is also used by the Chat Input Box molecule.

## What it is
Four sets on one page: `.Comment` (comment text, optionally starting with an Input Tag), `Chat Comment` (author, time, comment, optional attachment), `Comments` (chat bubbles for Shipper and User) and `.User Tag` (the S / T letter tag in Comments). Figma has no description text for these sets.

## Variants
12 published variants (+ the Show Attachment on/off state of Chat Comment).

| Set | Variants | Class | Values |
|---|---|---|---|
| .Comment 2388:7828 | Theme Light/Dark × Type .Comment / .Tag + Comment (4) | `.pds-comment`, `--dark`, `__tag` | Light text `#404040` (off-token, `--comment-fg`) · Dark `--white` · Input Tag from tag.css (`pds-tag--input`, `pds-tag--dark`) |
| Chat Comment 4420:6522 | Theme Light/Dark (2) · Show Attachment (boolean, off by default) | `.pds-comment-thread--chat`, `--dark`, `__meta`, `__author`, `__name`, `__time`, `__attachment` | Light name `--text-dark`, time `--text-light` · Dark name `--dark-label-text`, time `--dark-input-text` · avatar `pds-avatar--comment pds-avatar--transporter` (+`--dark`) · attachment `pds-tag--file` (Mode=Light in both themes) |
| Comments 5425:20667 | Type Shipper/User × Swapable No/yes (4), dark only | `.pds-comment-thread--message`, `--shipper`, `--user`, `--swap`, `__info`, `__bubble`, `__text`, `__slot` | Bubble `#484858` (off-token, `--comment-thread-bubble-bg`) · text `--dark-label-text` · name `--dark-label-text` · time `--dark-input-text` · slot `--pando-light`, title `--pando-dark`, body `#000000` (off-token) |
| .User Tag 5425:20692 | User Shipper/Transporter (2) | `.pds-comment-thread__user-tag` on `pds-avatar pds-avatar--comment` | Fill `--dark-bg` · S `--dark-highlight-green` · T `--dark-input-text` |

Text properties in Figma: Chat Comment `Date & Time` (“11:30 AM”); Comments `Time` (“10:39 AM”) and `Message` (“Input text here”); Input Tag `Tag Text` (“Text Input”).

## Anatomy & spacing
- **.Comment** width 380 · `.type-12-regular` (Figma 12/18) · Input Tag padding 4/8, 5 to the text · 4 between lines.
- **Chat Comment** width 400 · column gap 5 · header: avatar ↔ name 6, time pushed right · name and time `.type-10-regular` (0.5px tracking).
- **Comments** column gap 5 · Shipper left-aligned with info row (user tag ↔ name 5, name `.type-10-semibold` no tracking) · User right-aligned, no info row · bubble padding 10, radius 8 with the sender's top corner square (Shipper `0 8 8 8`, User `8 0 8 8`) · text `.type-12-regular` (Figma 12/16) · time `.type-10-regular`.
- **Swapable = yes** bubble 190 wide · text ↔ slot 5 · slot padding 10, gap 4, title row icon 20 + gap 8, title `.type-12-semibold`, body `.type-12-regular`.
- **.User Tag** 13×12 · padding 3/4 · radius 2 (Comment Avatar shape from avatar.css).

## Behaviour
None in Figma. Show Attachment is a static boolean (add or omit the attachment tag).

## When (not) to use
No guidance in Figma. The page's `.documentation` card describes Chat Input Box, not these sets.

## Accessibility
- Letter tags (Comment Avatar, .User Tag) need `role="img"` and `aria-label` (“Transporter”, “Shipper”).
- Use `<time>` for times.
- Group several comments in a list so the count is announced.
- Contrast for the accessibility pass: bubble time #8A8A9E on #484858 ≈ 2.6:1; Dark chat time #8A8A9E on #393945 ≈ 3.4:1.

## Open issues
- Line heights 12/18 (.Comment) and 12/16 (bubble, slot) built with `.type-12-regular` (12/17).
- Off-token: `#404040`, `#484858`, `#000000`.
- Inline Input Tag uses Remove = Yes padding (4/8) with the × hidden; set by `.pds-comment__tag`. Instance text is #404040; the kit tag uses `--text-dark` (kept).
- .Tag + Comment is two fixed lines in Figma; built as flowing text with the tag inline.
- Attachment tag: Removable = Yes but Right Icon = False → no ×. Left icon unread (hidden instance); the kit PDF icon is used.
- Comments' `Toggle Tab` boolean is bound to no layer — not built.
- Comments are dark-only and .User Tag fill equals `--dark-bg`; surface not stated in Figma.
- .User Tag differs from the avatar atom's dark Comment Avatar (#484858 @ 50%). Both kept.
- Atom variant missing in kit: `refresh-line` icon (slot placeholder) — inlined on the page.

## Not adopted
`Chat Input Box` (2394:7558) — separate molecule. `.documentation` instance (describes Chat Input Box). Two loose rectangles on the page. `.Swappable Content` (5427:20724) is built only as the slot placeholder inside the bubble.

## Industry gaps — not added
Reply / like actions, nested replies, full timestamp on hover, list header with reply count — Ant Comment.

## Sources
Figma — https://www.figma.com/design/rd3gmPnjhPo1d2GAlNSJOn/DS-V2---Molecules?node-id=2305-4671
Ant Design Comment (v4) — https://4x.ant.design/components/comment/
