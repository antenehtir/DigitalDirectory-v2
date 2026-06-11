const channels = [
  {
    title: "Platform support",
    description: "Help for search, listings, and profile discovery.",
  },
  {
    title: "Provider support",
    description: "Guidance for registration and verification requests.",
  },
  {
    title: "Correction support",
    description: "Review path for outdated healthcare information.",
  },
];

export function SupportChannelsPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Support channels
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Support paths for common requests.
      </h2>
      <div className="mt-5 grid gap-3">
        {channels.map((channel) => (
          <article
            className="rounded-md border border-border bg-background p-4 shadow-sm"
            key={channel.title}
          >
            <h3 className="text-base font-semibold text-foreground">
              {channel.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {channel.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
