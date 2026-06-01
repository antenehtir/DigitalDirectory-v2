import {
  seedDiagnostics,
  seedDoctors,
  seedFacilities,
  seedLocations,
  seedPharmacies,
} from "@/data";
import type { Facility } from "@/types/facility";
import type { SeedFacility } from "@/data/seed-types";
import {
  mapSeedDiagnosticsProviderToPublicCard,
  mapSeedDiagnosticsProviderToPublicDetail,
  mapSeedDoctorToPublicCard,
  mapSeedDoctorToPublicDetail,
  mapSeedFacilityToPublicCard,
  mapSeedFacilityToPublicDetail,
  mapSeedPharmacyToPublicCard,
  mapSeedPharmacyToPublicDetail,
} from "@/lib/public-listing-mappers";
import type {
  PublicProviderCard,
  PublicProviderDetail,
  PublicProviderType,
} from "@/types/public-listings";

export type PublicListingSourceMode =
  | "static"
  | "supabase-facilities-preview";

export type PublicListingSourceStatus = {
  mode: PublicListingSourceMode;
  isStaticDefault: boolean;
  isSupabaseEnabled: boolean;
  note: string;
};

export type PublicFacilityCardsSourceOptions = {
  mode?: PublicListingSourceMode;
};

export type PublicFacilityCardsSourceResult = {
  mode: PublicListingSourceMode;
  source: "static" | "supabase";
  cards: PublicProviderCard[];
  fallbackUsed: boolean;
  fallbackReason?:
    | "supabase-unavailable"
    | "supabase-error"
    | "supabase-empty";
  note: string;
};

const STATIC_SOURCE_MODE: PublicListingSourceMode = "static";
const SUPABASE_FACILITIES_SOURCE_MODE: PublicListingSourceMode =
  "supabase-facilities-preview";

function resolveListingModeFromEnv(): PublicListingSourceMode {
  const envMode = process.env.NEXT_PUBLIC_LISTING_MODE;
  if (envMode === SUPABASE_FACILITIES_SOURCE_MODE) {
    return SUPABASE_FACILITIES_SOURCE_MODE;
  }
  return STATIC_SOURCE_MODE;
}

const sourceStatus: PublicListingSourceStatus = {
  mode: STATIC_SOURCE_MODE,
  isStaticDefault: true,
  isSupabaseEnabled: false,
  note: "Static seed data is the active public listing source. Supabase reads are not connected yet.",
};

const locationsById = Object.fromEntries(
  seedLocations.map((location) => [location.id, location]),
);

export function getPublicListingSourceMode(): PublicListingSourceMode {
  return resolveListingModeFromEnv();
}

export function getActiveFacilitySourceMode(): PublicListingSourceMode {
  return resolveListingModeFromEnv();
}

export function getPublicListingSourceStatus(): PublicListingSourceStatus {
  return sourceStatus;
}

export function getPublicFacilityCards(): PublicProviderCard[] {
  return (seedFacilities as SeedFacility[]).map(mapSeedFacilityToPublicCard);
}

export async function getPublicFacilityCardsFromSource(
  options: PublicFacilityCardsSourceOptions = {},
): Promise<PublicFacilityCardsSourceResult> {
  const mode = options.mode ?? STATIC_SOURCE_MODE;
  const staticCards = getPublicFacilityCards();

  if (mode !== SUPABASE_FACILITIES_SOURCE_MODE) {
    return {
      mode: STATIC_SOURCE_MODE,
      source: "static",
      cards: staticCards,
      fallbackUsed: false,
      note: "Static facility seed data returned by default.",
    };
  }

  const { getSupabasePublicFacilityCards } = await import(
    "./supabase/facilities-public-read"
  );
  const supabaseResult = await getSupabasePublicFacilityCards();

  if (supabaseResult.status !== "success") {
    return {
      mode,
      source: "static",
      cards: staticCards,
      fallbackUsed: true,
      fallbackReason:
        supabaseResult.status === "unavailable"
          ? "supabase-unavailable"
          : "supabase-error",
      note: "Static facility seed data returned because Supabase facilities are unavailable.",
    };
  }

  if (supabaseResult.cards.length === 0) {
    return {
      mode,
      source: "static",
      cards: staticCards,
      fallbackUsed: true,
      fallbackReason: "supabase-empty",
      note: "Static facility seed data returned because Supabase facilities returned no cards.",
    };
  }

  return {
    mode,
    source: "supabase",
    cards: supabaseResult.cards,
    fallbackUsed: false,
    note: "Supabase active/public facility cards returned for explicit preview mode.",
  };
}

export function getPublicDoctorCards(): PublicProviderCard[] {
  return seedDoctors.map(mapSeedDoctorToPublicCard);
}

export function getPublicPharmacyCards(): PublicProviderCard[] {
  return seedPharmacies.map(mapSeedPharmacyToPublicCard);
}

export function getPublicDiagnosticsCards(): PublicProviderCard[] {
  return seedDiagnostics.map(mapSeedDiagnosticsProviderToPublicCard);
}

export function getAllPublicProviderCards(): PublicProviderCard[] {
  return [
    ...getPublicFacilityCards(),
    ...getPublicDoctorCards(),
    ...getPublicPharmacyCards(),
    ...getPublicDiagnosticsCards(),
  ];
}

export function getPublicFacilityDetails(): PublicProviderDetail[] {
  return (seedFacilities as SeedFacility[]).map((facility) =>
    mapSeedFacilityToPublicDetail(facility, { locationsById }),
  );
}

export function getPublicDoctorDetails(): PublicProviderDetail[] {
  return seedDoctors.map((doctor) =>
    mapSeedDoctorToPublicDetail(doctor, { locationsById }),
  );
}

export function getPublicPharmacyDetails(): PublicProviderDetail[] {
  return seedPharmacies.map((pharmacy) =>
    mapSeedPharmacyToPublicDetail(pharmacy, { locationsById }),
  );
}

export function getPublicDiagnosticsDetails(): PublicProviderDetail[] {
  return seedDiagnostics.map((diagnosticsProvider) =>
    mapSeedDiagnosticsProviderToPublicDetail(diagnosticsProvider, {
      locationsById,
    }),
  );
}

export function getPublicProviderCardsByType(
  providerType: PublicProviderType,
): PublicProviderCard[] {
  if (providerType === "facility") {
    return getPublicFacilityCards();
  }

  if (providerType === "doctor") {
    return getPublicDoctorCards();
  }

  if (providerType === "pharmacy") {
    return getPublicPharmacyCards();
  }

  return getPublicDiagnosticsCards();
}

export function isSupabasePublicListingSourceAvailable(
  mode: PublicListingSourceMode = STATIC_SOURCE_MODE,
): boolean {
  return mode === SUPABASE_FACILITIES_SOURCE_MODE;
}

export async function getPublicFacilityBySlugFromSource(
  slug: string,
): Promise<Facility | null> {
  const mode = resolveListingModeFromEnv();

  if (mode === SUPABASE_FACILITIES_SOURCE_MODE) {
    const { getSupabasePublicFacilityBySlug } = await import(
      "./supabase/facilities-public-read"
    );
    const result = await getSupabasePublicFacilityBySlug(slug);
    if (result.status === "found") {
      return result.facility;
    }
  }

  const seedFacility = seedFacilities.find((f) => f.slug === slug);
  return seedFacility ?? null;
}
