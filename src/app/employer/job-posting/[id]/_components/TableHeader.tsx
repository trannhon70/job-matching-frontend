import { Badge } from "@/components/ui/badge";

export const TableHeader = () => {
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="flex divide-x-2">
        <div className="flex gap-4 px-4">
          <span>Approval</span>
          <Badge>1</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Pending</span>
          <Badge>1</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Suspended</span>
          <Badge>1</Badge>
        </div>
      </div>
    </div>
  );
};
