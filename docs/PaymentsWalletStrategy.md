# DigitalDirectory-v2 Payments and Wallet Strategy

## Purpose

This document defines the future strategy for payments, wallet concepts, transaction workflows, refunds, provider settlement, diaspora and family sponsorship payments, and payment-related security for DigitalDirectory-v2.

It is planning-only. It does not add backend functionality, Supabase, database files, migrations, SQL, authentication, dashboards, protected routes, payment UI, wallet UI, payment functionality, wallet functionality, payment gateways, webhook handling, packages, or frontend changes.

The goal is to clarify payment and wallet direction before any real checkout, stored balance, financial records, provider settlement, or gateway integration is built.

---

## Core Principle

Payments should come after trusted discovery, patient identity, booking, provider ownership, consent, privacy, and governance workflows are ready.

DigitalDirectory-v2 should not introduce payment or wallet features just to make the product feel complete. Financial workflows should exist only when they solve a real patient or provider need and can be handled with strong security, auditability, refund rules, and support operations.

Current public browsing should remain login-free and payment-free.

---

## Payment Use Cases

Future payment use cases may include:

- Appointment deposits
- Confirmed doctor consultation payments
- Facility or service appointment payments
- Telemedicine consultation payments
- Diagnostics test or imaging payments
- Pharmacy pickup or delivery payments
- Healthcare membership or credit programs
- Family or diaspora sponsorship payments
- Refunds, credits, and cancellation adjustments
- Provider settlement and payout reporting

Payment use cases should not be introduced until the related operational workflow is real. For example, appointment payments should wait until booking exists, pharmacy payments should wait until pharmacy ordering or pickup workflows exist, and diagnostics payments should wait until test request workflows exist.

---

## Wallet Concept

A DigitalDirectory wallet may eventually represent patient-held credits, sponsored balances, refunds, membership benefits, or prepaid healthcare funds.

Possible wallet purposes:

- Store refundable credits after cancelled bookings.
- Hold sponsored healthcare funds from family members.
- Track membership or program benefits.
- Apply credits to future appointments, pharmacy pickup, diagnostics, or telemedicine.
- Support controlled spending limits for family sponsorship.

Important boundaries:

- Wallet functionality should not exist in the current MVP.
- Wallet balance should not be visible in public listing data.
- Providers should not see a patient's total wallet balance.
- Wallet funds should not be mixed with provider verification or listing trust data.
- Wallet activity should require patient identity, access controls, audit logs, and financial governance.
- The wallet should be a private financial layer, not a public profile feature.

Recommended framing:
Treat wallet as a future account-based value and credit system, not as an early marketing feature.

---

## Appointment Payment Flow

Appointment payments should follow booking readiness.

Recommended future flow:

1. Patient selects a doctor, facility, service, or appointment request entry point.
2. Patient submits an appointment request or chooses an available slot when confirmed booking exists.
3. Provider confirms the appointment or offers a time.
4. Payment is requested only when the booking policy requires payment.
5. Patient pays through an approved payment method or wallet credit.
6. Payment status is linked to the booking.
7. Appointment status and payment status remain separate but coordinated.
8. Cancellation or no-show policy determines refund, credit, or provider settlement handling.

Rules:

- Appointment request should be able to exist before payment in early phases.
- Payment should not imply clinical approval or guaranteed outcome.
- A failed payment should not publish any public data.
- Patient payment details should not be exposed to providers beyond the minimum needed status.
- Provider dashboards should show payment status only for their own appointments later.

---

## Pharmacy Payment Flow

Pharmacy payments should wait until real pharmacy workflows exist.

Possible future payment use cases:

- Prescription pickup payment
- Over-the-counter item reservation payment
- Delivery payment
- Refill support payment
- Sponsored family pharmacy payment

Recommended future flow:

1. Patient chooses a pharmacy workflow after pharmacy ordering or pickup becomes real.
2. Patient submits a pickup, refill, or delivery request.
3. Pharmacy confirms availability and final amount.
4. Patient pays after confirmation, not from static preview inventory.
5. Payment record links to the pharmacy request.
6. Pickup, delivery, cancellation, or refund status is tracked separately.

Rules:

- Do not take payment for unconfirmed medicine availability.
- Do not store prescriptions or medical details in payment records.
- Prescription upload, if ever added, should use separate private storage and consent rules.
- Pharmacy staff should not see unrelated patient wallet details.
- Delivery fees, medicine costs, and service fees should be separated in future records.

---

## Lab and Diagnostics Payment Flow

Diagnostics payments should wait until test request, booking, or service confirmation workflows exist.

Possible future payment use cases:

- Laboratory test payment
- Imaging appointment payment
- Sample collection fee
- Result delivery service fee
- Family-sponsored diagnostics payment

Recommended future flow:

1. Patient selects a diagnostics provider or service.
2. Provider confirms service availability, appointment need, and price later.
3. Patient pays only after availability and scope are confirmed.
4. Payment record links to the diagnostics request or booking.
5. Result delivery and clinical interpretation remain separate from the payment record.

Rules:

- Payment records should not contain lab results.
- Payment status should not reveal sensitive test details publicly.
- Diagnostics providers should see only payment status needed to fulfill the request.
- Refund rules should account for whether the test was started, sample collected, or service completed.

---

## Telemedicine Payment Flow

Telemedicine payments should be future-only and should wait until telemedicine scheduling, consent, privacy, support, and provider readiness are defined.

Possible future flow:

1. Patient selects telemedicine with an approved doctor.
2. Patient accepts telemedicine consent terms.
3. Appointment time is confirmed.
4. Patient pays consultation fee or applies wallet credit.
5. Session status and payment status are tracked separately.
6. Refund or credit rules apply if the doctor cancels, patient cancels, or session fails.

Rules:

- Telemedicine payment should not expose consultation content.
- Telemedicine links should not be public.
- Payment should not be collected before consent and appointment confirmation rules exist.
- Failed session disputes should route to protected support/admin workflows.

---

## Diaspora and Family Sponsorship Payment Flow

Diaspora and family sponsorship may become a valuable future feature because family members may want to pay for care for someone in Ethiopia.

Possible use cases:

- Sponsor an appointment deposit.
- Sponsor diagnostics testing.
- Sponsor pharmacy pickup.
- Add funds to a patient's wallet.
- Pay for a healthcare membership or care credit program.

Recommended future flow:

1. Sponsor starts a payment for a specific patient, booking, provider request, or wallet credit.
2. Patient identity and consent rules define whether the sponsor can see details.
3. Sponsor pays through an approved method.
4. Funds are earmarked for a purpose or added as restricted wallet credit.
5. Patient controls or confirms how funds are used when appropriate.
6. Provider receives only payment confirmation required for fulfillment.

Rules:

- Sponsorship should not expose sensitive patient health details to the sponsor by default.
- A sponsor should not receive diagnosis, test result, prescription, or visit details unless a separate consent model allows it.
- Sponsored funds may need purpose restrictions, expiry, refund rules, and dispute handling.
- Patient safety and privacy should take priority over sponsor convenience.

---

## Payment Methods

Future payment method support should be decided after market, compliance, and gateway review.

Potential methods:

| Method | Possible Use |
| --- | --- |
| Mobile money | Local patient payments, wallet top-ups, appointment deposits |
| Bank card | Local or diaspora card payments |
| Bank transfer | Larger facility or partner payments later |
| Cash-assisted payment | Provider-side or partner-assisted workflow later |
| Wallet credit | Refunds, sponsorship, membership, healthcare credits |
| Voucher or program credit | NGO, employer, partner, or membership programs later |

Payment method rules:

- Do not store raw card details.
- Use approved payment providers for payment instruments.
- Keep payment method tokens separate from public user data.
- Do not expose provider bank details publicly.
- Do not add payment gateways until compliance, settlement, support, and refund needs are defined.

---

## Transaction Statuses

Recommended future transaction statuses:

| Status | Meaning |
| --- | --- |
| `draft` | Transaction is being prepared, not payable yet |
| `pending_payment` | Patient or sponsor needs to pay |
| `processing` | Payment provider is processing |
| `authorized` | Amount is authorized but not captured, if supported |
| `paid` | Payment completed |
| `failed` | Payment failed |
| `cancelled` | Payment attempt was cancelled |
| `expired` | Payment window expired |
| `refunded` | Fully refunded |
| `partially_refunded` | Partially refunded |
| `credited_to_wallet` | Returned as platform credit |
| `disputed` | Payment is under dispute |
| `chargeback` | Payment reversed through provider or bank process |
| `settlement_pending` | Provider payout not completed yet |
| `settled` | Provider settlement completed |

Rules:

- Payment status should not replace booking status.
- Public users should never see internal settlement states.
- Patients should see simple labels.
- Providers should see fulfillment-relevant labels.
- Admins should see detailed status and audit history only in future protected tools.

