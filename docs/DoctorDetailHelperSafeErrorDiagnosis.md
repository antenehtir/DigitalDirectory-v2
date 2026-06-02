# DigitalDirectory-v2 Doctor Detail Helper Safe Error Diagnosis

## Scope

This document records the Task 114 diagnosis for why `getSupabasePublicDoctorDetailBySlug()` returned safe `error` states for all slugs in the internal doctor detail runtime probe.

This task did not wire `/doctors/[slug]`, modify public UI, add SQL, add RLS, insert test data, add authentication, add backend functionality, add protected routes, use a service-role key, expose environment values, expose keys, expose raw Supabase errors, or commit changes.

## Files Reviewed

Documentation reviewed:

- `docs/DoctorDetailReadPlanning.md`
- `docs/DoctorsPageSupabaseWiringQARecord.md`
- `docs/CodexTask-112-DoctorDetailSupabaseReadHelperImplementation.md`
- `docs/CodexTask-113-DoctorDetailRuntimeProbe.md`
- `docs/CodexTask-114-DoctorDetailHelperSafeErrorDiagnosis.md`

Implementation reviewed:

- `src/app/internal/doctor-detail-probe/page.tsx`
- `src/lib/supabase/doctors-public-read.ts`
- `src/lib/supabase/public-client.ts`
- `src/lib/public-listing-mappers.ts`
- `src/types/public-listings.ts`
- `supabase/migrations_draft/004_create_doctors_table.sql`
- `supabase/migrations_draft/006_doctors_test_data.sql`

## List Helper Comparison

The working list helper and the detail helper use the same public anon client path:

```text
getSupabasePublicClientStatus()
getSupabasePublicClient()
```

Both helpers query only:

```text
public.doctors
```

Both helpers select the same public-safe fields:

- `id`
- `slug`
- `display_name`
- `title`
- `specialty`
- `subspecialty`
- `bio_public`
- `facility_name_public`
- `city`
- `area`
- `consultation_modes`
- `languages`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

The selected fields match `supabase/migrations_draft/004_create_doctors_table.sql`.

## Slug Findings

The expected probe slugs match the doctors test data draft:

Active/public slugs:

- `test-doctor-alpha`
- `test-doctor-eta-minimal`
- `test-doctor-zeta-disputed`

Blocked slugs:

- `test-doctor-beta-pending`
- `test-doctor-gamma-archived`
- `test-doctor-delta-hidden`
- `test-doctor-epsilon-internal`

Unknown slug:

- `non-existent-doctor-slug`

No slug mismatch was found in the draft files.

## Mapper Findings

The doctor detail mapper reuses the card mapper and then adds the `PublicProviderDetail` fields:

- `description`
- `location`
- `contactChannels`
- `workingHours`
- `verification`
- `relatedProviderIds`
- `correctionHref`

These are created from public-safe values or safe fallbacks. The mapper does not require private doctor fields, private contact fields, license documents, patient data, booking data, payment data, reviews, ratings, or admin notes.

No `PublicProviderDetail` field requirement was found that would require private or unavailable row data.

## Root Cause Found

The key implementation difference was the detail helper's singular response path:

```text
maybeSingle()
```

The doctors list helper uses the standard array response path. To match the working list-row pattern and reduce singular-response risk, the detail helper should use a list-style query with:

```text
limit(1)
```

and then manually treat an empty result array as safe `not-found`.

## Fix Implemented

The detail helper now:

1. Queries with the same selected public-safe fields.
2. Filters by `slug`.
3. Filters by `listing_status = active`.
4. Filters by `visibility_status = public`.
5. Uses `.limit(1)` without `maybeSingle()`.
6. Reads the first row from the returned array.
7. Returns safe `not-found` when the returned array is empty.
8. Maps the row into `PublicProviderDetail` only after a row exists.

This preserves blocked and unknown slug behavior while aligning the detail helper with the working list helper's response pattern.

## Probe Result After Fix

Local probe URL:

```text
http://localhost:3000/internal/doctor-detail-probe
```

The route was reachable and rendered safe probe output.

Observed local runtime result:

- Positive slugs were displayed in the probe table but returned safe `error` states.
- Blocked slugs were displayed in the probe table but returned safe `error` states.
- Unknown slug was displayed in the probe table but returned a safe `error` state.
- No raw Supabase errors were visible.
- No environment values were visible.
- No keys were visible.
- No service-role key was used.

The local runner still did not show the expected success/not-found split during this task. This appears to be a local runtime read issue, not a selected-column, slug, mapper, or detail-shape mismatch.

## Expected Result In A Healthy Runtime

After the array-response fix, the expected result remains:

Positive slugs:

- `test-doctor-alpha` = `success`
- `test-doctor-eta-minimal` = `success`
- `test-doctor-zeta-disputed` = `success`

Blocked slugs:

- `test-doctor-beta-pending` = `not-found`
- `test-doctor-gamma-archived` = `not-found`
- `test-doctor-delta-hidden` = `not-found`
- `test-doctor-epsilon-internal` = `not-found`

Unknown slug:

- `non-existent-doctor-slug` = `not-found`

## Checks Run

Commands run:

```text
npm.cmd run lint
npm.cmd run build
```

Results:

- `npm.cmd run lint` passed.
- `npm.cmd run build` passed.
- Build used Next.js `16.2.6`.
- Build detected `.env.local`.
- The internal doctor detail probe route remains dynamic.

## Safety Confirmation

Confirmed:

- No raw Supabase errors are rendered.
- No environment values are rendered.
- No keys are rendered.
- No service-role key is used.
- No `/doctors/[slug]` route was wired.
- No public UI was modified.
- No SQL, RLS, or test data was added.
- No authentication, backend functionality, or protected routes were added.

## Remaining Issues

The current local runtime probe still returns safe `error` states for all doctor detail slugs. The code-level mismatch with the list helper was corrected, but local runtime verification did not yet produce the expected success/not-found split.

Recommended next step:

```text
Re-run /internal/doctor-detail-probe in the same environment where /doctors successfully displays the three Supabase-backed doctors.
```

If the probe still returns safe errors in that environment, the next diagnosis should compare the exact safe category displayed by the probe and verify whether the live `public.doctors` table has the expected slug values and anon select behavior.
