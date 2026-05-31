# DigitalDirectory-v2 Patient Identity and Consent Strategy

## Purpose

This document defines the future strategy for patient identity, universal patient ID, consent-based data sharing, privacy boundaries, and patient-controlled access workflows in DigitalDirectory-v2.

It is planning-only. It does not add backend functionality, Supabase, database files, migrations, SQL, authentication, dashboards, protected routes, patient account UI, patient ID functionality, wallet functionality, ride-hailing functionality, packages, or frontend changes.

The goal is to clarify patient identity and consent before patient accounts, universal ID, bookings, wallet, verified reviews, transport, or healthcare data-sharing features are built.

---

## Core Principle

Public healthcare discovery should remain open and login-free.

Patients should be able to search, browse, and view healthcare listings without creating an account, receiving a patient ID, connecting a wallet, sharing personal details, or granting provider access.

Patient identity should be introduced later only when the platform supports real patient-specific workflows that justify it, such as booking history, verified visit reviews, telemedicine, patient-controlled sharing, membership programs, wallet/payment flows, or secure provider intake.

---

## Universal Patient ID Concept

A universal patient ID may eventually help patients interact with healthcare providers through DigitalDirectory-v2, but it should not be added in the current product phase.

Possible future purposes:

- Recognize a patient across bookings, telemedicine, reviews, and support workflows.
- Help patients avoid repeatedly entering basic registration details.
- Support verified visit labels for reviews without exposing private identity.
- Support patient-controlled sharing of profile or intake information.
- Support future wallet, membership, or healthcare program workflows.
- Support auditability when patient-specific actions occur.

Important boundaries:

- A universal patient ID should not be required for public discovery.
- It should not become a public profile identifier.
- It should not expose medical history by default.
- It should not be shared with providers without patient consent and clear purpose.
- It should not be used for advertising or tracking outside approved healthcare workflows.

Recommended framing:
Treat universal patient ID as a private account identity layer, not as a public social profile.

---

## Patient Identity Scope and Levels

Patient identity should be gradual. Not every patient workflow needs the same identity strength.

Recommended identity levels:

| Level | Name | Purpose |
| --- | --- | --- |
| 0 | Anonymous visitor | Browse, search, view public listings, submit lightweight feedback if allowed |
| 1 | Contact-only patient | Provide phone/email for follow-up, correction, contact, or support |
| 2 | Basic patient account | Save providers, manage preferences, view own submissions |
| 3 | Verified contact patient | Verified phone/email for booking, review submission, or notifications |
| 4 | Verified visit patient | Linked to a completed booking, telemedicine session, or approved interaction |
| 5 | Strong identity patient | Future-only identity proof for sensitive services, wallet, or regulated workflows |

Rules:

- Use the lowest identity level needed for each feature.
- Do not require strong identity for discovery.
- Do not collect identity proof until a specific workflow needs it.
- Let users understand why identity is being requested.
- Keep patient identity separate from public healthcare listing data.

---

## Information That May Be Stored Later

Patient data should be minimal, purpose-specific, and consent-based.

Possible future patient account fields:

| Data Type | Possible Purpose |
| --- | --- |
| Internal patient ID | Stable private account reference |
| Display name or preferred name | Patient-facing account personalization |
| Phone number | Login, booking follow-up, notifications |
| Email | Account recovery, notifications, support |
| Preferred language | Accessibility and communication |
| City or general location | Discovery preferences, not exact tracking |
| Saved providers | Patient convenience |
| Booking history | Future appointment management |
| Review history | Review moderation and dispute handling |
| Consent records | Track what sharing was approved |
| Notification preferences | Patient-controlled communication |

Possible future sensitive fields, only if explicitly justified:

- Date of birth
- Government or official identity reference
- Insurance or membership reference
- Emergency contact
- Payment or wallet reference
- Telemedicine session references
- Visit verification references

Sensitive fields should require stronger privacy, access controls, audit logs, and clear consent.

---

## What Should Not Be Stored Early

The product should avoid collecting sensitive health information before it is necessary.

Do not store early:

- Diagnoses
- Lab results
- Prescriptions
- Medical records
- Treatment notes
- Doctor private notes
- Full visit reason
- Uploaded health documents
- Patient national ID or identity document images
- Wallet balances or payment instruments
- Exact live location history
- Ride-hailing trip history
- Sensitive family or household health data

