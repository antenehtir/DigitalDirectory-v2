# Codex Task 30: Real Data Seed Structure

## Project

DigitalDirectory-v2

## Goal

Create a clean reusable seed data structure for DigitalDirectory-v2 before real Supabase/database integration begins.

This task should organize the existing sample healthcare data into clear TypeScript data files that can later be migrated to Supabase.

This is still frontend/static data only.

Do not add Supabase.

Do not add backend.

Do not add real database integration.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/UserRolesAccountStrategy.md
- docs/DataModelContentStructure.md
- docs/SupabaseBackendPlanning.md
- docs/AdminReviewWorkflowPlanning.md
- docs/CodexTask-26-DataModelContentStructure.md
- docs/CodexTask-27-SupabaseBackendPlanning.md
- docs/CodexTask-28-AdminReviewWorkflowPlanning.md
- docs/CodexTask-29-AuthUIPreview.md
- docs/CodexTask-30-RealDataSeedStructure.md

Follow the established product direction.

---

## Current Status

Tasks 01–29 created:

- Public discovery frontend
- Search, nearby, doctors, facilities, pharmacies, diagnostics pages
- Register, corrections, contact, feedback pages
- Facility and doctor detail pages
- Social/community channel UI
- User roles strategy
- Data model planning
- Supabase backend planning
- Admin review workflow planning
- Auth/account preview UI

The app is still frontend-only and uses sample data.

Task 30 should make the sample data more structured, reusable, and migration-ready.

---

## Main Objective

Create a clean static data seed structure that can support current frontend pages and later Supabase migration.

Recommended folder:

```text
src/data/