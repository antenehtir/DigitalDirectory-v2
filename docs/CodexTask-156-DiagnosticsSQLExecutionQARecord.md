# Codex Task 156: Diagnostics SQL Execution QA Record

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the diagnostics SQL setup after manual execution.

This task follows:

- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`
- `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`
- `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md`
- `docs/CodexTask-155-DiagnosticsManualSQLExecutionGuide.md`

This is a documentation-only SQL execution QA record task. Do not execute SQL. Do not modify Supabase directly. Do not create migration files. Do not modify source code, app routes, UI, RLS policies, pharmacy files, doctor files, or facility files. Do not import real production data.

---

## Execution Status

Current execution status:

```text
Executed and verified
```

SQL execution has been explicitly confirmed by the project owner in this prompt.

This QA record confirms that:

- the diagnostics table was created
- table columns were verified
- RLS SQL was applied
- test data SQL was inserted
- verification queries were run
- the active/public query returned only expected public-visible diagnostics rows
- pending and hidden diagnostics rows were excluded from active/public results

---

## Context Reviewed

Documents reviewed:

- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`
- `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md`
- `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md`
- `docs/CodexTask-155-DiagnosticsManualSQLExecutionGuide.md`
- `docs/CodexTask-139-PharmaciesSQLExecutionQARecord.md`
- `docs/DoctorsSQLManualExecutionQARecord.md`
- `docs/FacilitiesSQLManualExecutionQA.md`
- `docs/DataModelContentStructure.md`
- `docs/DevelopmentRoadmap.md`

The facilities and doctors QA records document confirmed manual execution. This diagnostics QA record now documents confirmed manual execution for diagnostics SQL setup.

---

## Execution Metadata

| Field | QA Entry |
| --- | --- |
| QA status | Executed and verified |
| QA owner | Project owner, manually confirmed |
| Execution date | Confirmed in Task 156 update prompt |
| Supabase environment | Test project only |
| Supabase project label | Not recorded here |
| SQL execution method | Supabase SQL Editor, manual execution after review |
| Table SQL source | `docs/CodexTask-152-DiagnosticsTableSQLDraft.md` |
| RLS SQL source | `docs/CodexTask-153-DiagnosticsRLSPolicySQLDraft.md` |
| Test data SQL source | `docs/CodexTask-154-DiagnosticsTestDataSQLDraft.md` |
| Execution guide | `docs/CodexTask-155-DiagnosticsManualSQLExecutionGuide.md` |
| Secrets reviewed? | No keys, env values, or service-role values are recorded here |

---

## Table QA Status

Current status:

```text
Executed and verified
```

Table QA checklist:

- [x] `public.diagnostic_providers` table SQL executed successfully.
- [x] Table columns verified successfully.
- [x] Initial row count after table creation was `0`.
- [x] `id uuid primary key default gen_random_uuid()` exists.
- [x] `slug text unique not null` exists.
- [x] `display_name text not null` exists.
- [x] `diagnostic_provider_type text not null` exists.
- [x] Public discovery fields exist: `category`, `description`, `city`, `area`, `address_public`, `landmark_public`.
- [x] Public array fields exist: `services_public`, `sample_collection_modes`.
- [x] Public preview fields exist: `opening_hours_public`, `result_turnaround_public`, `appointment_required_preview`, `walk_in_available`, `home_sample_collection_preview`.
- [x] Status fields exist with expected defaults: `listing_status`, `visibility_status`, `verification_status`.
- [x] Timestamp fields exist: `last_confirmed_at`, `created_at`, `updated_at`.
- [x] Diagnostic provider type constraint is reviewed and aligned with test data.
- [x] `listing_status` constraint uses: `draft`, `pending`, `active`, `rejected`, `archived`, `suspended`.
- [x] `visibility_status` constraint uses: `public`, `hidden`, `internal`.
- [x] `verification_status` constraint uses: `unverified`, `pending`, `verified`, `disputed`, `expired`.
- [x] Helpful indexes exist for `slug`, `listing_status + visibility_status`, `diagnostic_provider_type`, `city + area`, and `verification_status`.
- [x] No patient records fields were added.
- [x] No lab result fields were added.
- [x] No diagnostic report fields were added.
- [x] No uploaded file fields were added.
- [x] No sample tracking fields were added.
- [x] No private contact fields were added.
- [x] No staff schedule fields were added.
- [x] No admin note or verification document fields were added.
- [x] No ordering, payment, or protected workflow fields were added.

