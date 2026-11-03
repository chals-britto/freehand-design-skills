# Freehand Studio — design tokens and component specs (extracted from code)

Source: `qatipl-freehand/freehand-studio`, read only from `origin/main` at `00e2705d7` (2026-11-03). Paths below are relative to the repo root.

Stack: Next 16.4.1, React 19.2.4, **Tailwind v4.2** (`@import 'tailwindcss'` + `@theme inline`; **there is no tailwind.config file**), `tw-animate-css`, Radix (dialog, dropdown-menu, popover, tabs, tooltip, separator, slot), Headless UI 2.2 (Switch, Popover in MultiFilterSelect, Dialog in ModalShell), `class-variance-authority`, `tailwind-merge` (via `cn()`), `lucide-react` ^1.47, `recharts` ^3.8.

Light theme only (stated intentional in `frontend/src/components/ui/CLAUDE.md`).

Class constants live in `frontend/src/lib/styles.ts` — the atoms in `components/ui` are thin wrappers over them.

---

## 1. Colour tokens — `frontend/src/app/globals.css` (`:root` + `@theme inline`)

### 1.1 Base / brand

| Token | Value | Tailwind utility |
|---|---|---|
| `--background` | `#fafafa` | `bg-background` (body bg) |
| `--foreground` | `#020617` | `text-foreground` (body text) |
| `--primary` | `#fe6301` | `bg-primary` |
| `--primary-foreground` | `#ffffff` | |
| `--destructive` | `#d4183d` | `bg-destructive` |
| `--destructive-foreground` | `#ffffff` | |
| `--accent` | `#e9ebef` | `bg-accent` (ProgressBar track) |
| `--card` | `#ffffff` | `bg-card` |
| `--input-background` | `#f3f3f5` | `bg-input-background` / `bg-input-bg` |

### 1.2 Primary / Freehand Orange (brand anchored at 600)

| Step | Hex |
|---|---|
| 50 | `#fff7ed` |
| 100 | `#ffedd5` |
| 200 | `#fed7aa` |
| 300 | `#fdba74` |
| 400 | `#fb923c` |
| 500 | `#ff7224` |
| **600** | **`#fe6301`** (brand) |
| 700 | `#d84e00` |
| 800 | `#b03c00` |
| 900 | `#7c2900` |

### 1.3 Neutral (= Tailwind Slate; comment says "replaces Walnut")

| Step | Hex |
|---|---|
| 50 | `#f8fafc` |
| 100 | `#f1f5f9` |
| 200 | `#e2e8f0` |
| 300 | `#cbd5e1` |
| 400 | `#94a3b8` |
| 500 | `#64748b` |
| 600 | `#475569` |
| 700 | `#334155` |
| 800 | `#1e293b` |
| 900 | `#0f172a` |
| 950 | `#020617` |

### 1.4 Secondary palettes

| Step | Moss / Botanical | Pink / Gum Berry | Teal / Sea Glass | Thistle / Twilberry |
|---|---|---|---|---|
| 50 | `#f7f9e8` | `#fdf2f8` | `#eefbf9` | `#f5f0fa` |
| 100 | `#ecf0c4` | `#fce0f0` | `#d2f5ef` | `#e8ddf3` |
| 200 | `#dbe491` | `#fbb8de` | `#a6eade` | `#d3bee8` |
| 300 | `#c6d45c` | `#f986c8` | `#72dccb` | `#b896d9` |
| 400 | `#a8bc2e` | `#f553af` | `#3ecab5` | `#9c6cc7` |
| 500 | `#8a9e18` | `#e41d8e` | `#22a896` | `#7f46b0` |
| 600 | `#6e7f12` | `#c41074` | `#1a8778` | `#663892` |
| 700 | `#546110` | `#9e0d5e` | `#15695d` | `#4e2b72` |
| 800 | `#3c450e` | `#710a44` | `#104c44` | `#381f53` |
| 900 | `#262c09` | `#48062b` | `#0a302b` | `#221335` |

Note: `pink-*` and `teal-*` override Tailwind's default pink/teal. Other Tailwind default palettes (red, amber, blue, …) are still technically available but the lint/CLAUDE.md steers to tokens.

### 1.5 Semantic

| Role | Base | `-light` (tint bg) | `-strong` (AA text on -light) | Other |
|---|---|---|---|---|
| success | `#16a34a` | `#dcfce7` | `#166534` (6.5:1) | |
| warning | `#ca8a04` | `#fef9c3` | `#854d0e` (6.4:1) | |
| caution (amber notice for blocked/switched-off) | — | `#fffbeb` | `#92400e` (7.1:1) | `-border` `#fde68a` |
| danger | `#d4183d` (= `--destructive`) | `#fee2e2` | `#a3122f` (6.4:1) | |
| info | `#2563eb` | `#dbeafe` | `#1d4ed8` (5.5:1) | |

### 1.6 Surfaces, text, borders, controls

| Token | Resolves to | Hex |
|---|---|---|
| `surface-primary` | #fff | `#ffffff` |
| `surface-secondary` | neutral-50 | `#f8fafc` |
| `surface-elevated` | #fff | `#ffffff` |
| `surface-info-soft` / `-hover` | — | `#f0f9ff` / `#e0f2fe` |
| `surface-inverse` | neutral-900 | `#0f172a` (tooltip bg) |
| `overlay` | neutral-950 | `#020617` (used at /40 or /50) |
| `text-primary` | neutral-900 | `#0f172a` |
| `text-muted` | neutral-600 | `#475569` |
| `text-subtle` | neutral-500 | `#64748b` |
| `text-inverse` | #fff | `#ffffff` |
| `border` | neutral-200 | `#e2e8f0` |
| `border-strong` | neutral-300 | `#cbd5e1` |
| `muted` (hover/table-header bg) | neutral-100 | `#f1f5f9` |
| `muted-foreground` | neutral-500 | `#64748b` |
| `input-bg` | `--input-background` | `#f3f3f5` |
| `input-text` | neutral-900 | `#0f172a` |
| `input-placeholder` | neutral-400 | `#94a3b8` |
| `ring` / `ring-strong` | primary | `#fe6301` |
| `ring-offset` | surface-primary | `#ffffff` |
| `chart-edge` | moss-300 | `#c6d45c` |
| `chart-label` | neutral-500 | `#64748b` |
| `shell-header` (legacy) | neutral-900 | `#0f172a` |
| `shell-sidebar` (legacy) | neutral-950 | `#020617` |

