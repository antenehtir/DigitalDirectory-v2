-- DigitalDirectory-v2 doctors table migration draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Creates a draft public.doctors table shape.
-- - Includes public-safe doctor listing fields only.
-- - Adds public-safe status constraints and lookup indexes.
-- - Adds a simple updated_at trigger using the existing helper name if present.
--
-- Out of scope for this draft:
-- - No RLS policies.
-- - No test inserts.
-- - No private phone numbers.
-- - No private email addresses.
-- - No license documents.
-- - No uploaded certificates.
-- - No verification evidence.
-- - No admin/reviewer notes.
-- - No patient data.
-- - No bookings.
-- - No payments or wallet data.
-- - No reviews or ratings.
--
-- Note:
-- Supabase projects commonly support gen_random_uuid().
-- Confirm extension availability before running this in a real project.

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  display_name text not null,
  title text,
  specialty text not null,
  subspecialty text,
  bio_public text,
  facility_name_public text,
  city text,
  area text,
  consultation_modes text[] not null default '{}',
  languages text[] not null default '{}',
  listing_status text not null default 'pending',
  visibility_status text not null default 'hidden',
  verification_status text not null default 'unverified',
  last_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint doctors_slug_not_blank
    check (length(trim(slug)) > 0),
  constraint doctors_display_name_not_blank
    check (length(trim(display_name)) > 0),
  constraint doctors_specialty_not_blank
    check (length(trim(specialty)) > 0),
  constraint doctors_listing_status_check
    check (
      listing_status in (
        'draft',
        'pending',
        'active',
        'rejected',
        'archived',
        'suspended'
      )
    ),
  constraint doctors_visibility_status_check
    check (
      visibility_status in (
        'public',
        'hidden',
        'internal'
      )
    ),
  constraint doctors_verification_status_check
    check (
      verification_status in (
        'unverified',
        'pending',
        'verified',
        'disputed',
        'expired'
      )
    )
);

comment on table public.doctors is
  'Draft public-safe doctors listing table for DigitalDirectory-v2. Do not run until reviewed.';

comment on column public.doctors.display_name is
  'Reviewed public doctor name only.';

comment on column public.doctors.title is
  'Reviewed public professional title such as Dr. or Prof. Do not store credentials evidence here.';

comment on column public.doctors.bio_public is
  'Reviewed public biography or profile summary only. Do not store private notes, clinical advice, or verification evidence here.';

comment on column public.doctors.facility_name_public is
  'Reviewed public facility affiliation text only. Formal relationships should move to relationship tables later.';

comment on column public.doctors.consultation_modes is
  'Reviewed public consultation mode labels only, such as in-person or telemedicine preview. Do not store private schedule data here.';

comment on column public.doctors.languages is
  'Reviewed public language labels only.';

comment on column public.doctors.last_confirmed_at is
  'Optional public freshness signal for when doctor listing details were last reviewed or confirmed.';

create index if not exists doctors_slug_idx
  on public.doctors (slug);

create index if not exists doctors_listing_status_idx
  on public.doctors (listing_status);

create index if not exists doctors_visibility_status_idx
  on public.doctors (visibility_status);

create index if not exists doctors_verification_status_idx
  on public.doctors (verification_status);

create index if not exists doctors_listing_visibility_idx
  on public.doctors (listing_status, visibility_status);

create index if not exists doctors_specialty_idx
  on public.doctors (specialty);

create index if not exists doctors_subspecialty_idx
  on public.doctors (subspecialty);

create index if not exists doctors_city_idx
  on public.doctors (city);

create index if not exists doctors_area_idx
  on public.doctors (area);

create index if not exists doctors_city_area_idx
  on public.doctors (city, area);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists doctors_set_updated_at on public.doctors;

create trigger doctors_set_updated_at
before update on public.doctors
for each row
execute function public.set_updated_at();

-- No RLS policies are included in this draft.
-- No test data inserts are included in this draft.
-- Review schema, status values, indexes, trigger naming, and RLS plan before running.
-- Keep private contacts, documents, admin notes, patient data, bookings, payments, reviews, and ratings out of this public table.
