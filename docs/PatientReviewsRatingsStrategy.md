# DigitalDirectory-v2 Patient Reviews and Ratings Strategy

## Purpose

This document defines the future strategy for patient/user reviews and ratings in DigitalDirectory-v2.

It is planning-only. It does not add backend functionality, Supabase, database files, migrations, SQL, authentication, dashboards, protected routes, review UI, ratings UI, packages, or frontend changes.

The goal is to clarify whether reviews and ratings should exist, what risks they introduce in healthcare, and how they should be phased only after trust, moderation, privacy, and backend foundations are ready.

---

## Should Reviews and Ratings Exist?

Patient reviews and ratings can be useful for healthcare discovery, but they should not be part of the current MVP.

Recommended position:

- Do not add public reviews or ratings yet.
- Start with structured feedback, corrections, and trust signals first.
- Add internal review collection only after backend and moderation workflows exist.
- Add public ratings only after patient account, moderation, dispute, privacy, and abuse-prevention rules are ready.

Reviews should exist later only if they improve patient decision-making without weakening trust, privacy, provider fairness, or medical safety.

---

## Why Reviews Are Useful

Reviews and ratings may eventually help patients understand real-world experience beyond basic listing data.

Potential benefits:

- Help patients compare providers with similar services.
- Surface recurring access issues such as long wait times or incorrect hours.
- Encourage providers to keep profiles accurate.
- Highlight patient experience themes that are not captured by verification.
- Help the platform identify listing corrections, closed locations, or contact problems.
- Support trust when combined with verification status and moderation.

Important distinction:

Reviews should describe patient experience. They should not replace verification, clinical credential review, facility licensing review, or official listing accuracy checks.

---

## Healthcare Review Risks

Healthcare reviews are more sensitive than ordinary business reviews.

Key risks:

- False medical claims or harmful advice
- Defamation or unfair accusations
- Privacy leaks about diagnoses, treatment, or other patients
- Provider retaliation concerns
- Fake positive or negative reviews
- Review bombing after a dispute
- Misleading ratings based on outcomes outside provider control
- Patients confusing ratings with clinical quality guarantees
- Providers pressuring patients for positive reviews
- Revealing identity in sensitive care contexts
- Bias against specialties that handle difficult cases
- Legal and regulatory concerns around medical claims

Risk principle:

DigitalDirectory-v2 should never let reviews make unverified healthcare information look medically validated.

---

## Recommended Phased Approach

### Phase 0: Current State

Status:
No public reviews, no ratings, no review UI, no review submission, no backend.

Recommended focus:

- Keep public discovery login-free.
- Use verified labels, correction flows, feedback flows, and provider detail pages.
- Keep trust notes clear.

### Phase 1: Structured Feedback Only

Collect non-public structured feedback later when backend exists.

Examples:

- Incorrect phone number
- Wrong hours
- Facility closed
- Doctor no longer affiliated
- Location issue
- Search result not useful
- Trust concern

Goal:
Improve listing accuracy without publishing subjective public reviews.

### Phase 2: Internal Experience Signals

Allow internal, non-public patient experience categories for platform review.

Examples:

- Wait time concern
- Communication issue
- Accessibility concern
- Cleanliness concern
- Staff helpfulness concern
- Booking or contact difficulty

Goal:
Inform moderation, provider support, and listing quality without public exposure.

### Phase 3: Moderated Public Ratings Preview

Introduce public rating summaries only if moderation, patient identity, dispute handling, and provider response workflows are ready.

Recommendation:
Start with category summaries rather than raw written reviews.

### Phase 4: Moderated Written Reviews

Written reviews should be the last step.

They should require:

- Clear review policy
- Submission rules
- Moderation queue
- Provider response rules
- Dispute handling
- Abuse prevention
- Privacy warnings
- Audit history

---

## Structured Feedback Before Public Reviews

Structured feedback should come before public reviews because it is safer, easier to moderate, and more directly useful for listing quality.

Recommended structured feedback types:

| Feedback Type | Purpose |
| --- | --- |
| Listing accuracy | Fix name, phone, address, hours, services, or affiliation |
| Access issue | Report difficulty contacting or finding a provider |
| Trust concern | Flag suspicious, outdated, or misleading information |
| Experience signal | Non-public patient experience category |
| Platform issue | Search, navigation, or page problem |
| Feature request | Product improvement idea |

