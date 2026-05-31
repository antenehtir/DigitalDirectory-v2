const deliveryItems = [
  "Delivery readiness status",
  "Service area preview",
  "Pickup versus delivery options",
  "Future patient confirmation step",
];

export function DeliveryWorkflowPreview() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-normal text-secondary">
        Delivery-ready workflow
      </p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
        Delivery can be introduced later.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This section reserves space for future delivery discovery without adding
        ordering, payments, routing, or delivery logic.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {deliveryItems.map((item) => (
          <div
            className="rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
