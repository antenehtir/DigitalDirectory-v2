# Codex Task 84: Facilities Supabase Preview Mode QA

## Project

DigitalDirectory-v2

## Goal

Perform a controlled QA pass after enabling Supabase preview mode on the `/facilities` page.

This task should verify whether `/facilities` now requests Supabase-backed facility data through the public listing source wrapper, whether the expected active/public Supabase rows appear, whether blocked rows stay hidden, and whether static fallback and route safety remain intact.

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
- docs/CodexTask-82-FacilitiesSupabasePreviewModePlanning.md
- docs/CodexTask-83-FacilitiesSupabasePreviewModeImplementation.md
- docs/CodexTask-84-FacilitiesSupabasePreviewModeQA.md

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