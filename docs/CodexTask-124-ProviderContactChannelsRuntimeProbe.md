# Codex Task 124: Provider Contact Channels Runtime Probe

## Goal

Create a temporary internal runtime probe to verify the provider contact channels public read helper inside the real Next app runtime before wiring contact channels into facility/doctor detail pages.

## Context

Read:

- docs/ProviderContactChannelsManualSQLExecutionQARecord.md
- docs/ProviderContactChannelsSchemaPlanning.md
- docs/CodexTask-123-ProviderContactChannelsPublicReadHelperImplementation.md

Inspect:

- src/lib/supabase/provider-contact-channels-public-read.ts
- src/lib/supabase/public-client.ts
- src/app/internal/doctors-public-read-probe/page.tsx
- src/app/internal/facility-detail-probe/page.tsx

## Implement

Create:

```text
src/app/internal/provider-contact-channels-probe/page.tsx