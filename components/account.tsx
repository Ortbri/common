// 'use client';

// import { LogOut } from 'lucide-react';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { Button } from './ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';

// const colorOptions = [
//   'bg-yellow-500',
//   'bg-blue-500',
//   'bg-green-500',
//   'bg-red-500',
//   'bg-purple-500',
// ];

// export default function AccountPage({ user }: { user: any }) {
//   const [avatarColorIndex, setAvatarColorIndex] = useState(0);

//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchKVData = async () => {
//       try {
//         const response = await fetch('/api/stripe/subscription');
//         if (!response.ok) {
//           throw new Error('Failed to fetch KV data');
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKVData();
//   }, []);

//   const handleLogout = () => console.log('Logout');
//   const handleAdminAccess = () => console.log('Admin access');
//   const handleEditSubscription = () => console.log('Edit subscription in Stripe portal');

//   const userInitials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

//   // const changeAvatarColor = () => {
//   //   setAvatarColorIndex(prevIndex => (prevIndex + 1) % colorOptions.length);
//   // };

//   return (
//     <div className="container mx-auto max-w-3xl p-14">
//       <div className="mb-8 flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Account</h1>
//         <div className="flex items-center gap-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className={`h-10 w-10 rounded-full ${colorOptions[avatarColorIndex]} flex items-center justify-center font-bold text-white`}
//                 // onDoubleClick={changeAvatarColor}
//               >
//                 {userInitials}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" /> Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="flex flex-col gap-4">
//         <section className="rounded-3xl border border-border p-4">
//           <h2 className="mb-4 text-2xl font-semibold">User Information</h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <InfoItem label="Name" value={`${user.first_name} ${user.last_name}`} />
//             <InfoItem label="Email" value={user.email} />
//             <InfoItem label="User ID" value={user.user_id} />
//             {/* <InfoItem label="Joined" value={user.created_at} /> */}
//           </div>
//         </section>

//         {user.role === 'admin' && (
//           <section className="flex-col gap-3 rounded-3xl border border-border p-4">
//             <h2 className="mb-4 text-2xl font-semibold">Admin</h2>
//             <div className="mb-4 flex items-center justify-between">
//               <InfoItem label="Role" value={user.role} />
//             </div>
//             <Link href={'/dashboard'}>
//               <Button onClick={handleAdminAccess} variant="secondary">
//                 Dashboard
//               </Button>
//             </Link>
//           </section>
//         )}

//         <section className="rounded-3xl border border-border p-4">
//           <div className="mb-4 grid gap-4">
//             {/* <h2 className="mb-2 text-lg font-bold">KV Store Data</h2> */}
//             <div className="rounded-lg border p-4">
//               <h2 className="mb-2 text-lg font-bold">KV Store Data</h2>
//               {data && data.success ? (
//                 <pre className="rounded p-2">{JSON.stringify(data, null, 2)}</pre>
//               ) : (
//                 <p>No KV data found.</p>
//               )}
//             </div>
//             {/* <InfoItem label="Status" value={subscription?.status} /> */}
//             {/* <InfoItem label="ID" value={subscription?.subscriptionId || 'N/A'} />
//             <InfoItem label="Auto-renew" value={subscription?.cancelAtPeriodEnd ? 'No' : 'Yes'} /> */}
//             {/* <InfoItem
//               label="Payment Method"
//               value={
//                 subscription.paymentMethod
//                   ? `${subscription.paymentMethod.brand} **** ${subscription.paymentMethod.last4}`
//                   : 'N/A'
//               }
//             /> */}
//           </div>
//           {/* <SubscriptionInfo /> */}
//           {/* <InfoItem
//             label="Current Period"
//             value={`${formatDate(subscription.currentPeriodStart)} - ${formatDate(subscription.currentPeriodEnd)}`}
//           /> */}
//           {/* <h2 className="mb-4 text-2xl font-semibold">Subscription</h2>
//           <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
//             <InfoItem label="Status" value={subscription.status} />
//             <InfoItem label="ID" value={subscription.subscriptionId || 'N/A'} />
//             <InfoItem label="Auto-renew" value={subscription.cancelAtPeriodEnd ? 'No' : 'Yes'} />
//             <InfoItem
//               label="Payment Method"
//               value={
//                 subscription.paymentMethod
//                   ? `${subscription.paymentMethod.brand} **** ${subscription.paymentMethod.last4}`
//                   : 'N/A'
//               }
//             />
//           </div>
//           <Button onClick={handleEditSubscription}>
//             <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
//           </Button> */}
//         </section>
//       </div>
//     </div>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
//       <dd className="mt-1 text-sm">{value}</dd>
//     </div>
//   );
// }

// // 'use client';

// // import { useEffect, useState } from 'react';

// // /**
// //  * TODO:
// //  * 1.subscription data to be shown
// //  * 2.back button or modal @ i think for route
// //  * 3.subscription route fetch
// //  * 4. subscription portal route
// //  *
// //  */
// // // 'use client';

// // // import { useEffect, useState } from 'react';

// // // export default function KVDataViewer() {

// // //TODO: ACTIONS
// // //   const [data, setData] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const fetchKVData = async () => {
// // //       try {
// // //         const response = await fetch('/api/test');
// // //         if (!response.ok) {
// // //           throw new Error('Failed to fetch KV data');
// // //         }
// // //         const result = await response.json();
// // //         setData(result);
// // //       } catch (err: any) {
// // //         setError(err.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchKVData();
// // //   }, []);

// // //   if (loading) return <p>Loading KV data...</p>;
// // //   if (error) return <p className="text-red-500">Error: {error}</p>;

// // //   return (
// // //     <div className="rounded-lg border bg-gray-100 p-4">
// // //       <h2 className="mb-2 text-lg font-bold">KV Store Data</h2>
// // //       {data && data.success ? (
// // //         <pre className="rounded bg-gray-200 p-2">{JSON.stringify(data, null, 2)}</pre>
// // //       ) : (
// // //         <p>No KV data found.</p>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // /**
// //  * TODO: private route removal from other routes
// //  */
// // // import { redirect } from 'next/navigation';
// // // import AccountForm from '../../components/account-form';
// // // import { createClient } from '../../utils/supabase/server';

// // // /**
// // //  * this page is simply to test if auth is working to fetch the user
// // //  *
// // //  * It's safe to trust getUser()
// // //  * because it sends a request to the Supabase Auth
// // //  * server every time to revalidate the Auth token.
// // //  */

// // // export default async function PrivatePage() {
// // //   const supabase = await createClient();

// // //   const { data, error } = await supabase.auth.getUser();
// // //   // console.log('data', JSON.stringify(data, null, 2));
// // //   if (error || !data?.user) {
// // //     redirect('/');
// // //   }

// // //   return <AccountForm user={data.user} />;
// // // }
