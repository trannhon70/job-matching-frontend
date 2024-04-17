"use client";

import { ConversationList } from "@/components/chat";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { ConversationItemType } from "@/types/employer/chat";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useQuery } from "react-query";

export const ConversationListFetching = () => {
  const { getConversationList } = useEmployeeApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;

  const { isLoading, data, isIdle } = useQuery({
    queryKey: [EmployeeQueryKeys.CONVERSATION_LIST],
    queryFn: () => {
      return getConversationList();
    },
    enabled: !!isAuthenticated,
  });

  const res = useMemo(
    () => (data?.data?.data as ConversationItemType[]) ?? [],
    [data],
  );
  return (
    <ConversationList
      type="employee"
      data={res}
      isLoading={isLoading || isIdle}
    />
  );
};
