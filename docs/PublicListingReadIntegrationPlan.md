# DigitalDirectory-v2 Public Listing Read Integration Plan

## Purpose

This document defines how the first read-only Supabase-backed public listing integration should work later in DigitalDirectory-v2.

It is documentation-only. It does not add Supabase read code, Supabase packages, `.env` files, SQL, migrations, RLS policies, backend functionality, authentication, dashboards, protected routes, storage, or frontend UI changes.

The goal is to plan a narrow public listing read path for facilities, doctors, pharmacies, diagnostics providers, services, specialties, locations, public relationships, seed fallback, loading/error states, and public/private field protection before implementation begins.

---

## Core Principle

The first Supabase read integration should be read-only, public-safe, and login-free.

DigitalDirectory-v2 should not connect public pages to Supabase until the public listing schema, environment setup, client setup plan, and RLS policy direction are ready. The first integration should read only published public listing data and should not touch private request/review, ownership, patient, booking, payment, document, chatbot, notification, community, storage, or admin data.

---

## Public Listing Read Purpose

The public listing read integration should eventually:

- Replace selected static seed reads with Supabase-backed public listing reads.
- Keep public healthcare discovery open without authentication.
- Preserve current homepage, search, facilities, doctors, pharmacies, diagnostics, nearby, and detail page behavior.
- Read only public-safe fields from published records.
- Use static seed data as a controlled fallback during the transition.
- Avoid service role key usage.
- Preserve responsive UI and current frontend design.

The first read integration should prove that database-backed public listings can work safely before any write, admin, provider, or patient workflow is added.

---

## Read-Only Public Access Principles

Read-only public access should follow these principles:

- Anonymous users can read published public-safe listing records.
- Anonymous users do not need accounts.
- Public reads should use the public anon key with tested RLS later.
- Public reads should not use the service role key.
- Public reads should select only fields required by UI.
- Public reads should filter by published listing status and public visibility.
- Public reads should not expose draft, hidden, archived, rejected, duplicate, or private records.
- Public reads should not include private notes, ownership records, verification evidence, request payloads, audit logs, or patient data.
- Public reads should not imply booking, payment, document vault, chat, or community functionality.

Plain-language read rule:

```text
Public pages can read only published records intended for public display.
```

This is not SQL or client code.

---

## Facilities Read Plan

Facilities should be one of the first public listing read targets.

Future read source:

```text
facilities
```

Related public data:

- `locations`
- `facility_services`
- `services`
- `contact_channels`
- `working_hours`

Public facility fields:

- `id`
- `slug`
- `name`
- `facility_type`
- `summary`
- `description`
- `location`
- `address_line`
- `directions_note`
- `verification_status`
- `listing_status`
- `visibility_status`
- public services
- public contact channels
- public working hours

Read rules:

- Fetch only published/public facilities.
- Include only reviewed public services.
- Include only reviewed public contact channels.
- Do not include owner account IDs.
- Do not include private contacts.
- Do not include admin notes.
- Do not include verification evidence.
- Do not include patient, booking, payment, document, or review data.

Candidate future read helpers:

- `getPublishedFacilities`
- `getFacilityBySlug`
- `getFacilitiesByService`
- `getFacilitiesByLocation`

These helpers should not be created in this task.

---

## Doctors Read Plan

Doctors should be read as public profiles, not as bookable providers.

Future read source:

```text
doctors
```

Related public data:

- `specialties`
- `locations`
- `doctor_facility_affiliations`
- `facilities`
- `contact_channels`, if public doctor contacts are approved later

Public doctor fields:

- `id`
- `slug`
- `full_name`
- `display_title`
- `specialty`
- `summary`
- `bio`
- `location`
- `verification_status`
- `listing_status`
- `visibility_status`
- public facility affiliations
- preview availability summary
- telemedicine preview status

Read rules:

- Fetch only published/public doctors.
- Include only reviewed public affiliations.
- Do not include private doctor contact details.
- Do not include credential documents.
- Do not include owner account links.
- Do not include booking slots or patient booking history.
- Do not imply that preview availability is a real booking workflow.

Candidate future read helpers:

- `getPublishedDoctors`
- `getDoctorBySlug`
- `getDoctorsBySpecialty`
- `getDoctorsByFacility`
- `getDoctorsByLocation`

These helpers should not be created in this task.

---

## Pharmacies Read Plan

Pharmacy reads should support discovery only, not medication inventory or ordering.

Future read source:

```text
pharmacies
```

Related public data:

- `locations`
- pharmacy service relationship table later, if needed
- `services`
- `contact_channels`
- `working_hours`

Public pharmacy fields:

- `id`
- `slug`
- `name`
- `summary`
- `description`
- `location`
- `address_line`
- `verification_status`
- `listing_status`
- `visibility_status`
- pickup preview status
- delivery-ready preview status
- public services
- public contact channels

Read rules:

- Fetch only published/public pharmacies.
- Do not include medication inventory.
- Do not include prescription data.
- Do not include pricing.
- Do not include orders.
- Do not include delivery addresses.
- Do not include patient contact details.
- Keep pickup and delivery labels clearly preview-only until real workflows exist.

Candidate future read helpers:

- `getPublishedPharmacies`
- `getPharmacyBySlug`
- `getPharmaciesByLocation`
- `getPharmaciesByService`

These helpers should not be created in this task.

---

## Diagnostics Providers Read Plan

Diagnostics reads should support public discovery only.

Future read source:

```text
diagnostics_providers
```

Related public data:

- `locations`
- diagnostics service relationship table later, if needed
- `services`
- `contact_channels`
- `working_hours`

Public diagnostics fields:

- `id`
- `slug`
- `name`
- `diagnostics_type`
- `summary`
- `description`
- `location`
- `address_line`
- `verification_status`
- `listing_status`
- `visibility_status`
- public lab service preview
- public imaging service preview
- public contact channels

Read rules:

- Fetch only published/public diagnostics providers.
- Do not include lab result data.
- Do not include test order data.
- Do not include pricing.
- Do not include booking slots.
- Do not include payment records.
- Do not include clinical interpretations.

Candidate future read helpers:

- `getPublishedDiagnosticsProviders`
- `getDiagnosticsProviderBySlug`
- `getDiagnosticsProvidersByLocation`
- `getDiagnosticsProvidersByService`

These helpers should not be created in this task.

---

## Services, Specialties, and Locations Read Plan

Taxonomy reads should support filtering, category pages, and listing display.

Future read sources:

- `services`
- `specialties`
- `locations`

Public taxonomy fields:

- `id`
- `slug`
- `name`
- `description`
- category or type
- parent relationship where relevant
- display order
- listing status

Read rules:

- Fetch only active/public taxonomy records.
- Do not expose internal risk notes.
- Do not expose source confidence.
- Do not include unpublished taxonomy terms.
- Do not treat taxonomy labels as proof of service availability.
- Do not request live user location.

Candidate future read helpers:

- `getPublicServices`
- `getPublicSpecialties`
- `getPublicLocations`
- `getServiceBySlug`
- `getSpecialtyBySlug`
- `getLocationBySlug`

These helpers should not be created in this task.

---

## Relationship Data Read Plan

Relationship data should be public only when reviewed and published.

Future relationship sources:

- `doctor_facility_affiliations`
- `facility_services`
- future `pharmacy_services`
- future `diagnostics_services`
- future `doctor_specialties`

Relationship read rules:

- Fetch only active/public relationships.
- Include only relationships where both linked records are public/published.
- Do not show draft or disputed relationships.
- Do not show affiliations that are pending review.
- Do not treat ownership as public relationship data.
- Do not expose internal review status details.

Important examples:

- A doctor can appear at a facility only when the affiliation is reviewed.
- A facility can show a service only when the service relationship is reviewed.
- A pharmacy can show pickup or delivery previews only as public discovery labels, not operational promises.

---

## Search and Filtering Behavior

The first read integration should keep search/filtering simple.

Initial public filtering may include:

- Provider type
- Location
- Service
- Specialty
- Verification status
- Facility type
- Diagnostics type
- Pharmacy preview flags

Initial public search may use:

- Name matching
- Specialty matching
- Service matching
- Location matching
- Provider type matching

Rules:

- Do not add real advanced search logic in this documentation task.
- Do not add full-text search, vector search, geolocation, or map logic yet.
- Do not add URL query handling here.
- Do not store search history.
- Do not personalize results by patient identity.
- Do not rank using reviews, bookings, payments, or private data.
- Search results should include only public-safe DTOs.

Future query module should separate:

- Listing reads
- Taxonomy reads
- Search/filter helpers
- Mapping database rows to UI DTOs

---

## Static Seed Fallback Strategy

Static seed data should remain available during the transition.

Current seed fallback sources:

- `sampleFacilities`
- `sampleDoctors`
- `samplePharmacies`
- `sampleDiagnostics`
- `seedServices`
- `seedSpecialties`
- `seedLocations`

Fallback rules:

- Keep seed data as the default until Supabase read integration is approved.
- During transition, use fallback only intentionally.
- Do not mix sample records with production verified records without clear rules.
- Do not present sample verification labels as real production claims.
- In production, fallback should not silently hide backend failures unless product policy allows it.
- In development, fallback can keep UI usable while backend setup is incomplete.

Recommended transition stages:

| Stage | Data Source | Use |
| --- | --- | --- |
| Current | Static seed only | Existing frontend-only app |
| Stage 1 | Supabase read with seed fallback in dev/staging | Integration testing |
| Stage 2 | Supabase read primary, seed fallback limited | Controlled rollout |
| Stage 3 | Supabase read only for production public listings | After confidence and RLS testing |

