# DigitalDirectory-v2 Doctor Profile, Schedule, and Content Strategy

## Purpose

This document defines the future strategy for doctor profile ownership, doctor profile data, facility affiliations, multi-facility schedules, telemedicine availability, and doctor educational content for DigitalDirectory-v2.

It is planning-only. It does not add backend functionality, Supabase, database files, migrations, SQL, authentication, dashboards, protected routes, UI pages, packages, or frontend changes.

The goal is to clarify doctor-specific workflows before real provider dashboards, authentication, Supabase, booking, telemedicine, or content publishing are implemented.

---

## Core Principles

### Public Discovery Remains Open

Patients should be able to find and view doctor profiles without signing in.

Doctor profile ownership, schedule management, telemedicine settings, and content publishing may require accounts later, but public discovery should remain login-free.

### Trust Before Promotion

Doctor profiles should clearly separate:

- Verified doctor identity
- Claimed but pending doctor profiles
- Community-submitted doctor profiles
- Unverified doctor information
- Expired or needs-update verification

Verified doctors should never be visually equal to unverified or community-submitted profiles.

### Review Before Public Changes

Doctor-submitted updates should not publish directly when they affect trust, safety, affiliation, contact, schedule, or medical claims.

Future doctor dashboards should submit changes into review queues. Admins and reviewers should approve, reject, request information, or escalate changes according to risk.

### Protect Patient Privacy

Doctor profile and schedule features should not collect patient health information unless future booking, telemedicine, patient ID, or wallet workflows genuinely require it and have separate privacy planning.

---

## Doctor Profile Ownership

Doctor profile ownership should come later, after authentication, provider ownership rules, admin review, and audit logging exist.

Recommended ownership rules:

- A doctor can request to claim their own profile.
- A facility may request management rights for doctors affiliated with that facility only when appropriate.
- A doctor profile can have one primary doctor owner and optional organization-managed support later.
- Ownership claims should require review before approval.
- Ownership can be revoked by Admin or Super Admin when identity, employment, or trust concerns arise.
- Ownership does not mean verification. Claiming a profile and receiving a verified badge should remain separate decisions.

Future ownership request flow:

1. Doctor or authorized representative submits a claim request.
2. Request enters provider registration or verification queue.
3. Reviewer checks identity, specialty, facility affiliation, and duplicate risk.
4. Admin approves, rejects, requests more information, or escalates.
5. Approved ownership creates a provider ownership record.
6. Audit log records the decision.

Ownership boundaries:

- Doctor owners can submit updates for their own profile.
- Doctor owners cannot approve their own verification.
- Doctor owners cannot publish high-risk public changes directly.
- Doctor owners cannot access other doctors' private requests, review notes, or verification evidence.
- Facility-managed updates should be scoped to doctors with approved affiliation.

---

## Doctor Profile Data

Doctor profile data should be split into public-safe fields and internal/private fields.

### Public Doctor Data

Public fields may include:

| Field | Purpose |
| --- | --- |
| `id` | Stable internal identifier |
| `slug` | Public route segment |
| `full_name` | Public doctor display name |
| `title` | Dr., Prof., or similar public title |
| `specialties` | Linked clinical specialties |
| `facility_affiliations` | Approved public facility relationships |
| `primary_location_id` | Main public location for discovery |
| `bio` | Short public professional summary |
| `languages` | Patient accessibility filter |
| `availability_summary` | Public non-booking schedule preview |
| `telemedicine_available` | Future public availability preview only |
| `contact_channels` | Public-safe contact options when approved |
| `verification_status` | Public trust label |
| `listing_status` | Public visibility state |
| `profile_image_url` | Future reviewed public image |
| `last_verified_at` | Public-safe freshness indicator when useful |

### Internal Doctor Data

Internal fields should require protected access later:

| Field | Purpose |
| --- | --- |
| `owner_account_id` | Future doctor account ownership |
| `license_reference` | Private verification reference |
| `verification_case_id` | Link to verification workflow |
| `internal_notes` | Admin/reviewer notes |
| `source_type` | Admin entered, migrated, provider submitted, community submitted |
| `source_confidence` | Internal quality estimate |
| `next_review_at` | Reverification planning |
| `private_contact_channels` | Reviewer/provider communication only |
| `identity_evidence` | Future private verification evidence |

Rules:

- Public doctor cards should receive only public-safe fields.
- Detail pages should not expose private evidence or review notes.
- Doctor profile photos should be reviewed before publication.
- Specialty, affiliation, and contact changes should be auditable.
- Expired or disputed verification should be reflected clearly in public trust labels.

