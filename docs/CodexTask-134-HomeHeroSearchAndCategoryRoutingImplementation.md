# Codex Task 134: Home Hero Search and Category Button Routing Implementation

## Goal

Implement simple routing for the homepage hero search bar and category buttons.

Do not implement full filtering yet.

## Context

Read:

- docs/HomeHeroSearchAndCategoryRoutingPlan.md
- docs/StaticPreviewRoutesAndUICleanupInventory.md
- docs/CodexTask-133-HomeHeroSearchAndCategoryRoutingPlan.md

Inspect:

- src/app/page.tsx
- src/app/search
- src/app/facilities/page.tsx
- src/app/doctors/page.tsx
- src/app/pharmacies
- src/components

## Implement

On the homepage hero section:

- Search button with empty query should route to:

```text
/search