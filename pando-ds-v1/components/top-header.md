# Top Header — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Molecules (`rd3gmPnjhPo1d2GAlNSJOn`) › 🟢 Header (0:1) › `Top Header` (423:77)
**Files:** `top-header.css` (layout + component tokens) · `top-header.html` (live doc). No JS. Reuses `icons.css` + `components/icons/` (logo, header icons), `button.css` (AI Copilot button, buttons), `button-group.css`.

## What it is
Top Header denoting Shipper/Vendor/TransporterConsignee Portal. *(Figma description)*

## Variants
`Brand` × `Type` = 4 variants, 1280 × 50 in Figma, built 100% wide.

| Variant | Class | Fill | Logo colour | Right side |
|---|---|---|---|---|
| Brand=Freehand, Type=Shipper (default, 1:1107) | `.pds-top-header` | `--color-header-bg` → `--freehand-dark` #153F69 (style "Primary/Freehand-Dark") | `--freehand-orange` #FE6505 | Icons · Support · AI Copilot slot, top-aligned |
| Brand=Freehand, Type=Gradiant (5117:2993) | `--gradient` | `linear-gradient(90deg, #153F69, #005399)` = `--freehand-dark` → `--pando-blue-active`, no style | #FE6505 | Icons · Support · Button Group, centred |
| Brand=Pando, Type=Transporter (423:76) | `--transporter` | #153F69 | `--status-brown-medium` #FAAE3C | none |
| Brand=Pando, Type=Consignee (1110:4346) | `--consignee` | #153F69 | `--status-cyan-medium` #63EBF8 | none |

Properties (all booleans default as listed): Client Name (text, "Global Industries") · Module Name (text, "Module Name") · Show Icons (false) · Icon 1 / 2 / 3 (true) · Show Support (false) · Show AI Copilot Button (false). Hidden slots use the `[hidden]` attribute.

### Header colour role
The header uses Figma style **Primary/Freehand-Dark #153F69**, which is exactly the kit role `--color-header-bg` (→ `--freehand-dark`) that Toast and the build rules assume. Match for Shipper, Transporter and Consignee. **Type=Gradiant differs**: #153F69 → #005399 left → right, not covered by the role (component token `--top-header-bg-gradient`).

## Anatomy & spacing
- Bar: height 50 · padding `0 20px` · Left/Right gap 10 (`--space-10`) · space-between (Brand=Pando: left-aligned).
- Left: gap 20, centred. Logo `logo-apps-freehand-logo` 27×28 (currentColor) · divider 1px × 32, #9CB3BF @ 50% · title row gap 4.
- Title: Client Open Sans SemiBold 16 (built 600 16/22), "-" Regular 16, Module `.type-16-regular` (style "16px/Regular/Top-Header"); all white.
- Right: gap 20, right-aligned. Icons frame: padding 10, gap 20, 3 × 24px — `header-icons-global-search-active`, `header-icons-notification-inactive` (#CBD4D8 `--accent-blue-grey`), `header-icons-new-features-inactive`.
- Support: 77 × 32, padding `8px 15px`, radius `0 0 6px 6px`, `--accent-off-white` #F8F8F8, text `--status-cyan-dark` #006265 `.type-12-semibold`. In Shipper it hangs from the top edge; in Gradiant it is centred.
- AI Copilot: kit `.pds-button--ai` (Type=Freehand, State=Default) inside a 10px-padded slot. Gradiant has the kit Button Group (Type=Buttons, all booleans off) instead.

## Behaviour
None of its own. Icons, Support and buttons are buttons; what they open is not in Figma.

## When (not) to use
Figma has only the description above. Placed full width at the top of the page; toasts sit directly under it (`--header-height: 50px`).

## Accessibility
- `<header>` as the banner landmark; client + module in one `<p>`.
- Each icon button has an `aria-label` from its icon name (Global search, Notifications, New features) — not in Figma.
- Focus: 2px `--pando-blue` outline, offset 2 — added in review, not in Figma (kit rule); low contrast on #153F69.
- Contrast: white on #153F69 ≈ 10.8:1; #CBD4D8 icons ≈ 7.2:1; Support #006265 on #F8F8F8 ≈ 6.7:1; the Active Global Search dark glyph #234357 on #153F69 ≈ 1.0:1.

## Open issues
- Brand=Pando variants use the **Freehand** logo, recoloured; no Pando logo in the set.
- Brand=Pando has no Right frame; the right-side booleans do nothing there.
- Show AI Copilot Button has a layer only in Shipper; Gradiant has a hidden Button Group instead and no AI slot.
- Gradiant gradient has no Figma style; divider #9CB3BF @ 50% is off-token.
- No `.type-16-semibold` in the kit (client name); Support text is 12 auto vs kit 12/17.
- Header icons: no hover/active states in this set; Global Search is shown Active by default.
- No avatar/profile, switcher or skip link.

## Not adopted
- **Top Header Green - Exploration** (3358:1356, 3 variants) — exploration, not built.
- Loose `Header-Logo/Apps` instances (6536:800, 6536:801) on the page — not built.

## Industry gaps — not added
- Skip to main content link (WCAG 2.4.1), profile/account and app switcher, hamburger for a collapsible side nav — Carbon UI shell header.

## Sources
Figma 423:77 (read-only). Carbon UI shell header usage — https://carbondesignsystem.com/components/UI-shell-header/usage/
