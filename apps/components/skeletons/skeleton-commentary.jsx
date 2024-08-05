import { Skeleton } from "@/components/primitives/ui/skeleton";

export function SkeletonCommentary() {
  return (
    <div className="flex items-start space-x-2">
      <Skeleton className="h-6 w-6 rounded-full" />
      <div className="space-y-3 py-1">
        <Skeleton className="h-4 w-[96px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}
