# DigitalDirectory-v2 Supabase Public Listing Test Data Setup Plan

## Purpose

This document plans the safe test data needed to validate future Supabase public listing reads for DigitalDirectory-v2.

It is documentation-only. It does not create Supabase tables, insert test data, add SQL, add migrations, add RLS policies, add Supabase reads, modify source wrapper code, modify mapper code, add authentication, add backend functionality, add protected routes, modify frontend UI, or change public listing behavior.

The goal is to define exactly what fictional, non-sensitive test records should exist later in a Supabase test project so public reads, mapper output, source fallback, and RLS expectations can be validated safely.

---

## Core Principle

Test data must be fictional, minimal, clearly labeled, and safe to expose.

The test project should prove public listing behavior and negative access outcomes without using real patient data, real provider private data, real verification material, or production secrets.

---

## Test Data Setup Purpose

Future Supabase public listing test data should help verify:

- Published/public records can be read by anonymous public clients.
- Draft, hidden, archived, rejected, duplicate, and private records are excluded.
- Public DTO mappers can transform row shapes safely.
- Static fallback remains available when Supabase is unavailable.
- RLS blocks private/internal data.
- Services, specialties, locations, contact channels, and relationship rows behave as expected.
- Public routes and slugs remain stable.

The setup plan should be used before any real Supabase read implementation is connected to source wrappers or pages.

---

## Safe Test Data Principles

Safe test records should:

- Use obviously fictional provider names.
- Use reserved domains such as `example.com`.
- Use fake phone values that are clearly not operational contacts.
- Use generic descriptions.
- Include clear `test` or `mock` naming where useful.
- Cover both public and blocked/private outcomes.
- Be easy to delete or reset.
- Avoid any real provider, patient, reviewer, or admin information.

Recommended naming style:

```text
Test Facility Alpha
Test Doctor One
Test Pharmacy North
Test Diagnostics Center
```

---

## What Must Not Be Used as Test Data

Never use:

- Real patient names.
- Patient phone numbers or email addresses.
- Patient IDs.
- Diagnoses, symptoms, appointment reasons, lab results, prescriptions, or medical documents.
- Payment or wallet records.
- Identity documents.
- Real provider private contact details.
- Real provider verification documents.
- Real admin notes.
- Real reviewer notes.
- Production exports.
- Real audit logs.
- Real chatbot logs.
- Real private community content.
- Real booking data.

Rule:

```text
If the data would be unsafe or embarrassing if exposed publicly, it does not belong in the test project.
```

---

## Facility Test Rows

Facilities should be the first public listing read test slice.

Recommended facility rows:

| Test Row | Listing Status | Visibility | Verification | Expected Public Outcome |
| --- | --- | --- | --- | --- |
| Test Facility Alpha | published | public | verified | Readable and mappable |
| Test Facility Beta Draft | draft | public | pending | Blocked from public reads |
| Test Facility Gamma Hidden | published | hidden | pending | Blocked from public reads |
| Test Facility Delta Archived | archived | public | community-submitted | Blocked from public reads |
| Test Facility Epsilon Private | published | private | pending | Blocked from public reads |

Allowed public fields:

- `id`
- `slug`
- `name`
- `facility_type`
- `summary`
- `description`
- `location_id`
- reviewed public address display
- `verification_status`
- `listing_status`
- `visibility_status`

Do not include private contacts, owner IDs, admin notes, reviewer notes, or verification evidence.

---

## Doctor Test Rows

Doctor rows can be planned now but should be read after the facility slice is stable.

Recommended doctor rows:

| Test Row | Listing Status | Visibility | Verification | Expected Public Outcome |
| --- | --- | --- | --- | --- |
| Dr. Test Provider One | published | public | pending | Readable later |
| Dr. Test Provider Hidden | published | hidden | pending | Blocked |
| Dr. Test Provider Draft | draft | public | pending | Blocked |

Allowed public fields later:

- `id`
- `slug`
- `full_name`
- `display_title`
- `specialty_id`
- `summary`
- `bio`
- `location_id`
- `verification_status`
- `listing_status`
- `visibility_status`
- preview availability summary
- telemedicine preview status

Do not include credential documents, private contact details, owner account IDs, booking slots, patient booking history, or real schedules.

---

## Pharmacy Test Rows

Pharmacy rows should support discovery testing only.

Recommended pharmacy rows:

| Test Row | Listing Status | Visibility | Verification | Expected Public Outcome |
| --- | --- | --- | --- | --- |
| Test Pharmacy North | published | public | pending | Readable later |
| Test Pharmacy Private | published | private | pending | Blocked |
| Test Pharmacy Rejected | rejected | public | community-submitted | Blocked |

Allowed public fields later:

- `id`
- `slug`
- `name`
- `summary`
- `location_id`
- `verification_status`
- `listing_status`
- `visibility_status`
- pickup preview label
- delivery preview label

Do not include medication inventory, prescription uploads, orders, delivery addresses, payments, or private pharmacy contacts.

---

## Diagnostics Provider Test Rows

Diagnostics rows should support lab/imaging discovery only.

Recommended diagnostics rows:

| Test Row | Listing Status | Visibility | Verification | Expected Public Outcome |
| --- | --- | --- | --- | --- |
| Test Diagnostics Center | published | public | pending | Readable later |
| Test Imaging Center Hidden | published | hidden | pending | Blocked |
| Test Lab Archived | archived | public | community-submitted | Blocked |

Allowed public fields later:

- `id`
- `slug`
- `name`
- `diagnostics_type`
- `summary`
- `location_id`
- `verification_status`
- `listing_status`
- `visibility_status`
- lab service preview labels
- imaging service preview labels

Do not include lab results, test orders, pricing, booking records, result-ready status, payments, or private documents.

---

## Services Test Rows

Services should validate public taxonomy and provider relationship mapping.

Recommended service rows:

| Service | Category | Status | Expected Public Outcome |
| --- | --- | --- | --- |
| Test Family Medicine | facility | active/public | Readable |
| Test Basic Laboratory | diagnostics | active/public | Readable |
| Test Prescription Pickup | pharmacy | active/public | Readable |
| Test Hidden Service | facility | hidden/private | Blocked |

Allowed fields:

- `id`
- `slug`
- `name`
- `category`
- public description
- active/public status

Do not include internal risk notes unless explicitly approved as public labels later.

---

## Specialties Test Rows

Specialties should support future doctor and facility filtering.

Recommended specialty rows:

| Specialty | Status | Expected Public Outcome |
| --- | --- | --- |
| Test Pediatrics | active/public | Readable later |
| Test Cardiology | active/public | Readable later |
| Test Hidden Specialty | hidden/private | Blocked |

Allowed fields:

- `id`
- `slug`
- `name`
- public description
- parent specialty ID, if public
- active/public status

Specialties should not imply doctor verification or availability.

---

## Location Test Rows

Locations should validate public display labels and hierarchy.

Recommended location rows:

| Location | Type | Public | Expected Outcome |
| --- | --- | --- | --- |
| Test Country | country | true | Readable |
| Test City | city | true | Readable |
| Test Area | area | true | Readable |
| Test Private Area | area | false | Blocked |

Allowed fields:

- `id`
- `slug`
- `name`
- `display_name`
- `location_type`
- `parent_location_id`
- `is_public`

Do not use patient live location data or unreviewed sensitive coordinates.

---

## Contact Channel Test Rows

Contact channels should be treated as high-impact public fields.

Recommended contact channel rows:

| Channel | Visibility | Review Status | Expected Outcome |
| --- | --- | --- | --- |
| Test Facility Alpha Public Phone | public | reviewed | Readable later |
| Test Facility Alpha Website | public | reviewed | Readable later |
| Test Facility Alpha Private Phone | private | internal | Blocked |
| Test Facility Alpha Unreviewed Contact | public | pending | Blocked |

Allowed public values:

- Reserved phone-like placeholders.
- `https://example.com` style URLs.
- Generic labels such as `Call preview` or `Website preview`.

Do not use real phone numbers, real private emails, staff contacts, or submitter contacts.

---

## Relationship Test Rows

Relationship rows should prove that only reviewed public relationships appear.

Recommended relationship rows:

| Relationship | Status | Expected Outcome |
| --- | --- | --- |
| Test Facility Alpha -> Test Family Medicine | reviewed/public | Readable |
| Test Facility Alpha -> Test Basic Laboratory | reviewed/public | Readable |
| Test Facility Alpha -> Test Hidden Service | hidden/private | Blocked |
| Dr. Test Provider One -> Test Facility Alpha | reviewed/public | Readable later |
| Dr. Test Provider Hidden -> Test Facility Alpha | hidden/private | Blocked |

Rules:

- Public relationship rows should connect only public-safe records.
- Hidden or unreviewed relationships should not appear in public DTOs.
- Relationship tables should not include private reviewer notes.

---

## Status Coverage Matrix

Public read tests should cover each status combination.

| Listing Status | Visibility Status | Expected Public Read |
| --- | --- | --- |
| published | public | Allowed |
| published | hidden | Blocked |
| published | private | Blocked |
| draft | public | Blocked |
| rejected | public | Blocked |
| archived | public | Blocked |
| duplicate | public | Blocked |
| deleted | public | Blocked |

The first read should verify both positive and negative outcomes.

---

## Verification State Coverage

Verification states should be tested as public labels, not real claims.

Recommended coverage:

| Verification State | Expected Use |
| --- | --- |
| verified | Public label only when listing is published/public |
| pending | Public label only when listing is published/public |
| community-submitted | Public label only when listing is published/public |

Rules:

- Verification status alone must not make a record public.
- Draft, hidden, archived, rejected, duplicate, or private records remain blocked regardless of verification status.
- Real verification evidence must never be public test data.

---

## Expected Public Read Outcomes

Allowed public reads should return:

- Published/public provider records.
- Active public services.
- Active public specialties.
- Public locations.
- Reviewed public contact channels.
- Reviewed public relationship rows.

Expected mapped output:

- `PublicProviderCard` fields are populated.
- `PublicProviderDetail` fields are populated when detail reads are tested.
- Missing optional fields use safe fallbacks.
- Known routes remain stable.
- Static fallback remains available if Supabase is unavailable.

---

## Expected Blocked and Private Outcomes

Blocked reads should exclude:

- Draft listings.
- Hidden listings.
- Private listings.
- Archived listings.
- Rejected listings.
- Duplicate listings.
- Deleted listings.
- Private contact channels.
- Unreviewed contact channels.
- Hidden services.
- Private locations.
- Internal review data.
- Ownership data.
- Audit logs.
- Patient, booking, payment, document, notification, chatbot, and private community records.

Negative tests should confirm that anon public reads cannot access these records.

---

## QA Checklist

Before adding future read code, confirm:

1. Test project uses only fictional data.
2. No real patient data exists.
3. No real verification documents exist.
4. No private provider contacts exist.
5. Public and blocked records are both present.
6. Published/public positive rows exist.
7. Draft, hidden, archived, rejected, duplicate, and private negative rows exist.
8. Public services, specialties, and locations exist.
9. Hidden/private taxonomy rows exist for negative tests.
10. Public and private contact channel examples exist.
11. Relationship rows cover public and blocked cases.
12. RLS expectations are documented before testing.
13. Static fallback behavior is understood.
14. Mapper DTO expectations are understood.
15. Rollback/reset plan exists for test records.

After future read code exists, confirm:

1. Public reads return only allowed records.
2. Blocked records are excluded.
3. Private fields are not selected.
4. Mapper output matches public DTOs.
5. Lint and build pass.
6. Public pages remain static until explicitly wired.

---

## Relationship to Supabase Public Listing Read Planning

This plan supports `SupabasePublicListingReadPlanning.md`.

Relationship:

- Read planning defines the first read-only implementation direction.
- This document defines the safe test rows needed before that implementation.
- Read planning recommends facilities first.
- This document gives facility rows priority while outlining later doctor, pharmacy, and diagnostics coverage.

---

## Relationship to RLS Policy Planning

This plan depends on `RLSPolicyPlanning.md`.

Relationship:

- RLS planning defines which records anonymous users may read.
- This document defines positive and negative test records for those policies.
- Public records should validate allowed anon reads.
- Draft, hidden, private, archived, rejected, duplicate, and internal records should validate blocked anon reads.

No RLS policies are created in this task.

---

## Relationship to Public Listing Mapper and Source Wrapper

Current implementation files:

- `src/types/public-listings.ts`
- `src/lib/public-listing-mappers.ts`
- `src/lib/public-listing-source.ts`
- `src/lib/supabase/env.ts`
- `src/lib/supabase/browser-client.ts`

Relationship:

- Test rows should map cleanly into public card/detail DTOs.
- Facility rows should be designed to exercise category, location, services, hours, contact, verification, slug, and fallback behavior.
- The source wrapper should remain static by default until read output is QA-approved.
- Supabase env helpers should return unavailable safely if test env vars are missing.

No mapper or source wrapper code is changed in this task.

---

## MVP Recommendation

MVP recommendation:

- Create no tables or rows in this task.
- Use this document as the checklist for future manual test data setup.
- Start future Supabase test data with facilities, locations, services, and facility-service relationships.
- Add doctor, pharmacy, and diagnostics test rows after the facility read path is stable.
- Keep all test data fictional.
- Keep public pages static until read output is verified.

---

## Risks

Key risks:

- Accidentally using real patient or provider-sensitive data.
- Testing against production data too early.
- Omitting negative test rows.
- Marking sample verification labels as real trust claims.
- Creating public contact rows with real phone or email values.
- Missing hidden/private relationship edge cases.
- Allowing blocked statuses to appear in public reads.
- Designing test rows that do not match mapper DTO needs.
- Removing static fallback too early.

Mitigations:

- Use only clearly fictional records.
- Include both allowed and blocked rows.
- Use reserved domains and fake contacts.
- Review public/private field boundaries before inserting data later.
- Keep static source as default.
- Run RLS negative tests before page wiring.

---

## Recommended Next Development Order

1. Keep current public pages static.
2. Review this test data setup plan with read planning and RLS planning.
3. Confirm test project access and environment handling outside git.
4. Confirm public table schemas.
5. Confirm RLS policy expectations.
6. Create safe fictional facility test rows in a future manual/backend task.
7. Create public location, service, and relationship rows in that future task.
8. Add negative status rows for blocked read testing.
9. Add future read helper code only after test data and RLS are ready.
10. Compare Supabase read output against public DTO expectations.
11. Keep source wrapper static until QA approves the read path.
12. Expand test data to doctors, pharmacies, and diagnostics only after the facility slice is stable.

---

## Summary

The future Supabase test dataset should be small, fictional, and designed to prove both public read success and private/blocked read failure.

This plan defines the rows and statuses needed for facilities, doctors, pharmacies, diagnostics providers, services, specialties, locations, contact channels, and relationship tables. It adds no tables, rows, SQL, migrations, RLS policies, Supabase reads, code changes, backend functionality, authentication, protected routes, or UI changes.
