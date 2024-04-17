"use client";

import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { UserProfileInterviewType } from "@/types/employee/interview";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function InterviewTable() {
  const { getUserProfileListInterview } = useEmployeeApi();
  const { isLoading, data } = useQuery({
    queryKey: [EmployeeQueryKeys.SUBSCRIPTION_INTERVIEW],
    queryFn: () => {
      return getUserProfileListInterview();
    },
  });

  const res = useMemo(
    () => (data?.data?.data as UserProfileInterviewType[]) ?? [],
    [data],
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div className="mx-auto w-full">
      <DataTable columns={columns} data={res} />
    </div>
  );
}
