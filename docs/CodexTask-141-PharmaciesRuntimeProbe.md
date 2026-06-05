# Codex Task 141: Pharmacies Runtime Probe

## Project

DigitalDirectory-v2

## Goal

Create a safe runtime probe for the pharmacy public read helper.

This follows:

- CodexTask-140-PharmaciesPublicReadHelperImplementation.md

The purpose is to verify whether the pharmacy public read helper can run safely without breaking the app.

This task should diagnose runtime behavior only.

---

## Important Context

Before making changes, read:

- docs/CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- docs/CodexTask-124-ProviderContactChannelsRuntimeProbe.md
- docs/CodexTask-107-DoctorsPublicReadRuntimeProbe.md
- docs/CodexTask-95-FacilityDetailRuntimeProbe.md
- docs/DevelopmentRoadmap.md
- docs/DataModelContentStructure.md

Also inspect:

- src/lib/supabase/pharmacies-public-read.ts
- existing runtime probe patterns
- package.json

---

## Main Objective

Create a controlled runtime probe that imports and calls the pharmacy public read helper.

The probe should confirm:

1. The helper imports successfully.
2. The helper can be called safely.
3. The helper returns an array.
4. Fallback behavior works if Supabase config is missing.
5. No raw Supabase errors or secrets are exposed.
6. The app build remains stable.

---

## Suggested File Target

Create a probe script if similar probe scripts already exist.

Possible location:

```text
scripts/probe-pharmacies-public-read.ts