"use client";

import { Button } from "@/components/ui/button";
import useQueryString from "@/hooks/common/useQueryString";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import { useSearchParams } from "next/navigation";
import { InterviewRegisterModal } from ".";

export const TableHeader = () => {
  const { isMaster, isCompany } = useCheckAuthorization();
  const { goToRouterQueryString } = useQueryString();
  const searchParams = useSearchParams();
  const interviewStatus = searchParams.get("status");

  return (
    <div className="mb-4 flex w-full justify-between">
      <div className="flex gap-2">
        <Button
          onClick={() => {
            goToRouterQueryString("/employer/interview", "status", "schedule");
          }}
          variant={interviewStatus !== "previous" ? "default" : "outline"}
        >
          Schedule
        </Button>
        <Button
          onClick={() => {
            goToRouterQueryString("/employer/interview", "status", "previous");
          }}
          variant={interviewStatus === "previous" ? "default" : "outline"}
        >
          Previous
        </Button>
      </div>
      {isMaster && isCompany && <InterviewRegisterModal />}
    </div>
  );
};
