# Codex Task 81: Facilities Page Controlled Wiring QA Pass

## Project

DigitalDirectory-v2

## Goal

Perform a controlled QA pass on the `/facilities` page wiring after Task 80, before enabling Supabase preview/live mode on the page.

This task should verify that `/facilities` now consumes the public listing source wrapper, static remains the default, UI behavior remains unchanged, and no other routes were wired.

Do not enable Supabase preview mode.

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
- docs/FacilitiesPageControlledWiringPlanning.md
- docs/CodexTask-79-FacilitiesPageControlledWiringPlanning.md
- docs/CodexTask-80-FacilitiesPageControlledWiringImplementation.md
- docs/CodexTask-81-FacilitiesPageControlledWiringQAPass.md

Also inspect these implementation files:

```text
src/app/facilities/page.tsx
src/components/facilities/FacilitiesPage.tsx
src/lib/public-listing-source.ts
src/lib/supabase/facilities-public-read.ts
src/types/public-listings.ts
src/lib/public-listing-mappers.ts