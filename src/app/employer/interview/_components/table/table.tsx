"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import useInterviewState from "@/hooks/employer/useInterviewState";
import { InterviewItemType } from "@/types/employer/interview";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "react-query";
import {
  DataTable,
  TablePagination,
  notHasMasterColumns,
  previousColumns,
  scheduleColumns,
} from ".";
import { TableHeader } from "..";

export function InterviewTable() {
  const { getInterviewList } = useEmployerApi();
  const { isMaster } = useCheckAuthorization();
  const searchParams = useSearchParams();
  const interviewStatus = searchParams.get("status");
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { currentPage, limit, calculatePage, filter } = useInterviewState();

  const filterStatus = useMemo(
    () => interviewStatus === "previous",
    [interviewStatus],
  );
  const { isLoading, data } = useQuery({
    queryKey: [
      EmployerQueryKeys.INTERVIEW,
      { currentPage, limit, ...filter, filterStatus },
    ],
    queryFn: () => {
      return getInterviewList({
        page: currentPage,
        limit,
        status: filterStatus,
        ...filter,
      });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
    enabled: !!isAuthenticated,
  });

  const formatData = useMemo(() => {
    return (
      (data?.data?.data?.map((e: any, index: number) => ({
        ...e,
        no: index + 1,
      })) as InterviewItemType[]) ?? []
    );
  }, [data]);

  const columnsTable = useMemo(() => {
    if (!isMaster) return notHasMasterColumns;
    return interviewStatus === "previous" ? previousColumns : scheduleColumns;
  }, [interviewStatus, isMaster]);

  return (
    <div className="mx-auto w-full">
      <TableHeader />
      <DataTable
        isLoading={isLoading}
        columns={columnsTable}
        data={formatData}
      />
      <TablePagination />
    </div>
  );
}
