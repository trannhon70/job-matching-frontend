"use client";

import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import useListApplySave from "../useListApplySave";

const useFetchListSaveApply = () => {
  const { setApplyList, setSaveList } = useListApplySave();
  const { getListApplyAndSave } = useEmployeeApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;
  const query = useQuery({
    queryKey: [EmployeeQueryKeys.LIST_ID_APPLY_SAVE],
    queryFn: () => {
      return getListApplyAndSave();
    },
    onSuccess: (res) => {
      const data = res?.data?.data;
      setApplyList(data?.apply ?? []);
      setSaveList(data?.save ?? []);
    },
    enabled: !!isAuthenticated,
  });
};

export default useFetchListSaveApply;
