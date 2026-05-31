import { adminAccessItems, providerAccessItems } from "./auth-preview-data";

function AccessList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li className="rounded-md border border-border bg-background px-4 py-3" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProviderAccessPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Provider access preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Provider accounts should support reviewed changes later.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Doctors, facilities, pharmacies, and diagnostics providers may later
        use accounts to request ownership and submit updates for review.
      </p>
      <AccessList items={providerAccessItems} />
    </section>
  );
}

export function AdminReviewerAccessPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Admin and reviewer access preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Internal accounts should protect trust workflows.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Admin and reviewer access should remain protected and auditable when
        real review queues and verification decisions exist.
      </p>
      <AccessList items={adminAccessItems} />
    </section>
  );
}
