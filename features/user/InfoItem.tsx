import { Skeleton } from '../../components/ui/skeleton';

interface InfoItemProps {
  label: string;
  value: string;
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function InfoSkel() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
