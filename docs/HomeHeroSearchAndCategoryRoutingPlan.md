# DigitalDirectory-v2 Home Hero Search and Category Routing Plan

## Purpose

This document plans how the homepage hero search box and category controls should route users into existing public discovery pages.

This is documentation-only. It does not implement routing, modify app code, modify frontend UI, add SQL, add RLS policies, add test data, change facility or doctor backend helpers, wire pharmacy backend reads, use service-role keys, expose environment values, expose keys, or commit changes.

## Context Reviewed

Documentation reviewed:

- `docs/CodexTask-133-HomeHeroSearchAndCategoryRoutingPlan.md`
- `docs/StaticPreviewRoutesAndUICleanupInventory.md`
- `docs/FacilityDetailRouteQARecord.md`
- `docs/DoctorDetailRouteQARecord.md`
- `docs/FacilityContactChannelsWiringQARecord.md`
- `docs/DoctorContactChannelsWiringQARecord.md`
- `docs/PharmacyDiscoverySchemaPlanning.md`

Implementation context inspected:

- `src/app/page.tsx`
- `src/app/search`
- `src/app/facilities/page.tsx`
- `src/app/doctors/page.tsx`
- `src/app/pharmacies`
- `src/app/nearby`
- `src/components`
- `src/lib/public-listing-source.ts`
- `src/types/public-listings.ts`

## Current Homepage Behavior

The homepage route is:

```text
/
```

The route renders `Homepage` inside `PageShell`.

Relevant homepage components:

- `src/components/home/HeroSearchSection.tsx`
- `src/components/search/HealthcareSearchBox.tsx`
- `src/components/search/CategoryChips.tsx`
- `src/components/search/search-options.ts`
- `src/components/home/QuickCategoriesSection.tsx`

### Homepage Search Input

The hero search input appears inside `HealthcareSearchBox`.

Current behavior:

- The input is visible.
- The placeholder is `Search doctors, facilities, specialties, pharmacies`.
- The input is `readOnly`.
- It does not capture or submit a query.
- It does not route to `/search`.
- It does not filter homepage content.

Current status:

```text
visual-only preview control
```

### Search Button

The hero search button appears beside the hero search input.

Current behavior:

- The button is visible.
- It uses `type="button"`.
- It does not submit the surrounding form.
- It does not route to `/search`.
- It does not pass a query parameter.
- It does not trigger filtering.

Current status:

```text
visual-only preview control
```

### Hero Category Buttons

The hero category chips come from `healthcareCategories`.

Buttons found:

- All
- Doctors
- Hospitals
- Clinics
- Pharmacies
- Laboratories

Current behavior:

- They render as buttons, not links.
- `All` is visually selected with `aria-pressed`.
- Other category buttons are not selected.
- They do not route.
- They do not update a query parameter.
- They do not filter visible results.

Current status:

```text
visual-only preview controls
```

### Other Hero Search Controls

Additional hero search box controls are also preview-only:

- Helpful filters: `Verified only`, `Open now`, `Accepting calls`, `Near me`
- Popular searches: `Cardiologist in Addis Ababa`, `Pediatric clinic near Bole`, `Open pharmacy`, `Diagnostic laboratory`, `Dentist accepting calls`
- Location preview: `Addis Ababa, Ethiopia` with a `Change` button
- Empty state preview

These controls should not be treated as active filtering behavior yet.

### Homepage Quick Category Cards

The separate quick category section already uses links.

Cards found:

- Doctors -> `/doctors`
- Hospitals -> `/facilities`
- Clinics -> `/facilities`
- Pharmacies -> `/pharmacies`
- Laboratories -> `/diagnostics`
- Diagnostic centers -> `/diagnostics`

Current behavior:

- These cards route users to broad discovery pages.
- They do not pass category query parameters.
- They do not apply filtering.

Current status:

```text
broad route links without filters
```

### Current Destination Page Behavior

`/search`:

- Exists.
- Uses static sample facility and doctor cards.
- Search input and filters are preview-only.
- Does not currently consume `q` or category query parameters.

`/facilities`:

- Exists.
- Uses the public listing source wrapper.
- Requests Supabase facilities preview mode.
- Falls back to static facility cards when needed.
- Facility category buttons are preview-only.
- Does not currently consume `category` query parameters.

`/doctors`:

- Exists.
- Uses `getSupabasePublicDoctorCards()`.
- Falls back to static doctor cards when needed.
- Doctor search and specialty filter controls are preview-only.

`/pharmacies`:

- Exists.
- Currently static discovery preview only.
- Does not use Supabase-backed pharmacy reads yet.
- Search and filters are preview-only.

`/nearby`:

- Exists.
- Currently static nearby preview only.
- Does not use live location or route query parameters.

## Recommended Routing Behavior

The homepage hero search should route users without introducing full search/filter logic yet.

Recommended first routing targets:

- All -> `/search`
- Search button with query -> `/search?q=<query>`
- Search button with empty query -> `/search`
- Doctors -> `/doctors`
- Pharmacies -> `/pharmacies`
- Hospitals -> `/facilities?category=hospital`
- Clinics -> `/facilities?category=clinic`
- Laboratories -> `/facilities?category=laboratory`

Recommended query parameter names:

- `q` for free-text query.
- `category` for broad provider category.

Recommended category values:

