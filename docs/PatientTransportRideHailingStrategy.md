# DigitalDirectory-v2 Patient Transport and Ride-Hailing Strategy

## Purpose

This document defines the future strategy for patient transport assistance, directions, ride-hailing deep links, Uber/Bolt-style integration possibilities, caregiver or family sharing, transport privacy rules, and transport-related safety boundaries for DigitalDirectory-v2.

It is planning-only. It does not add backend functionality, Supabase, database files, migrations, SQL, authentication, dashboards, protected routes, transport UI, ride-hailing functionality, Uber integration, Bolt integration, maps APIs, packages, or frontend changes.

The goal is to clarify transport direction before any real location sharing, ride-hailing integration, map provider, patient transport workflow, or transport payment feature is built.

---

## Core Principle

Patient transport assistance should come after trusted discovery and accurate facility destinations.

DigitalDirectory-v2 should first help patients find trusted healthcare providers and understand where they are located. Transport features should be introduced only after facility locations, directions, patient consent, booking, identity, wallet/payment, and privacy rules are mature enough to support them safely.

Public browsing should remain login-free. Transport should never become a requirement for searching, viewing providers, calling, requesting corrections, or reading public listing details.

---

## Patient Transport Assistance Concept

Patient transport assistance may eventually help users move from discovery to arrival at care.

Possible future assistance levels:

| Level | Concept | Notes |
| --- | --- | --- |
| 0 | Address and directions text | Public listing shows reviewed address and directions note |
| 1 | Directions-first link | Patient opens a map app or browser directions link |
| 2 | Ride-hailing deep link | Patient opens a ride app with destination prefilled |
| 3 | Booking-to-transport handoff | Confirmed appointment offers transport helper flow |
| 4 | Caregiver/family sharing | Patient shares trip or destination context with trusted contact |
| 5 | API-integrated transport | Platform coordinates ride status through approved integration |

Recommended approach:
Start with directions-first support later, not ride booking. Ride-hailing integrations should be considered only after facility destinations are accurate and location-sharing consent is well defined.

---

## Directions-First Approach

Directions should come before ride-hailing.

Why:

- Directions support public discovery without requiring accounts.
- Directions are useful even when ride-hailing availability varies.
- Directions depend mainly on facility location accuracy, not complex booking or payment systems.
- Directions create less privacy and support risk than storing trips.

Future directions may include:

- Public address display
- Area or landmark note
- Map app link
- Public transportation note later
- Walking or driving directions link later
- Facility entrance note, if reviewed and useful

Rules:

- Directions should use reviewed facility address and destination data.
- Directions should not request live location unless the user explicitly chooses a map app flow.
- Directions should not imply emergency transport.
- Directions links should be simple and optional.
- Incorrect destination reports should route to correction/admin review.

---

## Ride-Hailing Deep Link Concept

Ride-hailing deep links are a lighter future step than full API integration.

Possible concept:
A patient taps a ride option that opens a ride-hailing app or website with the healthcare facility destination prefilled.

Benefits:

- Lower operational complexity than managing rides inside DigitalDirectory-v2.
- Less need to store live trip data.
- Lets ride providers handle driver matching, pricing, payment, and trip support.
- Keeps DigitalDirectory-v2 focused on healthcare discovery and destination accuracy.

Rules:

- Use only reviewed destination data.
- Do not pass diagnosis, appointment reason, doctor name, or medical context to ride apps.
- Ask for explicit user action before opening external ride links.
- Make clear that ride availability, price, driver, route, and safety are controlled by the ride provider.
- Do not require patient account or transport use for public browsing.

Deep links should be treated as convenience links, not as a healthcare transport guarantee.

---

## Uber/Bolt-Style API Integration Possibilities

Full ride-hailing API integration should be considered only after simpler transport options are validated.

Potential future integrations:

- Uber-style ride request handoff
- Bolt-style ride request handoff
- Local ride-hailing provider integration
- Healthcare transport partner integration
- Sponsored transport voucher integration
- Booking-linked transport reminder

API integration may support:

- Destination prefill
- Ride estimate display
- Ride request creation
- Trip status updates
- Transport payment or voucher use
- Caregiver tracking or arrival notifications

API integration risks:

- Live location privacy
- Medical context leakage
- Trip support burden
- Failed pickup support
- Price disputes
- Driver safety issues
- Cross-provider terms and compliance
- Payment and refund complexity
- Dependency on third-party API availability

Rules:

