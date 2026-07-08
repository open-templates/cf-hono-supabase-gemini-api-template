import { createClient } from "@supabase/supabase-js";
import { Env } from "@/types";

/**
 * Create a Supabase client with anon key (for user-authenticated requests)
 * Use this for operations that should respect user-level permissions
 */
export const getSupabaseUserClient = (env: Env) => {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Create a Supabase client with service role key (for admin operations)
 * Use this sparingly - only for operations that require admin privileges
 */
export const getSupabaseAdminClient = (env: Env) => {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Create a Supabase client with JWT token (for authenticated user requests)
 * Use this to verify and authenticate user requests
 */
export const getSupabaseClientWithJWT = (
  env: Env,
  accessToken: string
) => {
  const client = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  return client;
};
