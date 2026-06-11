# Codex Task 190: Simple Facility Profiles JSON Extraction QA

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the simple JSON extraction created from the Tiru MedDirectory Facility Profiles source document.

This task follows:

* CodexTask-186-SimplifyRealProviderDataIntakeAroundFacilityProfilesDocument.md
* CodexTask-187-SimpleFacilityProfilesExtractionPlanning.md
* CodexTask-188-SimpleFacilityProfilesExtractionSourceSetup.md
* CodexTask-189-SimpleFacilityProfilesJSONExtraction.md

This is a documentation-only QA task.

Do not import data into Supabase in this task.

---

## Important Context

Task 189 created the extracted JSON file:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
```

The source document is:

```text
docs/data-intake/source/Tiru_MedDirectory_Facility_Profiles.docx
```

The source document contains:

```text
99 total facility/provider profiles in Addis Ababa
```

Expected category count summary:

```text
General Hospital: 25
Specialty Center: 60
Diagnostic Center: 7
Ambulance Service: 1
Home Care: 2
Telemedicine: 1
Pharmacy: 1
Medical Plaza: 1
Healthcare Financing: 1
Total: 99
```

---

## Main Objective

Verify the extracted JSON file before it is used in the app.

Recommended target file:

```text
docs/CodexTask-190-SimpleFacilityProfilesJSONExtractionQA.md
```

---

## Required QA Checks

Verify and document:

1. JSON file exists.
2. JSON has a `meta` object.
3. JSON has a `records` array.
4. Record count is exactly 99.
5. Category counts match expected source counts.
6. Every record has `record_number`.
7. Every record has `name`.
8. Every record has `category`.
9. Contact fields are preserved when present.
10. Google Maps links are preserved when present.
11. Missing optional fields use empty strings.
12. No invented values are added.
13. No Supabase import file was created.
14. No `src/data` file was modified.
15. No source code, SQL, RLS, schema, migrations, probes, or package scripts were modified.

---

## Field QA

Check these fields exist on every record:

```text
record_number
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
raw_text
extraction_notes
```

---

## Known Extraction Warning To Record

Task 189 reported that some source-only labels are outside the simplified schema.

Record this warning:

```text
Specialty Category, App Store, and Google Play are preserved in raw_text and noted in extraction_notes where applicable.
```

This is acceptable for MVP extraction because the simplified schema is intentionally focused on public facility profile display fields.

---

## QA Status

Use one of:

```text
Passed
Passed with warnings
Blocked
```

Expected status:

```text
Passed with warnings
```

because the JSON count and category counts are correct, but source-only labels are intentionally preserved in raw_text rather than mapped to dedicated fields.

---

## Recommended Next Task

The recommended next task should be:

```text
Task 191 — Wire Simple Facility Profiles JSON Into Facilities UI
```

Purpose:

* Use the extracted JSON as the real MVP facility data source.
* Wire the facilities listing/detail UI to show real facility profiles.
* Keep Supabase import for later.
* Do not modify branding yet.

---

## Scope

Allowed:

* Create/update this QA markdown record.
* Inspect the extracted JSON file.
* Record QA findings.
* Recommend next task.

Not allowed:

* Do not modify source code.
* Do not modify UI copy.
* Do not modify `src/data`.
* Do not modify Supabase SQL.
* Do not modify RLS, schema, or migrations.
* Do not import to Supabase.
* Do not delete test rows.
* Do not delete fallback data.
* Do not modify package scripts.
* Do not modify probes.
* Do not create Task 191.

---

## Validation

Recommended checks:

```bash
git status
```

Also verify:

```text
JSON file exists
record count = 99
category counts match expected source counts
no source code files changed
no SQL files changed
no Supabase files changed
```

No lint/build is required unless source code is modified, which it must not be.

---

## Acceptance Criteria

* QA markdown record exists.
* JSON file path is documented.
* Record count is verified as 99.
* Category counts are verified.
* Required fields are verified.
* Known extraction warnings are documented.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No Supabase import is created.
* No real data is imported to database.
* Task 191 is not created.

---

## Deliverable

A focused QA record confirming the simple facility profiles JSON extraction is ready for app wiring.

Do not proceed beyond Task 190.
