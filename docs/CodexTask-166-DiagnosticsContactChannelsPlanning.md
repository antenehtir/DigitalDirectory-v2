# Codex Task 166: Diagnostics Contact Channels Planning

## Project

DigitalDirectory-v2

## Goal

Plan how diagnostics contact channels should be added to diagnostics detail pages.

This task defines the safe approach for displaying public contact channels for diagnostics providers without implementing the wiring yet.

This task follows:

* CodexTask-161-DiagnosticsDetailReadPlanning.md
* CodexTask-162-DiagnosticsDetailReadHelperImplementation.md
* CodexTask-163-DiagnosticsDetailRuntimeProbe.md
* CodexTask-164-DiagnosticsDetailRouteControl.md
* CodexTask-165-DiagnosticsDetailRouteQA.md

---

## Important Context

The diagnostics detail route now exists:

```text
src/app/diagnostics/[slug]/page.tsx
```

The diagnostics detail route uses:

```ts
getSupabasePublicDiagnosticDetailBySlug(slug: string)
```

from:

```text
src/lib/supabase/diagnostics-public-read.ts
```

Diagnostics contact channels are intentionally not implemented yet.

Pharmacy contact channels were already planned, wired, and QA-tested in earlier tasks. Use the pharmacy contact channel pattern as the primary guide.

---

## Main Objective

Create a planning document for diagnostics contact channel wiring.

Recommended target file:

```text
docs/CodexTask-166-DiagnosticsContactChannelsPlanning.md
```

This task should not modify source code.

---

## Contact Channel Goal

Future diagnostics detail pages should display safe public contact channels for diagnostics providers.

Expected future contact helper pattern should follow pharmacy:

```ts
getSupabasePublicProviderContactChannels(providerType, slug)
```

The diagnostics detail route should eventually pass the correct diagnostics provider type value and slug.

---

## Provider Type Naming Risk

Carry forward the known naming issue:

```text
App public listing providerType may be "diagnostics"
Contact channel provider_type may later be "diagnostic"
SQL field diagnostic_provider_type is a subtype, not the contact provider_type
```

The planning document must clearly decide or recommend the provider_type value to use for diagnostics contact channel rows.

Recommended contact-channel provider type:

```text
diagnostic
```

Reason:

* It is singular.
* It matches the earlier known naming note.
* It avoids confusing the contact-channel provider type with the SQL subtype field `diagnostic_provider_type`.

Do not implement this yet.

---

## Future Contact Channel Behavior

The future wiring should:

1. Read public contact channels for the diagnostics provider slug.
2. Use the shared provider contact channel helper if available.
3. Pass the correct provider type.
4. Display only public-safe contact channels.
5. Preserve safe empty-state behavior if no contact rows exist.
6. Never expose raw Supabase errors, env values, URLs, anon keys, or secrets.
7. Not block the detail page if contact channels fail.
8. Keep diagnostics detail page usable even when no contact channels are available.

---

## Expected Future Route Integration

Future wiring target:

```text
src/app/diagnostics/[slug]/page.tsx
```

Future route should likely call:

```ts
getSupabasePublicProviderContactChannels("diagnostic", slug)
```

or the project-consistent equivalent.

The contact channel result should be passed into the diagnostics detail UI using existing pharmacy detail conventions.

---

## Public-Safe Contact Fields

Future contact display may include public-safe fields such as:

* channel type
* label
* value
* href
* priority/order
* availability note
* public visibility flag

Do not expose private/internal contact fields.

---

## Empty-State Behavior

If no contact rows exist for a diagnostics provider:

* The diagnostics detail page should still render.
* The contact section should either be hidden or display a safe “contact information not listed yet” message, following pharmacy convention.
* The page should not crash.

This is expected at the current stage because diagnostics contact rows may not exist yet.

---

## Scope

Allowed:

* Create/update `docs/CodexTask-166-DiagnosticsContactChannelsPlanning.md`.
* Inspect pharmacy contact channel planning/wiring/QA docs if needed.
* Document future implementation approach.

Not allowed:

* Do not modify source code.
* Do not modify diagnostics detail route.
* Do not modify diagnostics helper.
* Do not modify contact channel helper.
* Do not modify SQL, RLS, schema, or migrations.
* Do not insert contact channel rows.
* Do not implement diagnostics contact channels yet.
* Do not change pharmacy, doctors, or facilities behavior.
* Do not change UI, brand, logo, colors, or real data.
* Do not create Task 167.

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

* Diagnostics contact channel planning document exists.
* Future route integration target is identified.
* Future contact helper pattern is identified.
* Recommended diagnostics contact `provider_type` value is documented.
* Provider type naming risk is clearly documented.
* Empty-state behavior is documented.
* Safe error/fallback behavior is documented.
* Scope boundaries are clear.
* No source code is modified.
* No SQL/RLS/migration/schema files are modified.
* Task 167 is not created.

---

## Deliverable

A focused planning document for diagnostics contact channel wiring.

Do not proceed beyond Task 166.
