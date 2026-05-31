# DigitalDirectory-v2 Seed Data Structure

## Purpose

This document describes the static seed data structure created for DigitalDirectory-v2 before Supabase, backend, database migrations, SQL, authentication, API routes, or real healthcare data are added.

The seed files are frontend-only TypeScript data. They organize current sample records into a cleaner structure that can later inform real database tables and migration work.

---

## Important Boundary

The seed records are sample data only.

They must not be treated as:

- Real verified healthcare listings
- Real provider claims
- Real contact data
- Real business records
- Real database rows
- Real admin-reviewed content

Some UI-facing fields still use existing badge values such as `verified`, `pending`, and `community-submitted` so the current frontend can preview trust states. Those values are sample-only display labels and do not represent real verification.

---

## Files Created

Seed files live in:

```text
src/data/
```

Files:

| File | Purpose |
| --- | --- |
| `seed-types.ts` | Shared TypeScript types for seed records |
| `seed-facilities.ts` | Facility seed records |
| `seed-doctors.ts` | Doctor seed records |
| `seed-pharmacies.ts` | Pharmacy seed records |
| `seed-diagnostics.ts` | Diagnostics provider seed records |
| `seed-services.ts` | Reusable healthcare services |
| `seed-specialties.ts` | Reusable clinical specialties |
| `seed-locations.ts` | Normalized location seed records |
| `seed-community-channels.ts` | Placeholder community channel records |
| `index.ts` | Central seed data exports |

Existing sample files now point to the new seed arrays:

- `sampleFacilities.ts`
- `sampleDoctors.ts`
- `samplePharmacies.ts`
- `sampleDiagnostics.ts`

This keeps current UI imports stable while making the underlying data more migration-ready.

---

## Shared Seed Metadata

Provider seed records include shared planning fields:

| Field | Purpose |
| --- | --- |
| `sourceType` | Marks the record as sample or future migration-ready |
| `listingStatus` | Sample public visibility state |
| `reviewStatus` | Indicates the record is sample-only or needs future review |
| `verificationNote` | Explicit note that trust labels are not real verification claims |

These fields prepare future migration and admin review thinking without adding backend behavior.

---

## Provider Seed Structure

Provider seed records are shaped to remain compatible with the current UI card types while adding migration-friendly fields.

### Facilities

Facilities include:

- Existing card fields such as name, category, services, location, hours, and action labels
- `providerType`
- `locationId`
- `serviceIds`
- `specialtyIds`
- Sample-only trust metadata

### Doctors

Doctors include:

- Existing card fields such as name, specialty, facility, availability, and telemedicine preview status
- `providerType`
- `locationId`
- `specialtyIds`
- `affiliatedFacilityIds`
- Sample-only trust metadata

### Pharmacies

Pharmacies include:

- Existing facility-card-compatible fields
- `providerType`
- `locationId`
- `serviceIds`
- `pickupAvailablePreview`
- `deliveryReadyPreview`
- Sample-only trust metadata

### Diagnostics Providers

Diagnostics providers include:

- Existing facility-card-compatible fields
- `providerType`
- `locationId`
- `serviceIds`
- `diagnosticsType`
- Sample-only trust metadata

---

## Reference Seed Structure

### Services

Services are reusable labels for future search and provider relationships.

Examples:

- Family medicine
- Basic laboratory
- Vaccination
- Prescription pickup
- Ultrasound preview
- Health screening

### Specialties

Specialties prepare doctor and facility discovery.

Examples:

- Pediatrics
- Cardiology
- Dermatology
- Internal medicine
- Obstetrics and gynecology

### Locations

Locations are normalized so future provider records can reference location IDs instead of duplicating raw strings.

Included sample locations:

- Ethiopia
- Addis Ababa
- Bole
- Megenagna
- Kazanchis
- Central Addis Ababa

### Community Channels

Community channel seed records use placeholder `href="#"` links only.

Included channels:

- Telegram
- LinkedIn
- Facebook
- Instagram
- TikTok
- Email updates
- WhatsApp

No social API, tracking, analytics, subscription, email sending, or real integration is active.

---

## Current UI Compatibility

The current frontend still imports:

- `sampleFacilities`
- `sampleDoctors`
- `samplePharmacies`
- `sampleDiagnostics`

Those exports now reference the new seed arrays, which keeps current page design stable.

The community channel UI now reads from `seed-community-channels.ts` through its existing component-level export.

No page layout, card design, backend logic, authentication, or protected routing was added.

---

## Future Migration Use

These seed files can later help plan:

- Supabase table shape
- Required and optional fields
- Provider relationships
- Location normalization
- Service and specialty normalization
- Community channel records
- Search index fields
- Admin review intake
- Verification status handling

Before real migration:

1. Replace sample-only records with reviewed source data.
2. Confirm public vs internal fields.
3. Normalize locations, services, and specialties.
4. Remove or update fake/sample provider names.
5. Validate trust labels through admin review.
6. Keep private or sensitive information out of public seed payloads.

---

## Recommended Next Steps

1. Keep this data static until backend implementation is explicitly approved.
2. Use these types to guide future content contracts.
3. Avoid adding sensitive fields to frontend seed data.
4. Avoid treating sample verification labels as real trust claims.
5. Add real data only through a future reviewed migration workflow.

---

## Summary

Task 30 creates a clean static seed layer for DigitalDirectory-v2 while preserving the current frontend.

The structure is ready to inform future Supabase planning, but it remains frontend-only, sample-only, and safe for the current no-backend phase.