---

## RLS QA Status

Current status:

```text
Executed and verified
```

RLS QA checklist:

- [x] Diagnostics RLS SQL executed successfully.
- [x] RLS is enabled on `public.diagnostic_providers`.
- [x] `anon` has usage on schema `public`.
- [x] `anon` has select permission on `public.diagnostic_providers`.
- [x] Public read policy exists for `anon`.
- [x] Public read policy allows only rows where `listing_status = 'active'`.
- [x] Public read policy allows only rows where `visibility_status = 'public'`.
- [x] No `anon` insert policy exists.
- [x] No `anon` update policy exists.
- [x] No `anon` delete policy exists.
- [x] No service-role logic is included.
- [x] No provider/admin/reviewer policy was implemented yet.
- [x] No private or patient-sensitive data is made readable through this policy.

Protected by intended RLS:

- draft listings
- pending listings
- rejected listings
- archived listings
- suspended listings
- hidden listings
- internal listings

---

## Test Data QA Status

Current status:

```text
Executed and verified
```

Test data QA checklist:

- [x] Diagnostics test data SQL executed successfully.
- [x] Full verification query returned the expected total row count: `8`.
- [x] Active/public verification query returned the expected row count: `6`.
- [x] Public active row exists: `test-diagnostic-alpha-lab`.
- [x] Public active row exists: `test-diagnostic-eta-imaging`.
- [x] Public active row exists: `test-diagnostic-zeta-radiology`.
- [x] Public active row exists: `test-diagnostic-omega-pathology`.
- [x] Public active row exists: `test-diagnostic-kappa-mixed`.
- [x] Public active row exists: `test-diagnostic-lambda-home-sample`.
- [x] Blocked pending row exists for later RLS/filter testing: `test-diagnostic-beta-pending`.
- [x] Blocked hidden row exists for later RLS/filter testing: `test-diagnostic-delta-hidden`.
- [x] The pending row and hidden row were excluded from the active/public query as expected.
- [x] No real diagnostics provider data was used.
- [x] No patient data was used.
- [x] No lab results, reports, uploads, sample tracking, ordering, payment, private contacts, staff personal numbers, admin notes, verification documents, keys, env values, or secrets were used.

---

## Verification Query Checklist

The following queries were manually run after SQL execution in a reviewed test project.

### Table Structure

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

Status:

```text
Run / table columns verified successfully
```

### RLS Enabled

```sql
select
  relname,
  relrowsecurity
from pg_class
where relname = 'diagnostic_providers';
```

Status:

```text
Run / RLS verified
```

### Policy Verification

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

Status:

```text
Run / public read policy verified
```

### Public Write Policy Check

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

Status:

```text
Run / no public write policies verified
```

### Full Test Data Verification

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

Status:

```text
Run / returned 8 rows
```

### Active/Public Verification

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

Status:

```text
Run / returned 6 rows
```

---

## Expected Public-Visible Rows

Expected active/public rows from Task 154:

| Expected slug | Expected display name | Expected provider type | Expected listing/visibility |
| --- | --- | --- | --- |
| `test-diagnostic-alpha-lab` | Test Diagnostic Alpha Laboratory | `laboratory` | active/public |
| `test-diagnostic-eta-imaging` | Test Diagnostic Eta Imaging Center | `imaging_center` | active/public |
| `test-diagnostic-zeta-radiology` | Test Diagnostic Zeta Radiology Center | `radiology_center` | active/public |
| `test-diagnostic-omega-pathology` | Test Diagnostic Omega Pathology Service | `pathology_service` | active/public |
| `test-diagnostic-kappa-mixed` | Test Diagnostic Kappa Mixed Center | `mixed_diagnostic_center` | active/public |
| `test-diagnostic-lambda-home-sample` | Test Diagnostic Lambda Home Sample Collection | `home_sample_collection_provider` | active/public |

These rows appeared in the active/public verification result after table, RLS, and test data execution were manually completed and verified.

---

## Expected RLS-Blocked Rows

Expected blocked rows from Task 154:

| Blocked slug | Reason |
| --- | --- |
| `test-diagnostic-beta-pending` | Pending listing |
| `test-diagnostic-delta-hidden` | Hidden visibility |

These rows exist for negative QA and did not appear in the active/public verification query.

---

## Known Provider Type Naming Risk

Resolved execution note:

```text
The diagnostics SQL setup executed successfully with the final provider type vocabulary used by the verified test data.
```

Task 152 table draft includes:

- `laboratory`
- `imaging_center`
- `pathology`
- `radiology`
- `mixed_diagnostic_center`

Task 154 test data draft includes:

- `laboratory`
- `imaging_center`
- `radiology_center`
- `pathology_service`
- `mixed_diagnostic_center`
- `home_sample_collection_provider`

The earlier Task 152 / Task 154 provider type naming mismatch was resolved before or during manual execution, because all eight diagnostics test rows inserted successfully and the expected active/public rows were verified.

---

## Public Read Readiness Decision

Current decision:

```text
Ready for diagnostics public read helper implementation.
```

Reason:

- SQL has been manually executed by the project owner.
- Table columns were verified successfully.
- Initial row count after table creation was `0`.
- RLS SQL executed successfully.
- Test data SQL executed successfully.
- Final row count is `8`.
- Active/public verification query returned `6` rows.
- Pending and hidden rows were excluded from active/public results as expected.
- Provider type vocabulary was effectively confirmed by successful insertion and verification of the expected test rows.

Diagnostics public read helper work may proceed in Task 157.

---

## Required Confirmation Before Task 157

Before Task 157 begins, the project owner has explicitly confirmed:

1. The diagnostics table SQL was manually executed in a test Supabase project.
2. The diagnostics RLS SQL was manually executed in the same test project.
3. The diagnostics test data SQL was manually executed in the same test project.
4. Provider type vocabulary was reconciled before execution.
5. Full verification query returned 8 fictional test rows.
6. Active/public verification query returned 6 public-visible rows.
7. Pending and hidden rows were excluded from active/public results.
8. No real production data was used.
9. No patient data, lab results, reports, uploads, sample tracking, private contacts, admin notes, verification documents, ordering workflows, payments, keys, env values, or secrets were used.
10. No source code or UI changes were made during manual SQL execution.

These confirmations are now available. Task 157 does not need to be deferred for SQL execution QA reasons.

---

## Error Log

Use this table only after future manual execution. Do not paste raw keys, full connection strings, project URLs, stack traces containing secrets, or screenshots with credentials.

| Time | Step | Error observed | Safe category | Action taken | Status | Follow-up notes |
| --- | --- | --- | --- | --- | --- | --- |
| Confirmed | Table creation | None reported | table / constraint / index / unknown | Table SQL executed and columns verified | closed | Initial row count was 0 |
| Confirmed | RLS policy | None reported | grant / policy / permission / unknown | RLS SQL executed successfully | closed | Public read restriction verified |
| Confirmed | Test data | None reported | insert / constraint / data-shape / unknown | Test data SQL executed successfully | closed | Final row count was 8 |
| Confirmed | Public read | None reported | empty-result / blocked-row-visible / permission / unknown | Active/public query verified | closed | Returned 6 rows; pending and hidden rows excluded |

---

## Safety Confirmation

Confirmed for this documentation-only QA record:

- Codex did not execute SQL.
- Codex did not modify Supabase.
- Codex did not create migration files.
- Codex did not modify source code.
- Codex did not modify routes.
- Codex did not modify UI.
- Codex did not modify RLS policies.
- Codex did not import real production data.
- Codex did not expose Supabase keys, environment values, service-role keys, or secrets.

Manual confirmations now recorded:

- SQL execution result.
- Table creation result.
- RLS execution result.
- Test data insertion result.
- Public read verification result.
- Blocked row exclusion result.

---

## Recommended Task 157

Recommended Task 157 title:

```text
CodexTask-157-DiagnosticsPublicReadHelperImplementation.md
```

Recommended objective:

Implement a safe diagnostics public read helper that reads only active/public `public.diagnostic_providers` rows, selects public-safe fields only, maps rows toward `PublicProviderCard`, preserves static fallback, and hides raw Supabase errors.

Task 157 may begin because the required manual SQL execution confirmations are available.

---

## Remaining Risks

- Future blocked test coverage should add rejected, archived, suspended, and internal rows.
- Future diagnostics helper must carefully normalize `providerType = diagnostics` while contact channels later use `provider_type = diagnostic`.
- Public turnaround and home sample collection values must remain general discovery previews, not workflows or patient-specific promises.

---

## Summary

Current diagnostics SQL execution status:

```text
Executed and verified
```

Table QA, RLS QA, test data QA, verification queries, public-visible rows, and blocked rows are documented as manually confirmed outcomes.

The project is ready for Task 157: Diagnostics Public Read Helper Implementation.
