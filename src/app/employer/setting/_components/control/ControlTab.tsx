"use client";

import { EmployerQueryKeys } from "@/enums";
import { EmployerStatus } from "@/enums/employer";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { ControlHeader } from ".";
import { ControlTable } from "./table";

export const ControlTab = () => {
  const { getCompanyControlEmployer } = useEmployerApi();
  const { isLoading, data } = useQuery({
    queryKey: [EmployerQueryKeys.CONTROL_EMPLOYER],
    queryFn: () => {
      return getCompanyControlEmployer();
    },
  });
  const formatData = useMemo(() => {
    return (
      data?.data?.data?.map((e: any, index: number) => ({
        ...e,
        no: index + 1,
      })) ?? []
    );
  }, [data]);

  const statusList = useMemo(() => {
    const list = {
      approval: 0,
      pending: 0,
      suspended: 0,
    };
    for (const e of formatData) {
      if (e.status === EmployerStatus["Approval"]) list.approval += 1;
      if (e.status === EmployerStatus["Pending"]) list.pending += 1;
      if (e.status === EmployerStatus["Suspended"]) list.suspended += 1;
    }
    return list;
  }, [formatData]);

  return (
    <div className="border p-4">
      {isLoading && (
        <div className="flex w-full justify-center">
          <ThreeCircles
            visible={true}
            height="40"
            width="40"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        </div>
      )}
      {!isLoading && (
        <>
          <ControlHeader
            approval={statusList.approval}
            pending={statusList.pending}
            suspended={statusList.suspended}
          />
          <ControlTable data={formatData ?? []} />
        </>
      )}
    </div>
  );
};
