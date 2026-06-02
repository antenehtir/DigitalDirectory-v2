# Codex Task 106: Doctors Public Read Helper QA

## Goal

QA the doctors public read helper before wiring the doctors page.

## Context

Read:

- docs/DoctorsSQLManualExecutionQARecord.md
- docs/DoctorsSchemaSQLPlanning.md
- docs/CodexTask-105-DoctorsPublicReadHelperImplementation.md

Inspect:

- src/lib/supabase/doctors-public-read.ts
- src/lib/supabase/public-client.ts
- src/types/public-listings.ts

## QA

Confirm the helper:

- exists as getSupabasePublicDoctorCards
- uses public anon Supabase client only
- queries only public.doctors
- selects public-safe fields only
- filters listing_status = active
- filters visibility_status = public
- returns safe states
- does not expose raw Supabase errors
- is not wired into doctors page yet

If safe, create a temporary internal probe or local runtime check to confirm:

Expected active/public doctors:

- Test Doctor Alpha
- Test Doctor Eta Minimal
- Test Doctor Zeta Disputed

Blocked doctors must not appear:

- Test Doctor Beta Pending
- Test Doctor Gamma Archived
- Test Doctor Delta Hidden
- Test Doctor Epsilon Internal

Create:

```text
docs/DoctorsPublicReadHelperQA.md