---

## Facility Affiliation Strategy

Doctors may work with one or more hospitals, clinics, health centers, or specialty centers. Facility affiliation should be modeled as a relationship, not a single text field.

Recommended affiliation fields:

| Field | Purpose |
| --- | --- |
| `doctor_id` | Linked doctor |
| `facility_id` | Linked facility |
| `affiliation_type` | Primary, visiting, consulting, resident, part-time, telemedicine partner |
| `department` | Optional department or unit |
| `public_label` | Patient-friendly display text |
| `is_primary` | Whether this is the main displayed affiliation |
| `verification_status` | Status of the affiliation relationship |
| `review_status` | Admin/reviewer workflow state |
| `starts_at` | Optional start date |
| `ends_at` | Optional end date |

Affiliation review rules:

- New facility affiliations should be reviewed before appearing as verified.
- Facility-submitted doctor relationships should not override doctor-owned profile data without review.
- Doctor-submitted facility relationships should not imply facility endorsement until reviewed.
- Conflicting affiliation claims should escalate to admin review.
- Removed or expired affiliations should be preserved internally for audit history.

Public display rules:

- Show primary affiliation prominently when verified or reviewed.
- Show secondary affiliations only when they improve patient discovery.
- Mark unverified or pending affiliations clearly if displayed.
- Avoid suggesting that a doctor currently works at a facility when the relationship is expired, disputed, or unreviewed.

---

## Multi-Facility Doctor Schedule Strategy

Doctor schedules should support multiple facilities without becoming real booking logic too early.

Current and near-future public UI should use schedule previews only. Real appointment slots, booking, capacity, and patient-specific scheduling should wait for a future backend, provider ownership, audit logging, and privacy rules.

Recommended schedule concepts:

| Field | Purpose |
| --- | --- |
| `doctor_id` | Linked doctor |
| `facility_id` | Optional linked facility for in-person availability |
| `schedule_type` | In-person, telemedicine, on-call, consultation, unavailable |
| `day_of_week` | Weekly recurrence |
| `starts_at` | Start time |
| `ends_at` | End time |
| `timezone` | Timezone for clarity |
| `appointment_required` | Whether walk-in vs appointment is expected |
| `public_note` | Patient-safe display note |
| `review_status` | Review state before publication |
| `effective_from` | Start date for the schedule |
| `effective_until` | End date for temporary schedules |

Multi-facility rules:

- A doctor can have separate schedules per facility.
- A doctor can have a primary availability summary for cards and search results.
- Schedule conflicts should be flagged for review.
- Facility-specific hours should not be confused with doctor-specific availability.
- Emergency or 24-hour claims should require stronger review.
- Temporary schedules should expire or require review after a defined period.

Public schedule display should answer simple questions:

- Where does this doctor practice?
- Which days or times are generally available?
- Is telemedicine preview available?
- Should patients contact the facility first?

It should not imply confirmed appointment availability until booking exists.

---

## Telemedicine Availability Strategy

Telemedicine should remain preview-only until real telemedicine workflows, consent, scheduling, patient privacy, and support rules are defined.

Future telemedicine fields may include:

| Field | Purpose |
| --- | --- |
| `doctor_id` | Linked doctor |
| `telemedicine_available` | Public preview flag |
| `telemedicine_status` | Available, planned, paused, unavailable |
| `platform_type` | Future internal label, not necessarily public |
| `availability_summary` | Patient-safe public text |
| `requires_booking` | Future booking dependency |
| `review_status` | Review state |
| `updated_at` | Freshness marker |

Rules:

- Telemedicine availability should not be shown as active unless the doctor or approved provider has confirmed it.
- Telemedicine should not expose private patient communication details.
- Future telemedicine links should not be public until privacy, consent, and platform rules exist.
- Medical advice should not be delivered through static public pages.
- Telemedicine availability changes should be auditable.

---

## Schedule Update Review Rules

Schedule updates vary in risk. The review model should reflect the impact on patient decisions.

### Lower-Risk Updates

Examples:

- Minor public schedule note edits
- General availability wording
- Non-clinical punctuation or formatting fixes
- Removing outdated unavailable times

Future handling:

- May be reviewed by content reviewer or reviewer.
- Could receive faster review if ownership is verified.
- Should still create audit history.

### Higher-Risk Updates

Examples:

- New facility affiliation schedule
- Emergency or 24-hour availability claim
- Same-day urgent care claim
- Telemedicine availability activation
- Contact method changes tied to schedule
- Conflicting changes from doctor and facility

