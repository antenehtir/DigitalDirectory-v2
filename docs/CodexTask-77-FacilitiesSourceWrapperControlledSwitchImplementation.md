# Codex Task 77: Facilities Source Wrapper Controlled Switch Implementation

## Project

DigitalDirectory-v2

## Goal

Implement a controlled, static-first facilities source wrapper switch that can optionally use the Supabase facilities public read helper while preserving static fallback and avoiding any current public UI behavior change.

This task may modify the public listing source wrapper.

Static must remain the default source.

Do not wire public pages to Supabase.

Do not change current public listing behavior.

Do not modify frontend UI.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not insert test data.

Do not add patient data.

Do not add booking/payment/document/admin workflows.

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
- docs/SupabaseLocalEnvSetupGuide.md
- docs/SupabaseLocalEnvManualSetupQA.md
- docs/PublicListingSchemaSQLPlanning.md
- docs/FacilitiesSQLManualExecutionQA.md
- docs/SupabasePublicListingReadPlanning.md
- docs/SupabasePublicListingTestDataSetupPlan.md
- docs/PublicListingSourceWrapperQAPass.md
- docs/FacilitiesPublicReadQAPass.md
- docs/FacilitiesSourceWrapperControlledSwitchPlanning.md
- docs/PublicListingDataMapperPlanning.md
- docs/StaticToSupabaseSourceSwitchPlanning.md
- docs/CodexTask-74-FacilitiesPublicReadFunctionImplementation.md
- docs/CodexTask-75-FacilitiesPublicReadQAPass.md
- docs/CodexTask-76-FacilitiesSourceWrapperControlledSwitchPlanning.md
- docs/CodexTask-77-FacilitiesSourceWrapperControlledSwitchImplementation.md

Also inspect these implementation files:

```text
src/lib/public-listing-source.ts
src/lib/supabase/facilities-public-read.ts
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts
src/types/public-listings.ts
src/lib/public-listing-mappers.ts