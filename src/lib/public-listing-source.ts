import {
  seedDiagnostics,
  seedDoctors,
  seedFacilities,
  seedLocations,
  seedPharmacies,
} from "@/data";
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

export type PublicListingSourceMode = "static";

export type PublicListingSourceStatus = {
  mode: PublicListingSourceMode;
  isStaticDefault: true;
  isSupabaseEnabled: false;
  note: string;
};

const STATIC_SOURCE_MODE: PublicListingSourceMode = "static";

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
  return STATIC_SOURCE_MODE;
}

export function getPublicListingSourceStatus(): PublicListingSourceStatus {
  return sourceStatus;
}

export function getPublicFacilityCards(): PublicProviderCard[] {
  return seedFacilities.map(mapSeedFacilityToPublicCard);
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
  return seedFacilities.map((facility) =>
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

export function isSupabasePublicListingSourceAvailable(): false {
  return false;
}
