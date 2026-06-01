import {
  coercePublicText,
  getPublicProviderDetailPath,
  normalizeCategoryLabel,
  normalizePublicSlug,
} from "@/lib/public-listing-mappers";
import type { Facility } from "@/types/facility";
import type { PublicProviderCard } from "@/types/public-listings";
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
  | "client-unavailable";

type FacilitiesPublicReadErrorReason = "query-failed";

export type FacilityPublicDetailResult =
  | { status: "found"; source: "supabase"; facility: Facility }
  | { status: "not-found"; source: "supabase" }
  | { status: "unavailable"; source: "static-fallback" }
  | { status: "error"; source: "static-fallback" };

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

function createFreshnessLabel(lastConfirmedAt: string | null): string {
  return lastConfirmedAt
    ? "Listing confirmation date available"
    : "Listing confirmation not listed";
}

function mapSupabaseFacilityRowToFacility(row: SupabaseFacilityPublicRow): Facility {
  const locationLabel = createLocationLabel(row);
  const categoryLabel = normalizeCategoryLabel(
    row.category ?? row.facility_type,
    "facility",
  );

  return {
    id: row.id,
    slug: normalizePublicSlug(row.slug, row.id),
    name: coercePublicText(row.display_name, "Facility name not listed"),
    category: categoryLabel,
    subcategory: coercePublicText(row.description, "Details not listed"),
    services: [],
    location: locationLabel,
    address: coercePublicText(row.address_public, locationLabel),
    workingHours: "Hours not listed",
    verificationStatus: mapSupabaseFacilityVerificationStatus(row.verification_status),
    isOpen: false,
    availabilityNote: createFreshnessLabel(row.last_confirmed_at),
    contactActionLabel: "View details",
    directionsActionLabel: "Get directions",
  };
}

export async function getSupabasePublicFacilityBySlug(
  slug: string,
): Promise<FacilityPublicDetailResult> {
  const clientStatus = getSupabasePublicClientStatus();

  if (!clientStatus.isAvailable) {
    return { status: "unavailable", source: "static-fallback" };
  }

  const client = getSupabasePublicClient();

  if (!client) {
    return { status: "unavailable", source: "static-fallback" };
  }

  const { data, error } = await client
    .from("facilities")
    .select(FACILITIES_PUBLIC_SELECT)
    .eq("slug", slug)
    .eq("listing_status", "active")
    .eq("visibility_status", "public")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return { status: "not-found", source: "supabase" };
    }
    return { status: "error", source: "static-fallback" };
  }

  const row = data as unknown as SupabaseFacilityPublicRow;

  return {
    status: "found",
    source: "supabase",
    facility: mapSupabaseFacilityRowToFacility(row),
  };
}
