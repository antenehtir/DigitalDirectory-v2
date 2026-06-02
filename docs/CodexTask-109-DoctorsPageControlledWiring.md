# Codex Task 109: Doctors Page Controlled Wiring

## Goal

Wire the `/doctors` page to use the verified Supabase public doctors read helper, while keeping UI stable and preserving fallback behavior.

## Context

Read:

- docs/DoctorsPublicReadHelperQA.md
- docs/DoctorsPublicReadHelperSafeErrorDiagnosis.md
- docs/DoctorsSQLManualExecutionQARecord.md
- docs/CodexTask-105-DoctorsPublicReadHelperImplementation.md
- docs/CodexTask-108-DoctorsPublicReadHelperSafeErrorDiagnosis.md

Inspect:

- src/app/doctors
- src/lib/supabase/doctors-public-read.ts
- src/lib/public-listing-source.ts
- src/types/public-listings.ts
- src/lib/public-listing-mappers.ts

## Current confirmed runtime result

The internal doctors probe confirmed:

- status = success
- public doctor count = 3
- visible public doctors:
  - Dr. Test Doctor Alpha
  - Test Doctor Eta Minimal
  - Dr. Test Doctor Zeta Disputed
- blocked doctors did not appear

## Implement

Wire `/doctors` to use:

```ts
getSupabasePublicDoctorCards()