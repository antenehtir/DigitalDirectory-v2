# DigitalDirectory-v2 Doctor Detail Read Planning

## Scope

This document plans a future Supabase-backed doctor detail read by slug after the `/doctors` list page has been wired to the public doctors read helper.

This is documentation-only. It does not implement doctor detail reads, modify app code, modify frontend UI, add SQL, add RLS, insert test data, wire a doctor detail route, use a service-role key, expose environment values, expose keys, or commit changes.

## Current Doctors List Status

The `/doctors` list page now uses:

```text
getSupabasePublicDoctorCards()
```

Current list behavior:

- `/doctors` is dynamic.
- `/doctors` requests public doctor cards from Supabase through the safe public read helper.
- The helper selects public-safe doctor fields only.
- The helper filters `listing_status = "active"` and `visibility_status = "public"`.
- The page maps public provider cards into the existing doctor card shape.
- Existing sample fallback remains available when Supabase is unavailable, errors, or returns no cards.
- Doctor detail routes are not wired to Supabase yet.

Confirmed expected public doctors from the list QA record:

- Dr. Test Doctor Alpha
- Test Doctor Eta Minimal
- Dr. Test Doctor Zeta Disputed

Blocked doctors should not appear:

- Test Doctor Beta Pending
- Test Doctor Gamma Archived
- Test Doctor Delta Hidden
- Test Doctor Epsilon Internal

## Existing Doctor Detail Route Review

Current route structure under `src/app/doctors`:

- `src/app/doctors/page.tsx`
- `src/app/doctors/dr-hana-bekele/page.tsx`

The current detail route is static:

```text
/doctors/dr-hana-bekele
```

There is not yet a dynamic route:

```text
src/app/doctors/[slug]/page.tsx
```

The first doctor detail read implementation should create the dynamic route only in a later implementation task after the helper is planned and reviewed.

## Detail Page Purpose

Doctor detail pages should provide a public, login-free profile view for active/public doctors.

The purpose is to let users open a doctor from the `/doctors` list and see public profile information such as specialty, location, facility affiliation, consultation mode preview, public biography, and verification status.

Doctor detail pages must not become dashboards, booking systems, telemedicine sessions, review pages, payment flows, document portals, or private provider profile management screens.

## Recommended Route

Recommended route:

```text
/doctors/[slug]
```

Recommended file path for a later implementation:

```text
src/app/doctors/[slug]/page.tsx
```

The existing static route `/doctors/dr-hana-bekele` should be handled carefully so it does not conflict with future dynamic routing. A later implementation may keep the static route for the existing preview or move static fallback handling into the dynamic route if that is safer.

## Read Helper Strategy

Recommended helper name:

```text
getSupabasePublicDoctorDetailBySlug(slug)
```

Recommended file:

```text
src/lib/supabase/doctors-public-read.ts
```

The helper should:

1. Accept a requested public slug.
2. Normalize and validate the slug enough to avoid empty lookup values.
3. Use only the public anon Supabase client path.
4. Query only `public.doctors`.
5. Select only public-safe fields.
6. Filter by requested slug.
7. Filter `listing_status = "active"`.
8. Filter `visibility_status = "public"`.
9. Return one safe typed detail result or a safe not-found/unavailable/error state.
10. Avoid raw Supabase error exposure.

Recommended query constraints:

```text
slug = requested slug
listing_status = active
visibility_status = public
```

Use `maybeSingle()` or equivalent safe one-row behavior so unknown or blocked rows become safe not-found states instead of raw errors.

## Public-Safe Detail Fields

The first doctor detail helper should select only fields already approved for public reads:

- `id`
- `slug`
- `display_name`
- `title`
- `specialty`
- `subspecialty`
- `bio_public`
- `facility_name_public`
- `city`
- `area`
- `consultation_modes`
- `languages`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

Fields that should not be selected:

- Private phone
- Private email
- License documents
- Uploaded certificates
- Verification evidence
- Admin notes
- Reviewer notes
- Provider owner account IDs
- Patient data
- Booking data
- Payment or wallet data
- Reviews
- Ratings
- Private schedules
- Telemedicine room links
- Document vault references

## Detail Shape Strategy

Recommended return mapping:

- Map the doctor row into `PublicProviderDetail` where practical.
- Reuse the card mapping rules already used by `getSupabasePublicDoctorCards()`.
- Add public detail fields such as `description`, `location`, `workingHours`, `verification`, `contactChannels`, `relatedProviderIds`, and `correctionHref` with safe public fallback values.
- Do not invent private contact channels.
- Do not expose booking or schedule data.

Initial public detail fields can be minimal:

- Name
- Specialty
- Subspecialty
- Public biography
- Facility affiliation text
- City and area
- Consultation modes
- Languages
- Verification status
- Last confirmed date if needed

## Blocked Doctor Behavior

