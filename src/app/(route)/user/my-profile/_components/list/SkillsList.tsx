import { UserTechnical } from "@/types/employee/user";
import { SkillCard } from "../cards";

interface SkillsListProps {
  data: UserTechnical[];
  isEditable?: boolean;
  actionEdit: (item: UserTechnical) => void;
}

export const SkillsList: React.FC<SkillsListProps> = ({
  actionEdit,
  data,
  isEditable,
}) => {
  return (
    <div className="mb-2 divide-y divide-indigo-800">
      {data?.map((i) => (
        <SkillCard
          isEditable={isEditable}
          data={i}
          key={i.id}
          actionEdit={actionEdit}
        />
      ))}
    </div>
  );
};
