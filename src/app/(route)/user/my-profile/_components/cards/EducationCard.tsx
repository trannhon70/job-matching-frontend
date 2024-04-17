import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmployeeQueryKeys } from "@/enums";
import { UserSchool } from "@/types/employee/user";
import { Pencil, School2 } from "lucide-react";
import { DeleteModal } from ".";

interface EducationCardProps {
  item: UserSchool;
  isEditable?: boolean;
  actionEdit: (item: UserSchool) => void;
}

export const EducationCard: React.FC<EducationCardProps> = ({
  item,
  isEditable = true,
  actionEdit,
}) => {
  const onClickEdit = () => {
    actionEdit(item);
  };
  return (
    <div className="w-full">
      <div className="flex w-full items-start gap-5 py-4">
        <Avatar className="rounded-md">
          <AvatarFallback>
            <School2 />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start gap-5 md:flex-row">
          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="font-medium">
              {item?.schoolName ?? item?.school.schoolName}
            </h3>
            <p className="text-sm text-gray-600">
              {item?.majorName ?? item?.major.majorName}
            </p>
            <p className="text-sm text-gray-600">
              {item?.monthStartEdu}/{item?.yearStartEdu}
              {item?.monthEndEdu && item?.yearEndEdu && (
                <>
                  - {item?.monthEndEdu}/{item?.yearEndEdu}
                </>
              )}
            </p>
          </div>
          {isEditable && (
            <div>
              <Button variant={"ghost"} onClick={onClickEdit}>
                <Pencil size={20} />
              </Button>
              <DeleteModal
                id={item?.id}
                type="education"
                queryKey={EmployeeQueryKeys.USER_PROFILE_EDUCATION}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
