// import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
// import AccountPage from '../../components/account';
import { createClient } from '../../utils/supabase/server';
// import AccountPage from './account-page';

export default async function UserPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user?.id) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', auth.user.id)
    .single();

  if (!profile) {
    redirect('/error');
  }

  // return <AccountPage user={profile} />;
  return <div></div>;
}
