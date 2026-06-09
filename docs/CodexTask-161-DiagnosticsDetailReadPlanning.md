# Codex Task 161: Diagnostics Detail Read Planning

## Project

DigitalDirectory-v2

## Goal

Plan the diagnostics detail read flow before implementing a diagnostics detail helper, diagnostics detail route, or diagnostics detail runtime probe.

This is a planning-only task. No source code, SQL, RLS, schema, migrations, diagnostics listing page files, diagnostics helper files, probe scripts, package scripts, pharmacy, doctors, facilities, UI, brand, logo, color, or real data files are modified in this task.

---

## Context

This task follows:

- `docs/CodexTask-157-DiagnosticsPublicReadHelperImplementation.md`
- `docs/CodexTask-158-DiagnosticsRuntimeProbe.md`
- `docs/CodexTask-159-DiagnosticsPageSupabaseWiring.md`
- `docs/CodexTask-160-DiagnosticsPageSupabaseWiringQA.md`

The diagnostics listing page now uses:

```text
getSupabasePublicDiagnosticsCards
```

from:

```text
src/lib/supabase/diagnostics-public-read.ts
```

The diagnostics listing helper queries `public.diagnostic_providers` and filters by:

```text
listing_status = active
visibility_status = public
```

Task 160 recorded that the diagnostics page wiring passed lint/build QA with a remaining local/Codex runtime Supabase verification limitation: `probe:diagnostics` returned safe fallback/error with `DIAGNOSTICS_PUBLIC_READ_FAILED`.

The six active/public diagnostics rows were manually verified in SQL during Task 156, and the pending/hidden rows were manually verified as excluded from the active/public SQL result.

---

## Existing Pattern To Follow

Use the pharmacy detail sequence as the closest pattern:

- planning: `docs/CodexTask-143-PharmacyDetailReadPlanning.md`
- helper implementation: `docs/CodexTask-144-PharmacyDetailReadHelperImplementation.md`
- runtime probe: `docs/CodexTask-145-PharmacyDetailRuntimeProbe.md`
- route control: `docs/CodexTask-146-PharmacyDetailRouteControl.md`
- route QA: `docs/CodexTask-147-PharmacyDetailRouteQA.md`

Relevant implemented pharmacy route/helper pattern:

- list page calls a public read helper first
- detail helper reads one row by slug
- detail helper uses public-safe fields only
- detail helper filters by slug, `listing_status = active`, and `visibility_status = public`
- blocked or missing rows return safe not-found/unavailable behavior
- routes avoid exposing raw Supabase errors or secrets
- contact channels are handled separately and should not be bundled into the first detail-read helper task

---

## Future Route Path

Future diagnostics detail route path:

```text
/diagnostics/[slug]
```

Future route file:

```text
src/app/diagnostics/[slug]/page.tsx
```

The route should be dynamic when implemented, matching the live public-read pattern used by diagnostics listing, doctors, facilities, and pharmacies.

---

## Future Helper File

Recommended future helper file:

```text
src/lib/supabase/diagnostics-public-read.ts
```

Reason:

- The diagnostics list helper already lives there.
- Pharmacy, doctor, and facility helpers keep list/detail reads close together.
- Reusing the same diagnostics row types, select list, safe error classification, fallback card/detail mapping helpers, and public client access keeps the implementation small and consistent.

Alternative only if the file becomes too large later:

```text
src/lib/supabase/diagnostics-detail-read.ts
```

For Task 162, prefer adding the detail helper to `src/lib/supabase/diagnostics-public-read.ts` unless the implementation clearly needs separation.

---

## Future Helper Name

Recommended helper name:

```ts
getSupabasePublicDiagnosticDetailBySlug(slug: string)
```

Recommended result type:

```ts
DiagnosticPublicDetailReadResult
```

Expected result states:

- `success`
- `not-found`
- `unavailable`
- `error`

The shape should mirror `PharmacyPublicDetailReadResult`, `DoctorPublicDetailReadResult`, and `FacilityPublicDetailReadResult` where practical.

---

## Public-Safe Fields

The future detail helper should select only public-safe diagnostics discovery fields from `public.diagnostic_providers`.

Recommended detail select fields:

