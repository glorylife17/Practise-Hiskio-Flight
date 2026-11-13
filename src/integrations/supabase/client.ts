import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

// Browser-safe values only: the URL and the publishable key (RLS-gated).
// Set them in .env locally and in the Vercel project's environment variables.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const missing = [
    ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL"] : []),
    ...(!SUPABASE_PUBLISHABLE_KEY ? ["VITE_SUPABASE_PUBLISHABLE_KEY"] : []),
  ];
  const message = `Missing Supabase environment variable(s): ${missing.join(", ")}.`;
  console.error(`[Supabase] ${message}`);
  throw new Error(message);
}

// New Supabase API keys (sb_publishable_*) are opaque strings, not bearer JWTs:
// send them as `apikey` and never as `Authorization: Bearer <key>`.
const supabaseFetch: typeof fetch = (input, init) => {
  const headers = new Headers(input instanceof Request ? input.headers : undefined);
  if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  if (
    SUPABASE_PUBLISHABLE_KEY.startsWith("sb_") &&
    headers.get("Authorization") === `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
  ) {
    headers.delete("Authorization");
  }
  headers.set("apikey", SUPABASE_PUBLISHABLE_KEY);
  return fetch(input, { ...init, headers });
};

// The single Supabase client for the app. Import it like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: { fetch: supabaseFetch },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
