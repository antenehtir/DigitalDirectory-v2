# Codex Task 79: Facilities Page Controlled Wiring Planning

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only plan for safely wiring only the `/facilities` list page to the controlled facilities source wrapper, while preserving static fallback, visual stability, and rollback safety.

This task is documentation-only.

Do not wire the `/facilities` page yet.

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
- docs/FacilitiesSourceWrapperSwitchQAPass.md
- docs/PublicListingDataMapperPlanning.md
- docs/StaticToSupabaseSourceSwitchPlanning.md
- docs/CodexTask-77-FacilitiesSourceWrapperControlledSwitchImplementation.md
- docs/CodexTask-78-FacilitiesSourceWrapperSwitchQAPass.md
- docs/CodexTask-79-FacilitiesPageControlledWiringPlanning.md

Also inspect these implementation files:

```text
src/app/facilities
src/lib/public-listing-source.ts
src/lib/supabase/facilities-public-read.ts
src/types/public-listings.ts
src/lib/public-listing-mappers.ts