# DigitalDirectory-v2 Supabase Backend Planning

## Purpose

This document defines a future Supabase backend plan for DigitalDirectory-v2.

It is planning-only. It does not add Supabase code, packages, clients, environment files, SQL, migrations, authentication, dashboards, protected routes, or UI pages.

The goal is to prepare a careful backend direction that preserves the product principles:

- Public healthcare discovery should stay open and login-free.
- Verified and unverified information must remain clearly separated.
- Provider ownership, admin review, auditability, and private verification data must be protected.
- Backend work should happen only after the data model, role strategy, and trust workflow are clear.

---

## Supabase Scope

Supabase may be used later for:

- Postgres database
- Public healthcare listing reads
- Provider registration and correction request storage
- Feedback submission storage
- Admin review workflow data
- Authentication when real account actions exist
- Role-based access policies
- File storage for future verification documents
- Audit logs for trust-critical changes

Supabase should not be used yet for:

- Current frontend sample data
- Placeholder social/community links
- Static preview forms
- Authentication before provider/admin workflows exist
- Dashboards before permissions are defined
- Real-time features before a specific need exists

---

## Proposed Database Tables

The following table list is a future planning map, not an implementation instruction.

### Public Listing Tables

| Table | Purpose |
| --- | --- |
| `facilities` | Hospitals, clinics, health centers, specialty centers |
| `doctors` | Individual healthcare professionals |
| `pharmacies` | Pharmacy listings and future pharmacy-specific profile data |
| `diagnostics_providers` | Laboratories, imaging centers, and diagnostics providers |
| `services` | Reusable healthcare services |
| `specialties` | Reusable clinical specialties |
| `locations` | Normalized geographic hierarchy |
| `contact_channels` | Public and private contact methods, separated by visibility |
| `working_hours` | Reusable schedule records |
| `community_channels` | Official update channels when real links exist |

### Relationship Tables

| Table | Purpose |
| --- | --- |
| `facility_services` | Facility-to-service relationship |
| `facility_specialties` | Facility-to-specialty relationship |
| `doctor_specialties` | Doctor-to-specialty relationship |
| `doctor_facility_affiliations` | Doctor-to-facility relationship |
| `pharmacy_services` | Pharmacy-to-service relationship |
| `diagnostics_services` | Diagnostics provider-to-service relationship |
| `provider_locations` | Optional multi-location relationship for future expansion |

### Intake and Community Tables

| Table | Purpose |
| --- | --- |
| `provider_registration_requests` | Add, claim, verify, or update provider requests |
| `correction_requests` | Listing correction requests |
| `feedback_submissions` | Product feedback and trust concerns |
| `contact_messages` | Future contact/support messages if contact submission becomes real |
| `newsletter_interest` | Future email update interest only if newsletter subscription becomes real |

### Verification and Admin Tables

| Table | Purpose |
| --- | --- |
| `verification_cases` | Verification workflow records |
| `admin_reviews` | Admin/reviewer decisions and review status |
| `audit_logs` | Trust-critical change history |
| `duplicate_groups` | Future duplicate detection and merge tracking |
| `moderation_flags` | Safety, quality, or abuse review flags |

### Account and Role Tables

These should be added only when authentication is introduced.

| Table | Purpose |
| --- | --- |
| `profiles` | Public-safe user profile extension for authenticated accounts |
| `roles` | Role definitions such as doctor, facility, pharmacy, diagnostics provider, reviewer, admin, partner |
| `user_roles` | User-to-role assignments |
| `provider_ownerships` | Account ownership or management rights over provider listings |
| `organization_memberships` | Future team and organization access |

### Search Tables

| Table | Purpose |
| --- | --- |
| `search_documents` | Denormalized public search index records |
| `search_aliases` | Synonyms, alternate spellings, and future multilingual terms |

---

## Table Relationships

Future relationships should follow these rules:

- A facility can offer many services.
- A facility can cover many specialties.
- A doctor can have many specialties.
- A doctor can be affiliated with many facilities.
- A pharmacy can offer many pharmacy-related services.
- A diagnostics provider can offer many laboratory or imaging services.
- A provider can have many contact channels.
- A provider can have many working hour records.
- A provider can have one primary location and future secondary locations.
- A registration request can reference an existing listing or propose a new one.
- A correction request should reference a specific listing when possible.
- A verification case should reference the listing or registration request being verified.
- An admin review should reference the item under review.
- Audit logs should reference the changed entity and actor.
- Ownership records should connect authenticated accounts to specific provider listings.

Recommended ownership shape:

| Ownership Target | Future Owner Record |
| --- | --- |
| Doctor profile | Doctor account or organization-managed account |
| Facility listing | Facility organization account |
| Pharmacy listing | Pharmacy organization account |
| Diagnostics listing | Diagnostics organization account |
| Admin-managed listing | Admin role with audit history |

---

## Public vs Internal Tables

### Public-Readable Tables

Public reads should be limited to published, public-safe records:

- `facilities`
- `doctors`
- `pharmacies`
- `diagnostics_providers`
- `services`
- `specialties`
- `locations`
- public rows in `contact_channels`
- public rows in `working_hours`
- public rows in `community_channels`
- public rows in `search_documents`

Public reads should exclude:

- Draft records
- Hidden records
- Archived records
- Suspended records
- Rejected records
- Private contact channels
- Internal notes
- Verification evidence
- Review notes
- Submitter private contact details

### Internal Tables

Internal tables should require authenticated roles and strict policies:

- `provider_registration_requests`
- `correction_requests`
- `feedback_submissions`
- `contact_messages`
- `verification_cases`
- `admin_reviews`
- `audit_logs`
- `duplicate_groups`
- `moderation_flags`
- `provider_ownerships`
- `organization_memberships`

### Mixed Tables

Some tables may contain both public and private rows:

- `contact_channels`
- `working_hours`
- `community_channels`
- future `profiles`

Mixed tables should include visibility fields such as `is_public`, `listing_status`, or equivalent policy criteria.

---

## Row-Level Security Direction

Row Level Security should be enabled before production data is stored.

### Public Read Direction

Public users may read:

- Published listings
- Public services and specialties
- Public locations
- Public contact channels
- Public working hours
- Public community channels
- Public search documents

Public users may not read:

- Internal notes
- Verification evidence
- Registration request private contact details
- Correction submitter contact details
- Feedback submitter contact details
- Admin reviews
- Audit logs
- Ownership records

### Anonymous Write Direction

Anonymous writes should be treated carefully.

Possible future anonymous inserts:

- Correction requests
- Feedback submissions
- Contact messages
- Provider registration requests

These should include:

- Rate limiting strategy
- Bot protection strategy
- Validation strategy
- Review-before-publish workflow
- Private default status

Nothing submitted anonymously should directly modify public listing data.

### Provider Role Direction

Authenticated provider users may:

- Read their own requests.
- Read ownership records for their own listings.
- Submit updates for owned listings.
- View verification status for their own listings.

Provider users may not:

- Publish changes directly without review.
- Read other providers' private submissions.
- Access admin notes or reviewer notes.
- Approve verification.
- Modify audit logs.

### Reviewer Role Direction

Reviewer users may:

- Read assigned review cases.
- Add review notes.
- Recommend decisions.
- Request more information.

Reviewer users may not:

- Manage global roles.
- Delete audit logs.
- Access unrelated private submissions unless assigned.
- Override admin-only final decisions unless explicitly allowed later.

### Admin Role Direction

Admin users may:

- Manage listings.
- Assign reviewers.
- Approve or reject verification.
- Resolve corrections.
- Manage roles.
- Review audit logs.

Admin access should still be audited and least-privilege where possible.

---

## Authentication Timing

Authentication should not be introduced for browsing.

Recommended timing:

1. Keep the current public frontend login-free.
2. Define table and policy design before enabling accounts.
3. Add authentication only when provider claims, verification review, admin workflows, or dashboards are ready.
4. Start with admin and provider workflows, not patient accounts.
5. Add optional patient accounts later only if saved providers, bookings, telemedicine, membership, or notification preferences become real.

Initial future auth roles:

- Admin
- Reviewer / verifier
- Doctor
- Facility
- Pharmacy
- Diagnostics provider

Later roles:

- Patient
- Partner
- Organization staff

---

## Environment Variables Planning

No environment files should be added yet.

When Supabase is introduced later, expected variables may include:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public project URL for browser-safe client use |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key governed by RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin key, never exposed to browser |
| `SUPABASE_JWT_SECRET` | Server-only JWT validation use if needed |
| `SUPABASE_STORAGE_BUCKET_VERIFICATION` | Future document bucket name |

Rules:

- Do not expose service role keys to client code.
- Do not commit real environment values.
- Document required variables before adding them.
- Keep browser-safe and server-only variables clearly separated.

---

## Storage Planning

Storage should wait until document upload is a real feature.

Potential future buckets:

| Bucket | Purpose | Access Direction |
| --- | --- | --- |
| `verification-documents` | Licenses, ownership proof, provider documents | Private |
| `provider-images` | Public-safe logos or profile images | Public or transformed public copies |
| `review-attachments` | Admin/reviewer evidence | Private |

Storage rules:

- Verification documents should be private.
- Uploaded files should be scanned or reviewed before use.
- Public images should be separated from private evidence.
- Provider-uploaded images should require review before publication.
- Storage access should follow the same role model as database access.

---

## Seed Data Planning

Seed data should be added only after schema decisions are stable.

Recommended seed categories:

- Core locations
- Common specialties
- Common services
- Sample verified facility
- Sample verified doctor
- Sample pharmacy
- Sample diagnostics provider
- Community channel placeholders if official links are not ready
- Verification status values
- Listing status values

Seed data rules:

- Clearly mark sample data as sample.
- Do not seed private or real sensitive information.
- Keep sample records small.
- Avoid fake claims that imply real verification.
- Use seed data for development and testing, not production truth.

