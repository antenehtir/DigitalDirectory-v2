import {
  coercePublicText,
  createPublicVerification,
  getPublicProviderDetailPath,
  normalizeCategoryLabel,
  normalizePublicSlug,
} from "@/lib/public-listing-mappers";
import type {
  PublicProviderCard,
  PublicProviderDetail,
} from "@/types/public-listings";
import type { VerificationStatus } from "@/types/verification";

import {
  getSupabasePublicClient,
  getSupabasePublicClientStatus,
} from "./public-client";

const FACILITIES_PUBLIC_SELECT = [
  "id",
  "slug",
  "display_name",
  "facility_type",
  "category",
  "description",
  "city",
  "area",
  "address_public",
  "landmark_public",
  "listing_status",
  "visibility_status",
  "verification_status",
  "last_confirmed_at",
].join(", ");

type SupabaseFacilityListingStatus =
  | "draft"
  | "pending"
  | "active"
  | "rejected"
  | "archived"
  | "suspended";

type SupabaseFacilityVisibilityStatus = "public" | "hidden" | "internal";

type SupabaseFacilityVerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "disputed"
  | "expired";

type SupabaseFacilityPublicRow = {
  id: string;
  slug: string;
  display_name: string;
  facility_type: string;
  category: string | null;
  description: string | null;
  city: string | null;
  area: string | null;
  address_public: string | null;
  landmark_public: string | null;
  listing_status: SupabaseFacilityListingStatus;
  visibility_status: SupabaseFacilityVisibilityStatus;
  verification_status: SupabaseFacilityVerificationStatus;
  last_confirmed_at: string | null;
};

type FacilitiesPublicReadUnavailableReason =
  | "missing-env"
  | "client-unavailable"
  | "invalid-slug";

type FacilitiesPublicReadErrorReason = "query-failed";

export type FacilitiesPublicReadResult =
  | {
      status: "success";
      source: "supabase";
      cards: PublicProviderCard[];
      fallbackRecommended: false;
    }
  | {
      status: "unavailable";
      source: "static-fallback";
      cards: [];
      fallbackRecommended: true;
      reason: FacilitiesPublicReadUnavailableReason;
      missingKeys: string[];
      message: string;
    }
  | {
      status: "error";
      source: "static-fallback";
      cards: [];
      fallbackRecommended: true;
      reason: FacilitiesPublicReadErrorReason;
      errorCode: "FACILITIES_PUBLIC_READ_FAILED";
      message: string;
    };

export type FacilityPublicDetailReadResult =
  | {
      status: "success";
      source: "supabase";
      detail: PublicProviderDetail;
      fallbackRecommended: false;
    }
  | {
      status: "not-found";
      source: "static-fallback";
      detail: null;
      fallbackRecommended: true;
      reason: "not-found";
      message: string;
    }
  | {
      status: "unavailable";
      source: "static-fallback";
      detail: null;
      fallbackRecommended: true;
      reason: FacilitiesPublicReadUnavailableReason;
      missingKeys: string[];
      message: string;
    }
  | {
      status: "error";
      source: "static-fallback";
      detail: null;
      fallbackRecommended: true;
      reason: FacilitiesPublicReadErrorReason;
      errorCode: "FACILITY_DETAIL_PUBLIC_READ_FAILED";
      message: string;
    };

export async function getSupabasePublicFacilityCards(): Promise<FacilitiesPublicReadResult> {
  const clientStatus = getSupabasePublicClientStatus();

  if (!clientStatus.isAvailable) {
    return {
      status: "unavailable",
      source: "static-fallback",
      cards: [],
      fallbackRecommended: true,
      reason: "missing-env",
      missingKeys: clientStatus.missingKeys,
      message:
        "Supabase public listing environment is unavailable. Use static facility data.",
    };
  }

  const client = getSupabasePublicClient();

  if (!client) {
    return {
      status: "unavailable",
      source: "static-fallback",
      cards: [],
      fallbackRecommended: true,
      reason: "client-unavailable",
      missingKeys: [],
      message:
        "Supabase browser client is unavailable. Use static facility data.",
    };
  }

  const { data, error } = await client
    .from("facilities")
    .select(FACILITIES_PUBLIC_SELECT)
    .eq("listing_status", "active")
    .eq("visibility_status", "public")
    .order("display_name", { ascending: true });

  if (error) {
    return {
      status: "error",
      source: "static-fallback",
      cards: [],
      fallbackRecommended: true,
      reason: "query-failed",
      errorCode: "FACILITIES_PUBLIC_READ_FAILED",
      message:
        "Supabase facilities public read failed. Use static facility data.",
    };
  }

  const rows = (data ?? []) as unknown as SupabaseFacilityPublicRow[];

  return {
    status: "success",
    source: "supabase",
    cards: rows.map(mapSupabaseFacilityRowToPublicCard),
    fallbackRecommended: false,
  };
}

export async function getSupabasePublicFacilityDetailBySlug(
  slug: string,
): Promise<FacilityPublicDetailReadResult> {
  const requestedSlug = slug.trim();

  if (!requestedSlug) {
    return {
      status: "unavailable",
      source: "static-fallback",
      detail: null,
      fallbackRecommended: true,
      reason: "invalid-slug",
      missingKeys: [],
      message:
        "Facility detail slug is unavailable. Use static facility detail data.",
    };
  }

  const clientStatus = getSupabasePublicClientStatus();

  if (!clientStatus.isAvailable) {
    return {
      status: "unavailable",
      source: "static-fallback",
      detail: null,
      fallbackRecommended: true,
      reason: "missing-env",
      missingKeys: clientStatus.missingKeys,
      message:
        "Supabase public listing environment is unavailable. Use static facility detail data.",
    };
  }

  const client = getSupabasePublicClient();

  if (!client) {
    return {
      status: "unavailable",
      source: "static-fallback",
      detail: null,
      fallbackRecommended: true,
      reason: "client-unavailable",
      missingKeys: [],
      message:
        "Supabase browser client is unavailable. Use static facility detail data.",
    };
  }

  const { data, error } = await client
    .from("facilities")
    .select(FACILITIES_PUBLIC_SELECT)
    .eq("slug", requestedSlug)
    .eq("listing_status", "active")
    .eq("visibility_status", "public")
    .limit(1)
    .maybeSingle();

  if (error) {
    return {
      status: "error",
      source: "static-fallback",
      detail: null,
      fallbackRecommended: true,
      reason: "query-failed",
      errorCode: "FACILITY_DETAIL_PUBLIC_READ_FAILED",
      message:
        "Supabase facility detail public read failed. Use static facility detail data.",
    };
  }

  if (!data) {
    return {
      status: "not-found",
      source: "static-fallback",
      detail: null,
      fallbackRecommended: true,
      reason: "not-found",
      message:
        "Supabase facility detail was not found as an active public listing. Use static fallback or not-found handling.",
    };
  }

  return {
    status: "success",
    source: "supabase",
    detail: mapSupabaseFacilityRowToPublicDetail(
      data as unknown as SupabaseFacilityPublicRow,
    ),
    fallbackRecommended: false,
  };
}

function mapSupabaseFacilityRowToPublicCard(
  row: SupabaseFacilityPublicRow,
): PublicProviderCard {
  const providerType = "facility";
  const slug = normalizePublicSlug(row.slug, row.id);
  const locationLabel = createLocationLabel(row);
  const categoryLabel = normalizeCategoryLabel(
    row.category ?? row.facility_type,
    providerType,
  );

  return {
    id: row.id,
    slug,
    name: coercePublicText(row.display_name, "Facility name not listed"),
    providerType,
    categoryLabel,
    summary: coercePublicText(row.description, "Facility details not listed"),
    locationLabel,
    verificationStatus: mapSupabaseFacilityVerificationStatus(
      row.verification_status,
    ),
    listingHref: getPublicProviderDetailPath({
      id: row.id,
      slug,
      providerType,
    }),
    primaryActionLabel: "View details",
    secondaryActionLabel: "More information",
    services: categoryLabel ? [categoryLabel] : [],
    specialties: [],
    affiliations: [],
    availabilityPreview: createFreshnessLabel(row.last_confirmed_at),
  };
}

function mapSupabaseFacilityRowToPublicDetail(
  row: SupabaseFacilityPublicRow,
): PublicProviderDetail {
  const card = mapSupabaseFacilityRowToPublicCard(row);
  const address = createAddressLabel(row);

  return {
    ...card,
    description: card.summary,
    location: {
      name: card.locationLabel,
      displayName: card.locationLabel,
    },
    address,
    contactChannels: [],
    workingHours: "Hours not listed",
    verification: createPublicVerification({
      status: card.verificationStatus,
      note: "Supabase public listing preview. Verification details are not exposed in public reads.",
    }),
    relatedProviderIds: [],
    correctionHref: `/corrections?listing=${card.slug}`,
  };
}

function mapSupabaseFacilityVerificationStatus(
  status: SupabaseFacilityVerificationStatus,
): VerificationStatus {
  if (status === "verified") {
    return "verified";
  }

  if (status === "pending") {
    return "pending";
  }

  return "community-submitted";
}

function createLocationLabel(row: SupabaseFacilityPublicRow): string {
  const locationParts = [row.area, row.city]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part));

  return locationParts.length > 0
    ? locationParts.join(", ")
    : "Location not listed";
}

function createAddressLabel(row: SupabaseFacilityPublicRow): string | undefined {
  const addressParts = [row.address_public, row.landmark_public]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part));

  return addressParts.length > 0 ? addressParts.join(", ") : undefined;
}

function createFreshnessLabel(lastConfirmedAt: string | null): string {
  return lastConfirmedAt
    ? "Listing confirmation date available"
    : "Listing confirmation not listed";
}