- Do not add Uber, Bolt, maps, or transport APIs until a dedicated integration task exists.
- Do not store live location or trip status before consent, privacy, and backend policies are ready.
- Do not expose patient medical or booking details to transport providers.
- API integrations should be optional and clearly separated from emergency care.
- Legal, privacy, and provider terms should be reviewed before implementation.

---

## Transport vs Emergency Care Distinction

Transport assistance is not emergency care.

DigitalDirectory-v2 must clearly distinguish ordinary transport from emergency medical transport.

Ordinary transport may include:

- Getting directions to a clinic
- Opening a ride-hailing app to travel to a facility
- Sharing destination with a caregiver
- Planning arrival for a confirmed appointment

Emergency care may require:

- Emergency medical services
- Ambulance
- Urgent triage
- Immediate local emergency response
- Facility emergency department contact

Rules:

- Ride-hailing should not be presented as ambulance or emergency response.
- Emergency symptoms should direct users to emergency services or appropriate urgent care guidance later.
- Emergency availability claims on facility profiles require stronger review.
- Transport features should not delay urgent care-seeking behavior.
- Transport disclaimers should be clear but not alarmist.

---

## Patient Location Sharing Consent

Patient location is sensitive and should be consent-based.

Location sharing levels:

| Level | Data | Use |
| --- | --- | --- |
| None | No location | Browse public listings and addresses |
| Approximate location | Area or city | Search and nearby discovery later |
| One-time current location | Current point | Directions or nearby search after explicit action |
| Destination only | Facility location | Ride-hailing deep link without sharing patient location |
| Trip status | Origin, route, driver status | Future ride integration only |
| Caregiver sharing | Destination or trip progress | Future patient-controlled sharing |

Rules:

- Do not request browser location permission until a real location feature exists.
- Do not store live location history in early phases.
- Ask for explicit consent before sharing current location with maps, ride providers, or caregivers.
- Let patients choose destination-only sharing when possible.
- Do not infer medical condition from transport destination.
- Audit sensitive location access in future backend workflows.

---

## Facility Destination Accuracy

Transport safety depends on accurate facility destinations.

Destination data should be more carefully governed than ordinary display text.

Relevant fields:

- Facility name
- Public address
- Area or landmark note
- Latitude and longitude later
- Facility entrance note later
- Branch identifier
- Department entrance note later
- Correction history
- Verification status

Rules:

- Destination coordinates should not be added as trusted data until reviewed.
- Branches must not share the wrong destination.
- Facility closure, relocation, or duplicate listing issues should be high-priority corrections.
- Directions or ride links should not use unreviewed coordinates for verified-looking listings.
- Destination corrections should snapshot current values and go through review.
- Emergency entrance or 24-hour access notes should require stronger review.

Facility destination accuracy should connect directly to the facility profile management and admin review workflows.

---

## Booking-to-Transport Workflow

Transport may eventually connect to confirmed bookings, but booking should work without transport.

Possible future flow:

1. Patient discovers provider and requests or confirms an appointment.
2. Booking stores provider, facility, date, and time.
3. Patient chooses whether to get directions or arrange transport.
4. Platform offers destination-only map or ride handoff.
5. If patient consents, a caregiver or family member may receive destination or arrival context.
6. Payment or wallet may support transport only after payment and transport policies exist.
7. Trip data remains separate from booking medical details.

Rules:

- Transport should be optional.
- Booking should not require ride-hailing.
- Transport should not receive appointment reason, diagnosis, prescription, test result, or medical notes.
- If transport is linked to booking, only the minimum destination and timing context should be used.
- Cancelled or rescheduled bookings should not automatically trigger ride changes unless a future workflow explicitly supports it.

---

## Caregiver and Family Sharing Later

Caregiver or family sharing may help patients coordinate travel, especially when family members support care access.

Possible future uses:

- Share facility destination with a family member.
- Share appointment time and arrival plan.
- Share trip status during a ride.
- Let a sponsor pay for transport later.
- Notify caregiver when patient arrives, if consented.

Rules:

- Sharing should be patient-controlled.
- The patient should choose what to share and with whom.
- Default sharing should be off.
- Shared details should avoid diagnosis, service reason, lab test details, prescription details, or payment details unless a separate consent model exists.
- Caregiver access should be revocable where possible.
- Sponsor payment does not automatically grant access to patient health or trip details.

Caregiver sharing should wait until patient identity, consent records, notification rules, and privacy controls are ready.

---

## Transport Privacy Rules

