-- =============================================================================
-- 004_anon_grants.sql
-- DRAFT — Anon role grants for public Supabase reads
-- =============================================================================
-- STATUS: ALREADY APPLIED manually to the current Supabase test project.
-- This file documents what was applied so it can be reproduced in staging,
-- a new project, or a Supabase CLI migration.
--
-- WHY THIS IS NEEDED:
--   Supabase creates an `anon` role for unauthenticated public API access.
--   RLS policies alone are not enough — the anon role also needs explicit
--   schema usage and table SELECT grants or queries will return empty with
--   no error (a silent failure that is very hard to debug).
--
-- APPLY ONCE per project / per environment.
-- =============================================================================

-- Grant the anon role access to use the public schema.
grant usage on schema public to anon;

-- Grant anon SELECT on the facilities table.
-- RLS policy (see 002_facilities_rls_policy.sql) still controls which rows
-- are visible — this grant only allows anon to attempt the query at all.
grant select on table public.facilities to anon;

-- =============================================================================
-- FUTURE: When doctors, pharmacies, and diagnostics tables are created,
-- add matching grants here:
--
-- grant select on table public.doctors to anon;
-- grant select on table public.pharmacies to anon;
-- grant select on table public.diagnostics_providers to anon;
-- grant select on table public.contact_channels to anon;
-- =============================================================================
