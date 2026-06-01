# Codex Task 85: Facilities Supabase Preview Manual Browser QA

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only manual browser QA guide for testing the `/facilities` page after Supabase preview mode was enabled.

This task should guide the project owner through local browser testing to confirm whether `/facilities` shows Supabase active/public rows or safely falls back to static facility cards.

This task is documentation-only.

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

Do not wire search, nearby, detail, doctors, pharmacies, or diagnostics pages.

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
- docs/FacilitiesSupabasePreviewModePlanning.md
- docs/FacilitiesSupabasePreviewModeQA.md
- docs/CodexTask-83-FacilitiesSupabasePreviewModeImplementation.md
- docs/CodexTask-84-FacilitiesSupabasePreviewModeQA.md
- docs/CodexTask-85-FacilitiesSupabasePreviewManualBrowserQA.md

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