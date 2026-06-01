# DigitalDirectory-v2 Public Listing Schema Draft

## Purpose

This document defines a documentation-only draft for the first public listing database structure in DigitalDirectory-v2.

It does not add SQL, migrations, Supabase client code, Supabase packages, backend functionality, authentication, dashboards, protected routes, storage, or frontend UI changes.

The goal is to clarify the public listing schema before any real Supabase tables, migrations, RLS policies, or integration code are created.

---

## Core Principle

The first public schema should model only public-safe healthcare directory information.

DigitalDirectory-v2 should keep public browsing open and login-free while separating public listing fields from private review, ownership, patient, booking, payment, document, chatbot, notification, and community data.

This draft is intentionally conservative. It should guide future SQL and migration work, not replace it.

---

## Schema Purpose

The public listing schema should support:

- Facility discovery
- Doctor discovery
- Pharmacy discovery
- Diagnostics provider discovery
- Search and category pages
- Static detail pages becoming database-backed later
- Public services and specialties
- Public locations
- Public contact channels
- Reviewed doctor/facility affiliations
- Reviewed facility/service relationships
- Listing, verification, and visibility status labels
- Future seed data migration planning

The schema should not support advanced account-based features yet.

---

## Public Listing Data Principles

Public listing data should be:

- Patient-facing
- Searchable
- Reviewed before publication
- Free of private notes
- Free of patient data
- Free of verification evidence
- Free of provider owner account details
- Safe to expose through public pages
- Stable enough to support canonical routes and sharing

Rules:

- Public records should have stable IDs and slugs.
- Public pages should read only published records.
- Public records should not include admin/reviewer notes.
- Public records should not include private contact details.
- Public records should not include unreviewed claims as verified-looking facts.
- High-impact claims such as emergency, 24-hour, specialist services, and location changes should require review before publication.

---

## Facilities Table Draft

Future table name:

```text
facilities
```

Purpose:
Stores public-safe facility listings such as hospitals, clinics, health centers, and specialty centers.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Canonical route segment |
| `name` | Text | Yes | Public facility name |
| `facility_type` | Text or enum | Yes | Hospital, clinic, health center, specialty center |
| `summary` | Text | Yes | Short public description |
| `description` | Text | Yes | Longer reviewed public text |
| `location_id` | Relationship | Yes | Links to `locations` |
| `address_line` | Text | Yes | Reviewed public address |
| `directions_note` | Text | Yes | Optional public landmark/directions note |
| `verification_status` | Text or enum | Yes | Public trust label |
| `listing_status` | Text or enum | Partly | Controls public lifecycle |
| `visibility_status` | Text or enum | Internal/public-derived | Controls public display |
| `ownership_status` | Text or enum | No or limited | Public display should be cautious |
| `primary_image_url` | Text | Yes later | Reviewed public image only |
| `accepts_walk_ins_preview` | Boolean or text | Yes later | Preview-only until booking exists |
| `emergency_available` | Boolean | Yes, high review | High-risk claim |
| `created_at` | Timestamp | No or internal | Public not required |
| `updated_at` | Timestamp | Optional | May show public freshness later |
| `published_at` | Timestamp | Optional | Public freshness indicator |

Private fields that should not live directly in public payloads:

- Internal notes
- Reviewer notes
- Verification evidence
- Owner account ID
- Private phone/email
- Source confidence
- Audit snapshots
- Provider claim history

---

## Doctors Table Draft

Future table name:

```text
doctors
```

