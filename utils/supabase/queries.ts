import { SupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { createClient } from './server';


export async function getProfileQuery(supabase: SupabaseClient, user_id: string) {
  return supabase.from("profiles").select("*").eq("user_id", user_id).single();
}
export const getProfileCache = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return null;
  }

  return unstable_cache(
    async () => getProfileQuery(supabase, userId),
    ['profile', userId],
    {
      tags: [`profile_${userId}`],
      revalidate: 180,
    },
  )();
};




export const getProfile = cache(async (supabase: SupabaseClient) => {
  const { data: profile } = await supabase.from('profiles').select('*').single();
  return profile;
});



export const getUserCache = async () => {
//   const supabase = awcreateClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return null;
//   }

//   return user;
// };
