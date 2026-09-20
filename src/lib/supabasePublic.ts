import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// الموقع مستضاف Static (GitHub Pages، بدون سيرفر) — المفتاح ده anon عام بالتصميم ومحمي بقواعد RLS
// جوه Supabase نفسه (راجع supabase/schema.sql)، مش سري زي service_role. آمن إنه يتحط في كود المتصفح.
let client: SupabaseClient<any, "public", any> | undefined;

export function getSupabasePublic(): SupabaseClient<any, "public", any> {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  client = createClient<any, "public", any>(url, anonKey, {
    auth: { persistSession: false },
  });

  return client;
}
