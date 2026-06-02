# DigitalDirectory-v2 Provider Contact Channels Schema Planning

## Purpose

This document plans a safe public schema for provider contact channels before any SQL is written.

The goal is to support public, reviewed contact/action links for facilities, doctors, pharmacies, diagnostics providers, telemedicine providers, ambulance providers, and home care providers without placing private contacts, internal notes, credentials, patient data, bookings, payments, or admin workflow data into public listing tables.

This is documentation-only. It does not write SQL, modify app code, modify UI, add test data, use service-role keys, expose environment values, expose keys, or commit changes.

## Context Reviewed

Documentation reviewed:

- `docs/CodexTask-117-ProviderContactChannelsSchemaPlanning.md`
- `docs/FacilityDetailRouteQARecord.md`
- `docs/DoctorDetailRouteQARecord.md`
- `docs/DoctorsPageSupabaseWiringQARecord.md`
- `docs/FacilitiesSupabasePreviewStabilizationQA.md`
- `docs/DoctorsSchemaSQLPlanning.md`

Implementation and schema context reviewed:

- `src/app/facilities/[slug]/page.tsx`
- `src/app/doctors/[slug]/page.tsx`
- `src/components/facility-detail/FacilityDetailPage.tsx`
- `src/components/doctors/DoctorsPage.tsx`
- `src/lib/supabase/facilities-public-read.ts`
- `src/lib/supabase/doctors-public-read.ts`
- `supabase/migrations_draft/001_create_facilities_table.sql`
- `supabase/migrations_draft/004_create_doctors_table.sql`

## Current State

Facilities and doctors now have public detail read paths.

Current detail mappers intentionally return empty contact channel arrays:

```text
contactChannels: []
```

This keeps the first Supabase reads safe, but it means public detail pages do not yet have a normalized backend source for public phone, WhatsApp, website, email, maps, appointment, social, or emergency contact actions.

## Proposed Table

Future table name:

```text
public.provider_contact_channels
```

This table should store reviewed public contact/action channels only.

It should not store private provider contact details, internal support contacts, admin notes, patient communication data, booking records, payment records, document links, credential evidence, or verification documents.

## Supported Provider Types

Allowed `provider_type` values:

- `facility`
- `doctor`
- `pharmacy`
- `diagnostic`
- `telemedicine`
- `ambulance`
- `home_care`

The singular value `diagnostic` should be used for schema consistency even if UI copy says diagnostics provider.

## Supported Channel Types

Allowed `channel_type` values:

- `phone`
- `whatsapp`
- `telegram`
- `website`
- `email`
- `maps`
- `appointment`
- `habaridoc`
- `emergency`
- `social`

Channel type notes:

- `phone`: Public main line only.
- `whatsapp`: Public WhatsApp contact or reviewed link only.
- `telegram`: Public Telegram contact or reviewed link only.
- `website`: Public provider website or profile page.
- `email`: Public support or listing email only, not private staff email.
- `maps`: Public map/directions URL.
- `appointment`: Public appointment request link or preview action, not a booking record.
- `habaridoc`: Future internal Habaridoc profile/action link.
- `emergency`: Public emergency contact only when reviewed and clearly scoped.
- `social`: Public social profile link such as Facebook, Instagram, LinkedIn, or TikTok.

## Planned Fields

Recommended first fields:

- `id`
- `provider_type`
- `provider_slug`
- `channel_type`
- `label`
- `value_public`
- `url_public`
- `is_primary`
- `display_order`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`
- `created_at`
- `updated_at`

Field notes:

- `id`: UUID primary key.
- `provider_type`: Identifies which provider family the channel belongs to.
- `provider_slug`: Matches the public provider slug in its provider table.
- `channel_type`: Determines UI treatment and link behavior.
- `label`: Reviewed public label, such as Main phone, WhatsApp, Website, or Directions.
- `value_public`: Public display text only, such as a masked or reviewed phone label.
- `url_public`: Public URL or href value only when safe to expose.
- `is_primary`: Marks the preferred public channel for the provider.
- `display_order`: Controls stable ordering in cards/detail pages.
- `listing_status`: Publication lifecycle for the channel row.
- `visibility_status`: Public visibility boundary for the channel row.
- `verification_status`: Review/verification state for the channel itself.
- `last_confirmed_at`: Optional public freshness signal.
- `created_at` and `updated_at`: Operational timestamps.

## Status Vocabulary

Use the same status vocabulary as facilities and doctors.

`listing_status` allowed values:

- `draft`
- `pending`
- `active`
- `rejected`
- `archived`
- `suspended`

Recommended default:

- `pending`

`visibility_status` allowed values:

- `public`
- `hidden`
- `internal`

Recommended default:

- `hidden`

`verification_status` allowed values:

- `unverified`
- `pending`
- `verified`
- `disputed`
- `expired`

Recommended default:

- `unverified`

Public eligibility rule:

```text
listing_status = active
visibility_status = public
```

## Public Safety Rules

Only reviewed public contact/action data should be stored in `public.provider_contact_channels`.

Safe examples:

- Public facility front desk phone.
- Public doctor profile website.
- Public pharmacy WhatsApp order inquiry link if reviewed.
- Public diagnostics center directions link.
- Public telemedicine information link.
- Public ambulance dispatch number if verified and clearly scoped.
- Public home care service inquiry link.

Do not store:

- Private staff phone numbers.
- Private staff email addresses.
- Provider owner account emails.
- Internal support contacts.
- Admin/reviewer notes.
- Verification evidence.
- License documents.
- Uploaded certificates.
- Patient messages.
- Booking requests.
- Payment or wallet data.
- Document vault links.
- Private telemedicine room links.
- Internal incident escalation contacts.

Public pages should never reveal that a hidden, pending, archived, suspended, rejected, or internal contact channel exists.

## Mapping Strategy

The first mapping strategy should use:

```text
provider_type + provider_slug
```

Example:

```text
provider_type = facility
provider_slug = test-facility-alpha
```

This keeps the first version simple and avoids adding relationship tables before they are needed.

Expected future helper patterns:

- `getSupabasePublicContactChannelsForProvider(providerType, providerSlug)`
- `getSupabasePublicFacilityDetailBySlug(slug)` can later fetch or compose facility detail plus facility channels.
- `getSupabasePublicDoctorDetailBySlug(slug)` can later fetch or compose doctor detail plus doctor channels.

Future mapping into the existing public detail shape:

- Row `id` -> `PublicContactChannel.id`
- Row `channel_type` -> `PublicContactChannel.type` where compatible.
- Row `label` -> `PublicContactChannel.label`
- Row `value_public` -> `PublicContactChannel.value`
- Row `url_public` -> `PublicContactChannel.href`
- Public eligibility -> include or exclude the channel.
- `display_order` -> stable ordering.
- `is_primary` -> preferred first action where UI supports it.

The current `PublicContactChannelType` type may need a later expansion because it currently supports fewer types than the proposed schema.

## RLS Concept

The public RLS model should mirror facilities and doctors.

Anonymous public read:

- `anon` can select rows where `listing_status = 'active'` and `visibility_status = 'public'`.
- `anon` cannot insert contact channels.
- `anon` cannot update contact channels.
- `anon` cannot delete contact channels.

Frontend rules:

- Do not use a service-role key in frontend code.
- Do not expose raw Supabase errors in public UI.
- Keep app query filters as an additional safety layer, but rely on RLS as the database boundary.

Future authenticated behavior should be planned separately:

- Provider owner channel requests.
- Facility manager channel requests.
- Doctor owner channel requests.
- Admin/reviewer approval workflows.
- Audit logs.
- Dispute handling for incorrect public contact channels.

## Relationship To Provider Tables

The first schema can use `provider_slug` without foreign keys because provider tables are currently split by type.

Later options:

1. Keep type-plus-slug lookup for public reads.
2. Add provider-specific foreign keys if each provider table remains separate.
3. Add a normalized provider registry table and relate channels to a single provider ID.

For MVP, type-plus-slug is the safest and least disruptive approach.

## MVP Recommendation

For MVP, create a draft SQL plan for `public.provider_contact_channels` with:

- Public-safe fields only.
- Provider type and provider slug lookup.
- Channel type constraints.
- Facilities/doctors-aligned status constraints.
- Ordering fields.
- Public freshness field.
- Helpful indexes.
- No private contact fields.
- No RLS writes for anon.
- No provider-owner write permissions yet.

Initial public reads should start with facilities and doctors only after a separate SQL draft, RLS draft, test data draft, and QA pass.

## Deferred Features

Defer these until separately planned:

- Provider owner editing.
- Admin dashboard management.
- Verification evidence storage.
- Contact change review workflow.
- Audit trail tables.
- Contact channel relationship to provider owner accounts.
- Deep booking integration.
- Payment links.
- Telemedicine room links.
- Patient messaging.
- Notifications triggered by channel changes.
- Social API integrations.
- WhatsApp, Telegram, or email sending integrations.
- Emergency dispatch workflows.
- Contact channel analytics.

## What Should Not Be Implemented Yet

Do not implement yet:

- SQL table creation.
- RLS policy SQL.
- Test data inserts.
- Supabase contact-channel read helpers.
- Facility detail contact-channel wiring.
- Doctor detail contact-channel wiring.
- Pharmacy, diagnostics, telemedicine, ambulance, or home care backend reads.
- Provider dashboards.
- Authentication.
- Protected routes.
- Real contact submission or messaging.

## Recommended Next Task

Recommended next task:

```text
Provider Contact Channels SQL Draft
```

That task should create a draft SQL file only, not run it, and include:

- `public.provider_contact_channels`.
- Field constraints.
- Provider type allowed values.
- Channel type allowed values.
- Status constraints.
- Public-safe comments.
- Helpful indexes.
- Updated-at trigger if appropriate.
- No RLS yet.
- No test inserts yet.

## Summary

`public.provider_contact_channels` should become the shared public-safe source for provider contact/action links. It should support facilities, doctors, pharmacies, diagnostics providers, telemedicine providers, ambulance providers, and home care providers through `provider_type + provider_slug`, expose only active/public reviewed channels, preserve private/internal contact boundaries, avoid service-role usage in frontend reads, and defer all provider-owner, admin, messaging, booking, payment, and verification workflows to later protected phases.
