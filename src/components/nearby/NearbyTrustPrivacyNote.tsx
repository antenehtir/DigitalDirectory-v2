export function NearbyTrustPrivacyNote() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
            Trust and privacy
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Nearby discovery should be useful without feeling invasive.
          </h2>
        </div>
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>
            This page does not request browser location, calculate distance, or
            store user location. Nearby care is organized by area.
          </p>
          <p>
            Verified, pending, and community-submitted healthcare information
            should remain visually distinct so patients understand what has
            been reviewed.
          </p>
        </div>
      </div>
    </section>
  );
}
