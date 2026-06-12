# Codex Task 193: Brand Assets Upload and Frontend Refinement Planning

## Project

DigitalDirectory-v2

## Goal

Create a planning record for the Tiru MedDirectory branding and frontend refinement phase after real facilities became visible in the app.

This task follows:

* CodexTask-191-WireSimpleFacilityProfilesJSONIntoFacilitiesUI.md
* CodexTask-192-RealFacilitiesUIQAAndRefinementBacklog.md

This is a documentation-only branding planning task.

Do not modify source code in this task.

---

## Important Context

Real facility profiles are now visible on:

```text
/facilities
```

Task 192 recorded known frontend/UI refinement backlog items, including:

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

The next phase is to bring in the Tiru MedDirectory brand assets and refine the UI around the real facility data.

---

## Main Objective

Prepare the project for branding and frontend refinement.

Recommended target file:

```text
docs/CodexTask-193-BrandAssetsUploadAndFrontendRefinementPlanning.md
```

---

## Brand Asset Source Folder

Recommended future folder:

```text
docs/brand/source/
```

This folder may later contain:

```text
logo SVG
logo PNG
icon-only SVG
icon-only PNG
dark logo variant
brand guideline PDF or markdown
color palette reference
typography reference
Figma export or screenshots
```

Do not create or modify app assets in this task unless explicitly instructed later.

---

## Brand Assets Needed From Project Owner

The project owner should provide any available:

```text
Primary logo
Icon-only logo
SVG version if available
PNG version if available
Dark background version
Light background version
Color palette
Typography notes
Brand guideline document
App screenshots or preferred UI examples
```

---

## Known Brand Direction

The Tiru MedDirectory brand has previously used a healthcare/directory identity direction with:

```text
Tiru MedDirectory
medical directory positioning
healthcare navigation / map-to-care concept
professional, trustworthy, clean UI
```

Brand integration should support the tagline direction:

```text
Your Map To Trace Private Health Care in Addis
```

Do not force the tagline everywhere. Use it only where it improves clarity.

---

## Frontend Refinement Goals

The branding/frontend phase should focus on:

```text
Header/nav polish
Logo placement
Color palette alignment
Button styling
Card spacing
Facility listing card consistency
Facility detail page polish
Contact/action panel usability
Mobile layout
Desktop layout
Search/filter visual clarity
Trust-building copy
Footer cleanup
```

---

## Real Facilities Must Stay Stable

Branding changes must not break:

```text
/facilities
/facilities/[slug]
real facility listing data
real facility detail data
pharmacy routes
diagnostics routes
doctor routes
```

No Supabase import should be done in the branding phase unless separately planned.

---

## Recommended Brand Implementation Sequence

Recommended next implementation sequence:

### Step 1: Brand asset source setup

Create a stable place for brand assets.

### Step 2: Brand audit

Inspect current UI against the brand direction.

### Step 3: Header and logo integration

Apply logo carefully.

### Step 4: Color and typography pass

Align buttons, cards, headings, links, and highlights.

### Step 5: Facilities UI refinement

Fix known facility detail tabs/interactions and improve real-data presentation.

### Step 6: Mobile/desktop QA

Check the main public routes on both screen sizes.

---

## Recommended Next Task

The recommended next task should be:

```text
Task 194 — Brand Asset Source Setup
```

Purpose:

* Create the project brand source folder.
* Add uploaded logo/brand files into a stable location.
* Document the exact files available.
* Do not apply them to the app yet until files are reviewed.

---

## Scope

Allowed:

* Create/update this planning document.
* Define brand asset requirements.
* Define frontend refinement sequence.
* Document known UI backlog.
* Recommend next task.

Not allowed:

* Do not modify source code.
* Do not modify UI components.
* Do not modify CSS/theme files.
* Do not change logo/assets in public app yet.
* Do not modify real facility JSON/data.
* Do not modify Supabase SQL, RLS, schema, or migrations.
* Do not import data to Supabase.
* Do not modify pharmacy, diagnostics, or doctors behavior.
* Do not create Task 194.

---

## Validation

No code validation is required.

Recommended check:

```bash
git status
```

---

## Acceptance Criteria

* Branding/frontend refinement planning document exists.
* Brand asset needs are documented.
* Future brand source folder is documented.
* Frontend refinement goals are documented.
* Real facilities stability requirement is documented.
* Recommended next task is identified.
* No source code is modified.
* No app branding is changed yet.
* Task 194 is not created.

---

## Deliverable

A focused planning record for entering the Tiru MedDirectory branding and frontend refinement phase.

Do not proceed beyond Task 193.
