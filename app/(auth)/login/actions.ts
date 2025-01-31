'use server';

import { revalidatePath } from 'next/cache';
// import { toast } from 'sonner';

// import { createClient } from '@/utils/supabase/server';
import { createClient } from '../../../utils/supabase/server';

export type AuthResponse = {
  error: string | null;
  success?: boolean;
};

export async function login(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  // Return success before redirect
  revalidatePath('/', 'layout');
  return { error: null, success: true };
}

// export async function login(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/account');
// }
