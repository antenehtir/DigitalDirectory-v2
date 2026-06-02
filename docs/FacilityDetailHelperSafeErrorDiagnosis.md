# DigitalDirectory-v2 Facility Detail Helper Safe Error Diagnosis

## Scope

This document records the Task 96 diagnosis for why the internal facility detail runtime probe showed safe `error` for every slug.

This task did not wire public facility detail pages, modify public UI design, add authentication, add backend functionality, add protected routes, add SQL/RLS/test data, use a service-role key, expose environment values, expose keys, or commit changes.

## Files Reviewed

Documentation reviewed:

- `docs/FacilityDetailReadPlanning.md`
- `docs/FacilityDetailReadHelperQA.md`
- `docs/FacilityDetailHelperLiveReadInvestigation.md`
- `docs/CodexTask-95-FacilityDetailRuntimeProbe.md`
- `docs/CodexTask-96-FacilityDetailHelperSafeErrorDiagnosis.md`

Implementation files reviewed:

- `src/app/internal/facility-detail-probe/page.tsx`
- `src/lib/supabase/facilities-public-read.ts`
- `src/lib/supabase/public-client.ts`
- `src/lib/public-listing-mappers.ts`
- `src/types/public-listings.ts`
- `supabase/migrations_draft/001_create_facilities_table.sql`

## List Helper And Detail Helper Comparison

The list helper and detail helper both use the shared public facilities select list:

```text
id
slug
display_name
facility_type
category
description
city
area
address_public
landmark_public
listing_status
visibility_status
verification_status
last_confirmed_at
```

The SQL draft includes each selected column in `public.facilities`.

No non-existent selected column was found.

## Detail Helper Query Findings

The detail helper:

- Uses the public anon Supabase client path.
- Queries only `facilities`.
- Selects only public-safe fields.
- Filters by the requested slug.
- Filters `listing_status = "active"`.
- Filters `visibility_status = "public"`.
- Uses `.maybeSingle()`.
- Returns safe states only.

No `.single()` issue was found. No service-role key use was found.

## Mapper And Type Findings

The detail mapper builds `PublicProviderDetail` only from the selected public row fields and safe defaults:

- Card fields are created from the same mapper path used by public cards.
- Location is built from public city/area text.
- Address is built from `address_public` and `landmark_public`.
- Contact channels remain empty because public contact-channel tables are not implemented yet.
- Working hours use the safe default `Hours not listed`.
- Verification uses a public note and the public verification status.

No `PublicProviderDetail` requirement was found that depends on a missing Supabase column.

## Root Cause Found

The concrete issue found was in the internal probe route, not in the detail helper query or mapper.

The probe previously:

- Ran detail checks one after another.
- Used a 4-second timeout per slug.
- Returned plain `status: "error"` for timeout fallback.
- Displayed timeout fallback and helper query errors with the same safe status.
- Did not compare the detail helper with the known list helper in the same route.

That meant the internal page could show `error` for every slug without distinguishing:

- Probe timeout.
- Helper-level query error.
- Missing environment.
- Successful empty result.
- Detail-helper-specific failure.

The safe error handling in the helper remains appropriate for public-facing code, but the internal probe needed a developer-safe category to make diagnosis possible without exposing raw Supabase errors.

## Fix Implemented

Updated:

```text
src/app/internal/facility-detail-probe/page.tsx
```

Changes:

- Added a list-helper baseline using `getSupabasePublicFacilityCards()`.
- Kept the detail probe on `getSupabasePublicFacilityDetailBySlug()`.
- Ran detail slug checks concurrently instead of serially.
- Increased the internal probe timeout from 4 seconds to 12 seconds.
- Added safe categories:
  - `success`
  - `not-found`
  - `unavailable`
  - `helper-error`
  - `probe-timeout`
- Kept displayed output limited to safe statuses, safe categories, public display names, and row counts.
- Continued to hide raw Supabase errors, URLs, keys, stack traces, and private fields.

No Supabase helper code was changed because no selected-field, `.maybeSingle()`, mapper, return-shape, or public-client bug was found during static review.

## Probe Result After Fix

Local server-route probing could not be completed cleanly in this runner.

Attempts:

- `npm.cmd run dev` was started for local runtime QA, but the command timed out before returning a clean probe report.
- `npm.cmd run start` was also tried after a successful production build, but that command also timed out before returning a clean probe report.

Safety checks after both attempts:

- No listener remained on port `3000`.
- No lingering `node` process was found.
- No environment values or keys were printed.
- No raw Supabase errors were exposed.

Because the server probe did not complete, this task cannot honestly claim confirmed success/not-found results for the probe route after the diagnostic update.

## Expected Probe Outcomes

When the local server path is stable, expected detail outcomes remain:

Positive active/public slugs:

- `test-facility-alpha` = `success`
- `test-facility-eta-minimal` = `success`
- `test-facility-zeta-disputed` = `success`

Blocked slugs:

- `test-facility-beta-pending` = `not-found`
- `test-facility-gamma-archived` = `not-found`
- `test-facility-delta-hidden` = `not-found`
- `test-facility-epsilon-internal` = `not-found`

Unknown slug:

- `non-existent-facility-slug` = `not-found`

The updated probe should now reveal whether a failure is `helper-error` or `probe-timeout`.

## Checks Run

Commands run:

```text
npm.cmd run lint
npm.cmd run build
```

Results:

- `npm.cmd run lint` passed.
- Initial `npm.cmd run build` failed because a stale generated `.next/dev/types/validator.ts` artifact contained a broken fragment from a previous interrupted dev run.
- The generated dev validator artifact was removed.
- `npm.cmd run build` passed after Next regenerated clean build state.
- Build used Next.js `16.2.6`.
- Build detected `.env.local`.
- Build kept `/facilities` dynamic.
- Build kept `/internal/facility-detail-probe` dynamic.

## Safety Confirmation

Confirmed:

- No public detail route was wired.
- Public `/facilities/addis-health-center` behavior was not changed.
- No search, nearby, doctors, pharmacies, or diagnostics route wiring was added.
- No auth, backend, protected route, SQL, RLS, test data, patient data, booking, payment, document, or admin workflow was added.
- No service-role key is used or referenced.
- No real environment values or keys were recorded.

## Remaining Issues

Remaining issue:

- The local server probe commands timed out in this runner, so live runtime result confirmation is still pending.

This does not indicate a confirmed detail helper bug. Static review found the helper aligned with the working list helper and table schema.

## Recommended Next Steps

1. Keep the detail helper unwired.
2. Re-run `/internal/facility-detail-probe` in a stable local browser session.
3. Use the new safe category column to distinguish `probe-timeout` from `helper-error`.
4. Confirm list-helper baseline succeeds in the same internal route.
5. Confirm positive slugs return `success`.
6. Confirm blocked and unknown slugs return `not-found`.
7. If the list baseline succeeds but detail rows still show `helper-error`, investigate the detail query path next.
8. If both list and detail show `probe-timeout`, treat it as local runtime/network instability before changing helper code.
9. Only wire public facility detail pages after the internal probe confirms expected results.

## Summary

The selected columns, table schema, `.maybeSingle()` usage, mapper shape, return shape, and public anon client path all look correct.

The root cause found in this pass was that the internal probe flattened timeout fallback and helper errors into the same `error` label. The probe now records a safe category and list-helper baseline so future runtime QA can identify the actual failure mode without exposing secrets or raw Supabase errors.
