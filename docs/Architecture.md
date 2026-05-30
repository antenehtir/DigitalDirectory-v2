# DigitalDirectory-v2 Architecture

## Product Type

DigitalDirectory-v2 is a healthcare discovery and verification platform focused on helping patients and doctors find trusted healthcare services in Ethiopia.

---

## Core UX Principle

The platform must be:

1. Search-first
2. Mobile-first
3. Trust-first
4. Fast and simple
5. Easy for patients and doctors to use

---

## Primary User Journeys

### Patient Journey

1. User opens the platform
2. User searches for a doctor, facility, specialty, pharmacy, or service
3. User filters by location, availability, verification status, or category
4. User reviews trusted results
5. User takes action:

   * Call
   * View details
   * Get directions
   * Request service
   * Book or register interest in future versions

---

### Doctor Journey

1. Doctor visits the platform
2. Doctor searches or browses existing listings
3. Doctor requests to add or verify profile
4. Platform reviews submission
5. Verified badge is displayed after approval

---

### Facility Journey

1. Facility submits registration request
2. Admin reviews details
3. Facility is verified if documents and identity are confirmed
4. Facility appears with verified badge
5. Facility can later update information through request flow

---

## Main Pages

### Homepage

Purpose:
Introduce the platform and drive users immediately into search.

Sections:

1. Hero search section
2. Quick category buttons
3. Nearby healthcare section
4. Verified facilities section
5. Popular specialties
6. Pharmacy discovery
7. Doctor discovery
8. Facility registration CTA
9. Trust explanation section

---

### Search Results Page

Purpose:
Show relevant healthcare results quickly and clearly.

Features:

* Search input
* Category filters
* Location filter
* Open-now filter
* Verified-only filter
* Facility cards
* Doctor cards
* Empty state suggestions

---

### Facility Detail Page

Purpose:
Help users decide whether to trust and contact a facility.

Content:

* Facility name
* Verification badge
* Category
* Location
* Phone number
* Working hours
* Services
* Doctors available
* Photos or logo
* Directions
* Report correction button

---

### Doctor Detail Page

Purpose:
Help patients understand and contact verified doctors.

Content:

* Doctor name
* Specialty
* Verification status
* Facility affiliation
* Availability
* Contact or booking CTA
* Telemedicine availability in future

---

### Registration Page

Purpose:
Allow doctors and facilities to request listing or verification.

Sections:

* Register as doctor
* Register as facility
* Request correction
* Submit documents in future version

---

## Main Components

### Header

Desktop:

* Logo
* Search
* Navigation
* Register CTA

Mobile:

* Logo
* Search icon
* Menu button

---

### Mobile Bottom Navigation

Items:

1. Home
2. Search
3. Nearby
4. Register
5. Menu

---

### Search Bar

Must support:

* Facility name search
* Specialty search
* Service search
* Pharmacy search
* Location search

Future:

* Symptom-based search
* Amharic search
* AI-assisted search

---

### Facility Card

Must show:

* Name
* Category
* Verification badge
* Location
* Open/closed status
* Phone CTA
* Direction CTA
* View details CTA

---

### Doctor Card

Must show:

* Name
* Specialty
* Verification badge
* Facility affiliation
* Availability
* View profile CTA

---

### Verification Badge

Badge types:

* Verified Facility
* Verified Doctor
* Pending Verification
* Community Submitted

Verified badge must be visually clear and consistent.

---

## Data Models

### Facility

Fields:

* id
* name
* slug
* category
* subcategory
* services
* location
* address
* phone
* email
* website
* workingHours
* verificationStatus
* latitude
* longitude
* doctors
* images

---

### Doctor

Fields:

* id
* name
* specialty
* facility
* location
* phone
* availability
* verificationStatus
* telemedicineAvailable
* profileImage

---

### Category

Fields:

* id
* name
* slug
* description
* icon
* subcategories

---

### Registration Request

Fields:

* id
* requesterType
* name
* phone
* email
* facilityName
* specialty
* documents
* status
* submittedAt

---

## Technical Architecture

Recommended stack:

* Next.js
* TypeScript
* TailwindCSS
* shadcn/ui
* Supabase in future phase

---

## Folder Structure

```text
DigitalDirectory-v2/
├── docs/
│   ├── ProductVision.md
│   └── Architecture.md
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   ├── search/
│   │   ├── cards/
│   │   ├── trust/
│   │   ├── navigation/
│   │   └── ui/
│   ├── data/
│   ├── lib/
│   ├── types/
│   └── styles/
└── README.md
```

---

## Development Priority

### Phase 1

* Project setup
* Design system
* Homepage
* Search UI
* Facility cards

### Phase 2

* Facility detail page
* Doctor detail page
* Mobile navigation
* Registration page

### Phase 3

* Verification workflow
* Supabase integration
* Admin review system

### Phase 4

* Nearby search
* Maps
* Booking
* AI search assistant

---

## Non-Negotiables

1. Do not overload homepage.
2. Do not mix too many design styles.
3. Do not build secondary features before search works well.
4. Do not prioritize desktop over mobile.
5. Do not allow unverified healthcare information to look the same as verified information.

---

## Target Experience

The user should feel:

"I can quickly find trusted healthcare services near me."
