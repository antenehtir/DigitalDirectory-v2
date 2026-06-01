# DigitalDirectory-v2 Facilities SQL Manual Execution QA

## Purpose

This document records the confirmed manual QA result for the first facilities SQL drafts executed in the Supabase test project.

This is a documentation-only QA record. It does not run SQL, modify Supabase, add Supabase reads, create environment files, add real keys, change frontend UI, or modify app code.

## Manual QA Purpose

The QA purpose is to capture what was manually executed and verified before any future app-facing public read implementation begins.

This QA pass checks that:

- The first facilities table draft can be applied successfully in the test project.
- The facilities RLS draft can be applied successfully after table creation.
- Fictional facilities test rows can be inserted successfully after RLS is enabled.
- Active/public test rows are identifiable for future public read testing.
- Blocked rows exist for later negative RLS and public read QA.
- No real provider data, patient data, private documents, keys, or app behavior changes are part of this step.

## Supabase Test Project Execution Summary

The facilities SQL manual execution was confirmed as successful in the Supabase test project.

Codex did not run SQL for this record. This document records the confirmed manual result supplied after execution.

## SQL Files Executed

The following draft SQL files were confirmed as executed manually:

1. `supabase/migrations_draft/001_create_facilities_table.sql`
2. `supabase/migrations_draft/002_facilities_rls_policy.sql`
3. `supabase/migrations_draft/003_facilities_test_data.sql`

## Execution Order Used

The confirmed execution order was:

1. Facilities table draft
2. Facilities RLS policy draft
3. Facilities test data draft

This matches `docs/FacilitiesSQLManualExecutionGuide.md`.

## Table Creation Result

Confirmed result:

- `001_create_facilities_table.sql` ran successfully.
- `public.facilities` was created in the Supabase test project.
- The table draft included public-safe facilities fields only.
- The table draft included status constraints, public-read-oriented indexes, and the `updated_at` trigger helper.
- No RLS policies, test inserts, private provider fields, patient data, admin notes, or real provider data were part of the table draft.

## RLS Execution Result

Confirmed result:

- `002_facilities_rls_policy.sql` ran successfully.
- Row level security was enabled on `public.facilities`.
- The anon SELECT policy was applied for active/public rows only.

The public read rule remains:

```sql
listing_status = 'active'
and visibility_status = 'public'
```

No insert, update, delete, authenticated, provider, admin, reviewer, super-admin, or service-role policies were added by this draft.

## Test Data Insertion Result

Confirmed result:

- `003_facilities_test_data.sql` ran successfully.
- Fictional/sample facilities test rows were inserted.
- The test data included readable active/public rows and blocked rows for later public read and RLS testing.
- No patient data, private provider documents, admin notes, real provider data, contact channel inserts, or RLS changes were added by the test data draft.

## Active/Public Verification Query Used

The active/public verification used the expected public-read filter:

```sql
select
  slug,
  display_name,
  listing_status,
  visibility_status,
  verification_status
from public.facilities
where listing_status = 'active'
  and visibility_status = 'public'
order by slug;
```

## Active/Public Verification Result

The active/public verification returned:

| Slug | Display name | Listing status | Visibility status | Verification status |
| --- | --- | --- | --- | --- |
| `test-facility-alpha` | Test Facility Alpha | `active` | `public` | `verified` |
| `test-facility-eta-minimal` | Test Facility Eta Minimal | `active` | `public` | `unverified` |
| `test-facility-zeta-disputed` | Test Facility Zeta Disputed | `active` | `public` | `disputed` |

These rows are the expected future public read candidates under the current RLS draft.

## Blocked Rows Present For Later Testing

The following blocked rows were confirmed as present for later negative testing:

- `test-facility-beta-pending`
- `test-facility-gamma-archived`
- `test-facility-delta-hidden`
- `test-facility-epsilon-internal`

These rows should not appear in anon public read results under the current RLS rule because they are not both `active` and `public`.

## Safety Confirmation

This QA record confirms the intended safety boundary for this phase:

- No SQL was run by Codex for this documentation update.
- No Supabase project was modified by Codex.
- No app source wrapper or mapper code was changed.
- No frontend UI was changed.
- No backend functionality was added.
- No authentication or protected routes were added.
- No real keys were added to the repository.
- No `.env.local` file was created.
- No real provider data, patient data, private documents, or admin notes were recorded in this file.

## Remaining Limitations

This QA record does not prove app-level public reads yet.

Remaining limitations:

- The app still uses static data by default.
- Public listing pages have not been connected to Supabase.
- The source wrapper has not been changed for real Supabase reads.
- The mapper layer has not consumed live Supabase rows.
- RLS behavior has not yet been verified through the app browser client.
- Doctor, pharmacy, diagnostics, services, specialties, locations, and contact channel tables are still future work.
- Provider ownership, admin review, and authenticated policies are still intentionally out of scope.

## Recommended Next Development Order

1. Keep the current public app behavior static until read integration is explicitly approved.
2. Create a focused facilities public read implementation plan using the confirmed test rows.
3. Add a controlled read path that preserves static fallback behavior.
4. Use the public listing mapper layer for Supabase row-to-card output.
5. Verify anon public reads return only the three active/public rows.
6. Verify blocked rows do not appear through anon public reads.
7. Run lint and build after any future code integration.
8. Document the first app-read QA pass before expanding to doctors, pharmacies, diagnostics, or relationship tables.
