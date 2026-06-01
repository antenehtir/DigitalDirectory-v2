# DigitalDirectory-v2 Public Listing Read Implementation Preparation

## Purpose

This document prepares the future implementation of Supabase-backed public listing reads in DigitalDirectory-v2.

It is preparation-only. It does not install Supabase packages, add Supabase client code, add real Supabase queries, create `.env` files, add SQL, add migrations, add RLS policies, add authentication, add backend functionality, add protected routes, change current public listing behavior, or modify frontend UI.

The goal is to make the future transition from static seed data to read-only public Supabase data safer, smaller, easier to test, and easy to roll back.

---

## Core Principle

The first public listing read implementation should be boring on purpose.

It should read published public-safe listing data, preserve current UI behavior, keep seed fallback available, use no service role key, require no authentication, and avoid any write path. The implementation should be small enough to verify before more provider types or pages are connected.

---

## Implementation Preparation Purpose

This preparation document should answer the practical questions before code is written:

- Should Supabase packages be installed now or later?
- Where should future public listing read modules live?
- How should current static seed data remain available?
- How do current UI data shapes map to future Supabase rows?
- How should database rows become public UI DTOs?
- Which records are eligible for public display?
- Which private fields must never reach UI components?
- How should the team switch between seed and Supabase reads?
- How can the implementation be tested without production data?
- How can the team roll back quickly if public reads misbehave?

This document should be used before a future implementation task installs packages or adds client code.

---

## Whether to Install Supabase Package Now or Later

Recommendation: install Supabase packages later, not now.

Reasoning:

- Current task is preparation-only.
- Public schema is still a draft.
- RLS policies are not implemented.
- Environment files do not exist yet.
- No Supabase project values are configured.
- Current public listing behavior should not change.
- Static seed data still supports the UI.

Future package installation should happen only when:

- A Supabase project exists for development or staging.
- Environment variable names are agreed.
- Public listing tables and fields are approved.
- RLS policy direction is implemented and testable.
- A narrow read-only public listing slice is selected.
- Rollback plan is documented.

Potential future package:

```text
@supabase/supabase-js
```

This package must not be installed in this task.

---

## Future File Organization

Future public listing read code should be organized in small modules.

Potential future structure:

```text
src/lib/supabase/
  browser-client.ts
  public-listings.ts
  public-taxonomy.ts
  public-search.ts
  mappers.ts
  errors.ts
  types.ts
```

Potential responsibilities:

| File | Future Purpose |
| --- | --- |
| `browser-client.ts` | Browser-safe Supabase client using public anon key |
| `public-listings.ts` | Read-only facilities, doctors, pharmacies, diagnostics helpers |
| `public-taxonomy.ts` | Services, specialties, locations helpers |
| `public-search.ts` | Simple public filtering composition |
| `mappers.ts` | Convert rows into public UI DTOs |
| `errors.ts` | Convert data errors into public-safe error states |
| `types.ts` | Shared public row and DTO types |

Rules:

- Do not create these files now.
- Keep public reads separate from admin, provider, patient, and request modules.
- Keep mapper functions between database rows and UI props.
- Do not import server/admin clients into public modules.
- Do not create an admin client for public reads.

---

## Static Seed Fallback Strategy

Static seed data should stay active until Supabase public reads are proven.

Current seed and sample sources:

- `src/data/sampleFacilities.ts`
- `src/data/sampleDoctors.ts`
- `src/data/samplePharmacies.ts`
- `src/data/sampleDiagnostics.ts`
- `src/data/seed-facilities.ts`
- `src/data/seed-doctors.ts`
- `src/data/seed-pharmacies.ts`
- `src/data/seed-diagnostics.ts`
- `src/data/seed-services.ts`
- `src/data/seed-specialties.ts`
- `src/data/seed-locations.ts`

Recommended fallback phases:

| Phase | Data Source | Use |
| --- | --- | --- |
| Current | Static seed only | Existing app behavior |
| Prep | Static seed only | This task and next planning tasks |
| Integration stage 1 | Supabase read in development with seed fallback | First read-only slice |
| Integration stage 2 | Supabase primary with controlled fallback | Staging validation |
| Integration stage 3 | Supabase production reads after RLS testing | Production launch |

