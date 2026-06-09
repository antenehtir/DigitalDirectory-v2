# Codex Task 172: Placeholder and Test Data Classification Decisions

## Project

DigitalDirectory-v2

## Goal

Convert the Task 171 placeholder and test data inventory into classification decisions for later cleanup planning.

This is a documentation-only decision task. No source code, test data, Supabase SQL, RLS, schema, migrations, real data, static data, UI, brand, logo, colors, routes, probe scripts, or package scripts were modified for this task.

---

## Context Reviewed

Decision inputs:

- `docs/CodexTask-170-PlaceholderAndTestDataCleanupPlanning.md`
- `docs/CodexTask-171-PlaceholderAndTestDataInventory.md`

Task 171 inventory status:

```text
Inventory complete.
```

Primary public trust risks identified in Task 171:

- public footer links to preview-only routes
- homepage sample/preview wording
- search results mock/frontend-only wording
- static seed provider records
- static sample detail routes
- preview-heavy detail action panels
- diagnostics static fallback behavior while local runtime live-row verification remains limited

---

## Decision Status

```text
Classification decisions recorded.
```

These decisions define later actions only. They do not approve implementation changes, data deletion, or real data import by themselves.

---

## Classification Decision Table

| Area/File | Inventory finding | Risk level | Decision classification | Later action | Reason | Owner/Product note |
| --- | --- | --- | --- | --- | --- | --- |
| Supabase diagnostics test rows / `scripts/probe-diagnostics.ts` | Public diagnostics test slugs: `test-diagnostic-alpha-lab`, `test-diagnostic-eta-imaging`, `test-diagnostic-zeta-radiology`, `test-diagnostic-omega-pathology`, `test-diagnostic-kappa-mixed`, `test-diagnostic-lambda-home-sample` | Medium | Keep for QA | Keep for QA until real diagnostics data replacement is ready; do not recommend immediate deletion | These rows verify active/public diagnostics reads and probe expectations. | Product owner should approve a replacement diagnostics QA dataset before any removal. |
| Supabase diagnostics test rows / `scripts/probe-diagnostics.ts` and `scripts/probe-diagnostics-detail.ts` | Blocked diagnostics test slugs: `test-diagnostic-beta-pending`, `test-diagnostic-delta-hidden` | Low | Keep for QA | Keep until replacement blocked-row QA data exists | These rows verify pending/hidden exclusion and detail safety. | Product owner should keep negative fixtures until equivalent real-data-safe QA cases exist. |
| `src/components/layout/Footer.tsx` | Public footer links expose account, patient, booking, admin, and provider dashboard preview routes | High | Hide from public UI | Plan removal or hiding from public navigation before MVP review | Footer links make preview-only workflows easy for public users to discover. | Product owner should decide whether these remain accessible internally but unlinked publicly. |
| `src/components/home/*` | Homepage contains sample and preview wording in high-visibility sections | High | Replace with real data | Plan production-safe homepage copy that does not say sample, preview, or mock once real/fallback policy is approved | Homepage is the first trust surface and should not feel like a demo during MVP review. | Product owner should approve final public value-prop and trust language. |
| `src/components/search-results/*` | Search results mention frontend-only matches, sample results, and mock data | High | Replace with real data | Plan production-safe search wording or hide mock search results until real searchable data is ready | Search is a core public journey; mock wording lowers trust quickly. | Product owner should choose whether search remains public in MVP if real results are incomplete. |
| `src/data/seed-facilities.ts` | Sample facility records and plausible provider names | High | Replace with real data | Replace with verified real facility data or remove after real data import | Provider-like names may be mistaken for verified real listings. | Product owner should confirm if any seed names are real and approved; otherwise treat as fictional. |
| `src/data/seed-doctors.ts` | Sample doctor records with plausible person names | High | Replace with real data | Replace with verified real doctor records or hide doctor sample records from public UI | Doctor names can be interpreted as real professional identities. | Product owner should approve real doctor data and public display permissions. |
| `src/data/seed-pharmacies.ts` | Sample pharmacy records and fallback pharmacy data | High | Replace with real data | Replace fallback records with verified pharmacy data; remove sample records after import and QA | Pharmacy module is MVP-stable, so fallback data can be visible when Supabase is unavailable. | Product owner should decide whether fallback remains sample-based during MVP review. |
| `src/data/seed-diagnostics.ts` | Sample diagnostics records returned by diagnostics static fallback | High | Replace with real data | Replace with verified diagnostics records after live runtime verification and real data readiness are stable | Diagnostics fallback is currently important because local diagnostics probe still reports safe fallback/error. | Product owner should sequence replacement after confirming diagnostics runtime path. |
| `src/app/facilities/addis-health-center/page.tsx` | Static sample facility detail route | High | Remove after real data import | Replace with verified dynamic detail behavior or remove direct static sample route after real data import | Direct static route can expose sample provider details independent of listing flow. | Product owner should confirm whether any static sample routes should remain for internal demo only. |
| `src/app/doctors/dr-hana-bekele/page.tsx` | Static sample doctor detail route | High | Remove after real data import | Replace with verified dynamic detail behavior or remove direct static sample route after real data import | Direct static route can expose a sample doctor profile. | Product owner should confirm whether legacy sample detail routes should be removed or hidden. |
| `src/app/*-preview/page.tsx` | Account, admin review, booking request, patient account, and provider dashboard preview routes | Medium | Hide from public UI | Plan to remove public navigation or gate these routes before MVP review | Preview-only routes may be useful internally but should not look like active product surfaces. | Product owner should decide if routes stay accessible by direct URL for demos. |
| `src/app/internal/*` | Internal probe pages with facility/doctor test slugs | Internal only | Keep for QA | Keep internal-only and verify they are not linked in public navigation | Probe routes support QA and are not intended as public content. | Engineering owner should confirm internal route exposure policy later. |
| `src/components/facilities/*` | Facility directory preview, sample clinic wording, preview-only search copy | High | Replace with real data | Plan production-safe facility listing copy and remove preview-only wording | Public category page should not read as a prototype. | Product owner should approve facility page readiness before MVP review. |
| `src/components/doctors/*` | Doctor directory preview, sample doctor profiles, sample schedule text | High | Replace with real data | Plan production-safe doctor listing copy or hide unsupported doctor flows until real data is ready | Doctor data and availability wording are sensitive trust surfaces. | Product owner should confirm doctor module MVP scope. |
| `src/components/pharmacies/*` | Pharmacy discovery preview and workflow preview labels | Medium | Needs product decision | Decide whether pickup/delivery/prescription preview wording becomes production-safe informational copy or is hidden | Pharmacy contact channels are wired, but workflow readiness may still be preview-only. | Product owner should decide allowed pharmacy workflow claims. |
| `src/components/diagnostics/*` | Diagnostics preview copy and sample collection preview wording | Medium | Needs product decision | Decide which diagnostics labels can become production-safe discovery copy before real data replacement | Diagnostics discovery must avoid implying ordering, result delivery, or sample pickup workflows. | Product owner should approve diagnostics wording boundaries. |
| `src/components/facility-detail/*` | Contact previews, future action controls, save preview, sample facility notes | High | Needs product decision | Decide whether detail action panels should be hidden, rewritten, or converted to public contact display | Shared detail UI affects facilities, pharmacies, and diagnostics. | Product owner should define MVP action panel behavior before implementation. |
| `src/components/doctor-detail/*` | Patient action previews, contact preview, save doctor preview, sample data note | High | Needs product decision | Decide whether doctor action panel remains preview-only or is hidden until real workflows exist | Doctor booking/contact actions affect user expectations. | Product owner should define doctor detail MVP action scope. |
| `src/components/nearby/*` | Nearby preview, no geolocation, static chips, sample collection availability preview | Medium | Needs product decision | Decide whether nearby page is part of MVP or should be hidden/reworded as informational | Nearby implies location-aware behavior that is not implemented. | Product owner should decide whether nearby remains public. |
| `src/components/contact/*`, `src/components/corrections/*`, `src/components/feedback/*`, `src/components/register/*`, `src/components/registration/*` | Preview forms, static fields, nothing submitted, future request shape | Medium | Needs product decision | Decide whether public forms stay as previews, are hidden, or are replaced with real contact instructions | Users may expect submissions to work. | Product owner should define MVP support and correction intake behavior. |
| `src/components/community/*` and `src/data/seed-community-channels.ts` | Placeholder public community/social channel links | Medium | Needs product decision | Replace with official links or hide channel cards until official channels exist | Placeholder channels can appear official. | Product owner should approve official channels before public display. |
| `src/lib/public-listing-mappers.ts` | Verified preview, sample-only trust label, preview contact channels, pickup/delivery/profile preview labels | Medium | Needs product decision | Replace preview trust labels with approved verification language during cleanup implementation | Mapper language can propagate across provider cards/details. | Product owner should approve verification and trust vocabulary. |
| `src/lib/public-listing-mappers.ts` | Generic diagnostics card detail path behavior may point to `/diagnostics` | Medium | Needs product decision | Confirm whether current diagnostics page wiring supersedes this path or plan a route/link cleanup task | Link behavior could affect public navigation consistency. | Engineering/product should decide if this is part of copy cleanup or route cleanup. |
| `src/lib/supabase/diagnostics-public-read.ts` | Static diagnostics fallback data and preview labels | High | Replace with real data | Keep safe fallback until live runtime is stable, then replace fallback records with approved real-safe data | Diagnostics fallback can appear when runtime Supabase read fails. | Product owner should not approve sample fallback removal until replacement and QA are ready. |
| `src/lib/supabase/pharmacies-public-read.ts` | Static pharmacy fallback data and pickup/delivery/prescription preview labels | Medium | Replace with real data | Replace static pharmacy fallback after real pharmacy data and QA are ready | Fallback is useful but current public content is sample/preview-oriented. | Product owner should decide fallback behavior for missing env/runtime cases. |
| `src/lib/supabase/facilities-public-read.ts` | Static facility fallback labels and public listing preview note | Medium | Replace with real data | Decide whether fallback becomes real data, empty state, or remains QA-only | Facility fallback may still show sample data. | Product owner should align with broader data replacement plan. |
| `src/lib/supabase/doctors-public-read.ts` | Static doctor fallback, request booking preview, telemedicine preview labels | Medium | Needs product decision | Decide which doctor preview labels become real-safe copy and which are hidden | Booking and telemedicine imply future workflows. | Product owner should approve doctor workflow wording. |
| `src/lib/supabase/provider-contact-channels-public-read.ts` | Safe empty/static contact-channel fallback and `Contact detail not listed` | Low | Keep for QA | Keep helper safety behavior; review UI wording only if surfaced directly | Safe fallback protects pages from contact read failures. | Engineering should retain safe error handling. |
| `scripts/probe-diagnostics.ts` and `scripts/probe-diagnostics-detail.ts` | Diagnostics public, blocked, missing, and invalid slug fixtures | Internal only | Keep for QA | Keep until real replacement QA fixtures and probe expectations are defined | Probe-only fixtures are internal QA references. | Engineering owner should update probes only after real data replacement plan is approved. |
| `scripts/probe-pharmacies-public-read.ts` and `scripts/probe-pharmacy-detail-read.ts` | Pharmacy fallback checks and sample label | Internal only | Keep for QA | Keep unless probe expectations change during real data import | Probe-only content is not public UI. | Engineering owner should retain regression probes. |
| `docs` | Historical SQL drafts, QA records, fictional/test data references, preview planning docs | Internal only | Keep for QA | Keep as audit trail unless docs become public-facing product documentation | Historical docs explain why test/fallback data exists. | Product owner should decide separately if docs are published externally. |
| `package.json` | No relevant cleanup finding from required search terms | Low | Keep for QA | No action for this cleanup sequence | Package scripts were not modified and are useful for validation. | None. |

