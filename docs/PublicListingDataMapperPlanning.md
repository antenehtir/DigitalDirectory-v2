# DigitalDirectory-v2 Public Listing Data Mapper Planning

## Purpose

This document defines the planning strategy for future public listing data mappers in DigitalDirectory-v2.

It is documentation-only. It does not add mapper code, type files, Supabase client code, real Supabase queries, packages, `.env` files, SQL, migrations, RLS policies, authentication, backend functionality, protected routes, public listing behavior changes, or frontend UI changes.

The goal is to clarify how current static data and future Supabase rows should be normalized into public-safe UI shapes before implementation begins.

---

## Core Principle

Public listing UI should receive public-safe data transfer objects, not raw database rows.

Mapping should be a deliberate boundary between data storage and presentation. It should preserve the current UI behavior, support seed fallback, normalize provider categories, handle missing fields safely, preserve known routes, and strip private/internal fields before anything reaches cards, detail pages, search results, or previews.

---

## Data Mapper Purpose

Future public listing mappers should:

- Convert current static seed shapes into stable public UI shapes.
- Convert future Supabase rows into the same stable public UI shapes.
- Keep card and detail components independent from storage details.
- Normalize provider types, categories, services, specialties, locations, and verification labels.
- Preserve existing slugs and routes where possible.
- Exclude private fields and internal review data.
- Provide safe fallback values for optional public fields.
- Make migration from seed data to Supabase reads less disruptive.

Mapper functions should be introduced only in a future implementation task.

---

## Why Mapping Is Needed

Mapping is needed because static seed data, future Supabase rows, and UI components have different concerns.

Static seed data:

- Is frontend-only.
- Uses current card-friendly shapes.
- Includes sample-only trust labels.
- Is not real verified healthcare data.

Future Supabase rows:

- Will likely be normalized across tables.
- May use database naming conventions.
- May include relationship rows.
- May include status fields used for public eligibility.
- Must not expose private/internal fields.

UI components:

- Need stable display props.
- Should not know database table details.
- Should not receive private fields.
- Should remain visually unchanged during migration.

Mapping keeps those concerns separated.

---

## Current Static Data Shape Considerations

Current public data is available through seed and sample files.

Current files:

- `src/data/sampleFacilities.ts`
- `src/data/sampleDoctors.ts`
- `src/data/samplePharmacies.ts`
- `src/data/sampleDiagnostics.ts`
- `src/data/seed-facilities.ts`
- `src/data/seed-doctors.ts`
- `src/data/seed-pharmacies.ts`
- `src/data/seed-diagnostics.ts`
- `src/data/seed-services.ts`
- `src/data/seed-specialties.ts`
- `src/data/seed-locations.ts`

Current data characteristics:

- Facility, pharmacy, and diagnostics records can be card-compatible.
- Doctor records have doctor-specific display needs.
- Verification labels are preview/sample labels only.
- Slugs support current static detail routes.
- Provider categories are UI-facing strings.
- Some fields are preview-only for future workflows.

Rules:

- Do not treat current seed records as real verified production data.
- Do not remove seed files during mapper planning.
- Do not change current imports or behavior in this task.
- Future mappers should preserve current UI expectations before connecting Supabase reads.

---

## Future Public Provider Card Shape

Future provider card DTOs should be stable and public-safe.

Recommended shared card fields:

| Field | Purpose |
| --- | --- |
| `id` | Stable public listing identifier |
| `slug` | Public route segment |
| `name` | Public display name |
| `providerType` | Facility, doctor, pharmacy, diagnostics |
| `categoryLabel` | UI category or provider subtype |
| `summary` | Short public card description |
| `locationLabel` | Public location text |
| `verificationStatus` | Public trust label |
| `listingHref` | Public route |
| `primaryActionLabel` | Safe UI action text |
| `secondaryActionLabel` | Safe UI action text |

Optional public card fields:

- `services`
- `specialties`
- `availabilityPreview`
- `telemedicinePreview`
- `pickupPreview`
- `deliveryPreview`
- `diagnosticsType`
- `hoursPreview`

Fields to exclude:

- Owner account IDs
- Internal review status
- Admin notes
- Verification evidence
- Source confidence
- Private contact values
- Patient-specific data

---

## Future Provider Detail Shape

Future provider detail DTOs should extend card DTOs with public detail sections.

Recommended shared detail fields:

| Field | Purpose |
| --- | --- |
| `id` | Stable public listing identifier |
| `slug` | Public route segment |
| `name` | Public display name |
| `providerType` | Provider type |
| `description` | Reviewed public detail text |
| `location` | Public location and address display |
| `contactChannels` | Reviewed public contact methods |
| `workingHours` | Reviewed public hours |
| `verification` | Public trust state and freshness label |
| `services` | Reviewed public services |
| `relatedProviders` | Similar or affiliated public listings |
| `correctionHref` | Route to correction page |

