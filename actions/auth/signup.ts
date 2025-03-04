"use server"
import { SignUpSchema } from "@/components/forms/signup/schema";
import { safeAction } from "@/utils/safe-action";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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