# Codex Task 196: Brand Asset Review and App Integration Planning

## Project

DigitalDirectory-v2

## Goal

Review the available Tiru brand source assets and create a safe app integration plan before applying branding changes to the public UI.

This task follows:

* CodexTask-193-BrandAssetsUploadAndFrontendRefinementPlanning.md
* CodexTask-194-BrandAssetSourceSetup.md
* CodexTask-195-BrandAssetIntakeAndFileInventory.md

This is a documentation-only brand review and integration planning task.

Do not apply brand assets to the app in this task.

---

## Important Context

Brand assets are now available in:

```text
docs/brand/source/
```

Task 195 inventoried the available files:

```text
tiru_brand_assets_app_ready.zip
tiru-brand-assets-app-ready/
tiru-primary-logo.svg
tiru-primary-logo-dark.svg
tiru-icon.svg
tiru-app-icon.svg
tiru-brand-tokens.css
tiru-brand-tokens.json
source-brand-reference.jpg
README.md
```

The project owner approved proceeding with the branding phase after real facility profiles became visible in the app.

---

## Main Objective

Create an app integration plan for the available Tiru brand assets.

Recommended target file:

```text
docs/CodexTask-196-BrandAssetReviewAndAppIntegrationPlanning.md
```

---

## Brand Asset Review

Review and document the likely use of each asset:

```text
tiru-primary-logo.svg
```

Recommended use:

```text
Primary header/nav logo on light backgrounds.
```

```text
tiru-icon.svg
```

Recommended use:

```text
Compact icon mark, mobile header, favicon/app icon source, empty-state visual accent, or small brand mark.
```

```text
tiru-app-icon.svg
```

Recommended use:

```text
App icon reference or future PWA/app icon source.
```

```text
tiru-primary-logo-dark.svg
```

Recommended use:

```text
Dark hero/footer/section variant only.
```

```text
tiru-brand-tokens.css
```

Recommended use:

```text
Color token reference for future CSS/theme integration.
```

```text
tiru-brand-tokens.json
```

Recommended use:

```text
Design-token documentation and future automated theme reference.
```

```text
source-brand-reference.jpg
```

Recommended use:

```text
Original visual reference only; not preferred for final app logo rendering.
```

---

## Recommended App Asset Paths

Plan to copy reviewed app-ready assets later into:

```text
public/brand/tiru-primary-logo.svg
public/brand/tiru-icon.svg
public/brand/tiru-app-icon.svg
public/brand/tiru-primary-logo-dark.svg
```

Do not copy files in Task 196.

---

## Recommended Theme Direction

Based on the brand token files, plan to use:

```text
Deep Ink: #1A2E2A
Teal: #1D9E75
Light Teal: #5DCAA5
Mint: #E1F5EE
White: #FFFFFF
```

Recommended UI application:

```text
Deep Ink: main text, dark surfaces, strong headings
Teal: primary actions, links, active states
Light Teal: accents, icons, highlights
Mint: soft backgrounds, info panels, subtle sections
White: main background and cards
```

Typography direction:

```text
Wordmark: bold geometric sans-serif
Tagline: clean modern sans-serif
Body: Inter or equivalent
```

---

## Recommended First Branding Implementation Scope

The first actual implementation task should be intentionally focused.

Recommended first app branding scope:

```text
Copy approved SVG assets into public/brand/
Use primary logo in header/nav
Use icon mark in compact/mobile contexts if safe
Add or align brand color tokens
Refine primary buttons and links using teal/deep ink
Preserve existing route behavior
Preserve real facility data display
```

Do not include a full redesign in the first implementation task.

---

## Frontend Refinement Items To Carry Forward

Carry forward the known refinement backlog from Task 192:

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

Some of these may be handled after the first brand integration step.

---

## Stability Requirements

Brand integration must not break:

```text
/facilities
/facilities/[slug]
real facility profile data
pharmacy routes
diagnostics routes
doctor routes
search routes
correction/contact/register routes
```

No Supabase import should be performed.

No SQL/RLS/schema/migration files should be modified.

---

## Recommended Next Task

The recommended next task should be:

```text
Task 197 — Apply Brand Assets To Header And Theme Foundation
```

Purpose:

* Copy selected SVG assets into `public/brand/`.
* Add the primary logo to the app header/nav.
* Add or align theme color tokens.
* Apply a first safe button/link polish pass.
* Keep real facility data stable.
* Avoid full UI redesign until this foundation is verified.

---

## Scope

Allowed:

* Create/update this Task 196 markdown record.
* Review available brand files.
* Recommend app asset paths.
* Recommend first brand implementation scope.
* Carry forward refinement backlog.
* Recommend next task.

Not allowed:

* Do not modify source code.
* Do not modify UI components.
* Do not modify CSS/theme files.
* Do not copy assets into `public/`.
* Do not apply logo to the app yet.
* Do not modify real facility JSON/data.
* Do not modify Supabase SQL, RLS, schema, or migrations.
* Do not import data to Supabase.
* Do not modify pharmacy, diagnostics, or doctors behavior.
* Do not create Task 197.

---

## Validation

Recommended check:

```bash
git status
```

No lint/build is required because no app code should be modified.

---

## Acceptance Criteria

* Brand review and integration planning markdown exists.
* Available brand assets are reviewed.
* Recommended app asset paths are documented.
* Recommended theme direction is documented.
* First implementation scope is documented.
* Real facilities stability requirement is documented.
* Frontend refinement backlog is carried forward.
* Recommended next task is identified.
* No app source code is modified.
* No public app assets are modified.
* No real facility data is modified.
* Task 197 is not created.

---

## Deliverable

A focused brand asset review and app integration planning record.

Do not proceed beyond Task 196.
