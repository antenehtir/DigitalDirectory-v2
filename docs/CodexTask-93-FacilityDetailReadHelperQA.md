# Codex Task 93: Facility Detail Read Helper QA

## Goal

QA the new facility detail Supabase read helper before wiring any facility detail route.

Do not wire the detail page yet.

## Context

Read:

- docs/FacilityDetailReadPlanning.md
- docs/FacilitiesSupabasePreviewStabilizationQA.md
- docs/CodexTask-92-FacilityDetailSupabaseReadHelperImplementation.md

Inspect:

- src/lib/supabase/facilities-public-read.ts
- src/lib/supabase/public-client.ts
- src/types/public-listings.ts
- src/lib/public-listing-mappers.ts

## QA Checks

Confirm the helper:

- exists as `getSupabasePublicFacilityDetailBySlug`
- uses public anon Supabase client only
- never uses service role key
- queries only `public.facilities`
- selects only public-safe fields
- filters:
  - slug = requested slug
  - listing_status = active
  - visibility_status = public
- returns safe result states
- does not expose raw Supabase errors
- is not wired into any route yet

If safe, run a temporary local helper test without committing scripts.

Test positive slugs:

- test-facility-alpha
- test-facility-eta-minimal
- test-facility-zeta-disputed

Test blocked slugs:

- test-facility-beta-pending
- test-facility-gamma-archived
- test-facility-delta-hidden
- test-facility-epsilon-internal

Expected:

- positive slugs return detail
- blocked slugs return not-found/null
- unknown slug returns not-found/null

Do not print env values.
Do not expose keys.

## Create

Create:

```text
docs/FacilityDetailReadHelperQA.md