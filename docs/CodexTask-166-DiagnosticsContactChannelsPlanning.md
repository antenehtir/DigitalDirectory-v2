# Codex Task 166: Diagnostics Contact Channels Planning

## Project

DigitalDirectory-v2

## Goal

Plan how diagnostics contact channels should be wired into diagnostics detail pages in a future task.

This is a planning-only task. No source code, diagnostics detail route, diagnostics helper, contact channel helper, SQL, RLS, schema, migrations, contact channel rows, diagnostics contact channels, pharmacy, doctors, facilities, UI, brand, logo, colors, or real data files were modified.

---

## Context Reviewed

Planning and QA references:

- `docs/CodexTask-148-PharmacyContactChannelsPlanning.md`
- `docs/CodexTask-149-WirePharmacyContactChannelsIntoDetailPage.md`
- `docs/CodexTask-150-PharmacyContactChannelsQA.md`
- `docs/CodexTask-164-DiagnosticsDetailRouteControl.md`
- `docs/CodexTask-165-DiagnosticsDetailRouteQA.md`

Implementation references:

- `src/app/diagnostics/[slug]/page.tsx`
- `src/lib/supabase/provider-contact-channels-public-read.ts`

The diagnostics detail route currently maps:

```text
contactChannels: []
```

Diagnostics contact channels are intentionally not implemented yet.

---

## Existing Shared Helper Pattern

The project already has a shared provider contact channel helper:

```ts
getSupabasePublicProviderContactChannels(providerType, providerSlug)
```

File:

```text
src/lib/supabase/provider-contact-channels-public-read.ts
```

The helper reads:

```text
public.provider_contact_channels
```

The helper filters public contact rows by:

```text
provider_type = requested provider type
provider_slug = requested provider slug
listing_status = active
visibility_status = public
```

It returns safe `success`, `unavailable`, or `error` results and does not expose raw Supabase errors, Supabase URLs, anon keys, environment values, service-role values, or secrets.

The helper already supports this provider type union:

```text
facility
doctor
pharmacy
diagnostic
telemedicine
ambulance
home_care
```

---

## Recommended Provider Type

Recommended diagnostics contact channel `provider_type` value:

```text
diagnostic
```

Reason:

- The shared contact channel helper already supports `diagnostic`.
- It matches the earlier naming note that contact channels should use singular `diagnostic`.
- It avoids confusing contact channel `provider_type` with app/card `providerType = diagnostics`.
- It avoids confusing contact channel `provider_type` with the diagnostics table subtype field `diagnostic_provider_type`.

Future diagnostics contact channel rows should therefore use:

```text
provider_type = diagnostic
provider_slug = diagnostic_providers.slug
```

---

## Provider Type Naming Risk

There are three similar but distinct names:

```text
PublicProviderCard.providerType = diagnostics
provider_contact_channels.provider_type = diagnostic
diagnostic_providers.diagnostic_provider_type = laboratory | imaging_center | radiology_center | pathology_service | mixed_diagnostic_center | facility_diagnostic_department | home_sample_collection_provider
```

Risk:

- Using `diagnostics` instead of `diagnostic` when reading contact channels would fail helper validation or return no rows.
- Using `diagnostic_provider_type` values as contact `provider_type` values would mix subtype taxonomy with top-level provider identity.
- Using `diagnostic` in `PublicProviderCard.providerType` would conflict with the current app type, which expects `diagnostics`.

Decision:

- Keep public listing cards/details as `providerType = diagnostics`.
- Use `provider_type = diagnostic` only for rows in `public.provider_contact_channels`.
- Keep `diagnostic_provider_type` only as the diagnostics provider subtype.

---

## Future Route Integration Target

Future diagnostics contact channel wiring target:

```text
src/app/diagnostics/[slug]/page.tsx
```

Future route should call:

```ts
getSupabasePublicProviderContactChannels("diagnostic", slug)
```

The route should pass the same dynamic route slug to both:

```ts
getSupabasePublicDiagnosticDetailBySlug(slug)
getSupabasePublicProviderContactChannels("diagnostic", slug)
```

This keeps the diagnostics detail record and its contact channels aligned by public slug.

---

## Future Wiring Behavior

Future diagnostics contact channel wiring should:

1. Read the diagnostics detail record first or in parallel with contact channels.
2. Preserve `notFound()` if the diagnostics detail helper does not return `success`.
3. Call the shared contact helper with `providerType = "diagnostic"` and the route slug.
4. Treat contact helper `unavailable`, `error`, and empty `success` results as an empty contact channel list.
5. Map only supported public channel types into the existing facility-style detail action panel shape.
6. Keep the detail page usable even when no contact channel rows exist.
7. Never expose raw Supabase errors, env values, URLs, anon keys, service-role values, secrets, or private/internal fields.
8. Avoid adding ordering, booking, payment, sample pickup scheduling, patient address collection, report/result delivery, or lab workflow behavior.

