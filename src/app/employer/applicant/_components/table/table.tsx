"use client";

import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { useApplicantState } from "@/hooks/employer/useApplicantState";
import useCheckAuthorization from "@/hooks/employer/useCheckAuthorization";
import {
  ApplicantResType,
  ApplicantStatusType,
} from "@/types/employer/applicant";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { TablePagination } from ".";
import { TableHeader } from "..";
import { columns, columnsNotMaster } from "./columns";
import { DataTable } from "./data-table";

export function ApplicantTable() {
  const { isMaster, isCompany } = useCheckAuthorization();
  const { currentPage, limit, calculatePage, selectedIds, filter } =
    useApplicantState();
  const { getApplicant } = useEmployerApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const { isLoading, data } = useQuery({
    queryKey: [
      EmployerQueryKeys.APPLICANT,
      currentPage,
      limit,
      selectedIds,
      filter,
    ],
    queryFn: () => {
      return getApplicant({
        page: currentPage,
        limit,
        jobId: [...selectedIds.On_Going, ...selectedIds.Suspended].join(","),
        ...filter,
      });
    },
    onSuccess: (res) => {
      calculatePage(res?.data?.totalItem ?? 1);
    },
    enabled: !!isAuthenticated,
  });

  const res = useMemo(
    () =>
      (data?.data?.data.map((i: ApplicantResType, index: number) => ({
        ...i,
        no: (currentPage - 1) * limit + index + 1,
      })) as ApplicantResType[]) ?? [],
    [data, currentPage, limit],
  );

  const statusCount = useMemo(
    () => data?.data.count as ApplicantStatusType,
    [data],
  );

  return (
    <div className="mx-auto w-full">
      <TableHeader statusCount={statusCount} />
      <DataTable
        isLoading={isLoading}
        columns={isMaster && isCompany ? columns : columnsNotMaster}
        data={res}
      />
      <TablePagination />
    </div>
  );
}
