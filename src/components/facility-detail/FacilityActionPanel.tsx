import type { Facility, FacilityContactChannel } from "@/types/facility";

type FacilityActionPanelProps = {
  facility: Facility;
};

export function FacilityActionPanel({ facility }: FacilityActionPanelProps) {
  const contactChannels = facility.contactChannels ?? [];

  return (
    <aside className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Action panel
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Contact options
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Contact details are being verified. Use published channels when they
        are available.
      </p>

      <div className="mt-5 grid gap-3">
        <button
          className="min-h-12 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm"
          type="button"
        >
          {facility.contactActionLabel}
        </button>
        <button
          className="min-h-12 rounded-md border border-border bg-background px-5 text-sm font-semibold text-primary shadow-sm"
          type="button"
        >
          {facility.directionsActionLabel}
        </button>
        <button
          className="min-h-12 rounded-md border border-border bg-background px-5 text-sm font-semibold text-primary shadow-sm"
          type="button"
        >
          Save provider
        </button>
      </div>

      {contactChannels.length > 0 ? (
        <div className="mt-5 border-t border-border pt-5">
          <p className="text-sm font-semibold text-foreground">
            Public contact channels
          </p>
          <div className="mt-3 grid gap-2">
            {contactChannels.map((channel) => (
              <div
                className="rounded-md border border-border bg-background p-3 text-sm leading-6"
                key={channel.id}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-foreground">
                    {channel.label}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
                    {getChannelTypeLabel(channel)}
                  </p>
                </div>
                <p className="mt-1 break-words text-muted-foreground">
                  {channel.href ? (
                    <a
                      className="font-medium text-primary underline-offset-4 hover:underline"
                      href={channel.href}
                      rel={
                        isExternalHref(channel.href) ? "noreferrer" : undefined
                      }
                      target={isExternalHref(channel.href) ? "_blank" : undefined}
                    >
                      {channel.value}
                    </a>
                  ) : (
                    channel.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function getChannelTypeLabel(channel: FacilityContactChannel): string {
  if (channel.channelType === "social" && channel.label === "LinkedIn") {
    return "LinkedIn";
  }

  if (channel.channelType === "maps") {
    return "Maps";
  }

  if (channel.channelType === "whatsapp") {
    return "WhatsApp";
  }

  if (channel.channelType === "email") {
    return "Email";
  }

  return channel.channelType;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
