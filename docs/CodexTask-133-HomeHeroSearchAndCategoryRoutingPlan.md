# Codex Task 133: Home Hero Search and Category Button Routing Plan

## Goal

Create a documentation-only plan for wiring the homepage hero search bar and category buttons into useful routes.

Do not implement routing yet.

## Context

Recent finding:

- Supabase-backed facility and doctor list/detail pages work.
- Facility and doctor contact channels work.
- Public card detail links now work.
- Old static preview cards/routes still exist.
- Homepage hero category buttons exist but are not fully functional yet.

Read:

- docs/StaticPreviewRoutesAndUICleanupInventory.md
- docs/FacilityDetailRouteQARecord.md
- docs/DoctorDetailRouteQARecord.md
- docs/FacilityContactChannelsWiringQARecord.md
- docs/DoctorContactChannelsWiringQARecord.md
- docs/PharmacyDiscoverySchemaPlanning.md

Inspect:

- src/app/page.tsx
- src/app/search
- src/app/facilities/page.tsx
- src/app/doctors/page.tsx
- src/app/pharmacies
- src/app/nearby
- src/components
- src/lib/public-listing-source.ts
- src/types/public-listings.ts

## Create

Create:

```text
docs/HomeHeroSearchAndCategoryRoutingPlan.md