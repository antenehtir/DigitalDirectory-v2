import { getSupabasePublicDoctorDetailBySlug } from "@/lib/supabase/doctors-public-read";

export const dynamic = "force-dynamic";

type ProbeCase = {
  group: "positive" | "blocked" | "unknown";
  slug: string;
};

type ProbeResult = ProbeCase & {
  status: "success" | "not-found" | "unavailable" | "error";
  safeCategory:
    | "success"
    | "not-found"
    | "unavailable"
    | "network-or-fetch-failure"
    | "permission-denied"
    | "schema-unavailable"
    | "column-mismatch"
    | "helper-error"
    | "probe-timeout";
  displayName: string | null;
};

const PROBE_TIMEOUT_MS = 12_000;

const probeCases: ProbeCase[] = [
  { group: "positive", slug: "test-doctor-alpha" },
  { group: "positive", slug: "test-doctor-eta-minimal" },
  { group: "positive", slug: "test-doctor-zeta-disputed" },
  { group: "blocked", slug: "test-doctor-beta-pending" },
  { group: "blocked", slug: "test-doctor-gamma-archived" },
  { group: "blocked", slug: "test-doctor-delta-hidden" },
  { group: "blocked", slug: "test-doctor-epsilon-internal" },
  { group: "unknown", slug: "non-existent-doctor-slug" },
];

export default async function DoctorDetailProbeRoute() {
  const results = await Promise.all(probeCases.map(readProbeCase));

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6">
        <header className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Internal runtime probe
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            Doctor detail helper status
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            This temporary page checks the public doctor detail helper inside
            the Next runtime. It shows only safe result statuses and successful
            public display names.
          </p>
        </header>

        <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.9fr_1fr] gap-3 border-b border-border bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
            <span>Slug</span>
            <span>Group</span>
            <span>Status</span>
            <span>Safe category</span>
            <span>Safe display name</span>
          </div>

          <div className="divide-y divide-border">
            {results.map((result) => (
              <div
                className="grid grid-cols-[1fr_0.7fr_0.7fr_0.9fr_1fr] gap-3 px-4 py-3 text-sm"
                key={result.slug}
              >
                <span className="break-words font-medium">{result.slug}</span>
                <span className="capitalize text-muted-foreground">
                  {result.group}
                </span>
                <span className="font-semibold">{result.status}</span>
                <span className="font-semibold">{result.safeCategory}</span>
                <span className="text-muted-foreground">
                  {result.displayName ?? "Not shown"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

async function readProbeCase(probeCase: ProbeCase): Promise<ProbeResult> {
  return withProbeTimeout(
    getSupabasePublicDoctorDetailBySlug(probeCase.slug).then((result) => ({
      ...probeCase,
      status: result.status,
      safeCategory: getProbeSafeCategory(result),
      displayName: result.detail?.name ?? null,
    })),
    {
      ...probeCase,
      status: "error",
      safeCategory: "probe-timeout",
      displayName: null,
    },
  );
}

async function withProbeTimeout<T>(
  read: Promise<T>,
  fallback: T,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      read.finally(() => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }),
      new Promise<T>((resolve) => {
        timeoutId = setTimeout(() => {
          resolve(fallback);
        }, PROBE_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function getProbeSafeCategory(
  result: Awaited<ReturnType<typeof getSupabasePublicDoctorDetailBySlug>>,
): ProbeResult["safeCategory"] {
  if (result.status !== "error") {
    return result.status;
  }

  if (result.errorCode === "DOCTORS_PUBLIC_NETWORK_OR_FETCH_FAILED") {
    return "network-or-fetch-failure";
  }

  if (result.errorCode === "DOCTORS_PUBLIC_PERMISSION_DENIED") {
    return "permission-denied";
  }

  if (result.errorCode === "DOCTORS_PUBLIC_SCHEMA_UNAVAILABLE") {
    return "schema-unavailable";
  }

  if (result.errorCode === "DOCTORS_PUBLIC_COLUMN_MISMATCH") {
    return "column-mismatch";
  }

  return "helper-error";
}