---

## Public-Safe Contact Fields

Future diagnostics contact channel display may use public-safe fields from the shared helper:

- `id`
- `providerType`
- `providerSlug`
- `channelType`
- `label`
- `valuePublic`
- `urlPublic`
- `isPrimary`
- `displayOrder`
- `verificationStatus`
- `lastConfirmedAt`

Public-safe diagnostics contact channel examples:

- public phone
- public WhatsApp
- public website
- public maps/directions URL
- public social profile
- public appointment or inquiry link
- public email only if explicitly approved for public display

Fields and concepts that must remain private or out of scope:

- staff personal phone numbers
- owner private phone numbers
- private email not approved for listing display
- patient names
- patient phone numbers
- patient addresses
- diagnostic reports
- lab results
- uploaded files
- sample tracking
- test orders
- payments
- admin notes
- reviewer notes
- verification evidence
- service-role or internal Supabase metadata

---

## Supported Channel Types For First Wiring

For the first diagnostics contact-channel implementation, prefer the channel types already supported by the existing detail action panel mapping pattern:

- `phone`
- `whatsapp`
- `website`
- `maps`
- `social`
- `appointment`

Defer these until a separate UI/type expansion task if needed:

- `telegram`
- `email`
- `emergency`
- `habaridoc`

Reason:

- The shared helper supports more types than the current detail action panel is known to display.
- Unsupported channel types should be filtered out rather than rendered awkwardly.
- Diagnostics should follow the safer pharmacy contact-channel route pattern first.

---

## Expected Empty-State Behavior

If no diagnostics contact rows exist:

- `/diagnostics/[slug]` should still render when the diagnostics detail itself is public.
- The contact channel section should be hidden or left empty through the existing action panel behavior.
- The route should not crash.
- The route should not show raw errors.
- The page should continue showing public diagnostics detail information.

This empty state is expected because diagnostics contact channel rows may not exist yet.

---

## Safe Fallback And Error Behavior

If the shared contact channel helper returns `unavailable`:

- use an empty contact channel list
- keep the diagnostics detail page rendering if the detail record is valid

If the shared contact channel helper returns `error`:

- use an empty contact channel list
- do not expose raw error details
- do not convert a valid diagnostics detail page into an error page

If the shared contact channel helper returns `success` with unsupported channel types:

- filter unsupported types out
- render supported channels only

If diagnostics detail helper returns anything other than `success`:

- preserve existing route `notFound()` behavior
- do not let contact channels reveal that a blocked diagnostics detail exists

---

## Validation Plan For Task 167

Task 167 should wire diagnostics contact channels into:

```text
src/app/diagnostics/[slug]/page.tsx
```

Recommended validation commands:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run probe:diagnostics-detail
npm.cmd run probe:diagnostics
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

Recommended implementation checks:

- route imports `getSupabasePublicProviderContactChannels`
- route calls `getSupabasePublicProviderContactChannels("diagnostic", slug)`
- route still calls `getSupabasePublicDiagnosticDetailBySlug(slug)`
- route still calls `notFound()` when diagnostics detail is not `success`
- unavailable/error contact helper results produce an empty contact list
- unsupported contact channel types are filtered out
- supported public channel types map safely to `FacilityContactChannel`
- no raw errors or secrets are exposed
- no SQL, RLS, schema, migration, real data, or contact row insertion occurs
- pharmacy, doctors, and facilities behavior remains unchanged

Known limitation to carry forward:

```text
Diagnostics Supabase runtime probes still report safe fallback/error in the local/Codex runtime.
```

Task 167 should report whether the same runtime limitation affects contact-channel validation.

---

## Scope Boundaries

Task 166 does not implement:

- diagnostics contact channels
- route imports for contact channels
- provider contact helper changes
- SQL changes
- RLS changes
- schema changes
- migration changes
- contact channel row inserts
- diagnostics detail route changes
- diagnostics helper changes
- pharmacy behavior changes
- doctors behavior changes
- facilities behavior changes
- UI redesign
- brand/logo/color changes
- real data imports

Task 166 does not create Task 167 as a file.

---

## Readiness

```text
Ready for Task 167 - Wire Diagnostics Contact Channels Into Detail Page.
```

Recommended Task 167 objective:

```text
Wire active/public diagnostics contact channels into src/app/diagnostics/[slug]/page.tsx using getSupabasePublicProviderContactChannels("diagnostic", slug), map supported public channel types into the existing detail action panel shape, preserve notFound() for non-public diagnostics details, and treat unavailable/error/empty contact results as safe empty contact channels.
```

---

## Planning Status

```text
Planning complete
```

The future route integration target, shared helper pattern, recommended diagnostics contact `provider_type`, provider type naming risk, empty-state behavior, safe fallback/error behavior, public-safe contact fields, validation plan, and Task 167 readiness are defined.