---

## Migration Order

Recommended future migration order:

1. Core enum/reference structures, if used.
2. Locations.
3. Services.
4. Specialties.
5. Public listing tables: facilities, doctors, pharmacies, diagnostics providers.
6. Relationship tables.
7. Contact channels.
8. Working hours.
9. Community channels.
10. Registration requests.
11. Correction requests.
12. Feedback submissions.
13. Verification cases.
14. Admin reviews.
15. Audit logs.
16. Search documents.
17. Account, role, ownership, and organization tables after authentication timing is approved.
18. Storage buckets only after upload workflows are approved.

Migration rules:

- Create public read policies only after public fields are reviewed.
- Create internal policies before storing private data.
- Add audit logging before allowing admin review decisions to affect public listings.
- Do not migrate old data directly into trusted status without review.

---

## API and Data Access Strategy

Recommended approach:

- Keep public listing reads simple and cache-friendly.
- Use server-side data access for sensitive or role-based data.
- Use public anonymous reads only for published public-safe records.
- Use server-only access for admin workflows and private data.
- Avoid direct client writes for trust-critical actions unless protected by strict policies and review queues.

Future app data layers may include:

| Layer | Purpose |
| --- | --- |
| Public listing queries | Search and detail pages |
| Provider request actions | Registration, claim, and update requests |
| Correction actions | Correction request intake |
| Feedback actions | Feedback intake |
| Admin review queries | Protected reviewer/admin workflows |
| Search index queries | Fast public discovery |

Public data should be shaped for the UI:

- Cards should receive only card-safe fields.
- Detail pages should receive only public detail-safe fields.
- Search results should receive compact search-safe fields.
- Internal fields should never be included in public UI payloads.

---

## Admin Review Workflow Planning

Future review workflow:

1. A provider, visitor, migration process, or admin creates a draft/request.
2. The request enters an internal review queue.
3. A reviewer checks evidence, public fields, duplicate risk, and trust status.
4. The reviewer recommends approval, rejection, changes, merge, archive, or escalation.
5. An admin makes or confirms the final decision when required.
6. Approved public changes are written to listing tables.
7. The system writes an audit log with before and after snapshots.
8. Public search documents are refreshed.
9. The listing shows the correct verification and listing status.

Review principles:

- Provider-submitted changes should not publish directly.
- Corrections should not overwrite data without review.
- Verification decisions must be auditable.
- Duplicate handling should preserve history.
- Suspicious activity should create moderation flags.

---

## Deployment Considerations

Before deploying a Supabase-backed version:

- Confirm RLS is enabled on tables with real data.
- Confirm anonymous policies expose only public-safe rows.
- Confirm service role keys are server-only.
- Confirm storage buckets have correct privacy settings.
- Confirm admin workflows are protected.
- Confirm audit logs are written for trust-critical actions.
- Confirm seeded data is marked correctly.
- Confirm backup and rollback strategy.
- Confirm production and development Supabase projects are separate.
- Confirm monitoring for errors and failed submissions.

Environment separation:

- Local development project
- Staging project
- Production project

Deployment should not rely on local-only sample data once backend data is active.

---

## Risk Notes

Key risks:

- Exposing private verification or submitter data through public queries.
- Adding authentication before the role model is ready.
- Allowing provider edits to publish without review.
- Treating migrated data as verified without evidence.
- Mixing public and internal fields in the same UI payload.
- Using service role keys in client code.
- Creating storage buckets before privacy rules are defined.
- Adding dashboards before audit logs exist.
- Overcomplicating search before normalized services, specialties, and locations exist.
- Requiring patient login too early and weakening public discovery.

Mitigations:

- Keep public and internal data separate.
- Use least-privilege policies.
- Review every public payload shape.
- Add audit logs before admin actions.
- Keep browsing login-free.
- Add backend features in small phases.

---

## Recommended Next Development Order

1. Keep the current app frontend-only while public discovery polish continues.
2. Stabilize sample data contracts and naming around the content structure document.
3. Define exact public-safe field sets for listing cards, detail pages, and search results.
4. Draft the first backend schema plan from this document, still without implementation.
5. Define RLS policy requirements in plain language before writing migrations.
6. Decide authentication timing and initial roles.
7. Add Supabase dependencies and client only when implementation begins.
8. Create initial schema and policies in a dedicated backend task.
9. Add seed data for non-sensitive reference data.
10. Add public read queries for listings.
11. Add request intake flows.
12. Add admin review and audit workflow.
13. Add provider ownership and dashboards.
14. Add storage only when verification upload is truly ready.
15. Add optional patient accounts only when patient-specific features exist.

---

## Summary

Supabase is a strong future option for DigitalDirectory-v2, but it should be introduced only after the role model, content model, public/internal data boundaries, RLS direction, and admin review workflow are ready.

The backend should protect trust first: public discovery stays open, provider changes go through review, internal data stays private, and verification decisions remain auditable.
