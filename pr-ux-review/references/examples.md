# Real reviews and learned preferences

Three PR reviews from November 2026, in `qatipl-freehand/freehand-studio`, all posted in Slack channel `C0ASLJQ4S69` as thread replies to Prashil's PR posts. Use them for tone, length and format, not as content to reuse.

## Preferences learned

- **UX only in the reply.** Technical findings (duplicated helpers, hard-coded status strings, failing CI) go to Charles separately; he decides whether to forward them. Engineers like Uwais review the code side. (PR 3757)
- **Problem first, then a brief hint.** No full solutions. Charles's words: "first state the problem and then give a brief hint". (PR 3806)
- **Keep hints minimal.** He cut "with a divider above it" down to "show Reject invoices in red". When in doubt, the shorter hint. (PR 3806)
- **Don't re-raise what another reviewer already asked.** He removed a "+1 to Jaiganesh" point. Mention such overlaps to Charles in chat only. (PR 3806)
- **Fact-check his memory against the code**, politely. He thought Reject invoices used to be red; it was a plain grey button. (PR 3806)
- **Explain confusing points with a concrete on-screen example**, a small table of "item → what the user sees today", not code. (PR 3806, point 3 took two rounds)
- **Draft, show, wait.** He reviews and edits every draft; post only on an explicit "post" / "sure, post it". (all)
- **Reply in the thread, tag the author**, never broadcast. (all)
- He likes **before/after screenshots** when explaining a PR to himself. (PR 3704)

## PR 3806 — Exceptions opens on my teams' work; bulk bar becomes Decide / Route / Rerun

Raised by others already (not repeated): can't assign to a specific teammate; Release behaves differently for hand-picked vs select-all rows (Jaiganesh). For engineers only: CI failing because `disputable_only` wasn't classified for select-all.

Posted:

> Hey @Prashil, went through it. Grouping into Decide / Route / Rerun cleans up the bar nicely 👌 A few UX points:
>
> 1. **Waive all and Reject invoices now look the same.** Before, Waive all was a green button, so the main action stood out. Now it sits in Decide at the same level as Reject invoices, which is destructive.
>    _Hint:_ show Reject invoices in red.
>
> 2. **Assigning to a team is one click, with no way back.** When no reason is needed, picking a team in Route moves the work straight away, so a mis-click sends it to the wrong team.
>    _Hint:_ an Undo on the success toast.
>
> 3. **Help text in the menus isn't consistent.** Claim/Release show their description under the label, but Re-audit, Reprocess and Reject invoices only show theirs on hover. These are the actions where people most need to know what will happen.
>    _Hint:_ show those descriptions as visible grey text, like Claim/Release.

## PR 3757 — Dockets tab on the invoice Audit tab

Written before the problem-then-hint format was agreed; still a good model for length and plain language. Technical notes (duplicate `listAllInvoiceDisputes`, hard-coded `OPEN`/`ESCALATED`) were kept out and left to Uwais.

Posted:

> @Prashil Dockets view is a big improvement 👍 open dockets first and settled ones folded away makes the open claim easy to find.
>
> A few UX points:
> 1. **Badge:** if an invoice only has queued disputes, the Dockets tab shows no badge, so it looks empty even though there's something to see. Could queued claims still show a count?
> 2. **Totals:** a docket's total can be higher than the summary strip's total, because it also includes withdrawn claims. The two numbers should match.
> 3. **Conversation:** settled dockets have no "Show conversation", so you have to open the full docket to see history. Fine if intended, just confirming.
> 4. **Single docket:** when there's only one docket, could it open expanded by default? Otherwise it's an extra click for the simplest case.

## PR 3704 — Exceptions triage order (largest variance first) and denser exception rows

Charles first used `teach-pr` to understand it (lesson in `freehand-studio/docs/deep-dives/teach/lessons/0001-pr-3704-exceptions-triage-order.html`, with before/after screenshots), then replied in the thread himself with a draft we tightened. Points that were noted but not posted, as examples of what a UX check finds:

- Rows with no price all tie on variance, so their order looks random — they need a tie-break (e.g. by status).
- The Slack summary said one default sort; the code defaulted to another. Wording and behaviour should agree.
- A boilerplate prefix used up the two visible lines of the exception story, hiding the useful part.