---

## Loading and Error States

Supabase-backed reads should not degrade the user experience.

Loading rules:

- Preserve current page structure.
- Avoid layout shifts in card grids.
- Use stable skeleton or reserved space later if needed.
- Keep mobile layouts clean.
- Do not block public navigation longer than necessary.

Empty state rules:

- Show a clear public-safe empty message when no public listings match.
- Distinguish "no results" from "could not load".
- Keep empty states helpful without implying missing medical care.

Error rules:

- Do not show raw Supabase errors to users.
- Do not expose table names, RLS failures, keys, or internal IDs.
- Log details only in appropriate server/developer contexts later.
- Use generic public copy for load failures.
- Decide when seed fallback is allowed.

Public-safe message example:

```text
We could not load these listings right now. Please try again shortly.
```

---

## Public and Private Field Protection

Public listing reads should use public DTOs or mapping functions later.

Public DTO rules:

- Include only display fields needed by UI.
- Exclude private/internal fields by default.
- Exclude owner account IDs.
- Exclude admin and reviewer notes.
- Exclude verification evidence.
- Exclude private contacts.
- Exclude source confidence.
- Exclude audit history.
- Exclude request payloads.
- Exclude patient, booking, payment, document, chatbot, notification, and community data.

Protection layers:

1. Public/private schema separation.
2. RLS policies.
3. Narrow query field selection.
4. Public DTO mapping.
5. UI components that expect public-safe props only.
6. Tests that detect private field leakage.

Rule:
The UI should never need raw private database records to render public listing pages.

---

## No-Auth Access Rules

Public listing reads should not require authentication.

Rules:

- Users can browse public listings without login.
- Users can search public listings without login.
- Users can view public detail pages without login.
- Users can open shared public links without login.
- Public reads should not create accounts.
- Public reads should not create patient IDs.
- Public reads should not use patient preferences.
- Public reads should not expose saved provider state.

Auth should come later for:

- Provider ownership
- Admin/reviewer dashboards
- Patient booking history
- Patient document vault
- Wallet/payments
- Reviews requiring verified visit
- Community group membership
- Notification preferences

---

## No Service Role Usage

The first public listing read integration should not use the service role key.

Rules:

- Use only browser-safe public anon key for public client reads later.
- Do not use service role for ordinary public listing queries.
- Do not expose service role key to browser bundles.
- Do not add admin client for public reads.
- Do not add server-side privileged workarounds for RLS.
- If a public read fails because of RLS, fix the policy in a future database task rather than bypassing RLS with service role.

Service role should be reserved for future server-only workflows such as admin actions, search indexing, validated request processing, or webhooks.

---

## Future Query Module Planning

Future query modules should keep reads organized and safe.

Potential future files:

```text
src/lib/supabase/public-listings.ts
src/lib/supabase/public-taxonomy.ts
src/lib/supabase/public-search.ts
src/lib/supabase/mappers.ts
src/lib/supabase/errors.ts
```

Potential future responsibilities:

| Module | Purpose |
| --- | --- |
| `public-listings.ts` | Facilities, doctors, pharmacies, diagnostics provider reads |
| `public-taxonomy.ts` | Services, specialties, locations |
| `public-search.ts` | Simple search/filter composition |
| `mappers.ts` | Convert rows to public DTOs |
| `errors.ts` | Normalize public-safe errors |

Rules:

- Do not create these files in this task.
- Keep query helpers read-only at first.
- Keep public reads separate from request/admin/provider/patient reads.
- Avoid importing admin/server clients into public modules.
- Keep public DTOs stable for UI components.

---

## Testing Checklist

Future read integration should pass a focused checklist.

Checklist:

1. Public facilities load without authentication.
2. Public doctors load without authentication.
3. Public pharmacies load without authentication.
4. Public diagnostics providers load without authentication.
5. Public services, specialties, and locations load without authentication.
6. Detail reads by slug work for published records.
7. Draft, hidden, archived, rejected, and duplicate records do not load publicly.
8. Private fields are not returned in public DTOs.
9. Provider ownership data is not returned.
10. Admin/reviewer notes are not returned.
11. Verification evidence is not returned.
12. Patient, booking, payment, document, chatbot, notification, and community data are not queried.
13. Service role key is not used.
14. Browser bundle does not include service role key.
15. Public read errors show generic messages.
16. Empty states render correctly.
17. Seed fallback behavior is explicit and environment-aware.
18. Mobile layouts remain stable during loading and error states.
19. Search/filter helpers use only public fields.
20. RLS is tested before production use.

No tests are added in this documentation task.

---

## What Must Not Be Implemented Yet

Do not implement any of the following in this task:

- Supabase read code
- Supabase package installation
- Supabase client files
- `.env` files
- Real keys
- SQL
- Migrations
- RLS policies
- Backend routes
- Server actions
- Authentication
- Dashboards
- Protected routes
- Storage
- Edge Functions
- Public form writes
- Provider owner reads
- Admin/reviewer reads
- Patient reads
- Booking reads
- Payment reads
- Document vault reads
- Chatbot/community reads
- UI changes

This document is a planning artifact only.

---

## Relationship to Supabase Client Setup Planning

This document depends on `SupabaseClientSetupPlanning.md`.

Relationship:

- Client setup planning defines browser/server/admin client boundaries.
- This read integration plan defines the first public read use case.
- Client setup planning defines seed fallback and type safety strategy.
- This plan applies those ideas to facilities, doctors, pharmacies, diagnostics providers, and taxonomy reads.
- Client setup planning warns against service role exposure.
- This plan requires no service role for public listing reads.

Rule:
Public read integration should not begin until client setup boundaries are accepted.

---

## Relationship to Public Listing Schema Draft

This document depends on `PublicListingSchemaDraft.md`.

Relationship:

- The schema draft defines candidate tables and fields.
- This plan defines how public pages should read those fields later.
- The schema draft separates public/private fields.
- This plan requires DTOs and mappers to preserve that separation.
- The schema draft defines relationship tables.
- This plan defines how relationship data can be read only after review/publication.

Rule:
Read helpers should be shaped around public schema fields, not around raw internal tables.

---

## Relationship to RLS Policy Planning

This document depends on `RLSPolicyPlanning.md`.

Relationship:

- RLS planning defines which records anonymous users can read.
- This plan defines how public pages should request those records.
- RLS planning denies private data by default.
- This plan avoids querying private data in the first place.
- RLS planning forbids service role exposure.
- This plan avoids service role usage for public reads.

Rule:
No public read integration should connect to production until RLS has been tested against published and unpublished records.

---

## MVP Recommendation

Do not add Supabase public read integration in this documentation task.

Current MVP stance:

- Keep the app frontend-only.
- Keep static seed data active.
- Do not add Supabase read code.
- Do not install packages.
- Do not create `.env` files.
- Do not add SQL, migrations, or RLS policies.
- Do not add backend, auth, dashboards, protected routes, or storage.
- Do not modify frontend UI.

Recommended first implementation later:
Connect one low-risk public read surface, such as published facilities or public taxonomy, in a dedicated implementation task after environment variables, client setup, schema, and RLS are ready in development or staging.

---

## Risks

Key risks:

- Querying private fields into public UI.
- Using service role key for public reads.
- Connecting UI before RLS is tested.
- Showing draft or hidden records publicly.
- Mixing sample seed records with real production records unclearly.
- Requiring login for public discovery.
- Treating preview availability as real booking.
- Adding advanced search before public schema is stable.
- Exposing raw Supabase error messages.
- Removing seed fallback before backend reliability is proven.
- Pulling patient, booking, payment, document, chatbot, notification, or community data into public listing reads.

Mitigations:

- Keep first read slice public-only and read-only.
- Use public anon key plus RLS.
- Select narrow public fields.
- Use public DTOs and mapper functions.
- Keep seed fallback explicit.
- Test published/unpublished access in staging.
- Keep advanced workflows out of public read modules.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only until Supabase implementation is approved.
2. Finalize public listing schema fields.
3. Finalize RLS public read rules.
4. Finalize Supabase client setup boundaries.
5. Define public DTOs for facilities, doctors, pharmacies, and diagnostics providers.
6. Define public taxonomy DTOs for services, specialties, and locations.
7. Define future query helper names and return shapes.
8. Create Supabase project and environment variables in a dedicated setup task.
9. Add Supabase package/client in a dedicated client setup task.
10. Add public listing tables and RLS in a dedicated database task.
11. Seed reviewed public taxonomy and listing records in staging.
12. Test public read access and private data denial.
13. Connect one public read surface to Supabase.
14. Add additional public reads incrementally.
15. Add public request submissions only after validation and review queues are ready.
16. Add auth, dashboards, provider ownership, patient workflows, booking, payments, documents, notifications, chatbot, community, storage, and Edge Functions only in later phases.

---

## Summary

The first public listing read integration should be narrow, read-only, public-safe, and login-free.

It should read only published facilities, doctors, pharmacies, diagnostics providers, services, specialties, locations, and reviewed relationships. It should preserve static seed fallback during transition, protect private fields through schema/RLS/DTO layers, avoid service role usage, and keep advanced workflows out of scope.

The recommended current action is documentation only. No Supabase read code, packages, `.env` files, SQL, migrations, RLS policies, backend functionality, auth, dashboards, protected routes, storage, or frontend UI changes should be added in this task.
