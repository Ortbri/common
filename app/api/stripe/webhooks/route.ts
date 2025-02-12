import { waitUntil } from '@vercel/functions';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '../../../../utils/stripe/config';
import { kv } from '../../../../utils/upstash/client';

const allowedEvents: Stripe.Event.Type[] = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.pending_update_applied',
  'customer.subscription.pending_update_expired',
  'customer.subscription.trial_will_end',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.payment_action_required',
  'invoice.upcoming',
  'invoice.marked_uncollectible',
  'invoice.payment_succeeded',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.canceled',
];

 async function tryCatch<T>(promise: Promise<T>): Promise<{ result?: T; error?: unknown }> {
  try {
    const result = await promise;
    return { result };
  } catch (error) {
    return { error };
  }
}
/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature');

  if (!signature) return NextResponse.json({}, { status: 400 });

  async function doEventProcessing() {
    if (typeof signature !== 'string') {
      throw new Error("[STRIPE HOOK] Header isn't a string???");
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_LOCAL!
    );

    waitUntil(processEvent(event));
  }

  const { error } = await tryCatch(doEventProcessing());

  if (error) {
    console.error('[STRIPE HOOK] Error processing event', error);
  }

  return NextResponse.json({ received: true });
}

/* ------------------------------ process event ----------------------------- */
async function processEvent(event: Stripe.Event) {
  // Skip processing if the event isn't one I'm tracking (list of all events below)
  if (!allowedEvents.includes(event.type)) return;

  // All the events I track have a customerId
  const { customer: customerId } = event?.data.object as {
    customer: string; // Sadly TypeScript does not know this
  };

  // This helps make it typesafe and also lets me know if my assumption is wrong
  if (typeof customerId !== 'string') {
    throw new Error(`[STRIPE HOOK] ID isn't string.\nEvent type: ${event.type}`);
  }

  return await syncStripeDataToKV(customerId);
}

/* ---------------------------------- sync ---------------------------------- */
 async function syncStripeDataToKV(customerId: string) {
  // Fetch latest subscription data from Stripe
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
    status: 'all',
    expand: ['data.default_payment_method'],
  });

  if (subscriptions.data.length === 0) {
    const subData = { status: 'none' };
    await kv.set(`stripe:customer_id:${customerId}`, subData);
    return subData;
  }

  // If a user can have multiple subscriptions, that's your problem
  const subscription = subscriptions.data[0];

  // Store complete subscription state
  const subData = {
    subscriptionId: subscription.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    currentPeriodEnd: subscription.current_period_end,
    currentPeriodStart: subscription.current_period_start,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    paymentMethod:
      subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
        ? {
            brand: subscription.default_payment_method.card?.brand ?? null,
            last4: subscription.default_payment_method.card?.last4 ?? null,
          }
        : null,
  };

  // Store the data in your KV
  await kv.set(`stripe:customer_id:${customerId}`, subData);
  return subData;
}

