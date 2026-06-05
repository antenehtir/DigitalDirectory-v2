# Codex Task 139: Pharmacies SQL Execution QA Record

## Project

DigitalDirectory-v2

## Goal

Create a QA record template for documenting manual execution of the pharmacy SQL setup in Supabase.

This follows:

- CodexTask-131-PharmaciesTableSQLDraft.md
- CodexTask-136-PharmaciesRLSPolicySQLDraft.md
- CodexTask-137-PharmaciesTestDataSQLDraft.md
- CodexTask-138-PharmaciesManualSQLExecutionGuide.md

This task is documentation only.

Do not execute SQL.

Do not connect to Supabase.

Do not modify application code.

---

## Important Context

Before making changes, read:

- docs/CodexTask-131-PharmaciesTableSQLDraft.md
- docs/CodexTask-136-PharmaciesRLSPolicySQLDraft.md
- docs/CodexTask-137-PharmaciesTestDataSQLDraft.md
- docs/CodexTask-138-PharmaciesManualSQLExecutionGuide.md
- docs/CodexTask-71-FacilitiesSQLManualExecutionQA.md
- docs/CodexTask-104-DoctorsSQLManualExecutionQARecord.md
- docs/DevelopmentRoadmap.md
- docs/DataModelContentStructure.md

Follow the same disciplined QA record style used for facilities and doctors.

---

## Main Objective

Create a clear QA record document that can be filled after manual SQL execution.

The QA record should document:

1. Whether the pharmacy table SQL was executed
2. Whether the RLS SQL was executed
3. Whether test data was inserted
4. Whether public read behavior works
5. Whether private/inactive records are hidden
6. Whether anonymous writes are blocked
7. Any errors, fixes, or follow-up actions

---

## Expected Output File

Create or update:

```text
docs/CodexTask-139-PharmaciesSQLExecutionQARecord.md