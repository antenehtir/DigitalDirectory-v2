# Codex Task 143: Pharmacy Detail Read Planning

## Project

DigitalDirectory-v2

## Goal

Plan the pharmacy detail read flow before implementation.

This task follows:

- CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- CodexTask-141-PharmaciesRuntimeProbe.md
- CodexTask-142-PharmaciesPageSupabaseWiringQA.md

The Pharmacies page is now wired to the pharmacy public read helper. The next step is to plan how an individual pharmacy detail page should safely read and display one pharmacy listing.

This is a planning task only.

Do not implement code in this task.

---

## Important Context

Before writing the plan, inspect:

- docs/CodexTask-91-FacilityDetailReadPlanning.md
- docs/CodexTask-111-DoctorDetailReadPlanning.md
- docs/CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- docs/CodexTask-142-PharmaciesPageSupabaseWiringQA.md
- src/lib/supabase/pharmacies-public-read.ts
- src/app/pharmacies/page.tsx
- existing facility detail route files
- existing doctor detail route files
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- docs/DataModelContentStructure.md
- docs/DevelopmentRoadmap.md

Use the existing facility and doctor detail patterns as the main guide.

---

## Main Objective

Create a written implementation plan for pharmacy detail reading.

The plan should define:

1. Expected pharmacy detail route pattern.
2. Whether route should use slug, id, or both.
3. Required pharmacy detail fields.
4. Safe fallback behavior when Supabase env is missing.
5. Safe fallback behavior when the pharmacy record is not found.
6. Whether to create a new pharmacy detail helper.
7. How to map Supabase pharmacy row data into the existing public detail/card structure.
8. How to preserve public-safe information only.
9. How pharmacy contact/channel actions should be handled later.
10. What the next implementation task should be.

---

## Scope

Allowed:

- Inspect existing detail page patterns.
- Compare facility detail and doctor detail implementations.
- Review pharmacy public read helper.
- Review existing route naming and listingHref behavior.
- Write a clear pharmacy detail read implementation plan.
- Recommend target files for the next task.

Not allowed:

- Do not implement pharmacy detail helper.
- Do not create pharmacy detail route.
- Do not modify app pages.
- Do not modify SQL.
- Do not modify RLS.
- Do not add Supabase columns.
- Do not implement contact channels.
- Do not implement diagnostics.
- Do not redesign UI.

---

## Planning Questions

Answer these clearly in the task output:

1. What route should pharmacy detail use?
2. What existing route pattern do facilities and doctors use?
3. Does `getPublicProviderDetailPath()` already support pharmacy routes?
4. What fields are already selected in the pharmacy public read helper?
5. Which fields are enough for MVP detail display?
6. What fields should remain private or excluded?
7. Should the detail helper query by slug, id, or both?
8. What fallback should be used when Supabase is unavailable?
9. What should happen when no pharmacy is found?
10. What should Task 144 implement?

---

## Expected Output

Create a concise planning document in this same file or as an added section in this task file.

The plan should include:

- Existing patterns found
- Recommended route
- Recommended helper name
- Recommended file targets
- Data mapping strategy
- Fallback strategy
- Risks
- Acceptance criteria for the next task

---

## Acceptance Criteria

- Existing facility and doctor detail patterns are inspected.
- Pharmacy detail route recommendation is documented.
- Pharmacy detail helper recommendation is documented.
- Required safe public fields are listed.
- Fallback behavior is documented.
- No source code is modified.
- No SQL, schema, or RLS changes are made.
- The next implementation task is clearly recommended.

---

## Deliverable

A planning-only task that prepares the project for pharmacy detail read implementation.

Do not create Task 144 in this task.

---

## Pharmacy Detail Read Implementation Plan

### Existing Facility and Doctor Route Patterns Found

Facilities and doctors already use dynamic public detail routes:

- Facilities: `src/app/facilities/[slug]/page.tsx`
- Doctors: `src/app/doctors/[slug]/page.tsx`

Both routes follow the same broad pattern:

1. Read the route `slug` from `params`.
2. Call a safe Supabase public detail helper by slug.
3. Use active/public filtering inside the helper.
4. Wrap helper calls in route-level safe error handling.
5. Return `notFound()` when the helper does not return `success`.
6. Render only public-safe fields.
7. Avoid raw Supabase error output.
8. Avoid service-role key usage.
9. Use `export const dynamic = "force-dynamic"` for live public reads.

Facility detail uses:

```ts
getSupabasePublicFacilityDetailBySlug(slug)
```

Doctor detail uses:

```ts
getSupabasePublicDoctorDetailBySlug(slug)
```

Facility and doctor detail pages also optionally read public contact channels by provider type and slug. Pharmacy contact channels should be deferred until after the pharmacy detail read itself is verified.

### Current Pharmacy State

The visible `/pharmacies` page is wired to:

```ts
getSupabasePublicPharmacyCards()
```

The route preserves static fallback behavior by using the helper result cards and falling back to `samplePharmacies` when no cards are available.

Current pharmacy page file:

```text
src/app/pharmacies/page.tsx
```

Current pharmacy public helper file:

```text
src/lib/supabase/pharmacies-public-read.ts
```

There is no dynamic pharmacy detail route yet. Current pharmacy app route coverage is:

```text
src/app/pharmacies/page.tsx
```

### Recommended Pharmacy Detail Route

Create the pharmacy detail route in the next implementation task:

```text
src/app/pharmacies/[slug]/page.tsx
```

Recommended public route shape:

```text
/pharmacies/[slug]
```

Expected future test routes after implementation should include active/public pharmacy slugs from the pharmacy test data plan, such as:

```text
/pharmacies/test-pharmacy-alpha
/pharmacies/test-pharmacy-eta-minimal
/pharmacies/test-pharmacy-zeta-disputed
```

Blocked or unknown slugs should return a safe 404 through `notFound()`.

### Recommended Helper Name

Add a pharmacy detail helper in the existing pharmacy public read helper file:

```ts
getSupabasePublicPharmacyDetailBySlug(slug: string)
```

Recommended file:

```text
src/lib/supabase/pharmacies-public-read.ts
```

This keeps pharmacy list and detail reads together, matching the facilities and doctors helper pattern.

### Recommended Files for Task 144

Task 144 should be limited to:

- `src/lib/supabase/pharmacies-public-read.ts`
- `src/app/pharmacies/[slug]/page.tsx`

Optional only if needed for route link alignment:

- `src/lib/public-listing-mappers.ts`

Do not modify SQL, schema, RLS, migrations, diagnostics, ordering, prescription upload, payments, authentication, or protected routes.

### Query by Slug, ID, or Both

The pharmacy detail helper should query by slug only.

Recommended query filters:

```text
slug = requested slug
listing_status = active
visibility_status = public
```

Reasons:

- Facility and doctor detail helpers use slug-based routing.
- Public URLs should be readable and stable.
- `slug` is unique in the pharmacy table draft.
- IDs should remain internal implementation details.
- Querying by both slug and id is unnecessary for MVP and would complicate route design.

The helper should trim and validate the requested slug. Empty or invalid slug input should return a safe unavailable or not-found state, not throw.

### Safe Public Pharmacy Fields

The detail helper should select only the same public-safe fields already used by the pharmacy list helper:

- `id`
- `slug`
- `display_name`
- `pharmacy_type`
- `description`
- `city`
- `area`
- `address_public`
- `landmark_public`
- `service_modes`
- `opening_hours_public`
- `delivery_available`
- `pickup_available`
- `accepts_prescription_upload_preview`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

The helper must not select or expose:

- medicine inventory
- medicine prices
- prescription files or upload records
- patient addresses
- patient data
- order data
- payment data
- private owner contacts
- private staff contacts
- admin notes
- reviewer notes
- verification evidence
- controlled medication workflow fields

### Mapping Strategy

Map the Supabase row into `PublicProviderDetail`.

Recommended mapping:

- Reuse the existing pharmacy row-to-card logic where possible.
- Convert `description` into `description`.
- Use `area` and `city` for `location.displayName`.
- Use `address_public` and `landmark_public` for public address text.
- Use `opening_hours_public` for `workingHours`.
- Use `service_modes` for public service labels.
- Use `pickup_available` and `delivery_available` for preview labels only.
- Use `accepts_prescription_upload_preview` as a public preview flag only, not as an upload workflow.
- Set `contactChannels` to an empty array for Task 144 unless pharmacy contact channels are explicitly added in a later task.
- Set `correctionHref` to `/corrections?listing=${slug}`.

The route can map `PublicProviderDetail` into the existing facility-like `Facility` display type if reusing the existing `FacilityDetailPage` layout is the smallest safe approach. Alternatively, Task 144 may create a simple pharmacy-specific detail route component inside `src/app/pharmacies/[slug]/page.tsx`, as long as it preserves the existing design language and does not redesign the app.

### Detail Link Alignment Note

`getPublicProviderDetailPath()` currently returns dynamic detail paths only for facilities and doctors. For pharmacies, it currently returns the base `/pharmacies` path.

Task 144 should review this before relying on pharmacy card `listingHref`.

Recommended options:

1. Update `getPublicProviderDetailPath()` so pharmacy cards link to `/pharmacies/[slug]`.
2. Or explicitly set pharmacy detail links in the pharmacy Supabase mapping path.

The cleaner long-term option is to update `getPublicProviderDetailPath()` to support pharmacy detail routes once `/pharmacies/[slug]` exists.

### Fallback Strategy

The pharmacy detail helper should preserve safe fallback behavior, but the route should not display static fallback detail pages automatically for failed Supabase reads unless a matching static detail strategy is deliberately added.

Recommended helper result states:

- `success`: active/public pharmacy detail returned from Supabase.
- `not-found`: no matching active/public pharmacy row.
- `unavailable`: missing env, unavailable public client, or invalid slug.
- `error`: safe query failure category.

Recommended route behavior:

- `success`: render public detail page.
- `not-found`: call `notFound()`.
- `unavailable`: call `notFound()` for public route safety.
- `error`: call `notFound()` and avoid exposing raw errors.

This matches the facility and doctor route posture: the public detail route should show a valid public listing or return 404.

### Not-Found Strategy

Return `notFound()` for:

- pending pharmacy rows
- archived pharmacy rows
- hidden pharmacy rows
- internal pharmacy rows
- suspended pharmacy rows
- rejected pharmacy rows
- unknown slugs
- empty slugs
- Supabase unavailable states
- safe query errors

Blocked rows should not render a detail page, even if the row exists in the database.

### Risks

- Pharmacy table may not yet be manually executed or populated in the active Supabase test project.
- Standalone probe currently validates safe fallback behavior; it may not prove live pharmacy rows are available unless env is loaded for that process.
- Pharmacy RLS or anon grants may block reads until manually verified.
- `getPublicProviderDetailPath()` does not yet emit `/pharmacies/[slug]`, so card link alignment needs attention after the route exists.
- Reusing facility-style detail UI may show labels like directions or facility language unless carefully mapped.
- `accepts_prescription_upload_preview` must remain a preview label only; it must not become upload functionality.
- Contact channels should stay deferred unless a later task explicitly wires `provider_contact_channels` with `provider_type = pharmacy`.

### Acceptance Criteria for Task 144

Task 144 should be considered successful if:

- `getSupabasePublicPharmacyDetailBySlug(slug)` exists.
- The helper uses only the public anon Supabase client.
- The helper queries only `public.pharmacies`.
- The helper filters by slug, `listing_status = active`, and `visibility_status = public`.
- The helper selects only public-safe pharmacy fields.
- Raw Supabase errors are not exposed.
- `/pharmacies/[slug]` renders active/public pharmacy details.
- Blocked and unknown pharmacy slugs return 404.
- Static fallback behavior for the pharmacy list page remains intact.
- Existing `/pharmacies` list UI remains visually stable.
- No SQL, schema, RLS, authentication, protected routes, prescription upload, ordering, payment, maps, or diagnostics work is added.

### Recommended Task 144

Recommended title:

```text
CodexTask-144-PharmacyDetailReadHelperAndRouteImplementation.md
```

Recommended objective:

Implement a safe Supabase-backed pharmacy detail read helper and wire `/pharmacies/[slug]` to render only active/public pharmacy discovery records, returning 404 for blocked or unknown slugs, while preserving public-safe field boundaries and avoiding any prescription, inventory, ordering, payment, or protected workflow behavior.
