import { Skeleton } from '../ui/skeleton';

function UserSkel() {
  return (
    <header className="flex flex-row items-center justify-between p-4">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </header>
  );
}

export default UserSkel;
