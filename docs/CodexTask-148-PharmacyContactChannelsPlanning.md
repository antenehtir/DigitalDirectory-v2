# Codex Task 148: Pharmacy Contact Channels Planning

## Project

DigitalDirectory-v2

## Goal

Plan the public-safe pharmacy contact channel strategy before implementation.

This task follows:

- CodexTask-144-PharmacyDetailReadHelperImplementation.md
- CodexTask-145-PharmacyDetailRuntimeProbe.md
- CodexTask-146-PharmacyDetailRouteControl.md
- CodexTask-147-PharmacyDetailRouteQA.md

The pharmacy list-to-detail journey is now working. The next step is to plan how pharmacy contact channels should appear safely on pharmacy detail pages and pharmacy cards.

This is a planning task only.

Do not implement code in this task.

---

## Important Context

Before writing the plan, inspect:

- docs/CodexTask-117-ProviderContactChannelsPlanning.md
- docs/CodexTask-118-ProviderContactChannelsModelPlanning.md
- docs/CodexTask-119-ProviderContactChannelsImplementation.md
- docs/CodexTask-120-ProviderContactChannelsQA.md
- docs/CodexTask-121-ProviderContactChannelsRuntimeProbe.md
- docs/CodexTask-122-ProviderContactChannelsPageWiring.md
- docs/CodexTask-123-ProviderContactChannelsRouteQA.md
- docs/CodexTask-124-ProviderContactChannelsRuntimeProbe.md
- docs/CodexTask-126-WireContactChannels.md
- docs/CodexTask-127-FacilityContactChannels.md
- docs/CodexTask-128-WireContactChannels.md
- docs/CodexTask-129-DoctorContactChannels.md

Also inspect:

- src/app/pharmacies/page.tsx
- src/app/pharmacies/[slug]/page.tsx
- src/lib/supabase/pharmacies-public-read.ts
- src/lib/public-listing-mappers.ts
- src/types/public-listings.ts
- existing facility contact channel implementation
- existing doctor contact channel implementation
- docs/DataModelContentStructure.md
- docs/DevelopmentRoadmap.md

Use the existing provider/facility/doctor contact channel architecture as the main guide.

---

## Main Objective

Create a written implementation plan for pharmacy contact channels.

The plan should define:

1. What contact channels pharmacies should support for MVP.
2. Which contact fields are public-safe.
3. Which contact fields must remain private or excluded.
4. Whether existing provider contact channel types/components can be reused.
5. Whether the current `pharmacies` SQL/table fields support contact channels already.
6. Whether new SQL fields are required later or whether existing public fields are enough for now.
7. How pharmacy cards should display contact actions.
8. How pharmacy detail pages should display contact actions.
9. How delivery/pickup inquiry should be represented.
10. What Task 149 should implement.

---

## Pharmacy Contact Channels to Consider

For MVP, consider the following public-safe contact actions:

- Phone call
- WhatsApp
- Telegram
- Website
- Google Maps / map link
- Address display
- Opening hours display
- Pickup inquiry
- Delivery inquiry
- Prescription upload preview label, if already supported

Do not assume all of these are already available in the schema.

---

## Public Safety Rules

The plan must clearly separate public-safe and private/internal data.

Public-safe examples:

- public phone number
- public WhatsApp number
- public Telegram link or handle
- public website
- public map link
- public address
- public landmark
- public opening hours

Private/internal examples:

- owner phone
- staff personal phone
- admin notes
- internal verification notes
- private documents
- private registration files
- private email not intended for public display
- internal Supabase IDs if not needed in UI

No private/internal contact information should be exposed.

---

## Planning Questions

Answer these clearly in the task output:

1. What contact channel system already exists for facilities and doctors?
2. Can pharmacy contact channels reuse the same system?
3. What fields does the pharmacy public read helper currently return?
4. Does the current pharmacy helper return enough data for real contact actions?
5. Are contact fields missing from the pharmacy public read helper?
6. Are contact fields missing from the pharmacy SQL/table?
7. Should Task 149 only wire existing fields, or should it first add contact field support?
8. How should pharmacy pickup/delivery inquiry actions appear?
9. How should missing contact data be handled in the UI?
10. What should Task 149 be called?

---

## Scope

Allowed:

- Inspect existing contact channel patterns.
- Inspect pharmacy helper and route.
- Inspect public listing/contact channel types.
- Write a planning section inside this task file.
- Recommend the safest implementation path for Task 149.

Not allowed:

