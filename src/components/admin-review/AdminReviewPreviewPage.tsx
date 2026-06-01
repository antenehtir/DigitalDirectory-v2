"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

type ReviewerRoleId = "reviewer" | "admin" | "super-admin";

type QueueItem = {
  title: string;
  source: string;
  priority: string;
  status: string;
  description: string;
};

type RolePreview = {
  id: ReviewerRoleId;
  label: string;
  description: string;
  scope: string;
  queueItems: QueueItem[];
  boundaries: string[];
};

type PreviewItem = {
  title: string;
  description: string;
  status: string;
};

const rolePreviews: RolePreview[] = [
  {
    id: "reviewer",
    label: "Reviewer",
    description:
      "A future reviewer could inspect assigned registration, correction, and verification cases without broad admin powers.",
    scope: "Assigned cases only",
    queueItems: [
      {
        title: "Provider registration",
        source: "Addis Health Center",
        priority: "Normal",
        status: "Needs review",
        description:
          "Preview a provider listing request before any public listing is changed.",
      },
      {
        title: "Correction request",
        source: "Public user report",
        priority: "Normal",
        status: "Open",
        description:
          "Review a public correction about service labels, hours, or contact details.",
      },
    ],
    boundaries: [
      "Reviewer access should be scoped to assigned cases.",
      "Reviewers should not see unrelated private provider or patient data.",
      "High-impact decisions should escalate to Admin when policy requires it.",
    ],
  },
  {
    id: "admin",
    label: "Admin",
    description:
      "A future admin could approve higher-impact listing changes, ownership claims, duplicate handling, and verification decisions.",
    scope: "Operational review queues",
    queueItems: [
      {
        title: "Ownership claim",
        source: "Bole Community Pharmacy",
        priority: "High",
        status: "Escalated",
        description:
          "Preview an ownership claim that would need evidence and audit logging before approval.",
      },
      {
        title: "High-risk listing change",
        source: "Facility phone and location",
        priority: "High",
        status: "Admin review",
        description:
          "Review contact or location changes before they can affect public access.",
      },
    ],
    boundaries: [
      "Admins should not routinely access patient-specific data.",
      "Admin approval should be auditable and tied to a review reason.",
      "Admins should not use service-role style powers casually.",
    ],
  },
  {
    id: "super-admin",
    label: "Super Admin",
    description:
      "A future Super Admin should handle rare governance, role misuse, privacy, security, or severe trust escalations.",
    scope: "Sensitive escalations only",
    queueItems: [
      {
        title: "Verification dispute",
        source: "Conflicting provider claim",
        priority: "Urgent",
        status: "Sensitive escalation",
        description:
          "Preview a disputed verification case that should be rare, logged, and carefully scoped.",
      },
      {
        title: "Role boundary concern",
        source: "Internal access review",
        priority: "Urgent",
        status: "Governance review",
        description:
          "Review possible role misuse without exposing broad data by default.",
      },
    ],
    boundaries: [
      "Super Admin should not be used for ordinary queue work.",
      "Sensitive access should require a documented reason.",
      "Super Admin decisions should be logged and reserved for exceptional cases.",
    ],
  },
];

const reviewPreviews: PreviewItem[] = [
  {
    title: "Provider registration review",
    description:
      "Check proposed public listing details, duplicate risk, provider type, and source notes before publication.",
    status: "Preview only",
  },
  {
    title: "Correction request review",
    description:
      "Compare the current public listing with a submitted correction before routing to approval or rejection.",
    status: "Preview only",
  },
  {
    title: "Ownership claim review",
    description:
      "Confirm whether a provider owner claim should move forward without granting live permissions.",
    status: "Preview only",
  },
  {
    title: "Verification status review",
    description:
      "Preview how verified, pending, rejected, or needs-update labels may be reviewed later.",
    status: "Preview only",
  },
  {
    title: "High-risk listing change review",
    description:
      "Inspect future phone, location, emergency, 24-hour, or specialist service changes before publication.",
    status: "Preview only",
  },
];

const auditLogItems = [
  "Reviewer opened provider registration preview.",
  "Mock action panel displayed approve, reject, request more info, and escalate options.",
  "No real review decision was saved.",
  "No public listing data was changed.",
];

function PreviewBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {children}
    </span>
  );
}

