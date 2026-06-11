# Codex Task 173: Public-Facing Placeholder Copy Cleanup Planning

## Project

DigitalDirectory-v2

## Goal

Create a focused planning record for cleaning public-facing placeholder, demo, sample, preview-only, fallback, and trust-reducing copy before MVP review.

This task follows:

- `docs/CodexTask-170-PlaceholderAndTestDataCleanupPlanning.md`
- `docs/CodexTask-171-PlaceholderAndTestDataInventory.md`
- `docs/CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md`

This is a documentation-only planning task. No source code, UI copy, static data, test data, Supabase SQL, RLS, schema, migrations, routes, probe scripts, package scripts, or real provider data were modified for this task.

---

## Planning Status

```text
Public-facing placeholder copy cleanup planning complete.
```

This record plans a future cleanup only. It does not approve data deletion, real data import, route changes, SQL changes, or public UI implementation changes by itself.

---

## Context Reviewed

Required planning context:

- `docs/CodexTask-171-PlaceholderAndTestDataInventory.md`
- `docs/CodexTask-172-PlaceholderAndTestDataClassificationDecisions.md`
- `docs/CodexTask-173-PublicFacingPlaceholderCopyCleanupPlanning.md`
- `src/components/layout/Footer.tsx`
- `src/components/home`
- `src/components/search-results`
- `src/app`
- `src/components`

Task 171 and Task 172 identified the most important public trust risks:

- public footer links to preview-only routes
- homepage sample/preview wording
- search result mock/frontend-only wording
- public category pages that describe sample, static, or preview-only experiences
- provider cards and detail action panels with preview-only language
- form/workflow pages that say nothing is submitted or sent
- fallback/static provider content that can look like real provider data
- internal QA/probe/test wording that should remain internal only

---

## Public-Facing Copy Cleanup Goal

The cleanup goal is to make public MVP surfaces read like a trustworthy healthcare directory rather than a prototype or internal QA environment.

Future implementation should:

- remove visible words such as sample, demo, mock, placeholder, preview, fallback, seed, static data, probe, and test from public-facing UI where they describe unfinished or artificial content
- hide links or panels for workflows that are not ready for public users
- rewrite safe empty states in clear user language, without technical implementation details
- keep internal QA fixtures, docs, probes, and test slugs available for engineering until approved replacement QA data exists
- avoid implying real booking, live inventory, real-time availability, verified provider identity, payment, uploads, or result delivery unless those workflows are implemented and approved

---

## Terms To Search And Review

Use these terms during the future implementation task:

```text
test
demo
sample
fictional
placeholder
preview
mock
static
fallback
coming soon
not listed yet
example
dummy
seed
frontend-only
static data
sample data
preview-only
Supabase
RLS
runtime
probe
safe error
query failed
```

Search results should be classified as:

- public UI copy to rewrite
- public UI copy or navigation to hide
- safe public empty-state copy to polish
- internal QA-only content to keep
- data replacement work that belongs outside this copy-only cleanup
- product decision needed before implementation

---

## Public Trust Risk Levels

Use these levels for copy cleanup triage:

| Risk level | Meaning | Typical action |
| --- | --- | --- |
| High | Prominent public copy can make the product look fake, unfinished, misleading, or internally exposed. | Rewrite or hide before MVP review. |
| Medium | Public copy is less prominent or appears in incomplete-data states, but can still create confusion. | Rewrite when route remains public; otherwise product decision. |
| Low | Public wording is safe but could be polished for consistency. | Review manually if it appears in visible UI. |
| Internal only | Docs, probes, scripts, SQL drafts, QA records, and internal routes that are not public navigation. | Keep for QA unless separately approved for cleanup. |
| Unknown | Visibility or impact is unclear from static inspection. | Verify manually in browser during implementation planning. |

---

## High-Priority Copy Cleanup Table

| Area/File | Copy issue or search term | Risk level | Recommended action | Suggested production-safe direction | Notes |
| --- | --- | --- | --- | --- | --- |
| `src/components/layout/Footer.tsx` | `Account preview`, `Patient preview`, `Booking preview`, `Admin preview`, `Provider dashboard preview` | High | Hide from public UI | Remove or hide preview-route links from public footer until those workflows are production-ready. | Footer links make unfinished routes easily discoverable. Do not change routes in Task 173. |
| `src/components/layout/Footer.tsx` | Community links use `href="#"` for Telegram, LinkedIn, Facebook, Instagram, TikTok, Email updates, WhatsApp | Medium | Needs product decision | Use approved official links, hide the community section, or show non-clickable contact guidance after approval. | Placeholder links can appear official and frustrate users. |
| `src/components/home/*` | `Sample facility cards`, `Sample verified result`, `View sample facilities`, `sample specialist profiles`, `Location-based sample listings`, `preview nearby healthcare` | High | Rewrite | Use discovery-focused language such as verified healthcare providers, provider listings, search by care type, and location-aware discovery only where supported. | Homepage is a first trust surface and should not describe itself as sample or preview. |
| `src/components/search-results/*` | `frontend-only`, `mock data`, `sample results`, `No mock providers matched` | High | Rewrite | Use normal search language: matching providers, no providers matched your filters, try a different search, or provider information is being verified. | Search is a core public journey; avoid exposing implementation state. |
| `src/components/facilities/*` | `Facilities directory preview`, `Explore sample clinics`, `Preview only. No real search`, `Sample facility cards` | High | Rewrite | Present facility discovery as a real directory when backed by approved data; otherwise hide unsupported search claims. | Do not replace provider data in this task. |
| `src/components/doctors/*` | `Doctors directory preview`, `Browse sample doctor profiles`, `Availability is shown as sample schedule text`, `Telemedicine is preview-only` | High | Rewrite or hide from public UI | Use doctor discovery wording only for approved public fields; hide booking, schedule, and telemedicine claims if workflows are not live. | Doctor identity and availability are sensitive trust surfaces. |
| `src/components/facility-detail/*` | `Contact previews`, `future actions only`, `Save preview`, `Sample facilities use...`, sample data notes | High | Needs product decision | Convert panels to verified contact information, neutral unavailable states, or hide inactive action controls. | Shared detail UI affects facilities, pharmacies, and diagnostics. |
| `src/components/doctor-detail/*` | `Patient action previews`, `Contact preview`, `Save doctor preview`, `sample doctor data only`, telemedicine preview | High | Needs product decision | Hide booking/save/telemedicine controls until supported, or rewrite as informational contact guidance without implying booking. | Doctor detail pages should not imply unavailable patient workflows. |
| `src/components/pharmacies/*` | `Pharmacy discovery preview`, `Sample pharmacy listings`, `frontend-only sample data`, pickup/delivery/prescription preview labels | Medium | Rewrite or needs product decision | Use service information, medicine access information, pickup information, or hide delivery/prescription workflow claims until approved. | Pharmacy module may remain public, but workflow claims need careful wording. |
| `src/components/diagnostics/*` | `Diagnostics discovery preview`, `frontend-only diagnostic center previews`, `Sample diagnostics listings`, `test inventory`, `Sample collection preview` | Medium | Rewrite or needs product decision | Use diagnostics service information, laboratory services, imaging services, or hide ordering/pricing/upload/result claims until supported. | Avoid implying live test inventory, booking, uploads, payment, or result delivery. |
| `src/components/nearby/*` | `Nearby healthcare preview`, `Preview area`, `Manual area preview`, `Static chips`, `No geolocation`, nearby sample listings | Medium | Needs product decision | If nearby remains public, frame it as area-based browsing rather than live geolocation. Hide if MVP does not include nearby discovery. | Nearby implies location-aware behavior that may not be implemented. |
| `src/components/contact/*` | `Collaboration preview`, `Provider registration preview`, support previews | Medium | Rewrite | Use clear contact/support language that tells users what channel is available now. | Do not imply a form submission works unless implemented. |
| `src/components/corrections/*` and correction CTAs | `Request correction preview`, future correction path wording | Medium | Rewrite or needs product decision | If correction intake is not live, provide safe instructions such as contact support to report outdated information. | Correction flows affect data trust. |
| `src/components/feedback/*` | `Experience feedback is preview-only` | Medium | Hide from public UI or rewrite | Hide the form until submission works, or route users to a real contact channel. | Public feedback forms should not look performative. |
| `src/components/register/*` and `src/components/registration/*` | `Registration preview`, `Preview form`, `Submit preview request`, `Static fields`, `Nothing is submitted`, `Example Care Clinic`, `Frontend-only preview` | Medium | Hide from public UI or rewrite | Use real registration instructions only if intake exists; otherwise explain how providers can contact the team. | Provider onboarding copy must be operationally accurate. |
| `src/components/community/*` and `src/data/seed-community-channels.ts` | Placeholder social/community channels and preview subscription language | Medium | Needs product decision | Replace with approved official channels or hide until official channels exist. | Public social/contact links can be mistaken for official support. |
| `src/components/*` provider cards | `sample`, `preview`, `verified preview`, `sample-only`, `frontend-only` labels | High | Rewrite | Use approved verification and listing-status language only. Hide any status that is not meaningful to users. | Card wording is repeated across public listing pages. |
| `src/components/*` empty states | `Not listed yet`, `Availability not listed`, `Hours not listed`, `Contact detail not listed` | Medium | Rewrite | Use softer verified-data language such as contact details are being verified or hours will be added after verification. | Safe empty states should avoid blaming the data model. |
| `src/app/*-preview/page.tsx` | Account, patient account, booking request, admin review, and provider dashboard preview routes | Medium | Hide from public UI | Keep routes only if needed for internal demos, but remove public navigation paths until ready. | Route changes are out of scope for Task 173. |
| `src/app/facilities/addis-health-center/page.tsx` | Static sample facility detail route | High | Needs product decision | Replace through future data/route work or hide from public discovery after real data import. | This is route/data work, not a copy-only change. |
| `src/app/doctors/dr-hana-bekele/page.tsx` | Static sample doctor detail route | High | Needs product decision | Replace through future data/route work or hide from public discovery after real data import. | Avoid changing routes in Task 173 or Task 174 unless separately approved. |
| `src/app/internal/*` | `test-facility-*`, `test-doctor-*`, fallback timeout logic, probe output | Internal only | Keep internal only | Keep for QA and verify these pages are not linked from public navigation. | Internal probe content should not drive public copy cleanup. |
| `src/lib/public-listing-mappers.ts` | `Verified preview`, `sample-only`, preview contact channels, pickup/delivery/profile preview labels | Medium | Rewrite during future implementation if surfaced | Use approved verification vocabulary and service labels. Keep mapper safety behavior intact. | Central wording can propagate across many cards. |
| `src/lib/supabase/*public-read.ts` | `static-fallback`, `Static data was returned`, preview fallback labels | Medium | Keep internal only or rewrite if surfaced | Do not expose fallback/runtime/Supabase wording to users. If surfaced, show normal empty or verified-data states. | Do not modify Supabase helpers in Task 173. |
| `scripts/*probe*`, SQL drafts, QA docs | test slugs, probe fixtures, fallback checks, historical sample records | Internal only | Keep internal only | Preserve for engineering QA until replacement fixtures are approved. | Do not delete test data or modify probe scripts. |
| `docs/*` | Historical placeholder/test/sample references | Internal only | Keep internal only | Keep docs as audit trail unless docs are separately published publicly. | Historical planning docs are expected to contain these terms. |

---

## Recommended Wording Principles

Future public copy should follow these principles:

- Say what users can do now, not what the interface might do later.
- Use plain public language instead of implementation terms.
- Avoid sample, demo, mock, preview, fallback, static, seed, probe, Supabase, RLS, runtime, and safe error in visible UI.
- Do not claim verification unless the provider, contact method, or detail has actually been approved for public display.
- Do not imply booking, payment, upload, result delivery, medication inventory, telemedicine, live geolocation, or real-time availability unless implemented.
- Prefer neutral unavailable states over technical explanations.
- Use consistent empty-state wording across facilities, doctors, pharmacies, diagnostics, contact channels, and search results.
- Hide unfinished workflows when a rewrite would still mislead users.
- Keep QA-only wording in docs, scripts, internal routes, and probe outputs until replacement QA coverage exists.

---

## Suggested Replacements For Common Placeholder Phrases

| Placeholder or technical phrase | Suggested production-safe direction | Use when |
| --- | --- | --- |
| `Preview` | `Service information`, `Provider information`, or remove the label | The section is informational and does not need a state label. |
| `Sample provider` | Hide until real provider data is ready, or use approved real provider names only | Provider identity is not verified for public display. |
| `Sample results` | `Matching providers` or `Providers matching your search` | Results are backed by approved public data. |
| `No mock providers matched` | `No providers matched your search` | Search can safely show an empty state. |
| `Frontend-only sample data` | Remove from public UI | Implementation detail should not be shown. |
| `Static preview only` | Hide the unsupported control or rewrite as a neutral explanation | A feature is visible but not functional. |
| `Fallback data` | Remove from public UI; show normal cards or a safe empty state | Runtime/data-source state should stay internal. |
| `Not listed yet` | `This information is being verified.` | Data exists but the specific field is incomplete. |
| `Contact detail not listed` | `Contact details are being verified.` | Contact information is missing or pending verification. |
| `Hours not listed` | `Hours will be added after verification.` | Hours are missing and should not be guessed. |
| `Availability not listed` | `Availability details are being verified.` | Availability is not confirmed. |
| `Booking preview` | Hide booking action, or use `Contact the provider directly` only if contact details are approved | Booking workflow is not live. |
| `Submit preview request` | `Contact us about registration` or hide the form | Submission is not implemented. |
| `Coming soon` | Hide the unfinished feature, or explain only an available alternative | The feature is not part of the current public release. |
| `Example Care Clinic` | Use approved real data or remove sample-filled form values | Example names could be mistaken for real providers. |

---

## Hide-Versus-Rewrite Guidance

Hide from public UI when:

- the control initiates an unavailable workflow, such as booking, payments, uploads, provider dashboards, patient accounts, admin review, saved providers, telemedicine, or live inventory
- the route exists only for internal preview or demos
- sample/fake provider names would remain visible after copy changes
- placeholder social links have no approved destination
- wording would still need disclaimers such as preview-only, not real, mock, or nothing is submitted

Rewrite when:

- the route remains public and the content can be truthfully described as provider discovery, service information, contact guidance, or an empty state
- the issue is a technical word such as frontend-only, fallback, static, or Supabase that can be removed without changing behavior
- the field is simply missing and can use verified-data language
- search/listing/card labels are otherwise safe but still sound like a prototype

Escalate for product decision when:

- public visibility depends on MVP scope, such as nearby, registration, corrections, feedback, pharmacy workflows, diagnostics workflows, doctor booking, or telemedicine
- replacing copy could imply operational readiness that does not exist
- real provider data, legal approval, or official contact channels are required
- route, data, SQL, RLS, migration, or source-code behavior changes would be needed

---

## Internal QA-Only Content Guidance

Keep the following internal unless a later task explicitly approves replacement:

- diagnostics, facility, and doctor test slugs used by probes
- blocked/pending/hidden QA fixtures
- probe scripts and probe output wording
- internal route probe pages under `src/app/internal/*`
- historical SQL drafts, RLS plans, schema notes, QA records, and setup docs
- sample/fallback classifications in planning docs
- package scripts that run validation or probes

Internal QA content should not be surfaced through public navigation, public page copy, public cards, or user-facing error states.

---

## Validation Plan For Future Implementation

Task 174 should validate public copy cleanup without changing data, SQL, routes, probes, or package scripts unless separately authorized.

Recommended validation steps:

1. Run text searches across public UI folders for the review terms listed above.
2. Confirm remaining matches are either internal-only, docs-only, code identifiers not visible to users, or approved safe public wording.
3. Manually review the public pages most likely to be seen by MVP reviewers:
   - home
   - search/search results
   - facilities
   - doctors
   - pharmacies
   - diagnostics
   - nearby
   - contact
   - corrections
   - feedback
   - register
   - representative provider detail pages
4. Check the footer and any public navigation for links to preview-only routes.
5. Confirm empty states do not mention mock, preview, fallback, static data, Supabase, RLS, probes, runtime, or safe errors.
6. Confirm no user-facing copy implies unsupported booking, payment, upload, dashboard, authentication, result delivery, medication inventory, or telemedicine workflows.
7. Confirm internal QA/probe/test content remains unchanged and available.
8. Run `git status` and verify only approved Task 174 implementation files changed.
9. If source code is modified in Task 174, run the relevant lint/build checks for the project.

---

## Recommended Cleanup Priority

Priority 1: Public navigation and trust surfaces

- `src/components/layout/Footer.tsx`
- `src/components/home/*`
- `src/components/search-results/*`
- provider cards
- facility and doctor detail action panels

Priority 2: Category pages and workflow previews

- `src/components/facilities/*`
- `src/components/doctors/*`
- `src/components/pharmacies/*`
- `src/components/diagnostics/*`
- `src/components/nearby/*`
- `src/components/register/*`
- `src/components/contact/*`
- `src/components/corrections/*`
- `src/components/feedback/*`

Priority 3: Empty states and mapper/helper wording

- not-listed copy
- contact empty states
- availability and hours empty states
- public mapper labels that surface on cards or detail pages

Priority 4: Internal QA-only references

- `src/app/internal/*`
- `scripts/*probe*`
- SQL drafts and QA docs
- historical planning docs

---

## Recommended Next Task

Recommended next task:

```text
Task 174 - Public-Facing Placeholder Copy Cleanup Implementation
```

Task 174 should implement only the approved public-facing copy cleanup. It should not delete test data, insert real data, modify Supabase SQL, modify RLS/schema/migrations, change static provider data, change routes, modify probe scripts, modify package scripts, or perform broader data replacement unless a separate task explicitly approves that scope.

---

## Scope Confirmation

For Task 173:

- No source code was modified.
- No UI copy was modified.
- No test data was deleted.
- No Supabase SQL was modified.
- No RLS was modified.
- No schema was modified.
- No Supabase migrations were modified.
- No real data was inserted.
- No static data was changed.
- No routes were changed.
- No probe scripts were modified.
- No package scripts were modified.
- Task 174 was not created.

---

## Planning Summary

Public-facing placeholder copy cleanup should start with footer preview links, homepage copy, search results, provider cards, and provider detail action panels. Public pages should avoid prototype words and technical data-source terms. Unfinished workflows should be hidden rather than explained with preview disclaimers. Internal QA fixtures, probes, SQL drafts, and historical docs should remain available for engineering until a separate replacement QA plan exists.
