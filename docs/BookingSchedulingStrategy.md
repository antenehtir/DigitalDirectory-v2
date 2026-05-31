# DigitalDirectory-v2 Booking and Scheduling Strategy

## Purpose

This document defines the future strategy for patient booking, appointment requests, doctor schedules, facility-managed schedules, telemedicine slots, cancellation, rescheduling, and booking-related workflows in DigitalDirectory-v2.

It is planning-only. It does not add backend functionality, Supabase, database files, migrations, SQL, authentication, dashboards, protected routes, booking UI, booking functionality, payment functionality, wallet functionality, ride-hailing functionality, packages, or frontend changes.

The goal is to clarify booking and scheduling before real booking, Supabase integration, provider dashboards, patient accounts, wallet, payments, transport, or telemedicine workflows are built.

---

## Core Principle

Booking should come after trusted discovery.

Patients should first be able to find doctors, facilities, pharmacies, and diagnostics providers quickly and trust the information shown. Booking should be added only after provider ownership, schedule accuracy, patient identity, privacy, notifications, audit logs, and backend workflows are ready.

Current schedule and availability UI should remain informational. It should not imply confirmed appointment availability.

---

## Booking by Doctor

Doctor booking means a patient requests or schedules time with a specific doctor.

Future doctor booking may support:

- In-person appointment at a facility
- Telemedicine appointment later
- Follow-up consultation later
- Specialty consultation request
- Facility-mediated appointment with a doctor

Doctor booking requirements:

- Doctor profile ownership or approved facility management relationship
- Verified or reviewed doctor identity
- Approved facility affiliation when in-person
- Doctor-specific availability separate from facility hours
- Patient contact information
- Booking status tracking
- Cancellation/rescheduling rules
- Notification planning
- Privacy and audit logging

Rules:

- A doctor profile should not show bookable slots unless the schedule source is reviewed and actively managed.
- Facility affiliation does not automatically mean the doctor is bookable at that facility.
- Doctor availability should not be inferred from general facility hours.
- Telemedicine booking should remain separate from ordinary doctor availability until telemedicine workflows are real.

---

## Booking by Facility or Service

Facility or service booking means a patient requests care from a facility, department, or service, not necessarily a named doctor.

Examples:

- Pediatrics appointment request at a clinic
- Laboratory test appointment at a diagnostics provider
- Imaging appointment
- General consultation request
- Facility department visit
- Future vaccination or screening appointment

Facility/service booking requirements:

- Facility profile ownership
- Facility-managed service or department schedule
- Approved public service/department data
- Clear facility contact path
- Patient contact details
- Service-specific intake rules later

Rules:

- Service booking should not imply a specific doctor unless one is assigned or selected.
- Department hours should not equal appointment availability.
- Diagnostics and pharmacy appointment-like flows should be planned separately when inventory, test catalogs, or pickup workflows become real.
- Emergency care claims should not be treated as normal bookable slots.

---

## Appointment Request vs Confirmed Booking

DigitalDirectory-v2 should distinguish appointment requests from confirmed bookings.

### Appointment Request

An appointment request is a patient-submitted interest form or request that requires provider confirmation.

Useful when:

- Provider schedule is not fully integrated.
- Facility staff must confirm availability.
- Doctor availability changes frequently.
- The provider prefers phone/manual confirmation.

Patient-facing meaning:
"Request an appointment; provider will confirm later."

### Confirmed Booking

A confirmed booking means the provider or system has reserved a specific time.

Requirements:

- Managed slot inventory
- Provider confirmation rules
- Notification workflow
- Cancellation/rescheduling policy
- Conflict prevention
- Audit trail

Patient-facing meaning:
"Your appointment time is confirmed."

Recommended first booking phase:
Start with appointment requests before confirmed booking. Confirmed booking should wait until provider dashboards, schedule management, and notifications are reliable.

---

## Patient Booking Entry Points

Future booking entry points should stay connected to search and discovery.

Possible entry points:

- Doctor detail page
- Facility detail page
- Search result doctor card
- Search result facility card
- Nearby provider page
- Specialty discovery flow
- Facility service or department section
- Future patient account saved providers
- Future telemedicine availability section

