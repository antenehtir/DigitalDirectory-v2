# Codex Task 190: Simple Facility Profiles JSON Extraction QA

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only QA record for the simple JSON extraction created in Task 189 from the Tiru MedDirectory Facility Profiles source document.

This task follows:

* CodexTask-186-SimplifyRealProviderDataIntakeAroundFacilityProfilesDocument.md
* CodexTask-187-SimpleFacilityProfilesExtractionPlanning.md
* CodexTask-188-SimpleFacilityProfilesExtractionSourceSetup.md
* CodexTask-189-SimpleFacilityProfilesJSONExtraction.md

No source code, UI copy, `src/data`, SQL, RLS, schema, migrations, static app data, routes, probes, package scripts, Supabase imports, or test data were modified by this QA task.

Task 191 was not created.

---

## Source And Output

Source document:

```text
docs/data-intake/source/Tiru_MedDirectory_Facility_Profiles.docx
```

Extracted JSON:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
```

---

## QA Checks

| Check | Result | Notes |
| --- | --- | --- |
| JSON file exists | Passed | Extracted JSON file is present at the expected path. |
| JSON has `meta` | Passed | Top-level `meta` object exists. |
| JSON has `records` array | Passed | Top-level `records` array exists. |
| Record count is exactly 99 | Passed | Extracted record count is 99. |
| Category counts match expected source counts | Passed | Counts match the Task 189/source summary. |
| Every record has `record_number` | Passed | No missing `record_number` values found. |
| Every record has `name` | Passed | No missing `name` values found. |
| Every record has `category` | Passed | No missing `category` values found. |
| Required simplified fields exist on each record | Passed | All 22 simplified fields exist on every record. |
| Contact fields are preserved when present | Passed | Contact fields remain populated where present in the source extraction. |
| Google Maps links are preserved when present | Passed | 95 records include preserved Google Maps values. Missing values remain blank strings. |
| Missing optional fields use empty strings | Passed | Optional fields are present as strings, including blank strings when missing. |
| No invented values are added | Passed | No generated slug/status/verification fields were added; source-only fields remain in `raw_text`. |
| Known warning is recorded | Passed with warning | `Specialty Category`, `App Store`, and `Google Play` are preserved in `raw_text` and noted in `extraction_notes` where applicable. |
| No source code, SQL, Supabase, `src/data`, probes, or package scripts were modified | Passed | QA task only updated this markdown record. |

---

## Required Field Verification

Every record includes:

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

Verification result:

```text
missing required fields: 0
missing record_number: 0
missing name: 0
missing category: 0
non-string optional field values: 0
deferred/generated status fields found: 0
```

Deferred fields were not generated:

```text
slug
listing_status
visibility_status
verification_status
```

---

## Record Count

```text
Expected: 99
Actual: 99
Result: passed
```

---

## Category Count Summary

| Category | Expected | Actual | Result |
| --- | ---: | ---: | --- |
| General Hospital | 25 | 25 | Passed |
| Specialty Center | 60 | 60 | Passed |
| Diagnostic Center | 7 | 7 | Passed |
| Ambulance Service | 1 | 1 | Passed |
| Home Care | 2 | 2 | Passed |
| Telemedicine | 1 | 1 | Passed |
| Pharmacy | 1 | 1 | Passed |
| Medical Plaza | 1 | 1 | Passed |
| Healthcare Financing | 1 | 1 | Passed |
| Total | 99 | 99 | Passed |

---

## Contact Field Preservation

Observed populated contact fields in the extracted records:

| Field | Populated records |
| --- | ---: |
| phone | 99 |
| email | 79 |
| website | 71 |
| telegram | 69 |
| whatsapp | 2 |
| booking | 9 |
| facebook | 13 |
| instagram | 11 |
| tiktok | 10 |
| linkedin | 7 |
| google_maps | 95 |

Missing optional contact fields remain present as blank strings.

---

## Known Warning

Status: Passed with warnings.

The source document includes labels outside the simplified MVP JSON schema:

```text
Specialty Category
App Store
Google Play
```

These labels were not mapped to new dedicated fields because Task 189 required the simplified field set only. They are preserved in `raw_text` and noted in `extraction_notes` where applicable.

This warning is acceptable for MVP extraction and should be revisited during later real-data modeling or provider profile enrichment work.

---

## QA Status

Passed with warnings.

The extracted JSON is ready for app-wiring planning/use as a real MVP facility data source, with the known warning above.

---

## Recommended Next Task

Task 191 — Wire Simple Facility Profiles JSON Into Facilities UI

Purpose:

* Use the extracted JSON as the real MVP facility data source.
* Wire the facilities listing/detail UI to show real facility profiles.
* Keep Supabase import for later.
* Do not modify branding yet.

Do not proceed beyond Task 190.
