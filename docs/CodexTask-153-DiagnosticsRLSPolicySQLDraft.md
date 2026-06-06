# Codex Task 153: Diagnostics RLS Policy SQL Draft

## Project

DigitalDirectory-v2

## Goal

Create a Row Level Security policy SQL draft for the diagnostics discovery table drafted in Task 152.

This task follows:

- `docs/CodexTask-151-DiagnosticsDiscoverySchemaPlanning.md`
- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`

This is a documentation-only RLS SQL draft task. Do not execute SQL. Do not modify Supabase directly. Do not create migration files. Do not modify source code, routes, UI, pharmacy files, doctor files, facility files, or diagnostics read helpers.

---

## Context Reviewed

Documents and patterns reviewed:

- `docs/CodexTask-152-DiagnosticsTableSQLDraft.md`
- `docs/CodexTask-136-PharmaciesRLSPolicySQLDraft.md`
- `docs/CodexTask-101-DoctorsRLSPolicySQLDraft.md`
- `docs/CodexTask-68-FacilitiesRLSPolicySQLDraft.md`
- `docs/CodexTask-47-RLSPolicyPlanning.md`
- `docs/DataModelContentStructure.md`
- `docs/DevelopmentRoadmap.md`
- Existing facilities, doctors, and pharmacies RLS policy draft patterns

The diagnostics RLS policy should use the same public read-only boundary as facilities, doctors, and pharmacies.

---

## RLS Draft Scope

This draft applies to:

```text
public.diagnostic_providers
```

It allows anonymous public reads only for rows where:

```text
listing_status = 'active'
visibility_status = 'public'
```

It does not allow anonymous inserts, updates, or deletes.

It does not add authenticated, provider, reviewer, admin, or super-admin policies.

---

## SQL Draft

Warning:

```text
DRAFT ONLY. DO NOT EXECUTE UNTIL REVIEWED AND APPROVED.
```

```sql
-- DigitalDirectory-v2 diagnostic providers RLS policy SQL draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a documentation-only planning artifact.
--
-- Scope:
-- - Enables row level security on public.diagnostic_providers.
-- - Grants anon usage on the public schema for public reads.
-- - Grants anon select on public.diagnostic_providers.
-- - Adds one public anon SELECT policy only.
-- - Allows anon reads only for active/public diagnostics provider rows.
--
-- Out of scope:
-- - No INSERT policy.
-- - No UPDATE policy.
-- - No DELETE policy.
-- - No authenticated/provider/admin/super-admin policies.
-- - No service-role logic.
-- - No test inserts.
-- - No private/sensitive fields.
-- - No patient records.
-- - No lab results.
-- - No diagnostic reports.
-- - No uploaded files.
-- - No sample tracking.
-- - No ordering workflows.
-- - No payments.
-- - No protected workflow data.
--
-- Public read boundary:
-- A diagnostics provider row is publicly readable only when:
-- listing_status = 'active'
-- visibility_status = 'public'

alter table public.diagnostic_providers enable row level security;

grant usage on schema public to anon;
grant select on table public.diagnostic_providers to anon;

drop policy if exists "Allow anon read active public diagnostic providers"
  on public.diagnostic_providers;

create policy "Allow anon read active public diagnostic providers"
on public.diagnostic_providers
for select
to anon
using (
  listing_status = 'active'
  and visibility_status = 'public'
);

