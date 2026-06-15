# Codex Task 207: Mobile Search + Nearby Flow Correction

## Goal

Implement a focused mobile UX flow correction for Search, Nearby, and homepage sections.

Current issues:
1. On mobile, tapping the top search icon opens the search page but does not take the user directly to the active search input with blinking cursor.
2. On the Search page, the area under the search module looks messy.
3. “Find nearby care” is too low, too pale/white, and not appealing enough for urgent-care discovery.
4. “Find nearby care” should appear directly under the main search action before category tabs.
5. The category list can follow after the nearby CTA.
6. The Nearby page shows too much guidance/procedure content such as Choose / Locate / Review cards.
7. Nearby should be straightforward: ask the user what nearest facility they are looking for, then let them choose category and use location.
8. Featured facility cards on mobile should not look cut, broken, or awkward.

This is a frontend/UI task only. Do not change backend/data logic.

---

## Mobile search icon behavior

When the user taps the mobile header search icon:
- Navigate to `/search?focus=1`.
- On the Search page, if `focus=1`, automatically scroll to the search input and focus it.
- The text cursor should be active/blinking inside the search box.
- This should work on mobile.
- Preserve normal `/search` behavior when the query param is absent.
- Do not break autocomplete.

Implementation notes:
- Add a stable id/ref for the main search input.
- Use a client-side effect to focus the input when `focus=1` is present.
- Avoid layout jump.
- If the search input is inside a shared component, expose a clean focus prop or use a stable element id.

---

## Search page and homepage search section layout

Reorder the mobile search module so it feels urgent and clean:

1. Search input
2. Search button
3. Strong “Find nearby care” CTA
4. Search by category chips

The “Find nearby care” CTA should:
- link to `/nearby`
- be placed directly below the search button
- be visually appealing and tap-worthy
- use the primary teal style or a strong soft-accent card style
- not look like a weak white tab
- include short supportive text if clean, such as:
  - “Use your location to find nearby care.”
- remain inside the search card/module

The category chips should come after this CTA.

---

## Category chips

Keep categories:
- All
- General Hospitals
- Specialty Centers
- Clinics
- Doctors
- Diagnostics
- Pharmacies

Fix alignment:
- Text must be vertically and horizontally centered.
- No clipped letters.
- Consistent chip height.
- Chips wrap cleanly.
- Active chip uses teal background and white text.
- Inactive chips use white/card background, border, and readable text.
- Works in both light and dark mode.

---

## Nearby page simplification

Remove the large guidance/procedure content from the Nearby page.

Remove:
- “Trace the nearest care pathway”
- Choose / Locate / Review cards
- bulky instruction panels
- large guidance blocks that delay action

Replace with a direct, urgent-friendly layout:

Title:
`Find nearby care`

Subtitle/question:
`Which nearest facility are you looking for?`

Then show:
1. Category chips
2. Use my location button
3. Nearby results once location is provided
4. Browse by area fallback as secondary/collapsible

Keep a small note only if necessary:
`Distance is shown for facilities with coordinates.`

Do not show the big explanatory card about coordinates unless it is subtle and short.

The Nearby page should be fast:
- choose category
- tap Use my location
- view results

---

## Featured facility cards / homepage lower UI

Fix the featured facility section so it does not look broken on mobile.

Requirements:
- No cut-off cards on mobile.
- No awkward horizontal overflow.
- If using horizontal scroll on mobile, use proper padding and scroll-snap so cards are intentionally visible.
- If that still looks messy, show 3 stacked compact cards on mobile instead.
- Use only real facility data.
- Do not create fake cards.
- Keep desktop showcase polished.
- Keep mobile clean and controlled.

---

## Theme

Keep the adaptive light/dark theme working.

In both light and dark:
- text must be readable
- cards must be readable
- search input must be readable
- CTA buttons must be visible
- category chips must be readable

---

## Likely files

Inspect/update as needed:
- `src/components/layout/Header.tsx`
- `src/components/search/HealthcareSearchBox.tsx`
- `src/components/search/SearchAutocompleteInput.tsx`
- `src/components/search/CategoryChips.tsx`
- `src/components/search-results/SearchInputPreview.tsx`
- `src/components/home/HeroSearchSection.tsx`
- `src/components/home/FeaturedFacilityStrip.tsx`
- `src/components/nearby/NearbyPage.tsx`
- `src/app/search/page.tsx` if focus handling needs route/searchParams
- `src/app/globals.css` if layout/focus utilities are needed

---

## Safety

Do not modify:
- Supabase
- SQL/RLS/schema/migrations
- `package.json`
- `package-lock.json`
- `docs/data-intake`
- real facility source data
- scripts

Do not:
- add packages
- create fake content
- break search
- break autocomplete
- break nearby distance logic
- break contact actions
- remove dark mode

---

## Validation

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

If `npm.cmd` is unavailable, run equivalent validation and clearly report it.

---

## Final report

Report:
- files changed
- mobile search icon focus behavior
- search module order changes
- Find nearby care CTA changes
- category chip alignment fixes
- nearby page simplification
- featured card/mobile layout fixes
- validation results
- remaining issues
