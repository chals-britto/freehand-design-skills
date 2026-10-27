# Button Group — Pando DS V1

**Status:** Built 2026-10-28, not reviewed · **Figma:** DS V2 – Molecules › 🟡 Button Group (page 2305:4669) › `Button Group` (3153:4370)
**Files:** `button-group.css` (layout + component tokens) · `button-group.html` (live doc). No JS: the group has no behaviour of its own. Every button inside is the kit Button atom (`button.css`, `button.js`).

## What it is
A row of buttons placed together, right-aligned. Figma has no description or `.documentation` for this set. It is reused by Chat Input Box, Subheader, Top Header, Filter Light/Dark, Search Section and List `.Options in Right`.

## Variants
`Type` (2) + three booleans on Type=Buttons.

| Variant | Buttons (kit classes) | Gap | Align | Height |
|---|---|---|---|---|
| Type=Buttons (default) | Secondary `.pds-button--secondary` + Primary `.pds-button`, label "Button Text", Light, Normal | 20px `--button-group-gap` | right, centred | 30 |
| Type=Action Buttons | 5 × Action `.pds-button--action`, 10px icon `10px · Type=LR` + label "Action", Light | 10px `--space-10` | right, centred | 22 |

Booleans (Type=Buttons only, all default **false**). Each shows one extra button in a fixed slot:

| Boolean | Shows | Slot (left → right) |
|---|---|---|
| Show All Buttons | Button Dropdown, Secondary, "Button Text" | 1 |
| Show Button 4 | Text Button, Secondary, "Button Text" | 2 |
| Show Button 3 | Button Dropdown, Secondary, "Button Text" | 3 |
| — always on | Text Button, Secondary | 4 |
| — always on | Text Button, Primary | 5 |

All on = Dropdown · Secondary · Dropdown · Secondary · Primary.

## Anatomy & spacing
Horizontal auto-layout, primary axis MAX (right), counter axis CENTER, no padding. Gap 20 (Buttons) / 10 (Action Buttons). Button sizes, colours, type and states come from the Button atom unchanged.

## Behaviour
None of its own. Hidden slots take no space (Figma auto-layout; `[hidden]` here). Button states (hover, disabled, loading, dropdown open) are the Button atom's.

## When (not) to use
Figma has no usage text. None added.

## Accessibility
- Each button is a real `<button>` from the kit, so focus and keyboard come from the atom (focus ring added in review on the Button page).
- DOM order = visual order = Figma order (Primary last, rightmost). Tab moves left → right.
- When the buttons act on one object, give the container `role="group"` and an `aria-label` (guidance, not in Figma).
- Contrast: see Button. Action blue #376F99 on white passes 4.5:1.

## Open issues
1. Boolean names do not match what they do: "Show All Buttons" shows one Dropdown in slot 1, not all buttons; "Show Button 4" sits in slot 2, "Show Button 3" in slot 3.
2. No limit on how many buttons: up to 5, two Secondary + two Dropdown side by side. No rule for which one is primary beyond the last slot.
3. Type=Action Buttons is a fixed 5 buttons with no booleans: the count cannot be changed in Figma.
4. Gap 20px is not on the spacing scale (component token `--button-group-gap`).
5. Light theme and Normal size only. The Button atom has Dark and Small; consumers like Filter Dark may need a dark group. Not built.
6. Set has no description and no `.documentation`.

## Industry gaps — not added
- Max 2–3 buttons in a group; move more into a menu button. *(Carbon Button)*
- Don't mix button sizes in one group; one primary per group. *(Carbon Button, Fluent 2 Button)*
- Vertical/stacked group for narrow panels, primary on top. *(Carbon Button)*
- Carbon places primary on the right only in dialogs/wizards and on the left on full pages; V1 puts it on the right always. *(Carbon Button)*

## Not adopted
Nothing else on the page: the set is the only node.

## Sources
Figma `rd3gmPnjhPo1d2GAlNSJOn` node 3153:4370 (read 2026-10-28)
Carbon Button usage — https://carbondesignsystem.com/components/button/usage/
Fluent 2 Button usage — https://fluent2.microsoft.design/components/web/react/core/button/usage