-- No INSERT policies are included in this draft.
-- No UPDATE policies are included in this draft.
-- No DELETE policies are included in this draft.
-- No authenticated, provider, admin, reviewer, or super-admin policies are included.
-- No service-role logic is included.
-- No test data inserts are included.
-- Review status values, table constraints, anon grants, and negative RLS tests before running.
```

---

## Public Select Policy

The public select policy allows anonymous users to select only diagnostics provider rows that are both:

- `listing_status = 'active'`
- `visibility_status = 'public'`

The policy must protect these listing states:

- `draft`
- `pending`
- `rejected`
- `archived`
- `suspended`

The policy must protect these visibility states:

- `hidden`
- `internal`

The policy does not depend on `verification_status`. Verification is a public trust label only after a row is active/public. A row should never become public only because it is verified.

---

## Public Write Protection

Public write protection is handled by omission.

This draft intentionally does not create:

- anon insert policy
- anon update policy
- anon delete policy
- authenticated insert policy
- authenticated update policy
- authenticated delete policy
- provider owner policy
- reviewer policy
- admin policy
- super-admin policy

With RLS enabled, public writes should remain blocked unless explicit policies are added later.

Public users must not be able to create, change, hide, delete, or publish diagnostics provider rows. Diagnostics listings can include sensitive public-trust boundaries, so writes must wait for authentication, ownership, admin review, audit logging, and protected workflow planning.

Frontend code must not use a service-role key for diagnostics reads or writes.

---

## Future Admin/Provider Policy Notes

Future policies should be planned only after authentication, user roles, provider ownership, reviewer workflows, admin governance, and audit logs are ready.

Potential future policy groups:

- Diagnostics provider owner draft/update policy for owned rows only.
- Organization or facility manager policy if a diagnostics provider is attached to a larger facility.
- Reviewer policy for review queue actions.
- Admin policy for approved listing changes.
- Super Admin policy for exceptional governance actions.
- Audit log insert policy for public listing changes.

Future write policies should require:

- authenticated user identity
- assigned ownership or role
- public/private field separation
- admin review for public-facing changes
- audit log records for status, visibility, verification, and contact changes
- no exposure of patient data, diagnostic reports, lab results, private contacts, sample tracking, payments, or protected workflow data

These are placeholders only. They are not included in the SQL draft.

---

## Public/Private Safety Notes

The RLS policy is designed for public diagnostics discovery only.

Public-safe rows may include:

- reviewed diagnostics provider name
- diagnostics provider type
- public description
- public city and area
- reviewed public address and landmark
- public services
- public sample collection mode labels
- public opening hours
- public result turnaround estimate
- public preview booleans
- public verification label

Rows or fields must remain private if they involve:

- patient records
- patient identifiers
- patient contact details
- lab results
- diagnostic reports
- report files
- uploaded files
- uploaded referrals
- uploaded prescriptions
- sample tracking
- specimen IDs
- accession numbers
- private contacts
- staff schedules
- internal admin notes
- reviewer notes
- verification evidence
- ordering workflows
- payment workflows
- protected workflow data
- service-role keys or secrets

The app should still apply query filters for active/public rows in future read helpers, but RLS must remain the database boundary.

---

## Manual QA Checklist For Future Execution

Before running this draft manually in a reviewed test project:

1. Confirm `public.diagnostic_providers` exists.
2. Confirm `listing_status` and `visibility_status` columns exist.
3. Confirm `listing_status` allows `active`.
4. Confirm `visibility_status` allows `public`.
5. Confirm the status vocabulary matches Task 152.
6. Confirm no private or workflow fields were added to `public.diagnostic_providers`.
7. Confirm the SQL Editor session is connected to the intended test project, not production.
8. Confirm no service-role key, environment value, or secret is pasted into SQL, docs, screenshots, chat, or frontend code.

After future manual execution, verify public-eligible rows with:

```sql
select
  slug,
  display_name,
  listing_status,
  visibility_status,
  verification_status
from public.diagnostic_providers
where listing_status = 'active'
  and visibility_status = 'public'
order by display_name;
```

Negative QA expectations:

- Draft diagnostics providers must not appear in anon public reads.
- Pending diagnostics providers must not appear in anon public reads.
- Rejected diagnostics providers must not appear in anon public reads.
- Archived diagnostics providers must not appear in anon public reads.
- Suspended diagnostics providers must not appear in anon public reads.
- Hidden diagnostics providers must not appear in anon public reads.
- Internal diagnostics providers must not appear in anon public reads.
- Anon insert, update, and delete attempts should fail.

---

## Rollback Notes

If this draft is manually executed later in a reviewed test project and needs to be reversed, use a reviewed rollback plan before running anything.

Possible rollback draft:

```sql
-- DRAFT ROLLBACK ONLY. REVIEW BEFORE RUNNING.

drop policy if exists "Allow anon read active public diagnostic providers"
  on public.diagnostic_providers;

revoke select on table public.diagnostic_providers from anon;

-- Only disable RLS if the test project needs to return to a pre-RLS state.
-- Do not disable RLS in production without a separate security review.
-- alter table public.diagnostic_providers disable row level security;
```

Do not drop the `public.diagnostic_providers` table as part of an RLS rollback unless a separate schema rollback is reviewed and approved.

---

## Recommended Task 154

Recommended Task 154 title:

```text
CodexTask-154-DiagnosticsTestDataSQLDraft.md
```

Recommended objective:

Create a documentation-only SQL draft for fictional diagnostics provider test rows covering active/public rows and blocked draft, pending, rejected, archived, suspended, hidden, and internal cases.

Task 154 should not execute SQL, modify Supabase directly, create migration files, modify app code, modify UI, add diagnostics read helpers, or import real data.

---

## Remaining Risks

- This RLS draft depends on the table and status constraints from Task 152 being reviewed and kept aligned.
- Future diagnostics read helpers must still apply active/public filters and hide raw Supabase errors.
- Future test data must include blocked status/visibility rows to validate that RLS protects them.
- The table stores public discovery only; future protected workflows must not reuse this policy for patient data, reports, orders, uploads, or payments.
- Admin/provider policies require separate authentication, role, ownership, and audit-log planning.

---

## Summary

This document drafts public read-only RLS for `public.diagnostic_providers`.

The draft:

- enables row level security
- grants anon usage on schema `public`
- grants anon select on `public.diagnostic_providers`
- drops the existing public select policy if present
- creates one anon select policy for active/public rows only
- adds no public write policies
- adds no authenticated/provider/admin/super-admin policies
- adds no service-role logic
- adds no test data

It protects draft, pending, rejected, archived, suspended, hidden, and internal diagnostics provider rows from anonymous public reads.