Future handling:

- Should require reviewer/admin review.
- May require evidence or facility confirmation.
- Should create audit logs with before/after snapshots.
- Should be escalated if there is impersonation, fraud, or patient safety risk.

Recommended status flow:

1. Draft update
2. Submitted
3. In review
4. Needs information
5. Approved
6. Rejected
7. Published
8. Expired or superseded

No schedule update should directly change public data until the future review policy allows it.

---

## Future Doctor Dashboard Needs

A doctor dashboard should not be built yet. It should come only after backend, authentication, provider ownership, review queues, and audit logging are ready.

Future doctor dashboard sections may include:

- Profile overview
- Verification status
- Specialty and bio updates
- Facility affiliations
- Multi-facility schedule preview
- Telemedicine availability preview
- Public contact preferences
- Profile image management
- Submitted update history
- Reviewer requests for more information
- Educational content drafts
- Future booking or telemedicine settings

Dashboard boundaries:

- The dashboard should submit changes for review.
- It should not expose admin notes.
- It should not allow self-verification.
- It should not publish high-risk changes directly.
- It should show clear status for pending, approved, rejected, or needs-information updates.

---

## Doctor Educational Content and Blog Strategy

Doctor educational content may later support trusted health literacy, provider visibility, and community engagement. It should be planned carefully because medical content can influence patient decisions.

Potential content types:

- General health education articles
- Preventive care explainers
- Specialty FAQs
- Public awareness updates
- Non-urgent wellness guidance
- Doctor profile posts
- Facility-supported educational updates

Content should not include:

- Personalized diagnosis
- Patient-specific treatment instructions
- Emergency triage promises
- Unsupported medical claims
- Promotion that hides verification status
- Claims that conflict with platform safety rules

Recommended content fields:

| Field | Purpose |
| --- | --- |
| `id` | Stable content identifier |
| `author_doctor_id` | Linked doctor author |
| `related_facility_id` | Optional facility relationship |
| `title` | Public title |
| `slug` | Public route segment later |
| `summary` | Public preview |
| `body` | Article content |
| `topic_tags` | Search and organization |
| `medical_review_status` | Draft, in review, approved, rejected |
| `content_status` | Draft, published, hidden, archived |
| `disclaimer_type` | Standard medical disclaimer category |
| `published_at` | Public publish timestamp |

Content strategy rules:

- Educational content should be separate from verified listing data.
- Content author identity should be clear.
- Content should not imply platform endorsement of a medical claim unless reviewed.
- Sponsored or partner content should be labeled later if introduced.
- Content should be searchable only after review and publication.

---

## Content Review Rules

Doctor content should use a review path before public publication.

Review checklist:

- Is the author identity clear?
- Is the content general education, not personalized medical advice?
- Are clinical claims cautious and non-alarming?
- Does it avoid promising outcomes?
- Does it avoid diagnosing symptoms?
- Is the language accessible to patients?
- Is the specialty or topic relevant to the doctor?
- Does it include a medical disclaimer?
- Does it avoid collecting patient health data in comments or forms?

Recommended decision types:

| Decision | Meaning |
| --- | --- |
| Approve | Content can publish |
| Reject | Content should not publish |
| Needs changes | Author should revise |
| Escalate | Admin or qualified reviewer should decide |
| Archive | Remove from active public display while preserving history |
| Hide | Temporarily remove due to concern |

High-risk content should escalate to Admin or Super Admin depending on policy and severity.

---

## Medical Disclaimer Rules

Doctor educational content, telemedicine previews, availability notes, and future booking pages should include clear boundaries.

Recommended disclaimer principles:

- Public content is for general information only.
- Public content is not a substitute for professional medical advice, diagnosis, or treatment.
- Emergency symptoms should direct users to appropriate emergency care, not platform browsing.
- Telemedicine availability preview does not guarantee immediate consultation.
- Doctor schedules are informational until booking is implemented.
- Verification badge confirms reviewed identity/listing status, not a guarantee of treatment outcome.

Disclaimers should be visible where they matter, but should not overwhelm basic listing discovery.

---

## Relationship to Admin Review Workflow

Doctor profile, schedule, telemedicine, affiliation, and content changes should map to future admin review workflows.

Relevant queues:

| Doctor Workflow | Future Review Queue |
| --- | --- |
| Profile claim | Provider registration |
| Verification request | Verification |
| Specialty update | Listing update or verification |
| Facility affiliation update | Verification or listing update |
| Schedule update | Listing update |
| Telemedicine activation | Verification or listing update |
| Doctor article draft | Content review |
| Duplicate doctor profile | Duplicate listings |
| Patient trust concern | Feedback or trust and safety |

