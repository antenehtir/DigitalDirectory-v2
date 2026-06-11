# Codex Task 186: Simplify Real Provider Data Intake Around Existing Facility Profiles Document

## Project

DigitalDirectory-v2

## Goal

Simplify the real provider data intake approach by using the existing uploaded Tiru MedDirectory Facility Profiles document as the MVP source structure.

This task changes direction from the complex spreadsheet intake workflow to a simpler MVP-friendly facility profile structure.

This is a documentation-only planning task.

Do not import, insert, delete, or modify real provider data in this task.

---

## Important Context

The project owner uploaded a structured document:

```text
Tiru_MedDirectory_Facility_Profiles(1).docx
```

The document is titled:

```text
TIRU MEDDIRECTORY
Full Facility Profiles Database
Complete directory of all 99 registered health facilities in Addis Ababa
```

The document already contains 99 facility/provider profiles with categories including:

```text
General Hospital
Specialty Center
Diagnostic Center
Ambulance Service
Home Care
Telemedicine
Pharmacy
Medical Plaza
Healthcare Financing
```

The uploaded document includes practical public fields such as:

```text
facility name
category
specialty / services
special services
sub-city
area
address
phone
hours
email
website
telegram
whatsapp
booking
facebook
instagram
tiktok
linkedin
google maps
```

The current Excel intake template is useful for future provider-submitted data, but it is too heavy for the current MVP import stage.

---

## Main Objective

Create a simplified MVP data intake plan based on the uploaded facility profiles document.

Recommended target file:

```text
docs/CodexTask-186-SimplifyRealProviderDataIntakeAroundFacilityProfilesDocument.md
```

---

## New MVP Data Direction

For the current MVP, do not force the uploaded document into the complex Excel intake workflow.

Instead, define a simpler MVP facility profile structure that directly matches the uploaded document.

Recommended simplified MVP fields:

```text
name
category
specialty_or_services
special_services
sub_city
area
address
phone
hours
email
website
telegram
whatsapp
booking
facebook
instagram
tiktok
linkedin
google_maps
```

Optional internal/default fields that can be assigned automatically later:

```text
slug
listing_status
visibility_status
verification_status
last_confirmed_at
source_note
```

The project owner should not manually fill these defaults for all 99 records at this stage.

---

## Fields To Defer For Later

The following fields should not be required for the current MVP import stage:

```text
ownership_type
appointment_required
walk_in_available
home_service_available
reviewed_by
review_status
verification_notes_sheet
source_tracking_sheet
internal_review_note
complex provider self-claim fields
```

These can be introduced later when providers claim or update their profiles.

---

## Recommended Default Handling

For MVP import planning, the system can later generate or assign:

```text
slug = generated from facility name
listing_status = active or pending based on product decision
visibility_status = public or hidden based on review decision
verification_status = unverified or pending
last_confirmed_at = import/review date
source_note = Imported from Tiru MedDirectory Facility Profiles document
```

No real import should happen in this task.

---

## Product Decision Needed

The planning document should record a product decision point:

Should the first imported 99 facility records be:

```text
Option A:
listing_status = active
visibility_status = public
verification_status = unverified
```

or:

```text
Option B:
listing_status = pending
visibility_status = hidden
verification_status = pending
```

Recommended MVP approach:

```text
Use Option A only if the project owner accepts the document as public MVP source data.
Use Option B if additional verification is required before public display.
```

---

## Recommended Technical Direction

The next implementation path should avoid manual Excel filling.

Recommended options:

### Option 1: Convert DOCX to simple structured CSV

Create a simple CSV with columns matching the uploaded document fields.

Potential file:

```text
docs/data-intake/simple-facility-profiles/TiruMedDirectoryFacilityProfiles_Simple.csv
```

### Option 2: Convert DOCX to simple JSON seed

Create a JSON file for app-friendly processing.

Potential file:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
```

### Option 3: Create a TypeScript seed file later

Only after data extraction and QA.

Potential future file:

```text
src/data/real-facility-profiles.ts
```

Do not create these files in Task 186. Task 186 is planning only.

---

## Suggested MVP Display Fields

For listing cards, prioritize:

```text
name
category
area
sub_city
specialty_or_services
special_services summary
hours
phone primary
google_maps
```

For detail pages, prioritize:

```text
name
category
specialty_or_services
special_services
sub_city
area
address
phone numbers
hours
email
website
telegram
whatsapp
booking
social links
google_maps
```

---

## Relationship To Previous Spreadsheet Tasks

The previously created Excel template should not be deleted.

It remains useful for future provider-submitted detailed updates.

Current decision:

```text
Use uploaded facility profiles document for MVP real-data preparation.
Keep Excel template for later provider self-submission or detailed verification workflow.
```

---

## Recommended Next Task

The recommended next task should be:

```text
Task 187 — Simple Facility Profiles Extraction Planning
```

Purpose:

* Define how to extract the 99 uploaded facility profiles into a simple CSV or JSON structure.
* Define the exact simplified columns.
* Decide whether extraction should start with all 99 records or a smaller first batch.
* Avoid manual Excel filling.
* Avoid importing to Supabase until extracted data is QA-reviewed.

---

## Scope

Allowed:

* Create/update this planning document.
* Use the uploaded facility profiles document as the MVP source reference.
* Define simplified MVP fields.
* Define fields to defer.
* Define next extraction planning task.

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
* Do not create Task 187.
* Do not delete the Excel template.

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

* Simplified real-data intake planning document exists.
* Uploaded facility profiles document is identified as MVP source data.
* Simplified MVP fields are defined.
* Deferred fields are documented.
* Default/internal fields are documented.
* Product decision point is documented.
* Relationship to previous Excel template is documented.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No real provider data is inserted.
* Task 187 is not created.

---

## Deliverable

A focused planning record that simplifies real provider data intake around the uploaded Tiru MedDirectory Facility Profiles document.

Do not proceed beyond Task 186.
