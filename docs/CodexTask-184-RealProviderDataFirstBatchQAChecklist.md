# Codex Task 184: Real Provider Data First Batch QA Checklist

## Project

DigitalDirectory-v2

## Goal

Create a QA checklist for reviewing the first real provider data batch before any import or replacement work begins.

This task follows:

- `docs/CodexTask-182-RealProviderDataFillingGuidance.md`
- `docs/CodexTask-183-RealProviderDataFirstBatchPreparation.md`
- `docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx`

This is a documentation-only QA checklist task. No real provider data was inserted, imported, deleted, or modified.

---

## Checklist Status

```text
Real provider data first-batch QA checklist complete.
```

This checklist is intended for a future review of the first filled provider spreadsheet. It does not authorize data import, source-code changes, database changes, SQL execution, migration changes, static-data replacement, route changes, probe changes, or package-script changes.

---

## Workbook Context

Approved template path:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Expected first-batch draft file name for a future data-entry task:

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

The filled first-batch workbook should be a copy of the approved template. The original blank template should remain unchanged.

---

## File Readiness Checks

| Check | Required | Pass criteria |
| --- | --- | --- |
| Filled workbook is a copy of the approved template | Yes | The original template remains blank and unchanged. |
| Filled workbook name is clearly marked as first-batch draft | Yes | Name should indicate first batch and draft status. |
| Workbook includes the expected 10 sheets | Yes | Sheets match the approved template structure. |
| No import has been run | Yes | Spreadsheet data has not been imported into any app/database layer. |
| No test rows were deleted | Yes | Existing QA/test rows remain untouched. |
| No fallback data was deleted | Yes | Fallback/static safety data remains untouched. |
| No source code was modified | Yes | Review is limited to spreadsheet QA. |
| No SQL/RLS/schema/migration files were modified | Yes | No database-structure change occurred. |

Decision if failed:

```text
Needs correction before import planning
```

---

## Provider Count Checks

Expected first-batch count:

| Provider category | Required count | Sheet |
| --- | ---: | --- |
| Facilities | 4 | `01_Facilities` |
| Pharmacies | 2 | `03_Pharmacies` |
| Diagnostics providers | 2 | `04_Diagnostics` |
| Doctors | 2 | `02_Doctors` |
| Total providers | 10 | Provider sheets combined |

QA checks:

- Count non-template provider rows only.
- Exclude example/template guidance rows.
- Confirm no extra categories were added.
- Confirm category count differences are intentional and approved.

Decision if counts differ:

```text
Needs product decision
```

---

## Required Field Checks

For every provider row, verify these fields are present before import planning:

| Field | Required | Notes |
| --- | --- | --- |
| `provider_category` | Yes | Must match the provider sheet/category. |
| `display_name` | Yes | Public-safe name only. |
| `slug` | Yes | Must pass slug quality checks. |
| `city` | Yes | Public-safe city. |
| `area` | Recommended | Required before public display if needed for trust/location clarity. |
| `short_description` | Recommended | Must avoid unverified claims. |
| Category-specific type field | Yes where present | `facility_type`, `pharmacy_type`, or `diagnostic_provider_type`. |
| Services field | Recommended | `services` or `services_public`, depending on sheet. |
| `verification_status` | Yes | Must use an allowed value. |
| `last_confirmed_at` | Required when verified | Use `YYYY-MM-DD`. |
| `listing_status` | Yes | Must use an allowed value. |
| `visibility_status` | Yes | Must use an allowed value. |
| `source_note` | Recommended | Internal source summary. |
| `internal_review_note` | Recommended when uncertain | Must stay internal. |

Rows missing required fields should be labeled:

```text
Needs correction before import planning
```

---

## Slug Quality Checks

Every provider slug must satisfy:

| Slug check | Required |
| --- | --- |
| Lowercase only | Yes |
| Hyphen-separated | Yes |
| ASCII letters and numbers only, plus hyphen | Yes |
| No spaces | Yes |
| No underscores | Yes |
| No special characters except hyphen | Yes |
| No leading or trailing hyphen | Yes |
| No consecutive hyphens | Yes |
| Unique within provider category | Yes |
| Stable and public-safe | Yes |
| Does not contain status labels | Yes |
| Does not contain private/internal notes | Yes |
| Matches contact-channel `provider_slug` references | Yes |

Recommended slug pattern:

```text
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Template-only slug examples:

```text
example-general-hospital
example-community-pharmacy
example-diagnostic-center
dr-example-name
```

Decision if failed:

```text
Needs correction before import planning
```

---

## Category And Subtype Checks

Provider category checks:

| Sheet | Expected `provider_category` |
| --- | --- |
| `01_Facilities` | `facility` |
| `02_Doctors` | `doctor` |
| `03_Pharmacies` | `pharmacy` |
| `04_Diagnostics` | Follow workbook/template diagnostics guidance |

Category and subtype QA:

- Facility rows must use an approved or reviewable `facility_type`.
- Pharmacy rows must use an approved or reviewable `pharmacy_type`.
- Diagnostics rows must use an approved `diagnostic_provider_type`.
- Doctor rows must include a public-safe `specialty`.
- Do not add new provider categories during the first batch.
- Do not use service labels as provider types.

Diagnostics provider type values to verify:

```text
laboratory
imaging_center
radiology_center
pathology_service
mixed_diagnostic_center
facility_diagnostic_department
home_sample_collection_provider
```

Decision if unsupported subtype appears:

```text
Needs correction before import planning
```

or, if the subtype is intentionally new:

```text
Needs product decision
```

---

## Listing And Visibility Checks

Default first-batch values before QA passes:

```text
listing_status = pending
visibility_status = hidden
```

Public-ready values only after verification and owner approval:

```text
listing_status = active
visibility_status = public
```

QA checks:

| Check | Required |
| --- | --- |
| All `listing_status` values are allowed | Yes |
| All `visibility_status` values are allowed | Yes |
| Pending rows are not treated as public-ready | Yes |
| Hidden/internal rows are not public-ready | Yes |
| Active/public rows have full minimum public-safe data | Yes |
| Active/public rows are verified or explicitly approved | Yes |
| No unverified row is marked active/public | Yes |

Decision if an unreviewed row is active/public:

```text
Blocked
```

until corrected or approved.

---

## Verification Checks

Allowed verification status values:

```text
pending
unverified
verified
disputed
expired
```

QA checks:

| Check | Required |
| --- | --- |
| Every provider row has `verification_status` | Yes |
| Every public contact row has contact-level verification status | Yes |
| `verified` rows have `last_confirmed_at` | Yes |
| `last_confirmed_at` uses `YYYY-MM-DD` | Yes |
| Verified rows have source tracking | Yes |
| Pending rows are not public-ready | Yes |
| Disputed rows are not public-ready | Yes |
| Expired rows are not public-ready without reconfirmation | Yes |
| Verification notes are present for unresolved questions | Recommended |

Decision if verification support is missing:

```text
Needs correction before import planning
```

---

## Contact Channel Checks

Use `05_Contact_Channels`.

Required checks:

| Check | Required |
| --- | --- |
| Each contact method uses one row | Yes |
| `provider_category` is valid | Yes |
| `provider_slug` matches an existing provider row | Yes |
| `channel_type` is valid | Yes |
| `label` is public-safe | Yes |
| `value` is public-safe if marked public | Yes |
| `href` is safe and correct where provided | Yes |
| `is_public = true` only for approved public contacts | Yes |
| Private staff numbers are not included | Yes |
| Private emails are not included | Yes |
| Personal doctor numbers are excluded unless explicitly approved | Yes |
| Unverified WhatsApp numbers are not public | Yes |
| Booking/payment/upload links are excluded unless workflow ownership is approved | Yes |
| `display_order` is numeric/reasonable where provided | Recommended |
| Contact row has source or review note | Recommended |

Allowed channel types to check:

```text
phone
whatsapp
email
website
map
booking
telegram
facebook
instagram
linkedin
```

Decision if private or unapproved public contact data appears:

```text
Blocked
```

until corrected.

---

## Source Tracking Checks

Use `07_Source_Tracking`.

Required checks:

| Check | Required |
| --- | --- |
| Every provider has at least one source row | Yes |
| `provider_category` is valid | Yes |
| `provider_slug` matches an existing provider row | Yes |
| `source_type` is valid | Yes |
| `source_name` or source context is provided | Recommended |
| `source_date` uses `YYYY-MM-DD` where present | Yes |
| `review_status` is present | Yes |
| Unknown sources are flagged for correction/review | Yes |
| Source notes do not contain public-field private data | Yes |

Allowed source types:

```text
provider_submitted
phone_verified
official_website
social_media
public_directory
field_visit
internal_staff_confirmation
unknown
```

Decision if source tracking is missing:

```text
Needs correction before import planning
```

---

## Privacy And Safety Checks

Required privacy/safety checks:

| Check | Required |
| --- | --- |
| No private staff phone numbers are included | Yes |
| No private staff emails are included | Yes |
| No personal doctor contact details are included unless approved | Yes |
| No patient information is included | Yes |
| No credentials, passwords, API keys, or tokens are included | Yes |
| No private addresses are included in public fields | Yes |
| No internal notes appear in public fields | Yes |
| No unsupported claims appear in public descriptions | Yes |
| No unverified availability/pricing/turnaround claims are marked public-ready | Yes |
| No unverified data is marked active/public | Yes |
| No test, fallback, or QA fixture data was deleted | Yes |

Decision if a privacy or safety issue appears:

```text
Blocked
```

until removed or explicitly approved for public display.

---

## Import Readiness Decision Labels

Every first-batch QA review should end with exactly one decision label:

| Decision label | Meaning | Allowed next step |
| --- | --- | --- |
| `Ready for import planning` | Required fields, privacy checks, status checks, contact checks, verification, and source tracking are acceptable. | Prepare a future import-planning task only; do not import yet. |
| `Needs correction before import planning` | Fixable field, slug, status, contact, source, or formatting issues remain. | Correct the filled workbook and re-run QA. |
| `Blocked` | A privacy, safety, missing-source, or public-readiness risk prevents review progress. | Stop until the blocker is resolved. |
| `Needs product decision` | The batch differs from the expected plan or requires owner/product judgment. | Get project-owner decision before continuing. |

Recommended default before review:

```text
Needs correction before import planning
```

No decision label authorizes import by itself.

---

## What Not To Do Yet

Do not do any of the following in Task 184:

```text
Do not insert real provider data.
Do not import spreadsheet data.
Do not modify source code.
Do not modify UI copy.
Do not delete diagnostics test rows.
Do not delete fallback data.
Do not remove QA fixtures.
Do not modify SQL, RLS, schema, or migrations.
Do not modify static data.
Do not change routes.
Do not modify probes.
Do not modify package scripts.
Do not create Task 185.
```

The first batch should remain a review artifact until a future review workflow and import-planning task explicitly approve the next step.

---

## Recommended Next Task

Recommended next task:

```text
Task 185 - Real Provider Data First Batch Review Workflow
```

Purpose:

- Define how the filled first-batch spreadsheet should be reviewed.
- Assign review responsibilities for provider rows, contact rows, source tracking, privacy, and visibility.
- Define the review sequence and sign-off points.
- Prepare for import planning only after QA passes.

Task 185 was not created as part of this task.

---

## Scope Confirmation

For Task 184:

- Only `docs/CodexTask-184-RealProviderDataFirstBatchQAChecklist.md` was updated.
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
- Task 185 was not created.

---

## Checklist Summary

Task 184 defines the first-batch QA checklist for file readiness, provider counts, required fields, slug quality, category/subtype values, listing/visibility status, verification, contact channels, source tracking, privacy/safety, and import-readiness decisions. The checklist includes no real provider data and does not authorize import.
