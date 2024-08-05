import { Card } from "@/components/primitives/ui/card";
import { Skeleton } from "@/components/primitives/ui/skeleton";

export function SkeletonRankings() {
  return (
    <Card className="border-none shadow-none shrink-0 dark:ring-1 dark:ring-border space-y-8 w-full pt-32 pb-20">
      {[...Array(3)].map((_, idx) => (
        <section key={idx} className="flex items-center space-x-4 pr-8 pl-24">
          <Skeleton className="w-24 h-32" />
          <div className="flex flex-col flex-grow space-y-2">
            <Skeleton className="w-52 h-4" />
            <div className="flex space-x-2">
              <Skeleton className="w-36 h-3" />
              <Skeleton className="w-24 h-3" />
              <Skeleton className="w-52 h-3" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-96 h-4" />
            <Skeleton className="w-80 h-3" />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-end space-x-1">
              <Skeleton className="w-14 h-4" />
              <Skeleton className="w-12 h-3" />
            </div>
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-24 h-3" />
          </div>
        </section>
      ))}
    </Card>
  );
}
