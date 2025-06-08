import { Skeleton } from "@/components/ui/skeleton";

export const LiveFeedSkeleton = () => (
    <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-36" />
    </div>
);
