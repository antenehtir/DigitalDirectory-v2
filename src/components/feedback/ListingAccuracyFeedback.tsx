import Link from "next/link";

export function ListingAccuracyFeedback() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Listing accuracy
      </p>
      <h2 className="mt-2 text-xl font-semibold leading-tight text-foreground">
        Improve healthcare information.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        For incorrect phone numbers, locations, services, hours, or trust
        labels, the correction flow is the clearest path.
      </p>
      <Link
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-background px-5 text-center text-sm font-semibold text-primary"
        href="/corrections"
      >
        Go to corrections
      </Link>
    </section>
  );
}