Gen-UI shell (current light sidebar): `shell-canvas` `#f1f5f9`, `sidebar` `#f8fafc`, `sidebar-foreground` `#334155`, `sidebar-border` `#e2e8f0`, `sidebar-accent` `#f1f5f9`, `sidebar-accent-foreground` `#1e293b`, `shell-card-border` `#e2e8f0`, `shell-foreground` `#0f172a`, `shell-muted-foreground` `#64748b`, `shell-secondary` `#f1f5f9`, `shell-primary` `#0f172a`, `shell-primary-foreground` `#f8fafc`, `shell-input-border` `#e2e8f0`.

Note the two greys: page `--background` `#fafafa` (zinc-ish) vs surfaces/neutral (slate). Inputs fill `#f3f3f5`.

---

## 2. Typography

| Item | Value | Source |
|---|---|---|
| Sans | **Inter** via `next/font/google` → `--font-inter` → `--font-sans`; body fallback `system-ui, -apple-system, sans-serif` | `frontend/src/app/layout.tsx`, `globals.css` |
| Mono | **Geist Mono** → `--font-geist-mono` → `--font-mono` | same |
| Body | `antialiased`; no explicit base size set → browser 16px; UI text is overwhelmingly `text-sm`/`text-xs` | |
| Custom steps | `text-3xs` 10px / 14px LH; `text-2xs` 11px / 16px LH | `globals.css @theme` |
| Tailwind defaults in use | xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36 | Tailwind v4 defaults |

Lint bans arbitrary `text-[Npx]` in new code (baselined legacy remain).

Usage counts across `frontend/src/**/*.tsx` on main (rough `git grep` token counts):

| Class | Count | | Class | Count |
|---|---|---|---|---|
| `text-xs` | 3018 | | `font-medium` | 1856 |
| `text-sm` | 2519 | | `font-semibold` | 1230 |
| `text-[11px]` (legacy) | 323 | | `font-normal` | 134 |
| `text-[10px]` (legacy) | 230 | | `font-bold` | 103 |
| `text-lg` | 175 | | | |
| `text-base` | 101 | | | |
| `text-2xs` | 97 | | | |
| `text-xl` | 83 | | | |
| `text-2xl` | 40 | | | |
| `text-3xs` | 13 | | | |
| `text-3xl` | 7 | | | |

Common roles:

| Role | Classes | Source |
|---|---|---|
| Page title | `text-2xl font-bold text-neutral-900` (24/32, 700, `#0f172a`) | `components/shared/PageHeader.tsx` |
| Page subtitle | `text-sm text-muted-foreground mt-1` | PageHeader |
| Sheet title | `text-lg font-semibold text-foreground` | `ui/sheet.tsx` |
| Empty-state title | `text-lg font-medium text-neutral-900` | `shared/EmptyState.tsx` |
| Table header | `text-[11px] font-semibold uppercase tracking-wide text-neutral-600` (TABLE_HEADER_CLASS) or `text-xs font-medium text-muted-foreground` (ListTable) | see §4 |
| Field label (filters) | `text-xs font-medium text-muted-foreground` | FilterBar |
| Numbers / codes | `font-mono` (Geist Mono), often `tabular-nums` | DocketTable, VarianceBadge |

---

## 3. Radius, shadows, motion, spacing

### Radius (`globals.css`)

| Token | Value | Tailwind | Typical use |
|---|---|---|---|
| `--radius-sm` | 6px | `rounded-sm` | |
| `--radius-md` | 8px | `rounded-md` | menu items, tooltip, multiselect trigger, variance chip |
| `--radius` / `--radius-lg` | 10px | `rounded-lg` | buttons, inputs, selects, dropdown menu, toast, filter panels |
| `--radius-xl` | 14px | `rounded-xl` | cards, popover, ListTable frame |
| `--radius-2xl` | 16px | `rounded-2xl` | modal panel |
| `--radius-full` | 9999px | `rounded-full` | badges, switch, count pills |

Note: Tailwind v4 `rounded` (no suffix) = 4px (checkbox).

Usage counts: `rounded-lg` 578, `rounded-md` 337, `rounded-xl` 334, `rounded-full` 300.

### Shadows

