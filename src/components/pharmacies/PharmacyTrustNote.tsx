export function PharmacyTrustNote() {
  return (
    <section className="rounded-lg border border-border bg-muted p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Pharmacy trust note
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Medication discovery needs clear trust signals.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Verified, pending, and community-submitted pharmacy information should
        remain visually distinct before any future medication availability,
        prescription, payment, or delivery workflow is introduced.
      </p>
      <div className="mt-5 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">
          Pharmacy information review
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Medicine inventory, prescription upload, ordering, and payment
          information will be updated after verification.
        </p>
      </div>
    </section>
  );
}
