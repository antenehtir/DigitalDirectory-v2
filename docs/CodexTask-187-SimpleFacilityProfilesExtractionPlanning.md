# Codex Task 187: Simple Facility Profiles Extraction Planning

## Project

DigitalDirectory-v2

## Goal

Create a planning document for extracting the uploaded Tiru MedDirectory Facility Profiles document into a simple MVP-ready structured format.

This task follows:

* CodexTask-186-SimplifyRealProviderDataIntakeAroundFacilityProfilesDocument.md

This is a documentation-only extraction planning task.

Do not extract, import, insert, delete, or modify real provider data in this task.

---

## Important Context

The project owner uploaded a structured Word document named:

```text
Tiru_MedDirectory_Facility_Profiles(1).docx
```

The document is the MVP source document for real provider data.

It contains:

```text
99 total facility/provider profiles in Addis Ababa
```

with categories including:

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

The document includes public-facing provider fields such as:

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

Task 186 decided that the current complex Excel intake template should be kept for later provider-submitted detailed updates, but not used for the immediate MVP import path.

---

## Main Objective

Create a planning record that defines how to extract the uploaded document into a simple structured format.

Recommended target file:

```text
docs/CodexTask-187-SimpleFacilityProfilesExtractionPlanning.md
```

---

## Recommended Source Handling

The source document should eventually be copied into a project-accessible folder before automated extraction.

Recommended future source folder:

```text
docs/data-intake/source/
```

Recommended future source file name:

```text
Tiru_MedDirectory_Facility_Profiles.docx
```

Do not copy or create the source document in this task unless it already exists in the repository.

---

## Recommended Output Structure

Plan for one or both of the following future outputs:

### Option A: Simple CSV

```text
docs/data-intake/simple-facility-profiles/TiruMedDirectoryFacilityProfiles_Simple.csv
```

### Option B: Simple JSON

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
```

Recommended decision:

```text
Create JSON first for safer structured review, then export CSV if needed.
```

Reason:

* JSON handles missing optional links better.
* JSON supports arrays for phone numbers and social links.
* JSON is easier to validate before import.
* CSV can be generated later from validated JSON.

---

## Simplified MVP Fields

The extraction plan should target these fields:

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

Optional generated fields for later:

```text
slug
listing_status
visibility_status
verification_status
last_confirmed_at
source_note
```

These generated fields should not be manually extracted from the document.

---

## Field Mapping From Document

Map document labels to simplified fields:

```text
Facility title / numbered heading -> name
Facility icon/category line -> category
Specialty / Services -> specialty_or_services
Special Services -> special_services
Sub-City -> sub_city
Area -> area
Address -> address
Phone -> phone
Hours -> hours
Email -> email
Website -> website
Telegram -> telegram
WhatsApp -> whatsapp
Booking -> booking
Facebook -> facebook
Instagram -> instagram
TikTok -> tiktok
LinkedIn -> linkedin
Google Maps -> google_maps
```

---

## Extraction Strategy

The extraction plan should recommend a staged approach:

### Stage 1: Source placement

Place the uploaded Word document in a stable project folder.

Recommended future path:

```text
docs/data-intake/source/Tiru_MedDirectory_Facility_Profiles.docx
```

### Stage 2: Parse into raw extracted records

Extract all numbered profiles into raw records.

Each record should preserve:

```text
record_number
raw_name
raw_category
raw_fields
raw_text
source_page_or_section
```

### Stage 3: Normalize into simplified records

Normalize raw fields into:

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

### Stage 4: Generate safe internal defaults later

Generate, but do not manually fill:

```text
slug
listing_status
visibility_status
verification_status
last_confirmed_at
source_note
```

### Stage 5: QA extracted data

Check:

```text
record count equals 99
all names are present
categories match expected category list
phone/address/hours are preserved
URLs are preserved
multi-link fields are not lost
Google Maps links are preserved
missing fields remain blank/null rather than invented
```

### Stage 6: Decide import behavior

Before import, decide:

```text
active/public/unverified
```

versus:

```text
pending/hidden/pending
```

---

## Recommended Generated Defaults

For future extraction/import planning, generated defaults may be:

```text
slug = generated from name
listing_status = active or pending based on product decision
visibility_status = public or hidden based on product decision
verification_status = unverified or pending
last_confirmed_at = extraction/review date
source_note = Tiru MedDirectory Facility Profiles document
```

Do not apply these defaults in Task 187.

---

## Product Decision Needed

The plan should record this decision point:

### Option A: MVP public launch data

```text
listing_status = active
visibility_status = public
verification_status = unverified
```

Use this only if the project owner accepts the uploaded document as the public MVP source.

### Option B: Review-first data

```text
listing_status = pending
visibility_status = hidden
verification_status = pending
```

Use this if further verification is required before public display.

Recommended practical direction:

```text
Extract all 99 records first, QA them, then choose Option A or B before import.
```

---

## What Not To Do Yet

Do not:

```text
import real data
create Supabase insert SQL
delete test rows
delete fallback data
modify app source code
modify UI copy
create real seed files under src/data
create Task 188
```

---

## Recommended Next Task

The recommended next task should be:

```text
Task 188 — Simple Facility Profiles Extraction Source Setup
```

Purpose:

* Place or reference the uploaded DOCX source in a stable project-accessible location.
* Prepare for extraction without importing data.
* Confirm extraction output folder names.
* Confirm whether JSON-first extraction is approved.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-187-SimpleFacilityProfilesExtractionPlanning.md`.
* Define extraction strategy.
* Define simplified fields and mappings.
* Define future output paths.
* Define QA checks.
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
* Do not create extraction outputs yet.
* Do not create Task 188.

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

* Simple extraction planning document exists.
* Uploaded facility profiles document is identified as source.
* Simplified MVP fields are documented.
* Field mapping from document labels is documented.
* Recommended JSON/CSV output paths are documented.
* Staged extraction strategy is documented.
* QA checks are documented.
* Product decision point is documented.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No real provider data is inserted.
* No extraction outputs are created.
* Task 188 is not created.

---

## Deliverable

A focused extraction planning record for converting the uploaded 99-facility document into simple MVP-ready structured data.

Do not proceed beyond Task 187.
