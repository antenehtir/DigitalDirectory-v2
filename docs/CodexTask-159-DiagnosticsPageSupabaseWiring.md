# Codex Task 159: Diagnostics Page Supabase Wiring

## Project

DigitalDirectory-v2

## Goal

Wire the diagnostics listing page to the diagnostics public read helper created in Task 157 and probe-tested in Task 158.

The diagnostics page should use Supabase-backed active/public diagnostics provider rows when available, while preserving safe fallback behavior.

This task follows:

* CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md
* CodexTask-152-DiagnosticsTableSQLDraft.md
* CodexTask-153-DiagnosticsRLSPolicySQLDraft.md
* CodexTask-154-DiagnosticsTestDataSQLDraft.md
* CodexTask-155-DiagnosticsManualSQLExecutionGuide.md
* CodexTask-156-DiagnosticsSQLExecutionQARecord.md
* CodexTask-157-DiagnosticsPublicReadHelperImplementation.md
* CodexTask-158-DiagnosticsRuntimeProbe.md

---

## Important Context

The diagnostics Supabase setup has already been manually executed and verified.

Confirmed database state:

* `public.diagnostic_providers` table exists.
* RLS is enabled.
* Public select policy is active for:

  * `listing_status = 'active'`
  * `visibility_status = 'public'`
* Total test rows: 8.
* Expected active/public rows: 6.
* Expected blocked rows: 2.

Task 157 created:

```text
src/lib/supabase/diagnostics-public-read.ts
```

Task 158 created:

```text
scripts/probe-diagnostics.ts
```

and added the diagnostics probe package script.

---

## Main Objective

Update the diagnostics listing page so it reads diagnostics provider cards from the diagnostics public read helper.

Primary target:

```text
src/app/diagnostics/page.tsx
```

Use the existing page wiring patterns from:

* facilities page
* doctors page
* pharmacies page

Follow the pharmacy page Supabase wiring pattern most closely.

---

## Required Page Behavior

The diagnostics page should:

1. Import and call the diagnostics public read helper.
2. Use Supabase-backed diagnostics cards when the helper returns success.
3. Use fallback/static diagnostics cards when Supabase is unavailable or the helper recommends fallback.
4. Preserve the existing diagnostics page layout, styling, search UI, cards, and user-facing copy as much as possible.
5. Avoid exposing raw errors, Supabase details, env values, URLs, anon keys, or secrets.
6. Avoid showing internal database status to ordinary users.
7. Keep public discovery behavior only.
8. Not show pending or hidden diagnostics rows.
9. Continue to build successfully.
10. Keep changes focused on diagnostics page wiring only.

---

## Expected Runtime Result

When Supabase env is available and the verified test data exists, the diagnostics page should be able to display the 6 active/public diagnostics rows:

```text
test-diagnostic-alpha-lab
test-diagnostic-eta-imaging
test-diagnostic-zeta-radiology
test-diagnostic-omega-pathology
test-diagnostic-kappa-mixed
test-diagnostic-lambda-home-sample
```

The page should not display:

```text
test-diagnostic-beta-pending
test-diagnostic-delta-hidden
```

---

## Safe Fallback Behavior

If Supabase is unavailable, env is missing, or the helper returns a safe error/unavailable result:

* The diagnostics page should still render.
* Existing fallback/static diagnostics data should be shown if available.
* The page should not crash.
* The page should not expose raw technical errors to users.

Follow the pharmacy page fallback pattern.

---

## Scope

Allowed:

* Modify `src/app/diagnostics/page.tsx`.
* Add minimal imports from the diagnostics public read helper.
* Add small local mapping or result handling only if needed.
* Run validation commands.

Not allowed:

* Do not modify SQL.
* Do not modify RLS.
* Do not modify Supabase migrations.
* Do not modify diagnostics helper unless a tiny type/import fix is required.
* Do not create diagnostics detail pages yet.
* Do not implement diagnostics contact channels.
* Do not modify pharmacy, doctors, or facilities behavior.
* Do not change global UI, brand, logo, colors, or real data.
* Do not create Task 160.

---

## Validation Commands

Run:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run probe:diagnostics
```

Also run if safe:

```bash
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

If PowerShell blocks `npm`, use `npm.cmd`.

---

## Acceptance Criteria

* Diagnostics page imports the diagnostics public read helper.
* Diagnostics page uses helper results for cards.
* Active/public diagnostics rows can be displayed.
* Pending/hidden diagnostics rows are not displayed.
* Existing diagnostics page layout is preserved.
* Safe fallback behavior is preserved.
* No raw errors or secrets are exposed.
* No SQL, RLS, migration, or schema files are modified.
* No diagnostics detail/contact work is added.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* `npm.cmd run probe:diagnostics` passes or safe fallback limitation is clearly reported.
* Task 160 is not created.

---

## Deliverable

A focused diagnostics listing page Supabase wiring implementation.

Do not proceed beyond Task 159.
