import { Skeleton } from '../../components/ui/skeleton';

function ProfileSkel() {
  return (
    <div className="flex flex-col gap-3 px-4">
      <section className="flex flex-col gap-3 rounded-3xl border border-border p-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </section>
    </div>
  );
}

export default ProfileSkel;
