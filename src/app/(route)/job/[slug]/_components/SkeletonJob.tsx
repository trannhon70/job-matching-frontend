import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonJob = () => {
  return (
    <div className="flex flex-col-reverse gap-6 lg:flex-row">
      <Card className="h-fit w-full p-4 md:w-2/3">
        <Skeleton className="h-12 w-full"></Skeleton>
        <Skeleton className="mt-4 h-32 w-full"></Skeleton>
        <Skeleton className="mt-8 h-10 w-full"></Skeleton>
        <Skeleton className="mt-4 h-52 w-full"></Skeleton>
      </Card>
      <Card className="aspect-square h-fit w-full p-4 md:w-1/3">
        <Skeleton className="h-10 w-full"></Skeleton>
        <Skeleton className="mt-4 h-14 w-full"></Skeleton>
        <Skeleton className="mt-4 h-44 w-full"></Skeleton>
      </Card>
    </div>
  );
};
