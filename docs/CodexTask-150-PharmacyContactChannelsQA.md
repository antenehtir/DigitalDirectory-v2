# Codex Task 150: Pharmacy Contact Channels QA

## Project

DigitalDirectory-v2

## Goal

Verify the pharmacy contact channel wiring completed in Task 149.

This task follows:

- CodexTask-148-PharmacyContactChannelsPlanning.md
- CodexTask-149-WirePharmacyContactChannelsIntoDetailPage.md

The purpose is to confirm that the pharmacy detail page safely loads and displays public contact channels through the shared provider contact channel architecture.

This is a QA and small-fix task only.

Do not implement diagnostics in this task.

---

## Important Context

Before making changes, read:

- docs/CodexTask-148-PharmacyContactChannelsPlanning.md
- docs/CodexTask-149-WirePharmacyContactChannelsIntoDetailPage.md
- src/app/pharmacies/[slug]/page.tsx
- src/lib/supabase/pharmacies-public-read.ts
- existing provider contact channel helper file
- existing facility contact channel QA patterns
- existing doctor contact channel QA patterns
- docs/CodexTask-120-ProviderContactChannelsQA.md
- docs/CodexTask-123-ProviderContactChannelsRouteQA.md
- docs/CodexTask-127-FacilityContactChannels.md
- docs/CodexTask-129-DoctorContactChannels.md

Use the existing facility and doctor contact-channel QA style as the main guide.

---

## Main Objective

Verify that pharmacy contact channels are wired safely into:

```text
/pharmacies/[slug]
```

---

## QA Result

### Scope

This QA pass reviewed the pharmacy contact channel wiring added in Task 149.

No source-code changes were required during this QA pass. No SQL, schema, RLS, provider contact channel schema, Supabase migration, diagnostics, brand, logo, real data, or UI redesign work was performed.

### Files Reviewed

Documentation reviewed:

- `docs/CodexTask-148-PharmacyContactChannelsPlanning.md`
- `docs/CodexTask-149-WirePharmacyContactChannelsIntoDetailPage.md`
- `docs/CodexTask-150-PharmacyContactChannelsQA.md`
- `docs/FacilityContactChannelsWiringQARecord.md`
- `docs/DoctorContactChannelsWiringQARecord.md`

Implementation files reviewed:

- `src/app/pharmacies/[slug]/page.tsx`
- `src/lib/supabase/pharmacies-public-read.ts`
- `src/lib/supabase/provider-contact-channels-public-read.ts`
- `src/types/public-listings.ts`

### Helper Used

The pharmacy detail route uses the existing shared provider contact channel helper:

```ts
getSupabasePublicProviderContactChannels(providerType, providerSlug)
```

No direct Supabase contact table query is performed in the pharmacy detail route.

### Provider Type Confirmed

The route calls the helper with:

```ts
getSupabasePublicProviderContactChannels("pharmacy", slug)
```

This confirms that pharmacy detail pages use the shared contact channel architecture with `providerType = "pharmacy"`.

### Provider Slug Behavior

The route reads `slug` from the dynamic route params for `/pharmacies/[slug]`.

That same slug is passed to:

- `getSupabasePublicPharmacyDetailBySlug(slug)`
- `getSupabasePublicProviderContactChannels("pharmacy", slug)`

This keeps the pharmacy detail record and contact channel lookup aligned by route slug.

### Empty-State And Unsupported Channel Behavior

The pharmacy detail route keeps safe empty-state behavior:

- If the contact channel helper returns `unavailable`, the route uses an empty contact channel list.
- If the helper returns `error`, the route uses an empty contact channel list.
- If the helper returns `success` with no channels, the route uses an empty contact channel list.
- If a channel type is not supported by the current detail action panel, it is filtered out.
- Raw Supabase errors are not rendered.
- Environment values, keys, and secrets are not rendered.

Supported visible channel types remain:

- `phone`
- `whatsapp`
- `website`
- `maps`
- `social`
- `appointment`

Unsupported types such as `telegram`, `email`, `emergency`, and `habaridoc` remain hidden until a separate UI/type expansion is planned.

### Not-Found Behavior

The existing pharmacy detail not-found behavior is preserved.

If the pharmacy detail read does not return `success`, the route calls `notFound()`. Contact channel lookup does not override or weaken that boundary.

### Fixes Made

No fixes were made during Task 150.

The Task 149 implementation already matched the planned helper usage, provider type, provider slug behavior, safe empty-state behavior, and unsupported-channel filtering.

### Validation Results

Validation commands requested:

```text
npm.cmd run lint
npm.cmd run build
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

Results:

- `npm.cmd run lint` timed out before completion. No lint error output was produced before the timeout.
- `npm.cmd run build` passed.
- `npm.cmd run probe:pharmacies` passed and returned a safe `unavailable` / `static-fallback` summary with `reason = missing-env`.
- `npm.cmd run probe:pharmacy-detail` passed and returned safe `unavailable` / `static-fallback` summaries with `reason = missing-env`.

The probe outputs did not expose Supabase URLs, anon keys, raw errors, environment variables, or secrets.

### Remaining Issues

Current remaining issues:

- Lint should be rerun later if the local runner is stable, because it timed out in this QA pass.
- Pharmacy-specific provider contact channel rows are not yet confirmed in the runtime QA records. If none exist, the detail page will safely render no public contact channel section.
- The pharmacy detail page currently reuses the facility detail layout. This remains acceptable for the current scope, but pharmacy-specific wording or layout can be reviewed later as a separate UI task.

### QA Summary

Task 150 QA confirms that `/pharmacies/[slug]` uses the shared provider contact channel helper with `providerType = "pharmacy"` and the route slug as `providerSlug`.

Empty, unavailable, error, and unsupported channel states are handled safely. No direct contact table query, raw error exposure, secret exposure, SQL/schema/RLS change, diagnostics implementation, real data import, brand change, or UI redesign was introduced.
