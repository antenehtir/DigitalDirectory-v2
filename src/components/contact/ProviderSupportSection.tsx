import Link from "next/link";

export function ProviderSupportSection() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Provider support
      </p>
      <h2 className="mt-2 text-xl font-semibold leading-tight text-foreground">
        Need listing help?
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Doctors, facilities, pharmacies, and diagnostic providers can preview
        the listing or verification request path.
      </p>
      <Link
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-5 text-center text-sm font-semibold text-primary-foreground"
        href="/register"
      >
        Go to register
      </Link>
    </section>
  );
}
