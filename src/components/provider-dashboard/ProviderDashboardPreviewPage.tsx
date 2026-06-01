"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

type ProviderPersonaId = "facility" | "doctor" | "pharmacy" | "diagnostics";

type StatusItem = {
  label: string;
  value: string;
  tone: "primary" | "secondary" | "warning" | "muted";
};

type PreviewItem = {
  title: string;
  description: string;
  status: string;
};

type ProviderPersona = {
  id: ProviderPersonaId;
  label: string;
  role: string;
  providerName: string;
  description: string;
  statusItems: StatusItem[];
  updateRequests: PreviewItem[];
  bookingRequests: PreviewItem[];
  reviewNotes: string[];
};

const providerPersonas: ProviderPersona[] = [
  {
    id: "facility",
    label: "Facility manager",
    role: "Facility manager preview",
    providerName: "Addis Health Center",
    description:
      "A future facility manager could request reviewed updates for services, hours, contact details, departments, and doctor affiliations.",
    statusItems: [
      { label: "Listing", value: "Published preview", tone: "primary" },
      { label: "Verification", value: "Verified label preview", tone: "secondary" },
      { label: "Ownership", value: "Claim approved later", tone: "warning" },
    ],
    updateRequests: [
      {
        title: "Working hours update",
        description: "Request a reviewed change to weekday and weekend opening hours.",
        status: "Draft request preview",
      },
      {
        title: "Services correction",
        description: "Suggest that maternal care and vaccination services need review.",
        status: "Would enter review queue",
      },
      {
        title: "Doctor affiliation",
        description: "Request a reviewed affiliation for a doctor practicing at the facility.",
        status: "Future verification step",
      },
    ],
    bookingRequests: [
      {
        title: "General consultation request",
        description: "A future appointment request would need provider confirmation before it becomes a booking.",
        status: "Future-only",
      },
      {
        title: "Department request",
        description: "Facility-managed department requests would need staff roles, scheduling, and audit logs.",
        status: "Future-only",
      },
    ],
    reviewNotes: [
      "Facility managers should submit changes for review instead of publishing directly.",
      "Location, phone, emergency, and 24-hour claims should be treated as high-impact updates.",
      "This preview does not create a facility account or change any listing data.",
    ],
  },
  {
    id: "doctor",
    label: "Doctor profile owner",
    role: "Doctor profile owner preview",
    providerName: "Dr. Hana Bekele",
    description:
      "A future doctor owner could request profile updates, reviewed facility affiliations, availability previews, and telemedicine readiness notes.",
    statusItems: [
      { label: "Listing", value: "Published profile preview", tone: "primary" },
      { label: "Verification", value: "Needs renewal later", tone: "warning" },
      { label: "Ownership", value: "Doctor claim pending", tone: "muted" },
    ],
    updateRequests: [
      {
        title: "Profile summary update",
        description: "Request a reviewed change to public bio, specialty notes, or spoken languages.",
        status: "Draft request preview",
      },
      {
        title: "Facility affiliation",
        description: "Ask reviewers to verify an affiliation before it appears publicly.",
        status: "Would enter verification",
      },
      {
        title: "Availability preview",
        description: "Submit preview availability text without creating live booking slots.",
        status: "Review required later",
      },
    ],
    bookingRequests: [
      {
        title: "Patient appointment request",
        description: "A future request would need doctor confirmation, patient consent, and notification rules.",
        status: "Future-only",
      },
      {
        title: "Telemedicine request",
        description: "Remote consultation workflow would need consent, privacy, scheduling, and safe links.",
        status: "Future-only",
      },
    ],
    reviewNotes: [
      "Doctor profile ownership should not automatically verify the doctor.",
      "Facility affiliations should be reviewed from both doctor and facility perspectives.",
      "This preview does not create booking, telemedicine, or profile management functionality.",
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy owner",
    role: "Pharmacy owner preview",
    providerName: "Bole Community Pharmacy",
    description:
      "A future pharmacy owner could request reviewed public listing updates while inventory, prescriptions, payments, and delivery remain separate future workflows.",
    statusItems: [
      { label: "Listing", value: "Published preview", tone: "primary" },
      { label: "Verification", value: "Pending review", tone: "warning" },
      { label: "Ownership", value: "Unclaimed preview", tone: "muted" },
    ],
    updateRequests: [
      {
        title: "Pickup preview note",
        description: "Request a reviewed public note about prescription pickup readiness.",
        status: "Draft request preview",
      },
      {
        title: "Public contact correction",
        description: "Suggest a reviewed change to the pharmacy phone number or public hours.",
        status: "High-impact review",
      },
      {
        title: "Service category update",
        description: "Request public category labels such as refill support or over-the-counter guidance.",
        status: "Would enter review queue",
      },
    ],
    bookingRequests: [
      {
        title: "Prescription pickup request",
        description: "Future pickup workflow would require patient identity, consent, and pharmacy operations.",
        status: "Future-only",
      },
      {
        title: "Delivery request",
        description: "Delivery would need address privacy, payment, fulfillment, and support planning.",
        status: "Future-only",
      },
    ],
    reviewNotes: [
      "Pharmacy listings should not show medicine inventory until real inventory workflows exist.",
      "Prescription upload, payment, and delivery should remain out of scope for this preview.",
      "This preview does not create pharmacy ordering or provider account functionality.",
    ],
  },
  {
    id: "diagnostics",
    label: "Diagnostics provider owner",
    role: "Diagnostics provider owner preview",
    providerName: "Kazanchis Diagnostics",
    description:
      "A future diagnostics provider owner could request reviewed listing updates for public lab and imaging services without adding test orders or result delivery.",
    statusItems: [
      { label: "Listing", value: "Draft preview", tone: "muted" },
      { label: "Verification", value: "Community submitted", tone: "warning" },
      { label: "Ownership", value: "Claim needed later", tone: "muted" },
    ],
    updateRequests: [
      {
        title: "Laboratory service update",
        description: "Request reviewed public service labels for sample collection and basic lab testing.",
        status: "Would enter review queue",
      },
      {
        title: "Imaging service correction",
        description: "Suggest a reviewed update to ultrasound or X-ray service preview copy.",
        status: "Draft request preview",
      },
      {
        title: "Result delivery note",
        description: "Preview future wording without sending, storing, or exposing patient results.",
        status: "Future-only review",
      },
    ],
    bookingRequests: [
      {
        title: "Lab appointment request",
        description: "Future diagnostics appointments would require scheduling, privacy, and result workflow planning.",
        status: "Future-only",
      },
      {
        title: "Imaging appointment request",
        description: "Future imaging requests would need booking, confirmation, and patient-safe notifications.",
        status: "Future-only",
      },
    ],
    reviewNotes: [
      "Diagnostics listings should not expose lab results, test orders, or patient documents.",
      "Pricing, payment, booking, and result-ready workflows should wait for later phases.",
      "This preview does not create diagnostics ordering or result delivery functionality.",
    ],
  },
];

function statusClassName(tone: StatusItem["tone"]) {
  const tones = {
    primary: "border-primary/20 bg-primary/10 text-primary",
    secondary: "border-secondary/25 bg-secondary/10 text-secondary",
    warning: "border-warning/25 bg-warning/10 text-foreground",
    muted: "border-border bg-muted text-muted-foreground",
  };

  return tones[tone];
}

function PreviewBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {children}
    </span>
  );
}

