# Codex Task 172: Placeholder and Test Data Classification Decisions

## Project

DigitalDirectory-v2

## Goal

Create a classification decision record for the placeholder, test, demo, fictional, static fallback, mock, preview-only, and empty-state content identified in Task 171.

This task follows:

* CodexTask-170-PlaceholderAndTestDataCleanupPlanning.md
* CodexTask-171-PlaceholderAndTestDataInventory.md

This is a documentation-only decision task.

Do not clean, delete, replace, hide, or modify source code or data in this task.

---

## Important Context

Task 171 identified placeholder/test/demo/fallback content across the project.

Highest-risk public visibility areas identified include:

```text
src/components/layout/Footer.tsx
src/components/home/*
src/components/search-results/*
src/data/seed-*
static sample detail routes
detail action panels
diagnostics fallback behavior
```

Known diagnostics test slugs include:

```text
test-diagnostic-alpha-lab
test-diagnostic-eta-imaging
test-diagnostic-zeta-radiology
test-diagnostic-omega-pathology
test-diagnostic-kappa-mixed
test-diagnostic-lambda-home-sample
test-diagnostic-beta-pending
test-diagnostic-delta-hidden
```

These diagnostics test rows were manually verified during Task 156 and should not be deleted until a real diagnostics data replacement strategy is ready.

---

## Main Objective

Create a classification decision record that converts the Task 171 inventory into clear later actions.

Recommended target file:

```text
docs/CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md
```

---

## Required Classification Labels

Use these labels:

```text
Keep for QA
Replace with real data
Hide from public UI
Remove after real data import
Needs product decision
```

---

## Required Decision Areas

The decision record should classify the following areas:

### 1. Diagnostics test rows

Known diagnostics test rows should be classified as:

```text
Keep for QA
```

until real diagnostics provider data is ready.

Later action:

```text
Remove after real data import
```

or replace with real diagnostics provider rows after migration/verification.

### 2. Static seed/fallback provider data

Classify seed-backed public fallback data by public visibility risk.

Likely decision:

```text
Replace with real data
```

or:

```text
Hide from public UI
```

if it can appear during MVP review.

### 3. Demo / preview-only public copy

Classify user-facing words like:

```text
demo
sample
fictional
preview
placeholder
coming soon
```

Likely decision:

```text
Hide from public UI
```

or:

```text
Replace with production-safe wording
```

### 4. Empty-state and “not listed yet” copy

Classify empty states that are acceptable for MVP versus ones that may reduce trust.

Likely decision:

```text
Needs product decision
```

for public wording.

### 5. Footer and home page trust copy

Classify public-facing placeholder wording in layout/home areas as high priority.

Likely decision:

```text
Replace with production-safe wording
```

### 6. Search results and static sample routes

Classify fake/sample cards and sample detail routes as high public visibility risk.

Likely decision:

```text
Hide from public UI
```

or:

```text
Replace with real data
```

### 7. Probe-only fixtures and QA docs

Classify scripts/docs/test references as internal only.

Likely decision:

```text
Keep for QA
```

---

## Required Decision Table

Use a markdown table with these columns:

```text
Area/File
Inventory finding
Risk level
Decision classification
Later action
Reason
Owner/Product note
```

Risk levels:

```text
High
Medium
Low
Internal only
Unknown
```

---

## Recommended Prioritization

The decision record should define cleanup priority:

### Priority 1: Public trust risks

Examples:

```text
Footer
Home page
Search results
Provider cards
Provider detail pages
Visible demo/sample/fictional wording
```

### Priority 2: Data replacement risks

Examples:

```text
seed provider data
diagnostics test rows
pharmacy fallback data
facility/doctor fallback data
```

### Priority 3: Safe internal QA references

Examples:

```text
docs
probe scripts
test slugs
QA records
```

---

## Recommended Next Task

The recommended next task should be:

```text
Task 173 — Public-Facing Placeholder Copy Cleanup Planning
```

Reason:

Before importing real data, the fastest MVP trust improvement is to remove or replace public-facing placeholder/demo/fallback wording from visible UI areas.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md`.
* Review Task 171 inventory.
* Classify findings into cleanup decisions.
* Recommend next task.

Not allowed:

* Do not modify source code.
* Do not delete test data.
* Do not modify Supabase SQL.
* Do not modify RLS, schema, or migrations.
* Do not insert real data.
* Do not change static data yet.
* Do not change UI, brand, logo, colors, or routes.
* Do not modify probe scripts.
* Do not modify package scripts.
* Do not create Task 173.

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

* Classification decision markdown exists.
* Task 171 inventory findings are converted into classification decisions.
* Public visibility risk levels are recorded.
* Later actions are recorded.
* Diagnostics test rows are not recommended for immediate deletion.
* Public-facing copy cleanup is prioritized.
* Recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No data is deleted or inserted.
* Task 173 is not created.

---

## Deliverable

A focused placeholder and test data classification decision record.

Do not proceed beyond Task 172.
