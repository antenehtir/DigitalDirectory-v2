# DigitalDirectory-v2 Static Preview Routes and UI Cleanup Inventory

## Purpose

This document inventories old/static preview routes, sample cards, category buttons, and UI sections that still exist alongside the newer Supabase-backed facility and doctor public listing system.

This is documentation-only. It does not modify app code, frontend UI, routes, SQL, RLS policies, test data, environment values, keys, service-role usage, or commits.

## Context Reviewed

Documentation reviewed:

- `docs/CodexTask-132-StaticPreviewRoutesAndUICleanupInventory.md`
- `docs/FacilityDetailRouteQARecord.md`
- `docs/DoctorDetailRouteQARecord.md`
- `docs/FacilityContactChannelsWiringQARecord.md`
- `docs/DoctorContactChannelsWiringQARecord.md`
- `docs/ProviderContactChannelsRuntimeQARecord.md`
- `docs/CodexTask-131A-PublicCardDetailLinkAlignment.md`

Implementation context inspected:

- `src/app/page.tsx`
- `src/app/facilities/page.tsx`
- `src/app/facilities/[slug]/page.tsx`
- `src/app/doctors/page.tsx`
- `src/app/doctors/[slug]/page.tsx`
- `src/app/search`
- `src/app/nearby`
- `src/app/pharmacies`
- `src/components`
- `src/lib/public-listing-source.ts`
- `src/lib/public-listing-mappers.ts`
- `src/types/public-listings.ts`

## Current Supabase-Backed State

Supabase-backed public reads currently exist for:

- `/facilities`
- `/facilities/[slug]`
- `/doctors`
- `/doctors/[slug]`

Confirmed active/public dynamic facility detail routes:

- `/facilities/test-facility-alpha`
- `/facilities/test-facility-eta-minimal`
- `/facilities/test-facility-zeta-disputed`

Confirmed active/public dynamic doctor detail routes:

- `/doctors/test-doctor-alpha`
- `/doctors/test-doctor-eta-minimal`
- `/doctors/test-doctor-zeta-disputed`

Confirmed blocked routes:

- `/facilities/test-facility-beta-pending` returns `404`
- `/doctors/test-doctor-beta-pending` returns `404`

Facility and doctor detail pages also now show active/public provider contact channels from `provider_contact_channels`.

## Static/Sample Preview Cards Still Present

### Facility Sample Cards

Sample facility records still exist in `src/data/seed-facilities.ts` and surface through `sampleFacilities`.

Names found:

- Addis Health Center
- Unity Medical Clinic
- Sunrise Diagnostic Lab
- Kazanchis Community Clinic

Where they appear:

- Homepage verified facilities section: `src/components/home/VerifiedFacilitiesPreview.tsx`
- Search results page: `src/components/search-results/SearchResultsPage.tsx`
- Nearby page: `src/components/nearby/NearbyFacilitiesPreview.tsx`
- Static fallback for `/facilities` through `sampleFacilities`
- Static facility detail route for Addis Health Center

Current link behavior:

- `FacilityCard` now prefers `facility.detailHref` when supplied.
- Supabase-backed facility cards receive `detailHref` from `PublicProviderCard.listingHref`.
- Static Addis Health Center cards still link to `/facilities/addis-health-center`.
- Other static facility cards fall back to `/facilities`.

Relationship to Supabase-backed records:

- These sample cards are separate from Supabase-backed test rows such as Test Facility Alpha, Test Facility Eta Minimal, and Test Facility Zeta Disputed.
- They should be treated as fallback or visual preview data until converted into reviewed Supabase rows.

### Doctor Sample Cards

Sample doctor records still exist in `src/data/seed-doctors.ts` and surface through `sampleDoctors`.

Names found:

- Dr. Hana Bekele
- Dr. Samuel Tesfaye
- Dr. Meron Dawit

Where they appear:

- Homepage doctor discovery section: `src/components/home/DoctorDiscoverySection.tsx`
- Search results page: `src/components/search-results/SearchResultsPage.tsx`
- Static fallback for `/doctors` through `sampleDoctors`
- Static doctor detail route for Dr. Hana Bekele
- Similar doctor cards inside the old static doctor detail page

Current link behavior:

- `DoctorCard` now prefers `doctor.detailHref` when supplied.
- Supabase-backed doctor cards receive `detailHref` from `PublicProviderCard.listingHref`.
- Static Dr. Hana Bekele cards still link to `/doctors/dr-hana-bekele`.
- Other static doctor cards fall back to `/doctors`.

Relationship to Supabase-backed records:

- These sample cards are separate from Supabase-backed test rows such as Dr. Test Doctor Alpha, Test Doctor Eta Minimal, and Dr. Test Doctor Zeta Disputed.
- They should be treated as fallback or visual preview data until converted into reviewed Supabase rows.

### Pharmacy Sample Cards

Sample pharmacy records still exist in `src/data/seed-pharmacies.ts` and surface through `samplePharmacies`.

Names found:

- Bole Community Pharmacy
- Central Care Pharmacy
- Kazanchis Health Pharmacy

Where they appear:

- `/pharmacies` through `src/components/pharmacies/PharmacyResultsSection.tsx`
- Pharmacy discovery remains frontend/static preview-only.

Current link behavior:

- Pharmacy cards reuse `FacilityCard`.
- Because sample pharmacies do not have `detailHref`, they fall back to `/facilities` through the generic facility card behavior.
- This may confuse users because pharmacy cards can currently route to the facilities page rather than a pharmacy detail page.

Relationship to Supabase-backed records:

- There are no Supabase-backed pharmacy public reads yet.
- `public.pharmacies` has a draft SQL plan, but RLS, test data, helper, and route wiring are not implemented yet.

### Diagnostics Sample Cards

Sample diagnostics records still exist in `src/data/seed-diagnostics.ts` and surface through `sampleDiagnostics`.

Names found:

- Sunrise Diagnostic Lab
- Bole Imaging Center
- Central Screening Lab

Where they appear:

- Diagnostics page through `src/components/diagnostics/DiagnosticsResultsSection.tsx`
- Some diagnostics-like concepts also appear in search/nearby preview sections.

Current link behavior:

- Diagnostics cards reuse `FacilityCard`.
- Because sample diagnostics do not have `detailHref`, they fall back to `/facilities`.
- This may confuse users because diagnostics cards can currently route to the facilities page rather than a diagnostics detail page.

Relationship to Supabase-backed records:

- There are no Supabase-backed diagnostics public reads yet.
- Diagnostics remain static discovery previews.

### Homepage Nearby Preview Items

The homepage nearby section uses simple inline sample rows, not provider cards.

Names found in `src/components/home/NearbyHealthcareSection.tsx`:

- Bole Family Clinic
- Kazanchis Pharmacy
- Arat Kilo Lab

Current behavior:

- These rows are not links.
- They are separate from Supabase-backed records.
- They function as visual previews for future nearby discovery.

### Homepage Hero Sample Result

The homepage hero sample result displays:

- Addis Health Center

Current behavior:

- The card-like hero preview links to `/facilities` with the label `View sample facilities`.
- It does not link to `/facilities/addis-health-center` or a Supabase-backed facility detail route.
- It remains a static visual preview separate from Supabase-backed records.

## Old/Static Detail Routes Still Present

### `/facilities/addis-health-center`

File:

- `src/app/facilities/addis-health-center/page.tsx`

Purpose:

- Static preview detail page for Addis Health Center.
- Uses `FacilityDetailPage` without an explicit facility prop, which falls back to the static Addis Health Center sample.

Current status:

- Separate from the dynamic `/facilities/[slug]` Supabase-backed detail route.
- Does not use the Supabase facility detail helper.
- Does not use provider contact channels from Supabase.

Recommendation:

- Keep temporarily until replacement is confirmed.
- Later either convert Addis Health Center into a Supabase row and route through `/facilities/[slug]`, redirect to the dynamic route, or remove the static route after QA.

### `/doctors/dr-hana-bekele`

File:

- `src/app/doctors/dr-hana-bekele/page.tsx`

Purpose:

- Static preview detail page for Dr. Hana Bekele.
- Uses `DoctorDetailPage`, which reads static `sampleDoctors`.

Current status:

- Separate from the dynamic `/doctors/[slug]` Supabase-backed detail route.
- Does not use the Supabase doctor detail helper.
- Does not use provider contact channels from Supabase.

Recommendation:

- Keep temporarily until replacement is confirmed.
- Later either convert Dr. Hana Bekele into a Supabase row and route through `/doctors/[slug]`, redirect to the dynamic route, or remove the static route after QA.

## Home Page Hero Search and Category Buttons

### Hero Search Section

File:

- `src/components/home/HeroSearchSection.tsx`

Current visible behavior:

- Shows a healthcare search box.
- Shows a static sample verified result for Addis Health Center.
- The sample result CTA links to `/facilities`.

Recommended future routing:

- The search box should route to `/search` or a unified discovery page with query parameters.
- The Addis Health Center hero preview should either remain a non-data preview, link to `/facilities`, or eventually link to the relevant dynamic Supabase detail route after conversion.

### Quick Category Buttons

File:

- `src/components/home/QuickCategoriesSection.tsx`

Buttons found:

- Doctors -> `/doctors`
- Hospitals -> `/facilities`
- Clinics -> `/facilities`
- Pharmacies -> `/pharmacies`
- Laboratories -> `/diagnostics`
- Diagnostic centers -> `/diagnostics`

Current behavior:

- Buttons route to category pages.
- They do not yet pass filters or query parameters.

Recommended future routing:

- Doctors -> `/doctors`
- Pharmacies -> `/pharmacies`
- Clinics -> `/facilities` with a future category filter
- Hospitals -> `/facilities` with a future category filter
- Laboratories -> `/facilities` or `/diagnostics` depending on the future diagnostics data model; for the current UI, `/diagnostics` remains understandable
- Diagnostic centers -> `/diagnostics`
- All/Search -> `/search` or a unified discovery page

