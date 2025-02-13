import { NextResponse } from 'next/server';
import { stripe } from '../../../../utils/stripe/config';
import { createClient } from '../../../../utils/supabase/server';
import { kv } from '../../../../utils/upstash/client';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Return a proper JSON response instead of redirecting in an API route
      return NextResponse.json(
        { error: 'Unauthorized', redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/signup` },
        { status: 401 }
      );
    }

    // Retrieve the Stripe customer ID from your KV store.
    let stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;

    // If the user does not yet have a Stripe customer, create one.
    if (!stripeCustomerId) {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      await kv.set(`stripe:user_id:${user.id}`, newCustomer.id);
      stripeCustomerId = newCustomer.id;
    }

    // Create a checkout session using the Stripe customer ID.
    const checkout = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/cancel`,
    });

    if (!checkout.url) {
      throw new Error("Could not create checkout session");
    }

    // Return JSON instead of redirecting directly (so client can handle it)
    return NextResponse.json({ url: checkout.url });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "unkown error";
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message:errorMessage },
      { status: 500 }
    );
  }
}
