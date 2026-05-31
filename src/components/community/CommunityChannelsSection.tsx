import { CommunityChannelCard } from "./CommunityChannelCard";
import { communityChannels } from "./community-channels";

export function CommunityChannelsSection() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-primary">
          Community channels
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Follow future platform updates in one place.
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          These placeholder channels show how DigitalDirectory-v2 can share new
          listings, verification updates, correction reminders, and provider
          onboarding announcements later.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {communityChannels.map((channel) => (
          <CommunityChannelCard
            key={channel.name}
            name={channel.name}
            purpose={channel.purpose}
            audience={channel.audience}
            href={channel.href}
          />
        ))}
      </div>
    </section>
  );
}