- `id`
- `slug`
- `display_name`
- `diagnostic_provider_type`
- `category`
- `description`
- `city`
- `area`
- `address_public`
- `landmark_public`
- `services_public`
- `sample_collection_modes`
- `opening_hours_public`
- `result_turnaround_public`
- `appointment_required_preview`
- `walk_in_available`
- `home_sample_collection_preview`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

Do not select or expose:

- patient names or patient identifiers
- lab results
- diagnostic reports
- uploaded files
- sample tracking records
- test orders
- payment records
- patient addresses
- private contact details
- staff personal numbers
- admin notes
- reviewer notes
- verification documents or evidence
- service-role data
- Supabase URLs, anon keys, environment values, or secrets

`created_at` and `updated_at` should stay excluded for the first diagnostics detail helper unless a later QA task explicitly decides the UI needs public operational freshness beyond `last_confirmed_at`.

---

## Slug-Based Read Behavior

The future helper should accept a single slug string:

```ts
getSupabasePublicDiagnosticDetailBySlug(slug: string)
```

Required slug behavior:

- trim the input slug
- treat an empty slug as invalid
- query by `slug = requestedSlug`
- use `.limit(1)` plus `maybeSingle()` or the existing project-equivalent pattern
- return `not-found` for no matching active/public row
- never throw raw Supabase errors to the route or UI

Do not query diagnostics detail by id for the first implementation.

Reasons:

- Detail pages should use stable public slugs.
- `slug` is the user-facing route identifier.
- The diagnostics listing cards already carry `slug`.
- Existing detail routes use slug-based reads.

---

## Active/Public Filtering

The future helper must filter by all of:

```text
slug = requested slug
listing_status = active
visibility_status = public
```

This app-side filter is required even though RLS also enforces the same public boundary.

Expected blocked behavior:

- pending rows must not render detail pages
- hidden rows must not render detail pages
- draft, rejected, archived, suspended, and internal rows must not render detail pages if added later

Verification status must not make a row public by itself.

---

## Detail Mapping Plan

The future helper should map the Supabase row into `PublicProviderDetail`.

Recommended mapping:

- `id` -> `id`
- `slug` -> normalized public slug
- `display_name` -> `name`
- `providerType` -> `diagnostics`
- `diagnostic_provider_type` or `category` -> `categoryLabel`
- `description` -> `summary` and `description`
- `city` and `area` -> `locationLabel` and `location`
- `address_public` and `landmark_public` -> `address`
- `services_public` -> `services`
- `sample_collection_modes` -> availability/sample collection preview
- `opening_hours_public` -> `hoursPreview` and `workingHours`
- `result_turnaround_public` -> general public turnaround preview only
- `appointment_required_preview` -> public appointment preview label only
- `walk_in_available` -> public walk-in preview label only
- `home_sample_collection_preview` -> public home sample collection preview label only
- `verification_status` -> `verificationStatus`
- `last_confirmed_at` -> public freshness preview only
- `contactChannels` -> `[]` for Task 162
- `relatedProviderIds` -> `[]`
- `correctionHref` -> `/corrections?listing=${slug}`

The mapper should reuse existing public-listing mapper helpers where practical.

The existing `PublicDiagnosticsType` remains narrower than SQL provider types, so richer SQL values should be normalized safely:

- `laboratory` and `pathology_service` -> `laboratory`
- `imaging_center` and `radiology_center` -> `imaging`
- mixed, facility department, home sample collection, or unknown future values -> `mixed`

---

## Fallback Behavior

If Supabase env is missing, the public client is unavailable, or the query fails:

- the helper should return a safe `unavailable` or `error` result
- no raw Supabase errors should be exposed
- no URLs, anon keys, env values, or secrets should be exposed
- the route should not crash

Static fallback behavior:

- If a matching static diagnostics provider exists in current seed data, the route may render a safe fallback detail in a later route task.
- If no matching static diagnostics provider exists, the route should use safe not-found behavior.
- The helper itself may return `detail: null` for unavailable/error states and leave fallback rendering decisions to the route, matching existing pharmacy detail posture.

For Task 162, the recommended helper behavior is:

- `success`: return Supabase `PublicProviderDetail`
- `not-found`: return `detail: null`
- `unavailable`: return `detail: null`
- `error`: return `detail: null`

The route implementation can decide fallback rendering in a later task.

---

## Not-Found Behavior

