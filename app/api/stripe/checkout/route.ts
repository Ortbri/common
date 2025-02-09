import { NextResponse } from 'next/server';
import { stripe } from '../../../../utils/stripe/config';
import { createClient } from '../../../../utils/supabase/server';
import { kv } from '../../../../utils/upstash/client';

export async function GET() {
  const supabase = await createClient();

  // Get the authenticated user from Supabase.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json({ error: 'Error retrieving user' }, { status: 500 });
  }
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Retrieve the Stripe customer ID from your KV store.
  let stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;
  console.log('ran kv and got ?? =>', stripeCustomerId);

  // If the user does not yet have a Stripe customer, create one.
  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: { user_id: user.id },
    });
    await kv.set(`stripe:user_id:${user.id}`, newCustomer.id);
    console.log('👤 customer created and stored');
    stripeCustomerId = newCustomer.id;
  }

  // Create a checkout session using the Stripe customer ID.
  const checkout = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    mode: 'subscription', // or 'payment' for one-time charges
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID, // TODO:Your Stripe Price ID from env variables  process.env.STRIPE_PRICE_ID
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/cancel`,
  });

  return NextResponse.json({ url: checkout.url });
}