### Popular Specialty Links

File:

- `src/components/home/PopularSpecialtiesSection.tsx`

Current behavior:

- All specialty chips link to `/doctors`.
- They do not yet pass specialty filters.

Recommendation:

- Keep temporarily as broad doctor discovery links.
- Later route to `/doctors?specialty=...` or a unified discovery/search route with a specialty filter.

## Navigation Consistency Issues

### Fixed or aligned recently

Supabase-backed facility and doctor cards now carry `detailHref` from `PublicProviderCard.listingHref`.

Expected Supabase-backed facility card links:

- Test Facility Alpha -> `/facilities/test-facility-alpha`
- Test Facility Eta Minimal -> `/facilities/test-facility-eta-minimal`
- Test Facility Zeta Disputed -> `/facilities/test-facility-zeta-disputed`

Expected Supabase-backed doctor card links:

- Dr. Test Doctor Alpha -> `/doctors/test-doctor-alpha`
- Test Doctor Eta Minimal -> `/doctors/test-doctor-eta-minimal`
- Dr. Test Doctor Zeta Disputed -> `/doctors/test-doctor-zeta-disputed`

### Still inconsistent

Static facility cards:

- Addis Health Center links to `/facilities/addis-health-center`.
- Other static facility cards fall back to `/facilities`.

Static doctor cards:

- Dr. Hana Bekele links to `/doctors/dr-hana-bekele`.
- Other static doctor cards fall back to `/doctors`.

Static pharmacy cards:

- Reuse `FacilityCard`.
- Fall back to `/facilities`, which is not ideal for pharmacy discovery.

Static diagnostics cards:

- Reuse `FacilityCard`.
- Fall back to `/facilities`, which is not ideal for diagnostics discovery.

Search page:

- Uses static `sampleFacilities` and `sampleDoctors`.
- Its cards inherit the static card fallback behavior above.

Nearby page:

- Uses static `sampleFacilities` in the nearby facility preview.
- Its cards inherit the static card fallback behavior above.

Homepage preview sections:

- Verified facilities use static sample facility cards.
- Doctor discovery uses static sample doctor cards.
- Nearby preview rows are non-link visual examples.
- Hero sample result links to `/facilities`.

## Old Preview Actions That May Confuse Users

Preview phrases still appear widely:

- `Call preview`
- `Directions preview`
- `Contact preview`
- `Location preview`
- `Booking preview`
- `View sample facilities`
- `Sample facility cards`
- `Sample doctor cards`
- `Pharmacy discovery preview`
- `Static preview only`

These labels are useful while the app is intentionally preview-first, but they may become confusing once Supabase-backed pages feel live.

Recommendation:

- Keep preview copy where workflows are genuinely inactive.
- Reduce preview copy on pages backed by active/public Supabase rows after enough QA.
- Keep explicit preview wording for booking, prescription, payment, inventory, maps, and account actions because those workflows are not implemented.

## Recommended Cleanup Strategy

1. Keep old static cards temporarily only as fallback or visual previews.
2. Convert useful static examples into Supabase test or real rows before deleting their source data.
3. Avoid deleting old static pages until replacement dynamic routes are confirmed and manually QA'd.
4. Prioritize user-facing navigation consistency before removing content.
5. Keep `detailHref` as the preferred card navigation field for any backend-backed provider cards.
6. Give pharmacy and diagnostics cards their own future detail-route behavior instead of letting them fall through to `/facilities`.
7. Keep preview language for inactive workflows, but remove or soften it where discovery data is live and public.
8. Keep service-role keys out of frontend code and continue avoiding raw Supabase error exposure.

## Recommended Next Tasks

Recommended next order:

1. Task 133: Home Hero Search and Category Button Routing Plan
2. Task 134: Static Preview Facility Conversion Plan
3. Continue pharmacy RLS/test data

Task 133 should decide how homepage search, quick categories, specialty chips, and hero CTAs route users before more UI rewiring.

Task 134 should decide which useful static facility examples should become Supabase rows, which static routes should redirect, and which preview cards should remain fallback-only.

Pharmacy RLS/test data should continue after the current public route and preview cleanup decisions are clear enough to avoid duplicating confusing card behavior.

## Summary

Static preview cards and routes still coexist with Supabase-backed facility and doctor records.

The main static preview items are Addis Health Center, Unity Medical Clinic, Sunrise Diagnostic Lab, Kazanchis Community Clinic, Dr. Hana Bekele, Dr. Samuel Tesfaye, Dr. Meron Dawit, three sample pharmacies, three sample diagnostics providers, and several homepage nearby preview rows.

The old static routes `/facilities/addis-health-center` and `/doctors/dr-hana-bekele` should be kept temporarily, then redirected, converted to Supabase rows, or removed after replacement route QA.

The biggest navigation consistency issues are static pharmacy/diagnostics cards falling back to `/facilities`, static non-featured cards falling back to list pages, and homepage/category links lacking filters. Cleanup should prioritize consistent user-facing navigation while preserving static data as fallback until Supabase replacements are confirmed.
