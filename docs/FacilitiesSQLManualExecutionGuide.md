# DigitalDirectory-v2 Facilities SQL Manual Execution Guide

## Purpose

This guide explains how a human reviewer should manually run the first facilities SQL drafts in a Supabase test project later, after review and approval.

This document is guidance only. It does not run SQL, create tables, insert data, connect the app to Supabase, create environment files, or add real keys.

## Core Principle

Facilities SQL should be executed slowly, in a test project only, with public data boundaries checked before every step.

The current application must continue using static data until a later public listing read implementation is reviewed and approved.

## Manual Execution Purpose

The manual execution flow is meant to validate the first public-safe facilities table shape before the app reads from Supabase.

The first manual pass should confirm:

- The facilities table can be created in a Supabase test project.
- The status vocabulary matches the planning documents.
- Anonymous public reads are limited to `listing_status = 'active'` and `visibility_status = 'public'`.
- Fictional test rows cover readable and blocked cases.
- No private provider data, patient data, admin notes, service-role logic, or real listing claims are introduced.

## Required Pre-Checks

Before running any SQL manually, confirm all of the following:

- A separate Supabase test project exists and is clearly not production.
- The selected Supabase project name, organization, and region match the intended test project.
- The SQL drafts have been reviewed in this order:
  - `supabase/migrations_draft/001_create_facilities_table.sql`
  - `supabase/migrations_draft/002_facilities_rls_policy.sql`
  - `supabase/migrations_draft/003_facilities_test_data.sql`
- The table draft still contains no private fields, no RLS policies, and no test inserts.
- The RLS draft still contains only the anon SELECT policy for active/public rows.
- The test data draft still contains fictional rows only.
- No `.env.local` file needs to be created for this manual database step.
- No real keys, screenshots containing keys, patient data, provider documents, or production data are being used.
- The reviewer understands the rollback/reset plan for the test project before continuing.

## Safety Rules Before Running SQL

- Run drafts only in the Supabase SQL editor for the approved test project.
- Run one draft at a time.
- Do not combine the three drafts into one unreviewed script.
- Do not edit status values during execution.
- Do not add real facilities, real provider contacts, patient data, admin notes, documents, or private addresses.
- Do not use or expose a service-role key.
- Do not paste Supabase keys into chat, docs, Git commits, screenshots, or issue comments.
- Do not create production tables from these drafts.
- Do not connect the app to Supabase as part of this manual step.
- Stop if the SQL editor shows an unexpected error instead of improvising fixes.

## Correct SQL Execution Order

Run the files in this exact order:

1. `supabase/migrations_draft/001_create_facilities_table.sql`
2. `supabase/migrations_draft/002_facilities_rls_policy.sql`
3. `supabase/migrations_draft/003_facilities_test_data.sql`

The table must exist before RLS can be enabled. RLS should be enabled before inserting test rows so the first data review uses the intended public access policy.

## Step 1: Run Facilities Table Draft

Use `supabase/migrations_draft/001_create_facilities_table.sql`.

Before running, confirm the draft says it is draft-only and contains:

- `public.facilities`
- `id uuid primary key default gen_random_uuid()`
- `slug text unique not null`
- `display_name text not null`
- public-safe listing fields only
- `listing_status` default `pending`
- `visibility_status` default `hidden`
- `verification_status` default `unverified`
- constraints for the approved status values
- indexes for public read and filtering readiness
- an `updated_at` trigger helper
- no RLS policies
- no test inserts
- no private or sensitive fields

Expected result:

- `public.facilities` exists in the test project.
- No facility rows are inserted yet.
- No RLS policy has been added yet.

## Step 2: Run Facilities RLS Draft

Use `supabase/migrations_draft/002_facilities_rls_policy.sql`.

Before running, confirm the draft only:

- Enables row level security on `public.facilities`.
- Drops and recreates the anon SELECT policy named `Allow anon read active public facilities`.
- Allows reads only when:
  - `listing_status = 'active'`
  - `visibility_status = 'public'`

Expected result:

- RLS is enabled on `public.facilities`.
- Anonymous public reads are limited to active/public rows.
- There are still no insert, update, delete, authenticated, provider, admin, reviewer, super-admin, or service-role policies in the draft.

## Step 3: Run Facilities Test Data Draft

Use `supabase/migrations_draft/003_facilities_test_data.sql`.

Before running, confirm the draft:

- Uses fictional/sample facility rows only.
- Uses only the approved status vocabulary.
- Includes readable and blocked examples.
- Uses `on conflict (slug) do update` so the draft can be rerun safely in the test project after review.
- Does not insert contact channels, private provider documents, admin notes, patient data, or real provider data.
- Does not change RLS.

Expected result:

- The test project contains the fictional facilities rows from the draft.
- Active/public rows are expected to be readable later through anon public reads.
- Pending, archived, hidden, and internal rows are expected to be blocked from anon public reads.

