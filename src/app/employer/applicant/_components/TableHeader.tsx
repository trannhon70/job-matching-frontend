import { Badge } from "@/components/ui/badge";
import { ApplicantStatusType } from "@/types/employer/applicant";
import { JobFilterModal, SearchBox } from ".";

interface Props {
  statusCount: ApplicantStatusType;
}

export const TableHeader: React.FC<Props> = ({ statusCount }) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="flex gap-2">
        <JobFilterModal />
        <SearchBox />
      </div>

      <div className="flex divide-x-2">
        <div className="flex gap-4 px-4">
          <span>Interview</span>
          <Badge>{statusCount?.interview}</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Hired</span>
          <Badge>{statusCount?.hired}</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Refuse</span>
          <Badge>{statusCount?.refuse}</Badge>
        </div>
      </div>
    </div>
  );
};
