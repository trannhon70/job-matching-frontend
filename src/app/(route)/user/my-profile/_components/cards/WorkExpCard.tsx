import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmployeeQueryKeys } from "@/enums";
import { Experience } from "@/types/employee/user";
import { BookUser, Pencil } from "lucide-react";
import { DeleteModal } from ".";

interface WorkExpCardProps {
  data: Experience;
  isEditable?: boolean;
  actionEdit: (item: Experience) => void;
}

export const WorkExpCard: React.FC<WorkExpCardProps> = ({
  data,
  isEditable,
  actionEdit,
}) => {
  const onClickEdit = () => {
    actionEdit(data);
  };
  return (
    <div className="flex w-full items-start gap-5 py-4">
      <Avatar className="rounded-md">
        <AvatarFallback>
          <BookUser />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col items-start gap-5 md:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="font-medium">
            {data?.companyName ?? data?.company?.companyName}
          </h3>
          <div
            className="text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          <p className="text-sm text-gray-600">
            {data?.monthStart}/{data?.yearStart} - {data?.monthEnd}/
            {data?.yearEnd}
          </p>
        </div>
        {isEditable && (
          <div>
            <Button variant={"ghost"} onClick={onClickEdit}>
              <Pencil size={20} />
            </Button>
            <DeleteModal
              type="exp"
              id={data.id}
              queryKey={EmployeeQueryKeys.USER_PROFILE_EXP}
            />
          </div>
        )}
      </div>
    </div>
  );
};
