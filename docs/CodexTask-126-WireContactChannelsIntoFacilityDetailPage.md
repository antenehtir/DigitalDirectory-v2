# Codex Task 126: Wire Contact Channels Into Facility Detail Page

## Goal

Wire safe public provider contact channels into facility detail pages.

## Context

Read:

- docs/ProviderContactChannelsRuntimeQARecord.md
- docs/FacilityDetailRouteQARecord.md
- docs/FacilitiesSupabasePreviewStabilizationQA.md
- docs/CodexTask-125-ProviderContactChannelsRuntimeQARecord.md

Inspect:

- src/app/facilities/[slug]/page.tsx
- src/components/facility-detail/FacilityDetailPage.tsx
- src/lib/supabase/facilities-public-read.ts
- src/lib/supabase/provider-contact-channels-public-read.ts
- src/types/public-listings.ts

## Implement

On facility detail pages, fetch public contact channels using:

```ts
getSupabasePublicProviderContactChannels("facility", slug)