# Brand — Pando DS V1

**Status:** Built from Figma 2026-10-28 · no review yet · **Figma:** DS V2 – Atoms › AI + Branding (7902:1169) › section "Pando - Pi branding" (10608:860) › `Pi-Avatar` (7906:1025) and `Pando-Logo` (8346:9246)
**Files:** `brand.css` (preview styles + component tokens) · `brand.html` (gallery) · `brand/*.svg` (12 assets, exported from Figma with `exportAsync({format:'SVG_STRING'})`, unedited except the two noted below). No JS.

## What it is
Brand assets: the Pi mark (the AI avatar) and the Pando wordmark. They are files to place, not components to rebuild. Figma has no description on either set.

## Variants

### Pi-Avatar (7906:1025) — `Size` × `Ai Stars` × `Shadow`, 6 of 8 combinations exist

| Figma variant | Node | Figma size | SVG file | SVG size |
|---|---|---|---|---|
| Size=Large, Ai Stars=No, Shadow=Yes | 7905:988 | 330 × 350 | `brand/pi-avatar-large-shadow.svg` | 430 × 450 |
| Size=Large, Ai Stars=No, Shadow=No | 8926:1397 | 330 × 350 | `brand/pi-avatar-large.svg` | 330 × 350 |
| Size=Small, Ai Stars=No, Shadow=Yes | 7906:1024 | 133 × 142 | `brand/pi-avatar-small-shadow.svg` | 213 × 222 |
| Size=Small, Ai Stars=No, Shadow=No | 8926:1401 | 133 × 142 | `brand/pi-avatar-small.svg` | 133 × 142 |
| Size=Large, Ai Stars=Yes, Shadow=Yes | 7951:218 | 330 × 419.12 | `brand/pi-avatar-large-ai-stars-shadow.svg` | 407 × 490 |
| Size=Small, Ai Stars=Yes, Shadow=Yes | 7951:228 | 133 × 168.92 | `brand/pi-avatar-small-ai-stars-shadow.svg` | 204 × 229 |

Colours (inside the SVG): body gradient #FFEC75 → #F8CF0C (18.8%) → #F2C200, white sheen at 20%, white→#F2C200→white edge stroke; eyes #211203. Stars: #FFDE72 → white with a #FFE01B overlay. Shadow: x 20, y 20, blur 50 (Large) / 40 (Small), rgba(144,122,15,0.8).

### Pando-Logo (8346:9246) — `Type` × `Color`, 6 variants

| Figma variant | Node | Size | SVG file | Letters | Dot | Pi mark |
|---|---|---|---|---|---|---|
| Type=Flat, Color=Black | 8066:1168 | 380 × 106.7 | `brand/pando-logo-flat-black.svg` | #0F0F0F | #FFDD33 | flat #FFE01B, "Ai" #0F0F0F |
| Type=Flat, Color=White | 9494:7981 | 380 × 106.7 | `brand/pando-logo-flat-white.svg` | white | #FFDD33 | flat #FFE01B, "Ai" white |
| Type=Flat, Color=Green | 8346:9247 | 380 × 106 | `brand/pando-logo-flat-green.svg` | #003D31 | #003D31 | #003D31 with "Ai" cut out |
| Type=Gradient, Color=White | 8345:9233 | 380 × 106 | `brand/pando-logo-gradient-white.svg` | white | #FFE01B | gradient, "Ai" #003D31 |
| Type=Gradient, Color=Green | 8345:9234 | 380 × 106 | `brand/pando-logo-gradient-green.svg` | #003D31 | #FFE01B | gradient, "Ai" #003D31 |
| Type=Gradient, Color=Black | 8345:9245 | 380 × 106 | `brand/pando-logo-gradient-black.svg` | #0F0F0F | #FFE01B | gradient, "Ai" #0F0F0F |

Gradient Pi mark: #FFE01B (3%) → #F2C200 (51%) → white, white sheen at 20%, 0.82px white→#F2C200→white stroke.

