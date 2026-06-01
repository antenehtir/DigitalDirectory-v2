import { PageContainer } from "@/components/layout/PageContainer";

type PreviewItem = {
  title: string;
  description: string;
  status: string;
};

const overviewItems = [
  { label: "Account state", value: "Preview only" },
  { label: "Patient ID", value: "Concept only" },
  { label: "Data storage", value: "No real data" },
];

const savedProviders: PreviewItem[] = [
  {
    title: "Dr. Hana Bekele",
    description: "Saved doctor profile preview for future quick access.",
    status: "Static mock",
  },
  {
    title: "Addis Health Center",
    description: "Saved facility preview with no account or patient record.",
    status: "Static mock",
  },
  {
    title: "Kazanchis Diagnostics",
    description: "Saved diagnostics provider preview for future discovery.",
    status: "Static mock",
  },
];

const bookingRequests: PreviewItem[] = [
  {
    title: "General consultation request",
    description:
      "Future appointment requests would need patient identity, provider confirmation, consent, and notifications.",
    status: "Future-only",
  },
  {
    title: "Diagnostics appointment request",
    description:
      "Future diagnostics booking would need scheduling, privacy, and result workflow planning.",
    status: "Future-only",
  },
];

const documentVaultItems: PreviewItem[] = [
  {
    title: "Lab result document",
    description:
      "Future document vault items would be private, consent-based, and never public.",
    status: "No upload",
  },
  {
    title: "Prescription document",
    description:
      "Future prescription sharing would need secure storage, patient control, and audit logs.",
    status: "No upload",
  },
  {
    title: "Referral note",
    description:
      "Future document sharing would be scoped to selected providers and time-limited where possible.",
    status: "No upload",
  },
];

const notificationPreferences: PreviewItem[] = [
  {
    title: "Appointment reminders",
    description:
      "Future reminders would use patient consent, quiet hours, and privacy-safe wording.",
    status: "Future-only",
  },
  {
    title: "Document updates",
    description:
      "Future document notifications would say a document is ready without exposing contents.",
    status: "Future-only",
  },
  {
    title: "Correction and feedback updates",
    description:
      "Future status updates could help patients track submitted corrections or feedback.",
    status: "Future-only",
  },
];

const sharingItems: PreviewItem[] = [
  {
    title: "Caregiver access",
    description:
      "Future caregiver sharing would require explicit patient consent and limited scopes.",
    status: "Future-only",
  },
  {
    title: "Family support",
    description:
      "Future family sharing could help coordinate appointments without exposing private records by default.",
    status: "Future-only",
  },
];

const walletItems: PreviewItem[] = [
  {
    title: "Appointment payment preview",
    description:
      "Future payments would require booking, provider confirmation, refund rules, and financial governance.",
    status: "Future-only",
  },
  {
    title: "Family sponsorship preview",
    description:
      "Future sponsored credits would need patient privacy, consent, and clear purpose restrictions.",
    status: "Future-only",
  },
];

const privacyNotes = [
  "Public healthcare discovery should remain open and login-free.",
  "Patient accounts should come later only when real patient-specific actions need them.",
  "Patient ID, documents, bookings, wallet, and sharing would need consent, RLS, audit logs, and privacy controls.",
  "This preview creates no account, stores no patient data, uploads no files, and shares nothing.",
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

function PreviewSection({
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

function PatientIdPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Patient ID concept preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        A future patient ID should be private and consent-based.
      </h2>
      <div className="mt-5 rounded-md border border-border bg-background p-4">
        <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
          Mock identifier
        </p>
        <p className="mt-2 break-words text-2xl font-semibold text-foreground">
          PATIENT-ID-PREVIEW
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This is placeholder text only. No real patient identifier is created,
          stored, verified, or shared.
        </p>
      </div>
    </section>
  );
}

function OverviewPanel() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <PreviewBadge>Patient account preview</PreviewBadge>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Preview future patient account concepts.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            This page previews patient identity, saved providers, booking
            requests, document vault, notifications, caregiver sharing, and
            wallet concepts without creating real patient data.
          </p>
        </div>

        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            No real patient data is created
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This preview uses local static mock content only. It does not sign
            in, store records, upload documents, create bookings, process
            payments, or share information.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {overviewItems.map((item) => (
          <div
            className="min-h-24 rounded-md border border-primary/20 bg-primary/10 p-4 text-primary"
            key={item.label}
          >
            <p className="text-xs font-semibold uppercase tracking-normal">
              {item.label}
            </p>
            <p className="mt-2 text-base font-semibold leading-snug">
              {item.value}
            </p>
          </div>
        ))}
      </div>
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
        Patient account features should stay private, scoped, and optional.
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

export function PatientAccountPreviewPage() {
  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <OverviewPanel />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <PatientIdPreview />
          <PreviewSection
            description="Saved providers could later help patients return to useful public listings without changing public discovery."
            eyebrow="Saved providers preview"
            items={savedProviders}
            title="Saved providers are static mock items here."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PreviewSection
            description="These examples show future appointment request concepts only. They do not create bookings or provider tasks."
            eyebrow="Booking request preview"
            items={bookingRequests}
            title="Booking functionality is not active."
          />
          <PreviewSection
            description="These examples show how future private documents might be organized, without file upload or storage."
            eyebrow="Document vault preview"
            items={documentVaultItems}
            title="Document vault storage is not active."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PreviewSection
            description="Future preferences would require account identity, consent records, and privacy-safe message templates."
            eyebrow="Notification preferences preview"
            items={notificationPreferences}
            title="Notification settings can come later."
          />
          <PreviewSection
            description="Future caregiver and family sharing would need patient-controlled permissions and audit history."
            eyebrow="Family and caregiver sharing preview"
            items={sharingItems}
            title="Sharing is future-only and consent-based."
          />
        </div>

        <PreviewSection
          description="Wallet and payment ideas are shown only as future concepts. No payment, balance, refund, sponsor, or wallet data exists here."
          eyebrow="Wallet and payment preview"
          items={walletItems}
          title="Payments and wallet are future-only."
        />

        <PrivacyConsentNotes />
      </div>
    </PageContainer>
  );
}
