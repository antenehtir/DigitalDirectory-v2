# Codex Task 197: Apply Brand Assets To Header And Theme Foundation

## Project

DigitalDirectory-v2

## Goal

Apply the approved Tiru brand assets to the app header and create a safe first-pass theme foundation.

This task follows:

* CodexTask-193-BrandAssetsUploadAndFrontendRefinementPlanning.md
* CodexTask-194-BrandAssetSourceSetup.md
* CodexTask-195-BrandAssetIntakeAndFileInventory.md
* CodexTask-196-BrandAssetReviewAndAppIntegrationPlanning.md

This is the first branding implementation task.

Keep the scope focused. Do not perform a full UI redesign.

---

## Important Context

Brand source assets are available in:

```text
docs/brand/source/tiru-brand-assets-app-ready/
```

Available app-ready assets include:

```text
tiru-primary-logo.svg
tiru-primary-logo-dark.svg
tiru-icon.svg
tiru-app-icon.svg
tiru-brand-tokens.css
tiru-brand-tokens.json
source-brand-reference.jpg
README.md
```

Task 196 recommended:

```text
Use tiru-primary-logo.svg for the main header/nav logo.
Use tiru-icon.svg for compact/mobile/icon contexts if safe.
Use tiru-primary-logo-dark.svg only for dark sections later.
Use brand tokens as the color reference.
```

Real facility profiles are already visible in the app and must remain stable.

---

## Main Objective

Apply a safe brand foundation:

1. Copy selected brand SVG files into a public app asset folder.
2. Use the primary Tiru logo in the header/nav.
3. Add or align brand color tokens.
4. Apply a small first-pass button/link color polish.
5. Keep all routes and data stable.

---

## Brand Assets To Copy

Create this folder if needed:

```text
public/brand/
```

Copy these files from:

```text
docs/brand/source/tiru-brand-assets-app-ready/
```

to:

```text
public/brand/tiru-primary-logo.svg
public/brand/tiru-icon.svg
public/brand/tiru-app-icon.svg
public/brand/tiru-primary-logo-dark.svg
```

Do not copy the ZIP file into `public/`.

Do not copy the source JPG into `public/` unless needed for reference, which it should not be for this task.

---

## Header/Nav Logo Integration

Inspect likely layout/header files, such as:

```text
src/components/layout/*
src/app/layout.tsx
src/components/*
```

Use the primary logo in the public header/navigation.

Expected asset path for app use:

```text
/brand/tiru-primary-logo.svg
```

If using Next Image is straightforward, use it. If a plain `img` is already the pattern in the project, use that safely.

Logo should:

```text
link to /
have descriptive alt text
not break mobile layout
not stretch or distort
fit the existing header height
```

Recommended alt text:

```text
Tiru MedDirectory
```

---

## Theme Foundation

Use these brand colors:

```text
Deep Ink: #1A2E2A
Teal: #1D9E75
Light Teal: #5DCAA5
Mint: #E1F5EE
White: #FFFFFF
```

Apply only a conservative first pass.

Allowed first-pass styling:

```text
primary buttons
active links
small accents
focus rings
selected states
subtle mint surfaces
```

Avoid major layout redesign.

---

## Do Not Break Real Facility Data

Brand integration must not break:

```text
/facilities
/facilities/[slug]
real facility listing data
real facility detail data
pharmacy routes
diagnostics routes
doctor routes
search routes
correction/contact/register routes
```

Do not modify:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
src/data/real-facility-profiles.ts
```

unless absolutely necessary, which it should not be for this task.

---

## Known Refinement Backlog To Leave For Later

Do not fix all of these in this task:

```text
facility detail tabs/interactions
facility detail action panels
contact link behavior
mobile spacing
desktop spacing
card height consistency
facility category filters
search/filter behavior
missing-field display behavior
legacy sample route behavior
overall visual polish
```

Only touch them if required to prevent the logo/theme foundation from breaking layout.

---

## Validation

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

Also verify locally if practical:

```text
/
 /facilities
 /facilities/lancet-general-hospital
```

Expected:

```text
Tiru logo appears in header/nav.
Real facilities still appear.
Facility detail page still builds.
No Supabase import was created.
No SQL/RLS/schema/migration files were modified.
```

---

## Scope

Allowed:

* Create `public/brand/`.
* Copy selected SVG brand assets into `public/brand/`.
* Update header/nav logo usage.
* Add or align brand color tokens/theme variables.
* Apply conservative first-pass button/link/accent styling.
* Run lint/build.

Not allowed:

* Do not import to Supabase.
* Do not create SQL insert scripts.
* Do not modify RLS, schema, or migrations.
* Do not modify extracted facility JSON.
* Do not modify real facility data.
* Do not redesign the full UI.
* Do not fix all facility tab/interactions yet.
* Do not modify pharmacy, diagnostics, or doctors behavior unless unavoidable.
* Do not create Task 198.

---

## Acceptance Criteria

* `public/brand/` exists.
* Selected SVG brand assets exist in `public/brand/`.
* Header/nav uses the Tiru primary logo.
* Brand color foundation is present.
* First-pass button/link/accent styling is safely aligned with brand colors.
* Real facilities remain visible.
* Facility detail route still works.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* No Supabase import is created.
* No SQL/RLS/schema/migration files are modified.
* Task 198 is not created.

---

## Deliverable

A safe first-pass Tiru brand foundation applied to the app header/nav and theme.

Do not proceed beyond Task 197.
