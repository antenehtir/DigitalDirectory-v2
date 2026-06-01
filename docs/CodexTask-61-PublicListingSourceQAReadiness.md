# Codex Task 61: Public Listing Source QA Readiness

## Project

DigitalDirectory-v2

## Goal

Create a documentation-only QA/readiness checklist for the public listing mapper layer and static source wrapper before any Supabase public read implementation is connected to live pages.

This task is documentation-only.

Do not add Supabase reads.

Do not modify mapper code.

Do not modify source wrapper code.

Do not change public listing behavior.

Do not modify frontend UI.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/SupabaseBackendPlanning.md
- docs/SupabaseIntegrationPhase1.md
- docs/SupabaseEnvironmentSetupGuide.md
- docs/PublicListingSchemaDraft.md
- docs/RLSPolicyPlanning.md
- docs/SupabaseClientSetupPlanning.md
- docs/PublicListingReadIntegrationPlan.md
- docs/PublicListingReadImplementationPrep.md
- docs/SupabaseTestProjectChecklist.md
- docs/PublicListingDataMapperPlanning.md
- docs/StaticToSupabaseSourceSwitchPlanning.md
- docs/SeedDataStructure.md
- docs/CodexTask-59-PublicListingMapperImplementation.md
- docs/CodexTask-60-StaticToSupabaseSourceWrapperImplementation.md
- docs/CodexTask-61-PublicListingSourceQAReadiness.md

Follow the established product direction.

---

## Current Status

Tasks 01–60 created:

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
- Public Listing Read Implementation Preparation
- Supabase Test Project Checklist
- Public Listing Data Mapper Planning
- Static-to-Supabase Source Switch Planning
- Supabase Package and Client Setup
- Public Listing Mapper Implementation
- Static-to-Supabase Source Wrapper Implementation

The app currently works as a frontend/static public directory with preview pages.

Task 61 should create a QA/readiness document before any real Supabase public read implementation is connected.

---

## Main Objective

Create a new documentation file:

```text
docs/PublicListingSourceQAReadiness.md