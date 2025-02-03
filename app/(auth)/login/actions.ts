// actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { LoginSchema } from '../../../components/forms/login';
import { safeAction } from '../../../utils/safe-action';
import { createClient } from '../../../utils/supabase/server';

export const loginAction = safeAction(LoginSchema, async ({ email, password }) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Revalidate the path to update server components with new auth state
  revalidatePath('/', 'layout');

  return { redirect: '/browse' };
});
