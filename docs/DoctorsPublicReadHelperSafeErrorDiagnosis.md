# DigitalDirectory-v2 Doctors Public Read Helper Safe Error Diagnosis

## Scope

This document records the Task 108 diagnosis for why `getSupabasePublicDoctorCards()` returned a safe `helper-error` state in the internal doctors runtime probe.

This task did not wire `/doctors`, modify public UI, add SQL, add RLS, insert test data, add authentication, add backend functionality, add protected routes, use a service-role key, expose environment values, expose keys, expose raw Supabase errors, or commit changes.

## Files Reviewed

Documentation reviewed:

- `docs/DoctorsPublicReadHelperQA.md`
- `docs/DoctorsSQLManualExecutionQARecord.md`
- `docs/CodexTask-105-DoctorsPublicReadHelperImplementation.md`
- `docs/CodexTask-107-DoctorsPublicReadRuntimeProbe.md`
- `docs/CodexTask-108-DoctorsPublicReadHelperSafeErrorDiagnosis.md`

Implementation reviewed:

- `src/app/internal/doctors-public-read-probe/page.tsx`
- `src/lib/supabase/doctors-public-read.ts`
- `src/lib/supabase/public-client.ts`
- `src/lib/public-listing-mappers.ts`
- `src/types/public-listings.ts`
- `supabase/migrations_draft/004_create_doctors_table.sql`

## SQL Draft Comparison

The doctors helper select list was compared with the `public.doctors` SQL draft.

Selected fields:

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

All selected fields exist in `supabase/migrations_draft/004_create_doctors_table.sql`.

## Array Field Findings

The SQL draft defines:

- `consultation_modes text[] not null default '{}'`
- `languages text[] not null default '{}'`

The helper expects both fields as public string arrays. No mismatch was found in the planned field shape.

## Mapper Findings

The doctors mapper maps rows into `PublicProviderCard`.

Findings:

- It does not require facility-only fields.
- `facility_name_public` is optional and maps to `affiliations`.
- `specialty` and `subspecialty` map to public specialty labels.
- `consultation_modes` maps to public availability and telemedicine preview labels.
- Missing optional fields use safe fallback text.

No mapper defect was found during static review.

## Runtime Diagnosis

The existing internal probe route was used:

```text
/internal/doctors-public-read-probe
```

Before the safe category fix, the probe showed:

```text
status = error
safe category = helper-error
public doctor count = 0
```

A temporary local anon-client diagnostic checked public reads without printing environment values, keys, raw database messages, URLs, stack traces, or row data.

Safe diagnostic result:

- Minimal doctors select failed with a safe network/fetch category.
- Full doctors helper select failed with the same safe network/fetch category.
- A minimal facilities select also failed with the same safe network/fetch category in the current local runtime.

This points away from a doctors column mismatch, array-field mismatch, or mapper issue. The current local runtime could not complete the anon Supabase fetch path.

## Root Cause Found

Root cause for the current runtime probe result:

```text
network-or-fetch-failure
```

The failure is not currently traced to the doctors helper select fields or the doctor card mapper.

## Fix Implemented

The doctors public read helper now maps query failures into safe error codes without exposing raw Supabase errors.

Added safe codes:

- `DOCTORS_PUBLIC_NETWORK_OR_FETCH_FAILED`
- `DOCTORS_PUBLIC_PERMISSION_DENIED`
- `DOCTORS_PUBLIC_SCHEMA_UNAVAILABLE`
- `DOCTORS_PUBLIC_COLUMN_MISMATCH`
- `DOCTORS_PUBLIC_READ_FAILED`

The internal doctors probe now converts those safe codes into safe categories:

- `network-or-fetch-failure`
- `permission-denied`
- `schema-unavailable`
- `column-mismatch`
- `helper-error`

No raw Supabase error body is rendered.

## Probe Result After Fix

Local probe URL:

```text
http://localhost:3000/internal/doctors-public-read-probe
```

Observed safe result:

```text
status = error
safe category = network-or-fetch-failure
public doctor count = 0
```

Expected doctors did not appear in this runtime pass:

- Test Doctor Alpha
- Test Doctor Eta Minimal
- Test Doctor Zeta Disputed

Blocked doctors did not appear:

- Test Doctor Beta Pending
- Test Doctor Gamma Archived
- Test Doctor Delta Hidden
- Test Doctor Epsilon Internal

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
- The probe route remains dynamic.

## Safety Confirmation

Confirmed:

- No service-role key is used.
- No environment values are printed.
- No keys are printed.
- No raw Supabase errors are rendered in the app.
- No public `/doctors` wiring was added.
- No public UI was modified.
- No SQL, RLS, or test data was added.

## Remaining Issues

The internal runtime probe still does not return the expected public doctors because the current local runtime reports a safe network/fetch failure.

This may be caused by local network availability, runtime fetch access, or external Supabase connectivity in the current environment. It is not currently explained by the doctors SQL draft, selected fields, array fields, or mapper shape.

## Recommended Next Steps

1. Keep `/doctors` unwired.
2. Re-run the internal probe in an environment with confirmed Supabase network access.
3. If the safe category changes to `permission-denied`, review the anon grant and RLS policy.
4. If the safe category changes to `schema-unavailable`, refresh/review the Supabase schema/table setup.
5. If the safe category changes to `column-mismatch`, compare the live table columns against `004_create_doctors_table.sql`.
6. Wire `/doctors` only after the probe returns `success` with the three expected active/public doctors.
