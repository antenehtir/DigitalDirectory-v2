import type { Doctor } from "@/types/doctor";
import type { Facility } from "@/types/facility";
import type { VerificationStatus } from "@/types/verification";

export type SeedSourceType = "sample" | "future-migration-ready";

export type SeedListingStatus =
  | "published-sample"
  | "draft-sample"
  | "hidden-sample";

export type SeedReviewStatus =
  | "sample-only"
  | "needs-review"
  | "ready-for-future-review";

export type SeedProviderType =
  | "facility"
  | "doctor"
  | "pharmacy"
  | "diagnostics";

export type SeedLocationType = "country" | "city" | "area";

export type SeedServiceCategory =
  | "facility"
  | "doctor"
  | "pharmacy"
  | "diagnostics"
  | "general";

export type SeedCommunityChannelType =
  | "Telegram"
  | "LinkedIn"
  | "Facebook"
  | "Instagram"
  | "TikTok"
  | "Email"
  | "WhatsApp";

export type SeedTrustFields = {
  sourceType: SeedSourceType;
  listingStatus: SeedListingStatus;
  reviewStatus: SeedReviewStatus;
  verificationNote: string;
};

export type SeedFacility = Facility &
  SeedTrustFields & {
    providerType: "facility";
    locationId: string;
    serviceIds: string[];
    specialtyIds: string[];
  };

export type SeedDoctor = Doctor &
  SeedTrustFields & {
    providerType: "doctor";
    locationId: string;
    specialtyIds: string[];
    affiliatedFacilityIds: string[];
  };

export type SeedPharmacy = Facility &
  SeedTrustFields & {
    providerType: "pharmacy";
    locationId: string;
    serviceIds: string[];
    pickupAvailablePreview: boolean;
    deliveryReadyPreview: boolean;
  };

export type SeedDiagnosticsProvider = Facility &
  SeedTrustFields & {
    providerType: "diagnostics";
    locationId: string;
    serviceIds: string[];
    diagnosticsType: "laboratory" | "imaging" | "mixed";
  };

export type SeedService = {
  id: string;
  slug: string;
  name: string;
  category: SeedServiceCategory;
  description: string;
  aliases: string[];
  relatedSpecialtyIds: string[];
  reviewStatus: SeedReviewStatus;
};

export type SeedSpecialty = {
  id: string;
  slug: string;
  name: string;
  description: string;
  aliases: string[];
  parentSpecialtyId?: string;
  isFeatured: boolean;
  reviewStatus: SeedReviewStatus;
};

export type SeedLocation = {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  locationType: SeedLocationType;
  parentLocationId?: string;
  isPublic: boolean;
  coordinatesPreview?: {
    latitude: number;
    longitude: number;
  };
};

export type SeedCommunityChannel = {
  id: string;
  channelType: SeedCommunityChannelType;
  label: string;
  name: string;
  href: "#";
  purpose: string;
  description: string;
  audience: string;
  isPublic: boolean;
  isOfficial: false;
  displayOrder: number;
};

export type SeedVerificationReference = {
  status: VerificationStatus;
  publicMeaning: string;
  sampleOnlyNote: string;
};