Provider-specific detail fields:

- Doctor specialty and reviewed affiliations.
- Facility departments or service groups later.
- Pharmacy pickup/delivery preview labels.
- Diagnostics lab/imaging preview labels.

Detail DTOs should not include private evidence, admin notes, booking records, patient documents, payments, or owner records.

---

## Facility Mapping Plan

Facility mappers should support public facility cards and detail pages.

Potential source tables later:

- `facilities`
- `locations`
- `facility_services`
- `services`
- `contact_channels`
- `working_hours`

Mapping direction:

| Source Field | UI Direction |
| --- | --- |
| `facilities.id` | `id` |
| `facilities.slug` | `slug` and `/facilities/{slug}` |
| `facilities.name` | `name` |
| `facilities.facility_type` | `categoryLabel` |
| `facilities.summary` | `summary` |
| `locations.name` | `locationLabel` |
| `facilities.verification_status` | `verificationStatus` |
| `facility_services + services` | `services` |
| `contact_channels` | `contactChannels` |
| `working_hours` | `workingHours` or `hoursPreview` |

Rules:

- Only map published/public facilities.
- Only map reviewed public services.
- Only map reviewed public contact channels.
- Treat emergency, 24-hour, location, and phone claims as high-impact fields.
- Exclude owner, review, evidence, and audit fields.

---

## Doctor Mapping Plan

Doctor mappers should support doctor cards and detail pages without implying booking.

Potential source tables later:

- `doctors`
- `specialties`
- `locations`
- `doctor_facility_affiliations`
- `facilities`
- `contact_channels` if public doctor contacts are approved later

Mapping direction:

| Source Field | UI Direction |
| --- | --- |
| `doctors.id` | `id` |
| `doctors.slug` | `slug` and `/doctors/{slug}` |
| `doctors.full_name` | `name` |
| `doctors.display_title` | Prefix or display title |
| `specialties.name` | `specialtyLabel` |
| `doctors.summary` | `summary` |
| `locations.name` | `locationLabel` |
| `doctors.verification_status` | `verificationStatus` |
| `doctor_facility_affiliations + facilities` | `affiliations` |
| `doctors.availability_summary` | `availabilityPreview` |
| `doctors.telemedicine_preview_status` | `telemedicinePreview` |

Rules:

- Only map published/public doctors.
- Only map reviewed public affiliations.
- Do not map booking slots.
- Do not map patient appointment history.
- Do not map credential documents.
- Do not treat ownership as verification.

---

## Pharmacy Mapping Plan

Pharmacy mappers should support public pharmacy discovery only.

Potential source tables later:

- `pharmacies`
- `locations`
- pharmacy service relationships later
- `services`
- `contact_channels`
- `working_hours`

Mapping direction:

| Source Field | UI Direction |
| --- | --- |
| `pharmacies.id` | `id` |
| `pharmacies.slug` | `slug` and `/pharmacies` or future detail route |
| `pharmacies.name` | `name` |
| `pharmacies.summary` | `summary` |
| `locations.name` | `locationLabel` |
| `pharmacies.verification_status` | `verificationStatus` |
| `pharmacies.pickup_available_preview` | `pickupPreview` |
| `pharmacies.delivery_ready_preview` | `deliveryPreview` |
| `contact_channels` | `contactChannels` |

Rules:

- Do not map medication inventory.
- Do not map prescription uploads.
- Do not map orders, delivery addresses, or payment records.
- Keep pickup and delivery labels preview-only until real workflows exist.
- Exclude private pharmacy contacts.

---

## Diagnostics Provider Mapping Plan

Diagnostics mappers should support public diagnostics discovery only.

Potential source tables later:

- `diagnostics_providers`
- `locations`
- diagnostics service relationships later
- `services`
- `contact_channels`
- `working_hours`

Mapping direction:

| Source Field | UI Direction |
| --- | --- |
| `diagnostics_providers.id` | `id` |
| `diagnostics_providers.slug` | `slug` and `/diagnostics` or future detail route |
| `diagnostics_providers.name` | `name` |
| `diagnostics_providers.diagnostics_type` | `categoryLabel` |
| `diagnostics_providers.summary` | `summary` |
| `locations.name` | `locationLabel` |
| `diagnostics_providers.verification_status` | `verificationStatus` |
| `lab_services_preview` | `labServicesPreview` |
| `imaging_services_preview` | `imagingServicesPreview` |
| `contact_channels` | `contactChannels` |

Rules:

- Do not map lab result data.
- Do not map test orders.
- Do not map pricing, booking, or payment records.
- Do not map result-ready status.
- Keep result and document workflows separate.

---

## Service, Specialty, and Location Mapping Plan

Taxonomy mappers should normalize reusable public labels.

Services:

- Map `id`, `slug`, `name`, `category`, and public description.
- Exclude internal risk notes from public DTOs unless they become approved public labels.
- Do not imply real-time availability.

Specialties:

- Map `id`, `slug`, `name`, and public description.
- Support parent specialty labels later if needed.
- Do not imply doctor verification.

Locations:

- Map `id`, `slug`, `name`, `location_type`, and parent location display.
- Do not map patient live location.
- Do not expose unreviewed coordinates as trusted destination data.

Rules:

- Only active/public taxonomy records should appear.
- Archive or hidden taxonomy records should not be used in public filters.
- Missing taxonomy references should degrade gracefully.

---

## Supabase Row-to-UI Mapping Plan

Future row-to-UI mapping should follow a layered flow.

Recommended flow:

1. Supabase public read returns published public-safe rows.
2. Query helper narrows selected fields.
3. Mapper converts row shape into public DTO.
4. Mapper drops private/internal fields.
5. Mapper normalizes categories, labels, and missing values.
6. UI receives the same shape it expects today.

Potential mapper categories:

- `mapFacilityRowToCard`
- `mapFacilityRowToDetail`
- `mapDoctorRowToCard`
- `mapDoctorRowToDetail`
- `mapPharmacyRowToCard`
- `mapDiagnosticsRowToCard`
- `mapServiceRowToOption`
- `mapSpecialtyRowToOption`
- `mapLocationRowToOption`

These are future names only. Do not create mapper functions in this task.

---

## Category Normalization

Provider categories should be consistent between seed data, database rows, and UI.

Provider type examples:

- Facility
- Doctor
- Pharmacy
- Diagnostics

Facility category examples:

- Hospital
- Clinic
- Health center
- Specialty center

Diagnostics category examples:

- Laboratory
- Imaging
- Mixed diagnostics

Normalization rules:

- Use stable internal values for data.
- Use friendly labels for UI.
- Avoid duplicating equivalent category names.
- Keep pharmacy and diagnostics provider types distinct from general facilities when useful for discovery.
- Keep category mapping explicit so search/filter labels remain stable.

---

## Missing Field Handling

Mappers should handle missing optional fields without breaking layouts.

Rules:

- Missing summary should become a safe generic public description.
- Missing location should show a neutral location label, not crash.
- Missing services should become an empty list or safe default.
- Missing verification status should show unverified or pending according to policy.
- Missing image should use no image rather than a broken image.
- Missing contact channels should show no public contact, not private fallback.
- Missing hours should show a safe preview label such as "Hours not listed" later.

Avoid:

- Guessing medical services.
- Inventing verification.
- Filling missing phone/address from private fields.
- Showing raw `null`, `undefined`, or database error text.

---

## Slug and Route Preservation

Mappers should preserve stable public routes.

Current static routes include:

- `/facilities/addis-health-center`
- `/doctors/dr-hana-bekele`

Route rules:

- Use reviewed `slug` fields for canonical public routes.
- Preserve existing slugs where possible during migration.
- Avoid changing public URLs during the first read rollout.
- If a provider lacks a detail route, use safe fallback category links.
- Do not expose internal IDs as route segments unless approved.
- Keep duplicate or merged records from creating broken public links.

Slug conflicts should be resolved before publication, not in UI components.

---

## Public and Private Field Protection

Mappers should be a final guard against private field leakage.

Never map these into public UI:

- Admin notes
- Reviewer notes
- Verification evidence
- Private provider contacts
- Private submitter contacts
- Provider owner account IDs
- Organization membership IDs
- Source confidence
- Review assignments
- Audit logs
- Request payloads
- Patient identity
- Booking data
- Payment or wallet data
- Document vault records
- Notification history
- Chatbot logs
- Community memberships

Protection rule:
If a field is not explicitly needed for public display, the mapper should drop it.

---

## Static Fallback Compatibility

Future mappers should support both static seed and Supabase data during transition.

Compatibility goals:

- UI components receive stable DTOs regardless of source.
- Seed data can still render all current pages.
- Supabase rows can be introduced one provider type at a time.
- Fallback can be removed later only after Supabase reads are stable.

Potential future flow:

```text
seed record -> mapper -> public DTO -> UI
Supabase row -> mapper -> public DTO -> UI
```

Rules:

- Do not break current sample exports.
- Do not mix fake and production records without clear rules.
- Keep sample-only verification labels from becoming real trust claims.
- Keep fallback behavior environment-aware later.

---

## Testing Checklist

Future mapper tests should verify:

