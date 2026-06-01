"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

type BookingTypeId = "doctor" | "facility" | "diagnostics" | "telemedicine";

type PreviewItem = {
  title: string;
  description: string;
  status: string;
};

type BookingType = {
  id: BookingTypeId;
  label: string;
  provider: string;
  title: string;
  description: string;
  requestItems: PreviewItem[];
  details: PreviewItem[];
};

const bookingTypes: BookingType[] = [
  {
    id: "doctor",
    label: "Doctor appointment",
    provider: "Dr. Hana Bekele",
    title: "Doctor appointment request preview",
    description:
      "A future doctor appointment request would need patient contact, provider confirmation, consent, and privacy-safe notifications before it becomes a confirmed booking.",
    requestItems: [
      {
        title: "Preferred date and time window",
        description: "Patients could suggest a date and broad time window instead of claiming a confirmed slot.",
        status: "Preview only",
      },
      {
        title: "Provider confirmation",
        description: "The doctor or facility would need to confirm, decline, or offer another time.",
        status: "Required later",
      },
      {
        title: "Privacy-safe reason category",
        description: "Any reason category should remain minimal and should not become a public record.",
        status: "Consent needed",
      },
    ],
    details: [
      {
        title: "Patient request submitted",
        description: "A future request starts as pending until the provider responds.",
        status: "Future-only",
      },
      {
        title: "Time offered",
        description: "Provider may offer a time, but it is not confirmed until the patient accepts.",
        status: "Future-only",
      },
    ],
  },
  {
    id: "facility",
    label: "Facility or service",
    provider: "Addis Health Center",
    title: "Facility and service request preview",
    description:
      "A future facility/service request could help patients ask for care from a department or service without selecting a specific doctor.",
    requestItems: [
      {
        title: "Service selection",
        description: "Patients could choose a reviewed public service such as pediatrics, vaccination, or general consultation.",
        status: "Preview only",
      },
      {
        title: "Facility review",
        description: "Facility staff would need scoped access before reviewing appointment requests.",
        status: "Future-only",
      },
      {
        title: "No emergency promise",
        description: "Ordinary booking requests should not replace emergency care or urgent triage.",
        status: "Safety note",
      },
    ],
    details: [
      {
        title: "Department request",
        description: "Future department requests would need facility-managed scheduling rules.",
        status: "Future-only",
      },
      {
        title: "Alternate provider offer",
        description: "A facility may later route a request to an available provider after review.",
        status: "Future-only",
      },
    ],
  },
  {
    id: "diagnostics",
    label: "Diagnostics booking",
    provider: "Kazanchis Diagnostics",
    title: "Diagnostics booking request preview",
    description:
      "A future diagnostics booking request would need service availability, patient privacy, result workflow planning, and provider confirmation.",
    requestItems: [
      {
        title: "Lab or imaging service",
        description: "Patients could request a public service category, not upload or send results here.",
        status: "Preview only",
      },
      {
        title: "Provider confirmation",
        description: "Diagnostics providers would confirm availability before any appointment is treated as booked.",
        status: "Required later",
      },
      {
        title: "Result privacy",
        description: "Result-ready notices and documents belong to a later secure document workflow.",
        status: "Future-only",
      },
    ],
    details: [
      {
        title: "Sample collection request",
        description: "Future requests would need timing, location, and service availability rules.",
        status: "Future-only",
      },
      {
        title: "Imaging appointment request",
        description: "Future imaging appointments would need confirmation and patient-safe reminders.",
        status: "Future-only",
      },
    ],
  },
  {
    id: "telemedicine",
    label: "Telemedicine",
    provider: "Remote consultation preview",
    title: "Telemedicine request preview",
    description:
      "A future telemedicine request would need verified identity, consent, secure session links, provider readiness, and privacy-safe communication.",
    requestItems: [
      {
        title: "Remote consultation request",
        description: "Patients could request a remote consultation only after telemedicine policy and scheduling exist.",
        status: "Future-only",
      },
      {
        title: "Consent confirmation",
        description: "Telemedicine terms, privacy, and patient consent would be required before joining.",
        status: "Required later",
      },
      {
        title: "Secure session link",
        description: "Session links should never be public and should not be exposed through preview pages.",
        status: "Future-only",
      },
    ],
    details: [
      {
        title: "Session ready",
        description: "Future notices should use privacy-safe wording and secure access.",
        status: "Future-only",
      },
      {
        title: "Follow-up document",
        description: "Any follow-up record would belong to a secure document vault later.",
        status: "Future-only",
      },
    ],
  },
];

