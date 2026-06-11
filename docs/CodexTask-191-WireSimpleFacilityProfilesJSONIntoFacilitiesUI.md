# Codex Task 191: Wire Simple Facility Profiles JSON Into Facilities UI

## Project

DigitalDirectory-v2

## Goal

Wire the extracted real facility profiles JSON into the Facilities UI so the app can display the real Tiru MedDirectory facility records.

This task follows:

* CodexTask-189-SimpleFacilityProfilesJSONExtraction.md
* CodexTask-190-SimpleFacilityProfilesJSONExtractionQA.md

This is an app wiring task.

Do not import data to Supabase in this task.

---

## Important Context

The extracted JSON exists at:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
```

Task 190 verified:

```text
record count = 99
```

Expected category counts:

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
```

The goal now is to make the Facilities UI use this real extracted data instead of placeholder/static sample facility data.

---

## Main Objective

Wire the simple extracted facility profiles into the app facilities experience.

Target areas to inspect:

```text
src/app/facilities/page.tsx
src/app/facilities/[slug]/page.tsx
src/components/facilities/*
src/components/facility-detail/*
src/data/*
src/types/*
```

---

## Required Implementation Direction

Create an app-friendly data source from the extracted JSON.

Recommended approach:

```text
Create src/data/real-facility-profiles.ts
```

This file may export normalized real facility profiles derived from the extracted JSON.

Each profile should support:

```text
record_number
slug
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

Generate `slug` safely from the facility name.

Slug rules:

```text
lowercase
hyphen-separated
no spaces
remove unsafe punctuation
stable and unique
```

If duplicates occur, append the record number.

Example:

```text
lancet-general-hospital
american-medical-mch-center
```

---

## Facilities Listing Page

Update the facilities listing page so it displays the real extracted facility profiles.

The listing cards should prioritize:

```text
name
category
area
sub_city
specialty_or_services
special_services
hours
phone
google_maps
```

Do not expose technical extraction fields such as:

```text
raw_text
extraction_notes
```

in public UI.

---

## Facility Detail Page

Update the facility detail route so real facility profiles can be opened by slug.

The detail page should prioritize:

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

If a field is missing, hide it or show production-safe wording.

Do not show:

```text
fallback
static
sample
mock
raw_text
extraction_notes
Supabase
query failed
```

---

## Contact Links

Where practical, make public links clickable:

```text
phone
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

Use safe link handling.

Do not invent links.

---

## Data Safety

Do not modify the extracted JSON file unless absolutely required.

Preferred:

```text
read or convert from the extracted JSON into src/data/real-facility-profiles.ts
```

Do not import to Supabase.

Do not create SQL.

Do not modify RLS, schema, or migrations.

---

## Validation

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

If existing probes are relevant and safe, run them, but do not modify probe scripts.

Also verify:

```text
/facilities builds
/facilities/[slug] builds
real facility names appear in the facilities UI
all 99 facility records are available to the app
no Supabase import was created
no SQL/RLS/schema/migration files were modified
```

---

## Scope

Allowed:

* Create `src/data/real-facility-profiles.ts`.
* Add helper functions/types if needed.
* Wire `/facilities` to real profiles.
* Wire `/facilities/[slug]` to real profiles.
* Preserve existing UI layout as much as possible.
* Run lint/build.

Not allowed:

* Do not import to Supabase.
* Do not create SQL insert scripts.
* Do not modify RLS, schema, or migrations.
* Do not modify pharmacy, diagnostics, or doctors behavior.
* Do not delete placeholder/test data yet.
* Do not redesign UI.
* Do not modify branding/logo/colors yet.
* Do not create Task 192.

---

## Acceptance Criteria

* Real facility profiles are available in app source.
* Facilities listing uses real facility profiles.
* Facility detail route can display real facility profiles by slug.
* All 99 records are represented.
* Missing optional fields are handled safely.
* No technical extraction fields are shown publicly.
* No Supabase import is created.
* No SQL/RLS/schema/migration files are modified.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* Task 192 is not created.

---

## Deliverable

Real extracted facility profiles wired into the Facilities UI for MVP preview.

Do not proceed beyond Task 191.
