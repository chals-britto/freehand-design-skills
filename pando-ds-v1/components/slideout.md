# Slideout — Pando DS V1

**Status:** Built 2026-10-28 · no review (every published variant kept) · **Figma:** DS V2 – Organisms (`fYULgtmiblAXtbHsoVL1Yf`) › 🟡 Slide out (0:1)
**Sets:** `Slideout` 17:117 (8 variants) · `.Panel - Swappable with Local` 2527:4746 (1 variant, the body slot → `.pds-panel-slot`)
**Files:** `slideout.css` · `slideout.js` (`pdsSlideout`) · `slideout.html` (live doc)
**Reuses (never re-implemented):** `button.css` (Secondary / Primary / Text Only, Small, Light + Dark) · `button-group.css` · `icons.css` + `icons/nav-close-tag.svg` (Navigation/Close-Tag) · `scrollbar.css` (`.pds-scroll`) · `toast.css/js` (CTA confirmation)

## What it is
Slideout provide optional content and actions without interrupting the main content (where the support content required or Quick Action Area, Summary - Where needs to take action or display details in lesser Space). *(Figma wording)* Set description: “Drawer used to take quick actions.”

## Variants
Properties: `Theme` (Light · Dark) × `Type` (Slide Overlay · Push Section) × `Size` (Small · Large · XL), booleans `Close` (default true) and `Actions` (default true). Only 8 combinations exist.

| Variant | Class | Sidebar width | Sidebar fill | Header | Heading | Close × | Shadow | Actions |
|---|---|---|---|---|---|---|---|---|
| Light · Slide Overlay · Small | `--light --overlay --small` | 440 `--slideout-w-light-small` | `--white` | no fill, pad 12/20 | `--pando-blue-active` #005399 | yes | `--shadow-3` | Secondary + Primary, gap 20 |
| Light · Slide Overlay · Large | `--light --overlay --large` | 740 | `--white` | same | same | yes | `--shadow-3` | same |
| Light · Slide Overlay · XL | `--light --overlay --xl` | 800 | `--white` | same | same | yes | `--shadow-3` | same |
| Dark · Slide Overlay · Small | `--dark --overlay --small` | 350 | `--dark-bg` #393945 | `--dark-darker` #24242F, pad 12/20 | `--white` | yes | none | Secondary (Dark) + Primary |
| Dark · Slide Overlay · Large | `--dark --overlay --large` | 640 | `--dark-bg` | same | `--white` | yes | none | same |
| Dark · Slide Overlay · XL | `--dark --overlay --xl` | 700 | `--dark-bg` | same | `--white` | yes | none | same |
| Light · Push Section · Small | `--light --push --small` | 342 | `--white` | `--accent-light-blue-bg` #F3F6FC, pad 12/15 | `--pando-blue-active` | no | none | Text Only + Primary, gap 10 |
| Light · Push Section · Large | `--light --push --large` | 404 | `--white` | same | same | no | none | same |

- **Close = false** → `hidden` on `.pds-slideout__close`. **Actions = false** → `hidden` on the `.pds-button-group`.
- Close-Btn: `--pando-blue` #0076DD square, white Close-Tag icon.
- Panel slot placeholder: Light fill `--accent-alternate-white` #F9FAFA, title `--pando-dark`, text #000000 (off-token); Dark fill #484858 (off-token), title `--white`, text `--dark-label-text` #D5DAF4.

## Anatomy & spacing
- Horizontal row `[Close-Btn][Sidebar]`, top-aligned; the Close-Btn hangs off the sidebar's left edge.
- Close-Btn 24×24, padding 6, radius 0, icon 12.
- Sidebar: vertical — Header (48 tall, gap 10, heading fills, Button Group hugs right) + Panel slot (fills, scrolls).
- Heading: Open Sans SemiBold 14 / line 16 → `.type-14-semibold` with line-height 16.
- Buttons: kit Small (24 tall; Text Only Small 14 tall). Labels are Figma's “Secondary” / “Primary”.
- Panel slot: padding 10 / 8 / 10 / 15, gap 10. Placeholder: padding 10, gap 4; title row gap 8 with a 20px `refresh-line` icon; title `.type-12-semibold`; text `.type-12-regular` with line-height 16.
- Height: Figma 760 (overlay) / 700 (push); built as 100% of the space below the header.

