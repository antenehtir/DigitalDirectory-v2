# Codex Task 193: Brand Assets Upload and Frontend Refinement Planning

## Project

DigitalDirectory-v2

## Goal

Create a planning record for the Tiru MedDirectory branding and frontend refinement phase after real facilities became visible in the app.

This task follows:

- `docs/CodexTask-191-WireSimpleFacilityProfilesJSONIntoFacilitiesUI.md`
- `docs/CodexTask-192-RealFacilitiesUIQAAndRefinementBacklog.md`

This is a documentation-only branding planning task. No source code, UI components, CSS/theme files, app logo/assets, facility JSON/data, Supabase SQL, RLS, schema, migrations, or route behavior were modified.

---

## Planning Status

```text
Brand assets upload and frontend refinement planning complete.
```

This record prepares the next branding/refinement phase only. It does not apply brand assets to the public app.

---

## Current App Context

Real facilities are now visible in the app.

Recorded preview status from Task 192:

```text
Real facilities are visible on /facilities.
Real facility names are displayed from the extracted facility profiles JSON.
Facility detail routes are available by slug.
```

Known deferred UI issue:

```text
Some facility detail tabs or interactive sections are not working correctly.
```

This issue should be addressed during the frontend refinement phase, not in Task 193.

---

## Brand Asset Needs

The project owner should provide the strongest available source files for the Tiru MedDirectory brand.

Recommended requested assets:

| Asset | Priority | Notes |
| --- | --- | --- |
| Primary logo | Required | Prefer SVG; PNG acceptable as fallback. |
| Icon-only logo | Recommended | Useful for favicon, compact nav, app icon, and social preview. |
| SVG logo version | Required if available | Best for crisp UI scaling. |
| PNG logo version | Recommended | Useful for fallback, previews, and quick comparison. |
| Light-background logo | Recommended | For current light UI surfaces. |
| Dark-background logo | Recommended | For footer, dark panels, or future dark contexts. |
| Brand guideline document | Recommended | PDF, markdown, or image reference. |
| Color palette | Required if available | Include hex values if known. |
| Typography notes | Recommended | Include typeface names, fallbacks, or screenshots. |
| Favicon/app icon source | Recommended | Helps avoid low-quality cropped logo usage. |
| Preferred UI examples/screenshots | Optional | Useful for tone and spacing direction. |

Do not apply these assets to the public app until a later implementation task explicitly approves it.

---

## Recommended Brand Source Folder

Recommended future folder:

```text
docs/brand/source/
```

Purpose:

- Store uploaded brand source files before app integration.
- Preserve original filenames and source quality.
- Record what the project owner provided.
- Keep brand review separate from app implementation.

Future contents may include:

```text
logo.svg
logo.png
icon.svg
icon.png
logo-light.svg
logo-dark.svg
brand-guidelines.pdf
brand-colors.md
typography-reference.md
ui-reference-screenshots/
```

Task 193 does not create this folder and does not add brand files.

---

## Known Tiru MedDirectory Brand Direction

Current known direction:

```text
Tiru MedDirectory
medical directory positioning
healthcare navigation / map-to-care concept
professional, trustworthy, clean UI
```

Known tagline direction:

```text
Your Map To Trace Private Health Care in Addis
```

Brand planning guidance:

- Use the brand to build trust and clarity around real healthcare facility data.
- Keep the interface clean, calm, and directory-focused.
- Avoid visual changes that make facility data harder to scan.
- Use the tagline selectively where it improves clarity.
- Do not force the tagline into every header, card, or route.

---

## Frontend Refinement Goals

Frontend refinement should address the real-data UI while preserving existing app behavior.

Goals:

| Goal | Planning notes |
| --- | --- |
| Header/nav polish | Improve brand presence, navigation clarity, and logo placement after assets are reviewed. |
| Logo placement | Use approved source assets only; avoid stretched, cropped, or low-resolution display. |
| Color palette alignment | Apply brand colors carefully in a future implementation task. |
| Typography pass | Align headings, labels, and body rhythm with brand direction. |
| Button styling | Improve action clarity without changing workflows prematurely. |
| Facility listing card consistency | Improve real-data card spacing, height, and scannability. |
| Facility detail page polish | Improve hierarchy, tabs/interactions, and section clarity. |
| Facility detail action panels | Improve contact/action placement and missing-field states. |
| Contact link behavior | Verify safe click behavior for phone, email, web, maps, and social/booking links. |
| Mobile spacing | Improve small-screen spacing for listings and detail pages. |
| Desktop spacing | Improve page density and section alignment on wider screens. |
| Search/filter visual clarity | Make facility category filters and search behavior easier to understand. |
| Missing-field display behavior | Hide missing fields or show production-safe wording consistently. |
| Legacy sample route behavior | Review old/sample routes after real facility wiring. |
| Overall visual polish | Improve consistency while preserving real facility data wiring. |

---

## Real Facilities Stability Requirements

Branding/frontend refinement must preserve:

```text
/facilities
/facilities/[slug]
real facility listing data
real facility detail data
facility detail routes by slug
real facility names
```

Branding/frontend refinement must not modify:

```text
real facility JSON/data
Supabase SQL/RLS/schema/migrations
pharmacy behavior
diagnostics behavior
doctor behavior
package scripts
probes
```

No Supabase import should be performed during branding unless a later task explicitly plans and approves it.

---

## Recommended Implementation Sequence

Recommended future sequence:

| Step | Task type | Purpose |
| --- | --- | --- |
| 1 | Brand asset source setup | Create `docs/brand/source/` and store uploaded brand files without applying them to the app. |
| 2 | Brand asset QA | Verify file formats, dimensions, transparency, variants, and source quality. |
| 3 | Brand audit | Compare current UI against provided brand assets and guidelines. |
| 4 | Frontend refinement planning | Break the UI backlog into safe, focused implementation tasks. |
| 5 | Header/logo implementation | Apply approved logo assets carefully in public UI. |
| 6 | Color/typography pass | Apply brand color and type refinements in controlled files. |
| 7 | Facilities UI interaction fix | Fix facility detail tabs/interactions and related action panels. |
| 8 | Facilities listing/detail polish | Improve cards, spacing, filters, contact links, missing fields, and detail layout. |
| 9 | Mobile/desktop QA | Verify main public routes across viewport sizes. |
| 10 | Regression check | Confirm real facilities remain visible and no adjacent provider routes were broken. |

Each implementation task should keep scope narrow and include validation.

---

## Recommended Next Task

Recommended next task:

```text
Task 194 - Brand Asset Source Setup
```

Purpose:

- Create the project brand source folder.
- Add uploaded logo and brand files into a stable documentation/source location.
- Document exact file names, formats, and available variants.
- Do not apply brand files to the public app yet.

Task 194 was not created as part of this task.

---

## Scope Confirmation

For Task 193:

- Only `docs/CodexTask-193-BrandAssetsUploadAndFrontendRefinementPlanning.md` was updated.
- No source code was modified.
- No UI components were modified.
- No CSS/theme files were modified.
- No logo/assets were changed in the public app.
- No real facility JSON/data was modified.
- No Supabase SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No Supabase import was performed.
- Pharmacy behavior was not modified.
- Diagnostics behavior was not modified.
- Doctors behavior was not modified.
- Task 194 was not created.

---

## Planning Summary

Task 193 confirms that real facilities are visible in the app and prepares the brand/frontend refinement phase. The project should first collect source brand assets under a future `docs/brand/source/` folder, verify those assets, then proceed through a controlled UI refinement sequence that preserves real facility data and avoids unrelated provider, database, or routing changes.
