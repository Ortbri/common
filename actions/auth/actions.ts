'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { LoginSchema } from '../../components/forms/login';
import { SignUpSchema } from '../../components/forms/signup/schema';
import { safeAction } from '../../utils/safe-action';
import { createClient } from '../../utils/supabase/server';

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return {
      error: 'Email is required',
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return redirect('/auth/check-email');
}


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

  return { redirect: '/' }; // was using /browse as route
});



export const signupAction = safeAction(
  SignUpSchema,
  async ({ first_name, last_name, email, password }) => {
    const supabase = await createClient();

    // Sign up the user
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (signupError) {
      return { error: signupError.message || 'Error signing up' }; // Return signup error
    }

    // Immediately log the user in
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      return { error: loginError.message || 'Error logging in' }; // Return login error
    }

    revalidatePath('/', 'layout'); // Refresh cache if necessary

    // Return the session and redirect URL
    return { redirectTo: '/' }; // was using /browse
  }
);