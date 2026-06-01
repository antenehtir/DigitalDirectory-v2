# Codex Task 82: Facilities Supabase Preview Mode Planning

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only plan for enabling Supabase-backed preview mode on the `/facilities` page in a controlled, reversible way.

This task is documentation-only.

Do not enable Supabase preview mode yet.

Do not modify app code.

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
- docs/FacilitiesPageControlledWiringQAPass.md
- docs/CodexTask-80-FacilitiesPageControlledWiringImplementation.md
- docs/CodexTask-81-FacilitiesPageControlledWiringQAPass.md
- docs/CodexTask-82-FacilitiesSupabasePreviewModePlanning.md

Also inspect these implementation files:

```text
src/app/facilities/page.tsx
src/components/facilities/FacilitiesPage.tsx
src/lib/public-listing-source.ts
src/lib/supabase/facilities-public-read.ts
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts
src/types/public-listings.ts
src/lib/public-listing-mappers.ts