- Do not modify source code.
- Do not modify SQL.
- Do not modify RLS.
- Do not add pharmacy columns.
- Do not wire contact buttons yet.
- Do not modify pharmacy pages.
- Do not implement diagnostics.
- Do not import real data.
- Do not change brand/logo UI.
- Do not create Task 149.

---

## Expected Output

Update this task markdown with a planning section containing:

- Existing contact channel architecture found
- Pharmacy public data currently available
- Missing pharmacy contact data, if any
- Public/private safety decision
- Recommended pharmacy contact channel fields for MVP
- Recommended UI placement
- Recommended implementation sequence
- Risks
- Recommended Task 149 title and objective

---

## Acceptance Criteria

- Existing provider/facility/doctor contact channel patterns are inspected.
- Pharmacy contact channel requirements are documented.
- Public-safe vs private/internal fields are clearly separated.
- Current pharmacy data limitations are documented.
- Recommended implementation path is documented.
- No source code is modified.
- No SQL, schema, or RLS changes are made.
- No UI changes are made.
- Task 149 is recommended but not created.

---

## Deliverable

A planning-only task that prepares the project for safe pharmacy contact channel implementation.

Do not create Task 149 in this task.

---

## Pharmacy Contact Channels Planning Result

### Files and Patterns Reviewed

The existing contact channel architecture was reviewed through the current provider contact channel planning, SQL draft, runtime QA, and facility/doctor wiring records. Some earlier requested task filenames have since been superseded by more specific task files, so this plan uses the current equivalent records:

- `ProviderContactChannelsSchemaPlanning.md`
- `ProviderContactChannelsRuntimeQARecord.md`
- `FacilityContactChannelsWiringQARecord.md`
- `DoctorContactChannelsWiringQARecord.md`
- `CodexTask-123-ProviderContactChannelsPublicReadHelperImplementation.md`
- `CodexTask-124-ProviderContactChannelsRuntimeProbe.md`
- `CodexTask-126-WireContactChannelsIntoFacilityDetailPage.md`
- `CodexTask-127-FacilityContactChannelsWiringQARecord.md`
- `CodexTask-128-WireContactChannelsIntoDoctorDetailPage.md`
- `CodexTask-129-DoctorContactChannelsWiringQARecord.md`
- `src/app/pharmacies/page.tsx`
- `src/app/pharmacies/[slug]/page.tsx`
- `src/lib/supabase/pharmacies-public-read.ts`
- `src/lib/public-listing-mappers.ts`
- `src/types/public-listings.ts`

### Existing Contact Channel Architecture Found

The project already has a shared provider contact channel system through `public.provider_contact_channels` and the helper `getSupabasePublicProviderContactChannels(providerType, providerSlug)`.

The helper is provider-type agnostic and already supports `pharmacy` as a provider type. It reads only public-safe channel fields, filters by the requested provider type and slug, and applies the public eligibility rules:

- `listing_status = active`
- `visibility_status = public`

The helper returns safe result states and does not expose raw Supabase errors, environment values, or secrets. Facility and doctor detail pages already use this helper with provider types `facility` and `doctor`.

Facility detail pages call:

- `getSupabasePublicProviderContactChannels("facility", slug)`

Doctor detail pages call:

- `getSupabasePublicProviderContactChannels("doctor", slug)`

Both routes use active/public contact rows only, hide blocked/private/internal rows, and treat missing, unavailable, or error states as safe empty contact output.

### Pharmacy Public Data Currently Available

The pharmacy public read helper currently exposes public pharmacy profile and discovery fields, not action-channel fields.

Public pharmacy fields currently available from `src/lib/supabase/pharmacies-public-read.ts` include:

- `id`
- `slug`
- `display_name`
- `pharmacy_type`
- `description`
- `city`
- `area`
- `address_public`
- `landmark_public`
- `service_modes`
- `opening_hours_public`
- `delivery_available`
- `pickup_available`
- `accepts_prescription_upload_preview`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

The pharmacy detail route currently uses `getSupabasePublicPharmacyDetailBySlug(slug)` and maps the pharmacy profile into the existing detail layout with an empty contact channel list. This means pharmacy detail pages can show public profile context, location text, opening hours, and service availability, but they do not yet show phone, WhatsApp, website, map, social, or appointment action channels.

### Missing Pharmacy Contact Data

The `public.pharmacies` table and pharmacy read helper do not currently provide these direct contact/action values:

- public phone
- WhatsApp link or number
- Telegram link or handle
- public website URL
- map or directions URL
- public email
- social profile URL
- appointment or inquiry URL

This is acceptable because the intended architecture is to store contact/action channels in `public.provider_contact_channels`, not as columns on each provider table. For Task 149, pharmacy contact channels should be read through `provider_contact_channels` using:

- `provider_type = pharmacy`
- `provider_slug = requested pharmacy slug`

No new pharmacy table columns are recommended for the MVP contact-channel wiring.

One important limitation remains: facility and doctor contact channel test rows have been verified, but pharmacy-specific contact channel rows are not yet confirmed in the runtime QA records. If pharmacy contact channel rows do not exist yet, Task 149 should still render safely with no contact section or a safe empty state.

### Public-Safe vs Private/Internal Fields

Public-safe pharmacy contact and display fields may include:

- public business phone
- public WhatsApp contact
- public Telegram link or handle
- public website
- public map or directions URL
- public email explicitly approved for listing display
- public social profile, such as LinkedIn represented as `channel_type = social` with a clear label
- public appointment or inquiry link
- public address
- public landmark
- public opening hours
- public pickup/delivery availability labels

Private or deferred fields must not be displayed:

- owner personal phone
- staff personal phone
- private doctor or pharmacist contact information
- private email not intentionally approved for public display
- admin notes
- internal verification notes
- registration files
- license documents
- prescription uploads
- prescription contents
- patient data
- patient address
- payment or order data
- medicine inventory or controlled medication workflows
- service-role keys or internal Supabase details

### Recommended MVP Pharmacy Contact Channels

For the first pharmacy contact-channel implementation, support only channel types already proven in facility and doctor detail pages:

- `phone`
- `whatsapp`
- `website`
- `maps`
- `social` with label such as `LinkedIn`
- `appointment`

The provider contact channel schema also supports `telegram`, `email`, `emergency`, and `habaridoc`, but these should be deferred for pharmacy UI display unless the existing detail action component is intentionally expanded and QAed for those types.

Pickup and delivery should not become real workflows in Task 149. They should remain informational labels derived from the pharmacy profile fields:

- `pickup_available`
- `delivery_available`
- `service_modes`

If an inquiry link exists later, it should be represented as a public contact channel such as `appointment` or a future approved inquiry channel, not as a real order or payment flow.

### Recommended UI Placement

Pharmacy contact channels should appear on the pharmacy detail page only for the MVP. The safest placement is to reuse the existing detail action panel pattern already used by facility detail pages.

Recommended behavior:

- Show contact/action channels only after the pharmacy detail record is confirmed active/public.
- Load pharmacy contact channels with `getSupabasePublicProviderContactChannels("pharmacy", slug)`.
- Show only active/public channels returned by the helper.
- If no channels exist, show no contact section or a safe empty state.
- Do not show raw helper errors.
- Do not add contact actions to pharmacy list cards yet.
- Do not create prescription upload, delivery order, payment, or booking behavior.

### Recommended Task 149 Implementation Path

Recommended Task 149 title:

`CodexTask-149-WirePharmacyContactChannelsIntoDetailPage.md`

Recommended objective:

Wire active/public pharmacy contact channels into `/pharmacies/[slug]` using the existing provider contact channel helper, while preserving the current pharmacy detail layout and safe fallback behavior.

Safest implementation sequence:

1. Inspect `src/app/pharmacies/[slug]/page.tsx`, `src/app/facilities/[slug]/page.tsx`, and `src/app/doctors/[slug]/page.tsx`.
2. Import `getSupabasePublicProviderContactChannels` into the pharmacy detail route.
3. After resolving the active/public pharmacy detail record, call `getSupabasePublicProviderContactChannels("pharmacy", slug)`.
4. Map only supported public channel types into the existing detail action panel shape.
5. Treat `unavailable`, `error`, and empty result states as safe empty contact channels.
6. Preserve `notFound()` behavior for blocked or unknown pharmacy detail slugs.
7. Do not expose raw Supabase errors, env values, keys, or internal fields.
8. Do not modify SQL, RLS, schema, migrations, pharmacy list pages, search, nearby, diagnostics, or brand UI.
9. Run lint, build, and the existing pharmacy probes after the implementation.

### Risks and Review Items

- Pharmacy-specific contact channel rows may not exist yet, so the first implementation may only confirm safe empty behavior until test rows are added separately.
- The current reusable detail layout is facility-oriented. Task 149 should avoid redesigning it, but pharmacy-specific wording may need a later UI cleanup pass.
- The provider contact channel schema supports more channel types than the current detail action panel displays. Unsupported types should remain hidden until a separate UI/type expansion is planned.
- Prescription upload, delivery ordering, inventory, and payment workflows must remain out of scope.
- Public contact values must be intentionally public before activation. Do not infer public contact details from private records or real-world sources.
