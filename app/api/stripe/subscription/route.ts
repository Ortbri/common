import { NextResponse } from 'next/server';

import { createClient } from '../../../../utils/supabase/server';
import { kv } from '../../../../utils/upstash/client';
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Retrieve the Stripe customer ID from KV
    const stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;
    if (!stripeCustomerId) {
      return NextResponse.json({ success: false, error: 'No Stripe customer found' });
    }

    // Retrieve the user's Stripe subscription data from KV
    const subscriptionData = await kv.get(`stripe:customer_id:${stripeCustomerId}`);

    return NextResponse.json({
      success: true,
      stripeCustomerId,
      subscriptionData,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown Error';
    console.error('Error accessing KV store:', errMsg);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