---

## Booking and Payment Relationship

Booking and payment should be related but separate.

Booking answers:

- Who is requesting care?
- Which provider, service, or doctor is involved?
- What time or request status applies?
- Has the appointment been confirmed, completed, cancelled, or rescheduled?

Payment answers:

- Was money requested?
- Was money paid, failed, refunded, credited, or disputed?
- Which booking or service does the transaction support?
- What settlement is owed to the provider?

Rules:

- A booking can exist without payment.
- A payment should reference a booking, request, pharmacy order, diagnostics request, telemedicine session, wallet top-up, or sponsorship purpose.
- Payment failure should not delete booking history.
- Booking cancellation should trigger payment/refund policy review.
- Completed payment should not automatically mark care as completed.
- Completed booking may later support verified visit review eligibility, but payment alone should not.

---

## Wallet Balance and Credits

Future wallet balance may include different kinds of value.

Potential wallet balance types:

| Balance Type | Purpose |
| --- | --- |
| Cash-equivalent credit | Refunds or prepaid funds |
| Sponsored credit | Funds from family or diaspora sponsor |
| Provider-specific credit | Credit usable with a specific provider |
| Program credit | NGO, employer, membership, or campaign benefit |
| Promotional credit | Future limited marketing credit, if policy allows |
| Refund credit | Returned funds held for future use |

Wallet rules:

- Balance changes should be ledger-based, not overwritten as a single number.
- Wallet ledger entries should be auditable.
- Credits may have restrictions, expiry, and refundability rules.
- Providers should not see total patient balance.
- Patients should see clear available balance and restrictions later.
- Wallet credits should not be used to hide refunds or avoid cash refund obligations where required.

Recommended ledger actions:

- Credit added
- Payment reserved
- Payment captured
- Credit applied
- Refund credited
- Credit expired
- Manual adjustment
- Dispute hold
- Dispute release

---

## Refund and Cancellation Rules

Refund rules should be defined before accepting payments.

Refund triggers:

- Provider cancels appointment
- Patient cancels within allowed window
- Provider cannot fulfill confirmed service
- Pharmacy item unavailable after confirmation
- Diagnostics test unavailable after confirmation
- Telemedicine session fails due to provider/platform issue
- Duplicate payment
- Fraud or unauthorized payment report

Potential outcomes:

| Outcome | Use When |
| --- | --- |
| Full refund | Service not delivered or policy requires full return |
| Partial refund | Some costs were incurred or policy allows partial return |
| Wallet credit | Patient chooses or policy allows credit |
| No refund | Policy clearly states non-refundable condition |
| Manual review | Dispute, unclear evidence, or high-risk case |

Rules:

- Refund policy should be visible before payment later.
- Refund status should be linked to the original transaction.
- Refund decisions should be audited.
- Providers should not be able to deny refunds outside platform policy when payment is platform-managed.
- Sensitive clinical details should not be stored in refund records.
- Disputed refunds should route to support/admin workflows.

---

## Provider Settlement

Provider settlement is the process of paying providers after platform-managed payments.

Future settlement concepts:

- Gross payment amount
- Platform fee, if any
- Gateway fee
- Refund deductions
- Taxes or withholding, if applicable
- Net provider payout
- Settlement status
- Settlement batch
- Provider payout account

Settlement rules:

- Provider settlement should not launch before provider identity, ownership, and payout verification are ready.
- Provider payout account details should be private and protected.
- Settlement records should be auditable.
- Refunds, disputes, and chargebacks should affect settlement logic.
- Providers should see only their own settlement summaries in future dashboards.
- Super Admin or finance-level authority may be needed for manual adjustments later.

Recommended settlement statuses:

- Pending
- On hold
- Ready for payout
- Processing payout
- Paid
- Failed
- Adjusted
- Disputed

---

## Security and Compliance Considerations

Payment and wallet systems require stronger security than public listing features.

Security rules:

- Do not store raw card numbers or sensitive payment credentials.
- Use established payment providers for payment processing.
- Keep payment provider secrets server-only.
- Require authentication for wallet access.
- Require stronger controls for admin, settlement, refund, and adjustment actions.
- Audit all payment, wallet, refund, settlement, and access events.
- Keep payment data separate from public provider listing data.
- Keep patient identity, booking, payment, wallet, and review data separated by purpose.
- Do not expose payment details through public pages, search documents, cards, or detail pages.
- Use least-privilege access for support, provider, admin, and reviewer roles.