Rules:

- Structured feedback should not publish automatically.
- Feedback submitter details should remain private.
- Trust and safety feedback should route to admin review.
- Listing accuracy feedback should become correction requests when actionable.
- Experience signals should not alter verification status directly.

---

## Rating Categories

If ratings are introduced later, a single overall star rating may be too blunt for healthcare.

Recommended category-based approach:

| Category | Applies To | Notes |
| --- | --- | --- |
| Listing accuracy | All providers | Is displayed information accurate? |
| Ease of contact | All providers | Could the patient reach the provider? |
| Wait time | Facilities, doctors, diagnostics | Should be experience-based, not guaranteed |
| Staff communication | Facilities, pharmacies, diagnostics | Patient service experience |
| Doctor communication | Doctors | Bedside manner and clarity, not clinical outcome |
| Cleanliness | Facilities, diagnostics | Facility experience |
| Service availability | Facilities, pharmacies, diagnostics | Whether listed service was available |
| Accessibility | Facilities, diagnostics | Physical access and user needs |
| Booking experience | Future only | Only after booking exists |
| Telemedicine experience | Future only | Only after telemedicine exists |

Rating rules:

- Ratings should be separated from verification status.
- Ratings should not imply medical quality certification.
- Public display should explain the basis and number of reviews.
- Small sample sizes should be handled carefully.
- Recent verified experience may eventually be weighted differently from old anonymous feedback.

---

## Provider-Type Review Differences

Different provider types should not use identical review categories.

### Doctors

Relevant categories:

- Communication clarity
- Respect and professionalism
- Appointment or availability experience
- Facility affiliation accuracy
- Telemedicine experience later

Avoid:

- Rating treatment outcome as a simple score
- Diagnosis-specific public claims
- Personal medical details

### Facilities

Relevant categories:

- Ease of contact
- Wait time
- Cleanliness
- Staff communication
- Service availability
- Location accuracy
- Emergency/24-hour claim accuracy

Avoid:

- Reviews that identify other patients
- Broad clinical claims about all doctors at the facility

### Pharmacies

Relevant categories:

- Ease of contact
- Medicine availability experience later
- Staff helpfulness
- Prescription pickup experience later
- Delivery experience later

Avoid:

- Public prescription details
- Medication-specific health advice
- Inventory claims before inventory exists

### Diagnostics Providers

Relevant categories:

- Test availability experience
- Wait time
- Staff communication
- Result delivery experience later
- Cleanliness

Avoid:

- Posting lab results
- Medical interpretation of results
- Price claims before pricing is supported

---

## Written Review Rules

Written reviews should be introduced only after moderation is ready.

Allowed content:

- General experience descriptions
- Access, communication, cleanliness, wait time, and service availability notes
- Listing accuracy observations
- Respectful provider experience feedback

Disallowed content:

- Personal diagnosis or treatment details
- Lab results or medical records
- Names of other patients
- Defamatory claims
- Threats, harassment, hate speech, or abusive language
- Unverified clinical accusations
- Emergency advice or medical instructions
- Payment disputes with sensitive financial data
- Spam, promotion, or unrelated links

Review form guidance later should warn users not to share private health information.

---

## Verified Patient Review Concept

Verified patient reviews may become useful later, but only when patient accounts, bookings, telemedicine, or patient ID concepts exist.

Possible verification sources:

- Completed booking through the platform
- Completed telemedicine session through the platform
- Patient account with verified contact method
- Future patient ID linked to a platform interaction
- Facility-confirmed visit only if privacy-safe and consented

Rules:

- Verified patient status should confirm that the reviewer likely interacted with the provider.
- It should not reveal why the patient visited.
- It should not expose patient identity publicly.
- It should not prove clinical outcome quality.
- It should not be required for basic public browsing.

Recommended label:
Use a modest label such as "Verified visit" later, not language that implies clinical validation.

---

## Anonymous vs Named Review Approach

Healthcare reviews need privacy, but anonymous reviews increase abuse risk.

Recommended approach:

- Public browsing remains anonymous.
- Review submission may require an account later.
- Public display should default to anonymous or first-name-only presentation.
- The platform should keep reviewer identity private internally and protected.
- Admins may access reviewer identity only when policy and privacy rules allow.
- Providers should not see private patient identifiers.

Review identity options:

| Option | Recommendation |
| --- | --- |
| Fully anonymous public submission | Avoid for public reviews; high abuse risk |
| Account-required, anonymous public display | Preferred later |
| Named public review | Optional only with explicit consent |
| Verified visit, anonymous display | Strong future option |

---

## Moderation Workflow

Reviews and ratings should go through moderation before public display, at least during early phases.

Recommended workflow:

1. Patient submits structured feedback or review.
2. System stores it privately with status `new`.
3. Automated checks may flag spam, profanity, links, or privacy terms later.
4. Review enters moderation queue.
5. Content reviewer checks policy compliance.
6. Reviewer classifies it as publishable, needs redaction, correction lead, trust concern, abuse, duplicate, or reject.
7. Admin reviews escalated or high-risk cases.
8. Approved summary or review is published only if policy allows.
9. Audit log records moderation decisions.

Moderation statuses:

- New
- In review
- Needs redaction
- Approved
- Rejected
- Hidden
- Escalated
- Disputed
- Archived

Moderation should be stricter for written reviews than structured ratings.

---

## Provider Response Rules

Provider responses may help resolve concerns, but they can also expose patient privacy or create pressure.

Provider response should come later, after provider accounts and moderation exist.

Rules:

- Providers may respond only to approved public reviews.
- Responses should be moderated or post-moderated.
- Providers must not reveal patient identity, diagnosis, treatment, appointment details, payment details, or medical records.
- Providers should not pressure reviewers to change reviews.
- Providers should not offer medical advice in public replies.
- Providers should be encouraged to use general, respectful language.
- Disputes should route through admin review, not public argument.

Provider response status:

- Draft
- Submitted
- In review
- Approved
- Rejected
- Hidden

---

## Dispute Handling

Providers and patients should be able to dispute reviews later.

Dispute reasons:

- Review is fake
- Reviewer was not a patient
- Contains private medical information
- Contains false contact/location/service claims
- Contains abusive or defamatory language
- Names staff or other patients inappropriately
- Duplicated or coordinated review abuse
- Wrong provider listing

Dispute flow:

1. Provider, patient, reviewer, or admin flags a review.
2. Review may remain public, be temporarily hidden, or be marked under review depending on severity.
3. Moderator checks review content, metadata, and policy.
4. Admin handles sensitive or disputed decisions.
5. Decision is recorded with reason and audit history.
6. Review is kept, edited/redacted, hidden, rejected, or archived.

Severe disputes should escalate to Admin or Super Admin.

---

## Fake Review Prevention

Fake reviews can damage trust quickly.

Future prevention methods:

- Account requirement for public reviews
- Rate limiting
- Device/session risk checks
- Verified visit labels later
- Duplicate text detection
- Repeated IP or account pattern detection
- Review velocity alerts
- Provider self-review detection
- Conflict-of-interest reporting
- Manual moderation for new providers or suspicious bursts

Rules:

- Providers should not review themselves.
- Staff should not post disguised patient reviews.
- Incentivized reviews should be prohibited unless clearly labeled by policy.
- Review abuse should create moderation flags.
- Fake review decisions should be auditable.

---

## Privacy and Medical Confidentiality Rules

Patient privacy is the highest-risk part of review design.

Rules:

- Do not collect unnecessary health information.
- Warn users not to include diagnosis, treatment, lab results, medication details, or private records.
- Do not expose patient identity publicly by default.
- Do not allow providers to reveal patient details in responses.
- Keep submitter contact details private.
- Store moderation notes separately from public review content.
- Avoid showing enough metadata to identify a patient in small communities.
- Allow redaction or removal when privacy is at risk.
- Treat reviews involving sensitive specialties with extra caution.

Public review text should never become a patient medical record.

---

## Relationship to Patient Accounts

Patient accounts should not be required for public browsing.

Patient accounts may become useful later for:

- Verified review submission
- Review history
- Saved providers
- Booking history
- Notification preferences
- Dispute follow-up
- Privacy settings

