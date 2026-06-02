# Codex Task 132: Static Preview Routes and UI Cleanup Inventory

## Goal

Create a documentation-only inventory of old/static preview routes, cards, buttons, and UI sections that still exist alongside the new Supabase-backed facility and doctor system.

Do not modify app code yet.

## Context

Recent finding:

- Supabase-backed routes work.
- Facility and doctor card dynamic links now work.
- Contact channels display correctly on Supabase-backed detail pages.
- Old static preview cards/routes such as Addis Health Center still exist and may not show new contact channels.
- Home hero category buttons exist but are not fully wired yet.

Read:

- docs/FacilityDetailRouteQARecord.md
- docs/DoctorDetailRouteQARecord.md
- docs/FacilityContactChannelsWiringQARecord.md
- docs/DoctorContactChannelsWiringQARecord.md
- docs/ProviderContactChannelsRuntimeQARecord.md
- docs/CodexTask-131A-PublicCardDetailLinkAlignment.md

Inspect:

- src/app/page.tsx
- src/app/facilities/page.tsx
- src/app/facilities/[slug]/page.tsx
- src/app/doctors/page.tsx
- src/app/doctors/[slug]/page.tsx
- src/app/search
- src/app/nearby
- src/app/pharmacies
- src/components
- src/lib/public-listing-source.ts
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts

## Create

Create:

```text
docs/StaticPreviewRoutesAndUICleanupInventory.md