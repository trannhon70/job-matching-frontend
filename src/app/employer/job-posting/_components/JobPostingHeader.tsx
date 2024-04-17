"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  statusList: {
    close: number;
    onGoing: number;
    suspended: number;
  };
}
export const JobPostingHeader: React.FC<Props> = ({ statusList }) => {
  const { isMaster, isCompany } = useCheckAuthorization();
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="flex divide-x-2">
        <div className="flex gap-4 px-4">
          <span>On going jobs</span>
          <Badge>{statusList.onGoing}</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Suspended jobs</span>
          <Badge>{statusList.suspended}</Badge>
        </div>
        <div className="flex gap-4 px-4">
          <span>Closed jobs</span>
          <Badge>{statusList.close}</Badge>
        </div>
      </div>
      {isMaster && isCompany && (
        <Button asChild>
          <Link href="/employer/job-posting/new">
            <Plus className="mr-2" /> Add post
          </Link>
        </Button>
      )}
    </div>
  );
};
