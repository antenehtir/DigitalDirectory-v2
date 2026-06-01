# DigitalDirectory-v2 Facilities Public Read QA Pass

## Scope

This document records a controlled QA pass for the facilities public Supabase read helper.

The QA scope is limited to reviewing the helper added for future facilities reads. Public pages are not wired to Supabase, current public listing behavior remains unchanged, and no frontend UI, SQL, RLS, authentication, backend, protected route, patient, booking, payment, document, or admin workflow changes are included.

## Files Reviewed

Implementation files reviewed:

- `src/lib/supabase/env.ts`
- `src/lib/supabase/browser-client.ts`
- `src/lib/supabase/facilities-public-read.ts`
- `src/types/public-listings.ts`
- `src/lib/public-listing-mappers.ts`
- `src/lib/public-listing-source.ts`

SQL drafts reviewed for field names and public filters:

- `supabase/migrations_draft/001_create_facilities_table.sql`
- `supabase/migrations_draft/002_facilities_rls_policy.sql`
- `supabase/migrations_draft/003_facilities_test_data.sql`

Planning and QA documents reviewed:

- Supabase environment setup and manual local env QA documents
- Facilities SQL manual execution QA
- Supabase public listing read planning
- Public listing data mapper planning
- Static-to-Supabase source switch planning
- Public listing source wrapper QA pass

## Helper Findings

`src/lib/supabase/facilities-public-read.ts` is isolated from the active public source wrapper and public pages.

The helper:

- Exports `getSupabasePublicFacilityCards`.
- Uses the existing browser client helper.
- Returns a typed `FacilitiesPublicReadResult`.
- Does not mutate data.
- Does not require authentication.
- Does not use server-only or service-role credentials.
- Does not change current public listing behavior.

## Supabase Env And Client Findings

The helper relies on the existing browser client boundary:

- `src/lib/supabase/env.ts` reads only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Missing env values return an unavailable state instead of throwing during import.
- `src/lib/supabase/browser-client.ts` returns `null` when env values are unavailable.
- The browser client disables persistent auth behavior with `persistSession: false`.
- No service-role key is referenced by the browser helper.

## Missing Env Fallback Findings

When public Supabase env values are missing, the helper returns:

- `status: "unavailable"`
- `source: "static-fallback"`
- `cards: []`
- `fallbackRecommended: true`
- `reason: "missing-env"`
- public missing-key names only

This is safe for future source-switch work because UI-facing callers can fall back to static data without exposing raw errors.

## Query And Selected Field Findings

The helper queries only `facilities` and selects only these public-safe fields:

- `id`
- `slug`
- `display_name`
- `facility_type`
- `category`
- `description`
- `city`
- `area`
- `address_public`
- `landmark_public`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

The selected fields match the public-safe facilities SQL draft and avoid private provider fields, admin notes, verification evidence, patient data, booking data, payment data, document data, and contact channel tables.

## Active/Public Filter Findings

The helper explicitly filters:

```text
listing_status = active
visibility_status = public
```

This matches the RLS draft rule:

```sql
listing_status = 'active'
and visibility_status = 'public'
```

The helper orders results by `display_name` ascending.

## Mapper Findings

The helper maps Supabase rows to `PublicProviderCard`.

Mapping behavior:

- `display_name` maps to card `name`.
- `slug` is normalized with fallback to `id`.
- `category` falls back to `facility_type` for `categoryLabel`.
- `description` maps to card `summary` with a fallback.
- `area` and `city` combine into `locationLabel`.
- `last_confirmed_at` maps to a simple listing freshness preview.
- Detail links use the existing `getPublicProviderDetailPath` helper.

Known caveat:

- Supabase facility verification values include `unverified`, `disputed`, and `expired`.
- The current frontend `VerificationStatus` type supports only `verified`, `pending`, and `community-submitted`.
- The helper maps `verified` to `verified`, `pending` to `pending`, and all other Supabase verification states to `community-submitted`.
- This is safe for the current UI type but should be revisited when the frontend verification model is expanded.

## Return Shape And Error Handling Findings

The helper avoids raw Supabase errors in UI-facing return values.

Return states:

- `success` returns Supabase cards and does not recommend fallback.
- `unavailable` returns empty cards and recommends static fallback.
- `error` returns empty cards, recommends static fallback, and uses the generic code `FACILITIES_PUBLIC_READ_FAILED`.

The helper does not expose database error objects, SQL messages, project details, keys, or connection details.

## Service Role Safety Findings

No service-role key is used or referenced.

The helper:

- Uses the browser client only.
- Uses only public env variable names.
- Does not import server/admin clients.
- Does not include insert, update, delete, or RPC calls.
- Does not require authentication.

## Public Page Behavior Findings

Current public listing behavior is unchanged.

`src/lib/public-listing-source.ts` still:

- Uses static seed data as the active source.
- Reports `mode: "static"`.
- Reports `isSupabaseEnabled: false`.
- Does not import or call the new facilities Supabase read helper.

No homepage, facilities page, search page, or detail page was modified.

## Lint And Build Results

Results from this QA pass:

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.

Build details:

- Next.js `16.2.6`
- `.env.local` detected by the build
- TypeScript completed successfully
- `22` static routes generated

## Issues Found

No blocking issues were found in the helper review.

Non-blocking follow-up:

- Expand the frontend verification status model later if the UI should distinguish `unverified`, `disputed`, and `expired` instead of grouping them under `community-submitted`.

## Recommended Next Steps

1. Keep public pages on static data until a reviewed source-switch task is approved.
2. Create a focused facilities app-read test task that calls the helper without changing public behavior.
3. Confirm the helper returns only the expected active/public rows from the Supabase test project.
4. Confirm blocked rows do not appear through the browser anon path.
5. Decide whether to expand frontend verification status types before wiring live facility cards into public pages.
6. Preserve static fallback behavior when the first source switch is implemented.
7. Document the app-read QA result before expanding to doctors, pharmacies, diagnostics, services, or relationship tables.
