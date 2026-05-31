import { accountTypes } from "./auth-preview-data";

export function AccountTypeCards() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
          Account types
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
          Roles are planned for later, not active today.
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accountTypes.map((type) => (
          <article
            className="rounded-lg border border-border bg-background p-4 shadow-sm"
            key={type.title}
          >
            <div className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
              {type.status}
            </div>
            <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
              {type.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {type.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
