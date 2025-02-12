
import { SupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { createClient } from './server';

// Optimized function: Fetch & Cache Auth User ID (Lightweight)
export const getAuthUserId = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
});

// Optimized function: Fetch & Cache Full Profile (Only When Needed)
export async function getProfileQuery(supabase: SupabaseClient, user_id: string) {
  return supabase.from("profiles").select("*").eq("user_id", user_id).single();
}

export const getProfileCache = async () => {
  const userId = await getAuthUserId(); // Fetch auth once, avoid duplication

  if (!userId) return null;

  return unstable_cache(
    async () => {
      const supabase = await createClient(); // Create client only when needed
      return getProfileQuery(supabase, userId);
    },
    ['profile', userId],
    { tags: [`profile_${userId}`], revalidate: 180 }
  )();
};

/// REAL TIME FETCH
export const getProfile = async () => {
  const supabase = await createClient();
  const { data: profile } = await supabase.from('profiles').select('*').single();
  return profile;
};

