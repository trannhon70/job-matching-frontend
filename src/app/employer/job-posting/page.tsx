"use client";

import { Separator } from "@/components/ui/separator";
import { EmployerQueryKeys } from "@/enums";
import { JobPostingStatus } from "@/enums/employer";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useJobPostingState } from "@/hooks/employer/useJobPostingState";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { JobPostingHeader } from "./_components";
import { JobPostingTable } from "./_components/table";

const JobPostingPage = () => {
  const { getJobPosting } = useEmployerApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { currentPage, limit, calculatePage, filter } = useJobPostingState();
  const { isLoading, data } = useQuery({
    queryKey: [
      EmployerQueryKeys.JOB_POSTING,
      { currentPage, limit, ...filter },
    ],
    queryFn: () => {
      return getJobPosting({ page: currentPage, limit, ...filter });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
    enabled: !!isAuthenticated,
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
      close: 0,
      onGoing: 0,
      suspended: 0,
    };
    for (const e of formatData) {
      if (e.status === JobPostingStatus["Close"]) list.close += 1;
      if (e.status === JobPostingStatus["On_Going"]) list.onGoing += 1;
      if (e.status === JobPostingStatus["Suspended"]) list.suspended += 1;
    }
    return list;
  }, [formatData]);

  return (
    <>
      <JobPostingHeader statusList={statusList} />
      <Separator />
      <JobPostingTable data={formatData} isLoading={isLoading} />
    </>
  );
};

export default JobPostingPage;
