# Codex Task 151: Diagnostics Discovery Schema Planning

## Project

DigitalDirectory-v2

## Goal

Plan the diagnostics discovery schema before SQL implementation.

This task begins the Diagnostics module after the Pharmacy module reached MVP-stable status through Task 150.

This is a planning task only.

Do not implement SQL, source code, routes, UI changes, or Supabase changes in this task.

---

## Background

The project has already developed repeatable backend-connected discovery patterns for:

- Facilities
- Doctors
- Pharmacies

The Diagnostics module should follow the same safe pattern:

```text
Schema planning
↓
Table SQL draft
↓
RLS policy SQL draft
↓
Test data SQL draft
↓
Manual SQL execution guide
↓
SQL execution QA record
↓
Public read helper
↓
Runtime probe
↓
Page Supabase wiring QA
↓
Detail read planning
↓
Detail helper
↓
Detail route
↓
Contact channels