Recommended account approach:

- Keep browsing login-free.
- Require account only when a user submits public reviews later.
- Allow structured correction/feedback to remain lightweight if abuse controls allow.
- Do not introduce patient accounts solely for ratings before moderation is ready.

---

## Relationship to Patient ID and Wallet Concepts

Patient ID and wallet concepts are future-only and should not be implemented yet.

### Patient ID

Patient ID may later help connect a review to a real platform interaction, but it should be handled with strong privacy controls.

Rules:

- Patient ID should not appear on public reviews.
- Patient ID should not be required for browsing.
- Patient ID should not expose diagnosis, visit reason, or treatment details.
- Access to patient-linked review verification should be role-scoped and audited.

### Wallet

Wallet concepts may later relate to payments, memberships, credits, or healthcare programs.

Rules:

- Wallet activity should not automatically generate public reviews.
- Providers should not see wallet data through reviews.
- Payment disputes should not be handled as ordinary public reviews.
- Wallet-related review disputes should route to protected support/admin workflows.

---

## Relationship to Admin Review Workflow

Patient reviews and ratings should connect to admin review but remain distinct from listing verification.

Relevant queues:

| Review Workflow | Future Queue |
| --- | --- |
| Structured feedback | Feedback |
| Listing accuracy report | Corrections |
| Public written review | Content review |
| Trust concern | Trust and safety |
| Fake review report | Moderation flags |
| Provider dispute | Dispute review |
| Privacy concern | Urgent trust and safety |
| Review abuse pattern | Moderation flags |

Rules:

- Reviews should not update listing data directly.
- Reviews should not change verification status automatically.
- Review moderation decisions should be audited.
- Severe privacy, abuse, or legal concerns should escalate.
- Review summaries should be excluded from provider verification logic unless future policy explicitly allows a signal.

---

## Future Supabase Table Mapping

This is planning only. No Supabase code, SQL, migrations, policies, or database files should be added yet.

Potential future tables:

| Area | Possible Table |
| --- | --- |
| Review submissions | `patient_reviews` |
| Rating categories | `review_rating_categories` |
| Rating values | `patient_review_ratings` |
| Structured feedback | `feedback_submissions` |
| Listing corrections | `correction_requests` |
| Review moderation | `review_moderation_cases` or `admin_reviews` |
| Provider responses | `provider_review_responses` |
| Review disputes | `review_disputes` |
| Abuse flags | `moderation_flags` |
| Audit history | `audit_logs` |
| Patient accounts later | `profiles` |
| Verified visit link later | `bookings`, `telemedicine_sessions`, or future visit reference |

Future RLS direction:

- Public users may read approved public review summaries only.
- Public users should not read rejected, hidden, disputed, or private review records.
- Review authors can read their own submitted reviews later.
- Providers can read public reviews and submit responses for their own listings later.
- Providers cannot read private patient identifiers.
- Reviewers can read assigned moderation cases.
- Admins can manage moderation and disputes.
- Super Admins handle severe privacy, abuse, or governance escalations.

---

## MVP Recommendation

Do not add public reviews or ratings to the MVP.

Recommended MVP stance:

- Keep public discovery focused on search, verified labels, accurate listings, and correction flows.
- Keep current feedback and correction pages as the safer trust loop.
- Do not show star ratings, review counts, review cards, or written testimonials yet.
- Do not collect patient review text until backend, moderation, and privacy rules exist.
- Do not use fake/sample ratings in provider cards.

Recommended next step before reviews:

1. Improve structured feedback and correction workflows.
2. Define moderation policy.
3. Define patient account timing.
4. Define public-safe review fields.
5. Define admin review and dispute workflows.
6. Add backend and audit logging.
7. Pilot internal structured experience signals.
8. Consider public category summaries later.
9. Consider written reviews last.

---

## Summary

Patient reviews and ratings can eventually improve healthcare discovery, but they should be introduced carefully and late.

DigitalDirectory-v2 should start with structured feedback, corrections, verification labels, and admin-reviewed trust workflows. Public reviews should wait until patient accounts, moderation, privacy rules, provider response rules, dispute handling, fake review prevention, and audit logging are ready.

The recommended MVP is no public reviews and no ratings UI.
