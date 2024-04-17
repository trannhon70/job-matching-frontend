import { Experience } from "@/types/employee/user";
import { WorkExpCard } from "../cards";

interface WorkExpProps {
  data: Experience[];
  isEditable?: boolean;
  actionEdit: (item: Experience) => void;
}

export const WorkExpList: React.FC<WorkExpProps> = ({
  data,
  isEditable,
  actionEdit,
}) => {
  return (
    <div className="mb-2 divide-y divide-indigo-800">
      {data?.map((i) => (
        <WorkExpCard
          isEditable={isEditable}
          key={i.id}
          data={i}
          actionEdit={actionEdit}
        />
      ))}
    </div>
  );
};
