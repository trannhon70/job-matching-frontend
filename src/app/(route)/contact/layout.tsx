"use client";

import useIsMobileConversation from "@/hooks/employee/useIsMobileConversation";
import { ReactNode } from "react";
import { ConversationListFetching } from "./_components";

const ConversationLayout = ({ children }: { children: ReactNode }) => {
  const { isLobbyConversation, isMobile } = useIsMobileConversation();
  return (
    <div className="container">
      <div className="my-4 h-[80vh]">
        <div className="flex h-full w-full flex-1">
          {!isLobbyConversation && isMobile ? (
            <></>
          ) : (
            <ConversationListFetching />
          )}

          {isLobbyConversation && isMobile ? (
            <></>
          ) : (
            <div className="flex h-full flex-1 flex-col border">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationLayout;