## Status Vocabulary

The facilities table draft should use this exact listing status set:

- `draft`
- `pending`
- `active`
- `rejected`
- `archived`
- `suspended`

The facilities table draft should use this exact visibility status set:

- `public`
- `hidden`
- `internal`

The facilities table draft should use this exact verification status set:

- `unverified`
- `pending`
- `verified`
- `disputed`
- `expired`

The RLS draft should continue to use:

```sql
listing_status = 'active'
and visibility_status = 'public'
```

## How to Verify Table Creation

Use the Supabase table editor or reviewed read-only inspection queries in the test project.

For manual verification, check that `public.facilities` exists and includes the expected public-safe columns:

```sql
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'facilities'
order by ordinal_position;
```

Check that indexes were created:

```sql
select indexname
from pg_indexes
where schemaname = 'public'
  and tablename = 'facilities'
order by indexname;
```

Check that the update trigger exists:

```sql
select tgname
from pg_trigger
where tgrelid = 'public.facilities'::regclass
  and not tgisinternal
order by tgname;
```

These checks should be run only in the test project.

## How to Verify Test Data Rows

After Step 3, verify the fictional test rows by checking only public-safe columns:

```sql
select
  slug,
  display_name,
  listing_status,
  visibility_status,
  verification_status
from public.facilities
order by slug;
```

Expected fictional rows include:

- `test-facility-alpha`
- `test-facility-beta-pending`
- `test-facility-gamma-archived`
- `test-facility-delta-hidden`
- `test-facility-epsilon-internal`
- `test-facility-zeta-disputed`
- `test-facility-eta-minimal`

## How to Verify Active/Public Rows

For the expected public read set, check active/public rows:

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

Expected rows from the current test data draft:

- `test-facility-alpha`
- `test-facility-eta-minimal`
- `test-facility-zeta-disputed`

This verifies the data shape. A later app-read QA pass should verify the same outcome through the anon browser client path, not with a service-role key.

## Key and Screenshot Safety

- Do not commit `.env.local`.
- Do not paste project keys into documentation.
- Do not show the service-role key in screenshots.
- Do not share screenshots of Supabase settings pages that show keys or connection strings.
- Do not use production keys for test project verification.
- Do not use a service-role key for public read testing.
- If a screenshot is needed, crop or redact project identifiers, keys, connection strings, and account details.

## What Not To Do

- Do not run these drafts in production.
- Do not add RLS to `001_create_facilities_table.sql`.
- Do not add test inserts to `001_create_facilities_table.sql`.
- Do not add insert, update, delete, provider, admin, reviewer, super-admin, or service-role policies to `002_facilities_rls_policy.sql`.
- Do not add private fields to the facilities table draft.
- Do not add real provider records to the test data draft.
- Do not add patient, booking, payment, document vault, notification, chatbot, or community data.
- Do not connect public pages to Supabase during this manual SQL step.
- Do not change source wrapper, mapper, or frontend files as part of SQL execution.

## Rollback and Reset Notes

Rollback should be handled only in the test project and only after reviewing the current state.

Safe reset planning should consider:

- Whether the test project can be recreated instead of manually unwound.
- Whether only fictional test rows need to be removed.
- Whether the RLS policy should be dropped before dropping the table.
- Whether any follow-up drafts depend on the current table shape.

Avoid ad hoc destructive SQL in production-like environments. If reset SQL is needed, create a separate reviewed draft before running it.

## Manual Checklist Before Continuing To App Reads

Before any future app read implementation begins, confirm:

- The table draft ran successfully in the test project.
- The RLS draft ran successfully in the test project.
- The fictional test data draft ran successfully in the test project.
- Active/public rows are identifiable.
- Pending, archived, hidden, and internal rows are not part of the expected public read set.
- No private fields or real provider data were added.
- No service-role key was used in browser-facing code.
- No `.env.local` file or real keys were committed.
- Public read behavior has a clear QA path using anon access.
- Static app behavior remains unchanged until the source switch is implemented and reviewed later.

## Relationship To Future Facilities Public Read Implementation

This guide prepares the database side for a later facilities public read task.

The later implementation should:

- Use the existing Supabase browser client helper safely.
- Use only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` on the browser path.
- Keep static data as the fallback source.
- Map Supabase rows through the public listing mapper layer.
- Read only public-safe fields.
- Preserve existing public route behavior until QA confirms the switch.
- Avoid service-role usage in browser code.

## Recommended Next Development Order

1. Manually review the three SQL drafts one more time.
2. Create or confirm the Supabase test project.
3. Run the table draft in the test project.
4. Run the RLS draft in the test project.
5. Run the fictional test data draft in the test project.
6. Verify table structure, rows, and active/public expectations.
7. Document any SQL execution findings.
8. Plan the first facilities public read implementation behind the existing static fallback approach.
