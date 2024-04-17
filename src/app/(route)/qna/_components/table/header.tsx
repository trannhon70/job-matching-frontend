import { Separator } from "@/components/ui/separator";
import { NewQNAModal } from "..";

export const TableHeader = () => {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-lg font-bold">1:1 Q&A</h2>
        <NewQNAModal />
      </div>
      <Separator />
    </div>
  );
};