Avoid collecting "just in case" data. Healthcare trust is stronger when the platform stores less until a real patient workflow needs more.

---

## Consent-Based Access

Patient data access should be explicit, scoped, and revocable where possible.

Consent should define:

| Consent Attribute | Purpose |
| --- | --- |
| `patient_id` | Who granted consent |
| `recipient_type` | Doctor, facility, pharmacy, diagnostics provider, platform support |
| `recipient_id` | Which provider or internal role receives access |
| `data_scope` | What information can be accessed |
| `purpose` | Booking, telemedicine, review verification, support, payment, transport |
| `starts_at` | When consent begins |
| `expires_at` | When consent ends |
| `revoked_at` | If patient withdraws consent |
| `granted_by` | Patient or authorized representative |
| `status` | Active, expired, revoked, denied |

Rules:

- Consent should be purpose-specific.
- Consent should not be bundled across unrelated features.
- Providers should receive only the minimum data needed.
- Patients should be able to view active consents later.
- Revocation should stop future access, while audit history remains.
- Emergency exceptions, if ever considered, need separate governance and legal review.

---

## Patient-Controlled Sharing

Patient-controlled sharing means the patient chooses what to share, with whom, and for what purpose.

Possible future sharing examples:

- Share basic registration details with a facility before a booking.
- Share contact information with a doctor for telemedicine follow-up.
- Share a verified visit signal for a review without showing private details.
- Share pickup contact details with a pharmacy if prescription pickup exists later.
- Share basic transport destination only if ride-hailing integration exists later.

Sharing principles:

- Show the exact data categories being shared.
- Avoid exposing hidden medical details.
- Let the patient choose a limited time window.
- Confirm provider identity before sharing.
- Keep an audit log of access.
- Do not share data with providers for marketing unless separately consented and legally appropriate.

---

## Provider Access Boundaries

Providers should not receive broad patient account access.

Provider access should be limited by role and purpose:

| Provider Type | Possible Future Access |
| --- | --- |
| Doctor | Booking-specific contact, telemedicine consent, relevant visit context if approved |
| Facility | Registration prefill, booking contact, check-in context if approved |
| Pharmacy | Pickup or delivery contact only after real pharmacy workflows exist |
| Diagnostics provider | Appointment/contact context and result delivery consent only after real workflows exist |
| Support operator | Limited support context, not medical history |
| Reviewer/admin | Review-related metadata and audit context only when necessary |

Provider access rules:

- Providers cannot browse patient profiles.
- Providers cannot search patients without an active workflow.
- Providers cannot view patient wallet data unless a future payment workflow explicitly requires limited access.
- Providers cannot view patient reviews' private identity unless policy and dispute workflow allow scoped review.
- Providers cannot export patient lists without explicit governance.
- Provider access should be logged.

---

## Facility Registration Prefill Concept

Facility registration prefill is a future convenience feature where a patient can share basic details with a facility before a visit or booking.

Potential prefill fields:

- Patient name or preferred name
- Phone number
- Email, if needed
- Preferred language
- Appointment reason category, if safe and optional
- Emergency contact, only if necessary and consented
- Insurance or membership reference, only if such workflows exist

Rules:

- Prefill should be optional.
- Prefill should require patient confirmation before sharing.
- Prefill should not include medical records by default.
- Facilities should receive a clear purpose-limited data view.
- Patients should be able to see when prefill was shared.
- Prefill should not exist until booking or facility intake workflows are real.

---

## Identity Verification Levels

Identity verification should increase only when the workflow risk increases.

Recommended verification levels:

| Verification Level | Method | Possible Use |
| --- | --- | --- |
| None | No account | Public browsing |
| Contact verified | Phone/email confirmation | Basic account, notifications, lightweight submissions |
| Platform interaction verified | Completed booking/session | Verified visit review |
| Document verified | Future identity proof | Sensitive programs, wallet, regulated workflows |
| Admin reviewed | Manual review | Disputes, abuse, exceptional cases |

Rules:

- Do not collect documents until required.
- Strong identity should not be visible publicly.
- Verification level should not reveal sensitive patient details.
- Higher verification should be auditable.
- Failed verification should not block public healthcare discovery.

---

## Privacy and Confidentiality Rules

Patient identity data is more sensitive than public listing data.

