const previewFields = [
  { label: "Email or phone", placeholder: "Future account contact preview" },
  { label: "Password", placeholder: "Future secure password field preview" },
  { label: "Account type", placeholder: "Provider, reviewer, admin, or patient later" },
];

export function SignInPreviewForm() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-primary">
        Sign-in preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Future account access shape
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Static fields show where sign-in may appear later. Nothing is submitted,
        stored, authenticated, or connected to a session.
      </p>

      <div className="mt-5 grid gap-4" role="form" aria-label="Sign-in preview form">
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

        <div className="mt-1 flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-center text-sm font-semibold text-primary-foreground shadow-sm">
          Continue preview
        </div>
      </div>
    </section>
  );
}
