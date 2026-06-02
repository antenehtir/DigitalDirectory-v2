-- DigitalDirectory-v2 doctors test data insert draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Adds fictional/sample doctors only.
-- - Covers active/public, pending, archived, hidden, internal, disputed, and
--   missing optional field cases.
-- - Uses only the current draft status vocabulary.
--
-- Out of scope for this draft:
-- - No real doctor names.
-- - No private phone numbers.
-- - No private email addresses.
-- - No private provider documents.
-- - No license documents.
-- - No uploaded certificates.
-- - No admin notes.
-- - No patient data.
-- - No bookings.
-- - No payments.
-- - No reviews or ratings.
-- - No RLS changes.
-- - No app code changes.
--
-- Status vocabulary used:
-- listing_status: draft, pending, active, rejected, archived, suspended
-- visibility_status: public, hidden, internal
-- verification_status: unverified, pending, verified, disputed, expired

insert into public.doctors (
  slug,
  display_name,
  title,
  specialty,
  subspecialty,
  bio_public,
  facility_name_public,
  city,
  area,
  consultation_modes,
  languages,
  listing_status,
  visibility_status,
  verification_status,
  last_confirmed_at
)
values
  (
    'test-doctor-alpha',
    'Test Doctor Alpha',
    'Dr.',
    'Internal Medicine',
    'Adult primary care',
    'Fictional active public doctor row for public read testing.',
    'Test Facility Alpha',
    'Test City',
    'Test Area North',
    array['in-person', 'appointment-request'],
    array['English', 'Amharic'],
    'active',
    'public',
    'verified',
    '2026-01-15 09:00:00+00'
  ),
  (
    'test-doctor-beta-pending',
    'Test Doctor Beta Pending',
    'Dr.',
    'Pediatrics',
    null,
    'Fictional pending doctor row. Expected to be blocked from anon public reads.',
    'Test Facility Beta',
    'Test City',
    'Test Area East',
    array['in-person'],
    array['English'],
    'pending',
    'hidden',
    'pending',
    null
  ),
  (
    'test-doctor-gamma-archived',
    'Test Doctor Gamma Archived',
    'Dr.',
    'Psychiatry',
    'General psychiatry',
    'Fictional archived doctor row. Expected to be blocked even if visibility is public.',
    'Test Facility Gamma',
    'Test City',
    'Test Area West',
    array['in-person', 'telemedicine-preview'],
    array['English', 'Afaan Oromo'],
    'archived',
    'public',
    'expired',
    '2025-12-01 09:00:00+00'
  ),
  (
    'test-doctor-delta-hidden',
    'Test Doctor Delta Hidden',
    'Dr.',
    'Dermatology',
    null,
    'Fictional active but hidden doctor row. Expected to be blocked from anon public reads.',
    'Test Facility Delta',
    'Test City',
    'Test Area South',
    array['in-person'],
    array['English'],
    'active',
    'hidden',
    'verified',
    '2026-01-10 09:00:00+00'
  ),
  (
    'test-doctor-epsilon-internal',
    'Test Doctor Epsilon Internal',
    'Dr.',
    'Gastroenterology',
    'Digestive health',
    'Fictional active but internal doctor row. Expected to be blocked from anon public reads.',
    'Test Facility Epsilon',
    'Test City',
    'Test Area Central',
    array['appointment-request'],
    array['English', 'Tigrinya'],
    'active',
    'internal',
    'verified',
    '2026-01-11 09:00:00+00'
  ),
  (
    'test-doctor-zeta-disputed',
    'Test Doctor Zeta Disputed',
    'Dr.',
    'Pediatrics',
    'Child wellness',
    'Fictional active public disputed doctor row. Expected to be readable by the current RLS draft because listing and visibility are public-readable.',
    'Test Facility Zeta',
    'Test City',
    'Test Area North',
    array['in-person', 'appointment-request'],
    array['English', 'Amharic'],
    'active',
    'public',
    'disputed',
    '2026-01-12 09:00:00+00'
  ),
  (
    'test-doctor-eta-minimal',
    'Test Doctor Eta Minimal',
    null,
    'Internal Medicine',
    null,
    null,
    null,
    null,
    null,
    default,
    default,
    'active',
    'public',
    'unverified',
    null
  )
on conflict (slug) do update
set
  display_name = excluded.display_name,
  title = excluded.title,
  specialty = excluded.specialty,
  subspecialty = excluded.subspecialty,
  bio_public = excluded.bio_public,
  facility_name_public = excluded.facility_name_public,
  city = excluded.city,
  area = excluded.area,
  consultation_modes = excluded.consultation_modes,
  languages = excluded.languages,
  listing_status = excluded.listing_status,
  visibility_status = excluded.visibility_status,
  verification_status = excluded.verification_status,
  last_confirmed_at = excluded.last_confirmed_at,
  updated_at = now();

-- Expected public read outcomes with 005_doctors_rls_policy.sql:
-- - test-doctor-alpha: readable because active/public.
-- - test-doctor-beta-pending: blocked because pending/hidden.
-- - test-doctor-gamma-archived: blocked because archived/public.
-- - test-doctor-delta-hidden: blocked because active/hidden.
-- - test-doctor-epsilon-internal: blocked because active/internal.
-- - test-doctor-zeta-disputed: readable because active/public; disputed is a verification state, not a visibility block.
-- - test-doctor-eta-minimal: readable because active/public; validates missing optional field handling.
--
-- No private contacts are included.
-- No license or certificate fields are included.
-- No patient, booking, payment, review, or rating data is included.
-- No RLS changes are included.
