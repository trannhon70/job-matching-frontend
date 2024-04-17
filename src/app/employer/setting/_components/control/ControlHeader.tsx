import { Badge } from "@/components/ui/badge";
import { AddUserModal } from ".";

interface Props {
  approval: number;
  pending: number;
  suspended: number;
}

export const ControlHeader: React.FC<Props> = ({
  approval = 0,
  pending = 0,
  suspended = 0,
}) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="flex divide-x-2">
        <div className="flex gap-4 px-4">
          <span>Approval</span>
          <Badge>{approval}</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Pending</span>
          <Badge>{pending}</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Suspended</span>
          <Badge>{suspended}</Badge>
        </div>
      </div>
      <AddUserModal />
    </div>
  );
};
