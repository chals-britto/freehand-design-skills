---
name: freehand-enhanced-ds
description: Freehand V1 Enhanced Studio design system covering tokens, components (with ready-to-copy HTML/CSS), list and detail page patterns, the dispute docket pattern, content rules and the decision log behind them. Use this whenever building, changing or reviewing any Freehand V1 Enhanced Studio page or prototype, including invoices, exceptions, dispute dockets, contracts, payments, GL coding, or a new list or detail page "like Enhanced Studio", even if the request only says "V1", "enhanced", "Freehand list page", "match the studio", or shares a screenshot of these screens. Also use it to check a design or PR against the agreed Enhanced Studio decisions. Do not use it for the V2 / Studio orange redesign or Pando DS V1 (FAP) Figma builds.
---

# Freehand V1 Enhanced Studio design system

This skill holds what was agreed while building the Enhanced Studio prototype (https://claude.ai/artifact/3nHsfS72fAKxGfLYznm1Hm) with Charles, Murugesh and Utsav. It's checked against the production repo `qatipl-freehand/freehand-studio`.

The point is that every new page looks and behaves like the pages already approved, without re-deciding things that are already settled.

## How to use it

1. **Read `DESIGN.md`** before writing any markup. It has the foundations, the 19 components, the page patterns, the content and behaviour rules, and the decision log.
2. **Build from `snippets/`.** The skill is self-contained; it doesn't depend on any other repo.
   - `tokens.css` for every colour, size and radius
   - `components.html` for the markup and CSS of all 19 components (open it in a browser to see them)
   - `behaviours.js` for any list inside a scrolling detail page

   Copying beats re-creating: re-created components drift in small ways (a 32px dropdown instead of 36px, a blue link), and those are exactly the things reviewers have already pushed back on.
3. **Compare with `screens/`** at 1440×900 before calling something done.
4. **Check production when something isn't covered.** Use `reference/production-freehand-studio.md`, or the repo itself on `origin/main`, so you don't invent a component, column or status production doesn't have. If production doesn't have it either, ask Charles.

## Rules that are easy to get wrong

These came from review comments. Each has a reason, so apply the reason in cases not listed.

- **Sentence case everywhere:** "Dispute dockets", "Rows per page", "Rate overcharge". Proper nouns and acronyms keep their capitals. Production still uses Title Case; that's a known gap, so don't copy it.
- **No AI wording:**
  - Say "Suggested", "suggested action" or "N to review", never "agent", "AI" or "recommend(ation)".
  - Freehand Audit gets no "Agent" or "Automated" tag.
  - This is about descriptive copy. Product and nav names stay as they are ("Agents", "Ask Freehand", "Freehand Audit").
  - No em dashes or semicolons in sentences. Write short, plain sentences that say what happens.
- **Names, not codes:** "Rate overcharge", not `RATE_OVERCHARGE`. Drop rule codes in brackets.
- **Fixed terms:**
  - Dispute dockets (pages, nav, breadcrumb)
  - Disputes (the lines inside a docket)
  - Open · Escalated · Partly resolved · Resolved. "Settled" is not used; Utsav still has to confirm "Resolved".
- **Status filters on list pages are pills (28px), not tabs.** Tabs only switch views of one record.
- **Links to other pages:** dark grey with a grey underline and a new-tab icon, opening a filtered list in a new tab. Never blue, never the icon alone.
- **Money:** disputed or held amounts in red; resolved amounts in green only when above 0; every other amount neutral. Two decimals, with the currency code in small grey after.
- **Rows per page:** 20 on list pages, 10 for lists inside a detail page.
- **Don't stub components.** The sidebar, toolbar and column picker are in the snippets. Anything else is in `reference/enhanced-studio-v103.html`, the full approved prototype (DESIGN.md §10 lists the functions). A columns button that doesn't open the picker counts as broken.
- **Same component, same look.** The footer pager, sort menu, dropdown filters and badges are identical on every page. Don't make a "slightly different" pager for one screen.
- **Ask Freehand:** bottom-right, orange-only rotating ring, and it moves up when a footer pager appears.
- **No page jumps.** Anything that changes layout (folded totals, pinned bars, minimum heights) must survive a re-render. A filter or page change made while a bar is pinned keeps the bar in place.
- **Measure, don't hard-code.** Offsets and spaces that depend on screen height are measured from real elements, and re-measured on resize. Check at 1280×720, 1440×900 and 1920×1080.
- **Tooltips wrap at 320px.** Every truncated value gets a tooltip.

## Where production and Enhanced differ

`DESIGN.md` §9 lists 24 known differences, such as Open status red vs amber, purple exception badges, the toast position and table padding.

- Follow Enhanced Studio by default.
- If your work touches one of those rows, tell Charles which way you went, so the open decisions get settled instead of drifting.

## Working with Charles

- **Multi-point requests:** restate your understanding and plan, and wait for his OK before editing a shared artifact.
- **"What do other products do?":** run a real web search and cite it; don't answer from memory.
- **Where things live:**
  - V1 work goes to the Enhanced Studio artifact.
  - The Seven Skins artifact is a frozen "before" comparison. Don't change it unless he asks.
- **Keep this skill current.** When a new decision is made, add a row to the decision log in `DESIGN.md` §8. If it changes a value, update `tokens.css` and `components.html` too.
