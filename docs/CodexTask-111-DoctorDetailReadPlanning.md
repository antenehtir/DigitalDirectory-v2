# Codex Task 111: Doctor Detail Read Planning

## Goal

Create a documentation-only plan for safely adding Supabase-backed doctor detail reads by slug.

Do not implement doctor detail reads yet.

## Context

Read:

- docs/DoctorsPageSupabaseWiringQARecord.md
- docs/DoctorsPublicReadHelperQA.md
- docs/DoctorsPublicReadHelperSafeErrorDiagnosis.md
- docs/DoctorsSchemaSQLPlanning.md
- docs/FacilityDetailReadPlanning.md
- docs/FacilityDetailRouteQARecord.md

Inspect:

- src/app/doctors
- src/components/doctors/DoctorsPage.tsx
- src/lib/supabase/doctors-public-read.ts
- src/types/public-listings.ts
- supabase/migrations_draft/004_create_doctors_table.sql
- supabase/migrations_draft/005_doctors_rls_policy.sql

## Create

Create:

```text
docs/DoctorDetailReadPlanning.md