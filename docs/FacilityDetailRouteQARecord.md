# DigitalDirectory-v2 Facility Detail Route QA Record

## Scope

This document records the Task 98 QA result for the public facility detail route created in Task 97.

This is documentation-only. It does not modify app code, frontend UI, SQL/RLS/test data, authentication, backend functionality, protected routes, search, nearby, doctors, pharmacies, diagnostics, or service-role key usage.

No real Supabase URL, anon key, service-role key, or `.env.local` value is recorded here.

## Files Reviewed

Documentation reviewed:

- `docs/CodexTask-98-FacilityDetailRouteQARecord.md`
- `docs/FacilityDetailReadPlanning.md`
- `docs/FacilityDetailHelperSafeErrorDiagnosis.md`
- `docs/FacilitiesSupabasePreviewStabilizationQA.md`

Implementation files reviewed:

- `src/app/facilities/[slug]/page.tsx`
- `src/components/facility-detail/FacilityDetailPage.tsx`
- `src/lib/supabase/facilities-public-read.ts`
- `src/app/facilities/page.tsx`

## Route Path Created

The dynamic facility detail route exists at:

```text
/facilities/[slug]
```

Implementation file:

```text
src/app/facilities/[slug]/page.tsx
```

## Helper Used

The dynamic route uses:

```text
getSupabasePublicFacilityDetailBySlug
```

Helper file:

```text
src/lib/supabase/facilities-public-read.ts
```

The helper reads only public-safe fields from `public.facilities`, filters active/public rows, and returns safe states without raw Supabase error exposure.

## Positive Route QA Result

Confirmed manual QA recorded in the Task 98 instruction:

- `/facilities/test-facility-alpha` loaded.
- `/facilities/test-facility-eta-minimal` loaded.
- `/facilities/test-facility-zeta-disputed` loaded.

These routes represent active/public Supabase facility rows.

## Blocked Route QA Result

Confirmed manual QA recorded in the Task 98 instruction:

- `/facilities/test-facility-beta-pending` returned `404`.

This matches the active/public public-read rule. Pending rows should not render as public detail pages.

## Facilities List QA Result

Confirmed manual QA recorded in the Task 98 instruction:

- `/facilities` still showed Supabase active/public rows.

This keeps the list page aligned with the existing controlled Supabase facilities preview behavior.

## Error Visibility Findings

No raw Supabase errors are expected to be visible on the facility detail route.

Route behavior:

- `success` renders the detail page.
- Any non-success helper state routes to `notFound()`.
- Raw helper errors, database messages, policy details, URLs, and stack traces are not rendered.

## Public Field Safety Findings

The detail helper selects only public-safe fields:

- `id`
- `slug`
- `display_name`
- `facility_type`
- `category`
- `description`
- `city`
- `area`
- `address_public`
- `landmark_public`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

No private/internal fields are selected or displayed.

Not selected:

- Private provider phone numbers
- Private provider emails
- Admin notes
- Reviewer notes
- Verification evidence
- Provider owner account IDs
- Patient data
- Booking data
- Payment or wallet data
- Document vault data

## Service Role Safety

No service-role key is used by the facility detail route or helper.

The public read path uses only the public anon client setup and public environment variable names.

## Route Isolation Findings

No wiring changes were made to:

- Search
- Nearby
- Doctors
- Pharmacies
- Diagnostics

The facility detail route is isolated to facilities.

## Remaining Limitation

Only facilities have backend-backed public detail pages at this stage.

Doctor, pharmacy, diagnostics, search, and nearby pages remain on their existing frontend/static behavior and are not wired to backend detail reads.

## Lint And Build Results

Commands run after creating this QA record:

```text
npm.cmd run lint
npm.cmd run build
```

Results:

- `npm.cmd run lint` passed.
- `npm.cmd run build` passed.
- Build used Next.js `16.2.6`.
- Build detected `.env.local`.
- Build output showed `/facilities/[slug]` as dynamic.

## Recommended Next Steps

1. Keep facility detail backend reads limited to `/facilities/[slug]`.
2. Keep blocked and unknown slugs returning not-found.
3. Continue avoiding raw Supabase error exposure.
4. Do not expand backend detail reads to doctors, pharmacies, diagnostics, search, or nearby until separately planned.
5. Add a later QA record when additional blocked slugs are manually verified.

## Summary

Task 98 records that `/facilities/[slug]` uses the safe Supabase facility detail helper, positive active/public facility routes loaded, the pending blocked route returned `404`, `/facilities` continued showing active/public Supabase rows, no raw Supabase errors or private/internal fields were shown, no service-role key was used, and other public route wiring remains unchanged.
