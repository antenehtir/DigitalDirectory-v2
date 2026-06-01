# Codex Task 64: Supabase Public Listing Test Data Setup Plan

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only plan for Supabase public listing test data setup, including exactly what non-sensitive sample rows are needed to safely test future public listing reads.

This task is documentation-only.

Do not create Supabase tables.

Do not insert test data.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not add Supabase reads.

Do not modify source wrapper code.

Do not modify mapper code.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not modify frontend UI.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/SupabaseBackendPlanning.md
- docs/SupabaseIntegrationPhase1.md
- docs/SupabaseEnvironmentSetupGuide.md
- docs/PublicListingSchemaDraft.md
- docs/RLSPolicyPlanning.md
- docs/SupabaseClientSetupPlanning.md
- docs/PublicListingReadIntegrationPlan.md
- docs/PublicListingReadImplementationPrep.md
- docs/SupabaseTestProjectChecklist.md
- docs/PublicListingDataMapperPlanning.md
- docs/StaticToSupabaseSourceSwitchPlanning.md
- docs/PublicListingSourceQAReadiness.md
- docs/PublicListingSourceWrapperQAPass.md
- docs/SupabasePublicListingReadPlanning.md
- docs/SeedDataStructure.md
- docs/CodexTask-62-PublicListingSourceWrapperQAPass.md
- docs/CodexTask-63-SupabasePublicListingReadPlanning.md
- docs/CodexTask-64-SupabasePublicListingTestDataSetupPlan.md

Also inspect these implementation files only for context:

```text
src/types/public-listings.ts
src/lib/public-listing-mappers.ts
src/lib/public-listing-source.ts
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts