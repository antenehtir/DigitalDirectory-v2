# DigitalDirectory-v2 Supabase Test Project Checklist

## Purpose

This document defines a checklist for safely preparing a future Supabase test project before real Supabase integration is added to DigitalDirectory-v2.

It is documentation-only. It does not create a Supabase project, install Supabase packages, add Supabase client code, add real Supabase queries, create `.env` files, add real keys, add SQL, add migrations, add RLS policies, add authentication, add backend functionality, add protected routes, modify public listing behavior, or modify frontend UI.

The goal is to make the first Supabase test environment safe, isolated, and clearly separated from production before any code integration begins.

---

## Core Principle

The first Supabase project used for DigitalDirectory-v2 should be a test project with safe data only.

It should never contain real patient-sensitive information, real verification documents, real payment data, real booking data, private provider records, or production secrets. The test project should exist to validate public listing tables, RLS expectations, seed migration shape, and rollback assumptions before any production backend is considered.

---

## Test Project Purpose

A Supabase test project should help the team:

- Validate the Phase 1 public listing schema.
- Test public read rules without production data.
- Confirm RLS behavior before production.
- Verify safe seed migration patterns.
- Test public listing DTO mapping later.
- Confirm environment variable handling.
- Practice rollback before production rollout.
- Keep experiments away from production data.

The test project should not become the production project by accident.

---

## Why a Test Project Is Needed

A test project is needed because backend mistakes in healthcare discovery can expose sensitive or misleading data.

Reasons:

- Public listing tables need published/unpublished test records.
- RLS needs positive and negative access tests.
- Seed migration should be practiced with mock data first.
- Public/private field separation needs validation.
- Query and DTO mapping needs safe test records.
- Environment variable handling needs practice without production secrets.
- Rollback behavior should be tested before public launch.

Without a test project, the team may be tempted to test against production-like data too early.

---

## Development vs Production Separation

Development and production must stay clearly separated.

Recommended environments:

| Environment | Purpose | Data Rule |
| --- | --- | --- |
| Local | Developer testing | Mock or seed-style data only |
| Test | Supabase project for schema/RLS experiments | Safe test records only |
| Staging | Production-like validation later | Reviewed non-sensitive data |
| Production | Real public product later | Reviewed production data only |

Rules:

- Do not point local development at production during early integration.
- Do not use production service role keys locally.
- Do not seed production with sample records unless explicitly reviewed and approved.
- Do not reuse a test project as production unless the team intentionally promotes it and clears test data.
- Do not connect preview deployments to production writable data.

---

## Supabase Project Creation Checklist

This checklist is for a future manual setup step. Do not create a project in this task.

Future checklist:

1. Confirm the team has approved Supabase test project creation.
2. Confirm the project is for testing only.
3. Choose a non-production project name.
4. Select the appropriate region.
5. Record the project URL outside git.
6. Record the anon key outside git.
7. Store the service role key securely and do not use it in frontend work.
8. Confirm who has Supabase dashboard access.
9. Confirm RLS will be enabled on all tables before any public access.
10. Confirm no real patient or provider-sensitive data will be uploaded.
11. Confirm test data naming clearly marks records as test/mock.
12. Confirm rollback and deletion plan for test records.
13. Confirm secret rotation process if any key is exposed.

Project naming suggestion:

```text
digitaldirectory-v2-test
```

This is a placeholder suggestion, not an instruction executed in this task.

---

## Safe Test Data Rules

Safe test data should be fictional, minimal, and clearly marked.

Allowed test data:

- Mock facility names.
- Mock doctor names.
- Mock pharmacy names.
- Mock diagnostics provider names.
- Mock public locations.
- Mock services and specialties.
- Mock public contact values using reserved examples.
- Published and unpublished examples for RLS testing.
- Hidden, archived, rejected, and duplicate examples for negative tests.

Safe test data examples:

```text
Test Facility Alpha
Dr. Test Provider
Test Pharmacy North
Test Diagnostics Center
```

Rules:

- Use obviously fake names where possible.
- Use reserved domains such as `example.com`.
- Use fake phone numbers that are clearly not real operational contacts.
- Keep descriptions generic.
- Avoid copying real provider private details.
- Avoid any patient-like personal information.

---

## What Not to Upload

Never upload these to a test project:

- Real patient data
- Patient names
- Patient phone numbers
- Patient email addresses
- Patient IDs
- Diagnosis details
- Appointment reasons
- Booking records
- Lab results
- Prescriptions
- Medical documents
- Identity documents
- Wallet balances
- Payment transactions
- Payment methods
- Real provider verification documents
- Private provider contacts
- Admin notes from real cases
- Reviewer notes from real cases
- Production database exports
- Real audit logs
- Real chatbot or community content

