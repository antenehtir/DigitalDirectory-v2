-- DigitalDirectory-v2 doctors RLS policy migration draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Enables row level security on public.doctors.
-- - Grants anon usage on the public schema for public reads.
-- - Grants anon select on public.doctors.
-- - Adds one public anon SELECT policy only.
-- - Allows anon reads only for public active doctor rows.
--
-- Out of scope for this draft:
-- - No INSERT policy.
-- - No UPDATE policy.
-- - No DELETE policy.
-- - No authenticated/provider/admin/super-admin policies.
-- - No service role logic.
-- - No test inserts.
-- - No private/sensitive fields.
--
-- Public read boundary:
-- A doctor row is publicly readable only when:
-- listing_status = 'active'
-- visibility_status = 'public'

alter table public.doctors enable row level security;

grant usage on schema public to anon;
grant select on table public.doctors to anon;

drop policy if exists "Allow anon read active public doctors" on public.doctors;

create policy "Allow anon read active public doctors"
on public.doctors
for select
to anon
using (
  listing_status = 'active'
  and visibility_status = 'public'
);

-- No INSERT policies are included in this draft.
-- No UPDATE policies are included in this draft.
-- No DELETE policies are included in this draft.
-- No authenticated, provider, admin, reviewer, or super-admin policies are included.
-- No service role logic is included.
-- No test data inserts are included.
-- Review status values, table constraints, anon grants, and negative RLS tests before running.
