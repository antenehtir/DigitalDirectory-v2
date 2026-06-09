# Codex Task 167: Wire Diagnostics Contact Channels Into Detail Page

## Project

DigitalDirectory-v2

## Goal

Wire public diagnostics contact channels into the diagnostics detail page.

This task follows:

* CodexTask-161-DiagnosticsDetailReadPlanning.md
* CodexTask-162-DiagnosticsDetailReadHelperImplementation.md
* CodexTask-163-DiagnosticsDetailRuntimeProbe.md
* CodexTask-164-DiagnosticsDetailRouteControl.md
* CodexTask-165-DiagnosticsDetailRouteQA.md
* CodexTask-166-DiagnosticsContactChannelsPlanning.md

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

Task 166 planned diagnostics contact channel wiring.

Recommended contact-channel provider type:

```text
diagnostic
```

This is intentionally singular and separate from:

```text
diagnostics
```

which may be used as the app-level public listing provider type.

It is also separate from:

```text
diagnostic_provider_type
```

which is the SQL subtype field on `public.diagnostic_providers`.

---

## Main Objective

Update the diagnostics detail route so it reads and displays public contact channels for a diagnostics provider.

Primary target:

```text
src/app/diagnostics/[slug]/page.tsx
```

Use the existing pharmacy contact channel wiring pattern as the main guide.

---

## Required Behavior

The diagnostics detail page should:

1. Continue reading diagnostics detail data by slug.
2. Read public provider contact channels for the same slug.
3. Use the shared public provider contact channel helper if available.
4. Pass the planned contact provider type:

```ts
"diagnostic"
```

5. Display contact channels using existing project conventions.
6. Preserve safe empty-state behavior if no contact rows exist.
7. Not crash if contact channel read fails.
8. Not expose raw Supabase errors, env values, Supabase URL, anon key, or secrets.
9. Preserve existing diagnostics detail page layout and copy as much as possible.
10. Not modify SQL, RLS, schema, or migrations.

---

## Expected Future Helper Call

Use the existing project helper pattern, likely similar to:

```ts
getSupabasePublicProviderContactChannels("diagnostic", slug)
```

or the project-consistent equivalent.

Do not create a new contact helper unless absolutely necessary. Prefer the shared helper already used by pharmacy.

---

## Empty-State Behavior

If no diagnostics contact channel rows exist:

* The detail page should still render.
* The contact section should either:

  * be hidden, or
  * show the same safe empty-state used by pharmacy.
* No scary technical message should be shown to users.

At this stage, empty contact rows are expected and acceptable.

---

## Public-Safe Contact Fields

Display only public-safe contact fields already used by the shared contact channel component/pattern, such as:

* channel type
* label
* public value
* href
* availability note
* display order

Do not expose private/internal contact fields.

---

## Scope

Allowed:

* Modify `src/app/diagnostics/[slug]/page.tsx`.
* Reuse shared public provider contact channel helper.
* Reuse existing contact channel display components or patterns.
* Add minimal imports and route-level result handling.
* Run validation commands.

Not allowed:

* Do not create or modify SQL.
* Do not modify RLS.
* Do not modify Supabase migrations.
* Do not insert contact channel rows.
* Do not modify diagnostics helper unless a tiny type/import fix is required.
* Do not modify diagnostics listing page.
* Do not change pharmacy, doctors, or facilities behavior.
* Do not change global UI, brand, logo, colors, or real data.
* Do not create Task 168.

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

* Diagnostics detail route reads public contact channels.
* Contact helper uses provider type `diagnostic`.
* Contact channel data is passed into the diagnostics detail UI.
* Empty contact state is safe.
* Contact channel read failure does not crash the page.
* No raw errors or secrets are exposed.
* Existing diagnostics detail behavior is preserved.
* Pending/hidden diagnostics rows remain protected by the detail helper.
* No SQL/RLS/migration/schema files are modified.
* No contact rows are inserted.
* `npm.cmd run lint` passes.
* `npm.cmd run build` passes.
* Existing probes are attempted and results are reported.
* Task 168 is not created.

---

## Deliverable

A focused diagnostics contact channel wiring implementation for the diagnostics detail page.

Do not proceed beyond Task 167.