Fallback rules:

- Seed fallback should be explicit, not accidental.
- Production should not silently mix fake sample records with real reviewed listings.
- If fallback is used in production later, the reason should be logged or observable.
- Development fallback can keep UI work unblocked.
- Seed data should not be treated as real verified healthcare data.
- Existing UI imports should not be broken during transition.

---

## Current UI Data Shape Mapping

The current UI expects card and page-friendly objects, not raw database rows.

Current public UI data areas:

| UI Area | Current Data Shape Direction |
| --- | --- |
| Facility cards | Facility name, category, location, services, status, actions |
| Doctor cards | Doctor name, specialty, facility, location, availability, telemedicine preview |
| Pharmacy pages | Facility-card-compatible pharmacy records and preview workflows |
| Diagnostics pages | Facility-card-compatible diagnostics records and preview workflows |
| Detail pages | Static provider detail sections and similar provider cards |
| Search pages | Mixed facility and doctor sample results |
| Nearby pages | Facility, pharmacy, diagnostics preview records |

Mapping rule:
Future Supabase rows should be mapped into stable UI DTOs before reaching components.

Do not make card components depend directly on raw database rows if those rows include internal fields or database-specific structure.

---

## Future Supabase Row Mapping

Future Supabase row mapping should convert public rows into UI-safe DTOs.

Potential mapping examples:

| Supabase Source | Public DTO Direction |
| --- | --- |
| `facilities` row | Facility card/detail DTO |
| `doctors` row | Doctor card/detail DTO |
| `pharmacies` row | Pharmacy listing DTO |
| `diagnostics_providers` row | Diagnostics listing DTO |
| `services` rows | Public service labels |
| `specialties` rows | Public specialty labels |
| `locations` row | Public location display |
| `contact_channels` rows | Public contact display only |
| `doctor_facility_affiliations` rows | Reviewed affiliation labels |
| `facility_services` rows | Reviewed public service tags |

Mapper responsibilities:

- Rename database fields into UI-friendly field names.
- Flatten public relationships where useful.
- Drop private/internal fields.
- Normalize empty or missing optional values.
- Preserve existing card layout expectations.
- Keep verification and listing labels consistent.
- Avoid leaking raw IDs unless UI needs them.

Mapper tests should confirm that private fields are not passed through.

---

## Public Eligibility Rules

Only eligible records should appear in public listing reads.

Recommended eligibility criteria:

- `listing_status` is `published`.
- `visibility_status` is `public`.
- Record has required public display fields.
- Record does not have a suppression flag.
- Related public records are also published and public.
- Contact channels are reviewed and active.
- Services and affiliations are reviewed and active.

Do not publicly show:

- Draft records
- Pending review records
- Rejected records
- Hidden records
- Archived records
- Duplicate records
- Disputed ownership records
- Unreviewed contact changes
- Unreviewed location changes
- Unreviewed emergency, 24-hour, or high-impact claims

Plain-language rule:

```text
Public UI should render only records that are explicitly published for public display.
```

This is not SQL.

---

## Public and Private Field Protection

Public listing implementation should protect private fields at multiple layers.

Fields that must not reach public UI:

- Admin notes
- Reviewer notes
- Verification evidence
- Private provider contacts
- Private submitter contacts
- Provider owner account IDs
- Organization membership records
- Source confidence
- Review assignments
- Audit logs
- Request payloads
- Patient identity
- Booking details
- Payment and wallet records
- Document vault records
- Notification history
- Chatbot logs
- Community group membership

Protection layers:

1. Public/private schema separation.
2. RLS policies.
3. Narrow query selection.
4. Public DTO mapping.
5. Component prop types that expect public data.
6. Tests for private field leakage.

Rule:
If a field is not safe on a public listing detail page, it should not be returned by a public listing read helper.

---

## Feature Flag or Controlled Switch Planning

The first implementation should support a controlled switch between seed and Supabase reads.

