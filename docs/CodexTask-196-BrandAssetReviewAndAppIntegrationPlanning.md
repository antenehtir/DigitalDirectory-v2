# Codex Task 196: Brand Asset Review and App Integration Planning

## Project

DigitalDirectory-v2

## Goal

Review the available Tiru brand source assets and create a safe app integration plan before applying branding changes to the public UI.

This task follows:

- `docs/CodexTask-193-BrandAssetsUploadAndFrontendRefinementPlanning.md`
- `docs/CodexTask-194-BrandAssetSourceSetup.md`
- `docs/CodexTask-195-BrandAssetIntakeAndFileInventory.md`
- `docs/brand/source/`
- `docs/brand/source/tiru-brand-assets-app-ready/`

This is a documentation-only brand review and integration planning task. No brand assets were applied to the app.

---

## Planning Status

```text
Brand asset review and app integration planning complete.
```

This record reviews available source assets and defines a safe future integration plan. It does not copy assets into `public/`, modify source code, modify UI components, modify CSS/theme files, or apply the logo to the public app.

---

## Reviewed Brand Assets

Brand source folder:

```text
docs/brand/source/
```

Extracted app-ready draft folder:

```text
docs/brand/source/tiru-brand-assets-app-ready/
```

Reviewed files:

| File | Source path | Likely use | Review notes |
| --- | --- | --- | --- |
| `tiru-primary-logo.svg` | `docs/brand/source/tiru-brand-assets-app-ready/tiru-primary-logo.svg` | Primary header/nav logo on light backgrounds | Best candidate for first public logo integration after approval. |
| `tiru-primary-logo-dark.svg` | `docs/brand/source/tiru-brand-assets-app-ready/tiru-primary-logo-dark.svg` | Dark footer, dark panel, or dark banner logo | Use only where the background supports the dark variant. |
| `tiru-icon.svg` | `docs/brand/source/tiru-brand-assets-app-ready/tiru-icon.svg` | Compact brand mark, mobile header accent, small UI mark, favicon exploration | Useful where full wordmark is too wide. |
| `tiru-app-icon.svg` | `docs/brand/source/tiru-brand-assets-app-ready/tiru-app-icon.svg` | App icon/PWA icon reference, favicon planning | Review dimensions and safe padding before app-icon use. |
| `tiru-brand-tokens.css` | `docs/brand/source/tiru-brand-assets-app-ready/tiru-brand-tokens.css` | CSS custom property reference | Source-only reference for future theme token mapping. |
| `tiru-brand-tokens.json` | `docs/brand/source/tiru-brand-assets-app-ready/tiru-brand-tokens.json` | Design token reference | Source-only reference for documenting color and typography direction. |
| `source-brand-reference.jpg` | `docs/brand/source/tiru-brand-assets-app-ready/source-brand-reference.jpg` | Original visual reference | Keep as reference; not recommended as production logo. |
| `README.md` | `docs/brand/source/tiru-brand-assets-app-ready/README.md` | Asset usage guidance | Notes that SVG is preferred for app logo use and draft SVGs can be refined. |
| `tiru_brand_assets_app_ready.zip` | `docs/brand/source/tiru_brand_assets_app_ready.zip` | Source archive | Preserve as archive of the extracted app-ready draft asset set. |

---

## Recommended Public App Asset Paths

Recommended future app-facing asset paths:

| Source asset | Recommended future app path | Purpose |
| --- | --- | --- |
| `tiru-primary-logo.svg` | `public/brand/tiru-primary-logo.svg` | Main app header/nav logo. |
| `tiru-primary-logo-dark.svg` | `public/brand/tiru-primary-logo-dark.svg` | Dark footer or dark-section logo. |
| `tiru-icon.svg` | `public/brand/tiru-icon.svg` | Compact mark for mobile/header/icon contexts. |
| `tiru-app-icon.svg` | `public/brand/tiru-app-icon.svg` | App icon/fav icon planning source. |

Do not copy these files in Task 196.

Optional future documentation/reference paths:

| Source asset | Recommended future reference path | Purpose |
| --- | --- | --- |
| `tiru-brand-tokens.css` | Keep in `docs/brand/source/` until theme integration is planned | Source token reference; do not import directly without review. |
| `tiru-brand-tokens.json` | Keep in `docs/brand/source/` until design token mapping is planned | Source token reference; useful for implementation planning. |
| `source-brand-reference.jpg` | Keep in `docs/brand/source/` | Visual reference only. |

---

## Recommended Theme Direction

Use the Task 195 token values as the base brand palette:

| Token | Hex | Recommended use |
| --- | --- | --- |
| Deep Ink | `#1A2E2A` | Primary text, strong headings, dark surfaces, footer text/background accents. |
| Teal | `#1D9E75` | Primary actions, active states, links, selected filters, key highlights. |
| Light Teal | `#5DCAA5` | Secondary accents, icon highlights, subtle interactive states. |
| Mint | `#E1F5EE` | Soft backgrounds, trust panels, selected cards, lightweight section bands. |
| White | `#FFFFFF` | Main backgrounds, cards, and high-contrast surface areas. |