Rules:

- Entry points should be shown only when booking/request workflows are real.
- Current preview CTAs should not imply active booking.
- Booking should not block patients from calling, viewing details, or requesting corrections.
- Booking labels should be clear: request appointment, call facility, or confirmed booking.

---

## Multi-Facility Doctor Scheduling

Doctors may work at multiple facilities. Schedules must support this directly.

Recommended model:

| Field | Purpose |
| --- | --- |
| `doctor_id` | Linked doctor |
| `facility_id` | Facility where appointment occurs |
| `schedule_type` | In-person, telemedicine, on-call, unavailable |
| `day_of_week` | Recurring weekly day |
| `starts_at` | Start time |
| `ends_at` | End time |
| `timezone` | Scheduling timezone |
| `effective_from` | Start date for schedule |
| `effective_until` | End date for temporary schedule |
| `source_type` | Doctor-managed, facility-managed, admin-entered |
| `review_status` | Review state |

Rules:

- Each facility should have its own doctor schedule record.
- A doctor can have multiple schedule blocks per facility.
- Schedule conflicts should be flagged.
- Facility-managed doctor schedules should not override doctor-managed schedules without review.
- Temporary schedules should expire or require renewal.
- Public availability summaries should be generated from approved schedule data only.

---

## Facility-Managed Scheduling

Facility-managed scheduling means the facility controls appointment intake for its services, departments, or affiliated doctors.

Good fit for:

- Clinics with front-desk scheduling
- Hospitals with departments
- Diagnostics providers with test appointment slots
- Facility-managed doctor appointments
- Multi-doctor service intake

Future facility dashboard needs:

- Manage service request availability
- Manage department availability
- Submit doctor affiliation schedule requests
- View incoming appointment requests
- Confirm, reject, or request more information
- Mark unavailable days or closures
- Send patient-safe status updates later

Rules:

- Facility managers should not publish high-risk schedule changes directly.
- Facility-managed doctor schedules should respect doctor affiliation rules.
- Facility booking data should not expose patient medical details broadly to all facility staff.
- Facility staff permissions should be scoped.

---

## Doctor-Managed Scheduling

Doctor-managed scheduling means a verified doctor owner controls their own availability.

Good fit for:

- Independent specialists
- Visiting doctors
- Telemedicine schedules later
- Doctor-specific appointment blocks across facilities

Future doctor dashboard needs:

- Manage availability summaries
- Submit schedule blocks by facility
- Pause availability
- Set telemedicine availability later
- View appointment requests
- Confirm or decline requests
- Request facility affiliation review when needed

Rules:

- Doctor-managed schedule changes should be auditable.
- New facility-linked availability should require affiliation review.
- Telemedicine availability should require separate policy and consent planning.
- Doctor owners cannot bypass verification or review rules.

---

## Telemedicine Booking as Future-Only

Telemedicine booking should not be implemented until privacy, consent, identity, scheduling, and support rules are ready.

Future telemedicine booking requirements:

- Doctor telemedicine availability
- Patient identity or verified contact
- Consent to remote consultation terms
- Secure communication method
- Appointment status tracking
- Provider readiness confirmation
- Privacy and confidentiality policy
- Notification workflow
- Optional payment/wallet planning if paid

Rules:

- Telemedicine availability preview does not equal active telemedicine booking.
- Telemedicine links should not be public by default.
- Telemedicine booking should not expose patient health data unnecessarily.
- Telemedicine session data should not be mixed with public doctor profile data.

---

## Booking Statuses

Recommended booking and request statuses:

| Status | Meaning |
| --- | --- |
| `draft` | Patient has not submitted yet |
| `requested` | Patient submitted an appointment request |
| `pending_provider_review` | Provider must review request |
| `needs_information` | Provider needs more patient-safe details |
| `offered_time` | Provider proposed a time |
| `confirmed` | Appointment is confirmed |
| `declined` | Provider declined request |
| `cancelled_by_patient` | Patient cancelled |
| `cancelled_by_provider` | Provider cancelled |
| `reschedule_requested` | Patient or provider requested a change |
| `rescheduled` | Appointment moved to a new time |
| `completed` | Appointment happened |
| `no_show` | Patient did not attend |
| `expired` | Request or offer expired |
| `archived` | Kept for history, not active |

