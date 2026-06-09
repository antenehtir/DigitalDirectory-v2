# Codex Task 165: Diagnostics Detail Route QA

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the diagnostics detail route implemented in Task 164.

This task documents that the `/diagnostics/[slug]` route exists, uses the diagnostics detail read helper, handles not-found behavior safely, preserves fallback behavior, and does not expose blocked diagnostics providers.

This task follows:

* CodexTask-161-DiagnosticsDetailReadPlanning.md
* CodexTask-162-DiagnosticsDetailReadHelperImplementation.md
* CodexTask-163-DiagnosticsDetailRuntimeProbe.md
* CodexTask-164-DiagnosticsDetailRouteControl.md

---

## Important Context

Task 164 created:

```text
src/app/diagnostics/[slug]/page.tsx
```

The route uses:

```ts
getSupabasePublicDiagnosticDetailBySlug(slug: string)
```

from:

```text
src/lib/supabase/diagnostics-public-read.ts
```

Diagnostics contact channels are intentionally not implemented yet.

---

## Required QA Record

Document the following:

1. Diagnostics detail route was created.
2. Route path:

   ```text
   src/app/diagnostics/[slug]/page.tsx
   ```
3. Route calls the diagnostics detail read helper.
4. Public-safe diagnostics detail fields are displayed.
5. Missing, invalid, absent, pending, and hidden slugs are handled safely.
6. Route uses project-consistent `notFound()` behavior.
7. Safe fallback behavior is preserved.
8. No raw Supabase errors, env values, URLs, anon keys, or secrets are exposed.
9. Diagnostics contact channels are not implemented yet.
10. No SQL, RLS, schema, or migration files were modified.
11. No pharmacy, doctors, or facilities behavior was changed.
12. Remaining live Supabase diagnostics runtime limitation is documented.

---

## Known Validation Results From Task 164

Record these results:

```text
npm.cmd run lint: passed
npm.cmd run build: passed
/diagnostics/[slug]: registered as dynamic
npm.cmd run probe:diagnostics-detail: passed safety criteria
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

* Diagnostics detail route builds successfully.
* Detail safety probe passed.
* Missing, invalid, pending, and hidden slug behavior is protected by the helper and route.
* Contact channels are intentionally not implemented yet.
* Live Supabase diagnostics rows were manually verified in SQL during Task 156.
* Live Supabase diagnostics rows are still not verified through the local/Codex diagnostics runtime probe.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-165-DiagnosticsDetailRouteQA.md`.
* Record Task 164 validation results.
* Record remaining limitation.
* State readiness for diagnostics contact channel planning.

Not allowed:

* Do not modify source code.
* Do not modify diagnostics route files.
* Do not modify diagnostics helper.
* Do not modify probe scripts.
* Do not modify package scripts.
* Do not modify SQL, RLS, schema, or migrations.
* Do not implement diagnostics contact channels.
* Do not change pharmacy, doctors, or facilities behavior.
* Do not change UI, brand, logo, colors, or real data.
* Do not create Task 166.

---

## Acceptance Criteria

* QA markdown record exists.
* Task 164 route path is listed.
* Helper usage is documented.
* Not-found behavior is documented.
* Safe fallback behavior is documented.
* Validation results are recorded.
* Remaining Supabase runtime limitation is documented.
* QA status is clear.
* Readiness for Task 166 is stated.
* No source code is modified.
* Task 166 is not created.

---

## Deliverable

A focused QA record for diagnostics detail route control.

Do not proceed beyond Task 165.
