# Codex Task 06: Doctor Cards System

## Project

DigitalDirectory-v2

## Goal

Create a reusable doctor card system for DigitalDirectory-v2.

Doctor cards will be used across:

- Homepage doctor discovery section
- Future doctor search page
- Future specialty pages
- Future facility detail pages
- Future telemedicine discovery pages

This task is frontend-only.

Do not add backend functionality.

---

## Important Context

Before making changes, read:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/DesignSystem.md
- docs/CodexTask-01-DesignSystemSetup.md
- docs/CodexTask-02-CoreLayoutShell.md
- docs/CodexTask-03-HomepageStructure.md
- docs/CodexTask-04-SearchExperienceUI.md
- docs/CodexTask-05-FacilityCardsSystem.md
- docs/CodexTask-06-DoctorCardsSystem.md

Follow the established product direction and design system.

---

## Current Status

Task 01 created the initial design system.

Task 02 created the core layout shell.

Task 03 created the homepage structure.

Task 04 improved the search experience UI.

Task 05 created the reusable facility cards system.

Task 06 should now create a polished reusable doctor card system.

---

## Stack

- Next.js
- TypeScript
- TailwindCSS
- App Router
- src directory

---

## Main Objective

Create reusable doctor card components that communicate:

1. Who the doctor is
2. What specialty they practice
3. Where they are affiliated
4. Whether they are verified
5. Whether they are available
6. Whether telemedicine is planned or available
7. What action the user can take next

The card must feel:

- Professional
- Trustworthy
- Mobile-friendly
- Healthcare-specific
- Easy to scan
- Action-oriented

---

## Suggested Folder Structure

Create or update:

```text
src/components/cards/
src/components/trust/
src/types/
src/data/