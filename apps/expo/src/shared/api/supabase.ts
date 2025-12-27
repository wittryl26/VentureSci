import { createClient } from '@supabase/supabase-js';
import env from '../config/env';

export const supabaseClient = env.supabaseUrl
  ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;
