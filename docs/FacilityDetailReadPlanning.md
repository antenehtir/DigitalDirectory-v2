# DigitalDirectory-v2 Facility Detail Read Planning

## Scope

This document plans a future Supabase-backed facility detail read by slug after the `/facilities` list page has successfully rendered active/public Supabase facility rows.

This is documentation-only. It does not implement facility detail reads, modify app code, modify frontend UI, add authentication, add backend functionality, add protected routes, add SQL migrations, insert test data, add patient data, add booking/payment/document/admin workflows, or wire search, nearby, doctors, pharmacies, or diagnostics pages.

No real Supabase URL, anon key, service-role key, or `.env.local` value is recorded here.

## Current State

The `/facilities` list page now requests the controlled Supabase facilities preview mode through `src/lib/public-listing-source.ts`.

Current list behavior:

- `/facilities` is dynamic.
- `/facilities` requests `mode: "supabase-facilities-preview"`.
- The source wrapper calls the Supabase facilities public read helper only for that explicit mode.
- Static fallback remains available.
- The list helper selects public-safe fields only.
- The list helper filters `listing_status = "active"` and `visibility_status = "public"`.
- Search, nearby, facility detail, doctors, pharmacies, and diagnostics routes remain unwired to Supabase.

The confirmed manual QA result recorded for the list page showed:

- Test Facility Alpha
- Test Facility Eta Minimal
- Test Facility Zeta Disputed

The blocked rows did not appear:

- Test Facility Beta Pending
- Test Facility Gamma Archived
- Test Facility Delta Hidden
- Test Facility Epsilon Internal

Requested but not found during this planning pass:

- `docs/FacilitiesSupabasePreviewSuccessQARecord.md`

## Existing Detail Route Review

The requested dynamic route path does not currently exist:

```text
src/app/facilities/[slug]
```

The existing facility detail route is static:

```text
src/app/facilities/addis-health-center/page.tsx
```

That route renders:

```text
/facilities/addis-health-center
```

The current static route imports `FacilityDetailPage` from:

```text
src/components/facility-detail/FacilityDetailPage.tsx
```

The current detail component:

- Reads from `sampleFacilities`.
- Finds the hardcoded `addis-health-center` slug.
- Renders the existing detail header, action panel, information, services, hours, trust, correction CTA, and similar facilities sections.
- Returns `null` if the sample facility is missing.
- Does not accept a dynamic slug prop.
- Does not call the public listing source wrapper.
- Does not call Supabase.

This means the first future detail-read task should either keep the static route and add a safe detail source for `addis-health-center`, or plan a separate route-shape task before adding a dynamic `[slug]` route.

## Detail Read Purpose

The future facility detail read should prove that one public facility detail page can safely render a Supabase active/public facility record by slug while preserving fallback behavior and route isolation.

The purpose is not to build full dynamic routing for every facility yet.

The first detail read should:

- Keep public browsing login-free.
- Read only one facility by a reviewed public slug.
- Select public-safe detail fields only.
- Enforce active/public eligibility.
- Preserve the current visual layout.
- Preserve static fallback for the existing Addis Health Center detail route.
- Avoid raw Supabase errors in UI-facing return values.
- Avoid service-role credentials.

## Public-Safe Detail Fields

The first detail read should select only public-safe fields needed by the existing detail UI.

Recommended fields from `public.facilities`:

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

Future fields may be added only after schema and RLS review:

- Public working hours summary
- Reviewed public services
- Reviewed public departments
- Reviewed public contact/action channels
- Reviewed public facility-service relationships

Fields that must not be selected for public detail reads:

- Admin notes
- Reviewer notes
- Verification documents or evidence
- Private provider phone numbers
- Private provider emails
- Submitter contact details
- Provider owner account IDs
- Audit logs
- Patient data
- Booking data
- Payment or wallet data
- Document vault data
- Internal correction or registration request payloads

