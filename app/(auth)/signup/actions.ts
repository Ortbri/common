import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('fullName') as string,
      },
    },
  });

  if (error) {
    console.error('Error signing up:', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
