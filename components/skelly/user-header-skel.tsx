'use client';

import { Skeleton } from '../ui/skeleton';

export default function UserHeaderSkeleton() {
  return (
    <header className="flex flex-row items-center justify-between p-4">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </header>
  );
}
