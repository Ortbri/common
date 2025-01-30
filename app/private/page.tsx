import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

/**
 * this page is simply to test if auth is working to fetch the user
 *
 * It's safe to trust getUser()
 * because it sends a request to the Supabase Auth
 * server every time to revalidate the Auth token.
 */

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return <p>Hello {data.user.email}</p>;
}