| Token | Value |
|---|---|
| `--shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / .05)` |
| `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)` |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)` |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)` |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1)` |
| `--shadow-nav-icon` | `inset 0 1px 0 rgb(255 255 255/.9), 0 1px 2px primary-700@8%, 0 2px 6px -2px primary-700@12%` |
| `--shadow-nav-icon-active` | `inset 0 1px 0 rgb(255 255 255/.8), 0 1px 2px primary-700@14%, 0 3px 8px -2px primary-700@22%` |

Usage: popover/toast/filter panels `shadow-lg`; dropdown-menu `shadow-md`; sheet and modal `shadow-xl`; switch thumb `shadow-sm`; cards are flat (border only), `hover:shadow-md` when interactive.

### Motion

`--duration-fast` 100ms, `--duration-normal` 200ms, `--duration-slow` 300ms; `--easing-default` `cubic-bezier(.4,0,.2,1)`, `--easing-in` `(.4,0,1,1)`, `--easing-out` `(0,0,.2,1)`. Keyframes: `exception-flash` (1.95s primary-100 bg + 2px primary-300 ring fade), `progress-indeterminate` 1.4s, `skeleton-wave` 1.4s (neutral-100 → 200 → 100 gradient), `view-swipe-in-left/right` 220ms `cubic-bezier(.16,1,.3,1)`. All honour `prefers-reduced-motion`.

### Spacing

No custom spacing tokens — Tailwind default 4px scale. Conventions: card `p-6`; table cells `px-4 py-3`; filter bar `gap-3`; popover/menu `p-1` with item `px-2 py-1.5`; modal outer `p-4`.

---

## 4. Components

### 4.1 Badge — `components/ui/Badge.tsx` + `lib/styles.ts`

Base (`BADGE_BASE`): `inline-flex items-center gap-1 rounded-full text-xs font-medium whitespace-nowrap` → full pill, 12px, weight 500, **borderless** (the `border-*` classes in the colour map are inert — no border width is set). Props: `color` (default `gray`), `size` (default `md`), `mono` (adds `font-mono`).

| Size | Classes | Resolved |
|---|---|---|
| `xs` | `px-1.5 py-0 text-[10px]` | 6px h-pad, 0 v-pad, 10px text (~16px tall) |
| `sm` | `px-2 py-0.5` | 8px / 2px, 12px text → 20px tall |
| `md` (default) | `px-2.5 py-1` | 10px / 4px, 12px text → 24px tall |

| BadgeColor | Classes | Background | Text | (inert border) |
|---|---|---|---|---|
| `green` | `bg-success-light text-success-strong` | `#dcfce7` | `#166534` | success/20 |
| `red` | `bg-danger-light text-danger-strong` | `#fee2e2` | `#a3122f` | danger/20 |
| `red-strong` | same + `font-semibold` | `#fee2e2` | `#a3122f` (600 wt) | danger/35 |
| `yellow` | `bg-warning-light text-warning-strong` | `#fef9c3` | `#854d0e` | warning/20 |
| `amber` | (identical to yellow) | `#fef9c3` | `#854d0e` | warning/20 |
| `orange` | `bg-primary-100 text-primary-800` | `#ffedd5` | `#b03c00` | primary-200 |
| `blue` | `bg-info-light text-info-strong` | `#dbeafe` | `#1d4ed8` | info/20 |
| `indigo` | (identical to blue) | `#dbeafe` | `#1d4ed8` | info/20 |
| `purple` | `bg-thistle-100 text-thistle-700` | `#e8ddf3` | `#4e2b72` | thistle-200 |
| `teal` | `bg-teal-100 text-teal-700` | `#d2f5ef` | `#15695d` | teal-200 |
| `pink` | `bg-pink-100 text-pink-700` | `#fce0f0` | `#9e0d5e` | pink-200 |
| `gray` | `bg-neutral-100 text-neutral-700` | `#f1f5f9` | `#334155` | neutral-200 |
| `gray-muted` | `bg-neutral-100 text-neutral-600` | `#f1f5f9` | `#475569` | neutral-200 |
| `dark` | `bg-neutral-800 text-white` | `#1e293b` | `#ffffff` | |
| `red-solid` | `bg-danger text-white` | `#d4183d` | `#ffffff` | |
| `orange-solid` | `bg-primary-600 text-white` | `#fe6301` | `#ffffff` | |
| `green-solid` | `bg-success text-white` | `#16a34a` | `#ffffff` | |
| `blue-solid` | `bg-info text-white` | `#2563eb` | `#ffffff` | |
| `purple-solid` | `bg-thistle-600 text-white` | `#663892` | `#ffffff` | |