Transport data is sensitive because it can reveal location, healthcare destination, timing, and care patterns.

Privacy rules:

- Do not expose transport data in public listing payloads.
- Do not store live location history in early phases.
- Do not share diagnosis, appointment reason, test type, prescription, or medical notes with transport providers.
- Do not expose transport records to providers unless a care workflow explicitly requires minimal context.
- Do not show trip data in public reviews.
- Keep transport data separate from wallet, payment, booking, and review data.
- Use purpose-specific consent for location sharing.
- Audit access to transport records in future backend workflows.
- Allow patients to control caregiver sharing.
- Avoid storing route history unless there is a strong operational need and clear consent.

Transport should help patients reach care, not become a surveillance layer.

---

## Relationship to Booking

Booking and transport should remain separate but may connect later.

Booking owns:

- Appointment request or confirmed appointment
- Provider and facility context
- Time and status
- Patient contact details
- Cancellation and rescheduling

Transport owns:

- Destination handoff
- Optional current location consent
- Ride provider handoff or trip reference later
- Caregiver transport sharing later
- Transport status or voucher later

Rules:

- Booking can exist without transport.
- Transport can be used for browsing/directions without booking.
- Booking notes should not be copied into transport records.
- Transport cancellation should not automatically cancel booking.
- Booking cancellation may prompt the patient to cancel related transport later, if that workflow exists.
- Completed transport should not imply completed care.

---

## Relationship to Patient Identity

Transport should use the lowest identity level needed.

Identity relationship:

- Public directions may need no account.
- One-time map handoff may need no platform account.
- Ride-hailing deep link may rely on the ride app account, not DigitalDirectory-v2.
- Booking-linked transport may require patient account or verified contact later.
- Caregiver sharing should require patient identity and consent records.
- Transport vouchers or wallet payments may require stronger identity.

Rules:

- Patient ID should not be required for basic directions.
- Patient account should be required only for saved transport history, caregiver sharing, booking-linked transport, or wallet-funded transport.
- Providers should not access patient location just because a patient viewed their listing.
- Admin or support access to transport data should be limited, justified, and audited.

---

## Relationship to Wallet and Payments

Transport payments should come after wallet/payment and transport workflows are mature.

Possible future payment use cases:

- Patient pays ride provider directly outside DigitalDirectory-v2.
- Patient uses wallet credit for transport.
- Family sponsor pays for a ride.
- Healthcare program provides transport voucher.
- Combined appointment and transport sponsorship later.

Rules:

- Do not bundle healthcare payment and transport payment too early.
- Transport providers should not receive medical details.
- Wallet balance should not be visible to transport providers.
- Transport refunds and disputes should have separate support policy.
- Sponsored transport should respect patient consent and privacy.
- Payment completion should not expose where or why the patient received care beyond necessary transport context.

Recommended early stance:
If ride-hailing deep links are added later, let the ride provider handle ride payment until DigitalDirectory-v2 has mature wallet, refund, dispute, and compliance workflows.

---

## Relationship to Facility Profiles

Facility profiles are the foundation for directions and transport destinations.

Facility profile needs before transport:

- Reviewed public address
- Normalized location
- Correct branch information
- Destination coordinates later
- Facility entrance or landmark notes later
- Verified or clearly unverified destination state
- Correction flow for wrong location reports

Rules:

- Facility profile updates affecting destination should require review.
- Destination data should be public-safe but carefully validated.
- Duplicate or relocated facilities should not generate confusing ride destinations.
- Facility owners should submit location updates for review later.
- Public users should be able to report wrong destination or moved facility through corrections later.

Transport quality is only as good as facility profile accuracy. Facility location governance should come first.

---

## Relationship to Admin Review

Transport-related data should connect to admin review when it affects trust, safety, or public facility accuracy.

Future review cases may include:

- Wrong destination report
- Incorrect coordinates
- Facility relocated
- Facility closed
- Duplicate branch confusion
- Dangerous directions note
- Misleading emergency entrance claim
- External ride/payment link concern
- Transport privacy complaint
- Caregiver sharing abuse report
- Ride integration support issue

Rules:

- Admins should not manage ordinary rides.
- Admins should review public facility destination data.
- Support operators may triage transport complaints later.
- Reviewers should handle destination corrections.
- Super Admin should handle severe privacy, safety, fraud, or governance escalations.
- Transport-related audit logs should be protected.

---

## Future Supabase Table Mapping

This is planning only. No Supabase code, SQL, migrations, policies, or database files should be added yet.

