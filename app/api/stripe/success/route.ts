import { redirect } from 'next/navigation';
import { stripe } from '../../../../utils/stripe/config';
import { createClient } from '../../../../utils/supabase/server';
import { kv } from '../../../../utils/upstash/client';

export async function GET() {
  const supabase = await createClient();

  // Authenticate the user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Unauthorized access:', error);
  return redirect('/pricing');
  }

  // Retrieve the Stripe customer ID from KV
  const stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;

  if (!stripeCustomerId) {
    return redirect('/');
  }

  // Sync subscription data
  await syncStripeDataToKV(stripeCustomerId);

  // await 
  // TODO: set data in supabase db as well? why or why not?

  return redirect('/user'); // Change to the correct success destination
}

/**
 * Function to sync all of the data for a given Stripe customer to KV.
 * This will be used in both the /success endpoint and the /api/stripe webhook handler.
 */
 async function syncStripeDataToKV(customerId: string) {
  try {
    // Fetch latest subscription data from Stripe
    //TODO: see the response from this becuase of the two options that you get
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });
    console.log("🔍 check subscriptions", JSON.stringify(subscriptions, null, 2))

    if (subscriptions.data.length === 0) {
      const subData = { status: 'none' };
      await kv.set(`stripe:customer_id:${customerId}`, subData);
      return subData;
    }

    // If a user can have multiple subscriptions, handle that accordingly
    const subscription = subscriptions.data[0];

    // Store subscription details in KV
    const subData = {
      subscriptionId: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id, // TODO: see what this comes out to be??
      currentPeriodEnd: subscription.current_period_end, 
      currentPeriodStart: subscription.current_period_start,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      paymentMethod:
        subscription.default_payment_method &&
        typeof subscription.default_payment_method !== 'string'
          ? {
              brand: subscription.default_payment_method.card?.brand ?? null,
              last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : null,
    };
    console.log("📐 setting data in kv", JSON.stringify(subData, null, 2))
    

    await kv.set(`stripe:customer_id:${customerId}`, subData);
    return subData;
  } catch (error) {
    console.error('Error syncing Stripe data:', error);
    return { status: 'error' };
  }
}
