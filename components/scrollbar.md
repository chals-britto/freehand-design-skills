# Scrollbar — Pando DS V1

**Status:** Built 2026-10-23 · no review yet — published component treated as Keep · **Figma:** DS V2 – Atoms › 🟢 Scrollbar › `Scrollbar` (600:2)
**Files:** `scrollbar.css` (class `.pds-scroll` + component tokens) · `scrollbar.html` (live doc)

## What it is
The thin custom scrollbar used inside scrolling panels and menus (the Dropdown menu uses it). One component set, property `Theme` = Light / Dark. Figma has no written description.

## Variants
`Theme` = 2 variants.

| Theme | Track (Scrollbar) | Handle | Class |
|---|---|---|---|
| Light | `--accent-off-white` #F8F8F8 (Accent/OffWhite) | `--grey-light` #E7E7E7 (Grey/Light) | `.pds-scroll` (default) or `.pds-scroll--light` |
| Dark | `--dark-bg` #393945 (Dark/Dark-Bg) | #484858 (Figma style Dark/Input BG — **off-token**, component token `--scroll-thumb-dark`) | `.pds-scroll--dark` |

## Anatomy & spacing
1. **Scrollbar (track)** — width 6 (`--scroll-size`), radius 8 (`--scroll-radius`), height = the scrolling area (500 in the Figma example).
2. **Handle (thumb)** — width 6, radius 8, height 100 in the Figma example (in the browser the length follows the content).

The Figma frame also has padding-top 30 and item spacing 10: these only place the handle in the example and are not part of the component. No shadow, no border, no arrow buttons.

## Behaviour
- Put `.pds-scroll` on the element that scrolls (it sets `overflow: auto`). Add `.pds-scroll--dark` on dark surfaces.
- Chrome, Edge, Safari: exact 6px width and 8px radius via `::-webkit-scrollbar`.
- Firefox: only `scrollbar-width: thin` (≈8px, browser-drawn) and `scrollbar-color` are available; the radius cannot be set. These are applied only where `::-webkit-scrollbar` is not supported, because Chrome 121+ drops the WebKit styling once the standard properties are set.
- Horizontal bars get the same size and colours (`height: 6px`); Figma only draws the vertical bar.
- Figma has no hover, active or dragging states — none added.

## When (not) to use
No usage text in Figma.

## Accessibility
- The bar stays a native scrollbar, so keyboard, wheel and touch scrolling are unchanged. A scrolling region that holds content should be reachable by keyboard (`tabindex="0"` plus a name when it is not a form control).
- Contrast for the accessibility pass: Light handle #E7E7E7 on track #F8F8F8 is 1.16 : 1; on white 1.24 : 1. Dark handle #484858 on #393945 is 1.27 : 1. All far below 3 : 1 (WCAG 1.4.11). Kept as Figma.
- 6px is a small target for dragging with a mouse; wheel/touch are unaffected.

## Open issues
- Handle colour in Dark (#484858, “Dark/Input BG”) is not in tokens.css.
- Figma names the dark track style “Dark/Dark-Bg-#393944” but the fill is #393945.
- Handle-to-track contrast is 1.16–1.27 : 1 (see Accessibility).
- No hover / active / dragging states and no horizontal variant in Figma.
- Firefox cannot match 6px or the 8px radius.

## Not adopted
- Specs frame (5409:9009) and its Artwork/marker frames — documentation, not part of the component.

## Sources
Figma DS V2 – Atoms › Scrollbar — https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=600-2
MDN scrollbar-color — https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
MDN ::-webkit-scrollbar — https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
WCAG 2.2 1.4.11 Non-text contrast — https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