1. Facility row maps to facility card DTO.
2. Facility row maps to detail DTO.
3. Doctor row maps to doctor card DTO.
4. Doctor row maps to detail DTO.
5. Pharmacy row maps to public pharmacy DTO.
6. Diagnostics row maps to public diagnostics DTO.
7. Services map to public labels.
8. Specialties map to public labels.
9. Locations map to public labels.
10. Missing optional fields do not crash.
11. Private fields are dropped.
12. Draft/hidden records are not mapped as public when eligibility is checked upstream.
13. Slugs become correct public hrefs.
14. Existing known routes remain stable.
15. Static seed data can still map into UI DTOs.
16. Supabase row shape can map into the same UI DTOs.

No tests are added in this planning task.

---

## Build and Regression Safety

Mapping implementation should avoid breaking public pages.

Safety rules:

- Add mappers in a small future task.
- Keep UI component props stable.
- Avoid broad refactors while adding first mappers.
- Test card grids, detail pages, search pages, nearby, pharmacies, and diagnostics pages.
- Verify mobile layouts still work with missing or long text.
- Run lint and build after mapper implementation.
- Keep seed fallback available during mapper rollout.

Regression risks:

- Narrow cards from long provider names.
- Blank buttons from missing labels.
- Broken links from missing slugs.
- Hidden records appearing publicly.
- Private fields accidentally passed to components.
- Search/filter labels changing unexpectedly.

---

## Relationship to Public Listing Read Implementation Prep

This document supports `PublicListingReadImplementationPrep.md`.

Relationship:

- Implementation prep defines when and how public reads should be introduced.
- This mapper plan defines how data should be transformed before UI uses it.
- Implementation prep emphasizes fallback and rollback.
- This mapper plan preserves DTO compatibility and stable routes.

Mapper planning should be complete before the first public read integration task.

---

## Relationship to Public Listing Schema Draft

This document depends on `PublicListingSchemaDraft.md`.

Relationship:

- Schema draft defines future tables and fields.
- This mapper plan defines how those fields become UI DTOs.
- Schema draft separates public/private fields.
- This mapper plan strips private fields before UI.
- Schema draft defines status and relationship tables.
- This mapper plan uses those concepts for eligibility and relationship labels.

---

## Relationship to RLS Policy Planning

This document depends on `RLSPolicyPlanning.md`.

Relationship:

- RLS planning protects data at database access time.
- Mappers protect UI boundaries after data is read.
- RLS denies private data by default.
- Mappers avoid passing private data even if a query accidentally selected it.
- Both layers are needed before production public reads.

Mapper safety does not replace RLS.

---

## MVP Recommendation

Do not add mapper code in this task.

Current MVP stance:

- Keep current static seed data active.
- Keep current public listing behavior unchanged.
- Do not add mapper files.
- Do not add type files.
- Do not add Supabase client code.
- Do not add real queries.
- Do not install packages.
- Do not add `.env` files, SQL, migrations, or RLS policies.
- Do not add auth, backend, protected routes, or UI changes.

Recommended first future mapper step:
Create public DTO types and mapper functions for one low-risk provider type, likely facilities, while keeping seed fallback and existing UI behavior intact.

---

## Risks

Key risks:

- Passing raw database rows directly to UI.
- Leaking private fields through mapper output.
- Breaking existing card/detail page props.
- Losing stable slugs and routes.
- Treating sample verification labels as real production verification.
- Guessing missing medical or contact information.
- Changing category labels unexpectedly.
- Removing seed fallback too early.
- Mapping unpublished records into public UI.
- Creating a mapper layer that mixes patient, booking, payment, document, chatbot, or community data into public listings.

Mitigations:

- Use explicit public DTOs.
- Drop private fields by default.
- Preserve current UI prop shapes during transition.
- Test missing fields and long text.
- Preserve known slugs.
- Keep mapping per provider type.
- Keep seed fallback until Supabase reads are stable.
- Do not add advanced workflow fields to public listing DTOs.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only until implementation is approved.
2. Review this mapper plan with schema, RLS, read integration, and implementation prep docs.
3. Define public card DTOs for facilities, doctors, pharmacies, and diagnostics providers.
4. Define public detail DTOs for facilities and doctors.
5. Define service, specialty, and location DTOs.
6. Choose the first mapper implementation slice.
7. Add mapper tests in a future implementation task.
8. Add mapper functions for seed data first if needed.
9. Add Supabase row mappers only after tables and RLS exist.
10. Connect one public read surface through DTO mappers.
11. Keep seed fallback and rollback available.
12. Expand mapper coverage only after first slice is stable.

---

## Summary

Public listing data mappers should protect DigitalDirectory-v2 from storage-shape churn and private field leakage.

The future mapper layer should convert both static seed records and Supabase rows into stable public UI DTOs, normalize categories, handle missing fields safely, preserve slugs/routes, keep seed fallback compatible, and exclude private/internal data.

The recommended current action is documentation only. No mapper code, type files, Supabase client code, queries, packages, `.env` files, SQL, migrations, RLS policies, authentication, backend functionality, protected routes, public listing behavior changes, or frontend UI modifications should be added in this task.
