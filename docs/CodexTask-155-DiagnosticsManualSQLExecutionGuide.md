# Codex Task 155: Diagnostics Manual SQL Execution Guide

## Project

DigitalDirectory-v2

## Goal

Create a manual SQL execution guide for the diagnostics discovery table, RLS policy, and test data drafts.

This task follows:

- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`
- `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`
- `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md`

This is a documentation-only task. Do not execute SQL. Do not modify Supabase directly. Do not create migration files. Do not modify source code, RLS policies, app routes, UI, pharmacy files, doctor files, or facility files. Do not import real production data.

---

## Safety Warning

Do not execute SQL from this task.

Only execute the referenced diagnostics SQL drafts manually later after they have been reviewed, after the target Supabase project is confirmed to be a safe test project, and after rollback expectations are understood.

Never paste Supabase keys, service-role keys, project secrets, patient data, lab results, diagnostic reports, uploaded files, sample tracking data, private contacts, staff personal numbers, admin notes, verification documents, ordering data, payment records, or protected workflow data into SQL drafts, documentation, chat, screenshots, or frontend code.

---

## Purpose

This guide explains the safe manual order for running the diagnostics SQL drafts in Supabase SQL Editor.

The diagnostics setup is for public diagnostics provider discovery only. It should create a public-safe `public.diagnostic_providers` table, enable public read-only RLS for active/public diagnostics provider rows, and insert fictional test rows that verify allowed and blocked visibility behavior.

The guide follows the same disciplined sequence used for facilities, doctors, and pharmacies:

1. Create the table.
2. Add RLS and public read policy.
3. Insert fictional test data.
4. Verify full rows and active/public rows.
5. Confirm blocked rows remain hidden from public reads.

---

## Pre-Execution Checklist

Before any manual SQL execution:

1. Confirm this is a Supabase test project, not production.
2. Confirm the SQL Editor is open in the intended test project.
3. Confirm the project URL, anon key, service-role key, and secrets are not pasted into documentation, chat, screenshots, or source files.
4. Confirm the diagnostics table draft has been reviewed.
5. Confirm the diagnostics RLS draft has been reviewed.
6. Confirm the diagnostics test data draft has been reviewed.
7. Confirm rollback notes are understood.
8. Confirm no real diagnostics provider data is included.
9. Confirm no patient data is included.
10. Confirm no lab results, diagnostic reports, uploaded files, sample tracking, ordering workflows, payment records, private contacts, staff personal numbers, admin notes, or verification documents are included.
11. Confirm pharmacy, doctor, and facility setup does not need to be modified for this diagnostics task.

Important vocabulary pre-check:

- Task 152 currently drafts `diagnostic_provider_type` values including `laboratory`, `imaging_center`, `pathology`, `radiology`, and `mixed_diagnostic_center`.
- Task 154 drafts test rows using `radiology_center`, `pathology_service`, and `home_sample_collection_provider`.
- Before manual execution, reconcile this vocabulary by either updating the reviewed table constraint or adjusting the test data draft.
- Do not run the test data SQL until the provider type vocabulary is aligned.

---

## Required Diagnostics SQL Docs To Review

Review these documents before manual execution:

- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`
- `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`
- `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md`

Related execution patterns:

- `docs/CodexTask-138-PharmaciesManualSQLExecutionGuide.md`
- `docs/CodexTask-103-DoctorsSQLManualExecutionGuide.md`
- `docs/FacilitiesSQLManualExecutionGuide.md`

---

## Safe Execution Order

Recommended manual execution order:

1. Run the diagnostics table SQL draft from `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`.
2. Run the diagnostics RLS policy SQL draft from `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`.
3. Run the diagnostics test data SQL draft from `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md`.
4. Run manual verification queries.

Do not insert test data before the table exists.

Do not rely on public read behavior until RLS and anon grants are reviewed and applied.

Do not create application reads until table, RLS, test data, and manual QA are confirmed.

---

## Supabase SQL Editor Instructions

### Step 1: Confirm Project Safety

In Supabase:

1. Open the intended test project.
2. Confirm the project is not production.
3. Open SQL Editor.
4. Do not paste or reveal service-role keys.
5. Do not include screenshots showing keys, secrets, connection strings, or project credentials.
6. Keep this as a manual database setup only; do not modify app code.

### Step 2: Run Diagnostics Table Draft

Manual source:

```text
docs/CodexTask-152-DiagnosticsTableSQLDraft.md
```

Run only the reviewed SQL draft block from that document.

Expected result:

- `public.diagnostic_providers` table is created.
- Public-safe diagnostics discovery columns exist.
- Status constraints exist.
- Diagnostic provider type constraint exists.
- Public discovery indexes exist.
- Updated-at trigger helper exists or is replaced safely.
- No RLS policies are created by this step.
- No test data is inserted by this step.

Immediate table check:

```sql
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'diagnostic_providers'
order by ordinal_position;
```

Confirm expected columns include:

- `id`
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
- `created_at`
- `updated_at`

### Step 3: Run Diagnostics RLS Draft

Manual source:

```text
docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md
```

Run only the reviewed SQL draft block from that document.

Expected result:

- RLS is enabled on `public.diagnostic_providers`.
- `anon` receives `usage` on schema `public`.
- `anon` receives `select` on table `public.diagnostic_providers`.
- One anon SELECT policy exists:

```text
Allow anon read active public diagnostic providers
```

The policy should allow only:

```text
listing_status = 'active'
visibility_status = 'public'
```

No insert, update, or delete policies should be created.

### Step 4: Run Diagnostics Test Data Draft

Manual source:

```text
docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md
```

Run only the reviewed SQL draft block from that document after the provider type vocabulary pre-check is resolved.

Expected inserted rows:

Public/active rows:

- `test-diagnostic-alpha-lab`
- `test-diagnostic-eta-imaging`
- `test-diagnostic-zeta-radiology`
- `test-diagnostic-omega-pathology`
- `test-diagnostic-kappa-mixed`
- `test-diagnostic-lambda-home-sample`

Blocked rows:

- `test-diagnostic-beta-pending`
- `test-diagnostic-delta-hidden`

Expected total:

```text
8 rows
```

---

## Manual Verification Queries

### Table Structure Query

```sql
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'diagnostic_providers'
order by ordinal_position;
```

Expected:

- The public-safe diagnostics discovery columns exist.
- No patient, report, result, upload, sample tracking, private contact, staff schedule, admin note, verification document, ordering, payment, or protected workflow columns exist.

### Index Verification Query

```sql
select indexname
from pg_indexes
where schemaname = 'public'
  and tablename = 'diagnostic_providers'
order by indexname;
```

Expected indexes include:

- slug index
- listing/visibility index
- diagnostic provider type index
- city/area index
- verification status index

### RLS Enabled Query

```sql
select
  relname,
  relrowsecurity
from pg_class
where relname = 'diagnostic_providers';
```

Expected:

```text
relrowsecurity = true
```

### RLS Policy Query

```sql
select
  policyname,
  cmd,
  roles,
  qual
from pg_policies
where schemaname = 'public'
  and tablename = 'diagnostic_providers'
order by policyname;
```

Expected:

- Policy name: `Allow anon read active public diagnostic providers`
- Command: `SELECT`
- Role includes `anon`
- Qual includes `listing_status = 'active'` and `visibility_status = 'public'`

### Public Write Policy Query

```sql
select
  policyname,
  cmd,
  roles
from pg_policies
where schemaname = 'public'
  and tablename = 'diagnostic_providers'
  and cmd in ('INSERT', 'UPDATE', 'DELETE');
```

Expected:

```text
0 rows
```

### Full Test Data Verification Query

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

Expected:

```text
8 rows
```

### Public-Eligible Verification Query

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

Expected:

```text
6 rows
```

Expected public-visible rows:

- `test-diagnostic-alpha-lab`
- `test-diagnostic-eta-imaging`
- `test-diagnostic-zeta-radiology`
- `test-diagnostic-omega-pathology`
- `test-diagnostic-kappa-mixed`
- `test-diagnostic-lambda-home-sample`

---

## Expected RLS-Blocked Rows

Expected blocked rows:

- `test-diagnostic-beta-pending`
- `test-diagnostic-delta-hidden`

Reasons:

- `test-diagnostic-beta-pending`: `listing_status = pending`
- `test-diagnostic-delta-hidden`: `visibility_status = hidden`

These rows should exist for negative QA but should not appear in active/public public-read results.

---

## Rollback And Safety Notes

Use rollback only in a reviewed test-project context.

### Roll Back Test Data Only

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

### Roll Back Diagnostics RLS Policy Only

```sql
-- DRAFT ROLLBACK ONLY. REVIEW BEFORE RUNNING.

drop policy if exists "Allow anon read active public diagnostic providers"
  on public.diagnostic_providers;

revoke select on table public.diagnostic_providers from anon;
```

Only disable RLS if returning the test project to a pre-RLS state is explicitly intended:

```sql
-- DRAFT ONLY. REVIEW BEFORE RUNNING.
-- alter table public.diagnostic_providers disable row level security;
```

Do not drop `public.diagnostic_providers` as part of ordinary RLS or test data rollback.

Only drop the table if a separate schema rollback is reviewed and approved.

---

## Common Failure Cases

### Provider Type Constraint Error

Symptom:

```text
new row violates check constraint diagnostic_providers_type_check
```

What to check:

- Confirm the final table constraint includes every drafted test value.
- Reconcile `radiology_center`, `pathology_service`, and `home_sample_collection_provider` with the final approved provider type vocabulary.
- Do not bypass the constraint casually.

### Missing Table Error

Symptom:

```text
relation public.diagnostic_providers does not exist
```

What to check:

- Confirm the table draft ran first.
- Confirm the table name is exactly `public.diagnostic_providers`.
- Confirm the SQL Editor is connected to the intended test project.

### Missing Column Error

Symptom:

```text
column does not exist
```

What to check:

- Confirm the Task 152 table draft matches the Task 154 test data columns.
- Confirm the final reviewed table includes `services_public` and `sample_collection_modes` as arrays.
- Confirm no stale draft was executed.

### RLS Policy Missing

Symptom:

```text
active/public rows are inserted but RLS policy query returns no policy
```

What to check:

- Confirm the Task 153 RLS SQL block was run.
- Confirm the policy name matches `Allow anon read active public diagnostic providers`.
- Confirm RLS is enabled on `public.diagnostic_providers`.

### Public Query Shows Blocked Rows

Symptom:

```text
pending or hidden rows appear in active/public verification query
```

What to check:

- Confirm the verification query includes both filters:
  - `listing_status = 'active'`
  - `visibility_status = 'public'`
- Confirm the RLS policy also includes both filters.
- Confirm blocked rows were not accidentally inserted with active/public statuses.

---

## Explicit Private/Internal Data Safety Note

Do not include or expose:

- patient data
- patient names
- patient phone numbers
- patient addresses
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

The diagnostics table is for public provider discovery only. It must not become a lab-results, test-ordering, patient-record, or protected workflow table.

---

## Recommended Task 156

Recommended Task 156 title:

```text
CodexTask-156-DiagnosticsSQLExecutionQARecord.md
```

Recommended objective:

Create a documentation-only QA record template for manually confirming diagnostics SQL execution results, including table creation, RLS policy, fictional test data insertion, active/public verification results, blocked row verification, safety confirmation, and remaining limitations.

Task 156 should not execute SQL, modify Supabase directly, create migration files, modify app code, modify UI, add diagnostics read helpers, or import real data.

---

## Remaining Risks

- Provider type vocabulary must be reconciled before the test data draft can run successfully.
- Manual SQL execution should happen only in a reviewed test project.
- Future app reads must still use anon-safe helpers, active/public filters, safe fallback behavior, and no raw error exposure.
- Future blocked test coverage should add rejected, archived, suspended, and internal rows.
- Public turnaround and home sample collection values must remain general discovery previews, not patient-specific promises or workflows.

---

## Summary

The recommended manual execution order is:

1. Run the diagnostics table SQL draft from `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`.
2. Run the diagnostics RLS SQL draft from `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`.
3. Run the diagnostics test data SQL draft from `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md`.
4. Run the manual verification queries.

After future execution in a reviewed test project, the full verification query should return 8 fictional diagnostics provider rows, and the active/public verification query should return 6 rows:

- `test-diagnostic-alpha-lab`
- `test-diagnostic-eta-imaging`
- `test-diagnostic-zeta-radiology`
- `test-diagnostic-omega-pathology`
- `test-diagnostic-kappa-mixed`
- `test-diagnostic-lambda-home-sample`

The blocked rows should remain out of active/public reads:

- `test-diagnostic-beta-pending`
- `test-diagnostic-delta-hidden`
