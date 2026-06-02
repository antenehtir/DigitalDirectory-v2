# DigitalDirectory-v2 Doctors SQL Manual Execution Guide

## Purpose

This guide explains how to manually run the doctors SQL drafts in a Supabase test project after review.

This is documentation-only. Codex does not run SQL, modify Supabase, modify app code, modify frontend UI, add real doctor data, expose keys, or use a service-role key.

## Required Pre-Checks

Before running any SQL manually:

- Confirm the Supabase project is a test project, not production.
- Confirm the SQL files have been reviewed.
- Confirm no real doctor data is present in the test data draft.
- Confirm no phone, email, license document, certificate, patient, booking, payment, review, or rating data is present.
- Confirm you are not pasting keys, project URLs, or screenshots containing secrets into chat or documentation.
- Confirm the facilities SQL path has already been understood, especially the active/public RLS pattern.

## Safe Execution Order

Run the doctors SQL drafts manually in this order:

1. `supabase/migrations_draft/004_create_doctors_table.sql`
2. `supabase/migrations_draft/005_doctors_rls_policy.sql`
3. `supabase/migrations_draft/006_doctors_test_data.sql`

Do not run the test data draft before the table draft.

Do not run the RLS draft before the table exists.

Do not add extra SQL while executing these drafts.

## Manual Supabase SQL Editor Steps

1. Open the Supabase test project.
2. Open the SQL Editor.
3. Create a new query tab.
4. Paste the full contents of `004_create_doctors_table.sql`.
5. Review the pasted SQL one more time.
6. Run the table draft.
7. Confirm it completes successfully.
8. Create a new query tab.
9. Paste the full contents of `005_doctors_rls_policy.sql`.
10. Review the anon grants and active/public policy.
11. Run the RLS draft.
12. Confirm it completes successfully.
13. Create a new query tab.
14. Paste the full contents of `006_doctors_test_data.sql`.
15. Review the fictional test rows.
16. Run the test data draft.
17. Confirm it completes successfully.

## Full Verification Query

After the three drafts run successfully, use this query to review all fictional doctor test rows:

```sql
select
  slug,
  display_name,
  specialty,
  listing_status,
  visibility_status,
  verification_status
from public.doctors
where slug like 'test-doctor-%'
order by slug;
```

Expected rows:

- `test-doctor-alpha`
- `test-doctor-beta-pending`
- `test-doctor-delta-hidden`
- `test-doctor-epsilon-internal`
- `test-doctor-eta-minimal`
- `test-doctor-gamma-archived`
- `test-doctor-zeta-disputed`

## Active/Public Verification Query

Use this query to verify which rows should be publicly readable through the active/public rule:

```sql
select
  slug,
  display_name,
  specialty,
  listing_status,
  visibility_status,
  verification_status
from public.doctors
where listing_status = 'active'
  and visibility_status = 'public'
order by slug;
```

## Expected Active/Public Rows

The active/public verification query should return:

| Slug | Display name | Expected behavior |
| --- | --- | --- |
| `test-doctor-alpha` | Test Doctor Alpha | Public read candidate |
| `test-doctor-eta-minimal` | Test Doctor Eta Minimal | Public read candidate with minimal optional fields |
| `test-doctor-zeta-disputed` | Test Doctor Zeta Disputed | Public read candidate; disputed is verification status, not visibility status |

These rows are intentionally fictional.

## Blocked Rows

The following rows should exist for negative RLS/public-read testing but should not appear in active/public public reads:

| Slug | Display name | Why blocked |
| --- | --- | --- |
| `test-doctor-beta-pending` | Test Doctor Beta Pending | Pending/hidden |
| `test-doctor-gamma-archived` | Test Doctor Gamma Archived | Archived/public |
| `test-doctor-delta-hidden` | Test Doctor Delta Hidden | Active/hidden |
| `test-doctor-epsilon-internal` | Test Doctor Epsilon Internal | Active/internal |

## RLS Behavior To Confirm Later

The doctors RLS draft allows anon reads only when:

```sql
listing_status = 'active'
and visibility_status = 'public'
```

The RLS draft intentionally does not include:

- Anon insert policy
- Anon update policy
- Anon delete policy
- Authenticated provider policy
- Admin policy
- Reviewer policy
- Super Admin policy
- Service-role logic

## Safety Reminders

Do not use real doctor data.

Do not insert:

- Real doctor names
- Private phone numbers
- Private email addresses
- License documents
- Uploaded certificates
- Verification evidence
- Admin notes
- Patient data
- Booking data
- Payment data
- Review data
- Rating data

Do not expose:

- Service-role key
- Project URL
- Anon key
- Screenshots containing keys
- SQL Editor result panes that reveal sensitive project details

SQL should be run manually only after review.

## What Not To Do

Do not:

- Run these drafts against production.
- Add private fields to `public.doctors`.
- Add patient or booking fields to `public.doctors`.
- Add RLS write policies during this step.
- Add app code that reads `public.doctors`.
- Wire `/doctors` to Supabase yet.
- Wire `/doctors/[slug]` yet.
- Use a service-role key in frontend code.

## Manual Checklist Before Continuing

Before moving to app read planning, confirm:

- `004_create_doctors_table.sql` ran successfully.
- `005_doctors_rls_policy.sql` ran successfully.
- `006_doctors_test_data.sql` ran successfully.
- Full verification query returns all seven fictional test rows.
- Active/public verification query returns only the three expected rows.
- Blocked rows exist for later negative testing.
- No real doctor data was inserted.
- No private/sensitive data was inserted.
- No service-role key was exposed.

## Relationship To Future App Reads

This guide prepares the database side only.

Future app work should be separate and should include:

- Doctor public read planning.
- Doctor row-to-card mapper planning.
- Static fallback planning.
- A controlled source-wrapper mode for doctors.
- `/doctors` list read QA.
- Later `/doctors/[slug]` detail planning.

Do not skip directly from SQL execution to broad app wiring.

## Recommended Next Development Order

1. Manually execute the doctors SQL drafts in the order listed here after review.
2. Record a doctors SQL manual execution QA result.
3. Plan a public doctors read helper.
4. Implement a safe doctors public read helper.
5. QA the helper without wiring public pages.
6. Plan controlled `/doctors` page wiring.
7. Wire `/doctors` only after helper QA passes.
8. Keep doctor detail pages, search, nearby, pharmacies, diagnostics, auth, bookings, payments, reviews, and dashboards out of scope until later tasks.

## Summary

Run the doctors SQL drafts manually in this order: create table, apply RLS, insert fictional test data. The expected public rows are Test Doctor Alpha, Test Doctor Eta Minimal, and Test Doctor Zeta Disputed. The pending, archived, hidden, and internal rows should remain blocked from public reads.

No real doctor data, private contact data, license documents, patient data, bookings, payments, reviews, ratings, or service-role keys should be used or exposed.
