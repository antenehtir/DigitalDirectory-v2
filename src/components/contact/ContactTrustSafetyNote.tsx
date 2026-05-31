export function ContactTrustSafetyNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Trust and safety
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Support should protect healthcare trust.
          </h2>
        </div>
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>
            Contact and support workflows should keep verified, pending, and
            community-submitted healthcare information clearly separated.
          </p>
          <p>
            This page does not collect files, send messages, create tickets, or
            process sensitive healthcare information.
          </p>
        </div>
      </div>
    </section>
  );
}