- `hospital`
- `clinic`
- `laboratory`

These values should be lower-case, stable, URL-safe, and broad enough for later Supabase/public listing filters.

## MVP Implementation Recommendation

For MVP routing, implement navigation without promising completed filtering.

Recommended implementation behavior:

1. Make hero category buttons into links.
2. Preserve current visual style as closely as possible.
3. Keep `All` as the default route to `/search`.
4. Send a non-empty hero search query to `/search?q=<query>`.
5. Send an empty hero search query to `/search`.
6. Route Doctors directly to `/doctors`.
7. Route Pharmacies directly to `/pharmacies`.
8. Route Hospitals to `/facilities?category=hospital`.
9. Route Clinics to `/facilities?category=clinic`.
10. Route Laboratories to `/facilities?category=laboratory`.

Do not implement full filtering logic yet unless the destination page already supports it safely.

Reasoning:

- Adding route/query parameters now creates stable URLs that later pages can consume.
- It lets users land on the right discovery surface immediately.
- It avoids expanding Supabase reads beyond the already confirmed facilities and doctors work.
- It keeps pharmacy backend wiring out of scope until pharmacy RLS, test data, helper, and QA are ready.

## Destination Page Expectations

### `/search`

Initial expected behavior:

- Accept `q` in the URL.
- It may continue rendering static preview results until search implementation is planned.
- It should not expose raw backend errors or private data.

Later behavior:

- Read `q`.
- Search across doctors, facilities, pharmacies, and diagnostics.
- Show no-result guidance when no active/public matches exist.

### `/facilities?category=...`

Initial expected behavior:

- The page may ignore `category` until category filtering is implemented.
- Facilities should continue using the current source wrapper and fallback behavior.
- No route should expose hidden, internal, pending, archived, rejected, suspended, or unknown records.

Later behavior:

- Read `category`.
- Filter active/public facility rows by provider category/type.
- Preserve static fallback during controlled rollout.

### `/doctors`

Initial expected behavior:

- Continue showing Supabase-backed active/public doctors with static fallback.
- No specialty filtering should be implied by homepage category routing yet.

Later behavior:

- Add specialty, language, facility, and consultation mode filters.

### `/pharmacies`

Initial expected behavior:

- Continue showing static pharmacy discovery preview.
- Do not wire Supabase pharmacy reads until pharmacy RLS, test data, helper, and QA are complete.

Later behavior:

- Show active/public pharmacy rows.
- Support pharmacy service mode, pickup, delivery-preview, and area filters.

## Future Behavior

Future search and category routing should support:

- Unified search across doctors, facilities, pharmacies, and diagnostics.
- Category filtering.
- Location and nearby filtering.
- Specialty filtering.
- Service filtering.
- Pharmacy discovery search.
- Diagnostics discovery search.
- Autocomplete.
- No-result state.
- Verified-only filter.
- Open-now or availability filters when reliable hours/availability data exists.
- Query preservation when users move between discovery pages.

Future routing examples:

- `/search?q=cardiology`
- `/search?q=open%20pharmacy&category=pharmacy`
- `/doctors?specialty=pediatrics`
- `/facilities?category=hospital&city=addis-ababa`
- `/facilities?category=laboratory&verified=true`
- `/pharmacies?q=pickup&area=bole`
- `/diagnostics?service=imaging`

These examples are planning targets only, not current behavior.

## Safety And Product Boundaries

Routing should not imply that inactive workflows are live.

Do not introduce yet:

- Pharmacy backend reads.
- Diagnostics backend reads.
- Search backend reads.
- Nearby/geolocation logic.
- Protected routes.
- Authentication.
- Patient data.
- Booking workflows.
- Payment workflows.
- Prescription upload.
- Medicine inventory.
- Provider owner workflows.
- Admin/reviewer workflows.

Continue requiring:

- Public-safe fields only.
- Active/public status boundaries for backend-backed provider data.
- Static fallback where rollout is controlled.
- No service-role keys in frontend code.
- No raw Supabase error exposure.
- No environment value or key exposure.

## Recommended Next Task

Recommended next task:

```text
Task 134 - Home Hero Search and Category Button Routing Implementation
```

That task should:

- Convert hero category controls into route links.
- Let the search button navigate to `/search` or `/search?q=<query>`.
- Preserve existing visual style.
- Avoid implementing full search/filter behavior unless the destination page already supports it.
- Keep Supabase/helper behavior unchanged.
- Avoid pharmacy backend wiring.

Recommended follow-up after Task 134:

```text
Task 135 - Pharmacies RLS Policy SQL Draft
```

That task should continue the pharmacy database preparation sequence without changing homepage routing.

## Summary

The homepage hero search input, search button, and `All`, `Doctors`, `Hospitals`, `Clinics`, `Pharmacies`, and `Laboratories` category chips are currently preview-only controls. The separate quick category cards already route broadly, but they do not pass filters.

The MVP routing plan is to send `All` and empty searches to `/search`, send non-empty searches to `/search?q=<query>`, route Doctors to `/doctors`, route Pharmacies to `/pharmacies`, and route Hospitals, Clinics, and Laboratories to `/facilities` with stable `category` query parameters.

Full filtering, unified search, location search, pharmacy backend reads, diagnostics backend reads, autocomplete, and verified-only filtering should remain future work until each destination page has a planned, safe implementation.
