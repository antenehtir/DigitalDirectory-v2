# Codex Task 147: Pharmacy Detail Route QA

## Project

DigitalDirectory-v2

## Goal

Verify the full pharmacy detail route journey after Task 146 created `/pharmacies/[slug]`.

This task follows:

- CodexTask-144-PharmacyDetailReadHelperImplementation.md
- CodexTask-145-PharmacyDetailRuntimeProbe.md
- CodexTask-146-PharmacyDetailRouteControl.md

The purpose is to confirm that pharmacy cards can safely navigate to pharmacy detail pages and that invalid pharmacy slugs fail safely.

This is a QA and small-fix task only.

Do not implement pharmacy contact channels in this task.

---

## Important Context

Before making changes, read:

- docs/CodexTask-146-PharmacyDetailRouteControl.md
- src/app/pharmacies/page.tsx
- src/app/pharmacies/[slug]/page.tsx
- src/lib/supabase/pharmacies-public-read.ts
- scripts/probe-pharmacy-detail-read.ts
- existing facility detail route QA patterns
- existing doctor detail route QA patterns

Also inspect:

- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- any card/list component used by the Pharmacies page

---

## Main Objective

Verify that the pharmacy list-to-detail journey works safely:

```text
/pharmacies
↓
pharmacy card link
↓
/pharmacies/[slug]
↓
detail page renders or safely notFound()