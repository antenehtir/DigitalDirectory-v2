# Codex Task 136: Pharmacies RLS Policy SQL Draft

## Warning

Do not execute this SQL yet.

This document is a planning and SQL draft artifact only. It has not been run against Supabase. It must be reviewed alongside the pharmacies table draft, pharmacy discovery schema plan, and the existing facilities/doctors RLS patterns before any manual execution.

This task does not connect to Supabase, does not execute SQL, does not modify application code, does not install packages, and does not commit or push changes.

## Purpose

The purpose of this draft is to define a safe Row Level Security plan for the future `public.pharmacies` table.

The pharmacy table is intended for public pharmacy discovery only. Public users should be able to read reviewed public pharmacy listings, but public users must not be able to insert, update, or delete pharmacy rows.

This mirrors the public read boundary already planned for facilities and doctors:

```text
listing_status = 'active'
visibility_status = 'public'
```

## Assumptions

This draft assumes:

- `public.pharmacies` exists from `supabase/migrations_draft/010_create_pharmacies_table.sql`.
- `public.pharmacies` uses public-safe discovery fields only.
- `listing_status` supports:
  - `draft`
  - `pending`
  - `active`
  - `rejected`
  - `archived`
  - `suspended`
- `visibility_status` supports:
  - `public`
  - `hidden`
  - `internal`
- `verification_status` supports:
  - `unverified`
  - `pending`
  - `verified`
  - `disputed`
  - `expired`
- Public pharmacy rows are eligible for anonymous reads only when `listing_status = 'active'` and `visibility_status = 'public'`.
- Pharmacy discovery excludes medicine inventory, medicine prices, prescription uploads, patient addresses, payment/order workflows, controlled medication workflows, private contacts, verification evidence, and admin/reviewer notes.
- Future provider/admin write policies will be planned separately after authentication, ownership, roles, and admin review workflows are ready.

Fields that need confirmation before manual execution:

- Confirm the table name is exactly `public.pharmacies`.
- Confirm the table includes `listing_status` and `visibility_status`.
- Confirm the status vocabularies above match the final pharmacies table constraints.
- Confirm `anon` should receive public schema usage and select grant for this test project.
- Confirm no private or workflow fields were added to `public.pharmacies` after the draft table was written.

## SQL Draft

```sql
-- DigitalDirectory-v2 pharmacies RLS policy draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Enables row level security on public.pharmacies.
-- - Grants anon usage on the public schema for public reads.
-- - Grants anon select on public.pharmacies.
-- - Adds one public anon SELECT policy only.
-- - Allows anon reads only for active/public pharmacy discovery rows.
--
-- Out of scope:
-- - No INSERT policy.
-- - No UPDATE policy.
-- - No DELETE policy.
-- - No authenticated/provider/admin/super-admin policies.
-- - No service-role logic.
-- - No test inserts.
-- - No private/sensitive fields.
-- - No medicine inventory.
-- - No prescription upload workflow.
-- - No payment/order workflow.
-- - No patient address data.

alter table public.pharmacies enable row level security;

grant usage on schema public to anon;
grant select on table public.pharmacies to anon;

drop policy if exists "Allow anon read active public pharmacies" on public.pharmacies;

create policy "Allow anon read active public pharmacies"
on public.pharmacies
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

## Public Read Policy

The public read policy allows anonymous users to select only pharmacy rows that are both:

- `listing_status = 'active'`
- `visibility_status = 'public'`

This means the following rows should not appear in anonymous public reads:

- `draft`
- `pending`
- `rejected`
- `archived`
- `suspended`
- `hidden`
- `internal`
- unknown or malformed statuses blocked by table constraints

The policy does not depend on `verification_status`. A row can be active/public and still show `unverified`, `pending`, `verified`, `disputed`, or `expired` as a public trust label, as long as the listing has been approved for public visibility.

## Public Write Protection Notes

Public write protection is handled by omission.

This draft intentionally does not create:

- anon insert policy
- anon update policy
- anon delete policy
- authenticated insert policy
- authenticated update policy
- authenticated delete policy
- provider owner write policy
- admin write policy
- reviewer write policy
- super-admin write policy

With RLS enabled, public writes should remain blocked unless explicit policies are added later.

The frontend must not use a service-role key for pharmacy reads or writes.

## Future Admin/Provider Policy Placeholders

Future policies should be planned only after authentication, user roles, ownership, admin review, and audit logging are designed.

Potential future policy groups:

- Pharmacy owner draft/update policy for owned rows only.
- Facility or organization manager policy if a pharmacy is attached to a larger facility.
- Reviewer policy for review queue actions.
- Admin policy for approved listing changes.
- Super Admin policy for exceptional governance actions.
- Audit log insert policy for trust-critical changes.

These are placeholders only. They are not included in the SQL draft.

Future write policies should require:

- authenticated user identity
- provider ownership or assigned review role
- public/private field separation
- admin review for public-facing changes
- audit log records for status, visibility, verification, and contact changes
- no exposure of patient data, private owner contacts, prescription data, inventory, payments, or admin notes

## Manual QA Checklist

Before running this draft manually:

1. Confirm `public.pharmacies` exists.
2. Confirm `listing_status` and `visibility_status` columns exist.
3. Confirm table constraints allow `listing_status = 'active'`.
4. Confirm table constraints allow `visibility_status = 'public'`.
5. Confirm no private or workflow fields were added to the public pharmacies table.
6. Confirm the SQL Editor session is pointed at the intended test project, not production.
7. Confirm no service-role key is pasted into SQL, docs, screenshots, chat, or frontend code.

After running in a reviewed test project, verify:

```sql
select
  slug,
  display_name,
  listing_status,
  visibility_status,
  verification_status
from public.pharmacies
order by display_name;
```

Then verify public-eligible rows:

```sql
select
  slug,
  display_name,
  listing_status,
  visibility_status,
  verification_status
from public.pharmacies
where listing_status = 'active'
  and visibility_status = 'public'
order by display_name;
```

Negative QA expectations:

- Pending pharmacies must not appear in anon public reads.
- Draft pharmacies must not appear in anon public reads.
- Hidden pharmacies must not appear in anon public reads.
- Internal pharmacies must not appear in anon public reads.
- Archived pharmacies must not appear in anon public reads.
- Suspended pharmacies must not appear in anon public reads.
- Rejected pharmacies must not appear in anon public reads.
- Anon insert/update/delete attempts should fail.

## Rollback Notes

If this draft is manually executed in a reviewed test project and needs to be reversed, use a reviewed rollback plan before running anything.

Possible rollback draft:

```sql
-- DRAFT ROLLBACK ONLY. REVIEW BEFORE RUNNING.

drop policy if exists "Allow anon read active public pharmacies" on public.pharmacies;

revoke select on table public.pharmacies from anon;

-- Only disable RLS if the test project needs to return to a pre-RLS state.
-- Do not disable RLS in production without a separate security review.
-- alter table public.pharmacies disable row level security;
```

Do not drop the `public.pharmacies` table as part of an RLS rollback unless a separate schema rollback is reviewed and approved.

## Summary

This Task 136 document drafts one public read-only RLS policy for `public.pharmacies`.

The draft:

- Enables RLS on `public.pharmacies`.
- Grants `anon` usage on schema `public`.
- Grants `anon` select on table `public.pharmacies`.
- Allows anon select only for `active` and `public` pharmacy rows.
- Adds no public write policies.
- Adds no provider/admin policies yet.
- Adds no service-role logic.
- Adds no test data.

Do not execute this SQL until it has been reviewed against the final pharmacies table draft and test data plan.