---

## Cleanup Priority

### Priority 1: Public Trust Risks

Address these first because they are visible to users and reviewers.

- `src/components/layout/Footer.tsx`
- `src/components/home/*`
- `src/components/search-results/*`
- `src/components/facilities/*`
- `src/components/doctors/*`
- `src/components/facility-detail/*`
- `src/components/doctor-detail/*`
- static sample routes:
  - `src/app/facilities/addis-health-center/page.tsx`
  - `src/app/doctors/dr-hana-bekele/page.tsx`
- preview-only public routes linked from navigation

Primary decisions:

```text
Hide from public UI
Replace with real data
Needs product decision
```

### Priority 2: Data Replacement Risks

Address after public copy/navigation risk is planned, because these require a real data import or replacement strategy.

- `src/data/seed-facilities.ts`
- `src/data/seed-doctors.ts`
- `src/data/seed-pharmacies.ts`
- `src/data/seed-diagnostics.ts`
- static fallback behavior in:
  - `src/lib/supabase/diagnostics-public-read.ts`
  - `src/lib/supabase/pharmacies-public-read.ts`
  - `src/lib/supabase/facilities-public-read.ts`
  - `src/lib/supabase/doctors-public-read.ts`

Primary decisions:

```text
Replace with real data
Remove after real data import
Needs product decision
```

