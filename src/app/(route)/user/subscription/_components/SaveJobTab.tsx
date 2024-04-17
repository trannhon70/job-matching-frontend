"use client";

import { DetailJobCard } from "@/components/cards";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { JobType } from "@/types/employee/job";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";

export const SaveJobTab = () => {
  const { getUserProfileListSaved } = useEmployeeApi();
  const { isLoading, data } = useQuery({
    queryKey: [EmployeeQueryKeys.SUBSCRIPTION_SAVE],
    queryFn: () => {
      return getUserProfileListSaved();
    },
  });

  const res = useMemo(() => (data?.data?.data as JobType[]) ?? [], [data]);

  if (isLoading)
    return (
      <ThreeCircles
        visible={true}
        height="30"
        width="30"
        color="#4682a9"
        ariaLabel="three-circles-loading"
      />
    );

  return (
    <div className="flex flex-col gap-4 py-4">
      {res.map((i) => (
        <DetailJobCard key={i.id} data={i} />
      ))}
    </div>
  );
};
