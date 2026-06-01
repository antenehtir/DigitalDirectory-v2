# DigitalDirectory-v2 Facilities Page Controlled Wiring Planning

## Purpose

This document plans a future controlled wiring step for the `/facilities` list page.

This is planning only. It does not wire public pages to Supabase, modify frontend UI, modify app pages, add feature flags, add SQL, add migrations, add RLS policies, insert data, add authentication, add backend functionality, or add protected routes.

## Controlled Page Wiring Purpose

The controlled page wiring should prove that a single public list page can consume the source wrapper safely while preserving static fallback and visual stability.

The goal is not to make Supabase the default everywhere. The goal is to create a narrow, reversible path for testing facilities public reads through the wrapper after the wrapper has already been proven static-first.

## Why `/facilities` Should Be First

`/facilities` should be the first page wired later because:

- Facilities are the first public table drafted in SQL.
- Facilities have confirmed test project rows from `docs/FacilitiesSQLManualExecutionQA.md`.
- Facilities have a dedicated public read helper.
- Facilities have a controlled source wrapper opt-in mode.
- The `/facilities` page is a list page, so it is easier to validate card output than detail routing.
- The page already has a clear facility results section that can later receive cards from a source layer.

This keeps the first live-read experiment small and easy to roll back.

## What Page Should Be Wired Later

Only the public facilities list page should be considered for the first controlled page wiring step:

- `src/app/facilities/page.tsx`
- `src/components/facilities/FacilitiesPage.tsx`

Current behavior:

- The route renders `FacilitiesPage` inside `PageShell`.
- `FacilitiesPage` currently renders `FacilityCardGrid` with `sampleFacilities`.

Future wiring should preserve the same page structure and visual layout.

## What Pages Should Not Be Wired Yet

Do not wire these pages in the first facilities page wiring step:

- Homepage
- Search page
- Nearby page
- Facility detail page
- `/facilities/addis-health-center`
- Doctors page
- Pharmacies page
- Diagnostics page
- Register, corrections, contact, feedback, auth preview, account preview, provider dashboard preview, patient account preview, booking preview, or admin preview pages

Do not wire detail pages until detail data shape, route behavior, and fallback rules are separately planned and QA'd.

## Source Wrapper Usage Plan

The future `/facilities` wiring should use the source wrapper instead of importing Supabase helpers directly.

Recommended future source call:

```ts
getPublicFacilityCardsFromSource({
  mode: "supabase-facilities-preview",
});
```

Rules:

- Page or page-adjacent code should call the wrapper, not `getSupabasePublicFacilityCards` directly.
- Static mode should remain the default unless the future task explicitly opts into preview mode.
- The page should consume `PublicProviderCard`-compatible output or a page-specific adapter with no visual redesign.
- Do not duplicate fallback logic inside components.

## Static Fallback Behavior

Static fallback should remain available at every stage.

The page should render static facility cards when:

- Supabase mode is not explicitly requested.
- Supabase env values are missing.
- The browser client is unavailable.
- The query fails.
- Supabase returns an empty card list during MVP testing.

The fallback should preserve the current user experience.

## Supabase Opt-In Behavior

Supabase should be opt-in only.

The first wiring implementation should not make Supabase the implicit default. It should use a controlled preview mode that can be removed or set back to static quickly.

The opt-in path should:

- Use `getPublicFacilityCardsFromSource`.
- Request only `supabase-facilities-preview` mode when explicitly approved.
- Preserve static fallback.
- Avoid raw Supabase errors in UI.
- Avoid service-role keys, auth state, write queries, and private fields.

## Visual And UI Stability Expectations

The future wiring should not redesign `/facilities`.

Visual expectations:

- Keep the existing page hero/header.
- Keep the search preview.
- Keep category filters.
- Keep the facility results section.
- Keep the trust block.
- Keep the request facility addition CTA.
- Keep mobile spacing and card layout stable.
- Avoid loading spinners or new empty states unless separately planned.

The first wiring step should focus on data source safety, not visual changes.

## Active/Public Verification Expectations

Future local QA should verify that Supabase preview mode returns only active/public facilities.

Expected active/public rows from confirmed manual QA:

- `test-facility-alpha`
- `test-facility-eta-minimal`
- `test-facility-zeta-disputed`

Rows expected not to appear through active/public reads:

- `test-facility-beta-pending`
- `test-facility-gamma-archived`
- `test-facility-delta-hidden`
- `test-facility-epsilon-internal`

These checks should happen before any broader page wiring.

## Missing Env And Error Fallback Behavior

Missing env:

- Missing `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` should return static cards.
- The page should not crash.
- The build should not fail.

Query error:

- The wrapper should return static cards.
- Raw Supabase errors should not appear in public UI.
- No service-role fallback should be attempted.

Empty result:

- During MVP testing, an empty Supabase success should fall back to static cards.
- This protects the page from looking broken if the test project has no active/public rows.

## Local QA Strategy

Future local QA should test:

- `/facilities` still renders with static data by default.
- Preview mode can render active/public Supabase rows when explicitly enabled.
- Static fallback works when env values are missing.
- Static fallback works when Supabase query fails.
- Static fallback works when Supabase returns an empty result.
- Blocked rows do not appear through the Supabase preview path.
- The page remains responsive on mobile.
- No visible UI regressions occur.
- `npm.cmd run lint` passes.
- `npm.cmd run build` passes.

Manual browser QA should compare card spacing, names, labels, and actions against the current static page.

## Build And Deployment Safety

Build and deployment safety rules:

- Do not enable Supabase preview mode by default in production.
- Do not commit `.env.local`.
- Do not expose real Supabase keys in docs, screenshots, or logs.
- Do not add service-role keys to browser code.
- Keep the source wrapper fallback path active.
- Run lint and build after any future page wiring change.
- Confirm static routes still generate successfully.

## Rollback Plan

Rollback should be simple:

1. Return the page to static data by using the existing static source path.
2. Remove or disable the explicit `supabase-facilities-preview` call.
3. Confirm `/facilities` renders the existing static facility cards.
4. Run lint and build.
5. Leave SQL, RLS, and test data untouched unless a separate database rollback is required.

Rollback should not require UI redesign or route changes.

## What Must Not Be Implemented Yet

Do not implement the following in this planning task:

- `/facilities` page wiring.
- Supabase as the default source.
- Feature flags.
- UI changes.
- New loading states.
- New empty states.
- Detail page wiring.
- Search page wiring.
- Homepage wiring.
- SQL, migrations, or RLS changes.
- Test data inserts.
- Authentication.
- Backend functionality.
- Protected routes.
- Patient, booking, payment, document, notification, or admin workflows.

## Recommended Next Development Order

1. Review this facilities page wiring plan.
2. Create a focused implementation task for `/facilities` only.
3. Keep static fallback and current visual layout unchanged.
4. Wire the page through `getPublicFacilityCardsFromSource`, not directly to Supabase.
5. Run local QA for default static mode and explicit Supabase preview mode.
6. Verify active/public rows and blocked rows.
7. Run lint and build.
8. Document the facilities page wiring QA result.
9. Only then consider planning detail page or search page wiring.
