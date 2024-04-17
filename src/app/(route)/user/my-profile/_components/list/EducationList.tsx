import { UserSchool } from "@/types/employee/user";
import { EducationCard } from "../cards";

interface EducationListProps {
  list: UserSchool[];
  isEditable?: boolean;
  actionEdit: (item: UserSchool) => void;
}

export const EducationList: React.FC<EducationListProps> = ({
  list,
  isEditable = true,
  actionEdit,
}) => {
  return (
    <div className="mb-2 divide-y divide-indigo-800">
      {list?.map((i) => (
        <EducationCard
          isEditable={isEditable}
          item={i}
          key={i.id}
          actionEdit={actionEdit}
        />
      ))}
    </div>
  );
};
