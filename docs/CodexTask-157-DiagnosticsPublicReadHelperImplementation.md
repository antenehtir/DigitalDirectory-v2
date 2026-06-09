# Codex Task 157: Diagnostics Public Read Helper Implementation

## Project

DigitalDirectory-v2

## Goal

Implement a public-safe diagnostics read helper for the diagnostics discovery table that was manually executed and verified in Supabase.

This task follows:

- CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md
- CodexTask-152-DiagnosticsTableSQLDraft.md
- CodexTask-153-DiagnosticsRLSPolicySQLDraft.md
- CodexTask-154-DiagnosticsTestDataSQLDraft.md
- CodexTask-155-DiagnosticsManualSQLExecutionGuide.md
- CodexTask-156-DiagnosticsSQLExecutionQARecord.md

The diagnostics SQL setup has now been manually executed and verified.

The purpose of this task is to create a reusable helper that safely reads active/public diagnostics provider rows and maps them into the existing public listing/card system.

---

## Important Context

Before making changes, read:

- docs/CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md
- docs/CodexTask-152-DiagnosticsTableSQLDraft.md
- docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md
- docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md
- docs/CodexTask-156-DiagnosticsSQLExecutionQARecord.md
- src/lib/supabase/pharmacies-public-read.ts
- existing facilities public read helper
- existing doctors public read helper
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- src/data
- src/app/diagnostics/page.tsx

Use the existing facilities, doctors, and pharmacies public read helper patterns as the main guide.

---

## Main Objective

Create a public read helper for:

```text
public.diagnostic_providers