'use client';
import { useSubscription } from '../../hooks/useSubscription';
import { InfoItem } from './InfoItem';

export function Subscription() {
  const { data, isLoading, error } = useSubscription();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
        <h2 className="text-2xl font-semibold">Subscription Info</h2>
        <div className="rounded-3xl">
          <p>Loading subscription details...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
        <h2 className="text-2xl font-semibold">Subscription Info</h2>
        <div className="rounded-3xl">
          <p className="text-red-500">Failed to load subscription details</p>
        </div>
      </section>
    );
  }

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

/* -------------------------------------------------------------------------- */
/*                              subscription info                             */
/* -------------------------------------------------------------------------- */

// function SubscriptionSection() {
//   const { data } = useSubscription();

//   return (
//     <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
//       <h2 className="text-2xl font-semibold">Subscription Info</h2>
//       <div className="rounded-3xl">
//         {data?.subscriptionData && (
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <InfoItem label="Status" value={data.subscriptionData.status} />
//             {data.subscriptionData.status !== 'none' && (
//               <>
//                 <InfoItem label="Plan" value={data.subscriptionData.priceId || 'N/A'} />
//                 {data.subscriptionData.paymentMethod && (
//                   <InfoItem
//                     label="Payment Method"
//                     value={`${data.subscriptionData.paymentMethod.brand} ending in ${data.subscriptionData.paymentMethod.last4}`}
//                   />
//                 )}
//                 <InfoItem
//                   label="Renewal Date"
//                   value={
//                     data.subscriptionData.currentPeriodEnd
//                       ? new Date(data.subscriptionData.currentPeriodEnd * 1000).toLocaleDateString()
//                       : 'N/A'
//                   }
//                 />
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
