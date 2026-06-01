# DigitalDirectory-v2 Facilities Page Controlled Wiring QA Pass

## Scope

This document records a controlled QA pass for the `/facilities` page wiring after Task 80.

The QA scope is limited to verifying that `/facilities` consumes the public listing source wrapper, static remains the default, UI behavior remains unchanged, and no other routes were wired.

This QA pass does not enable Supabase preview mode, change public listing behavior, modify frontend UI, add authentication, add backend functionality, add protected routes, add SQL, add migrations, add RLS policies, insert test data, add patient data, or add booking, payment, document, or admin workflows.

## Files Reviewed

Implementation files reviewed:

- `src/app/facilities/page.tsx`
- `src/components/facilities/FacilitiesPage.tsx`
- `src/lib/public-listing-source.ts`
- `src/lib/supabase/facilities-public-read.ts`
- `src/types/public-listings.ts`
- `src/lib/public-listing-mappers.ts`

Planning and QA documents reviewed:

- `docs/FacilitiesPageControlledWiringPlanning.md`
- `docs/FacilitiesSourceWrapperSwitchQAPass.md`
- `docs/FacilitiesPublicReadQAPass.md`
- `docs/PublicListingSourceWrapperQAPass.md`
- `docs/SupabaseLocalEnvManualSetupQA.md`
- `docs/FacilitiesSQLManualExecutionQA.md`

## Page Wiring Findings

`src/app/facilities/page.tsx` now consumes the public listing source wrapper through:

```ts
getPublicFacilityCardsFromSource()
```

The call does not pass `supabase-facilities-preview`, so it uses the wrapper default static mode.

The page adapts returned `PublicProviderCard` items back into the existing `Facility` shape before passing data to `FacilitiesPage`.

## Component Findings

`src/components/facilities/FacilitiesPage.tsx` now accepts an optional `facilities` prop.

Confirmed behavior:

- If `facilities` is provided, it renders those cards.
- If no prop is provided, it falls back to `sampleFacilities`.
- The existing layout structure remains unchanged.
- `FacilityCardGrid` remains the card rendering component.
- No styling classes or visual sections were changed.

## Static Default Findings

Static remains the default behavior.

Confirmed behavior:

- `getPublicFacilityCardsFromSource()` is called without options.
- The source wrapper defaults to `static`.
- The source wrapper returns static facility cards by default.
- The route maps matching static card IDs back to the original `sampleFacilities` records.
- Current card text, actions, availability notes, and visual behavior should remain consistent with the previous static page.

## Source Wrapper Findings

`src/lib/public-listing-source.ts` remains the source selection boundary.

The wrapper:

- Keeps `getPublicFacilityCards()` static and synchronous.
- Keeps `getAllPublicProviderCards()` static.
- Requires explicit `mode: "supabase-facilities-preview"` before calling the Supabase facilities helper.
- Falls back to static cards for unavailable, error, and empty Supabase results.

The `/facilities` page uses the wrapper and does not duplicate Supabase query logic.

## No Direct Supabase Import Findings

`src/app/facilities/page.tsx` does not import:

- `getSupabasePublicFacilityCards`
- Supabase browser client helpers
- Supabase env helpers
- `@supabase/supabase-js`

The page imports only the public listing source wrapper.

## Route Isolation Findings

Only the `/facilities` list route was wired to the source wrapper.

No wiring changes were made to:

- Homepage
- Search page
- Nearby page
- Facility detail route
- `/facilities/addis-health-center`
- Doctors page
- Pharmacies page
- Diagnostics page
- Register, corrections, contact, feedback, auth preview, account preview, provider dashboard preview, patient account preview, booking preview, or admin preview pages

## UI Stability Findings

The UI is expected to remain visually unchanged.

Confirmed code-level findings:

- `FacilitiesPage` keeps the same `PageContainer` structure.
- Hero, search preview, category filters, results heading, trust block, and request facility CTA remain in place.
- `FacilityCardGrid` and `FacilityCard` were not modified.
- No new loading state, empty state, button, layout, or style class was added.

## Fallback Findings

Fallback remains available at two levels:

- `FacilitiesPage` falls back to `sampleFacilities` if no facilities prop is provided.
- `src/app/facilities/page.tsx` falls back to `sampleFacilities` if the wrapper returns an empty card list.

Because the route calls the wrapper without preview mode, Supabase unavailable, error, and empty-result paths are not currently exercised by the page.

## Service Role Safety Findings

No service-role key is used or referenced by the `/facilities` page wiring.

The route:

- Does not import Supabase client helpers.
- Does not import the direct Supabase facilities helper.
- Does not add auth.
- Does not add writes.
- Does not add backend routes.
- Does not add protected routes.

## Lint And Build Results

Results from this QA pass:

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.

Build details:

- Next.js `16.2.6`
- `.env.local` detected by the build
- TypeScript completed successfully
- `22` static routes generated
- `/facilities` generated as a static route

## Issues Found

No blocking issues were found in the `/facilities` controlled wiring review.

Non-blocking follow-up:

- The page currently calls the wrapper in default static mode. A later explicit preview-mode task is still needed to test live Supabase facility rows on the page.

## Recommended Next Steps

1. Keep `/facilities` on default static wrapper mode until preview mode is explicitly approved.
2. Create a focused task to test `/facilities` with `supabase-facilities-preview`.
3. Verify the active/public Supabase rows appear only in preview mode.
4. Verify blocked rows do not appear in preview mode.
5. Keep facility detail, search, nearby, doctors, pharmacies, and diagnostics pages static until separately planned.
6. Run visual QA before enabling any public Supabase-backed behavior.