## Read-By-Slug Strategy

The future read should use a slug-based public query.

Recommended future helper shape:

```text
getSupabasePublicFacilityDetailBySlug(slug)
```

Recommended source-wrapper shape:

```text
getPublicFacilityDetailFromSource({
  slug,
  mode: "supabase-facilities-preview"
})
```

Strategy:

1. Normalize and validate the requested slug.
2. Query `public.facilities` by `slug`.
3. Select only public-safe fields.
4. Apply active/public filters in the query.
5. Limit the result to one row.
6. Map the row into `PublicProviderDetail` or a compatible detail DTO.
7. Convert that DTO into the current `Facility` detail component shape only at the page/component boundary if needed.
8. Fall back to static detail data when Supabase is unavailable, errors, or returns no eligible row.

Do not query by internal ID for public route lookup unless a future schema task approves an ID-based route.

## Active/Public Filtering Strategy

The future detail read must keep the same public eligibility rule as the list page:

```text
listing_status = active
visibility_status = public
```

This filter should be present in the app query even though RLS should also enforce it.

Expected behavior:

- Active/public rows may render.
- Pending rows must not render from Supabase.
- Archived rows must not render from Supabase.
- Hidden rows must not render from Supabase.
- Internal rows must not render from Supabase.
- Suspended, rejected, draft, or otherwise non-public rows must not render from Supabase.

RLS remains the database boundary. Query filters remain the app-level public eligibility boundary.

## Blocked Facility Behavior

If a slug exists in Supabase but is not active/public, the public detail read should treat it as unavailable to the public.

Recommended behavior:

- Do not render the blocked Supabase row.
- Do not show status details explaining why it is blocked.
- Do not leak whether the blocked row exists.
- Use static fallback only if the slug maps to an existing static public preview route.
- Otherwise return a safe not-found state.

For example, these test rows should not render as public detail pages through a future Supabase detail read:

- `test-facility-beta-pending`
- `test-facility-gamma-archived`
- `test-facility-delta-hidden`
- `test-facility-epsilon-internal`

## Not-Found Behavior

Future not-found behavior should be public-safe.

Recommended behavior:

- If the slug is unknown in both Supabase and static fallback, return the existing Next.js not-found behavior or a safe not-found page.
- Do not show raw Supabase errors.
- Do not expose whether a private/internal listing exists.
- Do not render blank pages.
- Do not redirect unknown facility slugs to unrelated providers.

For the current static route, `FacilityDetailPage` returns `null` if the hardcoded sample facility is missing. A future implementation should replace that with a clearer route-level not-found behavior if dynamic detail reads are introduced.

## Static Fallback Strategy

Static fallback should remain available for the first facility detail read.

Fallback should activate when:

- Supabase public env values are missing.
- The public Supabase client cannot be created.
- The query fails.
- The query returns no eligible active/public row.
- The mapper rejects or cannot safely map the row.

Fallback rules:

- Existing `/facilities/addis-health-center` should remain usable.
- Fallback should use reviewed static data only.
- Fallback should not merge private Supabase fields with static data.
- Fallback should not hide repeated preview failures from developer QA records.
- Public users should not see raw fallback reasons.

During MVP preview, fallback for unknown Supabase test slugs should be decided explicitly before adding dynamic `[slug]` routing.

## Route Isolation

Facility detail read work should remain isolated.

Do not wire these routes during the first detail-read implementation:

- `/search`
- `/nearby`
- `/doctors`
- `/pharmacies`
- `/diagnostics`
- `/facilities/addis-health-center` beyond the narrow approved detail-read task
- Any future doctor, pharmacy, or diagnostics detail route

Do not expand search/filter logic or nearby behavior.

Do not introduce auth, protected routes, provider dashboards, booking, payments, documents, admin workflows, or patient data.

## QA Plan

Before implementation:

1. Confirm `/facilities` list preview still renders the expected active/public rows.
2. Confirm blocked list rows stay hidden.
3. Confirm the existing static detail route still works.
4. Confirm whether the first detail read will target only `/facilities/addis-health-center` or introduce a reviewed dynamic `[slug]` route.
5. Confirm the selected public detail fields.
6. Confirm no private fields are needed by the current UI.

After a future implementation:

1. Run `npm.cmd run lint`.
2. Run `npm.cmd run build`.
3. Open `/facilities/addis-health-center`.
4. Confirm the detail layout is visually unchanged.
5. Confirm active/public Supabase detail data renders only when explicitly enabled.
6. Confirm static fallback works when Supabase is unavailable.
7. Confirm blocked slugs do not render public Supabase detail data.
8. Confirm raw Supabase errors do not appear in the UI.
9. Confirm `.env.local` remains ignored by Git.
10. Confirm no service-role key is used or referenced.

Recommended browser QA slugs for a later dynamic-route task:

- Active/public: `test-facility-alpha`
- Active/public minimal: `test-facility-eta-minimal`
- Active/public disputed: `test-facility-zeta-disputed`
- Blocked: `test-facility-beta-pending`
- Blocked: `test-facility-gamma-archived`
- Blocked: `test-facility-delta-hidden`
- Blocked: `test-facility-epsilon-internal`

## Security And Privacy Rules

Security rules:

- Use only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Do not use or reference a service-role key.
- Do not require authentication for public facility detail reads.
- Do not select private/internal fields.
- Do not expose raw Supabase errors.
- Do not print real environment variable values.
- Keep RLS as the database enforcement layer.
- Keep app query filters as a second public eligibility guard.

Privacy rules:

- No patient data.
- No booking data.
- No payment or wallet data.
- No document vault data.
- No private provider contact data.
- No verification evidence.
- No admin/reviewer notes.
- No correction or registration request payloads.

## Rendering Considerations

The `/facilities` list route is currently dynamic so it can perform the controlled preview read at request time.

The existing `/facilities/addis-health-center` detail route is currently a static route.

Future detail-read rendering options:

1. Keep `/facilities/addis-health-center` static and use static fallback only.
2. Make the existing static detail route dynamic when adding a controlled Supabase detail preview.
3. Add a separate planned dynamic route only after the static detail read path is QA-approved.

Recommended first step:

- Do not add dynamic `[slug]` routing yet.
- Plan a narrow detail source helper first.
- Only change rendering mode in the future implementation task if the detail route must read Supabase at request time.

Build expectations after a future detail-read task:

- Existing routes should continue building.
- `/facilities` should remain the only list route using Supabase preview mode.
- Any dynamic detail route should be explicit and documented.
- Other public routes should remain isolated.

## Recommended Next Steps

Recommended order:

1. Keep `/facilities` list preview mode stable.
2. Decide whether the first detail read targets only the existing static Addis Health Center route or a new dynamic route.
3. Define a `PublicProviderDetail` mapping path for Supabase facility rows.
4. Add a documentation-only QA checklist for detail reads if needed.
5. Implement a narrow `getSupabasePublicFacilityDetailBySlug` helper in a future task.
6. Add a source-wrapper function for detail reads in a future task.
7. Keep static fallback for `/facilities/addis-health-center`.
8. Run lint/build and browser QA.
9. Record a detail-read QA pass before expanding to additional facility slugs.
10. Do not wire search, nearby, doctors, pharmacies, diagnostics, booking, payments, documents, auth, or admin workflows during the first detail-read implementation.

## Summary

Facility detail reads should be introduced cautiously after the successful `/facilities` list preview. The current detail route is static at `/facilities/addis-health-center`; there is no dynamic `[slug]` route yet.

The recommended future path is a narrow read-by-slug helper that selects public-safe fields only, filters active/public rows, preserves static fallback, avoids service-role credentials, and keeps all other routes isolated.