### Priority 3: Internal QA References

Keep these until replacement QA strategy is approved.

- diagnostics test slugs
- probe-only fixtures
- internal probe routes
- historical SQL drafts and QA records
- package probe scripts

Primary decision:

```text
Keep for QA
```

---

## Required Decision Confirmations

Diagnostics test rows:

```text
Keep for QA until real diagnostics data replacement is ready.
Do not recommend immediate deletion.
```

Static seed/fallback provider data:

```text
Replace with real data when public-facing.
Hide from public UI when replacement is not ready and public visibility would reduce trust.
Remove after real data import only after replacement and regression QA are complete.
```

Demo/preview public copy:

```text
Hide from public UI when it exposes unfinished workflows.
Replace with production-safe wording when the route remains public.
```

Empty-state/not-listed copy:

```text
Needs product decision when wording affects trust or user expectations.
Keep only safe, non-technical empty states.
```

Footer/home/search-results/static sample routes:

```text
Prioritize as public trust risks.
```

Probe-only fixtures and QA docs:

```text
Keep for QA as internal references.
```

---

## Recommended Next Task

Recommended next task:

```text
Task 173 - Public-Facing Placeholder Copy Cleanup Planning
```

Reason:

The fastest MVP trust improvement is to plan cleanup for visible public copy and navigation before changing data, SQL, routes, or real provider records.

Task 173 should remain planning-only unless the project owner explicitly approves implementation changes.

---

## Scope Confirmation

For Task 172:

- No source code was modified.
- No test data was deleted.
- No Supabase SQL was modified.
- No RLS was modified.
- No schema was modified.
- No Supabase migrations were modified.
- No real data was inserted.
- No static data was changed.
- No UI was changed.
- No brand, logo, colors, or routes were changed.
- No probe scripts were modified.
- No package scripts were modified.
- Task 173 was not created.

---

## Decision Summary

Public-facing preview, sample, mock, and fallback copy should be cleaned first. Static seed provider data should be replaced with real data or removed only after real data import and regression QA. Diagnostics SQL test rows, probe fixtures, and QA docs should remain internal QA references until replacement QA data exists.
