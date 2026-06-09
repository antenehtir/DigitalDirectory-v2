# Codex Task 170: Placeholder and Test Data Cleanup Planning

## Project

DigitalDirectory-v2

## Goal

Create a planning document for identifying and cleaning placeholder, test, demo, fictional, and fallback data before MVP review.

This task follows the post-diagnostics MVP checkpoint:

* CodexTask-169-PostDiagnosticsMVPCheckpoint.md

Pharmacy and Diagnostics are now documented as MVP-stable through listing, detail, contact-channel wiring, fallback behavior, and QA records.

The next risk is not missing module structure. The next risk is users or reviewers seeing test/demo/fallback content.

This is a documentation-only planning task.

---

## Important Context

Current MVP-stable modules:

```text
Pharmacy: listing, detail, contact channels, QA complete
Diagnostics: listing, detail, contact channels, QA complete
```

Known diagnostics runtime limitation:

```text
Live Supabase diagnostics rows were manually verified in SQL during Task 156, but the local/Codex diagnostics runtime probe still reports safe fallback/error with DIAGNOSTICS_PUBLIC_READ_FAILED.
```

This planning task should not change code or data. It should define what needs to be reviewed and cleaned later.

---

## Main Objective

Create a cleanup planning record that identifies categories of placeholder/test/fallback content and recommends a safe cleanup sequence.

Recommended target file:

```text
docs/CodexTask-170-PlaceholderAndTestDataCleanupPlanning.md
```

---

## Cleanup Areas To Identify

The planning document should identify and categorize possible cleanup targets, including:

### 1. Test database rows

Examples:

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

Clarify that these rows should not be deleted immediately without a replacement strategy.

They may still be useful for QA until real data is ready.

### 2. Static fallback data

Identify where static fallback provider cards may exist.

Focus areas:

```text
src/data
src/lib/public-listing-mappers.ts
diagnostics fallback cards
pharmacy fallback cards
facility fallback cards
doctor fallback cards
```

### 3. Demo-only copy

Look for words such as:

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
```

### 4. Empty-state messaging

Review whether empty contact channels, unavailable data, or fallback states show user-friendly text.

### 5. Seed/mock data

Identify any mock provider data still used by public pages.

### 6. Route and card links

Confirm cards link to correct detail routes and do not point to fake-only slugs for MVP review.

### 7. Contact channel empty states

Confirm missing contact rows do not create confusing user experience.

### 8. Brand and trust language

Identify any wording that may reduce trust, such as “test provider,” “fictional,” or technical fallback messages.

---

## Recommended Cleanup Strategy

The planning document should recommend a safe staged approach:

### Stage 1: Inventory only

Find and list placeholder/test/fallback content.

Do not delete anything.

### Stage 2: Classify

Classify each item as:

```text
Keep for QA
Replace with real data
Hide from public UI
Remove after real data import
Needs product decision
```

### Stage 3: Real-data replacement plan

Define what real provider data is required before removing test content.

### Stage 4: Public UI cleanup

Remove or hide user-facing demo/test wording.

### Stage 5: Regression QA

Run lint/build/probes and manually check public pages.

---

## Real Data Readiness Considerations

The planning document should note that real data replacement should preserve:

* provider slug
* display name
* category/provider type
* location area/city
* public address
* public services
* public opening hours
* public contact channels
* verification status
* last confirmed date
* listing status
* visibility status
* correction/add-facility workflow compatibility

---

## Scope

Allowed:

* Create/update `docs/CodexTask-170-PlaceholderAndTestDataCleanupPlanning.md`.
* Inspect docs and source references if needed.
* Document cleanup categories and recommended stages.
* Identify likely files/areas for later cleanup.

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
* Do not create Task 171.

---

## Validation

No code validation is required for this planning-only task.

Recommended check:

```bash
git status
```

No lint/build is required unless Codex modifies source code, which it must not do.

---

## Acceptance Criteria

* Cleanup planning document exists.
* Test database rows are identified as cleanup/replacement risks.
* Static fallback data is identified as a cleanup/replacement area.
* Demo-only copy search terms are listed.
* Empty-state and contact-channel cleanup considerations are documented.
* Safe staged cleanup strategy is documented.
* Real data readiness considerations are documented.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* No data is deleted or inserted.
* Task 171 is not created.

---

## Deliverable

A focused planning document for placeholder and test data cleanup.

Do not proceed beyond Task 170.
