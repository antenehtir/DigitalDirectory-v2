# Codex Task 178: Real Provider Data Intake Template QA

## Project

DigitalDirectory-v2

## Goal

Create a QA record for the real provider data intake template created in Task 177.

This task verifies that the intake template is complete, spreadsheet-ready, and usable by the project owner before real provider data collection begins.

This is a documentation-only QA task.

Do not insert, delete, import, or modify real provider data in this task.

---

## Important Context

Task 177 created:

```text
docs/data-intake/RealProviderDataIntakeTemplate.md
```

Task 177 also updated:

```text
docs/CodexTask-177-RealProviderDataIntakeTemplateCreation.md
```

The template is intended to help collect real provider information for:

```text
Facilities
Doctors
Pharmacies
Diagnostics
Contact Channels
Verification Notes
Source Tracking
Import QA Checklist
```

---

## Main Objective

Create a QA record confirming the real provider data intake template is ready for project-owner review and later data filling.

Recommended target file:

```text
docs/CodexTask-178-RealProviderDataIntakeTemplateQA.md
```

---

## Required QA Checks

Verify and document that the template includes:

1. Facilities section.
2. Doctors section.
3. Pharmacies section.
4. Diagnostics section.
5. Contact Channels section.
6. Verification Notes section.
7. Source Tracking section.
8. Import QA Checklist section.
9. Field name column or equivalent guidance.
10. Required/optional guidance.
11. Example values.
12. Notes/guidance.
13. Allowed values reference.
14. Slug rules.
15. Contact channel guidance.
16. Diagnostics provider type guidance.
17. Do-not-delete/import warning.
18. Recommended next task.

---

## Required Safety Checks

Document that the template:

* Does not include real provider data.
* Does not modify source code.
* Does not modify SQL, RLS, schema, or migrations.
* Does not insert data.
* Does not delete test data.
* Does not modify static fallback data.
* Does not create Task 179.

---

## QA Status

The QA record should state one of:

```text
Passed
Passed with minor follow-up
Blocked
```

Expected status:

```text
Passed
```

if the template contains all required sections and guidance.

---

## Recommended Next Task

The recommended next task should be:

```text
Task 179 — Real Provider Data Spreadsheet Export Planning
```

Purpose:

* Decide whether to convert the markdown intake template into Excel/CSV files.
* Prepare spreadsheet tabs for Facilities, Doctors, Pharmacies, Diagnostics, Contact Channels, Verification Notes, Source Tracking, and Import QA Checklist.
* Make it easy for the project owner to fill real provider data outside the codebase.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-178-RealProviderDataIntakeTemplateQA.md`.
* Inspect `docs/data-intake/RealProviderDataIntakeTemplate.md`.
* Record QA findings.
* Recommend next task.

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
* Do not create Task 179.

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

* QA markdown record exists.
* Intake template sections are verified.
* Required/optional/example/guidance format is verified.
* Allowed values are verified.
* Slug rules are verified.
* Contact channel guidance is verified.
* Diagnostics provider type guidance is verified.
* Do-not-delete/import warning is verified.
* No real provider data is inserted.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* Task 179 is not created.

---

## Deliverable

A focused QA record for the real provider data intake template.

Do not proceed beyond Task 178.
