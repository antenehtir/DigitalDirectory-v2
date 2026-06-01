# DigitalDirectory-v2 Facilities Supabase Preview Stabilization QA

## Scope

This document records the Task 90 stabilization QA pass for the `/facilities` Supabase preview mode.

The pass confirms the current working state after the server-safe public read fix and manual Supabase anon grant correction. It is documentation-first and does not modify frontend UI, route wiring, authentication, backend functionality, protected routes, SQL migrations, test data, patient data, booking/payment/document/admin workflows, or service-role key usage.

No real Supabase URL, anon key, service-role key, or `.env.local` value is recorded here.

## Files Reviewed

Documentation reviewed:

- `docs/FacilitiesSupabasePreviewFallbackInvestigation.md`
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
- `docs/CodexTask-88-FacilitiesSupabasePreviewServerSafeReadFix.md`
- `docs/CodexTask-89-FacilitiesSupabasePreviewSuccessQARecord.md`
- `docs/CodexTask-90-FacilitiesSupabasePreviewStabilizationQA.md`

Requested but not found in the workspace:

- `docs/FacilitiesSupabasePreviewSuccessQARecord.md`
- `docs/FacilitiesSupabasePreviewManualQAResultRecord.md`

Implementation files reviewed:

- `src/app/facilities/page.tsx`
- `src/components/facilities/FacilitiesPage.tsx`
- `src/lib/public-listing-source.ts`
- `src/lib/supabase/facilities-public-read.ts`
- `src/lib/supabase/public-client.ts`
- `src/lib/supabase/env.ts`
- `src/lib/supabase/browser-client.ts`
- `src/types/public-listings.ts`
- `src/lib/public-listing-mappers.ts`

## Current Working State

The `/facilities` route is the only public page requesting the controlled Supabase facilities preview mode.

Current flow:

1. `src/app/facilities/page.tsx` forces dynamic rendering for `/facilities`.
2. The page requests `mode: "supabase-facilities-preview"` from `getPublicFacilityCardsFromSource`.
3. The source wrapper dynamically loads the Supabase facilities public read helper only for that explicit preview mode.
4. The helper uses the public anon-key client path and only public environment variables.
5. The helper reads only active/public rows from `public.facilities`.
6. The page maps returned public provider cards into the existing facility card UI shape.
7. Static fallback remains available if the environment, client, query, or result set is unavailable.

The current implementation keeps the existing facilities layout and card styling unchanged.

## Browser QA Result

Browser QA is recorded from the confirmed manual result supplied for this stabilization pass.

`/facilities` rendered the expected active/public Supabase facility rows:

- Test Facility Alpha
- Test Facility Eta Minimal
- Test Facility Zeta Disputed

The page did not show the blocked rows listed below.

No browser QA was rerun during this documentation pass.

## Expected Rows Observed

Observed expected rows:

| Display name | Expected status behavior |
| --- | --- |
| Test Facility Alpha | Active/public row appears |
| Test Facility Eta Minimal | Active/public row appears |
| Test Facility Zeta Disputed | Active/public row appears |

This confirms the preview read can render Supabase rows when the local environment and Supabase permissions are configured correctly.

## Blocked Rows Not Observed

The following rows were confirmed absent from `/facilities` during manual QA:

- Test Facility Beta Pending
- Test Facility Gamma Archived
- Test Facility Delta Hidden
- Test Facility Epsilon Internal

This matches the intended public-read boundary:

```text
listing_status = active
visibility_status = public
```

## Static Fallback Status

Static fallback remains available through the source wrapper.

Fallback is expected if:

- Public Supabase environment variables are missing.
- The public Supabase client cannot be created.
- The facilities query fails.
- Supabase returns an empty result during MVP preview testing.

Fallback returns the existing static facility cards and keeps the public page usable. It does not expose raw Supabase errors to the UI.

## Anon Grant Requirement

The confirmed manual Supabase permission correction required these grants:

```sql
grant usage on schema public to anon;
grant select on table public.facilities to anon;
```

These statements are recorded as the confirmed manual requirement only. This task does not add SQL migrations, run SQL, or modify the database.

## Route Isolation Findings

Route isolation remains intact:

- `/facilities` is the only route requesting Supabase facilities preview mode.
- Search remains unwired to Supabase.
- Nearby remains unwired to Supabase.
- Facility detail pages remain unwired to Supabase.
- Doctors remain unwired to Supabase.
- Pharmacies remain unwired to Supabase.
- Diagnostics remain unwired to Supabase.

The build output confirms `/facilities` is dynamic while the other public routes remain static.

## Secret Safety Findings

Secret safety remains intact:

- The implementation uses only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- No service-role key is referenced in the reviewed read path.
- No real environment variable values are documented.
- No Supabase URL or key is printed here.
- The public read helper returns generic fallback/error states instead of raw Supabase error payloads.

## Lint And Build Results

Commands run for this stabilization pass:

```text
npm.cmd run lint
npm.cmd run build
```

Results:

- `npm.cmd run lint` passed.
- `npm.cmd run build` passed.
- Build used Next.js `16.2.6`.
- Build detected `.env.local`.
- Build output showed `/facilities` as dynamic.
- Build output showed 21 static routes generated.

## Remaining Limitations

Remaining limitations:

- Supabase preview mode is intentionally limited to `/facilities`.
- Search, nearby, facility detail, doctors, pharmacies, and diagnostics pages are intentionally not wired to Supabase.
- Static fallback can still hide a Supabase outage or empty result from public users during MVP preview.
- Provider cards still map Supabase facility rows into the existing frontend facility card shape.
- No production rollout decision is made by this document.
- The two requested historical QA result files listed above were not present in the workspace during review.

## Recommended Next Steps

Recommended next order:

1. Keep Supabase preview mode limited to `/facilities`.
2. Preserve static fallback while the public read path remains under review.
3. Record any future manual browser QA results in a dedicated QA result document.
4. Consider a small developer-only source-status check in a later planned task if fallback visibility becomes important.
5. Do not expand Supabase reads to search, nearby, detail pages, doctors, pharmacies, or diagnostics until `/facilities` has enough repeated QA confidence.
6. Keep service-role keys out of frontend and public read paths.
7. Keep SQL changes in reviewed migration tasks only.

## Summary

The stabilization pass records `/facilities` as working in controlled Supabase preview mode with the expected active/public rows visible and blocked rows hidden.

Static fallback remains available, route isolation is preserved, secret safety rules are intact, and lint/build both passed.
