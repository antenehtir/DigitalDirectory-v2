import type {
  Facility,
  FacilityContactChannel,
  FacilityContactChannelType,
} from "@/types/facility";

import extractedFacilityProfiles from "../../docs/data-intake/simple-facility-profiles/tiru-med-directory-facility-profiles.simple.json";

type ExtractedFacilityProfile = {
  record_number: number;
  name: string;
  category: string;
  specialty_or_services: string;
  special_services: string;
  sub_city: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  website: string;
  telegram: string;
  whatsapp: string;
  booking: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  google_maps: string;
  raw_text: string;
  extraction_notes: string;
};

type ExtractedFacilityProfilesPayload = {
  records: ExtractedFacilityProfile[];
};

export type RealFacilityProfile = ExtractedFacilityProfile & {
  slug: string;
};

const extractedRecords = (
  extractedFacilityProfiles as ExtractedFacilityProfilesPayload
).records;

const baseSlugCounts = extractedRecords.reduce<Map<string, number>>(
  (counts, record) => {
    const baseSlug = createBaseSlug(record.name, record.record_number);
    counts.set(baseSlug, (counts.get(baseSlug) ?? 0) + 1);
    return counts;
  },
  new Map(),
);

export const realFacilityProfiles: RealFacilityProfile[] = extractedRecords.map(
  (record) => {
    const baseSlug = createBaseSlug(record.name, record.record_number);
    const slug =
      (baseSlugCounts.get(baseSlug) ?? 0) > 1
        ? `${baseSlug}-${record.record_number}`
        : baseSlug;

    return {
      ...record,
      slug,
    };
  },
);

export const realFacilities: Facility[] = realFacilityProfiles.map(
  mapRealFacilityProfileToFacility,
);

const realFacilitiesBySlug = new Map(
  realFacilities.map((facility) => [facility.slug, facility]),
);

export function getRealFacilityBySlug(slug: string): Facility | undefined {
  return realFacilitiesBySlug.get(slug.trim().toLowerCase());
}

export function getSimilarRealFacilities(
  facility: Facility,
  limit = 3,
): Facility[] {
  const sameCategory = realFacilities.filter(
    (candidate) =>
      candidate.slug !== facility.slug && candidate.category === facility.category,
  );
  const otherFacilities = realFacilities.filter(
    (candidate) =>
      candidate.slug !== facility.slug && candidate.category !== facility.category,
  );

  return [...sameCategory, ...otherFacilities].slice(0, limit);
}

function mapRealFacilityProfileToFacility(
  profile: RealFacilityProfile,
): Facility {
  const services = getFacilityServices(profile);
  const location = [profile.area, profile.sub_city].filter(Boolean).join(", ");
  const hasHours = Boolean(profile.hours);
  const hasPhone = Boolean(profile.phone);
  const hasMap = Boolean(profile.google_maps);

  return {
    id: `real-facility-${profile.record_number}`,
    name: profile.name,
    slug: profile.slug,
    category: profile.category,
    subcategory: profile.specialty_or_services || profile.category,
    services,
    location: location || profile.address,
    address: profile.address,
    workingHours: hasHours
      ? profile.hours
      : "Contact provider for current hours.",
    verificationStatus: "community-submitted",
    isOpen: profile.hours.trim().toLowerCase() === "24/7",
    availabilityNote: hasHours ? "See listed hours." : "Hours vary by service.",
    contactActionLabel: hasPhone ? "Call provider" : "Contact provider",
    directionsActionLabel: hasMap ? "Open map" : "View location",
    contactChannels: createFacilityContactChannels(profile),
    detailHref: `/facilities/${profile.slug}`,
  };
}

function getFacilityServices(profile: RealFacilityProfile): string[] {
  const values = [
    ...splitList(profile.specialty_or_services),
    ...splitList(profile.special_services),
  ];
  const uniqueValues = Array.from(new Set(values));

  return uniqueValues.length > 0 ? uniqueValues : [profile.category];
}

function createFacilityContactChannels(
  profile: RealFacilityProfile,
): FacilityContactChannel[] {
  const channels: FacilityContactChannel[] = [];

  addChannel(channels, profile, "phone", "Phone", profile.phone, getPhoneHref);
  addChannel(channels, profile, "email", "Email", profile.email, getEmailHref);
  addChannel(channels, profile, "website", "Website", profile.website, getWebHref);
  addChannel(
    channels,
    profile,
    "social",
    "Telegram",
    profile.telegram,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "whatsapp",
    "WhatsApp",
    profile.whatsapp,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "appointment",
    "Booking",
    profile.booking,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "social",
    "Facebook",
    profile.facebook,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "social",
    "Instagram",
    profile.instagram,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "social",
    "TikTok",
    profile.tiktok,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "social",
    "LinkedIn",
    profile.linkedin,
    getWebHref,
  );
  addChannel(
    channels,
    profile,
    "maps",
    "Google Maps",
    profile.google_maps,
    getWebHref,
  );

  return channels;
}

function addChannel(
  channels: FacilityContactChannel[],
  profile: RealFacilityProfile,
  channelType: FacilityContactChannelType,
  label: string,
  value: string,
  getHref: (value: string) => string | undefined,
) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return;
  }

  channels.push({
    id: `${profile.slug}-${label.toLowerCase().replace(/\s+/g, "-")}`,
    channelType,
    label,
    value: normalizedValue,
    href: getHref(normalizedValue),
  });
}

function createBaseSlug(name: string, recordNumber: number): string {
  const slug = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `facility-${recordNumber}`;
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getPhoneHref(value: string): string | undefined {
  const firstPhone = value
    .split(/[\/|,;]/)
    .map((phone) => phone.trim())
    .find(Boolean);

  if (!firstPhone) {
    return undefined;
  }

  const telValue = firstPhone.replace(/[^\d+]/g, "");
  return telValue ? `tel:${telValue}` : undefined;
}

function getEmailHref(value: string): string | undefined {
  return value.includes("@") ? `mailto:${value}` : undefined;
}

function getWebHref(value: string): string | undefined {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (/^[\w.-]+\.[a-z]{2,}/i.test(value)) {
    return `https://${value}`;
  }

  return undefined;
}
