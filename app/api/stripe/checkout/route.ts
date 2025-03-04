import { NextRequest, NextResponse } from 'next/server';
import { getURL } from '../../../../utils/helpers';
import { stripe } from '../../../../utils/stripe/client';
import { createClient } from '../../../../utils/supabase/server';
import { kv } from '../../../../utils/upstash/client';

export async function POST(req: NextRequest) {
  // request here
  try {
    // const url = await getURL()
    const { isYearly } = await req.json(); // Parse JSON body to get isYearly
    console.log("isYearly:", isYearly);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log("⚠️ NO USER HERE")
      return NextResponse.json(
        { error: 'Unauthorized', redirectUrl: getURL("/signup") },
        { status: 401 }
      );
    }
    // Retrieve the Stripe customer ID from your KV store.
    let stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;
      console.log("current stripe customer", stripeCustomerId)

    // If the user does not yet have a Stripe customer, create one.
    if (!stripeCustomerId) {
      console.log("⚡ TRYING TO CREATE CUSTOMER")
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      await kv.set(`stripe:user_id:${user.id}`, newCustomer.id);
      stripeCustomerId = newCustomer.id;
    }

    // Determine which Stripe price ID to use based on isYearly
    const priceId = isYearly
      ? process.env.STRIPE_PRICE_YEARLY_ID
      : process.env.STRIPE_PRICE_MONTHLY_ID;

    if (!priceId) {
      throw new Error("Missing Stripe price ID");
    }


    const checkout = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: getURL("api/stripe/success"),
      cancel_url: getURL("/api/stripe/cancel"),
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
