# Codex Task 168: Diagnostics Contact Channels QA

## Project

DigitalDirectory-v2

## Goal

Create a QA record for diagnostics contact channel wiring completed in Task 167.

This task documents that diagnostics detail pages now attempt to read public contact channels using the planned diagnostics contact provider type, preserve safe empty-state behavior, and do not expose raw errors or secrets.

This task follows:

* CodexTask-166-DiagnosticsContactChannelsPlanning.md
* CodexTask-167-WireDiagnosticsContactChannelsIntoDetailPage.md

---

## Important Context

Task 167 modified:

```text
src/app/diagnostics/[slug]/page.tsx
```

Diagnostics contact channel wiring now uses the shared public provider contact channel helper pattern.

Planned diagnostics contact provider type:

```text
diagnostic
```

This is intentionally singular and separate from:

```text
diagnostics
```

which may be used as the app-level listing provider type.

It is also separate from:

```text
diagnostic_provider_type
```

which is the diagnostics provider subtype field on `public.diagnostic_providers`.

---

## Required QA Record

Document the following:

1. Diagnostics detail page now reads public contact channels.
2. Contact channel provider type used:

   ```text
   diagnostic
   ```
3. Contact reads run alongside diagnostics detail reads.
4. Contact channel read failures do not crash the diagnostics detail page.
5. Missing/empty contact rows result in safe empty-state behavior.
6. Unsupported contact channel types are safely ignored or resolved to an empty list.
7. No raw Supabase errors, env values, URLs, anon keys, or secrets are exposed.
8. Diagnostics detail not-found behavior is unchanged.
9. Pending and hidden diagnostics rows remain protected by the diagnostics detail helper.
10. No SQL, RLS, schema, migration, or contact rows were created or modified.
11. No pharmacy, doctors, or facilities behavior was changed.
12. Remaining live Supabase diagnostics runtime limitation is documented.

---

## Known Validation Results From Task 167

Record these results:

```text
npm.cmd run lint: passed
npm.cmd run build: passed
npm.cmd run probe:diagnostics-detail: passed safety criteria
npm.cmd run probe:diagnostics: safe fallback/error, DIAGNOSTICS_PUBLIC_READ_FAILED
npm.cmd run probe:pharmacies: passed with safe static fallback
npm.cmd run probe:pharmacy-detail: passed with safe static fallback
```

---

## QA Status

The QA record should state:

```text
Status: Passed with expected empty-contact-state and runtime Supabase verification limitation
```

Reason:

* Contact channel wiring builds successfully.
* Contact helper uses provider type `diagnostic`.
* Contact read failure does not crash the page.
* Empty contact rows are safe and expected at this stage.
* Detail safety probe still passes.
* Live Supabase diagnostics rows were manually verified in SQL during Task 156.
* Live Supabase diagnostics rows are still not verified through the local/Codex diagnostics runtime probe.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-168-DiagnosticsContactChannelsQA.md`.
* Record Task 167 validation results.
* Record empty-state behavior.
* Record remaining runtime limitation.
* State readiness for post-diagnostics cleanup or next MVP module step.

Not allowed:

* Do not modify source code.
* Do not modify diagnostics route files.
* Do not modify diagnostics helper.
* Do not modify contact channel helper.
* Do not modify probe scripts.
* Do not modify package scripts.
* Do not modify SQL, RLS, schema, or migrations.
* Do not insert contact channel rows.
* Do not change pharmacy, doctors, or facilities behavior.
* Do not change UI, brand, logo, colors, or real data.
* Do not create Task 169.

---

## Acceptance Criteria

* QA markdown record exists.
* Task 167 route file is listed.
* Provider type `diagnostic` is documented.
* Safe empty-contact-state behavior is documented.
* Contact failure safety is documented.
* Validation results are recorded.
* Remaining diagnostics Supabase runtime limitation is documented.
* QA status is clear.
* Readiness for the next MVP step is stated.
* No source code is modified.
* Task 169 is not created.

---

## Deliverable

A focused QA record for diagnostics contact channel wiring.

Do not proceed beyond Task 168.
