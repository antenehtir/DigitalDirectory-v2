# Codex Task 206: Homepage Alignment + Facility Showcase Polish

## Goal

Implement a serious homepage UI correction for Tiru.

The homepage currently has several visual/layout issues:
- The hero section and lower sections are not aligned on the same grid.
- The “Care pathway” procedure block is too bulky and makes the hero feel busy.
- The “Find nearby care” CTA should be part of the main search experience, not floating separately.
- The page background feels too plain/unfinished.
- The header search focus styling still feels too visually strong.
- The homepage needs a dynamic but professional facility showcase using real facility data.

This is a frontend/UI task. It is not a data or backend task.

---

## Core product direction

Tiru should support three major MVP journeys:

1. Search and filter to find the desired healthcare provider/facility.
2. Use location/map-based discovery to find nearby desired care.
3. Make it easy for facilities and physicians to request listings, then publish after verification.

This task focuses on homepage UX and visual alignment around those goals.

---

## Layout alignment

Rebuild the homepage layout so all major sections share the same max-width container and left/right alignment.

Requirements:
- Use one consistent homepage container width.
- Hero, search module, facility showcase, and category section should align on the same grid.
- Remove awkward side pushing/indented sections.
- Avoid the current feeling where the lower section is pushed more to the side or inside.
- Mobile must remain clean and stacked.
- Desktop should feel intentional and balanced.
- The homepage should feel like a finished product, not separate raw blocks.

---

## Remove procedure-style Care pathway block

Remove the multi-step “Care pathway” procedure block from the hero/right panel.

Remove or hide:
- Search by need
- Choose care type
- Open provider details
- Numbered procedure cards inside the hero/right panel

Do not show this as a big right-side procedure panel on the homepage.

Keep the “care pathway” idea only indirectly through wording or small design accents if useful, but do not show a bulky process card.

---

## Move Find Nearby Care CTA

Place “Find nearby care” directly under or inside the main search card/module.

Suggested structure inside the main search module:
1. Search input
2. Search button
3. Category chips
4. Secondary CTA: Find nearby care

The “Find nearby care” CTA should link to `/nearby`.

It should be visually clear but not detached from the main search experience.

---

## Homepage background

Improve the background so it no longer feels like an unfinished white/gray page.

Use a subtle clinical background:
- soft off-white base
- very light teal/mint glow or gradient
- optional subtle route/pathway pattern using CSS only
- professional and calm
- no loud gradients
- no image assets required

Suggested background direction:
- `#F7F9FC` base
- soft radial/linear accents using `#ECFEFF` or `#E6F4EF`
- subtle section separation

Do not make the page too colorful.

---

## Dynamic real facility showcase

Add a professional horizontal facility card strip using real facility data already available in the frontend.

Purpose:
Make the homepage feel alive and show that real providers exist.

Requirements:
- Use only real facility records already in the project.
- Do not create fake/demo cards.
- Show a horizontal facility card strip/carousel/marquee.
- Cards may move slowly horizontally on desktop if feasible.
- On mobile, use horizontal scroll/snap if auto-marquee would hurt UX.
- Respect `prefers-reduced-motion` if adding animation.
- Pause animation on hover if possible.
- Avoid hydration mismatch: use deterministic selection/order rather than true random server/client mismatch.
- Show 8–12 real facilities if available.
- Each card should include:
  - facility name
  - category
  - area/sub-city if available
  - short service/specialty clue if available
  - View details action
- Keep cards compact and polished.
- Use the current clinical teal/white/gray theme.

Suggested section label:
- “Featured care options”
or
- “Real providers on Tiru”

Do not use placeholder providers.

---

## Category section

Keep the category section, but align it with the same container as the hero/search.

Improve category card alignment and spacing.

Categories:
- General Hospitals
- Specialty Centers
- Clinics
- Doctors
- Diagnostics
- Pharmacies

Each card should remain clean and clickable.

---

## Header search focus

The header search still looks too visually strong when focused.

Refine it further:
- Do not show a thick teal outline.
- Use subtle gray border in normal state.
- Use very soft teal shadow/border only on keyboard focus.
- Search pill should not visually dominate the header.
- Preserve search functionality:
  - Enter submits search.
  - Search icon submits search.
  - Empty query navigates to `/search`.
  - Non-empty query navigates to the existing search query format.

---

## Theme

Keep the current clinical healthcare theme:

- App background: `#F7F9FC`
- Surface: `#FFFFFF`
- Primary text: `#1F2937`
- Secondary text: `#6B7280`
- Border: `#E5E7EB`
- Primary action: `#0F766E`
- Primary hover: `#0B5E58`
- Soft accent: `#ECFEFF`

---

## Likely files to inspect/update

Likely files:
- `src/components/home/Homepage.tsx`
- `src/components/home/HeroSearchSection.tsx`
- `src/components/home/QuickCategoriesSection.tsx`
- `src/components/search/HealthcareSearchBox.tsx`
- `src/components/search/CategoryChips.tsx`
- `src/components/layout/HeaderSearchForm.tsx`
- `src/components/cards/FacilityCard.tsx`
- `src/app/globals.css`

Create a new homepage component for the facility showcase if useful, for example:
- `src/components/home/FeaturedFacilityStrip.tsx`

Real facility helper/import files may be read to access data, but must not be modified.

---

## Safety boundaries

Do not modify:
- Supabase
- SQL/RLS/schema/migrations
- `package.json`
- `package-lock.json`
- `docs/data-intake`
- real facility source data files
- scripts

Do not:
- add packages
- create fake content
- change data logic
- break search
- break nearby
- break contact actions

---

## Validation

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

If `npm.cmd` is unavailable in the Codex shell, run equivalent validation and clearly report it.

---

## Final report

Report:
- files changed
- alignment fixes
- care pathway block removed
- Find nearby care placement
- background changes
- dynamic facility strip behavior
- header search focus changes
- validation results
- remaining issues
