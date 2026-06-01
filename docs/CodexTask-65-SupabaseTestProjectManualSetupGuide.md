# Codex Task 65: Supabase Test Project Manual Setup Guide

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only manual setup guide for creating a safe Supabase test project for DigitalDirectory-v2 before any tables, SQL, RLS policies, test data, or public read implementation are added.

This task is documentation-only.

Do not create Supabase tables.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not insert test data.

Do not add Supabase reads.

Do not modify source wrapper code.

Do not modify mapper code.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not modify frontend UI.

Do not add real keys to the repository.

Do not create `.env.local` in this task.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/SupabaseBackendPlanning.md
- docs/SupabaseIntegrationPhase1.md
- docs/SupabaseEnvironmentSetupGuide.md
- docs/SupabaseTestProjectChecklist.md
- docs/PublicListingSchemaDraft.md
- docs/RLSPolicyPlanning.md
- docs/SupabaseClientSetupPlanning.md
- docs/PublicListingReadImplementationPrep.md
- docs/SupabasePublicListingReadPlanning.md
- docs/SupabasePublicListingTestDataSetupPlan.md
- docs/PublicListingDataMapperPlanning.md
- docs/StaticToSupabaseSourceSwitchPlanning.md
- docs/PublicListingSourceWrapperQAPass.md
- docs/CodexTask-63-SupabasePublicListingReadPlanning.md
- docs/CodexTask-64-SupabasePublicListingTestDataSetupPlan.md
- docs/CodexTask-65-SupabaseTestProjectManualSetupGuide.md

Also inspect these implementation files only for context:

```text
src/lib/supabase/env.ts
src/lib/supabase/browser-client.ts
src/lib/public-listing-source.ts
src/lib/public-listing-mappers.ts
src/types/public-listings.ts