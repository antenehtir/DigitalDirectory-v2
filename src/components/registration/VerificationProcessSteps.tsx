import { verificationSteps } from "./registration-options";

export function VerificationProcessSteps() {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-muted-foreground">
        Verification process preview
      </p>
      <div className="grid gap-3">
        {verificationSteps.map((step, index) => (
          <article
            key={step.title}
            className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-muted text-sm font-bold text-primary">
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
