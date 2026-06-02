# DigitalDirectory-v2 Doctor Contact Channels Wiring QA Record

## Purpose

This document records the confirmed manual QA result for wiring public provider contact channels into doctor detail pages.

This is a documentation-only QA record. It does not modify app code, frontend UI, SQL, RLS policies, test data, new routes, facilities, search, nearby, pharmacies, diagnostics, environment values, keys, or service-role usage.

## Files Reviewed

Documentation reviewed:

- `docs/CodexTask-129-DoctorContactChannelsWiringQARecord.md`
- `docs/ProviderContactChannelsRuntimeQARecord.md`
- `docs/DoctorDetailRouteQARecord.md`
- `docs/FacilityContactChannelsWiringQARecord.md`

Implementation files reviewed:

- `src/app/doctors/[slug]/page.tsx`
- `src/lib/supabase/provider-contact-channels-public-read.ts`
- `src/lib/supabase/doctors-public-read.ts`

## Route And Helper Wiring

Doctor detail pages use:

```text
getSupabasePublicProviderContactChannels("doctor", slug)
```

The doctor detail route keeps the existing safe doctor detail read path and fetches public contact channels separately by doctor slug.

Only successful contact channel reads are rendered. Unavailable, error, or empty results resolve to no visible contact channel list rather than exposing raw Supabase errors.

## Confirmed Public Doctor Results

Confirmed manual QA showed these doctor detail pages loaded and displayed public contact channels.

### `/doctors/test-doctor-alpha`

Public contact channels displayed:

- LinkedIn
- Appointment request preview

### `/doctors/test-doctor-eta-minimal`

Public contact channels displayed:

- Public profile website
- Public profile phone

### `/doctors/test-doctor-zeta-disputed`

Public contact channels displayed:

- LinkedIn
- WhatsApp

## Blocked Doctor Route Result

Confirmed manual QA showed this blocked doctor route returned `404`:

```text
/doctors/test-doctor-beta-pending
```

This matches the public read boundary for doctor detail pages and contact channels.

## Contact Channel Visibility Findings

Public contact channels appeared correctly on active/public doctor detail pages.

Blocked, private, hidden, internal, pending, archived, rejected, or suspended contact channels stayed hidden.

The visible channel types remain within the allowed doctor detail display set:

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

- Facilities
- Search
- Nearby
- Pharmacies
- Diagnostics

No new routes were wired for this QA record.

## Current Limitations

Current limitations:

- Doctor contact channels are wired only for doctor detail pages.
- Pharmacy, diagnostics, telemedicine, ambulance, and home care contact channels remain future work.
- Contact channels are still read-only public data in this phase.
- Provider owner editing, review workflows, protected writes, audit logs, and real submission flows remain out of scope.

## Recommended Next Task

Recommended next task:

```text
Pharmacy discovery schema planning
```

That task should continue the same pattern: plan public-safe fields first, defer private/provider-owner data, and keep public read boundaries explicit before any SQL or app wiring.

## Summary

Doctor contact channel wiring passed manual QA.

The three active/public doctor detail pages loaded and displayed their expected public contact channels, the pending doctor route returned `404`, blocked/private/internal channels stayed hidden, no raw Supabase errors or secrets were visible, no service-role key was used, and facilities/search/nearby/pharmacies/diagnostics were unchanged.
