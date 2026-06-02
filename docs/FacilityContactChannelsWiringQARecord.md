# DigitalDirectory-v2 Facility Contact Channels Wiring QA Record

## Purpose

This document records the confirmed manual QA result for wiring public provider contact channels into facility detail pages.

This is a documentation-only QA record. It does not modify app code, frontend UI, SQL, RLS policies, test data, doctor detail pages, search, nearby, pharmacies, diagnostics, environment values, keys, or service-role usage.

## Files Reviewed

Documentation reviewed:

- `docs/CodexTask-127-FacilityContactChannelsWiringQARecord.md`
- `docs/ProviderContactChannelsRuntimeQARecord.md`
- `docs/FacilityDetailRouteQARecord.md`
- `docs/ProviderContactChannelsManualSQLExecutionQARecord.md`

Implementation files reviewed:

- `src/app/facilities/[slug]/page.tsx`
- `src/components/facility-detail/FacilityActionPanel.tsx`
- `src/lib/supabase/provider-contact-channels-public-read.ts`

## Route And Helper Wiring

Facility detail pages use:

```text
getSupabasePublicProviderContactChannels("facility", slug)
```

The facility detail route keeps the existing safe facility detail read path and fetches public contact channels separately by facility slug.

Only successful contact channel reads are rendered. Unavailable, error, or empty results resolve to no visible contact channel list rather than exposing raw Supabase errors.

## Confirmed Public Facility Results

Confirmed manual QA showed these facility detail pages loaded and displayed public contact channels.

### `/facilities/test-facility-alpha`

Public contact channels displayed:

- Main phone
- WhatsApp
- Directions / maps

### `/facilities/test-facility-eta-minimal`

Public contact channels displayed:

- Website
- LinkedIn

### `/facilities/test-facility-zeta-disputed`

Public contact channels displayed:

- Public phone
- Directions / maps

## Blocked Facility Route Result

Confirmed manual QA showed this blocked facility route returned `404`:

```text
/facilities/test-facility-beta-pending
```

This matches the public read boundary for facility detail pages and contact channels.

## Contact Channel Visibility Findings

Public contact channels appeared correctly on active/public facility detail pages.

Blocked, private, hidden, internal, pending, archived, rejected, or suspended contact channels stayed hidden.

The visible channel types remain within the allowed facility detail display set:

- `phone`
- `whatsapp`
- `website`
- `maps`
- `social` with label `LinkedIn`
- `appointment`

## Error And Secret Safety

Confirmed safety findings:

- No raw Supabase errors were visible.
- No environment values were visible.
- No keys were visible.
- No service-role key was used.
- No private owner contacts were shown.
- No private doctor contacts were shown.
- No private staff contacts were shown.
- No patient data was shown.
- No booking data was shown.
- No payment data was shown.
- No admin data was shown.
- No license data was shown.

## Route Isolation

No wiring changes were made to:

- Doctors
- Search
- Nearby
- Pharmacies
- Diagnostics

Doctor detail pages are not wired to provider contact channels yet.

## Current Limitations

Current limitations:

- Facility contact channels are wired only for facility detail pages.
- Doctor detail pages do not yet show provider contact channels.
- Pharmacy, diagnostics, telemedicine, ambulance, and home care contact channels remain future work.
- Contact channels are still read-only public data in this phase.
- Provider owner editing, review workflows, protected writes, audit logs, and real submission flows remain out of scope.

## Recommended Next Task

Recommended next task:

```text
Wire contact channels into doctor detail pages
```

That task should use the same provider contact channels helper with `providerType = "doctor"`, keep raw errors hidden, preserve doctor detail UI style, and continue excluding blocked/private/internal contact channels.

## Summary

Facility contact channel wiring passed manual QA.

The three active/public facility detail pages loaded and displayed their expected public contact channels, the pending facility route returned `404`, blocked/private/internal channels stayed hidden, no raw Supabase errors or secrets were visible, no service-role key was used, and doctors/search/nearby/pharmacies/diagnostics were unchanged.
