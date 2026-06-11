# Codex Task 176: Real Provider Data Intake Format and Replacement Planning

## Project

DigitalDirectory-v2

## Goal

Create a planning document and data intake format for replacing placeholder, test, demo, fictional, and fallback provider data with real provider information.

This task follows:

* CodexTask-171-PlaceholderAndTestDataInventory.md
* CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md
* CodexTask-173-PublicFacingPlaceholderCopyCleanupPlanning.md
* CodexTask-174-PublicFacingPlaceholderCopyCleanupImplementation.md
* CodexTask-175-PublicFacingPlaceholderCopyCleanupQA.md

This is a planning and data-format task.

Do not insert, delete, or modify provider data in this task.

---

## Important Context

Public-facing placeholder copy has been cleaned.

The next MVP step is preparing a clean, structured intake format for real provider data.

The goal is to make sure the project owner can provide real provider information in a format that fits the app, database structure, Supabase public-read helpers, RLS expectations, listing pages, detail pages, and contact channel patterns.

---

## Main Objective

Create a planning record that defines:

1. Real provider data categories.
2. Required fields.
3. Optional fields.
4. Public-safe fields.
5. Contact channel fields.
6. Verification fields.
7. Listing/visibility fields.
8. Replacement sequence.
9. QA approach before deleting test/fallback rows.

Recommended target file:

```text
docs/CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md
```

---

## Provider Categories To Support

The intake format should support at minimum:

```text
facilities
doctors
pharmacies
diagnostics
```

Current MVP-stable provider modules include:

```text
pharmacies
diagnostics
```

Facilities and doctors already exist in the app and should be considered for data cleanup/replacement planning.

---

## Recommended Intake Structure

The planning document should recommend separating real data into sheets or sections.

Recommended sections:

```text
1. Facilities
2. Doctors
3. Pharmacies
4. Diagnostics
5. Contact Channels
6. Verification Notes
7. Source Tracking
```

Contact channels should be separate because one provider may have multiple phone numbers, WhatsApp numbers, websites, emails, map links, or booking links.

---

## Core Provider Fields

For each provider row, define these core fields:

```text
provider_category
provider_subtype
display_name
slug
city
area
public_address
public_landmark
short_description
services
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

---

## Provider Category Values

Use clear provider category values:

```text
facility
doctor
pharmacy
diagnostic
```

Important:

* `diagnostic` should be used for contact-channel provider type.
* The app may use `diagnostics` as a public listing route/category.
* `diagnostic_provider_type` is a diagnostics subtype field, not the same as provider category.

---

## Listing and Visibility Values

The planning document should define safe values.

Recommended `listing_status` values:

```text
active
pending
inactive
archived
```

Recommended `visibility_status` values:

```text
public
hidden
internal
```

Only rows with:

```text
listing_status = active
visibility_status = public
```

should be publicly readable.

---

## Verification Values

Recommended `verification_status` values:

```text
verified
unverified
pending
disputed
```

Guidance:

* Use `verified` only when information has been confirmed.
* Use `unverified` when collected from public sources but not confirmed.
* Use `pending` when awaiting review.
* Use `disputed` when there is conflicting information.

---

## Slug Rules

Define slug rules:

* lowercase only
* hyphen-separated
* no spaces
* no special characters except hyphen
* should be stable
* should not include sensitive or internal notes
* should be unique within provider category

Example:

```text
st-paul-general-hospital
bole-alpha-pharmacy
addis-diagnostic-imaging-center
```

---

## Facilities Intake Fields

Facilities may include:

```text
facility_type
ownership_type
specialties
services
emergency_available
inpatient_available
outpatient_available
diagnostics_available
pharmacy_available
city
area
public_address
public_landmark
opening_hours
verification_status
last_confirmed_at
```

Example facility types:

```text
general_hospital
specialty_hospital
specialty_center
clinic
medical_center
dental_clinic
eye_center
aesthetic_center
rehabilitation_center
home_care_provider
ambulance_provider
```

---

## Doctors Intake Fields

Doctors may include:

```text
doctor_name
professional_title
specialty
subspecialty
facility_affiliation
consultation_modes
languages
schedule_public
accepts_online_consultation
accepts_in_person_consultation
verification_status
last_confirmed_at
```

Do not include private personal details that are not intended for public display.

---

## Pharmacies Intake Fields

Pharmacies may include:

```text
pharmacy_type
services
delivery_available
pickup_available
prescription_required_note
opening_hours
city
area
public_address
public_landmark
verification_status
last_confirmed_at
```

Example pharmacy types:

```text
retail_pharmacy
hospital_pharmacy
specialty_pharmacy
compounding_pharmacy
online_pharmacy
```

---

## Diagnostics Intake Fields

Diagnostics may include:

```text
diagnostic_provider_type
category
services_public
sample_collection_modes
opening_hours_public
result_turnaround_public
appointment_required_preview
walk_in_available
home_sample_collection_preview
city
area
address_public
landmark_public
verification_status
last_confirmed_at
```

Recommended diagnostics provider types:

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

## Contact Channels Intake Fields

Contact channels should be recorded separately.

Recommended fields:

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

Recommended `channel_type` values:

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

Guidance:

* Use `is_public = true` only for contact details intended for public display.
* Do not include private staff numbers unless approved for public listing.
* Contact channel rows should match provider category and provider slug.

---

## Source Tracking Fields

The planning document should recommend tracking the source of each provider record.

Suggested fields:

```text
source_type
source_name
source_url
source_date
collected_by
reviewed_by
review_status
review_note
```

Recommended `source_type` values:

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

## Replacement Strategy

The planning document should recommend a safe staged replacement process:

### Stage 1: Build intake spreadsheet/template

Create a structured data intake template using the fields above.

### Stage 2: Fill real provider data

Project owner provides real provider rows.

### Stage 3: Validate data quality

Check for:

```text
duplicate slugs
missing display names
missing category
missing location
invalid listing_status
invalid visibility_status
unsafe private contact information
unverified source notes
```

### Stage 4: Import into Supabase or seed structure

Only after review.

### Stage 5: QA public pages

Verify:

```text
listing pages
detail pages
contact panels
search results
mobile view
desktop view
correction request flow
add provider flow
```

### Stage 6: Remove or archive placeholder/test rows

Only after real data is verified and public pages are stable.

---

## Do Not Delete Yet

The document must clearly state:

```text
Do not delete diagnostics test rows yet.
Do not delete fallback data yet.
Do not remove QA fixtures yet.
Do not insert real data until the intake format is approved.
```

Reason:

Test/fallback data is still useful for QA until replacement data is ready.

---

## Recommended Next Task

The recommended next task should be:

```text
Task 177 — Real Provider Data Intake Template Creation
```

Purpose:

Create a spreadsheet-ready intake template with separate sheets/sections for:

```text
Facilities
Doctors
Pharmacies
Diagnostics
Contact Channels
Source Tracking
Verification Notes
```

---

## Scope

Allowed:

* Create/update `docs/CodexTask-176-RealProviderDataIntakeFormatAndReplacementPlanning.md`.
* Define real provider data intake format.
* Define replacement strategy.
* Define validation rules.
* Recommend the next task.

Not allowed:

* Do not modify source code.
* Do not modify UI copy.
* Do not delete test data.
* Do not modify SQL, RLS, schema, or migrations.
* Do not insert real data.
* Do not modify static data.
* Do not change routes.
* Do not modify probes.
* Do not modify package scripts.
* Do not create Task 177.

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

* Real provider data intake planning document exists.
* Provider categories are defined.
* Core provider fields are defined.
* Category-specific fields are defined.
* Contact channel fields are defined.
* Verification fields are defined.
* Source tracking fields are defined.
* Replacement strategy is documented.
* “Do not delete yet” warning is included.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No data is deleted or inserted.
* Task 177 is not created.

---

## Deliverable

A focused real provider data intake format and replacement planning record.

Do not proceed beyond Task 176.