Rule:
If data would be harmful or embarrassing if exposed publicly, it does not belong in the test project.

---

## Environment and Key Handling Checklist

Environment and key handling should follow `SupabaseEnvironmentSetupGuide.md`.

Checklist:

1. Use placeholders in documentation.
2. Store real test keys outside git.
3. Do not create `.env.local` in this task.
4. Do not commit `.env.local`, `.env`, or `.env.production`.
5. Do not paste keys into GitHub issues, PRs, comments, screenshots, or logs.
6. Use `NEXT_PUBLIC_SUPABASE_URL` for public project URL later.
7. Use `NEXT_PUBLIC_SUPABASE_ANON_KEY` for anon key later.
8. Never prefix service role key with `NEXT_PUBLIC_`.
9. Keep service role key server-only.
10. Rotate keys if exposed.
11. Confirm preview and production deployment variables stay separate.
12. Confirm build logs do not print secrets.

No real keys are included in this document.

---

## RLS Expectations Before Testing

RLS should be planned before any test table is treated as publicly readable.

Expectations:

- RLS enabled on every table.
- Anonymous users can read only published public-safe rows.
- Anonymous users cannot read draft, hidden, archived, rejected, duplicate, or private rows.
- Anonymous users cannot read request/review/ownership/audit tables.
- Provider-owner-like test roles cannot read unrelated records.
- Reviewer-like test roles can access only assigned mock cases later.
- Service role usage is not part of public read testing.

Plain-language test rule:

```text
If a row is not explicitly public and published, anonymous reads should not see it.
```

No RLS policies are added in this task.

---

## Public Listing Test Row Checklist

Public listing test rows should cover expected and denied cases.

Facilities:

- Published public facility row.
- Draft facility row.
- Hidden facility row.
- Facility with reviewed service.
- Facility with unreviewed service.
- Facility with public contact.
- Facility with private contact.

Doctors:

- Published public doctor row.
- Hidden doctor row.
- Doctor with reviewed facility affiliation.
- Doctor with pending affiliation.
- Doctor with public specialty.

Pharmacies:

- Published public pharmacy row.
- Pharmacy with pickup preview.
- Pharmacy with no inventory.
- Pharmacy with hidden contact.

Diagnostics:

- Published public diagnostics row.
- Diagnostics provider with lab service preview.
- Diagnostics provider with imaging service preview.
- Diagnostics provider with no result data.

Taxonomy:

- Active service.
- Archived service.
- Active specialty.
- Active location.
- Nested location.

Rules:

- Test rows should make it obvious which records should appear and which should not.
- Test rows should not use real private data.
- Test records should be disposable.

---

## Test Table Readiness Checklist

Before using test tables:

1. Table purpose is documented.
2. Public/private fields are identified.
3. Required fields are known.
4. Status fields are included.
5. RLS behavior is planned.
6. Test rows include public and non-public examples.
7. No sensitive fields are needed for public read tests.
8. Relationship tables include reviewed and unreviewed examples.
9. Contact channel examples include public and private examples.
10. Audit/review test tables remain private.
11. Test records are clearly marked as test data.
12. The team knows how to delete or reset test records.

If a table cannot satisfy this checklist, it is not ready for test integration.

---

## No Patient-Sensitive Data Rule

No patient-sensitive data should enter the test project.

This includes:

- Real patients
- Fictional but realistic patient histories
- Symptom narratives that look real
- Appointment reasons
- Diagnoses
- Lab results
- Prescription names tied to a person
- Payment or wallet details
- Family/caregiver records
- Identity documents
- Uploaded files

Reason:
Even fake patient-like data can encourage unsafe patterns if it resembles real protected data.

Test project focus:
Public listings and public taxonomy only.

---

## Rollback Mindset

The test project should support rollback practice.

Rollback questions:

- Can the app return to seed-only data quickly?
- Can one provider type be disconnected from Supabase reads?
- Can test tables be reset without harming production?
- Can bad test records be removed easily?
- Can environment variables be cleared without breaking seed mode?
- Can a failed read integration be reverted without UI redesign?

Rollback rules:

- Keep seed data available.
- Keep first integration slice small.
- Avoid broad refactors.
- Avoid direct component dependence on raw rows.
- Use DTO/mapping boundaries.
- Do not remove existing sample files until production reads are stable.

---

## Readiness Before Installing Supabase Package

