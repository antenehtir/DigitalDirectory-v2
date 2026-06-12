# Codex Task 198: Theme Toggle and Logo Visibility Refinement

## Project

DigitalDirectory-v2

## Goal

Improve the first-pass brand integration by adding a light/dark mode option and making the Tiru header logo more visible and professional across desktop and mobile.

This task follows:

* CodexTask-197-ApplyBrandAssetsToHeaderAndThemeFoundation.md

The current brand foundation is working, but review showed:

* Desktop view feels too bright because the UI is mostly white with light mint contrast.
* Mobile layout is strong.
* Header logo is too small/thin.
* The logo slogan is not readable at header size.

---

## Main Objectives

1. Add a safe light/dark mode toggle.
2. Improve header logo visibility.
3. Improve desktop contrast without making the interface heavy.
4. Keep mobile layout stable.
5. Preserve real facility data and routes.
6. Avoid full UI redesign.

---

## Theme Toggle Requirements

Add a user-facing light/dark mode toggle in the header/nav area.

Preferred behavior:

* Default theme can remain light.
* User can toggle between light and dark.
* Store user choice in localStorage if simple and safe.
* Apply theme by setting a class or data attribute on the root/html element.
* Avoid hydration errors.
* Keep the implementation simple.

Suggested labels/icons:

```text
Light
Dark
```

or compact icons if the project already has an icon pattern.

On mobile, the toggle should not crowd the header. If needed, use compact text/icons.

---

## Light Theme Direction

Keep current brand direction but reduce overly bright desktop feeling.

Use:

```text
White: #FFFFFF
Mint: #E1F5EE
Teal: #1D9E75
Light Teal: #5DCAA5
Deep Ink: #1A2E2A
```

Improve contrast by:

* using Deep Ink more clearly for headings and major text
* slightly strengthening borders where cards feel too pale
* using Mint as a controlled section background, not everywhere
* keeping cards mostly white for readability
* avoiding excessive bright empty white space on desktop
* preserving the calm medical/directory feeling

Do not make the light theme dark. Just make it more balanced and less washed out.

---

## Dark Theme Direction

Create a clean dark mode based on the same brand identity.

Recommended dark mode direction:

```text
Background: deep ink / near-deep ink
Cards: slightly lighter dark surface
Text: white or soft white
Muted text: pale mint/gray
Primary actions: teal
Borders: subtle teal/deep ink mix
Focus rings: light teal
```

Dark mode should feel professional, calm, and readable.

Avoid:

* pure black everywhere
* neon colors
* low contrast text
* changing layout structure
* hiding existing content

---

## Header Logo Visibility Requirements

The current header logo is too small and thin.

Improve the header logo so that:

* it is clearly visible on desktop
* it is clearly visible on mobile
* it does not stretch or distort
* it does not break header height
* it still links to `/`
* alt text remains `Tiru MedDirectory`

Recommended approach:

* increase logo width/height slightly on desktop
* increase mobile logo visibility without crowding navigation
* use the current `/brand/tiru-primary-logo.svg` on light theme
* use `/brand/tiru-primary-logo-dark.svg` on dark theme if needed
* if the slogan remains unreadable at nav size, do not force it; prioritize clean logo visibility

Important brand note:

The slogan/tagline is valuable, but it may not be readable in a compact header logo. It can be preserved in hero or brand sections later.

---

## Mobile Requirements

Current mobile view is strong and should be preserved.

Do not break:

* mobile header spacing
* bottom navigation
* hero section layout
* search card spacing
* category chips
* facility list visibility

The theme toggle should fit naturally on mobile.

---

## Routes/Data To Protect

Do not break:

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

Do not modify:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
src/data/real-facility-profiles.ts
```

Do not modify Supabase SQL, RLS, schema, migrations, or seed/import scripts.

---

## Scope

Allowed:

* Add a simple theme toggle.
* Add a small theme provider/client component if needed.
* Update global CSS variables for light and dark themes.
* Improve header logo sizing and visibility.
* Use the dark logo variant in dark mode if safe.
* Adjust conservative contrast-related styles.
* Run lint and build.

Not allowed:

* Do not perform a full UI redesign.
* Do not modify real facility data.
* Do not import data to Supabase.
* Do not modify SQL/RLS/schema/migrations.
* Do not fix all facility detail tabs/interactions yet.
* Do not rewrite the homepage.
* Do not redesign cards globally beyond theme contrast needs.
* Do not create Task 199.

---

## Validation

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

Manual checks:

```text
http://localhost:3000
http://localhost:3000/facilities
```

Check:

* Light theme loads by default.
* Dark mode toggle works.
* Toggling theme does not break layout.
* Header logo is more visible.
* Mobile layout remains clean.
* Real facilities still show.
* No facility data changed.

---

## Acceptance Criteria

* Light/dark mode toggle exists.
* Theme choice works without hydration errors.
* Theme choice is persisted if localStorage implementation is safe.
* Desktop light theme contrast is improved.
* Dark theme is readable and professional.
* Header logo is larger/clearer.
* Mobile layout remains stable.
* Real facility routes still work.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* No Supabase SQL/RLS/schema/migration files are modified.
* No real facility data files are modified.
* Task 199 is not created.

---

## Recommended Next Task

Task 199 — Facility Detail Tabs and Contact Action Refinement

Purpose:

* Fix facility detail tabs/interactions.
* Improve contact action panels.
* Improve call/directions/link behavior.
* Keep branding stable.

Do not create Task 199 in this task.

---

## Deliverable

A safe theme toggle and logo visibility refinement applied on top of the existing Tiru brand foundation.

Do not proceed beyond Task 198.
