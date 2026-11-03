# Toast — Pando DS V1

**Status:** Reviewed 2026-10-22 · **Figma:** DS V2 – Atoms › 🟢 Toast › `Toast` (232:58)
**Files:** `toast.css` (styles + component tokens) · `toast.js` (`pdsToast.show`) · `toast.html` (live doc)

## What it is
Toast is a lightweight and easily customizable Alert message that display a status update, reflecting a user or system action. Toasts are meant to be short and brief. *(Figma wording)*

## Variants
`Toast Type` × `Persistent` = 8 variants.

| Type | Fill | Text | Icon glyph | Close × |
|---|---|---|---|---|
| Success | `--accent-green-highlight` #008D5E | white | #008D5E | white |
| Error | `--accent-red-medium` #D26568 | white | #D26568 | white |
| Warning | `--highlight-yellow` #FFCF00 | `--text-dark` #313131 | `--grey-dark` #515151 | #313131 |
| Info | `--highlight-blue-light` #9CD2FF | `--pando-dark` #234357 | #234357 | #313131 |

- **Persistent = Yes**: shows the close ×. **No**: no ×.
- **Show Title / Show Description**: booleans, both default true.
- **Action link**: optional, one only, label 1–2 words (added in review).

## Anatomy & spacing
Width 404 fixed · height hugs · padding 12 / 15 · gap 10 · title↔body 2 · radius `0 0 12px 12px` · icon 24 (white circle + glyph) · close 12 · **no shadow**.
Title `.type-14-semibold` · Body `.type-11-regular`, **max 2 lines**.

## Placement & behaviour
- Placed below the main header and center of the screen — **directly under the header**, no built-in offset (the 50px top padding in Figma is not part of the component).
- Several toasts: **newest on top, max 3 visible, 8px apart**; the oldest is removed.
- **Persistent = No** closes by itself after **4 s**. Hover (or keyboard focus inside) keeps it on screen; the 4 s restart on leave.
- **Persistent = Yes** stays until the close × is pressed.
- **Action link**: navigation only (“take me there”), e.g. **View**. V1 has no undo.

## When not to use
- Critical information, or anything the person must act on to continue → dialog, field error or inline message. *(Fluent 2 Toast; Carbon Notification)*
- As the only place a message exists — it must also be reachable elsewhere. *(WCAG 2.2.1; Carbon)*

## Do / Don’t
- Do: confirm an action in a title plus one short line. *(Carbon)*
- Do: show form errors next to the field, not in a toast. *(Carbon)*
- Do: at most one action, 1–2 word label. *(Carbon, Fluent 2)*
- Don’t: critical must-act messages. *(Fluent 2)*
- Don’t: more than 3 at once. *(Fluent 2 caps at 4; V1 rule is 3)*
- Don’t: make the toast the only way to reach something. *(WCAG 2.2.1)*

## Accessibility
- Success/Info → `role="status"`; Error/Warning → `role="alert"` (WCAG 4.1.3). Set by `toast.js`.
- Close × is a `<button aria-label="Close">`; action is a `<button>`.
- Contrast for the accessibility pass: white on Success 4.22:1, on Error 3.62:1.

## Not adopted (review decisions)
Close × on every toast — Later · Progress toast — not needed · Figma “Behaviour” and “When not to use” text — outdated (copied from Switch) · Example areas, loose instance — skipped.

## Sources
Carbon Notification usage — https://carbondesignsystem.com/components/notification/usage/
Fluent 2 Toast usage — https://fluent2.microsoft.design/components/web/react/core/toast/usage
WCAG 2.2 4.1.3 — https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
WCAG 2.2 2.2.1 — https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html