Theme guidance:

- Preserve readability and contrast before increasing brand color coverage.
- Use Teal for clear action/active states rather than broad decoration.
- Use Mint sparingly for soft healthcare/trust surfaces.
- Use Deep Ink as the stabilizing text and structural color.
- Avoid changing unrelated provider route behavior while applying theme foundation.

---

## Typography Direction

Observed typography direction from the token file:

| Area | Direction |
| --- | --- |
| Wordmark | Bold geometric sans-serif. |
| Tagline | Clean modern sans-serif. |
| Body | Inter or equivalent. |

Recommended implementation planning:

- Keep body typography aligned with the existing app stack unless a later task explicitly changes fonts.
- Use brand typography mainly through logo/wordmark assets at first.
- Avoid introducing new font files before licensing and performance are reviewed.
- Use weight, spacing, and hierarchy refinements before broad font replacement.

---

## Recommended First Branding Implementation Scope

The first implementation task should be intentionally narrow.

Recommended first scope:

1. Create `public/brand/`.
2. Copy reviewed SVG assets into `public/brand/`.
3. Add the primary logo to the header/nav.
4. Use the icon mark only in compact/mobile contexts if safe.
5. Add or align foundational theme tokens for Deep Ink, Teal, Light Teal, Mint, and White.
6. Apply a small button/link polish pass using Teal and Deep Ink.
7. Preserve existing route behavior.
8. Preserve real facility listing and detail data.
9. Run lint/build and a quick route smoke check.

Do not include a full UI redesign in the first implementation task.

Out of scope for the first implementation task unless explicitly added later:

- Full facility detail redesign.
- Full card system redesign.
- Provider data changes.
- Supabase import.
- Pharmacy, diagnostics, or doctors behavior changes.
- Large typography/font replacement.

---

## Frontend Refinement Backlog Carried Forward

Carry forward the Task 192 refinement backlog:

| Backlog item | Carry-forward status |
| --- | --- |
| Facility detail tabs/interactions | Carry forward for frontend refinement. |
| Facility detail action panels | Carry forward for frontend refinement. |
| Contact link behavior | Carry forward for frontend refinement. |
| Mobile spacing | Carry forward for frontend refinement. |
| Desktop spacing | Carry forward for frontend refinement. |
| Card height consistency | Carry forward for frontend refinement. |
| Facility category filters | Carry forward for frontend refinement. |
| Search/filter behavior | Carry forward for frontend refinement. |
| Missing-field display behavior | Carry forward for frontend refinement. |
| Legacy sample route behavior | Carry forward for frontend refinement. |
| Overall visual polish | Carry forward for frontend refinement. |

Recommended ordering:

1. Brand header/theme foundation.
2. Facilities detail tabs/interactions.
3. Contact/action panel behavior.
4. Listing cards, spacing, filters, and missing-field polish.
5. Mobile/desktop QA.

---

## Stability Requirements

Future brand integration must preserve:

```text
/facilities
/facilities/[slug]
real facility listing data
real facility detail data
real facility names
facility detail routes by slug
pharmacy routes
diagnostics routes
doctor routes
search routes
correction/contact/register routes
```

Future brand integration must not modify unless explicitly scoped:

```text
real facility JSON/data
Supabase SQL/RLS/schema/migrations
pharmacy behavior
diagnostics behavior
doctor behavior
package scripts
probes
```

No Supabase import should be performed as part of brand asset integration.

---

## Recommended Next Task

Recommended next task:

```text
Task 197 - Apply Brand Assets To Header And Theme Foundation
```

Purpose:

- Copy selected SVG assets into `public/brand/`.
- Add the primary logo to the app header/nav.
- Add or align foundational theme color tokens.
- Apply a first safe button/link polish pass.
- Keep real facility data stable.
- Avoid full UI redesign until the brand foundation is verified.

Task 197 was not created as part of this task.

---

## Scope Confirmation

For Task 196:

- Only `docs/CodexTask-196-BrandAssetReviewAndAppIntegrationPlanning.md` was updated.
- `docs/brand/source/` was inspected.
- `docs/brand/source/tiru-brand-assets-app-ready/` was inspected.
- No source code was modified.
- No UI components were modified.
- No CSS/theme files were modified.
- No assets were copied into `public/`.
- No logo was applied to the app.
- No real facility JSON/data was modified.
- No Supabase SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No Supabase import was performed.
- Pharmacy behavior was not modified.
- Diagnostics behavior was not modified.
- Doctors behavior was not modified.
- Task 197 was not created.

---

## Planning Summary

Task 196 reviews the available Tiru brand files and recommends a narrow first integration scope: copy approved SVGs into `public/brand/`, place the primary logo in the header/nav, establish foundational color tokens, and apply a small button/link polish pass while preserving real facilities and adjacent routes. No assets were applied to the app in this task.
