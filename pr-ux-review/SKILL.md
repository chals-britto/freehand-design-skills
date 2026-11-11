---
name: pr-ux-review
description: Review a freehand-studio pull request from a product designer's point of view: list every UI change in plain English, check it for visual priority, risky actions, consistency, copy and Enhanced Studio fit, then draft short problem-then-hint feedback and post it as a Slack thread reply only after Charles says "post". Use whenever Charles shares a PR link or number and asks to review it, check it, "what changed in the UI", "any UX issues", or to reply to a PR thread in Slack. Do not use for engineering-only reviews (use pr-code-review), for teaching a PR as a lesson (use teach-pr), or for addressing comments on his own PR (use address-pr-review).
argument-hint: "<PR URL or number> [Slack thread link]"
---

# PR UX review

Charles is a product designer. Engineers (usually Prashil) post PRs in Slack and tag him for a UX look. He wants to know **what changed on screen** and **what is wrong with it from a user's point of view**, written so the engineer can find the fix themselves. He does not want code comments, engineering jargon or ready-made solutions in the feedback.

This skill sits on top of three others. Borrow from them; don't copy them:

| Step | Lean on | For |
|---|---|---|
| Understand | `teach-pr` (gather step) | Reading the PR, the diff and the code the PR reuses, never memory |
| Check | `ux-designer-skill`, `freehand-enhanced-ds`, `freehand-ux-writing` | Heuristics, Enhanced Studio decisions, copy rules |
| Process | `pr-code-review` (load, dedupe, draft-then-approve) | Reading existing reviews first; nothing posted without a yes |

## 1. Gather — from the PR and the code

The repo is `qatipl-freehand/freehand-studio`, cloned at `/Users/Charles-Pando/Documents/V2_Code base/freehand-studio`.

```bash
cd "/Users/Charles-Pando/Documents/V2_Code base/freehand-studio"
gh pr view <n> --json number,title,body,author,headRefOid,additions,deletions,files,url
gh pr diff <n> > <scratchpad>/pr<n>.diff
git fetch -q origin main && git fetch -q origin pull/<n>/head:pr-<n>   # stale main inflates the diff
gh pr checks <n>
gh api repos/qatipl-freehand/freehand-studio/pulls/<n>/reviews   --jq '.[]|"\(.user.login) \(.state): \(.body)"'
gh api repos/qatipl-freehand/freehand-studio/pulls/<n>/comments  --jq '.[]|"\(.user.login) \(.path):\(.line) \(.body)"'
```

- The PR description is the best account of intent and usually has a "What could break" list — anything listed there is **known**, not a finding.
- Read the frontend changes in full context with `git show pr-<n>:<path>`, not only the diff hunks: a button that lost `disabled={busy}` or `variant="success"` only shows up in context.
- **Never claim something about the old UI without checking it in the diff or on `origin/main`.** Example from PR 3806: Charles remembered Reject invoices as red; the old code was a plain secondary button. Say so when his memory and the code disagree.
- The PR body often links screenshots on a `screenshots/pr-<n>` branch. Open them when a visual claim matters. If Charles wants real before/after shots, run the branch locally and capture them (as for PR 3704) — ask first, it takes a while.
- If a Slack thread link is given, read it (`slack_read_thread`) to see who posted, who is tagged, and what was already said.

## 2. Show the UI changes

Before judging anything, give Charles a plain list of **every change a user would notice**, grouped by screen or area. Use a before → after table when a control was reshaped (e.g. "8 buttons → 3 menus"). Include changed labels, defaults, empty states, toasts, modals, disabled reasons and help text — quote the new copy exactly. Skip internals unless they change behaviour a user sees.

## 3. Check

Go through the changes with these questions. Each is a lens, not a box to tick — only raise what genuinely hurts a user.

- **Visual priority.** Does the main action still stand out? Did a primary or coloured action get buried in a menu? Is a destructive action (reject, delete, close) marked as such, or now sitting level with safe ones?
- **Reversibility.** Can one click do something hard to undo (move work to another team, reject, waive)? Is there a confirm, a preview or an undo?
- **Consistency.** Do sibling items explain themselves the same way (visible help text vs hover-only `title=` vs nothing)? Same words for the same thing across list, group and detail views? Same pattern as the docket page or other Enhanced Studio screens?
- **Defaults and empty states.** Who lands on an empty page because of a new default? Does the empty state say why and offer the way out?
- **Lost capability.** Did something users could do before disappear (e.g. assigning to a specific teammate)? Is that stated as a decision?
- **Copy.** Sentence case in prototypes (production may still be Title Case), action-led labels, plain words, no dead buttons ("Nothing to claim"). Use `freehand-ux-writing`.
- **Enhanced Studio fit.** Check against `freehand-enhanced-ds` decisions when the PR touches list pages, exceptions, dispute dockets or detail pages.
- **Tooltips** wrap at 320px max, never nowrap.

Then **drop anything already raised** by another reviewer (human or CodeRabbit) or listed in the PR's "What could break". If an existing human comment is a product question Charles would care about, mention it to him as "+1 candidate", don't re-raise it as new.

Keep engineering issues (failing CI, duplicated helpers, hard-coded statuses) **out of the UX feedback**. List them for Charles in a short separate "For engineers" note so he knows, and say who already flagged them.

## 4. Draft — problem first, then a short hint

Charles's format, for every point:

```
N. **<The problem, as a short bold sentence about what the user experiences.>** <One or two sentences of why: what it was before, what happens now.>
   _Hint:_ <a nudge, a few words — not a full design.>
```

Rules:
- State the **problem**; give only a **brief hint**. Never a full solution, mock-up spec, or several options.
- Three or four points at most. If there are more, keep the ones with the most user impact and tell Charles what you dropped.
- Open with one short line of genuine credit for what the PR improves; no long praise.
- Plain words. No file paths, function names, variable names or code in the Slack reply.
- Address the PR author by their Slack mention.

Show Charles, in chat:
1. The UI changes list (step 2).
2. The draft Slack reply, in a quote block, exactly as it will be posted.
3. "For engineers (not in the reply)": CI status and code issues, one line each, noting who already raised them.
4. Anything you checked and chose not to raise, one line, so he can add it back.

Then stop and wait. Expect him to edit: remove points, change hints, change wording. Apply edits exactly and show the new draft again.

When he asks "I didn't understand point N", explain it plainly with a concrete before/after example of what the user sees — not code.

## 5. Post — only after Charles says "post"

- Look up the author's Slack ID with `slack_search_users` (Prashil is `U0AV1596ZEW`) and write `<@ID>`.
- Reply **in the thread** Charles gave (`slack_send_message` with `channel_id` and `thread_ts` = the parent ts with a dot, e.g. `p1794415526825929` → `1794415526.825929`). Never broadcast to the channel unless he asks.
- Post the approved text verbatim.
- Report back with the message link, and offer to re-check the PR when the author replies or pushes.

Never post GitHub comments from this skill. If Charles wants code notes on GitHub, hand over to `pr-code-review`.

## After the review

- If Charles taught you a new preference (format, tone, a rule), add it to `references/examples.md` under "Preferences learned" so the next review starts from it.
- When re-checking after the author pushes, compare the new head against each posted point and report: fixed / partly / not yet, with what you saw.

See `references/examples.md` for three real reviews (PRs 3704, 3757, 3806) showing the tone and format Charles approved.
