import { providerTypes } from "./registration-options";

export function ProviderTypeGrid() {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-muted-foreground">
        Who can request a listing
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {providerTypes.map((provider) => (
          <article
            key={provider.title}
            className="rounded-lg border border-border bg-background p-4 shadow-sm"
          >
            <h3 className="font-semibold text-foreground">{provider.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {provider.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
