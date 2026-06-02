# DigitalDirectory-v2 Doctors Page Supabase Wiring QA Record

## Purpose

This document records the Task 110 QA result for the controlled `/doctors` page wiring.

This is documentation-only. No app code, UI, SQL, RLS, test data, doctor detail routes, search, nearby, pharmacies, diagnostics, authentication, backend functionality, protected routes, service-role keys, environment values, keys, or commits were added in this task.

## Files Reviewed

Documentation reviewed:

- `docs/CodexTask-110-DoctorsPageSupabaseWiringQARecord.md`
- `docs/DoctorsPublicReadHelperQA.md`
- `docs/DoctorsPublicReadHelperSafeErrorDiagnosis.md`
- `docs/DoctorsSQLManualExecutionQARecord.md`

Implementation reviewed:

- `src/app/doctors/page.tsx`
- `src/components/doctors/DoctorsPage.tsx`
- `src/lib/supabase/doctors-public-read.ts`

## Page Wiring Confirmation

The `/doctors` route now uses:

```text
getSupabasePublicDoctorCards()
```

The route requests public doctor cards, maps successful Supabase results into the existing `DoctorCardGrid` doctor shape, and passes the resulting doctors into `DoctorsPage`.

The reusable `DoctorsPage` component accepts an optional `doctors` prop and falls back to the existing sample doctors when no prop is provided.

## Confirmed Public Doctors Displayed

Confirmed manual QA result:

- Dr. Test Doctor Alpha
- Test Doctor Eta Minimal
- Dr. Test Doctor Zeta Disputed

These are the expected active/public doctors from the Supabase public doctors read path.

## Blocked Doctors Hidden

Confirmed blocked doctors did not appear:

- Test Doctor Beta Pending
- Test Doctor Gamma Archived
- Test Doctor Delta Hidden
- Test Doctor Epsilon Internal

This matches the intended public read boundary:

```text
listing_status = active
visibility_status = public
```

## Fallback Confirmation

Fallback remains available.

If Supabase is unavailable, returns a safe error, or returns an empty card list, `/doctors` falls back to the existing sample doctor data.

## Error And Secret Safety

Confirmed:

- No raw Supabase errors were visible.
- No environment values were visible.
- No keys were visible.
- No service-role key was used.
- The helper uses the public anon Supabase client path only.

## Route Isolation

Confirmed unchanged:

- No doctor detail route was wired yet.
- Search was not modified.
- Nearby was not modified.
- Pharmacies were not modified.
- Diagnostics were not modified.
- Facilities were not modified in this task.

## Checks

Task 109 ran:

```text
npm.cmd run lint
npm.cmd run build
```

Confirmed result:

- Lint passed.
- Build passed.
- `/doctors` was reported as a dynamic route after wiring.

## Remaining Limitations

Only the `/doctors` list page has controlled Supabase public-read wiring.

Still not implemented:

- Dynamic doctor detail read routes.
- Doctor detail Supabase helper.
- Search, nearby, pharmacies, or diagnostics Supabase wiring.
- Provider ownership, booking, review, payment, or admin workflows.

## Recommended Next Task

Recommended next task:

```text
Doctor Detail Read Planning
```

Alternative next task:

```text
Provider Contact Channels Schema Planning
```

## Summary

The `/doctors` page is wired to `getSupabasePublicDoctorCards()`, displays the expected three active/public test doctors, keeps blocked doctors hidden, preserves sample fallback behavior, avoids raw Supabase error exposure, uses no service-role key, does not wire doctor detail routes, and leaves search, nearby, pharmacies, and diagnostics unchanged.
