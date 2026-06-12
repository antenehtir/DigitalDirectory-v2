# Codex Task 198: Theme Toggle and Logo Visibility Refinement

## Project

DigitalDirectory-v2

## Goal

Improve the first-pass brand integration by adding a light/dark mode option and making the Tiru header logo more visible and professional across desktop and mobile.

This task follows:

- `docs/CodexTask-197-ApplyBrandAssetsToHeaderAndThemeFoundation.md`

This was a focused refinement task. It did not perform a full UI redesign.

---

## Implementation Status

```text
Theme toggle and logo visibility refinement implemented.
```

Completed:

- Added a light/dark mode toggle in the header/nav area.
- Default theme remains light.
- Theme choice is persisted in `localStorage`.
- Theme is applied with `data-theme` on the root `html` element.
- Header logo visibility was improved with a framed, larger responsive presentation.
- Light theme desktop contrast was strengthened carefully.
- Dark theme was added using the Tiru palette.
- Existing route/data behavior was preserved.

---

## Files Created

```text
src/components/ui/ThemeToggle.tsx
```

---

## Files Modified

```text
src/components/layout/Header.tsx
src/components/ui/BrandMark.tsx
src/app/globals.css
docs/CodexTask-198-ThemeToggleAndLogoVisibilityRefinement.md
```

---

## Theme Toggle Implementation Details

Added:

```text
src/components/ui/ThemeToggle.tsx
```

Implementation notes:

- Client component.
- Uses `useSyncExternalStore` to read `localStorage` safely.
- Stores the selected theme under `tiru-theme`.
- Applies theme using `document.documentElement.dataset.theme`.
- Sets browser `color-scheme` to match the selected theme.
- Avoids effect-driven state initialization that can cause hydration/lint issues.
- Uses compact text labels: `Dark` and `Light`.

Header placement:

```text
src/components/layout/Header.tsx
```

The toggle was added to the header/nav area and header spacing was tightened slightly on small screens to preserve the existing mobile layout.

---

## Logo Visibility Changes

Updated:

```text
src/components/ui/BrandMark.tsx
```

Logo behavior:

- Logo remains linked to `/`.
- Alt text remains `Tiru MedDirectory`.
- Light theme uses `/brand/tiru-primary-logo.svg`.
- Dark theme uses `/brand/tiru-primary-logo-dark.svg`.
- Logo is wrapped in a subtle framed surface for stronger visibility.
- Logo size is responsive:
  - compact enough for mobile
  - larger and clearer on desktop
  - not stretched or distorted

The tagline inside the logo asset is not forced separately into the header.

---

## Light Theme Contrast Changes

Updated:

```text
src/app/globals.css
```

Light theme adjustments:

- Background now uses a subtle mint/white mix instead of flat white.
- Borders were strengthened from the first brand pass.
- Muted surfaces remain mint-based but are slightly controlled.
- Deep Ink remains the main foreground color.
- Teal remains the primary action/accent color.

Brand colors used:

| Token | Value |
| --- | --- |
| Deep Ink | `#1A2E2A` |
| Teal | `#1D9E75` |
| Light Teal | `#5DCAA5` |
| Mint | `#E1F5EE` |
| White | `#FFFFFF` |

---

## Dark Theme Behavior

Dark theme is activated by:

```text
data-theme="dark"
```

Dark theme direction:

- Background uses near Deep Ink.
- Cards use a slightly lighter dark green surface.
- Text uses soft white.
- Muted text uses pale mint/gray.
- Primary action color uses Light Teal.
- Borders use a subdued teal/deep ink mix.
- Focus ring uses Light Teal.
- Header logo switches to the dark logo variant.

Dark theme is professional and conservative; it avoids pure black, neon styling, and layout restructuring.

---

## Route And Data Stability

Preserved:

```text
/
/facilities
/facilities/[slug]
/doctors
/diagnostics
/pharmacies
/search
/nearby
/register
```

Not modified:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
src/data/real-facility-profiles.ts
Supabase SQL/RLS/schema/migration files
package.json
package-lock.json
seed/import scripts
```

Facility detail tabs/interactions were not broadly fixed in this task.

---

## Validation Results

Requested commands:

```text
npm.cmd run lint
npm.cmd run build
```

Environment note:

```text
npm.cmd was not available on PATH in the Codex shell.
```

Equivalent validation was run with the available bundled/local Node runtime path.

| Validation | Result |
| --- | --- |
| `npm.cmd run lint` | Could not run; `npm.cmd` not available on PATH |
| Bundled-runtime ESLint equivalent | Passed |
| `npm.cmd run build` | Could not run; `npm.cmd` not available on PATH |
| Bundled-runtime Next build equivalent | Passed |

Build note:

- An initial build attempt failed on stale/corrupt generated `.next/dev` route type cache.
- The generated `.next/dev` cache directory was cleared.
- The follow-up production build passed.

Final build summary:

```text
Compiled successfully.
TypeScript completed.
Static pages generated successfully.
/facilities and /facilities/[slug] remained buildable dynamic routes.
```

---

## Remaining Issues

Deferred:

- Facility detail tabs/interactions still need focused refinement.
- Facility detail action panels still need focused refinement.
- Contact action/link behavior still needs focused refinement.
- Broader mobile/desktop visual polish remains future work.

No new validation blockers remain after the final lint/build pass.

---

## Scope Confirmation

For Task 198:

- No full UI redesign was performed.
- Real facility data was not modified.
- No Supabase import was performed.
- No SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No seed/import scripts were modified.
- Facility detail tabs/interactions were not broadly fixed.
- Pharmacy behavior was not modified.
- Diagnostics behavior was not modified.
- Doctors behavior was not modified.
- Task 199 was not created.

---

## Completion Summary

Task 198 added a simple persistent light/dark theme toggle, improved Tiru header logo visibility, strengthened the light theme contrast, and added a professional dark theme using the Tiru palette. The existing route/data behavior was preserved, and equivalent local lint/build validation passed.
