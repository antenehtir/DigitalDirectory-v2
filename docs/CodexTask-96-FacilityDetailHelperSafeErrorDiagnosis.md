# Codex Task 96: Facility Detail Helper Safe Error Diagnosis

## Goal

Diagnose why the facility detail helper returns safe `error` for all slugs in the internal runtime probe, while the `/facilities` list Supabase read works.

Do not wire public detail pages yet.

## Context

Read:

- docs/FacilityDetailReadPlanning.md
- docs/FacilityDetailReadHelperQA.md
- docs/FacilityDetailHelperLiveReadInvestigation.md
- docs/CodexTask-95-FacilityDetailRuntimeProbe.md

Inspect:

- src/app/internal/facility-detail-probe/page.tsx
- src/lib/supabase/facilities-public-read.ts
- src/lib/supabase/public-client.ts
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- supabase/migrations_draft/001_create_facilities_table.sql

## Investigate

Compare the working list helper and failing detail helper.

Check:

- selected columns in list helper vs detail helper
- whether detail helper selects a column not present in the table
- mapper expectations
- return shape
- `.maybeSingle()` usage
- whether the safe error handling hides useful safe error category
- whether `PublicProviderDetail` requires fields not available from the row

## Allowed Fix

A small safe fix is allowed if obvious.

Examples:

- remove non-existent selected column
- align detail select fields with actual table schema
- fix mapper shape
- add safe error code/category without exposing raw secrets
- adjust return shape

## Safety Rules

Do not:

- expose env values
- expose keys
- use service role key
- add SQL/RLS/test data
- modify UI design
- wire public detail route
- add auth/backend/protected routes

## QA

Use the existing internal probe:

```text
/internal/facility-detail-probe