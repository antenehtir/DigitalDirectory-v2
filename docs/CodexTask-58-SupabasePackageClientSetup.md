# Codex Task 58: Supabase Package and Client Setup

## Project

DigitalDirectory-v2

## Goal

Install the Supabase JavaScript package and create a minimal, safe Supabase client setup for future public listing reads.

This is the first controlled technical Supabase setup step.

This task may add the Supabase package and safe client helper files.

Do not add real Supabase queries.

Do not create `.env` files.

Do not add real keys.

Do not add SQL.

Do not add migrations.

Do not add RLS policies.

Do not add authentication.

Do not add backend functionality.

Do not add protected routes.

Do not modify public listing behavior.

Do not modify existing listing pages to use Supabase yet.

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
- docs/CodexTask-56-PublicListingDataMapperPlanning.md
- docs/CodexTask-57-StaticToSupabaseSourceSwitchPlanning.md
- docs/CodexTask-58-SupabasePackageClientSetup.md

Follow the established product direction.

---

## Current Status

Tasks 01–57 created:

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

The app currently works as a frontend/static public directory with preview pages.

Task 58 should add only the minimal package/client setup needed for later tasks.

---

## Main Objective

Install the Supabase package and create safe client setup helpers.

Likely package:

```text
@supabase/supabase-js