# Codex Task 179: Real Provider Data Spreadsheet Export Planning

## Project

DigitalDirectory-v2

## Goal

Create a planning document for exporting the real provider data intake template into spreadsheet-ready files.

This task follows:

* CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md
* CodexTask-177-RealProviderDataIntakeTemplateCreation.md
* CodexTask-178-RealProviderDataIntakeTemplateQA.md

This is a planning-only task.

Do not create Excel or CSV files yet.

Do not insert, delete, import, or modify real provider data in this task.

---

## Important Context

Task 177 created:

```text
docs/data-intake/RealProviderDataIntakeTemplate.md
```

Task 178 verified the intake template and marked QA status as:

```text
Passed
```

The next step is to plan how to export that markdown template into practical spreadsheet files the project owner can fill outside the codebase.

---

## Main Objective

Create a spreadsheet export planning record that defines:

1. Recommended spreadsheet workbook structure.
2. Recommended sheet/tab names.
3. Column order for each sheet.
4. Required versus optional fields.
5. Allowed values and validation guidance.
6. CSV export option.
7. File naming convention.
8. Review workflow before import.
9. Recommended next task.

Recommended target file:

```text
docs/CodexTask-179-RealProviderDataSpreadsheetExportPlanning.md
```

---

## Recommended Spreadsheet Workbook

Recommended workbook name:

```text
TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Recommended export folder:

```text
docs/data-intake/exports/
```

The workbook should contain these sheets:

```text
01_Facilities
02_Doctors
03_Pharmacies
04_Diagnostics
05_Contact_Channels
06_Verification_Notes
07_Source_Tracking
08_Import_QA_Checklist
09_Allowed_Values
10_Instructions
```

---

## Sheet 01: Facilities

Recommended columns:

```text
provider_category
provider_subtype
display_name
slug
facility_type
ownership_type
city
area
public_address
public_landmark
short_description
specialties
services
emergency_available
inpatient_available
outpatient_available
diagnostics_available
pharmacy_available
opening_hours
appointment_required
walk_in_available
home_service_available
verification_status
last_confirmed_at
listing_status
visibility_status
source_note
internal_review_note
```

Default provider category:

```text
facility
```

---

## Sheet 02: Doctors

Recommended columns:

```text
provider_category
display_name
slug
doctor_name
professional_title
specialty
subspecialty
facility_affiliation
city
area
consultation_modes
languages
schedule_public
accepts_online_consultation
accepts_in_person_consultation
short_description
services
verification_status
last_confirmed_at
listing_status
visibility_status
source_note
internal_review_note
```

Default provider category:

```text
doctor
```

---

## Sheet 03: Pharmacies

Recommended columns:

```text
provider_category
provider_subtype
display_name
slug
pharmacy_type
city
area
public_address
public_landmark
short_description
services
delivery_available
pickup_available
prescription_required_note
opening_hours
appointment_required
walk_in_available
home_service_available
verification_status
last_confirmed_at
listing_status
visibility_status
source_note
internal_review_note
```

Default provider category:

```text
pharmacy
```

---

## Sheet 04: Diagnostics

Recommended columns:

```text
provider_category
provider_subtype
display_name
slug
diagnostic_provider_type
category
city
area
address_public
landmark_public
short_description
services_public
sample_collection_modes
opening_hours_public
result_turnaround_public
appointment_required_preview
walk_in_available
home_sample_collection_preview
verification_status
last_confirmed_at
listing_status
visibility_status
source_note
internal_review_note
```

Default provider category:

```text
diagnostic
```

Approved diagnostics provider types:

```text
laboratory
imaging_center
radiology_center
pathology_service
mixed_diagnostic_center
facility_diagnostic_department
home_sample_collection_provider
```

---

## Sheet 05: Contact Channels

Recommended columns:

```text
provider_category
provider_slug
channel_type
label
value
href
availability_note
display_order
is_public
verification_status
last_confirmed_at
source_note
internal_review_note
```

Allowed provider categories:

```text
facility
doctor
pharmacy
diagnostic
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

Important:

* Use `diagnostic` for diagnostics contact channels.
* Do not include private staff phone numbers unless approved for public display.
* `provider_slug` must match the slug of the provider row.
* One provider may have multiple contact channel rows.

---

## Sheet 06: Verification Notes

Recommended columns:

```text
provider_category
provider_slug
review_status
verification_status
reviewed_by
review_date
verification_method
verification_note
issue_flag
next_review_date
```

