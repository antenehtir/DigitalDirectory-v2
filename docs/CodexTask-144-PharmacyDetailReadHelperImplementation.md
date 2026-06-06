# Codex Task 144: Pharmacy Detail Read Helper Implementation

## Project

DigitalDirectory-v2

## Goal

Implement a safe pharmacy detail read helper based on the planning completed in Task 143.

This task follows:

- CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- CodexTask-141-PharmaciesRuntimeProbe.md
- CodexTask-142-PharmaciesPageSupabaseWiringQA.md
- CodexTask-143-PharmacyDetailReadPlanning.md

The purpose is to create a reusable public-safe helper for reading one pharmacy listing by slug.

This task should implement the helper only.

Do not create the pharmacy detail page route in this task.

---

## Important Context

Before making changes, read:

- docs/CodexTask-143-PharmacyDetailReadPlanning.md
- docs/CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- src/lib/supabase/pharmacies-public-read.ts
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- docs/CodexTask-93-FacilityDetailReadHelper.md
- docs/CodexTask-114-DoctorDetailHelper.md

Also inspect existing detail helper patterns for facilities and doctors.

Use the existing architecture and naming style wherever possible.

---

## Main Objective

Create a public-safe helper for pharmacy detail reads.

Recommended helper name:

```ts
getSupabasePublicPharmacyDetailBySlug(slug)