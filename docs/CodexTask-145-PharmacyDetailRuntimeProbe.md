# Codex Task 145: Pharmacy Detail Runtime Probe

## Project

DigitalDirectory-v2

## Goal

Create a safe runtime probe for the pharmacy detail read helper implemented in Task 144.

This task follows:

- CodexTask-143-PharmacyDetailReadPlanning.md
- CodexTask-144-PharmacyDetailReadHelperImplementation.md

The purpose is to verify that `getSupabasePublicPharmacyDetailBySlug(slug)` can run safely before creating the visible `/pharmacies/[slug]` route.

This task should diagnose runtime behavior only.

Do not create the pharmacy detail page route in this task.

---

## Important Context

Before making changes, read:

- docs/CodexTask-143-PharmacyDetailReadPlanning.md
- docs/CodexTask-144-PharmacyDetailReadHelperImplementation.md
- src/lib/supabase/pharmacies-public-read.ts
- scripts/probe-pharmacies-public-read.ts
- docs/CodexTask-141-PharmaciesRuntimeProbe.md
- docs/CodexTask-113-DoctorDetailRuntimeProbe.md
- docs/CodexTask-95-FacilityDetailRuntimeProbe.md

Also inspect package.json and existing script patterns.

---

## Main Objective

Create a controlled runtime probe that imports and calls:

```ts
getSupabasePublicPharmacyDetailBySlug(slug)