Compliance considerations:

- Payment gateway terms and local regulatory requirements
- Refund and consumer protection obligations
- Anti-fraud and anti-money-laundering expectations
- Tax and settlement reporting
- Data retention and deletion rules
- Patient privacy and consent requirements
- Cross-border payment rules for diaspora sponsorship

The platform should obtain legal, financial, and compliance guidance before real money movement.

---

## Fraud and Abuse Prevention

Payment workflows introduce fraud, abuse, and support risks.

Potential risks:

- Stolen payment methods
- Fake provider payment requests
- Provider impersonation
- Refund abuse
- Chargebacks
- Sponsor coercion or misuse
- Wallet credit laundering
- Fake bookings created to move money
- Phishing through external payment links
- Unauthorized payout account changes

Future prevention methods:

- Verified provider ownership before payouts
- Payment provider fraud tools
- Rate limits
- Manual review for high-value or unusual payments
- Payout account change review
- Refund velocity monitoring
- Suspicious wallet transfer blocking
- Audit logs for all financial actions
- Clear prohibition on unreviewed external payment links
- Admin or Super Admin escalation for severe cases

Rules:

- External payment links should be high-risk listing content.
- Providers should not be allowed to add payment links to public profiles without review.
- Wallet transfers between users should not be added unless there is a strong, governed reason.
- Fraud cases should not expose patient medical details unnecessarily.

---

## Relationship to Patient Identity

Payments and wallet should require stronger patient identity than public browsing.

Relationship rules:

- Public discovery remains login-free.
- Wallet access requires a patient account later.
- Payment history should belong to the patient or sponsor account.
- Sponsorship should use consent rules when patient details are involved.
- Stronger identity may be needed for high-value wallet balances, refunds, disputes, or regulated programs.
- Providers should not access patient wallet balance or full payment history.
- Patient payment data should not appear in public profiles, reviews, search, or provider listings.

Patient identity levels from `PatientIdentityConsentStrategy.md` should guide when payment features can launch.

---

## Relationship to Reviews

Payments may help verify that a platform interaction happened, but payment alone should not create a public review or rating.

Rules:

- A paid transaction does not prove clinical quality.
- Payment records should not expose diagnosis, visit reason, test result, prescription, or sensitive context.
- Verified visit review eligibility should rely on completed booking or service status, not only payment.
- Payment disputes should not be handled as public reviews.
- Providers should not use refund or wallet data to pressure review changes.
- Review moderation should remain separate from financial dispute handling.

Potential future connection:
A completed paid booking may contribute to an internal verified interaction signal, but public review display should remain privacy-safe and moderated.

---

## Relationship to Transport and Ride-Hailing

Transport and ride-hailing are future-only and should not be added with payments.

Possible future payment use cases:

- Transport to confirmed appointment
- Sponsored transport for family member
- Healthcare transport voucher
- Combined appointment and transport payment later

Rules:

- Transport payment should not reveal medical details to transport providers.
- Transport destination and patient location should require explicit consent.
- Transport data should be separate from healthcare booking notes and wallet data.
- Transport refunds and disputes should have their own support policy.
- Booking, wallet, and transport should not be bundled until each workflow is mature.

Transport payment planning should wait for separate transport privacy, safety, and consent strategy.

---

## Relationship to Provider Workflows

Provider payment workflows should come after provider ownership and dashboards exist.

Provider-side payment needs:

- Confirm whether a service requires payment.
- View payment status for own appointments or requests.
- Receive settlement summaries.
- Manage payout account details later.
- See refund and dispute status for their own transactions.
- Request support for settlement issues.

Provider boundaries:

- Providers cannot see unrelated patient payment history.
- Providers cannot see wallet balances.
- Providers cannot change refund rules without policy.
- Providers cannot modify settlement calculations directly.
- Providers cannot add unreviewed payment links to public profiles.
- Facility managers may need scoped access that differs from facility owners.

Payment workflows should map to the governance and provider management strategies before implementation.

---

## Future Supabase Table Mapping

This is planning only. No Supabase code, SQL, migrations, policies, or database files should be added yet.

Potential future tables:

| Area | Possible Table |
| --- | --- |
| Payment transactions | `payment_transactions` |
| Payment attempts | `payment_attempts` |
| Payment methods | `payment_methods` or provider token references |
| Wallet accounts | `wallet_accounts` |
| Wallet ledger | `wallet_ledger_entries` |
| Wallet holds | `wallet_holds` |
| Refunds | `payment_refunds` |
| Disputes | `payment_disputes` |
| Provider settlements | `provider_settlements` |
| Settlement batches | `settlement_batches` |
| Provider payout accounts | `provider_payout_accounts` |
| Sponsorship payments | `sponsorship_payments` |
| Sponsorship grants | `sponsorship_grants` |
| Booking links | `bookings` or `appointment_requests` |
| Pharmacy request links | `pharmacy_requests` later |
| Diagnostics request links | `diagnostics_requests` later |
| Telemedicine links | `telemedicine_sessions` later |
| Patient identity | `patient_profiles` or `profiles` |
| Provider ownership | `provider_ownerships` |
| Support cases | `support_cases` or `contact_messages` |
| Audit history | `audit_logs` |

Future RLS direction:

- Patients can read their own transactions and wallet ledger.
- Sponsors can read their own sponsorship payments and limited purpose status.
- Providers can read payment statuses and settlements for their own fulfilled workflows.
- Providers cannot read patient wallet balances or unrelated transactions.
- Support operators can access limited payment support context.
- Admins can manage refunds, disputes, and settlement cases within policy.
- Super Admin access should be rare and audited for sensitive financial overrides.
- Anonymous public users cannot read payment or wallet tables.

---

## MVP Recommendation

Do not add payments or wallet to the MVP.

Recommended MVP stance:

- Keep healthcare discovery public and payment-free.
- Keep registration, corrections, contact, feedback, and community channels frontend-only.
- Do not show checkout, wallet balance, payment buttons, paid booking, gateway logos, stored cards, sponsorship flows, or settlement views.
- Do not collect payment data.
- Do not imply that providers can receive payment through the platform yet.

Recommended first payment step later:
Start with a narrow payment use case after booking and provider dashboards are real, such as appointment deposit or telemedicine consultation payment, then add refunds and settlement handling before expanding.

---

## Risks

Key risks:

- Adding payment before booking and provider fulfillment are reliable.
- Collecting financial data before compliance and security planning.
- Exposing wallet or payment data to providers or public pages.
- Confusing payment completion with clinical service completion.
- Launching sponsorship without patient consent boundaries.
- Allowing providers to publish external payment links without review.
- Handling refunds manually without audit logs.
- Mixing wallet credits with provider settlement incorrectly.
- Creating chargeback or fraud exposure without support workflows.
- Launching provider payouts before ownership and payout verification.
- Combining payment, booking, reviews, and transport too early.

Mitigations:

- Keep payment features out of MVP.
- Define payment statuses and refund rules before implementation.
- Use gateway-managed payment instruments.
- Separate payment, booking, patient identity, reviews, and public listing data.
- Audit financial actions.
- Require provider ownership and payout verification.
- Add support and dispute workflows before real money movement.
- Launch one narrow payment use case first.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only and discovery-first.
2. Continue improving listing accuracy, correction flows, feedback, and provider detail pages.
3. Finalize patient identity, booking, provider management, governance, and review strategies.
4. Define exact payment use case priority after booking scope is approved.
5. Define payment statuses, refund rules, wallet ledger rules, and settlement rules in planning.
6. Select payment gateway candidates only after compliance and market review.
7. Plan Supabase tables and RLS policies for payments and wallet only after backend scope is approved.
8. Add authentication when provider/admin and patient-specific workflows justify it.
9. Add audit logging before storing payment, wallet, refund, or settlement data.
10. Implement appointment requests and provider confirmations before paid booking.
11. Add a narrow payment pilot, such as appointment deposit, only after booking and support are ready.
12. Add refund and dispute handling before broad payment expansion.
13. Add provider settlement after provider ownership and payout verification are ready.
14. Add wallet credits only after ledger, refund, sponsorship, and security rules are ready.
15. Add diaspora/family sponsorship only after consent, privacy, and purpose restriction rules are ready.
16. Add pharmacy, diagnostics, telemedicine, and transport payments only when those workflows are real.

---

## Summary

Payments and wallet can eventually make DigitalDirectory-v2 more useful, especially for appointment deposits, telemedicine, pharmacy pickup, diagnostics, family sponsorship, refunds, credits, and provider settlement.

They should be introduced late and carefully. The platform should first establish trusted discovery, patient identity, booking, provider ownership, consent, support, audit logging, and governance.

The recommended MVP is no payment UI, no wallet UI, no payment functionality, no wallet functionality, no gateway integration, and no financial data storage.
