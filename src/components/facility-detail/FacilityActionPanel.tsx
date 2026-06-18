import type { Facility } from "@/types/facility";
import {
  createPublicContactActions,
  getExternalLinkProps,
} from "@/lib/contact-actions";

type FacilityActionPanelProps = {
  facility: Facility;
};

export function FacilityActionPanel({ facility }: FacilityActionPanelProps) {
  const contactChannels = facility.contactChannels ?? [];
  const allActions = createPublicContactActions(contactChannels);

  if (allActions.length === 0) {
    return null;
  }

  const phoneActions = allActions.filter((a) => a.kind === "phone");
  const otherActions = allActions.filter((a) => a.kind !== "phone");

  const pills = [
    ...phoneActions.map((action, i) => ({
      ...action,
      label: phoneActions.length === 1 ? "Call" : `Call ${i + 1}`,
    })),
    ...otherActions.map((action) => ({
      ...action,
      label: getCompactLabel(action.kind, action.label),
    })),
  ];

  return (
    <aside className="rounded-3xl border border-border bg-card p-5 shadow-[0_10px_26px_rgba(31,41,55,0.04)] sm:p-6">
      <div className="flex flex-wrap gap-2">
        {pills.map((action) => (
          <a
            key={action.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition hover:border-strong-border"
            href={action.href}
            {...getExternalLinkProps(action)}
          >
            <ActionIcon kind={action.kind} />
            {action.label}
          </a>
        ))}
      </div>
    </aside>
  );
}

function getCompactLabel(kind: string, fallback: string): string {
  if (kind === "email") return "Email";
  if (kind === "website") return "Visit website";
  if (kind === "maps") return "Open Maps";
  if (kind === "whatsapp") return "WhatsApp";
  if (kind === "appointment") return "Book";
  return fallback;
}

function ActionIcon({ kind }: { kind: string }) {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      {kind === "phone" && (
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      )}
      {kind === "email" && (
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      )}
      {kind === "maps" && (
        <>
          <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </>
      )}
      {kind === "website" && (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </>
      )}
      {kind === "whatsapp" && (
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      )}
      {(kind === "social" || kind === "appointment") && (
        <>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </>
      )}
      {kind !== "phone" &&
        kind !== "email" &&
        kind !== "maps" &&
        kind !== "website" &&
        kind !== "whatsapp" &&
        kind !== "social" &&
        kind !== "appointment" && (
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
        )}
    </svg>
  );
}
