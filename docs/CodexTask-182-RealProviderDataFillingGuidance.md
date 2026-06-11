# Codex Task 182: Real Provider Data Filling Guidance

## Project

DigitalDirectory-v2

## Goal

Create guidance for how the project owner should fill the real provider data intake spreadsheet before any real data import or replacement work begins.

This task follows:

- `docs/CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md`
- `docs/CodexTask-177-RealProviderDataIntakeTemplateCreation.md`
- `docs/CodexTask-178-RealProviderDataIntakeTemplateQA.md`
- `docs/CodexTask-180-RealProviderDataSpreadsheetTemplateExport.md`
- `docs/CodexTask-181-RealProviderDataSpreadsheetTemplateQA.md`
- `docs/data-intake/RealProviderDataIntakeTemplate.md`
- `docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx`

This is a documentation-only guidance task. No real provider data was inserted.

---

## Guidance Status

```text
Real provider data filling guidance complete.
```

The Task 180 workbook exists and Task 181 QA passed. The project owner can use this guidance to prepare a small, reviewable first batch of real provider rows in the approved spreadsheet template.

Workbook to fill in a future task:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Do not fill or import real data as part of Task 182.

---

## Recommended First-Batch Size

Recommended first batch:

```text
10 providers total
```

Recommended mix:

| Category | Count | Reason |
| --- | ---: | --- |
| Facilities | 4 | Facilities are the directory anchor and help test core listing/detail fields. |
| Pharmacies | 2 | Pharmacy listing/detail/contact paths are ready for focused review. |
| Diagnostics | 2 | Diagnostics listing/detail/contact paths are ready, but claims must be verified carefully. |
| Doctors | 2 | Doctor rows are useful for coverage, but require more privacy and affiliation review. |

Why keep the first batch small:

- Easier to review manually.
- Easier to catch slug, status, source, and contact issues.
- Safer than bulk-filling hundreds of rows before import QA.
- Enough category coverage to test provider sheets, contact channels, source tracking, and import QA.

If the project owner wants an even slower first pass, use:

```text
5 providers total
```

with at least one facility, one pharmacy, one diagnostics provider, and one doctor.

---

## Provider Category Priority

Recommended filling order:

| Priority | Category | Guidance |
| --- | --- | --- |
| 1 | Facilities | Fill first because facilities are the core directory records and may later connect to doctors, pharmacies, and diagnostics. |
| 2 | Pharmacies | Fill next because pharmacy records are simpler and good for validating public contact channels. |
| 3 | Diagnostics | Fill third because diagnostics records are important, but service claims, home collection, turnaround, and provider type require careful verification. |
| 4 | Doctors | Fill after the first facility/pharmacy/diagnostics pass because doctor data requires extra privacy, schedule, specialty, and affiliation review. |

Do not add new provider categories during the first batch.

---

## Minimum Required Fields Before Review

Before a row is submitted for review, each provider row should include at minimum:

| Field | Requirement |
| --- | --- |
| `provider_category` | Required |
| `display_name` | Required |
| `slug` | Required |
| `city` | Required |
| `area` | Recommended before review |
| `short_description` | Recommended before review |
| Category-specific type field | Required where present, such as `facility_type`, `pharmacy_type`, or `diagnostic_provider_type` |
| Services field | Recommended before review, such as `services` or `services_public` |
| `verification_status` | Required |
| `last_confirmed_at` | Required before marking verified |
| `listing_status` | Required |
| `visibility_status` | Required |
| `source_note` | Recommended |
| `internal_review_note` | Recommended when anything is uncertain |

Use this default status set for first-batch rows:

```text
verification_status = pending
listing_status = pending
visibility_status = hidden
```

Use this only after review and owner approval:

```text
verification_status = verified
listing_status = active
visibility_status = public
```

Do not mark rows `active` and `public` just because the row is complete. Public display should wait for verification and approval.

---

## Category-Specific Filling Notes

### Facilities

Fill the `01_Facilities` sheet.

Minimum review-ready fields:

```text
provider_category
display_name
slug
facility_type
city
area
short_description
services
verification_status
listing_status
visibility_status
source_note
```

Use `unknown` for optional claims that are not verified, such as emergency availability, inpatient availability, diagnostics availability, pharmacy availability, walk-in availability, and home service availability.

### Doctors

Fill the `02_Doctors` sheet.

Minimum review-ready fields:

```text
provider_category
display_name
slug
doctor_name
specialty
city
area
verification_status
listing_status
visibility_status
source_note
```

Do not include private personal phone numbers, private addresses, documents, credentials, or schedule claims unless approved for public display.

### Pharmacies

Fill the `03_Pharmacies` sheet.

Minimum review-ready fields:

```text
provider_category
display_name
slug
pharmacy_type
city
area
short_description
services
verification_status
listing_status
visibility_status
source_note
```

Use `unknown` for delivery, pickup, walk-in, and home-service fields unless confirmed.

### Diagnostics

Fill the `04_Diagnostics` sheet.

Minimum review-ready fields:

```text
provider_category
display_name
slug
diagnostic_provider_type
category
city
area
short_description
services_public
verification_status
listing_status
visibility_status
source_note
```

Do not publish test availability, pricing, result turnaround, booking, upload, or home collection claims unless verified and maintainable.

---

## Contact Channel Filling Guidance

Fill the `05_Contact_Channels` sheet only with contact details approved for review.

Use one row per public contact method.

Example pattern only:

```text
One provider with one phone number and one website should have two contact-channel rows.
```

