import Link from "next/link";

export function PublicBrowsingNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Public browsing stays open
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Patients should not need an account to find care.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Search, nearby discovery, doctor profiles, facility pages, pharmacy
        discovery, diagnostics discovery, corrections, feedback, and contact
        previews remain available without signing in.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm"
          href="/search"
        >
          Browse search
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm"
          href="/register"
        >
          View provider registration preview
        </Link>
      </div>
    </section>
  );
}