function StatusGrid({ items }: { items: StatusItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          className={`min-h-24 rounded-md border p-4 ${statusClassName(item.tone)}`}
          key={item.label}
        >
          <p className="text-xs font-semibold uppercase tracking-normal">
            {item.label}
          </p>
          <p className="mt-2 text-base font-semibold leading-snug">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewList({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: PreviewItem[];
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <article
            className="rounded-md border border-border bg-background p-4"
            key={item.title}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-base font-semibold leading-snug text-foreground">
                {item.title}
              </h3>
              <span className="inline-flex w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PersonaSelector({
  activeId,
  onSelect,
}: {
  activeId: ProviderPersonaId;
  onSelect: (id: ProviderPersonaId) => void;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Provider persona selector
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Preview a future provider role.
          </h2>
        </div>
        <p className="text-sm leading-6 text-muted-foreground sm:max-w-xs">
          Switching personas changes mock preview content only.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {providerPersonas.map((persona) => {
          const isActive = persona.id === activeId;

          return (
            <button
              className={`min-h-24 rounded-md border p-4 text-left shadow-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary hover:bg-muted"
              }`}
              key={persona.id}
              onClick={() => onSelect(persona.id)}
              type="button"
            >
              <span className="block text-base font-semibold leading-snug">
                {persona.label}
              </span>
              <span
                className={`mt-2 block text-sm leading-5 ${
                  isActive ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {persona.providerName}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ProviderOverview({ persona }: { persona: ProviderPersona }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <PreviewBadge>Preview only</PreviewBadge>
          <p className="mt-4 text-sm font-semibold uppercase tracking-normal text-secondary">
            {persona.role}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
            {persona.providerName}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {persona.description}
          </p>
        </div>

        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            No real provider data is changed
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This page uses local static mock data only. It does not sign in,
            write data, create requests, manage listings, or connect to a
            backend.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <StatusGrid items={persona.statusItems} />
      </div>
    </section>
  );
}

function ReviewNotes({ notes }: { notes: string[] }) {
  return (
    <section className="rounded-lg border border-secondary/20 bg-secondary/10 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Trust and review guardrails
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Provider dashboards should be reviewed, scoped, and auditable later.
      </h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
        {notes.map((note) => (
          <li className="rounded-md border border-secondary/20 bg-card px-4 py-3" key={note}>
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProviderDashboardPreviewPage() {
  const [activePersonaId, setActivePersonaId] =
    useState<ProviderPersonaId>("facility");

  const activePersona = useMemo(
    () =>
      providerPersonas.find((persona) => persona.id === activePersonaId) ??
      providerPersonas[0],
    [activePersonaId],
  );

  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <header className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="max-w-3xl">
            <PreviewBadge>Provider dashboard preview</PreviewBadge>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Preview future provider dashboard workflows.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Facility managers, doctor profile owners, pharmacy owners, and
              diagnostics providers may later use reviewed dashboard workflows.
              This page is static and preview-only.
            </p>
          </div>
        </header>

        <PersonaSelector
          activeId={activePersona.id}
          onSelect={setActivePersonaId}
        />

        <ProviderOverview persona={activePersona} />

        <div className="grid gap-6 lg:grid-cols-2">
          <PreviewList
            description="These are static examples of future requests that would need review before changing public listings."
            eyebrow="Update and correction request preview"
            items={activePersona.updateRequests}
            title="Reviewed listing updates can come later."
          />
          <PreviewList
            description="These examples are intentionally marked future-only. They do not create appointments, booking queues, notifications, payments, or provider tasks."
            eyebrow="Booking request preview"
            items={activePersona.bookingRequests}
            title="Booking workflows are not active."
          />
        </div>

        <ReviewNotes notes={activePersona.reviewNotes} />
      </div>
    </PageContainer>
  );
}
