# Codex Task 180: Real Provider Data Spreadsheet Template Export

## Project

DigitalDirectory-v2

## Goal

Create the actual spreadsheet-ready real provider data intake template based on the approved markdown template and spreadsheet export planning.

This task follows:

* CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md
* CodexTask-177-RealProviderDataIntakeTemplateCreation.md
* CodexTask-178-RealProviderDataIntakeTemplateQA.md
* CodexTask-179-RealProviderDataSpreadsheetExportPlanning.md

This task creates template files only.

Do not insert, delete, import, or modify real provider data in this task.

---

## Important Context

Task 177 created:

```text
docs/data-intake/RealProviderDataIntakeTemplate.md
```

Task 178 verified that template.

Task 179 planned the spreadsheet export structure.

Now create the actual spreadsheet template.

---

## Main Objective

Create an Excel workbook template at:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Create the export folder if needed:

```text
docs/data-intake/exports/
```

The workbook should be template-only and contain no real provider data.

---

## Required Workbook Sheets

Create these sheets in this order:

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

Columns:

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

Add one example/template row only, clearly marked as example/template guidance, not real data.

Default provider category example:

```text
facility
```

---

## Sheet 02: Doctors

Columns:

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

Add one example/template row only, clearly marked as example/template guidance, not real data.

Default provider category example:

```text
doctor
```

---

## Sheet 03: Pharmacies

Columns:

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

Add one example/template row only, clearly marked as example/template guidance, not real data.

Default provider category example:

```text
pharmacy
```

---

## Sheet 04: Diagnostics

Columns:

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

Add one example/template row only, clearly marked as example/template guidance, not real data.

Default provider category example:

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

Columns:

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

Add one example/template row only, clearly marked as example/template guidance, not real data.

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

---

## Sheet 06: Verification Notes

Columns:

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

Add one example/template row only.

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

Columns:

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

Add one example/template row only.

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

Create checklist rows for:

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

Recommended columns:

```text
check_item
status
owner
notes
```

Allowed status values:

```text
not_started
passed
needs_review
blocked
```

---

## Sheet 09: Allowed Values

Create a clear allowed-values reference table for:

```text
provider_category
listing_status
visibility_status
verification_status
boolean_values
diagnostic_provider_type
channel_type
review_status
source_type
```

Allowed values:

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

Review status:

```text
not_started
in_review
approved
needs_correction
rejected
```

Source type:

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

## Sheet 10: Instructions

Include instructions explaining:

1. Fill one row per provider in the relevant provider sheet.
2. Use one row per contact method in Contact Channels.
3. Do not include private contact details unless approved for public display.
4. Use `active` and `public` only when a row is ready for public display.
5. Use `pending`, `hidden`, or `internal` for rows still under review.
6. Use stable slugs.
7. Do not delete QA/test rows until real data is reviewed and import-ready.
8. Do not import spreadsheet data until the spreadsheet passes QA.
9. This workbook is a template and should not include real provider data in this task.

---

## Spreadsheet Formatting Requirements

The workbook should be easy to use.

Apply basic formatting:

* Freeze the header row on each sheet.
* Bold header row.
* Use readable column widths.
* Wrap text for notes/guidance columns.
* Add filter/table formatting where practical.
* Use clear sheet names exactly as specified.
* Add dropdown/data validation for controlled fields if practical.
* Keep example rows clearly marked as template examples, not real providers.

---

## Optional CSV Companion Files

If simple and safe, create CSV companion template files in:

```text
docs/data-intake/exports/csv/
```

Suggested files:

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

CSV files must be template-only and contain no real provider data.

If creating CSV files adds risk or complexity, skip CSVs and only create the Excel workbook.

---

## Data Safety Notes

The spreadsheet must clearly state:

```text
Do not insert real data yet.
Do not delete diagnostics test rows yet.
Do not delete fallback data yet.
Do not remove QA fixtures yet.
Do not import spreadsheet data until the template is QA-reviewed.
```

---

## Scope

Allowed:

* Create `docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx`.
* Create `docs/data-intake/exports/` if needed.
* Optionally create CSV companion templates if simple and safe.
* Update `docs/CodexTask-180-RealProviderDataSpreadsheetTemplateExport.md` with task completion details.
* Do not include real provider data.

Not allowed:

* Do not modify source code.
* Do not modify UI copy.
* Do not delete test data.
* Do not insert real data.
* Do not modify SQL, RLS, schema, or migrations.
* Do not modify static data.
* Do not change routes.
* Do not modify probes.
* Do not modify package scripts.
* Do not create Task 181.

---

## Validation

No code validation is required.

Required checks:

```bash
git status
```

Also verify:

```text
The Excel workbook exists.
All required sheets exist.
All required column headers exist.
No real provider data is included.
```

No lint/build is required unless Codex modifies source code, which it must not do.

---

## Acceptance Criteria

* Excel workbook template exists.
* Workbook has all 10 required sheets.
* Required column headers are present.
* Allowed values sheet exists.
* Instructions sheet exists.
* Import QA Checklist sheet exists.
* Data safety notes are included.
* No real provider data is inserted.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* Task 181 is not created.

---

## Deliverable

A focused Excel workbook template for real provider data intake.

Do not proceed beyond Task 180.
