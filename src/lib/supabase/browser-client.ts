import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseBrowserEnv } from "./env";

let supabaseBrowserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const env = getSupabaseBrowserEnv();

  if (!env.isAvailable) {
    return null;
  }

  if (supabaseBrowserClient) {
    return supabaseBrowserClient;
  }

  supabaseBrowserClient = createClient(env.url, env.anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabaseBrowserClient;
}

export function getSupabaseBrowserClientStatus():
  | { isAvailable: true; missingKeys: [] }
  | { isAvailable: false; missingKeys: string[] } {
  const env = getSupabaseBrowserEnv();

  if (!env.isAvailable) {
    return {
      isAvailable: false,
      missingKeys: env.missingKeys,
    };
  }

  return {
    isAvailable: true,
    missingKeys: [],
  };
}
