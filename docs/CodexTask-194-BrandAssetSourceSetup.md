# Codex Task 194: Brand Asset Source Setup

## Project

DigitalDirectory-v2

## Goal

Create a stable source folder and documentation record for Tiru MedDirectory brand assets before applying branding changes to the app UI.

This task follows:

- `docs/CodexTask-193-BrandAssetsUploadAndFrontendRefinementPlanning.md`

This is a documentation and folder setup task. No brand assets were applied to the public app.

---

## Source Setup Status

```text
Brand asset source setup complete.
```

Created brand source folder:

```text
docs/brand/source/
```

Created placeholder file:

```text
docs/brand/source/.gitkeep
```

The `.gitkeep` file allows the empty brand source folder to be tracked until actual brand files are provided.

---

## Brand Files Pending Status

```text
Actual brand files are pending.
```

No project-owner logo, icon, color, typography, or guideline files were added in Task 194 unless they already existed outside this task. This task only prepared the folder and documentation record.

---

## Expected Future Brand Asset Types

Future brand intake may include:

| Asset type | Preferred format | Notes |
| --- | --- | --- |
| Primary logo | SVG, PNG | Use the highest-quality source available. |
| Icon-only logo | SVG, PNG | Useful for favicon, compact navigation, and app icon contexts. |
| Light-background logo | SVG, PNG | For light UI surfaces. |
| Dark-background logo | SVG, PNG | For dark footer or dark panel contexts. |
| Favicon/app icon source | SVG, PNG, ICO | Should be reviewed before public app use. |
| Brand guideline document | PDF, MD, DOCX | Should define brand usage if available. |
| Color palette reference | MD, PDF, image | Prefer exact hex values when possible. |
| Typography notes | MD, PDF, image | Include typeface names, fallbacks, or screenshots. |
| UI reference screenshots | PNG, JPG | Optional examples of preferred visual direction. |
| Figma export/reference | Figma export, PNG, PDF | Optional design reference for future refinement. |

Do not invent or generate brand files as part of the source setup task.

---

## Branding Safety Rules

Future branding work must preserve:

```text
/facilities
/facilities/[slug]
real facility profile data
real facility names
facility detail routes by slug
pharmacy routes
diagnostics routes
doctor routes
```

Task 194 did not modify:

```text
source code
UI components
CSS/theme files
public app assets
real facility JSON/data
Supabase SQL/RLS/schema/migrations
pharmacy behavior
diagnostics behavior
doctor behavior
```

Brand assets should not be copied into public app asset folders or applied to UI components until a later reviewed implementation task explicitly authorizes that work.

---

## Future App Asset Direction

Later tasks may review and, if approved, copy selected brand files into app-facing locations such as:

```text
public/brand/
public/logos/
src/components/layout/
src/styles/
```

Task 194 did not create or modify those app/public asset folders.

---

## Recommended Next Task

Recommended next task:

```text
Task 195 - Brand Asset Intake and File Inventory
```

Purpose:

- Add the project owner's actual logo and brand files into `docs/brand/source/`.
- Record exact file names, formats, sizes, and available variants.
- Decide which files are suitable for future app integration.
- Do not apply assets to the UI until reviewed.

Task 195 was not created as part of this task.

---

## Files Created

```text
docs/brand/source/.gitkeep
```

---

## Files Modified

```text
docs/CodexTask-194-BrandAssetSourceSetup.md
```

---

## Scope Confirmation

For Task 194:

- `docs/brand/source/` was created.
- `docs/brand/source/.gitkeep` was created.
- Only `docs/CodexTask-194-BrandAssetSourceSetup.md` was updated.
- No source code was modified.
- No UI components were modified.
- No CSS/theme files were modified.
- No logo was added to the app.
- No public app assets were modified.
- No real facility JSON/data was modified.
- No Supabase SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No Supabase import was performed.
- Pharmacy behavior was not modified.
- Diagnostics behavior was not modified.
- Doctors behavior was not modified.
- Task 195 was not created.

---

## Setup Summary

Task 194 created a safe source location for future Tiru MedDirectory brand files at `docs/brand/source/` with a `.gitkeep` placeholder. Actual brand files remain pending and should be inventoried in a future Task 195 before any public app branding changes are made.
