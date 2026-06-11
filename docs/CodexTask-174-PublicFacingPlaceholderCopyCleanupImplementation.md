# Codex Task 174: Public-Facing Placeholder Copy Cleanup Implementation

## Project

DigitalDirectory-v2

## Goal

Clean high-priority public-facing placeholder, demo, sample, preview-only, fallback, and trust-reducing copy before MVP review.

This task follows:

* CodexTask-171-PlaceholderAndTestDataInventory.md
* CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md
* CodexTask-173-PublicFacingPlaceholderCopyCleanupPlanning.md

This task should improve visible public trust without changing data, SQL, routes, schema, provider records, or business logic.

---

## Important Context

Task 173 identified the highest-priority public-facing copy cleanup areas:

* Footer preview links
* Homepage copy
* Search results copy
* Provider cards
* Facility and doctor detail action panels

This task should only clean public-facing wording in high-priority UI areas.

Do not replace real provider data yet.

Do not delete test rows.

Do not modify SQL, RLS, schema, migrations, probes, package scripts, or routes.

---

## Main Objective

Update public-facing UI copy so MVP reviewers do not see technical/demo/trust-reducing wording such as:

```text
test
demo
sample
fictional
placeholder
preview
mock
static
fallback
coming soon
not listed yet
example
dummy
runtime
probe
Supabase
RLS
query failed
```

Only change text/copy where it is visible to public users.

---

## Primary Areas To Inspect

Focus first on:

```text
src/components/layout/Footer.tsx
src/components/home/*
src/components/search-results/*
src/app/*
src/components/* detail/action panels
provider card components
empty-state components
correction request / add facility request UI
contact / feedback UI
```

---

## Copy Cleanup Principles

Use production-safe, trust-building language.

### Replace or avoid

```text
sample provider
demo
preview
fictional
placeholder
fallback data
static data
not listed yet
coming soon
query failed
```

### Prefer wording like

```text
Information is being verified.
Contact details are being verified.
Service information will be updated after verification.
Provider information is reviewed before publication.
This information may be updated as providers confirm details.
```

Do not show internal technical terms to users.

---

## Specific Guidance

### Footer

If footer links point to preview-only, demo, sample, or unfinished public pages:

* Hide them from public navigation, or
* Replace with production-safe links already supported by the app.

Do not remove important real navigation if it is already stable.

### Homepage

Replace trust-reducing demo/sample wording with production-safe wording.

Keep the homepage clear, professional, and MVP-appropriate.

### Search Results

Clean wording that suggests mock/sample/fallback/test results.

If fallback cards are displayed, do not label them as fallback or static to users.

### Provider Cards

Avoid public labels such as:

```text
sample
preview
fictional
test
fallback
static
```

Use neutral labels like:

```text
Service information
Provider information
Verification status
Contact details being verified
```

### Detail Action Panels

Clean empty-contact wording.

Prefer:

```text
Contact details are being verified.
```

or hide the contact section if the project pattern already does so safely.

---

## Scope

Allowed:

* Modify public-facing copy in high-priority UI files.
* Hide preview-only footer links if they are public trust risks.
* Replace demo/sample/fallback wording with production-safe wording.
* Preserve existing layouts and behavior.
* Run validation commands.

Not allowed:

* Do not modify SQL.
* Do not modify RLS.
* Do not modify Supabase migrations.
* Do not delete test data.
* Do not insert real data.
* Do not change provider records.
* Do not change static seed data content except public-facing labels/copy if absolutely necessary.
* Do not change route structure.
* Do not modify probes.
* Do not modify package scripts.
* Do not create Task 175.
* Do not change brand/logo/colors.
* Do not redesign UI.
* Do not change pharmacy, diagnostics, doctors, or facilities data behavior.

---

## Validation Commands

Run:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run probe:diagnostics-detail
npm.cmd run probe:diagnostics
npm.cmd run probe:pharmacies
npm.cmd run probe:pharmacy-detail
```

If PowerShell blocks `npm`, use `npm.cmd`.

---

## Acceptance Criteria

* High-priority public-facing placeholder/demo/sample/fallback wording is cleaned.
* Footer preview/public trust risks are addressed.
* Homepage copy is more production-safe.
* Search results copy is more production-safe.
* Provider card/detail action-panel copy is more production-safe.
* No SQL/RLS/migration/schema files are modified.
* No test data is deleted.
* No real data is inserted.
* No route structure is changed.
* No probes/package scripts are modified.
* Existing UI layout is preserved.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* Existing probes are attempted and results are reported.
* Task 175 is not created.

---

## Deliverable

A focused public-facing copy cleanup implementation for MVP trust readiness.

Do not proceed beyond Task 174.
