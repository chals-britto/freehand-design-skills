# Component build brief (shared by every builder)

Repo: `/Users/Charles-Pando/Documents/Claude Code/pando-ds-v1` · Figma file key `S21sFFHjfc3XvGDAAYvA49` (named "DS V2 – Atoms", content is V1/Pando).

## The reference implementation — copy its shape exactly
Read these first: `tokens.css`, `components/toast.css`, `components/toast.js`, `components/toast.md`, `components/toast.html`.
Every component you build gets the same four files (JS only if it has behaviour):
- `components/<id>.css` — component tokens on `:root` (`--<id>-*`) that point at `tokens.css` variables, then classes `.pds-<id>`, `.pds-<id>--<variant>`, `.pds-<id>__<part>`. No raw hex in rules; raw hex only inside a component token, with a comment `/* off-token in Figma */` when Figma used a colour not in tokens.css.
- `components/<id>.js` — only if there is behaviour (open/close, toggle, keyboard). Vanilla, no libraries, exposes `window.pds<Name>`.
- `components/<id>.md` — same headings as toast.md: What it is · Variants (table with exact values + token names) · Anatomy & spacing · Behaviour · When (not) to use (only text that exists in Figma, or rules marked "added in review") · Do/Don't (only if Figma has them or the review added them) · Accessibility · Open issues · Not adopted · Sources.
- `components/<id>.html` — same page structure and page CSS as toast.html (copy its `<head>`, page styles, theme switch, header with crumbs back to `../index.html`, Figma link). Sections: Try it (only if interactive) · Variants (render EVERY kept variant/state with the real classes) · Spec (values table; a 2× redline drawing only for simple single-box components) · Usage · Accessibility · **Open issues** (every unresolved Figma flag, contrast < 4.5:1 notes, missing states — as a plain list) · **Industry gaps — not added** (if any: one line each + source link) · Code.
  Add this exactly once, right after `<header>`: `<div class="flagbar"><button type="button" class="btn ghost" data-flag="page">Flag an issue on this page</button></div>` and give each section `data-flag-area`. (Claude wires the button to comments.)

## What to build (decision rules)
1. Build only the **published component sets** and their real states. Loose frames, old explorations, stray instances, and anything marked Skip/Outdated: **not built**; mention under "Not adopted".
2. A review decision file may exist: `review/batch-a/decisions.json` (keyed by component then card id) with the card list in `review/batch-a/<component>.json`. Honour it: `keep`/missing → build as in Figma; `change` → apply the note; `outdated`/`skip` → exclude; `add` → build it, marked "added in review" in the md and page; `later` → list under Not adopted. No decision file for your component → treat everything published as Keep and list industry gaps as "not added".
3. Exact values from Figma (read with read-only `use_figma` / `get_design_context`; trust fills and text content, never layer names — they are stale in this file). Map every colour to a tokens.css variable; every text style to the nearest `.type-*` class (note any line-height difference under Open issues); shadows to `--shadow-1..4`.
4. **Don't invent.** No new colours, copy, states or features. Where an "add" needs a visual Figma doesn't have (e.g. focus), use: focus = `outline: 2px solid var(--pando-blue); outline-offset: 2px`; error message text = `var(--action-red)` with `.type-11-regular`; and say "added in review — not in Figma" next to it. Sample text = Figma's own sample text.
5. Accessibility fixes are deferred: keep Figma colours even when contrast fails; list the failures under Open issues.
6. Spacing: use `--space-*` / `--radius-*` from tokens.css when the value exists; otherwise use the px value in a component token. Report every px value you used so Claude can grow the spacing scale.

## Verify before reporting
Open your `<id>.html` in headless Chrome and confirm no console errors and that every variant renders:
`node` script using `require("/Users/Charles-Pando/Documents/Claude Code/node_modules/playwright")` with `chromium.launch({channel:'chrome'})`, `page.goto('file://...')`, collect `pageerror`. Take one screenshot to your scratch folder and look at it once; fix what's visibly wrong, once.

## Don't touch
`tokens.css`, `index.html`, `skill/`, other components' files, git. Claude integrates and commits.

## Report back (only this)
Files written · variant/state count rendered · new component tokens with off-token hex · px values used (spacing/radius) · top 3 open issues · anything you could not read.