Purpose:
Stores public-safe doctor profiles.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Canonical route segment |
| `full_name` | Text | Yes | Public doctor name |
| `display_title` | Text | Yes | Dr., Prof., etc., if reviewed |
| `specialty_id` | Relationship | Yes | Primary specialty |
| `summary` | Text | Yes | Short public profile summary |
| `bio` | Text | Yes | Reviewed public text |
| `location_id` | Relationship | Yes | Primary public location |
| `verification_status` | Text or enum | Yes | Public trust label |
| `listing_status` | Text or enum | Partly | Lifecycle state |
| `visibility_status` | Text or enum | Internal/public-derived | Display control |
| `ownership_status` | Text or enum | No or limited | Ownership should not imply verification |
| `telemedicine_preview_status` | Text or enum | Yes later | Preview-only until real telemedicine exists |
| `availability_summary` | Text | Yes | Preview-only, not booking slots |
| `profile_image_url` | Text | Yes later | Reviewed public image only |
| `created_at` | Timestamp | No or internal | Public not required |
| `updated_at` | Timestamp | Optional | May show public freshness later |
| `published_at` | Timestamp | Optional | Public freshness indicator |

Private fields that should not be public:

- Credential documents
- License evidence
- Private contact
- Owner account link
- Admin/reviewer notes
- Schedule source confidence
- Patient reviews before moderation
- Booking history
- Telemedicine session data

Rules:

- Doctor profiles should not imply booking availability.
- Doctor profiles should not imply facility affiliation unless the relationship is reviewed.
- Doctor ownership should not automatically verify a doctor.
- Doctor schedule data should remain separate from basic public profile data.

---

## Pharmacies Table Draft

Future table name:

```text
pharmacies
```

Purpose:
Stores public-safe pharmacy listings.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Canonical route segment |
| `name` | Text | Yes | Public pharmacy name |
| `summary` | Text | Yes | Short public description |
| `description` | Text | Yes | Reviewed public text |
| `location_id` | Relationship | Yes | Links to `locations` |
| `address_line` | Text | Yes | Reviewed public address |
| `verification_status` | Text or enum | Yes | Public trust label |
| `listing_status` | Text or enum | Partly | Lifecycle state |
| `visibility_status` | Text or enum | Internal/public-derived | Display control |
| `ownership_status` | Text or enum | No or limited | Ownership planning only |
| `pickup_available_preview` | Boolean or text | Yes | Preview-only, not a real workflow |
| `delivery_ready_preview` | Boolean or text | Yes | Preview-only, not delivery logic |
| `created_at` | Timestamp | No or internal | Public not required |
| `updated_at` | Timestamp | Optional | May show public freshness later |
| `published_at` | Timestamp | Optional | Public freshness indicator |

Do not include:

- Medication inventory
- Prescription uploads
- Prescription details
- Pricing
- Payment data
- Delivery address
- Patient contact details
- Order status

---

## Diagnostics Providers Table Draft

Future table name:

```text
diagnostics_providers
```

Purpose:
Stores public-safe laboratory, imaging, and diagnostics provider listings.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Canonical route segment |
| `name` | Text | Yes | Public diagnostics provider name |
| `diagnostics_type` | Text or enum | Yes | Lab, imaging, mixed diagnostics |
| `summary` | Text | Yes | Short public description |
| `description` | Text | Yes | Reviewed public text |
| `location_id` | Relationship | Yes | Links to `locations` |
| `address_line` | Text | Yes | Reviewed public address |
| `verification_status` | Text or enum | Yes | Public trust label |
| `listing_status` | Text or enum | Partly | Lifecycle state |
| `visibility_status` | Text or enum | Internal/public-derived | Display control |
| `ownership_status` | Text or enum | No or limited | Ownership planning only |
| `lab_services_preview` | Text or relationship | Yes | Public service summary only |
| `imaging_services_preview` | Text or relationship | Yes | Public service summary only |
| `created_at` | Timestamp | No or internal | Public not required |
| `updated_at` | Timestamp | Optional | May show public freshness later |
| `published_at` | Timestamp | Optional | Public freshness indicator |

Do not include:

- Lab result files
- Result status
- Patient test orders
- Pricing
- Payment data
- Booking slots
- Clinical interpretation

---

## Services Table Draft

Future table name:

```text
services
```