The future helper or route should return safe not-found behavior for:

- missing slug
- empty slug
- invalid slug
- unknown slug
- pending diagnostics row
- hidden diagnostics row
- draft diagnostics row
- rejected diagnostics row
- archived diagnostics row
- suspended diagnostics row
- internal diagnostics row
- Supabase unavailable and no matching static fallback
- safe query error and no matching static fallback

Blocked rows should not reveal that a non-public diagnostics provider exists.

---

## Error Handling Behavior

The future helper should classify errors with safe codes similar to the diagnostics list helper:

- `DIAGNOSTICS_DETAIL_PUBLIC_READ_FAILED`
- `DIAGNOSTICS_DETAIL_NETWORK_OR_FETCH_FAILED`
- `DIAGNOSTICS_DETAIL_PERMISSION_DENIED`
- `DIAGNOSTICS_DETAIL_SCHEMA_UNAVAILABLE`
- `DIAGNOSTICS_DETAIL_COLUMN_MISMATCH`

Safe output may include:

- helper status
- source
- fallback recommendation
- safe reason
- safe error code

Safe output must not include:

- raw Supabase error object
- stack trace
- Supabase URL
- anon key
- environment variable values
- service-role key
- connection string
- private/internal fields

---

## Expected Public Test Slugs

Future detail read should be able to return these active/public diagnostics slugs when Supabase runtime access succeeds:

```text
test-diagnostic-alpha-lab
test-diagnostic-eta-imaging
test-diagnostic-zeta-radiology
test-diagnostic-omega-pathology
test-diagnostic-kappa-mixed
test-diagnostic-lambda-home-sample
```

Each should return a safe diagnostics `PublicProviderDetail`.

---

## Expected Blocked Test Slugs

Future detail read should not return public details for:

```text
test-diagnostic-beta-pending
test-diagnostic-delta-hidden
```

Expected behavior:

- no detail display
- no indication that a blocked row exists
- safe `not-found`, `unavailable`, or route-level 404 behavior

---

## Validation Plan For Task 162

Task 162 should implement the diagnostics detail read helper only.

Recommended validation commands for Task 162:

```bash
npm.cmd run lint
npm.cmd run build
```

If Task 162 also adds a helper-only probe script, run:

```bash
npm.cmd run probe:diagnostics-detail
```

Recommended helper validation cases:

- valid active/public slug returns `success`
- all six expected public slugs can return `success` when Supabase runtime access succeeds
- pending slug returns `not-found` or safe unavailable behavior
- hidden slug returns `not-found` or safe unavailable behavior
- unknown slug returns `not-found`
- empty slug returns `unavailable` or `not-found`
- missing env returns `unavailable`
- query failure returns safe `error`
- no raw errors, env values, URLs, anon keys, or secrets are printed or exposed

Known limitation to carry forward:

```text
Task 160 recorded that local/Codex diagnostics runtime probing still returned DIAGNOSTICS_PUBLIC_READ_FAILED for the list helper.
```

Task 162 should report whether the same runtime limitation affects detail-helper validation.

---

## Scope Boundaries

Task 161 does not implement:

- diagnostics detail helper
- diagnostics detail route
- diagnostics detail runtime probe
- diagnostics contact channels
- diagnostics page changes
- SQL changes
- RLS changes
- schema changes
- migration changes
- pharmacy behavior changes
- doctors behavior changes
- facilities behavior changes
- UI redesign
- brand/logo/color changes
- real data imports

Task 161 does not create Task 162 as a file.

---

## Readiness

```text
Ready for Task 162 - Diagnostics Detail Read Helper Implementation.
```

Recommended Task 162 objective:

```text
Implement getSupabasePublicDiagnosticDetailBySlug in the diagnostics public read helper file, reading one active/public diagnostics provider by slug from public.diagnostic_providers, selecting public-safe fields only, returning PublicProviderDetail on success, returning safe not-found/unavailable/error results otherwise, and preserving all public-safety boundaries.
```

---

## Planning Status

```text
Planning complete
```

The future diagnostics detail route path, helper file, helper name, public-safe field boundary, slug-based read behavior, active/public filtering, fallback behavior, not-found behavior, error handling behavior, expected public and blocked test slugs, validation plan, and Task 162 readiness are defined.
