-- DigitalDirectory-v2 provider contact channels table migration draft.
-- DRAFT ONLY. DO NOT RUN UNTIL REVIEWED AND APPROVED.
-- This file is a planning artifact for the future Supabase test project.
-- It has not been executed against Supabase.
--
-- Scope:
-- - Creates a draft public.provider_contact_channels table shape.
-- - Includes public-safe contact/action channel fields only.
-- - Adds provider/channel/status constraints and lookup indexes.
-- - Adds a simple updated_at trigger using the existing helper name if present.
--
-- Out of scope for this draft:
-- - No RLS policies.
-- - No test inserts.
-- - No private owner contacts.
-- - No private staff contacts.
-- - No internal support contacts.
-- - No verification evidence.
-- - No admin/reviewer notes.
-- - No patient data.
-- - No bookings.
-- - No payments or wallet data.
-- - No document vault links.
-- - No service-role use from frontend.
--
-- Note:
-- Supabase projects commonly support gen_random_uuid().
-- Confirm extension availability before running this in a real project.

create table if not exists public.provider_contact_channels (
  id uuid primary key default gen_random_uuid(),
  provider_type text not null,
  provider_slug text not null,
  channel_type text not null,
  label text,
  value_public text,
  url_public text,
  is_primary boolean not null default false,
  display_order integer not null default 100,
  listing_status text not null default 'draft',
  visibility_status text not null default 'hidden',
  verification_status text not null default 'unverified',
  last_confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint provider_contact_channels_provider_type_not_blank
    check (length(trim(provider_type)) > 0),
  constraint provider_contact_channels_provider_slug_not_blank
    check (length(trim(provider_slug)) > 0),
  constraint provider_contact_channels_channel_type_not_blank
    check (length(trim(channel_type)) > 0),
  constraint provider_contact_channels_display_order_non_negative
    check (display_order >= 0),
  constraint provider_contact_channels_provider_type_check
    check (
      provider_type in (
        'facility',
        'doctor',
        'pharmacy',
        'diagnostic',
        'telemedicine',
        'ambulance',
        'home_care'
      )
    ),
  constraint provider_contact_channels_channel_type_check
    check (
      channel_type in (
        'phone',
        'whatsapp',
        'telegram',
        'website',
        'email',
        'maps',
        'appointment',
        'habaridoc',
        'emergency',
        'social'
      )
    ),
  constraint provider_contact_channels_listing_status_check
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
  constraint provider_contact_channels_visibility_status_check
    check (
      visibility_status in (
        'public',
        'hidden',
        'internal'
      )
    ),
  constraint provider_contact_channels_verification_status_check
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

comment on table public.provider_contact_channels is
  'Draft public-safe provider contact/action channels table for DigitalDirectory-v2. Do not run until reviewed.';

comment on column public.provider_contact_channels.provider_type is
  'Public provider type. Supports facility, doctor, pharmacy, diagnostic, telemedicine, ambulance, and home_care.';

comment on column public.provider_contact_channels.provider_slug is
  'Public provider slug used with provider_type for MVP contact-channel lookup.';

comment on column public.provider_contact_channels.channel_type is
  'Reviewed public channel/action type only. Do not use for private messaging, bookings, payments, or patient communication records.';

comment on column public.provider_contact_channels.label is
  'Reviewed public label only, such as Main phone, WhatsApp, Website, Directions, or Appointment preview.';

comment on column public.provider_contact_channels.value_public is
  'Reviewed public display value only. Do not store private owner contacts, private staff contacts, internal support contacts, patient data, or verification evidence here.';

comment on column public.provider_contact_channels.url_public is
  'Reviewed public URL or href only. Links should be intentionally public before activation and must not point to private documents, private telemedicine rooms, payment sessions, or internal admin systems.';

comment on column public.provider_contact_channels.is_primary is
  'Marks the preferred public channel for a provider when multiple active/public channels exist.';

comment on column public.provider_contact_channels.display_order is
  'Controls stable public display ordering for reviewed channels.';

comment on column public.provider_contact_channels.listing_status is
  'Channel publication lifecycle. Active status is required before public exposure.';

comment on column public.provider_contact_channels.visibility_status is
  'Channel visibility boundary. Public visibility is required before public exposure.';

comment on column public.provider_contact_channels.verification_status is
  'Review state for the contact/action channel itself. This is not credential evidence.';

comment on column public.provider_contact_channels.last_confirmed_at is
  'Optional public freshness signal for when the channel was last reviewed or confirmed.';

create index if not exists provider_contact_channels_provider_lookup_idx
  on public.provider_contact_channels (provider_type, provider_slug);

create index if not exists provider_contact_channels_provider_public_lookup_idx
  on public.provider_contact_channels (
    provider_type,
    provider_slug,
    listing_status,
    visibility_status
  );

create index if not exists provider_contact_channels_channel_type_idx
  on public.provider_contact_channels (channel_type);

create index if not exists provider_contact_channels_display_order_idx
  on public.provider_contact_channels (display_order);

create index if not exists provider_contact_channels_listing_visibility_idx
  on public.provider_contact_channels (listing_status, visibility_status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists provider_contact_channels_set_updated_at
  on public.provider_contact_channels;

create trigger provider_contact_channels_set_updated_at
before update on public.provider_contact_channels
for each row
execute function public.set_updated_at();

-- No RLS policies are included in this draft.
-- No test data inserts are included in this draft.
-- Review schema, status values, indexes, trigger naming, and RLS plan before running.
-- Keep private owner contacts, patient data, booking/payment data, document links, verification evidence, and admin notes out of this public table.
-- Frontend code must not use a service-role key to read or write provider contact channels.