Purpose:
Stores reusable public healthcare service labels.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Stable public key |
| `name` | Text | Yes | Public service name |
| `category` | Text or enum | Yes | Facility, pharmacy, diagnostics, general |
| `description` | Text | Yes | Public taxonomy explanation |
| `risk_level` | Text or enum | Internal/public-derived | High-risk claims need review |
| `listing_status` | Text or enum | Partly | Active, archived, hidden |
| `created_at` | Timestamp | No | Internal timestamp |
| `updated_at` | Timestamp | No or optional | Internal/public freshness later |

Rules:

- Services should be normalized where possible.
- New service names should be reviewed before public taxonomy use.
- High-impact services such as emergency, ICU, surgery, maternity, and blood bank should receive stronger review.
- Services should not imply current availability, price, booking, or provider quality.

---

## Specialties Table Draft

Future table name:

```text
specialties
```

Purpose:
Stores reusable public medical specialty labels.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Stable public key |
| `name` | Text | Yes | Specialty display label |
| `description` | Text | Yes | Public explanation |
| `parent_specialty_id` | Relationship | Yes later | Optional hierarchy |
| `listing_status` | Text or enum | Partly | Active, archived, hidden |
| `created_at` | Timestamp | No | Internal timestamp |
| `updated_at` | Timestamp | No or optional | Internal/public freshness later |

Rules:

- Specialty names should be normalized.
- Specialty labels should not imply doctor verification.
- Specialty pages should show only published doctors and providers.
- Sensitive or ambiguous specialty labels should be reviewed.

---

## Locations Table Draft

Future table name:

```text
locations
```

Purpose:
Stores normalized public location labels for discovery.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `slug` | Text | Yes | Stable public key |
| `name` | Text | Yes | Display name |
| `location_type` | Text or enum | Yes | Country, city, area, neighborhood |
| `parent_location_id` | Relationship | Yes | Supports hierarchy |
| `country_code` | Text | Yes | Optional |
| `display_order` | Number | Yes | Sort ordering |
| `latitude` | Decimal | No or reviewed later | High review if public |
| `longitude` | Decimal | No or reviewed later | High review if public |
| `listing_status` | Text or enum | Partly | Active, archived, hidden |
| `created_at` | Timestamp | No | Internal timestamp |
| `updated_at` | Timestamp | No or optional | Internal/public freshness later |

Rules:

- Locations should support browsing without requesting live location.
- Coordinates should not be treated as trusted until reviewed.
- Facility destination accuracy should be governed through correction and review workflows.
- Locations should not store patient live location or search history.

---

## Doctor-Facility Relationship Table Draft

Future table name:

```text
doctor_facility_affiliations
```

Purpose:
Links doctors to facilities for reviewed public affiliation display.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `doctor_id` | Relationship | Yes | Links to `doctors` |
| `facility_id` | Relationship | Yes | Links to `facilities` |
| `affiliation_label` | Text | Yes | Public role label if reviewed |
| `department_or_service` | Text or relationship | Yes later | Optional public context |
| `is_primary` | Boolean | Yes | Main displayed affiliation |
| `verification_status` | Text or enum | Yes | Affiliation trust state |
| `listing_status` | Text or enum | Partly | Active, inactive, archived |
| `review_status` | Text or enum | Internal/public-derived | Approval state |
| `effective_from` | Date | Optional | Public only if useful |
| `effective_until` | Date | Optional | Public only if useful |
| `created_at` | Timestamp | No | Internal timestamp |
| `updated_at` | Timestamp | No or optional | Internal/public freshness later |

Rules:

- Facility affiliation should not imply doctor verification.
- Doctor verification should not imply facility affiliation.
- Facility-submitted affiliations should require review.
- Doctor-submitted affiliations should require review.
- Ended affiliations should be archived rather than deleted immediately.

---

## Facility-Service Relationship Table Draft

Future table name:

```text
facility_services
```