Potential future tables:

| Area | Possible Table |
| --- | --- |
| Facility destinations | `facility_locations` or `provider_locations` |
| Destination corrections | `correction_requests` |
| Transport preferences | `patient_transport_preferences` |
| Transport requests | `transport_requests` |
| Ride-hailing handoffs | `transport_handoffs` |
| Ride provider references | `transport_provider_references` |
| Caregiver sharing | `transport_sharing_grants` |
| Location consent | `patient_consents` or `location_consents` |
| Transport status events | `transport_status_events` |
| Transport vouchers | `transport_vouchers` |
| Transport payments | `payment_transactions` or `transport_payment_links` |
| Support cases | `support_cases` or `contact_messages` |
| Audit history | `audit_logs` |

Future RLS direction:

- Public users can read only public-safe facility destination data.
- Patients can manage their own transport preferences, handoffs, and sharing grants later.
- Caregivers can read only explicitly shared transport details.
- Providers cannot read patient transport records by default.
- Support operators can access limited transport support context.
- Reviewers/admins can review destination corrections and safety cases.
- Super Admin access should be rare and audited for severe transport privacy or safety incidents.
- Anonymous public users cannot read patient transport, live location, trip, caregiver, or voucher tables.

---

## MVP Recommendation

Do not add transport UI, ride-hailing functionality, ride-hailing integrations, maps APIs, location sharing, or transport data storage to the MVP.

Recommended MVP stance:

- Keep public healthcare discovery, verified labels, detail pages, correction flows, and provider data quality as the core experience.
- Keep directions and transport as future-only planning.
- Do not request browser location permission.
- Do not show ride booking, transport buttons, live map tracking, route previews, caregiver sharing, or ride payment flows.
- Do not imply that DigitalDirectory-v2 provides emergency transport or ride-hailing.

Recommended first future transport step:
Improve facility destination accuracy and correction review first. Then consider simple directions links before ride-hailing deep links or API integrations.

---

## Risks

Key risks:

- Treating ride-hailing as emergency care.
- Sharing patient location without clear consent.
- Passing medical context to transport providers.
- Sending patients to inaccurate facility destinations.
- Confusing branches or duplicate facilities.
- Requesting live location before users understand why.
- Storing trip or route history unnecessarily.
- Exposing transport records to providers or caregivers without consent.
- Bundling transport, booking, and wallet before support workflows are mature.
- Relying on third-party ride APIs without privacy and support planning.
- Allowing unreviewed external ride or payment links on provider profiles.
- Creating safety expectations the platform cannot fulfill.

Mitigations:

- Keep transport out of MVP.
- Start with destination accuracy and correction review.
- Use directions-first thinking.
- Require explicit consent for location sharing.
- Keep transport data separate from booking, wallet, reviews, and public listings.
- Avoid sharing medical details with transport providers.
- Use disclaimers that distinguish transport from emergency care.
- Add ride integrations only in a dedicated future task with legal, privacy, support, and API review.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only and discovery-first.
2. Continue improving facility profiles, detail pages, correction flows, and location clarity.
3. Define public-safe facility destination fields and review requirements.
4. Define exact correction workflow for wrong address, moved facility, duplicate branch, and incorrect coordinates.
5. Finalize patient identity, booking, payment, wallet, and transport consent rules.
6. Plan Supabase tables and RLS policies for destination and transport data only after backend scope is approved.
7. Add authentication only when provider/admin and patient-specific workflows justify it.
8. Add audit logging before storing patient transport or location records.
9. Add simple directions support later, if facility destination data is reviewed.
10. Add ride-hailing deep links only after destination accuracy and consent language are clear.
11. Add caregiver or family sharing only after patient accounts, consent, and notification rules exist.
12. Add transport vouchers or wallet-funded transport only after wallet/payment governance is implemented.
13. Consider Uber/Bolt-style API integrations only after deep links prove useful and support/compliance needs are clear.
14. Add full ride integration only in a dedicated transport implementation phase, if the product truly needs it.

---

## Summary

Patient transport assistance can eventually help DigitalDirectory-v2 connect discovery to real-world care access, but it should be introduced carefully and late.

The safest path is directions-first: improve facility destination accuracy, keep public browsing login-free, avoid live location storage, and treat ride-hailing as an optional external convenience before any API integration.

The recommended MVP is no transport UI, no ride-hailing functionality, no maps API, no location sharing, no Uber/Bolt integration, and no transport data storage.