## Behaviour
From the Figma documentation: Overlay — bottom right, placed below the main header, with a background overlay. Fixed — bottom right, positioned as it opens under the current section. Closing: click on the close button; CTA action (depends on the context). Animation: in right to left, out left to right.

Built (`slideout.js`):
- **Slide Overlay** (`.pds-slideout-layer` > scrim + slideout): opens below `--header-height`, slides in from the right, overlay `--color-overlay`. Modal: focus goes to the first control, Tab is kept inside, **Esc closes**, focus returns to the trigger.
- **CTA** (`[data-slideout-cta]`) → closes the slideout, then `pdsToast.show()` with the `data-toast-*` values (kit build rule).
- **Cancel / ×** (`[data-slideout-close]`) → just closes.
- **Push Section** (`.pds-slideout-push-host`): sits beside the page content, which narrows; non-modal, no overlay; its trigger toggles it; Esc closes it while focus is inside.
- Events: `pds-slideout:open` · `pds-slideout:close` · `pds-slideout:cta` {cta}. API: `pdsSlideout.open(el, trigger)` · `close(el)` · `toggle(el)` · `init(root)`.
- Added, not in Figma: overlay colour, 240ms timing, focus ring, Esc, focus trap.

## When (not) to use
From Figma (Uses):
- Dark theme (Fixed) — no close interaction, e.g. invoice summary, Indent Creation (domestic).
- Dark theme (Overlay) — opens the over all screen action, e.g. upload, Comments against invoice.
- Light theme (Fixed) — as inner section of the page.
- Light theme (Overlay) — opens against individual items present in screen, e.g. Timeline for indent, Pickup/drop off selection, Add/Edit in masters & Settings.

## Accessibility
- Slide Overlay: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` = heading (set by `slideout.js`); focus trap, Esc, return focus.
- Push Section: `role="region"` + `aria-labelledby`; trigger has `aria-expanded`; closed = `aria-hidden="true"` + `inert`.
- × is `<button aria-label="Close">`. `prefers-reduced-motion` removes the slide.
- Contrast below 4.5:1 (kept): Text Only #0076DD on the Push header #F3F6FC 4.2:1; Secondary #0076DD on #EEF2F4 4.0:1 (kit Button).

## Open issues
- Only 8 of 12 combinations: no Dark Push Section (although Uses describes “Dark theme (Fixed)”), no Push XL.
- Widths differ per theme (Light 440/740/800, Dark 350/640/700, Push 342/404). Built as drawn.
- Background overlay described, not drawn — used `--color-overlay`; confirm.
- Close-Btn has no hover/pressed/focus state in Figma; focus ring added.
- Motion timing not in Figma; 240ms used.
- Push Section Button Group gap 10 vs kit Type=Buttons 20 — overridden in `slideout.css` (atom variant missing in kit).
- `refresh-line` (placeholder icon) not in the kit icon set — inlined on the doc page from the Figma SVG.
- Off-token: placeholder text #000000; Dark placeholder fill #484858.
- Line heights 14/16 and 12/16 vs type styles 19 / 17 — overridden to 16.
- `.Panel - Swappable with Local` also exists on the Action page (2528:1187); `.pds-panel-slot` lives in `slideout.css` — action-panel should link it (or move it to its own file).

## Not adopted
- `.documentation` instance (2190:603) — documentation only; its “Variation Examples” were not built.
- Industry gaps, not added: overlay click to close (Ant), footer action area (Fluent 2), sticky header/footer on scroll (Fluent 2), full-width size (Fluent 2), resizable edge and loading state (Ant), nested drawers (Ant).

## Sources
Figma — https://www.figma.com/design/fYULgtmiblAXtbHsoVL1Yf/DS-V2---Organisms?node-id=17-117
Fluent 2 Drawer usage — https://fluent2.microsoft.design/components/web/react/core/drawer/usage
Ant Design Drawer — https://ant.design/components/drawer
