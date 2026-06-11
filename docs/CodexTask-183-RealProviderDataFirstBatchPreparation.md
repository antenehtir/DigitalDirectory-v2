# Codex Task 183: Real Provider Data First Batch Preparation

## Project

DigitalDirectory-v2

## Goal

Create guidance for preparing the first small real provider data batch using the approved Excel intake template.

This task follows:

* CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md
* CodexTask-177-RealProviderDataIntakeTemplateCreation.md
* CodexTask-178-RealProviderDataIntakeTemplateQA.md
* CodexTask-180-RealProviderDataSpreadsheetTemplateExport.md
* CodexTask-181-RealProviderDataSpreadsheetTemplateQA.md
* CodexTask-182-RealProviderDataFillingGuidance.md

This task prepares the first batch only.

Do not import, insert, delete, or modify real provider data in the app or database in this task.

---

## Important Context

The approved Excel template exists at:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Task 182 recommended a first real-data batch of:

```text
10 providers total:
4 facilities
2 pharmacies
2 diagnostics providers
2 doctors
```

This first batch is for review and QA before any import or replacement work.

---

## Main Objective

Create a first-batch preparation record explaining exactly how the project owner should prepare the first 10 real provider records.

Recommended target file:

```text
docs/CodexTask-183-RealProviderDataFirstBatchPreparation.md
```

---

## First Batch Size

Prepare:

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

Reason:

* Small enough for careful review.
* Large enough to test listing, detail, contact, and search behavior.
* Safer than bulk-filling many providers at once.
* Helps catch field, slug, contact, and verification issues early.

---

## Where To Fill The Data

Use the Excel template:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Recommended workflow:

1. Make a copy of the template.
2. Rename the copy as:

```text
TiruMedicalDirectory_RealProviderDataIntake_FirstBatch_DRAFT.xlsx
```

3. Fill the copied file, not the original template.
4. Do not commit the filled real-data file yet unless specifically approved.
5. Do not import into Supabase yet.

---

## First Batch Recommended Categories

### Facilities: 4 rows

Use the `01_Facilities` sheet.

Recommended facility mix:

```text
1 general hospital or medical center
1 specialty center
1 clinic or specialty clinic
1 diagnostic-linked or multi-service facility
```

### Pharmacies: 2 rows

Use the `03_Pharmacies` sheet.

Recommended pharmacy mix:

```text
1 retail pharmacy
1 delivery/pickup-capable pharmacy if available
```

### Diagnostics: 2 rows

Use the `04_Diagnostics` sheet.

Recommended diagnostics mix:

```text
1 laboratory
1 imaging/radiology/mixed diagnostics center
```

### Doctors: 2 rows

Use the `02_Doctors` sheet.

Recommended doctor mix:

```text
1 internal medicine / general medicine related doctor
1 high-demand specialty doctor
```

Do not include private personal details.

---

## Minimum Required Provider Fields

For every provider row, fill at minimum:

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

Recommended first-batch status before review:

```text
verification_status = pending
listing_status = pending
visibility_status = hidden
```

Only change to:

```text
listing_status = active
visibility_status = public
```

after review and approval.

---

## Contact Channels

Use the `05_Contact_Channels` sheet.

Each public contact method should be one row.

Example:

```text
One provider with phone + WhatsApp + website = 3 contact channel rows
```

Required contact fields:

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
```

Allowed provider categories:

```text
facility
doctor
pharmacy
diagnostic
```

Allowed contact channel types:

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

Do not include:

```text
private staff phone numbers
personal doctor phone numbers unless explicitly approved
internal extensions not intended for public use
private emails
unverified WhatsApp numbers
```

---

## Slug Rules

Every provider should have a stable slug.

Rules:

```text
lowercase only
hyphen-separated
no spaces
no special characters except hyphen
unique within provider category
no private/internal notes
```

Examples:

```text
bole-family-clinic
addis-specialty-pharmacy
city-diagnostic-imaging-center
dr-example-internal-medicine
```

If unsure about a slug, leave a note in:

```text
internal_review_note
```

---

## Verification And Source Tracking

Use:

```text
06_Verification_Notes
07_Source_Tracking
```

Each provider should have at least one source row.

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

If the source is uncertain, use:

```text
source_type = unknown
review_status = needs_correction
```

---

## First Batch QA Checklist

Before import, the first batch must pass:

```text
No duplicate slugs
All display names are present
All provider categories are valid
All listing_status values are valid
All visibility_status values are valid
No private contact details are included
All public contact details are approved
All active/public rows have minimum location information
All verified rows have last_confirmed_at
Contact provider_slug values match provider rows
Rows marked hidden/internal will not appear publicly
```

---

## What Not To Do Yet

Do not:

```text
import real data yet
delete diagnostics test rows yet
delete fallback data yet
remove QA fixtures yet
commit filled real-data spreadsheet yet unless approved
bulk-fill hundreds of rows before first-batch QA
include private contact details
mark unverified rows as active/public
```

---

## Recommended Next Task

The recommended next task should be:

```text
Task 184 — Real Provider Data First Batch QA Checklist
```

Purpose:

* Review the first filled batch before import.
* Check required fields, slugs, contact channels, visibility, verification, and source tracking.
* Decide whether the first batch is import-ready.
* Still avoid importing until QA passes.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-183-RealProviderDataFirstBatchPreparation.md`.
* Document first batch size and category mix.
* Document how the project owner should fill the Excel template.
* Document safety rules.
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
* Do not create Task 184.

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

* First batch preparation document exists.
* First batch size is documented.
* Category mix is documented.
* Excel template usage guidance is documented.
* Minimum required fields are documented.
* Contact channel guidance is documented.
* Slug guidance is documented.
* Verification/source tracking guidance is documented.
* First batch QA checklist is documented.
* What-not-to-do-yet warning is included.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No real provider data is inserted.
* Task 184 is not created.

---

## Deliverable

A focused first-batch real provider data preparation guide.

Do not proceed beyond Task 183.
