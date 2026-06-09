# Codex Task 169: Post-Diagnostics MVP Checkpoint and Next-Step Planning

## Project

DigitalDirectory-v2

## Goal

Create a checkpoint record after completing the Pharmacy and Diagnostics MVP module flows.

This task documents the current project state, completed modules, known limitations, and recommended next MVP steps before starting another feature block.

This is a documentation-only planning/checkpoint task.

---

## Completed Pharmacy Module Status

The Pharmacy module has reached the current MVP-stable stage.

Completed pharmacy work includes:

* Pharmacies public read helper
* Pharmacies runtime probe
* Pharmacies page Supabase wiring QA
* Pharmacy detail read planning
* Pharmacy detail read helper implementation
* Pharmacy detail runtime probe
* Pharmacy detail route control
* Pharmacy detail route QA
* Pharmacy contact channels planning
* Pharmacy contact channels wiring
* Pharmacy contact channels QA

Current status:

```text
Pharmacy listing: complete
Pharmacy detail route: complete
Pharmacy contact channels: wired
Pharmacy QA: documented
```

---

## Completed Diagnostics Module Status

The Diagnostics module has reached the same current MVP-stable stage as Pharmacy.

Completed diagnostics work includes:

* Diagnostics discovery schema planning
* Diagnostics table SQL draft
* Diagnostics RLS policy SQL draft
* Diagnostics test data SQL draft
* Diagnostics manual SQL execution guide
* Diagnostics SQL execution QA record
* Diagnostics public read helper implementation
* Diagnostics runtime probe
* Diagnostics page Supabase wiring
* Diagnostics page Supabase wiring QA
* Diagnostics detail read planning
* Diagnostics detail read helper implementation
* Diagnostics detail runtime probe
* Diagnostics detail route control
* Diagnostics detail route QA
* Diagnostics contact channels planning
* Diagnostics contact channels wiring
* Diagnostics contact channels QA

Current status:

```text
Diagnostics listing: complete
Diagnostics detail route: complete
Diagnostics contact channels: wired
Diagnostics QA: documented
```

---

## Confirmed Diagnostics Database State

The diagnostics Supabase setup was manually executed and verified.

Confirmed state:

```text
public.diagnostic_providers table exists
RLS is enabled
Public select policy allows active/public rows only
Total test rows: 8
Expected active/public rows: 6
Expected blocked rows: 2
```

Expected active/public rows:

```text
test-diagnostic-alpha-lab
test-diagnostic-eta-imaging
test-diagnostic-zeta-radiology
test-diagnostic-omega-pathology
test-diagnostic-kappa-mixed
test-diagnostic-lambda-home-sample
```

Expected blocked rows:

```text
test-diagnostic-beta-pending
test-diagnostic-delta-hidden
```

---

## Known Runtime Limitation

The diagnostics rows were manually verified in Supabase SQL during Task 156.

However, the local/Codex runtime probe still does not verify the 6 live Supabase diagnostics rows.

Known probe result:

```text
npm.cmd run probe:diagnostics: safe fallback/error, DIAGNOSTICS_PUBLIC_READ_FAILED
```

This is documented as a runtime verification limitation, not a page build failure.

Safety behavior remains acceptable because:

* Lint passes.
* Build passes.
* Diagnostics detail safety probe passes.
* Pharmacy probes pass.
* Blocked diagnostics rows are not exposed.
* Safe fallback behavior is preserved.
* No raw Supabase errors or secrets are exposed.

---

## Current MVP Position

The project now has two provider modules completed through listing, detail, and contact-channel stages:

```text
Pharmacy: MVP-stable
Diagnostics: MVP-stable
```

This creates a repeatable module pattern for future provider categories.

---

## Recommended Next MVP Steps

Before starting another large provider module, the recommended next steps are:

### Step 1: Placeholder and fake data cleanup planning

Identify where test/fallback/sample data is still visible or used.

Focus areas:

* diagnostics test rows
* pharmacy test rows if any
* static fallback cards
* placeholder labels
* fictional contact states
* empty-state messages
* demo-only wording

### Step 2: Real data readiness plan

Prepare the structure for replacing test data with real Addis Ababa private healthcare provider data.

Focus areas:

* required fields
* public-safe fields
* verification workflow
* correction request workflow
* add facility request workflow
* source tracking
* last confirmed dates

### Step 3: Brand and UI alignment checkpoint

Prepare for applying the Tiru Medical Directory logo and brand guideline.

Focus areas:

* colors
* typography
* spacing
* card consistency
* mobile detail page readability
* desktop layout polish
* trust badges and verification labels

### Step 4: Full user journey QA

Test the main user journey:

```text
Landing page
Search/listing pages
Provider detail pages
Contact/action panels
Correction request
Add facility request
Mobile and desktop responsiveness
```

---

## Recommended Immediate Next Task

The recommended next task after this checkpoint is:

```text
Task 170 — Placeholder and Test Data Cleanup Planning
```

Reason:

The app now has enough working module structure that the next risk is not missing code; it is users seeing test/demo/fallback content during MVP review.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-169-PostDiagnosticsMVPCheckpoint.md`.
* Document current project state.
* Document completed Pharmacy and Diagnostics module status.
* Document known diagnostics runtime limitation.
* Recommend next MVP steps.

Not allowed:

* Do not modify source code.
* Do not modify SQL, RLS, schema, or migrations.
* Do not modify probe scripts.
* Do not modify package scripts.
* Do not change UI, brand, logo, colors, or real data.
* Do not create Task 170.

---

## Acceptance Criteria

* Checkpoint markdown exists.
* Pharmacy module status is documented.
* Diagnostics module status is documented.
* Known runtime limitation is documented.
* Current MVP position is clear.
* Recommended next MVP steps are listed.
* Immediate recommended next task is identified.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* Task 170 is not created.

---

## Deliverable

A focused post-diagnostics MVP checkpoint and next-step planning record.

Do not proceed beyond Task 169.
