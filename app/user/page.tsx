'use client';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';

export default function AccountPage() {
  // Dummy data
  const user = {
    user_id: '12345',
    email: 'johndoe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    created_at: '2023-01-01',
    role: 'admin',
  };

  const handleUpdate = () => {
    // Implement update logic here
    console.log('Update button clicked');
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout button clicked');
  };

  const handleAdminAccess = () => {
    // Implement admin access logic here
    console.log('Admin button clicked');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Account Page</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col gap-2 md:w-1/3">
          <Avatar className="h-20 w-20">
            <AvatarFallback />
          </Avatar>
          {/* <div className="mb-4">
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="Avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div> */}
          <Button onClick={handleUpdate} className="w-full">
            Update Profile
          </Button>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Logout
          </Button>
          {user.role === 'admin' && (
            <Button onClick={handleAdminAccess} variant="secondary" className="w-full">
              Admin Access
            </Button>
          )}
        </div>
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <p className="mt-1 text-sm text-gray-900">{user.user_id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <p className="mt-1 text-sm text-gray-900">{user.first_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <p className="mt-1 text-sm text-gray-900">{user.last_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Created At</label>
              <p className="mt-1 text-sm text-gray-900">{user.created_at}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-sm text-gray-900">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * TODO:
 * 1.subscription data to be shown
 * 2.back button or modal @ i think for route
 * 3.subscription route fetch
 * 4. subscription portal route
 *
 */
// 'use client';

// import { useEffect, useState } from 'react';

// export default function KVDataViewer() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchKVData = async () => {
//       try {
//         const response = await fetch('/api/test');
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

//   if (loading) return <p>Loading KV data...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="rounded-lg border bg-gray-100 p-4">
//       <h2 className="mb-2 text-lg font-bold">KV Store Data</h2>
//       {data && data.success ? (
//         <pre className="rounded bg-gray-200 p-2">{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>No KV data found.</p>
//       )}
//     </div>
//   );
// }

/**
 * TODO: private route removal from other routes
 */
// import { redirect } from 'next/navigation';
// import AccountForm from '../../components/account-form';
// import { createClient } from '../../utils/supabase/server';

// /**
//  * this page is simply to test if auth is working to fetch the user
//  *
//  * It's safe to trust getUser()
//  * because it sends a request to the Supabase Auth
//  * server every time to revalidate the Auth token.
//  */

// export default async function PrivatePage() {
//   const supabase = await createClient();

//   const { data, error } = await supabase.auth.getUser();
//   // console.log('data', JSON.stringify(data, null, 2));
//   if (error || !data?.user) {
//     redirect('/');
//   }

//   return <AccountForm user={data.user} />;
// }
