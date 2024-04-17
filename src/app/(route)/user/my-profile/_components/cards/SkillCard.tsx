import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rate } from "@/components/ui/rate";
import { EmployeeQueryKeys } from "@/enums";
import { UserTechnical } from "@/types/employee/user";
import { Pencil, Star } from "lucide-react";
import { DeleteModal } from ".";

interface SkillCardProps {
  isEditable?: boolean;
  data: UserTechnical;
  actionEdit: (item: UserTechnical) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  actionEdit,
  data,
  isEditable,
}) => {
  const onClickEdit = () => {
    actionEdit(data);
  };

  return (
    <div className="flex w-full items-start gap-5 py-4">
      <Avatar className="rounded-md">
        <AvatarFallback>
          <Star />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col items-start gap-5 md:flex-row">
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="font-medium">
            {data?.skillName ?? data?.technical.technicalName}
          </h3>
          <Rate value={data?.rate} readonly />
        </div>
        {isEditable && (
          <div>
            <Button variant={"ghost"} onClick={onClickEdit}>
              <Pencil size={20} />
            </Button>
            <DeleteModal
              id={data?.id}
              type="skill"
              queryKey={EmployeeQueryKeys.USER_PROFILE_SKILL}
            />
          </div>
        )}
      </div>
    </div>
  );
};