Potential switch approaches later:

| Approach | Use |
| --- | --- |
| Environment flag | Choose seed or Supabase by environment |
| Route-level switch | Connect one page at a time |
| Provider-type switch | Facilities first, then doctors, pharmacies, diagnostics |
| Build-time switch | Keep production on seed while staging tests Supabase |

Potential future variable name:

```text
NEXT_PUBLIC_PUBLIC_LISTINGS_SOURCE=seed
```

Alternative values later:

```text
seed
supabase
```

Rules:

- Do not create this variable now.
- Do not add a switch in code now.
- Keep current public listing behavior unchanged.
- Use staging before production.
- Ensure rollback means changing one configuration or reverting one small slice.

---

## Testing Without Production Data

Testing should not depend on production healthcare records.

Recommended test data approach:

- Use development or staging Supabase project.
- Use reviewed mock records clearly marked as test data.
- Use no real patient data.
- Use no real provider private contacts.
- Use no verification evidence files.
- Use no payment, booking, document, chatbot, or community records.
- Include published and unpublished records to test RLS and filtering.
- Include hidden, archived, rejected, and duplicate examples.

Minimum test cases:

- Published facility appears.
- Draft facility does not appear.
- Published doctor appears.
- Hidden doctor does not appear.
- Reviewed facility service appears.
- Unreviewed facility service does not appear.
- Public contact appears.
- Private contact does not appear.
- Seed fallback works in development.
- Public UI remains usable on empty results.

---

## Rollback Strategy

Rollback should be easy before the first implementation begins.

Recommended rollback options:

- Keep seed data imports available.
- Connect only one public read surface first.
- Use a controlled data source switch later.
- Keep Supabase query helpers isolated.
- Keep UI components receiving the same DTO shape.
- Avoid broad refactors during the first read slice.
- Avoid removing sample data until Supabase reads are stable.

Rollback examples:

- Switch public listings source back to `seed`.
- Revert the first query helper integration.
- Disable Supabase reads for one provider type.
- Keep static routes rendering from seed data.

Rules:

- Rollback should not require database changes.
- Rollback should not require UI redesign.
- Rollback should not affect public browsing.
- Rollback should not expose private data.

---

## Build and Deployment Safety

Build and deployment should remain predictable during public read rollout.

Build safety:

- Missing optional Supabase variables should fail clearly in development when Supabase mode is enabled.
- Seed mode should not require Supabase variables.
- Public routes should avoid runtime crashes when data is unavailable.
- TypeScript should verify DTO shapes.
- Build output should not print secrets.

Deployment safety:

- Preview deployments should use staging or development Supabase projects.
- Production should not point to staging data.
- Production should not use seed fallback with fake records unless explicitly approved.
- Deployment secrets should live in the deployment provider.
- Public pages should be tested after deployment.
- RLS should be tested before production traffic uses Supabase reads.

No deployment configuration should change in this task.

---

## Relationship to Supabase Environment Setup Guide

This document depends on `SupabaseEnvironmentSetupGuide.md`.

Relationship:

- The environment guide defines key handling and `.env.local` usage.
- This prep document defines when future reads may rely on those variables.
- The environment guide separates anon and service role keys.
- This prep document requires public reads to avoid service role usage.
- The environment guide warns against committing secrets.
- This prep document keeps the current task secret-free and code-free.

Read implementation should not begin until environment setup is approved.

---

## Relationship to Public Listing Schema Draft

This document depends on `PublicListingSchemaDraft.md`.

Relationship:

- The schema draft defines candidate tables and public fields.
- This prep document defines how those rows should map to current UI DTOs.
- The schema draft separates public and private fields.
- This prep document reinforces mapper and query boundaries.
- The schema draft defines statuses.
- This prep document uses statuses as public eligibility rules.

Read implementation should not begin until public field and status names are stable enough for testing.

---

## Relationship to RLS Policy Planning

This document depends on `RLSPolicyPlanning.md`.

Relationship:

