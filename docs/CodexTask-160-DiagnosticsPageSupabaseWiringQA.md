# Codex Task 160: Diagnostics Page Supabase Wiring QA

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the diagnostics page Supabase wiring completed in Task 159.

This task documents the implementation result, validation results, safe fallback behavior, and the remaining live Supabase runtime verification limitation.

This task follows:

* CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md
* CodexTask-152-DiagnosticsTableSQLDraft.md
* CodexTask-153-DiagnosticsRLSPolicySQLDraft.md
* CodexTask-154-DiagnosticsTestDataSQLDraft.md
* CodexTask-155-DiagnosticsManualSQLExecutionGuide.md
* CodexTask-156-DiagnosticsSQLExecutionQARecord.md
* CodexTask-157-DiagnosticsPublicReadHelperImplementation.md
* CodexTask-158-DiagnosticsRuntimeProbe.md
* CodexTask-159-DiagnosticsPageSupabaseWiring.md

---

## Important Context

The diagnostics Supabase setup was manually executed and verified before page wiring.

Confirmed database state:

* `public.diagnostic_providers` table exists.
* RLS is enabled.
* Public select policy is active for:

  * `listing_status = 'active'`
  * `visibility_status = 'public'`
* Total test rows: 8.
* Expected active/public rows: 6.
* Expected blocked rows: 2.

Task 157 created the diagnostics public read helper.

Task 158 created the diagnostics runtime probe.

Task 159 wired the diagnostics page to the diagnostics public read helper.

---

## Task 159 Implementation Summary

Task 159 modified diagnostics page-related files only:

```text
src/app/diagnostics/page.tsx
src/components/diagnostics/DiagnosticsPage.tsx
src/components/diagnostics/DiagnosticsResultsSection.tsx
```

The diagnostics page now uses the diagnostics public read helper and preserves fallback behavior.

---

## Required QA Record

Create or update a focused QA markdown record documenting:

1. Diagnostics page Supabase wiring was implemented.
2. Diagnostics page imports/calls the diagnostics public read helper.
3. Page can render using helper-provided cards.
4. Page preserves fallback/static diagnostics data when Supabase is unavailable, errors, or returns no cards.
5. No raw Supabase errors, env values, Supabase URL, anon key, or secrets are exposed.
6. Existing diagnostics UI/layout/copy was preserved as much as possible.
7. Pending/hidden rows are not expected to appear because the helper filters active/public rows.
8. Validation command results are recorded.
9. Remaining limitation is clearly documented:

   * `npm.cmd run probe:diagnostics` currently returns safe fallback/error with `DIAGNOSTICS_PUBLIC_READ_FAILED`.
   * Therefore the 6 live Supabase test rows were not verified through the local/Codex runtime probe yet.
   * This is a runtime verification limitation, not a page build failure.

Recommended file target:

```text
docs/CodexTask-160-DiagnosticsPageSupabaseWiringQA.md
```

---

## Known Validation Results From Task 159

Record these results:

```text
npm.cmd run lint: passed
npm.cmd run build: passed
npm.cmd run probe:diagnostics: safe fallback/error, DIAGNOSTICS_PUBLIC_READ_FAILED
npm.cmd run probe:pharmacies: passed with safe static fallback
npm.cmd run probe:pharmacy-detail: passed with safe static fallback
```

---

## QA Status

The QA record should state:

```text
Status: Passed with runtime Supabase verification limitation
```

Reason:

* The page wiring builds successfully.
* The page fallback behavior is safe.
* The helper protects against pending/hidden rows through active/public filters.
* The live Supabase rows were verified manually in SQL during Task 156.
* The live Supabase rows were not verified through `probe:diagnostics` in the current runtime.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-160-DiagnosticsPageSupabaseWiringQA.md`.
* Record validation results.
* Record remaining limitation.
* State readiness for diagnostics detail planning.

Not allowed:

* Do not modify source code.
* Do not modify diagnostics page files.
* Do not modify diagnostics helper.
* Do not modify probe scripts.
* Do not modify package scripts.
* Do not modify SQL, RLS, schema, or migrations.
* Do not create diagnostics detail pages yet.
* Do not implement diagnostics contact channels.
* Do not change pharmacy, doctors, or facilities behavior.
* Do not change UI, brand, logo, colors, or real data.
* Do not create Task 161.

---

## Acceptance Criteria

* QA markdown record exists.
* Task 159 implementation files are listed.
* Validation results are recorded.
* Safe fallback behavior is documented.
* Remaining diagnostics live Supabase probe limitation is documented.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* QA status is clear.
* Readiness for Task 161 is stated.
* Task 161 is not created.

---

## Deliverable

A focused QA record for diagnostics page Supabase wiring.

Do not proceed beyond Task 160.
