# Codex Task 53: Admin Review UI Preview

## Project

DigitalDirectory-v2

## Goal

Create a frontend-only preview for future Admin review workflows, including provider registration review, correction request review, ownership claim review, verification status review, high-risk listing change review, reviewer/Admin/Super Admin boundaries, audit log preview, and mock-only approve/reject/request-more-info actions.

This task is UI preview only.

Do not add authentication.

Do not add Supabase.

Do not add backend functionality.

Do not add protected routes.

Do not add real admin permissions.

Do not add real review actions.

Do not add real data writes.

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
- docs/PatientIdentityConsentStrategy.md
- docs/BookingSchedulingStrategy.md
- docs/PaymentsWalletStrategy.md
- docs/NotificationReminderStrategy.md
- docs/CodexTask-51-PatientAccountUIPreview.md
- docs/CodexTask-52-BookingRequestUIPreview.md
- docs/CodexTask-53-AdminReviewUIPreview.md

Follow the established product direction.

---

## Current Status

Tasks 01–52 created:

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
- Booking Request UI Preview

The app is still frontend-only.

Task 53 should create a safe UI preview for future Admin review concepts without adding real authentication, Supabase, backend, protected routes, admin permissions, review actions, or data writes.

---

## Main Objective

Create an Admin review preview experience using static/mock data only.

Suggested route:

```text
/admin-review-preview