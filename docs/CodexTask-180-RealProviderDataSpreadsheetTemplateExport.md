# Codex Task 180: Real Provider Data Spreadsheet Template Export

## Project

DigitalDirectory-v2

## Goal

Create the actual spreadsheet-ready real provider data intake template based on the approved markdown template and spreadsheet export planning.

This task follows:

- `docs/CodexTask-177-RealProviderDataIntakeTemplateCreation.md`
- `docs/CodexTask-178-RealProviderDataIntakeTemplateQA.md`
- `docs/CodexTask-179-RealProviderDataSpreadsheetExportPlanning.md`
- `docs/data-intake/RealProviderDataIntakeTemplate.md`

This task created template files only. No real provider data was inserted, deleted, imported, or modified.

---

## Export Status

```text
Spreadsheet template export complete.
```

Workbook created:

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

Export folder created or reused:

```text
docs/data-intake/exports/
```

Optional CSV companion files were skipped in Task 180 to keep the task focused on the Excel workbook and avoid unnecessary file churn.

---

## Workbook Sheets Created

The workbook contains the required sheets in this order:

| Order | Sheet name | Status |
| --- | --- | --- |
| 01 | `01_Facilities` | Created |
| 02 | `02_Doctors` | Created |
| 03 | `03_Pharmacies` | Created |
| 04 | `04_Diagnostics` | Created |
| 05 | `05_Contact_Channels` | Created |
| 06 | `06_Verification_Notes` | Created |
| 07 | `07_Source_Tracking` | Created |
| 08 | `08_Import_QA_Checklist` | Created |
| 09 | `09_Allowed_Values` | Created |
| 10 | `10_Instructions` | Created |

---

## Column Header Status

Required column headers were added from the Task 180 specification.

| Sheet | Header status | Example/template row status |
| --- | --- | --- |
| `01_Facilities` | Required headers present | One example-only row included and marked as not real provider data |
| `02_Doctors` | Required headers present | One example-only row included and marked as not real provider data |
| `03_Pharmacies` | Required headers present | One example-only row included and marked as not real provider data |
| `04_Diagnostics` | Required headers present | One example-only row included and marked as not real provider data |
| `05_Contact_Channels` | Required headers present | One example-only row included and marked as not real contact data |
| `06_Verification_Notes` | Required headers present | One example-only row included |
| `07_Source_Tracking` | Required headers present | One example-only row included |
| `08_Import_QA_Checklist` | Required headers present | Required checklist rows included |
| `09_Allowed_Values` | Required headers present | Controlled values reference included |
| `10_Instructions` | Required headers present | Data-entry and safety instructions included |

---

## Spreadsheet Formatting Applied

The workbook includes basic usability formatting:

- Header row frozen on each sheet.
- Header row bolded and styled for readability.
- Readable column widths applied.
- Notes, guidance, instruction, description, address, and availability columns use text wrapping.
- Table/filter formatting applied where practical.
- Dropdown/data validation applied to controlled-value columns where practical.

Controlled-value dropdowns were added for fields such as:

- `provider_category`
- `listing_status`
- `visibility_status`
- `verification_status`
- `diagnostic_provider_type`
- `channel_type`
- `review_status`
- `source_type`
- boolean-style fields where present
- import QA checklist `status`

---

## Data Safety Notes Included

The workbook instructions include the required safety notes:

```text
Do not insert real data yet.
Do not delete diagnostics test rows yet.
Do not delete fallback data yet.
Do not remove QA fixtures yet.
Do not import spreadsheet data until the template is QA-reviewed.
```

Example/template rows are marked as example-only and not real provider data.

---

## Validation Checks

Required validation checks were completed:

| Check | Result |
| --- | --- |
| Excel workbook exists | Passed |
| All 10 required sheets exist | Passed |
| Required sheet order was used | Passed |
| Required column headers are present | Passed |
| Allowed values sheet exists | Passed |
| Instructions sheet exists | Passed |
| Import QA Checklist sheet exists | Passed |
| Data safety notes are included | Passed |
| Example rows are marked as examples/template guidance | Passed for provider/contact/source/verification sheets |
| No real provider data was inserted | Passed |
| No source code was modified | Passed |
| No SQL/RLS/schema/migration files were modified | Passed |
| No route/probe/package script changes were made | Passed |
| Task 181 was not created | Passed |

No lint or build was required because this task did not modify source code.

---

## Files Created

```text
docs/data-intake/exports/TiruMedicalDirectory_RealProviderDataIntake_Template.xlsx
```

---

## Files Modified

```text
docs/CodexTask-180-RealProviderDataSpreadsheetTemplateExport.md
```

---

## CSV Companion Status

CSV companion files were skipped.

Reason:

- The Excel workbook satisfies Task 180.
- CSV files were optional only.
- Skipping CSVs keeps the template export focused and avoids extra files before spreadsheet QA.

---

## Recommended Next Task

Recommended next task:

```text
Task 181 - Real Provider Data Spreadsheet Template QA
```

Purpose:

- Verify the exported Excel workbook can be used by project ownership.
- Confirm all headers, sheets, allowed values, formatting, and instructions are complete.
- Confirm no real provider data was inserted.
- Decide whether CSV companions are needed later.

Task 181 was not created as part of this task.

---

## Scope Confirmation

For Task 180:

- No source code was modified.
- No UI copy was modified.
- No test data was deleted.
- No real provider data was inserted.
- No SQL was modified.
- No RLS was modified.
- No schema was modified.
- No migrations were modified.
- No static data was modified.
- No routes were changed.
- No probes were modified.
- No package scripts were modified.
- Task 181 was not created.

---

## Completion Summary

Task 180 created the real provider data intake Excel workbook template under `docs/data-intake/exports/`. The workbook includes all required sheets, headers, controlled values, instructions, import QA checklist rows, example-only guidance rows, formatting, and data safety notes. The workbook is template-only and ready for a future QA task before any real provider data is collected or imported.