Purpose:
Links facilities to reviewed public services.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `facility_id` | Relationship | Yes | Links to `facilities` |
| `service_id` | Relationship | Yes | Links to `services` |
| `public_note` | Text | Yes | Optional reviewed context |
| `availability_preview` | Text or enum | Yes | Preview-only, not booking |
| `verification_status` | Text or enum | Yes | Service claim trust state |
| `listing_status` | Text or enum | Partly | Active, inactive, archived |
| `review_status` | Text or enum | Internal/public-derived | Approval state |
| `created_at` | Timestamp | No | Internal timestamp |
| `updated_at` | Timestamp | No or optional | Internal/public freshness later |

Rules:

- Service links should not imply pricing.
- Service links should not imply appointment availability.
- High-risk services should require stronger review.
- Removed services should be archived for history.

Related future relationship tables may include:

- `pharmacy_services`
- `diagnostics_services`
- `doctor_specialties`
- `facility_specialties`

Those should be added only when needed.

---

## Public Contact Channels Table Draft

Future table name:

```text
contact_channels
```

Purpose:
Stores reviewed public contact methods for providers.

Draft fields:

| Field | Type Direction | Public? | Notes |
| --- | --- | --- | --- |
| `id` | UUID or stable ID | Yes | Primary identifier |
| `provider_type` | Text or enum | Yes | Facility, doctor, pharmacy, diagnostics |
| `provider_id` | Relationship direction | Yes | Target provider ID |
| `channel_type` | Text or enum | Yes | Phone, email, website, social, other |
| `label` | Text | Yes | Public display label |
| `value` | Text | Yes | Public contact value |
| `is_primary` | Boolean | Yes | Main contact |
| `public_note` | Text | Yes | Optional reviewed note |
| `verification_status` | Text or enum | Yes | Contact trust state |
| `listing_status` | Text or enum | Partly | Active, archived, hidden |
| `review_status` | Text or enum | Internal/public-derived | Approval state |
| `created_at` | Timestamp | No | Internal timestamp |
| `updated_at` | Timestamp | No or optional | Internal/public freshness later |

Rules:

- Public contact channels must be reviewed before display.
- Contact changes are high-impact and should require review.
- Private staff contacts should not appear here.
- External booking or payment links should be treated as high-risk and reviewed separately.
- Contact channels should not store patient contact details.

---

## Listing Status Rules

Listing status describes the lifecycle of a public provider or taxonomy record.

Recommended values:

| Status | Meaning |
| --- | --- |
| `draft` | Not ready for review |
| `pending_review` | Waiting for review |
| `published` | Approved for public display |
| `needs_information` | More information needed |
| `rejected` | Not approved for publication |
| `hidden` | Temporarily not public |
| `archived` | Kept for history, not active |
| `duplicate` | Merged or superseded by another record |

Rules:

- Only `published` records should appear publicly by default.
- `hidden`, `archived`, `rejected`, and `duplicate` should not appear in public search.
- Status changes should be auditable.
- Public labels may be simpler than internal statuses.

---

## Verification Status Rules

Verification status communicates trust state but should not overclaim.

Recommended values:

| Status | Meaning |
| --- | --- |
| `unverified` | Not reviewed or not enough evidence |
| `pending` | Verification review is in progress |
| `verified` | Reviewed according to platform policy |
| `needs_update` | Verification is stale or incomplete |
| `expired` | Verification is no longer current |
| `rejected` | Verification was not approved |
| `community_submitted` | Submitted by community and not independently verified |

Rules:

- Verification status should not expose evidence.
- Verification status should not be self-assigned by providers.
- Ownership does not equal verification.
- Reviewers/admins should control verification changes.
- Verification changes should create audit logs.
- Public copy should explain trust status carefully.

---

## Visibility Status Rules

Visibility status controls whether a record appears in public surfaces.

Recommended values:

| Status | Meaning |
| --- | --- |
| `public` | Eligible for public pages |
| `limited` | Public in limited contexts only |
| `private` | Not public |
| `hidden` | Hidden by admin or policy |
| `suppressed` | Hidden for safety, duplicate, or quality reasons |

Rules:

- Visibility should be derived from listing status, review status, and safety decisions.
- Visibility should not expose why a record is hidden if that reason is sensitive.
- Public UI should not query private records.
- Suppression reasons should remain internal.

---

## Ownership Status Rules

Ownership status describes whether a provider listing has a future approved owner or claim.

Recommended values:

| Status | Meaning |
| --- | --- |
| `unclaimed` | No approved owner |
| `claim_pending` | Ownership claim under review |
| `claimed` | Approved owner exists |
| `claim_rejected` | Claim was not approved |
| `disputed` | Ownership conflict |
| `transferred` | Ownership changed |
| `revoked` | Ownership removed |

Rules:

- Ownership status should not be treated as verification.
- Ownership records should be private by default.
- Public display of ownership should be cautious and likely unnecessary in early phases.
- Ownership changes should require review and audit logging.
- Provider owners should submit changes as requests, not direct public edits in early phases.

---

## Public and Private Field Separation

The schema should separate what public users can read from what internal workflows need.

Public-safe field examples:

- Provider name
- Provider type
- Slug
- Public summary
- Public location
- Public address
- Public services and specialties
- Public contact channels
- Public working hours
- Public verification label
- Public listing status label

Private/internal field examples:

- Admin notes
- Reviewer notes
- Verification evidence
- Provider owner account IDs
- Private submitter contacts
- Private provider contacts
- Source confidence
- Review assignments
- Audit logs
- Patient identity
- Booking details
- Payment records
- Document vault data
- Community membership
- Chatbot conversation logs

Rules:

- Private fields should live in private tables or protected views.
- Public queries should not need private fields.
- Search indexes should use public-safe fields only.
- RLS should enforce separation even if application code has a bug.

---

## Seed Data Mapping

Current seed files can guide future schema mapping.

| Seed File | Future Table Direction |
| --- | --- |
| `src/data/seed-facilities.ts` | `facilities`, `facility_services`, `contact_channels`, `working_hours` |
| `src/data/seed-doctors.ts` | `doctors`, `doctor_facility_affiliations`, `specialties` |
| `src/data/seed-pharmacies.ts` | `pharmacies`, pharmacy service relationships, `contact_channels` |
| `src/data/seed-diagnostics.ts` | `diagnostics_providers`, diagnostics service relationships |
| `src/data/seed-services.ts` | `services` |
| `src/data/seed-specialties.ts` | `specialties` |
| `src/data/seed-locations.ts` | `locations` |
| `src/data/seed-community-channels.ts` | Later public community channel planning, not public listings |

Mapping rules:

- Treat seed data as sample-only.
- Do not treat seed verification labels as real verification.
- Do not migrate sample records into production as real reviewed listings.
- Normalize repeated strings into locations, services, specialties, contact channels, and relationships.
- Preserve slugs for existing static detail pages where useful.
- Add source and review metadata internally during future migration.

---

## Future Migration Considerations

Before migration:

- Confirm which data source is authoritative.
- Define public-safe fields for each provider type.
- Normalize taxonomy records.
- Review names, addresses, contact channels, and service claims.
- Define deduplication rules.
- Define slug rules.
- Define status values.
- Define audit event types.
- Define RLS policies in plain language.
- Use staging before production.

Migration order:

1. Locations
2. Services
3. Specialties
4. Facilities
5. Facility-service relationships
6. Doctors
7. Doctor-facility relationships
8. Pharmacies
9. Diagnostics providers
10. Contact channels
11. Working hours
12. Public search documents later

Rules:

- No public publication without review.
- No patient data migration in public listing phase.
- No private evidence in public tables.
- No production migration from unreviewed sample records.

---

## What Should Not Be Included Yet

Do not include these in the public listing schema phase:

