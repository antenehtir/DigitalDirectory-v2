# Codex Task 199: Mobile MVP UI Refinement Sprint 1

## Project

DigitalDirectory-v2 / Tiru

## Goal

Implement a focused mobile-first MVP cleanup sprint for Tiru based on the project-owner mobile review comments.

Do not create Task 200.
Do not do Phase 2.
Do not perform a full redesign.
Focus only on mobile MVP cleanup.

## Main MVP Rule

Show only real information.

Remove placeholder, fake, fictional, preview, demo, and long explanation content from public mobile pages.

If real data is missing, hide the section or show a minimal clean empty state.

Do not invent replacement content.

## Mobile-First Requirement

This sprint is mobile-first only.

Desktop should remain functional but does not need deep polish now.

## Brand Direction

The product is now:

```text
Tiru
```

Tagline:

```text
Trace the right care.
```

Replace all user-facing text:

```text
DigitalDirectory-v2
```

with:

```text
Tiru
```

Apply this to visible UI, footer, metadata/title, app title, placeholder copy, and header/mobile brand text.

For MVP, simplify the theme to black, white, dark gray, light gray, subtle neutral borders, and minimal accent only if needed.

Reduce the current colorful/teal-heavy styling.

Remove the graphic logo from the mobile header for now.

Use text-based branding:

```text
Tiru
Trace the right care.
```

## Header Requirements

Mobile header should be simple and clean.

Replace current `S` and `R` buttons with clear actions:

- Search icon/button → search page or search action
- Plus icon/button → register/add listing page

If an icon library already exists, use it.

If no icon library exists, use simple accessible text/icon characters without adding a new package.

Keep the theme toggle if already implemented, but make it compact and visually consistent with the monochrome MVP direction.

Avoid a large colorful button.

Do not break bottom mobile navigation.

## Home Hero Requirements

Replace current hero heading with:

```text
Find healthcare facilities, services, doctors, and pharmacies on the go.
```

Use this short intro/pill text:

```text
Private healthcare discovery for Addis Ababa
```

Remove the paragraph under the bold hero heading:

```text
Search reviewed healthcare providers and clear service information from one calm, mobile-first starting point.
```

After the hero heading, go directly to the search card.

## Home Page Placeholder Removal

Remove placeholder-only homepage blocks including:

- Location Preview
- Addis Ababa, Ethiopia preview card
- Change button
- Helpful Filters
- Verified only
- Open now
- Accepting calls
- Near me
- Popular Searches
- Cardiologist in Addis Ababa
- Pediatric clinic near Bole
- Open pharmacy
- Diagnostic laboratory
- Dentist accepting calls
- Start with the care category you need
- Quick paths keep the homepage focused on healthcare discovery
- Doctors guidance card
- Hospitals guidance card
- Clinics guidance card
- Pharmacies guidance card
- Laboratories guidance card
- Any trust note, verification note, process preview, or long explanation section on the home page

The mobile homepage should contain only Tiru brand, short hero message, real search, main category navigation, real facility/provider entry points if backed by real data, and clean bottom navigation.

## Search Category Requirements

Under “Search by category,” use this order:

1. All
2. General Hospitals
3. Specialty Centers
4. Clinics
5. Doctors
6. Diagnostics
7. Pharmacies

Do not show separate “Laboratories” and “Diagnostic centers” as competing categories.

Use one user-facing category:

```text
Diagnostics
```

Diagnostics should include lab, laboratory, imaging, radiology, diagnostic center, and similar entries.

Only one Diagnostics chip should be active.

Avoid long chip labels on mobile.

Use “Diagnostics” as the chip label and handle its meaning internally.

## Nearby Page Requirements

Replace fake Nearby content with real Sub-city / Area browsing.

Remove fake nearby content such as:

- Explore healthcare options by area
- Area-based cards help people compare nearby care options without requesting location access
- Bole Family Clinic
- Kazanchis Pharmacy
- Arat Kilo Lab
- Open
- Closes soon

For MVP, Nearby should behave as:

```text
Browse by Sub-city / Area
```

Use area/sub-city values from real facility data already provided in the project.

Expected flow:

1. User taps Nearby.
2. User sees real area/sub-city options extracted from real facility profiles.
3. User selects an area.
4. App shows real facilities in that area.

Do not require live geolocation for MVP.

Do not invent area data.

If no area data is available, show a clean empty state.

## Contact Action Requirements

Fix all contact actions to be directly actionable.

“Call provider” must use real phone data.

Use `tel:` links.

If a phone field contains multiple phone numbers separated by `/`, comma, semicolon, or line breaks, split them into separate tap-to-call actions.

Example:

```text
7477 / 0902925592
```

should become:

```text
Call 7477
Call 0902925592
```

“Open map” must use the real Google Maps/location URL already provided in facility data.

Website, Telegram, WhatsApp, Google Maps, and Email must be clickable.

Use clean labels instead of inactive raw URLs:

- Open website
- Open Telegram
- Open WhatsApp
- Open Google Maps
- Send email
- Call [number]

Use `tel:` for phone, `mailto:` for email, and `target="_blank"` plus `rel="noopener noreferrer"` for external links where appropriate.

If a value is missing, hide that action or show a minimal unavailable state.

Do not show broken buttons.

Do not show inactive raw URLs as the main action.

## Public Contact Channels

On public contact channel cards, do not only show raw text.

Make the content directly actionable.

For phone, split numbers and provide tap-to-call buttons.