Minimum contact-channel fields before review:

```text
provider_category
provider_slug
channel_type
label
value
is_public
verification_status
last_confirmed_at
source_note
internal_review_note
```

Contact guidance:

- `provider_slug` must exactly match the provider row slug.
- Use `is_public = false` until the contact detail is approved for public display.
- Use `verification_status = pending` until the contact detail is confirmed.
- Keep private or staff-only contact details out of public fields.
- Do not include unverified WhatsApp numbers, personal doctor numbers, private staff emails, internal extensions, payment links, upload links, or booking links unless explicitly approved.
- Use `internal_review_note` to flag uncertainty.

Allowed contact-channel categories should match the workbook allowed values. Diagnostics contact rows should follow the workbook's contact-channel guidance for diagnostics.

---

## Slug Guidance

Every provider row needs a stable slug before review.

Slug rules:

```text
lowercase only
hyphen-separated
ASCII letters and numbers only, plus hyphen
no spaces
no underscores
no special characters except hyphen
no leading or trailing hyphen
no consecutive hyphens
unique within provider category
stable after publication
```

Format examples only:

```text
example-general-hospital
example-community-pharmacy
example-diagnostic-center
dr-example-name
```

Do not include:

```text
verification status
listing status
private notes
internal review comments
temporary labels
```

If two providers would have the same slug, add a stable public-safe area or category suffix.

---

## Verification Guidance

Use verification statuses conservatively.

| Status | Use when |
| --- | --- |
| `pending` | The row is waiting for review. Recommended default for first-batch rows. |
| `unverified` | The information was collected but not confirmed. |
| `verified` | The information was confirmed by an approved source and has a confirmation date. |
| `disputed` | Sources conflict or the project owner needs to resolve accuracy. |
| `expired` | Previously confirmed information is stale and needs reconfirmation. |

Before marking `verified`, confirm:

- public name is correct
- provider category is correct
- location fields are public-safe
- public contact details are approved
- services and availability claims are verified
- `last_confirmed_at` is filled using `YYYY-MM-DD`
- source tracking exists

Use `internal_review_note` or the `06_Verification_Notes` sheet for unresolved questions.

---

## Source Tracking Guidance

Fill the `07_Source_Tracking` sheet for every provider row before import QA.

Minimum source-tracking fields:

```text
provider_category
provider_slug
source_type
source_name
source_date
review_status
review_note
```

Recommended source types:

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

Source tracking rules:

- Use one source row per meaningful source.
- Use `source_url` only for public web sources.
- Use `source_date` in `YYYY-MM-DD` format.
- Use `unknown` rather than guessing.
- Keep reviewer names, collector notes, and uncertainty in internal fields only.
- Do not treat source tracking as import approval by itself.

---

## Import QA Guidance

Use `08_Import_QA_Checklist` before any future import or replacement task.

The first batch should pass these checks before import planning:

| QA check | Requirement |
| --- | --- |
| No duplicate slugs | Required |
| All required display names are present | Required |
| All provider categories are valid | Required |
| All `listing_status` values are valid | Required |
| All `visibility_status` values are valid | Required |
| No private staff contact details are included | Required |
| All public contact details are approved | Required |
| Active/public rows have minimum location information | Required |
| Verified rows have `last_confirmed_at` | Required |
| Diagnostics provider types match approved values | Required |
| Contact-channel slugs match provider rows | Required |
| Hidden/internal rows will not appear publicly | Required |
| Pending rows are not imported as public active listings | Required |
| Source tracking exists for each provider row | Required |

Recommended first-batch QA workflow:

1. Fill provider rows.
2. Fill contact-channel rows.
3. Fill verification notes when needed.
4. Fill source tracking.
5. Run the import QA checklist.
6. Keep rows `pending` and `hidden` until review passes.
7. Prepare a future first-batch preparation record before any import.

---

## What Not To Do Yet

Do not do any of the following in Task 182 or before a future approved import task:

```text
Do not import real data yet.
Do not insert real provider data into source code.
Do not delete diagnostics test rows yet.
Do not delete fallback data yet.
Do not remove QA fixtures yet.
Do not bulk-fill hundreds of rows before the first QA batch.
Do not include private contact details.
Do not mark unverified rows as public active listings.
Do not modify SQL, RLS, schema, or migrations.
Do not modify static data.
Do not change routes, probes, or package scripts.
```

The spreadsheet should remain a controlled preparation artifact until a future task explicitly approves first-batch data entry and review.

---

## Recommended Next Task

Recommended next task:

```text
Task 183 - Real Provider Data First Batch Preparation
```

Purpose:

- Prepare the first small real provider batch in the approved Excel template.
- Keep the batch to approximately 10 providers total.
- Include provider rows, contact channels, verification notes, source tracking, and import QA checklist preparation.
- Do not import data yet.

Task 183 was not created as part of this task.

---

## Scope Confirmation

For Task 182:

- Only `docs/CodexTask-182-RealProviderDataFillingGuidance.md` was updated.
- No source code was modified.
- No UI copy was modified.
- No test data was deleted.
- No real provider data was inserted.
- No SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No static data was modified.
- No routes were changed.
- No probes were modified.
- No package scripts were modified.
- Task 183 was not created.

---

## Guidance Summary

The project owner should fill a small first batch of about 10 providers, starting with facilities and then pharmacies, diagnostics, and doctors. Rows should default to `pending` and `hidden` until verification and review pass. Contact channels, source tracking, verification notes, and import QA should be completed before any future import planning. No real provider data was added in this task.
