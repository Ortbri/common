'use server';

import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: authData } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error ? error.message : 'Error not typed' };
  }
  // create stripe customer?

  if (authData.user?.identities?.length === 0) {
    return {
      error: null,
      needsEmailVerification: true,
    };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

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
