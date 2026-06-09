import nextEnv from "@next/env";

import { getSupabasePublicDiagnosticDetailBySlug } from "../src/lib/supabase/diagnostics-public-read";

type SafeDetailProbeStatus =
  | "success"
  | "not-found"
  | "unavailable"
  | "error";

type SafeDetailProbeResult = {
  status: SafeDetailProbeStatus;
  source: string;
  detail: unknown;
  fallbackRecommended: boolean;
  reason?: string;
  errorCode?: string;
};

type ProbeCaseKind = "public" | "blocked" | "missing" | "invalid";

type ProbeCase = {
  kind: ProbeCaseKind;
  label: string;
  slug: string;
};

type ProbeCaseSummary = {
  label: string;
  kind: ProbeCaseKind;
  slug: string;
  status: SafeDetailProbeStatus;
  source: string;
  hasDetail: boolean;
  publicDetailReturned: boolean;
  safelyHandled: boolean;
  fallbackRecommended: boolean;
  reason?: string;
  errorCode?: string;
};

const probeCases: ProbeCase[] = [
  {
    kind: "public",
    label: "public-alpha-lab",
    slug: "test-diagnostic-alpha-lab",
  },
  {
    kind: "blocked",
    label: "blocked-pending",
    slug: "test-diagnostic-beta-pending",
  },
  {
    kind: "blocked",
    label: "blocked-hidden",
    slug: "test-diagnostic-delta-hidden",
  },
  {
    kind: "missing",
    label: "missing",
    slug: "test-diagnostic-missing-slug",
  },
  {
    kind: "invalid",
    label: "invalid-path-like",
    slug: "../test-diagnostic-alpha-lab",
  },
];

const validStatuses: SafeDetailProbeStatus[] = [
  "success",
  "not-found",
  "unavailable",
  "error",
];

async function main() {
  try {
    nextEnv.loadEnvConfig(process.cwd());

    const summaries: ProbeCaseSummary[] = [];

    for (const probeCase of probeCases) {
      const result = await getSupabasePublicDiagnosticDetailBySlug(
        probeCase.slug,
      );

      if (!isSafeDetailProbeResult(result)) {
        console.error(
          `Diagnostics detail probe failed: malformed safe result for ${probeCase.label}.`,
        );
        process.exitCode = 1;
        return;
      }

      summaries.push(createCaseSummary(probeCase, result));
    }

    const publicCase = summaries.find((summary) => summary.kind === "public");
    const blockedCases = summaries.filter(
      (summary) => summary.kind === "blocked",
    );
    const missingCase = summaries.find((summary) => summary.kind === "missing");
    const invalidCase = summaries.find((summary) => summary.kind === "invalid");
    const publicSlugReturned = Boolean(publicCase?.publicDetailReturned);
    const publicSlugSafelyUnavailable = Boolean(
      publicCase &&
        !publicCase.publicDetailReturned &&
        (publicCase.status === "unavailable" || publicCase.status === "error"),
    );
    const blockedSlugsExcluded = blockedCases.every(
      (summary) => summary.safelyHandled,
    );
    const missingSlugHandled = Boolean(missingCase?.safelyHandled);
    const invalidSlugHandled = Boolean(invalidCase?.safelyHandled);
    const passed =
      Boolean(publicCase) &&
      (publicSlugReturned || publicSlugSafelyUnavailable) &&
      blockedSlugsExcluded &&
      missingSlugHandled &&
      invalidSlugHandled;

    console.log(
      JSON.stringify(
        {
          probe: "diagnostics-detail-public-read",
          cases: summaries,
          publicSlugReturned,
          publicSlugSafelyUnavailable,
          blockedSlugsExcluded,
          missingSlugHandled,
          invalidSlugHandled,
          passed,
        },
        null,
        2,
      ),
    );

    process.exitCode = passed ? 0 : 1;
  } catch {
    console.error(
      "Diagnostics detail probe failed: unexpected runtime crash.",
    );
    process.exitCode = 1;
  }
}

function createCaseSummary(
  probeCase: ProbeCase,
  result: SafeDetailProbeResult,
): ProbeCaseSummary {
  const hasDetail = Boolean(result.detail);
  const publicDetailReturned =
    result.status === "success" && result.source === "supabase" && hasDetail;
  const safelyHandled =
    probeCase.kind === "public"
      ? publicDetailReturned ||
        result.status === "unavailable" ||
        result.status === "error"
      : !publicDetailReturned && !hasDetail;

  return {
    label: probeCase.label,
    kind: probeCase.kind,
    slug: probeCase.slug,
    status: result.status,
    source: result.source,
    hasDetail,
    publicDetailReturned,
    safelyHandled,
    fallbackRecommended: result.fallbackRecommended,
    reason: result.reason,
    errorCode: result.errorCode,
  };
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
