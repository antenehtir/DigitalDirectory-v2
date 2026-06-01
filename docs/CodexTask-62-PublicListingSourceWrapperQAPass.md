# Codex Task 62: Public Listing Source Wrapper QA Pass

## Project

DigitalDirectory-v2

## Goal

Perform a controlled QA pass on the public listing mapper layer and static source wrapper to verify that the new source architecture is safe, static-first, public-field-safe, and ready for future Supabase public listing read work.

This task is a QA/check task.

Do not add Supabase reads.

Do not modify existing public listing page behavior.

Do not connect public pages to Supabase.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not add real data writes.

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
- docs/SeedDataStructure.md
- docs/CodexTask-60-StaticToSupabaseSourceWrapperImplementation.md
- docs/CodexTask-61-PublicListingSourceQAReadiness.md
- docs/CodexTask-62-PublicListingSourceWrapperQAPass.md

Also inspect these implementation files:

```text
src/types/public-listings.ts
src/lib/public-listing-mappers.ts
src/lib/public-listing-source.ts
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts