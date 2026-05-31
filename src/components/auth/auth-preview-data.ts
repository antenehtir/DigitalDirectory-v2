export const accountTypes = [
  {
    title: "Public visitor / patient",
    summary: "Browse, search, and view trusted healthcare listings without signing in.",
    status: "Always public",
  },
  {
    title: "Doctor",
    summary: "Future profile claim, verification status, and profile update access.",
    status: "Later provider access",
  },
  {
    title: "Facility",
    summary: "Future listing ownership, services, hours, and verification requests.",
    status: "Later provider access",
  },
  {
    title: "Pharmacy",
    summary: "Future pharmacy profile, pickup readiness, and verification requests.",
    status: "Later provider access",
  },
  {
    title: "Diagnostics provider",
    summary: "Future laboratory or imaging profile updates and verification requests.",
    status: "Later provider access",
  },
  {
    title: "Admin / reviewer",
    summary: "Future protected review queues, verification decisions, and audit trails.",
    status: "Internal only later",
  },
];

export const providerAccessItems = [
  "Claim or request a listing",
  "Track verification status",
  "Submit reviewed listing updates",
  "Respond to reviewer requests",
];

export const adminAccessItems = [
  "Review provider submissions",
  "Resolve corrections and duplicates",
  "Manage verification decisions",
  "Keep audit history for trust-critical changes",
];