function ReviewActionButtons() {
  const actions = ["Approve", "Reject", "Request more info", "Escalate"];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {actions.map((action) => (
        <button
          className="min-h-10 rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          key={action}
          type="button"
        >
          {action} preview
        </button>
      ))}
    </div>
  );
}

function RoleSelector({
  activeId,
  onSelect,
}: {
  activeId: ReviewerRoleId;
  onSelect: (id: ReviewerRoleId) => void;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Reviewer role selector
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Preview a future review role.
          </h2>
        </div>
        <p className="text-sm leading-6 text-muted-foreground sm:max-w-xs">
          Switching roles changes mock queue content only.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {rolePreviews.map((role) => {
          const isActive = role.id === activeId;

          return (
            <button
              className={`min-h-28 rounded-md border p-4 text-left shadow-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary hover:bg-muted"
              }`}
              key={role.id}
              onClick={() => onSelect(role.id)}
              type="button"
            >
              <span className="block text-base font-semibold leading-snug">
                {role.label}
              </span>
              <span
                className={`mt-2 block text-sm leading-5 ${
                  isActive ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {role.scope}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function AdminReviewOverview({ role }: { role: RolePreview }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <PreviewBadge>Admin review preview</PreviewBadge>
          <p className="mt-4 text-sm font-semibold uppercase tracking-normal text-secondary">
            {role.label} boundary preview
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Preview future review queue workflows.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {role.description}
          </p>
        </div>

        <div className="rounded-md border border-border bg-background p-4">
          <p className="text-sm font-semibold text-foreground">
            No real admin action is performed
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This page uses local static mock data only. It does not authenticate
            reviewers, approve changes, reject requests, update public listings,
            or write audit logs.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReviewQueuePreview({ role }: { role: RolePreview }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Review queue preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Mock queue for {role.label}.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        These queue items are static examples and do not represent real review
        assignments.
      </p>

      <div className="mt-5 grid gap-3">
        {role.queueItems.map((item) => (
          <article
            className="rounded-md border border-border bg-background p-4"
            key={`${role.id}-${item.title}`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.source}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex w-fit rounded-full border border-warning/25 bg-warning/10 px-3 py-1 text-xs font-semibold text-foreground">
                  {item.priority}
                </span>
                <span className="inline-flex w-fit rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {item.status}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewTypePreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Review type preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Future review cases should stay separated by risk.
      </h2>
      <div className="mt-5 grid gap-3">
        {reviewPreviews.map((item) => (
          <article className="rounded-md border border-border bg-background p-4" key={item.title}>
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

function MockActionPanel() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Mock action panel
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Actions are visible but preview-only.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        These buttons do not approve, reject, request more information,
        escalate, notify anyone, or write data.
      </p>
      <div className="mt-5">
        <ReviewActionButtons />
      </div>
    </section>
  );
}

function AuditLogPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Audit log preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Real review actions should be auditable later.
      </h2>
      <div className="mt-5 grid gap-3">
        {auditLogItems.map((item) => (
          <div className="rounded-md border border-border bg-background px-4 py-3" key={item}>
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BoundaryNotes({ role }: { role: RolePreview }) {
  return (
    <section className="rounded-lg border border-secondary/20 bg-secondary/10 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Reviewer, Admin, and Super Admin boundaries
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Access should be scoped before real admin tools exist.
      </h2>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
        {role.boundaries.map((note) => (
          <li className="rounded-md border border-secondary/20 bg-card px-4 py-3" key={note}>
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AdminReviewPreviewPage() {
  const [activeRoleId, setActiveRoleId] = useState<ReviewerRoleId>("reviewer");

  const activeRole = useMemo(
    () => rolePreviews.find((role) => role.id === activeRoleId) ?? rolePreviews[0],
    [activeRoleId],
  );

  return (
    <PageContainer className="py-8 sm:py-10 lg:py-14">
      <div className="grid gap-6">
        <AdminReviewOverview role={activeRole} />
        <RoleSelector activeId={activeRole.id} onSelect={setActiveRoleId} />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ReviewQueuePreview role={activeRole} />
          <MockActionPanel />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ReviewTypePreview />
          <AuditLogPreview />
        </div>

        <BoundaryNotes role={activeRole} />
      </div>
    </PageContainer>
  );
}
