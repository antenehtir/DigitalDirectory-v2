import { getSupabasePublicPharmacyCards } from "../src/lib/supabase/pharmacies-public-read";

type SafeProbeStatus = "success" | "unavailable" | "error";

type SafeProbeResult = {
  status: SafeProbeStatus;
  source: string;
  cards: unknown[];
  fallbackRecommended: boolean;
  reason?: string;
  errorCode?: string;
};

const validStatuses: SafeProbeStatus[] = ["success", "unavailable", "error"];

async function main() {
  try {
    const result = await getSupabasePublicPharmacyCards();

    if (!isSafeProbeResult(result)) {
      console.error(
        "Pharmacies public read probe failed: malformed safe result.",
      );
      process.exitCode = 1;
      return;
    }

    const summary = {
      status: result.status,
      source: result.source,
      cardCount: result.cards.length,
      fallbackRecommended: result.fallbackRecommended,
      reason: result.reason,
      errorCode: result.errorCode,
    };

    console.log(JSON.stringify(summary, null, 2));
    process.exitCode = 0;
  } catch {
    console.error(
      "Pharmacies public read probe failed: unexpected runtime crash.",
    );
    process.exitCode = 1;
  }
}

function isSafeProbeResult(value: unknown): value is SafeProbeResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Partial<SafeProbeResult>;

  return (
    typeof result.status === "string" &&
    validStatuses.includes(result.status as SafeProbeStatus) &&
    typeof result.source === "string" &&
    Array.isArray(result.cards) &&
    typeof result.fallbackRecommended === "boolean" &&
    isOptionalString(result.reason) &&
    isOptionalString(result.errorCode)
  );
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === "string";
}

void main();
