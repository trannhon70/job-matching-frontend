"use client";

import { ConversationChat } from "@/components/chat";
import { EmployeeQueryKeys } from "@/enums";
import useEmployeeApi from "@/hooks/apis/useEmployeeApi";
import { DetailConversationType } from "@/types/employer/chat";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";

const ConversationPage = ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const { getDetailConversation } = useEmployeeApi();
  const session = useSession();
  const isAuthenticated = session.data?.user.data.token;

  const { isLoading, data, isIdle } = useQuery({
    queryKey: [
      `${EmployeeQueryKeys.CONVERSATION_DETAIL}_${params.conversationId}`,
    ],
    queryFn: () => {
      return getDetailConversation(params.conversationId);
    },
    enabled: !!isAuthenticated,
  });

  const res = useMemo(
    () => (data?.data.data as DetailConversationType) ?? {},
    [data],
  );

  return (
    <>
      {isLoading || isIdle ? (
        <div className="flex w-full justify-center pt-6">
          <ThreeCircles
            visible={true}
            height="30"
            width="30"
            color="#4682a9"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
        <>
          <ConversationChat
            conversationId={params.conversationId}
            type="employee"
            data={res}
          />
        </>
      )}
    </>
  );
};

export default ConversationPage;
