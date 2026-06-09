# Codex Task 171: Placeholder and Test Data Inventory

## Project

DigitalDirectory-v2

## Goal

Create an inventory of placeholder, test, demo, fictional, static fallback, mock, and preview-only content currently present in the project.

This task follows:

* CodexTask-169-PostDiagnosticsMVPCheckpoint.md
* CodexTask-170-PlaceholderAndTestDataCleanupPlanning.md

This is an inventory-only documentation task.

Do not clean, delete, replace, hide, or modify any source code or data in this task.

---

## Important Context

Pharmacy and Diagnostics are now MVP-stable through:

```text
listing
detail route
contact channel wiring
QA records
```

The next MVP risk is reviewers/users seeing test, fictional, sample, fallback, preview, or placeholder content.

Task 170 planned the cleanup approach.

Task 171 should now inspect the project and document where such content exists.

---

## Main Objective

Create a focused inventory record listing likely placeholder/test/demo/fallback content and where it appears.

Recommended target file:

```text
docs/CodexTask-171-PlaceholderAndTestDataInventory.md
```

---

## Required Inventory Areas

Inspect and document findings from:

```text
src/data
src/app
src/components
src/lib/public-listing-mappers.ts
src/lib/supabase
docs
scripts
package.json
```

Focus especially on:

```text
diagnostics test rows
pharmacy fallback data
facility fallback data
doctor fallback data
static provider cards
mock provider data
sample/demo/fictional copy
preview-only UI text
empty-state messaging
fallback messages
contact-channel empty states
test slugs
probe-only fixtures
```

---

## Required Search Terms

Search for and document relevant findings for terms such as:

```text
test
demo
sample
fictional
placeholder
preview
coming soon
not listed yet
fallback
static
mock
seed
TODO
FIXME
dummy
example
```

Use case-insensitive search where possible.

---

## Known Diagnostics Test Slugs

Include these known diagnostics test slugs in the inventory:

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

Classify them as:

```text
Keep for QA until real diagnostics data replacement is ready
```

Do not recommend immediate deletion unless there is a replacement strategy.

---

## Classification Labels

Each finding should be classified using one of:

```text
Keep for QA
Replace with real data
Hide from public UI
Remove after real data import
Needs product decision
```

If uncertain, use:

```text
Needs product decision
```

---

## Suggested Inventory Table Format

Use a markdown table with columns:

```text
Area/File
Term or content found
Type
Public visibility risk
Recommended classification
Recommended later action
Notes
```

---

## Public Visibility Risk Levels

Use these levels:

```text
High
Medium
Low
Internal only
Unknown
```

Examples:

* High: visible on public pages during MVP review.
* Medium: could appear through fallback or empty state.
* Low: internal wording unlikely to reach users.
* Internal only: docs, scripts, QA-only records.
* Unknown: needs manual UI verification.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-171-PlaceholderAndTestDataInventory.md`.
* Inspect project files.
* Search for placeholder/test/demo/fallback terms.
* Document findings.
* Recommend later cleanup actions.

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
* Do not create Task 172.

---

## Validation

No code validation is required.

Recommended commands:

```bash
git status
```

Optional read-only search commands may be used, such as:

```bash
rg -n -i "test|demo|sample|fictional|placeholder|preview|coming soon|not listed yet|fallback|static|mock|seed|TODO|FIXME|dummy|example" src docs scripts package.json
```

Do not modify files other than this QA/inventory markdown.

---

## Acceptance Criteria

* Inventory markdown exists.
* Search terms are documented.
* Findings are categorized by file/area.
* Public visibility risk is documented.
* Recommended classification is documented.
* Recommended later action is documented.
* Known diagnostics test slugs are included.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No data is deleted or inserted.
* Task 172 is not created.

---

## Deliverable

A focused placeholder and test data inventory record.

Do not proceed beyond Task 171.
