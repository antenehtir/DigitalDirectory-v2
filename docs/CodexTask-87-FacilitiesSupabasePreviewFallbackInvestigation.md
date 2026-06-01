# Codex Task 87: Facilities Supabase Preview Fallback Investigation

## Project

DigitalDirectory-v2

## Goal

Investigate why the `/facilities` page falls back to static facility cards instead of showing the Supabase active/public test rows after Supabase preview mode was enabled.

This task should identify the likely cause and document findings.

This task may add a small, safe diagnostic helper or temporary diagnostic script only if necessary, but it must not expose secrets and must not change public UI behavior.

Do not redesign UI.

Do not expand route wiring.

Do not wire search.

Do not wire nearby.

Do not wire facility detail pages.

Do not wire doctors, pharmacies, or diagnostics pages.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not insert test data.

Do not add patient data.

Do not add booking/payment/document/admin workflows.

Do not use service role key.

Do not print real environment variable values.

Do not expose keys.

---

## Important Context

Before making changes, read:

- docs/FacilitiesSupabasePreviewManualQAResultRecord.md
- docs/FacilitiesSupabasePreviewManualBrowserQA.md
- docs/FacilitiesSupabasePreviewModeQA.md
- docs/FacilitiesSupabasePreviewModePlanning.md
- docs/FacilitiesPageControlledWiringQAPass.md
- docs/FacilitiesSourceWrapperSwitchQAPass.md
- docs/FacilitiesPublicReadQAPass.md
- docs/FacilitiesSQLManualExecutionQA.md
- docs/SupabaseLocalEnvManualSetupQA.md
- docs/SupabasePublicListingReadPlanning.md
- docs/PublicListingSourceWrapperQAPass.md
- docs/CodexTask-83-FacilitiesSupabasePreviewModeImplementation.md
- docs/CodexTask-84-FacilitiesSupabasePreviewModeQA.md
- docs/CodexTask-85-FacilitiesSupabasePreviewManualBrowserQA.md
- docs/CodexTask-86-FacilitiesSupabasePreviewManualQAResultRecord.md
- docs/CodexTask-87-FacilitiesSupabasePreviewFallbackInvestigation.md

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