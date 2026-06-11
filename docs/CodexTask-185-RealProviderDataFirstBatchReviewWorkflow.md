# Codex Task 185: Real Provider Data First Batch Review Workflow

## Project

DigitalDirectory-v2

## Goal

Create a review workflow for the first real provider data batch before any import or replacement work begins.

This task follows:

- `docs/CodexTask-182-RealProviderDataFillingGuidance.md`
- `docs/CodexTask-183-RealProviderDataFirstBatchPreparation.md`
- `docs/CodexTask-184-RealProviderDataFirstBatchQAChecklist.md`
- `docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx`

This is a documentation-only review workflow task. No real provider data was inserted, imported, deleted, or modified.

---

## Workflow Status

```text
Real provider data first-batch review workflow complete.
```

This workflow defines how a future filled first-batch workbook should be reviewed. It does not authorize import, source-code changes, SQL changes, migration changes, static-data replacement, route changes, probe changes, package-script changes, or deletion of test/fallback/QA data.

---

## First-Batch Context

Approved template path:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Expected filled draft file name for a future data-entry task:

```text
TiruMedicalDirectory_RealProviderDataIntake_FirstBatch_DRAFT.xlsx
```

Expected first batch:

```text
10 providers total
4 facilities
2 pharmacies
2 diagnostics providers
2 doctors
```

Review should use the Task 184 checklist before any import-planning decision is made.

---

## Review Stages

The first-batch review workflow includes these stages:

| Stage | Review area | Outcome |
| --- | --- | --- |
| 1 | File intake check | Confirm the submitted file is reviewable. |
| 2 | Provider row review | Confirm provider rows are complete and category-safe. |
| 3 | Contact channel review | Confirm contact rows are public-safe and linked correctly. |
| 4 | Source tracking review | Confirm every provider has source context. |
| 5 | Verification review | Confirm verification status and confirmation dates are valid. |
| 6 | Privacy and safety review | Confirm no private or sensitive information is exposed. |
| 7 | Public visibility review | Confirm listing/visibility statuses are safe. |
| 8 | Import readiness decision | Assign one decision label. |
| 9 | Correction loop | Resolve issues without importing data. |
| 10 | Import planning readiness | Prepare import planning only after review passes. |

---

## Stage 1: File Intake Check

Reviewer goal:

```text
Confirm the filled workbook is ready for review and no project files or data were changed outside the spreadsheet.
```

Checks:

- The filled file is a copy of the approved template.
- The original blank template remains unchanged.
- The file name clearly indicates first-batch draft status.
- The file contains the expected workbook sheets.
- No import has been run.
- No test rows have been deleted.
- No fallback data has been deleted.
- No QA fixtures have been removed.
- No source code, SQL, RLS, schema, migrations, static data, routes, probes, or package scripts were modified.

If file intake fails, assign:

```text
Needs correction before import planning
```

or:

```text
Blocked
```

if privacy, import, deletion, or database changes occurred.

---

## Stage 2: Provider Row Review

Review these sheets:

```text
01_Facilities
02_Doctors
03_Pharmacies
04_Diagnostics
```

Expected counts:

| Category | Expected count |
| --- | ---: |
| Facilities | 4 |
| Pharmacies | 2 |
| Diagnostics providers | 2 |
| Doctors | 2 |
| Total providers | 10 |

Provider row checks:

- Count non-template rows only.
- Confirm `provider_category` matches the sheet/category.
- Confirm `display_name` is present and public-safe.
- Confirm `slug` is present and passes slug rules.
- Confirm `city` is present.
- Confirm `area` is present or flagged for review.
- Confirm `short_description` is public-safe and does not overclaim.
- Confirm category-specific type fields are present where required.
- Confirm services fields are public-safe and reviewable.
- Confirm `verification_status`, `listing_status`, and `visibility_status` use allowed values.
- Confirm `source_note` or source tracking exists.
- Confirm `internal_review_note` does not appear in public fields.

If provider rows are incomplete, assign:

```text
Needs correction before import planning
```

If category mix differs from the approved first-batch plan, assign:

```text
Needs product decision
```

---

## Stage 3: Contact Channel Review

Review this sheet:

```text
05_Contact_Channels
```

Contact channel checks:

- Each contact method uses one row.
- `provider_category` is valid.
- `provider_slug` matches an existing provider row.
- `channel_type` is valid.
- `label` is public-safe.
- `value` is public-safe if marked public.
- `href` is safe and correct where provided.
- `is_public = true` only for approved public contacts.
- Contact-level `verification_status` is present.
- `last_confirmed_at` is present for verified contacts.
- Private staff phone numbers are not included.
- Private staff emails are not included.
- Personal doctor numbers are excluded unless explicitly approved.
- Unverified WhatsApp numbers are not public.
- Booking, payment, upload, and appointment links are excluded unless workflow ownership is approved.
- `display_order` is numeric or reasonable where provided.

If private or unapproved public contact data appears, assign:

```text
Blocked
```

If contact rows need ordinary cleanup, assign:

```text
Needs correction before import planning
```

---

## Stage 4: Source Tracking Review

Review this sheet:

```text
07_Source_Tracking
```

Source tracking checks:

- Every provider has at least one source row.
- `provider_category` is valid.
- `provider_slug` matches an existing provider row.
- `source_type` is valid.
- `source_name` or clear source context is present.
- `source_date` uses `YYYY-MM-DD` where provided.
- `review_status` is present.
- Unknown sources are flagged for correction/review.
- Source notes do not contain private data intended for public fields.
- Source tracking does not claim import approval by itself.

If source tracking is missing or weak, assign:

```text
Needs correction before import planning
```

If provider identity or source reliability is unclear, assign:

```text
Blocked
```

---

## Stage 5: Verification Review

Review this sheet and provider/contact verification fields:

```text
06_Verification_Notes
```

Verification checks:

- Every provider row has `verification_status`.
- Contact rows have contact-level verification status.
- Allowed verification values are used.
- `verified` rows have `last_confirmed_at`.
- `last_confirmed_at` uses `YYYY-MM-DD`.
- Verified rows have source tracking.
- Pending rows are not public-ready.
- Disputed rows are not public-ready.
- Expired rows are not public-ready without reconfirmation.
- Verification notes exist for unresolved questions where needed.

Allowed verification decision states:

```text
pending
unverified
verified
disputed
expired
```

If verification support is missing, assign:

```text
Needs correction before import planning
```

If a row is marked verified without credible support, assign:

```text
Blocked
```

---

## Stage 6: Privacy And Safety Review

Privacy and safety checks:

- No private staff phone numbers are included.
- No private staff emails are included.
- No personal doctor contact details are included unless approved.
- No patient information is included.
- No credentials, passwords, API keys, or tokens are included.
- No private addresses are included in public fields.
- No internal notes appear in public fields.
- No unsupported claims appear in public descriptions.
- No unverified availability, pricing, turnaround, booking, upload, or home-service claims are marked public-ready.
- No unverified data is marked active/public.
- No test, fallback, or QA fixture data was deleted.

If a privacy or safety issue appears, assign:

```text
Blocked
```

until removed or explicitly approved for public display.

---

## Stage 7: Public Visibility Review

Safe default before review passes:

```text
listing_status = pending
visibility_status = hidden
```

Public-ready status only after verification and owner approval:

```text
listing_status = active
visibility_status = public
```

Public visibility checks:

- All `listing_status` values are allowed.
- All `visibility_status` values are allowed.
- Pending rows are not treated as public-ready.
- Hidden/internal rows are not public-ready.
- Active/public rows have full minimum public-safe data.
- Active/public rows have source tracking.
- Active/public rows have verification review.
- Active/public rows have safe public contact review.
- No unverified row is marked active/public.

If an unreviewed row is active/public, assign:

```text
Blocked
```

until corrected or explicitly approved.

---

