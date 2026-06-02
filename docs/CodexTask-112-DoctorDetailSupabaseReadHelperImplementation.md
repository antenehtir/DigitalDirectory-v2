# Codex Task 112: Doctor Detail Supabase Read Helper Implementation

## Goal

Implement a safe Supabase public doctor detail read helper by slug.

Do not wire the doctor detail page yet.

## Context

Read:

- docs/DoctorDetailReadPlanning.md
- docs/DoctorsPageSupabaseWiringQARecord.md
- docs/DoctorsPublicReadHelperSafeErrorDiagnosis.md
- docs/CodexTask-111-DoctorDetailReadPlanning.md

Inspect:

- src/lib/supabase/doctors-public-read.ts
- src/lib/supabase/public-client.ts
- src/types/public-listings.ts
- src/lib/public-listing-mappers.ts
- supabase/migrations_draft/004_create_doctors_table.sql
- supabase/migrations_draft/005_doctors_rls_policy.sql

## Implement

Add a helper such as:

```ts
getSupabasePublicDoctorDetailBySlug(slug: string)