import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCardBox = () => {
  return (
    <Card className="flex aspect-square flex-col p-6">
      <Skeleton className="mb-4 flex h-14"></Skeleton>
      <Skeleton className="mb-4 flex h-6"></Skeleton>
      <Skeleton className="flex-1"></Skeleton>
    </Card>
  );
};
