import { getSupabasePublicPharmacyDetailBySlug } from "../src/lib/supabase/pharmacies-public-read";

type SafeDetailProbeStatus = "success" | "not-found" | "unavailable" | "error";

type SafeDetailProbeResult = {
  status: SafeDetailProbeStatus;
  source: string;
  detail: unknown;
  fallbackRecommended: boolean;
  reason?: string;
  errorCode?: string;
};

type ProbeCaseSummary = {
  label: string;
  slug: string;
  status: SafeDetailProbeStatus;
  source: string;
  hasDetail: boolean;
  fallbackRecommended: boolean;
  reason?: string;
  errorCode?: string;
};

const probeCases = [
  {
    label: "sample",
    slug: "bole-community-pharmacy",
  },
  {
    label: "missing",
    slug: "non-existent-pharmacy-slug",
  },
] as const;

const validStatuses: SafeDetailProbeStatus[] = [
  "success",
  "not-found",
  "unavailable",
  "error",
];

async function main() {
  try {
    const summaries: ProbeCaseSummary[] = [];

    for (const probeCase of probeCases) {
      const result = await getSupabasePublicPharmacyDetailBySlug(
        probeCase.slug,
      );

      if (!isSafeDetailProbeResult(result)) {
        console.error(
          `Pharmacy detail probe failed: malformed safe result for ${probeCase.label}.`,
        );
        process.exitCode = 1;
        return;
      }

      summaries.push({
        label: probeCase.label,
        slug: probeCase.slug,
        status: result.status,
        source: result.source,
        hasDetail: Boolean(result.detail),
        fallbackRecommended: result.fallbackRecommended,
        reason: result.reason,
        errorCode: result.errorCode,
      });
    }

    console.log(
      JSON.stringify(
        {
          probe: "pharmacy-detail",
          cases: summaries,
        },
        null,
        2,
      ),
    );
    process.exitCode = 0;
  } catch {
    console.error(
      "Pharmacy detail probe failed: unexpected runtime crash.",
    );
    process.exitCode = 1;
  }
}

function isSafeDetailProbeResult(
  value: unknown,
): value is SafeDetailProbeResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Partial<SafeDetailProbeResult>;

  return (
    typeof result.status === "string" &&
    validStatuses.includes(result.status as SafeDetailProbeStatus) &&
    typeof result.source === "string" &&
    "detail" in result &&
    typeof result.fallbackRecommended === "boolean" &&
    isOptionalString(result.reason) &&
    isOptionalString(result.errorCode)
  );
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === "string";
}

void main();
