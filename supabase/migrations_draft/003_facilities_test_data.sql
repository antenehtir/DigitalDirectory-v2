-- DigitalDirectory-v2 facilities test data insert draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Adds fictional/sample facilities only.
-- - Covers active/public, pending, archived, hidden, internal, disputed, and
--   missing optional field cases.
-- - Uses only the current draft status vocabulary.
--
-- Out of scope for this draft:
-- - No patient data.
-- - No private provider documents.
-- - No admin notes.
-- - No real provider data.
-- - No contact channel inserts.
-- - No RLS changes.
-- - No app code changes.
--
-- Status vocabulary used:
-- listing_status: draft, pending, active, rejected, archived, suspended
-- visibility_status: public, hidden, internal
-- verification_status: unverified, pending, verified, disputed, expired

insert into public.facilities (
  slug,
  display_name,
  facility_type,
  category,
  description,
  city,
  area,
  address_public,
  landmark_public,
  listing_status,
  visibility_status,
  verification_status,
  last_confirmed_at
)
values
  (
    'test-facility-alpha',
    'Test Facility Alpha',
    'clinic',
    'primary-care',
    'Fictional active public facility row for public read testing.',
    'Test City',
    'Test Area North',
    '100 Example Road',
    'Near Example Square',
    'active',
    'public',
    'verified',
    '2026-01-15 09:00:00+00'
  ),
  (
    'test-facility-beta-pending',
    'Test Facility Beta Pending',
    'health-center',
    'general-care',
    'Fictional pending facility row. Expected to be blocked from anon public reads.',
    'Test City',
    'Test Area East',
    '200 Example Road',
    'Beside Example Library',
    'pending',
    'hidden',
    'pending',
    null
  ),
  (
    'test-facility-gamma-archived',
    'Test Facility Gamma Archived',
    'clinic',
    'primary-care',
    'Fictional archived facility row. Expected to be blocked even if visibility is public.',
    'Test City',
    'Test Area West',
    '300 Example Road',
    'Opposite Example Market',
    'archived',
    'public',
    'expired',
    '2025-12-01 09:00:00+00'
  ),
  (
    'test-facility-delta-hidden',
    'Test Facility Delta Hidden',
    'hospital',
    'general-care',
    'Fictional active but hidden facility row. Expected to be blocked from anon public reads.',
    'Test City',
    'Test Area South',
    '400 Example Road',
    'Behind Example School',
    'active',
    'hidden',
    'verified',
    '2026-01-10 09:00:00+00'
  ),
  (
    'test-facility-epsilon-internal',
    'Test Facility Epsilon Internal',
    'specialty-center',
    'specialty-care',
    'Fictional active but internal facility row. Expected to be blocked from anon public reads.',
    'Test City',
    'Test Area Central',
    '500 Example Road',
    'Inside Example Complex',
    'active',
    'internal',
    'verified',
    '2026-01-11 09:00:00+00'
  ),
  (
    'test-facility-zeta-disputed',
    'Test Facility Zeta Disputed',
    'clinic',
    'primary-care',
    'Fictional active public disputed facility row. Expected to be readable by the current RLS draft because listing and visibility are public-readable.',
    'Test City',
    'Test Area North',
    '600 Example Road',
    'Near Example Transit Stop',
    'active',
    'public',
    'disputed',
    '2026-01-12 09:00:00+00'
  ),
  (
    'test-facility-eta-minimal',
    'Test Facility Eta Minimal',
    'clinic',
    null,
    null,
    null,
    null,
    null,
    null,
    'active',
    'public',
    'unverified',
    null
  )
on conflict (slug) do update
set
  display_name = excluded.display_name,
  facility_type = excluded.facility_type,
  category = excluded.category,
  description = excluded.description,
  city = excluded.city,
  area = excluded.area,
  address_public = excluded.address_public,
  landmark_public = excluded.landmark_public,
  listing_status = excluded.listing_status,
  visibility_status = excluded.visibility_status,
  verification_status = excluded.verification_status,
  last_confirmed_at = excluded.last_confirmed_at,
  updated_at = now();

-- Expected public read outcomes with 002_facilities_rls_policy.sql:
-- - test-facility-alpha: readable because active/public.
-- - test-facility-beta-pending: blocked because pending/hidden.
-- - test-facility-gamma-archived: blocked because archived/public.
-- - test-facility-delta-hidden: blocked because active/hidden.
-- - test-facility-epsilon-internal: blocked because active/internal.
-- - test-facility-zeta-disputed: readable because active/public; disputed is a verification state, not a visibility block.
-- - test-facility-eta-minimal: readable because active/public; validates missing optional field handling.
--
-- No contact channel inserts are included.
-- No RLS changes are included.
-- No private or sensitive fields are included.
