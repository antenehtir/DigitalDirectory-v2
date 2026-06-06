# Codex Task 143: Pharmacy Detail Read Planning

## Project

DigitalDirectory-v2

## Goal

Plan the pharmacy detail read flow before implementation.

This task follows:

- CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- CodexTask-141-PharmaciesRuntimeProbe.md
- CodexTask-142-PharmaciesPageSupabaseWiringQA.md

The Pharmacies page is now wired to the pharmacy public read helper. The next step is to plan how an individual pharmacy detail page should safely read and display one pharmacy listing.

This is a planning task only.

Do not implement code in this task.

---

## Important Context

Before writing the plan, inspect:

- docs/CodexTask-91-FacilityDetailReadPlanning.md
- docs/CodexTask-111-DoctorDetailReadPlanning.md
- docs/CodexTask-140-PharmaciesPublicReadHelperImplementation.md
- docs/CodexTask-142-PharmaciesPageSupabaseWiringQA.md
- src/lib/supabase/pharmacies-public-read.ts
- src/app/pharmacies/page.tsx
- existing facility detail route files
- existing doctor detail route files
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- docs/DataModelContentStructure.md
- docs/DevelopmentRoadmap.md

Use the existing facility and doctor detail patterns as the main guide.

---

## Main Objective

Create a written implementation plan for pharmacy detail reading.

The plan should define:

1. Expected pharmacy detail route pattern.
2. Whether route should use slug, id, or both.
3. Required pharmacy detail fields.
4. Safe fallback behavior when Supabase env is missing.
5. Safe fallback behavior when the pharmacy record is not found.
6. Whether to create a new pharmacy detail helper.
7. How to map Supabase pharmacy row data into the existing public detail/card structure.
8. How to preserve public-safe information only.
9. How pharmacy contact/channel actions should be handled later.
10. What the next implementation task should be.

---

## Scope

Allowed:

- Inspect existing detail page patterns.
- Compare facility detail and doctor detail implementations.
- Review pharmacy public read helper.
- Review existing route naming and listingHref behavior.
- Write a clear pharmacy detail read implementation plan.
- Recommend target files for the next task.

Not allowed:

- Do not implement pharmacy detail helper.
- Do not create pharmacy detail route.
- Do not modify app pages.
- Do not modify SQL.
- Do not modify RLS.
- Do not add Supabase columns.
- Do not implement contact channels.
- Do not implement diagnostics.
- Do not redesign UI.

---

## Planning Questions

Answer these clearly in the task output:

1. What route should pharmacy detail use?
2. What existing route pattern do facilities and doctors use?
3. Does `getPublicProviderDetailPath()` already support pharmacy routes?
4. What fields are already selected in the pharmacy public read helper?
5. Which fields are enough for MVP detail display?
6. What fields should remain private or excluded?
7. Should the detail helper query by slug, id, or both?
8. What fallback should be used when Supabase is unavailable?
9. What should happen when no pharmacy is found?
10. What should Task 144 implement?

---

## Expected Output

Create a concise planning document in this same file or as an added section in this task file.

The plan should include:

- Existing patterns found
- Recommended route
- Recommended helper name
- Recommended file targets
- Data mapping strategy
- Fallback strategy
- Risks
- Acceptance criteria for the next task

---

## Acceptance Criteria

- Existing facility and doctor detail patterns are inspected.
- Pharmacy detail route recommendation is documented.
- Pharmacy detail helper recommendation is documented.
- Required safe public fields are listed.
- Fallback behavior is documented.
- No source code is modified.
- No SQL, schema, or RLS changes are made.
- The next implementation task is clearly recommended.

---

## Deliverable

A planning-only task that prepares the project for pharmacy detail read implementation.

Do not create Task 144 in this task.