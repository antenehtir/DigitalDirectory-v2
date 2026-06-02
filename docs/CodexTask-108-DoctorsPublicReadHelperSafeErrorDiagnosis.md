# Codex Task 108: Doctors Public Read Helper Safe Error Diagnosis

## Goal

Diagnose why `getSupabasePublicDoctorCards()` returns safe `helper-error` in the internal doctors runtime probe.

Do not wire `/doctors` yet.

## Context

Read:

- docs/DoctorsPublicReadHelperQA.md
- docs/DoctorsSQLManualExecutionQARecord.md
- docs/CodexTask-105-DoctorsPublicReadHelperImplementation.md
- docs/CodexTask-107-DoctorsPublicReadRuntimeProbe.md

Inspect:

- src/app/internal/doctors-public-read-probe/page.tsx
- src/lib/supabase/doctors-public-read.ts
- src/lib/supabase/public-client.ts
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- supabase/migrations_draft/004_create_doctors_table.sql

## Investigate

Compare the doctors helper select fields with the actual `public.doctors` SQL draft.

Check:

- selected columns exist in `public.doctors`
- array fields `consultation_modes` and `languages`
- mapper expectations
- return shape
- safe error handling
- whether the helper is hiding a useful safe error category
- whether the doctor card mapper expects facility-specific fields

## Allowed Fix

A small safe fix is allowed if obvious.

Examples:

- remove non-existent selected column
- align selected fields with actual doctors table
- fix doctor row mapper
- add safe error code/category without exposing raw secrets
- adjust return shape

## Safety Rules

Do not:

- expose env values
- expose keys
- use service role key
- add SQL/RLS/test data
- modify public UI
- wire `/doctors`
- add auth/backend/protected routes

## QA

Use the existing probe:

```text
/internal/doctors-public-read-probe