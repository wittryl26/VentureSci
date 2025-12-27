const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  streamChatKey: process.env.EXPO_PUBLIC_STREAM_CHAT_KEY ?? '',
};

export default env;