Allowed review statuses:

```text
not_started
in_review
approved
needs_correction
rejected
```

Allowed verification statuses:

```text
verified
unverified
pending
disputed
```

---

## Sheet 07: Source Tracking

Recommended columns:

```text
provider_category
provider_slug
source_type
source_name
source_url
source_date
collected_by
reviewed_by
review_status
review_note
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

## Sheet 08: Import QA Checklist

Recommended checklist items:

```text
No duplicate slugs
All required display names are present
All provider categories are valid
All listing_status values are valid
All visibility_status values are valid
All public contact details are approved
No private staff contact details are included
All active/public rows have minimum location information
All verified rows have last_confirmed_at
Diagnostics provider types match approved values
Contact channel provider_category matches provider rows
Contact channel provider_slug matches an existing provider slug
Rows marked hidden/internal will not appear publicly
Rows marked pending are not imported as public active listings
```

---

## Sheet 09: Allowed Values

This sheet should list all controlled values for easy reference.

Provider category:

```text
facility
doctor
pharmacy
diagnostic
```

Listing status:

```text
active
pending
inactive
archived
```

Visibility status:

```text
public
hidden
internal
```

Verification status:

```text
verified
unverified
pending
disputed
```

Boolean values:

```text
true
false
unknown
```

Diagnostics provider type:

```text
laboratory
imaging_center
radiology_center
pathology_service
mixed_diagnostic_center
facility_diagnostic_department
home_sample_collection_provider
```

Contact channel type:

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

## Sheet 10: Instructions

The instructions sheet should explain:

1. Fill one row per provider in the relevant provider sheet.
2. Use one row per contact method in Contact Channels.
3. Do not include private contact details unless approved for public display.
4. Use `active` and `public` only when a row is ready for public display.
5. Use `pending` or `hidden` for rows still under review.
6. Use stable slugs.
7. Do not delete QA/test rows until real data is reviewed and import-ready.
8. Do not import data until the spreadsheet passes QA.

---

## CSV Export Option

The planning document should recommend also creating CSV versions later:

```text
facilities.csv
doctors.csv
pharmacies.csv
diagnostics.csv
contact_channels.csv
verification_notes.csv
source_tracking.csv
import_qa_checklist.csv
allowed_values.csv
instructions.csv
```

CSV files can be useful for import workflows, while Excel is easier for project-owner data entry.

---

## File Naming Convention

Recommended names:

```text
TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
TiruMedicalDirectory_RealProviderDataIntake_Template_v1.xlsx
TiruMedicalDirectory_RealProviderDataIntake_Filled_YYYY-MM-DD.xlsx
```

CSV folder recommendation:

```text
docs/data-intake/exports/csv/
```

---

## Data Entry Safety Notes

The plan must clearly state:

```text
Do not insert real data yet.
Do not delete diagnostics test rows yet.
Do not delete fallback data yet.
Do not remove QA fixtures yet.
Do not import spreadsheet data until the template is QA-reviewed.
```

---

## Recommended Next Task

The recommended next task should be:

```text
Task 180 — Real Provider Data Spreadsheet Template Export
```

Purpose:

* Create the actual Excel workbook.
* Optionally create CSV-ready companion files.
* Keep all files template-only.
* Do not include real provider data.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-179-RealProviderDataSpreadsheetExportPlanning.md`.
* Define workbook structure.
* Define sheet names.
* Define column order.
* Define allowed values.
* Define CSV export option.
* Define file naming convention.
* Recommend next task.

Not allowed:

* Do not create Excel files yet.
* Do not create CSV files yet.
* Do not modify source code.
* Do not modify UI copy.
* Do not delete test data.
* Do not insert real data.
* Do not modify SQL, RLS, schema, or migrations.
* Do not modify static data.
* Do not change routes.
* Do not modify probes.
* Do not modify package scripts.
* Do not create Task 180.

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

* Spreadsheet export planning document exists.
* Workbook name is recommended.
* Export folder is recommended.
* Sheet names are defined.
* Column order is defined for each sheet.
* Allowed values sheet is planned.
* Instructions sheet is planned.
* CSV export option is documented.
* File naming convention is documented.
* Data entry safety notes are included.
* Recommended next task is identified.
* No Excel or CSV files are created yet.
* No real provider data is inserted.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* Task 180 is not created.

---

## Deliverable

A focused spreadsheet export planning record for the real provider data intake template.

Do not proceed beyond Task 179.
