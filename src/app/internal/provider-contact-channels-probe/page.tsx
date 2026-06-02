import {
  getSupabasePublicProviderContactChannels,
  type PublicProviderContactChannel,
} from "@/lib/supabase/provider-contact-channels-public-read";

export const dynamic = "force-dynamic";

type ProbeCase = {
  group: "public" | "blocked" | "unknown";
  providerType: string;
  providerSlug: string;
};

type ProbeResult = ProbeCase & {
  status: "success" | "unavailable" | "error";
  safeCategory:
    | "success"
    | "success-empty"
    | "unavailable"
    | "network-or-fetch-failure"
    | "permission-denied"
    | "schema-unavailable"
    | "column-mismatch"
    | "helper-error"
    | "probe-timeout";
  count: number;
  channels: SafeProbeChannel[];
};

type SafeProbeChannel = {
  channelType: string;
  label: string;
  safeValue: string;
};

const PROBE_TIMEOUT_MS = 12_000;

const probeCases: ProbeCase[] = [
  {
    group: "public",
    providerType: "facility",
    providerSlug: "test-facility-alpha",
  },
  {
    group: "public",
    providerType: "facility",
    providerSlug: "test-facility-eta-minimal",
  },
  {
    group: "public",
    providerType: "facility",
    providerSlug: "test-facility-zeta-disputed",
  },
  {
    group: "public",
    providerType: "doctor",
    providerSlug: "test-doctor-alpha",
  },
  {
    group: "public",
    providerType: "doctor",
    providerSlug: "test-doctor-eta-minimal",
  },
  {
    group: "public",
    providerType: "doctor",
    providerSlug: "test-doctor-zeta-disputed",
  },
  {
    group: "blocked",
    providerType: "facility",
    providerSlug: "test-facility-beta-pending",
  },
  {
    group: "blocked",
    providerType: "facility",
    providerSlug: "test-facility-gamma-archived",
  },
  {
    group: "blocked",
    providerType: "doctor",
    providerSlug: "test-doctor-delta-hidden",
  },
  {
    group: "blocked",
    providerType: "doctor",
    providerSlug: "test-doctor-epsilon-internal",
  },
  {
    group: "unknown",
    providerType: "facility",
    providerSlug: "non-existent-facility-slug",
  },
  {
    group: "unknown",
    providerType: "doctor",
    providerSlug: "non-existent-doctor-slug",
  },
];

export default async function ProviderContactChannelsProbeRoute() {
  const results = await Promise.all(probeCases.map(readProbeCase));

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6">
        <header className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Internal runtime probe
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            Provider contact channels status
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            This temporary page checks the provider contact channels public read
            helper inside the Next runtime. It shows only safe provider
            identifiers, result statuses, channel counts, channel types, labels,
            and public display values or URLs.
          </p>
        </header>

        <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[0.7fr_0.7fr_1.2fr_0.7fr_0.9fr_0.6fr_1.6fr] gap-3 border-b border-border bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground">
            <span>Group</span>
            <span>Type</span>
            <span>Slug</span>
            <span>Status</span>
            <span>Safe category</span>
            <span>Count</span>
            <span>Channels</span>
          </div>

          <div className="divide-y divide-border">
            {results.map((result) => (
              <div
                className="grid grid-cols-[0.7fr_0.7fr_1.2fr_0.7fr_0.9fr_0.6fr_1.6fr] gap-3 px-4 py-3 text-sm"
                key={`${result.providerType}-${result.providerSlug}`}
              >
                <span className="capitalize text-muted-foreground">
                  {result.group}
                </span>
                <span className="font-medium">{result.providerType}</span>
                <span className="break-words font-medium">
                  {result.providerSlug}
                </span>
                <span className="font-semibold">{result.status}</span>
                <span className="font-semibold">{result.safeCategory}</span>
                <span>{result.count}</span>
                <ChannelList channels={result.channels} />
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
    getSupabasePublicProviderContactChannels(
      probeCase.providerType,
      probeCase.providerSlug,
    ).then((result) => ({
      ...probeCase,
      status: result.status,
      safeCategory: getProbeSafeCategory(result),
      count: result.channels.length,
      channels: result.channels.map(mapChannelToSafeProbeChannel),
    })),
    {
      ...probeCase,
      status: "error",
      safeCategory: "probe-timeout",
      count: 0,
      channels: [],
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
  result: Awaited<
    ReturnType<typeof getSupabasePublicProviderContactChannels>
  >,
): ProbeResult["safeCategory"] {
  if (result.status === "success") {
    return result.channels.length > 0 ? "success" : "success-empty";
  }

  if (result.status === "unavailable") {
    return "unavailable";
  }

  if (
    result.errorCode ===
    "PROVIDER_CONTACT_CHANNELS_PUBLIC_NETWORK_OR_FETCH_FAILED"
  ) {
    return "network-or-fetch-failure";
  }

  if (
    result.errorCode === "PROVIDER_CONTACT_CHANNELS_PUBLIC_PERMISSION_DENIED"
  ) {
    return "permission-denied";
  }

  if (
    result.errorCode === "PROVIDER_CONTACT_CHANNELS_PUBLIC_SCHEMA_UNAVAILABLE"
  ) {
    return "schema-unavailable";
  }

  if (
    result.errorCode === "PROVIDER_CONTACT_CHANNELS_PUBLIC_COLUMN_MISMATCH"
  ) {
    return "column-mismatch";
  }

  return "helper-error";
}

function mapChannelToSafeProbeChannel(
  channel: PublicProviderContactChannel,
): SafeProbeChannel {
  return {
    channelType: channel.channelType,
    label: channel.label,
    safeValue: channel.urlPublic ?? channel.valuePublic,
  };
}

function ChannelList({ channels }: { channels: SafeProbeChannel[] }) {
  if (channels.length === 0) {
    return <span className="text-muted-foreground">No public channels</span>;
  }

  return (
    <ul className="grid gap-2 text-muted-foreground">
      {channels.map((channel) => (
        <li key={`${channel.channelType}-${channel.label}-${channel.safeValue}`}>
          <span className="font-medium text-foreground">
            {channel.channelType}
          </span>
          {" / "}
          <span>{channel.label}</span>
          {" / "}
          <span className="break-words">{channel.safeValue}</span>
        </li>
      ))}
    </ul>
  );
}
