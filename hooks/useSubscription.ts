'use client';

import { useQuery } from '@tanstack/react-query';
import { Stripe } from 'stripe';

export interface SubscriptionApiResponse {
  success: boolean;
  stripeCustomerId?: string;
  subscriptionData?: {
    subscriptionId: string | null;
    status: Stripe.Subscription.Status;
    priceId: string | null;
    currentPeriodStart: number | null;
    currentPeriodEnd: number | null;
    cancelAtPeriodEnd: boolean;
    paymentMethod: {
      brand: string | null;
      last4: string | null;
    } | null;
  } | {
    status: 'none';
  };
}

async function fetchSubscription(): Promise<SubscriptionApiResponse> {
  const response = await fetch('/api/stripe/subscription');
  if (!response.ok) {
    throw new Error('Failed to fetch subscription data');
  }
  return response.json();
}

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: fetchSubscription,
  });
} 