`pando-logo-flat-white.svg` and `pando-logo-gradient-black.svg` were produced from the Black / Green exports by swapping the one fill colour and the id suffix; Figma's own exports of those two were identical apart from that (same byte length, checked).

## Anatomy & spacing
- Pi mark: a rounded leaf shape with two square eyes. Ai Stars adds three four-point stars above-right.
- Logo: "pando" wordmark, a dot, and the Pi mark with "Ai" inside it.
- **Shadow variants:** the SVG canvas is larger than the Figma component because it includes the shadow (e.g. Large 430 × 450 for a 330 × 350 component; the shape sits at 30, 30). Place by the shape, not the file box.
- Figma states **no clear space and no minimum size** for either set. An instance of Pando-Logo is used at 74 × 21 on the same page (8388:1072).

## Behaviour
None. Static images.

## When (not) to use
Figma has no usage text for these sets. The only text in the section is the Core Colors brand guideline (frame P46, 7902:1192), quoted here as written:

> The primary palette uses a combination of bold natural hues: A Yellow named "Quaking aspen trees" and "Forrest" for Green and Charcoal represents as Earth
>
> The cream shade is a lightened tint of our yellow, while the forest color is a darkened tone. A lighter cream and toned white add contrast and flexibility for accessibility, and they work together to emphasize the Pando yellow.

| Name | As written in Figma |
|---|---|
| Pando Yellow | #FFE01B · R255 G224 B0 · C62 M22 Y100 K0 |
| Pando Green | #003D31 · R255 G255 B255 · C0 M0 Y0 K0 |
| Charcoal | #0F0F0F · R15 G188 B115 · C75 M0 Y75 K0 |

## Do / Don't
None in Figma; none added.

## Accessibility
- Give the logo `alt="Pando"` and the Pi mark an alt that names it (e.g. `alt="Pi"`), or `alt=""` when a visible label sits next to it. *(added in review — not in Figma)*
- White variants (Flat White, Gradient White) are meant for dark grounds; on white they disappear. Flat Green on Charcoal is very low contrast. Shown on both grounds in the gallery so the pairing is visible.

## Open issues
1. Core Colors text contradicts itself: Pando Yellow #FFE01B is listed as R255 G224 B0 (= #FFE000); Pando Green #003D31 is listed as R255 G255 B255 / C0 M0 Y0 K0 (white); Charcoal #0F0F0F is listed as R15 G188 B115 / C75 M0 Y75 K0 (a green). Hex values are taken as correct here.
2. Two yellows: the dot in Flat Black / Flat White is #FFDD33; every other yellow fill is #FFE01B.
3. Pi-Avatar matrix is incomplete: Ai Stars=Yes exists only with Shadow=Yes (no star variant without shadow).
4. Flat Black / Flat White are 106.7 tall; the other four logos are 106.
5. Brand colours (#FFE01B, #003D31, #0F0F0F, #F2C200, #211203, #FFEC75, #F8CF0C, #FFDE72, #FFDD33) are not in `tokens.css`.
6. No clear space, minimum size, or placement rules in Figma.
7. The second colour frame (P48, 7902:1213) has the labels Functional / Light / Accent and 15 swatches without names or values in text; not documented here.

## Not adopted
- `Freehand-Logo` (10608:959, 3 variants) — V2 / Freehand brand, not V1 (see `review/atoms-audit.md` §C). Likely duplicates the `logo-apps-freehand-*` icons.
- `Pi-With Halo` (10687:255, 2 variants, 1100 × 2180) — large brand illustration, not a UI asset (atoms-audit §C). Export only if a screen needs it.
- Loose items in the section: Pi-Avatar instances (9161:6933, 7906:1032), ellipses 7906:1026–1030, groups 7906:1037 / 8058:979 / 8344:9215, frame "Gradient logo 1" (7951:182), "ai-wand 1" raster frames (per atoms-audit), Header-Logo/Apps instance (10687:454) — not built.

## Sources
Figma file `S21sFFHjfc3XvGDAAYvA49`, page AI + Branding 7902:1169, section 10608:860.