Review principles:

- Trust-critical doctor changes should require review.
- Reviewers can recommend decisions.
- Admins should confirm high-impact decisions.
- Super Admin should handle severe governance, privacy, fraud, or dispute escalations.
- Every approved public change should create audit history.

---

## Relationship to Future Supabase Tables

This is planning only. No Supabase code, SQL, migrations, policies, or database files should be added yet.

Potential future tables:

| Area | Possible Table |
| --- | --- |
| Doctor profiles | `doctors` |
| Doctor ownership | `provider_ownerships` |
| Doctor specialties | `doctor_specialties` |
| Facility affiliations | `doctor_facility_affiliations` |
| Schedules | `doctor_schedules` or shared `working_hours` with doctor owner type |
| Telemedicine settings | `doctor_telemedicine_settings` |
| Profile update requests | `provider_registration_requests` or `listing_update_requests` |
| Verification cases | `verification_cases` |
| Admin reviews | `admin_reviews` |
| Audit history | `audit_logs` |
| Doctor content | `doctor_content` or `articles` |
| Content review | `content_reviews` or shared `admin_reviews` |
| Search index | `search_documents` |

Future RLS direction:

- Public users can read published, public-safe doctor data.
- Public users cannot read private verification, ownership, or review data.
- Doctor owners can read and submit requests for their own profile.
- Facility owners can submit affiliation requests only for their own facility context.
- Reviewers can read assigned cases.
- Admins can manage operational review decisions.
- Super Admins can access sensitive governance areas with stronger audit requirements.

---

## Relationship to Patient Reviews, Patient ID, and Wallet Concepts

Patient reviews, patient ID, and wallet concepts are future-only and should not be implemented yet.

### Patient Reviews

Patient reviews may later add social trust, but they introduce moderation and privacy risk.

Doctor strategy implications:

- Reviews should be separate from verified doctor data.
- Reviews should not change verification status automatically.
- Doctor owners may respond only under a defined moderation policy.
- Reviews should be moderated for abuse, privacy violations, and harmful claims.
- Patient identity, if used for reviews, should not be public unless explicitly designed and consented.

### Patient ID

Patient ID may become relevant for bookings, telemedicine, membership, or care history.

Doctor strategy implications:

- Doctor public profiles should not expose patient identifiers.
- Schedule and telemedicine features should avoid patient data until privacy rules exist.
- Access to patient-linked booking or telemedicine data should be role-scoped and audited.
- Patient ID should not be required for public doctor discovery.

### Wallet Concepts

Wallet concepts may relate to future payments, credits, subscriptions, memberships, or healthcare programs.

Doctor strategy implications:

- Wallet data should remain separate from doctor public profiles.
- Doctors should not access wallet information unless a future workflow explicitly requires it.
- Payment, refund, and dispute workflows should require separate governance and audit rules.
- Public doctor schedules should not imply paid booking or wallet integration until those features are real.

---

## Recommended Next Development Order

1. Keep doctor discovery and doctor detail pages public, frontend-only, and login-free.
2. Continue using static seed data for doctor previews until real backend work is approved.
3. Refine public-safe doctor data contracts for cards, detail pages, search results, and future schedules.
4. Define exact affiliation, schedule, telemedicine, and doctor content statuses in planning.
5. Map doctor profile ownership to the existing role and governance strategy.
6. Draft future Supabase table and RLS requirements for doctor profiles, affiliations, schedules, and content.
7. Add authentication only when doctor profile ownership and admin review workflows are ready.
8. Add provider ownership and claim review before doctor dashboards.
9. Add doctor dashboard features only after review queues and audit logs exist.
10. Add schedule management as preview/update requests before real booking.
11. Add telemedicine settings only after privacy, consent, support, and audit rules are defined.
12. Add doctor educational content only after content review and disclaimer policy are ready.
13. Add patient reviews only after moderation governance exists.
14. Add patient ID or wallet concepts only after separate privacy, security, and financial governance planning.

---

## Summary

Doctor profile, schedule, telemedicine, and educational content features should grow from the trust model already defined for DigitalDirectory-v2.

Doctors may eventually own profiles, submit multi-facility schedules, manage telemedicine availability, and publish educational content. Those actions should be account-based, reviewed, auditable, and clearly separated from public browsing.

The immediate product should remain frontend-only and public-first while this strategy guides future backend, Supabase, governance, dashboard, schedule, content, patient review, patient ID, and wallet planning.
