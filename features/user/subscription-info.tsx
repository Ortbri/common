// import { createSubscriptionClient } from '@/utils/kv/server';

export default async function SubscriptionInfo({}) {
  //   const kv = createSubscriptionClient();
  //   const subscription = await kv.getSubscription(userId);

  //   if (!subscription) {
  //     return <p>No subscription found.</p>;
  //   }

  return (
    <div>
      <p>
        <strong>Plan:</strong> title
      </p>
      <p>
        <strong>Status:</strong> status
      </p>
      <p>
        <strong>Renewal Date:</strong> date here
      </p>
    </div>
  );
}
