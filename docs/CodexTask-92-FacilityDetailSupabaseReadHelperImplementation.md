# Codex Task 92: Facility Detail Supabase Read Helper Implementation

## Goal

Implement a safe Supabase public facility detail read helper by slug.

Do not wire the detail page yet.

## Context

Read:

- docs/FacilityDetailReadPlanning.md
- docs/FacilitiesSupabasePreviewStabilizationQA.md
- docs/FacilitiesSupabasePreviewSuccessQARecord.md
- docs/CodexTask-91-FacilityDetailReadPlanning.md

Inspect:

- src/lib/supabase/public-client.ts
- src/lib/supabase/facilities-public-read.ts
- src/lib/public-listing-source.ts
- src/types/public-listings.ts
- src/lib/public-listing-mappers.ts
- supabase/migrations_draft/001_create_facilities_table.sql
- supabase/migrations_draft/002_facilities_rls_policy.sql

## Implement

Add a helper such as:

```ts
getSupabasePublicFacilityDetailBySlug(slug: string)