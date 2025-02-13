"use server";

import { getURL } from "../../utils/helpers";
import { stripe } from "../../utils/stripe/config";
import { createClient } from "../../utils/supabase/server";
import { kv } from "../../utils/upstash/client";

export async function createStripePortal() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return { error: "Unauthorized. Please log in." };
    }

    // Retrieve the Stripe customer ID from KV store
    const stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;
    if (!stripeCustomerId) {
      return { error: "Customer not found." };
    }

    // Create a Stripe Customer Portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: getURL("/user"), // Redirects the user back to their account page after managing subscription
    });

    if (!portalSession.url) {
      throw new Error("Could not create portal session.");
    }

    return { url: portalSession.url };

  } catch (error) {
    console.error("Customer Portal Error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