For website, Telegram, WhatsApp, Google Maps, and Email, make them clickable.

Avoid long raw URLs taking space on mobile.

## Request Addition and Correction Flow

Make request/addition and correction actions direct.

“Request diagnostics addition” should lead directly to a simple request/addition form page, not a long explanation section.

“Request correction” from any page should lead directly to the correction detail fill-out page.

Remove long explanatory sections that force users to scroll before taking action.

Keep only short helper text explaining how request preview works, how correction preview works, and what happens after submission.

Then show the form and submit action clearly.

## Move Explanation Content to Separate Info Page

Move listing request explanations, verification process previews, trust notes, and “who can request a listing” content away from homepage and public listing pages.

If needed, place such content on `/about` or `/how-it-works`.

The homepage should stay clean and visitor-focused.

Remove from home/public listing pages:

- Who can request a listing
- Doctors explanation card
- Facilities explanation card
- Pharmacies explanation card
- Laboratories explanation card
- Verification process preview
- Submit request explanation
- Review details explanation
- Display trust status explanation
- Trust note
- Verification should protect patients and providers
- Future review flow is respected
- Provider information review

## Diagnostics Page Cleanup

Remove all diagnostics placeholder, fictional, preview, and test content from public mobile pages.

Remove examples such as:

- Test Diagnostic Alpha Laboratory
- fictional public laboratory discovery row
- active/public read testing text
- Walk-in preview
- Appointment preview
- Same-day preview
- Listing confirmation date available
- Blood test information
- Urine test information
- Health screening information
- Specimen collection information
- Imaging service information
- X-ray information
- Ultrasound information
- Imaging consultation
- Radiology center information
- Diagnostics trust note
- Diagnostic information needs careful trust cues
- Diagnostics information review
- Verification is visible before action
- Provider information review

Diagnostics should show only real providers from real data.

If no real diagnostic data is available, show a clean empty state instead of placeholders.

## Doctors, Pharmacies, and Demo Data Cleanup

Remove all fake/demo doctor, pharmacy, and nearby placeholder data from public pages.

Do not show placeholder doctors like:

- Dr. Hana Bekele
- Dr. Samuel Tesfaye

Remove doctor cards with:

- Booking preview
- Telemedicine planned
- Pending demo doctor cards

Doctors page should show only real doctors provided by the project owner.

If no real doctors are available yet, show:

```text
Doctor profiles will be added soon.
```

Remove fake pharmacy placeholders.

Pharmacy page should show only real pharmacy data provided by the project owner.

If no real pharmacy data is available yet, show:

```text
Pharmacy listings will be added soon.
```

Remove fake nearby cards unless they are backed by real data.

## Global No-Placeholder Rule

Apply this globally across the public mobile app.

Do not show fake listings, fictional listings, preview-only listings, demo cards, placeholder trust explanations, placeholder verification explanations, placeholder tags, fake open/closed status, fake booking status, fake telemedicine status, fake popular searches, fake nearby cards, or fake provider cards.

Show only real information already provided by the project owner.

If data is missing, hide the section or show a minimal clean empty state.

## Data Safety

Do not modify real facility source data unless absolutely necessary.

Do not modify:

```text
docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json
src/data/real-facility-profiles.ts
```

You may read from these files to derive real categories, area/sub-city values, and contact links.

Do not import data to Supabase.

Do not create SQL insert scripts.

Do not modify Supabase SQL, RLS, schema, migrations, or seed/import scripts.

Do not modify `package.json` or `package-lock.json` unless absolutely necessary.

This task should not need new packages.

## Routes to Review

Review and adjust the public mobile experience for:

- `/`
- `/search`
- `/nearby`
- `/facilities`
- `/facilities/[slug]`
- `/diagnostics`
- `/diagnostics/[slug]`
- `/doctors`
- `/pharmacies`
- `/register`
- `/corrections`
- `/contact`

Do not break existing routing.

## Validation

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

If `npm.cmd` is not available in Codex shell, run equivalent available validation and clearly report that.

## Manual QA Checklist

After implementation, the following should be true:

- Mobile header says Tiru, not DigitalDirectory-v2.
- Header uses simple text branding, not the graphic logo.
- Header has clear search and add/register actions instead of S and R.
- Home hero uses the new copy.
- Home page has no fake location preview, helpful filters, popular searches, or guidance cards.
- Categories are ordered correctly.
- Laboratories and Diagnostic centers are merged under Diagnostics.
- Nearby uses real Sub-city / Area browsing or a clean empty state.
- Call provider works using real phone data.
- Multiple phone numbers are split into separate call actions.
- Website, Telegram, WhatsApp, Email, and Maps links are clickable.
- Diagnostics fake/test content is removed.
- Fake doctors are removed.
- Fake pharmacies are removed.
- Fake nearby cards are removed.
- Long explanation sections are moved away or removed from public MVP pages.
- User-facing DigitalDirectory-v2 text is replaced with Tiru.
- Light/dark behavior does not break mobile layout.
- Real facility data still appears.
- No Supabase/schema/migration/data import files are touched.

## Final Report Required

After implementation, report:

- files created
- files modified
- placeholder/demo sections removed
- real-data sections preserved
- header/brand changes
- category changes
- nearby changes
- contact action changes
- request/correction changes
- validation results
- remaining issues, if any

Do not proceed beyond this MVP cleanup sprint.
Do not proceed to Phase 2.
Do not create Task 200.
