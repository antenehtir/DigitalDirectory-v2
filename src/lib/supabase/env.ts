type SupabasePublicEnvKey =
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY";

type AvailableSupabaseBrowserEnv = {
  isAvailable: true;
  url: string;
  anonKey: string;
  missingKeys: [];
};

type UnavailableSupabaseBrowserEnv = {
  isAvailable: false;
  url: null;
  anonKey: null;
  missingKeys: SupabasePublicEnvKey[];
};

export type SupabaseBrowserEnv =
  | AvailableSupabaseBrowserEnv
  | UnavailableSupabaseBrowserEnv;

export function getSupabaseBrowserEnv(): SupabaseBrowserEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  const missingKeys: SupabasePublicEnvKey[] = [];

  if (!url) {
    missingKeys.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!anonKey) {
    missingKeys.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  if (missingKeys.length > 0) {
    return {
      isAvailable: false,
      url: null,
      anonKey: null,
      missingKeys,
    };
  }

  return {
    isAvailable: true,
    url,
    anonKey,
    missingKeys: [],
  };
}

export function isSupabaseBrowserEnvAvailable(): boolean {
  return getSupabaseBrowserEnv().isAvailable;
}
