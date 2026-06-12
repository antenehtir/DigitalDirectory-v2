# Codex Task 192: Real Facilities UI QA and Refinement Backlog

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the first live app preview of real facility profiles after wiring the simple facility profiles JSON into the Facilities UI.

This task follows:

* CodexTask-189-SimpleFacilityProfilesJSONExtraction.md
* CodexTask-190-SimpleFacilityProfilesJSONExtractionQA.md
* CodexTask-191-WireSimpleFacilityProfilesJSONIntoFacilitiesUI.md

This is a QA and refinement-backlog documentation task.

Do not modify source code in this task.

---

## Important Context

Task 191 wired the extracted real facility profiles into the Facilities UI.

The local app was started with:

```text
npm.cmd run dev
```

The app became available at:

```text
http://localhost:3000
```

The facilities page was checked at:

```text
http://localhost:3000/facilities
```

The project owner confirmed that real facilities are now visible in the app.

Known example real facilities represented include:

```text
Lancet General Hospital
Silkroad General Hospital
American Medical & MCH Center
HabariDOC
RANK Specialized Dermatology Clinic
```

---

## Main Objective

Record that real facility data is now visible in the app and document known UI/refinement issues before moving to the branding and frontend refinement phase.

Recommended target file:

```text
docs/CodexTask-192-RealFacilitiesUIQAAndRefinementBacklog.md
```

---

## QA Findings To Record

Record the following:

```text
Real facilities are visible on /facilities.
The app runs locally with npm.cmd run dev.
Real facility names from the extracted JSON are displayed.
Facility detail routes are available by slug.
No Supabase import was performed.
No SQL/RLS/schema/migration changes were made.
No branding/logo/color refinement was performed yet.
```

---

## Known Refinement Issue

The project owner reported:

```text
Some tabs or interactive sections under facility profiles are not working correctly.
```

Record this as a known UI refinement backlog item.

Do not fix this issue in Task 192.

The issue should be addressed during the upcoming frontend/UI refinement phase.

---

## Areas To Revisit Later

Add these to the refinement backlog:

```text
Facility detail tabs/interactions
Facility detail action panels
Contact link behavior
Mobile spacing
Desktop spacing
Card height consistency
Facility category filters
Search/filter behavior
Missing-field display behavior
Legacy sample route behavior
Overall visual polish
```

---

## Recommended Next Phase

After Task 192, the project should move to the branding and UI refinement phase.

Recommended next task:

```text
Task 193 — Brand Assets Upload and Frontend Refinement Planning
```

Purpose:

* Bring in the project owner’s logo and brand guideline.
* Align colors, typography, spacing, cards, buttons, and navigation with the Tiru MedDirectory brand.
* Review the real facilities UI using the actual brand.
* Prepare focused tasks to fix broken tabs and improve frontend polish.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-192-RealFacilitiesUIQAAndRefinementBacklog.md`.
* Record local UI QA results.
* Record known broken tab/interaction issue.
* Record frontend refinement backlog.
* Recommend next task.

Not allowed:

* Do not modify source code.
* Do not modify UI copy.
* Do not modify branding/logo/colors.
* Do not modify SQL, RLS, schema, or migrations.
* Do not import to Supabase.
* Do not modify extracted JSON.
* Do not modify `src/data`.
* Do not modify probes or package scripts.
* Do not create Task 193.

---

## Validation

No code validation is required for this documentation-only QA task.

Recommended check:

```bash
git status
```

---

## Acceptance Criteria

* QA markdown record exists.
* Real facilities live preview is documented.
* Known broken tabs/interactions are documented.
* Refinement backlog is documented.
* Branding phase readiness is documented.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No data import is performed.
* Task 193 is not created.

---

## Deliverable

A focused QA and refinement-backlog record confirming that real facilities are visible and that UI refinements will proceed in the branding/frontend phase.

Do not proceed beyond Task 192.
