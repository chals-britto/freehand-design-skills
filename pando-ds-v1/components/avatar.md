# Avatar — Pando DS V1

**Status:** Built from Figma 2026-10-23 · no review yet (everything published treated as Keep) · **Figma:** DS V2 – Atoms › 🟢 Avatars (2971:1070)
**Files:** `avatar.css` (styles + component tokens) · `avatar.html` (live doc). No JS — avatars have no behaviour in Figma.

## What it is
An avatar is a visual representation of a entity or user. *(Figma wording)*

Three published components:
- **Icon Avatar** (set 3036:1308) — a 30px circle with a 14px indicator icon (entity type: factory, road, super admin …).
- **Text Avatar** (component 3037:1328) — a 40px white circle with initials.
- **Comment Avatar** (set 3037:1333) — a tiny letter badge, **T** (Transporter) or **S** (Shipper), for comment threads.

No variant uses a photo, so there is no image avatar.

## Variants

### Icon Avatar — `State` × `Color` × `Theme` (11 published combinations) + `Indicator Icon` instance swap
| Variant | Fill | Glyph | Class |
|---|---|---|---|
| Default · Purple · Light | `--color-status-purple-bg` #F2E7FE | `--pando-dark` #234357 | `.pds-avatar--purple` |
| Default · Cyan · Light | `--color-status-cyan-bg` #BDF0F4 | #234357 | `--cyan` |
| Default · Maroon · Light | `--color-status-maroon-bg` #FFE3EA | #234357 | `--maroon` |
| Default · Blue · Light | `--color-status-blue-bg` #D9E6FF | #234357 | `--blue` |
| Default · Green · Light | `--color-status-green-bg` #D5F9D1 | #234357 | `--green` |
| Default · Brown · Light | `--color-status-brown-bg` #FFEEC4 | #234357 | `--brown` |
| Default · Purple · Dark | #F2E7FE (same as Light) | #234357 | `--purple --dark` |
| Active Card · Purple · Light | `--white` | #234357 | `--active-card` |
| Checkbox · Purple · Light | `--white` (identical to Active Card) | #234357 | `--checkbox` |
| Active Card · Blue · Dark | `--dark-light` #343440 | `--status-blue-light` #D9E6FF | `--active-card --dark` |
| Selected · Purple · Light | `--pando-blue` #0076DD | `--white` check (Navigation/Selected) | `--selected` |

`Indicator Icon` is an instance swap with 59 preferred icon sets from the Indicator Icon library. The page renders the default (**Factory**, 14px); Figma's examples also use **Super Admin** and **Road**. Put any 14px icon inside `.pds-avatar__icon`; it inherits the glyph colour through `currentColor`.

### Text Avatar — 1 variant
| Part | Value | Token |
|---|---|---|
| Circle | 40×40, white | `--white` |
| Shadow | 0 2px 4px rgb(0 0 0 / 6%) | `--shadow-2` |
| Initials | "SR", Open Sans Regular 16, #0076DD | `.type-16-regular` · `--pando-blue` |

### Comment Avatar — `Theme` × `Comment By` (4)
| Variant | Fill | Letter | Class |
|---|---|---|---|
| Light · Transporter | #FFEEC4 @ 50% (`--status-brown-light`) | T, `--pando-dark` | `.pds-avatar--comment.pds-avatar--transporter` |
| Light · Shipper | #D9E6FF @ 50% (`--status-blue-light`) | S, `--pando-dark` | `--comment --shipper` |
| Dark · Transporter | #484858 @ 50% (off-token) | T, `--dark-input-text` #8A8A9E | `--comment --transporter --dark` |
| Dark · Shipper | #484858 @ 50% (off-token) | S, `--dark-highlight-green` #1FCD93 | `--comment --shipper --dark` |

The letters are vector shapes in Figma (5×6 T, 4.7×6 S), not text — the page uses the exported paths.

## Anatomy & spacing
- **Icon Avatar:** 30×30 (hugs) · padding 8 · glyph 14 · fully round · no border · no shadow.
- **Text Avatar:** 40×40 · initials centred · `--shadow-2`.
- **Comment Avatar:** 13×12 (T) / 12.7×12 (S) · padding 3 / 4 · radius 2 · glyph 6 high.
- Dark-theme variants sit on the sidebar background `--color-sidebar-bg` #393945 (Figma's backdrop rectangle).

## Behaviour
None defined in Figma. `Active Card` is the look inside an active (selected) card; `Selected` replaces the icon with a white check on Pando blue; `Checkbox` currently looks the same as Active Card (see Open issues).

## When to use
- Placement & Convention: Displayed within lists, cards or on the menu. *(Figma wording)*
- Figma's "Uses" field is still the placeholder "Enter suggestion here" — no usage guidance exists.

## Accessibility
- An avatar that carries meaning (entity type, who commented) needs a text alternative: `role="img"` + `aria-label` on the avatar (e.g. "Factory", "Transporter"). Purely decorative avatars next to a visible name get `aria-hidden="true"`. *(added in review — not in Figma)*
- Contrast (for the accessibility pass): Text Avatar #0076DD on white 4.53:1 (passes at 16px). Comment Avatar Dark · Transporter #8A8A9E on #484858@50% over #393945 = 2.97:1 (fails 4.5:1 and 3:1 non-text).

## Open issues
1. `State=Checkbox` is pixel-identical to `State=Active Card` (white fill, factory icon, no checkbox). Intended look unknown.
2. `Theme=Dark, State=Default` is identical to the Light variant (#F2E7FE fill, #234357 glyph) — no dark treatment.
3. Only 11 of the 48 State × Color × Theme combinations exist; Active Card / Selected / Checkbox exist in Purple (and Active Card · Blue · Dark) only.
4. Comment Avatar dark fill #484858 @ 50% (style "Opacity/484858-Dark-50") is not in tokens.css; Light fills are unnamed 50% tints of Status Light colours.
5. Text Avatar initials use line-height AUTO in Figma; `.type-16-regular` uses 22px (no visible effect in a fixed 40px circle).
6. Text Avatar uses style "16px/Regular/Top-Header" — the name suggests it was meant for the header.
7. Dark · Transporter letter contrast 2.97:1.
8. Figma "Uses" text is a placeholder.

## Not adopted
- Loose rectangle 3036:1268 (#393945 backdrop behind the dark Comment Avatars) — canvas aid, not a component.
- `.documentation` frame "Variation Examples" (instances with Super Admin and Road icons) — examples only.

## Industry gaps — not added
- Image/photo avatar with fallback to initials or icon — Ant Design https://ant.design/components/avatar
- Sizes (small / medium / large / custom) — Ant Design https://ant.design/components/avatar
- Avatar group with max count and "+n" overflow — Ant Design https://ant.design/components/avatar
- Presence badge and activity ring — Fluent 2 https://fluent2.microsoft.design/components/web/react/core/avatar/usage
- Square shape for groups / organisations — Fluent 2 https://fluent2.microsoft.design/components/web/react/core/avatar/usage
- Hover / focus states if the avatar is interactive — Fluent 2 https://fluent2.microsoft.design/components/web/react/core/avatar/usage

## Sources
Figma DS V2 – Atoms › 🟢 Avatars — https://www.figma.com/design/S21sFFHjfc3XvGDAAYvA49/DS-V2---Atoms?node-id=2971-1070
Ant Design Avatar — https://ant.design/components/avatar
Fluent 2 Avatar usage — https://fluent2.microsoft.design/components/web/react/core/avatar/usage