- RLS planning defines who may read records.
- This prep document defines how the app should safely consume public reads.
- RLS denies private data by default.
- This prep document avoids querying private data in public modules.
- RLS policy testing should happen before production use.
- This prep document requires published and unpublished records in test data.

Read implementation should not bypass RLS with service role access.

---

## Relationship to Public Listing Read Integration Plan

This document depends on `PublicListingReadIntegrationPlan.md`.

Relationship:

- The read integration plan defines the desired public read behavior.
- This prep document defines practical steps before that behavior is coded.
- The read integration plan covers facilities, doctors, pharmacies, diagnostics, and taxonomy reads.
- This prep document covers mapping, fallback, switching, testing, and rollback.

This document should be the final preparation checkpoint before an implementation task.

---

## Implementation Readiness Checklist

Do not begin public read implementation until the following are true:

1. Supabase implementation task is explicitly approved.
2. Supabase development or staging project exists.
3. Environment variable names are agreed.
4. No real secrets are committed.
5. Public listing schema fields are approved for first slice.
6. Public/private field separation is documented.
7. RLS policies are written and tested in development or staging.
8. Test records include published and unpublished examples.
9. First provider type or page slice is chosen.
10. DTO shape is defined for that slice.
11. Mapper behavior is documented.
12. Seed fallback remains available.
13. Rollback plan is understood.
14. Build/deployment behavior is understood.
15. No service role key is required for public reads.

If any item is missing, continue planning rather than implementing.

---

## MVP Recommendation

Do not implement public listing reads in this task.

Current MVP stance:

- Keep current public listing behavior unchanged.
- Keep static seed data active.
- Do not install Supabase packages.
- Do not add Supabase client code.
- Do not add real Supabase queries.
- Do not create `.env` files.
- Do not add SQL, migrations, or RLS policies.
- Do not add auth, backend, protected routes, or dashboards.
- Do not modify frontend UI.

Recommended first implementation later:
Connect one low-risk read-only public surface in development or staging, likely public taxonomy or published facilities, after schema, RLS, environment variables, and fallback are ready.

---

## Risks

Key risks:

- Installing Supabase packages before scope is stable.
- Adding client code before RLS is tested.
- Breaking current public listing behavior.
- Removing seed fallback too early.
- Mixing fake seed data with real production records.
- Exposing private fields through raw rows.
- Using service role key for public reads.
- Treating preview verification labels as real production verification.
- Failing to distinguish empty results from backend errors.
- Making rollback require UI rewrites.
- Connecting preview deployment to production data accidentally.

Mitigations:

- Keep this task documentation-only.
- Use one small future read slice.
- Preserve DTO shapes.
- Keep seed fallback available.
- Use public anon key with RLS.
- Map rows through public DTOs.
- Test with staging data only.
- Keep rollback switch simple.
- Do not remove current seed files until database reads are stable.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only until implementation is approved.
2. Review this prep document with environment, schema, RLS, client setup, and read integration plans.
3. Choose the first read slice, such as public taxonomy or facilities.
4. Finalize DTO shape for the chosen slice.
5. Finalize field mappings from Supabase rows to UI props.
6. Confirm seed fallback behavior.
7. Confirm feature flag or controlled switch approach.
8. Create a development or staging Supabase project in a dedicated setup task.
9. Add environment variables outside git.
10. Add Supabase package and client in a dedicated implementation task.
11. Add schema, migrations, and RLS in a dedicated database task.
12. Test public and private access before connecting UI.
13. Connect the first read-only public slice.
14. Run lint, build, and targeted manual checks.
15. Expand to additional provider types only after the first slice is stable.

---

## Summary

Public listing read implementation should begin only after the team is ready to protect current behavior, preserve seed fallback, map future Supabase rows into public DTOs, test without production data, and roll back quickly.

The safest path is a small read-only slice, public anon key only, tested RLS, no service role usage, no writes, and no UI behavior changes beyond the approved integration.

The recommended current action is documentation only. No Supabase packages, client code, queries, `.env` files, SQL, migrations, RLS policies, authentication, backend functionality, protected routes, public listing behavior changes, or frontend UI modifications should be added in this task.