## Stage 8: Import Readiness Decision

Every review must end with exactly one decision label:

| Decision label | Meaning | Allowed next step |
| --- | --- | --- |
| `Ready for import planning` | Required fields, slugs, contact channels, source tracking, verification, privacy, and visibility checks are acceptable. | Prepare a future import-planning task only; do not import yet. |
| `Needs correction before import planning` | Fixable spreadsheet issues remain. | Correct the filled workbook and re-run review. |
| `Blocked` | Privacy, safety, source reliability, identity, public-readiness, deletion, or import-risk issue prevents progress. | Stop until blocker is resolved. |
| `Needs product decision` | Category mix, subtype, visibility, inclusion, or public-contact decision needs owner/product judgment. | Get decision before continuing. |

Recommended default before review:

```text
Needs correction before import planning
```

No decision label authorizes import by itself.

---

## Stage 9: Correction Loop

Use the correction loop when the decision is:

```text
Needs correction before import planning
```

or:

```text
Needs product decision
```

Correction workflow:

1. Record each issue in the review notes or spreadsheet review fields.
2. Group issues by provider rows, contact rows, source tracking, verification, privacy, or visibility.
3. Return the filled draft workbook to the project owner or assigned reviewer.
4. Keep the original blank template unchanged.
5. Do not import spreadsheet data.
6. Do not change source code, SQL, RLS, schema, migrations, static data, routes, probes, or package scripts.
7. Correct the filled draft workbook in a future approved data-entry/review task.
8. Re-run the Task 184 checklist.
9. Re-run this workflow after corrections.

If the decision is:

```text
Blocked
```

pause review until the blocker is removed or the project owner gives an explicit safe path forward.

---

## Stage 10: Import Planning Readiness

Only after the review decision is:

```text
Ready for import planning
```

should the project prepare a future import-planning task.

Import planning should still not import data immediately. It should define:

- target tables or target data structures
- field mappings from workbook sheets
- contact-channel mapping
- source-tracking mapping
- verification/status mapping
- dry-run or staging approach
- rollback approach
- RLS and public-read expectations
- post-import QA checks
- how test, fallback, and QA fixture data will remain protected until replacement is approved

Import planning readiness is not import approval.

---

## What Not To Do Yet

Do not do any of the following in Task 185:

```text
Do not insert real provider data.
Do not import spreadsheet data.
Do not modify source code.
Do not modify UI copy.
Do not delete diagnostics test rows.
Do not delete fallback data.
Do not remove QA fixtures.
Do not commit a filled real-data spreadsheet unless approved.
Do not mark unverified rows as active/public.
Do not bulk-import rows before first-batch QA passes.
Do not modify SQL, RLS, schema, or migrations.
Do not modify static data.
Do not change routes.
Do not modify probes.
Do not modify package scripts.
Do not create Task 186.
```

---

## Recommended Next Task

Recommended next task:

```text
Task 186 - Real Provider Data First Batch Review QA Record
```

Purpose:

- Create a record format for reviewing the actual filled first-batch spreadsheet.
- Capture review outcome, issues, corrections needed, blockers, product decisions, and import-planning readiness.
- Continue avoiding import until review passes and a future import-planning task is approved.

Task 186 was not created as part of this task.

---

## Scope Confirmation

For Task 185:

- Only `docs/CodexTask-185-RealProviderDataFirstBatchReviewWorkflow.md` was updated.
- The Excel workbook template was referenced but not modified.
- No source code was modified.
- No UI copy was modified.
- No test data was deleted.
- No real provider data was inserted.
- No spreadsheet data was imported.
- No SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No static data was modified.
- No routes were changed.
- No probes were modified.
- No package scripts were modified.
- Task 186 was not created.

---

## Workflow Summary

Task 185 defines a first-batch review workflow covering file intake, provider rows, contact channels, source tracking, verification, privacy/safety, public visibility, decision labels, correction loops, and import-planning readiness. The workflow includes no real provider data and does not authorize import.
