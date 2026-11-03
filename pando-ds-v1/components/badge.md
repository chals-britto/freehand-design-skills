# Badges & Callouts — Pando DS V1

**Status:** Built from Figma 2026-10-23 (no review yet: every published item treated as Keep) · **Figma:** DS V2 – Atoms › 🟢 Badges & Callouts (3185:1868)
**Files:** `badge.css` (styles + component tokens) · `badge.html` (live doc) · no JS (no behaviour)

The page has three component sets, built as three classes in the same files:

| Figma set | Class |
|---|---|
| `Badge` (3241:3574) | `.pds-badge` |
| `Callout / Subheader Notification` (3241:3594) | `.pds-callout` |
| `Indicator Ribbbon` (2533:905) | `.pds-ribbon` |

## What it is
Figma has no description for Badge or Callout. The page’s documentation block was never filled in: it still says “Enter Description” and “Enter suggestion here”.
Indicator Ribbon: “Ribbon for listing card” *(Figma component description)*.

## Variants

### Callout / Subheader Notification: `Property 1` = Info · Error · Success (3 variants)
| Variant | Fill | Text | Icon ring (16) | Icon dot (8, gradient top→bottom) |
|---|---|---|---|---|
| Info | `--status-brown-light` #FFEEC4 | `--status-brown-dark` #422500 | #422500 @10% | #422500 → #A05A00 *(off-token)* |
| Error | `--status-red-light` #FFEAEE | `--status-red-dark` #FF0000 | #570000 @10% *(off-token)* | #760000 *(off-token)* → #FF0000 |
| Success | `--status-green-light` #D5F9D1 | `--status-green-dark` #041F04 | #115700 @10% *(off-token)* | #1F7600 → #1CCA00 *(off-token)* |

Property: `Notification Text` (text, default “Notification title goes here”).

### Badge: `Type` × `Size` × `Color` (6 published variants)
| Variant | Fill | Dot (5) | Label | Value |
|---|---|---|---|---|
| Text · Small · Green | gradient #008D5E 100→5%, layer 12% (`--accent-green-highlight`) | #008D5E | none | `--status-cyan-dark` #006265 |
| Text · Small · Red | gradient `--status-red-light` #FFEAEE 100→5% | `--status-orange-dark` #F94200 | none | #F94200 |
| Text · Large · Red | #FFEAEE @70% | `--action-red` #E25757 | `--pando-dark` #234357 | #E25757 |
| Text · Large · Blue | `--status-blue-light` #D9E6FF @50% | `--pando-blue-active` #005399 | #234357 | #005399 |
| Text · Large · Green | `--status-green-light` #D5F9D1 @50% | `--status-cyan-dark` #006265 | `--status-green-dark` #041F04 | #006265 |
| Count · Small · Blue | `--border-blue-grey` #B5C3CB | none | none | `--text-dark` #313131 |

Properties: `Show Label` (boolean, default true; Large only), `Count` (text, default “+3”).
Combinations that are not published (e.g. Small Blue, Count Red/Green, Count Large) are not built.

### Indicator Ribbon: `State` = Error · Info · Warning (3 variants) × `Show Checkbox`
| State | Fill (body + tail) | Text |
|---|---|---|
| Error | `--action-red` #E25757 | `--white` |
| Info | `--highlight-blue-light` #9CD2FF | `--pando-dark` #234357 |
| Warning | `--highlight-yellow` #FFCF00 | `--text-dark` #313131 |

`Show Checkbox` (boolean, default false) shows a 14px Checkbox instance (Checkbox 3331:3618) before the text.

## Anatomy & spacing
- **Callout:** height 34 fixed · width hugs · padding 0 20 · gap 10 · icon 16 (ring) + 8 (dot) · no radius, border or shadow. Text `.type-12-semibold`.
- **Badge Small:** height 16 · padding 0 5 · gap 5 · radius 4 · dot 5. Text `.type-12-semibold`.
- **Badge Large:** height 24 · padding 4 8 · gap 8 · radius 2 · dot 5 · content aligned to the end. Label `.type-10-semibold` uppercase with **0 tracking**; value `.type-12-bold` uppercase.
- **Badge Count:** 16 × 16 · padding 1 2 · fully round · text `.type-10-semibold`, 0 tracking, centred.
- **Ribbon:** height 52 · body padding 10 10 10 15 (Warning: 10 all round) · gap 10 · radius 2 0 0 2 · notched tail 20 × 52 in the same colour. Text `.type-12-semibold` uppercase (Figma style “Button/Action-Semibold”).

## Behaviour
None. All three are static.

## When (not) to use
Not documented in Figma.

## Accessibility
- Badges and callouts are text; nothing to focus.
- The coloured dots and callout icons carry no meaning on their own; the text must say it.
- Contrast for the accessibility pass (below 4.5:1): Callout Error #FF0000 on #FFEAEE **3.48:1** · Badge Small Red #F94200 on #FFEAEE **3.14:1** · Badge Large Red value #E25757 on #FFEAEE@70% **3.31:1** · Ribbon Error white on #E25757 **3.66:1**.

## Open issues
- Documentation block on the page is an empty template (“Enter Description”, “Enter suggestion here”). No usage rules exist.
- Callout **Info** uses the Status/Brown palette (looks like a warning). Variant property is still called `Property 1`.
- Callout icon colours #A05A00, #760000, #1F7600, #1CCA00, #570000, #115700 are not in tokens.css.
- Badge colour naming does not match the colours: Small **Red** uses Status/Orange-Dark #F94200 for dot and text; Small **Green** text is Status/Cyan-Dark.
- Badge Large Red value uses raw #E25757 (no style; matches Action/Red).
- Badge Large Red sample mixes weights: “+” and “more” regular, “USD 50.00” bold. Built as `.pds-badge__light` inside the value.
- Only 6 of 12 Badge combinations exist (no Small Blue, no Large/Red/Green Count).
- Line heights are “auto” in Figma (≈16px at 12px, ≈14px at 10px); kit uses `.type-12-semibold` 17px and `.type-12-bold` 14px. Label/Count use 10px with 0 tracking, where `.type-10-semibold` has 0.5px.
- Ribbon set name has a typo (“Ribbbon”) and its text layer is named “Error Text Here” on every state.
- Ribbon tail: the Figma vector has a rounded notch vertex; the kit approximates it with an SVG curve.
- Ribbon `Show Checkbox` uses the Checkbox component, which is not in the kit yet; the page shows a native 14px checkbox as a stand-in.
- Contrast failures listed under Accessibility.

## Not adopted
- `.documentation` instance (3243:3628): empty template, not built.
- No loose frames on the page.

## Sources
Figma DS V2 – Atoms, page 3185:1868: sets 3241:3574, 3241:3594, 2533:905.
Industry gaps (not added) are listed on `badge.html`:
- Ant Design Badge — https://ant.design/components/badge
- Fluent 2 Badge usage — https://fluent2.microsoft.design/components/web/react/core/badge/usage
- Carbon Notification usage — https://carbondesignsystem.com/components/notification/usage/
