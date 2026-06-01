# DigitalDirectory-v2 Facilities Supabase Preview Fallback Investigation

## Scope

This document records the Task 87 investigation into why `/facilities` falls back to static facility cards instead of showing Supabase active/public test rows.

The investigation is documentation-only. It does not modify app code, frontend UI, route wiring, authentication, backend functionality, protected routes, SQL, migrations, RLS policies, test data, patient data, booking/payment/document/admin workflows, or environment files.

No real environment variable values, Supabase keys, or service-role keys are recorded here.

## Files Reviewed

Documentation reviewed:

- `docs/FacilitiesSupabasePreviewManualBrowserQA.md`
- `docs/FacilitiesSupabasePreviewModeQA.md`
- `docs/FacilitiesSupabasePreviewModePlanning.md`
- `docs/FacilitiesPageControlledWiringQAPass.md`
- `docs/FacilitiesSourceWrapperSwitchQAPass.md`
- `docs/FacilitiesPublicReadQAPass.md`
- `docs/FacilitiesSQLManualExecutionQA.md`
- `docs/SupabaseLocalEnvManualSetupQA.md`
- `docs/SupabasePublicListingReadPlanning.md`
- `docs/PublicListingSourceWrapperQAPass.md`
- `docs/CodexTask-83-FacilitiesSupabasePreviewModeImplementation.md`
- `docs/CodexTask-84-FacilitiesSupabasePreviewModeQA.md`
- `docs/CodexTask-85-FacilitiesSupabasePreviewManualBrowserQA.md`
- `docs/CodexTask-86-FacilitiesSupabasePreviewManualQAResultRecord.md`
- `docs/CodexTask-87-FacilitiesSupabasePreviewFallbackInvestigation.md`

Requested but not found:

- `docs/FacilitiesSupabasePreviewManualQAResultRecord.md`

Implementation files reviewed:

- `src/app/facilities/page.tsx`
- `src/components/facilities/FacilitiesPage.tsx`
- `src/lib/public-listing-source.ts`
- `src/lib/supabase/facilities-public-read.ts`
- `src/lib/supabase/env.ts`
- `src/lib/supabase/browser-client.ts`
- `src/types/public-listings.ts`
- `src/lib/public-listing-mappers.ts`

SQL drafts reviewed:

- `supabase/migrations_draft/001_create_facilities_table.sql`
- `supabase/migrations_draft/002_facilities_rls_policy.sql`
- `supabase/migrations_draft/003_facilities_test_data.sql`

## Current Preview Flow

Current flow:

1. `/facilities` renders through `src/app/facilities/page.tsx`.
2. The page calls `getPublicFacilityCardsFromSource`.
3. The page passes `mode: "supabase-facilities-preview"`.
4. The source wrapper dynamically imports the Supabase facilities helper only for that explicit mode.
5. The helper checks Supabase public env availability.
6. If env/client/query succeeds and returns cards, the wrapper returns Supabase cards.
7. If env is unavailable, the query errors, or the result is empty, the wrapper returns static fallback cards.

This confirms preview mode is requested through the intended wrapper boundary.

## Environment And Client Findings

Safe diagnostic result:

- `NEXT_PUBLIC_SUPABASE_URL` is present locally.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is not available locally under that exact name.
- The direct safe read diagnostic did not run a Supabase query because the expected anon-key variable was missing.

Local variable-name inspection found these public Supabase variable names:

```text
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SUPABASE_URL
```

The current helper expects:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

No real values were printed or recorded.

The current browser env helper is behaving as designed: when the expected anon-key variable is missing, it reports an unavailable state and prevents the client from being created.

## Supabase Helper Findings

`src/lib/supabase/facilities-public-read.ts` is structured safely.

The helper:

- Uses `getSupabaseBrowserClientStatus`.
- Returns `status: "unavailable"` when env values are missing.
- Uses only the browser Supabase client helper.
- Does not use a service-role key.
- Queries only `facilities`.
- Selects public-safe fields only.
- Filters `listing_status = "active"`.
- Filters `visibility_status = "public"`.
- Orders by `display_name`.
- Returns generic error states instead of raw Supabase errors.

The helper did not reach the query step in the safe diagnostic because the expected anon-key variable was unavailable.

## Source Wrapper Findings

`src/lib/public-listing-source.ts` is matching preview mode correctly.

Confirmed behavior:

- Preview mode string is defined as `supabase-facilities-preview`.
- `/facilities` passes that same string.
- The wrapper only calls the Supabase helper for that explicit mode.
- When the helper returns unavailable, the wrapper falls back to static cards with `fallbackReason: "supabase-unavailable"`.
- Static fallback is therefore expected with the current local env variable-name mismatch.

No source-wrapper code bug was found.

## Page Rendering Findings

`src/app/facilities/page.tsx` is requesting Supabase preview mode.

The page:

