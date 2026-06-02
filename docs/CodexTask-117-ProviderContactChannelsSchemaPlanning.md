# Codex Task 117: Provider Contact Channels Schema Planning

## Goal

Plan a safe public contact channels schema that can later support facilities, doctors, pharmacies, diagnostics, and other provider types.

This is documentation-only.

Do not write SQL yet.

## Context

Read:

- docs/FacilityDetailRouteQARecord.md
- docs/DoctorDetailRouteQARecord.md
- docs/DoctorsPageSupabaseWiringQARecord.md
- docs/FacilitiesSupabasePreviewStabilizationQA.md
- docs/DoctorsSchemaSQLPlanning.md

Inspect:

- src/app/facilities/[slug]/page.tsx
- src/app/doctors/[slug]/page.tsx
- src/components/facility-detail/FacilityDetailPage.tsx
- src/components/doctors/DoctorsPage.tsx
- src/lib/supabase/facilities-public-read.ts
- src/lib/supabase/doctors-public-read.ts
- supabase/migrations_draft/001_create_facilities_table.sql
- supabase/migrations_draft/004_create_doctors_table.sql

## Create

Create:

```text
docs/ProviderContactChannelsSchemaPlanning.md