- Patient accounts
- Patient ID
- Booking requests
- Appointment slots
- Telemedicine sessions
- Payment transactions
- Wallet ledger
- Pharmacy orders
- Prescription uploads
- Diagnostics test orders
- Lab result files
- Patient document vault
- Verification document storage
- Reviews and ratings
- Review disputes
- Notifications
- Chatbot conversation logs
- Community groups
- Transport requests
- Referral tracking
- Admin dashboard UI records beyond review planning
- Protected route state
- Real-time chat

These features require later dedicated schemas, RLS, consent, audit, and security planning.

---

## Relationship to RLS Planning

This schema draft should inform future RLS policies.

RLS direction:

- Anonymous users can read published public-safe listing records.
- Anonymous users cannot read private request, review, ownership, audit, patient, booking, payment, document, notification, chatbot, or community records.
- Public reads should filter by `listing_status = published` and public visibility.
- Provider owners can submit future update requests only after auth and ownership exist.
- Reviewers/admins can manage review records only after roles and dashboards exist.
- Service role access should remain server-only.

Important:
RLS policy details should be written before SQL migrations are created.

---

## Relationship to Supabase Phase 1

This draft supports `SupabaseIntegrationPhase1.md`.

Phase 1 relationship:

- This document defines candidate public listing tables and fields.
- Phase 1 defines the broader backend integration order.
- This draft helps decide what belongs in initial migrations.
- This draft keeps advanced workflows out of the public schema.
- This draft supports public/private data boundaries and seed migration planning.

Phase 1 should begin with the smallest useful public read model, then add request/review foundations.

---

## MVP Recommendation

Do not create these tables in this documentation task.

Current MVP stance:

- Keep static seed data active.
- Keep the app frontend-only.
- Do not add SQL.
- Do not add migrations.
- Do not add Supabase client code.
- Do not add Supabase packages.
- Do not add backend functionality.
- Do not add auth, dashboards, protected routes, or storage.
- Do not modify frontend UI.

Recommended first implementation later:

Create only the minimum public tables needed for read-only public listings, with RLS enabled and public/private field separation tested before connecting UI.

---

## Risks

Key risks:

- Mixing public fields and internal review fields.
- Exposing private provider ownership data.
- Treating seed data as real verified data.
- Publishing unreviewed contact or location changes.
- Treating preview availability as real booking.
- Adding patient, payment, document, or community fields too early.
- Creating tables before RLS rules are clear.
- Overloading provider tables with unrelated workflows.
- Publicly displaying ownership as if it were verification.
- Creating duplicate records without migration review.

Mitigations:

- Keep public listing tables narrow.
- Use relationship tables for services and affiliations.
- Keep request, review, ownership, and audit tables private.
- Require review before publishing high-impact fields.
- Enable RLS before public access.
- Start with staging data.
- Document field purpose before migration.
- Add advanced workflows only in later dedicated phases.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only until Supabase implementation is approved.
2. Review this schema draft against `DataModelContentStructure.md` and `SupabaseIntegrationPhase1.md`.
3. Finalize public-safe fields for facilities, doctors, pharmacies, and diagnostics providers.
4. Finalize status value names for listing, verification, visibility, and ownership.
5. Finalize location, service, and specialty normalization rules.
6. Define relationship tables needed for the first public read model.
7. Define public contact channel review rules.
8. Write RLS policy requirements in plain language.
9. Create SQL/migrations only in a later approved database task.
10. Migrate reviewed taxonomy records first.
11. Migrate reviewed provider records in staging.
12. Connect one public read-only surface to Supabase after RLS is tested.
13. Add request/review foundations after public read model is stable.
14. Add auth, ownership, dashboards, storage, booking, payments, documents, chatbot, notifications, and community features only in later phases.

---

## Summary

The first public listing schema should support public healthcare discovery without exposing private operational, patient, financial, document, or moderation data.

The safest draft includes public provider tables, reusable services, specialties, locations, reviewed relationship tables, public contact channels, status rules, public/private field separation, seed mapping, and RLS planning.

The recommended current action is documentation only. No SQL, migrations, Supabase code, backend, auth, dashboards, protected routes, storage, or frontend UI changes should be added in this task.