Do not install Supabase packages until the following are true:

1. Test project is approved.
2. Test project exists.
3. Environment/key handling is understood.
4. `.env.local` plan is understood but not committed.
5. Public listing schema draft is stable enough for first test.
6. RLS expectations are ready for implementation.
7. Safe test data plan is ready.
8. First read slice is selected.
9. Static seed fallback remains available.
10. Rollback approach is documented.
11. No production data is needed.
12. The team agrees the package installation belongs in a dedicated implementation task.

This task does not install packages.

---

## Relationship to Public Listing Read Implementation Prep

This document supports `PublicListingReadImplementationPrep.md`.

Relationship:

- Implementation prep explains how to transition from seed data to Supabase reads.
- This checklist explains how to prepare the safe test project needed before that transition.
- Implementation prep emphasizes rollback and DTO mapping.
- This checklist emphasizes safe test data, project separation, and RLS expectations.

The test project should be ready before implementation begins.

---

## Relationship to Supabase Environment Setup Guide

This document depends on `SupabaseEnvironmentSetupGuide.md`.

Relationship:

- Environment guide defines variable names and secret handling.
- This checklist applies those rules to a test Supabase project.
- Environment guide separates anon and service role keys.
- This checklist keeps test service role use out of public read work.
- Environment guide says not to commit `.env` files.
- This checklist repeats that no real keys should enter git.

---

## Relationship to Public Listing Schema Draft

This document depends on `PublicListingSchemaDraft.md`.

Relationship:

- Schema draft defines candidate public listing tables.
- This checklist defines safe test rows for those tables.
- Schema draft separates public/private fields.
- This checklist requires public/private field review before testing.
- Schema draft defines status rules.
- This checklist requires published and unpublished test cases.

---

## Relationship to RLS Policy Planning

This document depends on `RLSPolicyPlanning.md`.

Relationship:

- RLS planning defines intended access rules.
- This checklist defines the test project setup needed to validate those rules later.
- RLS planning denies private data by default.
- This checklist requires negative test rows and no patient-sensitive data.
- RLS planning avoids service role for public reads.
- This checklist keeps service role out of public read testing.

---

## MVP Recommendation

Do not create a Supabase test project in this task.

Current MVP stance:

- Keep the app frontend-only.
- Keep static seed data active.
- Do not create Supabase project.
- Do not install Supabase packages.
- Do not add Supabase client code.
- Do not add `.env` files.
- Do not add SQL, migrations, or RLS policies.
- Do not add auth, backend, protected routes, or UI changes.
- Do not modify public listing behavior.

Recommended first future action:
Create a Supabase test project only in a dedicated setup task after this checklist is reviewed and approved.

---

## Risks

Key risks:

- Accidentally using production data for testing.
- Uploading patient-sensitive information.
- Treating test records as verified production listings.
- Mixing test and production environment variables.
- Exposing service role key.
- Testing public reads without RLS.
- Forgetting negative test rows.
- Installing packages before a test project exists.
- Connecting UI to unstable test data.
- Removing seed fallback too early.
- Letting test project drift into production.

Mitigations:

- Keep this task documentation-only.
- Use fake data only.
- Mark test rows clearly.
- Keep environments separate.
- Use no real keys in docs.
- Require RLS before public read testing.
- Preserve seed fallback.
- Use a small first read slice.
- Review this checklist before package installation.

---

## Recommended Next Development Order

1. Review this checklist with the Supabase environment, schema, RLS, and read implementation prep docs.
2. Confirm whether the team is ready to create a Supabase test project.
3. Create the test project only in a dedicated future setup task.
4. Store keys outside git.
5. Prepare safe test data plan.
6. Implement public listing tables and RLS in a later database task.
7. Add published and unpublished test records.
8. Verify RLS with anon and authenticated test contexts.
9. Install Supabase package only in a dedicated implementation task.
10. Add read-only client setup after environment and RLS are ready.
11. Connect one public read surface in staging or development.
12. Keep seed fallback available.
13. Expand to additional public listing reads only after the first slice is stable.

---

## Summary

A Supabase test project should be a safe sandbox for public listing schema and RLS validation, not a production-like store of sensitive healthcare data.

The checklist emphasizes environment separation, fake data only, no patient-sensitive data, key safety, RLS expectations, public listing test rows, rollback mindset, and readiness before package installation.

The recommended current action is documentation only. No Supabase project, packages, client code, queries, `.env` files, SQL, migrations, RLS policies, authentication, backend functionality, protected routes, public listing behavior changes, or frontend UI changes should be added in this task.
