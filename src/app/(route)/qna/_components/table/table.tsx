"use client";

import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { QuestionType } from "@/types/employee/user";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function QNATable() {
  const session = useSession();
  const isAuthenticated = session.data?.user.data.infoUser;
  const { getQuestionsList } = useEmployeeApi();
  const { isLoading, data } = useQuery({
    queryKey: [EmployeeQueryKeys.QNA],
    queryFn: () => {
      return getQuestionsList();
    },
    enabled: !!isAuthenticated,
  });

  const res = useMemo(() => (data?.data?.data as QuestionType[]) ?? [], [data]);

  if (isLoading || !isAuthenticated)
    return (
      <div className="flex w-full justify-center pt-10">
        <ThreeCircles
          visible={true}
          height="40"
          width="40"
          color="#4682a9"
          ariaLabel="three-circles-loading"
        />
      </div>
    );

  return (
    <div className="mx-auto w-full">
      <DataTable columns={columns} data={res} />
    </div>
  );
}
