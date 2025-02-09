'use server';

import { revalidatePath } from 'next/cache';
import { SignUpSchema } from '../../../components/forms/signup/schema';
import { safeAction } from '../../../utils/safe-action';
import { createClient } from '../../../utils/supabase/server';

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

// export async function signup(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   const { error, data: authData } = await supabase.auth.signUp(data);

//   if (error) {
//     return { error: error ? error.message : 'Error not typed' };
//   }
//   // create stripe customer?

//   if (authData.user?.identities?.length === 0) {
//     return {
//       error: null,
//       needsEmailVerification: true,
//     };
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }

// export async function signup(formData: FormData) {
//   const supabase = await createClient();

//   const { error } = await supabase.auth.signUp({
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//     options: {
//       data: {
//         full_name: formData.get('fullName') as string,
//       },
//     },
//   });

//   if (error) {
//     console.error('Error signing up:', error);
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }
