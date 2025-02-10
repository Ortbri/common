import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getAuth = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});


export const getProfile = cache(async (supabase: SupabaseClient) => {
  const { data: profile } = await supabase.from('profiles').select('*').single();
  return profile;
});

