# Codex Task 175: Public-Facing Placeholder Copy Cleanup QA

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the public-facing placeholder copy cleanup completed in Task 174.

This task documents what was cleaned, which areas were touched, validation results, remaining limitations, and readiness for real provider data intake planning.

This task follows:

* CodexTask-171-PlaceholderAndTestDataInventory.md
* CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md
* CodexTask-173-PublicFacingPlaceholderCopyCleanupPlanning.md
* CodexTask-174-PublicFacingPlaceholderCopyCleanupImplementation.md

This is a documentation-only QA task.

Do not modify source code in this task.

---

## Important Context

Task 174 cleaned high-priority public-facing placeholder/demo/sample/preview/fallback wording.

Task 174 modified only public UI files under:

```text
src/app
src/components
```

No forbidden files were expected to be modified.

Forbidden areas include:

```text
package.json
package-lock.json
scripts
supabase
migrations
SQL files
src/data
provider records
route structure
probes
package scripts
```

---

## Required QA Record

Document the following:

1. Task 174 public-facing copy cleanup was completed.
2. Public-facing wording was cleaned in high-priority UI areas.
3. Footer preview-only trust-risk links were addressed.
4. Homepage wording was made more production-safe.
5. Search results wording was made more production-safe.
6. Provider card/detail action-panel wording was made more production-safe.
7. Empty-state wording was made more trust-building where applicable.
8. No SQL, RLS, schema, migration, data, probe, package script, or route-structure changes were made.
9. Existing layout and behavior were preserved.
10. Remaining real-data replacement work is not yet done.
11. Ready for real provider data intake planning.

---

## Known Task 174 Cleanup Areas

Record that Task 174 touched public-facing UI areas including:

```text
src/app/diagnostics
src/app/doctors
src/app/facilities
src/app/pharmacies
src/components/layout/Footer.tsx
src/components/home
src/components/search-results
src/components/cards
src/components/contact
src/components/corrections
src/components/diagnostics
src/components/doctor-detail
src/components/doctors
src/components/facilities
src/components/facility-detail
src/components/feedback
src/components/nearby
src/components/pharmacies
src/components/register
src/components/registration
```

---

## Validation Results To Record

Record validation from Task 174:

```text
lint: passed using available local/bundled runtime path
build: passed using available local/bundled runtime path
probe:diagnostics-detail: passed
probe:diagnostics: passed or completed with known safe fallback behavior
probe:pharmacies: completed with existing missing-env static fallback result
probe:pharmacy-detail: completed with existing missing-env static fallback result
```

Also record:

```text
npm.cmd and node were not available on PATH in the Codex shell, so equivalent validation was run using the available bundled/local runtime path.
```

---

## QA Status

The QA record should state:

```text
Status: Passed with environment PATH note and real-data replacement pending
```

Reason:

* Public-facing placeholder/demo/sample/fallback wording was cleaned.
* Footer public navigation risks were reduced.
* Lint/build passed through available runtime.
* Existing probes completed with expected safe behavior.
* No forbidden files were modified.
* Real provider data replacement is still pending.

---

## Remaining Work

Document that the next major step is real data intake planning, not immediate data insertion.

Recommended next task:

```text
Task 176 — Real Provider Data Intake Format and Replacement Planning
```

Purpose:

* Define the exact data format the project owner should use to provide real provider information.
* Prepare a structured spreadsheet/template format.
* Separate provider categories and contact channels.
* Preserve verification, listing status, visibility status, and last-confirmed fields.
* Avoid premature deletion of QA/test rows until replacement data is ready.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-175-PublicFacingPlaceholderCopyCleanupQA.md`.
* Record Task 174 cleanup results.
* Record validation results.
* Record remaining work and next task readiness.

Not allowed:

* Do not modify source code.
* Do not modify UI copy.
* Do not delete test data.
* Do not modify SQL, RLS, schema, or migrations.
* Do not insert real data.
* Do not modify static data.
* Do not change routes.
* Do not modify probes.
* Do not modify package scripts.
* Do not create Task 176.

---

## Acceptance Criteria

* QA markdown record exists.
* Task 174 cleanup areas are documented.
* Validation results are documented.
* Forbidden-file safety is documented.
* Environment PATH note is documented.
* Real data replacement pending status is documented.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No data is deleted or inserted.
* Task 176 is not created.

---

## Deliverable

A focused QA record for public-facing placeholder copy cleanup.

Do not proceed beyond Task 175.
