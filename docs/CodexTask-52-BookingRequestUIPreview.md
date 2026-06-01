# Codex Task 52: Booking Request UI Preview

## Project

DigitalDirectory-v2

## Goal

Create a frontend-only preview for future booking request workflows, including doctor appointment requests, facility/service booking requests, diagnostics appointment requests, telemedicine request preview, booking status explanation, reschedule/cancellation preview, provider confirmation requirement, and privacy/consent notes.

This task is UI preview only.

Do not add authentication.

Do not add Supabase.

Do not add backend functionality.

Do not add protected routes.

Do not add real booking functionality.

Do not add notifications.

Do not add payments.

Do not add provider dashboard functionality.

Do not modify database files.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/UserRolesAccountStrategy.md
- docs/DataModelContentStructure.md
- docs/SupabaseBackendPlanning.md
- docs/SupabaseIntegrationPhase1.md
- docs/SupabaseEnvironmentSetupGuide.md
- docs/PublicListingSchemaDraft.md
- docs/RLSPolicyPlanning.md
- docs/SupabaseClientSetupPlanning.md
- docs/PublicListingReadIntegrationPlan.md
- docs/AdminReviewWorkflowPlanning.md
- docs/GovernanceRolesSuperAdminStrategy.md
- docs/DoctorProfileScheduleContentStrategy.md
- docs/FacilityProfileManagementStrategy.md
- docs/PatientReviewsRatingsStrategy.md
- docs/PatientIdentityConsentStrategy.md
- docs/BookingSchedulingStrategy.md
- docs/PaymentsWalletStrategy.md
- docs/PatientTransportRideHailingStrategy.md
- docs/PatientDocumentVaultRecordsStrategy.md
- docs/ListingSharingReferralStrategy.md
- docs/NotificationReminderStrategy.md
- docs/ChatbotAssistantAISafetyStrategy.md
- docs/CommunitySupportGroupsStrategy.md
- docs/PublicListingSchemaDraft.md
- docs/RLSPolicyPlanning.md
- docs/SupabaseClientSetupPlanning.md
- docs/PublicListingReadIntegrationPlan.md
- docs/CodexTask-50-ProviderDashboardUIPreview.md
- docs/CodexTask-51-PatientAccountUIPreview.md
- docs/CodexTask-52-BookingRequestUIPreview.md

Follow the established product direction.

---

## Current Status

Tasks 01–51 created:

- Public frontend discovery system
- Facility and doctor detail previews
- Provider registration preview
- Correction flow preview
- Contact/support page
- Feedback loop
- Community/social update layer
- Auth/account preview
- Seed data structure
- User roles strategy
- Data model planning
- Supabase backend planning
- Admin review workflow planning
- Governance roles and Super Admin strategy
- Doctor profile, schedule, and content strategy
- Facility profile and management strategy
- Patient reviews and ratings strategy
- Patient identity and consent strategy
- Booking and scheduling strategy
- Payments and wallet strategy
- Patient transport and ride-hailing strategy
- Patient document vault and records sharing strategy
- Listing sharing and referral strategy
- Notification and reminder strategy
- Chatbot assistant and AI safety strategy
- Community and support groups strategy
- Supabase Integration Phase 1 strategy
- Supabase Environment Setup Guide
- Public Listing Schema Draft
- RLS Policy Planning
- Supabase Client Setup Planning
- Public Listing Read Integration Plan
- Provider Dashboard UI Preview
- Patient Account UI Preview

The app is still frontend-only.

Task 52 should create a safe UI preview for future booking request concepts without adding real authentication, Supabase, backend, protected routes, booking submission, notifications, payments, or provider dashboard integration.

---

## Main Objective

Create a booking request preview experience using static/mock data only.

Suggested route:

```text
/booking-request-preview