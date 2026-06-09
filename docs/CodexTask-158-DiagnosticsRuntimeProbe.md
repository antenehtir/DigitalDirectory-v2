# Codex Task 158: Diagnostics Runtime Probe

## Project

DigitalDirectory-v2

## Goal

Create a runtime probe for the diagnostics public read helper created in Task 157.

This task verifies that the diagnostics public read helper can safely execute against the verified Supabase diagnostics table and return the expected active/public diagnostics provider rows.

This task follows:

* CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md
* CodexTask-152-DiagnosticsTableSQLDraft.md
* CodexTask-153-DiagnosticsRLSPolicySQLDraft.md
* CodexTask-154-DiagnosticsTestDataSQLDraft.md
* CodexTask-155-DiagnosticsManualSQLExecutionGuide.md
* CodexTask-156-DiagnosticsSQLExecutionQARecord.md
* CodexTask-157-DiagnosticsPublicReadHelperImplementation.md

---

## Important Context

The diagnostics SQL setup has already been manually executed and verified in Supabase.

Confirmed Supabase state:

* `public.diagnostic_providers` table exists.
* RLS is enabled.
* Public select policy is active for:

  * `listing_status = 'active'`
  * `visibility_status = 'public'`
* Test data exists.
* Total rows: 8.
* Expected active/public rows: 6.
* Expected blocked rows: 2.

Task 157 created the diagnostics public read helper.

---

## Main Objective

Create a diagnostics runtime probe script that calls the diagnostics public read helper and verifies safe runtime behavior.

Recommended script target:

```text
scripts/probe-diagnostics.ts
```

Add a package script if project conventions support it:

```json
"probe:diagnostics": "..."
```

Follow the same structure and conventions used by the existing pharmacy runtime probe scripts.

---

## Required Probe Behavior

The probe should:

1. Import and call the diagnostics public read helper from Task 157.
2. Execute the helper in a Node/runtime-safe way.
3. Print a safe probe summary.
4. Confirm that the helper result is returned without crashing.
5. Confirm that cards are returned when Supabase env is available.
6. Confirm that expected active/public diagnostics rows are present.
7. Confirm that blocked rows are not returned.
8. Avoid printing raw Supabase errors, env values, URLs, anon keys, or secrets.
9. Exit with a non-zero code if the probe fails.
10. Exit successfully if expected diagnostics public-read behavior is confirmed.

---

## Expected Public Rows

The probe should expect these public-visible test rows:

```text
test-diagnostic-alpha-lab
test-diagnostic-eta-imaging
test-diagnostic-zeta-radiology
test-diagnostic-omega-pathology
test-diagnostic-kappa-mixed
test-diagnostic-lambda-home-sample
```

---

## Expected Blocked Rows

The probe should confirm these rows are not returned by the public helper:

```text
test-diagnostic-beta-pending
test-diagnostic-delta-hidden
```

---

## Safe Output Requirements

The probe may print:

* Probe name
* Helper result status
* Source
* Number of returned cards
* Returned slugs
* Whether expected public rows were found
* Whether blocked rows were excluded
* Final pass/fail status

The probe must not print:

* Supabase URL
* Supabase anon key
* Environment variable values
* Raw Supabase error object
* Stack traces unless existing probe conventions already allow safe stack traces
* Private/internal database fields

---

## Loader / Existing Probe Issue

During Task 157, these commands were attempted:

```bash
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

Both failed before reaching app code with:

```text
ERR_UNKNOWN_FILE_EXTENSION for .ts
```

This appears to be an existing Node/TypeScript loader issue in the current environment, not a diagnostics helper issue.

For this task:

* Inspect the existing pharmacy probe scripts and package scripts.
* Use the safest existing project pattern.
* If the same `.ts` loader issue affects the new diagnostics probe, document it clearly.
* Do not make broad package/tooling changes unless a small, safe, project-consistent script fix is clearly required.
* Do not rewrite the probe system broadly.

---

## Scope

Allowed:

* Create `scripts/probe-diagnostics.ts`.
* Add `probe:diagnostics` to `package.json` if consistent with existing scripts.
* Make minimal, safe loader/package-script adjustment only if necessary and consistent with existing probe setup.
* Run validation commands.

Not allowed:

* Do not modify SQL.
* Do not modify RLS.
* Do not modify Supabase migrations.
* Do not modify diagnostics page wiring yet.
* Do not create diagnostics detail pages.
* Do not implement diagnostics contact channels.
* Do not change pharmacy helper behavior unless only fixing a shared probe-runner issue.
* Do not change UI, route structure, brand/logo, or real data.
* Do not create Task 159.

---

## Validation Commands

Run:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run probe:diagnostics
```

Also attempt, if the probe loader issue is resolved or unaffected:

```bash
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

If PowerShell blocks `npm`, use `npm.cmd`.

---

## Acceptance Criteria

* Diagnostics runtime probe script exists.
* Package script exists if consistent with the project.
* Probe calls the diagnostics public read helper.
* Probe confirms active/public diagnostics rows are returned.
* Probe confirms pending/hidden diagnostics rows are excluded.
* Probe output is safe and does not expose secrets or raw Supabase errors.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* `npm.cmd run probe:diagnostics` passes, or if blocked by the existing TypeScript loader issue, the issue is clearly documented.
* No diagnostics page wiring is performed yet.
* No SQL, RLS, migration, or schema changes are made.
* Task 159 is not created.

---

## Deliverable

A focused diagnostics runtime probe implementation for the diagnostics public read helper.

Do not proceed beyond Task 158.
