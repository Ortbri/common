import { Suspense } from 'react';
import Profile from '../../features/user/profile';
import { Sub } from '../../features/user/sub';

export default async function UserPage() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2">
      {/* Section 1 */}
      <section className="flex flex-col gap-2 rounded-3xl border border-border p-4">
        <h2 className="text-2xl font-semibold">User Information</h2>
        <Suspense fallback="..loading">
          <Profile />
        </Suspense>
      </section>
      <section className="rounded-3xl border border-border p-4">
        <h2 className="text-2xl font-semibold">Subscription</h2>
        <Suspense fallback="..loading">
          <Sub />
        </Suspense>
      </section>
    </div>
  );
}

// function Skelly() {
//   return (
//     <div className="flex flex-col gap-2">
//       <Skeleton className="h-4 w-8" />
//       <Skeleton className="h-4 w-24" />
//       <Skeleton className="h-4 w-8" />
//       <Skeleton className="h-4 w-24" />
//     </div>
//   );
// }
