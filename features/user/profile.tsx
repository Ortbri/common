import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { createClient } from '../../utils/supabase/server';
import { InfoItem } from './InfoItem';
import { Subscription } from './subscription';

export default async function Profile() {
  // TODO: add a cache to the user query?
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (!profile) {
    redirect('/error');
  }

  const isAdmin = profile.role === 'admin';

  return (
    <div className="flex flex-col gap-3 px-4">
      {/* section 1 */}
      <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* only these need  */}
          <InfoItem label="Name" value={`${profile.first_name} ${profile.last_name}`} />
          <InfoItem label="Email" value={profile.email} />
          <InfoItem label="User ID" value={profile.user_id} />
          {isAdmin && <InfoItem label="Role" value={profile.role} />}
        </div>
        {isAdmin && (
          <div className="flex items-start pt-3">
            <Link href="/dashboard">
              <Button className="rounded-3xl">Admin Dashboard</Button>
            </Link>
          </div>
        )}
      </section>
      <Subscription />
    </div>
  );
}
