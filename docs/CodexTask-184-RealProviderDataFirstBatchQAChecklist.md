# Codex Task 184: Real Provider Data First Batch QA Checklist

## Project

DigitalDirectory-v2

## Goal

Create a QA checklist for reviewing the first real provider data batch before any import or replacement work begins.

This task follows:

* CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md
* CodexTask-177-RealProviderDataIntakeTemplateCreation.md
* CodexTask-180-RealProviderDataSpreadsheetTemplateExport.md
* CodexTask-181-RealProviderDataSpreadsheetTemplateQA.md
* CodexTask-182-RealProviderDataFillingGuidance.md
* CodexTask-183-RealProviderDataFirstBatchPreparation.md

This is a documentation-only QA checklist task.

Do not insert, delete, import, or modify real provider data in this task.

---

## Important Context

Task 183 defined the first real-data batch as:

```text
10 providers total:
4 facilities
2 pharmacies
2 diagnostics providers
2 doctors
```

This first batch should be prepared in a copy of the approved Excel template:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

The filled copy should not be imported until QA passes.

---

## Main Objective

Create a first-batch QA checklist that will be used to review the first filled provider spreadsheet before import.

Recommended target file:

```text
docs/CodexTask-184-RealProviderDataFirstBatchQAChecklist.md
```

---

## Required QA Checklist Sections

The checklist should include:

1. File readiness checks.
2. Provider count checks.
3. Required field checks.
4. Slug quality checks.
5. Category and subtype checks.
6. Listing and visibility checks.
7. Verification checks.
8. Contact channel checks.
9. Source tracking checks.
10. Privacy and safety checks.
11. Import readiness decision.
12. Next-step recommendation.

---

## File Readiness Checks

Verify:

```text
The filled file is a copy of the approved template.
The original blank template remains unchanged.
The filled file is clearly named as first-batch draft.
No import has been run.
No test rows have been deleted.
No fallback data has been deleted.
```

Recommended filled file name:

```text
TiruMedicalDirectory_RealProviderDataIntake_FirstBatch_DRAFT.xlsx
```

---

## Provider Count Checks

Verify that the first batch contains:

```text
4 facilities
2 pharmacies
2 diagnostics providers
2 doctors
```

Total:

```text
10 providers
```

If the numbers differ, classify as:

```text
Needs product decision
```

---

## Required Field Checks

For every provider row, verify these minimum fields are filled:

```text
provider_category
display_name
slug
city
area
short_description
services
verification_status
last_confirmed_at
listing_status
visibility_status
source_note
```

Rows missing required fields should not be imported.

---

## Slug QA Checks

Verify every slug:

```text
is lowercase
uses hyphens
has no spaces
has no special characters except hyphen
is unique within provider category
does not include private/internal notes
matches contact channel provider_slug values
```

Examples of acceptable slugs:

```text
bole-family-clinic
addis-specialty-pharmacy
city-diagnostic-imaging-center
dr-example-internal-medicine
```

---

## Category And Subtype Checks

Verify provider category values are one of:

```text
facility
doctor
pharmacy
diagnostic
```

Verify diagnostics provider type values are one of:

```text
laboratory
imaging_center
radiology_center
pathology_service
mixed_diagnostic_center
facility_diagnostic_department
home_sample_collection_provider
```

Verify pharmacy and facility subtypes follow the intake template guidance.

---

## Listing And Visibility Checks

Before import review, recommended first-batch status is:

```text
listing_status = pending
visibility_status = hidden
```

Only use:

```text
listing_status = active
visibility_status = public
```

when the provider row is reviewed and approved for public display.

QA should flag any active/public row that has not been verified.

---

## Verification Checks

Allowed verification statuses:

```text
verified
unverified
pending
disputed
```

QA should verify:

```text
verified rows have last_confirmed_at
verified rows have a reliable source
pending rows are not public
disputed rows are not public
unverified rows are reviewed before publication
```

---

## Contact Channel Checks

Use the `05_Contact_Channels` sheet.

Verify:

```text
each public contact method has one row
provider_category is valid
provider_slug matches an existing provider row
channel_type is valid
is_public is true only for public-approved contacts
private staff numbers are not included
personal doctor numbers are not included unless explicitly approved
unverified WhatsApp numbers are not public
href values are safe and correct where provided
display_order is reasonable
```

Allowed channel types:

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

---

## Source Tracking Checks

Use the `07_Source_Tracking` sheet.

Verify:

```text
each provider has at least one source row
source_type is valid
source_name or source_note is provided
review_status is provided
unknown sources are flagged for correction
provider_slug matches an existing provider row
```

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

---

## Privacy And Safety Checks

Verify:

```text
no private staff phone numbers are included
no private emails are included
no personal doctor contact details are included unless approved
no internal notes appear in public fields
no sensitive patient information is included
no unsupported private data is included
no unverified data is marked active/public
```

---

## Import Readiness Decision

Each first-batch review should end with one of:

```text
Ready for import planning
Needs correction before import planning
Blocked
Needs product decision
```

Recommended default before review:

```text
Needs correction before import planning
```

until every row passes QA.

---

## Recommended Next Task

The recommended next task should be:

```text
Task 185 — Real Provider Data First Batch Review Workflow
```

Purpose:

* Define exactly how the filled first-batch spreadsheet should be reviewed.
* Decide who reviews provider rows, contact rows, source tracking, and visibility.
* Prepare for import planning only after QA passes.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-184-RealProviderDataFirstBatchQAChecklist.md`.
* Document first-batch QA checks.
* Document import readiness decision labels.
* Recommend next task.

Not allowed:

* Do not modify source code.
* Do not modify UI copy.
* Do not delete test data.
* Do not insert real data.
* Do not import spreadsheet data.
* Do not modify SQL, RLS, schema, or migrations.
* Do not modify static data.
* Do not change routes.
* Do not modify probes.
* Do not modify package scripts.
* Do not create Task 185.

---

## Validation

No code validation is required.

Recommended check:

```bash
git status
```

No lint/build is required unless Codex modifies source code, which it must not do.

---

## Acceptance Criteria

* First-batch QA checklist document exists.
* File readiness checks are documented.
* Provider count checks are documented.
* Required field checks are documented.
* Slug QA checks are documented.
* Category/subtype checks are documented.
* Listing/visibility checks are documented.
* Verification checks are documented.
* Contact channel checks are documented.
* Source tracking checks are documented.
* Privacy/safety checks are documented.
* Import readiness decision labels are documented.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No real provider data is inserted.
* Task 185 is not created.

---

## Deliverable

A focused QA checklist for the first real provider data batch.

Do not proceed beyond Task 184.
