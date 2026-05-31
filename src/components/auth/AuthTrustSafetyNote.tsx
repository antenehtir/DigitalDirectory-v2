export function AuthTrustSafetyNote() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-primary">
            Trust and safety
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Accounts should protect healthcare data, not block discovery.
          </h2>
        </div>
        <div className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>
            Real authentication should wait until provider ownership, admin
            review, audit trails, and protected data boundaries are ready.
          </p>
          <p>
            This preview does not create accounts, sessions, cookies, protected
            routes, dashboards, Supabase access, or backend requests.
          </p>
        </div>
      </div>
    </section>
  );
}