Rules:

- Status transitions should be audited.
- Patient-facing status labels should be simple.
- Internal statuses can be more detailed than public labels.
- Completed bookings may support verified visit review eligibility later.

---

## Slot and Availability Model

Scheduling needs separate concepts for availability and actual booked appointments.

### Availability

Availability describes when a provider may accept appointments.

Examples:

- Mondays 9:00-12:00
- Weekdays by request
- Telemedicine evenings later
- Department accepts requests during business hours

### Slots

Slots represent specific bookable time windows.

Examples:

- 2026-07-08 09:30
- 2026-07-08 10:00
- 2026-07-08 10:30

Recommended approach:

- Start with appointment requests, not hard slot inventory.
- Add managed slots only when providers can maintain schedules reliably.
- Keep recurring availability separate from generated slots.
- Keep blocked time and closures separate from ordinary availability.

Potential future slot fields:

| Field | Purpose |
| --- | --- |
| `provider_type` | Doctor, facility, diagnostics provider |
| `provider_id` | Linked provider |
| `doctor_id` | Optional doctor |
| `facility_id` | Optional facility |
| `service_id` | Optional service |
| `starts_at` | Slot start time |
| `ends_at` | Slot end time |
| `capacity` | Number of appointments possible |
| `remaining_capacity` | Available capacity |
| `status` | Available, held, booked, blocked, expired |

---

## Booking Request Data

Booking request data should be minimal and privacy-aware.

Possible request fields:

| Field | Purpose |
| --- | --- |
| `patient_id` | Optional future patient account link |
| `patient_name` | Patient or contact name |
| `patient_phone` | Follow-up contact |
| `patient_email` | Optional notification contact |
| `provider_type` | Doctor, facility, diagnostics provider |
| `provider_id` | Target provider |
| `doctor_id` | Optional selected doctor |
| `facility_id` | Optional location |
| `service_id` | Optional requested service |
| `preferred_date` | Patient preferred date |
| `preferred_time_window` | Morning, afternoon, evening, or specific time |
| `appointment_reason_category` | Optional broad category |
| `notes` | Patient-safe notes, not medical record |
| `status` | Request status |
| `created_at` | Submission time |

What not to collect early:

- Full diagnosis
- Lab results
- Medical records
- Prescription images
- Payment details
- National ID
- Unnecessary sensitive health details

---

## Cancellation and Rescheduling

Cancellation and rescheduling should be planned before confirmed booking exists.

Cancellation rules:

- Patients should be able to cancel future appointments later.
- Providers should be able to cancel with reason categories.
- Cancellations should notify the other side.
- Cancellation history should be audited.
- Repeated no-shows or provider cancellations may become internal signals later.

Rescheduling rules:

- Either party may request rescheduling.
- A reschedule request should not become confirmed until accepted.
- The previous appointment should remain linked to the new one.
- Status history should be preserved.
- Patient-facing labels should be clear.

Sensitive details:

- Cancellation reasons should avoid unnecessary medical detail.
- Internal notes should not appear publicly.
- Payment/refund implications should wait for wallet/payment planning.

---

## Notifications Planning

Notifications should come after consent, templates, and delivery providers are planned.

Potential notification events:

- Appointment request received
- Provider needs more information
- Time offered
- Booking confirmed
- Booking declined
- Reschedule requested
- Booking cancelled
- Reminder before appointment
- Telemedicine link ready later
- Provider schedule changed

Potential channels:

- In-app notification later
- Email
- SMS
- WhatsApp or Telegram only if explicitly consented and supported later

Rules:

- Do not send notifications before consent and templates exist.
- Avoid sensitive health details in notification previews.
- Keep notification content minimal.
- Log notification events that affect booking status.
- Let patients manage preferences later.

---

## Relationship to Patient Identity

Booking is one of the first features that may justify patient accounts, but it should still use the lowest identity level needed.

Identity relationship:

- Appointment requests may begin with contact-only identity.
- Confirmed bookings may require verified phone/email.
- Booking history may require a patient account.
- Verified visit reviews may use completed booking records.
- Strong identity should be reserved for sensitive workflows.

Rules:

- Public browsing remains login-free.
- Booking should not require unrelated health information.
- Providers should receive only booking-relevant patient details.
- Patient booking history should be private.
- Booking data access should be consented, role-scoped, and audited.

---

## Relationship to Wallet and Payments

Wallet and payment functionality is future-only and should not be part of initial booking planning.

Possible future payment uses:

- Paid appointment deposit
- Telemedicine payment
- Membership benefit booking
- Diagnostics or pharmacy payment later
- Refunds or credits

Rules:

- Booking should work as a request/confirmation flow before payment is added.
- Wallet data should be separate from booking public details.
- Providers should not see wallet balances.
- Payment status should not reveal sensitive care details.
- Refund/cancellation policies require separate financial governance.
- Do not add wallet or payment tables until a dedicated payment strategy exists.

---

## Relationship to Ride-Hailing and Transport

Ride-hailing or transport is future-only and should not be added to booking now.

Possible future concept:
A patient may request transport to a facility after a confirmed appointment.

Rules:

- Booking should not depend on transport.
- Do not request live location for booking.
- Do not share patient destination or contact with transport providers without consent.
- Transport providers should not receive medical details.
- Transport data should be separate from booking medical context, wallet, and reviews.
- Transport workflows need separate privacy, safety, location, and consent planning.

---

## Relationship to Patient Reviews

Booking can support future verified visit reviews, but reviews should remain separate from booking details.

Future relationship:

- Completed booking may create a verified visit eligibility signal.
- The review should not expose appointment reason.
- Provider should not see private reviewer identity by default.
- Review moderation remains separate from booking management.
- Booking cancellation or no-show should not automatically produce public review labels.

Rules:

- Booking status should not change provider verification status.
- Reviews should not reveal booking notes.
- Verified visit labels should be modest and privacy-safe.

---

## Provider Dashboard Needs Later

Provider dashboards should not be built yet. They are required before real booking can operate safely.

### Doctor Dashboard Needs

- View appointment requests
- Confirm or decline requests
- Offer alternate times
- Manage doctor availability
- Pause booking availability
- Manage telemedicine availability later
- View booking history for own appointments

### Facility Dashboard Needs

- View facility/service appointment requests
- Assign requests to departments or staff later
- Manage facility/service availability
- Manage facility-managed doctor schedules
- Confirm, decline, cancel, or reschedule requests
- Track staff actions with audit logs

### Admin Dashboard Needs

- View booking-related abuse reports
- Review disputed provider schedule behavior
- Investigate privacy or safety concerns
- Audit booking status changes when escalated

Dashboard boundaries:

- Providers should see only their own booking workflows.
- Provider staff access should be role-scoped.
- Admins should not routinely inspect patient booking details unless needed.
- Patient data access should be audited.

---

## Admin and Review Relationship

Booking operations should mostly be provider-managed, but admin review is needed for trust and safety.

Admin/review involvement may be needed for:

- Misleading bookable availability claims
- Repeated provider cancellations
- Patient privacy complaints
- Provider impersonation
- Fake booking abuse
- Disputed no-show behavior
- Emergency/24-hour booking claims
- External payment link concerns
- Telemedicine safety issues later

Rules:

- Admins should not confirm ordinary appointments for providers.
- Admins should review schedule claims when they affect public trust.
- Trust and safety booking issues should create moderation flags.
- Booking-related audit logs should be available for escalated review.

---

## Future Supabase Table Mapping

This is planning only. No Supabase code, SQL, migrations, policies, or database files should be added yet.

Potential future tables:

| Area | Possible Table |
| --- | --- |
| Appointment requests | `appointment_requests` |
| Confirmed bookings | `bookings` |
| Availability blocks | `availability_blocks` |
| Bookable slots | `appointment_slots` |
| Schedule exceptions | `schedule_exceptions` |
| Doctor schedules | `doctor_schedules` |
| Facility service schedules | `facility_service_schedules` |
| Booking status history | `booking_status_events` |
| Booking notes | `booking_notes` |
| Patient profiles | `patient_profiles` or `profiles` |
| Provider ownership | `provider_ownerships` |
| Provider staff access | `organization_memberships` |
| Notifications | `notification_events` |
| Verified visits later | `verified_visits` |
| Review links later | `patient_reviews` |
| Wallet/payment references later | `payment_transactions` or `wallet_accounts` |
| Transport references later | `transport_requests` |
| Audit history | `audit_logs` |

