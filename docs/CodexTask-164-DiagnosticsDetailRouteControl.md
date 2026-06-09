# Codex Task 164: Diagnostics Detail Route Control

## Project

DigitalDirectory-v2

## Goal

Create the diagnostics detail route and wire it to the diagnostics detail read helper implemented in Task 162.

This task should allow users to open a public diagnostics provider detail page by slug while preserving safe not-found and fallback behavior.

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
* CodexTask-160-DiagnosticsPageSupabaseWiringQA.md
* CodexTask-161-DiagnosticsDetailReadPlanning.md
* CodexTask-162-DiagnosticsDetailReadHelperImplementation.md
* CodexTask-163-DiagnosticsDetailRuntimeProbe.md

---

## Important Context

Task 162 added the diagnostics detail read helper.

Expected helper:

```ts
getSupabasePublicDiagnosticDetailBySlug(slug: string)
```

Expected helper module:

```text
src/lib/supabase/diagnostics-public-read.ts
```

Task 163 created the diagnostics detail runtime probe and confirmed safe behavior for:

* public slug
* blocked pending slug
* blocked hidden slug
* missing slug
* invalid slug

---

## Main Objective

Create the diagnostics detail route:

```text
src/app/diagnostics/[slug]/page.tsx
```

The route should use the diagnostics detail read helper and render a safe diagnostics provider detail page.

Follow the existing pharmacy detail route pattern as closely as possible.

---

## Required Route Behavior

The route should:

1. Accept the route slug from params.
2. Call `getSupabasePublicDiagnosticDetailBySlug(slug)`.
3. Render a diagnostics detail page when a public diagnostics provider is found.
4. Return existing project-consistent not-found behavior when:

   * slug is missing
   * slug is invalid
   * slug does not exist
   * slug belongs to a pending provider
   * slug belongs to a hidden provider
5. Preserve safe fallback behavior if Supabase is unavailable.
6. Avoid exposing raw errors, Supabase URL, anon key, env values, or secrets.
7. Preserve the existing diagnostics design language and public listing patterns.
8. Do not implement diagnostics contact channels yet.
9. Do not modify SQL, RLS, schema, or migrations.
10. Do not change pharmacy, doctors, or facilities behavior.

---

## Expected Public Test Slugs

When Supabase runtime is available, the route should be able to render public detail pages for:

```text
test-diagnostic-alpha-lab
test-diagnostic-eta-imaging
test-diagnostic-zeta-radiology
test-diagnostic-omega-pathology
test-diagnostic-kappa-mixed
test-diagnostic-lambda-home-sample
```

At minimum, the implementation should support:

```text
/diagnostics/test-diagnostic-alpha-lab
```

---

## Expected Blocked Test Slugs

The route must not expose public detail pages for:

```text
test-diagnostic-beta-pending
test-diagnostic-delta-hidden
```

These should resolve to the same safe not-found behavior used by existing detail routes.

---

## Page Content

The diagnostics detail page may display public-safe information such as:

* display name
* category
* diagnostics provider type
* description
* city
* area
* public address
* public landmark
* public services
* sample collection modes
* public opening hours
* public result turnaround estimate
* appointment requirement preview
* walk-in availability
* home sample collection preview
* verification status
* last confirmed date

Do not display private/internal fields.

---

## UI / Layout Guidance

Follow existing detail page patterns from pharmacy.

The page should have:

* a clear title
* provider type/category label
* location section
* services section
* availability/sample collection/turnaround section
* safe fallback/not-found behavior
* link back to diagnostics listing if project convention supports it

Keep layout focused and consistent.

Do not redesign the global UI.

---

## Scope

Allowed:

* Create `src/app/diagnostics/[slug]/page.tsx`.
* Add a small diagnostics detail component if existing patterns require it.
* Add minimal local display helpers if necessary.
* Run validation commands.

Not allowed:

* Do not implement diagnostics contact channels.
* Do not modify diagnostics listing page unless a tiny link/path fix is required.
* Do not modify SQL.
* Do not modify RLS.
* Do not modify Supabase migrations.
* Do not change pharmacy, doctors, or facilities behavior.
* Do not change global UI, brand, logo, colors, or real data.
* Do not create Task 165.

---

## Validation Commands

Run:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run probe:diagnostics-detail
npm.cmd run probe:diagnostics
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

If PowerShell blocks `npm`, use `npm.cmd`.

---

## Acceptance Criteria

* Diagnostics detail route exists.
* Route calls the diagnostics detail read helper.
* Public active/visible diagnostics slugs can render detail pages.
* Pending/hidden diagnostics slugs are not exposed.
* Missing/invalid slugs are handled safely.
* No raw errors or secrets are exposed.
* No diagnostics contact channels are implemented yet.
* No SQL/RLS/migration/schema files are modified.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* Existing probes are attempted and results are reported.
* Task 165 is not created.

---

## Deliverable

A focused diagnostics detail route implementation.

Do not proceed beyond Task 164.
