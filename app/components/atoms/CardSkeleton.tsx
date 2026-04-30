import { Skeleton } from './Skeleton';

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl border border-text w-50">
      {/* header */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-3 w-[55%]" />
          <Skeleton className="h-2.5 w-[35%]" />
        </div>
      </div>
      {/* image */}
      <Skeleton className="h-32 w-full rounded-xl" />
      {/* text lines */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[88%]" />
        <Skeleton className="h-3 w-[72%]" />
      </div>
    </div>
  );
}