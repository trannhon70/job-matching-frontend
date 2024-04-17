"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useApplicantState } from "@/hooks/employer/useApplicantState";
import { ApplicantResType } from "@/types/employer/applicant";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { TablePagination } from ".";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  jobId: number;
}

export const StatisticTable: React.FC<Props> = ({ jobId }) => {
  const { currentPage, limit, calculatePage } = useApplicantState();
  const { getApplicant } = useEmployerApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { isLoading, data } = useQuery({
    queryKey: [EmployerQueryKeys.APPLICANT, { currentPage, limit }],
    queryFn: () => {
      return getApplicant({
        page: currentPage,
        limit,
        jobId,
      });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
    enabled: !!isAuthenticated && !!jobId,
  });

  const res = useMemo(
    () =>
      (data?.data?.data.map((i: ApplicantResType, index: number) => ({
        ...i,
        no: (currentPage - 1) * limit + index + 1,
      })) as ApplicantResType[]) ?? [],
    [data, currentPage, limit],
  );
  return (
    <div className="mx-auto mt-10 w-full">
      {/* <TableHeader /> */}
      <DataTable columns={columns} data={res} />
      <TablePagination />
    </div>
  );
};