If a slug exists in Supabase but the row is not active/public, the public detail helper should treat it as not available to the public.

Blocked rows should return a safe not-found state:

- Pending doctors return not-found.
- Archived doctors return not-found.
- Hidden doctors return not-found.
- Internal doctors return not-found.
- Draft, rejected, or suspended doctors return not-found.

Known blocked test doctors:

- `test-doctor-beta-pending`
- `test-doctor-gamma-archived`
- `test-doctor-delta-hidden`
- `test-doctor-epsilon-internal`

The public route should not reveal whether a blocked doctor exists.

## Unknown Slug Behavior

Unknown slugs should return a safe not-found state.

Recommended behavior:

- Do not show raw Supabase errors.
- Do not leak table, policy, or schema details.
- Do not redirect unknown doctor slugs to unrelated doctors.
- Do not render blank pages.
- Use Next.js `notFound()` at the route level in the later implementation.

## Static Fallback Strategy

Static fallback should remain available during early rollout.

Fallback can be used when:

- Supabase public env values are missing.
- The public Supabase client cannot be created.
- The query fails.
- The query returns no eligible active/public row.
- The mapper cannot safely map the row.

Fallback should be conservative:

- Keep the existing `/doctors/dr-hana-bekele` static preview working.
- Do not create fake detail pages for blocked Supabase slugs.
- Do not merge private Supabase data with static sample data.
- Do not expose fallback reasons to public users.

## Privacy Rules

Doctor detail reads must keep healthcare privacy boundaries strict.

Rules:

- Use only public-safe doctor listing fields.
- Do not select private phone numbers or private email addresses.
- Do not select license documents, certificates, or verification evidence.
- Do not select admin or reviewer notes.
- Do not select patient data.
- Do not select booking, payment, wallet, review, rating, or document-vault data.
- Do not show raw Supabase errors.
- Do not expose environment values or keys.
- Do not use a service-role key.
- Do not imply that disputed or unverified doctors are fully verified.

## Route Isolation

The doctor detail read work should stay isolated to doctor detail routes.

Do not wire or modify:

- `/search`
- `/nearby`
- `/facilities`
- Facility detail routes
- `/pharmacies`
- `/diagnostics`
- Static or future pharmacy detail routes
- Static or future diagnostics detail routes

Do not add:

- Authentication
- Backend write functionality
- Protected routes
- Booking
- Telemedicine sessions
- Payments
- Reviews
- Ratings
- Document upload
- Admin workflows

## Rendering Considerations

Because public doctor detail reads require request-time Supabase access, the future dynamic route should likely be dynamic.

Recommended later route setting:

```text
dynamic = force-dynamic
```

Use this only when the implementation task adds the dynamic detail route.

The current static `/doctors/dr-hana-bekele` route should remain stable unless the future task explicitly replaces it with reviewed dynamic fallback behavior.

## QA Plan

Before implementation:

1. Confirm `/doctors` still shows the expected active/public doctors.
2. Confirm blocked doctors stay hidden on `/doctors`.
3. Confirm the existing static `/doctors/dr-hana-bekele` route still works.
4. Confirm the public detail fields listed above are enough for the first detail page.
5. Confirm no private fields are needed by the UI.

After helper implementation:

1. Run `npm.cmd run lint`.
2. Run `npm.cmd run build`.
3. Use a temporary internal probe for `getSupabasePublicDoctorDetailBySlug`.
4. Test active/public slugs.
5. Test blocked slugs.
6. Test unknown slug behavior.
7. Confirm no raw Supabase errors are visible.
8. Confirm no service-role key is used.

After route implementation:

1. Run `npm.cmd run lint`.
2. Run `npm.cmd run build`.
3. Open active/public doctor detail routes.
4. Confirm active/public doctors load.
5. Confirm blocked and unknown slugs return not-found.
6. Confirm `/doctors` list still loads.
7. Confirm search, nearby, facilities, pharmacies, and diagnostics are unchanged.

Expected future active/public test slugs:

- `test-doctor-alpha`
- `test-doctor-eta-minimal`
- `test-doctor-zeta-disputed`

Expected future blocked test slugs:

- `test-doctor-beta-pending`
- `test-doctor-gamma-archived`
- `test-doctor-delta-hidden`
- `test-doctor-epsilon-internal`

## Recommended Next Task

Recommended next task:

```text
Doctor Detail Supabase Read Helper Implementation
```

That task should add the helper only, avoid route wiring at first, test with a temporary internal probe, and preserve all privacy and route-isolation rules in this plan.

## Summary

Doctor detail reads should follow the same cautious pattern proven by facility detail reads. The next implementation should add a safe `getSupabasePublicDoctorDetailBySlug(slug)` helper that reads only public-safe fields from `public.doctors`, filters by slug plus active/public status, treats blocked and unknown slugs as safe not-found states, avoids raw error exposure, avoids service-role keys, and keeps all non-doctor routes isolated.