Future RLS direction:

- Patients can read and manage their own appointment requests and bookings.
- Doctors can read bookings assigned to their own profile.
- Facilities can read bookings for owned facilities and scoped staff assignments.
- Providers cannot read unrelated patient bookings.
- Admins can access booking data only for support, abuse, privacy, or trust cases.
- Public anonymous users cannot read booking tables.
- Audit logs should protect all booking status and access events.

---

## Data Privacy Rules

Booking data is private patient-provider workflow data.

Rules:

- Do not expose booking data in public listing payloads.
- Do not expose booking notes in reviews.
- Do not expose appointment reason publicly.
- Do not store medical records as booking notes.
- Keep patient contact details private.
- Use purpose-specific consent for sharing.
- Scope provider staff access by role.
- Audit booking access and status changes.
- Avoid collecting sensitive details unless necessary.
- Keep wallet/payment and transport data separate.

Patient-facing booking should feel helpful without becoming a medical record system.

---

## MVP Recommendation

Do not add booking or scheduling functionality to the current MVP.

Recommended MVP stance:

- Keep discovery, detail pages, verified labels, and correction flows as the core experience.
- Keep current availability text as preview-only.
- Do not show real booking buttons, slot pickers, calendars, payment, wallet, or transport flows.
- Do not collect patient booking data.
- Do not imply confirmed appointment availability.

Recommended first future booking step:
Start with appointment request planning, not confirmed slot booking.

---

## Risks

Key risks:

- Showing bookable slots that providers cannot maintain.
- Patients believing preview availability means confirmed care.
- Collecting sensitive patient information too early.
- Exposing booking data to unrelated provider staff.
- Mixing booking, wallet, transport, and reviews too soon.
- Provider schedule conflicts across facilities.
- Facility-managed schedules overriding doctor consent.
- Notifications leaking private health context.
- Payment disputes before financial governance exists.
- Transport/location sharing without explicit consent.
- Adding dashboards before RLS, audit logs, and ownership rules exist.

Mitigations:

- Begin with appointment requests, not hard slot booking.
- Keep booking data minimal.
- Use patient identity only when needed.
- Scope provider access tightly.
- Require provider dashboard readiness before launch.
- Audit booking status and access events.
- Keep payment, wallet, transport, and reviews separate.
- Add booking only in a dedicated future implementation phase.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only and discovery-first.
2. Continue improving public listing accuracy, correction flows, and provider detail pages.
3. Finalize patient identity, consent, reviews, facility management, and doctor schedule strategy documents.
4. Define exact appointment request fields and statuses.
5. Define schedule and availability contracts for doctors, facilities, and services.
6. Define provider dashboard requirements before implementation.
7. Plan Supabase tables and RLS policies for bookings only after backend scope is approved.
8. Add authentication when provider/admin workflows and patient-specific workflows justify it.
9. Add audit logging before booking data is stored.
10. Implement appointment requests before confirmed slot booking.
11. Add provider-managed confirmations, cancellations, and rescheduling.
12. Add notifications only after templates, consent, and delivery channels are planned.
13. Add verified visit review links only after moderation and privacy rules exist.
14. Add payments/wallet only after financial governance and compliance planning.
15. Add ride-hailing/transport only after separate location, safety, and consent planning.

---

## Summary

Booking and scheduling can eventually make DigitalDirectory-v2 more useful, but they should follow the trust-first roadmap.

The safest path is to start later with appointment requests, provider-managed confirmation, minimal patient data, role-scoped provider access, and audit logging. Confirmed slots, telemedicine booking, payments, wallet, verified visit reviews, and transport should come only after their supporting identity, consent, privacy, dashboard, and governance systems exist.

The recommended MVP is no booking UI and no booking functionality.
