# Codex Task 154: Diagnostics Test Data SQL Draft

## Project

DigitalDirectory-v2

## Goal

Create a safe SQL test data draft for the diagnostics discovery table.

This task follows:

- `docs/CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md`
- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`
- `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`

This is a documentation-only SQL test data draft task. Do not execute SQL. Do not modify Supabase directly. Do not create migration files. Do not modify source code, app routes, UI, RLS policies, pharmacy files, doctor files, or facility files. Do not import real production data.

---

## Warning

Do not execute this SQL yet.

This document is a planning and SQL draft artifact only. It has not been run against Supabase. It must be reviewed alongside the diagnostics schema planning document, diagnostics table SQL draft, diagnostics RLS draft, and the existing facilities/doctors/pharmacies test data patterns before any manual execution.

Important alignment note:

The Task 154 requested provider type coverage includes:

- `radiology_center`
- `pathology_service`
- `home_sample_collection_provider`

The current Task 152 table draft uses a narrower `diagnostic_provider_type` constraint. Before this test data can be executed manually, the table constraint must be reviewed and either expanded to include the Task 154 values or the test rows must be adjusted to match the final approved table vocabulary.

---

## Purpose

The purpose of this draft is to define safe fictional diagnostics provider test data for the future `public.diagnostic_providers` table.

The test rows are intended to verify:

- diagnostics discovery reads
- active/public filtering
- RLS visibility rules
- blocked pending and hidden row behavior
- diagnostics provider type coverage
- future public card and detail mapping
- public-safe diagnostics fields only

This draft is for diagnostics provider discovery only. It does not add patient records, lab results, diagnostic reports, uploaded files, sample tracking data, private contacts, staff personal numbers, internal admin notes, verification documents, ordering workflows, payment records, protected workflow data, real confidential facility information, Supabase keys, environment values, or secrets.

---

## Assumptions

This draft assumes:

- `public.diagnostic_providers` exists from the Task 152 SQL draft.
- The RLS draft in Task 153 will later allow public anon reads only when:
  - `listing_status = 'active'`
  - `visibility_status = 'public'`
- `slug` is unique and not null.
- `display_name` is not null.
- `diagnostic_provider_type` is not null.
- `services_public` is a `text[]` column.
- `sample_collection_modes` is a `text[]` column.
- `appointment_required_preview`, `walk_in_available`, and `home_sample_collection_preview` are boolean preview/discovery fields only.
- `created_at` and `updated_at` use table defaults and do not need to be inserted manually.
- `id` uses `gen_random_uuid()` by default and does not need to be inserted manually.

Columns that need confirmation before manual execution:

- `slug`
- `display_name`
- `diagnostic_provider_type`
- `category`
- `description`
- `city`
- `area`
- `address_public`
- `landmark_public`
- `services_public`
- `sample_collection_modes`
- `opening_hours_public`
- `result_turnaround_public`
- `appointment_required_preview`
- `walk_in_available`
- `home_sample_collection_preview`
- `listing_status`
- `visibility_status`
- `verification_status`
- `last_confirmed_at`

Provider type values that need confirmation before manual execution:

- `laboratory`
- `imaging_center`
- `radiology_center`
- `pathology_service`
- `mixed_diagnostic_center`
- `home_sample_collection_provider`

---

## SQL Draft

```sql
-- DigitalDirectory-v2 diagnostic providers test data draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a documentation-only planning artifact for a future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Inserts fictional diagnostics provider discovery rows only.
-- - Includes active/public rows for public read testing.
-- - Includes blocked rows for RLS and filtering tests.
-- - Uses public-safe diagnostics discovery fields only.
--
-- Out of scope:
-- - No real diagnostics provider data.
-- - No patient data.
-- - No lab results.
-- - No diagnostic reports.
-- - No uploaded files.
-- - No sample tracking data.
-- - No private contacts.
-- - No staff personal numbers.
-- - No internal admin notes.
-- - No verification documents.
-- - No ordering workflows.
-- - No payment records.
-- - No protected workflow data.
-- - No Supabase keys.
-- - No environment values.
-- - No secrets.
--
-- Review note:
-- Before running, confirm the diagnostic_provider_type constraint includes
-- radiology_center, pathology_service, and home_sample_collection_provider,
-- or update this draft to match the final approved type vocabulary.

insert into public.diagnostic_providers (
  slug,
  display_name,
  diagnostic_provider_type,
  category,
  description,
  city,
  area,
  address_public,
  landmark_public,
  services_public,
  sample_collection_modes,
  opening_hours_public,
  result_turnaround_public,
  appointment_required_preview,
  walk_in_available,
  home_sample_collection_preview,
  listing_status,
  visibility_status,
  verification_status,
  last_confirmed_at
) values
  (
    'test-diagnostic-alpha-lab',
    'Test Diagnostic Alpha Laboratory',
    'laboratory',
    'Laboratory',
    'Fictional public laboratory discovery row for active/public read testing.',
    'Addis Ababa',
    'Bole',
    'Fictional Bole diagnostics address',
    'Near fictional Alpha diagnostics landmark',
    array['Blood tests', 'Urine tests', 'Health screening'],
    array['Walk-in preview', 'Appointment preview'],
    'Mon-Sat, 7:30 AM-7:00 PM',
    'Same-day preview for selected public screening services',
    true,
    true,
    false,
    'active',
    'public',
    'verified',
    now()
  ),
  (
    'test-diagnostic-eta-imaging',
    'Test Diagnostic Eta Imaging Center',
    'imaging_center',
    'Imaging Center',
    'Fictional public imaging center discovery row for active/public read testing.',
    'Addis Ababa',
    'Kazanchis',
    'Fictional Kazanchis imaging address',
    'Near fictional Eta imaging landmark',
    array['Ultrasound preview', 'X-ray preview', 'Imaging consultation preview'],
    array['Appointment preview'],
    'Mon-Fri, 8:00 AM-6:00 PM',
    '24-48 hour public estimate for selected imaging reports',
    true,
    false,
    false,
    'active',
    'public',
    'unverified',
    now()
  ),
  (
    'test-diagnostic-zeta-radiology',
    'Test Diagnostic Zeta Radiology Center',
    'radiology_center',
    'Radiology',
    'Fictional public radiology center discovery row with disputed verification status.',
    'Addis Ababa',
    'Megenagna',
    'Fictional Megenagna radiology address',
    'Near fictional Zeta radiology landmark',
    array['Radiology preview', 'X-ray preview', 'Ultrasound preview'],
    array['Appointment preview', 'Walk-in preview'],
    'Daily, 8:00 AM-8:00 PM',
    'Turnaround varies by public service category',
    true,
    true,
    false,
    'active',
    'public',
    'disputed',
    now()
  ),
  (
    'test-diagnostic-omega-pathology',
    'Test Diagnostic Omega Pathology Service',
    'pathology_service',
    'Pathology',
    'Fictional public pathology service discovery row for active/public read testing.',
    'Addis Ababa',
    'Arat Kilo',
    'Fictional Arat Kilo pathology address',
    'Near fictional Omega pathology landmark',
    array['Pathology preview', 'Sample processing preview', 'Screening preview'],
    array['Appointment preview'],
    'Mon-Sat, 8:30 AM-5:30 PM',
    'Public estimate only; not a patient-specific result status',
    true,
    false,
    false,
    'active',
    'public',
    'pending',
    now()
  ),
  (
    'test-diagnostic-kappa-mixed',
    'Test Diagnostic Kappa Mixed Center',
    'mixed_diagnostic_center',
    'Mixed Diagnostic Center',
    'Fictional public mixed diagnostic center row for active/public read testing.',
    'Addis Ababa',
    'Mexico',
    'Fictional Mexico mixed diagnostics address',
    'Near fictional Kappa diagnostics landmark',
    array['Laboratory preview', 'Imaging preview', 'Screening packages preview'],
    array['Walk-in preview', 'Appointment preview'],
    'Mon-Sun, 8:00 AM-7:00 PM',
    'Same-day to 48-hour public estimate by service type',
    true,
    true,
    false,
    'active',
    'public',
    'verified',
    now()
  ),
  (
    'test-diagnostic-lambda-home-sample',
    'Test Diagnostic Lambda Home Sample Collection',
    'home_sample_collection_provider',
    'Home Sample Collection',
    'Fictional public home sample collection provider row for discovery preview testing.',
    'Addis Ababa',
    'Lideta',
    'Fictional Lideta public service area note',
    'Near fictional Lambda collection landmark',
    array['Home sample collection preview', 'Basic lab tests preview'],
    array['Home sample collection preview', 'Appointment preview'],
    'Mon-Sat, 9:00 AM-5:00 PM',
    'Public estimate only after sample collection preview',
    true,
    false,
    true,
    'active',
    'public',
    'unverified',
    now()
  ),
  (
    'test-diagnostic-beta-pending',
    'Test Diagnostic Beta Pending',
    'laboratory',
    'Laboratory',
    'Fictional pending diagnostics provider row that should not be publicly readable.',
    'Addis Ababa',
    'Piassa',
    'Fictional Piassa diagnostics address',
    'Near fictional Beta diagnostics landmark',
    array['Blood tests preview'],
    array['Walk-in preview'],
    'Mon-Fri, 9:00 AM-5:00 PM',
    'Pending public estimate',
    false,
    true,
    false,
    'pending',
    'public',
    'pending',
    null
  ),
  (
    'test-diagnostic-delta-hidden',
    'Test Diagnostic Delta Hidden',
    'mixed_diagnostic_center',
    'Mixed Diagnostic Center',
    'Fictional hidden diagnostics provider row that should not be publicly readable.',
    'Addis Ababa',
    'Saris',
    'Fictional Saris diagnostics address',
    'Near fictional Delta diagnostics landmark',
    array['Laboratory preview', 'Radiology preview'],
    array['Appointment preview'],
    'Hidden preview hours',
    'Hidden public estimate',
    true,
    false,
    false,
    'active',
    'hidden',
    'verified',
    now()
  );

-- Expected public read rows after RLS:
-- - test-diagnostic-alpha-lab
-- - test-diagnostic-eta-imaging
-- - test-diagnostic-zeta-radiology
-- - test-diagnostic-omega-pathology
-- - test-diagnostic-kappa-mixed
-- - test-diagnostic-lambda-home-sample
--
-- Expected blocked rows:
-- - test-diagnostic-beta-pending
-- - test-diagnostic-delta-hidden
```

---

## Rows Drafted

This draft includes 8 fictional diagnostics provider rows.

Provider types covered:

- `laboratory`
- `imaging_center`
- `radiology_center`
- `pathology_service`
- `mixed_diagnostic_center`
- `home_sample_collection_provider`

---

## Public-Visible Rows

The following rows should be publicly visible after the table, RLS policy, and test data are reviewed and manually executed in a test project:

- `test-diagnostic-alpha-lab` - active/public laboratory row
- `test-diagnostic-eta-imaging` - active/public imaging center row
- `test-diagnostic-zeta-radiology` - active/public radiology center row
- `test-diagnostic-omega-pathology` - active/public pathology service row
- `test-diagnostic-kappa-mixed` - active/public mixed diagnostic center row
- `test-diagnostic-lambda-home-sample` - active/public home sample collection provider row

These rows should be visible because they use:

```text
listing_status = active
visibility_status = public
```

---

## RLS-Blocked Rows

The following rows are included for negative QA:

- `test-diagnostic-beta-pending` - `listing_status = pending`, `visibility_status = public`
- `test-diagnostic-delta-hidden` - `listing_status = active`, `visibility_status = hidden`

These rows should not appear in public anonymous reads.

---

## Expected Public Read Results

After future manual execution, this public-eligible query should return exactly 6 rows:

```sql
select
  slug,
  display_name,
  diagnostic_provider_type,
  listing_status,
  visibility_status,
  verification_status
from public.diagnostic_providers
where listing_status = 'active'
  and visibility_status = 'public'
order by display_name;
```

Expected public-visible rows:

- `test-diagnostic-alpha-lab`
- `test-diagnostic-eta-imaging`
- `test-diagnostic-zeta-radiology`
- `test-diagnostic-omega-pathology`
- `test-diagnostic-kappa-mixed`
- `test-diagnostic-lambda-home-sample`

Suggested full verification query:

```sql
select
  slug,
  display_name,
  diagnostic_provider_type,
  listing_status,
  visibility_status,
  verification_status
from public.diagnostic_providers
where slug like 'test-diagnostic-%'
order by display_name;
```

Expected full verification count:

```text
8 rows
```

Expected active/public verification count:

```text
6 rows
```

---

## Manual QA Checklist

Before running this draft manually:

1. Confirm this is a test Supabase project, not production.
2. Confirm `public.diagnostic_providers` exists.
3. Confirm `public.diagnostic_providers` has the columns used in the insert draft.
4. Confirm the `diagnostic_provider_type` constraint includes every drafted type.
5. Confirm `listing_status`, `visibility_status`, and `verification_status` constraints match the drafted values.
6. Confirm `services_public` accepts `text[]` values.
7. Confirm `sample_collection_modes` accepts `text[]` values.
8. Confirm no real diagnostics provider names, patient data, lab results, diagnostic reports, uploaded files, sample tracking data, private contacts, staff personal numbers, admin notes, verification documents, ordering workflows, payment records, environment values, Supabase keys, or secrets are included.
9. Confirm RLS is reviewed before relying on anon public read behavior.

After future manual execution:

1. Run the full verification query and confirm 8 test rows exist.
2. Run the active/public verification query and confirm 6 rows appear.
3. Confirm the pending row does not appear in public read results.
4. Confirm the hidden row does not appear in public read results.
5. Confirm public result turnaround values are treated only as general public estimates.
6. Confirm home sample collection is treated only as a discovery preview and does not create scheduling or patient address collection.

---

## Explicit Private/Internal Data Excluded

This draft deliberately excludes:

- patient data
- patient names
- patient phone numbers
- patient addresses
- patient identifiers
- lab results
- diagnostic reports
- report files
- uploaded files
- uploaded referrals
- uploaded prescriptions
- sample tracking data
- specimen IDs
- accession numbers
- private contacts
- private owner contacts
- staff personal numbers
- staff schedules
- internal admin notes
- reviewer notes
- verification documents
- verification evidence
- ordering workflows
- payment records
- protected workflow data
- real confidential facility information
- Supabase keys
- environment values
- secrets

---

## Rollback Notes

If this draft is manually executed in a reviewed test project and needs to be reversed, use a reviewed rollback plan before running anything.

Possible rollback draft:

```sql
-- DRAFT ROLLBACK ONLY. REVIEW BEFORE RUNNING.

delete from public.diagnostic_providers
where slug in (
  'test-diagnostic-alpha-lab',
  'test-diagnostic-eta-imaging',
  'test-diagnostic-zeta-radiology',
  'test-diagnostic-omega-pathology',
  'test-diagnostic-kappa-mixed',
  'test-diagnostic-lambda-home-sample',
  'test-diagnostic-beta-pending',
  'test-diagnostic-delta-hidden'
);
```

Do not drop the `public.diagnostic_providers` table as part of a test data rollback.

---

## Recommended Task 155

Recommended Task 155 title:

```text
CodexTask-155-DiagnosticsManualSQLExecutionGuide.md
```

Recommended objective:

Create a documentation-only manual SQL execution guide for the diagnostics table draft, diagnostics RLS draft, and diagnostics test data draft, including safe execution order, pre-checks, verification queries, expected public rows, expected blocked rows, rollback notes, and safety warnings.

Task 155 should not execute SQL, modify Supabase directly, create migration files, modify app code, modify UI, add diagnostics read helpers, or import real data.

---

## Remaining Risks

- The drafted provider type values must be reconciled with the Task 152 table constraint before manual execution.
- Future RLS tests should include more blocked states later, such as rejected, archived, suspended, and internal rows.
- The `home_sample_collection_provider` row must remain a discovery preview and must not create scheduling or patient address collection.
- `result_turnaround_public` must remain a general public estimate, not patient-specific report status.
- Future mapper work must handle diagnostics type normalization safely.
- All test rows are fictional and should remain separate from real production data.

---

## Summary

This Task 154 document drafts eight fictional diagnostics provider rows for `public.diagnostic_providers`.

The draft includes six active/public rows expected to appear in future public reads and two blocked rows for pending and hidden RLS checks.

The draft covers laboratory, imaging center, radiology center, pathology service, mixed diagnostic center, and home sample collection provider examples. It uses public-safe discovery fields only and excludes patient data, lab results, diagnostic reports, uploaded files, sample tracking data, private contacts, staff personal numbers, admin notes, verification documents, ordering workflows, payment records, protected workflow data, real confidential facility information, Supabase keys, environment values, and secrets.

Do not execute this SQL until it has been reviewed against the final diagnostics table draft, RLS draft, and manual QA plan.
