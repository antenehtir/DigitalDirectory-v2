# Codex Task 107: Doctors Public Read Runtime Probe

## Goal

Create a temporary internal runtime probe to verify the doctors public read helper inside the real Next app runtime before wiring `/doctors`.

## Context

Read:

- docs/DoctorsPublicReadHelperQA.md
- docs/DoctorsSQLManualExecutionQARecord.md
- docs/CodexTask-105-DoctorsPublicReadHelperImplementation.md
- docs/CodexTask-106-DoctorsPublicReadHelperQA.md

Inspect:

- src/lib/supabase/doctors-public-read.ts
- src/lib/supabase/public-client.ts
- src/app/doctors

## Implement

Create a temporary internal probe route:

```text
src/app/internal/doctors-public-read-probe/page.tsx