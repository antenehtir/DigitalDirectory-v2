# Codex Task 63: Supabase Public Listing Read Planning

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only plan for the first real Supabase public listing read implementation, including which tables to read first, which fields are allowed, required public filters, missing environment handling, use of the source wrapper, static fallback, private-field protection, and testing with Supabase test data.

This task is documentation-only.

Do not add Supabase read code.

Do not add database queries.

Do not modify the source wrapper.

Do not modify mapper code.

Do not change public listing behavior.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

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
- docs/SeedDataStructure.md
- docs/CodexTask-61-PublicListingSourceQAReadiness.md
- docs/CodexTask-62-PublicListingSourceWrapperQAPass.md
- docs/CodexTask-63-SupabasePublicListingReadPlanning.md

Also inspect these implementation files:

```text
src/types/public-listings.ts
src/lib/public-listing-mappers.ts
src/lib/public-listing-source.ts
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts