import {
  getSupabasePublicClient,
  getSupabasePublicClientStatus,
} from "./public-client";

const PROVIDER_CONTACT_CHANNELS_PUBLIC_SELECT = [
  "id",
  "provider_type",
  "provider_slug",
  "channel_type",
  "label",
  "value_public",
  "url_public",
  "is_primary",
  "display_order",
  "listing_status",
  "visibility_status",
  "verification_status",
  "last_confirmed_at",
].join(", ");

export type PublicProviderContactChannelProviderType =
  | "facility"
  | "doctor"
  | "pharmacy"
  | "diagnostic"
  | "telemedicine"
  | "ambulance"
  | "home_care";

export type PublicProviderContactChannelType =
  | "phone"
  | "whatsapp"
  | "telegram"
  | "website"
  | "email"
  | "maps"
  | "appointment"
  | "habaridoc"
  | "emergency"
  | "social";

type SupabaseProviderContactChannelListingStatus =
  | "draft"
  | "pending"
  | "active"
  | "rejected"
  | "archived"
  | "suspended";

type SupabaseProviderContactChannelVisibilityStatus =
  | "public"
  | "hidden"
  | "internal";

type SupabaseProviderContactChannelVerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "disputed"
  | "expired";

type SupabaseProviderContactChannelPublicRow = {
  id: string;
  provider_type: PublicProviderContactChannelProviderType;
  provider_slug: string;
  channel_type: PublicProviderContactChannelType;
  label: string | null;
  value_public: string | null;
  url_public: string | null;
  is_primary: boolean;
  display_order: number;
  listing_status: SupabaseProviderContactChannelListingStatus;
  visibility_status: SupabaseProviderContactChannelVisibilityStatus;
  verification_status: SupabaseProviderContactChannelVerificationStatus;
  last_confirmed_at: string | null;
};

export type PublicProviderContactChannel = {
  id: string;
  providerType: PublicProviderContactChannelProviderType;
  providerSlug: string;
  channelType: PublicProviderContactChannelType;
  label: string;
  valuePublic: string;
  urlPublic?: string;
  isPrimary: boolean;
  displayOrder: number;
  verificationStatus: SupabaseProviderContactChannelVerificationStatus;
  lastConfirmedAt?: string;
};

type ProviderContactChannelsPublicReadUnavailableReason =
  | "missing-env"
  | "client-unavailable"
  | "invalid-provider-type"
  | "invalid-provider-slug";

type ProviderContactChannelsPublicReadErrorReason = "query-failed";

type ProviderContactChannelsPublicReadSafeErrorCode =
  | "PROVIDER_CONTACT_CHANNELS_PUBLIC_READ_FAILED"
  | "PROVIDER_CONTACT_CHANNELS_PUBLIC_NETWORK_OR_FETCH_FAILED"
  | "PROVIDER_CONTACT_CHANNELS_PUBLIC_PERMISSION_DENIED"
  | "PROVIDER_CONTACT_CHANNELS_PUBLIC_SCHEMA_UNAVAILABLE"
  | "PROVIDER_CONTACT_CHANNELS_PUBLIC_COLUMN_MISMATCH";

export type ProviderContactChannelsPublicReadResult =
  | {
      status: "success";
      source: "supabase";
      channels: PublicProviderContactChannel[];
      fallbackRecommended: false;
    }
  | {
      status: "unavailable";
      source: "static-fallback";
      channels: [];
      fallbackRecommended: true;
      reason: ProviderContactChannelsPublicReadUnavailableReason;
      missingKeys: string[];
      message: string;
    }
  | {
      status: "error";
      source: "static-fallback";
      channels: [];
      fallbackRecommended: true;
      reason: ProviderContactChannelsPublicReadErrorReason;
      errorCode: ProviderContactChannelsPublicReadSafeErrorCode;
      message: string;
    };

const providerTypes: PublicProviderContactChannelProviderType[] = [
  "facility",
  "doctor",
  "pharmacy",
  "diagnostic",
  "telemedicine",
  "ambulance",
  "home_care",
];

export async function getSupabasePublicProviderContactChannels(
  providerType: string,
  providerSlug: string,
): Promise<ProviderContactChannelsPublicReadResult> {
  const requestedProviderType = providerType.trim();
  const requestedProviderSlug = providerSlug.trim();

  if (!isPublicProviderContactChannelProviderType(requestedProviderType)) {
    return {
      status: "unavailable",
      source: "static-fallback",
      channels: [],
      fallbackRecommended: true,
      reason: "invalid-provider-type",
      missingKeys: [],
      message:
        "Provider contact channel provider type is unavailable. Use static or empty contact channel data.",
    };
  }

  if (!requestedProviderSlug) {
    return {
      status: "unavailable",
      source: "static-fallback",
      channels: [],
      fallbackRecommended: true,
      reason: "invalid-provider-slug",
      missingKeys: [],
      message:
        "Provider contact channel provider slug is unavailable. Use static or empty contact channel data.",
    };
  }

  const clientStatus = getSupabasePublicClientStatus();

  if (!clientStatus.isAvailable) {
    return {
      status: "unavailable",
      source: "static-fallback",
      channels: [],
      fallbackRecommended: true,
      reason: "missing-env",
      missingKeys: clientStatus.missingKeys,
      message:
        "Supabase public listing environment is unavailable. Use static or empty contact channel data.",
    };
  }

  const client = getSupabasePublicClient();

  if (!client) {
    return {
      status: "unavailable",
      source: "static-fallback",
      channels: [],
      fallbackRecommended: true,
      reason: "client-unavailable",
      missingKeys: [],
      message:
        "Supabase public client is unavailable. Use static or empty contact channel data.",
    };
  }

  const { data, error } = await client
    .from("provider_contact_channels")
    .select(PROVIDER_CONTACT_CHANNELS_PUBLIC_SELECT)
    .eq("provider_type", requestedProviderType)
    .eq("provider_slug", requestedProviderSlug)
    .eq("listing_status", "active")
    .eq("visibility_status", "public")
    .order("display_order", { ascending: true })
    .order("channel_type", { ascending: true });

  if (error) {
    return {
      status: "error",
      source: "static-fallback",
      channels: [],
      fallbackRecommended: true,
      reason: "query-failed",
      errorCode: getSafeProviderContactChannelsPublicReadErrorCode(error),
      message:
        "Supabase provider contact channels public read failed. Use static or empty contact channel data.",
    };
  }

  const rows = (data ?? []) as unknown as SupabaseProviderContactChannelPublicRow[];

  return {
    status: "success",
    source: "supabase",
    channels: rows.map(mapSupabaseProviderContactChannelRow),
    fallbackRecommended: false,
  };
}

function isPublicProviderContactChannelProviderType(
  value: string,
): value is PublicProviderContactChannelProviderType {
  return providerTypes.includes(
    value as PublicProviderContactChannelProviderType,
  );
}

function mapSupabaseProviderContactChannelRow(
  row: SupabaseProviderContactChannelPublicRow,
): PublicProviderContactChannel {
  return {
    id: row.id,
    providerType: row.provider_type,
    providerSlug: row.provider_slug,
    channelType: row.channel_type,
    label: coercePublicContactChannelText(row.label, row.channel_type),
    valuePublic: coercePublicContactChannelText(
      row.value_public,
      "Contact detail not listed",
    ),
    urlPublic: coerceOptionalPublicText(row.url_public),
    isPrimary: row.is_primary,
    displayOrder: row.display_order,
    verificationStatus: row.verification_status,
    lastConfirmedAt: coerceOptionalPublicText(row.last_confirmed_at),
  };
}

function coercePublicContactChannelText(
  value: string | null,
  fallback: string,
): string {
  const normalizedValue = value?.trim();
  return normalizedValue || fallback;
}

function coerceOptionalPublicText(value: string | null): string | undefined {
  const normalizedValue = value?.trim();
  return normalizedValue || undefined;
}

function getSafeProviderContactChannelsPublicReadErrorCode(
  error: unknown,
): ProviderContactChannelsPublicReadSafeErrorCode {
  const text = getSafeErrorSearchText(error);

  if (
    text.includes("fetch failed") ||
    text.includes("failed to fetch") ||
    text.includes("network")
  ) {
    return "PROVIDER_CONTACT_CHANNELS_PUBLIC_NETWORK_OR_FETCH_FAILED";
  }

  if (text.includes("permission denied")) {
    return "PROVIDER_CONTACT_CHANNELS_PUBLIC_PERMISSION_DENIED";
  }

  if (text.includes("could not find") || text.includes("schema cache")) {
    return "PROVIDER_CONTACT_CHANNELS_PUBLIC_SCHEMA_UNAVAILABLE";
  }

  if (text.includes("column")) {
    return "PROVIDER_CONTACT_CHANNELS_PUBLIC_COLUMN_MISMATCH";
  }

  return "PROVIDER_CONTACT_CHANNELS_PUBLIC_READ_FAILED";
}

function getSafeErrorSearchText(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "";
  }

  const safeFields = ["message", "details", "hint", "code"] as const;
  const record = error as Partial<Record<(typeof safeFields)[number], unknown>>;

  return safeFields
    .map((field) => record[field])
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
}
