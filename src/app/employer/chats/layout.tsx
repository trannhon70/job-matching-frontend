import { ReactNode } from "react";
import { ConversationListFetching } from "./[conversationId]/_components";

const ChatsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-1">
      <ConversationListFetching />
      <div className="flex h-full flex-1 flex-col border">{children}</div>
    </div>
  );
};

export default ChatsLayout;