- Imports the source wrapper, not the direct Supabase helper.
- Passes `mode: "supabase-facilities-preview"`.
- Converts returned `PublicProviderCard` objects into the existing `Facility` card shape.
- Falls back to `sampleFacilities` if the cards array is empty.

`src/components/facilities/FacilitiesPage.tsx` accepts provided facilities and defaults to `sampleFacilities` only if no prop is provided.

No page rendering bug was found.

## RLS And Anon Read Considerations

The SQL/RLS drafts are aligned for the intended public read:

```text
listing_status = active
visibility_status = public
```

Confirmed expected readable rows from prior SQL manual QA:

- `test-facility-alpha`
- `test-facility-eta-minimal`
- `test-facility-zeta-disputed`

Confirmed blocked rows:

- `test-facility-beta-pending`
- `test-facility-gamma-archived`
- `test-facility-delta-hidden`
- `test-facility-epsilon-internal`

This investigation did not reach a live Supabase anon read because the expected anon-key variable name was missing locally. Therefore, RLS was not proven as the cause in this pass.

## Static Generation Considerations

The `/facilities` page is currently generated as a static route during build.

Important behavior:

- During build, the page can call the preview source wrapper.
- If the Supabase env helper reports missing env, the wrapper returns static fallback.
- The static build output then contains static facility cards.

Static generation is not the primary cause by itself. The observed fallback is consistent with the missing expected anon-key variable. However, static generation means the fallback result can be baked into the generated route until the app is rebuilt or the route rendering strategy changes in a later reviewed task.

No rendering-mode code change was made in this investigation.

## Empty Result Fallback Considerations

The source wrapper also falls back when Supabase returns an empty success result.

This remains safe for MVP testing, but it can hide whether the query returned zero rows versus whether env was unavailable.

In this investigation, the safe diagnostic identified env unavailability before query execution, so empty result fallback was not the cause.

## Likely Cause

The likely cause is a local environment variable naming mismatch.

The code expects:

```text
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The local env file contains:

```text
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Because `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing, `getSupabaseBrowserEnv()` returns unavailable, the Supabase browser client is not created, the facilities helper does not query Supabase, and the source wrapper safely returns static fallback cards.

## Recommended Fix Path

Recommended narrow fix path:

1. Keep app code unchanged for now.
2. Update local `.env.local` manually so it includes the exact expected variable name:

```text
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

3. Keep `NEXT_PUBLIC_SUPABASE_URL`.
4. Do not add `SUPABASE_SERVICE_ROLE_KEY`.
5. Do not commit `.env.local`.
6. Restart the local dev server after the env change.
7. Re-run manual browser QA on `http://localhost:3000/facilities`.
8. Confirm whether expected Supabase active/public rows appear.
9. Confirm blocked rows do not appear.

Alternative future path, only if the team intentionally wants to support Supabase's newer publishable-key naming:

- Plan a separate reviewed task to update the env helper to accept `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Keep backward compatibility and secret-safety rules clear.
- Do not make that code change in this investigation task.

## Checks Run

Safe investigation checks run:

- Reviewed requested docs, implementation files, and SQL drafts.
- Checked whether requested result-record documentation existed.
- Searched implementation files for preview-mode, env, dynamic rendering, and service-role references.
- Ran a temporary inline Node diagnostic that loaded local env names through Next env loading and reported availability only.
- Inspected local `.env.local` variable names only, not values.
- Checked `.gitignore` for `.env*`.
- Checked Git status before creating this document.

Diagnostic findings:

- Env availability for expected helper variables: unavailable.
- Missing expected key name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Local public Supabase key name present: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Supabase query status: not run because expected env was unavailable.
- `.env*` is ignored by Git.

Verification results:

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- Build used Next.js `16.2.6`.
- Build detected `.env.local`.
- Build generated 22 static routes.

## Safety Confirmation

Safety confirmations:

- No real Supabase URL was printed or documented.
- No real Supabase key was printed or documented.
- No service-role key was used.
- No `.env.local` values were recorded.
- No app code was changed.
- No frontend UI was changed.
- No route wiring was expanded.
- No SQL, migrations, RLS policies, or test data were added.
- No authentication, backend, protected route, patient, booking, payment, document, or admin workflow was added.

## Recommended Next Steps

1. Manually add or rename the local public key variable to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Keep the existing `NEXT_PUBLIC_SUPABASE_URL`.
3. Do not add a service-role key.
4. Restart the local development server.
5. Re-run the facilities manual browser QA guide.
6. Confirm whether `/facilities` now renders:
   - `test-facility-alpha`
   - `test-facility-eta-minimal`
   - `test-facility-zeta-disputed`
7. Confirm blocked rows still do not appear.
8. If Supabase rows appear, create a manual QA result record.
9. If fallback persists after the env-name fix, investigate query/RLS behavior next.
10. Keep preview mode limited to `/facilities` until live QA passes.
