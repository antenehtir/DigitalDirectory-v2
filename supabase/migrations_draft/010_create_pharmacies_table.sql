-- DigitalDirectory-v2 pharmacies table migration draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Creates a draft public.pharmacies table shape for pharmacy discovery only.
-- - Includes public-safe pharmacy listing fields only.
-- - Adds public-safe status constraints and lookup indexes.
-- - Adds a simple updated_at trigger using the existing helper name if present.
--
-- Out of scope for this draft:
-- - No RLS policies.
-- - No test inserts.
-- - No medicine inventory.
-- - No medicine prices.
-- - No prescription uploads.
-- - No patient addresses.
-- - No payment or order workflow data.
-- - No controlled medication workflow.
-- - No private owner contacts.
-- - No private staff contacts.
-- - No verification evidence.
-- - No admin/reviewer notes.
-- - No service-role use from frontend.
--
-- Note:
-- Supabase projects commonly support gen_random_uuid().
-- Confirm extension availability before running this in a real project.

create table if not exists public.pharmacies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  display_name text not null,
  pharmacy_type text,
  description text,
  city text,
  area text,
  address_public text,
  landmark_public text,
  service_modes text[],
  opening_hours_public text,
  delivery_available boolean not null default false,
  pickup_available boolean not null default true,
  accepts_prescription_upload_preview boolean not null default false,
  listing_status text not null default 'draft',
  visibility_status text not null default 'hidden',
  verification_status text not null default 'unverified',
  last_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint pharmacies_slug_not_blank
    check (length(trim(slug)) > 0),
  constraint pharmacies_display_name_not_blank
    check (length(trim(display_name)) > 0),
  constraint pharmacies_pharmacy_type_check
    check (
      pharmacy_type is null
      or pharmacy_type in (
        'retail',
        'hospital_pharmacy',
        'compounding',
        'specialty',
        'wholesale_preview',
        'online_preview'
      )
    ),
  constraint pharmacies_listing_status_check
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
  constraint pharmacies_visibility_status_check
    check (
      visibility_status in (
        'public',
        'hidden',
        'internal'
      )
    ),
  constraint pharmacies_verification_status_check
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

comment on table public.pharmacies is
  'Draft public-safe pharmacies discovery table for DigitalDirectory-v2. Discovery only; do not use for inventory, prescriptions, orders, payments, patient addresses, or admin workflows.';

comment on column public.pharmacies.display_name is
  'Reviewed public pharmacy name only.';

comment on column public.pharmacies.pharmacy_type is
  'Reviewed public pharmacy discovery type only. This is not an operational pharmacy license or workflow category.';

comment on column public.pharmacies.description is
  'Reviewed public discovery summary only. Do not store admin notes, private details, inventory, or clinical claims here.';

comment on column public.pharmacies.address_public is
  'Reviewed public address text only. Do not store patient addresses, delivery addresses, or private owner addresses here.';

comment on column public.pharmacies.landmark_public is
  'Reviewed public landmark or directions hint only.';

comment on column public.pharmacies.service_modes is
  'Reviewed public service mode labels only. Do not store order processing, inventory reservation, prescription processing, or payment workflow data here.';

comment on column public.pharmacies.opening_hours_public is
  'Reviewed public opening hours text only.';

comment on column public.pharmacies.delivery_available is
  'Public discovery preview flag only. This does not create delivery order processing.';

comment on column public.pharmacies.pickup_available is
  'Public discovery preview flag only. This does not create pickup reservation or inventory workflow.';

comment on column public.pharmacies.accepts_prescription_upload_preview is
  'Public preview flag only. This does not create prescription upload functionality or prescription storage.';

comment on column public.pharmacies.listing_status is
  'Pharmacy listing publication lifecycle. Active status is required before public exposure.';

comment on column public.pharmacies.visibility_status is
  'Pharmacy listing visibility boundary. Public visibility is required before public exposure.';

comment on column public.pharmacies.verification_status is
  'Review state for the pharmacy discovery listing. This is not verification evidence.';

comment on column public.pharmacies.last_confirmed_at is
  'Optional public freshness signal for when pharmacy discovery details were last reviewed or confirmed.';

create index if not exists pharmacies_slug_idx
  on public.pharmacies (slug);

create index if not exists pharmacies_listing_visibility_idx
  on public.pharmacies (listing_status, visibility_status);

create index if not exists pharmacies_pharmacy_type_idx
  on public.pharmacies (pharmacy_type);

create index if not exists pharmacies_city_area_idx
  on public.pharmacies (city, area);

create index if not exists pharmacies_delivery_available_idx
  on public.pharmacies (delivery_available);

create index if not exists pharmacies_pickup_available_idx
  on public.pharmacies (pickup_available);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pharmacies_set_updated_at on public.pharmacies;

create trigger pharmacies_set_updated_at
before update on public.pharmacies
for each row
execute function public.set_updated_at();

-- No RLS policies are included in this draft.
-- No test data inserts are included in this draft.
-- Review schema, status values, indexes, trigger naming, and RLS plan before running.
-- Keep medicine inventory, medicine prices, prescription uploads, patient addresses,
-- payment/order workflow data, controlled medication workflow data, private contacts,
-- verification evidence, and admin notes out of this public discovery table.
-- Frontend code must not use a service-role key to read or write pharmacy data.
