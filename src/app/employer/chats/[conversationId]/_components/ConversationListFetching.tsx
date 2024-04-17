"use client";

import { ConversationList } from "@/components/chat";
import { EmployerQueryKeys } from "@/enums";
import useEmployerApi from "@/hooks/apis/useEmployerApi";
import { ConversationItemType } from "@/types/employer/chat";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useQuery } from "react-query";

export const ConversationListFetching = () => {
  const { getConversationList } = useEmployerApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;

  const { isLoading, data, isIdle } = useQuery({
    queryKey: [EmployerQueryKeys.CONVERSATION_LIST],
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
      type="employer"
      data={res}
      isLoading={isLoading || isIdle}
    />
  );
};
