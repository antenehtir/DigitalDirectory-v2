# Codex Task 72: Supabase Local Env Setup Guide

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only guide for safely setting up local Supabase environment variables for the DigitalDirectory-v2 test project.

This task is documentation-only.

Do not create `.env.local`.

Do not add real keys.

Do not paste real Supabase URL or anon key into documentation.

Do not commit secrets.

Do not add Supabase reads.

Do not modify source wrapper code.

Do not modify mapper code.

Do not modify frontend UI.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/SupabaseBackendPlanning.md
- docs/SupabaseIntegrationPhase1.md
- docs/SupabaseEnvironmentSetupGuide.md
- docs/SupabaseTestProjectManualSetupGuide.md
- docs/PublicListingSchemaSQLPlanning.md
- docs/FacilitiesSQLManualExecutionGuide.md
- docs/FacilitiesSQLManualExecutionQA.md
- docs/SupabasePublicListingReadPlanning.md
- docs/PublicListingSourceWrapperQAPass.md
- docs/CodexTask-70-FacilitiesSQLManualExecutionGuide.md
- docs/CodexTask-71-FacilitiesSQLManualExecutionQA.md
- docs/CodexTask-72-SupabaseLocalEnvSetupGuide.md

Also inspect these implementation files only for context:

```text
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts
src/lib/public-listing-source.ts
src/lib/public-listing-mappers.ts
src/types/public-listings.ts