# Codex Task 01: Design System Setup

## Project

DigitalDirectory-v2

## Goal

Set up the foundational design system for the DigitalDirectory-v2 Next.js application.

This task should prepare the app visually and structurally before building the homepage or feature pages.

The product is a healthcare discovery and verification platform for Ethiopia. The design must be:

- Mobile-first
- Search-first
- Trust-first
- Clean
- Modern
- Healthcare appropriate
- Easy for patients and doctors to use

---

## Important Context

Read these documents before making changes:

- docs/ProductVision.md
- docs/Architecture.md
- docs/DevelopmentRoadmap.md
- docs/DesignSystem.md

Follow the design direction defined there.

---

## Stack

Current project stack:

- Next.js
- TypeScript
- TailwindCSS
- App Router
- src directory

---

## Main Objective

Implement the basic design system foundation inside the app.

Do not build the full homepage yet.

Do not build search functionality yet.

Do not build backend functionality yet.

Only prepare the design foundation and starter layout.

---

## Tasks

### 1. Review Current Structure

Inspect the current project structure:

- src/app
- src/app/page.tsx
- src/app/layout.tsx
- src/app/globals.css
- package.json

Understand the current default Next.js setup.

---

### 2. Update Global CSS

Update `src/app/globals.css` to include healthcare-focused CSS variables.

Use these design tokens:

```css
:root {
  --background: #F8FAFC;
  --foreground: #0F172A;

  --primary: #0F4C81;
  --primary-foreground: #FFFFFF;

  --secondary: #0E9F9A;
  --secondary-foreground: #FFFFFF;

  --success: #16A34A;
  --warning: #F59E0B;
  --error: #DC2626;

  --card: #FFFFFF;
  --card-foreground: #0F172A;

  --muted: #F1F5F9;
  --muted-foreground: #64748B;

  --border: #E2E8F0;
  --input: #FFFFFF;
  --ring: #0F4C81;
}