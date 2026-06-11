const previewFields = [
  { label: "Name or organization", placeholder: "Your name or organization" },
  { label: "Contact method", placeholder: "Phone or email" },
  { label: "Support topic", placeholder: "Listing, correction, partnership, or trust" },
];

export function ContactPreviewForm() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Contact form
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Message details
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Share enough detail for the team to understand the request. Contact
        details are reviewed before follow-up.
      </p>

      <div className="mt-5 grid gap-4" role="form" aria-label="Contact form">
        {previewFields.map((field) => (
          <div className="grid gap-2" key={field.label}>
            <p className="text-sm font-semibold text-foreground">
              {field.label}
            </p>
            <div className="flex min-h-12 items-center rounded-md border border-border bg-input px-4 text-sm text-muted-foreground shadow-sm">
              {field.placeholder}
            </div>
          </div>
        ))}

        <div className="grid gap-2">
          <p className="text-sm font-semibold text-foreground">
            Message
          </p>
          <div className="min-h-28 rounded-md border border-border bg-input px-4 py-3 text-sm leading-6 text-muted-foreground shadow-sm">
            Briefly describe what you need help with.
          </div>
        </div>

        <div className="mt-1 flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-center text-sm font-semibold text-primary-foreground shadow-sm">
          Send message
        </div>
      </div>
    </section>
  );
}