Rules (ui/CLAUDE.md): one status pill per item; Title Case labels; codes/identifiers (SCAC, ref #) are plain muted text, not badges; status→colour maps live in domain wrappers only.

### 4.2 Domain badges — `components/shared/StatusBadges.tsx`

Unknown values fall back to `gray` and `humanizeLabel(value)` unless noted.

**Invoice status** (`INVOICE_STATUS_COLORS`, label = humanized; PROCESSING adds `animate-pulse`)

| Value | Colour |
|---|---|
| PENDING | gray |
| PROCESSING | blue (pulsing) |
| COMPLETED, ACCEPTED | green |
| FAILED | red |
| DUPLICATE | yellow |
| NEEDS_REVIEW | purple |
| REVIEWED | indigo (= blue) |
| RECEIVED | orange |

**Invoice lifecycle** (`INVOICE_LIFECYCLE_STATUS_COLORS/LABELS`)

| Value | Label | Colour |
|---|---|---|
| RECEIVED | Received | blue |
| EXTRACTION_HELD | Extraction Held | yellow |
| HELD | Held | orange |
| APPROVED | Approved | green |
| REJECTED | Rejected | red |
| VOIDED | Voided | gray-muted |

**Invoice payment status** (`PAYMENT_STATUS_COLORS/LABELS`, `InvoicePaymentStatusBadge`). Hidden for `''`/UNPAID/PENDING and for invoices that are REJECTED/VOIDED; pre-approval with `glStatus=EXCEPTION` shows red "GL Exception". PROCESSING pulses.

| Value | Label | Colour |
|---|---|---|
| EXCEPTION | GL Exception | red |
| READY_TO_PAY | Ready to Pay | blue |
| PROCESSING | Payfile Processing | blue (pulsing) |
| POSTED | Submitted for Payment | indigo (= blue) |
| PAID | Paid | green |
| PARTIALLY_PAID | Partially Paid | yellow |
| PAYMENT_REJECTED | Payment Rejected | red |

ERP labels (`ERP_STATUS_LABELS`, text only): NO_ERP_RESPONSE "No ERP response", AWAITING_ERP "Sent, awaiting ERP", ACCEPTED_BY_ERP "Accepted by ERP", REJECTED_BY_ERP "Rejected by ERP".

**Payment status (separate component)** — `components/shared/PaymentStatusBadge.tsx`, labels from `lib/paymentStatus.ts` (sentence case); null → muted "—".

| Value | Label | Colour |
|---|---|---|
| PENDING_APPROVALS | Pending approvals | gray |
| WAITING_FOR_SUBMISSION | Waiting for submission | yellow |
| SUBMITTED_FOR_PAYMENT | Submitted for payment | blue |
| PAID | Paid | green |
| PARTIALLY_PAID | Partially paid | teal |
| PAYMENT_REJECTED | Payment rejected | red |

**GL status** (`GL_STATUS_COLORS/LABELS`; null → `text-neutral-400` "—"; unknown → raw value)

| Value | Label | Colour |
|---|---|---|
| EXCEPTION | Needs review | red |
| OVERRIDDEN | Overridden | orange |
| COMPUTED | Resolved | green |

**Dispute status** (`DISPUTE_STATUS_COLORS/LABELS`)

| Value | Label | Colour |
|---|---|---|
| PENDING | Queued | blue |
| OPEN | Open | red |
| ESCALATED | Escalated | orange |
| RESOLVED | Resolved | green |
| CLOSED | Closed | gray |

**Dispute resolution** (`disputeResolutionLabel` / `disputeResolutionColor`)

| Value | Label | Colour |
|---|---|---|
| SYSTEM_CHARGE_ACCEPTED | Accepted audited amount | green |
| VENDOR_CHARGE_ACCEPTED | Accepted as billed | gray |
| INVOICE_RETURNED | Invoice returned | green |
| PARTIAL_SETTLEMENT, NEGOTIATED | Partial settlement | yellow |
| COVERED | Covered | teal |
| other | humanized | gray |

`disputeClosedByPartyLabel`: CUSTOMER → "Shipper", VENDOR → "Vendor", SYSTEM → "System".

**Dispute tracking state** (`DISPUTE_TRACKING_STATE_*`; null → renders nothing)

| Value | Label | Colour |
|---|---|---|
| AWAITING_VENDOR | Awaiting Vendor | yellow |
| VENDOR_RESPONDED | Vendor Responded | blue |
| AWAITING_CUSTOMER | Awaiting Customer | purple |
| RECOMMEND_SYSTEM_CHARGE | Recommend System Charge | orange |
| RECOMMEND_INVOICE_CHARGE | Recommend Invoice Charge | teal |
| ESCALATED | Escalated | red |

**Docket status** (`DOCKET_STATUS_COLORS/LABELS`)

| Value | Label | Colour |
|---|---|---|
| OPEN | Open | yellow |
| PARTIALLY_RESOLVED | Partial | blue |
| FULLY_RESOLVED | Resolved | green |

**Fulfillment status** (`FULFILLMENT_STATUS_COLORS`, label humanized)

| Value | Colour |
|---|---|
| PENDING | yellow |
| RECEIVED | green |
| NOT_NEEDED | gray |

**Exception resolution status** (`RESOLUTION_STATUS_*`): RESOLVED green; WAIVED gray-muted "Waived"; DISPUTED orange; OPEN red; SUPERSEDED gray-muted "Outdated".

**Audit match status**: MATCHED green; NO_MATCH red; MULTI_MATCH yellow; CONFLICT yellow.

**Costing** — group pills: COSTED green "Costed", IN_PROCESS blue "In process", FAILED red "Failed", NOT_COSTED gray "Not costed". Outcomes: COSTED green; MISSING_DATA yellow "Missing Data"; NO_VENDOR yellow "Needs a decision"; NO_CONTRACT orange "No contract"; NO_RATE orange "No Rate"; ERROR gray.

Other maps in the same file (not expanded here): sheet class, job status, version status, linkage, payfile run/spec/version/step/delivery, report delivery/compilation, resolver kind, GL routing, charge category, calculation method, vendor status, vendor invoice state, PP ingestion, costing state/test verdict, remittance outcome, service level (POOL teal, DIRECT gray), user status, validation, EDI mapping, route target, source channel, vendor role (VENDOR_ADMIN orange, VENDOR_MEMBER gray), spot quote, activity (CREATED teal, EDITED gray, DELETED red, ACTIVATED/ENABLED green, DEACTIVATED/DISABLED purple, DRAFTED orange, TESTED blue, …).

**VarianceBadge** (not a Badge; `StatusBadges.tsx`): `inline-flex min-w-[112px] flex-col rounded-md border px-2.5 py-1`; top line `text-[10px] font-semibold uppercase tracking-wide`, amount `font-mono text-sm font-semibold tabular-nums`.

| Case | Label | Bg | Text | Border |
|---|---|---|---|---|
| > 0 | Overcharge (with "+") | `#fee2e2` | `#a3122f` | danger @25% |
| < 0 | Undercharge | `#dcfce7` | `#166534` | success @25% |
| 0 | No variance | `#f8fafc` | `#64748b` | `#e2e8f0` |
| null/invalid | "—" in `#94a3b8` | | | |

### 4.3 AuditBadges — `components/shared/AuditBadges.tsx`

**Audit result** (`AUDIT_RESULT_COLORS`; null → gray-muted "Not audited")

| Value | Label | Colour |
|---|---|---|
| AUTO_APPROVED | Auto Approved | green |
| PASS | Pass | green |
| ISSUE_FOUND | Issue Found | red |
| REJECTED, REJECT | Rejected / Reject | red-strong |
| UNMATCHED | Unmatched | orange |
| INCOMPLETE | Incomplete | yellow |
| ESCALATE | **Needs Review** | orange |
| WARN | Warn | yellow |
| ERROR | Error | gray |

**ExceptionCodeBadge**: always `mono` (Geist Mono), default md size. `INCOTERMS_CONFLICT` → **orange** (label "Wrong Party Billed"); **every other code → purple** (`#e8ddf3` / `#4e2b72`). Labels from `DISPLAY_LABELS`, else humanized; labour anomaly codes render as `"<code> <description>"`.

Code labels: NO_CONTRACT_MATCH "No Contract Match", CROSS_DOC_MISMATCH "Cross-Doc Mismatch", QUANTITY_MISMATCH "Quantity Mismatch", SHIPMENT_CHARGE_EXCEEDED "Cross-Bill Overcharge", CREDIT_TARGET_REJECTED "Credit of Rejected Invoice", CREDIT_TARGET_UNRESOLVED "Credit Target Unresolved", CREDIT_CURRENCY_MISMATCH "Credit Currency Mismatch", CREDIT_CHARGE_NOT_ON_TARGET "Credit Charge Not on Target", CREDIT_EXCEEDS_ORIGINAL "Credit Exceeds Original", CREDIT_DUPLICATE "Duplicate Credit", PRIOR_BILL_VOIDED "Previously Voided", BILL_RELATIONSHIP_CONFLICT "Related Bill Read Differently", DOCUMENT_ISSUE "Document Issue", UNPRICED_ACCEPTED "Passed by Invoice Tolerance".

Other AuditBadges maps: Verdict (PASS/RESOLVED green, FAIL red, WARN yellow, SKIP(PED) gray-muted); Failure action (ESCALATE orange "Flag for review", DISPUTE yellow "Initiate dispute", REJECT red "Reject without paying"); Rule status (DRAFT yellow, ACTIVE green, INACTIVE gray-muted); Rule category (NON_RATE blue "Check", GUIDANCE/COSTING_GUIDANCE purple "Guidance", RATE teal "Rate"); micro-tags at `xs`: Auto-Carried teal, Resurfaced amber, Spot Quote blue; SMC3 failure codes red/amber/blue (mono, sm).

**Other shared badges**: `ShipmentBadges.tsx` bill type ORIGINAL gray, REVISED orange, AD_BILL teal "Ad-bill", REVERSAL green, DUPLICATE red; duplicate verdict DUPLICATE red, CREDIT green "Reversal", CORRECTED blue. `InvoiceTypeBadge.tsx` CREDIT_NOTE blue "Credit Note", DEBIT_NOTE amber "Debit Note".

### 4.4 Button — `components/ui/Button.tsx`, `lib/styles.ts`

Base: `inline-flex items-center justify-center font-medium rounded-lg transition cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-surface-primary disabled:opacity-50 disabled:cursor-not-allowed` → 10px radius, weight 500, keyboard-only focus ring. Defaults `variant="primary"`, `size="md"`. `loading` shows a 16px spinning SVG plus the label and disables the button.

| Variant | Rest | Hover | Focus ring |
|---|---|---|---|
| `primary` | bg `#fe6301`, text white | bg `#d84e00` | `#fe6301` |
| `secondary` | bg `#ffffff`, text `#334155`, 1px border `#cbd5e1` | bg `#f1f5f9` | `#94a3b8` |
| `success` | bg `#16a34a`, white | bg success/90 | success |
| `danger` | bg `#d4183d`, white | danger/90 | danger |
| `destructive` | bg `#d4183d`, white | /90 | destructive |
| `outline` | transparent, text `#020617`, border `#e2e8f0` | bg `#f1f5f9` | `#fe6301` |
| `link` | text `#fe6301`, `underline-offset-4` | underline | ring |
| `ghost` | text `#64748b`, no bg | bg `#f1f5f9` | `#94a3b8` |
| `thistle` | bg `#663892`, white | `#4e2b72` | `#9c6cc7` |
| `shell` | bg `#0f172a`, text `#f8fafc` | /90 | `#0f172a` |
| `shellOutline` | bg white, text `#0f172a`, border `#e2e8f0` | bg `#f1f5f9` | ring |

| Size | Classes | Computed height (no border / with 1px border) |
|---|---|---|
| `compact` | `gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs` | 24px / 26px |
| `sm` | `px-3 py-1.5 text-sm` | 32px / 34px |
| `md` | `px-4 py-2 text-sm` | 36px / 38px |
| `lg` | `px-5 py-2.5 text-base` | 44px / 46px |
| `icon` | `h-9 w-9 p-0 text-sm` | 36 × 36 fixed |

Heights are computed from padding + line-height; the code doesn't set them (only `icon` does).

### 4.5 Inputs — `ui/Input.tsx`, `ui/Textarea.tsx`, `ui/Select.tsx`, `ui/SearchInput.tsx`, `ui/ClearableSelect.tsx`

| Atom | Classes | Resolved |
|---|---|---|
| Input (`INPUT_CLASS`) | `h-9 w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-input-text focus:ring-2 focus:ring-ring focus:border-ring-strong transition` | 36px tall, 10px radius, bg `#f3f3f5`, 1px border `#e2e8f0`, text `#0f172a` 14px, placeholder `#94a3b8`; focus: 2px ring + border `#fe6301` |
| Input `error` | `border-destructive focus:ring-destructive` | `#d4183d` |
| Textarea | same as Input minus `h-9`, plus `resize-y` | |
| Select (`SELECT_CLASS` + `.freehand-select`) | `h-9 px-3 border rounded-lg text-sm bg-input-bg`, `appearance:none`, `padding-right:2.25rem`, chevron SVG 16px stroke `#64748b` at right 12px | 36px |
| SearchInput | Input with `pl-8`; Lucide Search 16px at `left-2.5`, `text-muted-foreground` | |
| ClearableSelect | Select + 16px round clear button `bg-neutral-200 hover:bg-neutral-300` at `right-7`, 10px × icon `#475569`; `pr-12` when active | |
| Checkbox | 16px, `rounded` (4px), border `#e2e8f0`, bg `#f3f3f5`; checked/indeterminate bg+border `#fe6301` with white tick / dash SVG | `ui/Checkbox.tsx` |
| RadioGroup `cards` | `rounded-lg border px-4 py-3`; selected `border-primary-500 bg-primary-50` (`#ff7224` / `#fff7ed`) | `ui/RadioGroup.tsx` |

### 4.6 Filter controls

**FilterDropdown** (single-select; `ui/FilterDropdown.tsx`, used by `FilterBar`/`buildSelectFilter`): trigger = `SELECT_CLASS` (h-9, `bg-input-bg` `#f3f3f5`, `rounded-lg`) + `flex justify-between gap-2`. Placeholder `text-muted-foreground`; when a value is active and closed: `border-primary-400` (`#fb923c`); open: `ring-2 ring-ring border-ring-strong`. Right side: clear × (12px, hover `bg-neutral-200`) and 14px chevron that rotates 180°. Panel: Radix Popover (`rounded-xl border shadow-lg`, white) `py-1`, min width `max(trigger, 224px)`; options `px-3 py-1.5 text-sm hover:bg-neutral-100`, selected `font-medium`; list `max-h-56`; empty "No results".

**MultiFilterSelect** (`shared/MultiFilterSelect.tsx`, via `buildMultiSelectFilter`):

| Part | Classes | Resolved |
|---|---|---|
| Trigger (idle) | `inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-surface-primary text-sm text-neutral-700 hover:bg-muted` | **32px**, 8px radius, white bg, border `#e2e8f0`, text `#334155`, hover `#f1f5f9` |
| Trigger (has selection) | `border-primary-300 bg-primary-50 text-primary-700 hover:bg-primary-100` | border `#fdba74`, bg `#fff7ed`, text `#d84e00` |
| Count pill | `h-5 min-w-[1.25rem] rounded-full bg-primary-200 px-1 text-xs font-medium text-primary-700` | 20px, bg `#fed7aa`, text `#d84e00` |
| Chevron | 14px, `text-neutral-400` | `#94a3b8` |
| Chips mode trigger | `min-h-8 px-2 py-1 rounded-md …`; chip `rounded-full border-primary-300 bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700` + "×"; max 2 chips then `+N more` (`bg-muted`) | |
| Panel | `mt-1 rounded-lg border bg-surface-primary shadow-lg`, `w-64` (256px) or `w-80` (320px) when options have descriptions | |
| Search | shown when options > 8 (`searchThreshold = 8`), placeholder `Search <label>...` | |
| Option row | `flex gap-2 px-3 py-1.5 text-sm text-neutral-700 hover:bg-muted` with checkbox | list `max-h-72` |
| Footer | `border-t bg-neutral-50 px-3 py-2 text-xs`: "N selected"/"None selected" + Select all / Clear (`text-2xs font-medium`) | |

Note the inconsistency: single-select FilterDropdown triggers are 36px, `rounded-lg`, grey `#f3f3f5` fill; multiselect triggers are 32px, `rounded-md`, white.

**FilterBar** (`shared/FilterBar.tsx`): row `flex flex-wrap items-center gap-3`. "More Filters" = secondary sm Button with `FilterIcon` (Lucide ListFilter 14px) + count dot (`w-4 h-4 rounded-full bg-primary-600 text-white text-[10px]`). Panel `w-60 rounded-lg border p-4 shadow-lg space-y-3`, fields stacked with `text-xs font-medium text-muted-foreground` labels. "Clear all" = `text-xs text-muted-foreground hover:text-foreground` with 12px ×.

### 4.7 PaginationControls — `shared/PaginationControls.tsx`

Hidden when `totalPages <= 1`. All buttons are `Button size="sm"` (32/34px).

| Mode | Layout |
|---|---|
| default | `justify-between pt-3 border-t border-border mt-3`; left "Page X of Y" `text-sm text-muted-foreground`; right `gap-1.5`: secondary "Previous" · secondary "Next" |
| `numbered` | adds page buttons: current = `primary` (orange fill), others `secondary`; ellipsis `…` `px-1 text-sm text-muted-foreground`. ≤7 pages shows all; otherwise 1, last, current ±1 with ellipses |
| `compact` | `justify-end`, no page text, `gap-1`, prev/next glyphs `‹` `›` |

### 4.8 Tabs

| Component | Container | Trigger | Active | Inactive |
|---|---|---|---|---|
| `ui/tabs.tsx` (Radix) | `flex w-fit border-b border-border` | `px-3 py-2 text-sm font-medium border-b-2 -mb-px gap-1.5` | border + text `#fe6301` | text `#64748b`, hover text `#1e293b` + border `#cbd5e1` |
| `shared/TabBar.tsx` | `-mb-px flex gap-0.5 border-b border-border` | same | same; count pill `bg-primary-100 text-primary-700` | count pill `bg-muted text-neutral-500` |

Count pill: `rounded-full px-1.5 py-0 text-[10px] font-medium`. TabsContent `mt-4`.

**SegmentedControl** (`ui/SegmentedControl.tsx`): sizes sm `px-2.5 py-0.5 text-xs`, md `px-3 py-1 text-sm`. `pills` variant: `rounded-full border font-medium`, active `border-primary-600 bg-primary-50 text-primary-700`, idle `border-border bg-white text-muted-foreground`; count "(n)". `track` variant: joined `rounded-lg border` group, active `bg-primary-50 font-semibold text-primary-700`.

### 4.9 Switch — `ui/Switch.tsx` (Headless UI)

Track `h-5 w-9` (20 × 36) `rounded-full border-2 border-transparent`; on `bg-primary-600` `#fe6301`, off `bg-neutral-300` `#cbd5e1`. Thumb `h-4 w-4` white `shadow-sm`, `translate-x-4` when on; 200ms ease-in-out. Label `text-sm font-medium text-neutral-900`, description `mt-0.5 text-xs text-muted-foreground`, `gap-3`. Disabled `opacity-50`.

### 4.10 Tooltip — `ui/Tooltip.tsx` (Radix)

`z-50 max-w-xs whitespace-normal rounded-md bg-surface-inverse px-2.5 py-2 text-[11px] leading-relaxed text-white shadow-lg`; `sideOffset` 4. → bg `#0f172a`, 11px / 1.625, **max-width 320px, wraps**, 8px radius, fade+zoom-95 in/out. Trigger gets `cursor-pointer`. `TooltipChip.tsx` and `ChargeCodeTooltip.tsx` exist in shared (not expanded).

### 4.11 Toast — `ui/Toast.tsx`

Stack `fixed top-4 right-4 z-[100] flex-col gap-2`. Card `w-80` (320px) `rounded-lg border border-border bg-surface-primary p-4 shadow-lg gap-3`, a 4px left accent bar (`w-1`), 20px icon, title `text-sm font-semibold text-foreground`, message `text-sm text-muted-foreground`, optional action `mt-2 text-sm font-medium text-primary-600 hover:text-primary-700`, dismiss × 16px muted. Duration 6000ms (12000ms with action). Default variant `info`. `role="alert"` for error, else `status`.

| Variant | Accent bar / icon colour | Icon |
|---|---|---|
| error | `#d4183d` | warning triangle |
| success | `#16a34a` | check |
| warning | `#ca8a04` | warning triangle |
| info | `#2563eb` | info circle |

### 4.12 Popover, menu, sheet, modal, card, info box

| Component | Classes | Source |
|---|---|---|
| PopoverContent | `z-50 rounded-xl border border-border bg-surface-primary p-0 shadow-lg`, align start, offset 4 | `ui/popover.tsx` |
| DropdownMenuContent | `min-w-[12rem] rounded-lg border bg-surface-primary p-1 shadow-md`, offset 4 (SubContent min 8rem) | `ui/dropdown-menu.tsx` |
| DropdownMenuItem | `rounded-md px-2 py-1.5 text-sm focus:bg-muted`, disabled opacity 50; inset `pl-8` | |
| DropdownMenuLabel | `px-2 py-1.5 text-sm font-semibold` | |
| DropdownMenuSeparator | `-mx-1 my-1 h-px bg-border` | |
| Sheet | right side default, `sm:max-w-[480px]`, `bg-surface-primary p-6 shadow-xl border-l`, overlay `bg-overlay/50`, close × at `right-4 top-4` | `ui/sheet.tsx` |
| Modal (ModalShell) | overlay `bg-overlay/40`; panel `rounded-2xl bg-surface-primary shadow-xl max-h-[90vh]`, outer `p-4` | `shared/ModalShell.tsx` |
| Card | `bg-surface-primary rounded-xl border border-border p-6`; interactive adds `hover:shadow-md` | `ui/Card.tsx` |
| InfoBox | `border rounded-lg p-3 text-sm`; info `bg-info-light border-border-strong text-neutral-800`; warning `bg-warning-light …`; caution `bg-caution-light border-caution-border text-caution-strong`; success `bg-success-light …`; error `bg-danger-light border-border-strong text-danger`; title `font-medium mb-1` | `shared/InfoBox.tsx` |
| Spinner | `rounded-full border-primary-100 border-t-primary-500 animate-spin`; sm 16px/2px, md 32px/4px, lg 48px/4px | `shared/Spinner.tsx` |
| ProgressBar | track `h-1.5 rounded-full bg-accent` (`#e9ebef`), fill `bg-primary-500` (`#ff7224`) | `ui/ProgressBar.tsx` |
| Skeleton | `skeleton-wave block rounded` | `ui/Skeleton.tsx` |

### 4.13 Tables

**Constants** (`lib/styles.ts`):

| Constant | Classes | Resolved |
|---|---|---|
| `TABLE_HEADER_CLASS` | `bg-muted px-4 py-2.5 font-semibold text-[11px] uppercase tracking-wide text-neutral-600 whitespace-nowrap` | bg `#f1f5f9`, 16/10px pad, 11px semibold UPPERCASE, letter-spacing 0.025em, `#475569` |
| `TABLE_CELL_CLASS` | `px-4 py-3 text-sm` | 16/12px pad, 14px |

**ListTable** (`shared/ListTable.tsx`, used by DocketTable and most list pages) — does *not* use TABLE_HEADER_CLASS:

- Frame: `bg-surface-primary rounded-xl border border-border` (overflow-x-auto or overflow-hidden when sticky).
- `<table class="min-w-max w-full text-sm">`.
- `<thead class="bg-muted z-20">` (sticky `top-0` when enabled); header row `text-left text-muted-foreground`.
- `<th>`: `px-4 py-3 text-xs font-medium whitespace-nowrap` → 12px, weight 500, sentence/Title case (**not uppercase**), `#64748b`. Sortable headers go through `SortTh`: active = `text-foreground` with ▲/▼ (10px), idle = muted with a 12px double-triangle glyph.
- `<tbody class="divide-y divide-border">` → 1px `#e2e8f0` row dividers.
- `<td>`: `px-4 py-3 text-neutral-700` (`#334155`, 14px).
- Clickable rows: `hover:bg-muted cursor-pointer`, focus `ring-2 ring-primary-400 ring-inset`.
- Pinned columns: `sticky bg-surface-primary` (header `bg-muted`), last pinned column has an inset 2px right shadow in `--color-border`.
- Fixed-width columns clip (`overflow-hidden`; width = min = max).
- Expanded child row: `bg-surface-info-soft` (`#f0f9ff`) `px-4 py-3`.
- Loading without skeleton: frame + `py-12 text-center text-sm text-muted-foreground` + 24px spinner. Skeleton rows: `h-4 w-full max-w-40` shimmer bars.
- Empty: `bg-surface-primary rounded-xl border border-border py-12 text-center text-sm text-muted-foreground`, default text "No results found."

**DocketTable columns** (`shared/disputes/DocketTable.tsx`):

| key | Label | defaultWidth | Sortable (field) | Cell |
|---|---|---|---|---|
| `__select__` | (checkbox) | `w-10` class | — | Checkbox; always pinned, not resizable |
| vendor | Vendor | 220 | no | `font-medium text-foreground` truncated; fallback muted "Unknown vendor" |
| name | Dispute Docket | 300 | no | `font-medium text-foreground` truncated; required column |
| invoices | Invoices | 200 | no | `font-mono text-xs`, comma-joined |
| charges | Charges / Exceptions | 260 | no | `text-xs text-muted-foreground`: up to 3 charge types joined " · " + up to 2 codes "(A, B +n)" |
| status | Status | — | yes (status) | `DocketStatusBadge size="sm"` + orange sm badge "N rec(s)" if pending recommendations |
| disputed | Disputed | — | yes (`total_disputed_amount`) | right-aligned `font-mono font-semibold text-danger` (`#d4183d`); empty → muted "Pending" |
| charged | Charged | — | yes (`total_charge_amount`) | right-aligned `font-mono` |
| open | Open disputes | — | yes (`dispute_count`) | `font-mono` "X of Y" |
| initiated | Initiated | — | yes (`created_at`) | formatted date |
| last_activity | Last activity | — | yes (`last_message_at`) | "<age> ago" / muted "No messages yet" |
| counterparty | "Vendor last activity" (shipper) / "Customer last activity" (vendor) | — | yes (`last_vendor_message_at` / `last_client_message_at`) | date + `text-xs` muted "(age)" / muted "No reply yet" |
| oldest_invoice | Oldest invoice | — | yes (`oldest_invoice_date`) | date only |

Defaults — shipper: visible vendor, name, status, disputed, open, charges, initiated, last_activity, counterparty, oldest_invoice; pinned `vendor`. Vendor portal: same without vendor; pinned `name`. ("invoices" and "charged" are off by default.) Empty message: "No dispute dockets match the current filters." Column layout persists per user (`dispute_list_columns_v1` etc.).

### 4.14 Empty states — `shared/EmptyState.tsx`

`text-center py-16`; default icon = 48px (`w-12 h-12`) inbox outline SVG in `text-neutral-300` (`#cbd5e1`), stroke 1.5, `mb-4`; title `text-lg font-medium text-neutral-900 mb-1`; description `text-sm text-muted-foreground mb-4`; action `mt-4`. Table-level empties are the ListTable message (above).

---

## 5. Icons

- **Lucide** (`lucide-react` ^1.47), re-exported only through `frontend/src/components/ui/icons.tsx` (ESLint `no-restricted-imports` elsewhere). House defaults: **16px, stroke 1.75 (`absoluteStrokeWidth`)**, `currentColor`, decorative `aria-hidden`.
- Curated set includes Search, Sparkles (Agent/Sparkle), ShieldCheck, Plus, Bell, RefreshCw, ChartColumn, Columns3, FileDiff, Layers, Calendar, ListFilter (FilterIcon), Filter (FunnelIcon), Trash2, Star, Tag, Chevron Down/Left/Right, ChevronsUpDown/DownUp, ArrowUpDown (Sort), X (Close), Download, ExternalLink, Pencil (Edit), History, Settings, Share, LoaderCircle, Check, Pause, Play, Info, AlertTriangle, BookOpenText (Guidance), FileSearch, GripVertical, Paperclip, Link, Mic, CircleStop, ArrowRight (Send), FlaskConical, TextAlignStart, CircleHelp, Send (email), AtSign, Asterisk, Users, Mail, KeyRound, LockOpen, MessageCircleMore (Chat), Ellipsis (More), ClipboardCheck, FileText, Receipt, MessagesSquare, Calculator, Banknote.
- Hand-drawn SVGs allowed only in `icons.tsx`, `shared/DashboardNavIcons.tsx` (sidebar route glyphs) and `shared/LinkageIcon.tsx`; other inline SVGs (e.g. EmptyState, SortTh, Toast, PageHeader back arrow) are legacy.
- **Mode / transport: no icons.** Nothing on main renders a truck/ship/plane glyph (no Truck/Ship/Plane in the Lucide set, no ModeIcon component). Modes appear as text labels from `frontend/src/lib/transportModes.ts`: ROAD "Road", OCEAN "Ocean", AIR "Air", PARCEL "Parcel", RAIL "Rail", INTERMODAL "Intermodal", NON_TRANSPORTATION "Non-transportation" (`invoiceModeLabel`); contract upload adds CUSTOMS "Customs Brokerage", SERVICES_LABOUR "Services", WAREHOUSING "Warehousing (3PL)". Service types: ROAD → LTL/FTL/Ground (contracts) or FTL/LTL/Drayage/Last Mile/Courier (freight); OCEAN → FCL/LCL(/Breakbulk).

---

## 6. Unresolved / caveats

- **Base font size**: no explicit html/body font-size → assumed browser default 16px (unresolved as a token).
- **Button heights** are computed, not declared (except `icon` h-9).
- `bg-primary` (bare) and `bg-primary-600` both `#fe6301`; `--color-primary-500` `#ff7224` is brighter than 600 (non-monotonic scale at 500→600) — that's how it's written.
- Alpha variants (`success/90`, `danger/20`, `overlay/40`) are colour-mix values; not converted to flat hex.
- Tailwind default `tracking-wide` = 0.025em, `leading-relaxed` = 1.625 (Tailwind defaults, not repo tokens).
- `--font-size-*` 13/15/17 mentioned in ui/CLAUDE.md as "never applied" — not present in globals.css.
- Not expanded: `TooltipChip`, `ChargeCodeTooltip`, `DashboardNavIcons`, `calendar`, `breadcrumb`, and the many secondary StatusBadges maps listed in §4.2.
