# Codex Task 54: Public Listing Read Implementation Preparation

## Project

DigitalDirectory-v2

## Goal

Create a planning/preparation document for the first future public listing read implementation, including whether to install Supabase packages now or later, where public listing query functions should live, how static seed fallback should work, how current UI data shapes should map to future Supabase rows, how private fields must be protected, how to test without production data, and how to keep rollback easy.

This task is preparation-only.

Do not install Supabase packages.

Do not add Supabase client code.

Do not add real Supabase queries.

Do not create `.env` files.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not change current public listing behavior.

Do not modify frontend UI.

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
- docs/CodexTask-52-BookingRequestUIPreview.md
- docs/CodexTask-53-AdminReviewUIPreview.md
- docs/CodexTask-54-PublicListingReadImplementationPrep.md

Follow the established product direction.

---

## Current Status

Tasks 01–53 created:

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
- Admin Review UI Preview

The app currently works as a frontend/static public directory with preview pages.

Task 54 should prepare the transition from static seed data to Supabase-backed public listing reads without implementing the transition yet.

---

## Main Objective

Create a new documentation file:

```text
docs/PublicListingReadImplementationPrep.md