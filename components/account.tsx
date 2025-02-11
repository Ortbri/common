// 'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useSubscription } from '../hooks/useSubscription';
import { createClient } from '../utils/supabase/server';
import { Button } from './ui/button';

interface InfoItemProps {
  label: string;
  value: string;
}
/* -------------------------------------------------------------------------- */
/*                                account page                                */
/* -------------------------------------------------------------------------- */
export default async function AccountPage() {
  // const isAdmin = user.role === 'admin';
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
      <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoItem label="Name" value={`${profile.first_name} ${profile.last_name}`} />
          <InfoItem label="Email" value={profile.email} />
          <InfoItem label="User ID" value={profile.user_id} />
          {isAdmin && <InfoItem label="Role" value={profile.role} />}
        </div>
        {isAdmin && (
          <div className="flex items-start pt-3">
            <Link href="/dashboard">
              <Button>Admin Dashboard</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              subscription info                             */
/* -------------------------------------------------------------------------- */

function SubscriptionSection() {
  const { data } = useSubscription();

  return (
    <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
      <h2 className="text-2xl font-semibold">Subscription Info</h2>
      <div className="rounded-3xl">
        {data?.subscriptionData && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem label="Status" value={data.subscriptionData.status} />
            {data.subscriptionData.status !== 'none' && (
              <>
                <InfoItem label="Plan" value={data.subscriptionData.priceId || 'N/A'} />
                {data.subscriptionData.paymentMethod && (
                  <InfoItem
                    label="Payment Method"
                    value={`${data.subscriptionData.paymentMethod.brand} ending in ${data.subscriptionData.paymentMethod.last4}`}
                  />
                )}
                <InfoItem
                  label="Renewal Date"
                  value={
                    data.subscriptionData.currentPeriodEnd
                      ? new Date(data.subscriptionData.currentPeriodEnd * 1000).toLocaleDateString()
                      : 'N/A'
                  }
                />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