Rules:

- Collect the minimum data needed.
- Keep patient identity separate from public provider listings.
- Do not expose patient details in public reviews by default.
- Do not expose patient details to providers without consent.
- Do not expose patient data in analytics, public payloads, or search documents.
- Do not store medical records until a dedicated health-record strategy exists.
- Keep consent, access, and revocation records private.
- Use role-scoped access in any future backend.
- Treat identity, wallet, and transport data as sensitive internal data.
- Avoid showing enough metadata to identify a patient in small communities.

Data minimization principle:
If a feature can work without patient identity, it should remain identity-free.

---

## Audit Log Requirements

Patient identity and consent actions should be auditable when implemented.

Actions to audit:

- Patient account created
- Contact verified
- Identity verification level changed
- Consent granted
- Consent revoked
- Consent expired
- Provider accessed shared data
- Provider attempted unauthorized access
- Booking used patient details
- Review linked to verified visit
- Wallet/payment access event later
- Transport/ride-hailing data access later
- Admin or support accessed patient data
- Patient data export or deletion request later

Suggested audit fields:

| Field | Purpose |
| --- | --- |
| `actor_id` | Patient, provider, admin, support operator, system |
| `actor_role` | Role at time of action |
| `action_type` | What happened |
| `entity_type` | Patient profile, consent, booking, review, wallet, transport |
| `entity_id` | Target record |
| `data_scope` | Data category involved |
| `purpose` | Why access occurred |
| `recipient_id` | Provider or internal user receiving access |
| `created_at` | Timestamp |
| `metadata` | Public-safe technical context |

Audit logs should be append-only and protected.

---

## Relationship to Patient Reviews

Patient identity may support future verified reviews, but reviews should not expose patient identity.

Rules:

- Public reviews should default to anonymous or minimal display.
- Verified visit labels should not reveal diagnosis, treatment, or visit reason.
- Review authors should be able to manage or dispute their own reviews later.
- Providers should not see private reviewer identity by default.
- Admin access to reviewer identity should be limited and audited.
- Review disputes should use scoped identity checks, not broad patient profile access.

Patient identity can improve review trust, but it should not turn reviews into public medical records.

---

## Relationship to Wallet and Payments

Wallet and payment concepts are future-only and should not be implemented yet.

Possible future uses:

- Booking payments
- Membership programs
- Healthcare credits
- Refunds or disputes
- Pharmacy pickup/payment workflows later
- Diagnostics payment workflows later

Rules:

- Wallet data should be separate from public profile and review data.
- Providers should not see wallet balances.
- Payment instruments should not be stored unless a dedicated payment provider and compliance plan exist.
- Payment disputes should route through protected support/admin workflows.
- Wallet access should require stronger identity and audit rules.
- Wallet functionality should not be introduced before patient identity, consent, and financial governance are planned.

---

## Relationship to Booking

Booking is one of the first future features that may justify patient accounts.

Patient identity may support:

- Booking contact details
- Appointment reminders
- Booking history
- Cancellation/rescheduling
- Verified visit review eligibility
- Provider-side check-in context with consent

Booking rules:

- Booking should not require sharing unrelated health information.
- Providers should see only booking-relevant details.
- Booking history should be private by default.
- Booking access should be role-scoped.
- Booking actions should create audit history.
- Booking should not be implied by current schedule preview UI.

---

## Relationship to Ride-Hailing and Transport

Ride-hailing or healthcare transport is future-only and should not be implemented yet.

Possible future concept:
A patient may request or coordinate transport to a facility after choosing care.

Rules:

- Do not add ride-hailing logic now.
- Do not store trip history now.
- Do not request live location now.
- Do not share patient location without explicit consent.
- Transport providers should not receive medical details.
- Healthcare providers should not receive full transport data unless needed and consented.
- Transport data should be separate from patient medical, wallet, and review data.
- Transport workflows should have dedicated privacy, safety, consent, and audit planning later.

Transport should never become a requirement for healthcare discovery.

---

## Relationship to Provider Workflows

Provider workflows and patient identity should remain separated unless a patient action connects them.

Provider workflows include:

- Doctor profile ownership
- Facility profile management
- Pharmacy profile management
- Diagnostics provider management
- Verification document review
- Listing updates
- Admin/reviewer workflows

Rules:

- Provider owners should not access patient identity just because they own a listing.
- Provider dashboards should not include patient lists by default.
- Patient data should appear only in active, consented workflows such as future booking, telemedicine, pickup, diagnostics appointment, or support.
- Provider-submitted listing updates should not include patient data.
- Admin review of provider listings should not require patient identity unless a patient-submitted trust concern is being investigated.

---

## Future Supabase Table Mapping

This is planning only. No Supabase code, SQL, migrations, policies, or database files should be added yet.

Potential future tables:

| Area | Possible Table |
| --- | --- |
| Patient account profile | `patient_profiles` or `profiles` |
| Patient identity details | `patient_identities` |
| Identity verification | `patient_identity_verifications` |
| Consent records | `patient_consents` |
| Shared data grants | `patient_data_grants` |
| Provider access events | `patient_data_access_logs` or `audit_logs` |
| Saved providers | `saved_providers` |
| Booking links | `bookings` |
| Verified visit links | `verified_visits` |
| Review author links | `patient_reviews` |
| Wallet references later | `wallet_accounts`, `payment_transactions` |
| Transport references later | `transport_requests` |
| Support cases | `contact_messages` or `support_cases` |

Future RLS direction:

- Patients can read and manage their own profile, consents, and preferences.
- Patients can revoke or expire data sharing where allowed.
- Providers can read only data explicitly granted for their own active workflow.
- Providers cannot read full patient profiles by default.
- Support operators can access limited support context.
- Reviewers/admins can access patient-linked data only when assigned and justified.
- Super Admin access should be rare, sensitive, and audited.
- Public anonymous users cannot read patient tables.

---

## MVP Recommendation

Do not add patient accounts, universal patient ID, wallet, ride-hailing, or patient-controlled sharing to the MVP.

Recommended MVP stance:

- Keep public discovery login-free.
- Keep current feedback and correction flows lightweight and safe.
- Do not ask patients to create accounts to search.
- Do not collect patient identity data for static preview pages.
- Do not collect medical information.
- Do not add wallet or transport surfaces.
- Do not imply that patient ID exists.

Patient identity should begin only when a real workflow needs it, and the first likely candidate is future booking or verified review eligibility after backend and moderation exist.

---

## Risks

Key risks:

- Requiring identity too early and weakening public discovery.
- Collecting sensitive health data without a clear purpose.
- Exposing patient identity to providers without consent.
- Linking patient reviews to identifiable health experiences.
- Using patient ID as a tracking identifier instead of a consent tool.
- Mixing wallet or payment data with public healthcare listings.
- Sharing live location or transport data without clear consent.
- Giving provider dashboards broad patient access.
- Building patient identity before backend policies and audit logs exist.
- Failing to separate patient data from provider verification data.

Mitigations:

- Use data minimization.
- Keep browsing identity-free.
- Introduce identity levels gradually.
- Require explicit consent for sharing.
- Scope provider access tightly.
- Audit all sensitive access.
- Separate patient, provider, wallet, review, booking, and transport data.
- Add patient identity only in a dedicated future implementation phase.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only and public-first.
2. Continue improving healthcare discovery, listing quality, corrections, and feedback.
3. Finalize review, provider management, and consent strategy documents before backend work.
4. Define exact patient data categories and sensitivity levels.
5. Define consent objects, consent scopes, and access rules in plain language.
6. Define patient account timing around real workflows such as booking or verified reviews.
7. Plan Supabase tables and RLS policies for patient identity only after backend scope is approved.
8. Add authentication only when provider/admin workflows and patient-specific workflows justify it.
9. Implement audit logging before any patient data sharing.
10. Pilot patient accounts with low-risk features such as saved providers or booking contact details.
11. Add verified visit review logic only after moderation and privacy rules exist.
12. Add wallet/payment concepts only after financial governance and compliance planning.
13. Add ride-hailing or transport only after separate safety, privacy, location, and consent planning.

---

## Summary

Patient identity can eventually support booking, verified reviews, consent-based sharing, wallet/payment workflows, and transport integrations, but it should not be introduced early.

DigitalDirectory-v2 should keep healthcare discovery open and login-free while treating patient identity as a private, consent-controlled, auditable future layer.

The recommended MVP is no patient account UI, no universal patient ID, no wallet, no ride-hailing, and no patient data sharing.
