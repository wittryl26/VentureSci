import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

let cached: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (cached) {
    return cached;
  }

  if (!env.supabaseUrl || !env.supabaseServiceKey) {
    return null;
  }

  cached = createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cached;
};