const statusSteps: PreviewItem[] = [
  {
    title: "Requested",
    description: "Patient sends a request, but no appointment is confirmed yet.",
    status: "Future status",
  },
  {
    title: "Pending provider review",
    description: "Provider reviews availability and decides whether to confirm, decline, or ask for more information.",
    status: "Future status",
  },
  {
    title: "Confirmed",
    description: "A booking becomes confirmed only after provider approval and patient-facing confirmation rules.",
    status: "Future status",
  },
];

const rescheduleItems: PreviewItem[] = [
  {
    title: "Reschedule request",
    description: "Either side may ask to change the time, but the new time should not be final until accepted.",
    status: "Future-only",
  },
  {
    title: "Cancellation",
    description: "Cancellation should update the status, stop reminders, and preserve an audit trail later.",
    status: "Future-only",
  },
];

const privacyNotes = [
  "This preview creates no booking, appointment, payment, notification, or provider message.",
  "Future booking should collect only the minimum patient information needed for the request.",
  "Appointment reasons, notes, documents, and contact details should stay private and role-scoped.",
  "Public browsing and provider discovery should remain available without login.",
];

function PreviewBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {children}
    </span>
  );
}

function PreviewCard({ item }: { item: PreviewItem }) {
  return (
    <article className="rounded-md border border-border bg-background p-4">
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
          <PreviewCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}

function BookingTypeSelector({
  activeId,
  onSelect,
}: {
  activeId: BookingTypeId;
  onSelect: (id: BookingTypeId) => void;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Booking type selector
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Preview a future request type.
          </h2>
        </div>
        <p className="text-sm leading-6 text-muted-foreground sm:max-w-xs">
          Switching types changes static mock content only.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bookingTypes.map((booking) => {
          const isActive = booking.id === activeId;

          return (
            <button
              className={`min-h-24 rounded-md border p-4 text-left shadow-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary hover:bg-muted"
              }`}
              key={booking.id}
              onClick={() => onSelect(booking.id)}
              type="button"
            >
              <span className="block text-base font-semibold leading-snug">
                {booking.label}
              </span>
              <span
                className={`mt-2 block text-sm leading-5 ${
                  isActive ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {booking.provider}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BookingOverview({ booking }: { booking: BookingType }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <PreviewBadge>Booking request preview</PreviewBadge>
          <p className="mt-4 text-sm font-semibold uppercase tracking-normal text-secondary">
            {booking.provider}
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {booking.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {booking.description}
          </p>
        </div>

        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            No real booking is created
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This page uses local static mock data only. It does not send a
            provider message, reserve a time, collect payment, upload documents,
            or send notifications.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProviderConfirmationRequirement() {
  return (
    <section className="rounded-lg border border-warning/25 bg-warning/10 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-foreground">
        Provider confirmation requirement
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        A request is not a confirmed appointment.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Future booking should distinguish appointment requests from confirmed
        bookings. Providers should confirm availability before patients receive
        a confirmed time, reminders, payment requests, or telemedicine links.
      </p>
    </section>
  );
}

function PrivacyConsentNotes() {
  return (
    <section className="rounded-lg border border-secondary/20 bg-secondary/10 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Privacy and consent notes
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Booking should protect patient information when it becomes real.
      </h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
        {privacyNotes.map((note) => (
          <li className="rounded-md border border-secondary/20 bg-card px-4 py-3" key={note}>
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BookingRequestPreviewPage() {
  const [activeBookingId, setActiveBookingId] =
    useState<BookingTypeId>("doctor");

  const activeBooking = useMemo(
    () =>
      bookingTypes.find((booking) => booking.id === activeBookingId) ??
      bookingTypes[0],
    [activeBookingId],
  );

  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <BookingOverview booking={activeBooking} />

        <BookingTypeSelector
          activeId={activeBooking.id}
          onSelect={setActiveBookingId}
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <PreviewList
            description="These fields show static examples of what a future request might ask for, without submitting anything."
            eyebrow="Request details preview"
            items={activeBooking.requestItems}
            title="Request details should stay minimal."
          />
          <PreviewList
            description="These are conceptual workflow states only. No status is stored or sent anywhere."
            eyebrow="Booking status explanation"
            items={statusSteps}
            title="Status should be clear before booking launches."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PreviewList
            description="These examples show how schedule changes might be handled later, after provider dashboards and notifications exist."
            eyebrow="Reschedule and cancellation preview"
            items={rescheduleItems}
            title="Changes would need confirmation and audit history."
          />
          <PreviewList
            description="These selected examples change with the booking type and stay future-only."
            eyebrow="Selected request workflow"
            items={activeBooking.details}
            title="Future workflow details are not active."
          />
        </div>

        <ProviderConfirmationRequirement />
        <PrivacyConsentNotes />
      </div>
    </PageContainer>
  );
}
