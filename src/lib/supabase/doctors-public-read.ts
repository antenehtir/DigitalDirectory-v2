import {
  coercePublicText,
  getPublicProviderDetailPath,
  normalizePublicSlug,
} from "@/lib/public-listing-mappers";
import type { PublicProviderCard } from "@/types/public-listings";
import type { VerificationStatus } from "@/types/verification";

import {
  getSupabasePublicClient,
  getSupabasePublicClientStatus,
} from "./public-client";

const DOCTORS_PUBLIC_SELECT = [
  "id",
  "slug",
  "display_name",
  "title",
  "specialty",
  "subspecialty",
  "bio_public",
  "facility_name_public",
  "city",
  "area",
  "consultation_modes",
  "languages",
  "listing_status",
  "visibility_status",
  "verification_status",
  "last_confirmed_at",
].join(", ");

type SupabaseDoctorListingStatus =
  | "draft"
  | "pending"
  | "active"
  | "rejected"
  | "archived"
  | "suspended";

type SupabaseDoctorVisibilityStatus = "public" | "hidden" | "internal";

type SupabaseDoctorVerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "disputed"
  | "expired";

type SupabaseDoctorPublicRow = {
  id: string;
  slug: string;
  display_name: string;
  title: string | null;
  specialty: string;
  subspecialty: string | null;
  bio_public: string | null;
  facility_name_public: string | null;
  city: string | null;
  area: string | null;
  consultation_modes: string[] | null;
  languages: string[] | null;
  listing_status: SupabaseDoctorListingStatus;
  visibility_status: SupabaseDoctorVisibilityStatus;
  verification_status: SupabaseDoctorVerificationStatus;
  last_confirmed_at: string | null;
};

type DoctorsPublicReadUnavailableReason =
  | "missing-env"
  | "client-unavailable";

type DoctorsPublicReadErrorReason = "query-failed";

export type DoctorsPublicReadResult =
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
      reason: DoctorsPublicReadUnavailableReason;
      missingKeys: string[];
      message: string;
    }
  | {
      status: "error";
      source: "static-fallback";
      cards: [];
      fallbackRecommended: true;
      reason: DoctorsPublicReadErrorReason;
      errorCode: "DOCTORS_PUBLIC_READ_FAILED";
      message: string;
    };

export async function getSupabasePublicDoctorCards(): Promise<DoctorsPublicReadResult> {
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
        "Supabase public listing environment is unavailable. Use static doctor data.",
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
        "Supabase public client is unavailable. Use static doctor data.",
    };
  }

  const { data, error } = await client
    .from("doctors")
    .select(DOCTORS_PUBLIC_SELECT)
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
      errorCode: "DOCTORS_PUBLIC_READ_FAILED",
      message: "Supabase doctors public read failed. Use static doctor data.",
    };
  }

  const rows = (data ?? []) as unknown as SupabaseDoctorPublicRow[];

  return {
    status: "success",
    source: "supabase",
    cards: rows.map(mapSupabaseDoctorRowToPublicCard),
    fallbackRecommended: false,
  };
}

function mapSupabaseDoctorRowToPublicCard(
  row: SupabaseDoctorPublicRow,
): PublicProviderCard {
  const providerType = "doctor";
  const slug = normalizePublicSlug(row.slug, row.id);
  const specialty = coercePublicText(row.specialty, "Specialty not listed");
  const subspecialty = coercePublicText(row.subspecialty, "");
  const facility = coercePublicText(row.facility_name_public, "");
  const locationLabel = createLocationLabel(row);

  return {
    id: row.id,
    slug,
    name: createDoctorDisplayName(row),
    providerType,
    categoryLabel: specialty,
    summary: createSummary({ row, specialty, facility }),
    locationLabel,
    verificationStatus: mapSupabaseDoctorVerificationStatus(
      row.verification_status,
    ),
    listingHref: getPublicProviderDetailPath({
      id: row.id,
      slug,
      providerType,
    }),
    primaryActionLabel: "View profile",
    secondaryActionLabel: "Request booking preview",
    services: [],
    specialties: createSpecialtyList(specialty, subspecialty),
    affiliations: facility ? [facility] : [],
    availabilityPreview: createConsultationPreview(row.consultation_modes),
    telemedicinePreview: createTelemedicinePreview(row.consultation_modes),
  };
}

function createDoctorDisplayName(row: SupabaseDoctorPublicRow): string {
  const displayName = coercePublicText(row.display_name, "Doctor name not listed");
  const title = coercePublicText(row.title, "");

  if (!title) {
    return displayName;
  }

  if (displayName.toLowerCase().startsWith(title.toLowerCase())) {
    return displayName;
  }

  return `${title} ${displayName}`;
}

function createSummary(input: {
  row: SupabaseDoctorPublicRow;
  specialty: string;
  facility: string;
}): string {
  const bio = coercePublicText(input.row.bio_public, "");

  if (bio) {
    return bio;
  }

  if (input.facility) {
    return `${input.specialty} profile at ${input.facility}`;
  }

  return `${input.specialty} profile preview`;
}

function createLocationLabel(row: SupabaseDoctorPublicRow): string {
  const locationParts = [row.area, row.city]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part));

  return locationParts.length > 0
    ? locationParts.join(", ")
    : "Location not listed";
}

function createSpecialtyList(
  specialty: string,
  subspecialty: string,
): string[] {
  return [specialty, subspecialty].filter(
    (value, index, list): value is string =>
      Boolean(value) && list.indexOf(value) === index,
  );
}

function createConsultationPreview(
  consultationModes: string[] | null,
): string {
  const modes = createPublicTextList(consultationModes);

  return modes.length > 0
    ? `Consultation modes: ${modes.join(", ")}`
    : "Consultation modes not listed";
}

function createTelemedicinePreview(
  consultationModes: string[] | null,
): string {
  const hasTelemedicine = createPublicTextList(consultationModes).some((mode) =>
    mode.toLowerCase().includes("telemedicine"),
  );

  return hasTelemedicine
    ? "Telemedicine preview available"
    : "Telemedicine not listed";
}

function createPublicTextList(values: string[] | null): string[] {
  if (!values) {
    return [];
  }

  return values
    .map((value) => value.trim())
    .filter((value, index, list) => value && list.indexOf(value) === index);
}

function mapSupabaseDoctorVerificationStatus(
  status: SupabaseDoctorVerificationStatus,
): VerificationStatus {
  if (status === "verified") {
    return "verified";
  }

  if (status === "pending") {
    return "pending";
  }

  return "community-submitted";
}
